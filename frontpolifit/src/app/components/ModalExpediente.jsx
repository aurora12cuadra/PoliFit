import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
} from "@nextui-org/react";

import { useState, useEffect, useMemo } from "react";
import PanelConsulta from "../consultas/components/PanelConsulta";

function ModalExpediente({ isOpen, onClose, paciente, onSelectConsulta }) {
  const [consultas, setConsultas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConsulta, setSelectedConsulta] = useState(null);

  useEffect(() => {
    if (isOpen && paciente) {
      console.log("Cargando consultas para el paciente:", paciente);
      // Llama al backend para obtener las consultas del paciente
      const fetchConsultas = async () => {
        try {
          const response = await fetch(
            `/api/consulta/getByPaciente?noBoleta=${paciente.noBoleta}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log("Consultas obtenidas:", data);
            setConsultas(data);
          } else {
            setConsultas([]); // Asegúrate de que consultas sea un array vacío en caso de error
            const errorData = await response.json();
            console.log(
              "Error al obtener consultas:",
              errorData.error || "Error desconocido"
            );
          }
        } catch (error) {
          console.log("Error al conectar con el backend:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchConsultas();
    }
  }, [isOpen, paciente]);

  // Maneja la selección de una consulta
  const handleConsultaClick = (consulta) => {
    console.log("Consulta seleccionada:", consulta);
    console.log("ID de la consulta:", consulta?.id_consulta); // Asegúrate de que `id_consulta` existe
    setSelectedConsulta(consulta);
  };

  // Maneja el cierre de los detalles de la consulta
  const handleBackToConsultas = () => {
    setSelectedConsulta(null);
  };

  if (!paciente) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      aria-label="Expediente del Paciente"
      className="p-8"
      size="lg" // Tamaño predefinido
    >
      <ModalContent>
        {selectedConsulta ? (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Detalles de la Consulta
            </ModalHeader>
            <ModalBody>
              <PanelConsulta
                consulta={selectedConsulta}
                onClose={handleBackToConsultas}
              />
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader id="Expediente del Paciente">
              <h2 className="text-xl font-bold">
                Expediente de {paciente.nombre}
              </h2>
            </ModalHeader>
            <ModalBody>
              {/* Información del Paciente */}
              <div className="mb-4">
                <p>
                  <strong>Nombre:</strong> {paciente.nombre}
                </p>
                <p>
                  <strong>Edad:</strong> {paciente.edad}
                </p>
                <p>
                  <strong>Boleta:</strong> {paciente.noBoleta}
                </p>
                <p>
                  <strong>Carrera:</strong> {paciente.carrera}
                </p>
                <p>
                  <strong>Fecha de Registro:</strong> {paciente.fechaRegistro}
                </p>
              </div>

              {/* Tabla de Consultas */}
              <h3 className="text-lg font-bold mb-2">Consultas</h3>
              {isLoading ? (
                <p>Cargando consultas...</p>
              ) : consultas.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableColumn>Fecha de Consulta</TableColumn>
                    <TableColumn>Peso</TableColumn>
                    <TableColumn>IMC</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {consultas.map((consulta, index) => (
                      <TableRow key={index}>
                        <TableCell>{consulta?.fecha_consulta}</TableCell>
                        <TableCell>{consulta?.Kilocaloria?.peso}</TableCell>
                        <TableCell>{consulta?.Kilocaloria?.imc}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            className="bg-[#11404E] text-white hover:bg-[#1a5c70]"
                            onPress={() => handleConsultaClick(consulta)}
                          >
                            Ver expediente
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No hay consultas registradas para este paciente.</p>
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="default" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalExpediente;
