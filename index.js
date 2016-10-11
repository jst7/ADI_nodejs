var express = require('express');
var bodyParser = require('body-parser');
var mysql   = require('mysql');


var app = express();
app.use(bodyParser());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mads',
  database : 'ADI_Prac'
});

var usuarios = require('./routes/Usuario')
app.use('/usuarios',usuarios)

var temas = require('./routes/Tema')
app.use('/temas',temas)

var decision = require('./routes/Decision')
app.use('/decision',decision)

decision.get('/prueba',function(req,res){

    connection.query('select * from Decision', function(err, rows, fields) {
    if (err){
      res.status(500).send('Hola');
    }else{
     
      var fin = Hipermedia(rows,[{rel: "Prueba",
                                href: "miapi.com/prueba"},
                                {rel: "Prueba",
                                  href: "miapi.com/prueba"}])
      
      res.status(200).send(fin);
    }
  });  
});

function Hipermedia(sol,res){
  return [sol, res]
}

//PUERTO
app.listen(process.env.PORT || 5000, function(){
    console.log('Express en el puerto 5000');
})

