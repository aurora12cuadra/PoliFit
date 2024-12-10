// consulta/fromularios/trastornos
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";
//import Cronometro from "../../components/Cronometro";

function Trastornos() {
  const router = useRouter();
  const { consultaData, updateConsultaData } = usePaciente();
  const trastornosOptions = [
    "vomito",
    "diarrea",
    "estreni",
    "colitis",
    "gastri",
    "nauseas",
    "reflujo",
    "disfagia",
    "flatulen",
    "disten",
    "pirosis",
  ];

  const [trastornos, setTrastornos] = useState({});
  const [ginecoObstetricos, setGinecoObstetricos] = useState({
    g: "",
    p: "",
    c: "",
    fum: "",
    fup: "",
    sdgi: "",
    ppg: "",
    anticon: "",
    notas: "",
  });

  useEffect(() => {
    if (consultaData.trastornos) {
      setTrastornos((prev) => ({
        ...prev,
        ...consultaData.trastornos.trastornos,
      }));
    }
    if (consultaData.trastornos?.ginecoObstetricos) {
      setGinecoObstetricos((prev) => ({
        ...prev,
        ...consultaData.trastornos.ginecoObstetricos,
      }));
    }
  }, [consultaData]);
  

  const handleTrastornoChange = (event, name) => {
    const { checked } = event.target;
    setTrastornos((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: checked,
        frecuencia: checked ? prev[name]?.frecuencia || "" : "",
      },
    }));
  };

  const handleFrecuenciaChange = (event, name) => {
    const { value } = event.target;
    setTrastornos((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        frecuencia: value,
      },
    }));
  };

  const handleGinecoObstetricosChange = (event) => {
    const { name, value } = event.target;
    setGinecoObstetricos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Verifica que esto funcione correctamente:
  console.log("Estado actualizado de ginecoObstetricos:", ginecoObstetricos);

  const handleGuardar = () => {
    // Formatear trastornos gastrointestinales
  const formattedTrastornos = Object.keys(trastornos).reduce((acc, key) => {
    acc[key] = trastornos[key]?.value ? trastornos[key].frecuencia : "";
    return acc;
  }, {});

  // Combina los datos de trastornos y gineco-obstétricos
  const datosTrastornos = {
    formattedTrastornos,
    ginecoObstetricos,
  };
  console.log("Datos enviados al backend:", datosTrastornos); 
    console.log("datos recolectados de trastornos 1: ", formattedTrastornos);
    console.log("datos recolectados de trastornos 2: ", ginecoObstetricos);
    console.log("datos recolectados de trastornos 3: ", datosTrastornos);
    console.log("datos recolectados de trastornos 4: ", datosTrastornos.formattedTrastornos);
    // Enviar el objeto completo como un solo `updateConsultaData`
    updateConsultaData("trastornos", datosTrastornos);
    router.push("/consultas/formularios/recordatorio24hrs");
  };  

  const labels = {
    vomito: "Vómito",
    diarrea: "Diarrea",
    estreni: "Estreñimiento",
    colitis: "Colitis",
    gastri: "Gastritis",
    nauseas: "Náuseas",
    reflujo: "Reflujo",
    disfagia: "Disfagia",
    flatulen: "Flatulencias",
    disten: "Distensión",
    pirosis: "Pirosis",
    g: "Gestaciones",
    p: "Partos",
    c: "Cesáreas",
    fum: "Fecha Última Menstruación",
    fup: "Fecha Último Parto/Cesárea",
    sdgi: "Síndrome de Dolor Genitourinario",
    ppg: "Planificación Familiar",
    anticon: "Uso de Anticonceptivos",
    notas: "Notas",
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Trastornos</h2>

      {/* Trastornos Gastrointestinales */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Trastornos Gastrointestinales</h3>
        <div className="grid grid-cols-3 gap-4">
          {trastornosOptions.map((item) => (
            <div key={item}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  className="mr-2"
                  checked={!!trastornos[item]?.value}
                  onChange={(e) => handleTrastornoChange(e, item)}
                />
                <label htmlFor={item}>{labels[item] || item}</label>
              </div>
              <select
                className="w-full p-2 border rounded-md mt-2"
                disabled={!trastornos[item]?.value}
                value={trastornos[item]?.frecuencia || ""}
                onChange={(e) => handleFrecuenciaChange(e, item)}
              >
                <option value="" disabled hidden>Frecuencia</option>
                <option value="Rara vez">Rara vez</option>
                <option value="Ocasionalmente">Ocasionalmente</option>
                <option value="Frecuentemente">Frecuentemente</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      {/* Gineco-Obstétricos */}
      <div className="grid grid-cols-2 gap-6">
        <div className="shadow-md p-6 rounded-md" style={{ backgroundColor: "#11404E" }}>
          <h3 className="text-xl text-center font-semibold mb-4 text-white">
            Gineco-Obstétricos
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Campos de texto existentes */}
            {["g", "p", "c", "sdgi"].map((field) => (
              <div key={field}>
                <label className="block font-medium mb-1 text-white">{labels[field] || field}</label>
                <input
                  type="text"
                  name={field}
                  value={ginecoObstetricos[field]}
                  onChange={handleGinecoObstetricosChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}

            {/* Campo "Fecha Última Menstruación" (FUM) */}
            <div>
              <label className="block font-medium mb-1 text-white">
                {labels.fum || "Fecha Última Menstruación"}
              </label>
              <input
                type="date"
                name="fum"
                value={ginecoObstetricos.fum}
                onChange={handleGinecoObstetricosChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Campo "Fecha Último Parto/Cesárea" (FUP/C) */}
            <div>
              <label className="block font-medium mb-1 text-white">
                {labels["fup"] || "Fecha Último Parto/Cesárea"}
              </label>
              <input
                type="date"
                name="fup"
                value={ginecoObstetricos["fup"]}
                onChange={handleGinecoObstetricosChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Campo "Planificación Familiar" (PPG) */}
            <div>
              <label className="block font-medium mb-1 text-white">
                {labels.ppg || "Planificación Familiar"}
              </label>
              <input
                type="checkbox"
                name="PPG"
                checked={ginecoObstetricos.ppg === "true"}
                onChange={(e) =>
                  setGinecoObstetricos({
                    ...ginecoObstetricos,
                    ppg: e.target.checked ? "true" : "false",
                  })
                }
                className="w-5 h-5 border rounded-md"
              />
            </div>

            {/* Campo "Uso de Anticonceptivos" (Anticonceptivos) */}
            <div>
              <label className="block font-medium mb-1 text-white">
                {labels.anticon || "Uso de Anticonceptivos"}
              </label>
              <select
                name="anticon"
                value={ginecoObstetricos.anticon}
                onChange={handleGinecoObstetricosChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled hidden>Seleccione...</option>
                <option value="Píldora">Píldora</option>
                <option value="DIU">DIU</option>
                <option value="Condón">Condón</option>
                <option value="Implante">Implante</option>
                <option value="Inyección">Inyección</option>
                <option value="Anillo Vaginal">Anillo Vaginal</option>
                <option value="Parche">Parche</option>
              </select>
            </div>

            {/* Campo "Notas" */}
            <div className="col-span-2">
              <label className="block font-medium mb-1 text-white">{labels.notas || "Notas"}</label>
              <textarea
                name="notas"
                value={ginecoObstetricos.notas}
                onChange={handleGinecoObstetricosChange}
                className="w-full p-2 border rounded-md"
                rows="4"
              />
            </div>
          </div>
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
          className="bg-[#11404E] text-white py-2 px-4 rounded-md hover:bg-[#1a5c70]"
          onClick={handleGuardar}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Trastornos;
