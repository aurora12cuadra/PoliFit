export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Método no permitido" });
    }
  
    const { noBoleta } = req.query; // Obtén el noBoleta del query
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ error: "Token de autorización no proporcionado" });
    }
  
    if (!noBoleta) {
      return res.status(400).json({ error: "El parámetro noBoleta es requerido" });
    }
  
    try {
      // Llamada al backend
      const response = await fetch(`http://localhost:3000/consulta/paciente/${noBoleta}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error });
      }
  
      const consultas = await response.json();
      return res.status(200).json(consultas); // Devuelve las consultas obtenidas
    } catch (error) {
      console.error("Error al realizar la solicitud al backend:", error);
      return res.status(500).json({ error: "Error al conectar con el backend" });
    }
  }
  