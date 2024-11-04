"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePacienteRegistro } from "../context/PacienteRegistroContext";

function Antecedentes() {
  const router = useRouter();
  const { guardarRegistroPaciente, pacienteData, updatePacienteData } =
    usePacienteRegistro();
  // Verificar el contexto
  console.log("Contexto pacienteData en Antecedentes:", pacienteData);

  const [selectedFamilyHistory, setSelectedFamilyHistory] = useState(
    pacienteData.antecedentes?.selectedFamilyHistory || {}
  );
  const [selectedPersonalHistory, setSelectedPersonalHistory] = useState(
    pacienteData.antecedentes?.selectedPersonalHistory || {}
  );

  useEffect(() => {
    if (pacienteData.antecedentes) {
      setSelectedFamilyHistory(
        pacienteData.antecedentes.selectedFamilyHistory || {}
      );
      setSelectedPersonalHistory(
        pacienteData.antecedentes.selectedPersonalHistory || {}
      );
    }
  }, [pacienteData.antecedentes]);

  const handleFamilyHistoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFamilyHistory((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePersonalHistoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPersonalHistory((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleGuardarAntecedentes = () => {
    updatePacienteData("antecedentes", {
      selectedFamilyHistory,
      selectedPersonalHistory,
    });
  };

  const handleRegistrarPaciente = () => {
    guardarRegistroPaciente();
    alert("Paciente registrado exitosamente");
    router.push("../../pacientes"); // Redirigir a la página deseada
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
        Nuevo Paciente
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Antecedentes</h2>

      {/* Antecedentes Heredofamiliares */}
      <div className="bg-white shadow-md p-4 md:p-6 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Antecedentes Heredofamiliares
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Alergías",
            "Cardiológicos",
            "Diabétes",
            "Cáncer",
            "Obesidad",
            "Renales",
            "Hipertension",
            "Anemia",
            "Desordenes ax.",
            "Hepatobiliares",
            "Dislipidimias",
            "Otros",
          ].map((item) => (
            <div key={item}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  className="mr-2"
                  checked={!!selectedFamilyHistory[item]}
                  onChange={handleFamilyHistoryChange}
                />
                <label htmlFor={item}>{item}</label>
              </div>
              {selectedFamilyHistory[item] && (
                <input
                  type="text"
                  placeholder="Parentesco"
                  value={selectedFamilyHistory[item]?.parentesco || ""}
                  onChange={(e) => {
                    setSelectedFamilyHistory((prev) => ({
                      ...prev,
                      [item]: { ...prev[item], parentesco: e.target.value },
                    }));
                  }}
                  className="w-full md:w-3/4 lg:w-1/2 p-2 border rounded-md mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Antecedentes Personales Patológicos */}
      <div
        className="shadow-md p-4 md:p-6 rounded-md"
        style={{ backgroundColor: "#11404E" }}
      >
        <h3 className="text-xl font-semibold mb-4 text-white">
          Antecedentes Personales Patológicos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Alergías",
            "Cardiológicos",
            "Diabétes",
            "Cáncer",
            "Cirugias/Fracturas",
            "Obesidad",
            "Renales",
            "Hipertension",
            "Anemia",
            "Tiroides",
            "Desordenes ax.",
            "Hepatobiliares",
            "Dislipidimias",
            "Hepatitis",
            "Otros",
          ].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                id={item}
                name={item}
                className="mr-2"
                checked={!!selectedPersonalHistory[item]}
                onChange={handlePersonalHistoryChange}
              />
              <label className="text-white" htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => {
            handleGuardarAntecedentes();
            router.push("../../nuevopaciente");
          }}
        >
          Anterior
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={handleGuardarAntecedentes}
        >
          Guardar
        </button>
        <button
          className="bg-[#11404E] text-white py-2 px-4 rounded-md"
          onClick={() => {
            handleRegistrarPaciente();
            // Redirige a la página de lista de pacientes
          }}
        >
          Registrar Paciente
        </button>
      </div>
    </div>
  );
}

export default Antecedentes;
