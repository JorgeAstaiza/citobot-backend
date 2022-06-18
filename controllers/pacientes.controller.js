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

const getPaciente = async(req = request, res = response) => {
    await pool.query('SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, pe.per_otros_nombres, pe.per_primer_apellido, pe.per_segundo_apellido, g.gen_nombre, pa.pac_fecha_nacimiento, pa.pac_anticonceptivos_barrera, pa.pac_nu_embarazos, pa.pac_nu_parejas_sexuales, pa.pac_antecedentes_ginecobstreticos, pa.pac_caracteristicas_ginecobstetricas, pa.pac_otras_variables_demograficas FROM paciente pa INNER JOIN persona pe on (pa.pac_per_identificacion = pe.per_identificacion) INNER JOIN genero g on (pe.per_gen_id = g.gen_id);',function(err, result){
        respuesta(res, err, result)
    });
}

const getPacienteById = async(req = request, res = response) => {
    const { id } = req.query;
    await pool.query(`SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, pe.per_otros_nombres, pe.per_primer_apellido, pe.per_segundo_apellido, g.gen_nombre, pa.pac_fecha_nacimiento, pa.pac_anticonceptivos_barrera, pa.pac_nu_embarazos, pa.pac_nu_parejas_sexuales, pa.pac_antecedentes_ginecobstreticos, pa.pac_caracteristicas_ginecobstetricas, pa.pac_otras_variables_demograficas FROM paciente pa INNER JOIN persona pe on (pa.pac_per_identificacion = pe.per_identificacion) INNER JOIN genero g on (pe.per_gen_id = g.gen_id) WHERE pe.per_identificacion=${id}`,function(err, result){
        respuesta(res, err, result)
    });
}

const getPacienteByTipoId = async(req = request, res = response) => {
    const { tipo_id } = req.query;
    await pool.query(`SELECT pe.per_tip_id, pe.per_identificacion, pe.per_primer_nombre, pe.per_otros_nombres, pe.per_primer_apellido, pe.per_segundo_apellido, g.gen_nombre, pa.pac_fecha_nacimiento, pa.pac_anticonceptivos_barrera, pa.pac_nu_embarazos, pa.pac_nu_parejas_sexuales, pa.pac_antecedentes_ginecobstreticos, pa.pac_caracteristicas_ginecobstetricas, pa.pac_otras_variables_demograficas FROM paciente pa INNER JOIN persona pe on (pa.pac_per_identificacion = pe.per_identificacion) INNER JOIN genero g on (pe.per_gen_id = g.gen_id) WHERE pe.per_tip_id='${tipo_id}';`,function(err, result){
        respuesta(res, err, result)
    });
}

const actualizarPaciente = async(req = request, res = response) => {
    const { id } = req.params;
    const { pac_fecha_nacimiento, pac_anticonceptivos_barrera, pac_nu_embarazos, pac_nu_parejas_sexuales, pac_antecedentes_ginecobstreticos, pac_caracteristicas_ginecobstetricas, pac_otras_variables_demograficas} = req.body;
    await pool.query(`UPDATE paciente SET pac_fecha_nacimiento="${pac_fecha_nacimiento}", pac_anticonceptivos_barrera="${pac_anticonceptivos_barrera}", pac_nu_embarazos="${pac_nu_embarazos}", pac_nu_parejas_sexuales="${pac_nu_parejas_sexuales}", pac_antecedentes_ginecobstreticos="${pac_antecedentes_ginecobstreticos}", pac_caracteristicas_ginecobstetricas="${pac_caracteristicas_ginecobstetricas}", pac_otras_variables_demograficas="${pac_otras_variables_demograficas}" WHERE pac_per_identificacion="${id}" `,function(err, result){
        respuesta(res, err, result)
    });
}

const crearPaciente = async(req = request, res = response) => {
    const { pac_per_identificacion, pac_fecha_nacimiento, pac_anticonceptivos_barrera, pac_nu_embarazos, pac_nu_parejas_sexuales, pac_antecedentes_ginecobstreticos, pac_caracteristicas_ginecobstetricas, pac_otras_variables_demograficas} = req.body;
    await pool.query(`INSERT INTO paciente (pac_per_identificacion, pac_fecha_nacimiento, pac_anticonceptivos_barrera, pac_nu_embarazos, pac_nu_parejas_sexuales, pac_antecedentes_ginecobstreticos, pac_caracteristicas_ginecobstetricas, pac_otras_variables_demograficas) VALUES ("${pac_per_identificacion}", "${pac_fecha_nacimiento}", "${pac_anticonceptivos_barrera}", ${pac_nu_embarazos}, ${pac_nu_parejas_sexuales}, "${pac_antecedentes_ginecobstreticos}", "${pac_caracteristicas_ginecobstetricas}", "${pac_otras_variables_demograficas}")`,function(err, result){
        respuesta(res, err, result)
    });
}

module.exports = {
    getPaciente,
    actualizarPaciente,
    crearPaciente,
    getPacienteById,
    getPacienteByTipoId
}