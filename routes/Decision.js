var express = require('express');
var decision = express.Router();
module.exports = decision;

require('../aux')();


//Decision
//OBTERNER LISTA
  /**
  * Este funcion es para obtener todas las decisiones con su tema
  * @name Obtener_lista_decisiones
  * @param {res} resultado de la consulta a la bd
  * @example /decision
  * @return {resultado consulta}
  */
decision.get('/',autenticaBasic,function(req,res){

    connect().query('select * from Decision', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No tiene Decisiones',3))
    }else{
      res.status(200).send(Hipermedia(rows,3))
    }
  });
});

  /**
  * Este funcion es para obtener una decision por id con su tema
  * @name Obtener_decision_id
  * @param {res} resultado de la consulta a la bd
  * @example /decision/id
  * @return {resultado consulta}
  */
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

  /**
  * Este funcion es para obtener el tema de una decision
  * @name Obtener_tema_decision
  * @param {res} resultado de la consulta a la bd
  * @example /decision/tema/id
  * @return {resultado consulta}
  */
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


  /**
  * Este funcion es para obtener el usuario de una decision
  * @name Obtener_tema_decision
  * @param {res} resultado de la consulta a la bd
  * @example /decision/tema/id
  * @return {resultado consulta}
  */
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

  /**
  * Este funcion es para registrar una decision
  * @name Registrar_decision
  * @param {res} resultado de la consulta a la bd
  * @example /decision/registrar (POST con (tema, descripcion))
  * @return {resultado consulta}
  */
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

  /**
  * Este funcion es para borrar una decision
  * @name Borrar_decision
  * @param {res} resultado de la consulta a la bd
  * @example /decision/borrar/id (DELETE)
  * @return {resultado consulta}
  */
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

  /**
  * Este funcion es para modificar una decision
  * @name Modififcar_decision
  * @param {res} resultado de la consulta a la bd
  * @example /decision/modificar/id (PUT con (descripcion))
  * @return {resultado consulta}
  */
//MODIFICAR
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
