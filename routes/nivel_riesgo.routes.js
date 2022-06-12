const { Router } = require('express');
const { crearRiesgo, actualizarRiesgo, eliminarRiesgo, obtenerRiesgos } = require('../controllers/nivel_riesgo.controller');
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Riesgo:
 *              type: object
 *              properties:
 *                  niv_id:
 *                      type: integer
 *                      descripcion: id nivel riesgo
 *                  niv_descripcion:
 *                      type: string
 *                      descripcion: descripcion riesgo
 *                  niv_mensaje:
 *                      type: string
 *                      descripcion: mensaje nivel riesgo
 *              example:
 *                  niv_id: 1
 *                  niv_descripcion: No se aprecian niveles cercanos a cáncer
 *                  niv_mensaje: Sin riesgo de cáncer
 */

/**
 * @swagger
 * /api/riesgos/crear:
 *   post:
 *     summary: crear un nivel de riesgo
 *     tags: [Riesgo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Riesgo'
 *              example:
 *                  niv_id: 1
 *                  niv_descripcion: No se aprecian niveles cercanos a cáncer
 *                  niv_mensaje: Sin riesgo de cáncer
 *     responses:
 *       201:
 *         description: Nivel de riesgo creado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/riesgos/actualizar/{id}:
 *   put:
 *     summary: actualizar un nivel de riesgo
 *     tags: [Riesgo]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id del nivel de riesgo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:             
 *              example:
 *                  niv_descripcion: No se aprecian niveles cercanos a cáncer
 *                  niv_mensaje: Sin riesgo de cáncer
 *     responses:
 *       201:
 *         description: Nivel de riesgo actualizado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/riesgos/eliminar/{id}:
 *   delete:
 *     summary: eliminar un nivel de riesgo
 *     tags: [Riesgo]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id del nivel de riesgo
 *     responses:
 *       201:
 *         description: Nivel de riesgo eliminado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/riesgos/consultar:
 *  get:
 *      summary: obtener todos los niveles de riesgo
 *      tags: [Riesgo]
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
 *                                      $ref: '#/components/schemas/Riesgo'          
 */

router.post('/crear', crearRiesgo);
router.put('/actualizar/:id', actualizarRiesgo);
router.delete('/eliminar/:id', eliminarRiesgo);
router.get('/consultar', obtenerRiesgos);


module.exports = router;