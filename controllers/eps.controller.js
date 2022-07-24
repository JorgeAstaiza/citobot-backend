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

const insertarEps = async (req = request, res = response) => {
	const { eps_nombre } = req.body;
	const qr = await pool.query(`INSERT INTO eps (eps_nombre) VALUES ('${eps_nombre}');`, function (err, result) {
		respuesta(res, err, result);
	});
	console.log(qr.sql);
};

const actualizarEps = async (req = request, res = response) => {
	const { id } = req.params;
	const { eps_nombre } = req.body;
	await pool.query(`UPDATE eps SET eps_nombre='${eps_nombre}' WHERE eps_id=${id};`, function (err, result) {
		respuesta(res, err, result);
	});
};

const consultarEps = async (req = request, res = response) => {
	await pool.query(`SELECT eps_id, eps_nombre FROM eps;`, function (err, result) {
		respuesta(res, err, result);
	});
};

const eliminarEps = async (req = request, res = response) => {
	const { id } = req.params;
	await pool.query(`DELETE FROM eps where eps_id=${id};`, function (err, result) {
		respuesta(res, err, result);
	});
};

module.exports = {
	insertarEps,
	actualizarEps,
	consultarEps,
	eliminarEps
};
