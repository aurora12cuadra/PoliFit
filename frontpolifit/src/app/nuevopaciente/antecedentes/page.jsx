"use client";
import SubMenu from "../components/SubMenu";
import { useState } from "react";

function Antecedentes() {
  const [selectedFamilyHistory, setSelectedFamilyHistory] = useState({});
  
  const handleFamilyHistoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFamilyHistory({
      ...selectedFamilyHistory,
      [name]: checked,
    });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Nuevo Paciente</h1>
      <SubMenu />
      <h2 className="text-2xl font-semibold mb-4">Antecedentes</h2>

      {/* Antecedentes Heredofamiliares */}
      <div className="bg-white shadow-md p-4 md:p-6 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Antecedentes Heredofamiliares</h3>
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
                  //si el check esta marcado basandose en el estado de selectedFamilyHistory
                  checked={!!selectedFamilyHistory[item]}
                  //cuando el estado del checkbox cambia, se ejecuta el evento
                  onChange={handleFamilyHistoryChange}
                />
                {/* Asociamos el label con el checkbox correspondiente*/}
                <label htmlFor={item}>{item}</label>
              </div>
              {selectedFamilyHistory[item] && (
                <input
                  type="text"
                  placeholder="Parentesco"
                  className="w-full md:w-3/4 lg:w-1/2 p-2 border rounded-md mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Antecedentes Personales Patológicos */}
      <div className="shadow-md p-4 md:p-6 rounded-md" style={{ backgroundColor: '#11404E' }}>
        <h3 className="text-xl font-semibold mb-4 text-white">Antecedentes Personales Patológicos</h3>
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
              <input type="checkbox" id={item} name={item} className="mr-2" />
              <label className="text-white" htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Antecedentes;

