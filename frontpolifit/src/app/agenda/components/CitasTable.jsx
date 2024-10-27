import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button } from "@nextui-org/react";
import { Edit, Trash } from "lucide-react";

function CitasTable({ citas, handleOpenModal, handleDelete }) {
  return (
    <Table aria-label="Tabla de citas" classNames={{ wrapper: "min-h-[400px]", th: "bg-gray-50 text-gray-600 py-3", td: "py-4" }}>
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>TELÉFONO</TableColumn>
        <TableColumn>FECHA</TableColumn>
        <TableColumn>HORA</TableColumn>
        <TableColumn align="center">ACCIONES</TableColumn>
      </TableHeader>
      <TableBody>
        {citas.map((cita) => (
          <TableRow key={cita.id}>
            <TableCell>{cita.nombre}</TableCell>
            <TableCell>
              <a href={`mailto:${cita.email}`} className="text-blue-600 hover:underline">{cita.email}</a>
            </TableCell>
            <TableCell>{cita.telefono}</TableCell>
            <TableCell>{new Date(cita.fecha).toLocaleDateString()}</TableCell>
            <TableCell>{cita.hora}</TableCell>
            <TableCell>
              <div className="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  startContent={<Edit size={16} />}
                  onClick={() => handleOpenModal(cita)}
                  className="border border-[#11404E] text-[#11404E] rounded-md transition-colors duration-200 hover:bg-[#11404E] hover:text-white"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  color="danger"
                  startContent={<Trash size={16} />}
                  onClick={() => handleDelete(cita)}
                  className="border border-red-500 text-red-500 rounded-md transition-colors duration-200 hover:bg-red-500 hover:text-white"
                >
                  Eliminar
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CitasTable;
