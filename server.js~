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
	
	var text = req.body.tweet;
	console.log(text);
	var fs = require('fs');
	fs.exists(text, function(exists) { 
		if (exists) {
			fs.readFile(text, 'utf8', function(err, data) {
			    if( err ){
				console.log(err)
			    }
			    else{
				res.send(data);
			    }
			});
	
		} 
		else{
			res.send("El archivo no existe.");		
		}
	});
	

});
