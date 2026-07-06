// components/FiltroChips.jsx

const Filtro = ({ opciones, seleccionados, onToggle }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {opciones.map((op) => {
        const activo = seleccionados.includes(op.valor);
    
        return (
          <button
            key={op.valor}
            onClick={() => {
              console.log("clickeado:", op.valor),
              onToggle(op.valor)
            }}
            className={`px-3 py-1 rounded-full border text-sm transition
              ${activo
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {op.etiqueta}
          </button>
        );
      })}
    </div>
  );
};

export default Filtro;