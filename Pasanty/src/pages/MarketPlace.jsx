import { useState, useEffect } from "react"
import { getPasantes } from "../api/pasantesApi";
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, CardActions } from "@mui/material"
import { ESPECIALIDADES } from "../constants/Especialidades"
import Filtro from "../components/Filtros"

const MarketPlace = () => {

    const [pasantes, setPasantes] = useState([]);
    const [filtro, setFiltro] = useState({ especialidad: [] });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const toggleFiltros = (valor) => {
        setFiltro((prev) => ({
            ...prev,
            especialidad: prev.especialidad.includes(valor)
                ? prev.especialidad.filter((item) => item !== valor)
                : [...prev.especialidad, valor],
        }))
        console.log(valor);
    }

    const pasantesFiltro = pasantes.filter((pasantes) => {
        const matchEspecialidad = filtro.especialidad.length === 0 || filtro.especialidad.includes(pasantes.especialidad)
        return matchEspecialidad
    })

    useEffect(() => {
        getPasantes().then(req => {
            setPasantes(req);
            console.log(req)
            console.log(typeof pasantes);
        });

        // setCurrentPage(1);
    }, [
        // filtro
    ])

    // const indexOfLast = currentPage * itemsPerPage;
    // const indexOfFirst = indexOfLast - itemsPerPage;

    // const pasantesPaginados = pasantesFiltro.slice(indexOfFirst, indexOfLast);

    // const totalPages = Math.ceil(pasantesFiltro.length / itemsPerPage);

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

                        <Filtro
                            opciones={ESPECIALIDADES}
                            seleccionados={filtro.especialidad}
                            onToggle={toggleFiltros}
                        />
                    </div>

                    {/* Cards */}
                    <div className="p-4 items-center justify-center">
                        <div className="flex flex-wrap gap-4 justify-start">
                            <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                                {pasantes === 0 ? (
                                    <div>
                                        <p>No se ha encontrado pasantes, disponibles</p>
                                    </div>
                                ) : (
                                    pasantesFiltro.map((p) => (
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
                        {/* <div className="flex gap-2 mt-4">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketPlace