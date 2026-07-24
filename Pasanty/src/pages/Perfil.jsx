import { useEffect, useState } from "react";
import { getUsuario } from "../api/usuarioApi";
import { Box, Button } from "@mui/material";
import { postSubirCV } from "../api/pasantesApi";
import ViewCV from "../components/ViewCV";

import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { getPerfilEmpresa, getPerfilPasante } from "../api/perfilApi";

const Perfil = () => {

    const { user } = useContext(AuthContext);
    const [archivo, setArchivo] = useState(null);
    const [perfil, setPerfil] = useState(null)

    const handleUpload = async () => {
        await postSubirCV(archivo);
    }

    useEffect(() => {
        if(user.user.rol === 3){
            getPerfilPasante().then(req => {
                setPerfil(req),
                console.log(req)
            })
        } else {
            getPerfilEmpresa().then(req => {
                setPerfil(req),
                console.log(req);
            })
        }
    }, [perfil])

    return (
        <>

            {user.user.rol === 3 && (
                <>
                    <Box className="flex flex-row gap-4 p-6 w-full">
                        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                            {user && (
                                <div key={user.user.id}>
                                    <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                                        {user?.user?.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="text-xl font-bold">{user.user.username}</p>
                                    <p className="text-gray-500">{user.user.correo}</p>
                                </div>
                            )}

                        </div>
                        <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                            <h2 className="text-lg font-semibold mb-2">Sobre mí</h2>
                            <p className="text-gray-600">Descripción acá</p>
                        </div>
                    </Box>
                    <ViewCV esPropio={true} />
                    <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
                    <Button onClick={handleUpload}>insertar CV</Button>
                </>
            )}

            {user.user.rol === 5 && (
                <>
                    {/* BANNER */}
                    <div className="w-full h-40 bg-gray-300 rounded-b-lg" />

                    {/* LOGO + NOMBRE centrado */}
                    <div className="flex flex-col items-center -mt-12 mb-6">
                        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white">
                            {user?.user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <h1 className="text-2xl font-bold mt-2">{user?.user?.username}</h1>
                        <button className="mt-2 px-4 py-1 bg-green-500 text-white rounded-full text-sm">
                            Ver Vacantes
                        </button>
                    </div>

                    {/* DOS COLUMNAS */}
                    <div className="flex flex-row gap-4 px-6 w-full">

                        {/* IZQUIERDA - info rápida */}
                        <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                            <p>{user?.user?.correo}</p>
                        </div>

                        {/* DERECHA - descripción */}
                        <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                            <h2 className="text-lg font-semibold mb-2">Sobre nosotros</h2>
                            <p className="text-gray-600">Descripción acá</p>
                        </div>

                    </div>
                </>
            )}
        </>
    )
}

export default Perfil;