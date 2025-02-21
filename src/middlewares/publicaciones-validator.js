import { body, param } from "express-validator";
import { categoriaExists } from ".././helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const agregarPublicacionValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("titulo").notEmpty().withMessage("El titulo es obligatorio"),
    body("texto").notEmpty().withMessage("El texto es obligatorio"),
    validarCampos,
    handleErrors
]

export const editarPublicacionValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),   
    body("titulo").optional().notEmpty().withMessage("El titulo no puede estar vacío"),
    body("texto").optional().notEmpty().withMessage("El texto no puede estar vacío"),
    body("categoria").optional().custom(categoriaExists).withMessage("La categoría no existe"),
    validarCampos,
    handleErrors
]

export const eliminarPublicacionValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];
