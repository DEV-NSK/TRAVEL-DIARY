import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister, getMe } from "../services/authService";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // for initial restore

  // restore session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    getMe()
      .then(res => setUser(res.data.user || res.data))
      .catch(() => { localStorage.removeItem("token"); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    localStorage.setItem("token", res.data.token);
    // prefer backend to return user; fallback to /me
    const u = res.data.user || (await getMe()).data.user || (await getMe()).data;
    setUser(u);
    return u;
  };

  const register = async (payload) => {
    const res = await apiRegister(payload);
    localStorage.setItem("token", res.data.token);
    const u = res.data.user || (await getMe()).data.user || (await getMe()).data;
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
