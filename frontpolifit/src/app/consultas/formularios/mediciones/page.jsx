"use client";
import { usePaciente } from "../../context/PacienteContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
//import Cronometro from "../../components/Cronometro";

function Mediciones() {
  const { consultaData, updateConsultaData, noBoleta } = usePaciente();
  const [plieguesAnterior, setPlieguesAnterior] = useState({});
  const router = useRouter();

  // Local state for each section
  const [pliegues, setPliegues] = useState({});
  const [perimetros, setPerimetros] = useState({});
  const [diametros, setDiametros] = useState({});
  const [bioimpedancia, setBioimpedancia] = useState({});
  const [indicadores, setIndicadores] = useState({});

  // Función para realizar la consulta a la API
  const fetchPlieguesAnterior = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      return;
    }
    try {
      // console.log("noBoleta en mediciones: ", noBoleta);
      const response = await fetch(`/api/consulta/getMediciones?noBoleta=${noBoleta}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('No se pudo obtener la última consulta');
      }
  
      const data = await response.json();
      console.log("Data recuperado de mediciones: ", data);
      console.log("Data recuperado de mediciones pliegue: ", data.Pliegue);

      // Recuperar los datos de Mediciones
      const plieguesData = data.Pliegue || [];  // Si no hay datos de pliegues, asignamos un arreglo vacío
      const diametrosData = data.Diametro || [];  // Lo mismo para Diametros
      setPlieguesAnterior(plieguesData); // Aquí se asume que `data` es un objeto con los campos de pliegues
      // Ahora puedes usar estas variables como desees, por ejemplo:
      console.log('Pliegues:', plieguesData);
      console.log('Diametros:', diametrosData);
    } catch (error) {
      console.error("Error al realizar la consulta de pliegues:", error);
    }
  };

  useEffect(() => {
    if (consultaData.mediciones) {
      setPliegues(consultaData.mediciones.pliegues || {});
      setPerimetros(consultaData.mediciones.perimetros || {});
      setDiametros(consultaData.mediciones.diametros || {});
      setBioimpedancia(consultaData.mediciones.bioimpedancia || {});
      setIndicadores(consultaData.mediciones.indicadores || {});
    }
    fetchPlieguesAnterior();
  }, [consultaData.mediciones]);

  // async function obtenerUltimaConsulta(noBoleta) {
  //   try {
  //     // Suponiendo que tienes la URL de la API configurada correctamente
  //     const response = await fetch(`/api/consulta/getMediciones/${noBoleta}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Aquí puedes agregar tu token de autenticación si es necesario
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     });
  
  //     // Verificamos si la respuesta fue exitosa
  //     if (!response.ok) {
  //       throw new Error('No se pudo obtener la última consulta');
  //     }
  
  //     const data = await response.json();
  
  //     // Asumimos que `data` contiene la consulta con los modelos asociados
  //     // Recuperar los datos de Pliegues y Diametros
  //     const plieguesData = data.Pliegues || [];  // Si no hay datos de pliegues, asignamos un arreglo vacío
  //     const diametrosData = data.Diametros || [];  // Lo mismo para Diametros
  
  //     // Aquí puedes asignar estos datos a las variables que uses
  //     let pliegues = plieguesData;
  //     let diametros = diametrosData;
  
  //     // Ahora puedes usar estas variables como desees, por ejemplo:
  //     console.log('Pliegues:', pliegues);
  //     console.log('Diametros:', diametros);
  
  //     return { pliegues, diametros };  // Regresamos los datos si es necesario
  
  //   } catch (error) {
  //     console.error('Error al obtener la última consulta:', error.message);
  //   }
  // }



  // useEffect para ejecutar la consulta al montar el componente
  // useEffect(() => {
  //   fetchPlieguesAnterior();
  // }, []);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     await fetchPlieguesAnterior();
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

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
            { label: "Subescapular (mm)", field: "subescapular" },
            { label: "Tríceps (mm)", field: "triceps" },
            { label: "Bíceps (mm)", field: "biceps" },
            { label: "Cresta Ilíaca (mm)", field: "cresta_iliaca" },
            { label: "Supraspinal (mm)", field: "supraespinal" },
            { label: "Abdominal (mm)", field: "abdominal" },
            { label: "Muslo Frontal (mm)", field: "muslo_frontal" },
            { label: "Pantorrilla Medial (mm)", field: "pantorrilla_medial" },
            { label: "Axilar Medial (mm)", field: "axilar_medial" },
            { label: "Pectoral (mm)", field: "pectoral" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={pliegues[field] || ""}
                onChange={(e) => handleInputChange("pliegues", field, e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                Medición anterior: {plieguesAnterior[field] || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Perímetros */}
      <div
        className="bg-white shadow-md p-6 rounded-md mb-6"
        style={{ backgroundColor: "#11404E" }}
      >
        <h3 className="text-xl text-center font-semibold mb-4 text-white">
          Perímetros
        </h3>
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
              <p className="text-sm text-gray-500 mt-1">
                Medida anterior: {plieguesAnterior[field] || "N/A"}
              </p>
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
      <div
        className="bg-white shadow-md p-6 rounded-md mb-6"
        style={{ backgroundColor: "#11404E" }}
      >
        <h3 className="text-xl text-center font-semibold mb-4 text-white">
          Bioimpedancia
        </h3>
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
        <h3 className="text-xl text-center font-semibold mb-4">
          Indicadores Bioquímicos
        </h3>
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
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            handleSaveAndNext();
            router.push("/consultas/formularios/trastornos")}}
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
