import { Box, TextField, Typography, Button} from "@mui/material";

const Login = () => {
    return (
        <>
            <Box>
                <Typography>Inicio de sesion</Typography>
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"></TextField>
                <TextField
                    id="contrasena"
                    name="contrasena"
                    label="Contraseña"
                    type="password"></TextField>
                    <Button>Iniciar sesion</Button>
            </Box></>
    )
}

export default Login;