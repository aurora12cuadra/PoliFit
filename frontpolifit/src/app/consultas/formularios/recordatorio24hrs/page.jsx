"use client";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";
//import Cronometro from "../../components/Cronometro";

function Recordatorio24Hrs() {
  const { control, handleSubmit, reset, getValues } = useForm();
  const router = useRouter();
  const { consultaData, updateConsultaData, guardarConsulta } = usePaciente();

  const meals = [
    { name: "DESAYUNO" },
    { name: "COLACIÓN 1" },
    { name: "COMIDA" },
    { name: "COLACIÓN 2" },
    { name: "CENA" },
  ];

  useEffect(() => {
    if (consultaData.recordatorio24Hrs) {
      reset(consultaData.recordatorio24Hrs);
    }
  }, [consultaData.recordatorio24Hrs, reset]);

  const handleGuardar = () => {
    const currentData = getValues(); // Obtener los datos actuales del formulario
    updateConsultaData("recordatorio24Hrs", currentData);
  };

  const handleAnterior = () => {
    handleGuardar();
    router.push("/consultas/formularios/trastornos");
  };

  const handleSiguiente = () => {
    handleGuardar();
    router.push("/consultas/formularios/mediciones");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Recordatorio 24 hrs.</h2>

      <form onSubmit={handleSubmit(handleGuardar)}>
        {meals.map((meal, index) => (
          <MealSection key={index} meal={meal} control={control} />
        ))}

        {/* Botones de Navegación */}
        <div className="flex justify-between mt-8">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={handleAnterior}
          >
            Anterior
          </button>
          <button
            className="bg-[#11404E] text-white py-2 px-4 rounded-md hover:bg-[#1a5c70]"
            onClick={handleSiguiente}
          >
            Siguiente
          </button>
        </div>

      </form>
    </div>
  );
}

function MealSection({ meal, control }) {
  const isColacion = meal.name.includes("COLACIÓN");

  return (
    <div
      style={{ backgroundColor: isColacion ? "#11404E" : "white" }}
      className="shadow-md p-6 rounded-md mb-6"
    >
      <h3
        className={`text-xl font-semibold text-center mb-4 ${
          isColacion ? "text-white" : ""
        }`}
      >
        {meal.name}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name={`${meal.name.toLowerCase().replace(" ", "_")}_hora`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <label
                className={`block font-medium mb-1 ${
                  isColacion ? "text-white" : ""
                }`}
              >
                Hora:
              </label>
              <input
                type="time"
                {...field}
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}
        />
        <Controller
          name={`${meal.name.toLowerCase().replace(" ", "_")}_lugar`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <label
                className={`block font-medium mb-1 ${
                  isColacion ? "text-white" : ""
                }`}
              >
                Lugar:
              </label>
              <input
                type="text"
                {...field}
                className="w-full p-2 border rounded-md"
                placeholder="Escuela"
              />
            </div>
          )}
        />
        <Controller
          name={`${meal.name.toLowerCase().replace(" ", "_")}_descripcion`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="col-span-2">
              <label
                className={`block font-medium mb-1 ${
                  isColacion ? "text-white" : ""
                }`}
              >
                Descripción alimentos:
              </label>
              <input
                type="text"
                {...field}
                className="w-full p-2 border rounded-md"
                placeholder="Descripción alimentos"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default Recordatorio24Hrs;
