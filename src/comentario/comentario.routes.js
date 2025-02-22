import { Router } from "express";
import { crearComentarioValidator, editarComentarioValidator, eliminarComentarioValidator } from "../middlewares/comentario-validator.js";
import { agregarComentario, editarComentario, eliminarComentario } from "./comentario.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarComentario:
 *   post:
 *     summary: Agregar un nuevo comentario
 *     tags: [Comentario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: ID del usuario que comenta
 *                 example: "60d0fe4f5311236168a109ca"
 *               texto:
 *                 type: string
 *                 description: Texto del comentario
 *                 example: "Este es un comentario"
 *               publicacion:
 *                 type: string
 *                 description: ID de la publicación
 *                 example: "60d0fe4f5311236168a109cb"
 *     responses:
 *       201:
 *         description: Comentario agregado correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
router.post("/agregarComentario", crearComentarioValidator, agregarComentario);

/**
 * @swagger
 * /editarComentario/{id}:
 *   put:
 *     summary: Editar un comentario existente
 *     tags: [Comentario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: ID del usuario que comenta
 *                 example: "60d0fe4f5311236168a109ca"
 *               texto:
 *                 type: string
 *                 description: Texto del comentario
 *                 example: "Este es un comentario editado"
 *     responses:
 *       200:
 *         description: Comentario editado correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/editarComentario/:id", editarComentarioValidator, editarComentario);

/**
 * @swagger
 * /eliminarComentario/{id}:
 *   delete:
 *     summary: Eliminar un comentario existente
 *     tags: [Comentario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: ID del usuario que comenta
 *                 example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Comentario eliminado correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/eliminarComentario/:id", eliminarComentarioValidator, eliminarComentario);

export default router;