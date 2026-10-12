import { Link } from "react-router-dom"
import { ESPECIALIDADES } from "../constants/Especialidades"

const VacanteCart = ({ vacante }) => {

    const especialidad = ESPECIALIDADES.find(e => e.valor === vacante.titulo);
    const color = especialidad?.color || "border-gray-300";
    const bgColor = especialidad?.color.replace("border-", "bg-").replace("shadow-", "") || `bg-${color}-50`;

    return (
        <>
            <div className={`flex flex-col border-l-4 rounded-lg w-full mb-2 shadow-sm overflow-hidden ${color}`}>

                {/* Contenido */}
                <div className="flex flex-row justify-between items-center px-4 py-4 bg-gray-50 hover:brightness-95 transition-all duration-200">
                    <div className="w-4/6 border-r-2">
                        <h3 className="font-bold text-lg">{vacante.puesto.replace(/_/g, " ")}</h3>
                        <p className="text-gray-800 text-sm">{vacante.titulo.replace(/_/g, " ")} | {vacante.anioAcademico.replace(/_/g, " ")}</p>
                        <p className="line-clamp-2 text-sm text-gray-600 pt-2 mr-4">{vacante.descripcion}</p>
                    </div>
                    <div className="flex flex-col text-left w-2/6 ml-3">
                        <p className="text-sm font-bold mt-1 p-1">{"📍 " + vacante.direccion}</p>
                        <p className="text-sm font-bold mt-1 p-1">{vacante.remuneracion ? "✅ Remunerado" : "❌ No remunerado"}</p>
                        <p className="text-sm font-bold mt-1 p-1">{"🏢 " + vacante.modalidad}</p>
                        <p className="text-sm font-bold mt-1 p-1">{"💼 " + vacante.jornada}</p>
                    </div>
                </div>

                {/* Link abajo */}
                <Link
                    className="w-full text-center py-2 border-t border-green-500 text-green-500 text-sm font-medium hover:bg-green-500 hover:text-white transition-colors"
                    to={`/vacantes/${vacante.id}`}
                >
                    Ver más
                </Link>
            </div>
        </>
    )
}

export default VacanteCart;