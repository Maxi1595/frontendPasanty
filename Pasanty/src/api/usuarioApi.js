import instance from "./api";

const UrlApi = "http://localhost:3000/api/usuario";

export const getUsuario = async () => {
    const usuario = await instance.get(`/usuario/traerUsuario`);
    return (usuario); 
}

export const getFotoUsuario = async (id) => {
    const res = await instance.get(`/usuario/foto/${id}`)
    return res.foto;
}

export const putFoto = async (foto) => {
    const formData = new FormData();
    formData.append('foto', foto);

    return await instance.put('/usuario/cambiar/foto', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}