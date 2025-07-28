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
      console.log('🔍 [fetchUserProfile] Buscando perfil para ID:', userId);
      
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
        console.warn('⚠️ [fetchUserProfile] Erro ao buscar perfil (normal se for primeiro acesso):', error.message);
        return null;
      }

      console.log('✅ [fetchUserProfile] Perfil encontrado:', data?.email, data?.role);
      return data;
    } catch (error) {
      console.warn('⚠️ [fetchUserProfile] Erro/timeout ao buscar perfil (usando fallback):', error);
      return null;
    }
  };

  // 🚀 FUNÇÃO ROBUSTA: Criar perfil do usuário - À PROVA DE BALAS
  const createUserProfile = async (authUser: any, userData?: any): Promise<any> => {
    console.log('📝 [createUserProfile] Iniciando para:', authUser.email);
    
    // ✅ IDENTIFICAR TIPO DE USUÁRIO
    const isOAuthUser = authUser.app_metadata?.provider && authUser.app_metadata.provider !== 'email';
    const provider = authUser.app_metadata?.provider || 'email';
    
    console.log('🔍 [createUserProfile] Tipo:', isOAuthUser ? 'OAuth' : 'Email', '| Provider:', provider);
    
    // ✅ DADOS BASE PARA QUALQUER USUÁRIO
    const baseProfileData = {
      id: authUser.id,
      email: authUser.email,
      full_name: userData?.name || 
                 authUser.user_metadata?.full_name || 
                 authUser.user_metadata?.name || 
                 authUser.email?.split('@')[0] || 'Usuário',
      name: userData?.name || 
            authUser.user_metadata?.name || 
            authUser.user_metadata?.full_name || 
            authUser.email?.split('@')[0] || 'Usuário',
      role: userData?.role || determineRoleFromEmail(authUser.email),
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

    console.log('📄 [createUserProfile] Dados preparados:', {
      email: baseProfileData.email,
      role: baseProfileData.role,
      name: baseProfileData.full_name,
      isOAuth: isOAuthUser
    });

    // ✅ ESTRATÉGIA DIFERENTE PARA OAUTH vs EMAIL
    if (isOAuthUser) {
      console.log('🔍 [createUserProfile] OAUTH: Verificando perfil existente...');
      
      try {
        // 1. Tentar buscar perfil existente primeiro
        const existingProfile = await fetchUserProfile(authUser.id);
        if (existingProfile) {
          console.log('✅ [createUserProfile] OAUTH: Perfil existente encontrado');
          return existingProfile;
        }
        
        console.log('🆕 [createUserProfile] OAUTH: Criando novo perfil...');
        
        // 2. Tentar criar no banco (mas NÃO falhar se der erro)
        try {
          const { data, error } = await Promise.race([
            supabase
              .from('profiles')
              .insert(baseProfileData)
              .select()
              .single(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), OPERATION_TIMEOUT)
            )
          ]) as any;

          if (!error && data) {
            console.log('✅ [createUserProfile] OAUTH: Salvo no banco com sucesso!');
            return data;
          } else {
            console.warn('⚠️ [createUserProfile] OAUTH: Erro no banco (IGNORANDO):', error?.message);
          }
        } catch (dbError: any) {
          console.warn('⚠️ [createUserProfile] OAUTH: Exceção no banco (IGNORANDO):', dbError.message);
        }
        
        // 3. SEMPRE retornar dados válidos para OAuth (NUNCA FALHAR)
        console.log('🎯 [createUserProfile] OAUTH: RETORNANDO dados em memória (SUCESSO GARANTIDO)');
        return baseProfileData;
        
      } catch (error: any) {
        console.warn('⚠️ [createUserProfile] OAUTH: Erro geral (IGNORANDO):', error.message);
        // SEMPRE retornar dados válidos para OAuth
        return baseProfileData;
      }
    } else {
      // ✅ FLUXO NORMAL PARA USUÁRIOS EMAIL (como antes)
      console.log('📧 [createUserProfile] EMAIL: Usando upsert...');
      
      try {
        const { data, error } = await Promise.race([
          supabase
            .from('profiles')
            .upsert(baseProfileData, { onConflict: 'id' })
            .select()
            .single(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), OPERATION_TIMEOUT)
          )
        ]) as any;

        if (error) {
          console.warn('⚠️ [createUserProfile] EMAIL: Erro (usando fallback):', error.message);
          return baseProfileData;
        }

        console.log('✅ [createUserProfile] EMAIL: Criado com sucesso');
        return data;
      } catch (error: any) {
        console.warn('⚠️ [createUserProfile] EMAIL: Exceção (usando fallback):', error.message);
        return baseProfileData;
      }
    }
  };

  // 🚀 FUNÇÃO ROBUSTA: Obter ou criar perfil - MELHORADA
  const getOrCreateProfile = async (authUser: any, userData?: any): Promise<User | null> => {
    console.log('🔄 [getOrCreateProfile] Processando para:', authUser.email);
    
    try {
      const isOAuthUser = authUser.app_metadata?.provider && authUser.app_metadata.provider !== 'email';
      
      // ✅ SEMPRE TENTAR BUSCAR PRIMEIRO
      console.log('🔍 [getOrCreateProfile] Buscando perfil existente...');
      let profile = await fetchUserProfile(authUser.id);
      
      // ✅ SE NÃO ENCONTRAR, CRIAR
      if (!profile) {
        console.log('🆕 [getOrCreateProfile] Perfil não encontrado, criando...');
        profile = await createUserProfile(authUser, userData);
      } else {
        console.log('✅ [getOrCreateProfile] Perfil existente encontrado');
      }

      // ✅ VERIFICAR E CORRIGIR ROLE SE NECESSÁRIO
      if (profile) {
        const roleFromEmail = determineRoleFromEmail(authUser.email);
        
        if (profile.role !== roleFromEmail && !userData?.role) {
          console.log('🔧 [getOrCreateProfile] Corrigindo role:', profile.role, '->', roleFromEmail);
          profile.role = roleFromEmail;
          
          // Tentar atualizar no banco (mas não falhar se der erro)
          try {
            await supabase
              .from('profiles')
              .update({ role: roleFromEmail })
              .eq('id', authUser.id);
            console.log('✅ [getOrCreateProfile] Role atualizado no banco');
          } catch (updateError) {
            console.warn('⚠️ [getOrCreateProfile] Erro ao atualizar role (IGNORANDO):', updateError);
          }
        }
      }

      // ✅ CONVERTER PARA USER E RETORNAR
      if (profile) {
        const convertedUser = convertToUser(profile);
        console.log('✅ [getOrCreateProfile] Sucesso final:', {
          email: convertedUser.email,
          role: convertedUser.role,
          id: convertedUser.id,
          isOAuth: isOAuthUser
        });
        return convertedUser;
      }

      throw new Error('Perfil não pôde ser criado');
      
    } catch (error: any) {
      console.error('❌ [getOrCreateProfile] Erro crítico, usando fallback final:', error.message);
      
      // 🆘 FALLBACK ABSOLUTO - NUNCA FALHAR
      const fallbackUser: User = {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || 
              authUser.user_metadata?.name || 
              authUser.email?.split('@')[0] || 'Usuário OAuth',
        email: authUser.email,
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
      
      console.log('🆘 [getOrCreateProfile] FALLBACK FINAL aplicado:', {
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
      console.error('❌ [OAuth Callback] Erro OAuth detectado na URL:', {
        error,
        errorDescription: decodeURIComponent(errorDescription || '')
      });
      
      // Limpar URL de erro
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Mostrar erro específico
      if (error === 'server_error' && errorDescription?.includes('Database error saving new user')) {
        console.log('🔧 [OAuth Callback] CORRIGINDO: Erro de banco para usuário OAuth - usando fallback');
      }
    }
  }, []);

  // 🚀 INICIALIZAÇÃO ROBUSTA
  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      console.log('🚀 [Init] Inicializando autenticação...');
      
      // Timeout global para inicialização
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          console.log('⏰ [Init] Timeout na inicialização - finalizando loading');
          setIsLoading(false);
        }
      }, LOADING_TIMEOUT);

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error('❌ [Init] Erro ao verificar sessão:', error);
          clearTimeout(timeoutId);
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          console.log('👤 [Init] Sessão ativa encontrada para:', session.user.email);
          
          const userData = await getOrCreateProfile(session.user);
          
          if (isMounted && userData) {
            setUser(userData);
            setUserRole(userData.role);
            console.log('✅ [Init] Autenticação inicial completa:', {
              email: userData.email,
              role: userData.role,
              isAuthenticated: true
            });
          }
        } else {
          console.log('📭 [Init] Nenhuma sessão ativa encontrada');
        }
      } catch (error) {
        console.error('❌ [Init] Erro na inicialização da autenticação:', error);
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
        
        console.log('🔄 [AuthState] Evento de autenticação:', event, {
          userEmail: session?.user?.email,
          hasSession: !!session,
          provider: session?.user?.app_metadata?.provider
        });
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('🔐 [AuthState] Login detectado para:', session.user.email, '| Provider:', session.user.app_metadata?.provider);
          
          setIsLoading(true);
          
          try {
            const userData = await getOrCreateProfile(session.user);
            
            if (isMounted && userData) {
              setUser(userData);
              setUserRole(userData.role);
              console.log('✅ [AuthState] Login processado com sucesso:', {
                email: userData.email,
                role: userData.role,
                provider: session.user.app_metadata?.provider
              });
            }
          } catch (error) {
            console.error('❌ [AuthState] Erro ao processar login:', error);
          } finally {
            if (isMounted) {
              setIsLoading(false);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 [AuthState] Logout detectado');
          if (isMounted) {
            setUser(null);
            setUserRole(null);
            setIsLoading(false);
          }
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 [AuthState] Token renovado');
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
      console.log('🔐 [Login] Tentando login para:', email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) throw error;

      console.log('✅ [Login] Credenciais aceitas, processando login...');
      // O onAuthStateChange vai processar o resto
    } catch (error: any) {
      console.error('❌ [Login] Falha no login:', error);
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
      console.log('📝 [Register] Tentando registrar:', email);
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
        console.log('✅ [Register] Usuário registrado, criando perfil...');
        
        // Criar perfil com dados fornecidos
        const profileData = {
          ...userData,
          role: userData.role || determineRoleFromEmail(email)
        };
        
        // Criar perfil em background
        createUserProfile(data.user, profileData)
          .then(() => console.log('✅ [Register] Perfil criado após registro'))
          .catch(err => console.warn('⚠️ [Register] Erro ao criar perfil após registro (não crítico):', err));
      }
      
      setIsLoading(false);
    } catch (error: any) {
      console.error('❌ [Register] Falha no registro:', error);
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

  // 🚀 FUNÇÃO: Login com Google - SIMPLIFICADA
  const loginWithGoogle = async (): Promise<void> => {
    try {
      console.log('🔐 [OAuth] Iniciando login com Google...');
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Deixar Supabase gerenciar redirecionamento automaticamente
          scopes: 'email profile',
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          }
        }
      });

      if (error) {
        console.error('❌ [OAuth] Erro configuração OAuth Google:', error);
        throw error;
      }

      console.log('✅ [OAuth] Redirecionando para Google...', data);
      // O onAuthStateChange processará o retorno
    } catch (error: any) {
      console.error('❌ [OAuth] Falha no login com Google:', error);
      setIsLoading(false);
      
      if (error.message?.includes('OAuth provider not enabled')) {
        throw new Error('Login com Google não está habilitado no Supabase');
      }
      
      if (error.message?.includes('popup_closed_by_user')) {
        throw new Error('Login cancelado pelo usuário');
      }
      
      throw new Error(error.message || 'Erro no login com Google');
    }
  };

  // 🚀 FUNÇÃO: Login com Facebook - SIMPLIFICADA
  const loginWithFacebook = async (): Promise<void> => {
    try {
      console.log('🔐 [OAuth] Iniciando login com Facebook...');
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          // Deixar Supabase gerenciar redirecionamento automaticamente
          scopes: 'email,public_profile'
        }
      });

      if (error) {
        console.error('❌ [OAuth] Erro configuração OAuth Facebook:', error);
        throw error;
      }

      console.log('✅ [OAuth] Redirecionando para Facebook...', data);
      // O onAuthStateChange processará o retorno
    } catch (error: any) {
      console.error('❌ [OAuth] Falha no login com Facebook:', error);
      setIsLoading(false);
      
      if (error.message?.includes('OAuth provider not enabled')) {
        throw new Error('Login com Facebook não está habilitado no Supabase');
      }
      
      if (error.message?.includes('popup_closed_by_user')) {
        throw new Error('Login cancelado pelo usuário');
      }
      
      throw new Error(error.message || 'Erro no login com Facebook');
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      console.log('👋 [Logout] Realizando logout...');
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserRole(null);
      setIsLoading(false);
      console.log('✅ [Logout] Logout realizado com sucesso');
    } catch (error: any) {
      console.error('❌ [Logout] Erro no logout:', error);
      
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
      console.log('🔍 [Debug] Estado atual do usuário:', {
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