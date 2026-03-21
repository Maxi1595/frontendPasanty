import instance from "./api";

const UrlApi = "http://localhost:3000/api/auth";

export const loginApi = async (logearse) => {
    return (await instance.post(`/auth/login`, logearse));
}

export const registroApi = async (tipo, datos) => {
    return await instance.post(`/auth/registro/${tipo}`, datos);
}