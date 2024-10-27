// /app/nuevopaciente/page.jsx
import { redirect } from 'next/navigation';

export default function NuevoPaciente() {
  redirect('/nuevopaciente/datos-personales'); // Redirige automáticamente a la subpágina de Datos Personales
}
