"use strict"

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import { adminPorDefault } from "../src/user/user.controller.js";
import { categoriaPorDefecto } from "../src/categoria/categoria.controller.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import publicacionesRoutes from "../src/publicaciones/publicaciones.routes.js";
import categoriaRoutes from "../src/categoria/categoria.routes.js";
import comentarioRoutes from "../src/comentario/comentario.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/gestionDeOpiniones/v1/auth", authRoutes);
    app.use("/gestionDeOpiniones/v1/User", userRoutes);
    app.use("/gestionDeOpiniones/v1/Categoria", categoriaRoutes);
    app.use("/gestionDeOpiniones/v1/Publicacion", publicacionesRoutes);
    app.use("/gestionDeOpiniones/v1/Comentario", comentarioRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConnection()

        await adminPorDefault()

        await categoriaPorDefecto()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}