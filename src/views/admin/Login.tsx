import React from "react";
import { Pane, Card, TextInputField, Button, Heading, Text, Link, TextInput, Group, IconButton, EyeOffIcon, EyeOpenIcon, Label } from "evergreen-ui";
import { useHookLogin } from "./hooks/useHookLogin";

export const Login: React.FC = () => {
    const {
        showPassword,
        togglePasswordVisibility,
        formData,
        handleInputChange,
        handleLogin
    } = useHookLogin();

    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            className="loc bg-gradient-to-r from-gray-700 to-gray-900 p-8 rounded-lg shadow-2xl"

        >
            <Card
                elevation={2}
                padding={24}
                width={400}
                height={450}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                justifyContent="space-around"
                backgroundColor="white"
                borderRadius={5}
            >
                <form
                    className="flex flex-col items-center justify-center w-full"
                    onSubmit={handleLogin}
                >
                    <Pane marginBottom={24}>
                        <Heading size={800} marginTop={8} color="#475569">
                            Lokamais
                        </Heading>
                        <Heading size={600} marginTop={8}>
                            Login
                        </Heading>
                        <Text size={400} color="muted" marginTop={4}>
                            Faça login com sua conta
                        </Text>
                    </Pane>

                    <Pane width="90%" marginBottom={32}>
                        <TextInputField
                            label="Usuário"
                            placeholder="Digite seu usuário"
                            textAlign="left"
                            required
                            value={formData.usuario}
                            onChange={(e: any) => handleInputChange("usuario", e.target.value)}
                        />
                        <Pane marginBottom={8}>
                            <Label
                                htmlFor="password"
                                textAlign="left"
                                className="block font-medium text-gray-700 mb-2"
                            >
                                Senha
                            </Label>
                            <Group display="flex" width="100%">
                                <TextInput
                                    id="password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    width="100%"
                                    value={formData.senha}
                                    onChange={(e: any) => handleInputChange("senha", e.target.value)}
                                />
                                <IconButton
                                    icon={showPassword ? EyeOffIcon : EyeOpenIcon}
                                    onClick={togglePasswordVisibility}
                                    type="button"
                                />
                            </Group>
                        </Pane>
                        <Pane textAlign="left">
                            <Link href="#" size={300} color="blue">
                                Esqueceu a senha?
                            </Link>
                        </Pane>
                    </Pane>

                    {/* Botão Entrar */}
                    <Button appearance="primary" intent="none" width="90%" type="submit">
                        Entrar
                    </Button>
                </form>
            </Card>
        </Pane>
    );
};
