import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Autocomplete,  AutocompleteItem, } from "@nextui-org/react";
import { useState, useEffect, } from "react";

function ModalCita({ isOpen, isEditing, newCita, setNewCita, handleCloseModal, handleSubmit, }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isSelectingPatient, setIsSelectingPatient] = useState(true);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const handleIniciarConsulta = () => {
  //   if (!selectedPaciente) return;
  //   resetConsultaData();
  //   // Almacena la información completa del paciente en el contexto
  //   setPacienteInfo({
  //     pacienteId: selectedPaciente.noBoleta,
  //     nombre: selectedPaciente.nombre,
  //     apellidoPaterno: selectedPaciente.apellidoPaterno,
  //     apellidoMaterno: selectedPaciente.apellidoMaterno,
  //     email: selectedPaciente.email,
  //     telefono: selectedPaciente.telefono,
  //     edad: selectedPaciente.edad,
  //     sexo: selectedPaciente.sexo,
  //     // Añade más datos si los necesitas
  //   });
  // };

  // Funciones de manejo
  const handlePacienteSelect = (noBoleta) => {
    console.log("Paciente seleccionado con ID:", noBoleta); // Verificar el ID seleccionado
    console.log("Resultados de búsqueda 2:", searchResults);
    const paciente = searchResults.find((p) => p.noBoleta === noBoleta);
    console.log("Resultados de paciente:", paciente);
    setSelectedPaciente(paciente);
    setNewCita({ ...newCita, noBoleta, nombre: paciente.nombre, email: paciente.email, telefono: paciente.telefono });
    setIsSelectingPatient(false);
  };  

  const searchPaciente = async (nombre) => {
    try {
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
  };  

  useEffect(() => {
    if (searchText) {
      searchPaciente(searchText);
      console.log("Paciente seleccionado:", searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">{isEditing ? "Editar Cita" : "Nueva Cita"}</ModalHeader>
          <ModalBody>
            <Autocomplete
              label="Buscar paciente"
              placeholder="Escriba el nombre del paciente"
              className="w-full"
              items={searchResults}
              // value={isSelectingPatient ? searchText : selectedPaciente?.nombre || ""}
              onInputChange={(value) => setSearchText(value) }
              onSelectionChange={handlePacienteSelect}
              // value={isSelectingPatient ? searchText : selectedPaciente?.nombre || ""} // Conectar valor del input
              // onInputChange={(value) => {
              //   setSearchText(value);
              //   setIsSelectingPatient(true); // Habilitar búsqueda mientras escribe
              // }}
              // onSelectionChange={(selectedItem) => {
              //   handlePacienteSelect(
              //     selectedItem.noBoleta,
              //     selectedItem.nombre,
              //     selectedItem.email,
              //     selectedItem.telefono
              //   );
              // }}
              //onSelectionChange={handlePacienteSelect}
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
            <div className="grid grid-cols-2 gap-4">
              <Input label="Fecha" type="date" value={newCita.fecha_consulta} onChange={(e) => setNewCita({ ...newCita, fecha_consulta: e.target.value })} required />
              <Input label="Hora" type="time" value={newCita.hora_consulta} onChange={(e) => setNewCita({ ...newCita, hora_consulta: e.target.value })} required />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>Cancelar</Button>
            <Button color="primary" type="submit">{isEditing ? "Guardar Cambios" : "Crear Cita"}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
    
  );
}

export default ModalCita;
