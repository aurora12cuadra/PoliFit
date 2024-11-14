"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";

function Kilocalorias() {
  const { consultaData, updateConsultaData, sexo, edad } = usePaciente();
  const router = useRouter();

  console.log("Revisar dato en kilo: ", consultaData.estiloDeVida.actividadFisica.frecuencia);

  
  const [kilocalorias, setKilocalorias] = useState({
    peso: "",
    altura: "",
    imc: "",
    objetivo: "Mantener peso",
    formula: "Harris-Benedict",
    tmb: "",
    af: consultaData.estiloDeVida.actividadFisica.frecuencia, // Actividad Física por defecto
    eta: "",
    kcal: "",
    hc: 0,
    prot: 0,
    lp: 0,
    hcPercentage: 30,
    protPercentage: 40,
    lpPercentage: 30,
  });

  // useEffect(() => {
  //   if (consultaData.kilocalorias) {
  //     setKilocalorias(consultaData.kilocalorias);
  //   }
  // }, [consultaData.kilocalorias]);

  useEffect(() => {
    const { peso, altura, formula, objetivo, af } = kilocalorias;
    if (peso && altura) {
      const imc = (peso / ((altura / 100) * (altura / 100))).toFixed(2);
      let tmb = 0;

      if (formula === "Harris-Benedict") {
        tmb = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * 25;
      } else if (formula === "Mifflin-St") {
        tmb = 10 * peso + 6.25 * altura - 5 * 25 + 5;
      } else if (formula === "Valencia") {
        tmb = 370 + 21.6 * (peso * (1 - 0.15));
      }

      if (objetivo === "Aumentar peso") {
        tmb += 500;
      } else if (objetivo === "Disminuir peso") {
        tmb -= 500;
      }

      const eta = (tmb * af).toFixed(2);

      setKilocalorias((prev) => ({ ...prev, imc, tmb: tmb.toFixed(2), eta }));
    }
  }, [kilocalorias.peso, kilocalorias.altura, kilocalorias.formula, kilocalorias.objetivo, kilocalorias.af]);

  useEffect(() => {
    const { eta, hcPercentage, protPercentage, lpPercentage } = kilocalorias;
    if (eta) {
      const hc = ((eta * hcPercentage) / 100).toFixed(2);
      const prot = ((eta * protPercentage) / 100).toFixed(2);
      const lp = ((eta * lpPercentage) / 100).toFixed(2);

      setKilocalorias((prev) => ({
        ...prev,
        hc,
        prot,
        lp,
      }));
    }
  }, [kilocalorias.eta, kilocalorias.hcPercentage, kilocalorias.protPercentage, kilocalorias.lpPercentage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKilocalorias((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAndNext = () => {
    updateConsultaData("kilocalorias", kilocalorias);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Kilocalorías</h2>

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
              <option value="Aumentar peso">Aumentar peso</option>
              <option value="Disminuir peso">Disminuir peso</option>
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
              <option value="Mifflin-St">Mifflin-St</option>
              <option value="Valencia">Valencia</option>
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
              type="number"
              name="af"
              value={kilocalorias.af || 0}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="0.00"
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

          {/* Porcentajes y resultados individuales */}
          <div>
            <label className="block font-medium mb-1">Porcentaje HC</label>
            <input
              type="number"
              name="hcPercentage"
              value={kilocalorias.hcPercentage || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="HC %"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Porcentaje Proteínas</label>
            <input
              type="number"
              name="protPercentage"
              value={kilocalorias.protPercentage || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Proteínas %"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Porcentaje Lípidos</label>
            <input
              type="number"
              name="lpPercentage"
              value={kilocalorias.lpPercentage || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Lípidos %"
            />
          </div>

          {/* Resultados en gramos */}
          <div>
            <label className="block font-medium mb-1">HC (g)</label>
            <input
              type="text"
              name="hc"
              value={kilocalorias.hc || ""}
              readOnly
              className="w-full p-2 border rounded-md" placeholder="HC (g)" /> 
          </div> 
          <div> 
            <label className="block font-medium mb-1">Proteínas (g)</label> 
            <input type="text" name="prot" value={kilocalorias.prot || ""} readOnly className="w-full p-2 border rounded-md" placeholder="Proteínas (g)" /> 
          </div> 
          <div> 
            <label className="block font-medium mb-1">Lípidos (g)</label> 
            <input type="text" name="lp" value={kilocalorias.lp || ""} readOnly className="w-full p-2 border rounded-md" placeholder="Lípidos (g)" /> 
          </div> 
        </div> 
      </div>
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