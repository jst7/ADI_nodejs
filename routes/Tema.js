var express = require('express');
var tema = express.Router();
module.exports = tema;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mads',
  database : 'ADI_Prac'
});

//TEMA
//OBTERNER LISTA
tema.get('/',function(req,res){

var login = req.params.id;
    connection.query('select * from Tema', function(err, rows, fields) {
    if (err){
      res.status(500).send('No tiene Temas');
    }else{
      res.status(200).send(rows);
    }
  });
});

//OBTENER TEMA POR ID
tema.get('/:id',function(req,res){

var id = req.params.id;
  
    connection.query('select * from Tema where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send('No existe el Tema');
    }else{
      res.status(200).send(rows);
    }
  });
});

//OBTENER TEMA POR USER EMAIL
tema.get('/usuario/:nombre',function(req,res){

var nombre = req.params.nombre;
  
    connection.query('select * from Tema where usuario=\''+nombre+'\'', function(err, rows, fields) {
    if (err){
      res.status(500).send('El usuario no tiene Temas');
    }else{
      res.status(200).send(rows);
    }
  });
});

//REGISTRAR
tema.post('/registrar',function(req,res){
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
tema.delete('/borrar/:id',function(req,res){
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
tema.put('/modificar/:id',function(req,res){
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