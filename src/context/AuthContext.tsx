import React, { createContext, useContext, useState, useEffect } from 'react';

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
  lastLogin?: string;
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
  login: (role: 'admin' | 'user', userData?: Partial<User>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setUserRole: (role: 'admin' | 'user' | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação salva no localStorage
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('africas_hands_user');
        const savedRole = localStorage.getItem('africas_hands_role');
        
        if (savedUser && savedRole) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setUserRole(savedRole as 'admin' | 'user');
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
        localStorage.removeItem('africas_hands_user');
        localStorage.removeItem('africas_hands_role');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'AO': '🇦🇴',
      'Angola': '🇦🇴',
      'NA': '🇳🇦',
      'Namíbia': '🇳🇦',
      'ZA': '🇿🇦',
      'África do Sul': '🇿🇦',
      'OTHER': '🌍'
    };
    return flags[country] || '🌍';
  };

  const createDefaultUser = (role: 'admin' | 'user', userData?: Partial<User>): User => {
    const baseUser: User = {
      id: `user_${Date.now()}`,
      name: userData?.name || (role === 'admin' ? 'Valdimir Jacinto Esteves' : 'João Santos'),
      email: userData?.email || (role === 'admin' ? 'admin@africashands.com' : 'user@africashands.com'),
      role,
      country: userData?.country || 'Angola',
      sector: userData?.sector || (role === 'admin' ? 'Gestão Executiva' : 'Saúde'),
      organization: userData?.organization || (role === 'admin' ? 'Africa\'s Hands' : 'Hospital Josina Machel'),
      avatar: userData?.avatar || (role === 'admin' 
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      ),
      verified: true,
      lastLogin: new Date().toISOString(),
      preferences: {
        language: 'pt',
        notifications: true,
        theme: 'light'
      }
    };

    return { ...baseUser, ...userData };
  };

  const login = (role: 'admin' | 'user', userData?: Partial<User>) => {
    const newUser = createDefaultUser(role, userData);
    
    setUser(newUser);
    setUserRole(role);
    
    // Salvar no localStorage
    localStorage.setItem('africas_hands_user', JSON.stringify(newUser));
    localStorage.setItem('africas_hands_role', role);
    localStorage.setItem('africas_hands_login_time', new Date().toISOString());
    
    console.log(`✅ Login realizado com sucesso: ${role}`, newUser);
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    
    // Limpar localStorage
    localStorage.removeItem('africas_hands_user');
    localStorage.removeItem('africas_hands_role');
    localStorage.removeItem('africas_hands_login_time');
    
    console.log('👋 Logout realizado com sucesso');
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    
    // Atualizar localStorage
    localStorage.setItem('africas_hands_user', JSON.stringify(updatedUser));
    
    console.log('📝 Dados do usuário atualizados:', updatedUser);
  };

  const isAuthenticated = !!user && !!userRole;

  const contextValue: AuthContextType = {
    user,
    userRole,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    setUserRole
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook personalizado para verificar permissões
export const usePermissions = () => {
  const { user, userRole } = useAuth();
  
  const permissions = {
    // Permissões de Admin
    canManageUsers: userRole === 'admin',
    canViewAllProjects: userRole === 'admin',
    canManageSystem: userRole === 'admin',
    canAccessAnalytics: userRole === 'admin',
    canManagePartners: userRole === 'admin',
    
    // Permissões de Usuário
    canViewOwnProjects: true,
    canApplyToOpportunities: true,
    canUpdateProfile: true,
    canViewResources: true,
    
    // Permissões baseadas em verificação
    canAccessPremiumFeatures: user?.verified || false,
    canContactDirectly: user?.verified || false,
    
    // Permissões baseadas no país
    canAccessLocalServices: !!user?.country,
    canParticipateInRegionalPrograms: ['AO', 'Angola', 'NA', 'Namíbia', 'ZA', 'África do Sul'].includes(user?.country || ''),
  };
  
  return permissions;
};

// Hook para dados do usuário formatados
export const useUserProfile = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'AO': '🇦🇴',
      'Angola': '🇦🇴',
      'NA': '🇳🇦',
      'Namíbia': '🇳🇦',
      'ZA': '🇿🇦',
      'África do Sul': '🇿🇦',
      'OTHER': '🌍'
    };
    return flags[country] || '🌍';
  };

  const getSectorIcon = (sector: string) => {
    const icons: { [key: string]: string } = {
      'Saúde': '🏥',
      'Educação': '🎓',
      'Turismo': '🏨',
      'Comércio': '🛒',
      'Transporte': '✈️',
      'Tecnologia': '💻',
      'Gestão Executiva': '👨‍💼',
      'Governo': '🏛️',
      'ONGs': '🤝'
    };
    return icons[sector || ''] || '💼';
  };

  return {
    ...user,
    displayName: user.name,
    countryFlag: getCountryFlag(user.country),
    sectorIcon: getSectorIcon(user.sector || ''),
    initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    memberSince: user.lastLogin ? new Date(user.lastLogin).getFullYear() : new Date().getFullYear(),
    isVerified: user.verified
  };
};

export default AuthContext;