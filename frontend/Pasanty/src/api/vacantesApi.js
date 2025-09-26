const UrlApi = "http://localhost:3000/api/vacante"

export const getVacante = async () => {
    const res = await fetch (`${UrlApi}/buscar`);
    return res.json();
}

export const getVacanteById = async (id) => {
    const res = await fetch (`${UrlApi}/buscar/${id}`);
    if(!res.ok) {
        throw new Error("Error al traer la vacante");
    }
    return res.json();
}