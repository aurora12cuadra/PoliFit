"use client";
import { useState } from "react";

function Trastornos() {
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

  const handleTrastornoChange = (event) => {
    const { name, checked } = event.target;
    setSelectedTrastornos({
      ...selectedTrastornos,
      [name]: checked,
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Nuevo Paciente</h1>
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
              >
                <option value="" disabled selected hidden>
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
        <div className=" shadow-md p-6 rounded-md" style={{ backgroundColor: '#11404E' }}>
          <h3 className="text-xl text-center font-semibold mb-4 text-white">Gineco-Obstétricos</h3>
          <h4 className="text-lg font-semibold mb-2 text-white">Parámetros</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["G", ""],
              ["P", ""],
              ["C", ""],
              ["FUM", ""],
              ["FUP/C", ""],
              ["SDGI", ""],
              ["PPG", ""],
              ["Anticonceptivos", ""],
            ].map(([label]) => (
              <div key={label}>
                <label className="block font-medium mb-1 text-white">{label}</label>
                <input type="text" className="w-full p-2 border rounded-md" />
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
          />
        </div>
      </div>
    </div>
  );
}

export default Trastornos;
