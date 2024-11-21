import { ChevronDownIcon, CogIcon, DashboardIcon, DollarIcon, DriveTimeIcon, Icon, Menu, Popover, Position, Tab, UserIcon } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/Autenticacao";

export const useHookHome = () => {
    const { usuario } = useAuth();
    const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState<string>("");
    const [selectedTab, setSelectedTab] = useState<string>(() => {
        switch (usuario?.cargo) {
            case 'A':
                return 'dashboard';
            case 'S':
                return 'dashboard';
            case 'M':
                return 'registers';
            default:
                return '';
        }
    });

    const tabs = [
        {
            tag: 'dashboard',
            name: 'Dashboard',
            icon: <Icon icon={DashboardIcon} size={16} />,
        },
        {
            tag: 'company',
            name: 'Empresa',
            icon: <Icon icon={UserIcon} size={16} />,
            submenus: [
                { tag: 'company-register-employee', name: 'Cadastro de Funcionários' },
                { tag: 'company-register-veichle', name: 'Cadastro de Veiculos' },
            ],
        },
        {
            tag: 'finance',
            name: 'Financeiro',
            icon: <Icon icon={DollarIcon} size={16} />,
            submenus: [
                { tag: 'cash-movements', name: 'Movimentação de Caixa' },
                /*{ tag: 'accounting-classes', name: 'Classes Contábeis' },
                { tag: 'suppliers', name: 'Fornecedores' },*/
            ],
        },
        {
            tag: 'registers',
            name: 'Registros',
            icon: <Icon icon={DriveTimeIcon} size={16} />,
        },
        /*{
            tag: 'settings',
            name: 'Configurações',
            icon: <Icon icon={CogIcon} size={16} />,
        },*/
    ];

    const filteredTabs = tabs.filter((tab) => {
        if (usuario?.cargo === 'A') {
            // Administrador: vê todas as tabs
            return true;
        }
        if (usuario?.cargo === 'S') {
            // Supervisor: não vê a tab de Financeiro
            return tab.tag !== 'finance';
        }
        if (usuario?.cargo === 'M') {
            // Motorista: só vê a tab de Registros
            return tab.tag === 'registers';
        }
        return false; // Outros cargos: sem acesso
    });


    const handleTabClick = (tab: any) => {
        if (tab.submenus) {
            // Abre ou fecha o submenu ao clicar na aba principal
            setSubmenuOpen(submenuOpen === tab.tag ? null : tab.tag);
        } else {
            // Seleciona diretamente a aba se não houver submenu
            setSelectedTab(tab.tag);
            setSubmenuOpen(null);
        }
    };

    const renderTab = (tab: any) => {
        return (
            <React.Fragment key={tab.tag}>
                <Tab
                    aria-controls={`panel-${tab.tag}`}
                    direction="vertical"
                    isSelected={selectedTab === tab.tag || submenuOpen === tab.tag}
                    onSelect={() => handleTabClick(tab)}
                    style={{
                        backgroundColor:
                            selectedTab === tab.tag || submenuOpen === tab.tag
                                ? '#1E40AF'
                                : 'transparent',
                        color:
                            selectedTab === tab.tag || submenuOpen === tab.tag
                                ? 'white'
                                : '#A0AEC0',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        margin: '4px 0',
                        transition: 'background-color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span className="flex items-center">
                        {tab.icon}
                        <span className="ml-2">{tab.name}</span>
                    </span>
                    {tab.submenus && (
                        <Icon
                            icon={ChevronDownIcon}
                            size={16}
                            style={{
                                transform: submenuOpen === tab.tag ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.2s ease',
                            }}
                        />
                    )}
                </Tab>
                {tab.submenus &&
                    submenuOpen === tab.tag &&
                    tab.submenus.map((submenu: any) => (
                        <Tab
                            key={submenu.tag}
                            aria-controls={`panel-${submenu.tag}`}
                            direction="vertical"
                            isSelected={selectedTab === submenu.tag}
                            onSelect={() => setSelectedTab(submenu.tag)}
                            style={{
                                backgroundColor: selectedTab === submenu.tag ? '#1E40AF' : 'transparent',
                                color: selectedTab === submenu.tag ? 'white' : '#A0AEC0',
                                borderRadius: '6px',
                                padding: '6px 8px',
                                marginTop: '22px',
                                margin: '4px 0',
                                marginLeft: '20px',
                                transition: 'background-color 0.2s ease',
                                width: "90%"
                            }}
                        >
                            {submenu.name}
                        </Tab>
                    ))}
            </React.Fragment>
        );
    };

    const renderMobileTab = (tab: any) => {
        return (
            <React.Fragment key={tab.tag}>
                {tab.submenus ? (
                    // Aba com submenu abre um Popover
                    <Popover
                        position={Position.TOP_LEFT}
                        content={
                            <Menu>
                                {tab.submenus.map((submenu: any) => (
                                    <Menu.Item
                                        key={submenu.tag}
                                        onClick={() => {
                                            setSelectedTab(submenu.tag);
                                            setSubmenuOpen(null);
                                        }}
                                        style={{
                                            backgroundColor: selectedTab === submenu.tag ? "#475569" : "transparent",
                                            color: selectedTab === submenu.tag ? "white" : "#475569",
                                        }}
                                    >
                                        <span style={{ color: selectedTab === submenu.tag ? "white" : "#475569" }}>{submenu.name}</span>
                                    </Menu.Item>
                                ))}
                            </Menu>
                        }
                        onClose={() => setSubmenuOpen(null)}
                        isShown={submenuOpen === tab.tag && isMobile}
                    >
                        <Tab
                            aria-controls={`panel-${tab.tag}`}
                            isSelected={selectedTab === tab.tag || submenuOpen === tab.tag}
                            onSelect={() => setSubmenuOpen(submenuOpen === tab.tag ? null : tab.tag)}
                            style={{
                                backgroundColor:
                                    selectedTab === tab.tag || submenuOpen === tab.tag ? "#475569" : "transparent",
                                color:
                                    selectedTab === tab.tag || submenuOpen === tab.tag ? "white" : "#475569",
                                borderRadius: "50%",
                                padding: "12px",
                                margin: "4px",
                                transition: "background-color 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "48px",
                                height: "48px",
                            }}
                        >
                            {tab.icon}
                        </Tab>
                    </Popover>
                ) : (
                    // Aba sem submenu
                    <Tab
                        aria-controls={`panel-${tab.tag}`}
                        isSelected={selectedTab === tab.tag}
                        onSelect={() => setSelectedTab(tab.tag)}
                        style={{
                            backgroundColor: selectedTab === tab.tag ? "#475569" : "transparent",
                            color: selectedTab === tab.tag ? "white" : "#475569",
                            borderRadius: "50%",
                            padding: "12px",
                            margin: "4px",
                            transition: "background-color 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "48px",
                            height: "48px",
                        }}
                    >
                        {tab.icon}
                    </Tab>
                )}
            </React.Fragment>
        );
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };

        // Chama a função no início
        handleResize();

        // Adiciona o ouvinte de evento
        window.addEventListener("resize", handleResize);

        // Limpeza do ouvinte de evento quando o componente for desmontado
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString());
        };

        const interval = setInterval(updateDateTime, 1000);

        updateDateTime();

        return () => {
            clearInterval(interval);
        };
    }, []);

    return {
        tabs: filteredTabs,
        renderTab,
        renderMobileTab,
        selectedTab,
        submenuOpen,
        handleTabClick,
        setSubmenuOpen,
        setSelectedTab,
        currentDateTime
    }

}