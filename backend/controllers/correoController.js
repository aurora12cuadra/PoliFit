//correoController.js
const nodemailer = require("nodemailer");
const fs = require("fs");

exports.enviarCorreo = async (req, res) => {
  console.log("Controlador enviarCorreo ejecutado");
  console.log("Datos recibidos en el backend:", req.body);

  const { email, filePath, fileName } = req.body;

  console.log("Datos recibidos:", { email, filePath, fileName });

  if (!email || !filePath || !fileName) {
    console.error("Faltan datos necesarios (email o archivo)");
    return res.status(400).json({ error: "Correo electrónico o archivo faltante" });
  }

  try {
    // Configuración de nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Leer el archivo desde el filePath
    const fileContent = fs.readFileSync(filePath);

    // Enviar correo con archivo adjunto
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Tu Plan Alimenticio Personalizado",
        text: `
          Estimado(a) paciente:
      
          Espero este mensaje te encuentre bien. Adjunto encontrarás tu plan alimenticio personalizado, diseñado para ayudarte a alcanzar tus objetivos de salud y bienestar.
      
          Si tienes alguna duda o necesitas realizar ajustes, no dudes en ponerte en contacto con tu especialista.
        `,
        attachments: [
          {
            filename: fileName,
            content: fileContent,
          },
        ],
      });
      

    console.log("Correo enviado exitosamente a:", email);

    // Elimina el archivo después de enviarlo
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Error al enviar el correo." });
  }
};
