// src/context/OpportunitiesContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { logger } from '../utils/logger';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  country: string;
  sector: string;
  type: 'project' | 'partnership' | 'funding' | 'education';
  organization: string;
  location?: string;
  budget?: number;
  deadline: string;
  requirements: string[];
  status: 'active' | 'inactive' | 'expired';
  featured: boolean;
  image?: string;
  created_by?: string;
  created_at: string;
  updated_at?: string;
  applications_count?: number;
}

export interface Application {
  id: string;
  opportunity_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  application_date: string;
  message?: string;
  opportunity?: Opportunity;
}

interface OpportunitiesContextType {
  // Estado
  opportunities: Opportunity[];
  userApplications: Application[];
  loading: boolean;
  error: string | null;
  
  // Estatísticas
  stats: {
    total: number;
    active: number;
    featured: number;
    byCountry: Record<string, number>;
    bySector: Record<string, number>;
  };
  
  // Ações para oportunidades
  refreshOpportunities: () => Promise<void>;
  createOpportunity: (opportunityData: Partial<Opportunity>) => Promise<Opportunity>;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;
  getOpportunityById: (id: string) => Opportunity | null;
  
  // Ações para candidaturas
  applyToOpportunity: (opportunityId: string, message?: string) => Promise<void>;
  getUserApplications: () => Promise<void>;
  checkUserApplication: (opportunityId: string) => Application | null;
  
  // Filtros
  filterOpportunities: (filters: {
    country?: string;
    sector?: string;
    type?: string;
    featured?: boolean;
    search?: string;
  }) => Opportunity[];
  
  // Real-time
  subscribeToOpportunities: () => void;
  unsubscribeFromOpportunities: () => void;
}

const OpportunitiesContext = createContext<OpportunitiesContextType | null>(null);

