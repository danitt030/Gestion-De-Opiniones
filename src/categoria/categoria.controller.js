import Categoria from "./categoria.model.js"

export const agregarCategoria = async (req, res) => {
    try {
        const data = req.body
        const categoria = await Categoria.create(data)
        res.status(201).json({
            message: "Categoria creada",
            categoria
        })
    } catch (err) {
        res.status(500).json({
            message: "Error al crear la categoria",
            error: err.message
        })
    }
}

export const listarCategoria = async (req, res) => {
    try {
        const { limit = 5, desde = 0 } = req.query;

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(),
            Categoria.find()
            .skip(Number(desde))
            .limit(Number(limit))
        ])

        res.status(200).json({
            success: true,
            message: "Categorias obtenidas",
            total,
            categorias
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        })
    }
}

export const actualizarCategoria = async (req, res) => {
    try {
        const { uid } = req.params
        const data = req.body
        const categoria = await Categoria.findByIdAndUpdate(uid, data, { new: true })
        res.status(200).json({
            success: true,
            message: "Categoria actualizada",
            categoria
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar la categoria",
            error: err.message
        })
    }
}

export const eliminarCategoria = async (req, res) => {
    try {
        const { uid } = req.params;
        const categoria = await Categoria.findByIdAndDelete(uid);

        res.status(200).json({
            success: true,
            message: "Categoria eliminada",
            categoria
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        })
    }
}

export const categoriaPorDefecto = async () => {
    try {
        const categoriaPorDefecto = await Categoria.findOne({ nombre: "Libros" });

        if (!categoriaPorDefecto) {
            const catDefec = {
                nombre: "Libros",
                descripcion: "Libros historicos e importantes"
            };
            const categoriaDefect = await Categoria.create(catDefec);
            console.log("Categoria por defecto creada:", categoriaDefect);
        } else {
            console.log("Categoria por defecto ya existe:", categoriaPorDefecto);
        }
    } catch (err) {
        console.error("Error al crear la categoria por defecto:", err.message);
    }
}

