import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  country: string;
  sector?: string;
  organization?: string;
  avatar?: string;
  verified: boolean;
  preferences: {
    language: 'pt' | 'en';
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

interface AuthContextType {
  user: User | null;
  userRole: 'admin' | 'user' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: {
    name: string;
    country: string;
    role?: 'admin' | 'user';
    sector?: string;
    organization?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkUserRole: () => Promise<'admin' | 'user' | null>;
  loginWithFacebook: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 🔧 CONFIGURAÇÃO CORRETA DE URLs
const getRedirectURL = () => {
  // Em produção, sempre usar Supabase
  if (process.env.NODE_ENV === 'production') {
    return 'https://lvegldhtgalibbkmhzfz.supabase.co/auth/v1/callback';
  }
  
  // Em desenvolvimento, usar localhost com callback personalizado
  return `${window.location.origin}/auth/callback`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔧 TIMEOUT PARA EVITAR LOADING INFINITO
  const LOADING_TIMEOUT = 3000; // 3 segundos máximo
  const OPERATION_TIMEOUT = 2000; // 2 segundos para operações

  // 🎯 FUNÇÃO MELHORADA: Determinar role baseado no email
  const determineRoleFromEmail = (email: string): 'admin' | 'user' => {
    if (!email) return 'user';
    
    const cleanEmail = email.toLowerCase().trim();
    
    // ✅ EMAILS DE ADMINISTRADORES ESPECÍFICOS
    const adminEmails = [
      'admin@gmail.com',
      'admin@africashands.com',
      'edmilsondelfilme45@gmail.com',
      'valdimir@africashands.com',
      'administrator@africashands.com'
    ];
    
    // ✅ DOMÍNIOS DE ADMINISTRADORES
    const adminDomains = [
      '@africashands.com'
    ];
    
    // ✅ PADRÕES DE EMAIL ADMIN
    const adminPatterns = [
      'admin',
      'administrator',
      'supervisor',
      'manager'
    ];
    
    // Verificar emails específicos
    if (adminEmails.includes(cleanEmail)) {
      console.log('🔑 Admin detectado por email específico:', cleanEmail);
      return 'admin';
    }
    
    // Verificar domínios admin
    if (adminDomains.some(domain => cleanEmail.includes(domain))) {
      console.log('🔑 Admin detectado por domínio:', cleanEmail);
      return 'admin';
    }
    
    // Verificar padrões admin
    if (adminPatterns.some(pattern => cleanEmail.includes(pattern))) {
      console.log('🔑 Admin detectado por padrão:', cleanEmail);
      return 'admin';
    }
    
    console.log('👤 Usuário normal detectado:', cleanEmail);
    return 'user';
  };

  // 🚀 FUNÇÃO ROBUSTA: Buscar perfil do usuário
  const fetchUserProfile = async (userId: string): Promise<any> => {
    try {
      console.log('🔍 Buscando perfil para ID:', userId);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na busca do perfil')), OPERATION_TIMEOUT);
      });

      // ✅ BUSCA MAIS ROBUSTA - TENTAR VÁRIAS COLUNAS
      const fetchPromise = supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          name,
          role,
          country,
          sector,
          organization,
          avatar_url,
          verified,
          preferences,
          created_at
        `)
        .eq('id', userId)
        .single();

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) {
        console.warn('⚠️ Erro ao buscar perfil (normal se for primeiro acesso):', error.message);
        return null;
      }

      console.log('✅ Perfil encontrado:', data?.email, data?.role);
      return data;
    } catch (error) {
      console.warn('⚠️ Erro/timeout ao buscar perfil (usando fallback):', error);
      return null;
    }
  };

  // 🚀 FUNÇÃO ROBUSTA: Criar perfil do usuário
  const createUserProfile = async (authUser: any, userData?: any): Promise<any> => {
    try {
      console.log('📝 Criando novo perfil para:', authUser.email);
      
      // Determinar role baseado no email primeiro, depois userData
      const roleFromEmail = determineRoleFromEmail(authUser.email);
      const finalRole = userData?.role || roleFromEmail;
      
      // ✅ DADOS ROBUSTOS - COMPATÍVEL COM QUALQUER SCHEMA
      const profileData = {
        id: authUser.id,
        email: authUser.email,
        full_name: userData?.name || authUser.email?.split('@')[0] || 'Usuário',
        name: userData?.name || authUser.email?.split('@')[0] || 'Usuário', // Fallback caso full_name não exista
        role: finalRole,
        country: userData?.country || 'Angola',
        sector: userData?.sector || 'Geral',
        organization: userData?.organization || 'Africa\'s Hands',
        verified: true,
        preferences: {
          language: 'pt',
          notifications: true,
          theme: 'light'
        }
      };

      console.log('📄 Dados do perfil a criar:', {
        email: profileData.email,
        role: profileData.role,
        name: profileData.full_name
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na criação do perfil')), OPERATION_TIMEOUT);
      });

      const createPromise = supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select()
        .single();

      const { data, error } = await Promise.race([createPromise, timeoutPromise]) as any;

      if (error) {
        console.warn('⚠️ Erro ao criar perfil (usando fallback):', error.message);
        // Retornar dados locais como fallback
        return profileData;
      }

      console.log('✅ Perfil criado com sucesso:', data?.email, data?.role);
      return data;
    } catch (error) {
      console.warn('⚠️ Erro/timeout na criação do perfil (usando fallback):', error);
      
      // 🆘 FALLBACK ROBUSTO: retornar dados básicos
      return {
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.email?.split('@')[0] || 'Usuário',
        name: authUser.email?.split('@')[0] || 'Usuário',
        role: determineRoleFromEmail(authUser.email),
        country: 'Angola',
        sector: 'Geral',
        organization: 'Africa\'s Hands',
        verified: true,
        preferences: {
          language: 'pt',
          notifications: true,
          theme: 'light'
        }
      };
    }
  };

  // 🚀 FUNÇÃO ROBUSTA: Obter ou criar perfil
  const getOrCreateProfile = async (authUser: any, userData?: any): Promise<User | null> => {
    try {
      console.log('🔄 Processando perfil para:', authUser.email);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout geral')), OPERATION_TIMEOUT + 500);
      });

      const profilePromise = (async () => {
        // 1. Tentar buscar perfil existente
        let profile = await fetchUserProfile(authUser.id);
        
        // 2. Se não encontrar, criar um novo
        if (!profile) {
          profile = await createUserProfile(authUser, userData);
        }

        // 3. Verificar se o role no perfil está correto baseado no email
        if (profile) {
          const roleFromEmail = determineRoleFromEmail(authUser.email);
          
          // Se o role no banco não bate com o role baseado no email, usar o do email
          if (profile.role !== roleFromEmail && !userData?.role) {
            console.log('🔧 Corrigindo role baseado no email:', profile.role, '->', roleFromEmail);
            profile.role = roleFromEmail;
            
            try {
              await supabase
                .from('profiles')
                .update({ role: roleFromEmail })
                .eq('id', authUser.id);
            } catch (updateError) {
              console.warn('⚠️ Não foi possível atualizar role no banco (usando role detectado):', updateError);
            }
          }
        }

        return profile;
      })();

      const profile = await Promise.race([profilePromise, timeoutPromise]);

      if (profile) {
        const convertedUser = convertToUser(profile);
        console.log('✅ Perfil processado com sucesso:', {
          email: convertedUser.email,
          role: convertedUser.role,
          id: convertedUser.id
        });
        return convertedUser;
      }

      throw new Error('Não foi possível obter perfil');
    } catch (error) {
      console.warn('⚠️ Erro ao obter/criar perfil (usando fallback final):', error);
      
      // 🆘 FALLBACK FINAL: Nunca deixar o usuário sem acesso
      const fallbackRole = determineRoleFromEmail(authUser.email);
      const fallbackUser: User = {
        id: authUser.id,
        name: authUser.email?.split('@')[0] || 'Usuário',
        email: authUser.email,
        role: fallbackRole,
        country: 'Angola',
        sector: 'Geral',
        organization: 'Africa\'s Hands',
        verified: true,
        preferences: {
          language: 'pt',
          notifications: true,
          theme: 'light'
        }
      };
      
      console.log('🆘 Usando perfil fallback:', {
        email: fallbackUser.email,
        role: fallbackUser.role
      });
      
      return fallbackUser;
    }
  };

  // ✅ FUNÇÃO ROBUSTA: Converter perfil para User
  const convertToUser = (profile: any): User => {
    const user: User = {
      id: profile.id,
      name: profile.full_name || profile.name || profile.email?.split('@')[0] || 'Usuário',
      email: profile.email,
      role: profile.role || 'user',
      country: profile.country || 'Angola',
      sector: profile.sector || 'Geral',
      organization: profile.organization || 'Africa\'s Hands',
      avatar: profile.avatar_url,
      verified: profile.verified !== false, // Default true
      preferences: profile.preferences || {
        language: 'pt',
        notifications: true,
        theme: 'light'
      }
    };

    return user;
  };

  // 🚀 FUNÇÃO PÚBLICA: Verificar role atual
  const checkUserRole = async (): Promise<'admin' | 'user' | null> => {
    if (!user) return null;
    
    try {
      const profile = await fetchUserProfile(user.id);
      if (profile?.role) {
        return profile.role;
      }
      return user.role;
    } catch (error) {
      console.warn('⚠️ Erro ao verificar role (usando role atual):', error);
      return user.role;
    }
  };

  // 🔧 ADICIONAR: Tratamento de callback OAuth
  useEffect(() => {
    // Detectar se está retornando de OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error) {
      console.error('❌ Erro OAuth detectado na URL:', {
        error,
        errorDescription: decodeURIComponent(errorDescription || '')
      });
      
      // Limpar URL de erro
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Mostrar erro específico
      if (error === 'server_error' && errorDescription?.includes('Unable to exchange external code')) {
        console.error('🔧 ERRO: Problema na configuração OAuth - verificar URLs no Google Cloud Console');
      }
    }
  }, []);

  // 🚀 INICIALIZAÇÃO ROBUSTA
  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      console.log('🚀 Inicializando autenticação...');
      
      // Timeout global para inicialização
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          console.log('⏰ Timeout na inicialização - finalizando loading');
          setIsLoading(false);
        }
      }, LOADING_TIMEOUT);

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error('❌ Erro ao verificar sessão:', error);
          clearTimeout(timeoutId);
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          console.log('👤 Sessão ativa encontrada para:', session.user.email);
          
          const userData = await getOrCreateProfile(session.user);
          
          if (isMounted && userData) {
            setUser(userData);
            setUserRole(userData.role);
            console.log('✅ Autenticação inicial completa:', {
              email: userData.email,
              role: userData.role,
              isAuthenticated: true
            });
          }
        } else {
          console.log('📭 Nenhuma sessão ativa encontrada');
        }
      } catch (error) {
        console.error('❌ Erro na inicialização da autenticação:', error);
      } finally {
        if (isMounted) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // 🔧 MELHORAR: Listener de auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        console.log('🔄 Evento de autenticação:', event, {
          userEmail: session?.user?.email,
          hasSession: !!session
        });
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('🔐 Login OAuth detectado para:', session.user.email);
          
          setIsLoading(true);
          
          try {
            const userData = await getOrCreateProfile(session.user);
            
            if (isMounted && userData) {
              setUser(userData);
              setUserRole(userData.role);
              console.log('✅ Login OAuth processado com sucesso:', {
                email: userData.email,
                role: userData.role
              });
            }
          } catch (error) {
            console.error('❌ Erro ao processar login OAuth:', error);
          } finally {
            if (isMounted) {
              setIsLoading(false);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Logout detectado');
          if (isMounted) {
            setUser(null);
            setUserRole(null);
            setIsLoading(false);
          }
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token renovado');
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('🔐 Tentando login para:', email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) throw error;

      console.log('✅ Credenciais aceitas, processando login...');
      // O onAuthStateChange vai processar o resto
    } catch (error: any) {
      console.error('❌ Falha no login:', error);
      setIsLoading(false);
      
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Email ou senha incorretos');
      }
      
      if (error.message?.includes('Email not confirmed')) {
        throw new Error('Confirme seu email antes de fazer login');
      }
      
      throw new Error(error.message || 'Erro no login');
    }
  };

  // Registro
  const register = async (
    email: string, 
    password: string, 
    userData: {
      name: string;
      country: string;
      role?: 'admin' | 'user';
      sector?: string;
      organization?: string;
    }
  ): Promise<void> => {
    try {
      console.log('📝 Tentando registrar:', email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: userData.name,
            country: userData.country,
            role: userData.role || determineRoleFromEmail(email)
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        console.log('✅ Usuário registrado, criando perfil...');
        
        // Criar perfil com dados fornecidos
        const profileData = {
          ...userData,
          role: userData.role || determineRoleFromEmail(email)
        };
        
        // Criar perfil em background
        createUserProfile(data.user, profileData)
          .then(() => console.log('✅ Perfil criado após registro'))
          .catch(err => console.warn('⚠️ Erro ao criar perfil após registro (não crítico):', err));
      }
      
      setIsLoading(false);
    } catch (error: any) {
      console.error('❌ Falha no registro:', error);
      setIsLoading(false);
      
      if (error.message?.includes('User already registered')) {
        throw new Error('Este email já está registrado');
      }
      
      if (error.message?.includes('Password should be at least')) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }
      
      throw new Error(error.message || 'Erro no registro');
    }
  };

  // 🚀 FUNÇÃO: Login com Google - CORRIGIDA
  const loginWithGoogle = async (): Promise<void> => {
    try {
      console.log('🔐 Iniciando login com Google...');
      setIsLoading(true);
      
      const redirectURL = getRedirectURL();
      console.log('📍 URL de redirecionamento:', redirectURL);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectURL,
          scopes: 'email profile',
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account', // Força seleção de conta
          }
        }
      });

      if (error) {
        console.error('❌ Erro configuração OAuth Google:', error);
        throw error;
      }

      console.log('✅ Redirecionando para Google...', data);
      // O onAuthStateChange processará o retorno
    } catch (error: any) {
      console.error('❌ Falha no login com Google:', error);
      setIsLoading(false);
      
      // Tratamento específico de erros
      if (error.message?.includes('OAuth provider not enabled')) {
        throw new Error('Login com Google não está habilitado no Supabase');
      }
      
      if (error.message?.includes('popup_closed_by_user')) {
        throw new Error('Login cancelado pelo usuário');
      }
      
      if (error.message?.includes('redirect_uri_mismatch')) {
        throw new Error('Erro de configuração: URLs não coincidem');
      }
      
      throw new Error(error.message || 'Erro no login com Google');
    }
  };

  // 🚀 FUNÇÃO: Login com Facebook - CORRIGIDA
  const loginWithFacebook = async (): Promise<void> => {
    try {
      console.log('🔐 Iniciando login com Facebook...');
      setIsLoading(true);
      
      const redirectURL = getRedirectURL();
      console.log('📍 URL de redirecionamento:', redirectURL);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: redirectURL,
          scopes: 'email,public_profile'
        }
      });

      if (error) {
        console.error('❌ Erro configuração OAuth Facebook:', error);
        throw error;
      }

      console.log('✅ Redirecionando para Facebook...', data);
      // O onAuthStateChange processará o retorno
    } catch (error: any) {
      console.error('❌ Falha no login com Facebook:', error);
      setIsLoading(false);
      
      if (error.message?.includes('OAuth provider not enabled')) {
        throw new Error('Login com Facebook não está habilitado no Supabase');
      }
      
      if (error.message?.includes('popup_closed_by_user')) {
        throw new Error('Login cancelado pelo usuário');
      }
      
      if (error.message?.includes('redirect_uri_mismatch')) {
        throw new Error('Erro de configuração: URLs não coincidem');
      }
      
      throw new Error(error.message || 'Erro no login com Facebook');
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      console.log('👋 Realizando logout...');
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserRole(null);
      setIsLoading(false);
      console.log('✅ Logout realizado com sucesso');
    } catch (error: any) {
      console.error('❌ Erro no logout:', error);
      
      // Mesmo com erro, limpar estado local
      setUser(null);
      setUserRole(null);
      setIsLoading(false);
      
      throw new Error(error.message || 'Erro no logout');
    }
  };

  // Debug info
  useEffect(() => {
    if (user) {
      console.log('🔍 Estado atual do usuário:', {
        id: user.id,
        email: user.email,
        role: user.role,
        userRole: userRole,
        isAuthenticated: !!user && !!userRole,
        isLoading: isLoading
      });
    }
  }, [user, userRole, isLoading]);

  return (
    <AuthContext.Provider value={{
      user,
      userRole,
      isAuthenticated: !!user && !!userRole,
      isLoading,
      login,
      register,
      logout,
      checkUserRole,
      loginWithFacebook,
      loginWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;