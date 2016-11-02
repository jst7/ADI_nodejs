var mysql   = require('mysql');
var jwt   = require('jwt-simple');
var isInteger = require("is-integer");


module.exports = function() { 

    this.connect = function() { 
    	var result 	=  mysql.createConnection({
					  host     : 'localhost',
					  user     : 'root',
					  password : 'mads',
					  database : 'ADI_Prac'
					})

		return result
	}

	this.autenticaBasic = function(pet, res, next) {
  		var auth  = pet.get('Authorization')
  		var secret  = 'Basic ' + new Buffer("usuario:123456").toString('base64')

  		if (auth == null) {
   			res.status(401).set('WWW-Authenticate', 'Basic realm="myrealm"')
   			return res.send("No autorizado.")
  		}else if (auth != secret) {
   			return res.status(403).send("Error en user/pass. No autorizado.")
  		}else{
  			next()
  		}
  		
 		}

 	this.Hipermedia = function(sol, tipo) {

 		if(tipo == 1){
 			return [sol, [{rel: "usuarios",
	                tipo: "GET",
	                href: "/"},
	                {rel: "usuarios id",
	                tipo: "GET",
	                href: "/id"},
	                {rel: "usuario registrar",
	                tipo: "POST (JSON CAMPOS (nombre,contraseña,email))",
	                href: "/registrar"},
	                {rel: "usuario borrar",
	                tipo: "DELETE",
	                href: "/borrar/id"},
	                {rel: "usuario autentificar",
	                tipo: "POST (JSON CAMPOS (contraseña,email))",
	                href: "/autentificar"},
	                {rel: "usuario modificar",
	                tipo: "PUT (JSON CAMPOS (nombre,contraseña,email))",
	                href: "/modificar/id"}
               		]
         		]

 		}else if(tipo == 2){
 			return [sol, [{rel: "temas",
		            tipo: "GET",
		            href: "/"},
		            {rel: "temas id",
		            tipo: "GET",
		            href: "/id"},
		            {rel: "temas registrar",
		            tipo: "POST (JSON CAMPOS (usuario,titulo,descripcion))",
		            href: "/registrar"},
			        {rel: "temas borrar",
		            tipo: "DELETE",
		            href: "/borrar/id"},
		            {rel: "temas modificar",
		            tipo: "PUT (JSON CAMPOS (usuario,titulo,descripcion))",
		            href: "/modificar/id"}
		            ]
          		]

 		}else if(tipo == 3){
 			return [sol, [{rel: "decision",
		            tipo: "GET",
		            href: "/"},
		            {rel: "decision id",
		            tipo: "GET",
		            href: "/id"},
		            {rel: "decision registrar",
		            tipo: "POST (JSON CAMPOS (tema,descripcion))",
		            href: "/registrar"},
		            {rel: "decision borrar",
		            tipo: "DELETE",
		            href: "/borrar/id"},
		            {rel: "decision modificar",
		            tipo: "PUT (JSON CAMPOS (descripcion))",
		            href: "/modificar/id"}
		            ]
          		]
 			}
 		}

 	this.GenerarToken = function(cad) {
		var token = ''
		var secret = 'Jst*Jqa#2701';
		var pass64 = new Buffer(secret).toString('base64') 
		var token = jwt.encode(cad, pass64);
				  
  	return token
 	}

 	this.ComprobarToken = function(cad) {
		var token = ''
		var secret = 'Jst*Jqa#2701';
		var pass64 = new Buffer(secret).toString('base64') 
		var token = jwt.decode(cad, pass64);
				  
  	return token
  }

  this.paginacion = function(pet, rows){
  	var pagina =pet.query.pagina
  	var consulta=''

  	if(pagina != undefined && pagina > 0){
  		consulta = ' LIMIT ' + ((pagina*itemPorPagina) - itemPorPagina) + ', ' + rows
  	}

  	return consulta;
  }

  this.paginas_paginacion=function(esqueleto, posicion, ultima){
  	var antes = posicion;
  	if(antes>1){
  		antes=antes-1;
  	}

  	var last= ultima/5;
  	if(ultima%5!=0){
  		last=parseInt(last.toFixed())+1;
  	}

  	var siguiente = posicion;
  	if(siguiente!=last && siguiente < last){
  		siguiente=parseInt(siguiente)+1;
  	}

  	var salida = [{ anterior: esqueleto + '?pagina=' + antes,
                    siguiente: esqueleto + '?pagina=' + siguiente,
                    última: esqueleto + '?pagina=' + last
                    }]
    return salida;
  }

  this.ultimaPosicion = function(esqueleto, callback){

  	var fin=0;
 	connect().query("SELECT count(*) as total FROM " + esqueleto, function(err, result ){
  		
 		if(err){
 			callback(err,null);
 		}
 		else{
 			callback(null,result[0].total);
 		}
  		
  	});
  }
  this.itemPorPagina=5;
 	
}

