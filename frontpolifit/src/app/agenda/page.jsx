"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Calendar, List } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { Edit, Trash } from "lucide-react";

function AgendaCitas() {
  // Estados para los modales y la vista
  const [viewType, setViewType] = useState("list"); // Inicialmente en vista lista
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);

  // Estado para las citas
  const [citas, setCitas] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@ejemplo.com",
      telefono: "5512345678",
      fecha: "2024-02-15",
      hora: "10:00",
    },
    {
      id: 2,
      nombre: "María García",
      email: "maria@ejemplo.com",
      telefono: "5587654321",
      fecha: "2024-02-16",
      hora: "11:30",
    },
  ]);

  // Estado para nueva cita
  const [newCita, setNewCita] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  // Función para convertir citas al formato del calendario
  const getCalendarEvents = () => {
    return citas.map((cita) => ({
      id: cita.id,
      title: cita.nombre,
      start: `${cita.fecha}T${cita.hora}:00`,
      end: `${cita.fecha}T${cita.hora.split(":")[0]}:${
        parseInt(cita.hora.split(":")[1]) + 30
      }:00`,
      backgroundColor: "#11404E",
      borderColor: "#11404E",
    }));
  };

  // Funciones de manejo
  const handleOpenModal = (cita = null) => {
    if (cita) {
      setNewCita(cita);
      setIsEditing(true);
      setSelectedCita(cita);
    } else {
      setNewCita({
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
      });
      setIsEditing(false);
      setSelectedCita(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCita({
      nombre: "",
      email: "",
      telefono: "",
      fecha: "",
      hora: "",
    });
    setIsEditing(false);
    setSelectedCita(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCitas(
        citas.map((cita) =>
          cita.id === selectedCita.id ? { ...newCita, id: cita.id } : cita
        )
      );
    } else {
      setCitas([...citas, { ...newCita, id: citas.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleDelete = (cita) => {
    setSelectedCita(cita);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setCitas(citas.filter((cita) => cita.id !== selectedCita.id));
    setIsDeleteModalOpen(false);
    setSelectedCita(null);
  };

  const handleEventClick = (info) => {
    const cita = citas.find((c) => c.id === parseInt(info.event.id));
    if (cita) {
      handleOpenModal(cita);
    }
  };

  const handleDateClick = (arg) => {
    const now = new Date();
    const clickedDate = new Date(arg.date);

    if (clickedDate < now) {
      alert("No puedes agendar citas en fechas pasadas");
      return;
    }

    handleOpenModal({
      ...newCita,
      fecha: arg.dateStr.split("T")[0],
      hora: "09:00",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Citas</h1>
        <div className="flex gap-2">
          <Button
            startContent={
              viewType === "calendar" ? (
                <List size={20} />
              ) : (
                <Calendar size={20} />
              )
            }
            variant="light"
            className="font-medium"
            onClick={() =>
              setViewType(viewType === "calendar" ? "list" : "calendar")
            }
          >
            Vista {viewType === "calendar" ? "Lista" : "Calendario"}
          </Button>
          <Button
            color="primary"
            className="bg-[#11404E] font-medium"
            startContent={<Calendar size={20} />}
            onClick={() => handleOpenModal()}
          >
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {viewType === "calendar" ? (
          <div className="p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={esLocale}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              buttonText={{
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
              }}
              height="700px"
              events={getCalendarEvents()}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              editable={true}
              selectable={true}
              dayMaxEvents={3}
              views={{
                dayGrid: {
                  dayMaxEvents: 3,
                },
              }}
            />
          </div>
        ) : (
          <Table
            aria-label="Tabla de citas"
            classNames={{
              wrapper: "min-h-[400px]",
              th: "bg-gray-50 text-gray-600 py-3",
              td: "py-4",
            }}
          >
            <TableHeader>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>TELÉFONO</TableColumn>
              <TableColumn>FECHA</TableColumn>
              <TableColumn>HORA</TableColumn>
              <TableColumn align="center">ACCIONES</TableColumn>
            </TableHeader>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.nombre}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${cita.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {cita.email}
                    </a>
                  </TableCell>
                  <TableCell>{cita.telefono}</TableCell>
                  <TableCell>
                    {new Date(cita.fecha).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        startContent={<Edit size={16} />}
                        onClick={() => handleOpenModal(cita)}
                        className="border border-[#11404E] text-[#11404E] rounded-md transition-colors duration-200 hover:bg-[#11404E] hover:text-white" // Estilos de hover
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        color="danger"
                        startContent={<Trash size={16} />}
                        onClick={() => handleDelete(cita)}
                        className="border border-red-500 text-red-500 rounded-md transition-colors duration-200 hover:bg-red-500 hover:text-white" // Estilos de hover
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Modal de Nueva Cita/Edición */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="md">
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {isEditing ? "Editar Cita" : "Nueva Cita"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Nombre completo"
                placeholder="Ingrese el nombre"
                value={newCita.nombre}
                onChange={(e) =>
                  setNewCita({ ...newCita, nombre: e.target.value })
                }
                required
              />
              <Input
                label="Email"
                placeholder="correo@ejemplo.com"
                type="email"
                value={newCita.email}
                onChange={(e) =>
                  setNewCita({ ...newCita, email: e.target.value })
                }
                required
              />
              <Input
                label="Teléfono"
                placeholder="Ingrese el teléfono"
                type="tel"
                value={newCita.telefono}
                onChange={(e) =>
                  setNewCita({ ...newCita, telefono: e.target.value })
                }
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Fecha"
                  type="date"
                  value={newCita.fecha}
                  onChange={(e) =>
                    setNewCita({ ...newCita, fecha: e.target.value })
                  }
                  required
                />
                <Input
                  label="Hora"
                  type="time"
                  value={newCita.hora}
                  onChange={(e) =>
                    setNewCita({ ...newCita, hora: e.target.value })
                  }
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleCloseModal}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                {isEditing ? "Guardar Cambios" : "Crear Cita"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalBody>
            <p>
              ¿Estás seguro de que deseas eliminar la cita de{" "}
              {selectedCita?.nombre}?
            </p>
            <p className="text-sm text-gray-500">
              Esta acción no se puede deshacer.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button color="danger" onPress={confirmDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AgendaCitas;
