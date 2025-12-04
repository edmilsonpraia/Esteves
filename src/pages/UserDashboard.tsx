import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation, LanguageToggle } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';
import { useOpportunities } from '../context/OpportunitiesContext';
import { supabase } from '../lib/supabase';
import LazyImage from '../components/LazyImage';

interface Opportunity {
  id: string;
  title: string;
  country: string;
  sector: string;
  type: string;
  organization: string;
  deadline: string;
  description: string;
  budget?: number;
  requirements: string[];
  status: string;
  image: string;
  featured: boolean;
  location?: string;
  created_at: string;
  user_id?: string;
}

// Removida interface Application não usada

interface ServiceRequest {
  id?: string;
  user_id: string;
  service_type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at?: string;
}

interface Connection {
  id: string;
  user_id: string;
  connected_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  connected_user?: {
    full_name: string;
    avatar_url?: string;
    sector?: string;
    country?: string;
    organization?: string;
  };
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');

  // Consolidar todos os modais em um único estado (otimização de performance)
  const [modals, setModals] = useState({
    services: false,
    education: false,
    health: false,
    commerce: false,
    tourism: false,
    transport: false,
    guides: false,
    requestForm: false,
    connections: false
  });

  const [selectedServiceForRequest, setSelectedServiceForRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [connections, setConnections] = useState<Connection[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const { t, language } = useTranslation();
  const { user } = useAuth();

  const {
    opportunities,
    userApplications: applications,
    loading: opportunitiesLoading,
    // stats, // Removido - não usado
    applyToOpportunity,
    filterOpportunities,
    checkUserApplication
    // refreshOpportunities // Removido - não usado
  } = useOpportunities();

  // Helper para abrir modal (memorizado)
  const openModal = useCallback((modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  }, []);

  // Helper para fechar modal (memorizado)
  const closeModal = useCallback((modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  }, []);

  // Fechar todos os modais (memorizado)
  const closeAllModals = useCallback(() => {
    setModals({
      services: false,
      education: false,
      health: false,
      commerce: false,
      tourism: false,
      transport: false,
      guides: false,
      requestForm: false,
      connections: false
    });
  }, []);

  // Carregar perfil do usuário (memorizado)
  const loadUserProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erro ao carregar perfil:', error);
        setUserProfile({
          full_name: user.email?.split('@')[0] || t('user.defaultName'),
          email: user.email,
          role: 'user'
        });
        return;
      }

      setUserProfile(data);

      if (process.env.NODE_ENV === 'development') {
        console.log('Perfil do usuário carregado:', data);

        if (data?.role === 'admin' || data?.role === 'administrator') {
          console.log('Usuário admin detectado no UserDashboard');
        }
      }

      setFormData(prev => ({
        ...prev,
        name: data?.full_name || user.email?.split('@')[0] || '',
        email: data?.email || user.email || ''
      }));
    } catch (err) {
      console.error('Erro inesperado ao carregar perfil:', err);
      setUserProfile({
        full_name: user.email?.split('@')[0] || t('user.defaultName'),
        email: user.email,
        role: 'user'
      });
    }
  }, [user, t]);

  // Carregar conexões do usuário (memorizado)
  const loadUserConnections = useCallback(async () => {
    if (!user) return;

    try {
      // Tentar carregar conexões com JOIN
      const { data, error } = await supabase
        .from('connections')
        .select(`
          *,
          connected_user:profiles!connected_user_id(
            full_name,
            avatar_url,
            sector,
            country,
            organization
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'accepted')
        .order('created_at', { ascending: false });

      if (error) {
        // Se falhar, tentar sem JOIN (fallback)
        console.warn('JOIN falhou, usando fallback:', error.message);
        const { data: simpleData, error: simpleError } = await supabase
          .from('connections')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'accepted')
          .order('created_at', { ascending: false });

        if (simpleError) {
          console.error('Erro ao carregar conexões:', simpleError);
          return;
        }

        setConnections(simpleData || []);
        return;
      }

      setConnections(data || []);
    } catch (err) {
      console.error('Erro ao carregar conexões:', err);
    }
  }, [user]);

  // Carregar dados iniciais (memorizado)
  const loadInitialData = useCallback(async () => {
    try {
      await Promise.all([
        loadUserProfile(),
        loadUserConnections()
      ]);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError(t('common.error'));
    }
  }, [t, loadUserProfile, loadUserConnections]);

  // Carregar dados iniciais ao montar
  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user, loadInitialData]);

  // Candidatar a uma oportunidade
  const handleApplyToOpportunity = async (opportunityId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      await applyToOpportunity(opportunityId);
      alert(t('opportunities.applySuccess'));
    } catch (err: any) {
      console.error('Erro ao candidatar:', err);
      alert(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  // Enviar solicitação de serviço
  const handleSubmitRequest = async () => {
    if (!user || !formData.name || !formData.email || !formData.phone || !formData.message) {
      alert(t('login.errors.fillAllFields'));
      return;
    }

    setLoading(true);
    try {
      const serviceRequest: ServiceRequest = {
        user_id: user.id,
        service_type: selectedServiceForRequest,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        status: 'pending'
      };

      const { error } = await supabase
        .from('service_requests')
        .insert([serviceRequest])
        .select()
        .single();

      if (error) throw error;

      alert(t('services.success'));
      closeRequestForm();
    } catch (err) {
      console.error('Erro ao enviar solicitação:', err);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  // Salvar oportunidade (favoritos)
  const saveOpportunity = async (opportunityId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('saved_opportunities')
        .insert([
          {
            user_id: user.id,
            opportunity_id: opportunityId
          }
        ]);

      if (error) throw error;
      alert(t('opportunities.save'));
    } catch (err) {
      console.error('Erro ao salvar oportunidade:', err);
      alert(t('common.error'));
    }
  };

  // Filtrar oportunidades
  const filteredOpportunities = filterOpportunities({
    country: selectedCountry,
    sector: selectedSector
  });

  const countries = [t('country.angola'), t('country.namibia'), t('country.southAfrica')];
  const sectors = [t('sector.health'), t('sector.education'), t('sector.tourism'), t('sector.commerce'), t('sector.transport'), t('sector.technology')];

  const getCountryFlag = (country: string) => {
    const flags = {
      [t('country.angola')]: '🇦🇴',
      [t('country.namibia')]: '🇳🇦',
      [t('country.southAfrica')]: '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const getSectorIcon = (sector: string) => {
    const icons = {
      [t('sector.health')]: '🏥',
      [t('sector.education')]: '🎓',
      [t('sector.tourism')]: '🏨',
      [t('sector.commerce')]: '🛒',
      [t('sector.transport')]: '✈️',
      [t('sector.technology')]: '💻'
    };
    return icons[sector as keyof typeof icons] || '💼';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'project': '🚀',
      'partnership': '🤝',
      'funding': '💰',
      'education': '📚'
    };
    return icons[type as keyof typeof icons] || '📋';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'project': 'bg-blue-100 text-blue-800',
      'partnership': 'bg-green-100 text-green-800',
      'funding': 'bg-purple-100 text-purple-800',
      'education': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'project': t('project.type.project'),
      'partnership': t('project.type.partnership'),
      'funding': t('project.type.funding'),
      'education': t('project.type.education')
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getApplicationStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getApplicationStatusLabel = (status: string) => {
    const labels = {
      'pending': t('applications.status.pending'),
      'approved': t('applications.status.approved'),
      'rejected': t('applications.status.rejected')
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getApplicationStatusIcon = (status: string) => {
    const icons = {
      'pending': '⏳',
      'approved': '✅',
      'rejected': '❌'
    };
    return icons[status as keyof typeof icons] || '📋';
  };

  // Funções auxiliares
  const openServicesModal = useCallback(() => {
    openModal('services');
  }, [openModal]);

  const openEducationModal = useCallback(() => {
    openModal('education');
  }, [openModal]);

  const openHealthModal = useCallback(() => {
    openModal('health');
  }, [openModal]);

  const openCommerceModal = useCallback(() => {
    openModal('commerce');
  }, [openModal]);

  const openTourismModal = useCallback(() => {
    openModal('tourism');
  }, [openModal]);

  const openTransportModal = useCallback(() => {
    openModal('transport');
  }, [openModal]);

  const openGuidesModal = useCallback(() => {
    openModal('guides');
  }, [openModal]);

  const openConnectionsModal = useCallback(() => {
    openModal('connections');
  }, [openModal]);

  const openRequestForm = useCallback((serviceType: string) => {
    setSelectedServiceForRequest(serviceType);
    openModal('requestForm');
    // Fechar todos os outros modais de serviços
    closeModal('services');
    closeModal('education');
    closeModal('health');
    closeModal('commerce');
    closeModal('tourism');
    closeModal('transport');
    closeModal('guides');
  }, [openModal, closeModal]);

  const closeRequestForm = useCallback(() => {
    closeModal('requestForm');
    setSelectedServiceForRequest('');
    setFormData(prev => ({
      ...prev,
      phone: '',
      message: ''
    }));
  }, [closeModal]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Estatísticas do usuário
  const userStats = [
    { 
      icon: '🎓', 
      count: applications.filter(app => app.opportunity?.sector === t('sector.education')).length, 
      label: t('sector.education'), 
      color: 'text-blue-600',
      onClick: () => openEducationModal()
    },
    { 
      icon: '🏥', 
      count: applications.filter(app => app.opportunity?.sector === t('sector.health')).length, 
      label: t('sector.health'), 
      color: 'text-green-600',
      onClick: () => openHealthModal()
    },
    { 
      icon: '🛒', 
      count: applications.filter(app => app.opportunity?.sector === t('sector.commerce')).length, 
      label: t('sector.commerce'), 
      color: 'text-purple-600',
      onClick: () => openCommerceModal()
    },
    { 
      icon: '🏨', 
      count: applications.filter(app => app.opportunity?.sector === t('sector.tourism')).length, 
      label: t('sector.tourism'), 
      color: 'text-orange-600',
      onClick: () => openTourismModal()
    },
    { 
      icon: '📍', 
      count: 8, 
      label: t('services.guides'), 
      color: 'text-teal-600',
      onClick: () => openGuidesModal()
    },
    { 
      icon: '✈️', 
      count: applications.filter(app => app.opportunity?.sector === t('sector.transport')).length, 
      label: t('sector.transport'), 
      color: 'text-indigo-600',
      onClick: () => openTransportModal()
    },
    { 
      icon: '🤝', 
      count: connections.length, 
      label: t('network.myConnections'), 
      color: 'text-red-600',
      onClick: () => openConnectionsModal()
    }
  ];

  // Loading
  if (opportunitiesLoading && !opportunities.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('user.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aviso para Admins */}
      {(userProfile?.role === 'admin' || userProfile?.role === 'administrator') && (
        <div className="bg-blue-600 text-white px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span>👨‍💼</span>
            <span className="font-medium">{t('user.adminNotice')}</span>
            <button 
              onClick={() => console.log('Redirecionar para AdminDashboard')}
              className="bg-white bg-opacity-20 px-3 py-1 rounded-lg text-sm hover:bg-opacity-30 transition-colors ml-2"
            >
              {t('user.goToAdmin')} →
            </button>
          </div>
        </div>
      )}

      {/* Header Simplificado Mobile */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-lg font-bold">{t('user.welcome')}, {userProfile?.full_name || t('user.defaultName')}! 👋</h1>
            <p className="text-sm text-red-100 opacity-90">{userProfile?.organization || t('user.communityMember')}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                {getCountryFlag(userProfile?.country || '')} {userProfile?.country || 'Região'}
              </span>
              {userProfile?.sector && (
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {getSectorIcon(userProfile.sector)} {userProfile.sector}
                </span>
              )}
            </div>
          </div>
          
          {/* Seletor de Idioma e Notificações */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button className="bg-white bg-opacity-20 text-white p-3 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9a6 6 0 10-12 0v3l-5 5h5m7 0v1a3 3 0 01-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Botão de Ação Principal */}
        <button 
          onClick={() => setActiveTab('opportunities')}
          className="w-full bg-white bg-opacity-20 text-white py-3 px-4 rounded-lg text-sm font-medium backdrop-blur-sm hover:bg-opacity-30 transition-colors"
        >
          🚀 {t('user.exploreOpportunities')}
        </button>
      </div>

      {/* Estatísticas em Grid Mobile */}
      <div className="p-4 -mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            {userStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={stat.onClick}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-xl font-bold ${stat.color} mb-1`}>{stat.count}</div>
                <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navegação por Abas Mobile */}
      <div className="bg-white border-t border-gray-200 sticky top-0 z-40">
        <div className="flex overflow-x-auto">
          {[
            { id: 'opportunities', name: t('tabs.opportunities'), icon: '🚀' },
            { id: 'applications', name: t('tabs.applications'), icon: '📋' },
            { id: 'network', name: t('tabs.network'), icon: '🌍' },
            { id: 'resources', name: t('tabs.resources'), icon: '📚' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs">{tab.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo das Abas */}
      <div className="px-4 py-4">
        {/* Aba de Oportunidades */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            {/* Filtros Mobile */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🌍 {t('opportunities.title')}</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">🌍 {t('opportunities.allCountries')}</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {getCountryFlag(country)} {country}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">💼 {t('opportunities.allSectors')}</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {getSectorIcon(sector)} {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensagem se não há oportunidades */}
              {filteredOpportunities.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-600 mb-4">{t('opportunities.noResults')}</p>
                  <button 
                    onClick={() => {
                      setSelectedCountry('all');
                      setSelectedSector('all');
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    {t('opportunities.clearFilters')}
                  </button>
                </div>
              )}

              {/* Lista de Oportunidades Mobile */}
              <div className="space-y-3">
                {filteredOpportunities.map((opportunity) => {
                  const userApplication = checkUserApplication(opportunity.id);
                  const hasApplied = !!userApplication;
                  
                  return (
                    <div key={opportunity.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex gap-3">
                        <LazyImage
                          src={opportunity.image}
                          alt={opportunity.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{opportunity.title}</h3>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{opportunity.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {getCountryFlag(opportunity.country)} {opportunity.country}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {getSectorIcon(opportunity.sector)} {opportunity.sector}
                            </span>
                            {opportunity.location && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                📍 {opportunity.location}
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded text-xs ${getTypeColor(opportunity.type)}`}>
                              {getTypeIcon(opportunity.type)} {getTypeLabel(opportunity.type)}
                            </span>
                          </div>
                          
                          {/* Mostrar status da candidatura */}
                          {hasApplied && (
                            <div className="mb-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(userApplication.status)}`}>
                                <span>{getApplicationStatusIcon(userApplication.status)}</span>
                                {getApplicationStatusLabel(userApplication.status)}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            {/* Botão de candidatura */}
                            {!hasApplied ? (
                              <button 
                                onClick={() => handleApplyToOpportunity(opportunity.id)}
                                disabled={loading}
                                className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-xs font-medium disabled:opacity-50"
                              >
                                {loading ? '...' : t('opportunities.apply')}
                              </button>
                            ) : (
                              <button 
                                disabled
                                className="flex-1 bg-gray-300 text-gray-600 py-1 px-3 rounded text-xs font-medium cursor-not-allowed"
                              >
                                ✅ {t('opportunities.applied')}
                              </button>
                            )}
                            <button 
                              onClick={() => saveOpportunity(opportunity.id)}
                              className="bg-gray-100 text-gray-700 py-1 px-3 rounded text-xs"
                            >
                              💾
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Aba de Candidaturas */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📋</span>
                {t('applications.title')} ({applications.length})
              </h2>
              
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📝</div>
                  <p className="text-gray-600 mb-4">{t('applications.noApplications')}</p>
                  <button 
                    onClick={() => setActiveTab('opportunities')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    {t('applications.exploreOpportunities')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((application) => (
                    <div key={application.id} className={`border rounded-lg p-3 ${
                      application.status === 'approved' ? 'bg-green-50 border-green-200' :
                      application.status === 'rejected' ? 'bg-red-50 border-red-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <img 
                          src={application.opportunity?.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center'}
                          alt={application.opportunity?.title || 'Oportunidade'}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900">{application.opportunity?.title}</h3>
                          <p className="text-xs text-gray-600">
                            {getCountryFlag(application.opportunity?.country || '')} {application.opportunity?.country} • {application.opportunity?.location}
                          </p>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getApplicationStatusColor(application.status)}`}>
                            <span>{getApplicationStatusIcon(application.status)}</span>
                            {getApplicationStatusLabel(application.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Aba de Rede Regional */}
        {activeTab === 'network' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌍</span>
                {t('network.title')}
              </h2>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇦🇴</div>
                  <div className="text-lg font-bold text-red-600">
                    {connections.filter(c => c.connected_user?.country === t('country.angola')).length}
                  </div>
                  <div className="text-xs text-gray-600">{t('country.angola')}</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇳🇦</div>
                  <div className="text-lg font-bold text-blue-600">
                    {connections.filter(c => c.connected_user?.country === t('country.namibia')).length}
                  </div>
                  <div className="text-xs text-gray-600">{t('country.namibia')}</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="text-lg font-bold text-green-600">
                    {connections.filter(c => c.connected_user?.country === t('country.southAfrica')).length}
                  </div>
                  <div className="text-xs text-gray-600">{t('country.southAfrica')}</div>
                </div>
              </div>

              {/* Conexões Recentes Mobile */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">👥 {t('network.myConnections')} ({connections.length})</h3>
                
                {connections.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🤝</div>
                    <p className="text-gray-600 mb-4">{t('network.noConnections')}</p>
                    <button 
                      onClick={() => openConnectionsModal()}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      {t('network.searchProfessionals')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {connections.slice(0, 5).map((connection) => (
                      <div key={connection.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                          alt={connection.connected_user?.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{connection.connected_user?.full_name}</h4>
                          <p className="text-xs text-gray-600">
                            {getSectorIcon(connection.connected_user?.sector || '')} {connection.connected_user?.sector} • {getCountryFlag(connection.connected_user?.country || '')} {connection.connected_user?.country}
                          </p>
                        </div>
                        <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">
                          💬
                        </button>
                      </div>
                    ))}
                    
                    {connections.length > 5 && (
                      <button 
                        onClick={() => openConnectionsModal()}
                        className="w-full text-center py-2 text-red-600 text-sm font-medium"
                      >
                        {t('network.viewAll')} ({connections.length})
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Aba de Recursos */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📚</span>
                {t('resources.title')}
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📖</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">{t('resources.sadcGuide')}</h3>
                      <p className="text-xs text-gray-600 mb-3">{t('resources.sadcGuideDesc')}</p>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                        📥 {t('resources.downloadPdf')}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🎓</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">{t('resources.onlineCourses')}</h3>
                      <p className="text-xs text-gray-600 mb-3">{t('resources.onlineCoursesDesc')}</p>
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                        🎯 {t('resources.viewCourses')}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💼</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">{t('resources.proposalTemplates')}</h3>
                      <p className="text-xs text-gray-600 mb-3">{t('resources.proposalTemplatesDesc')}</p>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium">
                        📄 {t('resources.download')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webinars Mobile */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">🎥 {t('resources.webinars')}</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <img 
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=120&fit=crop&crop=center"
                      alt="Webinar Saúde"
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Telemedicina na África Austral</h4>
                    <p className="text-xs text-gray-600 mb-2">Dr. António Silva • 45min</p>
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg text-xs font-medium">
                      ▶️ {t('resources.watch')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Educação */}
      {modals.education && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span>
                  <h2 className="text-lg font-bold">{t('education.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('education')}
                  className="text-white hover:text-blue-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-1">{t('education.subtitle')}</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('education.universities'))}
                >
                  🏫 {t('education.universities')}
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('education.highSchool'))}
                >
                  📚 {t('education.highSchool')}
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('education.technicalCourses'))}
                >
                  🔧 {t('education.technicalCourses')}
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('education.exchange'))}
                >
                  🌍 {t('education.exchange')}
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('education.certifications'))}
                >
                  📜 {t('education.certifications')}
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('education.scholarships'))}
                >
                  💰 {t('education.scholarships')}
                </button>
              </div>

              {/* Botão de Contato Urgente */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 mb-2 text-center">{t('education.urgentHelpQuestion')}</p>
                <a
                  href={`https://wa.me/+244924166401?text=${language === 'en' ? 'Hello! I need urgent help with Education services.' : 'Olá! Preciso de ajuda urgente com serviços de Educação.'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <span>📱</span>
                  <span>{t('education.contactUrgent')}</span>
                </a>
              </div>

              <button
                onClick={() => closeModal('education')}
                className="w-full mt-4 border border-blue-600 text-blue-600 py-3 rounded-lg font-medium text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Saúde */}
      {modals.health && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏥</span>
                  <h2 className="text-lg font-bold">{t('health.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('health')}
                  className="text-white hover:text-green-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-green-100 text-sm mt-1">{t('health.subtitle')}</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('health.regionalHospitals'))}
                >
                  🏥 {t('health.hospitals')}
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('health.specializedClinics'))}
                >
                  🩺 {t('health.clinics')}
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('health.telemedicine'))}
                >
                  💻 {t('health.telemedicine')}
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('health.healthInsurance'))}
                >
                  🛡️ {t('health.healthInsurance')}
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('health.pharmacies'))}
                >
                  💊 {t('health.pharmacies')}
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('health.emergencies'))}
                >
                  🚨 {t('health.emergencies')}
                </button>
              </div>

              {/* Botão de Contato Urgente */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 mb-2 text-center">{t('education.urgentHelpQuestion')}</p>
                <a
                  href={`https://wa.me/+244924166401?text=${language === 'en' ? 'Hello! I need urgent help with Health services.' : 'Olá! Preciso de ajuda urgente com serviços de Saúde.'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <span>📱</span>
                  <span>{t('education.contactUrgent')}</span>
                </a>
              </div>

              <button
                onClick={() => closeModal('health')}
                className="w-full mt-4 border border-green-600 text-green-600 py-3 rounded-lg font-medium text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Comércio */}
      {modals.commerce && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛒</span>
                  <h2 className="text-lg font-bold">{t('commerce.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('commerce')}
                  className="text-white hover:text-purple-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-purple-100 text-sm mt-1">{t('commerce.subtitle')}</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('commerce.importExport'))}
                >
                  📦 {t('commerce.importExport')}
                </button>
                <button
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('commerce.commercialLicenses'))}
                >
                  📋 {language === 'en' ? 'Licenses' : 'Licenças'}
                </button>
                <button
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('commerce.businessPartnerships'))}
                >
                  🤝 {language === 'en' ? 'Partnerships' : 'Parcerias'}
                </button>
                <button
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('commerce.suppliers'))}
                >
                  🏭 {t('commerce.suppliers')}
                </button>
                <button
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('commerce.fairsExhibitions'))}
                >
                  🎪 {language === 'en' ? 'Fairs' : 'Feiras'}
                </button>
                <button
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('commerce.businessConsulting'))}
                >
                  💼 {language === 'en' ? 'Consulting' : 'Consultoria'}
                </button>
              </div>

              {/* Botão de Contato Urgente */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 mb-2 text-center">{t('education.urgentHelpQuestion')}</p>
                <a
                  href={`https://wa.me/+244924166401?text=${language === 'en' ? 'Hello! I need urgent help with Commerce services.' : 'Olá! Preciso de ajuda urgente com serviços de Comércio.'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <span>📱</span>
                  <span>{t('education.contactUrgent')}</span>
                </a>
              </div>

              <button
                onClick={() => closeModal('commerce')}
                className="w-full mt-4 border border-purple-600 text-purple-600 py-3 rounded-lg font-medium text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Turismo */}
      {modals.tourism && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏨</span>
                  <h2 className="text-lg font-bold">{t('tourism.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('tourism')}
                  className="text-white hover:text-orange-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-orange-100 text-sm mt-1">{t('tourism.subtitle')}</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('tourism.hotelsInns'))}
                >
                  🏨 {language === 'en' ? 'Hotels' : 'Hotéis'}
                </button>
                <button
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('tourism.tourPackages'))}
                >
                  🎒 {language === 'en' ? 'Packages' : 'Pacotes'}
                </button>
                <button
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('tourism.visasDocumentation'))}
                >
                  📄 {language === 'en' ? 'Visas' : 'Vistos'}
                </button>
                <button
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('tourism.tourGuides'))}
                >
                  👨‍🏫 {language === 'en' ? 'Guides' : 'Guias'}
                </button>
                <button
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('tourism.activities'))}
                >
                  🎯 {t('tourism.activities')}
                </button>
                <button
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('tourism.travelInsurance'))}
                >
                  🛡️ {t('tourism.travelInsurance')}
                </button>
              </div>

              {/* Botão de Contato Urgente */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 mb-2 text-center">{t('education.urgentHelpQuestion')}</p>
                <a
                  href={`https://wa.me/+244924166401?text=${language === 'en' ? 'Hello! I need urgent help with Tourism services.' : 'Olá! Preciso de ajuda urgente com serviços de Turismo.'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <span>📱</span>
                  <span>{t('education.contactUrgent')}</span>
                </a>
              </div>

              <button
                onClick={() => closeModal('tourism')}
                className="w-full mt-4 border border-orange-600 text-orange-600 py-3 rounded-lg font-medium text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Transporte */}
      {modals.transport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✈️</span>
                  <h2 className="text-lg font-bold">{t('transport.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('transport')}
                  className="text-white hover:text-indigo-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-indigo-100 text-sm mt-1">{t('transport.subtitle')}</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('transport.regionalFlights'))}
                >
                  ✈️ {language === 'en' ? 'Flights' : 'Voos'}
                </button>
                <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('transport.transfersTaxis'))}
                >
                  🚗 {language === 'en' ? 'Transfers' : 'Transfers'}
                </button>
                <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('transport.carRental'))}
                >
                  🚙 {language === 'en' ? 'Rental' : 'Aluguel'}
                </button>
                <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('transport.publicTransport'))}
                >
                  🚌 {language === 'en' ? 'Public' : 'Público'}
                </button>
                <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('transport.cargoLogistics'))}
                >
                  📦 {language === 'en' ? 'Logistics' : 'Logística'}
                </button>
                <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('transport.vehicleDocumentation'))}
                >
                  📋 {language === 'en' ? 'Documentation' : 'Documentação'}
                </button>
              </div>

              {/* Botão de Contato Urgente */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 mb-2 text-center">{t('education.urgentHelpQuestion')}</p>
                <a
                  href={`https://wa.me/+244924166401?text=${language === 'en' ? 'Hello! I need urgent help with Transport services.' : 'Olá! Preciso de ajuda urgente com serviços de Transporte.'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <span>📱</span>
                  <span>{t('education.contactUrgent')}</span>
                </a>
              </div>

              <button
                onClick={() => closeModal('transport')}
                className="w-full mt-4 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Guias Locais */}
      {modals.guides && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <h2 className="text-lg font-bold">{t('guides.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('guides')}
                  className="text-white hover:text-teal-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-teal-100 text-sm mt-1">{t('guides.subtitle')}</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('guides.culturalKnowledge'))}
                >
                  🎭 {language === 'en' ? 'Cultural' : 'Cultural'}
                </button>
                <button
                  className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('guides.translation'))}
                >
                  🗣️ {t('guides.translation')}
                </button>
                <button
                  className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('guides.officialAccompaniment'))}
                >
                  👔 {language === 'en' ? 'Official' : 'Oficial'}
                </button>
                <button
                  className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('guides.localNetworking'))}
                >
                  🤝 Networking
                </button>
                <button
                  className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('guides.legalAdvisory'))}
                >
                  ⚖️ {language === 'en' ? 'Legal' : 'Jurídica'}
                </button>
                <button
                  className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => openRequestForm(t('guides.emergencySupport'))}
                >
                  🚨 {language === 'en' ? 'Emergency' : 'Emergencial'}
                </button>
              </div>

              {/* Botão de Contato Urgente */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 mb-2 text-center">{t('education.urgentHelpQuestion')}</p>
                <a
                  href={`https://wa.me/+244924166401?text=${language === 'en' ? 'Hello! I need urgent help with Local Guides.' : 'Olá! Preciso de ajuda urgente com Guias Locais.'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <span>📱</span>
                  <span>{t('education.contactUrgent')}</span>
                </a>
              </div>

              <button
                onClick={() => closeModal('guides')}
                className="w-full mt-4 border border-teal-600 text-teal-600 py-3 rounded-lg font-medium text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Serviços - Versão Compacta */}
      {modals.services && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <h2 className="text-lg font-bold">{t('services.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('services')}
                  className="text-white hover:text-red-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-red-100 text-sm mt-1">{t('services.subtitle')}</p>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-4">
              <div className="text-center mb-4">
                <p className="text-gray-700 font-medium">📱 {t('services.portal')}</p>
              </div>

              {/* Lista de Serviços */}
              <div className="space-y-3 mb-6">
                {[
                  { service: t('services.universities'), icon: '🏫', desc: 'UCT, Wits, UNAM, UAN' },
                  { service: t('services.hospitals'), icon: '🏥', desc: 'Rede hospitalar regional' },
                  { service: t('services.transport'), icon: '🚗', desc: 'Táxis e transfers regionais' },
                  { service: t('services.hotels'), icon: '🏨', desc: 'Hospedagem em toda região' },
                  { service: t('services.consulting'), icon: '💼', desc: 'Negócios e investimentos' },
                  { service: t('services.guides'), icon: '📍', desc: 'Conhecimento local expert' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.service}</p>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                        onClick={() => openRequestForm(item.service)}
                      >
                        {t('services.request')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Informações de Contacto */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🇦🇴</span>
                  <div>
                    <h4 className="font-bold text-red-900">{t('services.title')} - SEDE</h4>
                    <p className="text-xs text-red-700">NIF: 5002564580</p>
                  </div>
                </div>
                <div className="text-xs text-red-800 space-y-1 mb-4">
                  <p><strong>Zona Principal:</strong> Bairro Naipalala, Cunene/Ondjiva</p>
                  <p>📧 escritorioestevesemultisservic@gmail.com</p>
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href="https://wa.me/+244924166401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-green-600 transition-colors"
                  >
                    <span>📱</span>
                    <span>+244 924 166 401</span>
                  </a>
                  <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors">
                    <span>📘</span>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={() => closeModal('services')}
                className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-medium"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Conexões */}
      {modals.connections && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  <h2 className="text-lg font-bold">{t('network.title')}</h2>
                </div>
                <button
                  onClick={() => closeModal('connections')}
                  className="text-white hover:text-red-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-red-100 text-sm mt-1">{connections.length} profissionais conectados</p>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-4">
              {/* Estatísticas de Conexões */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇦🇴</div>
                  <div className="text-lg font-bold text-red-600">
                    {connections.filter(c => c.connected_user?.country === t('country.angola')).length}
                  </div>
                  <div className="text-xs text-gray-600">{t('country.angola')}</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇳🇦</div>
                  <div className="text-lg font-bold text-blue-600">
                    {connections.filter(c => c.connected_user?.country === t('country.namibia')).length}
                  </div>
                  <div className="text-xs text-gray-600">{t('country.namibia')}</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="text-lg font-bold text-green-600">
                    {connections.filter(c => c.connected_user?.country === t('country.southAfrica')).length}
                  </div>
                  <div className="text-xs text-gray-600">{t('country.southAfrica')}</div>
                </div>
              </div>

              {/* Lista de Todas as Conexões */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">👥 {t('network.myConnections')}</h3>
                
                {connections.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🤝</div>
                    <p className="text-gray-600 mb-4">{t('network.noConnections')}</p>
                    <p className="text-sm text-gray-500">Comece a conectar-se com profissionais da região</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {connections.map((connection) => (
                      <div key={connection.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=40&h=40&fit=crop&crop=face"
                          alt={connection.connected_user?.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{connection.connected_user?.full_name}</h4>
                          <p className="text-xs text-gray-600">
                            {getSectorIcon(connection.connected_user?.sector || '')} {connection.connected_user?.sector} • {getCountryFlag(connection.connected_user?.country || '')} {connection.connected_user?.country}
                          </p>
                          {connection.connected_user?.organization && (
                            <p className="text-xs text-gray-500">{connection.connected_user.organization}</p>
                          )}
                        </div>
                        <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                          💬
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium text-sm">
                  ➕ {t('network.addConnection')}
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium text-sm">
                  🔍 {t('network.searchProfessionals')}
                </button>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={() => closeModal('connections')}
                className="w-full mt-4 border border-red-600 text-red-600 py-3 rounded-lg font-medium text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Formulário de Solicitação */}
      {modals.requestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <h2 className="text-lg font-bold">{t('services.requestForm')}</h2>
                </div>
                <button
                  onClick={closeRequestForm}
                  className="text-white hover:text-red-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-red-100 text-sm mt-1">{t('services.serviceRequested')}: {selectedServiceForRequest}</p>
            </div>

            {/* Formulário */}
            <div className="p-4">
              <div className="space-y-4">
                {/* Campo Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('services.fullName')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={t('services.fullName')}
                  />
                </div>

                {/* Campo Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('login.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={t('login.form.emailPlaceholder')}
                  />
                </div>

                {/* Campo Telefone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('services.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+244 ou +27 ou +264"
                  />
                </div>

                {/* Campo Mensagem */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('services.details')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder={t('services.detailsPlaceholder')}
                  />
                </div>

                {/* Informação do Serviço */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-lg">ℹ️</span>
                    <div>
                      <p className="font-medium">{t('services.serviceRequested')}:</p>
                      <p className="text-red-600 font-semibold">{selectedServiceForRequest}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeRequestForm}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium text-sm disabled:opacity-50"
                >
                  {t('services.cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.message}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium text-sm disabled:opacity-50"
                >
                  {loading ? `📤 ${t('services.sending')}` : `📤 ${t('services.send')}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Mobile */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 mx-4 mb-4 rounded-xl p-6 text-white text-center">
        <h2 className="text-lg font-bold mb-3">🚀 {t('cta.expandNetwork')}</h2>
        <p className="text-sm text-red-100 mb-4">{t('cta.expandNetworkDesc')}</p>
        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('opportunities')}
            className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold text-sm"
          >
            🌍 {t('cta.exploreMore')}
          </button>
          <button 
            onClick={() => openConnectionsModal()}
            className="w-full border border-white text-white py-3 rounded-lg font-semibold text-sm"
          >
            👥 {t('cta.connectExperts')}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('common.processing')}</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <div className="flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;