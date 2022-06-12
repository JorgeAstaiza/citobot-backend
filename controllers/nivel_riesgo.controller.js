const { response, request } = require('express');
const { pool } = require('../database/config');

const respuesta = (res, err, results) => {
    if (err) {
        res.json({
            codigoRespuesta: -1,
            descripcionRespuesta: "Error",
            objetoRespuesta: [err.sqlMessage]
        });
    } else {
        res.json({
            codigoRespuesta: 0,
            descripcionRespuesta: "Exito",
            objetoRespuesta: results
        });
    }
}

const crearRiesgo = async(req = request, res = response) => {
    const { niv_id, niv_mensaje, niv_descripcion } = req.body;
    await pool.query(`INSERT INTO nivel_riesgo (niv_id, niv_mensaje, niv_descripcion) values (${niv_id},'${niv_mensaje}','${niv_descripcion}');`, function(err, result){
        respuesta(res, err, result)
    });
}

const actualizarRiesgo = async(req = request, res = response) => {
    const { niv_mensaje, niv_descripcion } = req.body;
    const { id } = req.params;
    await pool.query(`UPDATE nivel_riesgo SET niv_mensaje='${niv_mensaje}', niv_descripcion='${niv_descripcion}' WHERE niv_id=${id};`, function(err, result){
        respuesta(res, err, result)
    });
}

const eliminarRiesgo = async(req = request, res = response) => {
    const { id } = req.params;
    await pool.query(`DELETE FROM nivel_riesgo WHERE niv_id=${id};`, function(err, result){
        respuesta(res, err, result)
    });
}

const obtenerRiesgos = async(req = request, res = response) => {
    await pool.query(`SELECT niv_id, niv_descripcion, niv_mensaje FROM nivel_riesgo;`, function(err, result){
        respuesta(res, err, result)
    });
}

module.exports = {
    crearRiesgo,
    actualizarRiesgo,
    eliminarRiesgo,
    obtenerRiesgos
}