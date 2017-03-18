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

var pool = {};/*new pg.Pool(config);

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
});*/

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
var Routes = require('./routes.js');
var r = new Routes(app, io, pool, twitter);
