import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const invitado = {
    username: "invitado",
    rol: 1
  };

  // Al cargar la app, revisamos si hay token guardado
  useEffect(() => {
    tokenExpirado();
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser === "") {
      localStorage.setItem("user", JSON.stringify(invitado));
      setUser(invitado);
      setIsAuthenticated(false);
      return;
    }
    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const tokenExpirado = () => {
    const token = localStorage.getItem("token");
    if (!token) return

    try {
      const decoded = jwtDecode(token);
      const contador = Date.now() / 1000;

      if (decoded.exp < contador) {
        console.warn("ha expirado su token. Cerrando sesion...");
        logout();
      }
    } catch (error) {
      console.error("Ha ocurrido un error", error);
      logout();
    }
  }

  const loginAuth = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("user", JSON.stringify(invitado));
    setUser(invitado);
    setIsAuthenticated(false);
    console.log(user);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
