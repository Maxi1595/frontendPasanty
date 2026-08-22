import { useEffect, useState } from "react";
import { getVacanteById } from "../api/vacantesApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Modal, Box } from "@mui/material"
import { postPostularse } from "../api/postularseApi";
import { ESPECIALIDADES } from "../constants/Especialidades";

const VacantesDetalles = () => {

    const { id } = useParams();
    const [vacante, setVacante] = useState(null);

    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("user")));

    const rol = usuario.user.rol;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        getVacanteById(id).then(data => {
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
                    
                    {/* FILA 1 */}
                    <div className="flex flex-row gap-4 mb-4">
                        
                        {/* IZQUIERDA - info */}
                        <div className="bg-white rounded-xl shadow p-6 w-1/3">
                            <h3 className="text-xl font-bold">{vacante.puesto}</h3>
                            <p className="text-gray-500 text-sm mt-1">{vacante.titulo}</p>
                            <Link to={`/empresaDetalles/${vacante.empresa.usuario.id}`}>{vacante.empresa.usuario.nombre}</Link>
                            <p className="text-sm mt-2">{vacante.remuneracion ? "✅ Remunerado" : "❌ No remunerado"}</p>
                            <p className="text-sm mt-1 text-gray-500">{vacante.estado}</p>
                        </div>

                        {/* DERECHA - descripción */}
                        <div className="bg-white rounded-xl shadow p-6 w-2/3">
                            <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                            <p style={{ whiteSpace: "pre-wrap" }} className="text-gray-600">{vacante.descripcion}</p>
                        </div>

                    </div>

                    {/* BOTÓN */}
                    {rol === 3 && (
                        <div className="flex justify-center mt-4">
                            <Button 
                                onClick={handleOpen}
                                variant="contained"
                                className="w-1/2"
                            >
                                Postularse
                            </Button>
                        </div>
                    )}
                </div>
            );
        })()}

        {/* Modal */}
        <Modal open={open} onClose={handleClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                flex flex-col justify-around items-center w-[400px] h-[200px] bg-white border-2 border-black 
                shadow-2xl p-4">
                <p>¿Está seguro que desea postularse a esta vacante?</p>
                <Box className="flex flex-row justify-between w-[50%]">
                    <Button onClick={handleSubmit}>Sí</Button>
                    <Button onClick={handleClose}>No</Button>
                </Box>
            </Box>
        </Modal>
    </>
);
}

export default VacantesDetalles