import { useEffect, useState } from "react";
import { getVacante } from "../api/vacantesApi";
import { Link } from "react-router-dom";
import { Button, Box, Modal, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { postVacante } from "../api/vacantesApi";

const Vacantes = () => {

    const [vacantes, setVacantes] = useState([]);
    const [usuario, setUsuario] = useState(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    });
    const rol = usuario.rol;
    const [datos, setDatos] = useState({
        titulo: "",
        descripcion: ""
    })
    const [filtro, setFiltro] = useState({ titulo: [] });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const toggleFiltros = (filt, valor) => {
        setFiltro((prev) => ({
            ...prev,
            [filt]: prev[filt].includes(valor)
                ? prev[filt].filter((item) => item !== valor)
                : [...prev[filt], valor],
        }))
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
                        <h2 className="text-lg font-semibold mb-2">Filtros</h2>
                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "ingenieria_informatica")} />
                            <span>Ingeniería Informática</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_en_Sistemas")} />
                            <span>Ingeniería en Sistemas</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Electrónica")} />
                            <span>Ingeniería Electrónica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "diseño_grafico")} />
                            <span>Diseño Gráfico</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "marketing")} />
                            <span>Marketing</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Industrial")} />
                            <span>Ingeniería Industrial</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Civil")} />
                            <span>Ingeniería Civil</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Mecánica")} />
                            <span>Ingeniería Mecánica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Eléctrica")} />
                            <span>Ingeniería Eléctrica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Química")} />
                            <span>Ingeniería Química</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Ambiental")} />
                            <span>Ingeniería Ambiental</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_en_Energías_Renovables")} />
                            <span>Ingeniería en Energías Renovables</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ingeniería_Biomédica")} />
                            <span>Ingeniería Biomédica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ciencias_de_la_Computación")} />
                            <span>Ciencias de la Computación</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Desarrollo_de_Software")} />
                            <span>Desarrollo de Software</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Análisis_de_Sistemas")} />
                            <span>Análisis de Sistemas</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ciberseguridad")} />
                            <span>Ciberseguridad</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Inteligencia_Artificial")} />
                            <span>Inteligencia Artificial</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Ciencia_de_Datos")} />
                            <span>Ciencia de Datos</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Robótica")} />
                            <span>Robótica</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Diseño_Gráfico")} />
                            <span>Diseño Gráfico</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Diseño_Industrial")} />
                            <span>Diseño Industrial</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Diseño_de_Interiores")} />
                            <span>Diseño de Interiores</span>
                        </label>

                        <label className="p-2">
                            <input type="checkbox" onChange={() => toggleFiltros("titulo", "Diseño_UX/UI")} />
                            <span>Diseño UX/UI</span>
                        </label>
                    </div>

                    <div className="p-4">
                        <div className="flex flex-wrap gap-4 justify-start"></div>
                        <Box className="flex flex-wrap justify-center gap-6 p-2 w-[75%]">
                            {vacantes.length === 0 ? (
                                <div>
                                    <p>No hay vacantes, Lamentamos su espera por pasantias</p>
                                </div>
                            ) : (
                                itemsEnPagina.map((v) => (
                                    <div key={v.id} className="flex flex-row bg-gray-200 rounded justify-between items-center w-full h-24 px-2">
                                        <h3>{v.titulo}</h3>
                                        <p className="w-64 line-clamp-1">{v.descripcion}</p>
                                        <Link to={`/vacantes/${v.id}`}>Ver mas</Link>
                                    </div>
                                ))
                            )
                            }
                            <div className="flex gap-2 mt-4">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setCurrentPage(num)}
                                        className={`px-3 py-1 rounded ${currentPage === num ? "bg-blue-500 text-white" : "bg-gray-300"
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
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
            </div>
        </>
    )
}

export default Vacantes;