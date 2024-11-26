import React, { useState } from "react";

const PanelConsulta = ({ consulta, onClose }) => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

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
          {["Estilo de Vida", "Antecedentes", "Diagnósticos"].map(
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
                    {/* Este contenido debe ser dinámico basado en los datos */}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelConsulta;
