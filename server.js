﻿var port = 3000;

var express = require('express')
  , app = module.exports = express()
  , cors = require('cors')
  , http = require('http')
  , server = http.createServer(app)
  , bodyParser = require('body-parser');
  server.listen(port);

var databaseUrl = "TSD"; //Name db MongoDB

//Usado para Routing
app.use("/function", express.static(__dirname + '/function'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/css/", express.static(__dirname + '/css/'));
app.use("/fonts/", express.static(__dirname + '/fonts/'));
app.use("/", express.static(__dirname + '/view/'));
app.use("/", express.static(__dirname + '/'));
//Usado para realizar el Post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log('Web Services Online in Port ' + port);



//Routing view
app.get('/', function(req, res){
	res.redirect("/view/index.html");
});

app.get("/cargarInput", function(req, res){

	var fs = require('fs');
	fs.readFile('./input.txt', 'utf8', function(err, data) {
	    if( err ){
		console.log(err)
	    }
	    else{
		res.send(data);
	    }
	});
});

// EJEMLPO POST

//Guardar un tweet en base a un método POST
app.post('/send', function(req, res){
	console.log('Send Post');
	var collec = ['tweetList'];
	var db = require("mongojs").connect(databaseUrl, collec);

	var text = req.body.tweet;

	//Submit a la DB
    db.tweetList.save(
    	{
    		tweet: text
    	}, function(err, saved) {
		  if( err || !saved ){
		  	console.log("Tweet don't save");
		  	res.redirect("/");
		  } else {
		  	console.log("Tweet save");
		  	res.redirect("/");
		  }
	});
});