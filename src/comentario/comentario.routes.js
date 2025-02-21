import { Router } from "express";
import { crearComentarioValidator, editarComentarioValidator, eliminarComentarioValidator } from "../middlewares/comentario-validator.js";
import { agregarComentario, editarComentario, eliminarComentario } from "./comentario.controller.js";

const router = Router();

router.post("/agregarComentario", crearComentarioValidator, agregarComentario);

router.put("/editarComentario/:id", editarComentarioValidator, editarComentario);

router.delete("/eliminarComentario/:id", eliminarComentarioValidator, eliminarComentario);

export default router;