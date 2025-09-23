import imagen from "../assets/image.png";

const Home = () => {
    return (
        <>
            <div className="relative w-screen h-screen">
                 <img
        className="w-full h-100 z-0 absolute inset-0" 
        src={imagen}
        alt="fondo"/> 
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded shadow w-1/2 h-64">
                        <h1 className="text-xl font-bold mb-4">Bienvenido estudiante o aprendiz</h1>
                        <p>
                            Aquí enviarás tu CV para ser evaluado y recibirás solicitudes de pasantías en las áreas que buscas
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;