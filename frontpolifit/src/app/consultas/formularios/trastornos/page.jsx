"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";
//import Cronometro from "../../components/Cronometro";


function Trastornos() {
  const router = useRouter();
  const {consultaData, updateConsultaData } = usePaciente(); // Usamos el contexto para guardar los datos
  const trastornosOptions = [
    "Vómito",
    "Diarrea",
    "Estreñimiento",
    "Colitis",
    "Gastritis",
    "Náuseas",
    "Reflujo",
    "Disfagia",
    "Flatulencias",
    "Distensión",
    "Pirosis",
    "Otro",
  ];

  const [selectedTrastornos, setSelectedTrastornos] = useState({});
  const [selectedFrecuencia, setSelectedFrecuencia] = useState({});
  const [ginecoObstetricos, setGinecoObstetricos] = useState({
    G: "",
    P: "",
    C: "",
    FUM: "",
    "FUP/C": "",
    SDGI: "",
    PPG: "",
    Anticonceptivos: "",
  });
  const [notas, setNotas] = useState("");

  useEffect(() => {
    // Cargar datos de trastornos si están en el contexto
    if (consultaData.trastornos) {
      setSelectedTrastornos(consultaData.trastornos.selectedTrastornos || {});
      setSelectedFrecuencia(consultaData.trastornos.selectedFrecuencia || {});
      setGinecoObstetricos(consultaData.trastornos.ginecoObstetricos || {
        G: "",
        P: "",
        C: "",
        FUM: "",
        "FUP/C": "",
        SDGI: "",
        PPG: "",
        Anticonceptivos: "",
      });
      setNotas(consultaData.trastornos.notas || "");
    }
  }, [consultaData.trastornos]);

  const handleTrastornoChange = (event) => {
    const { name, checked } = event.target;
    setSelectedTrastornos((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (!checked) {
      setSelectedFrecuencia((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFrecuenciaChange = (event, item) => {
    const { value } = event.target;
    setSelectedFrecuencia((prev) => ({
      ...prev,
      [item]: value,
    }));
  };

  const handleGinecoObstetricosChange = (event) => {
    const { name, value } = event.target;
    setGinecoObstetricos((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    const trastornosData = {
      selectedTrastornos,
      selectedFrecuencia,
      ginecoObstetricos,
      notas,
    };
    updateConsultaData("trastornos", trastornosData);
    router.push("/consultas/formularios/mediciones");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Trastornos</h2>

      {/* Trastornos Gastrointestinales */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Trastornos Gastrointestinales
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {trastornosOptions.map((item) => (
            <div key={item}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  className="mr-2"
                  checked={!!selectedTrastornos[item]}
                  onChange={handleTrastornoChange}
                />
                <label htmlFor={item}>{item}</label>
              </div>
              <select
                className="w-full p-2 border rounded-md mt-2"
                disabled={!selectedTrastornos[item]}
                value={selectedFrecuencia[item] || ""}
                onChange={(e) => handleFrecuenciaChange(e, item)}
              >
                <option value="" disabled hidden>
                  Frecuencia
                </option>
                <option value="Nunca">Nunca</option>
                <option value="Rara vez">Rara vez</option>
                <option value="Ocasionalmente">Ocasionalmente</option>
                <option value="Regularmente">Regularmente</option>
                <option value="Frecuentemente">Frecuentemente</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Gineco-Obstétricos */}
      <div className="grid grid-cols-2 gap-6">
        <div
          className="shadow-md p-6 rounded-md"
          style={{ backgroundColor: "#11404E" }}
        >
          <h3 className="text-xl text-center font-semibold mb-4 text-white">
            Gineco-Obstétricos
          </h3>
          <h4 className="text-lg font-semibold mb-2 text-white">Parámetros</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(ginecoObstetricos).map((label) => (
              <div key={label}>
                <label className="block font-medium mb-1 text-white">
                  {label}
                </label>
                <input
                  type="text"
                  name={label}
                  value={ginecoObstetricos[label]}
                  onChange={handleGinecoObstetricosChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notas */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Notas</h3>
          <textarea
            className="w-full h-3/4 p-2 border rounded-md"
            placeholder="Ingrese cualquier observación adicional"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => {
            handleGuardar();
            router.push("/consultas/formularios/estilovida")}}
        >
          Anterior
        </button>
        <button
          className="bg-[#11404E] text-white py-2 px-4 rounded-md"
          onClick={handleGuardar}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Trastornos;
