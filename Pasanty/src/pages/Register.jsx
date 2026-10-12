import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, FormHelperText, TextField, Box, Button, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { registroApi } from '../api/authApi';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Register = () => {
    const [rol, setRol] = useState("pasante");
    const [datos, setDatos] = useState({});
    const navegate = useNavigate();

    const [errores, setErrores] = useState({});
    const [errorGeneral, setErrorGeneral] = useState("");

    useEffect(() => {

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores({});
        setErrorGeneral("");

        try {
            const tipo = rol;
            const respuesta = await registroApi(tipo, datos);

            console.log(respuesta);

            if (respuesta.error) {
                setErrorGeneral(respuesta.error);
                return;
            }

            navegate("/verificar");

        } catch (error) {
            console.log("Estado HTTP:", error.response?.status);
            console.log("Respuesta del backend:", error.response?.data);

            const respuesta = error.response?.data;

            const mensaje =
                respuesta?.error?.message ||
                respuesta?.mensaje ||
                respuesta?.message ||
                (typeof respuesta?.error === "string" ? respuesta.error : null);

            setErrores({});
            setErrorGeneral("");

            if (!mensaje) {
                setErrorGeneral("No se pudo completar el registro. Intentá nuevamente.");
                return;
            }

            const texto = String(mensaje).toLowerCase();

            if (texto.includes("correo") || texto.includes("email")) {
                setErrores({ correo: String(mensaje) });
            } else if (
                texto.includes("contraseña") ||
                texto.includes("contrasena") ||
                texto.includes("password")
            ) {
                setErrores({ contrasena: String(mensaje) });
            } else if (texto.includes("nombre")) {
                setErrores({ nombre: String(mensaje) });
            } else if (
                texto.includes("dirección") ||
                texto.includes("direccion")
            ) {
                setErrores({ direccion: String(mensaje) });
            } else if (texto.includes("especialidad")) {
                setErrores({ especialidad: String(mensaje) });
            } else {
                setErrorGeneral(String(mensaje));
            }
        }
    };



    return (
        <>
            <Box className="flex flex-col justify-center items-center min-h-screen bg-gray-250 px-4">
                <Box className="flex flex-row mb-8">
                    <img
                        className="w-12 h-12 rounded-full mr-3"
                        src={logo}
                        alt="Logo" />
                    <Typography className="text-5xl font-bold text-green-500">Pasanty</Typography>
                </Box>
                <Box className="bg-gray-200 border border-gray-800 rounded-2xl px-8 py-8 w-full max-w-md">
                    <Box className="flex flex-col text-center">
                        <Typography className="text-2xl font-bold pb-4">Crear cuenta</Typography>
                        <Typography className="text-sm text-gray-500 pb-4">Gratis para estudiantes y empresas.</Typography>
                    </Box>
                    <div className="flex flex-row bg-gray-300 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setRol("pasante")}
                            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${rol === "pasante" ? "bg-gray-100 text-black" : "text-black hover:text-gray-700"}`}
                        >
                            Pasante
                        </button>
                        <button
                            onClick={() => setRol("empresa")}
                            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${rol === "empresa" ? "bg-gray-100 text-black" : "text-black hover:text-gray-700"}`}
                        >
                            Empresa
                        </button>
                    </div>
                    <Box className="flex flex-col justify-evenly h-full w-full">
                        {rol === "pasante" ? (
                            <form onSubmit={handleSubmit}>
                                <Box className="flex flex-col gap-y-[10px]">
                                    <TextField
                                        id="nombre"
                                        name="nombre"
                                        label="Nombre"
                                        type="text"
                                        onChange={(e) => {
                                            const soloLetras = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "");
                                            setDatos({
                                                ...datos,
                                                nombre: soloLetras
                                            });
                                            setErrores((prev) => ({
                                                ...prev,
                                                nombre: ""
                                            }));
                                        }}
                                        error={Boolean(errores.nombre)}
                                        helperText={errores.nombre || ""}
                                    />
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        onChange={(e) => {
                                            setDatos({
                                                ...datos,
                                                correo: e.target.value
                                            });

                                            setErrores((prev) => ({
                                                ...prev,
                                                correo: ""
                                            }));

                                            setErrorGeneral("");
                                        }}
                                        error={Boolean(errores.correo)}
                                        helperText={errores.correo || ""} />
                                    <TextField
                                        id="contrasena"
                                        name="contrasena"
                                        label="Contrasena"
                                        type="password"
                                        onChange={(e) => {
                                            setDatos({
                                                ...datos,
                                                contrasena: e.target.value
                                            });

                                            setErrores((prev) => ({
                                                ...prev,
                                                contrasena: ""
                                            }));

                                            setErrorGeneral("");
                                        }}
                                        error={Boolean(errores.contrasena)}
                                        helperText={errores.contrasena || ""} />

                                    <TextField
                                        id="direccion"
                                        name="direccion"
                                        label="Direccion"
                                        type="text"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            direccion: e.target.value
                                        })
                                        }
                                        error={Boolean(errores.direccion)}
                                        helperText={errores.direccion || ""} />
                                    <InputLabel>estado academico</InputLabel>
                                    <Select
                                        id="estadoAcademico"
                                        name="estadoAcademico"
                                        label="Estado academico"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            estadoAcademico: e.target.value
                                        })}
                                    >
                                        <MenuItem value="Primer_año">Primer año</MenuItem>
                                        <MenuItem value="Segundo_año">Segundo año</MenuItem>
                                        <MenuItem value="Tercer_año">Tercer año</MenuItem>
                                        <MenuItem value="Cuarto_año">Cuarto año</MenuItem>
                                        <MenuItem value="Quinto_año">Quinto año</MenuItem>
                                        <MenuItem value="Sexto_año">Sexto año</MenuItem>
                                        <MenuItem value="Graduado">Graduado</MenuItem>
                                    </Select>

                                    <FormControl
                                        error={Boolean(errores.especialidad)}
                                        fullWidth
                                    >
                                        <InputLabel>Profesión</InputLabel>

                                        <Select
                                            id="especialidad"
                                            name="especialidad"
                                            label="Especialidad"
                                            value={datos.especialidad || ""}
                                            onChange={(e) => {
                                                setDatos({
                                                    ...datos,
                                                    especialidad: e.target.value
                                                });

                                                setErrores((prev) => ({
                                                    ...prev,
                                                    especialidad: ""
                                                }));
                                            }}
                                        >

                                            <MenuItem value="ingenieria_informatica">Ingeniería Informática</MenuItem>
                                            <MenuItem value="Ingeniería_en_Sistemas">Ingeniería en Sistemas</MenuItem>
                                            <MenuItem value="Ingeniería_Electrónica">Ingeniería Electrónica</MenuItem>
                                            <MenuItem value="diseño_grafico">Diseño Gráfico</MenuItem>
                                            <MenuItem value="marketing">Marketing</MenuItem>
                                            <MenuItem value="Ingeniería_Industrial">Ingeniería Industrial</MenuItem>
                                            <MenuItem value="Ingeniería_Civil">Ingeniería Civil</MenuItem>
                                            <MenuItem value="Ingeniería_Mecánica">Ingeniería Mecánica</MenuItem>
                                            <MenuItem value="Ingeniería_Eléctrica">Ingeniería Eléctrica</MenuItem>
                                            <MenuItem value="Ingeniería_Química">Ingeniería Química</MenuItem>
                                            <MenuItem value="Ingeniería_Ambiental">Ingeniería Ambiental</MenuItem>
                                            <MenuItem value="Ingeniería_en_Energías_Renovables">Ingeniería en Energías Renovables</MenuItem>
                                            <MenuItem value="Ingeniería_Biomédica">Ingeniería Biomédica</MenuItem>
                                            <MenuItem value="Ciencias_de_la_Computación">Ciencias de la Computación</MenuItem>
                                            <MenuItem value="Desarrollo_de_Software">Desarrollo de Software</MenuItem>
                                            <MenuItem value="Análisis_de_Sistemas">Análisis de Sistemas</MenuItem>
                                            <MenuItem value="Ciberseguridad">Ciberseguridad</MenuItem>
                                            <MenuItem value="Inteligencia_Artificial">Inteligencia Artificial</MenuItem>
                                            <MenuItem value="Ciencia_de_Datos">Ciencia de Datos</MenuItem>
                                            <MenuItem value="Robótica">Robótica</MenuItem>
                                            <MenuItem value="Diseño_Gráfico">Diseño Gráfico</MenuItem>
                                            <MenuItem value="Diseño_Industrial">Diseño Industrial</MenuItem>
                                            <MenuItem value="Diseño_de_Interiores">Diseño de Interiores</MenuItem>
                                            <MenuItem value="Diseño_UX/UI">Diseño UX/UI</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {errores.especialidad || ""}
                                        </FormHelperText>
                                    </FormControl>
                                    <Link className="text-green-700" to="/login">Ya tengo una cuenta</Link>

                                    {errorGeneral && (
                                        <Typography color="error" variant="body2">
                                            {errorGeneral}
                                        </Typography>
                                    )}
                                    <Button className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors" type="submit" >Registrarse</Button>
                                </Box>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <Box className="flex flex-col gap-y-[10px]">
                                    <TextField
                                        id="nombre"
                                        name="nombre"
                                        label="Nombre de la empresa"
                                        type="text"
                                        onChange={(e) => {
                                            const soloLetras = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "");
                                            setDatos({
                                                ...datos,
                                                nombre: soloLetras
                                            });
                                            setErrores((prev) => ({
                                                ...prev,
                                                nombre: ""
                                            }));
                                        }}
                                        error={Boolean(errores.nombre)}
                                        helperText={errores.nombre || ""}
                                    />
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        onChange={(e) => {
                                            setDatos({
                                                ...datos,
                                                correo: e.target.value
                                            });

                                            setErrores((prev) => ({
                                                ...prev,
                                                correo: ""
                                            }));

                                            setErrorGeneral("");
                                        }}
                                        error={Boolean(errores.correo)}
                                        helperText={errores.correo || ""} />
                                    <TextField
                                        id="contrasena"
                                        name="contrasena"
                                        label="Contraseña"
                                        type="password"
                                        onChange={(e) => {
                                            setDatos({
                                                ...datos,
                                                contrasena: e.target.value
                                            });

                                            setErrores((prev) => ({
                                                ...prev,
                                                contrasena: ""
                                            }));

                                            setErrorGeneral("");
                                        }}
                                        error={Boolean(errores.contrasena)}
                                        helperText={errores.contrasena || ""} />
                                    <TextField
                                        id="direccion"
                                        name="direccion"
                                        label="Direccion"
                                        type="text"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            direccion: e.target.value
                                        })
                                        }
                                        error={Boolean(errores.direccion)}
                                        helperText={errores.direccion || ""} />
                                    <TextField
                                        id="telefono"
                                        name="telefono"
                                        label="Numero de telefono (opcional)"
                                        type="text"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            telefono: e.target.value
                                        })
                                        } />
                                    <FormControl
                                        error={Boolean(errores.especialidad)}
                                        fullWidth
                                    >
                                        <InputLabel>Profesión</InputLabel>

                                        <Select
                                            id="especialidad"
                                            name="especialidad"
                                            label="Especialidad"
                                            value={datos.especialidad || ""}
                                            onChange={(e) => {
                                                setDatos({
                                                    ...datos,
                                                    especialidad: e.target.value
                                                });

                                                setErrores((prev) => ({
                                                    ...prev,
                                                    especialidad: ""
                                                }));
                                            }}
                                        >

                                            <MenuItem value="Desarrollo_de_Software">Desarrollo de Software</MenuItem>
                                            <MenuItem value="Ingenieria_Informatica_y_Sistemas">Ingeniería Informática y Sistemas</MenuItem>
                                            <MenuItem value="Ingenieria_Electronica_y_Automatizacion">Ingeniería Electrónica y Automatización</MenuItem>
                                            <MenuItem value="Diseno_Grafico_y_Branding">Diseño Gráfico y Branding</MenuItem>
                                            <MenuItem value="Marketing_y_Publicidad">Marketing y Publicidad</MenuItem>
                                            <MenuItem value="Ingenieria_Industrial">Ingeniería Industrial</MenuItem>
                                            <MenuItem value="Ingenieria_Civil_y_Construccion">Ingeniería Civil y Construcción</MenuItem>
                                            <MenuItem value="Ingenieria_Mecanica">Ingeniería Mecánica</MenuItem>
                                            <MenuItem value="Ingenieria_Electrica">Ingeniería Eléctrica</MenuItem>
                                            <MenuItem value="Ingenieria_Quimica">Ingeniería Química</MenuItem>
                                            <MenuItem value="Ingenieria_Ambiental">Ingeniería Ambiental</MenuItem>
                                            <MenuItem value="Energias_Renovables">Energías Renovables</MenuItem>
                                            <MenuItem value="Ingenieria_Biomedica">Ingeniería Biomédica</MenuItem>
                                            <MenuItem value="Ciberseguridad">Ciberseguridad</MenuItem>
                                            <MenuItem value="Inteligencia_Artificial">Inteligencia Artificial</MenuItem>
                                            <MenuItem value="Ciencia_de_Datos_y_Analisis">Ciencia de Datos y Análisis</MenuItem>
                                            <MenuItem value="Robotica_y_Automatizacion">Robótica y Automatización</MenuItem>
                                            <MenuItem value="Diseno_UX_UI">Diseño UX/UI</MenuItem>
                                            <MenuItem value="Diseno_Industrial">Diseño Industrial</MenuItem>
                                            <MenuItem value="Diseno_de_Interiores">Diseño de Interiores</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {errores.especialidad || ""}
                                        </FormHelperText>
                                    </FormControl>
                                    {errorGeneral && (
                                        <Typography color="error" variant="body2">
                                            {errorGeneral}
                                        </Typography>
                                    )}
                                    <Link className="text-green-700" to="/login">Ya tengo una cuenta</Link>
                                    <Button type="submit" className='bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors' >Registrarse</Button>
                                </Box>
                            </form>
                        )}
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default Register;