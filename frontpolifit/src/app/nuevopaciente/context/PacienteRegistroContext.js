// src/context/PacienteRegistroContext.js
"use client";
import { createContext, useContext, useState } from "react";

// Crear el contexto de registro de paciente
const PacienteRegistroContext = createContext();

export function PacienteRegistroProvider({ children }) {
  // Estado para almacenar los datos del paciente
  const [pacienteData, setPacienteData] = useState({
    datosPersonales: {},
    antecedentes: {},
  });

  // Función para actualizar una sección específica de los datos del paciente
  const updatePacienteData = (section, data) => {
    setPacienteData((prevData) => {
      const updatedData = {
        ...prevData,
        [section]: { ...prevData[section], ...data }, // Mantenemos la estructura similar a la de `updateConsultaData` para consistencia
      };
      console.log("Datos de paciente actualizados:", updatedData); // Imprime los datos actualizados
      return updatedData;
    });
  };

  // Función para limpiar los datos del paciente después de registrar
  const clearPacienteData = () => {
    setPacienteData({
      datosPersonales: {},
      antecedentes: {},
    });
  };

  // Función para guardar el registro completo del paciente
  const guardarRegistroPaciente = () => {
    console.log("Datos del paciente a registrar:", pacienteData);
    // Aquí iría la lógica para enviar pacienteData al backend para guardarlo en la base de datos
    clearPacienteData(); // Limpia los datos después de guardar si es necesario
  };

  return (
    <PacienteRegistroContext.Provider
      value={{
        pacienteData,
        updatePacienteData,
        clearPacienteData,
        guardarRegistroPaciente, // Añadir la función al contexto
      }}
    >
      {children}
    </PacienteRegistroContext.Provider>
  );
}

// Hook para usar el contexto
export function usePacienteRegistro() {
  return useContext(PacienteRegistroContext);
}
