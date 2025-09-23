const UrlApi = "http://localhost:3000/api/pasantes/"

export const getPasantes = async () => {
    const res = await fetch (UrlApi);
    return res.json();
};