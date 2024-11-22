"use client";
import React from "react";
import { useRouter } from "next/navigation";

function PerfilNutri() {
  const router = useRouter();

  // Función para manejar el clic en el botón de Reporte
  const handleReporteClick = () => {
    router.push("/perfil/reporte"); // Redirigir a la página de reporte
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Perfil del Nutriólogo</h1>
      <p>Bienvenido a tu perfil. Aquí puedes ver tus datos personales y acceder a diferentes funcionalidades.</p>

      {/* Botón de Reporte */}
      <div className="mt-6">
        <button
          onClick={handleReporteClick}
          className="bg-[#11404E] text-white py-2 px-4 rounded-md hover:bg-[#0e2f3c] transition duration-200"
        >
          Generar Reporte
        </button>
      </div>
    </div>
  );
}

export default PerfilNutri;










