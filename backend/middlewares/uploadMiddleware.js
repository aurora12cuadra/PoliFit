const multer = require("multer");

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Archivo recibido para guardar en uploads/");
    cb(null, "uploads/"); // Directorio donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    console.log(`Nombre del archivo generado: ${uniqueName}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
