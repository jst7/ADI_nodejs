var express = require('express');
var bodyParser = require('body-parser');
var mysql   = require('mysql');


var app = express();
app.use(bodyParser());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1008',
  database : 'ADI_Prac'
});


//USUARIOS CRUD

//OBTERNER LISTA
app.get('/usuarios',function(req,res){

    connection.query('select * from Usuario', function(err, rows, fields) {
    if (err){
      res.status(500).send('No tiene Usuario');
    }else{
      res.status(200).send(rows);
    }
  });
});

app.get('/usuarios/:id',function(req,res){

var id = req.params.id;
  
    connection.query('select * from Usuario where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send('No existe el usuario');
    }else{
      res.status(200).send(rows);
    }
  });
});


//REGISTRAR
app.post('/usuarios/registrar',function(req,res){
  var nombre = req.body.nombre;
  var passSinBase = req.body.contraseña;
  var email = req.body.email;

  var pass = new Buffer(passSinBase).toString('base64');

  try{
      connection.query('insert into Usuario (nombre,contraseña,email) values (\''+nombre+'\',\''+pass+'\',\''+email+'\');', function(err, rows, fields) { 
      res.status(200).send('Usuario Registrado ' );
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});


//BORRAR
app.delete('/usuarios/borrar/:id',function(req,res){
  var iduser = req.params.id;
  connection.query('delete from Usuario where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send('Usuario no Borrado');
    }else{
      res.status(200).send('Usuario id:'+ iduser+' Borrado');
    }
  });
});

//AUTENTIFICAR
app.post('/usuarios/autentificar',function(req,res){

  var passSinBase = req.body.contraseña;
  var email = req.body.email;

  var pass = new Buffer(passSinBase).toString('base64');

  try{
      connection.query('select contraseña, email from Usuario where contraseña=\''+pass+'\'and email=\''+email+'\'', function(err, rows, fields) { 

      if(rows.length==1){
        res.status(200).send('Usuario Autentificado ' );
      }else{
        res.status(200).send('Usuario NO Autentificado ' );
      }      
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});


//MOFICAR
app.put('/usuarios/modificar/:id',function(req,res){
  var id = req.params.id;
  var nombre = req.body.nombre;
  var contraseña = req.body.contraseña;
  var email = req.body.email;

  connection.query('UPDATE Usuario SET nombre=\''+nombre+'\', contraseña=\''+contraseña+'\',email=\''+email+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send('Usuario no modificado');
    }else{
      res.status(200).send('Usuario modificado');
    }
  });
});

//TEMA
//OBTERNER LISTA
app.get('/temas',function(req,res){

var login = req.params.id;
    connection.query('select * from Tema', function(err, rows, fields) {
    if (err){
      res.status(500).send('No tiene Temas');
    }else{
      res.status(200).send(rows);
    }
  });
});

app.get('/temas/:id',function(req,res){

var id = req.params.id;
  
    connection.query('select * from Tema where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send('No existe el Tema');
    }else{
      res.status(200).send(rows);
    }
  });
});

//REGISTRAR
app.post('/temas/registrar',function(req,res){
  var usuario = req.body.usuario;
  var titulo = req.body.titulo;
  var descripcion = req.body.descripcion;
  try{
      connection.query('insert into Tema (usuario,titulo,descripcion) values (\''+usuario+'\',\''+titulo+'\',\''+descripcion+'\');', function(err, rows, fields) { 
      res.status(200).send('Tema Registrado ' );
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});


//BORRAR
app.delete('/temas/borrar/:id',function(req,res){
  var iduser = req.params.id;
  connection.query('delete from Tema where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send('Tema no Borrado');
    }else{
      res.status(200).send('Tema id:'+ iduser+' Borrado');
    }
  });
});

//MOFICAR
app.put('/temas/modificar/:id',function(req,res){
  var id = req.params.id;
  //var usuario = req.body.usuario; No tiene sentido modificar el usuario
  var titulo = req.body.titulo;
  var descripcion = req.body.descripcion;

  connection.query('UPDATE Tema SET titulo=\''+titulo+'\', descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send('Tema no modificado');
    }else{
      res.status(200).send('Tema modificado');
    }
  });
});

//Decision
//OBTERNER LISTA
app.get('/decision',function(req,res){

var login = req.params.id;
    connection.query('select * from Decision', function(err, rows, fields) {
    if (err){
      res.status(500).send('No tiene Decisiones');
    }else{
      res.status(200).send(rows);
    }
  });
});

app.get('/decision/:id',function(req,res){

var id = req.params.id;
  
    connection.query('select * from Decision where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send('No existe la Decision');
    }else{
      res.status(200).send(rows);
    }
  });
});

//REGISTRAR
app.post('/decision/registrar',function(req,res){
  var tema = req.body.tema;
  var descripcion = req.body.descripcion;
  try{
      connection.query('insert into Decision (tema,descripcion) values (\''+tema+'\',\''+descripcion+'\');', function(err, rows, fields) { 
      res.status(200).send('Decision Registrada' );
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});


//BORRAR
app.delete('/decision/borrar/:id',function(req,res){
  var iduser = req.params.id;
  connection.query('delete from Decision where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send('Decision no Borrada');
    }else{
      res.status(200).send('Decision id:'+ iduser+' Borrado');
    }
  });
});

//MOFICAR
app.put('/decision/modificar/:id',function(req,res){
  var id = req.params.id;
  //var tema = req.body.titulo; no tiene sentido cambiarla de tema
  var descripcion = req.body.descripcion;

  connection.query('UPDATE Decision SET descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send('Decision no modificado');
    }else{
      res.status(200).send('Decision modificado');
    }
  });
});

/*
PRUEBAS
*/
app.get('/prueba',function(req,res){


  res.status(200).send('Prueba Ejecutada');

});



//PUERTO
app.listen(process.env.PORT || 5000, function(){
    console.log('Express en el puerto 5000');
})

