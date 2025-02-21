import { Schema, model } from "mongoose"

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Categoria es requerida"],
    },
    descripcion: {
        type: String,
        requiered: [true, "Descripcion es requerida"]
    },
    status: {
        type: Boolean,
        default: true
    },
})

export default model("Categoria", categoriaSchema)