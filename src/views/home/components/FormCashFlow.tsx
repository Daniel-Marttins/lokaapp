import { Button, Pane, SelectField, TextInputField } from "evergreen-ui";
import { Usuario } from "../../../models/Usuario";
import { useHookFormCashFlow } from "./hooks/useHookFormCashFlow";

interface FormProps {
    MOVIMENTACAO: Usuario | null;
    TIPO: string;
}

export const FormCashFlow: React.FC<FormProps> = ({ MOVIMENTACAO, TIPO }) => {
    const {
        movimentacao,
        handleChange,
        handleSubmit,
        formatDate
    } = useHookFormCashFlow(MOVIMENTACAO, TIPO);

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-start justify-between w-full h-full form">
                <Pane className="form-input-field-whitout-img">
                    {/* Linha 1: ID, Nome e Grupo */}
                    <Pane gap={12} margin={0} className="form-row">
                        <TextInputField
                            label="ID"
                            disabled
                            value={movimentacao.id || ''}
                            onChange={handleChange}
                            name="id"
                            className="form-id"
                        />
                        <TextInputField
                            label="Descrição"
                            value={movimentacao.descricao}
                            onChange={handleChange}
                            name="descricao"
                            className="form-nome"
                        />
                        <SelectField
                            name="tipo"
                            label="Tipo"
                            required
                            className="form-cargo"
                            value={movimentacao.tipo}
                            onChange={handleChange}
                        >
                            <option value="N">Selecione</option>
                            <option value="R">Receita</option>
                            <option value="D">Despesa</option>
                        </SelectField>
                        <TextInputField
                            label="Valor R$"
                            value={movimentacao.valor}
                            onChange={handleChange}
                            name="valor"
                            type="number"
                            className="form-cargo"
                        />
                    </Pane>
                    <Pane gap={12} className="form-row">
                        <TextInputField
                            label="Data"
                            value={movimentacao.data ? formatDate(movimentacao.data) : ""}
                            onChange={handleChange}
                            name="data"
                            type="data"
                            className="form-cargo"
                            disabled
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