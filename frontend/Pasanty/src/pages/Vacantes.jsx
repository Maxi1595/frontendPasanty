import { useEffect, useState } from "react";
import { getVacante } from "../api/vacantesApi";
import { Link } from "react-router-dom";

const Vacantes = () => {
    const [vacantes, setVacantes] = useState([]);


    useEffect(() =>{
        getVacante().then(data => {
            console.log(data);
            setVacantes(data);});
    }, []);

    return(
        <>
            {vacantes.map((v) => (
                <div key={v.id}>
                    <h3>{v.titulo}</h3>
                    <p>{v.descripcion}</p>
                    <Link to={`/vacantes/${v.id}`}>Ver mas</Link>
                </div>
            ))}
        </>
    )
}

export default Vacantes;