import { useContext, useEffect, useState } from "react";
import imagen from "../assets/image.png";
import { AuthContext } from "../contexts/authContext";
import { getContador, getPostulaciones } from "../api/postularseApi";
import { getVacante } from "../api/vacantesApi";

const Home = () => {

    const { user } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({});
    const [conteo, setConteo] = useState({
        pendientes: 0,
        aceptados: 0,
        rechazados: 0
    });
    const [vacantes, setVacantes] = useState([])
    const [conteoVacante, setConteoVacante] = useState(0);
    const [postulacion, setPostulacion] = useState([])
    const [conteoPostulante, setConteoPostulante] = useState(0)

    useEffect(() => {
        setUsuario(user);
        if (user.user.rol === 3) {
            getContador().then(req => {

                const pendientes = req.find(r => r.estado === "pendiente")?._count ?? 0;
                const aceptados = req.find(r => r.estado === "aceptado")?._count ?? 0;
                const rechazados = req.find(r => r.estado === "rechazado")?._count ?? 0;

                setConteo({ pendientes, aceptados, rechazados });

            });
        } else if (user.user.rol === 5) {
            getVacante().then(data => {
                setVacantes(data)
                setConteoVacante(data.length);
            })

            getPostulaciones().then(data => {
                setPostulacion(data);
                setConteoPostulante(data.length);
            })
        }
    }, [user])

    return (
        <>
            <div>
                {usuario?.user?.rol === 3 ? (
                    <div className="p-8">
                        <h1 className="text-2xl font-bold mb-6">Hola, {usuario?.user?.username} 👋</h1>

                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col items-center bg-yellow-50 border border-yellow-300 rounded-xl p-6 w-1/3">
                                <h3 className="text-gray-500 text-sm font-semibold uppercase mb-2">Pendientes</h3>
                                <p className="text-4xl font-bold text-yellow-500">{conteo.pendientes}</p>
                            </div>
                            <div className="flex flex-col items-center bg-green-50 border border-green-300 rounded-xl p-6 w-1/3">
                                <h3 className="text-gray-500 text-sm font-semibold uppercase mb-2">Aceptadas</h3>
                                <p className="text-4xl font-bold text-green-500">{conteo.aceptados}</p>
                            </div>
                            <div className="flex flex-col items-center bg-red-50 border border-red-300 rounded-xl p-6 w-1/3">
                                <h3 className="text-gray-500 text-sm font-semibold uppercase mb-2">Rechazadas</h3>
                                <p className="text-4xl font-bold text-red-500">{conteo.rechazados}</p>
                            </div>
                        </div>
                    </div>
                ) : usuario?.user?.rol === 5 ? (
                        <div className="p-8">
                            <h1 className="text-2xl font-bold mb-6">Hola, {usuario?.user?.username} 👋</h1>

                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col items-center bg-blue-50 border border-blue-300 rounded-xl p-6 w-1/2">
                                    <h3 className="text-gray-500 text-sm font-semibold uppercase mb-2">Vacantes activas</h3>
                                    <p className="text-4xl font-bold text-blue-500">{conteoVacante}</p>
                                </div>
                                <div className="flex flex-col items-center bg-orange-50 border border-orange-300 rounded-xl p-6 w-1/2">
                                    <h3 className="text-gray-500 text-sm font-semibold uppercase mb-2">Postulaciones pendientes</h3>
                                    <p className="text-4xl font-bold text-orange-500">{conteoPostulante}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* HERO */}
                            <div className="relative w-full h-screen">
                                <img className="w-full h-full object-cover absolute inset-0" src={imagen} alt="fondo" />
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="bg-white p-6 rounded shadow w-1/2">
                                        <h1 className="text-xl font-bold mb-4">Conectamos estudiantes con empresas</h1>
                                        <p>La plataforma donde los aprendices encuentran su primera experiencia laboral y las empresas descubren nuevo talento.</p>
                                    </div>
                                </div>
                            </div>

                            {/* PASANTES - recuadro a la derecha */}
                            <div className="relative w-full h-96">
                                <img className="w-full h-full object-cover absolute inset-0" src={imagen} alt="pasantes" />
                                <div className="absolute inset-0 flex items-center justify-end z-10 p-10">
                                    <div className="bg-white p-6 rounded shadow w-1/3">
                                        <h2 className="text-xl font-bold mb-4">Para estudiantes y aprendices</h2>
                                        <p>Subí tu CV, explorá vacantes y conectá con empresas que buscan tu perfil.</p>
                                    </div>
                                </div>
                            </div>

                            {/* EMPRESAS - recuadro a la izquierda */}
                            <div className="relative w-full h-96">
                                <img className="w-full h-full object-cover absolute inset-0" src={imagen} alt="empresas" />
                                <div className="absolute inset-0 flex items-center justify-start z-10 p-10">
                                    <div className="bg-white p-6 rounded shadow w-1/3">
                                        <h2 className="text-xl font-bold mb-4">Para empresas</h2>
                                        <p>Encontrá estudiantes con ganas de aprender y crecer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* FOOTER */}
            <div className="w-full p-10 bg-gray-100 text-center">
                <p>¿Necesitás ayuda? Contactanos en <span className="font-bold">soporte@pasanty.com</span></p>
            </div>

        </>
    )
}

export default Home;