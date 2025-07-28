// src/components/AuthCallback.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
  const { isLoading, user, userRole, isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [redirecting, setRedirecting] = useState(false);
  const [forceChecking, setForceChecking] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // 🔧 FUNÇÃO: Determinar role baseado no email (espelhando do AuthContext)
  const determineRoleFromEmail = useCallback((email: string): 'admin' | 'user' => {
    if (!email) return 'user';
    
    const cleanEmail = email.toLowerCase().trim();
    
    const adminEmails = [
      'admin@gmail.com',
      'admin@africashands.com',
      'edmilsondelfilme45@gmail.com',
      'valdimir@africashands.com',
      'administrator@africashands.com'
    ];
    
    const adminDomains = ['@africashands.com'];
    const adminPatterns = ['admin', 'administrator', 'supervisor', 'manager'];
    
    if (adminEmails.includes(cleanEmail) || 
        adminDomains.some(domain => cleanEmail.includes(domain)) ||
        adminPatterns.some(pattern => cleanEmail.includes(pattern))) {
      return 'admin';
    }
    
    return 'user';
  }, []);

  // 🚀 FUNÇÃO: Forçar autenticação OAuth mesmo com erro de banco
  const forceOAuthSuccess = useCallback(async (session: any): Promise<boolean> => {
    try {
      console.log('🔧 [AuthCallback] Forçando sucesso OAuth para:', session.user.email);
      
      // Criar dados de usuário em memória (nunca falha)
      const userData = {
        id: session.user.id,
        name: session.user.user_metadata?.full_name || 
              session.user.user_metadata?.name || 
              session.user.email?.split('@')[0] || 'Usuário OAuth',
        email: session.user.email,
        role: determineRoleFromEmail(session.user.email),
        country: 'Angola',
        sector: 'Geral',
        organization: 'Africa\'s Hands',
        verified: true,
        preferences: {
          language: 'pt' as const,
          notifications: true,
          theme: 'light' as const
        }
      };
      
      console.log('✅ [AuthCallback] Dados OAuth preparados:', {
        email: userData.email,
        role: userData.role,
        name: userData.name
      });
      
      // Disparar evento customizado para sincronizar com AuthContext
      const authEvent = new CustomEvent('oauth-force-success', {
        detail: { userData, session }
      });
      window.dispatchEvent(authEvent);
      
      return true;
    } catch (error) {
      console.error('❌ [AuthCallback] Erro ao forçar sucesso OAuth:', error);
      return false;
    }
  }, [determineRoleFromEmail]);

  // 🔧 DETECTAR PARÂMETROS DA URL E PROCESSAR ERROS
  useEffect(() => {
    console.log('🔄 [AuthCallback] AuthCallback montado, processando OAuth...');
    
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    const code = urlParams.get('code');
    const fragment = window.location.hash;
    
    console.log('📍 [AuthCallback] Parâmetros OAuth detectados:', { 
      error, 
      hasCode: !!code, 
      hasFragment: !!fragment,
      errorDescription: errorDescription ? decodeURIComponent(errorDescription) : null 
    });
    
    // ✅ TRATAR ERROS ESPECÍFICOS
    if (error) {
      console.error('❌ [AuthCallback] Erro OAuth detectado:', {
        error,
        errorDescription: decodeURIComponent(errorDescription || '')
      });
      
      let friendlyError = 'Erro desconhecido no login social';
      let shouldRetry = false;
      
      if (error === 'server_error') {
        if (errorDescription?.includes('Database error saving new user')) {
          friendlyError = 'Processando login social... Por favor, aguarde.';
          shouldRetry = true;
          console.log('🔧 [AuthCallback] Erro de banco detectado - tentando recovery automático...');
        } else if (errorDescription?.includes('Unable to exchange external code')) {
          friendlyError = 'Erro de configuração OAuth. Redirecionando...';
        }
      } else if (error === 'access_denied') {
        friendlyError = 'Login cancelado pelo usuário.';
      }
      
      if (shouldRetry) {
        setSuccessMessage(friendlyError);
        // Para erro de banco, tentar continuar em vez de falhar
        setTimeout(() => {
          setForceChecking(true);
        }, 1500);
        
        // Limpar URL mas não redirecionar ainda
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        return;
      } else {
        setErrorMessage(friendlyError);
        
        // Redirecionar após mostrar erro
        setTimeout(() => {
          console.log('↩️ [AuthCallback] Redirecionando para login após erro...');
          window.location.href = '/';
        }, 4000);
        
        // Limpar URL
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        return;
      }
    }
    
    // ✅ SUCESSO: Código OAuth recebido
    if (code || fragment.includes('access_token')) {
      console.log('✅ [AuthCallback] Código/Token OAuth recebido, aguardando processamento...');
      setSuccessMessage('Autenticação OAuth bem-sucedida! Processando login...');
    }
    
    // Limpar URL (mas manter estado)
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
    
  }, []);

  // 🚀 VERIFICAÇÃO MANUAL FORÇADA - COM RETRY E RECOVERY
  useEffect(() => {
    if (!forceChecking && !redirecting && !processingComplete) {
      console.log('⏰ [AuthCallback] Iniciando verificação em 2 segundos...');
      
      const checkTimer = setTimeout(async () => {
        if (processingComplete) return;
        
        setForceChecking(true);
        console.log('🔧 [AuthCallback] Verificação: checando sessão do Supabase...');
        
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('❌ [AuthCallback] Erro ao verificar sessão:', error);
            
            if (retryCount < 2) {
              console.log(`🔄 [AuthCallback] Tentativa ${retryCount + 1}/3 - reintentando...`);
              setRetryCount(prev => prev + 1);
              setForceChecking(false);
              return;
            }
            
            setErrorMessage('Erro na verificação de sessão. Redirecionando...');
            setTimeout(() => window.location.href = '/', 2000);
            return;
          }
          
          if (session?.user) {
            console.log('✅ [AuthCallback] SESSÃO OAUTH ENCONTRADA!', {
              email: session.user.email,
              id: session.user.id,
              provider: session.user.app_metadata?.provider
            });
            
            const userName = session.user.user_metadata?.full_name || 
                           session.user.user_metadata?.name || 
                           session.user.email?.split('@')[0] || 'Usuário';
            
            setSuccessMessage(`Olá, ${userName}! Finalizando login...`);
            setProcessingComplete(true);
            
            // ✅ FORÇAR SUCESSO OAUTH (à prova de balas)
            const success = await forceOAuthSuccess(session);
            
            if (success) {
              setRedirecting(true);
              setSuccessMessage(`Bem-vindo, ${userName}! Redirecionando para dashboard...`);
              
              const userRole = determineRoleFromEmail(session.user.email || '');
              
              console.log('🎯 [AuthCallback] Redirecionamento OAuth:', {
                email: session.user.email,
                role: userRole,
                provider: session.user.app_metadata?.provider
              });
              
              // Redirecionamento múltiplo para garantir
              setTimeout(() => {
                console.log('🚀 [AuthCallback] EXECUTANDO redirecionamento (método 1)...');
                window.location.href = '/';
              }, 1000);
              
              setTimeout(() => {
                console.log('🚀 [AuthCallback] EXECUTANDO redirecionamento (método 2 - fallback)...');
                window.location.replace('/');
              }, 2500);
              
            } else {
              setErrorMessage('Erro no processamento final. Redirecionando...');
              setTimeout(() => window.location.href = '/', 2000);
            }
            
          } else {
            console.log('❌ [AuthCallback] Nenhuma sessão OAuth encontrada');
            
            if (retryCount < 2) {
              console.log(`🔄 [AuthCallback] Tentativa ${retryCount + 1}/3 - aguardando mais...`);
              setRetryCount(prev => prev + 1);
              setForceChecking(false);
              setTimeout(() => setForceChecking(true), 2000);
              return;
            }
            
            setErrorMessage('Falha na autenticação OAuth. Redirecionando...');
            setTimeout(() => window.location.href = '/', 2000);
          }
        } catch (err) {
          console.error('❌ [AuthCallback] Exceção na verificação:', err);
          
          if (retryCount < 2) {
            console.log(`🔄 [AuthCallback] Tentativa ${retryCount + 1}/3 após exceção...`);
            setRetryCount(prev => prev + 1);
            setForceChecking(false);
            return;
          }
          
          setErrorMessage('Erro interno na verificação. Redirecionando...');
          setTimeout(() => window.location.href = '/', 2000);
        }
      }, 2000);

      return () => clearTimeout(checkTimer);
    }
  }, [forceChecking, redirecting, processingComplete, retryCount, forceOAuthSuccess, determineRoleFromEmail]);

  // 🎯 REDIRECIONAMENTO VIA CONTEXTO (método preferido)
  useEffect(() => {
    if (isAuthenticated && user && userRole && !redirecting && !processingComplete) {
      console.log('✅ [AuthCallback] AuthContext detectou autenticação OAuth:', {
        email: user.email,
        role: userRole,
        name: user.name
      });
      
      setProcessingComplete(true);
      setRedirecting(true);
      setSuccessMessage(`Perfeito, ${user.name}! Acessando seu dashboard...`);
      
      // Redirecionamento via contexto
      setTimeout(() => {
        console.log('🎯 [AuthCallback] Redirecionamento via AuthContext');
        window.location.href = '/';
      }, 1000);
    }
  }, [isAuthenticated, user, userRole, redirecting, processingComplete]);

  // 🔧 TIMEOUT DE SEGURANÇA ABSOLUTO
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!redirecting && !processingComplete) {
        console.warn('⏰ [AuthCallback] Timeout absoluto (20s) ativado - redirecionando...');
        setErrorMessage('Processamento demorou muito. Redirecionando...');
        setTimeout(() => window.location.href = '/', 1000);
      }
    }, 20000); // 20 segundos máximo

    return () => clearTimeout(safetyTimer);
  }, [redirecting, processingComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center border border-gray-200">
        
        {/* Logo da Africa's Hands */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">AH</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Africa's Hands</h1>
          <p className="text-sm text-gray-600">Login Social OAuth</p>
        </div>
        
        {/* Ícone de Status Dinâmico */}
        <div className="mb-8">
          {errorMessage ? (
            <div className="text-7xl mb-4 animate-bounce">❌</div>
          ) : redirecting ? (
            <div className="text-7xl mb-4 animate-pulse">🚀</div>
          ) : forceChecking ? (
            <div className="text-7xl mb-4">
              <div className="animate-spin inline-block">🔍</div>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent shadow-lg"></div>
            </div>
          )}
        </div>
        
        {/* Título Dinâmico */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {errorMessage ? 'Ops! Problema detectado' : 
           redirecting ? 'Sucesso! Redirecionando...' : 
           forceChecking ? 'Verificando autenticação...' :
           'Processando login social...'}
        </h2>
        
        {/* Mensagens de Status */}
        <div className="mb-8">
          {errorMessage ? (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <div className="flex items-start">
                <div className="text-red-500 mr-4 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-800 font-medium mb-2">{errorMessage}</p>
                  <p className="text-red-600 text-sm">Você será redirecionado automaticamente em alguns segundos...</p>
                </div>
              </div>
            </div>
          ) : successMessage ? (
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-start">
                <div className="text-green-500 mr-4 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-medium mb-2">{successMessage}</p>
                  {retryCount > 0 && (
                    <p className="text-green-600 text-sm">Tentativa {retryCount + 1}/3 de recuperação...</p>
                  )}
                </div>
              </div>
              {redirecting && (
                <div className="mt-4">
                  <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-green-600 h-3 rounded-full animate-pulse transition-all duration-2000" style={{ width: '100%' }}></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <div className="flex items-start">
                <div className="text-blue-500 mr-4 mt-1">
                  <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Processando sua autenticação OAuth...</p>
                  <p className="text-blue-600 text-sm mt-1">Conectando com Google/Facebook e criando sua sessão</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Indicadores de Progresso Melhorados */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center text-sm">
            <div className={`w-4 h-4 rounded-full mr-4 transition-all duration-500 ${!errorMessage ? 'bg-green-500 shadow-lg' : 'bg-red-500'}`}></div>
            <span className="text-gray-700 font-medium">Callback OAuth processado</span>
          </div>
          <div className="flex items-center text-sm">
            <div className={`w-4 h-4 rounded-full mr-4 transition-all duration-500 ${forceChecking || isAuthenticated ? 'bg-green-500 shadow-lg' : 'bg-gray-300'}`}></div>
            <span className="text-gray-700 font-medium">Verificando sessão do usuário</span>
            {retryCount > 0 && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Tentativa {retryCount + 1}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm">
            <div className={`w-4 h-4 rounded-full mr-4 transition-all duration-500 ${redirecting ? 'bg-green-500 shadow-lg' : 'bg-gray-300'}`}></div>
            <span className="text-gray-700 font-medium">Redirecionando para dashboard</span>
          </div>
        </div>
        
        {/* Botões de Ação */}
        {!redirecting && (
          <div className="space-y-3">
            {!errorMessage && !processingComplete && (
              <button
                onClick={() => {
                  console.log('🔄 [AuthCallback] Verificação manual forçada pelo usuário');
                  setForceChecking(true);
                  setRetryCount(0);
                }}
                disabled={forceChecking}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium shadow-lg"
              >
                {forceChecking ? '🔄 Verificando...' : '🔍 Verificar Novamente'}
              </button>
            )}
            
            <button
              onClick={() => {
                console.log('🏠 [AuthCallback] Redirecionamento manual para home');
                window.location.href = '/';
              }}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm font-medium shadow-lg"
            >
              🏠 Voltar ao Início
            </button>
          </div>
        )}
        
        {/* Debug Info (só em desenvolvimento) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8">
            <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700 font-medium">
              🔧 Debug OAuth Callback
            </summary>
            <div className="mt-3 p-4 bg-gray-100 rounded-lg text-xs text-left space-y-2 border">
              <div><strong>Context Auth:</strong> <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>{isAuthenticated ? '✅ Autenticado' : '❌ Não autenticado'}</span></div>
              <div><strong>Loading:</strong> {isLoading ? 'Sim' : 'Não'}</div>
              <div><strong>User:</strong> {user ? `${user.email} (${user.role})` : 'null'}</div>
              <div><strong>Role:</strong> {userRole || 'null'}</div>
              <div><strong>Force Check:</strong> {forceChecking ? 'Ativo' : 'Inativo'}</div>
              <div><strong>Redirecting:</strong> {redirecting ? 'Sim' : 'Não'}</div>
              <div><strong>Processing:</strong> {processingComplete ? 'Completo' : 'Em andamento'}</div>
              <div><strong>Retry Count:</strong> {retryCount}/2</div>
              <div><strong>URL:</strong> <span className="break-all">{window.location.href}</span></div>
            </div>
          </details>
        )}
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            🌍 Conectando Angola, Namíbia e África do Sul<br/>
            através de cooperação regional e inovação tecnológica
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;