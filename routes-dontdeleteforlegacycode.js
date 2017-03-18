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
