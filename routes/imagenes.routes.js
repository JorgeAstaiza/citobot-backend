const { Router } = require('express');
const {
	insertarImagen,
	actualizarImagen,
	eliminarImagen,
	obtenerImagenesByID,
	guardarImagenAWS,
	totalImagenesByTamizaje,
	obtenerImagenAWS,
	descargarImagenAWS
} = require('../controllers/imagenes.controller');
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Imagenes:
 *              type: object
 *              properties:
 *                  ima_id:
 *                      type: integer
 *                      descripcion: id imagen
 *                  ima_tam_id:
 *                      type: integer
 *                      descripcion: id tamaño imagen
 *                  ima_tipo:
 *                      type: string
 *                      descripcion: tipo de imagen
 *                  ima_ruta:
 *                      type: string
 *                      descripcion: ruta de la imagen
 *              example:
 *                  ima_id: 1
 *                  ima_tam_id: 1
 *                  ima_tipo: Si
 *                  ima_ruta: 1062331745_1_SI
 */

/**
 * @swagger
 * /api/imagenes/obtener?id={id}:
 *  get:
 *      summary: obtener imagenes por id de tamizaje
 *      tags: [Imagenes]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id tamizaje
 *      responses:
 *          200:
 *              description: Imagen
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Imagenes'
 */

/**
 * @swagger
 * /api/imagenes/get-img-aws/{fileName}:
 *  get:
 *      summary: obtener metadata de la imagen en aws
 *      tags: [Imagenes]
 *      parameters:
 *          - in: path
 *            name: fileName
 *            schema:
 *              type: string
 *            required: true
 *            description: nombre imagen
 *      responses:
 *          200:
 *              description: Imagen
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Imagenes'
 */

/**
 * @swagger
 * /api/imagenes/descargar-img/{fileName}:
 *  get:
 *      summary: obtener URL de la imagen en aws
 *      tags: [Imagenes]
 *      parameters:
 *          - in: path
 *            name: fileName
 *            schema:
 *              type: string
 *            required: true
 *            description: obtener url imagen
 *      responses:
 *          200:
 *              description: Imagen
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Imagenes'
 */

/**
 * @swagger
 * /api/imagenes/save-img-aws:
 *   post:
 *     summary: guardar una imagen en AWS
 *     tags: [Imagenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                  file: file
 *                  nombre: hola.png
 *     responses:
 *       201:
 *         description: Imagen guardada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/imagenes/crear:
 *   post:
 *     summary: guardar una imagen
 *     tags: [Imagenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                  ima_tam_id: 3
 *                  ima_tipo: JPG
 *                  ima_ruta: /img/foto1
 *     responses:
 *       201:
 *         description: Imagen guardada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/imagenes/actualizar/{id}:
 *   put:
 *     summary: actualizar una imagen
 *     tags: [Imagenes]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id de la imagen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                  ima_tam_id: 3
 *                  ima_tipo: JPG
 *                  ima_ruta: /img/foto1
 *     responses:
 *       201:
 *         description: Imagen ctualizada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/imagenes/eliminar/{id}:
 *   delete:
 *     summary: eliminar una imagen
 *     tags: [Imagenes]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id de la imagen
 *     responses:
 *       201:
 *         description: Imagen eliminada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

router.post('/crear', insertarImagen);
router.post('/save-img-aws', guardarImagenAWS);
router.get('/get-img-aws/:fileName', obtenerImagenAWS);
router.get('/descargar-img/:fileName', descargarImagenAWS);

router.put('/actualizar/:id', actualizarImagen);
router.delete('/eliminar/:id', eliminarImagen);
router.get('/obtener', obtenerImagenesByID);
router.get('/total-img', totalImagenesByTamizaje);

module.exports = router;
