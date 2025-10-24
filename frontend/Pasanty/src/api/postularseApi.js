const UrlApi = "http://localhost:3000/api/postulantes";
const token = localStorage.getItem("token");

export const getPostulaciones = async () => {
    try{
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

export const getEstado = async () => {
    try{
        const res = await fetch(`${UrlApi}/verEstado`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res.json();
    }catch(error){
        return { error: error.message };
    }
}