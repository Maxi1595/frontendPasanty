import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getPostulacionById, patchEstado } from "../api/postularseApi";

const PostulanteDetalles = () => {
  
    const { id } = useParams();
    const [postulacion, setPostulacion] = useState(null);
    const [estado, setEstado] = useState({});

    useEffect(() => {
        getPostulacionById(id).then(data => {
            console.log(data);
            setPostulacion(data);
        });
    }, [id])

    const handleEstado = (nuevoEstado) =>{
        setEstado(nuevoEstado);
        console.log(nuevoEstado);
        patchEstado(id, nuevoEstado);
    }

    return (
        <>
            {postulacion && (
                <div key={postulacion.id}>
                    <h1>{postulacion.pasante.usuario.nombre}</h1>
                    <h2>{postulacion.vacante.titulo}</h2>
                    <p>{postulacion.pasante.especialidad}</p>
                    <Button id="estado" name="estado" value="Aceptado" onClick={(e) => handleEstado({estado: e.target.value})}>Aceptar</Button>
                    <Button id="estado" name="estado" value="Rechazado" onClick={(e) => handleEstado({estado: e.target.value})}>Rechazar</Button>
                </div>
            )}
        </>
    )
}

export default PostulanteDetalles;