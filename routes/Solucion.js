var express = require('express');
var solucion = express.Router();
module.exports = solucion;

require('../aux')();


//pregunta
//OBTERNER LISTA
  /**
  * Este funcion es para obtener todas las soluciones con su pregunta
  * @name Obtener_lista_Soluciones
  * @param {res} resultado de la consulta a la bd
  * @example /solucion?pagina=1 (GET)
  * @return {resultado consulta}
  */
solucion.get('/',autenticaBasic,function(req,res){

  ultimaPosicion('solucion', function(err, total){
    var testo = paginacion(req,itemPorPagina)
    var consulta = 'select * from Soluciones' + testo

    var paginas = paginas_paginacion("solucion/",req.query.pagina,total)
    connect().query(consulta, function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No tiene Soluciones',4))
    }else{
      res.status(200).send(Hipermedia([rows,paginas],4))
    }
  });
  });
});


  /**
  * Este funcion es para obtener un Problema por id no saca las decisiones relacionadas
  * @name Obtener_Solucion_id
  * @param {res} resultado de la consulta a la bd
  * @example /solucion/id (GET)
  * @return {resultado consulta}
  */
//OBTENER Problema POR ID
solucion.get('/:id',autenticaBasic,function(req,res){

var id = req.params.id;
  
    connect().query('select * from Soluciones where id='+id+'', function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(500).send(Hipermedia('No existe la Solucion',4));
    }else{
      res.status(200).send(Hipermedia(rows,4));
    }
  });
});

  /**
  * Este funcion es para borrar una solucion
  * @name Borrar_solucion
  * @param {res} resultado de la consulta a la bd
  * @example /solucion/id (DELETE)
  * @return {resultado consulta}
  */
//BORRAR
solucion.delete('/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  connect().query('delete from Soluciones where id = \''+id+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('solucion no Borrado',4));
    }else{
      res.status(200).send(Hipermedia('solucion id:'+ id+' Borrado',4));
    }
  });
});

  /**
  * Este funcion es para modificar una solucion
  * @name Modififcar_solucion
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/modificar/id (PUT con (solucion))
  * @return {resultado consulta}
  */
//MODIFICAR
solucion.put('/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  //var tema = req.body.titulo; no tiene sentido cambiarla de tema
  var solucion = req.body.descripcion;

  connect().query('UPDATE Soluciones SET solucion=\''+solucion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Soluciones modificado',4));
    }else{
      res.status(200).send(Hipermedia('Solucion modificado',4));
    }
  });
});

  /**
  * Este funcion es para registrar un Problema
  * @name Registrar_solucion
  * @param {res} resultado de la consulta a la bd
  * @example /solucion (POST con (pregunta, solucion, usuario,votos))
  * @return {resultado consulta}
  */
//REGISTRAR
solucion.post('/',autenticaBasic,function(req,res){
  var pregunta = req.body.pregunta;
  var solucion = req.body.solucion;
  var usuario = req.body.usuario;
  var votos = req.body.votos;
  try{
      connect().query('insert into Soluciones (pregunta,solucion,usuario,votos) values (\''+pregunta+'\',\''+solucion+'\',\''+usuario+'\',\''+votos+'\');', function(err, rows, fields) { 
      res.status(200).send(Hipermedia('Solucion Registrada ',4 ));
      })
  }catch(Ex){
      res.status(401).send(Hipermedia(Ex,4));
  }
});

  /**
  * Este funcion es para obtener el tema de una solucion
  * @name Obtener_pregunta_problema_solucion
  * @param {res} resultado de la consulta a la bd
  * @example /solucion/:pregunta/:problema (GET)
  * @return {resultado consulta}
  */
solucion.get('/pregunta/:pregunta/:problema',autenticaBasic,function(req,res){

var pregunta = req.params.pregunta;
var problema = req.params.problema;
  
    connect().query('select * from Pregunta where descripcion=\''+pregunta+'\' and problema=\''+problema+'\'', function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(500).send(Hipermedia('No existen soluciones para esa pregunta;',4));
    }else{
      res.status(200).send(Hipermedia(rows,4));
    }
  });
});