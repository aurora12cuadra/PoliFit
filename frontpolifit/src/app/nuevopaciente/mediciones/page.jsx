"use client";
import SubMenu from "../components/SubMenu";

function Mediciones() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Nuevo Paciente</h1>
      <SubMenu />
      <h2 className="text-2xl font-semibold mb-4">Mediciones</h2>

      {/* Pliegues */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl text-center font-semibold mb-4">Pliegues</h3>
        <h4 className="text-lg font-semibold mb-2">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Subescapular",
            "Tríceps",
            "Bíceps",
            "Cresta Ilíaca",
            "Supraspinal",
            "Abdominal",
            "Muslo Frontal",
            "Pantorrilla Medial",
            "Axilar Medial",
            "Pectoral",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1">{label}</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Perímetros */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6" style={{ backgroundColor: '#11404E' }}>
        <h3 className="text-xl text-center font-semibold mb-4 text-white">Perímetros</h3>
        <h4 className="text-lg font-semibold mb-2 text-white">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Cefálico",
            "Cuello",
            "Mitad del brazo relajado",
            "Mitad del brazo contraído",
            "Antebrazo",
            "Muñeca",
            "Mesosternal",
            "Umbilical",
            "Cintura",
            "Cadera",
            "Muslo 1 cm bajo la cresta ilíaca",
            "Muslo medio",
            "Pantorrilla",
            "Tobillo",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1 text-white">{label}</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Diámetros */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h3 className="text-xl text-center font-semibold mb-4">Diámetros</h3>
        <h4 className="text-lg font-semibold mb-2">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Biacromial",
            "Biliocrestal",
            "Longitud del pie",
            "Transverso del tórax",
            "Anteroposterior del tórax",
            "Húmero",
            "Biestiloidea de la muñeca",
            "Fémur",
            "Bimaleolar",
            "Transverso del pie",
            "Longitud mano",
            "Transverso de la mano",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1">{label}</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Bioimpedancia */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6" style={{ backgroundColor: '#11404E' }}>
        <h3 className="text-xl text-center font-semibold mb-4 text-white">Bioimpedancia</h3>
        <h4 className="text-lg font-semibold mb-2 text-white">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Grasa total",
            "Grasa en sección superior",
            "Grasa en sección inferior",
            "Grasa visceral",
            "Edad Metabólica",
            "Masa libre de grasa",
            "Masa Muscular",
            "Peso óseo",
            "Agua Corporal",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1 text-white">{label}</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores Bioquímicos */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <h3 className="text-xl text-center font-semibold mb-4">Indicadores Bioquímicos</h3>
        <h4 className="text-lg font-semibold mb-2">Parámetros</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Hemoglobina",
            "Glucosa",
            "Colesterol",
            "Triglicéridos",
            "Ácido Úrico",
            "Urea",
            "Albumina",
            "Otros",
          ].map((label) => (
            <div key={label}>
              <label className="block font-medium mb-1">{label}</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mediciones;
