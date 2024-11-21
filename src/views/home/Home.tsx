import React from 'react';
import { Menu, Tablist, Card, Text, EditIcon, Popover, UserIcon, Position, ChangesIcon, LogOutIcon, Pane, Icon, DriveTimeIcon } from 'evergreen-ui';
import { useHookHome } from './hooks/useHookHome';
import { Dashboard } from './components/Dashboard';
import { Employee } from './components/Employee';
import { Vehicle } from './components/Vehicle';
import { Cashflow } from './components/Cashflow';
import { Register } from './components/Register';
import { useAuth } from '../../contexts/Autenticacao';

export const Home: React.FC = () => {
    const { logout, usuario } = useAuth();
    const {
        tabs,
        renderTab,
        selectedTab,
        renderMobileTab,
        currentDateTime
    } = useHookHome();

    return (
        <React.Fragment>
            <div className="flex flex-col w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-2xl content-pc">
                <Pane className="w-full h-14 top-0 left-0 right-0 z-10 bg-slate-600 shadow-lg flex justify-between items-center px-6">
                    <div className="flex items-center">
                        <DriveTimeIcon className="ml-2 text-white" />
                        <h2 className="ml-4 text-xl font-semibold text-gray-200">Lokamais</h2>
                    </div>

                    <Popover
                        position={Position.BOTTOM_RIGHT}
                        content={
                            <Menu>
                                <Menu.Group title="Usuário Conectado">
                                    <Menu.Item disabled icon={UserIcon}>{usuario?.nome}</Menu.Item>
                                </Menu.Group>
                                <Menu.Group title="Minha Conta">
                                    <Menu.Item icon={EditIcon}>Editar Perfil</Menu.Item>
                                    <Menu.Item icon={ChangesIcon}>Alterar Senha</Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                <Menu.Group title="Ações">
                                    <Menu.Item icon={LogOutIcon} intent="danger" onClick={() => logout()}>
                                        Sair
                                    </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        }
                    >
                        <Pane color="white" marginRight={16}>
                            <UserIcon size={25} />
                        </Pane>
                    </Popover>
                </Pane>

                <Pane className="flex flex-grow w-full p-4 h-80">
                    <Pane width="20%" className="bg-gray-800 p-4 rounded-lg border tab-list">
                        <Tablist>
                            {tabs.map((tab) => renderTab(tab))}
                        </Tablist>
                    </Pane>

                    {/* Conteúdo das Tabs */}
                    <Pane className="flex-1 border tab-content">
                        {selectedTab === 'dashboard' && (
                            <Dashboard />
                        )}
                        {selectedTab === 'company-register-employee' && (
                            <Employee />
                        )}
                        {selectedTab === 'company-register-veichle' && (
                            <Vehicle />
                        )}
                        {selectedTab === 'cash-movements' && (
                            <Cashflow />
                        )}
                        {selectedTab === 'registers' && (
                            <Register />
                        )}
                        {selectedTab === 'suppliers' && (
                            <Card padding={20}>
                                <Text>Cadastro de Fornecedores</Text>
                            </Card>
                        )}
                    </Pane>
                </Pane>
            </div>

            <div className='flex relative flex-col w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-2xl content-mobile'>
                <Pane height="30%" className="w-full bg-slate-600 shadow-lg flex justify-center items-center px-6">
                    <Popover
                        position={Position.TOP_RIGHT}
                        content={
                            <Menu>
                                <Menu.Group title="Usuário Conectado">
                                    <Menu.Item disabled icon={UserIcon}>{usuario?.nome}</Menu.Item>
                                </Menu.Group>
                                <Menu.Group title="Minha Conta">
                                    <Menu.Item icon={EditIcon}>Editar Perfil</Menu.Item>
                                    <Menu.Item icon={ChangesIcon}>Alterar Senha</Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                <Menu.Group title="Ações">
                                    <Menu.Item icon={LogOutIcon} intent="danger" onClick={() => logout()}>
                                        Sair
                                    </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        }
                    >
                        <Pane color="white" className='absolute top-6 right-8'>
                            <UserIcon size={25} />
                        </Pane>
                    </Popover>
                    <Pane className="flex flex-col items-start justify-center text-xl font-semibold text-gray-200 absolute top-6 left-6">
                        Olá,
                        <span style={{ fontSize: "12px" }}>{usuario?.nome}</span>
                        <div className="text-xs text-gray-400">
                            {currentDateTime}
                        </div>
                    </Pane>
                    {/*
                        <div className="text-xs text-gray-400 mt-9">
                            <span>© 2024 OutBrick. Todos os direitos reservados.</span>
                        </div>
                    */}
                </Pane>
                <Pane height="80%" className="absolute bottom-0 rounded-3xl w-full z-10 bg-slate-800 shadow-lg flex justify-between items-center">
                    {selectedTab === 'dashboard' && (
                        <Dashboard />
                    )}
                    {selectedTab === 'company-register-employee' && (
                        <Employee />
                    )}
                    {selectedTab === 'company-register-veichle' && (
                        <Vehicle />
                    )}
                    {selectedTab === 'cash-movements' && (
                        <Cashflow />
                    )}
                    {selectedTab === 'registers' && (
                        <Register />
                    )}
                    {selectedTab === 'suppliers' && (
                        <Card padding={20}>
                            <Text>Cadastro de Fornecedores</Text>
                        </Card>
                    )}
                </Pane>
                <Pane height="8%" className="absolute bottom-0 w-full z-10 bg-slate-300 shadow-lg flex justify-between items-center px-6 content-mobile">
                    {tabs.map((tab) => renderMobileTab(tab))}
                </Pane>
            </div>
        </React.Fragment>
    );
};
