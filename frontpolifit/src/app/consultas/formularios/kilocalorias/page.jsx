"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";
import Cronometro from "../../components/Cronometro";

function Kilocalorias() {

  const { consultaData, updateConsultaData } = usePaciente(); // Contexto para guardar datos de consulta
  const router = useRouter();

  // Estado local para cada campo de kilocalorías
  const [kilocalorias, setKilocalorias] = useState({
    peso: "",
    altura: "",
    imc: "",
    objetivo: "Mantener peso",
    formula: "Harris-Benedict",
    tmb: "",
    af: "",
    eta: "",
    kcal: "",
    distribucion: {
      hc: "",
      prot: "",
      lp: "",
    },
  });

  // Cargar datos del contexto si existen
  useEffect(() => {
    if (consultaData.kilocalorias) {
      setKilocalorias(consultaData.kilocalorias);
    }
  }, [consultaData.kilocalorias]);
  //Cargar el imc cuando peso y altura se llenen
  useEffect(() => {
    const { peso, altura } = kilocalorias;
    if (peso && altura) {
      const imc = (peso / ((altura / 100) * (altura / 100))).toFixed(2); // Altura en cm a metros
      setKilocalorias((prev) => ({ ...prev, imc }));
    }
  }, [kilocalorias.peso, kilocalorias.altura]);
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["hc", "prot", "lp"].includes(name)) {
      setKilocalorias((prev) => ({
        ...prev,
        distribucion: {
          ...prev.distribucion,
          [name]: value,
        },
      }));
    } else {
      setKilocalorias((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Guardar y avanzar
  const handleSaveAndNext = () => {
    updateConsultaData("kilocalorias", kilocalorias); // Guardar datos en el contexto
    
  };

  return (
    <div className="p-8">
      <Cronometro />
      <h2 className="text-2xl font-semibold mb-4">Kilocalorías</h2>

      {/* Kilocalorías Form */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <div className="grid grid-cols-2 gap-6">
          {/* Inputs de Peso y Altura */}
          <div>
            <label className="block font-medium mb-1">Peso (kg)</label>
            <input
              type="number"
              name="peso"
              value={kilocalorias.peso || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Peso en kg"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Altura (cm)</label>
            <input
              type="number"
              name="altura"
              value={kilocalorias.altura || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Altura en cm"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">IMC (Índice de Masa Corporal)</label>
            <input
              type="text"
              name="imc"
              value={kilocalorias.imc || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="00.00"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Objetivo</label>
            <select name="objetivo"
              value={kilocalorias.objetivo}
              onChange={handleChange}
              className="w-full p-2 border rounded-md">
              <option value="Mantener peso">Mantener peso</option>
              <option value="Bajar de peso">Bajar de peso</option>
              <option value="Subir de peso">Subir de peso</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Fórmula</label>
            <select
              name="formula"
              value={kilocalorias.formula}
              onChange={handleChange}
              className="w-full p-2 border rounded-md">
              <option value="Harris-Benedict">Harris-Benedict</option>
              <option value="Mifflin-St Jeor">Mifflin-St Jeor</option>
              <option value="Katch-McArdle">Katch-McArdle</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">TMB (Tasa Metabólica Basal)</label>
            <input
              type="text"
              name="tmb"
              value={kilocalorias.tmb || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="0000.00"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">AF (Actividad Física)</label>
            <input
              type="text"
              name="af"
              value={kilocalorias.af || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="0000.00"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">ETA (Energía Total Asignada)</label>
            <input
              type="text"
              name="eta"
              value={kilocalorias.eta || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="0000.00"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Kcal</label>
            <input
              type="text"
              name="kcal"
              value={kilocalorias.kcal || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="0000.00 kcal"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Distribución de kcal</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">HC:</label>
                <input
                  type="text"
                  name="hc"
                  value={kilocalorias.distribucion?.hc || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="00.00 %"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">PROT:</label>
                <input
                  type="text"
                  name="prot"
                  value={kilocalorias.distribucion?.prot || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="00.00 %"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">LP:</label>
                <input
                  type="text"
                  name="lp"
                  value={kilocalorias.distribucion?.lp || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="00.00 %"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Botones de Navegación */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          onClick={() => {
            handleSaveAndNext();
            router.push("/consultas/formularios/mediciones");
          }}
        >
          Anterior
        </button>
        <button
          className="bg-[#11404E] text-white py-2 px-4 rounded-md"
          onClick={() => {
            handleSaveAndNext();
            router.push("/consultas/formularios/recordatorio24hrs");
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Kilocalorias;
