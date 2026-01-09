import { useEffect, useState } from "react";
import { getVacanteById } from "../api/vacantesApi";
import { useParams } from "react-router-dom";
import { Button, Modal, Box } from "@mui/material"
import { postPostularse } from "../api/postularseApi";

const VacantesDetalles = () => {

    const { id } = useParams();
    const [vacante, setVacante] = useState(null);

    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("user")));

    const rol = usuario.rol;

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
        if (usuario.rol === 3) {
            postPostularse(id);
            setOpen(false);
            alert("Se postulo correctamente");            
        } else {
            alert("no puede hacer eso");
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                {vacante && (
                    <div key={vacante.id}>
                        <h3 className="text-2xl">{vacante.titulo}</h3>
                        <p>{vacante.estado}</p>
                        <p
                            className="m-2 p-4"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
                            {vacante.descripcion}
                        </p>
                    </div>
                )}
                {rol === 3 ? (
                    <Button onClick={handleOpen}>Postularse</Button>
                ) : (<div />)}

                {/* Modal */}
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                flex flex-col justify-around items-center w-[400px] h-[200px] bg-white border-2 border-black 
                                shadow-2xl p-4">
                            {/* contenido del modal */}
                            <p>¿Esta seguro que desea postularse a esta vacante?</p>
                            <Box className="flex flex-row justify-between w-[50%]">
                                <Button className="bg-green-300 text-black" onClick={handleSubmit}>Sí</Button>
                                <Button className="bg-red-300 text-black" onClick={handleClose}>No</Button>
                            </Box>
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default VacantesDetalles