export const OpportunitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  // Subscription para real-time
  const [subscription, setSubscription] = useState<any>(null);

  // ===================================================
  // 🔄 CARREGAR OPORTUNIDADES INICIAL
  // ===================================================
  const loadOpportunities = useCallback(async () => {
    try {
      setError(null);

      logger.log('🔄 Carregando oportunidades...');

      // Simplified query - remove expensive JOIN, add limit
      const { data, error: fetchError } = await supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(50); // Limit to 50 most recent opportunities

      if (fetchError) {
        logger.error('❌ Erro ao carregar oportunidades:', fetchError);

        // Fallback com dados de exemplo se falhar
        setOpportunities(getExampleOpportunities());
        setLoading(false);
        return;
      }

      if (data) {
        logger.log(`✅ ${data.length} oportunidades carregadas do Supabase`);
        setOpportunities(data);
      } else {
        logger.log('📋 Nenhuma oportunidade encontrada, usando dados de exemplo');
        setOpportunities(getExampleOpportunities());
      }

    } catch (err) {
      logger.error('❌ Erro inesperado ao carregar oportunidades:', err);
      setError('Erro ao carregar oportunidades');

      // Usar dados de exemplo como fallback
      setOpportunities(getExampleOpportunities());
    } finally {
      setLoading(false);
    }
  }, []);

  // ===================================================
  // 📋 CARREGAR CANDIDATURAS DO USUÁRIO
  // ===================================================
  const loadUserApplications = useCallback(async () => {
    if (!user || !isAuthenticated) return;

    try {
      logger.log('📋 Carregando candidaturas do usuário...');

      // Simplified query - remove expensive JOIN, just get application IDs
      const { data, error: fetchError } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('application_date', { ascending: false })
        .limit(20); // Limit to 20 most recent applications

      if (fetchError) {
        logger.error('❌ Erro ao carregar candidaturas:', fetchError);
        return;
      }

      if (data) {
        logger.log(`✅ ${data.length} candidaturas carregadas`);
        setUserApplications(data);
      }

    } catch (err) {
      logger.error('❌ Erro ao carregar candidaturas:', err);
    }
  }, [user, isAuthenticated]);

  // ===================================================
  // 🚀 CRIAR NOVA OPORTUNIDADE (ADMIN)
  // ===================================================
  const createOpportunity = async (opportunityData: Partial<Opportunity>): Promise<Opportunity> => {
    if (!user || user.role !== 'admin') {
      throw new Error('Apenas administradores podem criar oportunidades');
    }

    try {
      logger.log('🚀 Criando nova oportunidade:', opportunityData.title);

      const newOpportunity = {
        ...opportunityData,
        created_by: user.id,
        status: 'active' as const,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('opportunities')
        .insert([newOpportunity])
        .select()
        .single();

      if (error) throw error;

      logger.log('✅ Oportunidade criada com sucesso:', data.id);

      // Atualizar estado local imediatamente
      setOpportunities(prev => [data, ...prev]);

      return data;
    } catch (err: any) {
      logger.error('❌ Erro ao criar oportunidade:', err);
      throw new Error(err.message || 'Erro ao criar oportunidade');
    }
  };

  // ===================================================
  // 📝 ATUALIZAR OPORTUNIDADE (ADMIN)
  // ===================================================
  const updateOpportunity = async (id: string, updates: Partial<Opportunity>): Promise<void> => {
    if (!user || user.role !== 'admin') {
      throw new Error('Apenas administradores podem atualizar oportunidades');
    }

    try {
      logger.log('📝 Atualizando oportunidade:', id);

      const { data, error } = await supabase
        .from('opportunities')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      logger.log('✅ Oportunidade atualizada com sucesso');

      // Atualizar estado local
      setOpportunities(prev =>
        prev.map(opp => opp.id === id ? { ...opp, ...data } : opp)
      );

    } catch (err: any) {
      logger.error('❌ Erro ao atualizar oportunidade:', err);
      throw new Error(err.message || 'Erro ao atualizar oportunidade');
    }
  };

  // ===================================================
  // 🗑️ DELETAR OPORTUNIDADE (ADMIN)
  // ===================================================
  const deleteOpportunity = async (id: string): Promise<void> => {
    if (!user || user.role !== 'admin') {
      throw new Error('Apenas administradores podem deletar oportunidades');
    }

    try {
      logger.log('🗑️ Deletando oportunidade:', id);

      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      logger.log('✅ Oportunidade deletada com sucesso');

      // Remover do estado local
      setOpportunities(prev => prev.filter(opp => opp.id !== id));

    } catch (err: any) {
      logger.error('❌ Erro ao deletar oportunidade:', err);
      throw new Error(err.message || 'Erro ao deletar oportunidade');
    }
  };

  // ===================================================
  // 📤 CANDIDATAR-SE A OPORTUNIDADE
  // ===================================================
  const applyToOpportunity = async (opportunityId: string, message?: string): Promise<void> => {
    if (!user || !isAuthenticated) {
      throw new Error('Você precisa estar logado para se candidatar');
    }

    try {
      logger.log('📤 Candidatando-se à oportunidade:', opportunityId);

      // Verificar se já se candidatou
      const existingApplication = userApplications.find(
        app => app.opportunity_id === opportunityId
      );

      if (existingApplication) {
        throw new Error('Você já se candidatou a esta oportunidade');
      }

      const applicationData = {
        user_id: user.id,
        opportunity_id: opportunityId,
        status: 'pending' as const,
        application_date: new Date().toISOString(),
        message: message || 'Candidatura através do dashboard'
      };

      const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select('*')
        .single();

      if (error) throw error;

      logger.log('✅ Candidatura enviada com sucesso');

      // Atualizar candidaturas do usuário
      setUserApplications(prev => [data, ...prev]);

    } catch (err: any) {
      logger.error('❌ Erro ao candidatar-se:', err);
      throw new Error(err.message || 'Erro ao enviar candidatura');
    }
  };

  // ===================================================
  // 🔍 FUNÇÕES AUXILIARES
  // ===================================================
  const getOpportunityById = (id: string): Opportunity | null => {
    return opportunities.find(opp => opp.id === id) || null;
  };

  const checkUserApplication = (opportunityId: string): Application | null => {
    return userApplications.find(app => app.opportunity_id === opportunityId) || null;
  };

  const filterOpportunities = useCallback((filters: {
    country?: string;
    sector?: string;
    type?: string;
    featured?: boolean;
    search?: string;
  }): Opportunity[] => {
    return opportunities.filter(opp => {
      if (filters.country && filters.country !== 'all' && opp.country !== filters.country) {
        return false;
      }
      
      if (filters.sector && filters.sector !== 'all' && opp.sector !== filters.sector) {
        return false;
      }
      
      if (filters.type && filters.type !== 'all' && opp.type !== filters.type) {
        return false;
      }
      
      if (filters.featured !== undefined && opp.featured !== filters.featured) {
        return false;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(searchLower);
        const matchesDescription = opp.description.toLowerCase().includes(searchLower);
        const matchesOrganization = opp.organization.toLowerCase().includes(searchLower);
        
        if (!matchesTitle && !matchesDescription && !matchesOrganization) {
          return false;
        }
      }
      
      return true;
    });
  }, [opportunities]);

  // ===================================================
  // 📊 CALCULAR ESTATÍSTICAS
  // ===================================================
  const stats = React.useMemo(() => {
    const total = opportunities.length;
    const active = opportunities.filter(opp => opp.status === 'active').length;
    const featured = opportunities.filter(opp => opp.featured).length;
    
    const byCountry: Record<string, number> = {};
    const bySector: Record<string, number> = {};
    
    opportunities.forEach(opp => {
      byCountry[opp.country] = (byCountry[opp.country] || 0) + 1;
      bySector[opp.sector] = (bySector[opp.sector] || 0) + 1;
    });
    
    return {
      total,
      active,
      featured,
      byCountry,
      bySector
    };
  }, [opportunities]);

  // ===================================================
  // 🔔 SISTEMA REAL-TIME
  // ===================================================
  const subscribeToOpportunities = useCallback(() => {
    if (subscription) return; // Já está subscrito

    logger.log('🔔 Iniciando subscription para oportunidades em tempo real...');

    const sub = supabase
      .channel('opportunities-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'opportunities'
        },
        (payload) => {
          logger.log('🔔 Mudança em tempo real detectada:', payload);

          switch (payload.eventType) {
            case 'INSERT':
              logger.log('➕ Nova oportunidade criada:', payload.new.title);
              setOpportunities(prev => {
                const exists = prev.some(opp => opp.id === payload.new.id);
                if (exists) return prev;
                return [payload.new as Opportunity, ...prev];
              });
              break;

            case 'UPDATE':
              logger.log('📝 Oportunidade atualizada:', payload.new.title);
              setOpportunities(prev =>
                prev.map(opp =>
                  opp.id === payload.new.id ? { ...opp, ...payload.new } : opp
                )
              );
              break;

            case 'DELETE':
              logger.log('🗑️ Oportunidade deletada:', payload.old.id);
              setOpportunities(prev =>
                prev.filter(opp => opp.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    setSubscription(sub);
  }, [subscription]);

  const unsubscribeFromOpportunities = useCallback(() => {
    if (subscription) {
      logger.log('🔕 Desconectando subscription...');
      supabase.removeChannel(subscription);
      setSubscription(null);
    }
  }, [subscription]);

  // ===================================================
  // ⚡ EFEITOS DE INICIALIZAÇÃO
  // ===================================================
  useEffect(() => {
    // Set loading to false immediately - don't block UI
    setLoading(false);

    // Load opportunities asynchronously (non-blocking)
    loadOpportunities().catch(err => {
      logger.error('❌ Erro ao carregar oportunidades inicial:', err);
    });
  }, [loadOpportunities]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Load user applications asynchronously (non-blocking)
      loadUserApplications().catch(err => {
        logger.error('❌ Erro ao carregar candidaturas inicial:', err);
      });
    }
  }, [loadUserApplications, isAuthenticated, user]);

  useEffect(() => {
    // Delay real-time subscription by 2 seconds to prioritize initial load
    const timeoutId = setTimeout(() => {
      logger.log('🔔 Iniciando subscription real-time após delay...');
      subscribeToOpportunities();
    }, 2000);

    // Cleanup quando componente desmonta
    return () => {
      clearTimeout(timeoutId);
      unsubscribeFromOpportunities();
    };
  }, [subscribeToOpportunities, unsubscribeFromOpportunities]);

  // ===================================================
  // 📝 FUNÇÕES PÚBLICAS
  // ===================================================
  const refreshOpportunities = async (): Promise<void> => {
    await loadOpportunities();
  };

  const getUserApplications = async (): Promise<void> => {
    await loadUserApplications();
  };

  return (
    <OpportunitiesContext.Provider value={{
      // Estado
      opportunities,
      userApplications,
      loading,
      error,
      stats,
      
      // Ações para oportunidades
      refreshOpportunities,
      createOpportunity,
      updateOpportunity,
      deleteOpportunity,
      getOpportunityById,
      
      // Ações para candidaturas
      applyToOpportunity,
      getUserApplications,
      checkUserApplication,
      
      // Filtros
      filterOpportunities,
      
      // Real-time
      subscribeToOpportunities,
      unsubscribeFromOpportunities
    }}>
      {children}
    </OpportunitiesContext.Provider>
  );
};

// ===================================================
// 🪝 HOOK PERSONALIZADO
// ===================================================
export const useOpportunities = () => {
  const context = useContext(OpportunitiesContext);
  if (!context) {
    throw new Error('useOpportunities deve ser usado dentro de um OpportunitiesProvider');
  }
  return context;
};

// ===================================================
// 📋 DADOS DE EXEMPLO (FALLBACK)
// ===================================================
const getExampleOpportunities = (): Opportunity[] => {
  return [
    {
      id: 'example-1',
      title: 'Programa de Intercâmbio Médico Luanda',
      description: 'Programa de intercâmbio para médicos especializarem-se em cardiologia e medicina interna com hospitais de referência em Luanda.',
      country: 'Angola',
      sector: 'Saúde',
      type: 'education',
      organization: 'Hospital Geral de Luanda',
      location: 'Luanda, Maianga',
      budget: 35000,
      deadline: '2024-08-15',
      requirements: ['Diploma em Medicina', '2+ anos de experiência', 'Português fluente'],
      status: 'active',
      featured: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=200&fit=crop&crop=center',
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 'example-2',
      title: 'Centro de Formação Técnica Benguela',
      description: 'Projeto para criar centro de formação técnica em mecânica e eletricidade para jovens da região de Benguela.',
      country: 'Angola',
      sector: 'Educação',
      type: 'project',
      organization: 'Instituto Técnico de Benguela',
      location: 'Benguela, Centro',
      budget: 80000,
      deadline: '2024-09-10',
      requirements: ['Experiência em educação técnica', 'Conhecimento local', 'Gestão de projetos'],
      status: 'active',
      featured: true,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop&crop=center',
      created_at: '2024-02-01T00:00:00Z'
    },
    {
      id: 'example-3',
      title: 'Parcerias Turísticas Namíbia-Angola',
      description: 'Oportunidade de parceria para desenvolvimento de roteiros turísticos entre Namíbia e Angola.',
      country: 'Namíbia',
      sector: 'Turismo',
      type: 'partnership',
      organization: 'Namibia Tourism Board',
      location: 'Windhoek',
      budget: 45000,
      deadline: '2024-07-30',
      requirements: ['Experiência em turismo', 'Conhecimento regional', 'Capacidade de investimento'],
      status: 'active',
      featured: false,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop&crop=center',
      created_at: '2024-03-10T00:00:00Z'
    },
    {
      id: 'example-4',
      title: 'Investimento em Tecnologia Cape Town',
      description: 'Oportunidade de financiamento para startups de tecnologia com foco em soluções para África.',
      country: 'África do Sul',
      sector: 'Tecnologia',
      type: 'funding',
      organization: 'Cape Town Tech Hub',
      location: 'Cape Town, CBD',
      budget: 120000,
      deadline: '2024-08-20',
      requirements: ['Startup registrada', 'MVP desenvolvido', 'Foco em África'],
      status: 'active',
      featured: true,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center',
      created_at: '2024-03-20T00:00:00Z'
    },
    {
      id: 'example-5',
      title: 'Transporte Regional SADC',
      description: 'Projeto de melhoria da rede de transportes entre países da SADC com foco em sustentabilidade.',
      country: 'Angola',
      sector: 'Transporte',
      type: 'project',
      organization: 'SADC Transport Commission',
      location: 'Luanda',
      budget: 200000,
      deadline: '2024-09-15',
      requirements: ['Experiência em logística', 'Conhecimento SADC', 'Sustentabilidade'],
      status: 'active',
      featured: false,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=200&fit=crop&crop=center',
      created_at: '2024-04-01T00:00:00Z'
    }
  ];
};

export default OpportunitiesContext;