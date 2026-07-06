import instance from "./api";

export const getPostulaciones = async () => {
    const postulaciones = await instance.get(`/postulantes/verPorVacante`);
    console.log(postulaciones);
    return (postulaciones);
}

export const getPostulacionById = async (id) => {
    const postulacion = await instance.get(`/postulante/buscarPorId/${id}`)
    return (postulacion);
}

export const postPostularse = async (id) => {
    console.log(id);
    const postulacion = await instance.post(`/postulantes/postularse/${id}`);
    return (postulacion);
}

export const patchEstado = async (id, datos) => {
    const postulacion = await instance.patch(`/postulantes/postularse/${id}`, datos);
    return (postulacion);
}

export const getEstado = async () => {
    const resultado = await instance.get("/postulantes/verEstado");
    console.log(resultado);
    return resultado;
};

//ver despues
export const getCVByPostulacion = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${UrlApi}/cv/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const blob = await res.blob();

        return URL.createObjectURL(blob);
    } catch (error) {
        return { error: error.message };
    }
}

export const getContador = async () => {
    const resultado = await instance.get("/postulantes/contador");
    return resultado;
}