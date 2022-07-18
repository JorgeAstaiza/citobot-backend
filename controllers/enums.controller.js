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

const consutarEnum = async(req = request, res = response) => {
    const {tabla, columna} = req.query;
    const qr = await pool.query(`SELECT SUBSTRING(COLUMN_TYPE,5) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='u214255937_citobot' AND TABLE_NAME='${tabla}' AND COLUMN_NAME='${columna}';`, function(err, result){
        respuesta(res, err, result)
    });
    console.log(qr.sql);    
}

module.exports = {
    consutarEnum
}