import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Usuario } from "../models/Usuario";

interface AuthContextType {
    usuario: Usuario | null;
    login: (USUARIO: Usuario) => void;
    logout: () => void;
    logado: boolean;
    loading: boolean;
}

const Autenticacao = createContext<AuthContextType | null>(null);

interface PropriedadesAutenticaao {
    children: ReactNode;
}

const SESSION_DURATION = 1 * 60 * 60 * 1000;

export const ProvedorAutenticacao: React.FC<PropriedadesAutenticaao> = ({ children }) => {
    const [usuario, setarUsuario] = useState<Usuario | null>(null);
    const [logado, setLogado] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = (USUARIO: Usuario) => {
        const tempoExpiracao = new Date().getTime() + SESSION_DURATION;
        
        setarUsuario(USUARIO);
        setLogado(true);
        localStorage.setItem("usuario", JSON.stringify(USUARIO));
        localStorage.setItem("tempoExpiracao", tempoExpiracao.toString());
    };

    const logout = () => {
        setarUsuario(null);
        setLogado(false);
        localStorage.removeItem("usuario");
        localStorage.removeItem("tempoExpiracao");

        document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        if ("caches" in window) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }

        setTimeout(() => {
            window.location.href = "/";
            window.location.reload();
        }, 200);
    };

    useEffect(() => {
        const usuarioArmazenado = localStorage.getItem("usuario");
        const tempoExpiracaoArmazemado = localStorage.getItem("tempoExpiracao");
    
        if (usuarioArmazenado && tempoExpiracaoArmazemado) {
            const tempoAtual = new Date().getTime();
            const tempoExpiracao = parseInt(tempoExpiracaoArmazemado, 10);
    
            if (tempoAtual < tempoExpiracao) {
                const usuarioConvertido: Usuario = JSON.parse(usuarioArmazenado);
                setarUsuario(usuarioConvertido);
                setLogado(true);
            } else {
                logout();
            }
        }
        
        setLoading(false);
    }, []);

    return (
        <Autenticacao.Provider value={{ usuario, login, logout, logado, loading }}>
            {children}
        </Autenticacao.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(Autenticacao);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};

export { Autenticacao };
