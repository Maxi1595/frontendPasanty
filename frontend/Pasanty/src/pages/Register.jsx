import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, TextField, Box, Button } from '@mui/material'
import { registroApi } from '../api/authApi';
import { useEffect } from 'react';

const Register = () => {
    const [rol, setRol] = useState("pasante");
    const [datos, setDatos] = useState({});

    useEffect (() => {
        console.log(rol);
    }, [])
    
    const handleSubmit = async  (e) => {
        e.preventDefault();
        const tipo = rol;
        console.log(tipo)
        if (tipo && datos) {
            registroApi(tipo, datos);
            console.log(datos);
        } else {
            alert("error");
        }
    }
    

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
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        type="text"
                        onChange={(e) => setDatos({
                            ...datos,
                            nombre: e.target.value
                        })
                        } />
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
                            contraseña: e.target.value
                        })
                        } />
                    <TextField
                        id="especialidad"
                        name="especialidad"
                        label="Especialidad"
                        type="text"
                        onChange={(e) => setDatos({
                            ...datos,
                            especialidad: e.target.value
                        })
                        } />
                    <Link to="/login">Ya tengo una cuenta</Link>
                    <Button type="submit" >Registrarse</Button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="nombre"
                        name="nombre"
                        label="Nombre de la empresa"
                        type="text"
                        onChange={(e) => setDatos({
                            ...datos,
                            nombre: e.target.value
                        })
                        } />
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
                        id="contraseña"
                        name="contraseña"
                        label="Contraseña"
                        type="password"
                        onChange={(e) => setDatos({
                            ...datos,
                            contraseña: e.target.value
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
                        type="number"
                        onChange={(e) => setDatos({
                            ...datos,
                            telefono: Number(e.target.value)
                        })
                        } />
                    <TextField
                        id="especialidad"
                        name="especialidad"
                        label="Especialidad"
                        type="text"
                        onChange={(e) => setDatos({
                            ...datos,
                            especialidad: e.target.value
                        })
                        } />
                    <Link to="/login">Ya tengo una cuenta</Link>
                    <Button type="submit" >Registrarse</Button>
                </form>
            )}
        </>
    )
}

export default Register;