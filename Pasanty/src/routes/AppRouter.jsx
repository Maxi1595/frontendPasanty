import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import { AuthProvider } from "../contexts/authContext";
import LayoutMain from "../layouts/LayoutsMain";

import Home from "../pages/Home"
import Register from "../pages/Register"
import Login from "../pages/Login"
import MarketPlace from "../pages/MarketPlace";
import PasanteDetalles from "../pages/PasanteDetalles";
import Vacantes from "../pages/Vacantes";
import VacantesDetalles from "../pages/VacantesDetalles";
import Postulaciones from "../pages/Postulaciones";
import PostulanteDetalles from "../pages/PostulanteDetalles";
import Perfil from "../pages/Perfil";
import Estado from "../pages/Estado";

const AppRouter = () => {
    return (
        <AuthProvider>

            <Routes>

                {/*Rutas publicas */}
                <Route element={<LayoutMain />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/marketplace" element={<MarketPlace />} />
                    <Route path="/pasantes/:id" element={<PasanteDetalles />} />
                    <Route path="/vacantes" element={<Vacantes />} />
                    <Route path="/vacantes/:id" element={<VacantesDetalles />} />
                    <Route path="/postulante/:id" element={<PostulanteDetalles />} />
                    <Route path="/perfil" element={<Perfil />} />
                    {/* <Route path="/tusEstados" element={<Estado />} /> */}
                    <Route path="/postulaciones" element={<Postulaciones />} />
                </Route>

                {/*Sin navbar */}

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/*Rutas privadas para empresas */}

                <Route element={<LayoutMain />}>
                    <Route element={<ProtectedRoute allowedRoles={["5"]} />}>
                        {/* <Route path="/postulaciones" element={<Postulaciones />} /> */}
                    </Route>
                </Route>

                {/* Rutas privadas para pasantes */}

                <Route element={<LayoutMain />}>
                    <Route element={<ProtectedRoute allowedRoles={["3"]} />}>
                        {/* <Route path="/tusPostulaciones" element={<Postulaciones />}/> */}
                        <Route path="/tusEstados" element={<Estado />} />
                    </Route>
                </Route>

            </Routes>
        </AuthProvider>
    )
}

export default AppRouter;