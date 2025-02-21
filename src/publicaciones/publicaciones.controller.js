import Publicaciones from "./publicaciones.model.js"
import User from "../user/user.model.js";  
import Categoria from "../categoria/categoria.model.js"

export const agregarPublicacion = async (req, res) => {
    try{

        const dato = req.body;
        const publicaciones = await Publicaciones.create(dato);
        res.status(201).json({
            message: "Publicación creada",
            publicaciones
        });
    }catch(err){
        res.status(500).json({
            message: "Error al crear la publicación",
            error: err.message
        });
    }
}

export const listarPublicacion = async (req, res) => {
    try{
        const { limit = 5, desde = 0 } = req.query;

        const [total, publicaciones] = await Promise.all([
            Publicaciones.countDocuments(),
            Publicaciones.find()
            .skip(Number(desde))
            .limit(Number(limit))
            // Obtiene el nombre de la categoria
            .populate("categoria", "nombre")
            // Obtiene el nombre del autor
            .populate("autor", "name")
        ])

        res.status(200).json({
            success: true,
            message: "Publicaciones obtenidas",
            total,
            publicaciones
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message
        })
    }
}

export const editarPublicacion = async (req, res) => {
    try {
        const { uid } = req.params;
        const actualizarDatos = req.body;

        const publicacion = await Publicaciones.findByIdAndUpdate(uid, actualizarDatos, { new: true });

        res.status(200).json({
            success: true,
            message: "Publicación actualizada",
            publicacion
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: err.message
        });
    }
};

export const eliminarPublicacion = async (req, res) => {
    try{
        const { id } = req.params
        const publicacionEliminada = await Publicaciones.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Publicación eliminada correctamente",
            publicacionEliminada
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message
        })
    }
};





