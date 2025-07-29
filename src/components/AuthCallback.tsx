// src/components/AuthCallback.tsx - VERSÃO DEFINITIVA
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processando login OAuth...');
  const [hasProcessed, setHasProcessed] = useState(false);

  // 🚀 FUNÇÃO PRINCIPAL: Processar callback OAuth
  useEffect(() => {
    if (hasProcessed) return;

    const processOAuthCallback = async () => {
      console.log('🔄 [AuthCallback] Iniciando processamento OAuth...');
      setHasProcessed(true);

      // Limpar URL imediatamente
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      // Limpar URL
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      // Verificar se há erro na URL
      if (error) {
        console.error('❌ [AuthCallback] Erro OAuth detectado:', error, errorDescription);
        
        // Se for erro de banco, ignorar e tentar recuperar
        if (error === 'server_error' && errorDescription?.includes('Database error saving new user')) {
          console.log('🔧 [AuthCallback] Erro de banco OAuth - iniciando recovery...');
          setMessage('Erro de banco detectado, aguardando sessão OAuth...');
          
          // Aguardar 5 segundos (mais tempo) e tentar recuperar sessão
          setTimeout(async () => {
            await attemptSessionRecovery();
          }, 5000);
          return;
        }
        
        // Outros erros
        setStatus('error');
        setMessage('Erro na autenticação OAuth');
        setTimeout(() => redirectToHome(), 4000);
        return;
      }

      // Se não há erro, aguardar processamento normal
      console.log('✅ [AuthCallback] Callback OAuth bem-sucedido, aguardando AuthContext...');
      setMessage('Login OAuth bem-sucedido! Aguardando processamento...');
      
      // Aguardar 4 segundos (mais tempo) para o AuthContext processar
      setTimeout(async () => {
        await checkAuthenticationStatus();
      }, 4000);
    };

    processOAuthCallback();
  }, [hasProcessed]);

  // 🔧 FUNÇÃO: Tentar recuperar sessão após erro de banco - COM RETRY
  const attemptSessionRecovery = async (retryCount = 0) => {
    const maxRetries = 5;
    const retryDelay = 2000; // 2 segundos entre tentativas
    
    console.log(`🔍 [AuthCallback] Tentativa ${retryCount + 1}/${maxRetries} de recuperar sessão OAuth...`);
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ [AuthCallback] Erro ao verificar sessão:', error);
        throw error;
      }

      if (session?.user) {
        console.log('✅ [AuthCallback] SESSÃO OAUTH RECUPERADA!', {
          email: session.user.email,
          provider: session.user.app_metadata?.provider,
          tentativa: retryCount + 1
        });

        const userName = session.user.user_metadata?.full_name || 
                        session.user.user_metadata?.name || 
                        session.user.email?.split('@')[0] || 'Usuário';

        setStatus('success');
        setMessage(`Sessão recuperada! Olá, ${userName}!`);
        
        // Aguardar AuthContext processar
        setTimeout(() => {
          checkAuthenticationStatus();
        }, 2000);
        
      } else {
        console.warn(`⚠️ [AuthCallback] Sessão não encontrada na tentativa ${retryCount + 1}/${maxRetries}`);
        
        // Se ainda temos tentativas, tentar novamente
        if (retryCount < maxRetries - 1) {
          setMessage(`Aguardando sessão OAuth... (tentativa ${retryCount + 2}/${maxRetries})`);
          setTimeout(() => {
            attemptSessionRecovery(retryCount + 1);
          }, retryDelay);
        } else {
          // Última tentativa: forçar redirecionamento mesmo sem sessão
          console.warn('⚠️ [AuthCallback] Máximo de tentativas atingido, forçando redirecionamento...');
          setMessage('Processamento OAuth completo, redirecionando...');
          setTimeout(() => {
            redirectToHome();
          }, 2000);
        }
      }
    } catch (error) {
      console.error(`❌ [AuthCallback] Erro na tentativa ${retryCount + 1}:`, error);
      
      // Se ainda temos tentativas, tentar novamente
      if (retryCount < maxRetries - 1) {
        setMessage(`Erro na verificação, tentando novamente... (${retryCount + 2}/${maxRetries})`);
        setTimeout(() => {
          attemptSessionRecovery(retryCount + 1);
        }, retryDelay);
      } else {
        // Falha final
        setStatus('error');
        setMessage('Falha na recuperação da sessão OAuth após múltiplas tentativas');
        setTimeout(() => redirectToHome(), 3000);
      }
    }
  };

  // 🔍 FUNÇÃO: Verificar status de autenticação
  const checkAuthenticationStatus = async () => {
    console.log('🔍 [AuthCallback] Verificando status de autenticação...', {
      isAuthenticated,
      hasUser: !!user,
      isLoading
    });

    if (isAuthenticated && user) {
      console.log('✅ [AuthCallback] Usuário autenticado via AuthContext!', {
        email: user.email,
        role: user.role
      });
      
      setStatus('success');
      setMessage(`Perfeito! Bem-vindo, ${user.name}!`);
      
      setTimeout(() => {
        console.log('🚀 [AuthCallback] Redirecionando para dashboard...');
        redirectToHome();
      }, 2000);
      
    } else if (!isLoading) {
      console.warn('⚠️ [AuthCallback] AuthContext não detectou autenticação, forçando verificação...');
      
      // Tentar forçar uma nova verificação de sessão
      setTimeout(async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            console.log('🔧 [AuthCallback] Sessão existe mas AuthContext não detectou, redirecionando...');
            setMessage('Sessão detectada, redirecionando...');
            setTimeout(() => redirectToHome(), 1000);
          } else {
            console.error('❌ [AuthCallback] Nenhuma sessão encontrada');
            setStatus('error');
            setMessage('Sessão não encontrada');
            setTimeout(() => redirectToHome(), 3000);
          }
        } catch (error) {
          console.error('❌ [AuthCallback] Erro na verificação forçada:', error);
          setStatus('error');
          setMessage('Erro na verificação de sessão');
          setTimeout(() => redirectToHome(), 3000);
        }
      }, 1000);
      
    } else {
      console.log('⏳ [AuthCallback] AuthContext ainda carregando, aguardando...');
      setMessage('Finalizando autenticação...');
      
      // Aguardar mais um pouco
      setTimeout(() => {
        checkAuthenticationStatus();
      }, 2000);
    }
  };

  // 🏠 FUNÇÃO: Redirecionar para home
  const redirectToHome = () => {
    console.log('🏠 [AuthCallback] Redirecionando para home...');
    window.location.href = '/';
  };

  // 🎯 EFEITO: Monitorar mudanças no AuthContext
  useEffect(() => {
    if (hasProcessed && isAuthenticated && user && status === 'processing') {
      console.log('🎉 [AuthCallback] AuthContext sincronizado!', {
        email: user.email,
        role: user.role
      });
      
      setStatus('success');
      setMessage(`Autenticação completa! Olá, ${user.name}!`);
      
      setTimeout(() => {
        redirectToHome();
      }, 1500);
    }
  }, [isAuthenticated, user, hasProcessed, status]);

  // 🔧 TIMEOUT DE SEGURANÇA ABSOLUTO
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (status === 'processing') {
        console.warn('⏰ [AuthCallback] Timeout de segurança (15s) - redirecionando...');
        setStatus('error');
        setMessage('Tempo limite excedido');
        setTimeout(() => redirectToHome(), 2000);
      }
    }, 15000);

    return () => clearTimeout(safetyTimer);
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center border border-gray-200">
        
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">AH</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Africa's Hands</h1>
          <p className="text-sm text-gray-600">Processamento OAuth</p>
        </div>
        
        {/* Status Icon */}
        <div className="mb-8">
          {status === 'processing' && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent shadow-lg"></div>
            </div>
          )}
          {status === 'success' && (
            <div className="text-7xl mb-4 animate-bounce">✅</div>
          )}
          {status === 'error' && (
            <div className="text-7xl mb-4 animate-pulse">❌</div>
          )}
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {status === 'processing' && 'Processando OAuth...'}
          {status === 'success' && 'Login Realizado!'}
          {status === 'error' && 'Erro na Autenticação'}
        </h2>
        
        {/* Message */}
        <div className="mb-8">
          <div className={`border-l-4 rounded-lg p-6 ${
            status === 'error' ? 'bg-red-50 border-red-500' :
            status === 'success' ? 'bg-green-50 border-green-500' :
            'bg-blue-50 border-blue-500'
          }`}>
            <p className={`font-medium ${
              status === 'error' ? 'text-red-800' :
              status === 'success' ? 'text-green-800' :
              'text-blue-800'
            }`}>
              {message}
            </p>
            
            {status === 'processing' && (
              <div className="mt-4">
                <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse transition-all duration-1000"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Button */}
        <button
          onClick={redirectToHome}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg"
        >
          {status === 'success' ? '🚀 Ir para Dashboard' : '🏠 Voltar ao Início'}
        </button>
        
        {/* Debug Info (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6">
            <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
              🔧 Debug Info
            </summary>
            <div className="mt-2 p-3 bg-gray-100 rounded text-xs text-left space-y-1">
              <div><strong>Status:</strong> {status}</div>
              <div><strong>HasProcessed:</strong> {hasProcessed ? 'Sim' : 'Não'}</div>
              <div><strong>IsAuthenticated:</strong> {isAuthenticated ? 'Sim' : 'Não'}</div>
              <div><strong>IsLoading:</strong> {isLoading ? 'Sim' : 'Não'}</div>
              <div><strong>HasUser:</strong> {user ? 'Sim' : 'Não'}</div>
              <div><strong>UserEmail:</strong> {user?.email || 'null'}</div>
              <div><strong>UserRole:</strong> {user?.role || 'null'}</div>
            </div>
          </details>
        )}
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            🌍 Sistema de Autenticação OAuth<br/>
            Africa's Hands Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;