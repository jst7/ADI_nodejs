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

var temas = require('./routes/Tema')
app.use('/temas',temas)

var decision = require('./routes/Decision')
app.use('/decision',decision)

app.get('/deletebd',autenticaBasic,function(req,res){
    connect().query('CALL vaciar();', function(err, rows, fields) {
    	res.status(200).send("Base de datos eliminada")
    });
});

//PUERTO
app.listen(process.env.PORT || 5000, function(){
    console.log('Express en el puerto 5000');
})

