import { InstanciaAxios } from "../api/InstanciaAxios";
import { Registro } from "../models/Registro";

export const CADASTRO_REGISTRO = async (formulario: Registro) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/c0a8aafa-f18d-4ce2-b587-22298cf383e8`, formulario);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DELETAR_REGISTRO = async (registroId: JSON) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/c0a8aafa-f18d-4ce2-b587-22298cf383e8`, registroId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const BUSCAR_REGISTRO = async () => {
    try {
        const response = await InstanciaAxios.get(`/webhook/a74c4add-c462-4363-a550-b1840d2c08cf`);
        return response.data;
    } catch (error) {
        throw error;
    }
}