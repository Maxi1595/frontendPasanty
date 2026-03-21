import instance from "./api";

const UrlApi = "http://localhost:3000/api/usuario";

export const getUsuario = async () => {
    const usuario = await instance.get(`/usuario/traerUsuario`);
    return (usuario); 
}