const { Router } = require('express');
const {
	crearConfiguracion,
	actualizarConfiguracion,
	obtenerTodasConfiguraciones,
	eliminarConfiguracion,
	obtenerConfiguracionById,
	obtenerConfiguracionBynombre
} = require('../controllers/configuracion.controller');

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Configuracion:
 *              type: object
 *              properties:
 *                  conf_id:
 *                      type: integer
 *                      descripcion: id configuracion
 *                  conf_nombre:
 *                      type: string
 *                      descripcion: nombre
 *                  conf_descripcion:
 *                      type: string
 *                      descripcion: descripcion
 *                  conf_estado:
 *                      type: string
 *                      descripcion: estado
 *              example:
 *                  conf_id: 1
 *                  conf_nombre: vph
 *                  conf_descripcion: configuracion descripcion
 *                  conf_estado: false
 */

/**
 * @swagger
 * /api/configuracion/consultar:
 *  get:
 *      summary: obtener las configuraciones
 *      tags: [Configuracion]
 *      responses:
 *          200:
 *              description: configuracion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Configuracion'
 */

/**
 * @swagger
 * /api/configuracion/idconf?id={id}:
 *  get:
 *      summary: obtener las configuraciones por id
 *      tags: [Configuracion]
 *      responses:
 *          200:
 *              description: configuracion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Configuracion'
 */

/**
 * @swagger
 * /api/configuracion/nombre?nombre={nombre}:
 *  get:
 *      summary: obtener las configuraciones por id
 *      tags: [Configuracion]
 *      responses:
 *          200:
 *              description: configuracion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Configuracion'
 */

/**
 * @swagger
 * /api/configuracion/crear:
 *  post:
 *      summary: crear una configuracion
 *      tags: [Configuracion]
 *      responses:
 *          200:
 *              description: configuracion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Configuracion'
 */

/**
 * @swagger
 * /api/configuracion/actualizar/{conf_id}:
 *  put:
 *      summary: actualizar una configuracion
 *      tags: [Configuracion]
 *      responses:
 *          200:
 *              description: configuracion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Configuracion'
 */

/**
 * @swagger
 * /api/configuracion/eliminar/{conf_id}:
 *  put:
 *      summary: elimina una configuracion
 *      tags: [Configuracion]
 *      responses:
 *          200:
 *              description: configuracion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Configuracion'
 */

router.get('/consultar', obtenerTodasConfiguraciones);
router.get('/idconf', obtenerConfiguracionById);
router.get('/nombre', obtenerConfiguracionBynombre);
router.post('/crear', crearConfiguracion);
router.put('/actualizar/:conf_id', actualizarConfiguracion);
router.delete('/eliminar/:conf_id', eliminarConfiguracion);

module.exports = router;
