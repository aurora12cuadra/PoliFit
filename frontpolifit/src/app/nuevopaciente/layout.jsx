// /app/nuevopaciente/layout.jsx
import SubMenu from './components/SubMenu';

export default function NuevoPacienteLayout({ children }) {
  return (
    <div>
      <SubMenu />
      <div className="p-4">
        {children} {/* Renderiza el contenido de la subpágina seleccionada */}
      </div>
    </div>
  );
}