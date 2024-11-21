import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import { BUSCAR_MOVIMENTACOES, DELETAR_MOVIMENTACAO } from "../../../../service/servicosMovimentacao";
import { Movimentacao } from "../../../../models/Movimentacao";

export const useHookCashFlow = () => {
    const [listaMovimentacao, setListaMovimentacao] = useState<Movimentacao[]>([]);
    const [movimentacao, setMovimentacao] = useState<Movimentacao | null>(null);
    const [showModal, setShowModal] = useState<"desktop" | "mobile" | null>(null);
    const [loading, setLoading] = useState(false);
    const [tipo, setTipo] = useState<'C' | 'E'>('C');
    const [filterType, setFilterType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState<string>("");

    const monthMapping: { [key: string]: string } = {
        '1': 'Janeiro',
        '2': 'Fevereiro',
        '3': 'Março',
        '4': 'Abril',
        '5': 'Maio',
        '6': 'Junho',
        '7': 'Julho',
        '8': 'Agosto',
        '9': 'Setembro',
        '10': 'Outubro',
        '11': 'Novembro',
        '12': 'Dezembro',
    };

    const buscarMovimentacao = async () => {
        console.log('PING BUSCAR MOV ----')
        setLoading(true);
        try {
            const dados = await BUSCAR_MOVIMENTACOES();
            if (dados.length !== 0 && Object.keys(dados).length !== 0) {
                setListaMovimentacao(dados);
                setLoading(false);
            }
        } catch (e) {
            toaster.danger("Erro ao buscar movimentações");
            console.error(e);
            setLoading(false);
        }
    }

    const handleAddFlow = (modalType: "desktop" | "mobile") => {
        setMovimentacao(null);
        setTipo('C');
        setShowModal(modalType);
    };

    const handleEditFlow = (flow: Movimentacao, modalType: "desktop" | "mobile") => {
        setMovimentacao(flow);
        setTipo('E');
        setShowModal(modalType);
    };

    const handleDeleteRegister = async (flowId: number) => {
        if (window.confirm("Deseja excluir a movimentação?")) {
            setLoading(true);
            try {
                const json = JSON.parse(
                    JSON.stringify({
                        id: flowId,
                        regra: "D"
                    })
                );
                await DELETAR_MOVIMENTACAO(json);
                toaster.success("Movimentação excluído com sucesso!");
                buscarMovimentacao();
            } catch (e) {
                toaster.danger("Erro ao excluir movimentação!");
                console.error(e);
            }
            setLoading(false);
        }
    }

    const formatDate = (date: Date | string): string => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return '';
        }

        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calcularTotais = () => {
        let totalReceitas = 0;
        let totalDespesas = 0;

        filteredList.forEach((item) => {
            if (item.tipo === 'R') {
                totalReceitas += item.valor ? item.valor : 0;
            } else if (item.tipo === 'D') {
                totalDespesas += item.valor ? item.valor : 0;
            }
        });

        return {
            totalReceitas,
            totalDespesas,
            saldo: totalReceitas - totalDespesas,
        };
    };

    const filteredList = listaMovimentacao.filter(item => {
        const matchesType = filterType ? item.tipo === filterType : true;

        const matchesMonth = selectedMonth && item.data
            ? new Date(item.data).getMonth() + 1 === parseInt(selectedMonth)
            : true;

        return matchesType && matchesMonth;
    });

    const closeModal = () => {
        setShowModal(null); // Fecha o modal
    };

    useEffect(() => {
        const currentMonth = (new Date()).getMonth() + 1;
        setSelectedMonth(currentMonth.toString());
    }, []);

    useEffect(() => {
        if (!showModal) {
            buscarMovimentacao();
        }
    }, [showModal]);


    useEffect(() => {
        buscarMovimentacao();
    }, []);


    return {
        showModal,
        movimentacao,
        setMovimentacao,
        listaMovimentacao: filteredList,
        handleEditFlow,
        loading,
        tipo,
        setTipo,
        handleAddFlow,
        setShowModal,
        formatDate,
        calcularTotais,
        setFilterType,
        filterType,
        monthMapping,
        selectedMonth,
        setSelectedMonth,
        closeModal,
        handleDeleteRegister
    }

}