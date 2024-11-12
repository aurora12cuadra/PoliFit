"use client";
import { usePaciente } from "../../context/PacienteContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
//import Cronometro from "../../components/Cronometro";

function Mediciones() {

  const { consultaData, updateConsultaData } = usePaciente();
  const router = useRouter();

  // Local state for each section
  const [pliegues, setPliegues] = useState({});
  const [perimetros, setPerimetros] = useState({});
  const [diametros, setDiametros] = useState({});
  const [bioimpedancia, setBioimpedancia] = useState({});
  const [indicadores, setIndicadores] = useState({});

  useEffect(() => {
    if (consultaData.mediciones) {
      setPliegues(consultaData.mediciones.pliegues || {});
      setPerimetros(consultaData.mediciones.perimetros || {});
      setDiametros(consultaData.mediciones.diametros || {});
      setBioimpedancia(consultaData.mediciones.bioimpedancia || {});
      setIndicadores(consultaData.mediciones.indicadores || {});
    }
  }, [consultaData.mediciones]);

  const handleInputChange = (section, key, value) => {
    const updateFunc = {
      pliegues: setPliegues,
      perimetros: setPerimetros,
      diametros: setDiametros,
      bioimpedancia: setBioimpedancia,
      indicadores: setIndicadores,
    }[section];

    updateFunc((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSaveAndNext = () => {
    const datosMediciones = {
      pliegues,
      perimetros,
      diametros,
      bioimpedancia,
      indicadores,
    };
    updateConsultaData("mediciones", datosMediciones);
    router.push("/consultas/formularios/kilocalorias");
  };  

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Mediciones</h2>

      {/* Pliegues */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl text-center font-semibold mb-4">Pliegues</h3>
        <h4 className="text-lg font-semibold mb-2">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Subescapular",
            "Tríceps",
            "Bíceps",
            "Cresta Ilíaca",
            "Supraspinal",
            "Abdominal",
            "Muslo Frontal",
            "Pantorrilla Medial",
            "Axilar Medial",
            "Pectoral",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={pliegues[label] || ""}
                onChange={(e) => handleInputChange("pliegues", label, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Perímetros */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6" style={{ backgroundColor: '#11404E' }}>
        <h3 className="text-xl text-center font-semibold mb-4 text-white">Perímetros</h3>
        <h4 className="text-lg font-semibold mb-2 text-white">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Cefálico",
            "Cuello",
            "Mitad del brazo relajado",
            "Mitad del brazo contraído",
            "Antebrazo",
            "Muñeca",
            "Mesosternal",
            "Umbilical",
            "Cintura",
            "Cadera",
            "Muslo 1 cm bajo la cresta ilíaca",
            "Muslo medio",
            "Pantorrilla",
            "Tobillo",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1 text-white">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={perimetros[label] || ""}
                onChange={(e) => handleInputChange("perimetros", label, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Diámetros */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl text-center font-semibold mb-4">Diámetros</h3>
        <h4 className="text-lg font-semibold mb-2">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Biacromial",
            "Biliocrestal",
            "Longitud del pie",
            "Transverso del tórax",
            "Anteroposterior del tórax",
            "Húmero",
            "Biestiloidea de la muñeca",
            "Fémur",
            "Bimaleolar",
            "Transverso del pie",
            "Longitud mano",
            "Transverso de la mano",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={diametros[label] || ""}
                onChange={(e) => handleInputChange("diametros", label, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bioimpedancia */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6" style={{ backgroundColor: '#11404E' }}>
        <h3 className="text-xl text-center font-semibold mb-4 text-white">Bioimpedancia</h3>
        <h4 className="text-lg font-semibold mb-2 text-white">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Grasa total",
            "Grasa en sección superior",
            "Grasa en sección inferior",
            "Grasa visceral",
            "Edad Metabólica",
            "Masa libre de grasa",
            "Masa Muscular",
            "Peso óseo",
            "Agua Corporal",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1 text-white">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={bioimpedancia[label] || ""}
                onChange={(e) => handleInputChange("bioimpedancia", label, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores Bioquímicos */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <h3 className="text-xl text-center font-semibold mb-4">Indicadores Bioquímicos</h3>
        <h4 className="text-lg font-semibold mb-2">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Hemoglobina",
            "Glucosa",
            "Colesterol",
            "Triglicéridos",
            "Ácido Úrico",
            "Urea",
            "Albumina",
            "Otros",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={indicadores[label] || ""}
                onChange={(e) => handleInputChange("indicadores", label, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => router.push("/consultas/formularios/trastornos")} // Reemplaza con la ruta correcta
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Anterior
        </button>
        <button
          onClick={handleSaveAndNext}
          className="bg-[#11404E] text-white py-2 px-4 rounded-md"
        >
          Siguiente
        </button>
      </div>

    </div>
  );
}

export default Mediciones;
