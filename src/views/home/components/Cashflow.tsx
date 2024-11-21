import React from 'react';
import { Button, Table, Pane, AddIcon, Dialog, PeopleIcon, EditIcon, TrashIcon, IconButton, Spinner, Badge, Card, Select, SelectMenu } from 'evergreen-ui';
import { useHookCashFlow } from './hooks/useHookCashFlow';
import { FormCashFlow } from './FormCashFlow';

export const Cashflow: React.FC = () => {
    const {
        showModal,
        movimentacao,
        listaMovimentacao,
        handleEditFlow,
        loading,
        tipo,
        handleAddFlow,
        formatDate,
        calcularTotais,
        setFilterType,
        filterType,
        monthMapping,
        selectedMonth,
        setSelectedMonth,
        closeModal,
        handleDeleteRegister
    } = useHookCashFlow();

    const { totalReceitas, totalDespesas, saldo } = calcularTotais();

    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-between w-full h-full p-4 bg-slate-200 content-pc">
                <Pane className="flex items-center justify-between gap-4 py-2 w-full mb-2">
                    <Card padding={16} elevation={1} width="30%" className='bg-red-700 text-white'>
                        <h4>Total de Despesas</h4>
                        <h3>{totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </Card>
                    <Card padding={16} elevation={1} width="30%" className='bg-green-700 text-white'>
                        <h4>Total de Receitas</h4>
                        <h3>{totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </Card>
                    <Card padding={16} elevation={1} width="30%" className='bg-blue-700 text-white'>
                        <h4>Saldo</h4>
                        <h3>{saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </Card>
                </Pane>

                <Pane background='#F9FAFC' className="flex items-center justify-between p-2 w-full rounded-sm" height="10%">
                    <h1 className="flex items-center justify-center font-semibold text-slate-600 h-full">
                        <PeopleIcon className="mr-2 ml-2" />
                        .: Cadastrar Movimentação :.
                    </h1>

                    <Pane display="flex" width="60%" height="100%" className='items-center justify-between'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: "12px", marginRight: "8px" }}>Período em Meses:</span>
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

                        <SelectMenu
                            title="Período em Meses"
                            options={[
                                ...Object.keys(monthMapping)
                                    .filter((key) => parseInt(key) !== (new Date()).getMonth() + 1)
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
                            width="15%"
                            verticalAlign='middle'
                            marginRight={8}
                        >
                            <option value="">Todos</option>
                            <option value="R">Receitas</option>
                            <option value="D">Despesas</option>
                        </Select>

                        <Button
                            intent='success'
                            appearance='primary'

                            onClick={() => handleAddFlow("desktop")}
                        >
                            Adicionar
                            <AddIcon className='ml-2' />
                        </Button>
                    </Pane>

                    <Dialog
                        isShown={showModal === "desktop"}
                        title={tipo === 'C' ? "Adicionar Movimentação" : "Atualizar Movimentação"}
                        hasFooter={false}
                        width={900}
                        onCloseComplete={closeModal}
                    >
                        <FormCashFlow MOVIMENTACAO={movimentacao} TIPO={tipo} />
                    </Dialog>
                </Pane>

                <Pane className="w-full" height="80%">
                    <Table className="w-full h-full flex flex-col">
                        <Table.Head
                            className="w-full flex items-center"
                            style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                        >
                            <Table.Cell style={{ flex: 2, textAlign: 'left' }}>Descriçao</Table.Cell>
                            <Table.Cell style={{ flex: 2, textAlign: 'left' }}>Tipo</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Data</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Valor R$</Table.Cell>
                            <Table.Cell style={{ flex: 1, textAlign: 'left' }}>Ações</Table.Cell>
                        </Table.Head>

                        <Table.Body className="w-full">
                            {listaMovimentacao.map((flow, index) => (
                                <Table.Row
                                    key={index}
                                    isSelectable
                                    className="flex items-center"
                                    style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                                >
                                    <Table.TextCell style={{ flex: 2 }}>{flow.descricao}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 2 }}>
                                        {flow.tipo === 'R' ? <Badge color="green">Receita</Badge> : <Badge color="red">Despesa</Badge>}
                                    </Table.TextCell>
                                    <Table.TextCell style={{ flex: 1 }}>{flow.data ? formatDate(flow.data) : ""}</Table.TextCell>
                                    <Table.TextCell style={{ flex: 0.9, marginRight: 5 }}>{flow.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Table.TextCell>
                                    <Table.Cell height="100%" style={{ flex: 1.2 }}>
                                        <IconButton size="small" onClick={() => handleEditFlow(flow, "desktop")} icon={EditIcon} marginRight={8} intent="none" appearance="minimal" />
                                        <IconButton size="small" onClick={() => handleDeleteRegister(flow.id!)} icon={TrashIcon} intent="danger" appearance="minimal" />
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
                        .: Cadastrar Movimentação :.
                    </h1>

                    <Button
                        intent='success'
                        appearance='primary'
                        className='mr-2'
                        onClick={() => handleAddFlow("mobile")}
                    >
                        <AddIcon />
                    </Button>

                    <Dialog
                        isShown={showModal === "mobile"}
                        title={tipo === 'C' ? "Adicionar Movimentação" : "Atualizar Movimentação"}
                        hasFooter={false}
                        width={400}
                        onCloseComplete={closeModal}
                    >
                        <FormCashFlow MOVIMENTACAO={movimentacao} TIPO={tipo} />
                    </Dialog>
                </Pane>

                <Pane background='#F9FAFC' className="flex items-center justify-between p-2 mt-2 rounded-md" height="20%" width="95%">
                    <Card padding={16} elevation={1} width="32%" className='bg-red-700 text-white'>
                        <h4 style={{ fontSize: "10px" }}>Total Despesas</h4>
                        <h3 style={{ fontSize: "12px" }}>{totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </Card>
                    <Card padding={16} elevation={1} width="32%" className='bg-green-700 text-white'>
                        <h4 style={{ fontSize: "10px" }}>Total Receitas</h4>
                        <h3 style={{ fontSize: "12px" }}>{totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </Card>
                    <Card padding={16} elevation={1} width="32%" className='bg-blue-700 text-white'>
                        <h4 style={{ fontSize: "10px" }}>Saldo Total</h4>
                        <h3 style={{ fontSize: "12px" }}>{saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </Card>
                </Pane>

                <Pane background='#F9FAFC' className="flex items-center justify-between p-2 mt-2 mb-2 rounded-md" height="10%" width="95%">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: "12px", marginRight: "8px" }}>Período:</span>
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

                    <SelectMenu
                        title="Período"
                        options={[...Object.keys(monthMapping)
                            .filter((key) => parseInt(key) !== (new Date()).getMonth() + 1)
                            .map(key => ({
                                label: monthMapping[key],
                                value: key,
                            })),
                        ]}
                        hasFilter={false}
                        selected={selectedMonth}
                        onSelect={(item) => setSelectedMonth(item.value.toString())}
                    >
                        <Button width="50%" marginRight={8} fontSize={10}>
                            {selectedMonth ? `Mês: ${monthMapping[selectedMonth]}` : 'Selecione o Período...'}
                        </Button>
                    </SelectMenu>

                    <Select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}

                        verticalAlign='middle'
                    >
                        <option value="">Todos</option>
                        <option value="R">Receitas</option>
                        <option value="D">Despesas</option>
                    </Select>
                </Pane>

                <Pane className="w-full flex-col flex items-center justify-start" height="88%">
                    <div
                        className="flex items-center justify-start bg-white px-4 rounded-md"
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
                        <h3 style={{ flex: 2, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Descrição</h3>
                        <h3 style={{ flex: 1.5, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Tipo</h3>
                        <h3 style={{ flex: 2.4, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Valor R$</h3>
                        <h3 style={{ flex: 1, fontSize: "12px", textAlign: "left", margin: 0, lineHeight: "40px" }} className="font-semibold text-slate-700">Ações</h3>
                    </div>

                    <div
                        className="w-full flex flex-col items-center overflow-y-auto"
                        style={{
                            height: "calc(88% - 40px)",
                            paddingTop: "8px"
                        }}
                    >
                        {listaMovimentacao.map((flow, index) => (
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
                                    {flow.descricao}
                                </h3>
                                <h3
                                    style={{
                                        flex: 1.5,
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
                                    {flow.tipo === 'R' ? <Badge color="green" fontSize={10}>Receita</Badge> : <Badge color="red" fontSize={10}>Despesa</Badge>}
                                </h3>
                                <h3
                                    style={{
                                        flex: 1.6,
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
                                    {flow.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </h3>
                                <Table.Cell height="100%" style={{ flex: 1.2 }}>
                                    <IconButton
                                        size="medium"
                                        onClick={() => handleEditFlow(flow, "mobile")}
                                        icon={EditIcon}
                                        marginRight={8}
                                        intent="none"
                                    />
                                    <IconButton
                                        size="medium"
                                        onClick={() => handleDeleteRegister(flow.id!)}
                                        icon={TrashIcon}
                                        intent="danger"
                                    />
                                </Table.Cell>
                            </Card>
                        ))}
                    </div>
                </Pane>
            </div>
        </React.Fragment>
    );
}