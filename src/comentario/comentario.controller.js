import Comentario from "./comentario.model.js"
import Publicacion from "../publicaciones/publicaciones.model.js"
import User from "../user/user.model.js"

export const agregarComentario = async (req, res) => {
    try {
        const { usuario, texto, publicacion } = req.body 

        const user = await User.findById(usuario)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

         const publicaciones = await Publicacion.findById(publicacion)
         
        if (!publicaciones) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            })
        }   

        const nuevoComentario = new Comentario({
            autor: user._id,
            texto,
            publicacion: publicaciones._id
        })

        await nuevoComentario.save()

        publicaciones.comentarios.push(nuevoComentario._id)
        await publicaciones.save()

        res.status(201).json({
            success: true,
            message: "Comentario agregado correctamente",
            comentario: nuevoComentario
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message
        })
    }
}

export const editarComentario = async (req, res) => {
    try {
        const { id } = req.params
        const { usuario, texto } = req.body

        const user = await User.findById(usuario)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const comentario = await Comentario.findById(id)
        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            })
        }

        const publicaciones = await Publicacion.findById(comentario.publicacion)

        if (!publicaciones) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            })
        }

        if (comentario.autor._id.toString() !== user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para editar este comentario"
            })
        }

        comentario.texto = texto

        await comentario.save()

        res.status(200).json({
            success: true,
            message: "Comentario editado correctamente",
            comentario
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al editar el comentario",
            error: err.message
        })
    }
}

export const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params
        const { usuario } = req.body

        const user = await User.findById(usuario)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const comentario = await Comentario.findById(id)
        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            })
        }

        const publicaciones = await Publicacion.findById(comentario.publicacion)

        if (!publicaciones) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            })
        }

        if (comentario.autor._id.toString() !== user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para eliminar este comentario"
            })
        }

        const comentarioEliminado = await Comentario.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Comentario eliminado correctamente",
            comentarioEliminado
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: err.message
        })
    }
}