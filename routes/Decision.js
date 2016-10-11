var express = require('express');
var decision = express.Router();
module.exports = decision;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mads',
  database : 'ADI_Prac'
});


//Decision
//OBTERNER LISTA
decision.get('/',function(req,res){

    connection.query('select * from Decision', function(err, rows, fields) {
    if (err){
      res.status(500).send('No tiene Decisiones');
    }else{
      res.status(200).send(rows);
    }
  });
});

decision.get('/:id',function(req,res){

var id = req.params.id;
  
    connection.query('select * from Decision where id='+id+'', function(err, rows, fields) {
    if (err){
      res.status(500).send('No existe la Decision');
    }else{
      res.status(200).send(rows);
    }
  });
});

decision.get('/tema/:tema',function(req,res){

var tema = req.params.tema;
  
    connection.query('select * from Decision where tema=\''+tema+'\'', function(err, rows, fields) {
    if (err){
      res.status(500).send('No existen decisiones para este cluster.setupMaster(options);');
    }else{
      res.status(200).send(rows);
    }
  });
});

//REGISTRAR
decision.post('/registrar',function(req,res){
  var tema = req.body.tema;
  var descripcion = req.body.descripcion;
  try{
      connection.query('insert into Decision (tema,descripcion) values (\''+tema+'\',\''+descripcion+'\');', function(err, rows, fields) { 
      res.status(200).send('Decision Registrada' );
      })
  }catch(Ex){
      res.status(401).send(Ex);
  }
});


//BORRAR
decision.delete('/borrar/:id',function(req,res){
  var iduser = req.params.id;
  connection.query('delete from Decision where id = \''+iduser+'\';', function(err, rows, fields) {
    if (err || rows.affectedRows==0){
      res.status(500).send('Decision no Borrada');
    }else{
      res.status(200).send('Decision id:'+ iduser+' Borrado');
    }
  });
});

//MOFICAR
decision.put('/modificar/:id',function(req,res){
  var id = req.params.id;
  //var tema = req.body.titulo; no tiene sentido cambiarla de tema
  var descripcion = req.body.descripcion;

  connection.query('UPDATE Decision SET descripcion=\''+descripcion+'\' WHERE id='+id+'', function(err, rows, fields) {

    if (err || rows.affectedRows==0){
      res.status(500).send('Decision no modificado');
    }else{
      res.status(200).send('Decision modificado');
    }
  });
});

