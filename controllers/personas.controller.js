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

const getPersonas = async(req = request, res = response) => {
    await pool.query('SELECT per_identificacion, per_tip_id, per_primer_nombre, per_otros_nombres, per_primer_apellido, per_segundo_apellido, g.gen_nombre FROM persona p INNER JOIN genero g on (p.per_gen_id = g.gen_id)',function(err, result){
        respuesta(res, err, result)
    });
}

const crearPersona = async(req = request, res = response) => {
    console.log(req.body);
    const { per_identificacion, per_tip_id, per_primer_nombre, per_otros_nombres, per_primer_apellido, per_segundo_apellido, per_gen_id } = req.body;

    await pool.query(`INSERT INTO persona (per_identificacion, per_primer_nombre, per_otros_nombres, per_primer_apellido, per_segundo_apellido, per_gen_id, per_tip_id) VALUES ( "${per_identificacion}", "${per_primer_nombre}", "${per_otros_nombres}", "${per_primer_apellido}", "${per_segundo_apellido}", "${per_gen_id}", "${per_tip_id}");`, function(err, result){
        respuesta(res, err, result)
    });
}

const actualizarPersona = async(req = request, res = response) => {
    const { id } = req.params
    const { per_tip_id, per_primer_nombre, per_otros_nombres, per_primer_apellido, per_segundo_apellido, per_gen_id } = req.body;

    await pool.query(`UPDATE persona SET per_tip_id="${per_tip_id}", per_primer_nombre="${per_primer_nombre}", per_otros_nombres="${per_otros_nombres}", per_primer_apellido="${per_primer_apellido}", per_segundo_apellido="${per_segundo_apellido}", per_gen_id="${per_gen_id}" WHERE per_identificacion=${id};`, function(err, result){
        respuesta(res, err, result)
    });
}

module.exports = {
    getPersonas,
    crearPersona,
    actualizarPersona
}