import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

/*terminar*/

const Navbar = () => {
    return (
        <nav className="bg-green-400 flex flex-row justify-between items-center h-16 px-4">
                <div className="flex flex-row">
            <img
            className="w-12 h-12 rounded-full" 
            src={logo} 
            alt="Logo" />
            <h1 className="text-white text-4xl font-bold uppercase">PASANTY</h1>
            </div>
            <div className="flex gap-40 text-white text-gl">    
                <div className="relative group">
                    <a href="#">CV</a>
                    <ul className="absolute left-0 hidden group-hover:block bg-green-600/50 text-black border border-green-800 rounded py-2 px-3">
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
                </div>
                <a href="#">Empresas</a>
                <a href="#">Guias</a>
            </div>
            <div className="text-white border-3 border-white rounded-2xl bg-green-400 hover:text-black hover:bg-white hover:border-green-600 duration-300 transition-colors py-2 px-3">
                <a href="#">Iniciar sesion</a>
            </div>
        </nav>
    )
}

export default Navbar;