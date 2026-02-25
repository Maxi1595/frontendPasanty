const UrlApi = "http://localhost:3000/api/usuario";

export const getUsuario = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${UrlApi}/traerUsuario`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res.json()
    } catch (error) {
        return { error: error.message };
    }
}