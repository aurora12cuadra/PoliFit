"use client";
import { useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import PatientModal from "@/app/components/PacienteModal";

function Pacientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const patients = [
    {
      name: "Aurora Cuadra Camacho",
      age: 21,
      id: "2021063816",
      career: "Sistemas Computacionales",
      registrationDate: "01/01/2024",
      semester: "8° semestre",
      gender: "Femenino",
      consultations: [
        { date: "21/03/2024", weight: 64, imc: 21 },
        { date: "15/02/2024", weight: 60, imc: 20 },
        // Añadir más consultas si es necesario
      ],
    },
    // Agrega más pacientes si es necesario
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">PACIENTES</h1>

      {/* Tabla de Pacientes */}
      <div className="bg-white shadow-md p-4 rounded-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Escuela</th>
              <th className="px-4 py-2">Sexo</th>
              <th className="px-4 py-2">Edad</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="px-4 py-2">
                  {patient.name} <br /> {patient.id}
                </td>
                <td className="px-4 py-2">
                  {patient.semester} <br /> {patient.career}
                </td>
                <td className="px-4 py-2">{patient.gender}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2 flex flex-col items-center">
                  <button
                    className="w-full bg-[#11404E] text-white py-2 rounded-md flex items-center justify-center space-x-2"
                    onClick={() => openModal(patient)}
                  >
                    <FaFolderOpen />
                    <span>Detalles</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalles del Paciente */}
      <PatientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        patient={selectedPatient}
      />
    </div>
  );
}

export default Pacientes;
