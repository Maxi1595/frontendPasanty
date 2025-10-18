import { useEffect, useState } from "react";
import { getUsuario } from "../api/usuarioApi";

const Perfil = () => {

    const [usuario, setUsuario] = useState({});

    useEffect (() => {
        getUsuario().then(data => {;
            setUsuario(data);
        })
    }, [])
    
    return (
        <>
            {usuario && (
            <div key={usuario.id}>
                <p>{usuario.correo}</p>
                <p>{usuario.nombre}</p>
            </div>
            )}
        </>
    )
}

export default Perfil;