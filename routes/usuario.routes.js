const { Router } = require('express');
const { obtenerUsuarios, crearUsuario, actualizarUsuario, actualizarEstadoUsuario } = require('../controllers/usuario.controller');
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Usuario:
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
 *                  usu_usuario:
 *                      type: string
 *                      descripcion: PREGUNTAR
 *                  usu_email:
 *                      type: string
 *                      descripcion: correo electronico
 *                  pro_nombre:
 *                      type: string
 *                      descripcion: profesion
 *                  usu_rol: 
 *                      type: string
 *                      descripcion: rol en la aplicacion
 *                  usu_estado:
 *                      type: string
 *                      descripcion: estado activo o inactivo
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
 *                  usu_usuario: 1061160752
 *                  usu_email: correo1061160752@gmail.com
 *                  pro_nombre: Axuliar de Enfermeria
 *                  usu_rol: DOCTOR
 *                  usu_estado: Activo
 *      
 */


/**
 * @swagger
 * /api/usuarios/consultar:
 *  get:
 *      summary: obtener todos los usuarios
 *      tags: [Usuario]
 *      responses:
 *          200:
 *              description: usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data: 
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Usuario'          
 */

/**
 * @swagger
 * /api/usuarios/crear:
 *   post:
 *     summary: crear un usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items: 
 *                  usu_per_identificacion:
 *                      type: string
 *                      descripcion: numero indentificacion
 *                  usu_usuario:
 *                      type: string
 *                      descripcion: tipo de indentificacion
 *                  usu_clave:
 *                      type: string
 *                      descripcion: clave 
 *                  usu_email:
 *                      type: string
 *                      descripcion: correo electronico
 *                  usu_pro_id:
 *                      type: number
 *                      descripcion: id profesion
 *                  usu_rol:
 *                      type: string
 *                      descripcion: Rol 
 *                  usu_estado:
 *                      type: string
 *                      descripcion: estado
 *              example:
 *                  usu_per_identificacion: 34654123
 *                  usu_usuario: nuevo usuario prueba
 *                  usu_clave: nueva clave prueba
 *                  usu_email: correoprueba@gmail.es
 *                  usu_pro_id: 1
 *                  usu_rol: DOCTOR
 *                  usu_estado: Activo
 *     responses:
 *       201:
 *         description: Usurio creado exitosamente!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaGeneral'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/usurios/actualizar/{id}:
 *   put:
 *     summary: actualizar un usuario
 *     tags: [Usuario]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id del usurio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items: 
 *                  usu_usuario:
 *                      type: string
 *                      descripcion: tipo de indentificacion
 *                  usu_clave:
 *                      type: string
 *                      descripcion: primer nombre
 *                  usu_email:
 *                      type: string
 *                      descripcion: segundo nombre
 *                  usu_pro_id:
 *                      type: string
 *                      descripcion: primer apellido
 *                  usu_rol:
 *                      type: string
 *                      descripcion: segundo apellido
 *              example:
 *                  usu_usuario: usuario actualizado
 *                  usu_clave: clave actualizad
 *                  usu_email: correoactualizado@gmail.com
 *                  usu_pro_id: 2
 *                  usu_rol: ENFERMERO
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

/**
 * @swagger
 * /api/usurios/actualizarEstado/{id}:
 *   put:
 *     summary: actualizar estado de un usuario
 *     tags: [Usuario]
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id del usurio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              items: 
 *                  usu_estado:
 *                      type: string
 *                      descripcion: estado
 *              example:
 *                  usu_estado: Activo
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

router.get('/consultar', obtenerUsuarios);
router.post('/crear', crearUsuario);
router.put('/actualizar/:id', actualizarUsuario);
router.put('/actualizarEstado/:id', actualizarEstadoUsuario);


module.exports = router;