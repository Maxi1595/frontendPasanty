// components/Paginacion.jsx
const Paginacion = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 mt-4 justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded ${
            currentPage === num ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Paginacion;