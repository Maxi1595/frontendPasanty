const UrlApi = "http://localhost:3000/api/auth";

export const registroApi = async (tipo, datos) => {
    try{
        const res = await fetch(`${UrlApi}/registro/${tipo}`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(datos)
        })
        if (!res.ok) {
            // Esto captura errores 4xx o 5xx del backend
            const errorData = await res.json();
            throw new Error(errorData.mensaje || 'Error en el registro');
        }
        return res.json();
    }catch (error){
        return { error: error.message };
    }
}

export const loginApi = async (logearse) => {
    try {
        const res = await fetch(`${UrlApi}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logearse)
        });
        return res.json();
    }
    catch (error) {
        return { error: error.message };
    }
}