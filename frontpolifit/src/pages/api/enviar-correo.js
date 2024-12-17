//api de enviar-correo.js
import { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Desactiva el body parser predeterminado
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  try {
    console.log("Entré a la API");

    const uploadDir = path.join(process.cwd(), "uploads");

    // Verificar si la carpeta uploads existe, si no, crearla
    if (!fs.existsSync(uploadDir)) {
      console.log("La carpeta 'uploads' no existe. Creándola...");
      fs.mkdirSync(uploadDir);
    }

    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // Límite de 10 MB
      uploadDir, // Carpeta para guardar archivos
      keepExtensions: true, // Mantener extensiones
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error al procesar el archivo:", err);
        if (err.httpCode === 413) {
          return res.status(413).json({ error: "El archivo es demasiado grande" });
        }
        return res.status(500).json({ error: "Error al procesar el archivo" });
      }

      console.log("Campos recibidos:", fields);
      console.log("Archivo recibido:", files.file);

      // Extraer archivo correctamente
      const fileArray = Array.isArray(files.file) ? files.file : [files.file]; // Asegurar que sea un arreglo
      const file = fileArray[0]; // Tomar el primer archivo

      console.log("filePath a enviar:", file?.filepath); // Ruta del archivo
      console.log("fileName a enviar:", file?.originalFilename); // Nombre original del archivo

      // Validar datos
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;

      if (!email || !file) {
        return res.status(400).json({ error: "Faltan datos necesarios (email o archivo)" });
      }

      try {
        // Reenviar la solicitud al backend principal
        const response = await fetch("https://polifit-backend.onrender.com/correo/enviar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            filePath: file.filepath, // Ruta temporal del archivo
            fileName: file.originalFilename, // Nombre original del archivo
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error en el backend principal:", data);
          return res.status(response.status).json(data);
        }

        console.log("Correo enviado exitosamente");
        return res.status(200).json({ message: "Correo enviado exitosamente." });
      } catch (backendError) {
        console.log("aqui hay problema")
        console.error("Error al reenviar la solicitud al backend principal:", backendError);
        return res.status(500).json({ error: "Error al comunicarse con el backend principal." });
      }
    });
  } catch (error) {
    console.error("Error en la API de enviar-correo:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}