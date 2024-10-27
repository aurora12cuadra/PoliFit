"use client";
import SubMenu from "./components/SubMenu";
import PatientDetailsForm from "./components/PatientDetailsForm";

function NuevoPacientePage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Nuevo Paciente</h1>
      <SubMenu />
      <PatientDetailsForm />
    </div>
  );
}

export default NuevoPacientePage;