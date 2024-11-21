import { useState } from "react";
import { Usuario } from "../../../models/Usuario";
import { toaster } from "evergreen-ui";
import { LOGIN_USUARIO } from "../../../service/servicosUsuario";
import { useAuth } from "../../../contexts/Autenticacao";
import { useNavigate } from "react-router-dom";

export const useHookLogin = () => {
    const [formData, setFormData] = useState<Usuario>({
        usuario: "",
        senha: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formData.usuario || !formData.senha) {
            toaster.warning("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const dados = await LOGIN_USUARIO(formData);
            if (Object.keys(dados).length !== 0) {
                toaster.success("Login realizado com sucesso!");
                setInterval(() => {
                    login(dados);
                    navigate("/home");
                }, 1000);
            } else {
                toaster.warning("Usuário ou senha inválidos.");
            }

        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro no login: " + error);
        }
    };

    return {
        showPassword,
        togglePasswordVisibility,
        formData,
        handleInputChange,
        handleLogin,
    }
}