export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado
        console.log("Token recibido en el backend:", token);
  
        if (!token) {
          return res.status(401).json({ error: 'Token de autorización no proporcionado' });
        }
  
        // Llama a tu servidor backend
        const response = await fetch('http://localhost:3000/nutriologos/perfil', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Incluye el token
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          return res.status(response.status).json({ error: data.error });
        }
  
        res.status(200).json(data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  }
  