import { useState, useEffect } from "react";
import { getEstado } from "../api/postularseApi";
import { Link } from "react-router-dom";

const Estado = () => {
    const [postulaciones, setPostulaciones] = useState([]);
    const [filtro, setFiltro] = useState("Todas");
    const [buscador, setBuscador] = useState("");

    useEffect(() => {
        getEstado().then(data => {
            setPostulaciones(data);
        })
    }, [])

    const conteo = {
        todas: postulaciones.length,
        pendientes: postulaciones.filter(p => p.estado === "pendiente").length,
        aceptadas: postulaciones.filter(p => p.estado === "Aceptado").length,
        rechazadas: postulaciones.filter(p => p.estado === "Rechazado").length,
    }

    const postulacionesFiltro = postulaciones
        .filter(p => filtro === "Todas" || p.estado === filtro)
        .filter(p => (p.vacante.titulo ?? "").toLowerCase().includes(buscador.toLowerCase()));

    const estadoBadge = (estado) => {
        if (estado === "Aceptado") return "bg-green-100 text-green-700";
        if (estado === "Rechazado") return "bg-red-100 text-red-600";
        return "bg-blue-100 text-blue-500";
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Tus postulaciones</h1>
                <p className="text-gray-500 text-base mt-1">Filtrá por estado o buscá por nombre de la vacante.</p>
            </div>

            <div className="flex flex-row gap-10">
                {/* SIDEBAR - filtros por estado */}
                <div className="flex flex-col gap-2 w-100 flex-shrink-0">
                    {[
                        { label: "Todas", valor: "Todas", count: conteo.todas, color: "text-gray-800" },
                        { label: "Pendientes", valor: "pendiente", count: conteo.pendientes, color: "text-blue-500" },
                        { label: "Aceptadas", valor: "Aceptado", count: conteo.aceptadas, color: "text-green-600" },
                        { label: "Rechazadas", valor: "Rechazado", count: conteo.rechazadas, color: "text-red-500" },
                    ].map((item) => (
                        <button
                            key={item.valor}
                            onClick={() => setFiltro(item.valor)}
                            className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                                filtro === item.valor
                                    ? "bg-green-500 text-white border-green-600"
                                    : "bg-white border-gray-100 hover:bg-gray-50"
                            }`}
                        >
                            <p className={`text-2xl font-bold ${filtro === item.valor ? "text-white" : item.color}`}>
                                {item.count}
                            </p>
                            <p className={`text-xs ${filtro === item.valor ? "text-gray-300" : "text-gray-500"}`}>
                                {item.label}
                            </p>
                        </button>
                    ))}
                </div>

                {/* LISTA */}
                <div className="flex-1 w-100">
                    {/* Buscador */}
                    <input
                        value={buscador}
                        onChange={(e) => setBuscador(e.target.value)}
                        placeholder="Buscar por nombre de la vacante..."
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-green-500"
                    />

                    {/* Postulaciones */}
                    <div className="flex flex-col gap-3 overflow-y-auto h-50">
                        {postulacionesFiltro.map((p) => (
                            <div
                                key={p.id}
                                className="flex flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex flex-row items-center gap-4">
                                    <div className="w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs flex-shrink-0">
                                        {p.vacante.titulo?.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{p.vacante.puesto || p.vacante.titulo.replace(/_/g, " ")}</p>
                                        <p className="text-xs text-gray-400">
                                            {p.vacante.empresa?.usuario?.nombre} · {p.vacante.titulo.replace(/_/g, " ")} · {p.vacante.modalidad}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estadoBadge(p.estado)}`}>
                                    {p.estado === "pendiente" ? "Pendiente" : p.estado}
                                </span>
                            </div>
                        ))}

                        {postulacionesFiltro.length === 0 && (
                            <p className="text-gray-400 text-sm text-center py-8">No hay postulaciones para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Estado;