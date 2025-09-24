import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPasanteById } from "../api/pasantesApi";

const PasanteDetalles = () => {
    
    const { id } = useParams();
    const [pasante, setPasante] = useState(null);
    
    useEffect(() => {
        getPasanteById(id).then(data => {
            console.log(data);
            setPasante(data);
        });
    }, [id])

    return (
        <>
            {pasante && (
                <div key={pasante.id}>
                    <h1>{pasante.usuario.nombre}</h1>
                    <p>{pasante.especialidad}</p>
                </div>
            )}
        </>
    )
}

export default PasanteDetalles