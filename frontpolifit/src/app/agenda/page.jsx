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
      idCita: 1,  
      noBoleta: 1,
      nombre: "Juan Pérez",
      email: "juan@ejemplo.com",
      telefono: "5512345678",
      fecha_consulta: "2024-02-15",
      hora_consulta: "10:00",
    },
    {
      idCita: 2,
      noBoleta: 2,
      nombre: "María García",
      email: "maria@ejemplo.com",
      telefono: "5587654321",
      fecha_consulta: "2024-02-16",
      hora_consulta: "11:30",
    },
  ]);

  const [newCita, setNewCita] = useState({
    //idCita: "",
    noBoleta: "",
    nombre: "",
    email: "",
    telefono: "",
    fecha_consulta: "",
    hora_consulta: "",
  });

  // Funcion para el calendario
  const getCalendarEvents = useMemo(() => {
    return citas.map((cita) => ({
      id: cita.idCita,
      title: cita.nombre,
      start: `${cita.fecha_consulta}T${cita.hora_consulta}:00`,
      end: `${cita.fecha_consulta}T${cita.hora_consulta.split(":")[0]}:${
        parseInt(cita.hora_consulta.split(":")[1]) + 30
      }:00`,
      backgroundColor: "#11404E",
      borderColor: "#11404E",
    }));
  }, [citas]);

  // const [isOpen, setIsOpen] = useState(false);
  // const [isSelectingPatient, setIsSelectingPatient] = useState(true);

  const handleOpenModal = (cita = null) => {
    setNewCita(
      cita || {
        //idCita: "",
        noBoleta: "",
        nombre: "",
        email: "",
        telefono: "",
        fecha_consulta: "",
        hora_consulta: "",
      }
    );
    setModalState({
      isModalOpen: true,
      isDeleteModalOpen: false,
      isEditing: !!cita,
    });
    setSelectedCita(cita);
    // setIsSelectingPatient(true);
    // setIsOpen(true); // Abre el modal
  };

  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const handleCloseModal = () => {
    setModalState({ ...modalState, isModalOpen: false });
    setSelectedCita(null);
    // setIsSelectingPatient(true);
    // setSelectedPaciente(null);
    // setIsOpen(false); // Cierra el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalState.isEditing) {
      setCitas(
        citas.map((cita) =>
          cita.idCita === selectedCita.idCita ? { ...newCita, idCita: cita.idCita } : cita
        )
      );
    } else {
      try {
        console.log("newCita: ", newCita);
        const { noBoleta, fecha_consulta, hora_consulta } = newCita;
        const payload = {
          noBoleta,
          fecha_consulta,
          hora_consulta,
        };
        console.log("Payload: ", payload);
        const response = await fetch(`/api/citas/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pasa el token desde localStorage
          },
          body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        if (response.ok) {
          console.log("Cita registrada con exito:", data);
          alert("Registro de cita exitoso");
        } else {
          console.error("Error al registrar cita:", data.error);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
      setCitas([...citas, { ...newCita, idCita: citas.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleDelete = (cita) => {
    setSelectedCita(cita);
    setModalState({ ...modalState, isDeleteModalOpen: true });
  };

  const confirmDelete = () => {
    setCitas(citas.filter((cita) => cita.idCita !== selectedCita.idCita));
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
