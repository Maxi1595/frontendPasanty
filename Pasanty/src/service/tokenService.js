

const getLocalAccessToken = () => {
    const user = localStorage.getItem("user");
    return user.tokenAccess;

}

const getLocalRefreshToken = () => {
    const user = localStorage.getItem("user");
    return user.tokenRefresh;
}

const upgrateLocalAccessToken = (nuevoToken) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    user.tokenAccess = nuevoToken;
    localStorage.setItem("user", JSON.stringify(user));
}

export default {
    getLocalAccessToken,
    getLocalRefreshToken,
    upgrateLocalAccessToken
}