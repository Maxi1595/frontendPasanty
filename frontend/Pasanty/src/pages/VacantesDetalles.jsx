import { useEffect, useState } from "react";
import { getVacanteById } from "../api/vacantesApi";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material"

const VacantesDetalles = () => {

    const { id } = useParams();
    const [vacante, setVacante] = useState(null);

    useEffect(() => {
        getVacanteById(id).then(data => {
            console.log(data);
            setVacante(data);
        });
    }, [id])


    return (
        <>
            <div>
            {vacante && (
                <div key={vacante.id}>
                    <h3>{vacante.titulo}</h3>
                    <p>{vacante.descripcion}</p>
                </div>
            )}
            <Button>Postularse</Button>
            </div>
        </>
    )
}

export default VacantesDetalles