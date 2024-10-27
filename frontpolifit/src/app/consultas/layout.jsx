// /app/consultas/layout.jsx
import MenuConsultas from './components/MenuConsultas';

export default function ConsultaLayout({ children }) {
  return (
    <div>
      <MenuConsultas />
      <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Expediente</h1>
        {children} {/* Renderiza el contenido de la subpágina seleccionada */}
      </div>
    </div>
  );
}