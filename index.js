var express = require('express');
var bodyParser = require('body-parser');
require('./aux')();

var app = express();
app.use(bodyParser());

//documentation build
//documentation serve
//http://localhost:4001/

//RUTAS de ARCHIVOS 
var usuarios = require('./routes/Usuario')
app.use('/usuarios',usuarios)

var problemas = require('./routes/Problema')
app.use('/problemas',problemas)

var preguntas = require('./routes/Pregunta')
app.use('/preguntas',preguntas)

var solucion = require('./routes/Solucion')
app.use('/solucion',solucion)

app.get('/deletebd',autenticaBasic,function(req,res){
    connect().query('CALL vaciar();', function(err, rows, fields) {
    	res.status(200).send("Base de datos Respuesta a 0 y rellenada")
    });
});

//PUERTO
app.listen(process.env.PORT || 5000, function(){
    console.log('Express en el puerto 5000');
})

