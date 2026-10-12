import { useEffect, useState } from "react";
import { getVacante } from "../api/vacantesApi";
import { Link } from "react-router-dom";
import { Button, Box, Modal, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { postVacante } from "../api/vacantesApi";
import { ESPECIALIDADES } from "../constants/Especialidades"
import { JORNADAS } from "../constants/Jornada";
import { MODALIDADES } from "../constants/Modalidad";
import { ESTADOS_ACADEMICOS } from "../constants/EstadosAcademicos";

import Filtro from "../components/Filtros";
import Paginacion from "../components/Paginacion";
import VacanteCart from "../components/VacanteCart";

const Vacantes = () => {

    const [vacantes, setVacantes] = useState([]);
    const [usuario, setUsuario] = useState(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    });
    const rol = usuario.user.rol;
    const [datos, setDatos] = useState({
        titulo: "",
        puesto: "",
        direccion: "",
        modalidad: "",
        jornada: "",
        anioAcademico: "",
        descripcion: "",
        remuneracion: false,
    })
    const [filtro, setFiltro] = useState({
        titulo: [],
        anioAcademico: [],
        jornada: [],
        modalidad: [],
        remuneracion: null
    });

    const [busquedaDireccion, setBusquedaDireccion] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [buscador, setBuscador] = useState("");
    const [orden, setOrden] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getVacante().then(data => {
            console.log(data);
            setVacantes(data);
        });

        setCurrentPage(1);
    }, [filtro]);

    const toggleFiltros = (campo, valor) => {
        setFiltro((prev) => ({
            ...prev,
            [campo]: prev[campo].includes(valor)
                ? prev[campo].filter((item) => item !== valor)
                : [...prev[campo], valor],
        }));
    };

    const vacantesFiltradas = vacantes.filter((v) => {
        const matchTitulo =
            filtro.titulo.length === 0 ||
            filtro.titulo.includes(v.titulo);

        return matchTitulo;
    });

    const vacantesFiltro = vacantes.filter((vacantes) => {
        const matchPuesto = (vacantes.puesto ?? "").toLowerCase().includes(buscador.toLowerCase());
        const matchRemuneracion = filtro.remuneracion === null || vacantes.remuneracion === filtro.remuneracion;
        const matchEspecialidad = filtro.titulo.length === 0 || filtro.titulo.includes(vacantes.titulo)
        const matchAnio = filtro.anioAcademico.length === 0 || filtro.anioAcademico.includes(vacantes.anioAcademico);
        const matchModalidad = filtro.modalidad.length === 0 || filtro.modalidad.includes(vacantes.modalidad);
        const matchJornada = filtro.jornada.length === 0 || filtro.jornada.includes(vacantes.jornada);
        const matchDireccion = (vacantes.direccion ?? "").toLowerCase().includes(busquedaDireccion.toLowerCase());
        return matchPuesto && matchRemuneracion && matchEspecialidad && matchAnio && matchModalidad && matchJornada && matchDireccion;
    })

    const vacantesOrden = [...vacantesFiltro].sort((a, b) => {
        if (orden === "az") return a.puesto.localeCompare(b.puesto);
        if (orden === "za") return b.puesto.localeCompare(a.puesto);
        return 0;
    })

    // Usás vacantesOrden como el array final
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const itemsEnPagina = vacantesOrden.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(vacantesOrden.length / itemsPerPage);

    const handleCrearVacante = async () => {
        try {
            const r = await postVacante(datos);
            console.log(datos);
            console.log("Respuesta:", r);
            handleClose();
            window.location.reload();
        } catch (error) {
            return
        }
    }


    return (
        <>
            <div className="grid grid-rows-[auto_1fr] h-screen gap-4 p-4">
                {/* FILA 1: Título */}
                <div className="flex flex-row mb-6 justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900">Encuentra tu puesto de trabajo</h1>
                        <p className="text-gray-500 text-lg mt-1">Filtrá por carrera, modalidad y jornada, y postulate directo desde acá.</p>
                    </div>
                    {rol === 5 ? (
                        <Button className="bg-green-500 text-white px-5 py-2 my-auto rounded-lg font-semibold hover:bg-green-600 transition-colors h-2/3" onClick={handleOpen}>Crear vacante</Button>
                    ) : (<div />)}
                </div>

                {/* FILA 2: Filtros + Cards */}
                <div className="grid grid-cols-[25%_75%] gap-4">
                    {/* Filtros */}
                    <div className="bg-stone-50 p-4 rounded shadow">
                        <input
                            value={buscador}
                            onChange={(e) => setBuscador(e.target.value)}
                            placeholder="buscar por puesto..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                        />
                        <Box className="flex flex-col p-4">
                            <p className="">orden de las tarjetas </p>
                            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                                <option value="">Sin orden</option>
                                <option value="az">A → Z</option>
                                <option value="za">Z → A</option>
                            </select>
                            <p>Filtrar remunerados o no remunerados</p>
                            <select
                                value={filtro.remuneracion ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFiltro({ ...filtro, remuneracion: val === "" ? null : val === "true" })
                                }}
                            >
                                <option value="">Todos</option>
                                <option value="true">Pagado</option>
                                <option value="false">No pagado</option>
                            </select>
                        </Box>
                        <p>filtrar por titulo</p>
                        <Filtro
                            opciones={ESPECIALIDADES}
                            seleccionados={filtro.titulo}
                            onToggle={(valor) => toggleFiltros("titulo", valor)}
                        />
                        <p>estado academico</p>
                        <Filtro
                            opciones={ESTADOS_ACADEMICOS}
                            seleccionados={filtro.anioAcademico}
                            onToggle={(valor) => toggleFiltros("anioAcademico", valor)}
                        />
                        <p>jornadas</p>
                        <Filtro
                            opciones={JORNADAS}
                            seleccionados={filtro.jornada}
                            onToggle={(valor) => toggleFiltros("jornada", valor)}
                        />
                        <p>modalidad</p>
                        <Filtro
                            opciones={MODALIDADES}
                            seleccionados={filtro.modalidad}
                            onToggle={(valor) => toggleFiltros("modalidad", valor)}
                        />
                    </div>

                    <div className="p-4 bg-stone-50">
                        <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                            {vacantes.length === 0 ? (
                                <div>
                                    <p>No hay vacantes, Lamentamos su espera por pasantias</p>
                                </div>
                            ) : (
                                itemsEnPagina.map((v) => {
                                    return (<VacanteCart key={v.id} vacante={v} />)
                                })
                            )}
                            <Paginacion
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />

                        </Box>

                        {/* Modal */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    flex flex-row gap-4 w-[900px] h-[550px] bg-white border-2 border-black shadow-2xl p-6 rounded-xl overflow-hidden">

                                {/* COLUMNA IZQUIERDA */}
                                <div className="flex flex-col gap-3 w-1/2">

                                    {/* Titulo y Puesto en fila */}
                                    <div className="flex flex-row gap-2">
                                        <div className="flex flex-col w-1/2">
                                            <InputLabel>Título</InputLabel>
                                            <Select
                                                value={datos.titulo ?? ""}
                                                onChange={(e) => setDatos({ ...datos, titulo: e.target.value })}
                                                size="small"
                                            >
                                                <MenuItem value="ingenieria_informatica">Ingeniería Informática</MenuItem>
                                                <MenuItem value="Ingeniería_en_Sistemas">Ingeniería en Sistemas</MenuItem>
                                                <MenuItem value="Ingeniería_Electrónica">Ingeniería Electrónica</MenuItem>
                                                <MenuItem value="diseño_grafico">Diseño Gráfico</MenuItem>
                                                <MenuItem value="marketing">Marketing</MenuItem>
                                                <MenuItem value="Ingeniería_Industrial">Ingeniería Industrial</MenuItem>
                                                <MenuItem value="Ingeniería_Civil">Ingeniería Civil</MenuItem>
                                                <MenuItem value="Ingeniería_Mecánica">Ingeniería Mecánica</MenuItem>
                                                <MenuItem value="Ingeniería_Eléctrica">Ingeniería Eléctrica</MenuItem>
                                                <MenuItem value="Ingeniería_Química">Ingeniería Química</MenuItem>
                                                <MenuItem value="Ingeniería_Ambiental">Ingeniería Ambiental</MenuItem>
                                                <MenuItem value="Ingeniería_en_Energías_Renovables">Ingeniería en Energías Renovables</MenuItem>
                                                <MenuItem value="Ingeniería_Biomédica">Ingeniería Biomédica</MenuItem>
                                                <MenuItem value="Ciencias_de_la_Computación">Ciencias de la Computación</MenuItem>
                                                <MenuItem value="Desarrollo_de_Software">Desarrollo de Software</MenuItem>
                                                <MenuItem value="Análisis_de_Sistemas">Análisis de Sistemas</MenuItem>
                                                <MenuItem value="Ciberseguridad">Ciberseguridad</MenuItem>
                                                <MenuItem value="Inteligencia_Artificial">Inteligencia Artificial</MenuItem>
                                                <MenuItem value="Ciencia_de_Datos">Ciencia de Datos</MenuItem>
                                                <MenuItem value="Robótica">Robótica</MenuItem>
                                                <MenuItem value="Diseño_Gráfico">Diseño Gráfico</MenuItem>
                                                <MenuItem value="Diseño_Industrial">Diseño Industrial</MenuItem>
                                                <MenuItem value="Diseño_de_Interiores">Diseño de Interiores</MenuItem>
                                                <MenuItem value="Diseño_UX/UI">Diseño UX/UI</MenuItem>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col w-1/2">
                                            <InputLabel>Puesto</InputLabel>
                                            <TextField
                                                size="small"
                                                value={datos.puesto ?? ""}
                                                onChange={(e) => setDatos({ ...datos, puesto: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Dirección */}
                                    <div className="flex flex-col">
                                        <InputLabel>Dirección</InputLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={datos.direccion ?? ""}
                                            onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
                                        />
                                    </div>

                                    {/* Modalidad y Jornada en fila */}
                                    <div className="flex flex-row gap-2">
                                        <div className="flex flex-col w-1/2">
                                            <InputLabel>Modalidad</InputLabel>
                                            <Select
                                                size="small"
                                                value={datos.modalidad ?? ""}
                                                onChange={(e) => setDatos({ ...datos, modalidad: e.target.value })}
                                            >
                                                <MenuItem value="presencial">Presencial</MenuItem>
                                                <MenuItem value="hibrido">Híbrido</MenuItem>
                                                <MenuItem value="remoto">Remoto</MenuItem>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col w-1/2">
                                            <InputLabel>Jornada</InputLabel>
                                            <Select
                                                size="small"
                                                value={datos.jornada ?? ""}
                                                onChange={(e) => setDatos({ ...datos, jornada: e.target.value })}
                                            >
                                                <MenuItem value="part-time">Part-time</MenuItem>
                                                <MenuItem value="full-time">Full-time</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Año académico */}
                                    <div className="flex flex-col">
                                        <InputLabel>Año académico requerido</InputLabel>
                                        <Select
                                            size="small"
                                            value={datos.anioAcademico ?? ""}
                                            onChange={(e) => setDatos({ ...datos, anioAcademico: e.target.value })}
                                        >
                                            <MenuItem value="Primer_año">Primer año</MenuItem>
                                            <MenuItem value="Segundo_año">Segundo año</MenuItem>
                                            <MenuItem value="Tercer_año">Tercer año</MenuItem>
                                            <MenuItem value="Cuarto_año">Cuarto año</MenuItem>
                                            <MenuItem value="Quinto_año">Quinto año</MenuItem>
                                            <MenuItem value="Sexto_año">Sexto año</MenuItem>
                                            <MenuItem value="Graduado">Graduado</MenuItem>
                                        </Select>
                                    </div>

                                    {/* Remuneración */}
                                    <div className="flex flex-col">
                                        <InputLabel>Remuneración</InputLabel>
                                        <Select
                                            size="small"
                                            value={datos.remuneracion ?? ""}
                                            onChange={(e) => setDatos({ ...datos, remuneracion: e.target.value })}
                                        >
                                            <MenuItem value={true}>Remunerado</MenuItem>
                                            <MenuItem value={false}>No remunerado</MenuItem>
                                        </Select>
                                    </div>
                                </div>

                                {/* COLUMNA DERECHA */}
                                <div className="flex flex-col w-1/2 gap-3 h-full">
                                    <TextField
                                        label="Descripción del puesto"
                                        multiline
                                        fullWidth
                                        value={datos.descripcion ?? ""}
                                        onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
                                        sx={{
                                            flexGrow: 1,
                                            '& .MuiInputBase-root': {
                                                height: '100%',
                                                alignItems: 'flex-start',
                                                overflow: 'auto'
                                            },
                                            '& textarea': {
                                                height: '100% !important',
                                                overflow: 'auto !important'
                                            }
                                        }}
                                    />

                                    <Button onClick={handleCrearVacante}>Crear vacante</Button>
                                </div>
                            </Box>
                        </Modal>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Vacantes;