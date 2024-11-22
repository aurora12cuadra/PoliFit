"use client"; // Necesario para usar usePathname en este componente

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const hideSidebarPaths = ["/registro","/inicio"]; // Rutas donde no se debe mostrar el Sidebar

  // Si la ruta actual está en hideSidebarPaths, no muestra el Sidebar
  if (hideSidebarPaths.includes(pathname)) return null;

  // De lo contrario, muestra el Sidebar
  return <Sidebar />;
}