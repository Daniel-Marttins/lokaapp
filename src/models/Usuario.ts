export interface Usuario {
    id?: number;
    usuario?: string;
    nome?: string;
    email?: string;
    senha?: string;
    foto_url?: string;
    cargo?: string;
    ativo?: string;
    data_criacao?: Date;
    data_atualizacao?: Date;
}