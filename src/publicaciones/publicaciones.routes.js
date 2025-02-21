import { Router } from "express";
import { agregarPublicacion, listarPublicacion, editarPublicacion, eliminarPublicacion } from "./publicaciones.controller.js";
import { agregarPublicacionValidator, editarPublicacionValidator, eliminarPublicacionValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

router.post("/agregarPublicacion", agregarPublicacionValidator, agregarPublicacion);

router.get("/listarPublicacion", listarPublicacion);

router.put("/editarPublicacion/:uid", editarPublicacionValidator, editarPublicacion);

router.delete("/eliminarPublicacion/:id", eliminarPublicacionValidator, eliminarPublicacion);



export default router;