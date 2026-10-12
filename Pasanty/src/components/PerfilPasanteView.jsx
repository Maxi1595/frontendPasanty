// components/PerfilPasanteView.jsx
import { useEffect, useContext, useState } from "react";
import Avatar from "./Avatar";
import Tag from "./Tag";
import ViewCV from "./ViewCV";

import { AuthContext } from "../contexts/authContext";

const PerfilPasanteView = ({ pasante, perfil, usuarioId, esPropio = false, pasanteId }) => {

    const habilidades = Array.isArray(perfil?.tags)
        ? perfil.tags
        : perfil?.tags?.split(",").filter(Boolean) ?? [];

    const { user } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        setUsuario(user)
    })

    return (
        <div className="flex flex-col justify-center items-center">

            <div className="max-w-3xl mx-auto px-6 py-8 border-2 rounded-lg border-green-500 bg-stone-50 my-2">

                {/* HEADER */}
                <div className="flex flex-row items-center justify-between bg-stone-200 border border-gray-100 rounded-2xl p-6 mb-4">
                    <div className="flex flex-row items-center gap-4">
                        <Avatar id={usuarioId} nombre={pasante?.usuario?.nombre} size="w-16 h-16" textSize="text-2xl" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{pasante?.usuario?.nombre}</h1>
                            <p className="text-sm text-gray-500">{pasante?.especialidad?.replace(/_/g, " ")}</p>

                        </div>
                    </div>
                    {pasante?.estadoAcademico && (
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            {pasante.estadoAcademico.replace(/_/g, " ")}
                        </span>
                    )}
                    <div className="text-base my-auto text-end">
                        <div className="flex flex-row text-end">
                            <h2 className="text-base font-semibold pr-3">Correo:</h2>
                            <p className="text-gray-500">{pasante?.usuario?.correo}</p>
                        </div>
                        {perfil.linkedin && (
                            <div className="flex flex-row">
                                <h2 className="text-base font-semibold pr-3">Linkedin:</h2>
                                <p className="text-gray-500">{perfil.linkedin}</p>
                            </div>
                        )}
                        {perfil.portfolio && (
                            <div className="flex flex-row text-end">
                                <h2 className="text-base font-semibold pr-3">Portfolio:</h2>
                                <p className="text-gray-500">{perfil.portfolio}</p>
                            </div>
                        )}
                    </div>
                </div>

                {(!perfil?.descripcion && !perfil?.formacion && !perfil?.proyectos) && (
                    <p className="text-green-400 text-sm text-center py-4 font-bold">
                        El pasante aún no completó su perfil. Puede que haya secciones que no aparezcan.
                    </p>
                )}

                {/* SOBRE MÍ + SECCIÓN 1 */}

                {perfil?.descripcion && (
                    <div className="flex flex-col bg-stone-200 border border-gray-100 rounded-2xl p-6 w-full">
                        <p className="text-xs font-bold text-stone-900 uppercase tracking-wide mb-2">Sobre mí</p>
                        <p className="text-sm text-stone-700" style={{ whiteSpace: "pre-wrap" }}>{perfil.descripcion}</p>
                    </div>
                )}
                {/* HABILIDADES */}
                {habilidades.length > 0 && (
                    <div className="bg-stone-200 border border-gray-100 rounded-2xl p-6 my-4">
                        <p className="text-xs font-bold text-stone-900 uppercase tracking-wide mb-3">Habilidades</p>
                        <div className="flex flex-wrap gap-2">
                            {habilidades.map((h) => (
                                <Tag key={h} nombre={h} />
                            ))}
                        </div>
                    </div>
                )}
                {perfil.formacion && (
                    <div className="flex flex-col bg-stone-200 border border-gray-100 rounded-2xl p-6 my-4 w-full">
                        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wide mb-2">Sobre mi formación</h2>
                        <p className="text-sm text-stone-700" style={{ whiteSpace: "pre-wrap" }}>{perfil.formacion}</p>
                    </div>
                )}
                {perfil.proyectos && (
                    <div className="flex flex-col bg-stone-200 border border-gray-100 rounded-2xl p-6 my-4 w-full">
                        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wide mb-2">Proyectos académicos</h2>
                        <p className="text-sm text-stone-700" style={{ whiteSpace: "pre-wrap" }}>{perfil.proyectos}</p>
                    </div>
                )}

            </div>

            {/* CV */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 h-screen w-3/4">
                {!pasante?.cv ? (
                    <div className="flex items-center justify-center h-full bg-gray-50">
                        <p className="text-green-400 text-sm font-bold">Este pasante aún no subió su CV</p>
                    </div>
                ) : String(pasante?.usuarioId) === String(usuario?.user?.id) ? (
                    <ViewCV esPropio={true} />
                ) : usuario?.user?.rol === 5 ? (
                    <ViewCV esPropio={false} id={pasanteId} />
                ) : (
                    <p>No tienes permiso para ver el CV del pasante</p>
                )}
            </div>

        </div>
    );
};

export default PerfilPasanteView;