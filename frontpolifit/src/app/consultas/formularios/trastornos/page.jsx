// consulta/fromularios/trastornos
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";

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
    G: "",
    P: "",
    C: "",
    FUM: "",
    "FUP/C": "",
    SDGI: "",
    PPG: "",
    Anticonceptivos: "",
    notas: "",
  });

  useEffect(() => {
    if (consultaData.trastornos) {
      setTrastornos(consultaData.trastornos.trastornos || {});
    }
    if (consultaData.ginecoObstetricos) {
      setGinecoObstetricos(consultaData.ginecoObstetricos || {
        G: "",
        P: "",
        C: "",
        FUM: "",
        "FUP/C": "",
        SDGI: "",
        PPG: "",
        Anticonceptivos: "",
        notas: "",
      });
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

  const handleGuardar = () => {
    // Convertir cada trastorno en un string de frecuencia o vacío según corresponda
    const formattedTrastornos = Object.keys(trastornos).reduce((acc, key) => {
      acc[key] = trastornos[key].value ? trastornos[key].frecuencia : "";
      return acc;
    }, {});
  
    // Combinar `formattedTrastornos` con `ginecoObstetricos` en un solo objeto
    const datosTrastornos = {
      formattedTrastornos,
      ginecoObstetricos,
    };
  
    console.log("datos recolectados de trastornos 1: ", formattedTrastornos);
    console.log("datos recolectados de trastornos 2: ", ginecoObstetricos);
    console.log("datos recolectados de trastornos 3: ", datosTrastornos);
    console.log("datos recolectados de trastornos 4: ", datosTrastornos.formattedTrastornos);
    // Enviar el objeto completo como un solo `updateConsultaData`
    updateConsultaData("trastornos", datosTrastornos);
    router.push("/consultas/formularios/mediciones");
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
    flatulen: "Flatulencia",
    disten: "Distensión",
    pirosis: "Pirosis",
    G: "Gestaciones",
    P: "Partos",
    C: "Cesáreas",
    FUM: "Fecha Última Menstruación",
    "FUP/C": "Fecha Último Parto/Cesárea",
    SDGI: "Síndrome de Dolor Genitourinario",
    PPG: "Planificación Familiar",
    Anticonceptivos: "Uso de Anticonceptivos",
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
            {Object.keys(ginecoObstetricos).map((label) => (
              <div key={label}>
                <label className="block font-medium mb-1 text-white">{labels[label] || label}</label>
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
        {/* <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Notas</h3>
          <textarea
            className="w-full h-3/4 p-2 border rounded-md"
            placeholder="Ingrese cualquier observación adicional"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
        </div> */}
      </div>

      {/* Botones de Navegación */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => router.push("/consultas/formularios/estilovida")}
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
