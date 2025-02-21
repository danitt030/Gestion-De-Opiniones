import { Schema, model } from "mongoose";

const ComentarioSchema = new Schema({
    texto: {
        type: String,
        required: [true, "El texto es obligatorio"],
        maxLength: [250, "El texto no debe exceder los 250 caracteres"]
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El autor es obligatorio"]
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: "Publicacion",
        required: [true, "La publicación es obligatoria"]
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model("Comentario", ComentarioSchema);