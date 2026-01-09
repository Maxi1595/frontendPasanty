import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

/*terminar*/

const Navbar = () => {

    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUsuario(user) || {};
    }, [])

    const handleSubmit = async (e) => {
        logout();
        window.location.reload();
        navigate("/");
    }

    return (
        <nav className="bg-green-400 flex flex-row justify-between items-center h-16 px-4">
            <div className="flex flex-row">
                <img
                    className="w-12 h-12 rounded-full"
                    src={logo}
                    alt="Logo" />
                <Link to="/" className="text-white text-4xl font-bold uppercase">PASANTY</Link>
            </div>
            <div className="flex gap-40 text-white text-gl">
                <a href="/marketplace">Pasantes</a>
                {/* <div className="relative group">
                    <ul className="absolute left-0 hidden group-hover:block z-1 bg-green-600/50 text-black border border-green-800 rounded py-2 px-3">
                        <li className="py-1">
                            <a href="#">Tecnologia</a>
                        </li>
                        <li className="py-1">
                            <a href="#">Ingenieria</a>
                        </li>
                        <li className="py-1">
                            <a href="#">Diseño</a>
                        </li>
                        <li className="py-1">
                            <a href="#">Administracion</a>
                        </li>
                        <li className="py-1">
                            <a href="#">Salud</a>
                        </li>
                        <li className="py-1">
                            <a href="#">Educacion y Sociales</a>
                        </li>
                    </ul>
                </div> */}
                <a href="/vacantes">Vacantes</a>
                {usuario.rol === 5 ? (
                    <a href="/postulaciones">Postulaciones</a>
                ) : usuario.rol === 3 ? (
                    <a href="/tusEstados">Tus postulaciones</a>
                ) : null
                }
                {/* <a href="#">Guias</a> */}
            </div>
            {usuario.username === "invitado" ? (
                <div className="flex flex row gap-x-[5px]">
                    <div className="text-white border-3 border-white rounded-2xl bg-green-400 hover:text-black hover:bg-white hover:border-green-600 duration-300 transition-colors py-2 px-3">
                        <a href="/login">Iniciar sesion</a>
                    </div>
                    <div className="text-white border-3 border-white rounded-2xl bg-green-400 hover:text-black hover:bg-white hover:border-green-600 duration-300 transition-colors py-2 px-3">
                        <a href="/register">Registrarse</a>
                    </div>
                </div>
            ) : usuario ? (
                <div>
                    <Link to="/perfil" className="text-white">{usuario.username}</Link>
                    <Button onClick={handleSubmit}>Cerrar Sesion</Button>
                </div>
            ) : null
            }
        </nav>
    )
}

export default Navbar;