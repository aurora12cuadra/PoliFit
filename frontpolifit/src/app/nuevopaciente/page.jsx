"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePacienteRegistro } from "../nuevopaciente/context/PacienteRegistroContext";

function DatosPersonales() {
  const router = useRouter();
  const {pacienteData, updatePacienteData } = usePacienteRegistro(); // Contexto para guardar datos
  // Verificar el contexto
  console.log("Contexto pacienteData en DatosPersonales:", pacienteData);
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    fechaNacimiento: "",
    edad: "",
    sexo: "",
    fechaRegistro: "",
    estadoCivil: "",
    ocupacion: "",
    telefono: "",
    email: "",
    escuela: "",
    carrera: "",
    domicilio: "",
    numeroBoletaEmpleado: "",
    turno: "",
    tipoSangre: "",
    motivoVisita: "",
    padecimientoActual: "",
  });

  useEffect(() => {
    if (pacienteData.datosPersonales) {
      setDatosPersonales(pacienteData.datosPersonales); // Cargar datos desde el contexto si están definidos
    }
  }, [pacienteData.datosPersonales]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el guardado y la navegación
  const handleNext = () => {
    updatePacienteData("datosPersonales", datosPersonales); // Guardar datos en el contexto
    router.push("../nuevopaciente/antecedentes"); // Navegar al formulario Antecedentes
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Nuevo Paciente</h1>
      <h2 className="text-2xl font-semibold mb-4">Datos Personales</h2>
      
      <div className="bg-white shadow-md p-4 md:p-6 rounded-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            ["Nombre", "text", "nombre"],
            ["Apellido Materno", "text", "apellidoMaterno"],
            ["Apellido Paterno", "text", "apellidoPaterno"],
            ["Fecha de nacimiento", "date", "fechaNacimiento"],
            ["Edad", "number", "edad"],
            ["Sexo", "select", "sexo", ["Hombre", "Mujer", "Otro"]],
            ["Fecha de Registro", "date", "fechaRegistro"],
            ["Estado Civil", "select", "estadoCivil", ["Casado", "Soltero"]],
            ["Ocupación", "text", "ocupacion"],
            ["Teléfono", "text", "telefono"],
            ["Email", "email", "email"],
            ["Escuela", "text", "escuela"],
            ["Carrera", "text", "carrera"],
            ["Domicilio", "text", "domicilio"],
            ["No. de Boleta / Empleado", "text", "numeroBoletaEmpleado"],
            ["Turno", "text", "turno"],
            ["Tipo de Sangre", "text", "tipoSangre"],
          ].map(([label, type, name, options], index) => (
            <div key={index}>
              <label className="block font-medium mb-1">{label}</label>
              {type === "select" ? (
                <select
                  name={name}
                  value={datosPersonales[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={datosPersonales[name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md p-4 md:p-6 rounded-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block font-medium mb-1">Motivo de la Visita</label>
          <textarea
            name="motivoVisita"
            value={datosPersonales.motivoVisita || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="5"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-1">Padecimiento Actual / Observaciones</label>
          <textarea
            name="padecimientoActual"
            value={datosPersonales.padecimientoActual || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="5"
          ></textarea>
        </div>
      </div>

      {/* Botón de Navegación */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-[#11404E] text-white py-2 px-4 rounded-md"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default DatosPersonales;
