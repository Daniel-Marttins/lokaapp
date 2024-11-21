import { useEffect, useState } from "react";
import { Usuario } from "../../../../models/Usuario";
import { toaster } from "evergreen-ui";
import { Veiculo } from "../../../../models/Veiculo";
import { BUSCAR_VEICULOS, DELETAR_VEICULO } from "../../../../service/servicosVeiculo";

export const useHookVehicle = () => {
    const [listaVeiculos, setListaVeiculos] = useState<Veiculo[]>([]);
    const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
    const [showModal, setShowModal] = useState<"desktop" | "mobile" | null>(null);
    const [loading, setLoading] = useState(false);
    const [tipo, setTipo] = useState<'C' | 'E'>('C');

    const buscarVeiculos = async () => {
        setLoading(true);
        try {
            const dados = await BUSCAR_VEICULOS();
            if (dados.length !== 0 && Object.keys(dados).length !== 0) {
                setListaVeiculos(dados);
                setLoading(false);
            }
        } catch (e) {
            toaster.danger("Erro ao buscar veiculos");
            console.error(e);
            setLoading(false);
        }
    }

    const handleAddVehicle = (modalType: "desktop" | "mobile") => {
        setVeiculo(null);
        setTipo('C');
        setShowModal(modalType); // Define o tipo do modal
    };

    const handleEditVehicle = (vehicle: Veiculo, modalType: "desktop" | "mobile") => {
        setVeiculo(vehicle);
        setTipo('E');
        setShowModal(modalType); // Define o tipo do modal
    };

    const handleDeleteRegister = async (vehicleId: number) => {
        if (window.confirm("Deseja excluir o registro?")) {
            setLoading(true);
            try {
                const json = JSON.parse(
                    JSON.stringify({
                        id: vehicleId,
                        regra: "D"
                    })
                );
                await DELETAR_VEICULO(json);
                toaster.success("Veiculo excluído com sucesso!");
                buscarVeiculos();
            } catch (e) {
                toaster.danger("Erro ao excluir veiculo");
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
            buscarVeiculos();
        }
    }, [showModal]);


    useEffect(() => {
        buscarVeiculos();
    }, []);


    return {
        showModal,
        veiculo,
        setVeiculo,
        listaVeiculos,
        handleEditVehicle,
        loading,
        tipo,
        setTipo,
        handleAddVehicle,
        setShowModal,
        closeModal,
        handleDeleteRegister
    }

}