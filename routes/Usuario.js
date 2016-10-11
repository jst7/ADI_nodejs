var express = require('express');
var usuario = express.Router();
module.exports = usuario;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mads',
  database : 'ADI_Prac'
});

//USUARIOS CRUD

//OBTERNER LISTA
usuario.get('/',function(req,res){

    connection.query('select * from Usuario', function(err, rows, fields) {
    if (err){
      res.status(500).send('No tiene Usuario');
    }else{
      res.status(200).send(rows);
    }
  });
});

usuario.get('/:id',function(req,res){

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
usuario.post('/registrar',function(req,res){
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
usuario.delete('/borrar/:id',function(req,res){
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
usuario.post('/autentificar',function(req,res){

  var passSinBase = req.body.contraseña;
  var nombre = req.body.nombre;

  var pass = new Buffer(passSinBase).toString('base64');

  try{
      connection.query('select contraseña, email from Usuario where contraseña=\''+pass+'\'and email=\''+nombre+'\'', function(err, rows, fields) { 

      if(rows.length==1){
        res.status(200).send('Usuario Autentificado');
      }else{
        res.status(200).send('Usuario NO Autentificado');
      }      
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});


//MOFICAR
usuario.put('/modificar/:id',function(req,res){
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