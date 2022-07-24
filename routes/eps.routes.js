const { Router } = require('express');
const { consultarEps, insertarEps, actualizarEps, eliminarEps } = require('../controllers/eps.controller');

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Eps:
 *              type: object
 *              properties:
 *                  eps_id:
 *                      type: integer
 *                      descripcion: id eps
 *                  eps_nombre:
 *                      type: string
 *                      descripcion: nombre de la eps
 *              example:
 *                  eps_id: 1
 *                  eps_nombre: sanitas
 */

/**
 * @swagger
 * /api/eps/consultar:
 *  get:
 *      summary: obtener todas las eps
 *      tags: [EPS]
 *      responses:
 *          200:
 *              description: eps
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Eps'
 */

/**
 * @swagger
 * /api/eps/crear:
 *   post:
 *     summary: crear una eps
 *     tags: [EPS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items:
 *                  $ref: '#/components/schemas/Eps'
 *              example:
 *                  eps_nombre: coomeva
 *     responses:
 *       201:
 *         description: Eps creado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/eps/actualizar/{id}:
 *   put:
 *     summary: actualizar una eps
 *     tags: [EPS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items:
 *                  $ref: '#/components/schemas/Eps'
 *              example:
 *                  eps_nombre: coomeva
 *     responses:
 *       201:
 *         description: Eps actualizada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/eps/eliminar/{id}:
 *   delete:
 *     summary: eliminar una eps
 *     tags: [EPS]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id de la eps
 *     responses:
 *       201:
 *         description: Eps eliminada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

router.get('/consultar', consultarEps);
router.post('/crear', insertarEps);
router.put('/actualizar/:id', actualizarEps);
router.delete('/eliminar/:id', eliminarEps);

module.exports = router;
