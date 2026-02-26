

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    return user?.tokenAccess;
}

const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user?.tokenRefresh);
    return user?.tokenRefresh;
}

const upgrateLocalAccessToken = (nuevoToken) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) return;
console.log(user, "2");
    user.tokenAccess = nuevoToken;
    console.log(user, "3");
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user, "final");
}

export default {
    getLocalAccessToken,
    getLocalRefreshToken,
    upgrateLocalAccessToken
}