import { Inter } from "next/font/google";
import "./globals.css";
//import Header from "./components/Header";
//import Sidebar from "./components/Sidebar";
import { NextUIProvider } from "@nextui-org/react";
import SidebarWrapper from "./components/SidebarWrapper";
import HeaderWrapper from "./components/HeaderWrapper";

// Carga de fuentes
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextUIProvider>
          <HeaderWrapper />
          <div className="flex flex-col md:flex-row min-h-screen">
            <SidebarWrapper />
            <main className="flex-grow p-4">
              {children}
            </main>
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
