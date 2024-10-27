"use client";
import { useState, useMemo } from "react";
import CalendarView from "./components/calendarview";
import CitasTable from "./components/citastable";
import ModalCita from "./components/ModalCita";
import ModalEliminar from "./components/ModalEliminar";
import HeaderAgenda from "./components/HeaderAgenda";

function AgendaCitas() {
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    isDeleteModalOpen: false,
    isEditing: false,
  });
  const [viewType, setViewType] = useState("list");
  const [selectedCita, setSelectedCita] = useState(null);

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

  const [newCita, setNewCita] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  const getCalendarEvents = useMemo(() => {
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
  }, [citas]);

  const handleOpenModal = (cita = null) => {
    setNewCita(
      cita || {
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
      }
    );
    setModalState({
      isModalOpen: true,
      isDeleteModalOpen: false,
      isEditing: !!cita,
    });
    setSelectedCita(cita);
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isModalOpen: false });
    setSelectedCita(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalState.isEditing) {
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
    setModalState({ ...modalState, isDeleteModalOpen: true });
  };

  const confirmDelete = () => {
    setCitas(citas.filter((cita) => cita.id !== selectedCita.id));
    setModalState({ ...modalState, isDeleteModalOpen: false });
    setSelectedCita(null);
  };

  return (
    <div className="p-6">
      <HeaderAgenda viewType={viewType} setViewType={setViewType} handleOpenModal={handleOpenModal} />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {viewType === "calendar" ? (
          <CalendarView
            events={getCalendarEvents}
            handleEventClick={handleOpenModal}
            handleDateClick={handleOpenModal}
          />
        ) : (
          <CitasTable citas={citas} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
        )}
      </div>

      <ModalCita
        isOpen={modalState.isModalOpen}
        isEditing={modalState.isEditing}
        newCita={newCita}
        setNewCita={setNewCita}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />

      <ModalEliminar
        isOpen={modalState.isDeleteModalOpen}
        selectedCita={selectedCita}
        confirmDelete={confirmDelete}
        handleClose={() => setModalState({ ...modalState, isDeleteModalOpen: false })}
      />
    </div>
  );
}

export default AgendaCitas;
