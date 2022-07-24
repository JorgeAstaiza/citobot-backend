const { response, request } = require('express');
const { pool } = require('../database/config');

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
	await pool.query('SELECT pro_id, pro_nombre FROM profesion;', function (err, result) {
		respuesta(res, err, result);
	});
};

const createProfesion = async (req = request, res = response) => {
	const { pro_nombre } = req.body;
	await pool.query(`INSERT INTO profesion (pro_nombre) VALUES ('${pro_nombre}');`, function (err, result) {
		respuesta(res, err, result);
	});
};

module.exports = {
	getProfesiones,
	createProfesion
};
