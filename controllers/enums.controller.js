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

const consutarEnum = async (req = request, res = response) => {
	const { tabla, columna } = req.query;
	console.log(tabla, columna);
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT SUBSTRING(COLUMN_TYPE,5) FROM information_schema.COLUMNS WHERE TABLE_NAME='${tabla}' AND COLUMN_NAME='${columna}';`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

module.exports = {
	consutarEnum
};
