const { Router } = require('express');
const { getPersonas, crearPersona, actualizarPersona, eliminarPersona } = require('../controllers/personas.controller');
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Persona:
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
 *              required:
 *                  - per_identificacion
 *                  - per_tip_id
 *                  - per_primer_nombre
 *                  - per_otros_nombres
 *                  - per_primer_apellido
 *              example:
 *                  per_identificacion: "1061160752"
 *                  per_tip_id: CC
 *                  per_primer_nombre: Milena
 *                  per_otros_nombres: Yulieth
 *                  per_primer_apellido: Pito
 *                  per_segundo_apellido: Muñoz
 *                  gen_nombre: Femenino
 *      
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          RespuestaGeneral:
 *              type: object
 *              properties:
 *                  codigoRespuesta:
 *                      type: integer
 *                  descripcionRespuesta:
 *                      type: string
 *                  objetoRespuesta:
 *                      type: string
 *              example:
 *                  codigoRespuesta: 0
 *                  descripcionRespuesta: Exito
 *                  objetoRespuesta: []
 *      
 */

/**
 * @swagger
 * /api/personas/consultar:
 *  get:
 *      summary: obtener todas las personas
 *      tags: [Persona]
 *      responses:
 *          200:
 *              description: personas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data: 
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Persona'          
 */

/**
 * @swagger
 * /api/personas/crear:
 *   post:
 *     summary: crear una persona
 *     tags: [Persona]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items: 
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
 *                  per_gen_id:
 *                      type: number
 *                      descripcion: id genero
 *              example:
 *                  per_identificacion: "1061160752"
 *                  per_tip_id: CC
 *                  per_primer_nombre: Milena
 *                  per_otros_nombres: Yulieth
 *                  per_primer_apellido: Pito
 *                  per_segundo_apellido: Muñoz
 *                  per_gen_id: 1
 *     responses:
 *       201:
 *         description: Persona creada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/personas/actualizar/{id}:
 *   put:
 *     summary: actualizar una persona
 *     tags: [Persona]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id de la persona a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items: 
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
 *                  per_gen_id:
 *                      type: number
 *                      descripcion: id genero
 *              example:
 *                  per_tip_id: TI
 *                  per_primer_nombre: Milena
 *                  per_otros_nombres: Yulieth
 *                  per_primer_apellido: Pito
 *                  per_segundo_apellido: Muñoz
 *                  per_gen_id: 2
 *     responses:
 *       200:
 *         description: Persona creada exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */
router.get('/consultar', getPersonas);
router.post('/crear', crearPersona);
router.put('/actualizar/:id', actualizarPersona);


module.exports = router;