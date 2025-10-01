import { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

// Provider
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
