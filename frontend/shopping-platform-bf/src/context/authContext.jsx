import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
import { handleError } from "../utils/handleError";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setUser(data);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      handleError(error);
    }
    setUser(null);
  };

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <AuthContext.Provider 
      value={{
        user,
        login,
        logout,
        loading,
        showAuthModal,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);