// controllers/nutriologoController.js
const Nutriologo = require('../models/Nutriologo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Op } = require('sequelize'); // Agrega esta línea
const nodemailer = require('nodemailer');

// Registrar un nuevo nutriólogo
exports.registrarNutriologo = async (req, res) => {
    try {
        const nuevoNutriologo = await Nutriologo.create(req.body);
        res.status(201).json(nuevoNutriologo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Autenticación de Nutriólogo
exports.loginNutriologo = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const nutriologo = await Nutriologo.findOne({ where: { email } });
        if (!nutriologo) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, nutriologo.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: nutriologo.numeroEmpleado, email: nutriologo.email },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );

        res.status(200).json({ token, nutriologo: { nombre: nutriologo.nombre, email: nutriologo.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Enviar correo para restablecer contraseña
exports.solicitarRestablecimientoContrasena = async (req, res) => {
    const { email } = req.body;

    try {
        const nutriologo = await Nutriologo.findOne({ where: { email } });
        if (!nutriologo) {
            return res.status(404).json({ error: 'Correo electrónico no encontrado' });
        }

        // Generar token de restablecimiento
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hora

        // Guardar token y fecha de expiración
        await nutriologo.update({ resetToken, resetTokenExpiration });

        // Configurar transporte de correo
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // O el proveedor de correo que uses
            auth: {
                user: process.env.EMAIL_USER, // Tu correo
                pass: process.env.EMAIL_PASS, // Tu contraseña
            },
        });

        const resetURL = `http://localhost:3001/restablecer/${resetToken}`;
        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Restablecimiento de contraseña',
            text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetURL}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        console.error('Error al solicitar restablecimiento de contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Restablecer la contraseña
exports.restablecerContrasena = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        console.log("===== INICIO: Restablecer contraseña =====");
        console.log("Token recibido en la solicitud:", token);
        console.log("Nueva contraseña recibida:", newPassword);
        const nutriologo = await Nutriologo.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: { [Op.gt]: new Date() }, // Token no expirado
            },
        });

        if (!nutriologo) {
            console.log("Token inválido o expirado. No se encontró el nutriólogo.");
            return res.status(400).json({ error: 'Token inválido o expirado' });
        }
        console.log("Nutriólogo encontrado:", nutriologo.email);

        // Actualizar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log("Nueva contraseña encriptada generada.");
        await nutriologo.update({ password: hashedPassword, resetToken: null, resetTokenExpiration: null });
        console.log("Contraseña actualizada correctamente en la base de datos.");
        console.log("===== FIN: Restablecer contraseña =====");
        res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los nutriólogos
exports.obtenerNutriologos = async (req, res) => {
    try {
        const nutriologos = await Nutriologo.findAll();
        res.status(200).json(nutriologos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un nutriólogo por ID
exports.obtenerNutriologoPorId = async (req, res) => {
    try {
        const nutriologo = await Nutriologo.findByPk(req.params.id);
        if (!nutriologo) {
            return res.status(404).json({ error: "Nutriólogo no encontrado" });
        }
        res.status(200).json(nutriologo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un nutriólogo por ID
exports.actualizarNutriologo = async (req, res) => {
    try {
        const nutriologo = await Nutriologo.findByPk(req.params.id);
        if (!nutriologo) {
            return res.status(404).json({ error: "Nutriólogo no encontrado" });
        }
        await nutriologo.update(req.body);
        res.status(200).json(nutriologo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un nutriólogo por ID
exports.eliminarNutriologo = async (req, res) => {
    try {
        const nutriologo = await Nutriologo.findByPk(req.params.id);
        if (!nutriologo) {
            return res.status(404).json({ error: "Nutriólogo no encontrado" });
        }
        await nutriologo.destroy();
        res.status(200).json({ message: "Nutriólogo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener perfil nutriologo
exports.obtenerPerfilNutriologo = async (req, res) => {
    try {
        const numeroEmpleado = req.nutriologoId; // Este viene del middleware `verifyToken`
        const nutriologo = await Nutriologo.findByPk(numeroEmpleado);

        if (!nutriologo) {
            return res.status(404).json({ error: 'Nutriólogo no encontrado.' });
        }

        res.status(200).json(nutriologo); // Enviar datos del nutriólogo
    } catch (error) {
        console.error('Error al obtener el perfil del nutriólogo:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/* const Nutriologo = require('../models/Nutriologo');

// Registrar un nuevo nutriólogo
exports.registrarNutriologo = async (req, res) => {
    try {
        const nuevoNutriologo = await Nutriologo.create(req.body);
        res.status(201).json(nuevoNutriologo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Autenticación de Nutriólogo
exports.loginNutriologo = async (req, res) => {
    // lógica para autenticar al nutriólogo
}; */