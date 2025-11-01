import { useEffect, useState } from "react";
import { getVacante } from "../api/vacantesApi";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
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

    useEffect(() => {
        getVacante().then(data => {
            console.log(data);
            setVacantes(data);
        });
    }, []);

    const handleCrearVacante = async () => {

        postVacante(datos);
    }

    return (
        <>
            <div className="grid grid-rows-[auto_1fr] h-screen gap-4 p-4">
                {/* FILA 1: Título */}
                <div className="bg-gray-100 p-4 rounded shadow text-center text-2xl font-semibold">
                    Título de la página
                </div>

                {/* FILA 2: Filtros + Cards */}
                <div className="grid grid-cols-[25%_75%] gap-4">
                    {/* Filtros */}
                    <div className="bg-gray-50 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Filtros</h2>
                        {/* Aquí tus controles de filtro */}
                    </div>

                    <div className="p-4">
                        <div className="flex flex-wrap gap-4 justify-start"></div>
                        <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                            {vacantes.map((v) => (
                                <div key={v.id} className="flex flex-row bg-gray-200 rounded justify-between items-center w-full h-24">
                                    <h3>{v.titulo}</h3>
                                    <p>{v.descripcion}</p>
                                    <Link to={`/vacantes/${v.id}`}>Ver mas</Link>
                                </div>
                            ))}
                            {rol === 5 ? (
                                <Button onClick={handleCrearVacante}>Crear vacante</Button>
                            ) : (<div />)}
                        </Box>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Vacantes;