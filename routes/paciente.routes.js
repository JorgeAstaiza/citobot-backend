const { Router } = require('express');
const {
	getPaciente,
	crearPaciente,
	actualizarPaciente,
	getPacienteById,
	getPacienteByTipoId
} = require('../controllers/pacientes.controller');
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Paciente:
 *              type: object
 *              properties:
 *                  per_tip_id:
 *                      type: string
 *                      descripcion: tipo de indentificacion
 *                  pac_direccion:
 *                      type: string
 *                      descripcion: direccion de residencia
 *                  pac_fecha_nacimiento:
 *                      type: string
 *                      descripcion: fecha nacimiento
 *                  per_primer_nombre:
 *                      type: string
 *                      descripcion: primer nombre
 *                  per_otros_nombres:
 *                      type: string
 *                      descripcion: segundo nombre
 *                  per_primer_apellido:
 *                      type: string
 *                      descripcion: primer apellido
 *                  per_segundo_apellido:
 *                      type: string
 *                      descripcion: segundo apellido
 *                  per_identificacion:
 *                      type: string
 *                      descripcion: numero de identificacion
 *                  pac_telefono:
 *                      type: string
 *                      descripcion: numero telefonico
 *                  pac_celular:
 *                       type: string
 *                       descripcion: numero de celular
 *                  pac_correo:
 *                      type: string
 *                      descripcion: correo electronico
 *                  pac_contacto_alternativo:
 *                      type: string
 *                      descripcion: nombre de contacto alternativo
 *                  pac_telefono_contacto_alternativo:
 *                      type: string
 *                      descripcion: telefono de contacto alternativo
 *                  pac_nivel_educacion:
 *                      type: string
 *                      descripcion: nivel educativo
 *                  pac_estado_civil:
 *                      type: string
 *                      descripcion: estado civil
 *                  pac_situacion_laboral:
 *                      type: string
 *                      descripcion: situacion laboral
 *                  pac_eps_id:
 *                      type: integer
 *                      descripcion: id eps
 *                  pac_regimen_salud:
 *                      type: string
 *                      descripcion: tipo de regimen de salud
 *                  pac_estrato:
 *                      type: integer
 *                      descripcion: estrato socioeconomico
 *                  pac_diabetes:
 *                      type: string
 *                      descripcion: diabetes
 *                  pac_fuma:
 *                      type: string
 *                      descripcion: fumador
 *                  pac_peso:
 *                      type: number
 *                      descripcion: peso del paciente
 *                  pac_talla:
 *                      type: number
 *                      descripcion: talla del paciente
 *                  pac_primera_mestruacion:
 *                      type: integer
 *                      descripcion: primera mestruacion
 *                  pac_partos:
 *                      type: string
 *                      descripcion: partos
 *                  pac_dispositivo_intrauterino:
 *                      type: string
 *                      descripcion: partos
 *                  pac_tiempo_insercion_DIU:
 *                      type: string
 *                      descripcion: tiempo insercion DIU
 *                  pac_anticonceptivos_orales:
 *                      type: string
 *                      descripcion: uso de anticonceptivos orales
 *                  pac_parejas_sexuales:
 *                      type: integer
 *                      descripcion: numero de parejas sexuales
 *                  pac_relacion_condon:
 *                      type: string
 *                      descripcion: relaciones sexuales con condon
 *                  pac_vacuna_vph:
 *                      type: string
 *                      descripcion: vacuna vph
 *                  pac_ultima_citologia:
 *                      type: string
 *                      descripcion: ultima citologia
 *                  pac_prueba_ADN_VPH:
 *                      type: string
 *                      descripcion: prueba ADN VPH
 *                  pac_menopausia:
 *                      type: string
 *                      descripcion: menopausia
 *                  pac_infecciones_ts:
 *                      type: string
 *                      descripcion: infecciones ts
 *              example:
 *                  per_identificacion: 1062331745
 *                  per_tip_id: TI
 *                  per_primer_nombre: María
 *                  per_otros_nombres: Mercedes
 *                  per_primer_apellido: Castrillón
 *                  per_segundo_apellido: Martínez
 *                  pac_per_identificacion: 1062331745
 *                  pac_fecha_nacimiento: 2006-05-06T05:00:00.000Z
 *                  pac_direccion: null
 *                  pac_telefono:
 *                  pac_celular: null
 *                  pac_correo: null
 *                  pac_contacto_alternativo: null
 *                  pac_telefono_contacto_alternativo: null
 *                  pac_nivel_educacion: Educación Primaria
 *                  pac_estado_civil: Casada/Unión Libre
 *                  pac_situacion_laboral: Obrera/Empleada
 *                  pac_eps_id: 1
 *                  pac_regimen_salud: Contributivo Cotizante
 *                  pac_estrato: 0
 *                  pac_diabetes: Si
 *                  pac_fuma: Si
 *                  pac_peso: 0
 *                  pac_talla: 0
 *                  pac_primera_mestruacion: 0
 *                  pac_partos: Ninguno
 *                  pac_dispositivo_intrauterino: Si
 *                  pac_tiempo_insercion_DIU: <5 años
 *                  pac_anticonceptivos_orales: Si
 *                  pac_parejas_sexuales: 0
 *                  pac_relacion_condon: Si
 *                  pac_vacuna_vph: Sin vacuna
 *                  pac_ultima_citologia: Menos de 3 años
 *                  pac_prueba_ADN_VPH: No
 *                  pac_menopausia: Si
 *                  pac_infecciones_ts: Todas
 */

