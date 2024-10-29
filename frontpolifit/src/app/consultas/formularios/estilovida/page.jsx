"use client";
import { usePaciente } from "../../context/PacienteContext";

function EstiloDeVida() {
  const { pacienteId } = usePaciente();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Estilo de Vida para Paciente ID: {pacienteId}</h2>

      {/* Actividad Laboral */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Actividad Laboral</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">¿A qué se dedica?</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Descripción de la Actividad Laboral</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Horario de Trabajo</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Horas trabajadas</label>
            <input type="number" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Nivel de Estrés</label>
            <select className="w-full p-2 border rounded-md">
              <option value="Muy bajo">Muy bajo</option>
              <option value="Bajo">Bajo</option>
              <option value="Moderado">Moderado</option>
              <option value="Alto">Alto</option>
              <option value="Muy Alto">Muy Alto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actividad Física y Toxicomanías / Medicamentos */}
      <div className="flex space-x-6 mb-6">
        <div className="shadow-md p-6 rounded-md flex-1" style={{ backgroundColor: '#11404E' }}>
          <h3 className="text-xl font-semibold mb-4 text-white">Actividad Física</h3>
          <div>
            <label className="block font-medium text-white mb-1">Tipo de Actividad</label>
            <input type="text" className="w-full p-2 border rounded-md mb-4" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-white">Frecuencia</label>
            <select className="w-full p-2 border rounded-md">
              <option value="Nunca">Nunca</option>
              <option value="Rara vez">Rara vez</option>
              <option value="Ocasionalmente">Ocasionalmente</option>
              <option value="Regularmente">Regularmente</option>
              <option value="Frecuentemente">Frecuentemente</option>
            </select>
          </div>
        </div>

        <div className=" shadow-md p-6 rounded-md flex-1" style={{ backgroundColor: '#11404E' }}>
          <h3 className="text-xl font-semibold mb-4 text-white">Toxicomanías / Medicamentos</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="alcohol" className="mr-2" />
              <label htmlFor="alcohol" className="text-white">Alcohol</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="tabaco" className="mr-2" />
              <label htmlFor="tabaco" className="text-white">Tabaco</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="cafe" className="mr-2" />
              <label htmlFor="cafe" className="text-white">Café</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="farmaco" className="mr-2" />
              <label htmlFor="farmaco" className="text-white">Farmacodependientes</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="medicamentos" className="mr-2" />
              <label htmlFor="medicamentos" className="text-white">Medicamentos</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="otro" className="mr-2" />
              <label htmlFor="otro" className="text-white">Otro</label>
            </div>
          </div>
        </div>
      </div>

      {/* Hábitos Dietéticos */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Hábitos Dietéticos</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Alimentos no deseados</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Alimentos Favoritos</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Alergía a alguna comida</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">¿Dónde y a qué hora desayuna?</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Cantidad de agua</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">¿Dónde y a qué hora come?</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Cantidad de azúcar</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">¿Dónde y a qué hora cena?</label>
            <input type="text" className="w-full p-2 border rounded-md"  />
          </div>
          <div>
            <label className="block font-medium mb-1">Cantidad de sal</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">¿A qué hora despierta?</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstiloDeVida;

