const { response, request } = require('express');
const { pool } = require('../database/config');
const tokenGlobal = 'Authorization';
const fs = require('fs');

const { uploadFile, getFile, downloadFile, getFileURL } = require('../s3');
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

const guardarImagenAWS = async (req = request, res = response) => {
	const { nombre } = req.body;
	const token = req.header(tokenGlobal);
	if (req.files.file) {
		const result = await uploadFile(req.files.file, nombre);
		res.json({ result });
		setTimeout(() => {
			fs.unlinkSync(req.files.file.tempFilePath);
		}, 2000);
		} else {
			res.status(403).send({ error: 'se requere enviar la imagen de tipo file' });
		}
};

const obtenerImagenAWS = async (req = request, res = response) => {
	const token = req.header(tokenGlobal);
	if (token) {
		if (req.params.fileName) {
			const result = await getFileURL(req.params.fileName);
			res.json({
				url: result
			});
		} else {
			res.status(403).send({ error: 'se requere el nombre de la imagen' });
		}
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const descargarImagenAWS = async (req = request, res = response) => {
	const token = req.header(tokenGlobal);
	
	if (req.params.fileName && token) {
		const nombreImg = req.params.fileName;
		console.log(nombreImg);
		try {
			await downloadFile(req.params.fileName);
			setTimeout(() => {
				res.sendFile(nombreImg, { root: __dirname });
			}, 500);
			setTimeout(() => {
				fs.unlinkSync(`controllers/${nombreImg}`);
			}, 7000);
		} catch (error) {
			res.json({ error: error });
		}
	}
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

const totalImagenesByTamizaje = async (req = request, res = respone) => {
	const { id } = req.query;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(`SELECT count(*) as total FROM imagen i WHERE i.ima_tam_id=${id};`, function (err, result) {
			respuesta(res, err, result);
		});
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};
module.exports = {
	insertarImagen,
	actualizarImagen,
	eliminarImagen,
	obtenerImagenesByID,
	guardarImagenAWS,
	totalImagenesByTamizaje,
	obtenerImagenAWS,
	descargarImagenAWS
};
