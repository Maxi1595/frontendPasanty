import imagen from "../assets/image.png";

const Home = () => {
    return (
        <>
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

            {/* FOOTER */}
            <div className="w-full p-10 bg-gray-100 text-center">
                <p>¿Necesitás ayuda? Contactanos en <span className="font-bold">soporte@pasanty.com</span></p>
            </div>
        </>
    )
}

export default Home;