var express = require('express');
var pregunta = express.Router();
module.exports = pregunta;

require('../aux')();


//pregunta
//OBTERNER LISTA
  /**
  * Este funcion es para obtener todas las Preguntas con su problema pero no soluciones
  * @name Obtener_lista_Preguntas
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta?pagina=1
  * @return {resultado consulta}
  */
pregunta.get('/',autenticaBasic,function(req,res){

  ultimaPosicion('Pregunta', function(err, total){
    var testo = paginacion(req,itemPorPagina)
    var consulta = 'select * from Pregunta' + testo

    var paginas = paginas_paginacion("pregunta/",req.query.pagina,total)
    connect().query(consulta, function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(500).send(Hipermedia('No tiene Preguntas',3))
    }else{
      res.status(200).send(Hipermedia([rows,paginas],3))
    }
  });
  });
});

  /**
  * Este funcion es para obtener una pregunta por id con su problema sin sus soluciones
  * @name Obtener_pregunta_id
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/id
  * @return {resultado consulta}
  */
pregunta.get('/:id',autenticaBasic,function(req,res){

var id = req.params.id;
  
    connect().query('select * from Pregunta where id='+id+'', function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(400).send(Hipermedia('No existe la pregunta',3))
    }else{
      res.status(200).send(Hipermedia(rows,3))
    }
  });
});

  /**
  * Este funcion es para obtener las preguntas de un rpoblema
  * @name Obtener_Problemas_Pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/problema/:problema
  * @return {resultado consulta}
  */
pregunta.get('/problema/:problema',autenticaBasic,function(req,res){

var problema = req.params.problema;
  
    connect().query('select * from Pregunta where problema=\''+problema+'\'', function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(500).send(Hipermedia('No existen Preguntas para ese problema;',3));
    }else{
      res.status(200).send(Hipermedia(rows,3));
    }
  });
});

  /**
  * Este funcion es para registrar una pregunta
  * @name Registrar_pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta (POST con (problema, tema, descripcion))
  * @return {resultado consulta}
  */
//REGISTRAR
pregunta.post('/',autenticaBasic,function(req,res){
  var problema = req.body.problema;
  var descripcion = req.body.descripcion;
  var usuario =req.body.usuario;
  try{
      connect().query('insert into Pregunta (problema,descripcion,usuario) values (\''+problema+'\',\''+descripcion+'\',\''+usuario+'\');', function(err, rows, fields) { 
      res.status(200).send(Hipermedia('pregunta Registrada',3 ));
      })
  }catch(Ex){
      res.status(401).send(Hipermedia(Ex,3));
  }
});

  /**
  * Este funcion es para borrar una pregunta
  * @name Borrar_pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/id (DELETE)
  * @return {resultado consulta}
  */
//BORRAR
pregunta.delete('/:id',autenticaBasic,function(req,res){
  var iduser = req.params.id;
  connect().query('delete from Pregunta where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('pregunta no Borrada',3));
    }else{
      res.status(200).send(Hipermedia('pregunta id:'+ iduser+' Borrado',3));
    }
  });
});

  /**
  * Este funcion es para modificar una pregunta
  * @name Modificar_pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/modificar/id (PUT con (descripcion))
  * @return {resultado consulta}
  */
//MODIFICAR
pregunta.put('/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  //var tema = req.body.titulo; no tiene sentido cambiarla de tema
  var descripcion = req.body.descripcion;

  connect().query('UPDATE Pregunta SET descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('pregunta no modificado',3));
    }else{
      res.status(200).send(Hipermedia('pregunta modificado',3));
    }
  });
});
