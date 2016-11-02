var express = require('express');
var tema = express.Router();
module.exports = tema;

require('../aux')();

//TEMA
//OBTERNER LISTA
  /**
  * Este funcion es para obtener todos los temas, no saca las decisiones relacionadas
  * @name Obtener_lista_temas
  * @param {res} resultado de la consulta a la bd
  * @example /temas
  * @return {resultado consulta}
  */
tema.get('/',autenticaBasic,function(req,res){

  ultimaPosicion('Tema', function(err, total){
    var testo = paginacion(req,itemPorPagina)
    var consulta = 'select * from Tema' + testo

    var paginas = paginas_paginacion("temas/",req.query.pagina,total)
    connect().query(consulta, function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No tiene Temas',2));
    }else{
      res.status(200).send(Hipermedia([rows,paginas],2));
    }
  });
  });
});

  /**
  * Este funcion es para obtener un tema por id no saca las decisiones relacionadas
  * @name Obtener_tema_id
  * @param {res} resultado de la consulta a la bd
  * @example /temas/id
  * @return {resultado consulta}
  */
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

  /**
  * Este funcion es para obtener los temas por usuario, no saca las decisiones relacionadas
  * @name Obtener_tema_nombreUsuario
  * @param {res} resultado de la consulta a la bd
  * @example /temas/:nombre
  * @return {resultado consulta}
  */
//OBTENER TEMA POR USER
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

  /**
  * Este funcion es para registrar un tema
  * @name Registrar_tema
  * @param {res} resultado de la consulta a la bd
  * @example /tema/registrar (POST con (usuario, titulo, descripcion))
  * @return {resultado consulta}
  */
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


  /**
  * Este funcion es para borrar un tema
  * @name Borrar_tema
  * @param {res} resultado de la consulta a la bd
  * @example /temas/borrar/id (DELETE)
  * @return {resultado consulta}
  */
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

  /**
  * Este funcion es para modificar un tema
  * @name Modififcar_tema
  * @param {res} resultado de la consulta a la bd
  * @example /temas/modificar/id (PUT con (titulo, descripcion))
  * @return {resultado consulta}
  */
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
