import { createContext, useState, useEffect } from 'react';
import { authEvents } from '../service/authEvents';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("user");
  });
  const invitado = {
    user: {
      id: 0,
      username: "invitado",
      rol: 1
    },
    tokenAccess: null,
    tokenRefresh: null
  };

  useEffect(() => {
    authEvents.logout = logout;
  }, [])

  // Al cargar la app, revisamos si hay token guardado
  useEffect(() => {
    //tokenExpirado();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser === "") {
      localStorage.setItem("user", JSON.stringify(invitado));
      setUser(invitado);
      setIsAuthenticated(false);
      return;
    }
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const loginAuth = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
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
