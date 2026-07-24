import instance from "./api";

//pasante
export const getPerfilPasante = async () => {
    const perfil = await instance.get(`/perfil/ver/pasante`);
    return perfil;
}

export const putDescripcionPasante = async (data) => {
    const perfil = await instance.put(`/perfil/cambiar/descripcion/pasante`, data);
    return perfil;
}

//empresa
export const getPerfilEmpresa = async () => {
    const perfil = await instance.get(`/perfil/ver/empresa`);
    return perfil;
}

export const putDescripcionEmpresa = async (data) => {
    const perfil = await instance.put(`/perfil/cambiar/descripcion/empresa`, data);
    return perfil;
}