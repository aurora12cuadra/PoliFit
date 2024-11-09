// registroNurtriologo
"use client";

import { useState } from "react";

function RegisterNutriologo() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    numeroEmpleado: "",
    especialidad: "",
    escuela: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseña
    if (formData.password !== formData.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Aquí es donde integramos el backend
    try {
      const response = await fetch("/api/nutriologos/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Nutriólogo registrado", data);
        alert("Registro exitoso");
      } else {
        console.error("Error al registrar", data);
        alert("Error al registrar: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Registro de Nutriólogo</h1>
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {[
            ["Nombre", "text", "nombre"],
            ["Apellidos", "text", "apellidos"],
            ["Fecha de Nacimiento", "date", "fechaNacimiento"],
            ["Número de Empleado", "text", "numeroEmpleado"],
            ["Especialidad", "text", "especialidad"],
            ["Escuela donde labora", "text", "escuela"],
            ["Correo electrónico", "email", "email"],
            ["Contraseña", "password", "password"],
            ["Repetir Contraseña", "password", "repeatPassword"],
          ].map(([label, type, name], index) => (
            <div key={index}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          ))}
        </form>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" required />
        <span>Acepto el Aviso de Privacidad</span>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" required />
        <span>Acepto los Términos y Condiciones</span>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Registrarse
      </button>
    </div>
  );
}

export default RegisterNutriologo;
