import React, { useState } from "react";
import Slider from "react-slick";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card, Text, Pane, HistoryIcon, DollarIcon, SelectMenu, Button, ArrowUpIcon, ArrowDownIcon, Select } from "evergreen-ui";
import { useHookDashboard } from "./hooks/useHookDashboard";
import { useHookCashFlow } from "./hooks/useHookCashFlow";
import { useHookRegister } from "./hooks/useHookRegister";


export const Dashboard: React.FC = () => {
    const {
        barData,
        lineData,
        pieData,
        sliderSettings,
        selected,
        setSelected
    } = useHookDashboard();

    const {
        calcularTotais,
        setFilterType,
        filterType,
        monthMapping,
        selectedMonth,
        setSelectedMonth
    } = useHookCashFlow();

    const {
        filteredList
    } = useHookRegister(selectedMonth);

    const { totalReceitas, totalDespesas, saldo } = calcularTotais();

    return (
        <React.Fragment>
            <Pane className="flex w-full h-full p-8 bg-gray-100 rounded-md content-pc">
                {/* Coluna dos Cards */}
                <Pane className="flex flex-col w-full gap-6">
                    <h1 className="font-semibold text-slate-800 h-4">
                        .: Filtrar Dados :.
                    </h1>
                    <Pane
                        display="flex"
                        width="100%"
                    >
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

                        <div className="w-36">
                            <Select
                                value={filterType}
                                onChange={e => setFilterType(e.target.value)}
                                width="100%"
                                verticalAlign='middle'
                                marginRight={8}
                            >
                                <option value="">Todos</option>
                                <option value="R">Receitas</option>
                                <option value="D">Despesas</option>
                            </Select>
                        </div>
                    </Pane>
                    <Pane
                        display="flex"
                        gap={12}
                        width="100%"
                        className="justify-between"
                    >
                        <Card
                            elevation={2}
                            background="tint1"
                            padding={20}
                            width="20%"
                            display="flex"
                            alignItems="start"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <h1 className="font-semibold text-slate-800">
                                Total de Registros
                            </h1>
                            <h3 className="flex items-center justify-center text-sm font-semibold text-slate-800 mt-2">
                                <HistoryIcon className="mr-2" />
                                {filteredList.length}
                            </h3>
                        </Card>
                        <Card
                            elevation={2}
                            background="tint1"
                            padding={20}
                            width="20%"
                            display="flex"
                            alignItems="start"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <h1 className="font-semibold text-green-600">
                                Total de Receitas
                            </h1>
                            <h3 className="flex items-center justify-center text-sm font-semibold text-green-600 mt-2">
                                <ArrowUpIcon className="mr-2" />
                                {totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h3>
                        </Card>
                        <Card
                            elevation={2}
                            background="tint1"
                            padding={20}
                            width="20%"
                            display="flex"
                            alignItems="start"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <h1 className="font-semibold text-red-600">
                                Total de Despesas
                            </h1>
                            <h3 className="flex items-center justify-center text-sm font-semibold text-red-600 mt-2">
                                <ArrowDownIcon className="mr-2" />
                                {totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h3>
                        </Card>
                        <Card
                            elevation={2}
                            background="tint1"
                            padding={20}
                            width="20%"
                            display="flex"
                            alignItems="start"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <h1 className="font-semibold text-blue-600">
                                Saldo
                            </h1>
                            <h3 className="flex items-center justify-center text-sm font-semibold text-blue-600 mt-2">
                                <DollarIcon className="mr-2" />
                                {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h3>
                        </Card>
                    </Pane>
                </Pane>

                {/*
            <Pane className="w-2/3 ml-6 h-full">
                <Pane className="w-full h-full overflow-hiddens">
                    <Slider {...sliderSettings} className="w-full h-full overflow-hidden">
                        <Card elevation={1} padding={20} height="100%" className="h-full">
                            <Text size={500} marginBottom={16}>
                                Gráfico de Barras
                            </Text>
                            <div style={{ height: "100%", width: "100%" }}>
                                <Bar data={barData} options={{ maintainAspectRatio: false }} style={{ height: "100%", width: "100%" }} />
                            </div>
                        </Card>
                        <Card elevation={1} padding={20} className="h-full">
                            <Text size={500} marginBottom={16}>
                                Gráfico de Linhas
                            </Text>
                            <div style={{ height: "100%", width: "100%" }}>
                                <Line data={lineData} options={{ maintainAspectRatio: false }} style={{ height: "100%", width: "100%" }} />
                            </div>
                        </Card>
                        <Card elevation={1} padding={20} className="h-full">
                            <Text size={500} marginBottom={16}>
                                Gráfico de Pizza
                            </Text>
                            <div style={{ height: "100%", width: "100%" }}>
                                <Pie data={pieData} options={{ maintainAspectRatio: false }} style={{ height: "100%", width: "100%" }} />
                            </div>
                        </Card>
                    </Slider>
                </Pane>
            </Pane>            
            */}
            </Pane>
            <Pane className="flex flex-col w-full h-full bg-gray-100 rounded-3xl content-mobile">
                <Pane className="flex flex-col w-full gap-6 p-6">
                    <h1 className="font-semibold text-slate-800 h-4">
                        .: Filtrar Dados :.
                    </h1>
                    <Pane
                        display="flex"
                        width="100%"
                        flexDirection="column"
                    >
                        <Pane
                            display="flex"
                            width="100%"
                            gap={8}
                            className="items-center justify-start h-11"
                        >
                            <span style={{ fontSize: "12px", marginBottom: "8px" }}>Período em Meses:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {selectedMonth && parseInt(selectedMonth) !== (new Date()).getMonth() + 1 && (
                                    <Button
                                        intent="danger"
                                        onClick={() => setSelectedMonth(((new Date()).getMonth() + 1).toString())}
                                        size="small"
                                        marginRight={8}
                                        marginBottom="8px"
                                    >
                                        Limpar
                                    </Button>
                                )}
                            </div>
                        </Pane>
                        <Pane
                            display="flex"
                            width="100%"
                        >
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
                                <Button width="35%" marginRight={8}>
                                    {selectedMonth ? `Mês: ${monthMapping[selectedMonth]}` : 'Selecione o Período...'}
                                </Button>
                            </SelectMenu>

                            <div className="w-36">
                                <Select
                                    value={filterType}
                                    onChange={e => setFilterType(e.target.value)}
                                    width="100%"
                                    verticalAlign='middle'
                                    marginRight={8}
                                >
                                    <option value="">Todos</option>
                                    <option value="R">Receitas</option>
                                    <option value="D">Despesas</option>
                                </Select>
                            </div>
                        </Pane>
                    </Pane>
                </Pane>
                <Pane
                    display="flex"
                    width="100%"
                    flexDirection="column"
                    className="p-6 justify-between border"
                >
                    <Card
                        elevation={2}
                        background="tint1"
                        padding={20}
                        width="100%"
                        height="18%"
                        display="flex"
                        alignItems="start"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <h1 className="font-semibold text-slate-800">
                            Total de Registros
                        </h1>
                        <h3 className="flex items-center justify-center text-sm font-semibold text-slate-800 mt-2">
                            <HistoryIcon className="mr-2" />
                            {filteredList.length}
                        </h3>
                    </Card>
                    <Card
                        elevation={2}
                        background="tint1"
                        padding={20}
                        width="100%"
                        height="18%"
                        display="flex"
                        alignItems="start"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <h1 className="font-semibold text-green-600">
                            Total de Receitas
                        </h1>
                        <h3 className="flex items-center justify-center text-sm font-semibold text-green-600 mt-2">
                            <ArrowUpIcon className="mr-2" />
                            {totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h3>
                    </Card>
                    <Card
                        elevation={2}
                        background="tint1"
                        padding={20}
                        width="100%"
                        height="18%"
                        display="flex"
                        alignItems="start"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <h1 className="font-semibold text-red-600">
                            Total de Despesas
                        </h1>
                        <h3 className="flex items-center justify-center text-sm font-semibold text-red-600 mt-2">
                            <ArrowDownIcon className="mr-2" />
                            {totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h3>
                    </Card>
                    <Card
                        elevation={2}
                        background="tint1"
                        padding={20}
                        width="100%"
                        height="18%"
                        display="flex"
                        alignItems="start"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <h1 className="font-semibold text-blue-600">
                            Saldo
                        </h1>
                        <h3 className="flex items-center justify-center text-sm font-semibold text-blue-600 mt-2">
                            <DollarIcon className="mr-2" />
                            {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h3>
                    </Card>
                </Pane>
            </Pane>
        </React.Fragment>
    );
};
