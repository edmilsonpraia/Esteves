import React, { useEffect, useState } from 'react';

// 🔧 CONTEXTOS E PROVIDERS
import { AuthProvider, useAuth } from './context/AuthContext';
import { TranslationProvider } from './context/TranslationContext';
import { OpportunitiesProvider } from './context/OpportunitiesContext'; // ✅ NOVA IMPORTAÇÃO

// 🔧 BIBLIOTECA SUPABASE
import { supabase } from './lib/supabase';

// 📄 PÁGINAS - Baseadas na sua estrutura real
import AdminDashboardAfricasHands from './pages/AdminDashboardAfricasHands';
import Analytics from './pages/Analytics';
import ClientsManagement from './pages/ClientsManagement';
import Contact from './pages/Contact';
import CreateProject from './pages/CreateProject';
import FinanceManagement from './pages/FinanceManagement';
import LoginAfricasHands from './pages/LoginAfricasHands';
import ProjectsManagement from './pages/ProjectsManagement';
import Services from './pages/Services';
import TeamManagement from './pages/TeamManagement';
import UserDashboard from './pages/UserDashboard';

// 🧩 COMPONENTES - Baseados na sua estrutura real
import Header from './components/Header';
import IconWrapper from './components/IconWrapper';
import Sidebar from './components/Sidebar';
import AuthCallback from './components/AuthCallback'; // ✅ NOVO COMPONENTE

  // 🔍 COMPONENTE DE DEBUG - Remover em produção
const DebugAuthInfo: React.FC<{
  currentMode: string;
  currentPage: string;
  setCurrentMode: (mode: 'login' | 'admin' | 'user' | 'callback') => void;
  setCurrentPage: (page: string) => void;
}> = ({ currentMode, currentPage, setCurrentMode, setCurrentPage }) => {
  const { user, userRole, isAuthenticated, isLoading } = useAuth();
  
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2 text-yellow-400">🔍 DEBUG AUTH INFO:</h4>
      <div className="space-y-1">
        <p><strong>isAuthenticated:</strong> {isAuthenticated ? '✅ true' : '❌ false'}</p>
        <p><strong>isLoading:</strong> {isLoading ? '⏳ true' : '✅ false'}</p>
        <p><strong>userRole:</strong> <span className="text-yellow-300">{userRole || '❌ null/undefined'}</span></p>
        <p><strong>user.id:</strong> {user?.id || '❌ null'}</p>
        <p><strong>user.email:</strong> {user?.email || '❌ null'}</p>
        <p><strong>user.name:</strong> {user?.name || '❌ null'}</p>
        <p><strong>currentMode:</strong> <span className="text-blue-300">{currentMode}</span></p>
        <p><strong>currentPage:</strong> <span className="text-green-300">{currentPage}</span></p>
        <p><strong>URL:</strong> <span className="text-purple-300">{window.location.pathname}</span></p>
      </div>
      
      <button 
        onClick={async () => {
          if (user?.email) {
            console.log('🔍 Verificando dados no Supabase...');
            try {
              const { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', user.email);
              
              if (error) {
                console.error('❌ Erro ao buscar perfil:', error);
              } else {
                console.log('👤 Perfil encontrado:', profiles);
                
                if (profiles && profiles.length > 0) {
                  console.log('✅ Role no banco:', profiles[0].role);
                  console.log('📋 Dados completos:', profiles[0]);
                } else {
                  console.log('❌ Nenhum perfil encontrado no banco!');
                }
              }
            } catch (error) {
              console.error('❌ Erro na consulta:', error);
            }
          }
        }}
        className="mt-2 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
      >
        Verificar Banco
      </button>
      
      {/* ✅ BOTÃO DE TESTE: Forçar redirecionamento */}
      {isAuthenticated && userRole && (
        <button 
          onClick={() => {
            console.log('🔄 Forçando redirecionamento manual...');
            if (userRole === 'admin') {
              setCurrentMode('admin');
            } else {
              setCurrentMode('user');
            }
            setCurrentPage('dashboard');
          }}
          className="mt-2 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs w-full"
        >
          🚀 Forçar Dashboard
        </button>
      )}
    </div>
  );
};

