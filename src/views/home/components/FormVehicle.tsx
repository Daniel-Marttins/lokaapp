import { Avatar, Button, EyeOffIcon, EyeOpenIcon, Group, IconButton, Label, Pane, RepeatIcon, SelectField, TextInput, TextInputField } from "evergreen-ui";
import { Usuario } from "../../../models/Usuario";
import { useHookFormEmployee } from "./hooks/useHookFormEmployee";
import { Veiculo } from "../../../models/Veiculo";
import { useHookFormVehicle } from "./hooks/useHookFormVehicle";

interface FormProps {
    VEICULO: Veiculo | null;
    TIPO: string;
}

export const FormVehicle: React.FC<FormProps> = ({ VEICULO, TIPO }) => {
    const {
        veiculo,
        handleChange,
        handleSubmit
    } = useHookFormVehicle(VEICULO, TIPO);

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-start justify-between w-full h-full form">
                <Pane className="form-input-field-whitout-img">
                    {/* Linha 1: ID, Nome e Grupo */}
                    <Pane gap={12} margin={0} className="form-row">
                        <TextInputField
                            label="ID"
                            disabled
                            value={veiculo.id || ''}
                            onChange={handleChange}
                            name="id"
                            className="form-id"
                        />
                        <TextInputField
                            label="Marca"
                            value={veiculo.veiculo_marca}
                            onChange={handleChange}
                            name="veiculo_marca"
                            className="form-nome"
                        />
                        <TextInputField
                            label="Modelo"
                            value={veiculo.veiculo_modelo}
                            onChange={handleChange}
                            name="veiculo_modelo"
                            className="form-cargo"
                        />
                        <TextInputField
                            label="Placa"
                            value={veiculo.veiculo_placa}
                            onChange={handleChange}
                            name="veiculo_placa"
                            className="form-cargo"
                        />
                    </Pane>
                    <Pane gap={12} className="form-row">

                        <TextInputField
                            label="Limite Revisão"
                            value={veiculo.veiculo_km_limite}
                            onChange={handleChange}
                            name="veiculo_km_limite"
                            type="number"
                            className="form-senha"
                        />
                        <TextInputField
                            label="KM Rodados"
                            value={veiculo.veiculo_km_rodados}
                            onChange={handleChange}
                            name="veiculo_km_rodados"
                            type="number"
                             className="form-senha"
                        />
                    </Pane>

                    <Button type="submit" intent='success' appearance="primary" className="form-btn-salvar">
                        Salvar
                    </Button>
                </Pane>
            </form>
        </div>
    );
}