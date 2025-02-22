import { Router } from "express";
import { agregarCategoria, listarCategoria, actualizarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { agregarCategoriaValidator, getCategoriaValidator, actualizarCategoriaValidator, eliminarCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router();

/**
 * @swagger
 * /agregarCategoria:
 *   post:
 *     summary: Agregar una nueva categoría
 *     tags: [Categoría]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "Tecnología"
 *     responses:
 *       201:
 *         description: Categoría agregada correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
router.post("/agregarCategoria", agregarCategoriaValidator, agregarCategoria);

/**
 * @swagger
 * /getCategoria:
 *   get:
 *     summary: Listar todas las categorías
 *     tags: [Categoría]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       500:
 *         description: Error del servidor
 */
router.get("/getCategoria", getCategoriaValidator, listarCategoria);

/**
 * @swagger
 * /actualizarCategoria/{uid}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Categoría]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "Ciencia"
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/actualizarCategoria/:uid", actualizarCategoriaValidator, actualizarCategoria);

/**
 * @swagger
 * /eliminarCategoria/{uid}:
 *   delete:
 *     summary: Eliminar una categoría existente
 *     tags: [Categoría]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/eliminarCategoria/:uid", eliminarCategoriaValidator, eliminarCategoria);

export default router;