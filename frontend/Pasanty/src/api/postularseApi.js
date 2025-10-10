const UrlApi = "http://localhost:3000/api/postulantes";

export const getPostulaciones = async () => {
    try{
        const token = localStorage.getItem("token");
        const res = await fetch(`${UrlApi}/verPorVacante`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res.json();
    } catch(error){
        return { error: error.message };
    }
}

export const getPostulacionById = async (id) =>{
    try{
        const token = localStorage.getItem("token");
        const res = await fetch(`${UrlApi}/buscarPorId/${id}`, {
            method: "GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        return res.json();
    }catch(error){
        return { error: error.message };
    }
}

export const postPostularse = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const res = await fetch(`${UrlApi}/postularse/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            return res.json();
        }
    } catch (error) {
        return res.json(error);
    }
}

export const patchEstado = async (id, datos) => {
    try{
        const token = localStorage.getItem("token");
        const res = await fetch(`${UrlApi}/cambiarEstado/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        })
    }catch(error){
        return { error: error.message };
    }
}