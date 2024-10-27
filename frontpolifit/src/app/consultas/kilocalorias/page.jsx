"use client";

function Kilocalorias() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Nuevo Paciente</h1>
      <h2 className="text-2xl font-semibold mb-4">Kilocalorías</h2>

      {/* Kilocalorías Form */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">IMC (Índice de Masa Corporal)</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="00.00" />
          </div>

          <div>
            <label className="block font-medium mb-1">Objetivo</label>
            <select className="w-full p-2 border rounded-md">
              <option value="Mantener peso">Mantener peso</option>
              <option value="Bajar de peso">Bajar de peso</option>
              <option value="Subir de peso">Subir de peso</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Fórmula</label>
            <select className="w-full p-2 border rounded-md">
              <option value="Harris-Benedict">Harris-Benedict</option>
              <option value="Mifflin-St Jeor">Mifflin-St Jeor</option>
              <option value="Katch-McArdle">Katch-McArdle</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">TMB (Tasa Metabólica Basal)</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="0000.00" />
          </div>

          <div>
            <label className="block font-medium mb-1">AF (Actividad Física)</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="0000.00" />
          </div>

          <div>
            <label className="block font-medium mb-1">ETA (Energía Total Asignada)</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="0000.00" />
          </div>

          <div>
            <label className="block font-medium mb-1">Kcal</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="0000.00 kcal" />
          </div>

          <div>
            <label className="block font-medium mb-1">Distribución de kcal</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">HC:</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="00.00 %" />
              </div>
              <div>
                <label className="block font-medium mb-1">PROT:</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="00.00 %" />
              </div>
              <div>
                <label className="block font-medium mb-1">LP:</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="00.00 %" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kilocalorias;
