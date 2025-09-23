import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute"
import LayoutMain from "../layouts/layoutsMain";

import Home from "../pages/Home"
import Register from "../pages/Register"
import Login from "../pages/Login"
import MarketPlace from "../pages/MarketPlace";                                                  

const AppRouter = () => {
    return(
        <Routes>

            {/*Rutas publicas */}
            <Route element={<LayoutMain/>}>
                <Route path="/" element={<Home />}/>
                <Route path="/marketplace" element={<MarketPlace />}/>
            </Route>

            {/*Sin navbar */}

            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>

            {/*Rutas privadas */}
{/* 
            <Route element={<ProtectedRoute />}>
                <Route></Route>
            </Route> */}

        </Routes>
    )
}

export default AppRouter;