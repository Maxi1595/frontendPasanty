import { useState, useEffect } from "react"
import { getPasantes } from "../api/pasantesApi";
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, CardActions } from "@mui/material"


const MarketPlace = () => {

    const [pasantes, setPasantes] = useState([]);
    const [filtro, setFiltro] = useState({ especialidad: [] });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const toggleFiltros = (filt, valor) => {
        setFiltro((prev) => ({
            ...prev,
            [filt]: prev[filt].includes(valor)
                ? prev[filt].filter((item) => item !== valor)
                : [...prev[filt], valor],
        }))
    }

    const pasantesFiltro = pasantes.filter((pasantes) => {
        const matchEspecialidad = filtro.especialidad.length === 0 || filtro.especialidad.includes(pasantes.especialidad)
        return matchEspecialidad
    })

    useEffect(() => {
        getPasantes().then(req => {
            setPasantes(req?.data);
            console.log(req?.data)
        });

        setCurrentPage(1);
    }, [filtro])

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    const pasantesPaginados = pasantesFiltro.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(pasantesFiltro.length / itemsPerPage);

console.log(pasantes)

    return (
        <>
            <div className="grid grid-rows-[auto_1fr] h-screen gap-4 p-4">
                {/* FILA 1: Título */}
                <div className="bg-gray-100 p-4 rounded shadow text-center text-2xl font-semibold">
                    Busca a tu pasante
                </div>

                {/* FILA 2: Filtros + Cards */}
                <div className="grid grid-cols-[25%_75%] gap-4">
                    {/* Filtros */}
                    <div className="bg-gray-50 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Filtros</h2>
                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "ingenieria_informatica")} />
                            <span>Ingeniería Informática</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_en_Sistemas")} />
                            <span>Ingeniería en Sistemas</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Electrónica")} />
                            <span>Ingeniería Electrónica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "diseño_grafico")} />
                            <span>Diseño Gráfico</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "marketing")} />
                            <span>Marketing</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Industrial")} />
                            <span>Ingeniería Industrial</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Civil")} />
                            <span>Ingeniería Civil</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Mecánica")} />
                            <span>Ingeniería Mecánica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Eléctrica")} />
                            <span>Ingeniería Eléctrica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Química")} />
                            <span>Ingeniería Química</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Ambiental")} />
                            <span>Ingeniería Ambiental</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_en_Energías_Renovables")} />
                            <span>Ingeniería en Energías Renovables</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ingeniería_Biomédica")} />
                            <span>Ingeniería Biomédica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ciencias_de_la_Computación")} />
                            <span>Ciencias de la Computación</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Desarrollo_de_Software")} />
                            <span>Desarrollo de Software</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Análisis_de_Sistemas")} />
                            <span>Análisis de Sistemas</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ciberseguridad")} />
                            <span>Ciberseguridad</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Inteligencia_Artificial")} />
                            <span>Inteligencia Artificial</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Ciencia_de_Datos")} />
                            <span>Ciencia de Datos</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Robótica")} />
                            <span>Robótica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Diseño_Gráfico")} />
                            <span>Diseño Gráfico</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Diseño_Industrial")} />
                            <span>Diseño Industrial</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Diseño_de_Interiores")} />
                            <span>Diseño de Interiores</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("especialidad", "Diseño_UX/UI")} />
                            <span>Diseño UX/UI</span>
                        </label>

                    </div>

                    {/* Cards */}
                    <div className="p-4 items-center justify-center">
                        <div className="flex flex-wrap gap-4 justify-start">
                            <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                                {pasantesPaginados === 0 ? (
                                    <div>
                                        <p>No se ha encontrado pasantes, disponibles</p>
                                    </div>
                                ) : (
                                    pasantesPaginados.map((p) => (
                                        <Card className="flex flex-col text-center justify-center items-center gap-2 w-[30%]" key={p.id}>
                                            {/* AQUI VA LA PREVISUALIZACION DEL CV (AUN NO TENEMOS ESO)
                                        <CardMedia classNae="h-20" /> 
                                        */}
                                            <CardContent>
                                                <h1>{p.usuario.nombre}</h1>
                                                <p className="pt-2 font-bold">{p.especialidad}</p>
                                            </CardContent>
                                            <CardActions>
                                                <Link className="text-blue-500" to={`/pasantes/${p.id}`}>Ver mas</Link>
                                            </CardActions>
                                        </Card>
                                    ))
                                )
                                }
                            </Box>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                <button
                                    key={num}
                                    onClick={() => setCurrentPage(num)}
                                    className={`px-3 py-1 rounded ${currentPage === num ? "bg-blue-500 text-white" : "bg-gray-300"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketPlace