
"use client";
import SubMenu from './nuevopaciente/components/SubMenu';
import dynamic from 'next/dynamic';

const DatosPersonales = dynamic(() => import('./nuevopaciente/page'), { ssr: false });

const NuevoPaciente = () => {
  return (
    <div>
      <SubMenu />
      <DatosPersonales/>
    </div>
  );
};

export default NuevoPaciente;
