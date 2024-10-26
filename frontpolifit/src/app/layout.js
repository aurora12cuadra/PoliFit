import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { NextUIProvider } from "@nextui-org/react";

// Contenedor raíz de toda la aplicación
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PoliFit",
  description: "Pagina de Polifit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* children es cada página que creemos */}
      <body className={inter.className}>
        <NextUIProvider>
          <Header />
          {/* Usa clases responsive */}
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-grow p-4">
              {children}
            </main>
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
