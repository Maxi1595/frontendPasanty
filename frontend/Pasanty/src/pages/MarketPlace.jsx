import { useState, useEffect } from "react"
import { getPasantes } from "../api/pasantesApi";
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, CardActions } from "@mui/material"

const MarketPlace = () => {

    const [pasantes, setPasantes] = useState([]);

    useEffect(() => {
        getPasantes().then(data => {
            setPasantes(data);
        });
    }, [])

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
                        {/* Aquí tus controles de filtro */}
                    </div>

                    {/* Cards */}
                    <div className="p-4">
                        <div className="flex flex-wrap gap-4 justify-start">
                            <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                                {pasantes.map((p) => (
                                    <Card className="flex flex-col text-center justify-center items-center gap-2 w-[30%]" key={p.id}>
                                        {/* AQUI VA LA PREVISUALIZACION DEL CV (AUN NO TENEMOS ESO)
                                        <CardMedia className="h-20" /> 
                                        */}
                                        <CardContent>
                                            <h1>{p.usuario.nombre}</h1>
                                            <p>{p.especialidad}</p>
                                        </CardContent>
                                        <CardActions>
                                            <Link className="text-blue-500" to={`/pasantes/${p.id}`}>Ver mas</Link>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketPlace