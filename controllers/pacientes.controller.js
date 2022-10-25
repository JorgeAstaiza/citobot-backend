const { response, request } = require('express');
const { pool } = require('../database/config');

const tokenGlobal = 'Authorization';
// comment
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

const getPaciente = async (req = request, res = response) => {
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			'SELECT p.per_identificacion, p.per_tip_id, p.per_primer_nombre, p.per_otros_nombres, p.per_primer_apellido, p.per_segundo_apellido, pac_per_identificacion, pac_fecha_nacimiento, pac_direccion, pac_telefono, pac_celular, pac_correo, pac_contacto_alternativo, pac_telefono_contacto_alternativo, pac_nivel_educacion, pac_estado_civil, pac_situacion_laboral, pac_eps_id, pac_regimen_salud, pac_estrato, pac_diabetes, pac_fuma, pac_peso, pac_talla, pac_primera_mestruacion, pac_partos, pac_dispositivo_intrauterino, pac_tiempo_insercion_DIU, pac_anticonceptivos_orales, pac_parejas_sexuales, pac_relacion_condon, pac_vacuna_vph, pac_ultima_citologia, pac_prueba_ADN_VPH, pac_menopausia, pac_infecciones_ts FROM paciente INNER JOIN persona p ON (pac_per_identificacion = p.per_identificacion);',
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const getPacienteById = async (req = request, res = response) => {
	const { id } = req.query;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT p.per_identificacion, p.per_tip_id, p.per_primer_nombre, p.per_otros_nombres, p.per_primer_apellido, p.per_segundo_apellido, pac_per_identificacion, pac_fecha_nacimiento, pac_direccion, pac_telefono, pac_celular, pac_correo, pac_contacto_alternativo, pac_telefono_contacto_alternativo, pac_nivel_educacion, pac_estado_civil, pac_situacion_laboral, pac_eps_id, pac_regimen_salud, pac_estrato, pac_diabetes, pac_fuma, pac_peso, pac_talla, pac_primera_mestruacion, pac_partos, pac_dispositivo_intrauterino, pac_tiempo_insercion_DIU, pac_anticonceptivos_orales, pac_parejas_sexuales, pac_relacion_condon, pac_vacuna_vph, pac_ultima_citologia, pac_prueba_ADN_VPH, pac_menopausia, pac_infecciones_ts FROM paciente INNER JOIN persona p ON (pac_per_identificacion = p.per_identificacion) WHERE p.per_identificacion=${id};`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const getPacienteByTipoId = async (req = request, res = response) => {
	const { tipo_id } = req.query;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`SELECT p.per_identificacion, p.per_tip_id, p.per_primer_nombre, p.per_otros_nombres, p.per_primer_apellido, p.per_segundo_apellido, pac_per_identificacion, pac_fecha_nacimiento, pac_direccion, pac_telefono, pac_celular, pac_correo, pac_contacto_alternativo, pac_telefono_contacto_alternativo, pac_nivel_educacion, pac_estado_civil, pac_situacion_laboral, pac_eps_id, pac_regimen_salud, pac_estrato, pac_diabetes, pac_fuma, pac_peso, pac_talla, pac_primera_mestruacion, pac_partos, pac_dispositivo_intrauterino, pac_tiempo_insercion_DIU, pac_anticonceptivos_orales, pac_parejas_sexuales, pac_relacion_condon, pac_vacuna_vph, pac_ultima_citologia, pac_prueba_ADN_VPH, pac_menopausia, pac_infecciones_ts FROM paciente INNER JOIN persona p ON (pac_per_identificacion = p.per_identificacion) WHERE p.per_tip_id='${tipo_id}';`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const actualizarPaciente = async (req = request, res = response) => {
	const { id } = req.params;
	const {
		pac_fecha_nacimiento,
		pac_direccion,
		pac_telefono,
		pac_celular,
		pac_correo,
		pac_contacto_alternativo,
		pac_telefono_contacto_alternativo,
		pac_nivel_educacion,
		pac_estado_civil,
		pac_situacion_laboral,
		pac_eps_id,
		pac_regimen_salud,
		pac_estrato,
		pac_diabetes,
		pac_fuma,
		pac_peso,
		pac_talla,
		pac_primera_mestruacion,
		pac_partos,
		pac_dispositivo_intrauterino,
		pac_tiempo_insercion_DIU,
		pac_anticonceptivos_orales,
		pac_parejas_sexuales,
		pac_relacion_condon,
		pac_vacuna_vph,
		pac_ultima_citologia,
		pac_prueba_ADN_VPH,
		pac_menopausia,
		pac_infecciones_ts
	} = req.body;

	console.log(req.body);
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`UPDATE paciente SET pac_fecha_nacimiento='${pac_fecha_nacimiento}',pac_direccion='${pac_direccion}',pac_telefono='${pac_telefono}',pac_celular='${pac_celular}',pac_correo='${pac_correo}',pac_contacto_alternativo='${pac_contacto_alternativo}',pac_telefono_contacto_alternativo='${pac_telefono_contacto_alternativo}',pac_nivel_educacion='${pac_nivel_educacion}',pac_estado_civil='${pac_estado_civil}',pac_situacion_laboral='${pac_situacion_laboral}',pac_eps_id=${pac_eps_id},pac_regimen_salud='${pac_regimen_salud}',pac_estrato=${pac_estrato},pac_diabetes='${pac_diabetes}',pac_fuma='${pac_fuma}',pac_peso=${pac_peso},pac_talla=${pac_talla},pac_primera_mestruacion=${pac_primera_mestruacion},pac_partos='${pac_partos}',pac_dispositivo_intrauterino='${pac_dispositivo_intrauterino}',pac_tiempo_insercion_DIU='${pac_tiempo_insercion_DIU}',pac_anticonceptivos_orales='${pac_anticonceptivos_orales}',pac_parejas_sexuales=${pac_parejas_sexuales},pac_relacion_condon='${pac_relacion_condon}',pac_vacuna_vph='${pac_vacuna_vph}',pac_ultima_citologia='${pac_ultima_citologia}',pac_prueba_ADN_VPH='${pac_prueba_ADN_VPH}',pac_menopausia='${pac_menopausia}',pac_infecciones_ts='${pac_infecciones_ts}' WHERE pac_per_identificacion='${id}';`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

const crearPaciente = async (req = request, res = response) => {
	const {
		pac_per_identificacion,
		pac_fecha_nacimiento,
		pac_direccion,
		pac_telefono,
		pac_celular,
		pac_correo,
		pac_contacto_alternativo,
		pac_telefono_contacto_alternativo,
		pac_nivel_educacion,
		pac_estado_civil,
		pac_situacion_laboral,
		pac_eps_id,
		pac_regimen_salud,
		pac_estrato,
		pac_diabetes,
		pac_fuma,
		pac_peso,
		pac_talla,
		pac_primera_mestruacion,
		pac_partos,
		pac_dispositivo_intrauterino,
		pac_tiempo_insercion_DIU,
		pac_anticonceptivos_orales,
		pac_parejas_sexuales,
		pac_relacion_condon,
		pac_vacuna_vph,
		pac_ultima_citologia,
		pac_prueba_ADN_VPH,
		pac_menopausia,
		pac_infecciones_ts
	} = req.body;
	const token = req.header(tokenGlobal);
	if (token) {
		await pool.query(
			`INSERT INTO paciente (pac_per_identificacion, pac_fecha_nacimiento, pac_direccion, pac_telefono, pac_celular, pac_correo, pac_contacto_alternativo, pac_telefono_contacto_alternativo, pac_nivel_educacion, pac_estado_civil, pac_situacion_laboral, pac_eps_id, pac_regimen_salud, pac_estrato, pac_diabetes, pac_fuma, pac_peso, pac_talla, pac_primera_mestruacion, pac_partos, pac_dispositivo_intrauterino, pac_tiempo_insercion_DIU, pac_anticonceptivos_orales, pac_parejas_sexuales, pac_relacion_condon, pac_vacuna_vph, pac_ultima_citologia, pac_prueba_ADN_VPH, pac_menopausia, pac_infecciones_ts) VALUES ('${pac_per_identificacion}', '${pac_fecha_nacimiento}', '${pac_direccion}', '${pac_telefono}', '${pac_celular}', '${pac_correo}', '${pac_contacto_alternativo}', '${pac_telefono_contacto_alternativo}', '${pac_nivel_educacion}', '${pac_estado_civil}', '${pac_situacion_laboral}', ${pac_eps_id}, '${pac_regimen_salud}', ${pac_estrato}, '${pac_diabetes}', '${pac_fuma}', ${pac_peso}, ${pac_talla}, ${pac_primera_mestruacion}, '${pac_partos}', '${pac_dispositivo_intrauterino}', '${pac_tiempo_insercion_DIU}', '${pac_anticonceptivos_orales}', ${pac_parejas_sexuales}, '${pac_relacion_condon}', '${pac_vacuna_vph}', '${pac_ultima_citologia}', '${pac_prueba_ADN_VPH}', '${pac_menopausia}', '${pac_infecciones_ts}');`,
			function (err, result) {
				respuesta(res, err, result);
			}
		);
	} else {
		res.status(403).send({ error: 'no autorizado' });
	}
};

module.exports = {
	getPaciente,
	actualizarPaciente,
	crearPaciente,
	getPacienteById,
	getPacienteByTipoId
};
