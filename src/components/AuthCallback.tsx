// src/components/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
  const { isLoading, user, userRole, isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [redirecting, setRedirecting] = useState(false);
  const [forceChecking, setForceChecking] = useState(false);

  useEffect(() => {
    console.log('🔄 AuthCallback montado, processando OAuth...');
    
    // Verificar se há erro na URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    const code = urlParams.get('code');
    
    console.log('📍 Parâmetros da URL:', { error, hasCode: !!code, errorDescription });
    
    if (error) {
      console.error('❌ Erro OAuth:', {
        error,
        errorDescription: decodeURIComponent(errorDescription || '')
      });
      
      setErrorMessage(decodeURIComponent(errorDescription || 'Erro desconhecido no login social'));
      
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      return;
    }
    
    if (code) {
      console.log('✅ Código OAuth recebido, aguardando processamento...');
      setSuccessMessage('Código de autorização recebido! Processando...');
    }
    
    // Limpar parâmetros da URL
    window.history.replaceState({}, document.title, '/');
  }, []);

  // ✅ VERIFICAÇÃO MANUAL FORÇADA
  useEffect(() => {
    if (!forceChecking && !redirecting) {
      console.log('🔍 Iniciando verificação manual após 2 segundos...');
      
      setTimeout(async () => {
        setForceChecking(true);
        console.log('🔧 Verificação manual: checando sessão do Supabase diretamente...');
        
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('❌ Erro ao verificar sessão:', error);
            setErrorMessage('Erro na autenticação. Redirecionando...');
            setTimeout(() => window.location.href = '/', 2000);
            return;
          }
          
          if (session?.user) {
            console.log('✅ SESSÃO ENCONTRADA!', {
              email: session.user.email,
              id: session.user.id
            });
            
            setSuccessMessage(`Autenticado como ${session.user.email}! Redirecionando...`);
            setRedirecting(true);
            
            // REDIRECIONAMENTO FORÇADO IMEDIATO
            setTimeout(() => {
              console.log('🚀 FORÇANDO redirecionamento para dashboard...');
              
              // Determinar role baseado no email
              const email = session.user.email?.toLowerCase() || '';
              const isAdmin = email.includes('admin') || email.includes('@africashands.com');
              
              // Usar window.location.href para forçar redirecionamento
              window.location.href = '/';
              
              // Também disparar evento como backup
              const redirectEvent = new CustomEvent('oauth-success', {
                detail: { 
                  userRole: isAdmin ? 'admin' : 'user', 
                  user: session.user 
                }
              });
              window.dispatchEvent(redirectEvent);
              
            }, 1000);
          } else {
            console.log('❌ Nenhuma sessão encontrada');
            setErrorMessage('Falha na autenticação. Redirecionando...');
            setTimeout(() => window.location.href = '/', 2000);
          }
        } catch (err) {
          console.error('❌ Erro na verificação manual:', err);
          setErrorMessage('Erro interno. Redirecionando...');
          setTimeout(() => window.location.href = '/', 2000);
        }
      }, 2000);
    }
  }, [forceChecking, redirecting]);

  // ✅ REDIRECIONAMENTO BASEADO NO CONTEXTO (se funcionar)
  useEffect(() => {
    if (isAuthenticated && user && userRole && !redirecting) {
      console.log('✅ Contexto detectou autenticação:', {
        email: user.email,
        role: userRole
      });
      
      setRedirecting(true);
      setSuccessMessage(`Bem-vindo, ${user.name}! Acessando dashboard...`);
      
      const redirectEvent = new CustomEvent('oauth-success', {
        detail: { userRole, user }
      });
      window.dispatchEvent(redirectEvent);
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  }, [isAuthenticated, user, userRole, redirecting]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        
        {/* Ícone de Status */}
        <div className="mb-6">
          {errorMessage ? (
            <div className="text-6xl mb-4">❌</div>
          ) : redirecting ? (
            <div className="text-6xl mb-4">🚀</div>
          ) : forceChecking ? (
            <div className="text-6xl mb-4">🔍</div>
          ) : (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          )}
        </div>
        
        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {errorMessage ? 'Erro no Login' : 
           redirecting ? 'Redirecionando...' : 
           forceChecking ? 'Verificando Autenticação...' :
           'Processando login...'}
        </h2>
        
        {/* Mensagem */}
        <div className="mb-6">
          {errorMessage ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{errorMessage}</p>
            </div>
          ) : successMessage ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">{successMessage}</p>
              {redirecting && (
                <div className="mt-3">
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">
              Aguarde enquanto processamos sua autenticação OAuth...
            </p>
          )}
        </div>
        
        {/* Indicadores de Progresso */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${!errorMessage ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>Callback OAuth recebido</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${forceChecking ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Verificando sessão</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${redirecting ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Redirecionando para dashboard</span>
          </div>
        </div>
        
        {/* Botão Manual */}
        {!redirecting && !errorMessage && (
          <div className="mt-6">
            <button
              onClick={() => {
                console.log('🔄 Redirecionamento manual ativado pelo usuário');
                window.location.href = '/';
              }}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              🏠 Ir para Página Inicial
            </button>
          </div>
        )}
        
        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-3 bg-gray-100 rounded text-xs text-left">
            <strong>Debug OAuth Callback:</strong>
            <br />
            <span>isAuthenticated: {isAuthenticated ? 'true' : 'false'}</span>
            <br />
            <span>isLoading: {isLoading ? 'true' : 'false'}</span>
            <br />
            <span>User: {user ? user.email : 'null'}</span>
            <br />
            <span>Role: {userRole || 'null'}</span>
            <br />
            <span>ForceChecking: {forceChecking ? 'true' : 'false'}</span>
            <br />
            <span>Redirecting: {redirecting ? 'true' : 'false'}</span>
            <br />
            <span>URL: {window.location.href}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;