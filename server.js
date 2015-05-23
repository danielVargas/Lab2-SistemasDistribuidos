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

		var arraysToServers = new Array(5);
		var text = "input.txt";
		console.log(text);
		var arrayForServer;
		var datos;
		var fs = require('fs');
		fs.exists(text, function(exists) { 
			if (exists) {
				fs.readFile(text, 'utf8', function(err, data) {
				    if( err ){
					console.log(err)
				    }
				    else{
				   		
					    datos = data.split("\n");
					    var largoArray = datos.length;
					    datos.splice(largoArray-1,1);

					    var particion = Math.floor(largoArray/5);
					    var diferencia = largoArray%5;

					    var iterador = 0;
					    for (var j = 0; j < 5; j++) {
					    	 arraysToServers[j] = new Array(particion);
					    	 for (var i = 0; i < particion; i++) {
					    			arraysToServers[j][i] = datos[parseInt( i )+ parseInt( iterador )];
					   		 };
		
					   		 iterador= iterador + 5;
					    };
					   
					   	for (var i = 0; i < diferencia; i++) {
					   		arraysToServers[4].push(datos[iterador + i]);
					   	};
					

					    console.log(largoArray);
					    console.log(particion);
					    console.log(diferencia);
					//	arrayForServer = JSON.stringify(datos);
				/*		var headers = {
						  'Content-Type': 'application/json',
						  'Content-Length': arrayForServer.length
						};*/

			
					    }

				});
		
			} 
			else{
				console.log("Error al cargar archivo, compruebe input.txt");
			}
		});




//Routing view
app.get('/', function(req, res){
	res.redirect("/view/index.html");
});

// EJEMLPO POST

//Guardar un tweet en base a un método POST

app.get('/part/:number', function(req, res){

			    var numero = req.params.number;
			    res.send(arraysToServers[numero-1]);
		

});











app.post('/cargarIn', function (req, res) {

		var text = req.body.nombre;
		console.log(text);

		var fs = require('fs');
		fs.exists(text, function(exists) { 
			if (exists) {
				fs.readFile(text, 'utf8', function(err, data) {
				    if( err ){
					console.log(err)
				    }
				    else{
				   		
					    var datos = data.split("\n");
					    var largoArray = datos.length;
					    datos.splice(largoArray-1,1);

					    var particion = Math.floor(largoArray/5);
					    var diferencia = largoArray%5;

						 var options = {
						    host: 'localhost',
						    port: 8088,
						 
						    method: 'POST',
						    headers: {
						      'Content-Type': 'application/x-www-form-urlencoded',
						      'Content-Length': Buffer.byteLength(data)
						    }
						  };
						  /*
						  var httpreq = http.request(options, function (response) {
						    response.setEncoding('utf8');
						    response.on('data', function (chunk) {
						      console.log("body: " + chunk);
						    });
						    response.on('end', function() {
						      res.send('ok');
						    })
						  });
						  console.log(data);
						  httpreq.write(data);
						  httpreq.end();*/

					    for (var i = 0; i < particion + diferencia; i++) {
					    	
					    };
					    console.log(largoArray);
					    console.log(particion);
					    console.log(diferencia);
						var arrayForServer = JSON.stringify(datos);
						var headers = {
						  'Content-Type': 'application/json',
						  'Content-Length': arrayForServer.length
						};

						res.send(arrayForServer);
					    }

				});
		
			} 
			else{
				res.send("El archivo no existe.");		
			}
		});

});

	app.listen(8080);

app.post('http://localhost:8088/', function(req, res){

	var text = req.body.nombre;
	console.log(text);
	var fs = require('fs');
	fs.exists(text, function(exists) { 
		if (exists) {
			fs.readFile(text, 'utf8', function(err, data) {
			    if( err ){
				console.log(err)
			    }
			    else{
			   		console.log(data);
				    var datos = data.split("\n");
				    var largoArray = datos.length;
				    datos.splice(largoArray-1,1);

				    var particion = Math.floor(largoArray/5);
				    var diferencia = largoArray%5;

				    for (var i = 0; i < particion + diferencia; i++) {
				    	
				    };
				    console.log(largoArray);
				    console.log(particion);
				    console.log(diferencia);
					var arrayForServer = JSON.stringify(datos);
					var headers = {
					  'Content-Type': 'application/json',
					  'Content-Length': arrayForServer.length
					};

					res.send(arrayForServer);
				    }

			});
	
		} 
		else{
			res.send("El archivo no existe.");		
		}
	});
	

});
