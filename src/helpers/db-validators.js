import User from "../user/user.model.js"
import Categoria from "../categoria/categoria.model.js"
import Publicaciones from "../publicaciones/publicaciones.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoriaExists = async (uid = "") => {
    const existe = await Categoria.findOne({uid})
    if(existe){
        throw new Error(`La categoria ${uid} ya existe`)
    }
}

export const publicacionesExists = async (uid = " ") => {
    const existe = await Publicaciones.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No se encuentra la publicacion por medio del ID")
    }
}
