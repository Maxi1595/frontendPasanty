import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPasanteById } from "../api/pasantesApi";
import { Box } from "@mui/material"

import ViewCv from "../components/ViewCV"
import MyCV from "../components/MyCV";

import {useContext} from "react";
import { AuthContext } from "../contexts/authContext";

const PasanteDetalles = () => {

    const { id } = useParams();
    const [pasante, setPasante] = useState(null);

    const {user} = useContext(AuthContext);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {

        setUsuario(user);

        getPasanteById(id).then(data => {
            console.log(data);
            setPasante(data);
        });
    }, [])

    console.log(usuario);


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
                {!pasante ? (
                    <p>Cargando...</p>
                ) : !pasante.cv ? (
                    <p>Este pasante aún no subió su CV</p>
                ) : String(pasante.usuarioId) === String(usuario.user.id) ? (
                    <Box className="w-[65%] h-screen">
                        <ViewCv esPropio={true} />
                    </Box>
                ) : usuario.user.rol === 5 ? (
                    <Box className="w-[65%] h-screen">
                        <ViewCv esPropio={false} id={id} />
                    </Box>
                ) : (
                    <p>No tenés permiso para ver este CV</p>
                )}
                {/* {usuario.cv === null ? (
                    <Box className="w-[65%] h-screen">
                        No puede ver el CV, solo empresas y el propio usuario pueden ver el CV
                    </Box>
                ) : usuario.rol === 5 ? (
                    <Box className="w-[65%] h-screen">
                        <ViewCv esPropio={false} id/>
                        <p>entro</p>
                    </Box>
                ) : (
                    <Box className="w-[65%] h-screen">
                        <ViewCv esPropio={true} />
                    </Box>
                )} */}
            </Box>
        </>
    )
}

export default PasanteDetalles;