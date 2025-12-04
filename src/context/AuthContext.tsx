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

  // 🔧 TIMEOUT OTIMIZADO PARA CARREGAMENTO RÁPIDO
  const LOADING_TIMEOUT = 3000; // 3 segundos (reduzido de 8000)
  const OPERATION_TIMEOUT = 2000; // 2 segundos (reduzido de 5000)

  // 🎯 FUNÇÃO: Determinar role baseado no email
  const determineRoleFromEmail = (email: string): 'admin' | 'user' => {
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
      console.log('🔑 Admin detectado:', cleanEmail);
      return 'admin';
    }
    
    console.log('👤 Usuário normal detectado:', cleanEmail);
    return 'user';
  };

  // 🚀 FUNÇÃO: Buscar perfil do usuário
  const fetchUserProfile = async (userId: string): Promise<any> => {
    try {
      console.log('🔍 [fetchUserProfile] Buscando perfil para ID:', userId);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na busca do perfil')), OPERATION_TIMEOUT);
      });

      const fetchPromise = supabase
        .from('profiles')
        .select('id, email, full_name, role') // Apenas campos essenciais para carregamento rápido
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

  // 🚀 FUNÇÃO: Criar perfil do usuário - COM CORREÇÃO OAUTH
  const createUserProfile = async (authUser: any, userData?: any): Promise<any> => {
    console.log('📝 [createUserProfile] Iniciando para:', authUser.email);
    
    // ✅ CORREÇÃO ESPECÍFICA PARA OAUTH - NUNCA FALHAR
    const isOAuthUser = authUser.app_metadata?.provider && authUser.app_metadata.provider !== 'email';
    const provider = authUser.app_metadata?.provider || 'email';
    
    console.log('🔍 [createUserProfile] Tipo:', isOAuthUser ? 'OAuth' : 'Email', '| Provider:', provider);
    
    // Dados base para qualquer usuário
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

    if (isOAuthUser) {
      console.log('🔍 [OAuth] Usuário OAuth detectado, usando estratégia à prova de balas');
      
      // 1. Tentar buscar perfil existente primeiro
      try {
        const existingProfile = await fetchUserProfile(authUser.id);
        if (existingProfile) {
          console.log('✅ [OAuth] Perfil existente encontrado');
          return existingProfile;
        }
      } catch (error) {
        console.warn('⚠️ [OAuth] Erro ao buscar perfil existente (continuando):', error);
      }

      // 2. Tentar salvar no banco, mas NUNCA falhar se der erro
      console.log('🆕 [OAuth] Criando novo perfil...');
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
          console.log('✅ [OAuth] Perfil salvo no banco com sucesso!');
          return data;
        } else {
          console.warn('⚠️ [OAuth] Erro no banco (IGNORANDO):', error?.message);
        }
      } catch (dbError: any) {
        console.warn('⚠️ [OAuth] Erro/timeout no banco (IGNORANDO):', dbError.message);
      }

      // 3. SEMPRE retornar dados válidos para OAuth (NUNCA FALHAR)
      console.log('🎯 [OAuth] Retornando dados de fallback (SUCESSO GARANTIDO)');
      return baseProfileData;
      
    } else {
      // Fluxo normal para usuários email
      console.log('📧 [Email] Usando upsert para usuário email...');
      
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
          console.warn('⚠️ [Email] Erro (usando fallback):', error.message);
          return baseProfileData;
        }

        console.log('✅ [Email] Criado com sucesso');
        return data;
      } catch (error: any) {
        console.warn('⚠️ [Email] Exceção (usando fallback):', error.message);
        return baseProfileData;
      }
    }
  };

  // 🚀 FUNÇÃO: Obter ou criar perfil
  const getOrCreateProfile = async (authUser: any, userData?: any): Promise<User | null> => {
    console.log('🔄 [getOrCreateProfile] Processando para:', authUser.email);
    
    try {
      // Sempre tentar buscar primeiro
      console.log('🔍 [getOrCreateProfile] Buscando perfil existente...');
      let profile = await fetchUserProfile(authUser.id);
      
      // Se não encontrar, criar
      if (!profile) {
        console.log('🆕 [getOrCreateProfile] Perfil não encontrado, criando...');
        profile = await createUserProfile(authUser, userData);
      } else {
        console.log('✅ [getOrCreateProfile] Perfil existente encontrado');
      }

      // Verificar e corrigir role se necessário
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

      // Converter para User e retornar
      if (profile) {
        const convertedUser = convertToUser(profile);
        console.log('✅ [getOrCreateProfile] Sucesso final:', {
          email: convertedUser.email,
          role: convertedUser.role,
          id: convertedUser.id
        });
        return convertedUser;
      }

      throw new Error('Perfil não pôde ser criado');
      
    } catch (error: any) {
      console.error('❌ [getOrCreateProfile] Erro crítico, usando fallback final:', error.message);
      
      // Fallback absoluto - nunca falhar
      const fallbackUser: User = {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || 
              authUser.user_metadata?.name || 
              authUser.email?.split('@')[0] || 'Usuário',
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

  // ✅ FUNÇÃO: Converter perfil para User
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
      verified: profile.verified !== false,
      preferences: profile.preferences || {
        language: 'pt',
        notifications: true,
        theme: 'light'
      }
    };

    return user;
  };

  // 🚀 FUNÇÃO: Verificar role atual
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

  // 🚀 INICIALIZAÇÃO
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

          // ✅ OTIMIZAÇÃO: Definir isLoading(false) ANTES de carregar o perfil
          // Isso permite que a UI seja mostrada mais rápido
          clearTimeout(timeoutId);
          setIsLoading(false);

          // Carregar perfil de forma assíncrona (não bloqueia a UI)
          getOrCreateProfile(session.user).then(userData => {
            if (isMounted && userData) {
              setUser(userData);
              setUserRole(userData.role);
              console.log('✅ [Init] Perfil carregado:', {
                email: userData.email,
                role: userData.role
              });
            }
          }).catch(err => {
            console.error('❌ [Init] Erro ao carregar perfil:', err);
          });
        } else {
          console.log('📭 [Init] Nenhuma sessão ativa encontrada');
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('❌ [Init] Erro na inicialização da autenticação:', error);
        if (isMounted) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Listener de auth state
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('🔐 [Login] Tentando login para:', email);
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) throw error;

      console.log('✅ [Login] Credenciais aceitas, processando login...');
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

      // ✅ CORREÇÃO: NÃO criar perfil imediatamente após signup
      // O perfil será criado automaticamente pelo onAuthStateChange quando o usuário fizer login
      console.log('✅ [Register] Usuário registrado com sucesso!');
      console.log('📧 [Register] Verificar email para confirmação se necessário');
      
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

  // Login com Google
  const loginWithGoogle = async (): Promise<void> => {
    try {
      console.log('🔐 [OAuth] Iniciando login com Google...');
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
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

  // Login com Facebook
  const loginWithFacebook = async (): Promise<void> => {
    try {
      console.log('🔐 [OAuth] Iniciando login com Facebook...');
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          scopes: 'email,public_profile'
        }
      });

      if (error) {
        console.error('❌ [OAuth] Erro configuração OAuth Facebook:', error);
        throw error;
      }

      console.log('✅ [OAuth] Redirecionando para Facebook...', data);
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