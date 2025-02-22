import { Router } from "express";
import { agregarPublicacion, listarPublicacion, editarPublicacion, eliminarPublicacion } from "./publicaciones.controller.js";
import { agregarPublicacionValidator, editarPublicacionValidator, eliminarPublicacionValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

/**
 * @swagger
 * /agregarPublicacion:
 *   post:
 *     summary: Agregar una nueva publicación
 *     tags: [Publicación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la publicación
 *                 example: "Nueva tecnología en 2025"
 *               contenido:
 *                 type: string
 *                 description: Contenido de la publicación
 *                 example: "Detalles sobre la nueva tecnología..."
 *     responses:
 *       201:
 *         description: Publicación agregada correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
router.post("/agregarPublicacion", agregarPublicacionValidator, agregarPublicacion);

/**
 * @swagger
 * /listarPublicacion:
 *   get:
 *     summary: Listar todas las publicaciones
 *     tags: [Publicación]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *       500:
 *         description: Error del servidor
 */
router.get("/listarPublicacion", listarPublicacion);

/**
 * @swagger
 * /editarPublicacion/{uid}:
 *   put:
 *     summary: Editar una publicación existente
 *     tags: [Publicación]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la publicación
 *                 example: "Actualización de tecnología en 2025"
 *               contenido:
 *                 type: string
 *                 description: Contenido de la publicación
 *                 example: "Nuevos detalles sobre la tecnología..."
 *     responses:
 *       200:
 *         description: Publicación editada correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/editarPublicacion/:uid", editarPublicacionValidator, editarPublicacion);

/**
 * @swagger
 * /eliminarPublicacion/{id}:
 *   delete:
 *     summary: Eliminar una publicación existente
 *     tags: [Publicación]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación eliminada correctamente
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/eliminarPublicacion/:id", eliminarPublicacionValidator, eliminarPublicacion);

export default router;