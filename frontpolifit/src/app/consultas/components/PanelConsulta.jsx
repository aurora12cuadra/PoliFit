"use client";
import React, { useState, useEffect } from "react";

const PanelConsulta = ({ consulta, onClose }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [actLaboralData, setActLaboralData] = useState({});
  const [actFisicaData, setActFisicaData] = useState({});

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  // Función para realizar la consulta a la API
  const fetchFormularios = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      return;
    }
    try {
      // console.log("noBoleta en mediciones: ", noBoleta);
      const response = await fetch(`/api/consulta/getConsulta?id_consulta=${consulta.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('No se pudo obtener la consulta');
      }
  
      const data = await response.json();
      console.log("Data recuperado de consulta: ", data);
      console.log("Data recuperado de actividad Laboral: ", data.ActLaboral);
      console.log("Data recuperado de actividad Física: ", data.ActFisica);

      const actFisica = data.ActFisica || [];
      console.log("Actividad Fisica: ", actFisica);
      // Recuperar los datos de Actividad Laboral y Actividad Física
      setActLaboralData(data.ActLaboral || []);  // Si no hay datos, asignamos un arreglo vacío
      setActFisicaData(actFisica);    // Si no hay datos, asignamos un arreglo vacío
      // actFisicaData = actFisica;
      console.log("Actividad Fisica 2: ", actFisicaData);
    } catch (error) {
      console.error("Error al realizar la consulta de Consulta:", error);
    }
  };

  // useEffect para ejecutar la consulta al montar el componente
  useEffect(() => {
    fetchFormularios();
  }, []);

  const mapFrecuencia = (frecuencia) => {
    console.log("Frecuncia: ", frecuencia);
    switch (frecuencia) {
      case "1":
        return "Sedentario";
      case "2":
        return "Ligero";
      case "3":
        return "Moderado";
      case "4":
        return "Intenso";
      case "5":
        return "Muy Intenso";
      default:
        return "Frecuencia no definida";
    }
  };

  const mapEstres = (estres) => {
    console.log("Estres: ", estres);
    switch (estres) {
      case 1:
        return "Muy bajo";
      case 2:
        return "Bajo";
      case 3:
        return "Moderado";
      case 4:
        return "Alto";
      case 5:
        return "Muy Alto";
      default:
        return "Estres no definida";
    }
  };

  useEffect(() => {
    console.log("Actividad Fisica 3: ", actFisicaData);
    console.log("Length actFisicaData:", Array.isArray(actFisicaData) ? actFisicaData.length : "No es un arreglo");
    console.log("Número de propiedades en actFisicaData:", Object.keys(actFisicaData).length);
  }, [actFisicaData]);
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl p-6 rounded-md shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Detalles de la Consulta</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            X
          </button>
        </div>

        {/* Secciones colapsables */}
        <div>
          {/* Datos generales */}
          <div className="border-b py-2">
            <button
              className="w-full text-left font-semibold"
              onClick={() => toggleSection("generales")}
            >
              Datos Generales
            </button>
            {activeSection === "generales" && (
              <div className="p-4">
                <p><strong>Paciente:</strong> {consulta.paciente}</p>
                <p><strong>Email:</strong> {consulta.email}</p>
                <p><strong>Teléfono:</strong> {consulta.telefono || "N/A"}</p>
                <p>
                  <strong>Fecha de Consulta:</strong>{" "}
                  {new Date(consulta.fechaConsulta).toLocaleDateString()}
                </p>
                <p><strong>Hora:</strong> {consulta.hora}</p>
                <p><strong>Sexo:</strong> {consulta.sexo}</p>
              </div>
            )}
          </div>

          {/* Formularios */}
          {/* Formulario de Estilo de Vida */}
          <div className="border-b py-2">
            <button
              className="w-full text-left font-semibold"
              onClick={() => toggleSection("estiloVida")}
            >
              Estilo de Vida
            </button>
            {activeSection === "estiloVida" && (
              <div className="p-4">
                {/* Sección de Actividad Laboral */}
                <div className="border-b py-2">
                  {actLaboralData && Object.keys(actLaboralData).length > 0 ? (
                    <div className="mb-2">
                      <p><strong>Actividad Laboral</strong></p>
                      <p><strong>Ocupación:</strong> {actLaboralData.ocupacion || "No disponible"}</p>
                      <p><strong>Descripción:</strong> {actLaboralData.descrip || "No disponible"}</p>
                      <p><strong>Horas totales:</strong> {actLaboralData.total_horas || "No disponible"}</p>
                      <p><strong>Nivel de estrés:</strong> {mapEstres(actLaboralData.n_estres) || "No disponible"}</p>
                    </div>
                  ) : (
                    <p>No hay datos de actividad laboral disponibles.</p>
                  )}
                </div>
                {/* Sección de Actividad Física */}
                <div className="border-b py-2">
                  {actFisicaData && Object.keys(actFisicaData).length > 0 ? (
                    <div className="mb-2">
                      <p><strong>Actividad Física</strong></p>
                      <p><strong>Tipo de actividad:</strong> {actFisicaData.tipo || "No disponible"}</p>
                      <p><strong>Frecuencia:</strong> {mapFrecuencia(actFisicaData.frecuencia) || "No disponible"}</p>
                      <p><strong>Descripción:</strong> {actFisicaData.descripcion || "No disponible"}</p>
                    </div>
                  ) : (
                    <p>No hay datos de actividad física disponibles.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {/*["Estilo de Vida", "Antecedentes", "Diagnósticos"].map(
            (form, index) => (
              <div className="border-b py-2" key={index}>
                <button
                  className="w-full text-left font-semibold"
                  onClick={() => toggleSection(form)}
                >
                  {form}
                </button>
                {activeSection === form && (
                  <div className="p-4">
                    <p>
                      Aquí se mostrarán los datos registrados en el formulario{" "}
                      <strong>{form}</strong>.
                    </p>
                    {/* Este contenido debe ser dinámico basado en los datos }
                  </div>
                )}
              </div>
            )
          )*/}
        </div>
      </div>
    </div>
  );
};

export default PanelConsulta;
