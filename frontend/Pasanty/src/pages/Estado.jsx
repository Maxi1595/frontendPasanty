import { useState, useEffect } from "react";
import { getEstado } from "../api/postularseApi";

const Estado = () => {
    
    const [postulaciones, setPostulaciones] = useState([]);

    useEffect(() => {
        getEstado().then(data => {
            setPostulaciones(data);
            console.log(data);
        })
    }, [])

    return(
        <>
            {postulaciones.map((p) => (
            <div key={p.id}> 
                <p>{p.estado}</p>
            </div>
            ))}
        </>
    )
}

export default Estado;