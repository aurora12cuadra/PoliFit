// consultas/formularios/estilovida
"use client";
import { useState, useEffect  } from "react";
import { useRouter } from "next/navigation";
import { usePaciente } from "../../context/PacienteContext";
//import Cronometro from "../../components/Cronometro";

function EstiloDeVida() {
  const { noBoleta, consultaData, updateConsultaData } = usePaciente();
  const router = useRouter();

  // Estados para capturar datos de los inputs
  const [actividadLaboral, setActividadLaboral] = useState({
    ocupacion: "",
    descrip: "", // Cambiado de 'descripcion' a 'descrip'
    horario: "",
    total_horas: "", // Cambiado de 'horasTrabajadas' a 'total_horas'
    n_estres: 0, // Cambiado de 'nivelEstres' a 'n_estres' y convertido a número
  });

  const [actividadFisica, setActividadFisica] = useState({
    tipo: "",
    frecuencia: 0, // Convertido a número
  });

  const [toxicomanias, setToxicomanias] = useState({
    alcohol: "false", // Cambiado a cadena para coincidir con el modelo del backend
    tabaco: "false",
    cafe: "false",
    farmacodep: "false", // Cambiado de 'farmaco' a 'farmacodep'
    medicamentos: "false",
    otro: "false",
  });

  const [habitosDieteticos, setHabitosDieteticos] = useState({
    alimen_ndesead: "", // Cambiado de 'alimentosNoDeseados' a 'alimen_ndesead'
    alimen_fav: "", // Cambiado de 'alimentosFavoritos' a 'alimen_fav'
    alergia: "", // Cambiado de 'alergiaComida' a 'alergia'
    hora_bkf: "", // Cambiado de 'desayunoLugarHora' a 'hora_bkf'
    cant_agua: "", // Cambiado de 'cantidadAgua' a 'cant_agua'
    hora_comida: "", // Cambiado de 'comidaLugarHora' a 'hora_comida'
    cant_azu: "", // Cambiado de 'cantidadAzucar' a 'cant_azu'
    hora_cena: "", // Cambiado de 'cenaLugarHora' a 'hora_cena'
    cant_sal: "", // Cambiado de 'cantidadSal' a 'cant_sal'
    hora_desp: "", // Cambiado de 'horaDespierta' a 'hora_desp'
  });

  useEffect(() => {
    if (consultaData.estiloDeVida) {
      setActividadLaboral({
        ocupacion: consultaData.estiloDeVida.actividadLaboral?.ocupacion || actividadLaboral.ocupacion,
        descrip: consultaData.estiloDeVida.actividadLaboral?.descripcion || actividadLaboral.descrip, // Cambiado a 'descrip'
        horario: consultaData.estiloDeVida.actividadLaboral?.horario || actividadLaboral.horario,
        total_horas: consultaData.estiloDeVida.actividadLaboral?.horasTrabajadas || actividadLaboral.total_horas, // Cambiado a 'total_horas'
        n_estres: Number(consultaData.estiloDeVida.actividadLaboral?.nivelEstres) || actividadLaboral.n_estres, // Cambiado a 'n_estres' y convertido a número
      });
  
      setActividadFisica({
        tipo: consultaData.estiloDeVida.actividadFisica?.tipo || actividadFisica.tipo,
        frecuencia: Number(consultaData.estiloDeVida.actividadFisica?.frecuencia) || actividadFisica.frecuencia,
      });
  
      setToxicomanias({
        alcohol: consultaData.estiloDeVida.toxicomanias?.alcohol || toxicomanias.alcohol,
        tabaco: consultaData.estiloDeVida.toxicomanias?.tabaco || toxicomanias.tabaco,
        cafe: consultaData.estiloDeVida.toxicomanias?.cafe || toxicomanias.cafe,
        farmacodep: consultaData.estiloDeVida.toxicomanias?.farmacodep || toxicomanias.farmacodep,
        medicamentos: consultaData.estiloDeVida.toxicomanias?.medicamentos || toxicomanias.medicamentos,
        otro: consultaData.estiloDeVida.toxicomanias?.otro || toxicomanias.otro,
      });
  
      setHabitosDieteticos({
        alimen_ndesead: consultaData.estiloDeVida.habitosDieteticos?.alimen_ndesead || habitosDieteticos.alimen_ndesead,
        alimen_fav: consultaData.estiloDeVida.habitosDieteticos?.alimen_fav || habitosDieteticos.alimen_fav,
        alergia: consultaData.estiloDeVida.habitosDieteticos?.alergia || habitosDieteticos.alergia,
        hora_bkf: consultaData.estiloDeVida.habitosDieteticos?.hora_bkf || habitosDieteticos.hora_bkf,
        cant_agua: consultaData.estiloDeVida.habitosDieteticos?.cant_agua || habitosDieteticos.cant_agua,
        hora_comida: consultaData.estiloDeVida.habitosDieteticos?.hora_comida || habitosDieteticos.hora_comida,
        cant_azu: consultaData.estiloDeVida.habitosDieteticos?.cant_azu || habitosDieteticos.cant_azu,
        hora_cena: consultaData.estiloDeVida.habitosDieteticos?.hora_cena || habitosDieteticos.hora_cena,
        cant_sal: consultaData.estiloDeVida.habitosDieteticos?.cant_sal || habitosDieteticos.cant_sal,
        hora_desp: consultaData.estiloDeVida.habitosDieteticos?.hora_desp || habitosDieteticos.hora_desp,
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
        Estilo de Vida para Paciente ID: {noBoleta}
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
              value={actividadLaboral.descrip || ""}
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  descrip: e.target.value, // Cambiado a 'descrip'
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
              value={actividadLaboral.total_horas || ""} // Cambiado a 'total_horas'
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  total_horas: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Nivel de Estrés</label>
            <select
              className="w-full p-2 border rounded-md"
              value={actividadLaboral.n_estres}
              onChange={(e) =>
                setActividadLaboral({
                  ...actividadLaboral,
                  n_estres: parseInt(e.target.value), // Cambiado a 'n_estres' y convertido a número
                })
              }
            >
              <option value="1">Muy bajo</option>
              <option value="2">Bajo</option>
              <option value="3">Moderado</option>
              <option value="4">Alto</option>
              <option value="5">Muy Alto</option>
            </select>
          </div>
        </div>
      </div>
  
      {/* Actividad Física y Toxicomanías / Medicamentos */}
      <div className="flex space-x-6 mb-6">
        <div className="shadow-md p-6 rounded-md flex-1" style={{ backgroundColor: "#11404E" }}>
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
                  frecuencia: parseInt(e.target.value), // Cambiado a 'n_estres' y convertido a número
                })
              }
            >
              <option value="1">Sedentario</option>
              <option value="2">Ligero</option>
              <option value="3">Moderado</option>
              <option value="4">Intenso</option>
              <option value="5">Muy Intenso</option>
            </select>
          </div>         
        </div>
  
        <div className="shadow-md p-6 rounded-md flex-1" style={{ backgroundColor: "#11404E" }}>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Toxicomanías / Medicamentos
          </h3>
          <div className="flex flex-col space-y-2">
            {["alcohol", "tabaco", "cafe", "farmacodep", "medicamentos", "otro"].map((field) => (
              <div className="flex items-center" key={field}>
                <input
                  type="checkbox"
                  id={field}
                  className="mr-2"
                  checked={toxicomanias[field] === "true"}
                  onChange={(e) =>
                    setToxicomanias({
                      ...toxicomanias,
                      [field]: e.target.checked ? "true" : "false", // Convertido a cadena
                    })
                  }
                />
                <label htmlFor={field} className="text-white capitalize">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Hábitos Dietéticos */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Hábitos Dietéticos</h3>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "Alimentos no deseados", field: "alimen_ndesead" },
            { label: "Alimentos Favoritos", field: "alimen_fav" },
            { label: "Alergía a alguna comida", field: "alergia" },
            { label: "¿Dónde y a qué hora desayuna?", field: "hora_bkf" },
            { label: "Cantidad de agua", field: "cant_agua" },
            { label: "¿Dónde y a qué hora come?", field: "hora_comida" },
            { label: "Cantidad de azúcar", field: "cant_azu" },
            { label: "¿Dónde y a qué hora cena?", field: "hora_cena" },
            { label: "Cantidad de sal", field: "cant_sal" },
            { label: "¿A qué hora despierta?", field: "hora_desp" },
            { label: "Alimentos no consumidos", field: "alimen_nconsum" },
            { label: "Alimentos que generan intolerancia", field: "alimen_into" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={habitosDieteticos[field] || ""}
                onChange={(e) =>
                  setHabitosDieteticos({
                    ...habitosDieteticos,
                    [field]: e.target.value,
                  })
                }
              />
            </div>
          ))}
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
