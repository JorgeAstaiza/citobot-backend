const { Router } = require('express');
const { obtenerTamizajes, obtenerTamizajesRangoFecha, obtenerTamizajesByUsuario, obtenerTamizajesByIDRangoFecha, obtenerTamizajesByID, obtenerTamizajesByTipoID, obtenerFotos } = require('../controllers/tamizajes.controller');
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Tamizaje:
 *              type: object
 *              properties:
 *                  per_identificacion:
 *                      type: string
 *                      descripcion: numero indentificacion
 *                  per_tip_id:
 *                      type: string
 *                      descripcion: tipo de indentificacion
 *                  tam_id:
 *                      type: string
 *                      descripcion: id tamizaje
 *                  tam_fecha:
 *                      type: string
 *                      descripcion: fecja toma tamizaje
 *                  tam_contraste:
 *                      type: string
 *                      descripcion: contraste
 *                  tam_vph:
 *                      type: string
 *                      descripcion: VPH
 *                  tam_vph_no_info:
 *                      type: integer
 *                      descripcion: genero
 *                  tam_niv_id:
 *                      type: integer
 *                      descripcion: genero
 *                  niv_mensaje:
 *                      type: string
 *                      descripcion: mensaje 
 *              example:
 *                  per_identificacion: 1061160752
 *                  per_tip_id: CC
 *                  tam_id: 1
 *                  tam_fecha: 2022-05-25T05:00:00.000Z
 *                  tam_contraste: Sin Contraste
 *                  tam_vph: Sin VPH
 *                  tam_vph_no_info: 0
 *                  tam_niv_id: 1
 *                  niv_mensaje: Sin riesgo de cáncer
 */


/**
 * @swagger
 * /api/tamizajes/todos:
 *  get:
 *      summary: obtener todos los tamizajes
 *      tags: [Tamizaje]
 *      responses:
 *          200:
 *              description: tamizajes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data: 
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Tamizaje'          
 */

/**
 * @swagger
 * /api/tamizajes/todosConUsuario:
 *  get:
 *      summary: obtener todos los tamizajes
 *      tags: [Tamizaje]
 *      responses:
 *          200:
 *              description: tamizajes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              per_tip_id: TI
 *                              per_identificacion: 1062331745
 *                              per_primer_nombre: Ivonne
 *                              tam_id: 1
 *                              tam_fecha: 2022-05-25T05:00:00.000Z
 *                              tam_contraste: Sin Contraste
 *                              tam_vph: Sin VPH
 *                              tam_vph_no_info: 0
 *                              tam_niv_id: 1
 *                              niv_mensaje: Sin riesgo de cáncer
 */

/**
 * @swagger
 * /api/tamizajes/rangoFecha?fecha_inicio={fecha_inicio}&fecha_fin={fecha_fin}:
 *  get:
 *      summary: obtener tamizajes por rango de fecha
 *      tags: [Tamizaje]
 *      parameters:
 *          - in: path
 *            name: fecha_inicio
 *            schema:
 *              type: string
 *            required: true
 *            description: fecha inicio
 *          - in: path
 *            name: fecha_fin
 *            schema:
 *              type: string
 *            required: true
 *            description: fecha fin
 *      responses:
 *          200:
 *              description: tamizajes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              per_tip_id: TI
 *                              per_identificacion: 1062331745
 *                              per_primer_nombre: Ivonne
 *                              tam_id: 1
 *                              tam_fecha: 2022-05-25T05:00:00.000Z
 *                              tam_contraste: Sin Contraste
 *                              tam_vph: Sin VPH
 *                              tam_vph_no_info: 0
 *                              tam_niv_id: 1
 *                              niv_mensaje: Sin riesgo de cáncer
 */

/**
 * @swagger
 * /api/tamizajes/idRangoFecha?id={id}&fecha_inicio={fecha_inicio}&fecha_fin={fecha_fin}:
 *  get:
 *      summary: obtener tamizajes por rango de fecha y id de paciente
 *      tags: [Tamizaje]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: identificacion del paciente
 *          - in: path
 *            name: fecha_inicio
 *            schema:
 *              type: string
 *            required: true
 *            description: fecha inicio
 *          - in: path
 *            name: fecha_fin
 *            schema:
 *              type: string
 *            required: true
 *            description: fecha fin
 *      responses:
 *          200:
 *              description: tamizajes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              per_tip_id: TI
 *                              per_identificacion: 1062331745
 *                              per_primer_nombre: Ivonne
 *                              tam_id: 1
 *                              tam_fecha: 2022-05-25T05:00:00.000Z
 *                              tam_contraste: Sin Contraste
 *                              tam_vph: Sin VPH
 *                              tam_vph_no_info: 0
 *                              tam_niv_id: 1
 *                              niv_mensaje: Sin riesgo de cáncer
 */

/**
 * @swagger
 * /api/tamizajes/identificacion?id={id}:
 *  get:
 *      summary: obtener tamizajes por id de paciente
 *      tags: [Tamizaje]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: identificacion del paciente
 *      responses:
 *          200:
 *              description: tamizajes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              per_tip_id: TI
 *                              per_identificacion: 1062331745
 *                              per_primer_nombre: Ivonne
 *                              tam_id: 1
 *                              tam_fecha: 2022-05-25T05:00:00.000Z
 *                              tam_contraste: Sin Contraste
 *                              tam_vph: Sin VPH
 *                              tam_vph_no_info: 0
 *                              tam_niv_id: 1
 *                              niv_mensaje: Sin riesgo de cáncer
 */

/**
 * @swagger
 * /api/tamizajes/tipoIdentificacion?tipo_id={tipo_id}:
 *  get:
 *      summary: obtener tamizajes por tipo identificacion de paciente
 *      tags: [Tamizaje]
 *      parameters:
 *          - in: path
 *            name: tipo_id
 *            schema:
 *              type: string
 *            required: true
 *            description: tipo identificacion del paciente
 *      responses:
 *          200:
 *              description: tamizajes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              per_tip_id: TI
 *                              per_identificacion: 1062331745
 *                              per_primer_nombre: Ivonne
 *                              tam_id: 1
 *                              tam_fecha: 2022-05-25T05:00:00.000Z
 *                              tam_contraste: Sin Contraste
 *                              tam_vph: Sin VPH
 *                              tam_vph_no_info: 0
 *                              tam_niv_id: 1
 *                              niv_mensaje: Sin riesgo de cáncer
 */

/**
 * @swagger
 * /api/tamizajes/fotos:
 *  get:
 *      summary: obtener fotos de tamizajes
 *      tags: [Tamizaje]
 *      responses:
 *          200:
 *              description: tamizajes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              tam_id: 1
 *                              tam_pac_per_identificacion: 1062331745
 *                              tam_fecha: 2022-05-25T05:00:00.000Z
 *                              tam_contraste: Sin Contraste
 *                              tam_vph: Sin VPH
 *                              tam_vph_no_info: 0
 *                              tam_niv_id: 1
 *                              ima_tipo: SI
 *                              ima_ruta: 1062331745_1_SI
 */
router.get('/todos', obtenerTamizajes);
router.get('/conUsuario', obtenerTamizajesByUsuario);
router.get('/rangoFecha', obtenerTamizajesRangoFecha);
router.get('/idRangoFecha', obtenerTamizajesByIDRangoFecha);
router.get('/identificacion', obtenerTamizajesByID);
router.get('/tipoIdentificacion', obtenerTamizajesByTipoID);
router.get('/fotos', obtenerFotos);


module.exports = router;