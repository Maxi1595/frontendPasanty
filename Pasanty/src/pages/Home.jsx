import { useContext, useEffect, useState } from "react";
import imagen from "../assets/image.png";
import { Button } from "@mui/material"
import { AuthContext } from "../contexts/authContext";
import { getContador, getPostulaciones } from "../api/postularseApi";
import { getVacante } from "../api/vacantesApi";
import { Link } from "react-router-dom"
import Avatar from "../components/Avatar";
import VacanteCart from "../components/VacanteCart"

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
            getVacante().then(data => {
                setVacantes(data)
                setConteoVacante(data.length);
            })

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
                    <div className="px-8 py-8 bg-white">
                        {/* HEADER */}
                        <div className="flex flex-row items-start justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Hola, {usuario?.user?.username}</h1>
                                <p className="text-gray-500 mt-1">
                                    {conteo.pendientes > 0
                                        ? `Tenés ${conteo.pendientes} postulación${conteo.pendientes > 1 ? 'es' : ''} esperando respuesta.`
                                        : "No tenés postulaciones pendientes por ahora."}
                                </p>
                            </div>
                            <Link to="/vacantes" className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                                Buscar vacantes
                            </Link>
                        </div>

                        {/* STATS */}
                        <div className="flex flex-row gap-4 mb-8">
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-5">
                                <p className="text-3xl font-bold text-gray-800">{conteo.pendientes}</p>
                                <p className="text-sm text-gray-500 mt-1">Pendientes</p>
                            </div>
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-5">
                                <p className="text-3xl font-bold text-green-500">{conteo.aceptados}</p>
                                <p className="text-sm text-gray-500 mt-1">Aceptadas</p>
                            </div>
                        </div>

                        {/* DOS COLUMNAS */}
                        <div className="flex flex-row gap-6">
                            {/* IZQUIERDA - postulaciones y vacantes */}
                            <div className="flex flex-col gap-6 w-2/3">

                                {/* VACANTES PARA VOS */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="font-semibold text-gray-800">Vacantes para vos</h2>
                                        <Link to="/vacantes" className="text-green-500 text-sm font-medium">Ver todas</Link>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {vacantes.slice(0, 3).map((v) => (
                                            <VacanteCart key={v.id} vacante={v} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* DERECHA - info del perfil */}
                            <div className="flex flex-col gap-4 w-1/3">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h2 className="font-semibold text-gray-800 mb-2">Tu perfil</h2>
                                    <p className="text-sm text-gray-500 mb-4">Las empresas ven esto antes que nada. Un perfil completo recibe más respuestas.</p>
                                    <Link to="/perfil" className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                                        Completar perfil
                                    </Link>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h2 className="font-semibold text-gray-800 mb-2">Cómo sigue</h2>
                                    <p className="text-sm text-gray-500">Cuando la empresa revise tu postulación, te avisamos acá mismo. No hace falta que escribas para preguntar.</p>
                                </div>
                            </div>
                        </div>
                    </div>







                ) : usuario?.user?.rol === 5 ? (
                    <div className="p-8 bg-white">
                        <div className="flex flex-row items-start justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Hola, {usuario?.user?.username} 👋</h1>
                                <p className="text-gray-500 mt-1">
                                    {conteoVacante >= 0
                                        ? `Tenés ${conteoPostulante} candidatos en tus ${conteoVacante} vacantes publicadas`
                                        : "No has creado ninguna vacante"}
                                </p>
                            </div>
                            <Button className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">Crear Vacante</Button>
                        </div>
                        <div className="flex flex-row gap-4 mb-8">
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-5">
                                <p className="text-3xl font-bold text-gray-800">{conteoVacante}</p>
                                <p className="text-sm text-gray-500 mt-1">Vacantes activas</p>
                            </div>
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-5">
                                <p className="text-3xl font-bold text-green-500">{conteoPostulante}</p>
                                <p className="text-sm text-gray-500 mt-1">Postulaciones pendientes</p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-6">
                            <div className="flex flex-col w-2/3">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="font-semibold text-gray-800">Postulaciones para revisar</h2>
                                        <Link to="/postulaciones" className="text-green-500 text-sm font-medium">Ver todas</Link>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {[...postulacion]
                                            .sort((a, b) => new Date(b.fechaPost) - new Date(a.fechaPost))
                                            .slice(0, 3)
                                            .map((p) => (
                                                <div
                                                    key={p.id}
                                                    className="flex flex-row items-center justify-between border-b px-4 py-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    {/* IZQUIERDA - nombre y vacante */}
                                                    <div className="flex flex-col w-1/4">
                                                        <h3 className="font-semibold">{p.pasante?.usuario?.nombre}</h3>
                                                        <p className="text-sm text-gray-500">{p.vacante.titulo}</p>
                                                    </div>

                                                    {/* CENTRO - área, año y fecha */}
                                                    <div className="flex flex-col w-1/2">
                                                        <p className="text-sm font-medium">{p.pasante?.especialidad} · {p.pasante?.estadoAcademico}</p>
                                                        <p className="text-xs text-gray-400">{new Date(p.fechaPost).toLocaleDateString()}</p>
                                                        <p className="text-xs text-gray-500">{p.pasante?.cv ? "✅ Tiene CV" : "❌ Sin CV"}</p>
                                                    </div>

                                                    {/* DERECHA - link */}
                                                    <div className="w-1/4 flex justify-end">
                                                        <Link
                                                            className="text-sm text-green-600 border border-green-500 rounded-lg px-3 py-1 hover:bg-green-500 hover:text-white transition-colors"
                                                            to={`/postulante/${p.id}`}
                                                        >
                                                            Ver candidato
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-1/3">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h2 className="font-semibold text-gray-800 mb-2">Tu perfil</h2>
                                    <p className="text-sm text-gray-500 mb-4">Un perfil con descripción y rubro completos recibe más postulantes calificados.</p>
                                    <Link to="/perfil" className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                                        Completar perfil
                                    </Link>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h2 className="font-semibold text-gray-800 mb-2">Cómo sigue</h2>
                                    <p className="text-sm text-gray-500">Cada postulante que aceptás o rechazás recibe la respuesta al instante. No necesitás avisarle por otro medio.</p>
                                    <ol className="text-sm text-gray-500 list-decimal list-inside space-y-2 marker:text-green-800">
                                        <li>Revisá el perfil y el CV</li>
                                        <li>Aceptá o rechazá</li>
                                        <li>Coordinen los detalles</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>








                ) : (
                    <div>
                        {/* HERO */}
                        <div className="flex flex-row items-center justify-between px-16 py-20 bg-white">
                            {/* IZQUIERDA - texto */}
                            <div className="w-1/2">
                                <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                                    Tu primera pasantía,<br />
                                    <span className="text-green-500">sin quedarte esperando</span><br />
                                    una respuesta.
                                </h1>
                                <p className="text-gray-500 text-lg mb-8">
                                    Pasanty conecta estudiantes con empresas que buscan pasantes. Te postulás una vez y seguís el estado de cada postulación hasta la respuesta final.
                                </p>
                                <div className="flex gap-4">
                                    <Link to="/marketplace" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                                        Buscar pasantías
                                    </Link>
                                    <Link to="/register" className="border border-green-500 text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                                        Publicar una vacante
                                    </Link>
                                </div>
                                <p className="text-gray-400 text-sm mt-4">Gratis para estudiantes. Sin CV en PDF dando vueltas por mail.</p>
                            </div>

                            {/* DERECHA - card de ejemplo */}
                            <div className="w-2/5 bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                                <p className="text-xs text-gray-400 mb-4">Mis postulaciones <span className="text-base font-bold text-green-500">ejemplo</span></p>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { empresa: "Pasante de QA Manual", sub: "Novatech · Mendoza · 4to año", estado: "Aceptada", color: "text-green-500 bg-green-50" },
                                        { empresa: "Asistente de Datos", sub: "Agiliox · Presencial", estado: "Pendiente", color: "text-blue-500 bg-blue-50" },
                                        { empresa: "Soporte IT", sub: "TechCorp · Híbrido", estado: "Pendiente", color: "text-blue-500 bg-blue-50" },
                                        { empresa: "Diseño UX Junior", sub: "Kivo Studio · Remoto", estado: "Rechazada", color: "text-red-500 bg-red-50" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-100">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{item.empresa}</p>
                                                <p className="text-xs text-gray-400">{item.sub}</p>
                                            </div>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.color}`}>{item.estado}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="flex flex-row justify-center gap-16 py-12 bg-gray-50 border-y border-gray-100">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-500">Gratis</p>
                                <p className="text-sm text-gray-500">para estudiantes, siempre</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-500">Rapida</p>
                                <p className="text-sm text-gray-500">para publicar una vacante</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-500">Sin silencio</p>
                                <p className="text-sm text-gray-500">toda postulación recibe respuesta</p>
                            </div>
                        </div>

                        {/* CÓMO FUNCIONA */}
                        <div className="px-16 py-16 bg-white">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Un proceso corto, con reglas claras</h2>
                            <p className="text-gray-500 mb-10">Pasanty no es una red social. Hacer una sola cosa: llevar una vacante desde la publicación hasta que alguien reciba una respuesta concreta.</p>
                            <div className="flex flex-row gap-8">
                                {/* Estudiante */}
                                <div className="flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                    <p className="text-sm font-semibold text-green-500 mb-4">Si sos estudiante</p>
                                    <p className="text-gray-500 text-sm mb-6">Cargá tu perfil una vez y postulate en dos clicks.</p>
                                    {[
                                        { n: 1, t: "Completá tu perfil", d: "Carrera, año, materias y experiencia previa si tenés." },
                                        { n: 2, t: "Buscá las vacantes", d: "Filtrá por carrera, modalidad y provincia." },
                                        { n: 3, t: "Seguí el estado", d: "Enviada, en revisión, aceptada o rechazada. Sin silencio." },
                                    ].map((s) => (
                                        <div key={s.n} className="flex gap-4 mb-4">
                                            <span className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-bold flex-shrink-0">{s.n}</span>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{s.t}</p>
                                                <p className="text-xs text-gray-500">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Empresa */}
                                <div className="flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                    <p className="text-sm font-semibold text-green-500 mb-4">Si sos empresa</p>
                                    <p className="text-gray-500 text-sm mb-6">Publicá la búsqueda y recibí perfiles ordenados en un solo lugar.</p>
                                    {[
                                        { n: 1, t: "Publicá la vacante", d: "Definí carrera, modalidad, carga horaria y duración." },
                                        { n: 2, t: "Revisá los postulantes", d: "Perfiles completos y comparables, sin adjuntos sueltos." },
                                        { n: 3, t: "Aceptá o rechazá", d: "El estudiante recibe la respuesta al instante." },
                                    ].map((s) => (
                                        <div key={s.n} className="flex gap-4 mb-4">
                                            <span className="w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-bold flex-shrink-0">{s.n}</span>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{s.t}</p>
                                                <p className="text-xs text-gray-500">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
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