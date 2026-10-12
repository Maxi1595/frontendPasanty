import { useEffect, useState, useRef } from "react";
import { getUsuario, putFoto } from "../api/usuarioApi";
import { Box, Button, TextField } from "@mui/material";
import { postSubirCV } from "../api/pasantesApi";
import ViewCV from "../components/ViewCV";
import Avatar from "../components/Avatar";
import Banner from "../components/Banner";
import VacanteCart from "../components/VacanteCart"
import TagSelector from "../components/TagSelector";
import Tag from "../components/Tag"
import PerfilPasanteView from "../components/PerfilPasanteView";



import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { getPerfilEmpresa, getPerfilPasante, putPerfilPasante, putPerfilEmpresa, putBannerEmpresa } from "../api/perfilApi";
import { getVacanteById } from "../api/vacantesApi";

const Perfil = () => {

    const { user } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({})
    const [archivo, setArchivo] = useState(null);
    const [perfil, setPerfil] = useState({ tags: [] })
    const [edicion, setEdicion] = useState(false);
    const [vacantes, setVacantes] = useState([])
    const [estado, setEstado] = useState("inicio")

    const refInicio = useRef(null);
    const refNosotros = useRef(null);
    const refVacantes = useRef(null);

    const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

    useEffect(() => {

        getUsuario().then(req => {
            setUsuario(req);
            console.log(req)
        })

        if (user.user.rol === 3) {
            getPerfilPasante().then(req => {
                setPerfil({
                    ...req,
                    tags: req.tags ? req.tags.split(",") : []
                }),
                    console.log(req)
            })
        } else {
            getPerfilEmpresa().then(req => {
                setPerfil(req),
                    console.log(req)
            })
            getVacanteById().then(req => {
                setVacantes(req),
                    console.log(req)
            })
        }
    }, [])

    const handleUpload = async () => {
        await postSubirCV(archivo);
    }

    const handleEdicion = () => {
        setEdicion(true);
        console.log(edicion)
    }

    const handleVista = () => {
        setEdicion(false)
        console.log(edicion);
    }

    const handleGuardar = async () => {
        const perfilAGuardar = {
            ...perfil,
            tags: Array.isArray(perfil.tags)
                ? perfil.tags.join(",")
                : perfil.tags
        };
        if (user.user.rol === 3) {
            await putPerfilPasante(perfilAGuardar);
        } else {
            await putPerfilEmpresa(perfilAGuardar)
        }
        setEdicion(false);
    }

    return (
        <>
            <div className="bg-gray-200">

                {user.user.rol === 3 && (
                    <>
                        {edicion === false ? (
                            <Box className="flex flex-col w-3/4 mx-auto p-2 my-2">
                                <Button className="bg-green-500 text-white px-5 py-2 mb-2 mx-auto rounded-lg font-semibold hover:bg-green-600 transition-colors w-40" onClick={handleEdicion}>Modo edicion</Button>
                                <PerfilPasanteView
                                    pasante={{
                                        usuario: {
                                            nombre: user.user.username,
                                            correo: user.user.correo
                                        },
                                        especialidad: usuario.pasante?.especialidad,
                                        estadoAcademico: usuario.pasante?.estadoAcademico,
                                        cv: usuario.pasante?.cv,
                                        usuarioId: user.user.id
                                    }}
                                    perfil={perfil}
                                    usuarioId={user.user.id}
                                    pasanteId={usuario.pasante?.id}
                                    esPropio={false}
                                />
                                {/* <Box className="gap-4 p-6 w-full">
                                    <div className="flex flex-row items-center justify-between bg-gray-100 rounded-lg w-full h-40">
                                        {user && (
                                            <div className="flex justify-between w-full mx-3" key={user.user.id}>
                                                <div className="flex flex-row item-center justify-center my-auto">
                                                    <Avatar id={user.user.id} nombre={user.user.username}></Avatar>
                                                    <div className="flex flex-col items-start p-8">

                                                        <p className="text-2xl font-bold">{user.user.username}</p>
                                                        <p className="text-gray-500">{usuario?.pasante?.especialidad}</p>
                                                    </div>
                                                </div>
                                                <div className="text-base my-auto text-end">
                                                    <div className="flex flex-row text-end">
                                                        <h2 className="text-lg font-semibold pr-3">Correo:</h2>
                                                        <p className="text-gray-500">{user.user.correo}</p>
                                                    </div>
                                                    {perfil.linkedin && (
                                                        <div className="flex flex-row">
                                                            <h2 className="text-lg font-semibold pr-3">Linkedin:</h2>
                                                            <p className="text-gray-500">{perfil.linkedin}</p>
                                                        </div>
                                                    )}
                                                    {perfil.portfolio && (
                                                        <div className="flex flex-row text-end">
                                                            <h2 className="text-lg font-semibold pr-3">Portfolio:</h2>
                                                            <p className="text-gray-500">{perfil.portfolio}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Box>
                                <Box>
                                    <Box className="flex flex-col w-full">

                                        {perfil && (
                                            <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-full">
                                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Sobre mí</h2>
                                                <p className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>{perfil.descripcion}</p>
                                            </div>
                                        )}
                                        <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-full my-4 ">
                                            <h2 className="text-lg font-semibold mb-2">Habildades Tecnicas</h2>
                                            {perfil.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {(Array.isArray(perfil.tags)
                                                        ? perfil.tags
                                                        : perfil.tags.split(",")
                                                    ).map((h) => (
                                                        <Tag key={h} nombre={h} />
                                                    ))}
                                                </div>
                                            )}
                                        </Box>
                                        {perfil.formacion && (
                                            <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-full">
                                                <h2 className="text-lg font-semibold mb-2">Sobre mi formación</h2>
                                                <p className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>{perfil.formacion}</p>
                                            </Box>
                                        )}
                                        {perfil.proyectos && (
                                            <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-full m-4">
                                                <h2 className="text-lg font-semibold mb-2">Proyectos académicos</h2>
                                                <p className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>{perfil.proyectos}</p>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>

                                <ViewCV esPropio={true} />
                                <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
                                <Button onClick={handleUpload}>insertar CV</Button> */}
                            </Box>
                        ) : (
                            <Box className="flex flex-col justify-center item-center w-1/2 mx-auto">
                                <Button className="bg-green-500 text-white px-5 py-2 mb-2 mx-auto rounded-lg font-semibold hover:bg-green-600 transition-colors w-50" onClick={handleVista}>Modo vista</Button>
                                <Box className="flex flex-col gap-4 p-6 w-full">
                                    {/* 
                                <div className="flex flex-row items-center bg-gray-100 rounded-lg p-6 w-full">
                                {user && (
                                    <div className="flex justify-between w-full mx-24" key={user.user.id}>
                                    <div className="flex flex-col item-center justify-center">
                                    <Avatar id={user.user.id} nombre={user.user.username}></Avatar>
                                    <p className="text-2xl font-bold">{user.user.username}</p>
                                    </div>
                                    <div>
                                    <p className="text-gray-500">{user.user.correo}</p>
                                    </div>
                                    </div>
                                    )}
                                    </div> */}
                                    <div className="flex flex-row items-center bg-gray-100 rounded-lg p-6 w-full">
                                        {user && (
                                            <div key={user.user.id} className="flex justify-between w-full mx-24">

                                                <div className="flex flex-col item-center justify-center">
                                                    <Avatar id={user.user.id} nombre={user.user.username}></Avatar>
                                                    <input
                                                        type="file"
                                                        id="foto-input"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}  // ocultás el input feo
                                                        onChange={(e) => {
                                                            const foto = e.target.files[0];
                                                            if (foto) putFoto(foto);  // sube directamente al seleccionar
                                                        }}
                                                    />
                                                    <Button className="bg-green-500 text-white px-5 py-2 mb-2 mx-auto rounded-lg font-semibold hover:bg-green-600 transition-colors w-40" onClick={() => document.getElementById('foto-input').click()}>
                                                        Cambiar foto
                                                    </Button>
                                                    <p className="text-xl font-bold">{user.user.username}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-gray-500">{user.user.correo}</p>
                                                    <h2>Linkedin</h2>
                                                    <TextField
                                                        value={perfil.linkedin}
                                                        onChange={(e) => setPerfil({ ...perfil, linkedin: e.target.value })}
                                                    />
                                                    <h2>portfolio</h2>
                                                    <TextField
                                                        value={perfil.portfolio}
                                                        onChange={(e) => setPerfil({ ...perfil, portfolio: e.target.value })}
                                                    />
                                                    {/* <h2>habilidades</h2>
                                                <TextField
                                                value={perfil.habilidades}
                                                onChange={(e) => setPerfil({ ...perfil, habilidades: e.target.value })}
                                                multiline
                                                inputProps={{ maxLength: 500 }}
                                                helperText={`${perfil?.habilidades?.length || 0}/500`} /> */}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Box>
                                <Box className="flex flex-row">

                                    {perfil && (
                                        <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/2">
                                            <h2 className="text-lg font-semibold mb-2">Sobre mí</h2>
                                            <TextField className="text-gray-600"
                                                value={perfil.descripcion}
                                                onChange={(e) => setPerfil({ ...perfil, descripcion: e.target.value })}
                                                multiline
                                            />
                                        </div>
                                    )}

                                    <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/2">
                                        <h2 className="text-lg font-semibold mb-2">Habilidades técnicas</h2>
                                        {/* <TextField
                                            className="w-full"
                                            value={perfil.habilidades}
                                            onChange={(e) => setPerfil({ ...perfil, habilidades: e.target.value })}
                                            multiline
                                        /> */}
                                        <TagSelector
                                            tags={perfil.tags ?? []}
                                            onChange={(nuevosTags) => setPerfil({ ...perfil, tags: nuevosTags })}
                                        />
                                    </Box>
                                </Box>

                                <Box className="flex flex-row">

                                    <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/2">
                                        <h2 className="text-lg font-semibold mb-2">Proyectos académicos</h2>
                                        <TextField
                                            className="w-full"
                                            value={perfil.proyectos}
                                            onChange={(e) => setPerfil({ ...perfil, proyectos: e.target.value })}
                                            multiline
                                        />
                                    </Box>
                                    <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/2">
                                        <h2 className="text-lg font-semibold mb-2">Sobre mi formación</h2>
                                        <TextField
                                            className="w-full"
                                            value={perfil.formacion}
                                            onChange={(e) => setPerfil({ ...perfil, formacion: e.target.value })}
                                            multiline
                                        />
                                    </Box>
                                </Box>

                                <Button className="bg-green-500 text-white px-5 py-2 mb-2 mx-auto rounded-lg font-semibold hover:bg-green-600 transition-colors w-50" onClick={handleGuardar}>Guardar Cambios</Button>


                                <div className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-400 transition-colors">

                                    {usuario?.pasante?.cv ? <ViewCV esPropio={true} /> : "Seleccioná tu CV en PDF"}

                                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        {usuario?.pasante?.cv ? "Cambiar archivo" : "Seleccionar archivo"}
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            onChange={(e) => setArchivo(e.target.files[0])}
                                        />
                                    </label>
                                    {usuario?.pasante?.cv && (
                                        <button
                                            onClick={handleUpload}
                                            className="bg-green-500 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                                        >
                                            Subir CV
                                        </button>
                                    )}
                                </div>
                            </Box>
                        )}
                    </>
                )}

                {user.user.rol === 5 && (
                    <>
                        {edicion === false ? (



                            <Box className="flex flex-col items-center mx-auto bg-[#EDEBE2] rounded-2xl w-4/5 my-2 pb-10">

                                {/* BARRA SUPERIOR */}
                                <div className="flex justify-end w-full px-6 pt-4">
                                    <Button
                                        onClick={handleEdicion}
                                        className="bg-[#0E7A46] text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-[#0A5B34] transition-colors"
                                    >
                                        Modo edición
                                    </Button>
                                </div>

                                {/* BANNER */}
                                <div className="flex justify-center items-center w-full px-6">
                                    <div className="w-3/4 rounded-2xl overflow-hidden">
                                        <Banner url={perfil.banner} />
                                    </div>
                                </div>

                                {/* LOGO + NOMBRE */}
                                <div className="flex flex-col items-center -mt-10 mb-5">
                                    <div>
                                        <Avatar id={user.user.id} nombre={user.user.username} />
                                    </div>
                                    <h1 className="text-2xl font-bold mt-3 text-[#10211A]">{user?.user?.username}</h1>
                                    <p className="text-sm text-[#4A5C53] mt-1">
                                        {usuario?.empresa?.especialidad?.replace(/_/g, " ")}
                                    </p>
                                </div>

                                {/* SECCIÓN INICIO */}
                                <div ref={refInicio} className="w-full max-w-4xl px-6">
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
                                    <div ref={refVacantes} className="w-full max-w-4xl h-150 px-6 py-5 ">
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



                        ) : (
                            <Box className="flex flex-col items-center justify-center mx-auto border-2 border-solid w-4/5">
                                <Button className="bg-green-500 text-white px-5 py-2 mb-2 rounded-lg font-semibold hover:bg-green-600 transition-colors" onClick={handleVista}>Modo vista</Button>
                                {/* BANNER */}
                                <input
                                    type="file"
                                    id="banner-input"
                                    accept="image/*"
                                    style={{ display: 'none' }}  // ocultás el input feo
                                    onChange={(e) => {
                                        const banner = e.target.files[0];
                                        if (banner) putBannerEmpresa(banner);  // sube directamente al seleccionar
                                    }}
                                />

                                <div className="flex justify-center items-center w-full">
                                    <Banner url={perfil.banner} />
                                </div>

                                {/* LOGO + NOMBRE centrado */}
                                <div className="flex flex-col items-center -mt-12 mb-6">
                                    <Avatar id={user.user.id} nombre={user.user.username}></Avatar>
                                    <h1 className="text-2xl font-bold mt-2">{user?.user?.username}</h1>
                                    {/* <button className="mt-2 px-4 py-1 bg-green-500 text-white rounded-full text-sm">
                                    Ver Vacantes
                                    </button> */}
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            id="foto-input"
                                            accept="image/*"
                                            style={{ display: 'none' }}  // ocultás el input feo
                                            onChange={(e) => {
                                                const foto = e.target.files[0];
                                                if (foto) putFoto(foto);  // sube directamente al seleccionar
                                            }}
                                        />
                                        <Button className="bg-green-500 text-white px-5 py-2 mx-2 mt-2 rounded-lg font-semibold hover:bg-green-600 transition-colors" onClick={() => document.getElementById('foto-input').click()}>
                                            Cambiar foto
                                        </Button>
                                        <Button className="bg-green-500 text-white px-5 py-2 mx-2 mt-2 rounded-lg font-semibold hover:bg-green-600 transition-colors" onClick={() => document.getElementById('banner-input').click()}>
                                            Cambiar banner
                                        </Button>
                                    </div>
                                </div>

                                {/* DOS COLUMNAS */}
                                <div className="flex flex-row gap-4 px-6 w-full">

                                    {/* IZQUIERDA - info rápida */}
                                    <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-1/3">
                                        <p>Direccion</p>
                                        <TextField
                                            value={usuario?.empresa?.direccion}
                                            onChange={(e) => setPerfil({ ...usuario.empresa, direccion: e.target.value })}
                                        />
                                        <p>Telefono</p>
                                        <TextField
                                            value={usuario?.empresa?.telefono}
                                            onChange={(e) => setPerfil({ ...usuario.empresa, telefono: e.target.value })}
                                        />
                                        <p>Linkedin</p>
                                        <TextField
                                            value={perfil.linkedin}
                                            onChange={(e) => setPerfil({ ...perfil, linkedin: e.target.value })}
                                        />
                                        <p>sitioWeb</p>
                                        <TextField
                                            value={perfil.sitioWeb}
                                            onChange={(e) => setPerfil({ ...perfil, sitioWeb: e.target.value })}
                                        />
                                        <p>Cantidad de empleados</p>
                                        <TextField
                                            value={perfil.cantidadEmpleados}
                                            onChange={(e) => setPerfil({ ...perfil, cantidadEmpleados: e.target.value })}
                                        />
                                    </div>

                                    {/* DERECHA - descripción */}
                                    {perfil && (
                                        <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                                            <h2 className="text-lg font-semibold mb-2">Sobre nosotros</h2>
                                            <TextField className="text-gray-600"
                                                value={perfil.descripcion}
                                                onChange={(e) => setPerfil({ ...perfil, descripcion: e.target.value })}
                                                multiline
                                            />
                                        </div>
                                    )}
                                </div>
                                <Button onClick={handleGuardar}>Guardar</Button>
                            </Box>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default Perfil;