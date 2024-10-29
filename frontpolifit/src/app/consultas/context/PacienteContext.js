"use client";
import { createContext, useContext, useState } from "react";

// Crear el contexto
const PacienteContext = createContext();

// Proveedor del contexto
export function PacienteProvider({ children }) {
  const [pacienteData, setPacienteData] = useState({
    pacienteId: null,
    nombre: "",
    email: "",
    telefono: "",
    // Puedes añadir más datos aquí si es necesario
  });

  const setPacienteInfo = (info) => {
    setPacienteData(info);
  };

  return (
    <PacienteContext.Provider value={{ ...pacienteData, setPacienteInfo }}>
      {children}
    </PacienteContext.Provider>
  );
}

// Hook para usar el contexto del paciente
export function usePaciente() {
  return useContext(PacienteContext);
}