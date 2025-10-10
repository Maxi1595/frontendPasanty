import { useEffect, useState } from "react";
import { getVacanteById } from "../api/vacantesApi";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material"
import { postPostularse } from "../api/postularseApi";

const VacantesDetalles = () => {

    const { id } = useParams();
    const [vacante, setVacante] = useState(null);

    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        getVacanteById(id).then(data => {
            console.log(data);
            setVacante(data);
        });
    }, [id])

    const handleSubmit = async () => {
        if (usuario.rol === 3) {
            postPostularse(id);
            alert("entro");
        } else {
            alert("no puede hacer eso");
        }
    }

    return (
        <>
            <div>
                {vacante && (
                    <div key={vacante.id}>
                        <h3>{vacante.titulo}</h3>
                        <p>{vacante.descripcion}</p>
                    </div>
                )}
                <Button onClick={handleSubmit}>Postularse</Button>
            </div>
        </>
    )
}

export default VacantesDetalles