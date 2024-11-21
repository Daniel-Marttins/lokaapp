import { Avatar, Button, EyeOffIcon, EyeOpenIcon, Group, IconButton, Label, Pane, RepeatIcon, SelectField, TextInput, TextInputField } from "evergreen-ui";
import { Usuario } from "../../../models/Usuario";
import { useHookFormEmployee } from "./hooks/useHookFormEmployee";

interface FormProps {
    USUARIO: Usuario | null;
    TIPO: string;
}

export const FormEmployee: React.FC<FormProps> = ({ USUARIO, TIPO }) => {
    const {
        usuario,
        handleChange,
        handleSubmit,
        handleGenerateUserId,
        showPassword,
        togglePasswordVisibility,
    } = useHookFormEmployee(USUARIO, TIPO);

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-start justify-between w-full h-full form">
                <div className='form-img'>
                    <Avatar
                        size={120}
                        name="Foto Perfil"
                        className="form-img-avatar"
                    />
                </div>
                <Pane className="form-input-field">
                    <Pane gap={12} margin={0} className="form-row">
                        <TextInputField
                            label="ID"
                            disabled
                            value={usuario.id || ''}
                            onChange={handleChange}
                            name="id"
                            className="form-id"
                        />
                        <TextInputField
                            label="Nome"
                            value={usuario.nome}
                            onChange={handleChange}
                            name="nome"
                            className="form-nome"
                        />
                        <Group className="mb-8 form-usuario">
                            <Pane width="100%" height="100%">
                                <Label
                                    htmlFor="usuario"
                                    textAlign="left"
                                    className="block font-medium text-gray-700 mb-2"
                                >
                                    Usuário
                                </Label>
                                <Group display="flex" width="100%">
                                    <TextInput
                                        required
                                        disabled
                                        width="100%"
                                        name="usuario"
                                        value={usuario.usuario}
                                        onChange={handleChange}
                                    />
                                    <IconButton
                                        icon={RepeatIcon}
                                        onClick={() => handleGenerateUserId(12)}
                                        type="button"
                                    />
                                </Group>
                            </Pane>
                        </Group>
                    </Pane>
                    <Pane gap={12} className="form-row">
                        <TextInputField
                            label="Email"
                            value={usuario.email}
                            onChange={handleChange}
                            name="email"
                            className="form-email"
                        />
                        {TIPO === 'C' &&
                            <Pane className="form-senha">
                                <Label
                                    htmlFor="senha"
                                    textAlign="left"
                                    className="block font-medium text-gray-700 mb-2"
                                >
                                    Senha
                                </Label>
                                <Group display="flex" width="100%" className="mb-8">
                                    <TextInput
                                        required
                                        width="100%"
                                        name="senha"
                                        type={showPassword ? "text" : "password"}
                                        value={usuario.senha}
                                        onChange={handleChange}
                                    />
                                    <IconButton
                                        icon={showPassword ? EyeOffIcon : EyeOpenIcon}
                                        onClick={togglePasswordVisibility}
                                        type="button"
                                    />
                                </Group>
                            </Pane>
                        }
                    </Pane>
                    <Pane display="flex" gap={12} className="form-row">
                        <SelectField
                            name="cargo"
                            label="Cargo"
                            required
                            value={usuario.cargo}
                            onChange={handleChange}
                            className="form-cargo"
                        >
                            <option value="A">Adiministrador</option>
                            <option value="M">Motorista</option>
                        </SelectField>
                        <SelectField
                            name="ativo"
                            label="Situação"
                            required
                            value={usuario.ativo}
                            onChange={handleChange}
                            className="form-ativo"
                        >
                            <option value="A">Ativo</option>
                            <option value="I">Inativo</option>
                        </SelectField>
                    </Pane>

                    <Button type="submit" intent='success' appearance="primary" className="form-btn-salvar">
                        Salvar
                    </Button>
                </Pane>
            </form>
        </div>
    );
}