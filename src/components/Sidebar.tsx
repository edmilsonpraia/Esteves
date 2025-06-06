import React, { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPhone,
  FiPackage,
  FiGrid,
  FiX,
  FiBarChart,
  FiFolder,
  FiCalendar,
  FiFileText,
  FiDollarSign,
  FiTrendingUp,
  FiUserCheck,
  FiMail,
  FiHelpCircle,
  FiChevronDown,
  FiChevronRight,
  FiBriefcase,
  FiTarget,
  FiClock,
  FiMapPin
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Componente wrapper para ícones para resolver problemas de tipagem
const Icon = ({ IconComponent, ...props }: { IconComponent: any; [key: string]: any }) => {
  return <IconComponent {...props} />;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { userRole } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['projetos']);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  // Menu items para administrador
  const adminMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Icon IconComponent={FiHome} size={20} />,
      path: '/admin',
      badge: null
    },
    {
      id: 'projetos',
      label: 'Projetos',
      icon: <Icon IconComponent={FiBriefcase} size={20} />,
      badge: '12',
      submenu: [
        { label: 'Todos os Projetos', path: '/admin/projects', icon: <Icon IconComponent={FiFolder} size={16} /> },
        { label: 'Criar Projeto', path: '/admin/projects/create', icon: <Icon IconComponent={FiTarget} size={16} /> },
        { label: 'Em Andamento', path: '/admin/projects/active', icon: <Icon IconComponent={FiClock} size={16} />, badge: '8' },
        { label: 'Concluídos', path: '/admin/projects/completed', icon: <Icon IconComponent={FiUserCheck} size={16} /> },
        { label: 'Relatórios', path: '/admin/projects/reports', icon: <Icon IconComponent={FiFileText} size={16} /> }
      ]
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: <Icon IconComponent={FiUsers} size={20} />,
      badge: '45',
      submenu: [
        { label: 'Lista de Clientes', path: '/admin/clients', icon: <Icon IconComponent={FiUsers} size={16} /> },
        { label: 'Adicionar Cliente', path: '/admin/clients/create', icon: <Icon IconComponent={FiUserCheck} size={16} /> },
        { label: 'Histórico', path: '/admin/clients/history', icon: <Icon IconComponent={FiFileText} size={16} /> }
      ]
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      icon: <Icon IconComponent={FiDollarSign} size={20} />,
      submenu: [
        { label: 'Orçamentos', path: '/admin/finance/budgets', icon: <Icon IconComponent={FiFileText} size={16} /> },
        { label: 'Faturas', path: '/admin/finance/invoices', icon: <Icon IconComponent={FiDollarSign} size={16} /> },
        { label: 'Pagamentos', path: '/admin/finance/payments', icon: <Icon IconComponent={FiTrendingUp} size={16} /> },
        { label: 'Relatórios', path: '/admin/finance/reports', icon: <Icon IconComponent={FiBarChart} size={16} /> }
      ]
    },
    {
      id: 'equipe',
      label: 'Gestão de Equipe',
      icon: <Icon IconComponent={FiUserCheck} size={20} />,
      submenu: [
        { label: 'Membros da Equipe', path: '/admin/team', icon: <Icon IconComponent={FiUsers} size={16} /> },
        { label: 'Atribuições', path: '/admin/team/assignments', icon: <Icon IconComponent={FiTarget} size={16} /> },
        { label: 'Performance', path: '/admin/team/performance', icon: <Icon IconComponent={FiTrendingUp} size={16} /> }
      ]
    },
    {
      id: 'servicos',
      label: 'Serviços',
      icon: <Icon IconComponent={FiPackage} size={20} />,
      path: '/services'
    },
    {
      id: 'calendario',
      label: 'Calendário',
      icon: <Icon IconComponent={FiCalendar} size={20} />,
      path: '/admin/calendar',
      badge: '3'
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: <Icon IconComponent={FiBarChart} size={20} />,
      submenu: [
        { label: 'Dashboard Executivo', path: '/admin/reports/executive', icon: <Icon IconComponent={FiTrendingUp} size={16} /> },
        { label: 'Projetos', path: '/admin/reports/projects', icon: <Icon IconComponent={FiBriefcase} size={16} /> },
        { label: 'Financeiro', path: '/admin/reports/financial', icon: <Icon IconComponent={FiDollarSign} size={16} /> },
        { label: 'Equipe', path: '/admin/reports/team', icon: <Icon IconComponent={FiUsers} size={16} /> }
      ]
    },
    {
      id: 'contato',
      label: 'Contato',
      icon: <Icon IconComponent={FiPhone} size={20} />,
      path: '/contact'
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: <Icon IconComponent={FiSettings} size={20} />,
      submenu: [
        { label: 'Geral', path: '/admin/settings/general', icon: <Icon IconComponent={FiSettings} size={16} /> },
        { label: 'Usuários', path: '/admin/settings/users', icon: <Icon IconComponent={FiUsers} size={16} /> },
        { label: 'Sistema', path: '/admin/settings/system', icon: <Icon IconComponent={FiGrid} size={16} /> }
      ]
    }
  ];

  // Menu items para usuário comum
  const userMenuItems = [
    {
      id: 'dashboard',
      label: 'Meu Painel',
      icon: <Icon IconComponent={FiGrid} size={20} />,
      path: '/user'
    },
    {
      id: 'meus-projetos',
      label: 'Meus Projetos',
      icon: <Icon IconComponent={FiBriefcase} size={20} />,
      path: '/user/projects',
      badge: '3'
    },
    {
      id: 'servicos',
      label: 'Serviços',
      icon: <Icon IconComponent={FiPackage} size={20} />,
      path: '/services'
    },
    {
      id: 'contato',
      label: 'Contato',
      icon: <Icon IconComponent={FiPhone} size={20} />,
      path: '/contact'
    },
    {
      id: 'suporte',
      label: 'Suporte',
      icon: <Icon IconComponent={FiHelpCircle} size={20} />,
      path: '/user/support'
    }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  const NavLink = ({ item, isSubmenu = false }: { item: any, isSubmenu?: boolean }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.id);

    return (
      <div>
        <button
          onClick={() => {
            if (hasSubmenu) {
              toggleSubmenu(item.id);
            } else if (item.path) {
              window.location.href = item.path;
              onClose();
            }
          }}
          className={`
            w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 rounded-lg mx-2 mb-1
            ${isSubmenu 
              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm pl-6' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-red-50 hover:border-red-100'
            }
            group
          `}
        >
          <div className="flex items-center gap-3">
            <span className={`transition-colors ${!isSubmenu ? 'group-hover:text-red-600' : ''}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </div>
          
          {hasSubmenu && (
            <span className="transition-transform duration-200">
              {isExpanded ? <Icon IconComponent={FiChevronDown} size={16} /> : <Icon IconComponent={FiChevronRight} size={16} />}
            </span>
          )}
        </button>

        {/* Submenu */}
        {hasSubmenu && (
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-1">
              {item.submenu.map((subItem: any, index: number) => (
                <NavLink key={index} item={subItem} isSubmenu={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:shadow-none
        `}
      >
        <div className="h-full flex flex-col">
          
          {/* Header da sidebar */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Escritório</h2>
                  <p className="text-sm text-red-600 font-medium">Esteves</p>
                </div>
              </div>
              
              {/* Botão de fechar (apenas em mobile) */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Icon IconComponent={FiX} size={20} />
              </button>
            </div>
          </div>

          {/* Navegação principal */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>

            {/* Seção de informações da empresa */}
            <div className="mt-8 mx-4 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Icon IconComponent={FiMapPin} className="text-white" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Atendemos em:</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <p className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Angola: Cunene, Lubango
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Namíbia: Oshakati
                  </p>
                </div>
              </div>
            </div>

            {/* Links de contato rápido */}
            <div className="mt-4 mx-4 space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
                Contato Rápido
              </h4>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Icon IconComponent={FiPhone} size={16} />
                <span>+244 924 166 401</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Icon IconComponent={FiMail} size={16} />
                <span>Enviar E-mail</span>
              </button>
            </div>
          </nav>

          {/* Footer da sidebar */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {userRole === 'admin' ? 'AD' : 'US'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userRole === 'admin' ? 'Admin' : 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Versão 2.1.0 • © 2024 Escritório Esteves
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;