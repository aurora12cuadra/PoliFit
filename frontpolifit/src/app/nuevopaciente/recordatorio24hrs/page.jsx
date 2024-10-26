"use client";
import SubMenu from "../components/SubMenu";

function Recordatorio24Hrs() {
  const meals = [
    { name: "DESAYUNO" },
    { name: "COLACIÓN" },
    { name: "COMIDA" },
    { name: "COLACIÓN" },
    { name: "CENA" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Nuevo Paciente</h1>
      <SubMenu />
      <h2 className="text-2xl font-semibold mb-4">Recordatorio 24 hrs.</h2>

      {/* Meals Section */}
      {meals.map((meal, index) => (
        <div
          key={index}
          style={meal.name === "COLACIÓN" ? { backgroundColor: '#11404E' } : { backgroundColor: 'white' }}  // Cambiar el fondo con style
          className="shadow-md p-6 rounded-md mb-6"
        >
          {/* Hacer que el título "COLACIÓN" sea blanco */}
          <h3 className={`text-xl font-semibold text-center mb-4 ${meal.name === "COLACIÓN" ? "text-white" : ""}`}>
            {meal.name}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* Condición para hacer que los label de "COLACIÓN" sean blancos */}
              <label className={`block font-medium mb-1 ${meal.name === "COLACIÓN" ? "text-white" : ""}`}>
                Hora:
              </label>
              <input type="time" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className={`block font-medium mb-1 ${meal.name === "COLACIÓN" ? "text-white" : ""}`}>
                Lugar:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Escuela"
              />
            </div>
            <div className="col-span-2">
              <label className={`block font-medium mb-1 ${meal.name === "COLACIÓN" ? "text-white" : ""}`}>
                Descripción alimentos:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Descripción alimentos"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recordatorio24Hrs;
