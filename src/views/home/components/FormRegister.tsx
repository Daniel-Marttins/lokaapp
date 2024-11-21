import { Avatar, Button, Dialog, FilePicker, Label, Pane, SelectField, TextInputField } from "evergreen-ui";
import { Registro } from "../../../models/Registro";
import { useHookFormRegister } from "./hooks/useHookFormRegister";
import { useHookVehicle } from "./hooks/useHookVehicle";
import { useHookEmployee } from "./hooks/useHookEmployee";

interface FormProps {
    REGISTRO: Registro | null;
    TIPO: string;
}

export const FormRegister: React.FC<FormProps> = ({ REGISTRO, TIPO }) => {
    const {
        usuario,
        registro,
        handleChange,
        handleSubmit,
        formatDate,
        handleAvatarClick,
        handleStopCamera,
        handleSaveImage,
        isModalOpen,
        setIsModalOpen,
        isCameraActive,
        cameraStream,
        painelImage,
        motoristaImage,
        setRegistro
    } = useHookFormRegister(REGISTRO, TIPO);

    const { listaVeiculos } = useHookVehicle();
    const { listaUsuarios } = useHookEmployee();

    return (
        <div className="flex" style={{ height: "100%" }}>
            <form onSubmit={handleSubmit} className="flex items-start justify-between w-full h-full form">
                <Pane className='form-img-register justify-between'>
                    <Pane display="flex" flexDirection="column" className="items-center">
                        <Avatar
                            size={120}
                            name="Foto Painel"
                            src={painelImage || undefined}
                            onClick={() => handleAvatarClick("painel")}
                            cursor="pointer"
                            className="form-img-avatar"
                        />
                        <Label textAlign="center" marginBottom={8} marginTop={8}>Painel</Label>
                    </Pane>

                    <Pane display="flex" flexDirection="column" className="items-center">
                        <Avatar
                            size={120}
                            name="Foto Motorista"
                            src={motoristaImage || undefined}
                            onClick={() => handleAvatarClick("motorista")}
                            cursor="pointer"
                            className="form-img-avatar"
                        />
                        <Label textAlign="center" marginBottom={8} marginTop={8}>Motorista</Label>
                    </Pane>
                </Pane>

                <Pane className="form-input-field">
                    <Pane gap={12} margin={0} className="form-row">
                        <TextInputField
                            label="ID"
                            disabled
                            value={registro.id || ''}
                            onChange={handleChange}
                            name="id"
                            className="form-id"
                        />
                        <SelectField
                            label="Motorista"
                            disabled={usuario?.cargo === "M"} // Desativa o campo se for motorista
                            value={
                                usuario?.cargo === "M" // Caso seja motorista, pré-seleciona o próprio usuário
                                    ? usuario.id
                                    : registro.motorista_id?.id || ''
                            }
                            onChange={(e) => {
                                const selectedMotorista = listaUsuarios.find(
                                    (motorista) => motorista.id === Number(e.target.value)
                                );
                                setRegistro((prev) => ({
                                    ...prev,
                                    motorista_id: selectedMotorista || null,
                                }));
                            }}
                            name="motorista_id"
                            className="form-nome"
                        >
                            <option value="" disabled>
                                Selecione um motorista
                            </option>
                            {listaUsuarios.map((motorista) => (
                                <option key={motorista.id} value={motorista.id}>
                                    {motorista.nome}
                                </option>
                            ))}
                        </SelectField>
                        <SelectField
                            name="tipo"
                            label="Tipo"
                            required
                            className="form-cargo"
                            value={registro.tipo}
                            onChange={handleChange}
                        >s
                            <option value="E">Entrada</option>
                            <option value="S">Saida</option>
                        </SelectField>
                    </Pane>
                    <Pane gap={12} className="form-row">
                        <TextInputField
                            label="KM Atual"
                            type="number"
                            value={registro.km_registro}
                            onChange={handleChange}
                            name="km_registro"
                            className="form-cargo"
                        />
                        <Pane className="form-cargo">
                            <SelectField
                                label="Veículo"
                                required
                                name="veiculo_id"
                                value={registro.veiculo_id?.id || ''}
                                onChange={(e) => {
                                    const selectedVehicle = listaVeiculos.find(
                                        (veiculo) => veiculo.id === Number(e.target.value)
                                    );
                                    setRegistro((prev) => ({
                                        ...prev,
                                        veiculo_id: selectedVehicle || null,
                                    }));
                                }}
                                width="100%"
                            >
                                <option value="">
                                    Selecione um veículo
                                </option>
                                {listaVeiculos.map((veiculo) => (
                                    <option key={veiculo.id} value={veiculo.id}>
                                        {veiculo.veiculo_placa}
                                    </option>
                                ))}
                            </SelectField>
                        </Pane>
                        <TextInputField
                            label="Data"
                            value={registro.data_registro ? formatDate(registro.data_registro) : ""}
                            onChange={handleChange}
                            name="data_registro"
                            type="data"
                            className="form-cargo"
                            disabled
                        />
                        <TextInputField
                            label="Hora"
                            value={registro.hora_registro || ''}
                            onChange={handleChange}
                            name="hora_registro"
                            className="form-cargo"
                        />
                    </Pane>
                    <Pane gap={12} className="form-row">
                        <TextInputField
                            label="Rota"
                            //value={registro.hora_registro || ''}
                            onChange={handleChange}
                            name="rota_id"
                            className="form-nome"
                        />
                    </Pane>

                    <Button type="submit" intent='success' appearance="primary" className="form-btn-salvar">
                        Salvar
                    </Button>
                </Pane>
            </form>

            <Dialog
                isShown={isModalOpen}
                title="Adicionar Foto"
                onCloseComplete={() => setIsModalOpen(false)}
                hasFooter={false}
            >
                {isCameraActive ? (
                    <Pane>
                        <video
                            autoPlay
                            playsInline
                            ref={(video) => {
                                if (video && cameraStream) {
                                    video.srcObject = cameraStream;
                                }
                            }}
                            width="100%"
                        />
                        <Button
                            intent="success"
                            onClick={() => {
                                const canvas = document.createElement("canvas");
                                const video = document.querySelector("video");
                                if (video) {
                                    canvas.width = video.videoWidth;
                                    canvas.height = video.videoHeight;
                                    const ctx = canvas.getContext("2d");
                                    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
                                    const image = canvas.toDataURL("image/png");
                                    handleSaveImage(image);
                                }
                            }}
                        >
                            Salvar Foto
                        </Button>
                        <Button onClick={handleStopCamera}>Fechar Câmera</Button>
                    </Pane>
                ) : (
                    <Pane>
                        <FilePicker
                            multiple={false}
                            onChange={(files) => {
                                const file = files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => handleSaveImage(reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </Pane>
                )}
            </Dialog>
        </div>
    );
}