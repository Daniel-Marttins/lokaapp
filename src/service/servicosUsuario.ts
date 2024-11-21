import { InstanciaAxios } from "../api/InstanciaAxios";
import { Usuario } from "../models/Usuario";

export const LOGIN_USUARIO = async (formulario: Usuario) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/e9eec1ea-a0c6-43c2-9ae6-8e207a9bd3d5`, formulario);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const CADASTRO_USUARIO = async (formulario: Usuario) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/e97cd6c7-1ba1-4847-b4de-09c96955f38a`, formulario);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DELETAR_USUARIO = async (userId: JSON) => {
    try {
        const response = await InstanciaAxios.post(`/webhook/e97cd6c7-1ba1-4847-b4de-09c96955f38a`, userId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const BUSCAR_USUARIOS = async () => {
    try {
        const response = await InstanciaAxios.get(`/webhook/8c9b5101-8f57-4fa5-8f8b-59530476b60e`);
        return response.data;
    } catch (error) {
        throw error;
    }
}