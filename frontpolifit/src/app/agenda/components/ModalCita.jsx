import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

function ModalCita({ isOpen, isEditing, newCita, setNewCita, handleCloseModal, handleSubmit }) {
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">{isEditing ? "Editar Cita" : "Nueva Cita"}</ModalHeader>
          <ModalBody>
            <Input label="Nombre completo" placeholder="Ingrese el nombre" value={newCita.nombre} onChange={(e) => setNewCita({ ...newCita, nombre: e.target.value })} required />
            <Input label="Email" placeholder="correo@ejemplo.com" type="email" value={newCita.email} onChange={(e) => setNewCita({ ...newCita, email: e.target.value })} required />
            <Input label="Teléfono" placeholder="Ingrese el teléfono" type="tel" value={newCita.telefono} onChange={(e) => setNewCita({ ...newCita, telefono: e.target.value })} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Fecha" type="date" value={newCita.fecha} onChange={(e) => setNewCita({ ...newCita, fecha: e.target.value })} required />
              <Input label="Hora" type="time" value={newCita.hora} onChange={(e) => setNewCita({ ...newCita, hora: e.target.value })} required />
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
