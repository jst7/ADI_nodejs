var express = require('express');
var usuario = express.Router();
module.exports = usuario;
require('../aux')();

//USUARIOS CRUD

//OBTERNER LISTA
usuario.get('/',autenticaBasic,function(req,res){

    connect().query('select * from Usuario', function(err, rows, fields) {
      if (err){
        res.status(500).send(Hipermedia('No tiene Usuario',1))
      }else{
        res.status(200).send(Hipermedia(rows,1))
      }
  });
});

usuario.get('/:id',autenticaBasic,function(req,res){

  var id = req.params.id;
    
      connect().query('select * from Usuario where id='+id+'', function(err, rows, fields) {
        if (err){
          res.status(500).send(Hipermedia('No existe el usuario',1))
        }else{
          res.status(200).send(Hipermedia(rows,1))
      }
    });
});


//REGISTRAR
usuario.post('/registrar',autenticaBasic,function(req,res){
  var nombre = req.body.nombre;
  var passSinBase = req.body.contraseña;
  var email = req.body.email;

  var pass = new Buffer(passSinBase).toString('base64');

  try{
      connect().query('insert into Usuario (nombre,contraseña,email) values (\''+nombre+'\',\''+pass+'\',\''+email+'\');', function(err, rows, fields) { 
      res.status(200).send(Hipermedia('Usuario Registrado ',1 ))
      })
  }catch(Ex){
      res.status(401).send(Hipermedia(Ex,1));
  }
});


//BORRAR
usuario.delete('/borrar/:id',autenticaBasic,function(req,res){
  var iduser = req.params.id;
  connect().query('delete from Usuario where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Usuario no Borrado',1));
    }else{
      res.status(200).send(Hipermedia('Usuario id:'+ iduser+' Borrado',1));
    }
  });
});

//AUTENTIFICAR
usuario.post('/autentificar',autenticaBasic,function(req,res){

  var passSinBase = req.body.contraseña;
  var nombre = req.body.nombre;

  var pass = new Buffer(passSinBase).toString('base64');

  try{
      connect().query('select contraseña, email from Usuario where contraseña=\''+pass+'\'and email=\''+nombre+'\'', function(err, rows, fields) { 

      if(rows.length==1){
        res.status(200).send(Hipermedia('Usuario Autentificado',1));
      }else{
        res.status(200).send(Hipermedia('Usuario NO Autentificado',1));
      }      
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});


//MOFICAR
usuario.put('/modificar/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  var nombre = req.body.nombre;
  var contraseña = req.body.contraseña;
  var email = req.body.email;

  connect().query('UPDATE Usuario SET nombre=\''+nombre+'\', contraseña=\''+contraseña+'\',email=\''+email+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Usuario no modificado',1));
    }else{
            
      res.status(200).send(Hipermedia('Usuario modificado',1));
    }
  });
});

