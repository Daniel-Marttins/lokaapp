import { InstanciaAxios } from "../api/InstanciaAxios";
import { Veiculo } from "../models/Veiculo";

export const CADASTRO_VEICULO = async (formulario: Veiculo) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/902e8062-b636-48c1-812c-f42fa3745cae`, formulario);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DELETAR_VEICULO = async (vehicleId: JSON) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/902e8062-b636-48c1-812c-f42fa3745cae`, vehicleId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const BUSCAR_VEICULOS = async () => {
    try {
        const response = await InstanciaAxios.get(`/webhook/4b598790-f62b-4153-99c8-408e406948f3`);
        return response.data;
    } catch (error) {
        throw error;
    }
}