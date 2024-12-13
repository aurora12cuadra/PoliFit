// pages/api/pacientes/register.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado
        console.log("Token recibido en el backend:", token);
  
        if (!token) {
          return res.status(401).json({ error: 'Token de autorización no proporcionado' });
        }
  
        const response = await fetch('http://localhost:3000/paciente/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
          },
          body: JSON.stringify(req.body),
        });
  
        const data = await response.json();
        if (!response.ok) {
          return res.status(response.status).json({ error: data.error });
        }
  
        res.status(201).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Error al conectar con el servidor, checa token' });
      }
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  }
  