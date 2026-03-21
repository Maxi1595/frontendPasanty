import instance from "./api";

const UrlApi = "http://localhost:3000/api/vacante"


export const getVacante = async () => {
    return await instance.get("/vacante/buscar");
}

export const getVacanteById = async (id) => {
    return await instance.get(`/vacante/buscar/${id}`)
}

export const postVacante = async (datos) => {
    return await instance.post(`/vacante/crear`, datos);
}