// ✅ NOVO COMPONENTE: Real-Time Status Indicator
const RealTimeStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Simular status de conexão real-time
    const checkConnection = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  useEffect(() => {
    // Subscription para notificações real-time
    const subscription = supabase
      .channel('real-time-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'opportunities'
        },
        (payload) => {
          console.log('🔔 Nova oportunidade detectada!', payload.new);
          setNotificationCount(prev => prev + 1);
          
          // Auto-reset após 5 segundos
          setTimeout(() => {
            setNotificationCount(0);
          }, 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
        isConnected 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}></div>
        <span>{isConnected ? 'Real-Time Ativo' : 'Desconectado'}</span>
        {notificationCount > 0 && (
          <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">
            {notificationCount}
          </span>
        )}
      </div>
    </div>
  );
};

// 🔧 COMPONENTE DE LAYOUT PRINCIPAL
const MainLayout: React.FC<{ 
  children: React.ReactNode; 
  userRole: string;
  currentPage: string;
  onPageChange: (page: string) => void;
}> = ({ children, userRole, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ✅ INDICADOR REAL-TIME */}
      <RealTimeStatus />
      
      {/* 🔧 SIDEBAR - Propriedades de navegação adicionadas */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNavigate={onPageChange}
        currentPage={currentPage}
      />
      
      <div className="flex-1 flex flex-col">
        {/* 🔧 HEADER - Propriedades obrigatórias adicionadas */}
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />
        
        {/* 🔧 BOTÃO MENU MOBILE - Separado do Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <IconWrapper name="FiMenu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </IconWrapper>
          </button>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// 🔧 COMPONENTE PRINCIPAL DA APLICAÇÃO
const AppContent: React.FC = () => {
  const { isAuthenticated, userRole, isLoading, user, logout } = useAuth();
  const [currentMode, setCurrentMode] = useState<'login' | 'admin' | 'user' | 'callback'>('login');
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  // ✅ NOVA LÓGICA: Detectar se está na rota de callback OAuth
  useEffect(() => {
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Verificar se é callback OAuth
    if (pathname === '/auth/callback' || urlParams.get('code') || urlParams.get('error')) {
      console.log('🔄 Detectado callback OAuth, processando...', {
        pathname,
        hasCode: !!urlParams.get('code'),
        hasError: !!urlParams.get('error')
      });
      setCurrentMode('callback');
      return;
    }
    
    // ✅ LÓGICA MELHORADA: Verificar autenticação mais robusta
    console.log('🔄 Verificando modo atual:', {
      isAuthenticated,
      userRole,
      isLoading,
      pathname,
      user: user?.email
    });

    // Se está carregando, não fazer nada ainda
    if (isLoading) {
      console.log('⏳ Ainda carregando, aguardando...');
      return;
    }

    // Se está autenticado e tem role, redirecionar para dashboard
    if (isAuthenticated && userRole && user) {
      console.log('✅ Usuário autenticado detectado:', {
        email: user.email,
        role: userRole,
        isAuthenticated
      });
      
      if (userRole === 'admin') {
        console.log('🎯 Redirecionando para dashboard admin');
        setCurrentMode('admin');
        setCurrentPage('dashboard');
      } else if (userRole === 'user') {
        console.log('🎯 Redirecionando para dashboard user');
        setCurrentMode('user');
        setCurrentPage('dashboard');
      }
    } 
    // Se não está autenticado e não está carregando, ir para login
    else if (!isAuthenticated && !isLoading) {
      console.log('❌ Usuário não autenticado, redirecionando para login');
      setCurrentMode('login');
    }
  }, [isAuthenticated, userRole, isLoading, user]);

  // ✅ NOVA LÓGICA: Redirecionar após sucesso do callback
  useEffect(() => {
    // Listener para evento de sucesso OAuth (mais responsivo)
    const handleOAuthSuccess = (event: any) => {
      const { userRole, user } = event.detail;
      console.log('🔔 Evento OAuth success recebido, redirecionando IMEDIATAMENTE para:', userRole, user?.email);
      
      // Redirecionamento IMEDIATO
      if (userRole === 'admin') {
        setCurrentMode('admin');
        setCurrentPage('dashboard');
      } else {
        setCurrentMode('user');
        setCurrentPage('dashboard');
      }
      
      // Limpar URL
      window.history.replaceState({}, document.title, '/');
    };
    
    window.addEventListener('oauth-success', handleOAuthSuccess);
    
    // ✅ MELHORAR: Verificação contínua para redirecionamento automático
    if (currentMode === 'callback') {
      console.log('📍 Estamos no modo callback, verificando condições...', {
        isAuthenticated,
        userRole,
        isLoading,
        user: user?.email
      });
      
      // Se já está autenticado, redirecionar imediatamente
      if (isAuthenticated && userRole && user && !isLoading) {
        console.log('✅ Usuário já autenticado no callback, redirecionando AGORA...');
        
        if (userRole === 'admin') {
          setCurrentMode('admin');
          setCurrentPage('dashboard');
        } else {
          setCurrentMode('user');
          setCurrentPage('dashboard');
        }
        
        // Limpar URL
        window.history.replaceState({}, document.title, '/');
      }
    }
    
    return () => {
      window.removeEventListener('oauth-success', handleOAuthSuccess);
    };
  }, [currentMode, isAuthenticated, userRole, isLoading, user]);

  // ✅ FORÇAR REDIRECIONAMENTO SE FICAR MUITO TEMPO NO CALLBACK
  useEffect(() => {
    if (currentMode === 'callback') {
      console.log('⏰ Modo callback ativo, definindo timeout de segurança...');
      
      // Timeout de segurança mais curto: 3 segundos
      const timeoutId = setTimeout(() => {
        console.log('⚠️ TIMEOUT: Forçando redirecionamento após 3 segundos no callback');
        
        // Tentar detectar se há uma sessão ativa
        supabase.auth.getSession().then(({ data: { session }, error }) => {
          if (session?.user) {
            console.log('✅ Sessão encontrada no timeout, redirecionando...');
            const email = session.user.email?.toLowerCase() || '';
            const isAdmin = email.includes('admin') || email.includes('@africashands.com');
            
            if (isAdmin) {
              setCurrentMode('admin');
            } else {
              setCurrentMode('user');
            }
            setCurrentPage('dashboard');
          } else {
            console.log('❌ Nenhuma sessão no timeout, voltando ao login...');
            setCurrentMode('login');
          }
        }).catch(() => {
          console.log('❌ Erro no timeout, voltando ao login...');
          setCurrentMode('login');
        });
      }, 3000); // Reduzido para 3 segundos

      return () => clearTimeout(timeoutId);
    }
  }, [currentMode]);

  // 🔧 FUNÇÃO DE LOGOUT
  const handleLogout = async () => {
    try {
      console.log('👋 Iniciando logout...');
      await logout();
      setCurrentMode('login');
      setCurrentPage('dashboard');
      
      // Limpar URL se necessário
      window.history.replaceState({}, document.title, '/');
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
    }
  };

  // 🔧 FUNÇÃO PARA MUDAR PÁGINA
  const handlePageChange = (page: string) => {
    console.log('📄 Mudando para página:', page);
    setCurrentPage(page);
  };

  // 🔧 LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Carregando Africa's Hands</h2>
          <p className="text-gray-600">Verificando autenticação...</p>
          <div className="mt-4 text-sm text-green-600">🔔 Iniciando sistema real-time...</div>
        </div>
      </div>
    );
  }

  // 🔧 RENDERIZAR PÁGINA BASEADA NO CURRENTPAGE
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return userRole === 'admin' ? <AdminDashboardAfricasHands /> : <UserDashboard />;
      case 'analytics':
        return <Analytics />;
      case 'clients':
        return <ClientsManagement />;
      case 'projects':
        return <ProjectsManagement />;
      case 'create-project':
        return <CreateProject />;
      case 'team':
        return <TeamManagement />;
      case 'finance':
        return <FinanceManagement />;
      case 'services':
        return <Services />;
      case 'contact':
        return <Contact />;
      default:
        return userRole === 'admin' ? <AdminDashboardAfricasHands /> : <UserDashboard />;
    }
  };

  // 🔧 RENDERIZAÇÃO POR MODO
  const renderCurrentMode = () => {
    switch (currentMode) {
      // ✅ NOVO CASO: Processar callback OAuth
      case 'callback':
        return <AuthCallback />;
      
      case 'admin':
        return (
          <MainLayout 
            userRole="admin" 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderPage()}
            </div>
          </MainLayout>
        );
      
      case 'user':
        return (
          <MainLayout 
            userRole="user" 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderPage()}
            </div>
          </MainLayout>
        );
      
      default:
        return <LoginAfricasHands />;
    }
  };

  return (
    <div className="App">
      {/* 🔍 COMPONENTE DE DEBUG - Apenas em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && (
        <DebugAuthInfo 
          currentMode={currentMode}
          currentPage={currentPage}
          setCurrentMode={setCurrentMode}
          setCurrentPage={setCurrentPage}
        />
      )}
      
      {/* 📱 CONTEÚDO PRINCIPAL */}
      {renderCurrentMode()}
      
      {/* 🔧 LOGOUT BUTTON PARA MOBILE - Apenas quando autenticado */}
      {isAuthenticated && currentMode !== 'callback' && (
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
            title="Sair"
          >
            <IconWrapper name="FiLogOut">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </IconWrapper>
          </button>
        </div>
      )}
    </div>
  );
};

// ✅ NOVO COMPONENTE: Notifications Container
const NotificationsContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Subscription para notificações em tempo real
    const subscription = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'opportunities'
        },
        (payload) => {
          const notification = {
            id: Date.now(),
            type: 'opportunity',
            title: 'Nova Oportunidade Disponível!',
            message: `${payload.new.title} em ${payload.new.country}`,
            timestamp: new Date(),
            opportunity: payload.new
          };

          setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Máximo 5 notificações

          // Auto-remover após 8 segundos
          setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== notification.id));
          }, 8000);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'applications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new.status !== payload.old.status) {
            const notification = {
              id: Date.now(),
              type: 'application',
              title: 'Status da Candidatura Atualizado!',
              message: `Sua candidatura foi ${
                payload.new.status === 'approved' ? 'aprovada' :
                payload.new.status === 'rejected' ? 'rejeitada' : 'analisada'
              }`,
              timestamp: new Date(),
              status: payload.new.status
            };

            setNotifications(prev => [notification, ...prev.slice(0, 4)]);

            setTimeout(() => {
              setNotifications(prev => prev.filter(n => n.id !== notification.id));
            }, 10000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 animate-slide-in-right ${
            notification.type === 'opportunity' 
              ? 'bg-blue-50 border-blue-500' 
              : notification.status === 'approved'
              ? 'bg-green-50 border-green-500'
              : notification.status === 'rejected'
              ? 'bg-red-50 border-red-500'
              : 'bg-yellow-50 border-yellow-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`font-semibold text-sm ${
                notification.type === 'opportunity' 
                  ? 'text-blue-900' 
                  : notification.status === 'approved'
                  ? 'text-green-900'
                  : notification.status === 'rejected'
                  ? 'text-red-900'
                  : 'text-yellow-900'
              }`}>
                {notification.title}
              </h4>
              <p className={`text-xs mt-1 ${
                notification.type === 'opportunity' 
                  ? 'text-blue-700' 
                  : notification.status === 'approved'
                  ? 'text-green-700'
                  : notification.status === 'rejected'
                  ? 'text-red-700'
                  : 'text-yellow-700'
              }`}>
                {notification.message}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                {notification.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
            <button
              onClick={() => setNotifications(prev => 
                prev.filter(n => n.id !== notification.id)
              )}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// 🔧 COMPONENTE PRINCIPAL COM PROVIDERS
const App: React.FC = () => {
  return (
    <AuthProvider>
      <TranslationProvider>
        {/* ✅ NOVO PROVIDER: OpportunitiesProvider */}
        <OpportunitiesProvider>
          <AppContent />
          {/* ✅ NOVO COMPONENTE: Notificações Real-Time */}
          <NotificationsContainer />
        </OpportunitiesProvider>
      </TranslationProvider>
    </AuthProvider>
  );
};

export default App;