import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostulaciones } from "../api/postularseApi";
import { Box } from "@mui/material"
import Filtro from "../components/Filtros"
import { ESTADOS_ACADEMICOS } from "../constants/EstadosAcademicos";
import Avatar from "../components/Avatar"

const Postulaciones = () => {
    //  const token = localStorage.getItem("token");
    const { id } = useParams();
    const [postulantes, setPostulantes] = useState([]);

    const [filtroVacante, setFiltroVacante] = useState("");

    const [filtro, setFiltro] = useState({
        estadoAcademico: [],
        cv: "",
        coincidencia: "",
        ordenFecha: ""

    });

    const toggleFiltros = (campo, valor) => {
        setFiltro((prev) => ({
            ...prev,
            [campo]: prev[campo].includes(valor)
                ? prev[campo].filter((item) => item !== valor)
                : [...prev[campo], valor],
        }))
    }

    const vacantesUnicas = [...new Set(postulantes.map(p => p.vacante.titulo))]

    const postulanteFiltro = postulantes
        .filter(p => {
            const matchVacante = filtroVacante === "" || p.vacante.titulo === filtroVacante;
            const matchEstado = filtro.estadoAcademico.length === 0 || filtro.estadoAcademico.includes(p.pasante.estadoAcademico);
            const matchCv = filtro.cv === "" || (filtro.cv === "si" ? !!p.pasante.cv : !p.pasante.cv);
            const matchCoincidencia = filtro.coincidencia === "" || (filtro.coincidencia === "si" ? p.pasante.especialidad === p.vacante.titulo : p.pasante.especialidad !== p.vacante.titulo);
            return matchVacante && matchEstado && matchCv && matchCoincidencia;
        })
        .sort((a, b) => {
            if (filtro.ordenFecha === "reciente") return new Date(b.fechaPost) - new Date(a.fechaPost);
            if (filtro.ordenFecha === "antigua") return new Date(a.fechaPost) - new Date(b.fechaPost);
            return 0;
        });
    useEffect(() => {
        getPostulaciones().then((data) => {
            console.log(data);
            setPostulantes(data);
        });
    }, [id]);

    return (
        <>
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Postulaciones a tus vacantes</h1>
                    <p className="text-gray-500 text-base mt-1">Revisá los candidatos y aceptá o rechazá desde su perfil.</p>
                </div>

                <div className="flex flex-row gap-6">
                    {/* FILTROS */}
                    <div className="w-100 flex-shrink-0">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Filtros</p>

                            <div className="flex flex-col gap-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Vacante</p>
                                    <select value={filtroVacante} onChange={(e) => setFiltroVacante(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                                        <option value="">Todas las vacantes</option>
                                        {vacantesUnicas.map(titulo => (
                                            <option key={titulo} value={titulo}>{titulo}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Con CV</p>
                                    <select value={filtro.cv} onChange={(e) => setFiltro({ ...filtro, cv: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                                        <option value="">Todos</option>
                                        <option value="si">Con CV</option>
                                        <option value="no">Sin CV</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Coincidencia de título</p>
                                    <select value={filtro.coincidencia} onChange={(e) => setFiltro({ ...filtro, coincidencia: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                                        <option value="">Todos</option>
                                        <option value="si">Coincide</option>
                                        <option value="no">No coincide</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Ordenar por fecha</p>
                                    <select value={filtro.ordenFecha} onChange={(e) => setFiltro({ ...filtro, ordenFecha: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                                        <option value="">Sin orden</option>
                                        <option value="reciente">Más recientes</option>
                                        <option value="antigua">Más antiguas</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 mt-2">Año académico</p>
                                    <Filtro
                                        opciones={ESTADOS_ACADEMICOS}
                                        seleccionados={filtro.estadoAcademico}
                                        onToggle={(valor) => toggleFiltros("estadoAcademico", valor)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LISTA */}
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-3">{postulanteFiltro.length} postulación{postulanteFiltro.length !== 1 ? 'es' : ''} encontrada{postulanteFiltro.length !== 1 ? 's' : ''}</p>

                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[600px] w-200">
                            {postulanteFiltro.map((p) => (
                                <div key={p.id} className="flex flex-row items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-row items-center gap-4">
                                        <Avatar id={p.pasante.usuarioId}></Avatar>
                                        <div>
                                            <p className="font-semibold text-gray-900">{p.pasante?.usuario?.nombre}</p>
                                            <p className="text-xs text-gray-500">
                                                {p.vacante.titulo} · {p.pasante?.especialidad} · {p.vacante.titulo}
                                                {p.pasante?.cv ? " ✓ Tiene CV" : ""}
                                            </p>
                                            <p className="text-xs text-gray-400">Postuló el {new Date(p.fechaPost).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Link
                                        className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium h-10 w-30"
                                        to={`/postulante/${p.id}`}
                                    >
                                        Ver candidato
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Postulaciones;