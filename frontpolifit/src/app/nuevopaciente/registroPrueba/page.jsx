// registroPaciente
"use client";

import { useState } from "react";

function RegisterPaciente() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    fechaNacimiento: "",
    edad: "",
    sexo: "",
    telefono: "",
    email: "",
    escuela: "",
    carrera: "",
    domicilio: "",
    noBoleta: "",
    turno: "",
    tipoSangre: "",
    motivoVisita: "",
    padecimientoActual: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Recuperar el token de localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch("/api/pacientes/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Enviar el token en el encabezado
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Paciente registrado", data);
        alert("Registro de paciente exitoso");
      } else {
        alert("Error al registrar: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Registrar Paciente</h1>
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {[
            ["Nombre", "text", "nombre"],
            ["Apellido Materno", "text", "apellidoMaterno"],
            ["Apellido Paterno", "text", "apellidoPaterno"],
            ["Fecha de Nacimiento", "date", "fechaNacimiento"],
            ["Sexo", "select", "sexo", ["Hombre", "Mujer", "Otro"]],
            ["Teléfono", "text", "telefono"],
            ["Email", "email", "email"],
            ["Escuela", "text", "escuela"],
            ["Carrera", "text", "carrera"],
            ["Domicilio", "text", "domicilio"],
            ["No. Boleta/Empleado", "text", "noBoleta"],
            ["Turno", "text", "turno"],
            ["Tipo de Sangre", "text", "tipoSangre"],
            ["Motivo de Visita", "textarea", "motivoVisita"],
            ["Padecimiento Actual", "textarea", "padecimientoActual"],
          ].map(([label, type, name, options], index) => (
            <div key={index}>
              <label className="block font-medium mb-1">{label}</label>
              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  rows="5"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              )}
            </div>
          ))}
        </form>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Registrar Paciente
      </button>
    </div>
  );
}

export default RegisterPaciente;
