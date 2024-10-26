"use client";
import { FaEdit, FaTrashAlt, FaFolderOpen } from "react-icons/fa";

function Pacientes() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">PACIENTES</h1>

      {/* Filtros */}
      <div className="bg-white shadow-md p-4 mb-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Filtrar</h2>
        <div className="flex flex-wrap justify-start">
          <div className="flex items-center space-x-4 mb-4">
            <div>
              <label className="block font-medium mb-1">Nombre</label>
              <input
                type="text"
                className="w-48 p-2 border rounded-md"
                placeholder="Buscar por nombre"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Correo</label>
              <input
                type="text"
                className="w-48 p-2 border rounded-md"
                placeholder="Buscar por correo"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Carrera</label>
              <select className="w-48 p-2 border rounded-md">
                <option value="">Seleccione una carrera</option>
                <option value="Administracion">Administración</option>
                <option value="Ingeniería">Ingeniería</option>
                <option value="Sociales">Sociales</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2 ml-16 mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="hombre" className="mr-2" />
              <label htmlFor="hombre">Hombre</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="mujer" className="mr-2" />
              <label htmlFor="mujer">Mujer</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="otro" className="mr-2" />
              <label htmlFor="otro">Otro</label>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Pacientes */}
      <div className="bg-white shadow-md p-4 rounded-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Escuela</th>
              <th className="px-4 py-2">Sexo</th>
              <th className="px-4 py-2">Edad</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">
                Aurora Cuadra Camacho <br /> 2021063816
              </td>
              <td className="px-4 py-2">
                8° semestre <br /> Sistemas Computacionales
              </td>
              <td className="px-4 py-2">Femenino</td>
              <td className="px-4 py-2">16</td>
              <td className="px-4 py-2 flex flex-col items-center space-y-2">
                <div className="flex space-x-2">
                  <button className="text-gray-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500">
                    <FaTrashAlt />
                  </button>
                </div>
                <button className="w-full bg-[#11404E] text-white py-2 rounded-md flex items-center justify-center space-x-2">
                  <FaFolderOpen />
                  <span>Expediente</span>
                </button>
               
              </td>
            </tr>
            {/* Más filas de datos */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pacientes;
