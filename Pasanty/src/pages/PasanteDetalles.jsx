import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPasanteById } from "../api/pasantesApi";
import { getPerfilPasanteById } from "../api/perfilApi";
import { Box } from "@mui/material"

import ViewCv from "../components/ViewCV"
import MyCV from "../components/MyCV";

import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const PasanteDetalles = () => {

    const { id } = useParams();
    const [pasante, setPasante] = useState(null);
    const [perfil, setPerfil] = useState({});

    const { user } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {

        setUsuario(user);

        getPasanteById(id).then(data => {
            console.log(data);
            setPasante(data);
        });

        getPerfilPasanteById(id).then(data => {
            console.log(data)
            setPerfil(data);
        })
    }, [])

    console.log(usuario);


    return (
        <>
            {/* FILA 1 */}
            <Box className="flex flex-row gap-4 p-6 w-full">
                <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                    {pasante && (
                        <div>
                            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                                {pasante.usuario.nombre?.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-xl font-bold">{pasante.usuario.nombre}</p>
                            <p className="text-gray-500">{pasante.usuario.correo}</p>
                            <p className="text-gray-500">{pasante.especialidad}</p>
                        </div>
                    )}
                </div>
                {perfil && (
                    <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                        <h2 className="text-lg font-semibold mb-2">Sobre mí</h2>
                        <p className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>{perfil.descripcion}</p>
                    </div>
                )}
            </Box>

            {/* FILA 2 - secciones */}
            {perfil && (
                <Box className="flex flex-row gap-4 px-6 w-full">
                    {perfil.seccion1Titulo && (
                        <Box className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                            <h3>{perfil.seccion1Titulo}</h3>
                            <p>{perfil.seccion1Contenido}</p>
                        </Box>
                    )}
                    {perfil.seccion2Titulo && (
                        <Box className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                            <h3>{perfil.seccion2Titulo}</h3>
                            <p>{perfil.seccion2Contenido}</p>
                        </Box>
                    )}
                    {perfil.seccion3Titulo && (
                        <Box className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                            <h3>{perfil.seccion3Titulo}</h3>
                            <p>{perfil.seccion3Contenido}</p>
                        </Box>
                    )}
                </Box>
            )}

            {/* CV */}
            <Box className="h-screen w-full">
                {!pasante ? (
                    <p>Cargando...</p>
                ) : !pasante.cv ? (
                    <p>Este pasante aún no subió su CV</p>
                ) : String(pasante.usuarioId) === String(usuario.user.id) ? (
                    <ViewCv esPropio={true} />
                ) : usuario.user.rol === 5 ? (
                    <ViewCv esPropio={false} id={id} />
                ) : (
                    <p>No tenés permiso para ver este CV</p>
                )}
            </Box>
        </>
    );
}

export default PasanteDetalles;