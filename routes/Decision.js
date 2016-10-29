var express = require('express');
var decision = express.Router();
module.exports = decision;

require('../aux')();


//Decision
//OBTERNER LISTA
decision.get('/',autenticaBasic,function(req,res){

    connect().query('select * from Decision', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No tiene Decisiones',3))
    }else{
      res.status(200).send(Hipermedia(rows,3))
    }
  });
});

decision.get('/:id',autenticaBasic,function(req,res){

var id = req.params.id;
  
    connect().query('select * from Decision where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No existe la Decision',3))
    }else{
      res.status(200).send(Hipermedia(rows,3))
    }
  });
});

decision.get('/tema/:tema',autenticaBasic,function(req,res){

var tema = req.params.tema;
  
    connect().query('select * from Decision where tema=\''+tema+'\'', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No existen decisiones para esta decision;',3));
    }else{
      res.status(200).send(Hipermedia(rows,3));
    }
  });
});

//REGISTRAR
decision.post('/registrar',autenticaBasic,function(req,res){
  var tema = req.body.tema;
  var descripcion = req.body.descripcion;
  try{
      connect().query('insert into Decision (tema,descripcion) values (\''+tema+'\',\''+descripcion+'\');', function(err, rows, fields) { 
      res.status(200).send(Hipermedia('Decision Registrada',3 ));
      })
  }catch(Ex){
      res.status(401).send(Hipermedia(Ex,3));
  }
});


//BORRAR
decision.delete('/borrar/:id',autenticaBasic,function(req,res){
  var iduser = req.params.id;
  connect().query('delete from Decision where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Decision no Borrada',3));
    }else{
      res.status(200).send(Hipermedia('Decision id:'+ iduser+' Borrado',3));
    }
  });
});

//MOFICAR
decision.put('/modificar/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  //var tema = req.body.titulo; no tiene sentido cambiarla de tema
  var descripcion = req.body.descripcion;

  connect().query('UPDATE Decision SET descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Decision no modificado',3));
    }else{
      res.status(200).send(Hipermedia('Decision modificado',3));
    }
  });
});
