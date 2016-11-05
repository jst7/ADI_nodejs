var express = require('express');
var Problema = express.Router();
module.exports = Problema;

require('../aux')();

//Problema
//OBTERNER LISTA
  /**
  * Este funcion es para obtener todos los Problemas, no saca las preguntas relacionadas pero si el usuario
  * @name Obtener_lista_Problemas
  * @param {res} resultado de la consulta a la bd
  * @example /problemas?pagina=1 (GET)
  * @return {resultado consulta}
  */
Problema.get('/',autenticaBasic,function(req,res){

  ultimaPosicion('Problema', function(err, total){
    var testo = paginacion(req,itemPorPagina)
    var consulta = 'select * from Problema' + testo

    var paginas = paginas_paginacion("Problemas/",req.query.pagina,total)
    connect().query(consulta, function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(500).send(Hipermedia('No tiene Problemas',2));
    }else{
      res.status(200).send(Hipermedia([rows,paginas],2));
    }
  });
  });
});

  /**
  * Este funcion es para obtener un Problema por id no saca las decisiones relacionadas
  * @name Obtener_Problema_id
  * @param {res} resultado de la consulta a la bd
  * @example /Problemas/id (GET)
  * @return {resultado consulta}
  */
//OBTENER Problema POR ID
Problema.get('/:id',autenticaBasic,function(req,res){

var id = req.params.id;
  
    connect().query('select * from Problema where id='+id+'', function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(400).send(Hipermedia('No existe el Problema',2));
    }else{
      res.status(200).send(Hipermedia(rows,2));
    }
  });
});

  /**
  * Este funcion es para obtener un Problema por su titulo o parte de él no saca las decisiones relacionadas
  * @name Obtener_Problema_titulo
  * @param {res} resultado de la consulta a la bd
  * @example /Problemas/titulo/:titulo (GET)
  * @return {resultado consulta}
  */
//OBTENER Problema POR Titulo
Problema.get('/titulo/:titulo',autenticaBasic,function(req,res){

var titulo = req.params.titulo;
  
    connect().query('select * from Problema where titulo like  \'%'+titulo+'%\'', function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(500).send(Hipermedia('No existe el Problema',2));
    }else{
      res.status(200).send(Hipermedia(rows,2));
    }
  });
});



  /**
  * Este funcion es para obtener los Problemas por usuario, no saca las decisiones relacionadas
  * @name Obtener_Problema_nombreUsuario
  * @param {res} resultado de la consulta a la bd
  * @example /Problemas/:nombre (GET)
  * @return {resultado consulta}
  */
//OBTENER Problema POR USER
Problema.get('/usuario/:nombre',autenticaBasic,function(req,res){

var nombre = req.params.nombre;
  
    connect().query('select * from Problema where usuario=\''+nombre+'\'', function(err, rows, fields) {
    if (err || rows.length==0){
      res.status(500).send(Hipermedia('El usuario no tiene Problemas',2));
    }else{
      res.status(200).send(Hipermedia(rows,2));
    }
  });
});

  /**
  * Este funcion es para registrar un Problema
  * @name Registrar_Problema
  * @param {res} resultado de la consulta a la bd
  * @example /Problema/registrar (POST con (usuario, titulo, descripcion))
  * @return {resultado consulta}
  */
//REGISTRAR
Problema.post('/',autenticaBasic,function(req,res){
  var usuario = req.body.usuario;
  var titulo = req.body.titulo;
  var descripcion = req.body.descripcion;
  try{
      connect().query('insert into Problema (usuario,titulo,descripcion) values (\''+usuario+'\',\''+titulo+'\',\''+descripcion+'\');', function(err, rows, fields) { 
      res.status(200).send(Hipermedia('Problema Registrado ',2 ));
      })
  }catch(Ex){
      res.status(401).send(Hipermedia(Ex,2));
  }
});


  /**
  * Este funcion es para borrar un Problema
  * @name Borrar_Problema
  * @param {res} resultado de la consulta a la bd
  * @example /Problemas/borrar/id (DELETE)
  * @return {resultado consulta}
  */
//BORRAR
Problema.delete('/:id',autenticaBasic,function(req,res){
  var iduser = req.params.id;
  connect().query('delete from Problema where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Problema no Borrado',2));
    }else{
      res.status(200).send(Hipermedia('Problema id:'+ iduser+' Borrado',2));
    }
  });
});

  /**
  * Este funcion es para modificar un Problema
  * @name Modififcar_Problema
  * @param {res} resultado de la consulta a la bd
  * @example /Problemas/modificar/id (PUT con (titulo, descripcion))
  * @return {resultado consulta}
  */
//MODIFICAR
Problema.put('/:id',autenticaBasic,function(req,res){
  var id = req.params.id;
  //var usuario = req.body.usuario; No tiene sentido modificar el usuario
  var titulo = req.body.titulo;
  var descripcion = req.body.descripcion;

  connect().query('UPDATE Problema SET titulo=\''+titulo+'\', descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Problema no modificado',2));
    }else{
      res.status(200).send(Hipermedia('Problema modificado',2));
    }
  });
});
