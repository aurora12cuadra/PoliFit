"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePacienteRegistro } from "../nuevopaciente/context/PacienteRegistroContext";

function DatosPersonales() {
  const router = useRouter();
  const { pacienteData, updatePacienteData } = usePacienteRegistro(); // Contexto para guardar datos
  // Verificar el contexto
  //console.log("Contexto pacienteData en DatosPersonales:", pacienteData);
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
    noBoleta: "", // Cambiado para coincidir con el modelo
    turno: "",
    tipoSangre: "",
    motivoVisita: "",
    padecimientoActual: "",
  });

  //Validacion de campos
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const errores = {};

    // Validar campos obligatorios
    if (!datosPersonales.nombre) errores.nombre = "El nombre es obligatorio";
    if (!datosPersonales.apellidoMaterno)
      errores.apellidoMaterno = "El apellido materno es obligatorio";
    if (!datosPersonales.apellidoPaterno)
      errores.apellidoPaterno = "El apellido paterno es obligatorio";
    if (!datosPersonales.fechaNacimiento)
      errores.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    if (!datosPersonales.email) {
      errores.email = "El email es obligatorio";
    } else {
      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(datosPersonales.email)) {
        errores.email = "El formato del email no es válido";
      }
    }
    // if(!datosPersonales.escuela)
    //   errores.escuela = "La escuela es obligatoria"
    if(!datosPersonales.carrera)
      errores.carrera = "La carrera es obligatoria"
    if(!datosPersonales.noBoleta)
      errores.noBoleta = "El numero de Boleta / Empleado es obligatorio"

    // Validar nombre (no debe contener números)
    // const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    // if (!nombreRegex.test(datosPersonales.nombre)) {
    //   errores.nombre = "El nombre no debe contener números";
    // }

    // Validar teléfono (solo dígitos)
    const telefonoRegex = /^\d{10}$/;
    if (
      datosPersonales.telefono &&
      !telefonoRegex.test(datosPersonales.telefono)
    ) {
      errores.telefono = "El teléfono debe contener solo 10 dígitos";
    }

    // Validar edad (número positivo)
    if (
      datosPersonales.edad &&
      (isNaN(datosPersonales.edad) || datosPersonales.edad <= 0)
    ) {
      errores.edad = "La edad debe ser un número positivo";
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  // Función para calcular la edad
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
      edad--;
    }
    return edad;
  };

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  // useEffect para establecer la fecha de registro automáticamente
  useEffect(() => {
    if (pacienteData.datosPersonales) {
      setDatosPersonales((prevData) => ({
        ...pacienteData.datosPersonales,
        fechaRegistro: obtenerFechaActual(),
      }));
    } else {
      setDatosPersonales((prevData) => ({
        ...prevData,
        fechaRegistro: obtenerFechaActual(),
      }));
    }
  }, [pacienteData.datosPersonales]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizar la edad automáticamente si cambia la fecha de nacimiento
    if (name === "fechaNacimiento") {
      const edadCalculada = calcularEdad(value);
      setDatosPersonales((prevData) => ({
        ...prevData,
        fechaNacimiento: value,
        edad: edadCalculada.toString(),
      }));
    } else {
      setDatosPersonales((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    if (validarFormulario()) {
      updatePacienteData("datosPersonales", datosPersonales); // Guardar datos en el contexto
      router.push("../nuevopaciente/antecedentes");
    } else {
      alert(
        "Hay errores en el formulario. Por favor, corrígelos antes de continuar."
      );
    }
  };


  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
        Nuevo Paciente
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Datos Personales</h2>

      <div className="bg-white shadow-md p-4 md:p-6 rounded-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            ["*Nombre", "text", "nombre"],
            ["*Apellido Materno", "text", "apellidoMaterno"],
            ["*Apellido Paterno", "text", "apellidoPaterno"],
            ["*Fecha de nacimiento", "date", "fechaNacimiento"],
            ["*Edad", "number", "edad"],
            ["*Sexo", "select", "sexo", ["Hombre", "Mujer", "Otro"]],
            ["*Fecha de Registro", "date", "fechaRegistro"],
            ["Estado Civil", "select", "estadoCivil", ["Casado", "Soltero"]],
            ["Ocupación", "text", "ocupacion"],
            ["Teléfono", "text", "telefono"],
            ["*Email", "email", "email"],
            ["Escuela", "text", "escuela"],
            ["*Carrera", "text", "carrera"],
            ["Domicilio", "text", "domicilio"],
            
            ["*No. de Boleta / Empleado", "text", "noBoleta"],
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
                  disabled={name === "edad" || name === "fechaRegistro"}
                />
              )}
              {/* Mostrar mensaje de error si existe */}
              {errores[name] && (
                <p className="text-red-500 text-sm mt-1">{errores[name]}</p>
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
          <label className="block font-medium mb-1">
            Padecimiento Actual / Observaciones
          </label>
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
