import { useEffect, useState } from "react";
import { Usuario } from "../../../../models/Usuario";
import { toaster } from "evergreen-ui";
import { BUSCAR_USUARIOS, DELETAR_USUARIO } from "../../../../service/servicosUsuario";

export const useHookEmployee = () => {
    const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [showModal, setShowModal] = useState<"desktop" | "mobile" | null>(null);
    const [loading, setLoading] = useState(false);
    const [tipo, setTipo] = useState<'C' | 'E'>('C');

    const buscarUsuarios = async () => {
        setLoading(true);
        try {
            const dados = await BUSCAR_USUARIOS();
            if (dados.length !== 0 && Object.keys(dados).length !== 0) {
                setListaUsuarios(dados);
            }
        } catch (e) {
            toaster.danger("Erro ao buscar usuários");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = (modalType: "desktop" | "mobile") => {
        setUsuario(null);
        setTipo('C');
        setShowModal(modalType); // Define o tipo do modal
    };

    const handleEditUser = (user: Usuario, modalType: "desktop" | "mobile") => {
        setUsuario(user);
        setTipo('E');
        setShowModal(modalType); // Define o tipo do modal
    };

    const handleDeleteRegister = async (userId: number) => {
        if (window.confirm("Deseja excluir o usuário?")) {
            setLoading(true);
            try {
                const json = JSON.parse(
                    JSON.stringify({
                        id: userId,
                        regra: "D"
                    })
                );
                await DELETAR_USUARIO(json);
                toaster.success("Usuário excluído com sucesso!");
                buscarUsuarios();
            } catch (e) {
                toaster.danger("Erro ao excluir usuário");
                console.error(e);
            }
            setLoading(false);
        }
    }

    const closeModal = () => {
        setShowModal(null);
    };

    useEffect(() => {
        if (!showModal) {
            buscarUsuarios();
        }
    }, [showModal]);

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return {
        showModal,
        usuario,
        setUsuario,
        listaUsuarios,
        handleEditUser,
        loading,
        tipo,
        setTipo,
        handleAddUser,
        closeModal,
        handleDeleteRegister
    };
};
