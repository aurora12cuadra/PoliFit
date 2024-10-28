"use client";
import { useState, useMemo } from "react";
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
import { 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  Plus, 
  Search, 
  Clock,
  Calendar as CalendarIcon 
} from "lucide-react";

function Consultas() {
  // Estados principales
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSelectingPatient, setIsSelectingPatient] = useState(true);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  // Estados para filtros
  const [filtroFechaTipo, setFiltroFechaTipo] = useState("todas");
  const [fechaEspecifica, setFechaEspecifica] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  // Data de pacientes
  const [pacientes] = useState([
    {
      id: 1,
      nombre: "Aurora Cuadra Camacho",
      email: "aurora12cuadra@gmail.com",
      telefono: "5578997436",
      genero: "Mujer"
    },
    {
      id: 2,
      nombre: "Leam Hernandez Ramos",
      email: "hola_leam@gmail.com",
      telefono: "5574781023",
      genero: "Hombre"
    },
    {
      id: 3,
      nombre: "Tamara Cervantez Meza",
      email: "tamara10cervantez@gmail.com",
      telefono: "5589463210",
      genero: "Mujer"
    }
  ]);

  // Data de consultas
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: "Aurora Cuadra Camacho",
      email: "aurora12cuadra@gmail.com",
      telefono: "5578997436",
      fechaConsulta: "2024-03-21",
      hora: "10:00",
      genero: "Mujer"
    },
    {
      id: 2,
      paciente: "Leam Hernandez Ramos",
      email: "hola_leam@gmail.com",
      telefono: "5574781023",
      fechaConsulta: "2024-03-20",
      hora: "11:30",
      genero: "Hombre"
    },
    {
      id: 3,
      paciente: "Tamara Cervantez Meza",
      email: "tamara10cervantez@gmail.com",
      telefono: "5589463210",
      fechaConsulta: "2024-03-20",
      hora: "13:00",
      genero: "Mujer"
    }
  ]);

  // Estado para nueva consulta
  const [newConsulta, setNewConsulta] = useState({
    paciente: "",
    email: "",
    telefono: "",
    fechaConsulta: "",
    hora: "",
    genero: ""
  });

  // Funciones de manejo
  const handleCreateConsulta = () => {
    setIsSelectingPatient(true);
    onOpen();
  };

  const handlePacienteSelect = (pacienteId) => {
    const paciente = pacientes.find(p => p.id === parseInt(pacienteId));
    setSelectedPaciente(paciente);
    setNewConsulta({
      ...newConsulta,
      paciente: paciente.nombre,
      email: paciente.email,
      telefono: paciente.telefono,
      genero: paciente.genero
    });
    setIsSelectingPatient(false);
  };

  const handleCloseModal = () => {
    setIsSelectingPatient(true);
    setSelectedPaciente(null);
    setNewConsulta({
      paciente: "",
      email: "",
      telefono: "",
      fechaConsulta: "",
      hora: "",
      genero: ""
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConsultas([...consultas, { ...newConsulta, id: consultas.length + 1 }]);
    handleCloseModal();
  };

  // Función para calcular fechas relativas
  const getFechaRelativa = (dias) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  };

  // Filtrado de consultas
  const consultasFiltradas = useMemo(() => {
    return consultas.filter(consulta => {
      const fechaConsulta = new Date(consulta.fechaConsulta);
      let cumpleFecha = true;

      switch (filtroFechaTipo) {
        case 'ultima_semana':
          const fechaSemana = getFechaRelativa(7);
          cumpleFecha = fechaConsulta >= fechaSemana;
          break;
        case 'ultimo_mes':
          const fechaMes = getFechaRelativa(30);
          cumpleFecha = fechaConsulta >= fechaMes;
          break;
        case 'fecha_especifica':
          cumpleFecha = consulta.fechaConsulta === fechaEspecifica;
          break;
        default:
          cumpleFecha = true;
      }

      const cumpleGenero = filtroGenero !== "todos" ? consulta.genero === filtroGenero : true;
      const cumpleBusqueda = consulta.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
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
    if (filtroFechaTipo === 'fecha_especifica') {
      return (
        <Input
          type="date"
          value={fechaEspecifica}
          onChange={(e) => setFechaEspecifica(e.target.value)}
          startContent={<CalendarIcon className="text-default-400 w-4 h-4"/>}
          className="w-48"
        />
      );
    }
    return null;
  };

  return (
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
              startContent={<Search className="text-default-400 w-4 h-4"/>}
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
                if (e.target.value !== 'fecha_especifica') {
                  setFechaEspecifica('');
                }
              }}
              className="w-48"
              startContent={<CalendarIcon className="text-default-400 w-4 h-4"/>}
            >
              <SelectItem key="todas" value="todas">Todas las fechas</SelectItem>
              <SelectItem key="ultima_semana" value="ultima_semana">Última semana</SelectItem>
              <SelectItem key="ultimo_mes" value="ultimo_mes">Último mes</SelectItem>
              <SelectItem key="fecha_especifica" value="fecha_especifica">Fecha específica</SelectItem>
            </Select>
            {renderFiltroFecha()}
            <Select
              label="Género"
              placeholder="Todos"
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
              className="w-40"
            >
              <SelectItem key="todos" value="todos">Todos</SelectItem>
              <SelectItem key="Hombre" value="Hombre">Hombre</SelectItem>
              <SelectItem key="Mujer" value="Mujer">Mujer</SelectItem>
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

        {/* Chips de filtros activos */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {filtroFechaTipo !== 'todas' && (
            <div className="bg-[#F4F4F9] text-[#11404E] text-xs px-3 py-1 rounded-md font-medium">
              {filtroFechaTipo === 'ultima_semana' && 'Última semana'}
              {filtroFechaTipo === 'ultimo_mes' && 'Último mes'}
              {filtroFechaTipo === 'fecha_especifica' && `Fecha: ${fechaEspecifica}`}
            </div>
          )}
          {filtroGenero !== 'todos' && (
            <div className="bg-[#F4F4F9] text-[#11404E] text-xs px-3 py-1 rounded-md font-medium">
              Género: {filtroGenero}
            </div>
          )}
          {busqueda && (
            <div className="bg-[#F4F4F9] text-[#11404E] text-xs px-3 py-1 rounded-md font-medium">
              Búsqueda: {busqueda}
            </div>
          )}
        </div>
      </div>

      {/* Tabla de consultas */}
      <div className="bg-white shadow-md rounded-md">
        <Table 
          aria-label="Tabla de consultas"
          classNames={{
            wrapper: "min-h-[400px]",
            th: "bg-[#F4F4F9] text-[#11404E] font-semibold py-3",
            td: "py-4"
          }}
        >
          <TableHeader>
            <TableColumn>PACIENTE</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>TELÉFONO</TableColumn>
            <TableColumn>FECHA CONSULTA</TableColumn>
            <TableColumn>HORA</TableColumn>
            <TableColumn>GÉNERO</TableColumn>
            <TableColumn align="center">ACCIONES</TableColumn>
          </TableHeader>
          <TableBody 
            emptyContent="No se encontraron consultas con los filtros seleccionados"
          >
            {consultasFiltradas.map((consulta) => (
              <TableRow key={consulta.id}>
                <TableCell className="font-medium">{consulta.paciente}</TableCell>
                <TableCell>
                  <a href={`mailto:${consulta.email}`} className="text-blue-600 hover:underline">
                    {consulta.email}
                  </a>
                </TableCell>
                <TableCell>{consulta.telefono}</TableCell>
                <TableCell>{new Date(consulta.fechaConsulta).toLocaleDateString()}</TableCell>
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
{/* Modal para nueva consulta */}
<Modal 
        isOpen={isOpen} 
        onClose={handleCloseModal}
        size={isSelectingPatient ? "md" : "2xl"}
        classNames={{
          base: "bg-white",
          header: "border-b border-gray-200",
          body: "py-6",
          footer: "border-t border-gray-200"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {isSelectingPatient ? (
                // Vista de selección de paciente
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">Seleccionar Paciente</h2>
                  </ModalHeader>
                  <ModalBody>
                    <Autocomplete
                      label="Buscar paciente"
                      placeholder="Escriba el nombre del paciente"
                      className="w-full"
                      defaultItems={pacientes}
                      onSelectionChange={handlePacienteSelect}
                    >
                      {(paciente) => (
                        <AutocompleteItem key={paciente.id} textValue={paciente.nombre}>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{paciente.nombre}</span>
                            <span className="text-xs text-default-400">{paciente.email}</span>
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <p className="text-sm text-default-400 mt-2">
                      Seleccione un paciente para crear una nueva consulta
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
                      onPress={() => window.location.href = '/nuevopaciente'}
                    >
                      Nuevo Paciente
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                // Vista de creación de consulta
                <form onSubmit={handleSubmit}>
                  <ModalHeader className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">Nueva Consulta para {selectedPaciente?.nombre}</h2>
                  </ModalHeader>
                  <ModalBody>
                    <div className="bg-[#F4F4F9] p-4 rounded-md mb-4">
                      <p className="text-sm font-medium mb-2">Información del paciente:</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm">{selectedPaciente?.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Teléfono</p>
                          <p className="text-sm">{selectedPaciente?.telefono}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Género</p>
                          <p className="text-sm">{selectedPaciente?.genero}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Fecha de consulta"
                        type="date"
                        startContent={<Calendar className="text-default-400 w-4 h-4"/>}
                        value={newConsulta.fechaConsulta}
                        onChange={(e) => setNewConsulta({ ...newConsulta, fechaConsulta: e.target.value })}
                        classNames={{
                          label: "font-medium"
                        }}
                        required
                      />
                      <Input
                        label="Hora"
                        type="time"
                        startContent={<Clock className="text-default-400 w-4 h-4"/>}
                        value={newConsulta.hora}
                        onChange={(e) => setNewConsulta({ ...newConsulta, hora: e.target.value })}
                        classNames={{
                          label: "font-medium"
                        }}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Select 
                        label="Tipo de consulta"
                        placeholder="Seleccione el tipo de consulta"
                        className="w-full"
                        classNames={{
                          label: "font-medium"
                        }}
                      >
                        <SelectItem key="primera" value="primera">Primera consulta</SelectItem>
                        <SelectItem key="seguimiento" value="seguimiento">Seguimiento</SelectItem>
                        <SelectItem key="control" value="control">Control mensual</SelectItem>
                      </Select>

                      <Input
                        label="Motivo de consulta"
                        placeholder="Describa brevemente el motivo de la consulta"
                        className="w-full"
                        classNames={{
                          label: "font-medium"
                        }}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={handleCloseModal}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
                      type="submit"
                    >
                      Crear Consulta
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Consultas;