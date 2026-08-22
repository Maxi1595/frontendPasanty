import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmpresaById } from "../api/empresaApi";
import { getPerfilEmpresa, getPerfilEmpresaByParams } from "../api/perfilApi";
import { Box } from "@mui/material"
import Avatar from "../components/Avatar";

const EmpresaDetalles = () => {

    const { id } = useParams();
    const [usuario, setUsuario] = useState({})
    const [perfil, setPerfil] = useState({})

    useEffect(() => {
        getEmpresaById(id).then(req => {
            setUsuario(req),
                console.log(req)
        })
        getPerfilEmpresaByParams(id).then(req => {
            setPerfil(req),
            console.log(req)
        })

    }, [])

    return (
        <>
            <Box>
                {/* BANNER */}
                <div className="w-full h-40 bg-gray-300 rounded-b-lg" />

                {/* LOGO + NOMBRE centrado */}
                <div className="flex flex-col items-center -mt-12 mb-6">
                    <Avatar id={usuario.id} nombre={usuario.nombre}></Avatar>
                    <h1 className="text-2xl font-bold mt-2">{usuario.nombre}</h1>
                    {/* <button className="mt-2 px-4 py-1 bg-green-500 text-white rounded-full text-sm">
                        Ver Vacantes
                    </button> */}
                </div>

                {/* DOS COLUMNAS */}
                <div className="flex flex-row gap-4 px-6 w-full">

                    {/* IZQUIERDA - info rápida */}
                    <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                        <p>{usuario.correo}</p>
                    </div>

                    {/* DERECHA - descripción */}
                    {perfil && (
                        <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                            <h2 className="text-lg font-semibold mb-2">Sobre nosotros</h2>
                            <p className="text-gray-600">{perfil.descripcion}</p>
                        </div>
                    )}
                </div>
            </Box>
        </>
    )

}

export default EmpresaDetalles;