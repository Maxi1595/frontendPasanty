import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPasanteById } from "../api/pasantesApi";
import { Box } from "@mui/material"

import ViewCv from "../components/ViewCV"
import MyCV from "../components/MyCV";

const PasanteDetalles = () => {

    const { id } = useParams();
    const [pasante, setPasante] = useState(null);

    const [usuario, setUsuario] = useState({});

    useEffect(() => {

        const user = localStorage.getItem("user");
        setUsuario(user);
        
        getPasanteById(id).then(data => {
            console.log(data);
            setPasante(data);
        });
    }, [id])

    return (
        <>
            <Box className="flex flex-row justify-around w-full p-5">
                <Box className="flex flex-col justify-center items-center bg-gray-100 rounded w-[30%] h-screen m-4 p-2" >

                    {pasante && (
                        <div key={pasante.id}>
                            <h1>{pasante.usuario.nombre}</h1>
                            <p>{pasante.especialidad}</p>
                            <p>Si quiere hablar con el pasante en privado, envie un correo al siguiente mail:</p>
                            <p>{pasante.usuario.correo}</p>
                        </div>
                    )}

                </Box>
                {/* {usuario.rol === 1 ? (
                    <Box className="w-[65%] h-screen">
                        No puede ver el CV, solo empresas y el propio usuario pueden ver el CV
                    </Box>
                ) : usuario.rol === 5 ? (
                    <Box className="w-[65%] h-screen">
                        <ViewCv></ViewCv>
                    </Box>
                ) : (
                    <Box className="w-[65%] h-screen">
                        <MyCV></MyCV>
                    </Box>
                )} */}
            </Box>
        </>
    )
}

export default PasanteDetalles;