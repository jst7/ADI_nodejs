var express = require('express');
var solucion = express.Router();
module.exports = solucion;

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
solucion.get('/',autenticaBasic,function(req,res){

  ultimaPosicion('solucion', function(err, total){
    var testo = paginacion(req,itemPorPagina)
    var consulta = 'select * from Soluciones' + testo

    var paginas = paginas_paginacion("solucion/",req.query.pagina,total)
    console.log(consulta);
    connect().query(consulta, function(err, rows, fields) {
    if (err){
      res.status(500).send(Hipermedia('No tiene Soluciones',3))
    }else{
      res.status(200).send(Hipermedia([rows,paginas],3))
    }
  });
  });
});