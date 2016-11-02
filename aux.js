var mysql   = require('mysql');
var jwt   = require('jwt-simple');


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
  		consulta = ' LIMIT ' + ((pagina*5) - 5) + ', ' + rows
  	}

  	return consulta;
  }
 	
}

