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

const obtenerTamizajes = async(req = request, res = response) => {
    await pool.query('SELECT pe.per_tip_id, pe.per_identificacion, t.tam_id, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, n.niv_mensaje FROM tamizaje t INNER JOIN paciente p on (t.tam_pac_per_identificacion = p.pac_per_identificacion) INNER JOIN persona pe on (pe.per_identificacion = p.pac_per_identificacion) INNER JOIN nivel_riesgo n on (n.niv_id = t.tam_niv_id);',function(err, result){
        respuesta(res, err, result)
    });
}

const obtenerTamizajesByIdTamizaje = async(req = request, res = response) => {
    const {id_tam } = req.query;
    await pool.query(`SELECT pe.per_tip_id, pe.per_identificacion, t.tam_id, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, n.niv_mensaje FROM tamizaje t INNER JOIN paciente p on (t.tam_pac_per_identificacion = p.pac_per_identificacion) INNER JOIN persona pe on (pe.per_identificacion = p.pac_per_identificacion) INNER JOIN nivel_riesgo n on (n.niv_id = t.tam_niv_id) WHERE tam_id=${id_tam};`,function(err, result){
        respuesta(res, err, result)
    });
}


const obtenerTamizajesByUsuario = async(req = request, res = response) => {
    await pool.query('SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, t.tam_id, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, n.niv_mensaje, pe2.per_primer_nombre FROM tamizaje t INNER JOIN paciente p on (t.tam_pac_per_identificacion = p.pac_per_identificacion) INNER JOIN persona pe on (pe.per_identificacion = p.pac_per_identificacion) INNER JOIN nivel_riesgo n on (n.niv_id = t.tam_niv_id) INNER JOIN usuario u on (u.usu_per_identificacion = t.tam_usu_per_identificacion) INNER JOIN persona pe2 on (pe2.per_identificacion = u.usu_per_identificacion);',function(err, result){
        respuesta(res, err, result)
    });
}

const obtenerTamizajesRangoFecha = async(req = request, res = response) => {
    const { fecha_inicio, fecha_fin } = req.query;
    await pool.query(`SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, t.tam_id, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, n.niv_mensaje, pe2.per_primer_nombre FROM tamizaje t INNER JOIN paciente p on (t.tam_pac_per_identificacion = p.pac_per_identificacion) INNER JOIN persona pe on (pe.per_identificacion = p.pac_per_identificacion) INNER JOIN nivel_riesgo n on (n.niv_id = t.tam_niv_id) INNER JOIN usuario u on (u.usu_per_identificacion = t.tam_usu_per_identificacion) INNER JOIN persona pe2 on (pe2.per_identificacion = u.usu_per_identificacion) WHERE t.tam_fecha >= '${fecha_inicio}' AND t.tam_fecha <= '${fecha_fin}';`,function(err, result){
        respuesta(res, err, result)
    });
}

const obtenerTamizajesByIDRangoFecha = async(req = request, res = response) => {
    const { id, fecha_inicio, fecha_fin } = req.query;
    await pool.query(`SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, t.tam_id, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, n.niv_mensaje, pe2.per_primer_nombre FROM tamizaje t INNER JOIN paciente p on (t.tam_pac_per_identificacion = p.pac_per_identificacion) INNER JOIN persona pe on (pe.per_identificacion = p.pac_per_identificacion) INNER JOIN nivel_riesgo n on (n.niv_id = t.tam_niv_id) INNER JOIN usuario u on (u.usu_per_identificacion = t.tam_usu_per_identificacion) INNER JOIN persona pe2 on (pe2.per_identificacion = u.usu_per_identificacion) WHERE p.pac_per_identificacion = '${id}' AND t.tam_fecha >= '${fecha_inicio}' AND t.tam_fecha <= '${fecha_fin}';`,function(err, result){
        respuesta(res, err, result)
    });
}

const obtenerTamizajesByID = async(req = request, res = response) => {
    const { id } = req.query;
    await pool.query(`SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, t.tam_id, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, n.niv_mensaje, pe2.per_primer_nombre FROM tamizaje t INNER JOIN paciente p on (t.tam_pac_per_identificacion = p.pac_per_identificacion) INNER JOIN persona pe on (pe.per_identificacion = p.pac_per_identificacion) INNER JOIN nivel_riesgo n on (n.niv_id = t.tam_niv_id) INNER JOIN usuario u on (u.usu_per_identificacion = t.tam_usu_per_identificacion) INNER JOIN persona pe2 on (pe2.per_identificacion = u.usu_per_identificacion) WHERE p.pac_per_identificacion = ${id};`,function(err, result){
        respuesta(res, err, result)
    });
}

const obtenerTamizajesByTipoID = async(req = request, res = response) => {
    const { tipo_id } = req.query;
    await pool.query(`SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, t.tam_id, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, n.niv_mensaje, pe2.per_primer_nombre FROM tamizaje t INNER JOIN paciente p on (t.tam_pac_per_identificacion = p.pac_per_identificacion) INNER JOIN persona pe on (pe.per_identificacion = p.pac_per_identificacion) INNER JOIN nivel_riesgo n on (n.niv_id = t.tam_niv_id) INNER JOIN usuario u on (u.usu_per_identificacion = t.tam_usu_per_identificacion) INNER JOIN persona pe2 on (pe2.per_identificacion = u.usu_per_identificacion) WHERE pe.per_tip_id = '${tipo_id}';`,function(err, result){
        respuesta(res, err, result)
    });
}


const obtenerFotos = async(req = request, res = response) => {
    await pool.query(`SELECT t.tam_id, t.tam_pac_per_identificacion, t.tam_fecha, t.tam_contraste, t.tam_vph, t.tam_vph_no_info, t.tam_niv_id, i.ima_tipo, i.ima_ruta FROM tamizaje t INNER JOIN imagen i ON (t.tam_id = i.ima_tam_id);`, function(err, result){
        respuesta(res, err, result)
    });
}

const obtenerUltimoTamizaje = async(req = request, res = response) => {
    const { id } = req.query;
    await pool.query(`SELECT max(tam_id) FROM tamizaje WHERE tam_pac_per_identificacion='${id}';`, function(err, result){
        respuesta(res, err, result)
    });
}

const crearTamizaje = async(req = request, res = response) => {
    const { tam_pac_per_identificacion, tam_usu_per_identificacion, tam_fecha, tam_contraste, tam_vph, tam_vph_no_info, tam_niv_id } = req.body;
    await pool.query(`INSERT INTO tamizaje (tam_pac_per_identificacion, tam_usu_per_identificacion, tam_fecha, tam_contraste, tam_vph, tam_vph_no_info, tam_niv_id) VALUES ( '${tam_pac_per_identificacion}', '${tam_usu_per_identificacion}', '${tam_fecha}', '${tam_contraste}', '${tam_vph}', '${tam_vph_no_info}', '${tam_niv_id}')`, function(err, result){
        respuesta(res, err, result)
    });
}



module.exports = {
    obtenerTamizajes,
    obtenerTamizajesByUsuario,
    obtenerTamizajesRangoFecha,
    obtenerTamizajesByIDRangoFecha,
    obtenerTamizajesByID,
    obtenerTamizajesByTipoID,
    obtenerFotos,
    crearTamizaje,
    obtenerUltimoTamizaje,
    obtenerTamizajesByIdTamizaje
}