var express = require('express');
var tema = express.Router();
module.exports = tema;

require('../aux')();

//TEMA
//OBTERNER LISTA
tema.get('/',autenticaBasic,function(req,res){

var login = req.params.id;
    connect().query('select * from Tema', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No tiene Temas',2));
    }else{
      res.status(200).send(Hipermedia(rows,2));
    }
  });
});

//OBTENER TEMA POR ID
tema.get('/:id',autenticaBasic,function(req,res){

var id = req.params.id;
  
    connect().query('select * from Tema where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No existe el Tema',2));
    }else{
      res.status(200).send(Hipermedia(rows,2));
    }
  });
});

//OBTENER TEMA POR USER EMAIL
tema.get('/usuario/:nombre',autenticaBasic,function(req,res){

var nombre = req.params.nombre;
  
    connect().query('select * from Tema where usuario=\''+nombre+'\'', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('El usuario no tiene Temas',2));
    }else{
      res.status(200).send(Hipermedia(rows,2));
    }
  });
});

//REGISTRAR
tema.post('/registrar',autenticaBasic,function(req,res){
  var usuario = req.body.usuario;
  var titulo = req.body.titulo;
  var descripcion = req.body.descripcion;
  try{
      connect().query('insert into Tema (usuario,titulo,descripcion) values (\''+usuario+'\',\''+titulo+'\',\''+descripcion+'\');', function(err, rows, fields) { 
      res.status(200).send(Hipermedia('Tema Registrado ',2 ));
      })
  }catch(Ex){
      res.status(401).send(Hipermedia(Ex,2));
  }
});


//BORRAR
tema.delete('/borrar/:id',autenticaBasic,function(req,res){
  var iduser = req.params.id;
  connect().query('delete from Tema where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Tema no Borrado',2));
    }else{
      res.status(200).send(Hipermedia('Tema id:'+ iduser+' Borrado',2));
    }
  });
});

//MOFICAR
tema.put('/modificar/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  //var usuario = req.body.usuario; No tiene sentido modificar el usuario
  var titulo = req.body.titulo;
  var descripcion = req.body.descripcion;

  connect().query('UPDATE Tema SET titulo=\''+titulo+'\', descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Tema no modificado',2));
    }else{
      res.status(200).send(Hipermedia('Tema modificado',2));
    }
  });
});
