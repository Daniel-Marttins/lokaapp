import { useEffect, useState } from "react";
import { Usuario } from "../../../../models/Usuario";
import { CADASTRO_USUARIO } from "../../../../service/servicosUsuario";
import { toaster } from "evergreen-ui";
import { Registro } from "../../../../models/Registro";
import { useAuth } from "../../../../contexts/Autenticacao";
import { CADASTRO_REGISTRO } from "../../../../service/servicosRegistros";

export const useHookFormRegister = (REGISTRO: Registro | null, TIPO: string) => {
    const { usuario } = useAuth();
    const [registro, setRegistro] = useState<Registro>({
        motorista_id: usuario?.cargo === "M" ? usuario : null,
        km_registro: 0,
        foto_painel: '',
        foto_motorista: '',
        veiculo_id: null,
        data_registro: new Date(),
        hora_registro: '00:00',
        tipo: 'E'
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"painel" | "motorista" | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [painelImage, setPainelImage] = useState<string | null>(null); // Foto do painel
    const [motoristaImage, setMotoristaImage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'tipo') {
            setRegistro((prev) => ({ ...prev, tipo: value }));
            return;
        }

        setRegistro((prev) => ({ ...prev, [name]: value }));
    };

    const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                throw new Error("Erro ao obter o endereço.");
            }
            return data.display_name;
        } catch (error) {
            throw new Error("Erro ao realizar a geocodificação.");
        }
    };

    const handlePosition = async (latitude: number, longitude: number) => {
        try {
            const endereco = await getAddressFromCoordinates(latitude, longitude);

            const registroCompleto = {
                ...registro,
                motorista_id: registro.motorista_id,
                veiculo_id: registro.veiculo_id,
                regra: TIPO === 'C' ? 'C' : 'E',
                latitude, // Adicionando latitude
                longitude, // Adicionando longitude
                endereco, // Endereço completo
            };

            console.log(registroCompleto);

          

            try {
                await CADASTRO_REGISTRO(registroCompleto);
                toaster.success(
                    TIPO === 'C'
                        ? "Registro cadastrado com sucesso!"
                        : "Registro atualizado com sucesso!"
                );
            } catch (error) {
                toaster.danger("Erro ao enviar o registro.");
                console.error(error);
            }
        } catch (error) {
            toaster.danger("Erro ao obter o endereço.");
            console.error(error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    handlePosition(latitude, longitude);
                },
                (error) => {
                    console.error("Erro ao obter a localização via GPS:", error);
                    toaster.danger("Erro ao obter a localização.");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            toaster.danger("Geolocalização não é suportada neste navegador.");
        }
    };

    const formatDate = (date: Date | string): string => {
        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return '';
        }

        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleAvatarClick = (type: "painel" | "motorista") => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCaptureImage = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStream(stream);
            setIsCameraActive(true);
        } catch (error) {
            toaster.danger("Não foi possível acessar a câmera.");
            console.error(error);
        }
    };

    const handleStopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => track.stop());
        }
        setIsCameraActive(false);
    };

    const handleSaveImage = (image: string) => {
        if (modalType === "painel") {
            setPainelImage(image);
            registro.foto_painel = image;
        } else if (modalType === "motorista") {
            setMotoristaImage(image);
            registro.foto_motorista = image;
        }

        handleStopCamera();
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (REGISTRO) {
            setPainelImage(REGISTRO.foto_painel ? REGISTRO.foto_painel : null);
            setMotoristaImage(REGISTRO.foto_motorista ? REGISTRO.foto_motorista : null);
            setRegistro(REGISTRO);
        }
    }, [REGISTRO]);

    return {
        usuario,
        registro,
        handleChange,
        handleSubmit,
        formatDate,
        handleAvatarClick,
        handleCaptureImage,
        handleStopCamera,
        handleSaveImage,
        isModalOpen,
        setIsModalOpen,
        isCameraActive,
        setIsCameraActive,
        cameraStream,
        painelImage,
        setPainelImage,
        motoristaImage,
        setMotoristaImage,
        modalType,
        setRegistro
    }

}