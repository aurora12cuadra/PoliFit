const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { enviarCorreo } = require("../controllers/correoController");

// Ruta para enviar correos con archivo adjunto
router.post("/enviar", upload.single("file"), enviarCorreo);
console.log("Solicitud recibida en la ruta /enviar-correo");
module.exports = router;
