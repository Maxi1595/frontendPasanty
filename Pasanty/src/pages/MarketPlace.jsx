import { useState, useEffect } from "react"
import { getPasantes } from "../api/pasantesApi";
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, CardActions } from "@mui/material"
import { ESPECIALIDADES } from "../constants/Especialidades"
import { ESTADOS_ACADEMICOS } from "../constants/EstadosAcademicos";
import Filtro from "../components/Filtros"
import Paginacion from "../components/Paginacion";
import Avatar from "../components/Avatar";
import Tag from "../components/Tag";

const MarketPlace = () => {

    const [pasantes, setPasantes] = useState([]);
    const [filtro, setFiltro] = useState({
        especialidad: [],
        estadoAcademico: []
    });
    const [buscador, setBuscador] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [orden, setOrden] = useState("");

    const toggleFiltros = (campo, valor) => {
        setFiltro((prev) => ({
            ...prev,
            [campo]: prev[campo].includes(valor)
                ? prev[campo].filter((item) => item !== valor)
                : [...prev[campo], valor],
        }))
        console.log(valor);
    }

    const pasantesFiltro = pasantes.filter((pasantes) => {
        const matchNombre = pasantes.usuario.nombre.toLowerCase().includes(buscador.toLowerCase());
        const matchUbicacion = (pasantes.direccion ?? "").toLowerCase().includes(ubicacion.toLowerCase());
        const matchEspecialidad = filtro.especialidad.length === 0 || filtro.especialidad.includes(pasantes.especialidad)
        const matchEstado = filtro.estadoAcademico.length === 0 || filtro.estadoAcademico.includes(pasantes.estadoAcademico);
        return matchNombre && matchUbicacion && matchEspecialidad && matchEstado;
    })

    const pasantesOrden = [...pasantesFiltro].sort((a, b) => {
        if (orden === "az") return a.usuario.nombre.localeCompare(b.usuario.nombre);
        if (orden === "za") return b.usuario.nombre.localeCompare(a.usuario.nombre);
        return 0;
    })


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(pasantesOrden.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const pasantesPagina = pasantesOrden.slice(
        indexOfFirstItem,
        indexOfLastItem
    );


    useEffect(() => {
        getPasantes().then(req => {
            setPasantes(req);
            console.log(req)
            console.log(typeof pasantes);
        });
    }, [])

    console.log(pasantes)

    return (
        <>
            <div className="grid grid-rows-[auto_1fr] h-screen gap-4 p-4">
                {/* FILA 1: Título */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Buscá a tu pasante</h1>
                    <p className="text-gray-500 text-base mt-1">Filtrá por especialidad, año académico o habilidades y contactá directamente por mail.</p>
                </div>

                {/* FILA 2: Filtros + Cards */}
                <div className="grid grid-cols-[25%_75%] gap-4">
                    {/* Filtros */}
                    <div className="bg-stone-50 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Filtros</h2>
                        <input
                            value={buscador}
                            onChange={(e) => setBuscador(e.target.value)}
                            placeholder="buscar por nombre..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                        />
                        <input
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                            placeholder="buscar por direccion..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                        />
                        <p className="p-2">Orden de las tarjetas</p>
                        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                            <option value="">Sin orden</option>
                            <option value="az">A → Z</option>
                            <option value="za">Z → A</option>
                        </select>
                        <p className="p-4">Especialidad </p>
                        <Filtro
                            opciones={ESPECIALIDADES}
                            seleccionados={filtro.especialidad}
                            onToggle={(valor) => toggleFiltros("especialidad", valor)}
                        />
                        <p className="p-4">Estado academico </p>
                        <Filtro
                            opciones={ESTADOS_ACADEMICOS}
                            seleccionados={filtro.estadoAcademico}
                            onToggle={(valor) => toggleFiltros("estadoAcademico", valor)}
                        />
                    </div>

                    {/* Cards */}
                    <div className="p-4 items-center justify-center w-full">
                        <div className="flex flex-wrap gap-4 justify-start bg-stone-50">
                            <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                                {pasantes === 0 ? (
                                    <div>
                                        <p>No se ha encontrado pasantes, disponibles</p>
                                    </div>
                                ) : (
                                    pasantesPagina.map((p) => {
                                        const especialidad = ESPECIALIDADES.find(e => e.valor === p.especialidad);
                                        const color = especialidad?.color || "border-gray-300 shadow-gray-200";

                                        const tags = p.perfilPasante?.tags
                                            ? p.perfilPasante.tags.split(",").map(tag => tag.trim())
                                            : [];
                                        const tagsVisibles = tags.slice(0, 3);

                                        return (
                                            <Card key={p.id} className={`flex flex-col text-center justify-center items-center gap-2 w-[40%] h-50 shadow-[-6px_4px_6px_-1px_rgba(0,0,0,0.1),_-2px_2px_4px_-1px_rgba(0,0,0,0.06)] border-l-4 ${color}`}>
                                                <CardContent className="flex flex-row items-center justify-around w-full">
                                                    <Avatar id={p.usuarioId} nombre={p.usuario.nombre} />
                                                    <div className="flex flex-col items-start w-1/2 ml-5">
                                                        <h1 className="mt-2">{p.usuario.nombre}</h1>
                                                        <p className="pt-2 font-bold">{p.especialidad.replace(/_/g, " ")}</p>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {tagsVisibles.map((tag) => (
                                                                <Tag key={tag} nombre={tag} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                    {/* {p.perfilPasante.tags.slice(0, 3)} */}
                                                </CardContent>
                                                <CardActions className="flex justify-end items-end w-full">
                                                    <Link className="text-blue-500" to={`/pasantes/${p.id}`}>Ver mas</Link>
                                                </CardActions>
                                            </Card>
                                        );
                                    })
                                )
                                }
                            </Box>
                        </div>
                        <Paginacion
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketPlace