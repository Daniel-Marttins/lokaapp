import React from 'react';
import { Button, Table, Pane, AddIcon, Dialog, EditIcon, TrashIcon, IconButton, Spinner, DriveTimeIcon, Card, Select, SelectMenu, Badge, TextInputField } from 'evergreen-ui';
import { useHookRegister } from './hooks/useHookRegister';
import { FormRegister } from './FormRegister';
import { useAuth } from '../../../contexts/Autenticacao';

export const Register: React.FC = () => {
    const { usuario } = useAuth();
    const {
        showModal,
        registro,
        listaRegistros,
        handleEditRegister,
        loading,
        tipo,
        handleAddRegister,
        formatDate,
        closeModal,
        handleDeleteRegister,
        setFilterType,
        filterType,
        monthMapping,
        selectedMonth,
        setSelectedMonth,
        filterPlate,
        setFilterPlate
    } = useHookRegister();

    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-between w-full h-full p-4 bg-slate-200 content-pc">
                <Pane background='#F9FAFC' className="flex items-center justify-between p-2 w-full rounded-sm mb-2" height="10%">
                    <h1 className="flex items-center justify-center font-semibold text-slate-600 h-full">
                        <DriveTimeIcon className="mr-2 ml-2" />
                        .: Cadastrar Registros :.
                    </h1>

                    <Pane display="flex" width="60%" height="100%" className='items-center justify-between ml-36'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: "12px", marginRight: "8px" }}>Filtros:</span>
                            {selectedMonth && parseInt(selectedMonth) !== (new Date()).getMonth() + 1 && (
                                <Button
                                    intent="danger"
                                    onClick={() => setSelectedMonth(((new Date()).getMonth() + 1).toString())}
                                    size="small"
                                    marginRight={8}
                                >
                                    Limpar
                                </Button>
                            )}
                        </div>

                        <TextInputField
                            placeholder="Digite a placa"
                            value={filterPlate}
                            onChange={(e: any) => setFilterPlate(e.target.value)}
                            marginRight={8}
                            marginTop={16}
                            width="30%"
                            inputHeight={28}
                            fontSize={12}
                        />

                        <SelectMenu
                            title="Período em Meses"
                            options={[
                                ...Object.keys(monthMapping)
                                    //.filter((key) => parseInt(key) !== (new Date()).getMonth() + 1)
                                    .map(key => ({
                                        label: monthMapping[key],
                                        value: key,
                                    })),
                            ]}
                            hasFilter={false}
                            selected={selectedMonth}
                            onSelect={(item) => setSelectedMonth(item.value.toString())}
                        >
                            <Button width="20%" marginRight={8}>
                                {selectedMonth ? `Mês: ${monthMapping[selectedMonth]}` : 'Selecione o Período...'}
                            </Button>
                        </SelectMenu>

                        <Select
                            value={filterType}
                            onChange={e => setFilterType(e.target.value)}
                            className='select-filter'
                            verticalAlign='middle'
                            marginRight={8}
                        >
                            <option value="">Todos</option>
                            <option value="E">Entradas</option>
                            <option value="S">Saidas</option>
                        </Select>

                        <Button
                            intent='success'
                            appearance='primary'
                            className='mr-2'
                            onClick={() => handleAddRegister("desktop")}>
                            Adicionar
                            <AddIcon className='ml-2' />
                        </Button>
                    </Pane>
                    <Dialog
                        isShown={showModal === "desktop"}
                        title={tipo === 'C' ? "Adicionar Registro" : "Atualizar Registro"}
                        hasFooter={false}
                        width={900}
                        onCloseComplete={closeModal}
                        containerProps={{ className: 'custom-dialog' }}
                    >
                        <FormRegister REGISTRO={registro} TIPO={tipo} />
                    </Dialog>
                </Pane>

                <Pane className="w-full" height="88%">
                    <Table className="w-full h-full flex flex-col">
                        <Table.Head
                            className="w-full flex items-center"
                            style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                        >
                            <Table.Cell style={{ flex: 2, textAlign: 'left' }}>Motorista</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Tipo</Table.Cell>
                            <Table.Cell style={{ flex: 2, textAlign: 'left' }}>Placa Veiculo</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>KM</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Data</Table.Cell>
                            {usuario?.cargo !== "M" && <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Ações</Table.Cell>}
                        </Table.Head>

                        <Table.Body className="w-full">
                            {listaRegistros.map((register, index) => (
                                <Table.Row
                                    key={index}
                                    isSelectable
                                    className="flex items-center"
                                    style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                                >
                                    <Table.TextCell style={{ flex: 2 }}>{register.motorista_id?.nome}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 1 }}>
                                        {register.tipo === 'E' ? <Badge color="green">Entrada</Badge> : <Badge color="red">Saida</Badge>}
                                    </Table.TextCell>
                                    <Table.TextCell style={{ flex: 2 }}>{register.veiculo_id?.veiculo_placa}</Table.TextCell>
                                    <Table.TextCell style={{ flex: usuario?.cargo !== "M" ? 0.9 : 1, marginRight: 5 }}>{register.km_registro}</Table.TextCell>
                                    <Table.TextCell style={{ flex: usuario?.cargo !== "M" ? 0.9 : 1.1, marginRight: usuario?.cargo !== "M" ? 5 : 0 }}>{register.data_registro ? formatDate(register.data_registro) : ""}</Table.TextCell>
                                    {usuario?.cargo !== "M" &&
                                        <Table.Cell height="100%" style={{ flex: 1.2 }}>
                                            <IconButton size="small" onClick={() => handleEditRegister(register, "desktop")} icon={EditIcon} marginRight={8} intent="none" appearance="minimal" />
                                            <IconButton size="small" onClick={() => handleDeleteRegister(register.id!)} icon={TrashIcon} intent="danger" appearance="minimal" />
                                        </Table.Cell>
                                    }
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
                        .: Cadastrar Registros :.
                    </h1>
                    <Button
                        intent='success'
                        appearance='primary'
                        className='mr-2'
                        onClick={() => handleAddRegister("mobile")}>
                        <AddIcon />
                    </Button>
                    <Dialog
                        isShown={showModal === "mobile"}
                        title={tipo === 'C' ? "Adicionar Registro" : "Atualizar Registro"}
                        hasFooter={false}
                        width={400}
                        onCloseComplete={closeModal}
                        containerProps={{ className: 'custom-dialog' }}
                    >
                        <FormRegister REGISTRO={registro} TIPO={tipo} />
                    </Dialog>
                </Pane>

                <Pane background='#F9FAFC' className="flex items-center justify-between p-2 mt-2 mb-2 rounded-md" height="10%" width="95%">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: "12px", marginRight: "8px" }}>Filtros:</span>
                        {selectedMonth && parseInt(selectedMonth) !== (new Date()).getMonth() + 1 && (
                            <Button
                                intent="danger"
                                onClick={() => setSelectedMonth(((new Date()).getMonth() + 1).toString())}
                                size="small"
                                marginRight={8}
                            >
                                Limpar
                            </Button>
                        )}
                    </div>

                    <TextInputField
                        placeholder="Digite a placa"
                        value={filterPlate}
                        onChange={(e: any) => setFilterPlate(e.target.value)}
                        marginRight={8}
                        marginTop={16}
                        width="30%"
                        inputHeight={28}
                        fontSize={12}
                    />

                    <SelectMenu
                        title="Período em Meses"
                        options={[
                            ...Object.keys(monthMapping)
                                //.filter((key) => parseInt(key) !== (new Date()).getMonth() + 1)
                                .map(key => ({
                                    label: monthMapping[key],
                                    value: key,
                                })),
                        ]}
                        hasFilter={false}
                        selected={selectedMonth}
                        onSelect={(item) => setSelectedMonth(item.value.toString())}
                    >
                        <Button width="30%" marginRight={8}>
                            {selectedMonth ? `Mês: ${monthMapping[selectedMonth]}` : 'Selecione o Período...'}
                        </Button>
                    </SelectMenu>

                    <Select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                        className='select-filter'
                        verticalAlign='middle'
                        marginRight={8}
                    >
                        <option value="">Todos</option>
                        <option value="E">Entradas</option>
                        <option value="S">Saidas</option>
                    </Select>
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
                        <h3 style={{ flex: 3, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Motorista</h3>
                        <h3 style={{ flex: 1, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Tipo</h3>
                        <h3 style={{ flex: 2, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Placa Veículo</h3>
                        {usuario?.cargo !== "M" && <h3 style={{ flex: 1, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Ações</h3>}
                    </div>

                    <div
                        className="w-full flex flex-col items-center overflow-y-auto"
                        style={{
                            height: "calc(88% - 40px)",
                            paddingTop: "8px"
                        }}
                    >
                        {listaRegistros.map((register, index) => (
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
                                        flex: 3.5,
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
                                    {register.motorista_id?.nome}
                                </h3>
                                <h3
                                    style={{
                                        flex: 1,
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
                                    {register.tipo}
                                </h3>
                                <h3
                                    style={{
                                        flex: usuario?.cargo !== "M" ? 1.5 : 2.1,
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
                                    {register.veiculo_id?.veiculo_placa}
                                </h3>
                                {usuario?.cargo !== "M" &&
                                    <div style={{ flex: "0 0 auto" }}>
                                        <IconButton
                                            size="medium"
                                            icon={EditIcon}
                                            onClick={() => handleEditRegister(register, "mobile")}
                                            className="mr-2"
                                        />
                                        <IconButton
                                            size="medium"
                                            onClick={() => handleDeleteRegister(register.id!)}
                                            icon={TrashIcon}
                                            intent="danger"
                                        />
                                    </div>
                                }
                            </Card>
                        ))}
                    </div>
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
        </React.Fragment>
    );
}