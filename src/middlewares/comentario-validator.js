import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const crearComentarioValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("texto").notEmpty().withMessage("El texto es obligatorio"),
    validarCampos,
    handleErrors
];
    
export const editarComentarioValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("texto").notEmpty().withMessage("El texto es obligatorio"),
    validarCampos,
    handleErrors
];

export const eliminarComentarioValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("id").isMongoId().withMessage("El ID de MongoDB no es valido"),
    validarCampos,
    handleErrors
];  