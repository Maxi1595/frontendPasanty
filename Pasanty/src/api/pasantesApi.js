import instance from "./api";

const UrlApi = "http://localhost:3000/api/pasantes"

// export const getPasantes = async () => {
//     const res = await fetch(`${UrlApi}/buscar`);
//     return res.json();
// };

export const getPasantes = async () => {
    const resultado = await instance.get("pasantes/buscar");
    return resultado;
}

// export const getPasanteById = async (id) => {
//     const res = await fetch(`${UrlApi}/buscar/${id}`);
//     if (!res.ok) {
//         throw new Error("Error al traer el pasante");
//     }
//     return res.json();
// }

export const getPasanteById = async (id) => {
    const resultado = await instance.get(`/pasantes/buscar/${id}`);
    return resultado;
}

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

export const getCV = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${UrlApi}/cv/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        const blob = await res.blob();

        return URL.createObjectURL(blob);
    } catch (error) {
        return { error: error.message };
    }
}

export const getMyCV = async () => {
    try{
        const token = localStorage.getItem("token");

        const res = await fetch (`${UrlApi}/propio-cv`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const blob = await res.blob();

        return URL.createObjectURL(blob);
    }catch(error){
        return { error: error.message };
    }
}