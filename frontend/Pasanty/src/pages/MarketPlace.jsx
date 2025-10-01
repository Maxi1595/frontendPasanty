import { useState, useEffect } from "react"
import { getPasantes } from "../api/pasantesApi";
import { Link } from "react-router-dom";

const MarketPlace = () => {
    
    const [pasantes, setPasantes] = useState([]);

    useEffect(() => {
        getPasantes().then(data => {
            setPasantes(data);});
    }, [])

    return (
        <>
            {pasantes.map((p) => (
                <div key={p.id}>
                    <h1>{p.usuario.nombre}</h1>
                    <p>{p.especialidad}</p>
                    <Link to={`/pasantes/${p.id}`}>Ver mas</Link>
                </div>
            ))}
        </>
    )
}

export default MarketPlace