var config = require('./config');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var io = require('socket.io')(server,{log:false});
var pg = require('pg');
var url = require('url');
var twit = require('twitter');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cst.sinner2@gmail.com',
        pass: 'password4project'
    }
});

function sendMail(from, to, subject, text, html){
    var mailOptions = {
        from: from || '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: to, // list of receivers , baz@blurdybloop.com
        subject: subject || 'Hello ✔', // Subject line
        text: text || 'Hello world ?', // plain text body
        html: html || '<b>Hello world ?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

//my crontab
setInterval(()=>{
    //console.log("Another minute has passed");//select * from users where username in (select username from event_to_user where eventid=1 AND status='1');
    // pool.connect(function(err, client, done) {
    //     if(err) {
    //         return console.error('error fetching client from pool', err);
    //     }
        
    //     client.query("SELECT * FROM users WHERE username in (SELECT username FROM event_to_user WHERE eventid=$1 AND status=$2)", [eventid, status], function(err, result) {
    //         done(err);
    //         if(err) {
    //             res.send(err);
    //             return console.error('error running query', err);
    //         }
            
    //          if( result && result.rows){
    //             res.send(result.rows);
    //          }            
    //     });
    // });
}, 60000);

var params = url.parse(process.env.DATABASE_URL);
var auth = params.auth.split(':');

var pgconfig = {
  user: auth[0] || config.postgresqlCredentials.user,
  password: auth[1] || config.postgresqlCredentials.password,
  host: params.hostname || config.postgresqlCredentials.host,
  port: params.port || config.postgresqlCredentials.port,
  database: params.pathname.split('/')[1] || config.postgresqlCredentials.database,
  ssl: true
};

// var pgconfig = {
//   user: config.postgresqlCredentials.user, //env var: PGUSER
//   database: config.postgresqlCredentials.database, //env var: PGDATABASE
//   password: config.postgresqlCredentials.password, //env var: PGPASSWORD
//   host: config.postgresqlCredentials.host, // Server hosting the postgres database
//   port: config.postgresqlCredentials.port, //env var: PGPORT
//   max: config.postgresqlCredentials.max, // max number of clients in the pool
//   idleTimeoutMillis: config.postgresqlCredentials.idleTimeoutMillis, // how long a client is allowed to remain idle before being closed
// };
// pg.defaults.ssl = true;
var pool = new pg.Pool(pgconfig);
//https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
//http://stackoverflow.com/a/19282657/5706293

// pool.connect(function(err, client, done) {
//   if(err) {
//     return console.error('error fetching client from pool', err);
//   }
//   client.query("SELECT * FROM users", function(err, result) {
//     done(err);
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows);
//   });
// });

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

var twitter = new twit({
  consumer_key: config.twitterCredentials.consumer_key,
  consumer_secret: config.twitterCredentials.consumer_secret,
  access_token_key: config.twitterCredentials.access_token_key,
  access_token_secret: config.twitterCredentials.access_token_secret
});

server.listen(process.env.PORT || 9999, function(){
    console.log("Server connected. Listening on port: 9999");
});
//session init
app.use( session({
    secret:'can',
    resave:false,
    saveUninitialized:false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.use( express.static(__dirname) ); // + '/client' 

//Routes
/*var Routes = require('./routes.js');
var r = new Routes(app, io, pool, twitter);*/

io.on('connection', function(socket){
    console.log("Server connection.io");
    socket.emit('news',"WebSocket connection opened");
});

io.on('disconnect', function(socket){
    console.log("client dcd");
});

var twitStream;
app.get('/stream/:searchTerm', (req, res, next) => {
    const searchTerm = req.params.searchTerm

    twitStream = twitter.stream('statuses/filter', {track: searchTerm});
    twitStream.on('data', (data) => {
        data.location = data.geo ? data.geo.coordinates : [];
        const tweet = {
            created_at: data.created_at,
            text: data.text,
            username: data.user ? data.user.screen_name : '',
            followers_count: data.user ? data.user.followers_count : '',
            following_count: data.user ? data.user.friends_count : '',
            statuses_count: data.user ? data.user.statuses_count : '',
            profile_image_url: data.user ? data.user.profile_image_url : '',
            coordinates: data.location
        };
        io.emit('tweet', tweet);
    });

    twitStream.on('error', (error) => {
        throw error;
    });           
    
});

app.post('/closetwitterstream', function(req,res){
    console.log("closing twitter stream");
    if(twitStream){
        twitStream.destroy();
    }        
    return res.sendStatus(200);
});



app.post('/login', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var user_name = req.body.name;
    var password = req.body.password;

    console.log('Checking db for username = '+user_name+' and password = '+password);

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        //SQL injection
        client.query("SELECT * FROM users WHERE username=$1", [user_name], function(err, result) {
            done(err);
            if(err) {
                return console.error('error running query', err);
            }

            if( result && result.rows && result.rows[0] && result.rows[0].password && password == result.rows[0].password){
                res.send("yes");
            }else{
                res.send("no")
            }
        });
    });
});

app.post('/signup', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    console.log('Checking db for username = '+username+' and password = '+password);

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", [username, password, email], function(err, result) {
            done(err);
            if(err) {
                res.send('23505');//dublicate name
                return console.error('error running query', err);
            }
            
            res.send("yes")
        });
    });
});

