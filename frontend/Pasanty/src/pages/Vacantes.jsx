import { useEffect, useState } from "react";
import { getVacante } from "../api/vacantesApi";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { postVacante } from "../api/vacantesApi";

const Vacantes = () => {
    const [vacantes, setVacantes] = useState([]);
    const [usuario, setUsuario] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
    const rol = usuario.rol;
    const [datos, setDatos] = useState({
        titulo: usuario.username,
        descripcion: "algo"
        }
    )

    useEffect(() =>{
        getVacante().then(data => {
            console.log(data);
            setVacantes(data);});
    }, []);

    const handleCrearVacante = async () => {
        
        postVacante(datos);
    }

    return(
        <>
            {vacantes.map((v) => (
                <div key={v.id}>
                    <h3>{v.titulo}</h3>
                    <p>{v.descripcion}</p>
                    <Link to={`/vacantes/${v.id}`}>Ver mas</Link>
                </div>
            ))}
            {rol === 5 ? (
                <Button onClick={handleCrearVacante}>Crear vacante</Button>
            ) : (<div />)}
        </>
    )
}

export default Vacantes;