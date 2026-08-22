import { useEffect, useState } from "react";
import { getVacante } from "../api/vacantesApi";
import { Link } from "react-router-dom";
import { Button, Box, Modal, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { postVacante } from "../api/vacantesApi";
import { ESPECIALIDADES } from "../constants/Especialidades"

import Filtro from "../components/Filtros";
import Paginacion from "../components/Paginacion";

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
        descripcion: "",
        remuneracion: false,
    })
    const [filtro, setFiltro] = useState({
        titulo: [],
        remuneracion: null
    });

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

    const toggleFiltros = (valor) => {
        setFiltro((prev) => ({
            ...prev,
            titulo: prev.titulo.includes(valor)
                ? prev.titulo.filter((item) => item !== valor)
                : [...prev.titulo, valor],
        }))
        console.log(valor);
    }

    const vacantesFiltradas = vacantes.filter((v) => {
        const matchTitulo =
            filtro.titulo.length === 0 ||
            filtro.titulo.includes(v.titulo);

        return matchTitulo;
    });
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const itemsEnPagina = vacantesFiltradas.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(vacantesFiltradas.length / itemsPerPage);

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

    const vacantesFiltro = vacantes.filter((vacantes) => {
        const matchPuesto = (vacantes.puesto ?? "").toLowerCase().includes(buscador.toLowerCase());
        const matchRemuneracion = filtro.remuneracion === null || vacantes.remuneracion === filtro.remuneracion;
        return matchPuesto && matchRemuneracion;
    })

    const vacantesOrden = [...vacantesFiltro].sort((a, b) => {
        if (orden === "az") return a.vacante.puesto.localeCompare(b.vacante.puesto);
        if (orden === "za") return b.vacante.puesto.localeCompare(a.vacante.puesto);
        return 0;
    })

    return (
        <>
            <div className="grid grid-rows-[auto_1fr] h-screen gap-4 p-4">
                {/* FILA 1: Título */}
                <div className="bg-gray-100 p-4 rounded shadow text-center text-2xl font-semibold">
                    Encuentra tu puesto de trabajo
                </div>

                {/* FILA 2: Filtros + Cards */}
                <div className="grid grid-cols-[25%_75%] gap-4">
                    {/* Filtros */}
                    <div className="bg-gray-50 p-4 rounded shadow">
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
                            onToggle={toggleFiltros}
                        />
                    </div>

                    <div className="p-4">
                        <div className="flex flex-wrap gap-4 justify-start"></div>
                        <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                            {vacantes.length === 0 ? (
                                <div>
                                    <p>No hay vacantes, Lamentamos su espera por pasantias</p>
                                </div>
                            ) : (
                                vacantesOrden.map((v) => {

                                    const especialidad = ESPECIALIDADES.find(e => e.valor === v.titulo);
                                    const color = especialidad?.color || "border-gray-300";
                                    const bgColor = especialidad?.color.replace("border-", "bg-").replace("shadow-", "") || `bg-${color}-50`;

                                    return (
                                        <div
                                            key={v.id}
                                            className={`flex flex-row border-l-4 rounded-lg justify-between items-center w-full h-24 px-4 mb-2 shadow-sm transition-all duration-200 bg-gray-50 hover:brightness-95 ${color}`}
                                        >
                                            <div className="w-1/4">
                                                <h3 className="font-bold">{v.puesto}</h3>
                                                <p className="text-gray-500 text-sm">{v.titulo}</p>
                                                <p className="text-xs mt-1">{v.remuneracion ? "✅ Remunerado" : "❌ No remunerado"}</p>
                                            </div>
                                            <p className="w-1/2 line-clamp-2 text-sm text-gray-600">{v.descripcion}</p>
                                            <Link
                                                className="text-blue-500 hover:text-blue-700 font-medium"
                                                to={`/vacantes/${v.id}`}
                                            >
                                                Ver más
                                            </Link>
                                        </div>
                                    )
                                })
                            )}
                            <Paginacion
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                            {rol === 5 ? (
                                <Button onClick={handleOpen}>Crear vacante</Button>
                            ) : (<div />)}
                        </Box>

                        {/* Modal */}
                        <div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                flex flex-col justify-around items-center w-[800px] h-[500px] bg-white border-2 border-black 
                                shadow-2xl p-4">
                                    {/* contenido del modal */}
                                    <p>Coloque el titulo del puesto de trabajo y una descripcion de lo que hara el pasante en esa area</p>
                                    <div>
                                        <InputLabel>Titulo</InputLabel>
                                        <Select
                                            id="titulo"
                                            name="titulo"
                                            label="Titulo"
                                            className="w-64"
                                            value={datos.titulo ?? ""}
                                            onChange={(e) => setDatos({
                                                ...datos,
                                                titulo: e.target.value
                                            })}
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

                                        <p>Puesto</p>
                                        <TextField
                                            value={datos.puesto}
                                            onChange={(e) => setDatos({ ...datos, puesto: e.target.value })} />
                                        <p>Con o sin remuneracion?</p>
                                        <Select
                                            id="remuneracion"
                                            name="remuneracion"
                                            label="remuneracion"
                                            className="w-64"
                                            value={datos.remuneracion ?? ""}
                                            onChange={(e) => setDatos({
                                                ...datos,
                                                remuneracion: e.target.value
                                            })}
                                        >
                                            <MenuItem value={true}>Remunerado</MenuItem>
                                            <MenuItem value={false}>NO Remunerado</MenuItem>
                                        </Select>
                                    </div>
                                    <TextField
                                        id="descripcion"
                                        name="descripcion"
                                        label="Descripcion del puesto de trabajo"
                                        type="text"
                                        multiline
                                        minRows={6}
                                        maxRows={8}
                                        fullWidth
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            descripcion: e.target.value
                                        })} />
                                    <Button onClick={handleCrearVacante}>Crear vacante</Button>
                                </Box>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Vacantes;