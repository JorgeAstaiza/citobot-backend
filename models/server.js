const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const { dbConnection } = require('../database/config');
// const path = require('path');
// const multer = require('multer');
// const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const hostname = 'localhost';
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

const key = fs.readFileSync('./private.key');
const cert = fs.readFileSync('./certificate.crt');

const credentials = {
	key,
	cert
};

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3001;
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
		this.configUsuarioPath = '/api/confusuario';

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
		this.app.use(cors({ origin: '*' }));
		this.app.use(express.json({ limit: '50000mb' }));
		this.app.use(express.urlencoded({ limit: '50000mb', extended: true, parameterLimit: 5000000000000 }));
		this.app.use(express.static('images'));
		this.app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
		// Add headers before the routes are defined
		this.app.use(function (req, res, next) {
			// Website you wish to allow to connect
			res.setHeader('Access-Control-Allow-Origin', '*');
			// Request methods you wish to allow
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			// Request headers you wish to allow
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			// Set to true if you need the website to include cookies in the requests sent
			// to the API (e.g. in case you use sessions)
			res.setHeader('Access-Control-Allow-Credentials', true);
			// Pass to next layer of middleware
			next();
		});
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: './tamizajes'
			})
		);
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
		this.app.use(this.configUsuarioPath, require('../routes/confusuario.routes'));
		this.app.use('', require('../routes/ssl.routes'));
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log(`Server running at port:${this.app.get('port')}/`);
		});
		const httpsServer = https.createServer(credentials, this.app);
		httpsServer.listen(8443);
	}
}

module.exports = Server;
