const { Router } = require('express');
const { getPaciente, crearPaciente, actualizarPaciente, getPacienteById, getPacienteByTipoId } = require('../controllers/pacientes.controller');
const router = Router();


/**
 * @swagger
 *  components:
 *      schemas:
 *          Paciente:
 *              type: object
 *              properties:
 *                  per_identificacion:
 *                      type: string
 *                      descripcion: numero indentificacion
 *                  per_tip_id:
 *                      type: string
 *                      descripcion: tipo de indentificacion
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
 *                  gen_nombre:
 *                      type: string
 *                      descripcion: genero
 *                  pac_fecha_nacimiento:
 *                      type: string
 *                      descripcion: fecha nacimiento
 *                  pac_anticonceptivos_barrera:
 *                      type: string
 *                      descripcion: uso de anticonsecutivos
 *                  pac_nu_embarazos:
 *                      type: integer
 *                      descripcion: numero de embarazos
 *                  pac_nu_parejas_sexuales:
 *                      type: integer
 *                      descripcion: numero de parejas sexuales
 *                  pac_antecedentes_ginecobstreticos:
 *                      type: string
 *                      descripcion: antecedes ginecobstreticos 
 *                  pac_caracteristicas_ginecobstetricas:
 *                      type: string
 *                      descripcion: caracteristicas ginecobstreticos 
 *                  pac_otras_variables_demograficas:
 *                      type: string
 *                      descripcion: otras variables demograficas 
 *              required:
 *                  - per_identificacion
 *                  - per_tip_id
 *                  - per_primer_nombre
 *                  - per_otros_nombres
 *                  - per_primer_apellido
 *              example:
 *                  per_tip_id: "1061160752"
 *                  per_identificacion: CC
 *                  per_primer_nombre: Milena
 *                  per_otros_nombres: Yulieth
 *                  per_primer_apellido: Pito
 *                  per_segundo_apellido: Muñoz
 *                  gen_nombre: Femenino
 *                  pac_fecha_nacimiento: 2006-05-06T05:00:00.000Z
 *                  pac_anticonceptivos_barrera: No
 *                  pac_nu_embarazos: 0
 *                  pac_nu_parejas_sexuales: 0
 *                  pac_antecedentes_ginecobstreticos: Ninguno
 *                  pac_caracteristicas_ginecobstetricas: No se observan características anormales
 *                  pac_otras_variables_demograficas: Ninguna
 *      
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
 * /api/pacientes/identificacion?tipo_id={tipo_id}:
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
 *                  pac_per_identificacion:
 *                      type: string
 *                      descripcion: numero indentificacion de una persona
 *                  pac_fecha_nacimiento:
 *                      type: string
 *                      descripcion: fecha nacimiento
 *                  pac_anticonceptivos_barrera:
 *                      type: string
 *                      descripcion: metodo anticonceptivo 
 *                  pac_nu_embarazos:
 *                      type: integer
 *                      descripcion: numero de embarazos
 *                  pac_nu_parejas_sexuales:
 *                      type: integer
 *                      descripcion: numero de parejas sexuales
 *                  pac_antecedentes_ginecobstreticos:
 *                      type: string
 *                      descripcion: antecedentes ginecobstreticos 
 *                  pac_caracteristicas_ginecobstetricas:
 *                      type: string
 *                      descripcion: caracteristicas ginecobstetricas
 *                  pac_otras_variables_demograficas:
 *                      type: string
 *                      descripcion: variables demograficas
 *              example:
 *                  pac_per_identificacion: 10564454
 *                  pac_fecha_nacimiento: 1983/08/13
 *                  pac_anticonceptivos_barrera: No
 *                  pac_nu_embarazos: 0
 *                  pac_nu_parejas_sexuales: 1
 *                  pac_antecedentes_ginecobstreticos: Ninguno
 *                  pac_caracteristicas_ginecobstetricas: Ninguno
 *                  pac_otras_variables_demograficas: Ninguno
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
 *                  pac_fecha_nacimiento:
 *                      type: string
 *                      descripcion: fecha de nacimiento
 *                  pac_anticonceptivos_barrera:
 *                      type: string
 *                      descripcion: metodo anticonceptivo
 *                  pac_nu_embarazos:
 *                      type: integer
 *                      descripcion: numero de embarazos
 *                  pac_nu_parejas_sexuales:
 *                      type: integer
 *                      descripcion: numero de parejas sexuales
 *                  pac_antecedentes_ginecobstreticos:
 *                      type: string
 *                      descripcion: antecedentes ginecobstreticos
 *                  pac_caracteristicas_ginecobstetricas:
 *                      type: string
 *                      descripcion: caracteristicas ginecobstetricas
 *                  pac_otras_variables_demograficas:
 *                      type: string
 *                      descripcion: variables demograficas
 *              example:
 *                  pac_fecha_nacimiento: 1983/08/15
 *                  pac_anticonceptivos_barrera: Condón
 *                  pac_nu_embarazos: 1
 *                  pac_nu_parejas_sexuales: 2
 *                  pac_antecedentes_ginecobstreticos: No aplica
 *                  pac_caracteristicas_ginecobstetricas: No Aplica
 *                  pac_otras_variables_demograficas: No Aplica
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
router.get('/identificacion', getPacienteById);
router.get('/tipoId', getPacienteByTipoId);

router.post('/crear', crearPaciente);
router.put('/actualizar/:id', actualizarPaciente);

module.exports = router;