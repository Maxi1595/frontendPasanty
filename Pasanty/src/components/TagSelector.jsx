// TagSelector.jsx
import { useState } from "react";
import { HABILIDADES_TECNICAS } from "../constants/HabilidadesTecnicas";
import Tag from "./Tag";

const MAX_TAGS = 10;

function TagSelector({ tags = [], onChange }) {
    const [busqueda, setBusqueda] = useState("");

    const agregarTag = (tag) => {
        if (tags.length >= MAX_TAGS) return;
        if (tags.includes(tag.valor)) return;
        onChange([...tags, tag.valor]);
        setBusqueda("");
    };

    const eliminarTag = (tag) => {
        onChange(tags.filter((tagActual) => tagActual !== tag));
    };

    const resultados = HABILIDADES_TECNICAS.filter((tag) => {
        const coincideBusqueda = tag.etiqueta.toLowerCase().includes(busqueda.toLowerCase());
        const noSeleccionado = !tags.includes(tag.valor);
        return coincideBusqueda && noSeleccionado;
    });

    return (
        <div className="flex flex-col gap-2">

            {/* BUSCADOR */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:border-green-400 transition-colors">
                <input
                    type="text"
                    placeholder="Buscar habilidad..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    disabled={tags.length >= MAX_TAGS}
                    className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 disabled:text-gray-300"
                />
                <span className="text-xs text-gray-400 flex-shrink-0">
                    {tags.length}/{MAX_TAGS}
                </span>
            </div>

            {/* TAGS SELECCIONADOS */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tagValor) => {
                        const tag = HABILIDADES_TECNICAS.find(h => h.valor === tagValor);
                        if (!tag) return null;
                        return (
                            <Tag
                                key={tag.valor}
                                nombre={tag.etiqueta}
                                onRemove={() => eliminarTag(tag.valor)}
                            />
                        );
                    })}
                </div>
            )}

            {/* RESULTADOS */}
            {busqueda && tags.length < MAX_TAGS && (
                <div className="flex flex-col border border-gray-100 rounded-lg bg-white shadow-sm overflow-hidden">
                    {resultados.length > 0 ? (
                        resultados.slice(0, 8).map((tag) => (
                            <button
                                type="button"
                                key={tag.valor}
                                onClick={() => agregarTag(tag)}
                                className="text-left text-sm px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors text-gray-700"
                            >
                                {tag.etiqueta}
                            </button>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 px-4 py-3">No se encontraron habilidades.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default TagSelector;