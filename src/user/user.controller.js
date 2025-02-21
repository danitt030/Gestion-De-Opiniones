import { hash, verify } from "argon2";
import User from "./user.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const adminPorDefault = async () => {
    try {
        const adminDefault = await User.findOne({ role: "ADMIN_ROLE" });

        if (!adminDefault) {
            const contraseña = await hash("Cremas30*");

            const adminData = {
                name: "Daniel Andrés",
                surname: "Tuy Tuchez",
                username: "danitt030",
                email: "danieltuy@gmail.com",
                password: contraseña,
                role: "ADMIN_ROLE",
                phone: "12345678",
            };
            await User.create(adminData);
        }
    } catch (errores) {
        console.error("Error al crear el administrador por defecto:", errores);
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const contraseñaAntiguaCorrecta = await verify(user.password, oldPassword);

        if (!contraseñaAntiguaCorrecta) {
            return res.status(400).json({
                success: false,
                message: "La contraseña anterior es incorrecta"
            });
        }

        const contraseñaNuevaCorrecta = await verify(user.password, newPassword);

        if (contraseñaNuevaCorrecta) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                messagge: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const user = await User.findById(uid);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            messagge: 'Foto de perfil actualizada',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            messagge: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};
