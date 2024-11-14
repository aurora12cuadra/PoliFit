"use client";
import { usePaciente } from "../../context/PacienteContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
            { label: "Subescapular", field: "subescapular" },
            { label: "Tríceps", field: "triceps" },
            { label: "Bíceps", field: "biceps" },
            { label: "Cresta Ilíaca", field: "cresta_iliaca" },
            { label: "Supraspinal", field: "supraespinal" },
            { label: "Abdominal", field: "abdominal" },
            { label: "Muslo Frontal", field: "muslo_frontal" },
            { label: "Pantorrilla Medial", field: "pantorrilla_medial" },
            { label: "Axilar Medial", field: "axilar_medial" },
            { label: "Pectoral", field: "pectoral" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={pliegues[field] || ""}
                onChange={(e) => handleInputChange("pliegues", field, e.target.value)}
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
            { label: "Cefálico", field: "cefalico" },
            { label: "Cuello", field: "cuello" },
            { label: "Mitad del brazo relajado", field: "mitad_bra_rela" },
            { label: "Mitad del brazo contraído", field: "mitad_bra_contra" },
            { label: "Antebrazo", field: "antebrazo" },
            { label: "Muñeca", field: "muñeca" },
            { label: "Mesosternal", field: "mesoesternal" },
            { label: "Umbilical", field: "umbilical" },
            { label: "Cintura", field: "cintura" },
            { label: "Cadera", field: "cadera" },
            { label: "Muslo 1 cm bajo la cresta ilíaca", field: "muslo" },
            { label: "Muslo medio", field: "muslo_medio" },
            { label: "Pantorrilla", field: "panto" },
            { label: "Tobillo", field: "tobillo" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block font-medium mb-1 text-white">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={perimetros[field] || ""}
                onChange={(e) => handleInputChange("perimetros", field, e.target.value)}
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
            { label: "Biacromial", field: "biacromial" },
            { label: "Biliocrestal", field: "biileocrestal" },
            { label: "Longitud del pie", field: "long_pie" },
            { label: "Transverso del tórax", field: "trans_torax" },
            { label: "Anteroposterior del tórax", field: "ante_torax" },
            { label: "Húmero", field: "humero" },
            { label: "Biestiloidea de la muñeca", field: "bies_muñeca" },
            { label: "Fémur", field: "femur" },
            { label: "Bimaleolar", field: "bimaleolar" },
            { label: "Transverso del pie", field: "trans_pie" },
            { label: "Longitud mano", field: "long_mano" },
            { label: "Transverso de la mano", field: "trans_mano" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={diametros[field] || ""}
                onChange={(e) => handleInputChange("diametros", field, e.target.value)}
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
            { label: "Grasa total", field: "grasa_total" },
            { label: "Grasa en sección superior", field: "grasa_secsuper" },
            { label: "Grasa en sección inferior", field: "grasa_secinfe" },
            { label: "Grasa visceral", field: "grasa_visceral" },
            { label: "Edad Metabólica", field: "edad_meta" },
            { label: "Masa libre de grasa", field: "masa_libregrasa" },
            { label: "Masa Muscular", field: "masa_muscular" },
            { label: "Peso óseo", field: "peso_oseo" },
            { label: "Agua Corporal", field: "agua_corporal" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block font-medium mb-1 text-white">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={bioimpedancia[field] || ""}
                onChange={(e) => handleInputChange("bioimpedancia", field, e.target.value)}
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
            { label: "Hemoglobina", field: "homoglobina" },
            { label: "Glucosa", field: "glucosa" },
            { label: "Colesterol", field: "colesterol" },
            { label: "Triglicéridos", field: "trigliceridos" },
            { label: "Urea", field: "urea" },
            { label: "Ácido Úrico", field: "acido_urico" },
            { label: "Albumina", field: "albumina" },
            // Opcionalmente podrías añadir "Otros" si es necesario en el frontend.
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={indicadores[field] || ""}
                onChange={(e) => handleInputChange("indicadores", field, e.target.value)}
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
