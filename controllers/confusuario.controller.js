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
	const { confu_usu_per_identificacion, confu_conf_id, confu_estado } = req.body;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`INSERT INTO config_usuario (confu_usu_per_identificacion, confu_conf_id, confu_estado) VALUES ('${confu_usu_per_identificacion}', '${confu_conf_id}', '${confu_estado}');`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const eliminarConfiguracion = async (req = request, res = response) => {
	const { confu_id } = req.params;

	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(`DELETE FROM config_usuario WHERE confu_id = ${confu_id};`, function (err, result) {
			respuesta(res, err, result);
		});
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const actualizarConfiguracion = async (req = request, res = response) => {
	const { confu_usu_per_identificacion, confu_conf_id, confu_estado } = req.body;
	const { confu_id } = req.params;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`UPDATE config_usuario SET confu_usu_per_identificacion = '${confu_usu_per_identificacion}', confu_conf_id = ${confu_conf_id}, confu_estado = '${confu_estado}' WHERE confu_id = ${confu_id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const actualizarConfiguracionById = async (req = request, res = response) => {
	const { confu_estado } = req.body;
	const { confu_usu_per_identificacion, confu_conf_id } = req.params;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`UPDATE config_usuario SET confu_estado = '${confu_estado}' WHERE confu_usu_per_identificacion = '${confu_usu_per_identificacion}' and confu_conf_id = ${confu_conf_id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const obtenerTodasConfiguraciones = async (req = request, res = response) => {
	const { confu_usu_per_identificacion, confu_conf_id } = req.query;
	console.log(req.query);
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT confu_id, confu_usu_per_identificacion, confu_conf_id, confu_estado  FROM config_usuario WHERE confu_usu_per_identificacion = '${confu_usu_per_identificacion}' AND confu_conf_id = ${confu_conf_id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const obtenerTodosEstados = async (req = request, res = response) => {
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT confu_id, confu_usu_per_identificacion, confu_conf_id, confu_estado  FROM config_usuario;;`,
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
	eliminarConfiguracion,
	actualizarConfiguracion,
	actualizarConfiguracionById,
	obtenerTodasConfiguraciones,
	obtenerTodosEstados
};
