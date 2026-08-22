import instance from "./api";

const UrlApi = "http://localhost:3000/api/pasantes"

export const getPasantes = async () => {
    const resultado = await instance.get("pasantes/buscar");
    return resultado;
}

export const getPasanteById = async (id) => {
    const resultado = await instance.get(`/pasantes/buscar/${id}`);
    return resultado;
}

//hacer despues
export const postSubirCV = async (archivo) => {
    const formData = new FormData();
    formData.append('cv', archivo);

    return await instance.post('/pasantes/subir-cv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

//hacer despues
export const getCV = async (id) => {
    const res = await instance.get(`/pasantes/cv/${id}`, {  // le decís a axios que espere bytes, no JSON
    });
    return res.url;
};

//hacer despues
export const getMyCV = async () => {
    const res = await instance.get('/pasantes/propio-cv', {
    });
    return res.url;
}