const { Router } = require('express');
const { createProfesion, getProfesiones } = require('../controllers/profesion.controller');

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Profesion:
 *              type: object
 *              properties:
 *                  pro_id:
 *                      type: integer
 *                      descripcion: id profesion
 *                  pro_nombre:
 *                      type: string
 *                      descripcion: nombre de la profesion
 *              example:
 *                  pro_id: 1
 *                  pro_nombre: medico
 */

/**
 * @swagger
 * /api/profesion/consultar:
 *  get:
 *      summary: obtener todas las profesiones
 *      tags: [Profesion]
 *      responses:
 *          200:
 *              description: profesion
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
 * /api/profesion/crear:
 *   post:
 *     summary: crear una profesion
 *     tags: [Profesion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items:
 *                  $ref: '#/components/schemas/Profesion'
 *              example:
 *                  pro_nombre: medico
 *     responses:
 *       201:
 *         description: Profesion creado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

router.get('/consultar', getProfesiones);
router.post('/crear', createProfesion);

module.exports = router;
