import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  userId: string | null;
}

const AuthContext = createContext<AuthContextType>({ userId: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    if (!match) return;

    try {
      const token = match[2];
      const payload: { userId: string } = jwtDecode(token);
      setUserId(payload.userId);
    } catch (err) {
      console.error("Erro ao decodificar token:", err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
