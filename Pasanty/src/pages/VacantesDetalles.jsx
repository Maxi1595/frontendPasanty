import { useEffect, useState } from "react";
import { getVacanteByParamsId } from "../api/vacantesApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Modal, Box } from "@mui/material"
import { postPostularse } from "../api/postularseApi";
import { ESPECIALIDADES } from "../constants/Especialidades";

const VacantesDetalles = () => {

    const { id } = useParams();
    const [vacante, setVacante] = useState(null);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const rol = user.user.rol;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        getVacanteByParamsId(id).then(data => {
            console.log(data);
            setVacante(data);
        });
    }, [id])

    const handleSubmit = async () => {
        if (rol === 3) {
            postPostularse(id);
            setOpen(false);
            alert("Se postulo correctamente");
        } else {
            alert("no puede hacer eso");
        }
    }

    return (
        <>
            {vacante && (() => {
                const especialidad = ESPECIALIDADES.find(e => e.valor === vacante.titulo);
                const bgColor = especialidad?.bg || "#f9fafb";

                return (
                    <div style={{ backgroundColor: bgColor }} className="min-h-screen p-6">





                        <div className="flex flex-row items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm">
                                {vacante.puesto?.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{vacante.puesto}</h1>
                                <p className="text-sm text-gray-500">
                                    Publicada por{" "}
                                    <Link to={`/empresaDetalles/${vacante.empresa.usuario.id}`} className="text-green-500 font-medium hover:underline">
                                        {vacante.empresa.usuario.nombre}
                                    </Link>
                                    {" · "}para {vacante.titulo}, {vacante.anioAcademico?.replace("_", " ").toLowerCase()}
                                    {" "}
                                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full uppercase">{vacante.estado}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 mt-3 flex-wrap">
                            {vacante.direccion && <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">📍 {vacante.direccion}</span>}
                            {vacante.modalidad && <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{vacante.modalidad}</span>}
                            {vacante.jornada && <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{vacante.jornada}</span>}
                            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{vacante.remuneracion ? "Remunerado" : "No remunerado"}</span>
                        </div>

                        <div className="flex flex-row gap-6 mt-6">

                            {/* IZQUIERDA - descripción y empresa */}
                            <div className="flex flex-col gap-4 w-2/3">
                                {/* Descripción */}
                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Descripción</p>
                                    <p style={{ whiteSpace: "pre-wrap" }} className="text-gray-700 text-sm leading-relaxed">{vacante.descripcion}</p>
                                </div>

                                {/* Sobre la empresa */}
                                {/* <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Sobre {vacante.empresa.usuario.nombre}</p>
                                    <p className="text-gray-600 text-sm">{vacante.empresa.especialidad}</p>
                                    <Link
                                        to={`/empresaDetalles/${vacante.empresa.usuario.id}`}
                                        className="mt-3 inline-block border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Ver perfil de la empresa
                                    </Link>
                                </div> */}
                            </div>

                            {/* DERECHA - acción y detalles */}
                            <div className="flex flex-col gap-4 w-1/3">
                                {/* Botón postularse */}
                                {rol === 3 && (
                                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                                        <button
                                            onClick={handleOpen}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
                                        >
                                            Postularme
                                        </button>
                                        <p className="text-xs text-gray-400 text-center mt-2">Se envía tu perfil y CV. Podés seguir el estado desde "Mis postulaciones".</p>
                                    </div>
                                )}

                                {/* Detalles */}
                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Detalles</p>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            { label: "Ubicación", value: vacante.direccion },
                                            { label: "Modalidad", value: vacante.modalidad },
                                            { label: "Jornada", value: vacante.jornada },
                                            { label: "Remuneración", value: vacante.remuneracion ? "Remunerado" : "No remunerado" },
                                            { label: "Carrera", value: vacante.titulo },
                                            { label: "Nivel", value: vacante.anioAcademico?.replace("_", " ") },
                                            { label: "Publicada", value: new Date(vacante.creadoEn).toLocaleDateString() },
                                        ].map((d) => d.value && (
                                            <div key={d.label} className="flex justify-between items-center">
                                                <span className="text-gray-400 text-sm">{d.label}</span>
                                                <span className="text-gray-800 text-sm font-semibold">{d.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Empresa mini card */}
                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-row items-center gap-3">
                                    <div className="w-9 h-9 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm flex-shrink-0">
                                        {vacante.empresa.usuario.nombre?.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{vacante.empresa.usuario.nombre}</p>
                                        <p className="text-xs text-green-500">{vacante.empresa.especialidad}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center w-[400px] h-[200px] bg-white border border-gray-200 shadow-2xl rounded-xl p-6">
                    <p className="text-gray-800 font-medium">¿Estás seguro que querés postularte?</p>
                    <Box className="flex flex-row gap-4">
                        <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">Sí, postularme</button>
                        <button onClick={handleClose} className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancelar</button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default VacantesDetalles