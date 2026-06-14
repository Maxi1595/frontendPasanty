import { useEffect, useState } from "react";
import { getUsuario } from "../api/usuarioApi";
import { Button } from "@mui/material";
import { postSubirCV } from "../api/pasantesApi";
import ViewCV from "../components/ViewCV";

import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const Perfil = () => {

    const { user } = useContext(AuthContext);
    const [archivo, setArchivo] = useState(null);

    const handleUpload = async () => {
        await postSubirCV(archivo);
    }

    return (
        <>
            {user && (
                <div key={user.user.id}>
                    <p>{user.user.correo}</p>
                    <p>{user.user.username}</p>
                </div>
            )}

            {user.user.rol === 3 && (
                <>
                    <ViewCV esPropio={true} />
                    <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
                    <Button onClick={handleUpload}>insertar CV</Button>
                </>
            )}
        </>
    )
}

export default Perfil;