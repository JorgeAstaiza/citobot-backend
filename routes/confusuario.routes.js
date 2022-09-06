const { Router } = require('express');
const {
	crearConfiguracion,
	actualizarConfiguracion,
	obtenerTodasConfiguraciones,
	eliminarConfiguracion,
	obtenerTodosEstados,
	actualizarConfiguracionById
} = require('../controllers/confusuario.controller');

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          ConfiguracionUsuario:
 *              type: object
 *              properties:
 *                  confu_id:
 *                      type: integer
 *                      descripcion: id configuracion
 *                  confu_usu_per_identificacion:
 *                      type: string
 *                      descripcion: id usuario
 *                  confu_conf_id:
 *                      type: integer
 *                      descripcion: id configuracion
 *                  confu_estado:
 *                      type: string
 *                      descripcion: estado
 *              example:
 *                  confu_id: 3
 *                  confu_usu_per_identificacion: 123
 *                  confu_conf_id: configuracion 1
 *                  confu_estado: false
 */

/**
 * @swagger
 * /api/confusuario/estados:
 *  get:
 *      summary: obtener las configuraciones por estado
 *      tags: [ConfiguracionUsuario]
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
 *                                      $ref: '#/components/schemas/ConfiguracionUsuario'
 */

/**
 * @swagger
 * /api/confusuario/todas?confu_usu_per_identificacion={confu_usu_per_identificacion}&confu_conf_id=${confu_conf_id}:
 *  get:
 *      summary: obtener las configuraciones por usuario y dentificacion
 *      tags: [ConfiguracionUsuario]
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
 *                                      $ref: '#/components/schemas/ConfiguracionUsuario'
 */

/**
 * @swagger
 * /api/confusuario/crear:
 *  post:
 *      summary: crear una configuracion
 *      tags: [ConfiguracionUsuario]
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
 *                                      $ref: '#/components/schemas/ConfiguracionUsuario'
 */

/**
 * @swagger
 * /api/confusuario/actualizar/:{confu_id}:
 *  put:
 *      summary: actualizar una configuracion por id
 *      tags: [ConfiguracionUsuario]
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
 *                                      $ref: '#/components/schemas/ConfiguracionUsuario'
 */

/**
 * @swagger
 * /api/confusuario/actualizarbyid/:{confu_usu_per_identificacion}/:{confu_conf_id}:
 *  put:
 *      summary: actualizar una configuracion por id
 *      tags: [ConfiguracionUsuario]
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
 *                                      $ref: '#/components/schemas/ConfiguracionUsuario'
 */

/**
 * @swagger
 * /api/confusuario/eliminar/{confu_id}:
 *  delete:
 *      summary: elimina una configuracion
 *      tags: [ConfiguracionUsuario]
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
 *                                      $ref: '#/components/schemas/ConfiguracionUsuario'
 */

router.get('/todas', obtenerTodasConfiguraciones);
router.get('/estados', obtenerTodosEstados);
router.post('/crear', crearConfiguracion);
router.put('/actualizar/:confu_id', actualizarConfiguracion);
router.put('/actualizarbyid/:confu_usu_per_identificacion/:confu_conf_id', actualizarConfiguracionById);
router.delete('/eliminar/:confu_id', eliminarConfiguracion);

module.exports = router;
