import instance from "./api";

const UrlApi = "http://localhost:3000/api/postulantes";
const token = localStorage.getItem("token");

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
    const postulacion = await instance.post(`/postularse/${id}`);
    return (postulacion);
}

export const patchEstado = async (id, datos) => {
    const postulacion = await instance.patch(`/postularse/${id}`, datos);
    return (postulacion);
}

export const getEstado = async () => {
    const resultado = instance.get("/postulantes/verEstado");
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