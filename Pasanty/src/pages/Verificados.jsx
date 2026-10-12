import { useEffect } from "react";
import { useState } from "react"
import { getVerificar } from "../api/authApi";
import { useParams } from "react-router-dom";

const Verificados = () => {

    const [estado, setEstado] = useState("verificar");
    const { email = "", token = "" } = useParams()


    useEffect(() => {
        // Si no hay params → es el caso "registrado, falta verificar"
        if (!email || !token) {
            setEstado("porVerificar");
            return;
        }

        // Si hay params → verificar la cuenta
        const emailLimpio = decodeURIComponent(email);
        getVerificar(emailLimpio, token)
            .then(() => setEstado("verificado"))
            .catch(() => setEstado("error"));
    }, []);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {estado === "cargando" && <p className="text-gray-500">Verificando...</p>}

            {estado === "porVerificar" && (
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800 mb-2">📧 Revisá tu correo</p>
                    <p className="text-gray-500">Te enviamos un link de verificación. Puede estar en la bandeja de spam.</p>
                </div>
            )}

            {estado === "verificado" && (
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 mb-2">✅ Cuenta verificada</p>
                    <p className="text-gray-500 mb-4">Ya podés iniciar sesión.</p>
                    <Link to="/login" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                        Ir al login
                    </Link>
                </div>
            )}

            {estado === "error" && (
                <div className="text-center">
                    <p className="text-2xl font-bold text-red-500 mb-2">❌ Link inválido o expirado</p>
                    <p className="text-gray-500">Registrate nuevamente.</p>
                </div>
            )}
        </div>
    );
}

export default Verificados