"use client";
import { createContext, useContext, useState } from "react";

// Crear el contexto
const PacienteContext = createContext();

// Proveedor del contexto
export function PacienteProvider({ children }) {
  // Información básica del paciente
  const [pacienteData, setPacienteData] = useState({
    pacienteId: null,
    nombre: "",
    email: "",
    telefono: "",
    // Puedes añadir más datos aquí si es necesario
  });

  // Función para actualizar la información básica del paciente
  const setPacienteInfo = (info) => {
    setPacienteData(info);
  };

  // Datos de la consulta acumulados
  const [consultaData, setConsultaData] = useState({
    estiloDeVida: {},
    trastornos: {},
    mediciones: {},
    kilocalorias: {},
    recordatorio24Hrs:{},
    // Añadir más secciones según sea necesario
  });
  // Función para actualizar datos específicos de cada formulario en consultaData
  // const updateConsultaData = (section, data) => {
  //   setConsultaData((prevData) => ({
  //     ...prevData,
  //     [section]: { ...prevData[section], ...data },
  //   }));
  // };
  const updateConsultaData = (field, value) => {
    setConsultaData((prevData) => {
        const updatedData = { ...prevData, [field]: value };
        console.log("Datos de la consulta actualizados:", updatedData); // Revisa los datos aquí
        return updatedData;
    });
};

const resetConsultaData = () => {
  setConsultaData({
    estiloDeVida: {},
    trastornos: {},
    mediciones: {},
    kilocalorias: {},
    recordatorio24Hrs: {},
  });
};

  // Función para guardar la consulta completa
  const guardarConsulta = () => {
    const consultaCompleta = {
      pacienteId: pacienteData.pacienteId,
      ...consultaData,
    };

    console.log("Datos de la consulta a guardar:", consultaCompleta);
    // Aquí iría la lógica para enviar consultaCompleta al backend
  };

  return (
    <PacienteContext.Provider
      value={{
        ...pacienteData,
        setPacienteInfo,
        consultaData,
        updateConsultaData,
        resetConsultaData,
        guardarConsulta,
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
}

// Hook para usar el contexto del paciente
export function usePaciente() {
  return useContext(PacienteContext);
}
