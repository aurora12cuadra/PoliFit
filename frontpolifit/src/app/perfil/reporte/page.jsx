"use client";
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Select,
  SelectItem,
} from "@nextui-org/react";

function Reporte() {
  const router = useRouter();
  const componentRef = useRef();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [ pacientes, setPacientes ] = useState([]);
  const [ patologias, setPatologias ] = useState([]);
  const [ imcPacientes, setImcPacientes ] = useState([]);
  // Obtener la lista de IMCs de pacientes del backend
  const fetchIMC = async () => {
    try {
      const response = await fetch("/api/pacientes/getAllIMC", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Filtrar pacientes por el rango de fechas
        const pacientesFiltrados = data.filter((paciente) => {
          const fechaRegistro = new Date(paciente.fecha_consulta);
          const inicio = new Date(startDate);
          const fin = new Date(endDate);

          // Comprobar si la fecha de registro está dentro del rango
          return fechaRegistro >= inicio && fechaRegistro <= fin;
        });

        setImcPacientes(pacientesFiltrados);
        setIsLoading(false);
      // if (response.ok) {
      //   const data = await response.json();
      //   setImcPacientes(data);
      //   setIsLoading(false);
      } else {
        conslog("Error al obtener imc pacientes");
      }
    } catch (error) {
      console.log("Error al conectar con el backend:", error);
    }
  };
  // Obtener la lista de pacientes del backend
  const fetchPatologias = async () => {
    try {
      const response = await fetch("/api/pacientes/getAllAntecedentes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Filtrar pacientes por el rango de fechas
        const pacientesFiltrados = data.filter((paciente) => {
          const fechaRegistro = new Date(paciente.paciente.fechaRegistro);
          const inicio = new Date(startDate);
          const fin = new Date(endDate);

          // Comprobar si la fecha de registro está dentro del rango
          return fechaRegistro >= inicio && fechaRegistro <= fin;
        });

        setPatologias(pacientesFiltrados);
        setIsLoading(false);
      // if (response.ok) {
      //   const data = await response.json();
      //   setPatologias(data);
      //   setIsLoading(false);
      } else {
        console.log("Error al obtener patologias");
      }
    } catch (error) {
      console.log("Error al conectar con el backend:", error);
    }
  };
  // Obtener la lista de pacientes del backend
  const fetchPacientes = async () => {
    try {
      const response = await fetch("/api/pacientes/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Filtrar pacientes por el rango de fechas
        const pacientesFiltrados = data.filter((paciente) => {
          console.log("Paciente en filtro: ", paciente);
          const fechaRegistro = new Date(paciente.fechaRegistro);
          const inicio = new Date(startDate);
          const fin = new Date(endDate);

          // Comprobar si la fecha de registro está dentro del rango
          return fechaRegistro >= inicio && fechaRegistro <= fin;
        });

        setPacientes(pacientesFiltrados);
        setIsLoading(false);
      // if (response.ok) {
      //   const data = await response.json();
      //   setPacientes(data);
      //   setIsLoading(false);
      } else {
        console.log("Error al obtener pacientes");
      }
    } catch (error) {
      console.log("Error al conectar con el backend:", error);
    }
  };

  useEffect(() => {
    fetchPatologias();
    fetchPacientes();
    fetchIMC();
    // Inicia un "loader" al cargar la página
    const timer = setTimeout(() => {
      setIsLoading(false); // Oculta el loader después de cargar
    }, 1500); // Tiempo de carga simulado
    return () => clearTimeout(timer);
  }, []);
  
  const procesarPacientesPorCarreraYGenero = (pacientes) => {
    const reporte = pacientes.reduce((acc, paciente) => {
      // Verifica si ya existe la carrera en el reporte
      const carrera = paciente.carrera || "Desconocida";
      const sexo = paciente.sexo || "Desconocido";
  
      // Si no existe la carrera, inicializa la carrera en el reporte
      if (!acc[carrera]) {
        acc[carrera] = { femenino: 0, masculino: 0, otro: 0 };
      }
  
      // Incrementa el contador correspondiente según el sexo
      if (sexo === "Mujer") {
        acc[carrera].femenino++;
      } else if (sexo === "Hombre") {
        acc[carrera].masculino++;
      } else {
        acc[carrera].otro++;
      }
  
      return acc;
    }, {});
  
    // Convierte el objeto en un arreglo para que sea más fácil renderizarlo
    return Object.entries(reporte).map(([carrera, { femenino, masculino, otro }]) => ({
      carrera,
      femenino,
      masculino,
      otro,
    }));
  };

  const pacientesPorCarrera = useMemo(() => {
    return procesarPacientesPorCarreraYGenero(pacientes);
  }, [pacientes]);

  const procesarPacientesPorSemestre = (pacientes) => {
    const reporte = pacientes.reduce((acc, paciente) => {
      // Obtener el semestre del paciente (si no tiene, asignar "Desconocido")
      const semestre = paciente.semestre || "Desconocido";
  
      // Si no existe el semestre, inicialízalo
      if (!acc[semestre]) {
        acc[semestre] = 0;
      }
  
      // Incrementa el contador del semestre
      acc[semestre]++;
  
      return acc;
    }, {});
  
    // Convierte el objeto en un arreglo para facilitar la visualización
    return Object.entries(reporte).map(([semestre, total]) => ({
      semestre,
      total,
    }));
  };
  
  const pacientesPorSemestre = useMemo(() => {
    return procesarPacientesPorSemestre(pacientes);
  }, [pacientes]);

  const clasificarIMC = (imcPacientes) => {
    const clasificacion = {
      bajoPeso: 0,
      pesoNormal: 0,
      sobrepeso: 0,
    };
  
    // Clasificar los IMCs de cada paciente
    imcPacientes.forEach(paciente => {
      const imc = paciente.imc;
  
      if (imc < 18.5) {
        clasificacion.bajoPeso++;
      } else if (imc >= 18.5 && imc <= 24.9) {
        clasificacion.pesoNormal++;
      } else if (imc >= 25.0) {
        clasificacion.sobrepeso++;
      }
    });
  
    return clasificacion;
  };
  // Clasificar los IMCs de los pacientes
  const clasificacionIMC = useMemo(() => clasificarIMC(imcPacientes), [imcPacientes]);

  // Mapeo de las patologías con nombres más legibles
  const mapeoPatologias = {
    alergias: "Alergias",
    cadiologicos: "Cardiológicos",
    diabetes: "Diabetes",
    cancer: "Cáncer",
    cirugias: "Cirugías",
    obesidad: "Obesidad",
    renales: "Enfermedades Renales",
    hipertension: "Hipertensión",
    anemia: "Anemia",
    tiroides: "Trastornos de Tiroides",
    desordenes_aux: "Desordenes Alimenticios",
    hepatobiliares: "Enfermedades Hepatobiliares",
    dislipidimias: "Dislipidemias",
    hepatitis: "Hepatitis",
    otros: "Otros",
  };
  // Procesar los datos para contar cuántos pacientes tienen cada patología
  const procesarPatologias = (patologias) => {
    const patologiasContadas = {
      alergias: 0,
      cadiologicos: 0,
      diabetes: 0,
      cancer: 0,
      cirugias: 0,
      obesidad: 0,
      renales: 0,
      hipertension: 0,
      anemia: 0,
      tiroides: 0,
      desordenes_aux: 0,
      hepatobiliares: 0,
      dislipidimias: 0,
      hepatitis: 0,
      otros: 0,
    };

    patologias.forEach((patologia) => {
      const antecedentes = patologia.antecedentes?.personalesPatologicos || {};
      // Contamos cuántos pacientes tienen cada patología
      for (const patologia1 in patologiasContadas) {
        if (antecedentes[patologia1] !== null && antecedentes[patologia1] !== undefined) {
          if (antecedentes[patologia1] === "true") {
            patologiasContadas[patologia1]++;
          }
        }
      }
    });

    return Object.entries(patologiasContadas).map(([patologia1, total]) => ({
      patologia1: mapeoPatologias[patologia1] || patologia1, // Mapear el nombre de la patología
      total,
    }));
  };

  const patologiasContadas = useMemo(() => {
    return procesarPatologias(patologias);
  }, [patologias]);


  // Datos estáticos (pueden ser reemplazados con datos del backend)
  // const carreraGeneroData = [
  //   { carrera: "ICE", femenino: 3, masculino: 4 },
  //   { carrera: "IE", femenino: 3, masculino: 6 },
  //   { carrera: "ICA", femenino: 2, masculino: 2 },
  //   { carrera: "ISISA", femenino: 2, masculino: 0 },
  //   { carrera: "IF", femenino: 2, masculino: 2 },
  // ];

  // const estudiantesSemestreData = [
  //   { semestre: "1°", total: 3 },
  //   { semestre: "2°", total: 2 },
  //   { semestre: "3°", total: 2 },
  //   { semestre: "4°", total: 3 },
  //   { semestre: "5°", total: 2 },
  //   { semestre: "6°", total: 3 },
  //   { semestre: "7°", total: 2 },
  //   { semestre: "8°", total: 5 },
  //   { semestre: "9°", total: 3 },
  // ];

  // const diagnosticoIMCData = {
  //   bajoPeso: 4,
  //   pesoNormal: 7,
  //   sobrepeso: 14,
  // };

  // const diagnosticoPatologiaData = [
  //   { patologia: "Diabetes Tipo 1", total: 0 },
  //   { patologia: "Gastritis y/o Colitis", total: 6 },
  //   { patologia: "Anorexia", total: 1 },
  //   { patologia: "Anemia", total: 3 },
  //   { patologia: "SOP", total: 2 },
  //   { patologia: "Dislipidemias", total: 2 },
  // ];

  // Manejador para aplicar el filtro por fechas
  // const handleFilter = () => {
  //   console.log("Filtrando datos desde", startDate, "hasta", endDate);
  //   // Aquí iría la llamada al backend para obtener los datos filtrados
  // };
  const handleFilter = () => {
    if (startDate && endDate) {
      setIsLoading(true);
      fetchPacientes();
      fetchPatologias();
      fetchIMC();
    } else {
      alert("Por favor, seleccione un rango de fechas válido.");
    }
  };

  //Descarga en PDF
  const handleDownloadPDF = async () => {
  
    const html2pdf = (await import("html2pdf.js")).default; // Importa html2pdf dinámicamente
    const element = componentRef.current;
    //const element = document.getElementById("reportePDF");
    const options = {
      margin: 0.5,
      filename: "reporte_paciente.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2,
        useCORS: true, // Permite cargar recursos de otras fuentes
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    
    html2pdf().set(options).from(element).save();
  };
  

  // useEffect(() => {
  //   // Inicia un "loader" al cargar la página
  //   const timer = setTimeout(() => {
  //     setIsLoading(false); // Oculta el loader después de cargar
  //   }, 1500); // Tiempo de carga simulado
  //   return () => clearTimeout(timer);
  // }, []);

  // Verifica si está cargando y muestra el spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" color="primary" /> {/* Spinner de NextUI */}
      </div>
    );
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reporte de Pacientes</h1>

      {/* Filtros de Fecha */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Fecha de Inicio</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Fecha de Fin</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <Button onClick={handleFilter} className="self-end">
          Aplicar Filtro
        </Button>
      </div>

      {/* Contenido del Reporte */}
      <div id="reportePDF" ref={componentRef}>
        {/* Tablas */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Tabla Carrera y Género */}
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Carrera y Sexo</h3>
            <Table aria-label="Reporte de Pacientes por Carrera y Sexo">
              <TableHeader>
                <TableColumn>Carrera</TableColumn>
                <TableColumn>Mujer</TableColumn>
                <TableColumn>Hombre</TableColumn>
                {/* <TableColumn>Otro</TableColumn> */}
              </TableHeader>
              <TableBody>
                {pacientesPorCarrera.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.carrera}</TableCell>
                    <TableCell>{row.femenino}</TableCell>
                    <TableCell>{row.masculino}</TableCell>
                    {/* <TableCell>{row.otro}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tabla Estudiantes por Semestre */}
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">
              Estudiantes por Semestre
            </h3>
            <Table aria-label="Reporte de Pacientes por Semestre">
              <TableHeader>
                <TableColumn>Semestre</TableColumn>
                <TableColumn>Total</TableColumn>
              </TableHeader>
              <TableBody>
                {pacientesPorSemestre.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.semestre}°</TableCell>
                    <TableCell>{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Tabla Diagnóstico por IMC */}
        <div className="bg-white shadow-md p-6 rounded-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Diagnóstico por IMC</h3>
          <Table aria-label="Reporte de IMC de pacientes">
            <TableHeader>
              <TableColumn>Bajo peso</TableColumn>
              <TableColumn>Peso normal</TableColumn>
              <TableColumn>Sobrepeso</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{clasificacionIMC.bajoPeso}</TableCell>
                <TableCell>{clasificacionIMC.pesoNormal}</TableCell>
                <TableCell>{clasificacionIMC.sobrepeso}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Tabla Diagnóstico por Patología Específica */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4">
            Diagnóstico por Patología Específica
          </h3>
          <Table aria-label="Reporte de patologías">
            <TableHeader>
              <TableColumn>Patología</TableColumn>
              <TableColumn>Total de Pacientes</TableColumn>
            </TableHeader>
            <TableBody>
              {patologiasContadas.map((item) => (
                <TableRow key={item.patologia1}>
                  <TableCell>{item.patologia1}</TableCell>
                  <TableCell>{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Botón en la parte inferior */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.back()}
          className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
        >
          Regresar
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-[#11404E] text-white py-2 px-6 rounded-md hover:bg-[#0d2e38] transition"         
        >
          Descargar PDF
        </button>
      </div>
    </div>
  );
}
export default dynamic(() => Promise.resolve(Reporte), { ssr: false });
