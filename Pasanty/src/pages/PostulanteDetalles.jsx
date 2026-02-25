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
                <div className="w-full h-screen p-6" key={postulacion.id}>
                    <Box className="flex justify-around">
                        <Box className="flex flex-col items-center justify-center bg-gray-100 p-4 w-[30%]">
                            <h1>{postulacion.pasante.usuario.nombre}</h1>
                            {/* <h2>{postulacion.vacante.titulo}</h2> Falta hacerlo  */}
                            <p>{postulacion.pasante.especialidad}</p>
                        </Box>
                        <Box className="w-[60%] h-92">
                            <ViewCVPostulante />
                        </Box>
                    </Box>
                    <Box className="flex w-full justify-center my-10">
                        <Button id="estado" name="estado" value="Aceptado" onClick={(e) => handleEstado({ estado: e.target.value })}>Aceptar</Button>
                        <Button id="estado" name="estado" value="Rechazado" onClick={(e) => handleEstado({ estado: e.target.value })}>Rechazar</Button>
                    </Box>
                </div>
            )}
        </>
    )
}

export default PostulanteDetalles;