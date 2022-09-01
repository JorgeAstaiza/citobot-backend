const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Swagger Node.js',
			version: '1.0.0'
		},
		servers: [
			{
				url: 'http://localhost:8080'
			}
		]
	},
	apis: ['./routes/*.js']
};

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.personasPath = '/api/personas';
		this.usuarioPath = '/api/usuarios';
		this.pacientePath = '/api/pacientes';
		this.tamizajePath = '/api/tamizajes';
		this.riesgoPath = '/api/riesgos';
		this.imagenesPath = '/api/imagenes';
		this.epsPath = '/api/eps';
		this.enumPath = '/api/enum';
		this.profesionPath = '/api/profesion';
		this.configuracionPath = '/api/configuracion';

		this.conectarDB(); //conexion base de datos
		this.config(); // middlewares
		this.routes(); //rutas
	}

	async conectarDB() {
		await dbConnection();
	}
	config() {
		this.app.set('port', this.port); //defino el puerto del servidor
		this.app.use(morgan('dev')); //para poder ver las peticiones por consola
		this.app.use(cors());
		this.app.use(express.json({ limit: '50000mb' }));
		this.app.use(express.urlencoded({ limit: '50000mb', extended: true, parameterLimit: 5000000000000 }));
		this.app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
	}
	routes() {
		this.app.use(this.personasPath, require('../routes/persona.routes'));
		this.app.use(this.usuarioPath, require('../routes/usuario.routes'));
		this.app.use(this.pacientePath, require('../routes/paciente.routes'));
		this.app.use(this.tamizajePath, require('../routes/tamizaje.routes'));
		this.app.use(this.riesgoPath, require('../routes/nivel_riesgo.routes'));
		this.app.use(this.imagenesPath, require('../routes/imagenes.routes'));
		this.app.use(this.epsPath, require('../routes/eps.routes'));
		this.app.use(this.enumPath, require('../routes/enums.routes'));
		this.app.use(this.profesionPath, require('../routes/profesion.routes'));
		this.app.use(this.configuracionPath, require('../routes/configuracion.routes'));
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log('servidor corriendo puerto', this.app.get('port'));
		});
	}
}

module.exports = Server;
