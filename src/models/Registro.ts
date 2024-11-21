import { Usuario } from "./Usuario";
import { Veiculo } from "./Veiculo";

export interface Registro {
    id?: number;
    tipo?: string;
    motorista_id: Usuario | null;
    km_registro?: number;
    foto_painel?: string;
    foto_motorista?: string;
    veiculo_id: Veiculo | null;
    data_registro?: Date;
    hora_registro?: string;
}