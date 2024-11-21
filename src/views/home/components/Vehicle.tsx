import React from 'react';
import { Button, Table, Pane, AddIcon, Dialog, EditIcon, TrashIcon, IconButton, Spinner, DriveTimeIcon, Card } from 'evergreen-ui';
import { useHookVehicle } from './hooks/useHookVehicle';
import { FormVehicle } from './FormVehicle';

export const Vehicle: React.FC = () => {
    const {
        showModal,
        veiculo,
        listaVeiculos,
        handleEditVehicle,
        loading,
        tipo,
        handleAddVehicle,
        closeModal,
        handleDeleteRegister
    } = useHookVehicle();

    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-between w-full h-full p-4 bg-slate-200 content-pc">
                <Pane background='#F9FAFC' className="flex items-center justify-between p-2 w-full  rounded-sm" height="10%">
                    <h1 className="flex items-center justify-center font-semibold text-slate-600 h-full">
                        <DriveTimeIcon className="mr-2 ml-2" />
                        .: Cadastrar Veiculos :.
                    </h1>
                    <Button
                        intent='success'
                        appearance='primary'
                        className='mr-2'
                        onClick={() => handleAddVehicle("desktop")}>
                        Adicionar
                        <AddIcon className='ml-2' />
                    </Button>
                    <Dialog
                        isShown={showModal === "desktop"}
                        title={tipo === 'C' ? "Adicionar Veiculo" : "Atualizar Veiculo"}
                        hasFooter={false}
                        width={900}
                        onCloseComplete={closeModal}
                    >
                        <FormVehicle VEICULO={veiculo} TIPO={tipo} />
                    </Dialog>
                </Pane>

                <Pane className="w-full" height="88%">
                    <Table className="w-full h-full flex flex-col">
                        <Table.Head
                            className="w-full flex items-center"
                            style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                        >
                            <Table.Cell style={{ flex: 2, textAlign: 'left' }}>Marca</Table.Cell>
                            <Table.Cell style={{ flex: 2, textAlign: 'left' }}>Modelo</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Placa</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Limite</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Limite</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Ações</Table.Cell>
                        </Table.Head>

                        <Table.Body className="w-full">
                            {listaVeiculos.map((vehicle, index) => (
                                <Table.Row
                                    key={index}
                                    isSelectable
                                    className="flex items-center"
                                    style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                                >
                                    <Table.TextCell style={{ flex: 2 }}>{vehicle.veiculo_marca}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 2 }}>{vehicle.veiculo_modelo}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 1 }}>{vehicle.veiculo_placa}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 0.9, marginRight: 5 }}>{vehicle.veiculo_km_limite}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 0.9, marginRight: 5 }}>{vehicle.veiculo_km_rodados}</Table.TextCell>
                                    <Table.Cell height="100%" style={{ flex: 1.2 }}>
                                        <IconButton size="small" onClick={() => handleEditVehicle(vehicle, "desktop")} icon={EditIcon} marginRight={8} intent="none" appearance="minimal" />
                                        <IconButton size="small" onClick={() => handleDeleteRegister(vehicle.id!)} icon={TrashIcon} intent="danger" appearance="minimal" />
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
                        <DriveTimeIcon className="mr-2 ml-2" />
                        .: Cadastrar Veiculos :.
                    </h1>
                    <Button
                        intent='success'
                        appearance='primary'
                        className='mr-2'
                        onClick={() => handleAddVehicle("desktop")}>
                        <AddIcon />
                    </Button>
                    <Dialog
                        isShown={showModal === "mobile"}
                        title={tipo === 'C' ? "Adicionar Veiculo" : "Atualizar Veiculo"}
                        hasFooter={false}
                        width={900}
                        onCloseComplete={closeModal}
                    >
                        <FormVehicle VEICULO={veiculo} TIPO={tipo} />
                    </Dialog>
                </Pane>
                <Pane className="w-full flex-col flex items-center justify-start" height="88%">
                    <div
                        className="flex items-center justify-start bg-white px-4"
                        style={{
                            width: "95%",
                            height: "40px",
                            borderBottom: "1px solid #e5e7eb",
                            position: "sticky",
                            top: 0,
                            zIndex: 10
                        }}
                    >
                        <h3 style={{ flex: 2, fontSize: "12px", textAlign: "left", margin: 0 }} className="font-semibold text-slate-700">Placa</h3>
                        <h3 style={{ flex: 2, fontSize: "12px", textAlign: "left", margin: 0 }} className="font-semibold text-slate-700">KM Rodados</h3>
                        <h3 style={{ flex: 1, fontSize: "12px", textAlign: "left", margin: 0 }} className="font-semibold text-slate-700">Ações</h3>
                    </div>

                    {/* Corpo rolável */}
                    <div
                        className="w-full flex flex-col items-center overflow-y-auto"
                        style={{
                            height: "calc(88% - 50px)",
                            paddingTop: "8px"
                        }}
                    >
                        {listaVeiculos.map((vehicle, index) => (
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
                                    {vehicle.veiculo_placa}
                                </h3>
                                <h3
                                    style={{
                                        flex: 2,
                                        fontSize: "10px",
                                        textAlign: "left",
                                        margin: 0,
                                        lineHeight: "20px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                    className="font-semibold text-slate-500"
                                >
                                    {vehicle.veiculo_km_rodados}
                                </h3>
                                <IconButton
                                    size="medium"
                                    onClick={() => handleEditVehicle(vehicle, "mobile")}
                                    icon={EditIcon}
                                    className="mr-2"
                                    style={{
                                        flex: "0 0 auto",
                                        height: "30px"
                                    }}
                                />
                                <IconButton
                                    size="medium"
                                    onClick={() => handleDeleteRegister(vehicle.id!)}
                                    icon={TrashIcon}
                                    intent="danger"
                                    className=""
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