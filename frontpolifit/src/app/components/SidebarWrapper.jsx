"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const hideSidebarPaths = ["/registro", "/inicio", "/restablecer","/terminos","/avisospriva"]; // Rutas específicas

  const isDynamicRoute = pathname.startsWith("/restablecer/");

  if (hideSidebarPaths.includes(pathname) || isDynamicRoute) {
    return null;
  }

  return <Sidebar />;
}
