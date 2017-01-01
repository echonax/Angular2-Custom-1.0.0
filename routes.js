module.exports = function(app, io, pool, twitter){

    var sess;


/*    app.get('/', function(req, res) {
        sess = req.session;
        if(sess.username){
            res.redirect('/main');
        }else{
            res.render('main.html');
        }
    });*/

var currentTopo = {};
var currentTopoString = "";

    io.on('connection', function(socket){
        console.log("Server connection.io");
        socket.emit('news',"WebSocket connection opened");
    });

    io.on('disconnect', function(socket){
        console.log("client dcd");
    });

<<<<<<< HEAD
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
=======
    app.get('/stream/snow', (req, res, next) => {
        console.log(1);
        const searchTerm = "snow";
        //io.emit('tweet', {created_at: new Date(), username:"can"});
        twitter.stream('statuses/filter', {track: searchTerm}, (stream) => {
            stream.on('data', (data) => {
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

            stream.on('error', (error) => {
                throw error;
            });
>>>>>>> origin/master
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

    app.post('/topology', function(req,res){
        console.log("new topology arrived to the server");
        currentTopo = req.body;
        io.emit('topology',currentTopo);
        return res.sendStatus(200);
    });

    app.get('/getTopology', function(req,res){
        console.log("topology get requested");
        io.emit('topology',currentTopo);
        return res.sendStatus(200);
    });

    app.get('/test', function(req,res){
       return res.send("hey");
    });


    //app.get('/main', function(req, res) {
    //    sess = req.session;
    //    console.log("inside get main")
    //    if(sess.username){
    //        res.sendFile(__dirname +'/client/main.html');
    //    }else{
    //        //this can be replaced with a page
    //        res.write('<h1>Please login first.</h1>');
    //        res.end('<a href='+'/'+'>Login</a>');
    //    }
    //});

   /* app.get('/myTest', function(req, res) {
        console.log("inside get myTest")
            res.sendFile(__dirname +'/client/unit-tests.html');
    });*/


    app.post('/login', function(req, res) {
        res.send("yes");
        return true;
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
            client.query("SELECT * FROM users WHERE username='" + user_name + "'", function(err, result) {
                done();
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


    app.get('/logout',function(req,res){

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


    //text file set get
    /*var fs = require('fs');
    var path = require('path');

    var filePath = path.join(__dirname, 'db.txt');

    fs.writeFile(filePath, "Hey there2!", function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
        console.log('received data: ' + data);
        }else{
            console.log(err);
        }

    });*/

    
    app.get('/getUser', function(req, res){


    });
}
