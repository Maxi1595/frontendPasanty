import { Box, TextField, Typography, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navegate = useNavigate();

    const { loginAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = { correo, contrasena }
        try {
            const resultado = await loginApi(datos);
            if (resultado.user && resultado.token) {
                const user = resultado.user;
                const token = resultado.token;
                loginAuth(user, token);
            } else if (resultado.mensaje) {
                alert(resultado.mensaje);
            } else {
                alert("algo salio mal")
            }
            if ((localStorage.getItem("token")) && localStorage.getItem("user")) {
                navegate("/");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Box className="inset-0 flex items-center justify-center w-full h-screen">
                <Box className=" flex justify-center items-center rounded border p-10 w-lg h-[512px]">
                    <form onSubmit={handleSubmit}>
                        <FormControl className="flex justify-evenly text-center w-sm h-[384px]">
                            <Typography className="text-xl font-bold">Inicio de sesion</Typography>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                            <TextField
                                id="contrasena"
                                name="contrasena"
                                label="Contraseña"
                                type="password"
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                            <Button type="submit">Iniciar sesion</Button>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default Login;