import { useEffect, useMemo, useState } from "react";
import { toaster } from "evergreen-ui";
import { Registro } from "../../../../models/Registro";
import { BUSCAR_REGISTRO, DELETAR_REGISTRO } from "../../../../service/servicosRegistros";

export const useHookRegister = (mes?: string) => {
    const [listaRegistros, setListaRegistros] = useState<Registro[]>([]);
    const [registro, setRegistro] = useState<Registro | null>(null);
    const [showModal, setShowModal] = useState<"desktop" | "mobile" | null>(null);
    const [loading, setLoading] = useState(false);
    const [tipo, setTipo] = useState<'C' | 'E'>('C');
    const [filterType, setFilterType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [filterPlate, setFilterPlate] = useState<string>('');

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

    const buscarRegistros = async () => {
        setLoading(true);
        try {
            const dados = await BUSCAR_REGISTRO();

            const validRecords = dados.filter((item: any) => item && Object.keys(item).length !== 0);

            // Verifica se a lista filtrada não está vazia antes de atualizar o estado
            if (validRecords.length > 0) {
                setListaRegistros(validRecords);
            }

            setLoading(false);
        } catch (e) {
            toaster.danger("Erro ao buscar veiculos");
            console.error(e);
            setLoading(false);
        }
    }

    const handleAddRegister = (modalType: "desktop" | "mobile") => {
        setRegistro(null);
        setTipo('C');
        setShowModal(modalType);
    };

    const handleEditRegister = (register: Registro, modalType: "desktop" | "mobile") => {
        setRegistro(register);
        setTipo('E');
        setShowModal(modalType);
    };

    const handleDeleteRegister = async (registerId: number) => {
        if (window.confirm("Deseja excluir o registro?")) {
            setLoading(true);
            try {
                const json = JSON.parse(
                    JSON.stringify({
                        id: registerId,
                        regra: "D"
                    })
                );
                await DELETAR_REGISTRO(json);
                toaster.success("Registro excluído com sucesso!");
                buscarRegistros();
            } catch (e) {
                toaster.danger("Erro ao excluir registro");
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

    const filteredList = listaRegistros.filter(item => {
        const matchesMonth = mes && item.data_registro
            ? new Date(item.data_registro).getMonth() + 1 === parseInt(mes)
            : true;

        return matchesMonth;
    });

    const filteredListS = useMemo(() => {
        return listaRegistros.filter(item => {
            const matchesType = filterType ? item.tipo === filterType : true;
            const matchesMonth = selectedMonth && item.data_registro
                ? new Date(item.data_registro).getMonth() + 1 === parseInt(selectedMonth)
                : true;
            const matchesPlate = filterPlate
                ? item.veiculo_id?.veiculo_placa?.toLowerCase().includes(filterPlate.toLowerCase())
                : true;

            return matchesType && matchesMonth && matchesPlate;
        });
    }, [listaRegistros, filterType, selectedMonth, filterPlate]);

    const closeModal = () => {
        setShowModal(null);
    };

    useEffect(() => {
        const currentMonth = (new Date()).getMonth() + 1;
        setSelectedMonth(currentMonth.toString());
    }, []);

    useEffect(() => {
        if (!showModal) {
            buscarRegistros();
        }
    }, [showModal]);


    useEffect(() => {
        buscarRegistros();
    }, []);


    return {
        showModal,
        registro,
        setRegistro,
        listaRegistros: filteredListS,
        handleEditRegister,
        loading,
        tipo,
        setTipo,
        handleAddRegister,
        setShowModal,
        formatDate,
        closeModal,
        filteredList,
        handleDeleteRegister,
        setFilterType,
        filterType,
        monthMapping,
        selectedMonth,
        setSelectedMonth,
        filterPlate,
        setFilterPlate
    }

}