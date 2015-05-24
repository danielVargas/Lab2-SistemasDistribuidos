var port = 3000;

var express = require('express')
  , app = module.exports = express()
  , cors = require('cors')
  , http = require('http')
  , server = http.createServer(app)
  , bodyParser = require('body-parser');
  server.listen(port);

var array1;
var array2;
var array3;
var array4;
var array5;
var arregloFinalOrdenado;
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





app.use(bodyParser.json())
app.post('/part/:number', function(request, response, next){
	
	console.log("Se ha recibido desde: " + request.params.number);


	if(request.params.number == '7'){
		array1 =JSON.stringify(request.body);
		array1 = array1.replace("[", "");
		array1 = array1.replace("]", "");
		array1 = array1.split(",");
		console.log(array1);
	}
	else if(request.params.number == '8'){
		array2 =JSON.stringify(request.body);

		array2 = array2.replace("{", "");
		array2 = array2.replace("}", "");

		array2 = array2.replace('"user":"', "");
		array2 = array2.replace('"', "");
		
		array2 = array2.split("','");
		
		console.log(array2);
	}
	else if(request.params.number == '9'){
		array3 =JSON.stringify(request.body);
		array3 = array3.replace("[", "");
		array3 = array3.replace("]", "");
		array3 = array3.split(",");
		
		console.log(array3);
	}
	else if(request.params.number == '6'){
		array4 =JSON.stringify(request.body);
		array4 = array4.replace("[", "");
		array4 = array4.replace("]", "");
		
		array4 = array4.replace(new RegExp('{', 'g'), "");
		array4 = array4.replace(new RegExp('"mpn":', 'g'), "");
		array4 = array4.replace(new RegExp('}', 'g'), "");
		
		array4 = array4.split(",");
		
		console.log(array4);
	}
	else if(request.params.number == '10'){
		array5 =JSON.stringify(request.body);
		array5 = array5.replace('{"username":"', "");
		array5 = array5.replace('"}', "");
		array5 = array5.replace(new RegExp(' ', 'g'), "");
		array5 = array5.split(",");
		console.log(array5);

	}

	console.log("Arreglos que han llegado: ");
	
	if(array1){
		console.log(array1);
  
	}
	if(array2){
		console.log(array2);
	}
	if(array3){
		console.log(array3);

	}
	if(array4){
		console.log(array4);

	}
	if(array5){
		console.log(array5);

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










app.get('/cargarIn', function(req, res) {
	
	var llego1 = false;
	var llego2 = false;
	var llego3 = false;
	var llego4 = false;
	var llego5 = false;
	var texto1 = "Llego";
	var texto2 = "Llego";
	var texto3 = "Llego";
	var texto4 = "Llego";
	var texto5 = "Llego";	
	if (typeof array1 == 'undefined'){
		texto1= "No ha llegado";
		
	}
	else{
		llego1 = true;
	}
	if (typeof array2 == 'undefined'){
		texto2= "No ha llegado";
		
	}
	else{
		llego2 = true;
	}
	if (typeof array3 == 'undefined'){
		texto3= "No ha llegado";
		
	}
	else{
		llego3 = true;
	}
	if (typeof array4 == 'undefined'){
		texto4= "No ha llegado";
		
	}
	else{
		llego4 = true;
	}
	if (typeof array5 == 'undefined'){
		texto5= "No ha llegado";
		
	}
	else{
		llego5 = true;
	}
	if(!llego1 || !llego2 || !llego3 || !llego4 || !llego5){
		res.send('<div class="container"><div class="well"> Arreglos que han llegado: '+"<br>"+
			texto1 +"<br>"+
			texto2 +"<br>"+
			texto3 +"<br>"+
			texto4 +"<br>"+
			texto5 +"<br>"+
			'</div></div>'
			);
	}
	else{
/*
[29.094890826899263,30.520374012395287,35.902100519835685,36.93476609915795,73.44801808098757,74.44023841026755,84.53517662988547,88.5016055227592]

{"user":"7.3181068096896045','11.342283915289643','27.59988393105839','35.902100519835685','53.234176066084444','63.06243156715749','73.44801808098757','74.44023841026755"}

[7.3181068096896,9.8718523838368,20.01892736536,21.494267146598,27.599883931058,29.659072300199,53.234176066084,72.188707100229]

[{"mpn":20.018927365359765},{"mpn":29.6590723001989},{"mpn":32.97180850740568},{"mpn":37.74439214488699},{"mpn":40.38937641729107},{"mpn":71.92255590405884},{"mpn":72.18870710022878},{"mpn":77.42331705823092}]

{"username":"27.92539846489678, 29.211563718798455, 32.97180850740568, 37.74439214488699, 56.06971818528605, 56.06971818528605, 59.508501335874925, 71.92255590405884, 85.80149165795424"}

[29.094890826899263,30.520374012395287,35.902100519835685,36.93476609915795,73.44801808098757,74.44023841026755,84.53517662988547,88.5016055227592]
*/
		arregloFinalOrdenado = array1.concat(array2,array3,array4,array5);
		for (var i = 0; i < arregloFinalOrdenado.length; i++) {
			arregloFinalOrdenado[i] = parseFloat(arregloFinalOrdenado[i]);
		};
		
		arregloFinalOrdenado = mergeSort(arregloFinalOrdenado);
		console.log(arregloFinalOrdenado);

		for (var i = 0; i < arregloFinalOrdenado.length; i++) {
			arregloFinalOrdenado[i] =  " " +arregloFinalOrdenado[i].toString()+ "<br>";
		
		};
		res.send("El resultado es:" + "<br>" + arregloFinalOrdenado);
	}
});


// ref: http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
function mergeSort(arr)
{
    if (arr.length < 2)
        return arr;
 
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);
 
    return merge(mergeSort(left), mergeSort(right));
};
 
function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
};
 