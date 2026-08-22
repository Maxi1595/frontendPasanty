import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostulaciones } from "../api/postularseApi";
import { Box } from "@mui/material"
import Filtro from "../components/Filtros"
import { ESTADOS_ACADEMICOS } from "../constants/EstadosAcademicos";

const Postulaciones = () => {
    //  const token = localStorage.getItem("token");
    const { id } = useParams();
    const [postulantes, setPostulantes] = useState([]);

    const [filtroVacante, setFiltroVacante] = useState("");

    const [filtro, setFiltro] = useState({
        estadoAcademico: []
    })

    const toggleFiltros = (campo, valor) => {
        setFiltro((prev) => ({
            ...prev,
            [campo]: prev[campo].includes(valor)
                ? prev[campo].filter((item) => item !== valor)
                : [...prev[campo], valor],
        }))
    }

    const vacantesUnicas = [...new Set(postulantes.map(p => p.vacante.titulo))]

    const postulanteFiltro = postulantes.filter(p => {
        const matchVacante = filtroVacante === "" || p.vacante.titulo === filtroVacante;
        const matchEstado = filtro.estadoAcademico.length === 0 || filtro.estadoAcademico.includes(p.pasante.estadoAcademico);
        return matchVacante && matchEstado;
    })

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

            <Box className="m-4">
                <p>filtrar por vacantes</p>
                <select
                    value={filtroVacante}
                    onChange={(e) => setFiltroVacante(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2"
                >
                    <option value="">Todas las vacantes</option>
                    {vacantesUnicas.map(titulo => (
                        <option key={titulo} value={titulo}>{titulo}</option>
                    ))}
                </select>
                <Filtro
                    opciones={ESTADOS_ACADEMICOS}
                    seleccionados={filtro.estadoAcademico}
                    onToggle={(valor) => toggleFiltros("estadoAcademico", valor)}
                />
            </Box>
            <Box className="flex flex-col m-auto w-[85%] h-92 border rounded">
                <Box className="flex flex-row justify-between bg-gray-200 border rounded px-2">
                    <p>Nombre</p>
                    <p>Vacante</p>
                    <p>Informacion</p>
                </Box>
                {/* {!postulantes => (
                <div>

            </div>)}
             */}
                {postulanteFiltro.map((p) => (
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