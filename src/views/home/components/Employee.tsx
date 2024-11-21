import React from 'react';
import { Button, Table, Pane, AddIcon, Dialog, PeopleIcon, EditIcon, TrashIcon, IconButton, Spinner, Card, Heading } from 'evergreen-ui';
import { useHookEmployee } from './hooks/useHookEmployee';
import { FormEmployee } from './FormEmployee';

export const Employee: React.FC = () => {
    const {
        showModal,
        handleAddUser,
        usuario,
        listaUsuarios,
        handleEditUser,
        loading,
        tipo,
        closeModal,
        handleDeleteRegister
    } = useHookEmployee();

    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-between w-full h-full p-4 bg-slate-200 content-pc">
                <Pane background='#F9FAFC' className="flex items-center justify-between p-2 w-full rounded-sm" height="10%">
                    <h1 className="flex items-center justify-center font-semibold text-slate-600 h-full">
                        <PeopleIcon className="mr-2 ml-2" />
                        .: Cadastrar Funcionarios :.
                    </h1>
                    <Button
                        intent='success'
                        appearance='primary'
                        className='mr-2'
                        onClick={() => handleAddUser("desktop")}>
                        Adicionar
                        <AddIcon className='ml-2' />
                    </Button>
                    <Dialog
                        isShown={showModal === "desktop"}
                        title={tipo === 'C' ? "Adicionar Usuário" : "Atualizar Usuário"}
                        hasFooter={false}
                        width={900}
                        onCloseComplete={closeModal}
                    >
                        <FormEmployee USUARIO={usuario} TIPO={tipo} />
                    </Dialog>
                </Pane>

                <Pane className="w-full" height="88%">
                    <Table className="w-full h-full flex flex-col">
                        <Table.Head
                            className="w-full flex items-center"
                            style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                        >
                            <Table.Cell style={{ flex: 3, textAlign: 'left' }}>Nome</Table.Cell>
                            <Table.Cell style={{ flex: 3, textAlign: 'left' }}>Email</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Cargo</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Ativo</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Ações</Table.Cell>
                        </Table.Head>

                        <Table.Body className="w-full">
                            {listaUsuarios.map((user, index) => (
                                <Table.Row
                                    key={index}
                                    isSelectable
                                    className="flex items-center"
                                    style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                                >
                                    <Table.TextCell style={{ flex: 3 }}>{user.nome}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 3 }}>{user.email}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 1 }}>
                                        {user.cargo === 'M' ? 'Motorista' : 'Administrador'}
                                    </Table.TextCell>
                                    <Table.TextCell style={{ flex: 0.9, marginRight: 5 }}>
                                        {user.ativo === 'A' ? 'Ativo' : 'Inativo'}
                                    </Table.TextCell>
                                    <Table.Cell height="100%" style={{ flex: 1.2 }}>
                                        <IconButton size="small" onClick={() => handleEditUser(user, "desktop")} icon={EditIcon} marginRight={8} intent="none" appearance="minimal" />
                                        <IconButton size="small" onClick={() => handleDeleteRegister(user.id!)} icon={TrashIcon} intent="danger" appearance="minimal" />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Pane>

                {loading && (
                    <Pane
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        background="rgba(255, 255, 255, 0.8)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex={10}
                    >
                        <Spinner size={64} />
                    </Pane>
                )}
            </div>
            <div className="flex flex-col items-center justify-between w-full h-full bg-slate-200 rounded-3xl content-mobile">
                <Pane background='#F9FAFC' className="flex items-center justify-between rounded-2xl p-2 w-full" height="10%">
                    <h1 className="flex items-center justify-center font-semibold text-slate-600 h-full text-sm">
                        <PeopleIcon className="mr-2 ml-2" />
                        .: Cadastrar Funcionarios :.
                    </h1>
                    <Button
                        intent='success'
                        appearance='primary'
                        className='mr-2'
                        onClick={() => handleAddUser("mobile")}>
                        <AddIcon />
                    </Button>
                    <Dialog
                        isShown={showModal === "mobile"}
                        title={tipo === 'C' ? "Adicionar Usuário" : "Atualizar Usuário"}
                        hasFooter={false}
                        width={400}
                        onCloseComplete={closeModal}
                    >
                        <FormEmployee USUARIO={usuario} TIPO={tipo} />
                    </Dialog>
                </Pane>
                <Pane className="w-full flex-col flex items-center justify-start" height="88%">
                    <div
                        className="flex items-center justify-start bg-white px-4"
                        style={{
                            width: "95%",
                            height: "40px",
                            borderBottom: "1px solid #e5e7eb",
                            marginBottom: 8,
                            position: "sticky",
                            top: 0,
                            zIndex: 10
                        }}
                    >
                        <h3 style={{ flex: 3, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Nome</h3>
                        <h3 style={{ flex: 2, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Cargo</h3>
                        <h3 style={{ flex: 1, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Ações</h3>
                    </div>

                    <div
                        className="w-full flex flex-col items-center overflow-y-auto"
                        style={{
                            height: "calc(88% - 40px)",
                            paddingTop: "8px"
                        }}
                    >
                        {listaUsuarios.map((user, index) => (
                            <Card
                                className="flex items-center justify-start bg-white px-4"
                                key={index}
                                style={{
                                    width: "95%",
                                    height: "60px",
                                    marginBottom: 10,
                                    borderRadius: "5px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    alignItems: "center"
                                }}
                            >
                                <h3
                                    style={{
                                        flex: 3,
                                        fontSize: "10px",
                                        textAlign: "left",
                                        margin: 0,
                                        lineHeight: "50px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                    className="font-semibold text-slate-500"
                                >
                                    {user.nome}
                                </h3>
                                <h3
                                    style={{
                                        flex: 2,
                                        fontSize: "10px",
                                        textAlign: "left",
                                        margin: 0,
                                        lineHeight: "50px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                    className="font-semibold text-slate-500"
                                >
                                    {user.cargo === "M" ? "Motorista" : "Administrador"}
                                </h3>
                                <IconButton
                                    size="medium"
                                    onClick={() => handleEditUser(user, "mobile")}
                                    icon={EditIcon}
                                    className="mr-2"
                                    style={{
                                        flex: "0 0 auto",
                                        height: "30px"
                                    }}
                                />
                                <IconButton
                                    size="medium"
                                    onClick={() => handleDeleteRegister(user.id!)}
                                    icon={TrashIcon}
                                    intent="danger"
                                    style={{
                                        flex: "0 0 auto",
                                        height: "30px"
                                    }}
                                />
                            </Card>
                        ))}
                    </div>
                </Pane>

            </div>
        </React.Fragment>
    );
}