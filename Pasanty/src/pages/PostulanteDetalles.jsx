import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { getPostulacionById, patchEstado } from "../api/postularseApi";
import { useNavigate } from "react-router-dom";
import ViewCVPostulante from "../components/ViewCVPostulante";
import Avatar from "../components/Avatar";
import PerfilPasanteView from "../components/PerfilPasanteView";

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
                    <Box className="flex flex-col justify-center w-full">
                        
                        {/* BOTONES */}
                        <Box className="flex w-full justify-center gap-4 my-6">
                            <Button variant="contained" color="success" value="Aceptado" onClick={(e) => handleEstado({ estado: e.target.value })}>Aceptar</Button>
                            <Button variant="contained" color="error" value="Rechazado" onClick={(e) => handleEstado({ estado: e.target.value })}>Rechazar</Button>
                        </Box>

                        <PerfilPasanteView
                            pasante={{
                                usuario: {
                                    nombre: postulacion?.pasante?.usuario?.nombre,
                                    correo: postulacion?.pasante?.usuario?.correo
                                },
                                especialidad: postulacion?.pasante?.especialidad,
                                estadoAcademico: postulacion?.pasante?.estadoAcademico,
                                cv: postulacion?.pasante?.cv,
                                usuarioId: postulacion?.pasante?.usuarioId
                            }}
                            perfil={postulacion?.pasante?.perfilPasante}
                            usuarioId={postulacion?.pasante?.usuarioId}
                            pasanteId={postulacion?.pasanteId}
                            esPropio={false}
                        />

                        {/* CV
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
                        </Box> */}


                    </Box>
                </>
            )}
        </>
    );
}

export default PostulanteDetalles;