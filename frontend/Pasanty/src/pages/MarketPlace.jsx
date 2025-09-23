import { useState, useEffect } from "react"
import { getPasantes } from "../api/pasantesApi";
import { Link } from "react-router-dom";

const MarketPlace = () => {
    const [pasantes, setPasantes] = useState([]);

    useEffect(() => {
        getPasantes().then(data => {
            console.log(data);
            setPasantes(data);});
    }, [])

    return (
        <>
            {pasantes.map((p) => (
                <div key={p.id}>
                    {p.id}
                </div>
            ))}
            
        </>
    )
}

export default MarketPlace

//  Bueno, volviendo al tema del backend contigo tengo que hacer algo o mejor dicho ... tenemos... ya logre hacer que se conecte el front con el back con una api, ahora falta nomas hacer que al darle los datos del pasante tambien 