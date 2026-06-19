import { createContext, useEffect, useState } from "react";
import type UserInterface from "../interfaces/UserInterface";
import { api } from "../services/common/ApiService";
import type { AuthContextInterface } from "../interfaces/AuthContextInterface";

export const AuthContext = createContext<AuthContextInterface | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function ValidarToken() {
            const refresh = localStorage.getItem("refreshToken");
            const userData = localStorage.getItem("user");
            if (!refresh || !userData) {
                setLoading(false);
                return;
            }

            try{
                const refresh = localStorage.getItem("refreshToken");
                if (!refresh || !userData) throw new Error();
                const { data } = await api.post("/token/refresh/", { refresh });
                localStorage.setItem("accessToken", data.access);
                setUser(JSON.parse(userData));
            }
            catch (error) {
                console.error("Erro ao validar token:", error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }
        ValidarToken();
    }, []);
    const login = (userData: UserInterface, accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
    }
    const isLogged = !!user;
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isLogged }}>
            {children}
        </AuthContext.Provider>
    )

}