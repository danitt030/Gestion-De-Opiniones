import { Router } from "express";
import { agregarCategoria, listarCategoria, actualizarCategoria, eliminarCategoria  } from "./categoria.controller.js";
import { agregarCategoriaValidator, getCategoriaValidator, actualizarCategoriaValidator, eliminarCategoriaValidator     } from "../middlewares/categoria-validator.js";

const router = Router();

router.post("/agregarCategoria", agregarCategoriaValidator, agregarCategoria);

router.get("/getCategoria", getCategoriaValidator, listarCategoria);

router.put("/actualizarCategoria/:uid", actualizarCategoriaValidator, actualizarCategoria);

router.delete("/eliminarCategoria/:uid", eliminarCategoriaValidator,eliminarCategoria);


export default router;