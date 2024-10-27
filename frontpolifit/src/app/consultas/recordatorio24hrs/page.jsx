"use client";
import { useForm, Controller } from 'react-hook-form';

function Recordatorio24Hrs() {
  const { control, handleSubmit } = useForm();
  const meals = [
    { name: "DESAYUNO" },
    { name: "COLACIÓN" },
    { name: "COMIDA" },
    { name: "COLACIÓN" },
    { name: "CENA" },
  ];

  const onSubmit = (data) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Recordatorio 24 hrs.</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {meals.map((meal, index) => (
          <MealSection key={index} meal={meal} control={control} />
        ))}
        <button type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded-md">
          Enviar
        </button>
      </form>
    </div>
  );
}

// Componente separado para cada sección de comida
function MealSection({ meal, control }) {
  const isColacion = meal.name === "COLACIÓN";

  return (
    <div
      style={{ backgroundColor: isColacion ? '#11404E' : 'white' }}
      className="shadow-md p-6 rounded-md mb-6"
    >
      <h3 className={`text-xl font-semibold text-center mb-4 ${isColacion ? "text-white" : ""}`}>
        {meal.name}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name={`${meal.name.toLowerCase()}_hora`}
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
          name={`${meal.name.toLowerCase()}_lugar`}
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
          name={`${meal.name.toLowerCase()}_descripcion`}
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
