import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { getPostulacionById, patchEstado } from "../api/postularseApi";
import { useNavigate } from "react-router-dom";
import ViewCVPostulante from "../components/ViewCVPostulante";

const PostulanteDetalles = () => {

    const { id } = useParams();
    const [postulacion, setPostulacion] = useState(null);
    const [estado, setEstado] = useState({});
    const navegate = useNavigate();

    useEffect(() => {
        getPostulacionById(id).then(data => {
            console.log(data);
            setPostulacion(data);
        });
    }, [id])

    const handleEstado = (nuevoEstado) => {
        setEstado(nuevoEstado);
        console.log(nuevoEstado);
        patchEstado(id, nuevoEstado);
        navegate("/postulaciones")
    }

    return (
        <>
            {postulacion && (
                <>
                    {/* FILA 1 */}
                    <Box className="flex flex-row gap-4 p-6 w-full">
                        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                                {postulacion.pasante.usuario.nombre?.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-xl font-bold">{postulacion.pasante.usuario.nombre}</p>
                            <p className="text-gray-500">{postulacion.pasante.usuario.correo}</p>
                            <p className="text-gray-500">{postulacion.pasante.especialidad}</p>
                        </div>

                        {postulacion.pasante.perfilPasante && (
                            <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                                <h2 className="text-lg font-semibold mb-2">Sobre mí</h2>
                                <p className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>
                                    {postulacion.pasante.perfilPasante.descripcion}
                                </p>
                            </div>
                        )}
                    </Box>

                    {/* FILA 2 - secciones */}
                    {postulacion.pasante.perfilPasante && (
                        <Box className="flex flex-row gap-4 px-6 w-full">
                            {postulacion.pasante.perfilPasante.seccion1Titulo && (
                                <Box className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                                    <h3>{postulacion.pasante.perfilPasante.seccion1Titulo}</h3>
                                    <p>{postulacion.pasante.perfilPasante.seccion1Contenido}</p>
                                </Box>
                            )}
                            {postulacion.pasante.perfilPasante.seccion2Titulo && (
                                <Box className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                                    <h3>{postulacion.pasante.perfilPasante.seccion2Titulo}</h3>
                                    <p>{postulacion.pasante.perfilPasante.seccion2Contenido}</p>
                                </Box>
                            )}
                            {postulacion.pasante.perfilPasante.seccion3Titulo && (
                                <Box className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                                    <h3>{postulacion.pasante.perfilPasante.seccion3Titulo}</h3>
                                    <p>{postulacion.pasante.perfilPasante.seccion3Contenido}</p>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* CV */}
                    <Box className="h-screen w-full px-6 mt-4">
                        {!postulacion.pasante.cv ? (
                            <p>El pasante aún no subió su CV</p>
                        ) : (
                            <object
                                data={postulacion.pasante.cv}
                                type="application/pdf"
                                width="100%"
                                height="100%"
                            />
                        )}
                    </Box>

                    {/* BOTONES */}
                    <Box className="flex w-full justify-center gap-4 my-6">
                        <Button variant="contained" color="success" value="Aceptado" onClick={(e) => handleEstado({ estado: e.target.value })}>Aceptar</Button>
                        <Button variant="contained" color="error" value="Rechazado" onClick={(e) => handleEstado({ estado: e.target.value })}>Rechazar</Button>
                    </Box>
                </>
            )}
        </>
    );
}

export default PostulanteDetalles;