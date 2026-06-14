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
    formData.append('cv', archivo)

    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${UrlApi}/subir-cv`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

    } catch (error) {
        return { error: error.message };
    }
}

//hacer despues
export const getCV = async (id) => {
    const blob = await instance.get(`/pasantes/cv/${id}`, {
        responseType: 'blob'  // le decís a axios que espere bytes, no JSON
    });
    return URL.createObjectURL(blob);
};

//hacer despues
export const getMyCV = async () => {
    const blob = await instance.get('/pasantes/propio-cv', {
        responseType: 'blob'
    });
    return URL.createObjectURL(blob);
}