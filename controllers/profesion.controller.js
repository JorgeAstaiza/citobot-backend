const { response, request } = require('express');
const { pool } = require('../database/config');
const tokenGlobal = 'Authorization';

const respuesta = (res, err, results) => {
	if (err) {
		res.json({
			codigoRespuesta: -1,
			descripcionRespuesta: 'Error',
			objetoRespuesta: [err.sqlMessage]
		});
	} else {
		res.json({
			codigoRespuesta: 0,
			descripcionRespuesta: 'Exito',
			objetoRespuesta: results
		});
	}
};

const getProfesiones = async (req = request, res = response) => {
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query('SELECT pro_id, pro_nombre FROM profesion ORDER BY pro_id ASC;', function (err, result) {
			respuesta(res, err, result);
		});
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const createProfesion = async (req = request, res = response) => {
	const { pro_nombre } = req.body;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(`INSERT INTO profesion (pro_nombre) VALUES ('${pro_nombre}');`, function (err, result) {
			respuesta(res, err, result);
		});
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

module.exports = {
	getProfesiones,
	createProfesion
};
