import { useEffect, useState } from "react";
import { Usuario } from "../../../../models/Usuario";
import { CADASTRO_USUARIO } from "../../../../service/servicosUsuario";
import { toaster } from "evergreen-ui";

export const useHookFormEmployee = (USUARIO: Usuario | null, TIPO: string) => {
    const [usuario, setUsuario] = useState<Usuario>({
        usuario: '',
        nome: '',
        email: '',
        cargo: '',
        ativo: 'A'
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'ativo') {
            setUsuario({ ...usuario, ativo: value });
            return;
        } else if (name === 'cargo') {
            setUsuario({ ...usuario, cargo: value });
            return;
        }

        setUsuario({ ...usuario, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (TIPO === 'C') {
            const formulario = { ...usuario, tipo: 'C' }
            try {
                await CADASTRO_USUARIO(formulario);
                toaster.success("Usuário cadastrado com sucesso!");
                setUsuario({
                    usuario: '',
                    nome: '',
                    email: '',
                    cargo: '',
                    ativo: 'A'
                });
            } catch (error) {
                toaster.danger("Ocorreu um erro ao cadastrar o usuário.");
                console.error(error);
            }
        } else {
            const formulario = { ...usuario, tipo: 'E' }
            try {
                await CADASTRO_USUARIO(formulario);
                toaster.success("Usuário atualizaddo com sucesso!");
                setUsuario({
                    usuario: '',
                    nome: '',
                    email: '',
                    cargo: '',
                    ativo: 'A'
                });
            } catch (error) {
                toaster.danger("Ocorreu um erro ao atualizar o usuário.");
                console.error(error);
            }
        }
    };

    const handleGenerateUserId = (length: number) => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        setUsuario({ ...usuario, usuario: result });
    };

    useEffect(() => {
        if (USUARIO) {
            setUsuario(USUARIO);
        }
    }, [USUARIO]);

    return {
        usuario,
        handleChange,
        handleSubmit,
        handleGenerateUserId,
        showPassword,
        togglePasswordVisibility,
    };

}