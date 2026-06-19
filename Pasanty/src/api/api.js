import axios from "axios";
import tokenService from "../service/tokenService";
import { authEvents } from "../service/authEvents";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    },
});

instance.interceptors.request.use((config) => {
    const tokenAccess = tokenService.getLocalAccessToken();
    if (tokenAccess) {
        config.headers[`Authorization`] = `Bearer ${tokenAccess}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (res) => {
        if (res?.data?.data !== undefined) {
            return res.data.data;
        }
        return res?.data;
    },
    async (error) => {
        if (error.config.url !== "/auth/login" && error.config.url !== "/auth/refreshToken" && error.response) {
            if (error.response.status === 401 && !error.config._retry) {
                error.config._retry = true;
                try {

                    const rs = await instance.post("/auth/refreshToken", { tokenRefresh: tokenService.getLocalRefreshToken(), })
                    const { tokenAccess } = rs;
                    console.log(tokenAccess);

                    tokenService.upgrateLocalAccessToken(tokenAccess);
                    return instance(error.config);

                } catch (_error) {
                    console.log("ERROR REFRESH", _error);
                    authEvents.logout?.();
                    return Promise.reject(_error)
                }

            }
        }
        return Promise.reject(error);
    }
)

export default instance;