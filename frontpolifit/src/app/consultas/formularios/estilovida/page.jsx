"use client";
import { useState, useEffect  } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";

function EstiloDeVida() {
  const { pacienteId, consultaData, updateConsultaData } = usePaciente();
  const router = useRouter();

  // Estados para capturar datos de los inputs
  const [actividadLaboral, setActividadLaboral] = useState({
    ocupacion: "",
    descripcion: "",
    horario: "",
    horasTrabajadas: "",
    nivelEstres: "",
  });

  const [actividadFisica, setActividadFisica] = useState({
    tipo: "",
    frecuencia: "",
  });

  const [toxicomanias, setToxicomanias] = useState({
    alcohol: false,
    tabaco: false,
    cafe: false,
    farmaco: false,
    medicamentos: false,
    otro: false,
  });

  const [habitosDieteticos, setHabitosDieteticos] = useState({
    alimentosNoDeseados: "",
    alimentosFavoritos: "",
    alergiaComida: "",
    desayunoLugarHora: "",
    cantidadAgua: "",
    comidaLugarHora: "",
    cantidadAzucar: "",
    cenaLugarHora: "",
    cantidadSal: "",
    horaDespierta: "",
  });

  useEffect(() => {
    if (consultaData.estiloDeVida) {
      setActividadLaboral({
        ocupacion: consultaData.estiloDeVida.actividadLaboral?.ocupacion || "",
        descripcion: consultaData.estiloDeVida.actividadLaboral?.descripcion || "",
        horario: consultaData.estiloDeVida.actividadLaboral?.horario || "",
        horasTrabajadas: consultaData.estiloDeVida.actividadLaboral?.horasTrabajadas || "",
        nivelEstres: consultaData.estiloDeVida.actividadLaboral?.nivelEstres || "",
      });
  
      setActividadFisica({
        tipo: consultaData.estiloDeVida.actividadFisica?.tipo || "",
        frecuencia: consultaData.estiloDeVida.actividadFisica?.frecuencia || "",
      });
  
      setToxicomanias({
        alcohol: consultaData.estiloDeVida.toxicomanias?.alcohol || false,
        tabaco: consultaData.estiloDeVida.toxicomanias?.tabaco || false,
        cafe: consultaData.estiloDeVida.toxicomanias?.cafe || false,
        farmaco: consultaData.estiloDeVida.toxicomanias?.farmaco || false,
        medicamentos: consultaData.estiloDeVida.toxicomanias?.medicamentos || false,
        otro: consultaData.estiloDeVida.toxicomanias?.otro || false,
      });
  
      setHabitosDieteticos({
        alimentosNoDeseados: consultaData.estiloDeVida.habitosDieteticos?.alimentosNoDeseados || "",
        alimentosFavoritos: consultaData.estiloDeVida.habitosDieteticos?.alimentosFavoritos || "",
        alergiaComida: consultaData.estiloDeVida.habitosDieteticos?.alergiaComida || "",
        desayunoLugarHora: consultaData.estiloDeVida.habitosDieteticos?.desayunoLugarHora || "",
        cantidadAgua: consultaData.estiloDeVida.habitosDieteticos?.cantidadAgua || "",
        comidaLugarHora: consultaData.estiloDeVida.habitosDieteticos?.comidaLugarHora || "",
        cantidadAzucar: consultaData.estiloDeVida.habitosDieteticos?.cantidadAzucar || "",
        cenaLugarHora: consultaData.estiloDeVida.habitosDieteticos?.cenaLugarHora || "",
        cantidadSal: consultaData.estiloDeVida.habitosDieteticos?.cantidadSal || "",
        horaDespierta: consultaData.estiloDeVida.habitosDieteticos?.horaDespierta || "",
      });
    }
  }, [consultaData.estiloDeVida]);
  

  // Manejar el guardado de datos en el contexto
  const handleGuardar = () => {
    const datosEstiloDeVida = {
      actividadLaboral,
      actividadFisica,
      toxicomanias,
      habitosDieteticos,
    };
    updateConsultaData("estiloDeVida", datosEstiloDeVida);
    router.push("/consultas/formularios/trastornos");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Estilo de Vida para Paciente ID: {pacienteId}
      </h2>

      {/* Actividad Laboral */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Actividad Laboral</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">¿A qué se dedica?</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={actividadLaboral.ocupacion || ""}
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  ocupacion: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Descripción de la Actividad Laboral
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={actividadLaboral.descripcion || ""}
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  descripcion: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Horario de Trabajo</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={actividadLaboral.horario || ""}
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  horario: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Horas trabajadas</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={actividadLaboral.horasTrabajadas || ""}
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  horasTrabajadas: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Nivel de Estrés</label>
            <select
              className="w-full p-2 border rounded-md"
              value={actividadLaboral.nivelEstres}
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  nivelEstres: e.target.value,
                })
              }
            >
              <option value="Muy bajo">Muy bajo</option>
              <option value="Bajo">Bajo</option>
              <option value="Moderado">Moderado</option>
              <option value="Alto">Alto</option>
              <option value="Muy Alto">Muy Alto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agregar más secciones de inputs similares con estados para cada campo */}

      {/* Actividad Física y Toxicomanías / Medicamentos */}
      <div className="flex space-x-6 mb-6">
        <div
          className="shadow-md p-6 rounded-md flex-1"
          style={{ backgroundColor: "#11404E" }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">
            Actividad Física
          </h3>
          <div>
            <label className="block font-medium text-white mb-1">
              Tipo de Actividad
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              value={actividadFisica.tipo || ""}
              onChange={(e) =>
                setActividadFisica({ ...actividadFisica, tipo: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-white">
              Frecuencia
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={actividadFisica.frecuencia}
              onChange={(e) =>
                setActividadFisica({
                  ...actividadFisica,
                  frecuencia: e.target.value,
                })
              }
            >
              <option value="Nunca">Nunca</option>
              <option value="Rara vez">Rara vez</option>
              <option value="Ocasionalmente">Ocasionalmente</option>
              <option value="Regularmente">Regularmente</option>
              <option value="Frecuentemente">Frecuentemente</option>
            </select>
          </div>
        </div>

        <div
          className=" shadow-md p-6 rounded-md flex-1"
          style={{ backgroundColor: "#11404E" }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">
            Toxicomanías / Medicamentos
          </h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="alcohol"
                className="mr-2"
                checked={toxicomanias.alcohol}
                onChange={(e) =>
                  setToxicomanias({
                    ...toxicomanias,
                    alcohol: e.target.checked,
                  })
                }
              />
              <label htmlFor="alcohol" className="text-white">
                Alcohol
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tabaco"
                className="mr-2"
                checked={toxicomanias.tabaco}
                onChange={(e) =>
                  setToxicomanias({ ...toxicomanias, tabaco: e.target.checked })
                }
              />
              <label htmlFor="tabaco" className="text-white">
                Tabaco
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cafe"
                className="mr-2"
                checked={toxicomanias.cafe}
                onChange={(e) =>
                  setToxicomanias({ ...toxicomanias, cafe: e.target.checked })
                }
              />
              <label htmlFor="cafe" className="text-white">
                Café
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="farmaco"
                className="mr-2"
                checked={toxicomanias.farmaco}
                onChange={(e) =>
                  setToxicomanias({
                    ...toxicomanias,
                    farmaco: e.target.checked,
                  })
                }
              />
              <label htmlFor="farmaco" className="text-white">
                Farmacodependientes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medicamentos"
                className="mr-2"
                checked={toxicomanias.medicamentos}
                onChange={(e) =>
                  setToxicomanias({
                    ...toxicomanias,
                    medicamentos: e.target.checked,
                  })
                }
              />
              <label htmlFor="medicamentos" className="text-white">
                Medicamentos
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="otro"
                className="mr-2"
                checked={toxicomanias.otro}
                onChange={(e) =>
                  setToxicomanias({ ...toxicomanias, otro: e.target.checked })
                }
              />
              <label htmlFor="otro" className="text-white">
                Otro
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Hábitos Dietéticos */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Hábitos Dietéticos</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Alimentos no deseados
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.alimentosNoDeseados || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  alimentosNoDeseados: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Alimentos Favoritos
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.alimentosFavoritos || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  alimentosFavoritos: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Alergía a alguna comida
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.alergiaComida || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  alergiaComida: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              ¿Dónde y a qué hora desayuna?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.desayunoLugarHora || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  desayunoLugarHora: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Cantidad de agua</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.cantidadAgua || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  cantidadAgua: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              ¿Dónde y a qué hora come?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.comidaLugarHora || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  comidaLugarHora: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Cantidad de azúcar</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.cantidadAzucar || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  cantidadAzucar: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              ¿Dónde y a qué hora cena?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.cenaLugarHora || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  cenaLugarHora: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Cantidad de sal</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.cantidadSal || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  cantidadSal: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              ¿A qué hora despierta?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={habitosDieteticos.horaDespierta || ""}
              onChange={(e) =>
                setHabitosDieteticos({
                  ...habitosDieteticos,
                  horaDespierta: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          onClick={() => router.push("/consultas")}
        >
          Regresar
        </button>
        <button
          className="bg-[#11404E] text-white py-2 px-4 rounded-md"
          onClick={handleGuardar}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default EstiloDeVida;
