// Tag.jsx
function Tag({ nombre, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
            {nombre}
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    aria-label={`Eliminar ${nombre}`}
                    className="text-green-500 hover:text-green-800 font-bold leading-none ml-1"
                >
                    ×
                </button>
            )}
        </span>
    );
}

export default Tag;