import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, TextField, Box, Button, InputLabel, Select, MenuItem } from '@mui/material'
import { registroApi } from '../api/authApi';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [rol, setRol] = useState("pasante");
    const [datos, setDatos] = useState({});
    const navegate = useNavigate();

    useEffect(() => {

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tipo = rol;

        if (tipo && datos) {
            const respuesta = await registroApi(tipo, datos);
            console.log(respuesta);

            if (respuesta.error) {
                alert(respuesta.error);
                return;
            }

            navegate("/login");
        } else {
            alert("error");
        }
    }



    return (
        <>
            <Box className="flex justify-center items-center w-full h-screen">
                <Box className={`flex flex-col items-center border px-6 py-2 rounded
                    ${rol === "pasante"
                        ? "w-lg h-[512px]"
                        : "w-2xl h-[600px]"}`}>
                    <FormControl>
                        <FormLabel id="rol"> Registrarme como: </FormLabel>
                        <RadioGroup row name="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                            <FormControlLabel value="pasante" control={<Radio />} label="Pasante" />
                            <FormControlLabel value="empresa" control={<Radio />} label="Empresa" />
                        </RadioGroup>
                    </FormControl>
                    <Box className="flex flex-col justify-evenly h-full w-full">
                        {rol === "pasante" ? (
                            <form onSubmit={handleSubmit}>
                                <Box className="flex flex-col gap-y-[10px] h-screen">
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
                                        }}
                                    />
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            correo: e.target.value
                                        })
                                        } />
                                    <TextField
                                        id="contrasena"
                                        name="contrasena"
                                        label="Contrasena"
                                        type="password"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            contrasena: e.target.value
                                        })
                                        } />
                                    <InputLabel>Profesión</InputLabel>
                                    <Select
                                        id="especialidad"
                                        name="especialidad"
                                        label="Especialidad"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            especialidad: e.target.value
                                        })}
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
                                    <Link to="/login">Ya tengo una cuenta</Link>
                                    <Button className="flex justify-center items-end" type="submit" >Registrarse</Button>
                                </Box>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <Box className="flex flex-col gap-y-[10px] h-screen">
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
                                        }}
                                    />
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            correo: e.target.value
                                        })
                                        } />
                                    <TextField
                                        id="contrasena"
                                        name="contrasena"
                                        label="Contraseña"
                                        type="password"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            contrasena: e.target.value
                                        })
                                        } />
                                    <TextField
                                        id="direccion"
                                        name="direccion"
                                        label="Direccion"
                                        type="text"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            direccion: e.target.value
                                        })
                                        } />
                                    <TextField
                                        id="telefono"
                                        name="telefono"
                                        label="Numero de telefono"
                                        type="text"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            telefono: e.target.value
                                        })
                                        } />
                                    <InputLabel>Profesión</InputLabel>
                                    <Select
                                        id="especialidad"
                                        name="especialidad"
                                        label="Especialidad"
                                        onChange={(e) => setDatos({
                                            ...datos,
                                            especialidad: e.target.value
                                        })}
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
                                    <Link to="/login">Ya tengo una cuenta</Link>
                                    <Button type="submit" >Registrarse</Button>
                                </Box>
                            </form>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Register;