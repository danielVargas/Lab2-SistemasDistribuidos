var port = 3000;

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

//Devuelve el N tweet
app.get('/tweet/:number', function(req, res){
	var collec = ['tweetList'];
	var db = require("mongojs").connect(databaseUrl, collec);
	var collection = db.collection('tweetList');

	collection.count(function(error, numTweet) {
    	if(error) res.send('Error connection')
    	if(req.params.number >= numTweet){
    		res.send('Error length');
    	} else {
    		collection.find().skip(parseInt(req.params.number)).limit(1).toArray(function(e, results){
			    if (e) res.send('Error');
			    res.send('{"tweet":"'+results[0].tweet+'"}');
				db.close();
		  	})
    	}
	});
});

//Devuelve la cantidad de tweet que se poseen en la base de datos
app.get('/tweetCount/', function(req, res){
	//console.log('tweetClassifier');
	var collec = ['tweetList'];
	var db = require("mongojs").connect(databaseUrl, collec);
	var collection = db.collection('tweetList');

	collection.count(function(error, countTweet) {
    	if(error) res.send('Error connection');
    	//console.log(numTweet);
    	res.send('{"countTweet":"'+countTweet+'"}');
	});
});

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
