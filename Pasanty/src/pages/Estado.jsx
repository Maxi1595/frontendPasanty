import { useState, useEffect } from "react";
import { getEstado } from "../api/postularseApi";
import { Box } from "@mui/material"

const Estado = () => {

    const [postulaciones, setPostulaciones] = useState([]);

    useEffect(() => {
        getEstado().then(data => {
            setPostulaciones(data.data);
            console.log(data.data);
        })
    }, [])

    return (
        <>
            <Box className="">
                <Box className="flex justify-center text-2xl m-3 p-4 bg-gray-100 rounded">
                    <h1>Estado de tus postulaciones</h1> <br />
                </Box>
                    <p className="text-lg m-auto">Se veran verdes si fuiste aceptado a alguna o rojas si fuiste rechazado</p>
                <Box className="flex flex-col m-auto w-[85%] h-92 border rounded">
                    <Box className="flex flex-row justify-between bg-gray-200 border rounded px-2">
                        <p>Nombre</p>
                        <p>Descripcion</p>
                        <p>Estado</p>
                    </Box>
                    {postulaciones?.map((p) => (
                        <Box className={`flex flex-row justify-between px-2 py-1 border-b ${p.estado === "Aceptado"
                                ? "bg-green-200"
                                : p.estado === "Rechazado"
                                    ? "bg-red-100"
                                    : "bg-white"
                            }`} key={p.id}>
                            <p>{p.vacante.titulo}</p>
                            <p className="w-92 line-clamp-2">{p.vacante.descripcion}</p>
                            <p>{p.estado}</p>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default Estado;