import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


//Contenedor raiz de toda la aplicacion
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PoliFit",
  description: "Pagina de Polifit ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* children es cada pagina que creemos */}
      <body className={inter.className}>
        <Header />
        {/* Usa clases responsive */}
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <div className="flex-grow p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
