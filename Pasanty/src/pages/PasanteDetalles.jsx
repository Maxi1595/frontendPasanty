import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPasanteById } from "../api/pasantesApi";
import { getPerfilPasanteById } from "../api/perfilApi";
import { Box } from "@mui/material"

import ViewCv from "../components/ViewCV"
import Avatar from "../components/Avatar";
import PerfilPasanteView from "../components/PerfilPasanteView";

import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const PasanteDetalles = () => {

    const { id } = useParams();
    const [pasante, setPasante] = useState(null);
    const [perfil, setPerfil] = useState({});

    const { user } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {

        setUsuario(user);

        getPasanteById(id).then(data => {
            console.log(data);
            setPasante(data);
        });

        getPerfilPasanteById(id).then(data => {
            console.log(data)
            setPerfil(data);
        })
    }, [])

    console.log(usuario);


    return (
        <>
            <Box className="bg-stone-200">
                <PerfilPasanteView
                    pasante={pasante}
                    perfil={perfil}
                    usuarioId={pasante?.usuarioId}
                    pasanteId={id}
                    esPropio={false}
                />
                    {/* CV
                    <Box className="h-screen w-full">
                        {!pasante ? (
                            <p>Cargando...</p>
                        ) : !pasante.cv ? (
                            <p>Este pasante aún no subió su CV</p>
                        ) : String(pasante.usuarioId) === String(usuario.user.id) ? (
                            <ViewCv esPropio={true} />
                        ) : usuario.user.rol === 5 ? (
                            <ViewCv esPropio={false} id={id} />
                        ) : (
                            <p>No tenés permiso para ver este CV</p>
                        )}
                    </Box> */}
            </Box>
        </>
    );
}

export default PasanteDetalles;