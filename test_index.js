var work = require('./index');
var supertest = require('supertest');


describe('prueba de la app web', function(){
    it('/devuelve el contenido adecuado', function(done){

    	console.log("hola")

        supertest(work)
            .get('/usuarios')
            .expect(200)
            .expect(done);
    });

});