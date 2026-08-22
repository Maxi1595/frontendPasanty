import { useEffect, useState } from "react";
import { getUsuario, putFoto } from "../api/usuarioApi";
import { Box, Button, TextField } from "@mui/material";
import { postSubirCV } from "../api/pasantesApi";
import ViewCV from "../components/ViewCV";
import Avatar from "../components/Avatar";

import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { getPerfilEmpresa, getPerfilPasante, putPerfilPasante, putPerfilEmpresa } from "../api/perfilApi";

const Perfil = () => {

    const { user } = useContext(AuthContext);
    const [archivo, setArchivo] = useState(null);
    const [foto, setFoto] = useState(null)
    const [perfil, setPerfil] = useState({})
    const [edicion, setEdicion] = useState(false);

    const handleUpload = async () => {
        await postSubirCV(archivo);
    }

    useEffect(() => {
        if (user.user.rol === 3) {
            getPerfilPasante().then(req => {
                setPerfil(req),
                console.log(req)
            })
        } else {
            getPerfilEmpresa().then(req => {
                setPerfil(req),
                console.log(req)
            })
        }
    }, [])

    const handleEdicion = () => {
        setEdicion(true);
        console.log(edicion)
    }

    const handleVista = () => {
        setEdicion(false)
        console.log(edicion);
    }

    const handleGuardar = async () => {
        if (user.user.rol === 3) {
            await putPerfilPasante(perfil);
        } else {
            await putPerfilEmpresa(perfil)
        }
        setEdicion(false);
    }

    return (
        <>

            {user.user.rol === 3 && (
                <>
                    {edicion === false ? (
                        <Box>
                            <Button onClick={handleEdicion}>Modo edicion</Button>
                            <Box className="flex flex-row gap-4 p-6 w-full">
                                <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                    {user && (
                                        <div key={user.user.id}>
                                            <Avatar id={user.user.id} nombre={user.user.username}></Avatar>
                                            <p className="text-xl font-bold">{user.user.username}</p>
                                            <p className="text-gray-500">{user.user.correo}</p>
                                        </div>
                                    )}
                                </div>
                                {perfil && (
                                    <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                                        <h2 className="text-lg font-semibold mb-2">Sobre mí</h2>
                                        <p className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>{perfil.descripcion}</p>
                                    </div>
                                )}
                            </Box>
                            <Box className="flex flex-row gap-4 p-6 w-full">
                                {perfil.seccion1Titulo && (
                                    <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                        <h3>{perfil.seccion1Titulo}</h3>
                                        <p>{perfil.seccion1Contenido}</p>
                                    </Box>
                                )}
                                {perfil.seccion2Titulo && (
                                    <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                        <h3>{perfil.seccion2Titulo}</h3>
                                        <p>{perfil.seccion2Contenido}</p>
                                    </Box>
                                )}
                                {perfil.seccion3Titulo && (
                                    <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                        <h3>{perfil.seccion3Titulo}</h3>
                                        <p>{perfil.seccion3Contenido}</p>
                                    </Box>
                                )}
                            </Box>

                            <ViewCV esPropio={true} />
                            <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
                            <Button onClick={handleUpload}>insertar CV</Button>
                        </Box>
                    ) : (
                        <Box>
                            <Button onClick={handleVista}>Modo vista</Button>
                            <Box className="flex flex-row gap-4 p-6 w-full">
                                <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                    {user && (
                                        <div key={user.user.id}>
                                            
                                            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                                                {user?.user?.username?.charAt(0).toUpperCase()}
                                            </div>
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
                                            <Button onClick={() => document.getElementById('foto-input').click()}>
                                                Cambiar foto
                                            </Button>
                                            <p className="text-xl font-bold">{user.user.username}</p>
                                            <p className="text-gray-500">{user.user.correo}</p>
                                            <TextField
                                                value={perfil.linkedin}
                                                onChange={(e) => setPerfil({ ...perfil, linkedin: e.target.value })}
                                            />
                                            <TextField
                                                value={perfil.portfolio}
                                                onChange={(e) => setPerfil({ ...perfil, portfolio: e.target.value })}
                                            />
                                            <TextField
                                                value={perfil.habilidades}
                                                onChange={(e) => setPerfil({ ...perfil, habilidades: e.target.value })}
                                                multiline
                                                inputProps={{ maxLength: 500 }}
                                                helperText={`${perfil?.habilidades?.length || 0}/500`} />
                                        </div>
                                    )}
                                </div>
                                {perfil && (
                                    <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                                        <h2 className="text-lg font-semibold mb-2">Sobre mí</h2>
                                        <TextField className="text-gray-600"
                                            value={perfil.descripcion}
                                            onChange={(e) => setPerfil({ ...perfil, descripcion: e.target.value })}
                                            multiline
                                        />
                                        <Button onClick={handleGuardar}>Guardar</Button>
                                    </div>
                                )}
                            </Box>
                            <Box className="flex flex-row gap-4 p-6 w-full">
                                <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                    <p>Titulo</p>
                                    <TextField
                                        value={perfil.seccion1Titulo}
                                        onChange={(e) => setPerfil({ ...perfil, seccion1Titulo: e.target.value })}
                                    />
                                    <p>Contenido</p>
                                    <TextField
                                        value={perfil.seccion1Contenido}
                                        onChange={(e) => setPerfil({ ...perfil, seccion1Contenido: e.target.value })}
                                    />
                                </Box>
                                <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                    <p>Titulo</p>
                                    <TextField
                                        value={perfil.seccion2Titulo}
                                        onChange={(e) => setPerfil({ ...perfil, seccion2Titulo: e.target.value })}
                                    />
                                    <p>Contenido</p>
                                    <TextField
                                        value={perfil.seccion2Contenido}
                                        onChange={(e) => setPerfil({ ...perfil, seccion2Contenido: e.target.value })}
                                    />
                                </Box>
                                <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/3">
                                    <p>Titulo</p>
                                    <TextField
                                        value={perfil.seccion3Titulo}
                                        onChange={(e) => setPerfil({ ...perfil, seccion3Titulo: e.target.value })}
                                    />
                                    <p>Contenido</p>
                                    <TextField
                                        value={perfil.seccion3Contenido}
                                        onChange={(e) => setPerfil({ ...perfil, seccion3Contenido: e.target.value })}
                                    />
                                </Box>
                            </Box>
                            <ViewCV esPropio={true} />
                            <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
                            <Button onClick={handleUpload}>insertar CV</Button>
                        </Box>
                    )}
                </>
            )}

            {user.user.rol === 5 && (
                <>
                    {edicion === false ? (
                        <Box>
                            <Button onClick={handleEdicion}>Modo edicion</Button>
                            {/* BANNER */}
                            <div className="w-full h-40 bg-gray-300 rounded-b-lg" />

                            {/* LOGO + NOMBRE centrado */}
                            <div className="flex flex-col items-center -mt-12 mb-6">
                                
                                <Avatar id={user.user.id} nombre={user.user.username}></Avatar>
                                {/* <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white">
                                    {user?.user?.username?.charAt(0).toUpperCase()}
                                </div> */}
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
                                {perfil && (
                                    <div className="flex flex-col bg-gray-100 rounded-lg p-6 w-2/3">
                                        <h2 className="text-lg font-semibold mb-2">Sobre nosotros</h2>
                                        <p className="text-gray-600">{perfil.descripcion}</p>
                                    </div>
                                )}
                            </div>
                        </Box>
                    ) : (
                        <Box>
                            <Button onClick={handleVista}>Modo vista</Button>
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
                                    <TextField
                                        value={perfil.linkedin}
                                        onChange={(e) => setPerfil({ ...perfil, linkedin: e.target.value })}
                                    />
                                    <TextField
                                        value={perfil.sitioWeb}
                                        onChange={(e) => setPerfil({ ...perfil, linkedin: e.target.value })}
                                    />
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
                            <Box className="flex flex-row gap-4 p-6 w-full">
                                <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/2">
                                    <p>mision</p>
                                    <TextField
                                        value={perfil.mision}
                                        onChange={(e) => setPerfil({ ...perfil, mision: e.target.value })}
                                        multiline
                                    />
                                </Box>
                                <Box className="flex flex-col items-center bg-gray-100 rounded-lg p-6 w-1/2">
                                    <p>vision</p>
                                    <TextField
                                        value={perfil.vision}
                                        onChange={(e) => setPerfil({ ...perfil, vision: e.target.value })}
                                    />
                                </Box>
                            </Box>
                            <Box className="flex flex-col bg-gray-100 rounded-lg p-6 m-2 w-full">
                                <p>historia</p>
                                <TextField
                                    value={perfil.historia}
                                    onChange={(e) => setPerfil({ ...perfil, historia: e.target.value })}
                                    multiline
                                />
                            </Box>
                            <Box className="flex flex-col bg-gray-100 rounded-lg p-6 w-full">
                                <p>beneficios</p>
                                <TextField
                                    value={perfil.beneficios}
                                    onChange={(e) => setPerfil({ ...perfil, beneficios: e.target.value })}
                                    multiline
                                />
                            </Box>
                            <Button onClick={handleGuardar}>Guardar</Button>
                        </Box>
                    )}
                </>
            )}
        </>
    )
}

export default Perfil;