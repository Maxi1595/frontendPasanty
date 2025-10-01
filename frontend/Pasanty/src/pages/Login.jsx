import { Box, TextField, Typography, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navegate = useNavigate();

    const { loginAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = { correo, contraseña }
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
            <Box>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Typography>Inicio de sesion</Typography>
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
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                        <Button type="submit">Iniciar sesion</Button>
                    </FormControl>
                </form>
            </Box>
        </>
    )
}

export default Login;