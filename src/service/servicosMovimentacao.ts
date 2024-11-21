import { InstanciaAxios } from "../api/InstanciaAxios";
import { Movimentacao } from "../models/Movimentacao";

export const CADASTRO_MOVIMENTACAO = async (formulario: Movimentacao) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/933dd172-b245-443a-aae6-ea61c6049a80`, formulario);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DELETAR_MOVIMENTACAO = async (movimentacaoId: JSON) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/933dd172-b245-443a-aae6-ea61c6049a80`, movimentacaoId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const BUSCAR_MOVIMENTACOES = async () => {
    try {
        const response = await InstanciaAxios.get(`/webhook/9aa49e6d-e435-47b7-81ec-e12bc0677d25`);
        return response.data;
    } catch (error) {
        throw error;
    }
}