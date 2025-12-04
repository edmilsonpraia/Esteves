import React, { useState, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  // ✅ PROPRIEDADES ADICIONADAS PARA NAVEGAÇÃO
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({
  isOpen,
  onClose,
  onNavigate,
  currentPage = 'dashboard'
}) => {
  const { userRole } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['main']);

  const toggleSubmenu = useCallback((menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  }, []);

  // 🔧 FUNÇÃO DE NAVEGAÇÃO CORRIGIDA (memorizada)
  const handleNavigation = useCallback((pageId: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🧭 Navegando para:', pageId);
    }

    if (onNavigate) {
      onNavigate(pageId);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ onNavigate não foi fornecido ao Sidebar');
    }

    onClose(); // Fechar sidebar após navegação
  }, [onNavigate, onClose]);

  // Menu items para administrador - ATUALIZADO COM IDs CORRETOS (memorizado)
  const adminMenuItems = useMemo(() => [
    {
      section: 'main',
      title: 'Principal',
      icon: '⚡',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: '📊',
          pageId: 'dashboard',
          badge: null
        },
        {
          id: 'projects',
          label: 'Projetos',
          icon: '🚀',
          badge: '12',
          submenu: [
            {
              label: 'Gestão de Projetos',
              pageId: 'projects',
              icon: '📋',
              badge: '12'
            },
            {
              label: 'Criar Projeto',
              pageId: 'create-project',
              icon: '➕'
            }
          ]
        },
        {
          id: 'clients',
          label: 'Clientes & Parceiros',
          icon: '🤝',
          badge: '45',
          pageId: 'clients'
        },
        {
          id: 'team',
          label: 'Equipe Regional',
          icon: '👥',
          badge: '28',
          pageId: 'team'
        },
        {
          id: 'finance',
          label: 'Financeiro',
          icon: '💰',
          badge: '8',
          pageId: 'finance'
        }
      ]
    },
    {
      section: 'analytics',
      title: 'Analytics & Insights',
      icon: '📊',
      items: [
        {
          id: 'analytics',
          label: 'Analytics & KPIs',
          icon: '📊',
          pageId: 'analytics'
        }
      ]
    },
    {
      section: 'services',
      title: 'Serviços & Contato',
      icon: '🌍',
      items: [
        {
          id: 'services',
          label: 'Serviços Regionais',
          icon: '🛒',
          pageId: 'services'
        },
        {
          id: 'contact',
          label: 'Contato',
          icon: '📞',
          pageId: 'contact'
        }
      ]
    }
  ], []);

  // Menu items para usuário comum - ATUALIZADO COM IDs CORRETOS (memorizado)
  const userMenuItems = useMemo(() => [
    {
      section: 'main',
      title: 'Principal',
      icon: '⚡',
      items: [
        {
          id: 'dashboard',
          label: 'Meu Painel',
          icon: '📊',
          pageId: 'dashboard'
        }
      ]
    },
    {
      section: 'services',
      title: 'Serviços & Contato',
      icon: '🌍',
      items: [
        {
          id: 'services',
          label: 'Serviços Regionais',
          icon: '🛒',
          pageId: 'services'
        },
        {
          id: 'contact',
          label: 'Contato',
          icon: '📞',
          pageId: 'contact'
        }
      ]
    }
  ], []);

  const menuSections = useMemo(() =>
    userRole === 'admin' ? adminMenuItems : userMenuItems,
    [userRole, adminMenuItems, userMenuItems]
  );

  const NavItem = ({ item, isSubmenu = false }: { item: any, isSubmenu?: boolean }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const isActive = currentPage === item.pageId; // ✅ Verificar se é a página ativa

    return (
      <div>
        <button
          onClick={() => {
            if (hasSubmenu) {
              toggleSubmenu(item.id);
            } else if (item.pageId) {
              handleNavigation(item.pageId); // ✅ Usar navegação interna
            }
          }}
          className={`
            w-full flex items-center justify-between px-3 py-2.5 text-left transition-all duration-200 rounded-lg mx-2 mb-1
            ${isSubmenu 
              ? `text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm pl-8 ${isActive ? 'bg-red-100 text-red-700' : ''}` 
              : `text-gray-700 hover:text-gray-900 hover:bg-red-50 hover:border-red-100 ${isActive ? 'bg-red-100 text-red-700 border border-red-200' : ''}`
            }
            group
          `}
        >
          <div className="flex items-center gap-3">
            <span className={`text-lg transition-colors ${
              !isSubmenu 
                ? (isActive ? 'text-red-600' : 'group-hover:text-red-600') 
                : (isActive ? 'text-red-600' : '')
            }`}>
              {item.icon}
            </span>
            <span className={`font-medium ${isActive ? 'text-red-700' : ''}`}>
              {item.label}
            </span>
            {item.badge && (
              <span className={`text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center ${
                isActive ? 'bg-red-600' : 'bg-red-500'
              }`}>
                {item.badge}
              </span>
            )}
          </div>
          
          {hasSubmenu && (
            <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </button>

        {/* Submenu */}
        {hasSubmenu && (
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-1">
              {item.submenu.map((subItem: any, index: number) => (
                <NavItem key={index} item={subItem} isSubmenu={true} />
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
          <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">🌍</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Africa's Hands</h2>
                  <p className="text-sm text-red-200">🇦🇴 🇳🇦 🇿🇦 Regional</p>
                </div>
              </div>
              
              {/* Botão de fechar (apenas em mobile) */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg text-red-200 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Badge do Papel do Usuário */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              userRole === 'admin' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              <span>{userRole === 'admin' ? '👨‍💼' : '👤'}</span>
              {userRole === 'admin' ? 'Administrador' : 'Usuário'}
              {userRole === 'admin' && <span className="bg-red-500 text-white text-xs px-1 rounded">PRO</span>}
            </div>
          </div>

          {/* Navegação principal */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-6">
              {menuSections.map((section) => {
                const isSectionExpanded = expandedMenus.includes(section.section);
                
                return (
                  <div key={section.section}>
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSubmenu(section.section)}
                      className="w-full flex items-center justify-between px-4 py-2 mx-2 text-left transition-all duration-200 rounded-lg hover:bg-gray-100 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{section.icon}</span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {section.title}
                        </span>
                      </div>
                      <span className={`transition-transform duration-200 ${isSectionExpanded ? 'rotate-90' : ''}`}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>

                    {/* Section Items */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isSectionExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="space-y-1 mt-2">
                        {section.items.map((item) => (
                          <NavItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Seção de informações da empresa */}
            <div className="mt-8 mx-4 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Presença Regional</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>🇦🇴 Angola: Cunene, Lubango</p>
                  <p>🇳🇦 Namíbia: Oshakati, Windhoek</p>
                  <p>🇿🇦 África do Sul: Cape Town, Joburg</p>
                </div>
              </div>
            </div>

            {/* Status do Sistema */}
            <div className="mt-4 mx-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Sistema Operacional</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-1 rounded text-xs">
                  <div className="font-bold text-blue-600">12</div>
                  <div className="text-gray-500">Projetos</div>
                </div>
                <div className="bg-white p-1 rounded text-xs">
                  <div className="font-bold text-green-600">45</div>
                  <div className="text-gray-500">Clientes</div>
                </div>
                <div className="bg-white p-1 rounded text-xs">
                  <div className="font-bold text-purple-600">28</div>
                  <div className="text-gray-500">Equipe</div>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer da sidebar */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            {/* Quick Actions para Admin */}
            {userRole === 'admin' && (
              <div className="mb-4">
                <button 
                  onClick={() => handleNavigation('create-project')} // ✅ Usar navegação interna
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Novo Projeto
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {userRole === 'admin' ? 'VE' : 'US'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userRole === 'admin' ? 'Valdimir Esteves' : 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userRole === 'admin' ? '🇦🇴 Cunene, Angola' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                v2.1.0 • © 2024 Africa's Hands
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Desenvolvido por Valdimir Esteves
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;