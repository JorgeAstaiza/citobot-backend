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

const getPersonas = async (req = request, res = response) => {
	const token = req.header('token');
	if (token) {
		await pool.query(
			'SELECT per_identificacion, per_tip_id, per_primer_nombre, per_otros_nombres, per_primer_apellido, per_segundo_apellido, g.gen_nombre FROM persona p INNER JOIN genero g on (p.per_gen_id = g.gen_id)',
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const crearPersona = async (req = request, res = response) => {
	const {
		per_identificacion,
		per_tip_id,
		per_primer_nombre,
		per_otros_nombres,
		per_primer_apellido,
		per_segundo_apellido,
		per_gen_id
	} = req.body;
	const token = req.header('token');
	if (token) {
		await pool.query(
			`INSERT INTO persona (per_identificacion, per_primer_nombre, per_otros_nombres, per_primer_apellido, per_segundo_apellido, per_gen_id, per_tip_id) VALUES ( "${per_identificacion}", "${per_primer_nombre}", "${per_otros_nombres}", "${per_primer_apellido}", "${per_segundo_apellido}", "${per_gen_id}", "${per_tip_id}");`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const actualizarPersona = async (req = request, res = response) => {
	const { id } = req.params;
	const { per_tip_id, per_primer_nombre, per_otros_nombres, per_primer_apellido, per_segundo_apellido, per_gen_id } =
		req.body;
	const token = req.header('token');
	if (token) {
		await pool.query(
			`UPDATE persona SET per_tip_id="${per_tip_id}", per_primer_nombre="${per_primer_nombre}", per_otros_nombres="${per_otros_nombres}", per_primer_apellido="${per_primer_apellido}", per_segundo_apellido="${per_segundo_apellido}", per_gen_id="${per_gen_id}" WHERE per_identificacion=${id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

module.exports = {
	getPersonas,
	crearPersona,
	actualizarPersona
};
