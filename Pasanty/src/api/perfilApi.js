import instance from "./api";

//pasante
export const getPerfilPasante = async () => {
    const perfil = await instance.get(`/perfil/ver/pasante`);
    return perfil;
}

export const getPerfilPasanteById = async (id) => {
    const perfil = await instance.get(`/perfil/ver/pasante/${id}`);
    return perfil;
}

export const putPerfilPasante = async (data) => {
    const perfil = await instance.put(`/perfil/cambiar/pasante`, data);
    return perfil;
}

//empresa
export const getPerfilEmpresa = async () => {
    const perfil = await instance.get(`/perfil/ver/empresa`);
    return perfil;
}

export const getPerfilEmpresaByParams = async (id) => {
    const perfil = await instance.get(`/perfil/ver/empresa/${id}`)
    return perfil;
}

export const putPerfilEmpresa = async (data) => {
    const perfil = await instance.put(`/perfil/cambiar/empresa`, data);
    return perfil;
}

export const putBannerEmpresa = async (banner) => {
    const formData = new FormData();
    formData.append('banner', banner);


    return await instance.put('/perfil/cambiar/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}