app.post('/myevents/get', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var username = req.body.username;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("SELECT * FROM event WHERE owner=$1", [username], function(err, result) {
            done(err);
            if(err) {
                res.send(err);
                return console.error('error running query', err);
            }
            
             if( result && result.rows){
                res.send(result.rows);
             }            
        });
    });
});

app.post('/myevents/getSubscribers', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var eventid = req.body.eventid;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("SELECT * FROM event_to_user WHERE eventid=$1", [eventid], function(err, result) {
            done(err);
            if(err) {
                res.send(err);
                return console.error('error running query', err);
            }
            
             if( result && result.rows){
                res.send(result.rows);
             }            
        });
    });
});

app.post('/otherevents/get', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var username = req.body.username;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("SELECT * FROM event WHERE NOT owner=$1", [username], function(err, result) {
            done(err);
            if(err) {
                res.send(err);
                return console.error('error running query', err);
            }
            
             if( result && result.rows){
                res.send(result.rows);
             }            
        });
    });
});

app.post('/event/get', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var id = req.body.id;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("SELECT * FROM event WHERE eventid=$1", [id], function(err, result) {
            done(err);
            if(err) {
                res.send(err);
                return console.error('error running query', err);
            }
            
             if( result && result.rows){
                res.send(result.rows);
             }            
        });
    });
});

app.post('/event/create', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var owner = req.body.owner;
    var eventtype = req.body.eventtype;
    var eventname = req.body.eventname;
    var publicity = req.body.publicity;
    var info = req.body.info;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("INSERT INTO event (owner, eventtype, eventname, publicity, info) VALUES ($1, $2, $3, $4, $5)", [owner, eventtype, eventname, publicity, info], function(err, result) {
            done(err);
            if(err) {
                res.send('23505');
                return console.error('error running query', err);
            }
            res.send("yes")
        });
    });
});

app.post('/event/edit', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var eventtype = req.body.eventtype;
    var eventname = req.body.eventname;
    var publicity = req.body.publicity;
    var info = req.body.info;
    var eventid = req.body.eventid;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("UPDATE event SET eventtype=$1, eventname=$2, publicity=$3, info=$4 WHERE eventid=$5", [eventtype, eventname, publicity, info, eventid], function(err, result) {
            done(err);
            if(err) {
                res.send('23505');
                return console.error('error running query', err);
            }
            res.send("SUCCESS")
        });
    });
});

app.post('/event/addAttendence', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var attendee = req.body.user;
    var eventid = req.body.eventid;
    var status = req.body.attention;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("INSERT INTO event_to_user (eventid, username, status) VALUES ($1, $2, $3)", [eventid, attendee, status], function(err, result) {
            done(err);
            if(err) {
                res.send('23505');
                return console.error('error running query', err);
            }
            res.send("SUCCESS");
        });
    });
});

app.post('/event/changeAttendenceStatus', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var username = req.body.username;
    var eventid = req.body.eventid;
    var status = req.body.status;
    
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("UPDATE event_to_user SET status=$1 WHERE eventid=$2 AND username=$3", [status, eventid, username], function(err, result) {
            done(err);
            if(err) {
                res.send(err);
                return console.error('error running query', err);
            }
            res.send("SUCCESS");
        });
    });
});

app.post('/event/cancelAttendence', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var attendee = req.body.user;
    var eventid = req.body.eventid;

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("DELETE FROM event_to_user WHERE eventid=$1 AND username=$2", [eventid, attendee], function(err, result) {
            done(err);
            if(err) {
                res.send(err);
                return console.error('error running query', err);
            }
            res.send("SUCCESS");
        });
    });
});

app.post('/sendMail', function(req, res) {
    sess = req.session;
    sess.username = req.body.user;

    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var text = req.body.text;
    var html = req.body.html;

    sendMail(from, to, subject, text, html);
});

app.get('/logout', function(req,res){

    req.session.destroy(function(err){
        if(err){
            console.log("sess destroy error: "+err);
        }else{
            res.redirect('/');
        }
    });
});
/*Reloading problem with ajs2
  */
app.get('/*',  function(req, res, next) {
    console.log("Reloading");
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
    /* res.redirect("/");*/
});
