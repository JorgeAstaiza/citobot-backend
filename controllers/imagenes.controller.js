const { response, request } = require('express');
const { pool } = require('../database/config');
const tokenGlobal = 'Authorization';
const fs = require('fs');
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

const guardarImagenFTP = async (req = request, res = response) => {
	const { base64, nombre } = req.body;
	const ftp = require('basic-ftp');
	var base64Data = base64.replace(/^data:image\/png;base64,/, '');
	const buffer = Buffer.from(base64, 'base64');
	fs.writeFile(`tamizajes/${nombre}`, base64Data, 'base64', function (err) {
		console.log(err);
	});
	const client = new ftp.Client();
	client.ftp.verbose = true;
	try {
		await client.access({
			host: 'alexandercordoba.com',
			user: 'u320411275',
			password: '123QweAsd#%/',
			secure: false
		});
		console.log(await client.list());
		await client.uploadFrom(`tamizajes/${nombre}`, nombre);
	} catch (err) {
		console.log(err);
	}
	client.close();
};

const insertarImagen = async (req = request, res = response) => {
	const token = req.header(tokenGlobal);
	const { ima_tam_id, ima_tipo, ima_ruta } = req.body;
	if (token) {
		await pool.query(
			`INSERT INTO imagen (ima_tam_id, ima_tipo, ima_ruta) VALUES (${ima_tam_id}, '${ima_tipo}', '${ima_ruta}');`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const actualizarImagen = async (req = request, res = response) => {
	const { ima_tam_id, ima_tipo, ima_ruta } = req.body;
	const { id } = req.params;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`UPDATE imagen SET ima_tam_id=${ima_tam_id}, ima_tipo="${ima_tipo}", ima_ruta="${ima_ruta}" WHERE ima_id=${id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const eliminarImagen = async (req = request, res = response) => {
	const { id } = req.params;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(`DELETE FROM imagen WHERE ima_id=${id};`, function (err, result) {
			respuesta(res, err, result);
		});
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const obtenerImagenesByID = async (req = request, res = response) => {
	const { id } = req.query;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT i.ima_id, i.ima_tam_id, i.ima_tipo, i.ima_ruta FROM imagen i WHERE i.ima_tam_id=${id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};
module.exports = {
	insertarImagen,
	actualizarImagen,
	eliminarImagen,
	obtenerImagenesByID,
	guardarImagenFTP
};
