import React, { useState, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation, LanguageToggle } from '../context/TranslationContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = React.memo(({ onToggleSidebar, isSidebarOpen }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const { userRole, logout, user } = useAuth(); // ✅ Adicionado 'user'
  const { t } = useTranslation();

  // 🔧 FUNÇÃO DE LOGOUT CORRIGIDA (memorizada)
  const handleLogout = useCallback(async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('👋 Header: Iniciando logout...');
      }

      // Fechar dropdowns
      setUserDropdownOpen(false);
      setNotificationsOpen(false);

      // Chamar logout do AuthContext
      await logout();

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Header: Logout realizado com sucesso');
      }

      // NÃO fazer redirecionamento manual - deixar o App.tsx gerenciar
      // window.location.href = '/login'; // ❌ REMOVIDO

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Header: Erro no logout:', error);
      }
    }
  }, [logout]);

  // Notificações simuladas - agora traduzidas (memorizadas)
  const notifications = useMemo(() => [
    {
      id: 1,
      title: t('notifications.newProject.title'),
      message: t('notifications.newProject.message'),
      time: t('notifications.time.fiveMinAgo'),
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: t('notifications.deadline.title'),
      message: t('notifications.deadline.message'),
      time: t('notifications.time.oneHourAgo'),
      read: false,
      type: 'warning'
    }
  ], [t]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label={t('header.toggleSidebar')}
          >
            {isSidebarOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center">
            <div className={`relative transition-all duration-200 ${searchFocused ? 'w-80' : 'w-64'}`}>
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        {/* Center Section - Page Title */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {userRole === 'admin' ? t('header.adminPanel') : t('header.userPanel')}
            </h1>
            <p className="text-sm text-gray-500">{t('header.subtitle')}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          
          {/* Language Toggle Button - Modificado para ser mais visível */}
          <div className="relative group">
            <LanguageToggle />
            <div className="absolute inset-0 -z-10 bg-gray-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
          </div>
          
          {/* Mobile Search */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            title={t('header.search')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title={t('header.notifications')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{t('header.notifications')}</h3>
                    {unreadCount > 0 && (
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        {t('notifications.markAllAsRead')}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-red-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">
                          {notification.type === 'success' ? '✅' : '⚠️'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-red-600 hover:text-red-700 font-medium py-1">
                    {t('notifications.viewAll')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {userRole === 'admin' ? 'AD' : 'US'}
              </div>
              
              {/* User Info - Hidden on small screens */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || (userRole === 'admin' ? t('user.administrator') : t('user.user'))}
                </p>
                <p className="text-xs text-gray-500">{user?.email || t('header.companyName')}</p>
              </div>

              <svg 
                className={`text-gray-400 transition-transform w-4 h-4 ${userDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {userRole === 'admin' ? 'AD' : 'US'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || (userRole === 'admin' ? t('user.administrator') : t('user.user'))}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email || t('user.email')}</p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button
                    onClick={() => {
                      console.log('📄 Navegando para perfil...');
                      setUserDropdownOpen(false);
                      // Implementar navegação interna aqui se necessário
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t('user.profile')}
                  </button>

                  <button
                    onClick={() => {
                      console.log('⚙️ Navegando para configurações...');
                      setUserDropdownOpen(false);
                      // Implementar navegação interna aqui se necessário
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('user.settings')}
                  </button>

                  <div className="border-t border-gray-200 my-2"></div>

                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500 mb-2">{t('user.contact')}:</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{t('user.phoneAngola')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{t('user.phoneNamibia')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-2"></div>

                  {/* 🔧 BOTÃO DE LOGOUT CORRIGIDO */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {t('user.logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t('form.search')}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white"
          />
        </div>
      </div>
    </header>
  );
});

export default Header;