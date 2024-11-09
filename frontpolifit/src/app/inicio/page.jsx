"use client";
import React, { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#e0f7fa] flex justify-center items-center p-4">
      <div className="relative w-full max-w-md">
        {/* Círculos Decorativos mejorados para ser más atractivos visualmente */}
        <div className="absolute -left-28 top-1/4 transform -translate-y-1/2 bg-[#00796b] rounded-full w-72 h-72 z-0 animate-pulse-moderate"></div>
        <div className="absolute -right-28 top-3/4 transform -translate-y-1/2 bg-[#004d40] rounded-full w-72 h-72 z-0 animate-pulse-moderate"></div>
        <div className="relative z-10 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col p-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#0b2f37]">Inicio de Sesión</h2>
          <div className="mb-4">
            <label className="font-bold text-gray-700">Usuario:</label>
            <input type="text" name="usuario" onChange={handleChange} value={formData.usuario} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="font-bold text-gray-700">Contraseña:</label>
            <input type="password" name="password" onChange={handleChange} value={formData.password} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="flex space-x-4 mb-4">
            <button type="submit" className="w-full bg-[#00796b] text-white p-2 rounded-md hover:bg-[#004d40]">Ingresar</button>
            <button type="button" className="w-full bg-[#00796b] text-white p-2 rounded-md hover:bg-[#004d40]">Cancelar</button>
          </div>
          <div className="text-center">
            <a href="#" className="text-[#004d40] underline">¿Olvidaste la contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;



