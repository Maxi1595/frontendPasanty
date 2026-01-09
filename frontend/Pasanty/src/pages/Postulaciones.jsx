import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostulaciones } from "../api/postularseApi";
import { Box } from "@mui/material"

const Postulaciones = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [postulantes, setPostulantes] = useState([]);


    useEffect(() => {
        getPostulaciones().then((data) => {
            console.log(data);
            setPostulantes(data);
        });
    }, [id]);

    return (
        <>

            <Box className="flex justify-center text-2xl m-3 p-4 bg-gray-100 rounded">
                <h1>Las postulaciones a su vacantes</h1> <br />
            </Box>
            <Box className="flex flex-col m-auto w-[85%] h-92 border rounded">
                <Box className="flex flex-row justify-between bg-gray-200 border rounded px-2">
                    <p>Nombre</p>
                    <p>Vacante</p>
                    <p>Informacion</p>
                </Box>

            {postulantes.map((p) => (
                <div className="flex flex-row justify-between border text-aling-center" key={p.id}>
                    <h3>{p.pasante?.usuario?.nombre}</h3>
                    <p>{p.vacante.titulo}</p>
                    <Link className="text-blue-500" to={`/postulante/${p.id}`}>Ver mas</Link>
                </div>
            )
        )}
        </Box>
        </>
    )
}

export default Postulaciones;