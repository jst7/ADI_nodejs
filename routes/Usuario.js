var express = require('express');
var usuario = express.Router();
module.exports = usuario;
require('../aux')();

//USUARIOS CRUD

//OBTERNER LISTA
  /**
  * Este funcion es para obtener todas los usuarios y no saca los temas relacionados
  * @name Obtener_lista_usuarios
  * @param {res} resultado de la consulta a la bd
  * @example /usuarios?pagina=1 (cualquier numero)
  * @return {resultado consulta}
  */
usuario.get('/',autenticaBasic,function(req,res,next){

ultimaPosicion('Usuario', function(err, total){
    var testo = paginacion(req,itemPorPagina)
    var consulta = 'select * from Usuario' + testo

    var paginas = paginas_paginacion("usuarios/",req.query.pagina,total)
    connect().query(consulta, function(err, rows, fields) {
      if (err || rows.length==0){
        res.status(500).send(Hipermedia('No tiene Usuario',1))
      }else{
        res.status(200).send(Hipermedia([rows,paginas],1))
      }
  });
  });
});

  /**
  * Este funcion es para obtener un usuario por id no saca los temas relacionados
  * @name Obtener_usuario_id
  * @param {res} resultado de la consulta a la bd
  * @example /usuarios/id
  * @return {resultado consulta}
  */
usuario.get('/:id',autenticaBasic,function(req,res){

  var id = req.params.id;
    
      connect().query('select * from Usuario where id='+id+'', function(err, rows, fields) {
        if (err || rows.length==0){
          res.status(500).send(Hipermedia('No existe el usuario',1))
        }else{
          res.status(200).send(Hipermedia(rows,1))
      }
    });
});

  /**
  * Este funcion es para registrar un usuario
  * @name Registrar_usuario
  * @param {res} resultado de la consulta a la bd
  * @example /usuarios (POST con (nombre, pass, email))
  * @return {resultado consulta}
  */
//REGISTRAR
usuario.post('/',autenticaBasic,function(req,res){
  var nombre = req.body.nombre;
  var pass = req.body.contraseña;
  var email = req.body.email;

  try{
  connect().query('select * from Usuario Where email=\''+email+'\'', function(err, rows, fields) { 

    if(rows.length==0){
      connect().query('insert into Usuario (nombre,contraseña,email) values (\''+nombre+'\',\''+pass+'\',\''+email+'\');', function(err, rows, fields) { 
      if (err){
        res.status(500).send(Hipermedia('ERROR SERVER',1))
      }else{
        res.status(200).send(Hipermedia('Usuario Registrado ',1 ))
      }
      })
    }
    else{
      res.status(401).send(Hipermedia('Ya registrado',1))
    }
    })
  }catch(Ex){
      res.status(401).send(Hipermedia(Ex,1));
  }
});


  /**
  * Este funcion es para borrar un usuario
  * @name Borrar_usuario
  * @param {res} resultado de la consulta a la bd
  * @example /usuarios/id (DELETE)
  * @return {resultado consulta}
  */
//BORRAR
usuario.delete('/:id',autenticaBasic,function(req,res){
  var iduser = req.params.id;
  connect().query('delete from Usuario where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send(Hipermedia('Usuario no Borrado',1));
    }else{
      res.status(200).send(Hipermedia('Usuario id:'+ iduser+' Borrado',1));
    }
  });
});

  /**
  * Este funcion es para autentificar un usuario
  * @name Autentificar_usuario
  * @param {res} resultado de la consulta a la bd
  * @example /usuarios/id (POST con (pass nombre))
  * @return {resultado consulta}
  */
//AUTENTIFICAR
usuario.post('/autentificar',autenticaBasic,function(req,res){

  var pass = req.body.contraseña;
  var email = req.body.email;

  try{

      connect().query('select contraseña, email from Usuario where contraseña=\''+pass+'\'and email=\''+email+'\'', function(err, rows, fields) { 

      if(rows.length==1){
        res.status(200).send(Hipermedia(['Usuario Autentificado',"token: "+GenerarToken(email+"#"+pass)],1));
      }else{
        res.status(401).send(Hipermedia('Usuario NO Autentificado incorrecto',1));
      }      
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});

  /**
  * Este funcion es para modificar un usuario
  * @name Modififcar_usuario
  * @param {res} resultado de la consulta a la bd
  * @example /usuarios/modificar/id (PUT con (nombre, contraseña, email))
  * @return {resultado consulta}
  */
//MODIFICAR
usuario.put('/:id',autenticaBasic,function(req,res){
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

