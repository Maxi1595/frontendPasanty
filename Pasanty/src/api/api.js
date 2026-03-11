import axios from "axios";
import tokenService from "../service/tokenService";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
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
        if (res?.data?.data !== undefined){
        return res.data.data;
        }
        return res?.data;
    },
    async (error) => {
        if (error.config.url !== "/auth/login" && error.config.url !== "/auth/refreshToken" && error.response) {
            if (error.response.status === 401 && !error.config._retry) {
                error.config._retry = true;
                    console.log("hola")
                try {

                    const rs = await instance.post("/auth/refreshToken", { tokenRefresh: tokenService.getLocalRefreshToken(), })
                    const { tokenAccess } = rs?.data;
                    console.log(tokenAccess);

                    tokenService.upgrateLocalAccessToken(tokenAccess);
                    return instance(error.config);
                } catch (_error) {
                    return Promise.reject(_error)
                }

            }
        }
        return Promise.reject(error);
    }
)

export default instance;