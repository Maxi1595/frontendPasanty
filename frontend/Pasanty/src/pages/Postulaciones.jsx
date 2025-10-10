import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostulaciones } from "../api/postularseApi";

const Postulaciones = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [postulantes, setPostulantes] = useState([]);
   

    useEffect(() => {
        getPostulaciones().then((data) =>{
            console.log(data);
            setPostulantes(data);
        });
    }, [id]);
    
    return(
    <>
        {postulantes.map((p) => (
            <div key={p.id}>
                <h3>{p.pasante?.usuario?.nombre}</h3>
                <Link to={`/postulante/${p.id}`}>Ver mas</Link>
            </div>
            )
        )}
    </>
    )
}

export default Postulaciones;