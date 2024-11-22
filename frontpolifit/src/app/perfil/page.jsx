"use client";
import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function PerfilNutriologo() {
    const [nutriologo, setNutriologo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);
  
    // Obtén los datos del perfil al cargar el componente
    useEffect(() => {
      const fetchPerfil = async () => {

        const token = localStorage.getItem("token");
  
        if (!token) {
          alert("No estás autenticado. Por favor, inicia sesión.");
          return;
        }
      
        try {
          const response = await fetch('/api/nutriologos/perfil', {
            headers: {
              Authorization: `Bearer ${token}`, // Incluye el token
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setNutriologo(data);
            setFormData(data);
          } else {
            const errorData = await response.json();
            console.error("Error al obtener el perfil:", errorData.error);
          }
        } catch (error) {
          console.error("Error al conectar con el servidor:", error);
        }
      };
  
      fetchPerfil();
    }, []);
  
    // Manejador para habilitar el modo de edición
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    // Manejador para guardar los cambios
    const handleSaveClick = () => {
      setIsEditing(false);
      console.log("Datos actualizados:", formData);
      // Implementar lógica para guardar cambios en el backend si es necesario
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    if (!nutriologo) {
      return <p>Cargando perfil...</p>;
    }

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      {/* Contenedor principal con borde verde */}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 border-2 border-[#00796b]">
        {/* Ícono de perfil en verde */}
        <div className="flex justify-center mb-6">
          <UserCircleIcon className="w-32 h-32 text-[#00796b]" />
        </div>

        <h1 className="text-2xl font-bold text-center text-[#0b2f37] mb-6">
          Perfil de {formData.nombre || "Nutriólogo"}
        </h1>

        {/* Sección de Datos Personales */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#00796b] mb-4">Datos Personales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`p-3 rounded-md shadow-sm w-full ${
                  isEditing ? "border-2 border-[#00796b]" : "border border-gray-300 bg-gray-100"
                }`}
                readOnly={!isEditing}
              />
            </div>

            {/* Apellidos */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Apellidos:</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className={`p-3 rounded-md shadow-sm w-full ${
                  isEditing ? "border-2 border-[#00796b]" : "border border-gray-300 bg-gray-100"
                }`}
                readOnly={!isEditing}
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className={`p-3 rounded-md shadow-sm w-full ${
                  isEditing ? "border-2 border-[#00796b]" : "border border-gray-300 bg-gray-100"
                }`}
                readOnly={!isEditing}
              />
            </div>

            {/* Número de Empleado (solo lectura) */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Número de Empleado:</label>
              <input
                type="text"
                name="numeroEmpleado"
                value={formData.numeroEmpleado}
                className="bg-gray-100 p-3 rounded-md shadow-sm w-full border border-gray-300"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Sección de Información Profesional */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#00796b] mb-4">Información Profesional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Especialidad */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Especialidad:</label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                className={`p-3 rounded-md shadow-sm w-full ${
                  isEditing ? "border-2 border-[#00796b]" : "border border-gray-300 bg-gray-100"
                }`}
                readOnly={!isEditing}
              />
            </div>

            {/* Escuela */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Escuela:</label>
              <input
                type="text"
                name="escuela"
                value={formData.escuela}
                onChange={handleChange}
                className={`p-3 rounded-md shadow-sm w-full ${
                  isEditing ? "border-2 border-[#00796b]" : "border border-gray-300 bg-gray-100"
                }`}
                readOnly={!isEditing}
              />
            </div>

            {/* Email (solo lectura) */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="bg-gray-100 p-3 rounded-md shadow-sm w-full border border-gray-300"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="text-center">
          {!isEditing ? (
            <button onClick={handleEditClick} className="bg-[#00796b] text-white px-6 py-3 rounded-md hover:bg-[#004d40]">
              Actualizar Información
            </button>
          ) : (
            <button onClick={handleSaveClick} className="bg-[#00796b] text-white px-6 py-3 rounded-md hover:bg-[#004d40]">
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilNutriologo;












