const UrlApi = "http://localhost:3000/api/pasantes"

export const getPasantes = async () => {
    const res = await fetch (`${UrlApi}/`);
    return res.json();
};

export const getPasanteById = async (id) => {
    const res = await fetch (`${UrlApi}/${id}`);
    if (!res.ok) {
        throw new Error("Error al traer el pasante");
    }
    return res.json();
}