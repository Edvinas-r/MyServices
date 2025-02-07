import { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// Sukuriame kontekstą
const AuthContext = createContext();

// Konteksto tiekėjas
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decoded = jwt_decode(token);
      return { token, ...decoded };
    }
    return null;
  });
  // Prisijungimo funkcija
  const login = (userData) => {
    localStorage.setItem('userToken', userData.token); // Išsaugokite tik token
    const decoded = jwt_decode(userData.token);
    const fullUserData = { ...userData, ...decoded };
    setUser(fullUserData);
  };

  // Atsijungimo funkcija
  const logout = () => {
    localStorage.removeItem('userToken'); // Ištrinkite tik token
    setUser(null);
  };

  // Patikrinkime, ar vartotojas yra autentifikuotas
  useEffect(() => {
    if (user) {
      console.log('Authenticated user:', user);
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// Naudojimas konteksto
export const useAuth = () => {
  return useContext(AuthContext);
};
