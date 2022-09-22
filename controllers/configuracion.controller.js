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

const crearConfiguracion = async (req = request, res = response) => {
	const { conf_nombre, conf_descripcion } = req.body;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`INSERT INTO configuracion (conf_nombre, conf_descripcion) VALUES ('${conf_nombre}', '${conf_descripcion}', '${conf_estado}');`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const actualizarConfiguracion = async (req = request, res = response) => {
	const { conf_descripcion } = req.body;
	const { conf_id } = req.params;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`UPDATE configuracion SET conf_descripcion = '${conf_descripcion}' = '${conf_estado}' WHERE configuracion.conf_id = ${conf_id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const eliminarConfiguracion = async (req = request, res = response) => {
	const { conf_id } = req.params;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(`DELETE FROM configuracion WHERE configuracion.conf_id = ${conf_id};`, function (err, result) {
			respuesta(res, err, result);
		});
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const obtenerTodasConfiguraciones = async (req = request, res = response) => {
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(`SELECT conf_id, conf_nombre, conf_descripcion FROM configuracion;`, function (err, result) {
			respuesta(res, err, result);
		});
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const obtenerConfiguracionById = async (req = request, res = response) => {
	const { id } = req.query;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT conf_id, conf_nombre, conf_descripcion FROM configuracion WHERE conf_id = ${id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};
const obtenerConfiguracionBynombre = async (req = request, res = response) => {
	const { nombre } = req.query;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT conf_id, conf_nombre, conf_descripcion FROM configuracion WHERE conf_nombre = '${nombre}';`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

module.exports = {
	crearConfiguracion,
	actualizarConfiguracion,
	eliminarConfiguracion,
	obtenerConfiguracionById,
	obtenerTodasConfiguraciones,
	obtenerConfiguracionBynombre
};
