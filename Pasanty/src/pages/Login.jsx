import { Box, TextField, Typography, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Login = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navegate = useNavigate();

    const [errores, setErrores] = useState({});
    const [errorGeneral, setErrorGeneral] = useState("");

    const { loginAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = { correo, contrasena }
        try {
            const resultado = await loginApi(datos);
            if (resultado.user && resultado.tokenAccess && resultado.tokenRefresh) {
                loginAuth(resultado);
            } else if (resultado.mensaje) {
                alert(resultado.mensaje);
            } else {
                alert("algo salio mal")
            }
            if (localStorage.getItem("user")) {
                navegate("/");
            }
        }
        catch (error) {
            const respuesta = error.response?.data;
            const mensaje = respuesta?.mensaje || respuesta?.message;

            setErrores({});
            setErrorGeneral("");

            if (mensaje) {
                const texto = mensaje.toLowerCase();

                if (texto.includes("contraseña")) {
                    setErrores({ contrasena: mensaje });
                } else if (texto.includes("correo") || texto.includes("email")) {
                    setErrores({ correo: mensaje });
                } else {
                    setErrorGeneral(mensaje);
                }
            } else {
                setErrorGeneral(mensaje || "No se pudo iniciar sesión. Intentá nuevamente.");
            }
        }
    }

    return (
        <>
            <Box className="inset-0 flex flex-col items-center justify-center w-full h-screen">
                <Box className="flex flex-row ">
                    <img
                        className="w-12 h-12 rounded-full mr-3"
                        src={logo}
                        alt="Logo" />
                    <Typography className="text-5xl font-bold text-green-500">Pasanty</Typography>
                </Box>
                <Box className="flex justify-center items-center rounded-2xl border border-gray-400 p-10 mt-15 w-lg h-110 bg-gray-100">
                    <form onSubmit={handleSubmit}>
                        <FormControl className="flex justify-evenly text-center w-sm h-[384px]">
                            <Box className="flex flex-col">
                                <Typography className="text-2xl font-bold pb-4">Inicio de sesion</Typography>
                                <Typography className="text-sm text-gray-500">Entrá con tu cuenta de pasante o de empresa.</Typography>
                            </Box>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                value={correo}
                                error={Boolean(errores.correo)}
                                helperText={errores.correo || ""}
                                onChange={(e) => {
                                    setCorreo(e.target.value);
                                    setErrores((prev) => ({ ...prev, correo: "" }));
                                    setErrorGeneral("");
                                }}
                            />
                            <TextField
                                id="contrasena"
                                name="contrasena"
                                label="Contraseña"
                                type="password"
                                value={contrasena}
                                error={Boolean(errores.contrasena)}
                                helperText={errores.contrasena || ""}
                                onChange={(e) => {
                                    setContrasena(e.target.value);
                                    setErrores((prev) => ({ ...prev, contrasena: "" }));
                                    setErrorGeneral("");
                                }}
                            />
                            {errorGeneral && (
                                <Typography color="error" variant="body2">
                                    {errorGeneral}
                                </Typography>
                            )}
                            <Button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">Iniciar sesion</Button>
                        </FormControl>
                    </form>
                </Box>
                <Box className="flex flex-row mt-5">
                    <Typography className="mx-1">¿No tenés cuenta todavía?</Typography>
                    <Link to="/register" className="text-green-500"> Registrarse</Link>
                </Box>
            </Box>
        </>
    )
}

export default Login;