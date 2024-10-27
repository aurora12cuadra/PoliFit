// /pages/nuevopaciente/index.jsx
import SubMenu from './components/SubMenu';
import { Outlet } from 'react-router-dom';

const NuevoPaciente = () => {
  return (
    <div>
      <SubMenu />
      {/* Aquí renderizas el contenido de las subpáginas */}
      <Outlet />
    </div>
  );
};

export default NuevoPaciente;