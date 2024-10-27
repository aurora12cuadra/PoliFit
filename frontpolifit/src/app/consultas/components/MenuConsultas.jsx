// /app/nuevopaciente/components/MenuConsultas.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback } from "react";

const MenuConsultas = () => {
  const pathname = usePathname();
  
  const menuItems = [
    { name: "Estilo de Vida", path: "/consultas/estilovida" },
    { name: "Trastornos", path: "/consultas/trastornos" },
    { name: "Mediciones", path: "/consultas/mediciones" },
    { name: "Kilocalorias", path: "/consultas/kilocalorias" },
    { name: "Recordatorio 24 hrs.", path: "/consultas/recordatorio24hrs" },
    { name: "Plan alimentación", path: "/consultas/plan-alimentacion" },
  ];

  // Función para asignar clase activa
  const getLinkClass = useCallback(
    (path) =>
      pathname === path
        ? "text-[#3BA2A0] font-bold"
        : "text-gray-600",
    [pathname]
  );

  return (
    <div className="flex flex-wrap gap-4 mb-6 text-sm sm:text-base lg:text-lg font-semibold justify-center md:justify-start">
      {menuItems.map((item) => (
        <Link key={item.name} href={item.path} prefetch={true}>
          <span
            className={`hover:underline px-2 py-1 rounded ${getLinkClass(item.path)}`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default memo(MenuConsultas);
