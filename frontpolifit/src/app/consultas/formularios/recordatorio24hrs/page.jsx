"use client";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";

function Recordatorio24Hrs() {
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { consultaData, updateConsultaData } = usePaciente();

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

  const onSubmit = (data) => {
    updateConsultaData("recordatorio24Hrs", data);
    //alert("Datos de Recordatorio 24 hrs guardados correctamente.");
  };

  const handleFinalSave = () => {
    //updateConsultaData("recordatorio24Hrs", getValues());
    console.log("Consulta completa guardada:", consultaData);
    alert("Consulta finalizada con éxito.");
    router.push("/consultas"); // Redirige a la página principal de consultas
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Recordatorio 24 hrs.</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {meals.map((meal, index) => (
          <MealSection key={index} meal={meal} control={control} />
        ))}
        <div className="flex justify-between mt-6">
          {/* Botón Anterior */}
          <button
            type="button"
            onClick={() => router.push("/consultas/formularios/kilocalorias")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Anterior
          </button>

          {/* Botón Guardar */}
          <button
            type="submit"
            className="bg-[#11404E] text-white py-2 px-4 rounded-md"
          >
            Guardar
          </button>
        </div>

        {/* Botón Terminar Consulta */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleFinalSave}
            className="bg-[#11404E] text-white py-2 px-4 rounded-md"
          >
            Terminar Consulta
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
      <h3 className={`text-xl font-semibold text-center mb-4 ${isColacion ? "text-white" : ""}`}>
        {meal.name}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name={`${meal.name.toLowerCase().replace(" ", "_")}_hora`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <label className={`block font-medium mb-1 ${isColacion ? "text-white" : ""}`}>
                Hora:
              </label>
              <input type="time" {...field} className="w-full p-2 border rounded-md" />
            </div>
          )}
        />
        <Controller
          name={`${meal.name.toLowerCase().replace(" ", "_")}_lugar`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <label className={`block font-medium mb-1 ${isColacion ? "text-white" : ""}`}>
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
              <label className={`block font-medium mb-1 ${isColacion ? "text-white" : ""}`}>
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
