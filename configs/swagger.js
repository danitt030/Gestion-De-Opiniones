import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Gestion De Opiniones",
            version: "1.0.0",
            description: "API para gestionar las publicaciones y comentarios de los usuarios",
            contact:{
                name: "Daniel Tuy",
                email: "dtuy-2023313@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/gestionDeOpiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/categoria/categoria.routes.js",
        "./src/publicaciones/publicaciones.routes.js",
        "./src/comentario/comentario.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export {swaggerDocs, swaggerUi}
