import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import { Movimentacao } from "../../../../models/Movimentacao";
import { CADASTRO_MOVIMENTACAO } from "../../../../service/servicosMovimentacao";

export const useHookFormCashFlow = (MOVIMENTACAO: Movimentacao | null, TIPO: string) => {
    const [movimentacao, setMovimentacao] = useState<Movimentacao>({
        descricao: '',
        tipo: 'N',
        data: new Date(),
        valor: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'data') {
            const [day, month, year] = value.split('/').map((item) => parseInt(item, 10));
            const novaData = new Date(year, month - 1, day);
            setMovimentacao({ ...movimentacao, [name]: novaData });
        } else {
            setMovimentacao({ ...movimentacao, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (TIPO === 'C') {
            if(movimentacao.tipo === 'N') {
                toaster.warning("Por favor, escolha um tipo de movimentação.");
                return;
            }
            const formulario = { ...movimentacao, regra: 'C' }
            try {
                await CADASTRO_MOVIMENTACAO(formulario);
                toaster.success("Movimentação cadastrado com sucesso!");
                setMovimentacao({
                    descricao: '',
                    tipo: 'N',
                    data: new Date(),
                    valor: 0
                });
            } catch (error) {
                toaster.danger("Ocorreu um erro ao cadastrar movimentação.");
                console.error(error);
            }
        } else {
            const formulario = { ...movimentacao, regra: 'E' }
            try {
                await CADASTRO_MOVIMENTACAO(formulario);
                toaster.success("Movimentação atualizaddo com sucesso!");
                setMovimentacao({
                    descricao: '',
                    tipo: 'N',
                    data: new Date(),
                    valor: 0
                });
            } catch (error) {
                toaster.danger("Ocorreu um erro ao atualizar o movimentação.");
                console.error(error);
            }
        }
    };

    const formatDate = (date: Date | string): string => {
        // Verifica se a data é uma string e converte para objeto Date
        const parsedDate = new Date(date);

        // Se a conversão não resultar em uma data válida, retorna uma string vazia ou uma mensagem de erro
        if (isNaN(parsedDate.getTime())) {
            return ''; // ou alguma mensagem de erro
        }

        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (MOVIMENTACAO) {
            setMovimentacao(MOVIMENTACAO);
        }
    }, [MOVIMENTACAO]);

    return {
        movimentacao,
        handleChange,
        handleSubmit,
        formatDate
    };

}