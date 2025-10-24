import { useEffect, useState } from "react";
import { getUsuario } from "../api/usuarioApi";
import { Button } from "@mui/material";
import { postSubirCV } from "../api/pasantesApi";

const Perfil = () => {

    const [usuario, setUsuario] = useState({});
    const [rol, setRol] = useState(JSON.parse(localStorage.getItem("user")));

    const [archivo, setArchivo] = useState(null);

    useEffect (() => {
        getUsuario().then(data => {;
            setUsuario(data);
            console.log(data);
        })
        console.log(rol);
    }, [])

    const handleUpload = async () => {
        await postSubirCV(archivo);
    }

    return (
        <>
            {usuario && (
            <div key={usuario.id}>
                <p>{usuario.correo}</p>
                <p>{usuario.nombre}</p>
            </div>
            )}

            {rol.rol === 3 && (
                <>
                    <input type="file" onChange={(e)=>setArchivo(e.target.files[0])} />
                    <Button onClick={handleUpload}>insertar CV</Button>
                </>
            )}
        </>
    )
}

export default Perfil;