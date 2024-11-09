"use client"; // Necesario para usar usePathname en este componente

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeaderPaths = ["/registro","/inicio"]; // Rutas donde no se debe mostrar el Header

  // Si la ruta actual está en hideHeaderPaths, no muestra el Header
  if (hideHeaderPaths.includes(pathname)) return null;

  // De lo contrario, muestra el Header
  return <Header />;
}