/**
 * @swagger
 * /api/pacientes/consultar:
 *  get:
 *      summary: obtener todos los pacientes
 *      tags: [Paciente]
 *      responses:
 *          200:
 *              description: paciente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Paciente'
 */

/**
 * @swagger
 * /api/pacientes/identificacion?id={id}:
 *  get:
 *      summary: obtener paciente por id
 *      tags: [Paciente]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: numero identificacion del paciente
 *      responses:
 *          200:
 *              description: paciente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Paciente'
 */

/**
 * @swagger
 * /api/pacientes/tipoId?tipo_id={tipo_id}:
 *  get:
 *      summary: obtener paciente por id
 *      tags: [Paciente]
 *      parameters:
 *          - in: path
 *            name: tipo_id
 *            schema:
 *              type: string
 *            required: true
 *            description: tipo identificacion del paciente
 *      responses:
 *          200:
 *              description: paciente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Paciente'
 */

/**
 * @swagger
 * /api/pacientes/crear:
 *   post:
 *     summary: crear un paciente
 *     tags: [Paciente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items:
 *                  $ref: '#/components/schemas/Paciente'
 *              example:
 *                  per_identificacion: 1062331745
 *                  per_tip_id: TI
 *                  per_primer_nombre: María
 *                  per_otros_nombres: Mercedes
 *                  per_primer_apellido: Castrillón
 *                  per_segundo_apellido: Martínez
 *                  pac_per_identificacion: 1062331745
 *                  pac_fecha_nacimiento: 2006-05-06T05:00:00.000Z
 *                  pac_direccion: null
 *                  pac_telefono:
 *                  pac_celular: null
 *                  pac_correo: null
 *                  pac_contacto_alternativo: null
 *                  pac_telefono_contacto_alternativo: null
 *                  pac_nivel_educacion: Educación Primaria
 *                  pac_estado_civil: Casada/Unión Libre
 *                  pac_situacion_laboral: Obrera/Empleada
 *                  pac_eps_id: 1
 *                  pac_regimen_salud: Contributivo Cotizante
 *                  pac_estrato: 0
 *                  pac_diabetes: Si
 *                  pac_fuma: Si
 *                  pac_peso: 0
 *                  pac_talla: 0
 *                  pac_primera_mestruacion: 0
 *                  pac_partos: Ninguno
 *                  pac_dispositivo_intrauterino: Si
 *                  pac_tiempo_insercion_DIU: <5 años
 *                  pac_anticonceptivos_orales: Si
 *                  pac_parejas_sexuales: 0
 *                  pac_relacion_condon: Si
 *                  pac_vacuna_vph: Sin vacuna
 *                  pac_ultima_citologia: Menos de 3 años
 *                  pac_prueba_ADN_VPH: No
 *                  pac_menopausia: Si
 *                  pac_infecciones_ts: Todas
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/pacientes/actualizar/{id}:
 *   put:
 *     summary: actualizar un paciente
 *     tags: [Paciente]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id del paciente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items:
 *                  $ref: '#/components/schemas/Paciente'
 *              example:
 *                  per_identificacion: 1062331745
 *                  per_tip_id: TI
 *                  per_primer_nombre: María
 *                  per_otros_nombres: Mercedes
 *                  per_primer_apellido: Castrillón
 *                  per_segundo_apellido: Martínez
 *                  pac_per_identificacion: 1062331745
 *                  pac_fecha_nacimiento: 2006-05-06T05:00:00.000Z
 *                  pac_direccion: null
 *                  pac_telefono:
 *                  pac_celular: null
 *                  pac_correo: null
 *                  pac_contacto_alternativo: null
 *                  pac_telefono_contacto_alternativo: null
 *                  pac_nivel_educacion: Educación Primaria
 *                  pac_estado_civil: Casada/Unión Libre
 *                  pac_situacion_laboral: Obrera/Empleada
 *                  pac_eps_id: 1
 *                  pac_regimen_salud: Contributivo Cotizante
 *                  pac_estrato: 0
 *                  pac_diabetes: Si
 *                  pac_fuma: Si
 *                  pac_peso: 0
 *                  pac_talla: 0
 *                  pac_primera_mestruacion: 0
 *                  pac_partos: Ninguno
 *                  pac_dispositivo_intrauterino: Si
 *                  pac_tiempo_insercion_DIU: <5 años
 *                  pac_anticonceptivos_orales: Si
 *                  pac_parejas_sexuales: 0
 *                  pac_relacion_condon: Si
 *                  pac_vacuna_vph: Sin vacuna
 *                  pac_ultima_citologia: Menos de 3 años
 *                  pac_prueba_ADN_VPH: No
 *                  pac_menopausia: Si
 *                  pac_infecciones_ts: Todas
 *     responses:
 *       200:
 *         description: Paciente actualizado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

router.get('/consultar', getPaciente);
router.get('/ ', getPacienteById);
router.get('/tipoId', getPacienteByTipoId);

router.post('/crear', crearPaciente);
router.put('/actualizar/:id', actualizarPaciente);

module.exports = router;
