var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var io = require('socket.io')(server,{log:false});
var pg = require('pg');
var twit = require('twitter');

var config = {
  user: 'xazz', //env var: PGUSER
  database: 'salvation', //env var: PGDATABASE
  password: '1234', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query("SELECT * from users WHERE username='xazz'", function(err, result) {
    done(err);
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0]);
  });
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

var twitter = new twit({
  consumer_key: process.env.ckey || 'e4wdzm8t8C3tH3H1YbgJAM7kE',
  consumer_secret: process.env.csecret || 'MekcLxkwYEAPcOw7XYvFlDt2SybVzy1qKCN8DPHb6N7YxOFwNx',
  access_token_key: process.env.atkey || '4437543435-Il2uLSiA2XugwWAwUg2FNdmqLtpFFfL376lC1pU',
  access_token_secret: process.env.atsecret || 'slSzGb6ssq02nmo6H8fqQVjBOs1lbjt6VrMYatvpfVdnE'
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

    console.log('Checking db for username = '+username+' and password = '+password);

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password], function(err, result) {
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
        
        client.query("SELECT * FROM events WHERE owner=$1", [username], function(err, result) {
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
        
        client.query("SELECT * FROM events WHERE NOT owner=$1", [username], function(err, result) {
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

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("INSERT INTO events (owner, eventtype, eventname, publicity) VALUES ($1, $2, $3, $4)", [owner, eventtype, eventname, publicity], function(err, result) {
            done(err);
            if(err) {
                res.send('23505');
                return console.error('error running query', err);
            }
            console.log(result);
            res.send("yes")
        });
    });
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
