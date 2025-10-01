const UrlApi = "http://localhost:3000/api/auth";

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
        return res.json(error);
    }
}