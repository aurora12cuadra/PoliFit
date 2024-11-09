// loginNutriologo
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Actualizamos la importación

function LoginNutriologo() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter(); // Este hook ahora viene de "next/navigation"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/nutriologos/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Guardar el token JWT en localStorage
        localStorage.setItem("token", data.token);
        console.log("Login exitoso", data);
        // Redirigir al dashboard
        router.push("/nuevopaciente");
      } else {
        setError(data.error || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Iniciar Sesión</h1>
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginNutriologo;
