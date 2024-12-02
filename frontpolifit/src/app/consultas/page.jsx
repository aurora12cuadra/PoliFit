"use client";
import { useState, useEffect, useMemo } from "react";
import { CronometroProvider } from "./context/CronometroContext";
import { useCronometro } from "./context/CronometroContext"; 
import Cronometro from "./components/Cronometro";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Calendar as CalendarIcon, Plus, Search } from "lucide-react";
import { usePaciente } from "../consultas/context/PacienteContext";
import { useRouter } from "next/navigation";

function Consultas() {
  // Estados principales
  const { startTimer } = useCronometro();
  const [isOpen, setIsOpen] = useState(false);
  const { setPacienteInfo, resetConsultaData  } = usePaciente();
  const [isSelectingPatient, setIsSelectingPatient] = useState(true);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter(); // Para manejar la navegación

  const handleIniciarConsulta = () => {
    if (!selectedPaciente) return;
    resetConsultaData();
    // Almacena la información completa del paciente en el contexto
    setPacienteInfo({
      noBoleta: selectedPaciente.noBoleta,
      nombre: selectedPaciente.nombre,
      apellidoPaterno: selectedPaciente.apellidoPaterno,
      apellidoMaterno: selectedPaciente.apellidoMaterno,
      email: selectedPaciente.email,
      telefono: selectedPaciente.telefono,
      edad: selectedPaciente.edad,
      sexo: selectedPaciente.sexo,
      // Añade más datos si los necesitas
    });

    startTimer();
    // Redirige a la página de formularios
    router.push("/consultas/formularios/estilovida");
  };
  // Estados para filtros
  const [filtroFechaTipo, setFiltroFechaTipo] = useState("todas");
  const [fechaEspecifica, setFechaEspecifica] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  // Data de consultas
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: "Aurora Cuadra Camacho",
      email: "aurora12cuadra@gmail.com",
      telefono: "5578997436",
      fechaConsulta: "2024-03-21",
      hora: "10:00",
      genero: "Mujer",
    },
    {
      id: 2,
      paciente: "Leam Hernandez Ramos",
      email: "hola_leam@gmail.com",
      telefono: "5574781023",
      fechaConsulta: "2024-03-20",
      hora: "11:30",
      genero: "Hombre",
    },
    {
      id: 3,
      paciente: "Tamara Cervantez Meza",
      email: "tamara10cervantez@gmail.com",
      telefono: "5589463210",
      fechaConsulta: "2024-03-20",
      hora: "13:00",
      genero: "Mujer",
    },
  ]);

  // Funciones de manejo
  const handleCreateConsulta = () => {
    setIsSelectingPatient(true);
    setIsOpen(true); // Abre el modal
  };

  const handlePacienteSelect = (pacienteId) => {
    if(isSelectingPatient){
      console.log("Paciente seleccionado con ID:", pacienteId); // Verificar el ID seleccionado
      console.log("Resultados de búsqueda 2:", searchResults);
      const paciente = searchResults.find((p) => p.noBoleta === pacienteId);
      console.log("Resultados de paciente:", paciente);
      setSelectedPaciente(paciente);
      setIsSelectingPatient(false);
      // console.log("dd")
    }
  };  

  const handleCloseModal = () => {
    setIsSelectingPatient(true);
    setSelectedPaciente(null);
    setIsOpen(false); // Cierra el modal
  };

  const searchPaciente = async (nombre) => {
    if(isSelectingPatient){
      try {
        // Asegura que el primer carácter de "nombre" sea mayúscula
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        const response = await fetch(`/api/pacientes/buscar?nombre=${nombre}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pasa el token desde localStorage
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("Resultados de búsqueda:", data);
          setSearchResults(data);
        } else {
          const errorData = await response.json();
          console.error("Error al buscar paciente:", errorData.error);
          setSearchResults([]); // Vacía los resultados si hay error
        }
      } catch (error) {
        console.error("Error al buscar paciente:", error);
        setSearchResults([]);
      }
    }
  };  
  
  // Función para calcular fechas relativas
  const getFechaRelativa = (dias) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  };

  // Filtrado de consultas
  const consultasFiltradas = useMemo(() => {
    return consultas.filter((consulta) => {
      const fechaConsulta = new Date(consulta.fechaConsulta);
      let cumpleFecha = true;

      switch (filtroFechaTipo) {
        case "ultima_semana":
          const fechaSemana = getFechaRelativa(7);
          cumpleFecha = fechaConsulta >= fechaSemana;
          break;
        case "ultimo_mes":
          const fechaMes = getFechaRelativa(30);
          cumpleFecha = fechaConsulta >= fechaMes;
          break;
        case "fecha_especifica":
          cumpleFecha = consulta.fechaConsulta === fechaEspecifica;
          break;
        default:
          cumpleFecha = true;
      }

      const cumpleGenero =
        filtroGenero !== "todos" ? consulta.genero === filtroGenero : true;
      const cumpleBusqueda =
        consulta.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
        consulta.email.toLowerCase().includes(busqueda.toLowerCase());

      return cumpleFecha && cumpleGenero && cumpleBusqueda;
    });
  }, [consultas, filtroFechaTipo, fechaEspecifica, filtroGenero, busqueda]);

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltroFechaTipo("todas");
    setFechaEspecifica("");
    setFiltroGenero("todos");
    setBusqueda("");
  };

  // Render del filtro de fecha específica
  const renderFiltroFecha = () => {
    if (filtroFechaTipo === "fecha_especifica") {
      return (
        <Input
          type="date"
          value={fechaEspecifica}
          onChange={(e) => setFechaEspecifica(e.target.value)}
          startContent={<CalendarIcon className="text-default-400 w-4 h-4" />}
          className="w-48"
        />
      );
    }
    return null;
  };

  // Efecto para realizar la búsqueda en el backend cuando cambia el texto de búsqueda
  useEffect(() => {
    if (searchText) {
      searchPaciente(searchText);
      console.log("Paciente seleccionado:", searchText);
    } else {
      console.log("No hay resultados");
      setSearchResults([]);
      setIsSelectingPatient(true);
    }
  }, [searchText]);

  return (
    <CronometroProvider>
       {/* Mostrar el cronómetro */}
      <Cronometro />
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Mis Consultas</h2>
        <Button
          color="primary"
          className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
          endContent={<Plus size={20} />}
          onPress={handleCreateConsulta}
        >
          Nueva Consulta
        </Button>
      </div>
      {/* Sección de filtros */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              isClearable
              placeholder="Buscar por nombre o email..."
              startContent={<Search className="text-default-400 w-4 h-4" />}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <Select
              label="Filtrar por fecha"
              placeholder="Seleccionar período"
              value={filtroFechaTipo}
              onChange={(e) => {
                setFiltroFechaTipo(e.target.value);
                if (e.target.value !== "fecha_especifica") {
                  setFechaEspecifica("");
                }
              }}
              className="w-48"
              startContent={
                <CalendarIcon className="text-default-400 w-4 h-4" />
              }
            >
              <SelectItem key="todas" value="todas">
                Todas las fechas
              </SelectItem>
              <SelectItem key="ultima_semana" value="ultima_semana">
                Última semana
              </SelectItem>
              <SelectItem key="ultimo_mes" value="ultimo_mes">
                Último mes
              </SelectItem>
              <SelectItem key="fecha_especifica" value="fecha_especifica">
                Fecha específica
              </SelectItem>
            </Select>
            {renderFiltroFecha()}
            <Select
              label="Género"
              placeholder="Todos"
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
              className="w-40"
            >
              <SelectItem key="todos" value="todos">
                Todos
              </SelectItem>
              <SelectItem key="Hombre" value="Hombre">
                Hombre
              </SelectItem>
              <SelectItem key="Mujer" value="Mujer">
                Mujer
              </SelectItem>
            </Select>
            <Button
              className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
              variant="flat"
              onPress={limpiarFiltros}
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla de consultas */}
      <div className="bg-white shadow-md rounded-md">
        <Table aria-label="Tabla de consultas">
          <TableHeader>
            <TableColumn>PACIENTE</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>TELÉFONO</TableColumn>
            <TableColumn>FECHA CONSULTA</TableColumn>
            <TableColumn>HORA</TableColumn>
            <TableColumn>GÉNERO</TableColumn>
            <TableColumn align="center">ACCIONES</TableColumn>
          </TableHeader>
          <TableBody>
            {consultasFiltradas.map((consulta) => (
              <TableRow key={consulta.id}>
                <TableCell>{consulta.paciente}</TableCell>
                <TableCell>
                  <a
                    href={`mailto:${consulta.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {consulta.email}
                  </a>
                </TableCell>
                <TableCell>{consulta.telefono}</TableCell>
                <TableCell>
                  {new Date(consulta.fechaConsulta).toLocaleDateString()}
                </TableCell>
                <TableCell>{consulta.hora}</TableCell>
                <TableCell>{consulta.genero}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
                      variant="flat"
                    >
                      Ver Consulta
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal para seleccionar paciente */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-2xl font-semibold">Seleccionar Paciente</h2>
          </ModalHeader>
          <ModalBody>
            <Autocomplete
              allowsCustomValue
              label="Buscar paciente"
              placeholder="Escriba el nombre del paciente"
              className="w-full"
              items={searchResults}
              onInputChange={(value) => setSearchText(value)}
              onSelectionChange={handlePacienteSelect}
            >
              {(paciente) => (
                <AutocompleteItem key={paciente.noBoleta} textValue={`${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`}>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {`${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`}
                    </span>
                    <span className="text-xs text-default-400">
                      {paciente.email}
                    </span>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
              onPress={handleIniciarConsulta}
              //isDisabled={!selectedPaciente} // Deshabilitar si no hay paciente seleccionado
            >
              Iniciar Consulta
            </Button>
            <Button
              className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
              onPress={() => (window.location.href = "/nuevopaciente")}
            >
              Nuevo Paciente
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    </CronometroProvider>
  );
}

export default Consultas;



// "use client";
// import { useState, useEffect } from "react";
// import {
//   Button,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Autocomplete,
//   AutocompleteItem,
// } from "@nextui-org/react";
// import { usePaciente } from "../consultas/context/PacienteContext";
// import { useRouter } from "next/navigation";
// import { Plus } from "lucide-react";

// function Consultas() {
//   // Estado para controlar si el modal está abierto o cerrado
//   const [isOpen, setIsOpen] = useState(false);
//   const { setPacienteInfo, resetConsultaData } = usePaciente();
//   const [isSelectingPatient, setIsSelectingPatient] = useState(true);
//   const [selectedPaciente, setSelectedPaciente] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const router = useRouter(); // Para manejar la navegación

//   const handleIniciarConsulta = () => {
//     if (!selectedPaciente) return;
//     resetConsultaData();
//     // Almacena la información completa del paciente en el contexto
//     setPacienteInfo({
//       pacienteId: selectedPaciente.id,
//       nombre: selectedPaciente.nombre,
//       email: selectedPaciente.email,
//       telefono: selectedPaciente.telefono,
//     });

//     // Redirige a la página de formularios
//     router.push("/consultas/formularios/estilovida");
//   };

//   const handleCreateConsulta = () => {
//     setIsSelectingPatient(true);
//     setIsOpen(true); // Abre el modal
//   };

//   const handlePacienteSelect = (pacienteId) => {
//     const paciente = searchResults.find((p) => p.id === parseInt(pacienteId));
//     setSelectedPaciente(paciente);
//     setIsSelectingPatient(false);
//   };

//   const handleCloseModal = () => {
//     setIsSelectingPatient(true);
//     setSelectedPaciente(null);
//     setIsOpen(false); // Cierra el modal
//   };

//   // Función para buscar pacientes en el backend
//   const searchPaciente = async (nombre) => {
//     try {
//       const response = await fetch(`/api/pacientes/buscar?nombre=${nombre}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Pasa el token desde localStorage
//         },
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data);
//       } else {
//         const errorData = await response.json();
//         console.error("Error al buscar paciente:", errorData.error);
//         setSearchResults([]); // Vacía los resultados si hay error
//       }
//     } catch (error) {
//       console.error("Error al buscar paciente:", error);
//       setSearchResults([]);
//     }
//   };
  


//   // Efecto para realizar la búsqueda en el backend cuando cambia el texto de búsqueda
//   useEffect(() => {
//     if (searchText) {
//       searchPaciente(searchText);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchText]);

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Mis Consultas</h2>
//         <Button
//           color="primary"
//           className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
//           endContent={<Plus size={20} />}
//           onPress={handleCreateConsulta}
//         >
//           Nueva Consulta
//         </Button>
//       </div>

//       {/* Modal para seleccionar paciente */}
//       <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
//         <ModalContent>
//           <ModalHeader>
//             <h2 className="text-2xl font-semibold">Seleccionar Paciente</h2>
//           </ModalHeader>
//           <ModalBody>
//             <Autocomplete
//               label="Buscar paciente"
//               placeholder="Escriba el nombre del paciente"
//               className="w-full"
//               items={searchResults}
//               onInputChange={(value) => setSearchText(value)}
//               onSelectionChange={handlePacienteSelect}
//             >
//               {(paciente) => (
//                 <AutocompleteItem key={paciente.noBoleta} textValue={paciente.nombre}>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-medium">
//                       {paciente.nombre}
//                     </span>
//                     <span className="text-xs text-default-400">
//                       {paciente.email}
//                     </span>
//                   </div>
//                 </AutocompleteItem>
//               )}
//             </Autocomplete>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="danger" variant="flat" onPress={handleCloseModal}>
//               Cancelar
//             </Button>
//             <Button
//               className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
//               onPress={handleIniciarConsulta}
//               isDisabled={!selectedPaciente} // Deshabilitar si no hay paciente seleccionado
//             >
//               Iniciar Consulta
//             </Button>
//             <Button
//               className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
//               onPress={() => (window.location.href = "/nuevopaciente")}
//             >
//               Nuevo Paciente
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// export default Consultas;
