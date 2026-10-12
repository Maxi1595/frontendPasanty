import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmpresaById } from "../api/empresaApi";
import { getPerfilEmpresa, getPerfilEmpresaByParams } from "../api/perfilApi";
import { Box } from "@mui/material"
import Avatar from "../components/Avatar";
import Banner from "../components/Banner";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { getVacanteByIdUsuario } from "../api/vacantesApi";
import VacanteCart from "../components/VacanteCart"

const EmpresaDetalles = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({})
    const [perfil, setPerfil] = useState({})
    const [vacantes, setVacantes] = useState([])

    useEffect(() => {
        getEmpresaById(id).then(req => {
            setUsuario(req),
                console.log(req)
        })
        getPerfilEmpresaByParams(id).then(req => {
            setPerfil(req),
                console.log(req)
        })
        getVacanteByIdUsuario(id).then(req => {
            setVacantes(req),
                console.log(req)
        })

    }, [])

    return (
        <>
            <Box className="flex flex-col items-center mx-auto bg-[#EDEBE2] rounded-2xl w-4/5 my-2 pb-10">

                {/* BANNER */}
                <div className="flex justify-center items-center w-full px-6">
                    <div className="w-3/4 rounded-2xl overflow-hidden">
                        <Banner url={perfil.banner} />
                    </div>
                </div>

                {/* LOGO + NOMBRE */}
                <div className="flex flex-col items-center -mt-10 mb-5">
                    <div>
                        <Avatar id={id} nombre={usuario.nombre} />
                    </div>
                    <h1 className="text-2xl font-bold mt-3 text-[#10211A]">{usuario.nombre}</h1>
                    <p className="text-sm text-[#4A5C53] mt-1">
                        {usuario?.empresa?.especialidad?.replace(/_/g, " ")}
                    </p>
                </div>

                {/* SECCIÓN INICIO */}
                <div className="w-full max-w-4xl px-6">
                    <div className="flex flex-row gap-4 w-full">
                        {/* Información general */}
                        <div className="flex flex-col gap-4 bg-white rounded-2xl border border-[#DCD9CE] p-6 w-1/3">
                            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#4A5C53]">
                                Información general
                            </h2>
                            <div>
                                <p className="text-xs text-[#4A5C53] mb-1">Rubro</p>
                                <p className="text-sm font-medium text-[#10211A]">
                                    {usuario?.empresa?.especialidad?.replace(/_/g, " ")}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-[#4A5C53] mb-1">Dirección</p>
                                <p className="text-sm font-medium text-[#10211A]">
                                    {usuario?.empresa?.direccion}
                                </p>
                            </div>
                            {usuario?.empresa?.telefono && (
                                <div>
                                    <p className="text-xs text-[#4A5C53] mb-1">Teléfono</p>
                                    <p className="text-sm font-medium text-[#10211A]">
                                        {usuario.empresa.telefono}
                                    </p>
                                </div>
                            )}
                            {perfil?.linkedin && (
                                <div>
                                    <p className="text-xs text-[#4A5C53] mb-1">Linkedin</p>
                                    <p className="text-sm font-medium text-[#10211A]">
                                        {perfil.linkedin}
                                    </p>
                                </div>
                            )}
                            {perfil?.sitioWeb && (
                                <div>
                                    <p className="text-xs text-[#4A5C53] mb-1">Sitio Web</p>
                                    <p className="text-sm font-medium text-[#10211A]">
                                        {perfil.sitioWeb}
                                    </p>
                                </div>
                            )}
                            {perfil?.beneficios && (
                                <div>
                                    <p className="text-xs text-[#4A5C53] mb-1">Beneficios</p>
                                    <p className="text-sm font-medium text-[#10211A]">
                                        {perfil.beneficios}
                                    </p>
                                </div>
                            )}
                            {perfil?.cantidadEmpleados && (
                                <div>
                                    <p className="text-xs text-[#4A5C53] mb-1">Empleados</p>
                                    <p className="text-sm font-medium text-[#10211A]">
                                        {perfil.cantidadEmpleados}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sobre nosotros (resumen) */}
                        {perfil && (
                            <div className="flex flex-col bg-white rounded-2xl border border-[#DCD9CE] p-6 w-2/3">
                                <h2 className="text-xs font-semibold uppercase tracking-wide text-[#4A5C53] mb-3">
                                    Sobre nosotros
                                </h2>
                                <p
                                    className="text-[#10211A] text-[15px] leading-relaxed"
                                    style={{ whiteSpace: "pre-wrap" }}
                                >
                                    {perfil.descripcion}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* SECCIÓN VACANTES */}
                    <div className="w-full max-w-4xl h-150 px-6 py-5 ">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-[#4A5C53] mb-4 px-1">
                            Vacantes ({vacantes.length})
                        </h2>
                        <div className="flex flex-col gap-3">
                            {vacantes.map((v) => (
                                <VacanteCart key={v.id} vacante={v} />
                            ))}
                        </div>
                    </div>
                </div>


            </Box>


        </>
    )

}

export default EmpresaDetalles;