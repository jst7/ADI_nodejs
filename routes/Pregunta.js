var express = require('express');
var pregunta = express.Router();
module.exports = pregunta;

require('../aux')();


//pregunta
//OBTERNER LISTA
  /**
  * Este funcion es para obtener todas las Preguntas con su tema
  * @name Obtener_lista_Preguntas
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta
  * @return {resultado consulta}
  */
pregunta.get('/',autenticaBasic,function(req,res){

  ultimaPosicion('pregunta', function(err, total){
    var testo = paginacion(req,itemPorPagina)
    var consulta = 'select * from pregunta' + testo

    var paginas = paginas_paginacion("pregunta/",req.query.pagina,total)
    connect().query(consulta, function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No tiene Preguntas',3))
    }else{
      res.status(200).send(Hipermedia([rows,paginas],3))
    }
  });
  });
});

  /**
  * Este funcion es para obtener una pregunta por id con su tema
  * @name Obtener_pregunta_id
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/id
  * @return {resultado consulta}
  */
pregunta.get('/:id',autenticaBasic,function(req,res){

var id = req.params.id;
  
    connect().query('select * from pregunta where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No existe la pregunta',3))
    }else{
      res.status(200).send(Hipermedia(rows,3))
    }
  });
});

  /**
  * Este funcion es para obtener el tema de una pregunta
  * @name Obtener_tema_pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/tema/id
  * @return {resultado consulta}
  */
pregunta.get('/tema/:tema',autenticaBasic,function(req,res){

var tema = req.params.tema;
  
    connect().query('select * from pregunta where tema=\''+tema+'\'', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No existen Preguntas para esta pregunta;',3));
    }else{
      res.status(200).send(Hipermedia(rows,3));
    }
  });
});


  /**
  * Este funcion es para obtener el usuario de una pregunta
  * @name Obtener_tema_pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/tema/id
  * @return {resultado consulta}
  */
pregunta.get('/tema/:tema',autenticaBasic,function(req,res){

var tema = req.params.tema;
  
    connect().query('select * from pregunta where tema=\''+tema+'\'', function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No existen Preguntas para esta pregunta;',3));
    }else{
      res.status(200).send(Hipermedia(rows,3));
    }
  });
});

  /**
  * Este funcion es para registrar una pregunta
  * @name Registrar_pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/registrar (POST con (tema, descripcion))
  * @return {resultado consulta}
  */
//REGISTRAR
pregunta.post('/registrar',autenticaBasic,function(req,res){
  var tema = req.body.tema;
  var descripcion = req.body.descripcion;
  var usuario =req.body.usuario;
  try{
      connect().query('insert into pregunta (tema,descripcion,usuario) values (\''+tema+'\',\''+descripcion+'\',\''+usuario+'\');', function(err, rows, fields) { 
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
  * @example /pregunta/borrar/id (DELETE)
  * @return {resultado consulta}
  */
//BORRAR
pregunta.delete('/borrar/:id',autenticaBasic,function(req,res){
  var iduser = req.params.id;
  connect().query('delete from pregunta where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('pregunta no Borrada',3));
    }else{
      res.status(200).send(Hipermedia('pregunta id:'+ iduser+' Borrado',3));
    }
  });
});

  /**
  * Este funcion es para modificar una pregunta
  * @name Modififcar_pregunta
  * @param {res} resultado de la consulta a la bd
  * @example /pregunta/modificar/id (PUT con (descripcion))
  * @return {resultado consulta}
  */
//MODIFICAR
pregunta.put('/modificar/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  //var tema = req.body.titulo; no tiene sentido cambiarla de tema
  var descripcion = req.body.descripcion;

  connect().query('UPDATE pregunta SET descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('pregunta no modificado',3));
    }else{
      res.status(200).send(Hipermedia('pregunta modificado',3));
    }
  });
});
