import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const login = (t) => { setToken(t); localStorage.setItem('token', t); };
    const logout = () => { setToken(null); localStorage.removeItem('token'); };
    const value = useMemo(() => ({ token, login, logout }), [token]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
