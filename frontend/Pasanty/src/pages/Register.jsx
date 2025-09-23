import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, TextField, Box, Button} from '@mui/material'

const Register = () => {
    const [rol, setRol] = useState("pasante");

    return (
        <>
            <FormControl>
                <FormLabel id="rol"> Registrarme como: </FormLabel>
                <RadioGroup row name="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                    <FormControlLabel value="pasante" control={<Radio />} label="Pasante" />
                    <FormControlLabel value="empresa" control={<Radio />} label="Empresa" />
                </RadioGroup>
            </FormControl>
            {rol === "pasante" ? (
                <Box>
                    <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    type="text" />
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
                    <Link to="/login">Ya tengo una cuenta</Link>
                    <Button>Registrarse</Button>
                </Box>
            ) : (
                <Box>
                    <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre de la empresa" 
                    type="text"/>
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
                    <Link to="/login">Ya tengo una cuenta</Link>
                    <Button>Registrarse</Button>
                </Box>
            )}
        </>
    )
}

export default Register;