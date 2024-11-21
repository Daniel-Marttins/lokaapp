import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import { Veiculo } from "../../../../models/Veiculo";
import { CADASTRO_VEICULO } from "../../../../service/servicosVeiculo";

export const useHookFormVehicle = (VEICULO: Veiculo | null, TIPO: string) => {
    const [veiculo, setVeiculo] = useState<Veiculo>({
        veiculo_marca: '',
        veiculo_modelo: '',
        veiculo_placa: '',
        veiculo_km_limite: 0,
        veiculo_km_rodados: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVeiculo({ ...veiculo, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (TIPO === 'C') {
            const formulario = { ...veiculo, tipo: 'C' }
            try {
                await CADASTRO_VEICULO(formulario);
                toaster.success("Veiculo cadastrado com sucesso!");
                setVeiculo({
                    veiculo_marca: '',
                    veiculo_modelo: '',
                    veiculo_placa: '',
                    veiculo_km_limite: 0,
                    veiculo_km_rodados: 0
                });
            } catch (error) {
                toaster.danger("Ocorreu um erro ao cadastrar o veiculo.");
                console.error(error);
            }
        } else {
            const formulario = { ...veiculo, tipo: 'E' }
            try {
                await CADASTRO_VEICULO(formulario);
                toaster.success("Veiculo atualizaddo com sucesso!");
                setVeiculo({
                    veiculo_marca: '',
                    veiculo_modelo: '',
                    veiculo_placa: '',
                    veiculo_km_limite: 0,
                    veiculo_km_rodados: 0
                });
            } catch (error) {
                toaster.danger("Ocorreu um erro ao atualizar o veiculo.");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (VEICULO) {
            setVeiculo(VEICULO);
        }
    }, [VEICULO]);

    return {
        veiculo,
        handleChange,
        handleSubmit
    };

}