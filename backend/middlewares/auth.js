// middlewares/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado o inválido.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.nutriologoId = decoded.id;  // Extrae el numeroEmpleado del token y lo guarda en req
        console.log("Número de empleado extraído del token:", req.nutriologoId);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};

module.exports = verifyToken;

