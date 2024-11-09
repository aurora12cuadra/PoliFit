"use client";
import React, { useState } from 'react';

function RegistroForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    numeroEmpleado: '',
    especialidad: '',
    escuela: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const response = await fetch("../../pages/api/nutriologos/register.js", {
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
    <div className="min-h-screen bg-[#e0f7fa] flex justify-center items-center p-4">
      <div className="relative w-full max-w-4xl">
        {/* Círculos Decorativos mejorados para ser más atractivos visualmente */}
        <div className="absolute -left-40 top-1/4 transform -translate-y-1/2 bg-[#00796b] rounded-full w-96 h-96 z-0 animate-pulse-moderate"></div>
        <div className="absolute -right-40 top-3/4 transform -translate-y-1/2 bg-[#004d40] rounded-full w-96 h-96 z-0 animate-pulse-moderate"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0b2f37] rounded-full w-128 h-128 z-0 animate-pulse-moderate"></div>
        <div className="relative z-10 bg-white shadow-lg rounded-lg overflow-hidden flex">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#0b2f37]">Registro</h2>
            {['nombre', 'apellidos', 'fechaNacimiento', 'numeroEmpleado', 'especialidad'].map(field => (
              <div key={field} className="mb-4">
                <label className="font-bold text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                <input type={field === 'fechaNacimiento' ? 'date' : 'text'} name={field} onChange={handleChange} value={formData[field]} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            ))}
          </div>
          <div className="w-1/2 p-8 bg-[#0b2f37] text-white rounded-r-lg">
            {['escuela', 'email', 'password', 'confirmPassword'].map(field => (
              <div key={field} className="mb-4">
                <label className="font-bold capitalize">{field === 'password' ? 'Contraseña' : field === 'confirmPassword' ? 'Repetir Contraseña' : field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                <input type={field.includes('password') ? 'password' : 'text'} name={field} onChange={handleChange} value={formData[field]} className="mt-1 block w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            ))}
            <div className="flex items-center mb-4">
              <input type="checkbox" id="privacy" className="mr-2" />
              <label htmlFor="privacy">Acepto Aviso de Privacidad <a href="#" className="text-green-600 underline">Ver aquí</a></label>
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms">Acepto Términos y Condiciones <a href="#" className="text-green-600 underline">Ver aquí</a></label>
            </div>
            <div className="flex space-x-4">
              <button type="submit" 
              onClick={handleSubmit}
              className="w-full bg-[#00796b] text-white p-2 rounded-md hover:bg-[#004d40]">Registrar</button>
              <button type="button" className="w-full bg-[#00796b] text-white p-2 rounded-md hover:bg-[#004d40]">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroForm;



