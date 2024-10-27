// /app/consultas/layout.jsx
import MenuConsultas from './components/MenuConsultas';

export default function NuevoPacienteLayout({ children }) {
  return (
    <div>
      <MenuConsultas />
      <div className="p-4">
        {children} {/* Renderiza el contenido de la subpágina seleccionada */}
      </div>
    </div>
  );
}