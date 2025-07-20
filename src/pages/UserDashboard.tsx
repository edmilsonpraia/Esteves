import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';
import { useOpportunities } from '../context/OpportunitiesContext'; // ✅ NOVA IMPORTAÇÃO
import { supabase } from '../lib/supabase';

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

interface Application {
  id: string;
  opportunity_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  application_date: string;
  message?: string;
  opportunity?: Opportunity;
}

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
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedServiceForRequest, setSelectedServiceForRequest] = useState('');
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ SUBSTITUIR ESTADOS LOCAIS PELOS DO CONTEXT
  // const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  // const [applications, setApplications] = useState<Application[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const { t } = useTranslation();
  const { user } = useAuth();
  
  // ✅ USAR O CONTEXT DE OPORTUNIDADES
  const {
    opportunities,
    userApplications: applications,
    loading: opportunitiesLoading,
    stats,
    applyToOpportunity,
    filterOpportunities,
    checkUserApplication,
    refreshOpportunities
  } = useOpportunities();

  // Carregar dados iniciais
  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]);

  const loadInitialData = async () => {
    try {
      await Promise.all([
        loadUserProfile(),
        loadUserConnections()
      ]);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados. Tente novamente.');
    }
  };

  // Carregar perfil do usuário
  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erro ao carregar perfil:', error);
        // Se não conseguir carregar perfil, usar dados básicos do usuário
        setUserProfile({
          full_name: user.email?.split('@')[0] || 'Usuário',
          email: user.email,
          role: 'user' // assumir que é usuário normal se não conseguir verificar
        });
        return;
      }

      setUserProfile(data);
      
      // Log para debug
      console.log('Perfil do usuário carregado:', data);
      
      // VERIFICAÇÃO DE SEGURANÇA: Se for admin, mostrar aviso
      if (data?.role === 'admin' || data?.role === 'administrator') {
        console.log('Usuário admin detectado no UserDashboard');
        // Não redirecionar automaticamente, mas mostrar aviso
      }
      
      // Preencher formulário com dados do usuário
      setFormData(prev => ({
        ...prev,
        name: data?.full_name || user.email?.split('@')[0] || '',
        email: data?.email || user.email || ''
      }));
    } catch (err) {
      console.error('Erro inesperado ao carregar perfil:', err);
      // Fallback para usuário básico
      setUserProfile({
        full_name: user.email?.split('@')[0] || 'Usuário',
        email: user.email,
        role: 'user'
      });
    }
  };

  // Carregar conexões do usuário
  const loadUserConnections = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('connections')
      .select(`
        *,
        connected_user:profiles!connections_connected_user_id_fkey(
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
      console.error('Erro ao carregar conexões:', error);
      return;
    }

    setConnections(data || []);
  };

  // ✅ CANDIDATAR A UMA OPORTUNIDADE - USAR FUNÇÃO DO CONTEXT
  const handleApplyToOpportunity = async (opportunityId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      await applyToOpportunity(opportunityId);
      alert('Candidatura enviada com sucesso! 🎉');
    } catch (err: any) {
      console.error('Erro ao candidatar:', err);
      alert(err.message || 'Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Enviar solicitação de serviço
  const handleSubmitRequest = async () => {
    if (!user || !formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Preencha todos os campos obrigatórios');
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

      const { data, error } = await supabase
        .from('service_requests')
        .insert([serviceRequest])
        .select()
        .single();

      if (error) throw error;

      alert('Solicitação enviada com sucesso! Entraremos em contacto em breve.');
      closeRequestForm();
    } catch (err) {
      console.error('Erro ao enviar solicitação:', err);
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Salvar oportunidade (favoritos)
  const saveOpportunity = async (opportunityId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_opportunities')
        .insert([
          {
            user_id: user.id,
            opportunity_id: opportunityId
          }
        ]);

      if (error) throw error;
      alert('Oportunidade salva!');
    } catch (err) {
      console.error('Erro ao salvar oportunidade:', err);
      alert('Erro ao salvar oportunidade.');
    }
  };

  // ✅ FILTRAR OPORTUNIDADES - USAR FUNÇÃO DO CONTEXT
  const filteredOpportunities = filterOpportunities({
    country: selectedCountry,
    sector: selectedSector
  });

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia'];

  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const getSectorIcon = (sector: string) => {
    const icons = {
      'Saúde': '🏥',
      'Educação': '🎓',
      'Turismo': '🏨',
      'Comércio': '🛒',
      'Transporte': '✈️',
      'Tecnologia': '💻'
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
      'project': 'Projeto',
      'partnership': 'Parceria',
      'funding': 'Financiamento',
      'education': 'Educação'
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
      'pending': 'Em Análise',
      'approved': 'Aprovada',
      'rejected': 'Rejeitada'
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
  const openServicesModal = (service: string) => {
    setSelectedService(service);
    setShowServicesModal(true);
  };

  const openConnectionsModal = () => {
    setShowConnectionsModal(true);
  };

  const openRequestForm = (serviceType: string) => {
    setSelectedServiceForRequest(serviceType);
    setShowRequestForm(true);
    setShowServicesModal(false);
  };

  const closeRequestForm = () => {
    setShowRequestForm(false);
    setSelectedServiceForRequest('');
    setFormData(prev => ({
      ...prev,
      phone: '',
      message: ''
    }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ ESTATÍSTICAS DO USUÁRIO - USAR DADOS DO CONTEXT
  const userStats = [
    { 
      icon: '🎓', 
      count: applications.filter(app => app.opportunity?.sector === 'Educação').length, 
      label: 'Educação', 
      color: 'text-blue-600',
      onClick: () => openServicesModal('education')
    },
    { 
      icon: '🏥', 
      count: applications.filter(app => app.opportunity?.sector === 'Saúde').length, 
      label: 'Saúde', 
      color: 'text-green-600',
      onClick: () => openServicesModal('health')
    },
    { 
      icon: '🛒', 
      count: applications.filter(app => app.opportunity?.sector === 'Comércio').length, 
      label: 'Comércio', 
      color: 'text-purple-600',
      onClick: () => openServicesModal('commerce')
    },
    { 
      icon: '🏨', 
      count: applications.filter(app => app.opportunity?.sector === 'Turismo').length, 
      label: 'Turismo', 
      color: 'text-orange-600',
      onClick: () => openServicesModal('tourism')
    },
    { 
      icon: '📍', 
      count: 8, 
      label: 'Guias Locais', 
      color: 'text-teal-600',
      onClick: () => openServicesModal('guides')
    },
    { 
      icon: '✈️', 
      count: applications.filter(app => app.opportunity?.sector === 'Transporte').length, 
      label: 'Transporte', 
      color: 'text-indigo-600',
      onClick: () => openServicesModal('transport')
    },
    { 
      icon: '🤝', 
      count: connections.length, 
      label: 'Conexões', 
      color: 'text-red-600',
      onClick: () => openConnectionsModal()
    }
  ];

  // ✅ LOADING - USAR LOADING DO CONTEXT
  if (opportunitiesLoading && !opportunities.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
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
            <span className="font-medium">Você está logado como Administrador.</span>
            <button 
              onClick={() => console.log('Redirecionar para AdminDashboard')}
              className="bg-white bg-opacity-20 px-3 py-1 rounded-lg text-sm hover:bg-opacity-30 transition-colors ml-2"
            >
              Ir para Painel Admin →
            </button>
          </div>
        </div>
      )}

      {/* Header Simplificado Mobile */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-lg font-bold">Bem-vindo, {userProfile?.full_name || 'Usuário'}! 👋</h1>
            <p className="text-sm text-red-100 opacity-90">{userProfile?.organization || 'Membro da comunidade SADC'}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                {getCountryFlag(userProfile?.country || '')} {userProfile?.country || 'SADC'}
              </span>
              {userProfile?.sector && (
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {getSectorIcon(userProfile.sector)} {userProfile.sector}
                </span>
              )}
            </div>
          </div>
          
          {/* Botão de Notificações */}
          <button className="bg-white bg-opacity-20 text-white p-3 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9a6 6 0 10-12 0v3l-5 5h5m7 0v1a3 3 0 01-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
        
        {/* Botão de Ação Principal */}
        <button 
          onClick={() => setActiveTab('opportunities')}
          className="w-full bg-white bg-opacity-20 text-white py-3 px-4 rounded-lg text-sm font-medium backdrop-blur-sm hover:bg-opacity-30 transition-colors"
        >
          🚀 Explorar Oportunidades SADC
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
            { id: 'opportunities', name: 'Oportunidades', icon: '🚀' },
            { id: 'applications', name: 'Candidaturas', icon: '📋' },
            { id: 'network', name: 'Rede Regional', icon: '🌍' },
            { id: 'resources', name: 'Recursos', icon: '📚' }
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">🌍 Oportunidades Regionais SADC</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">🌍 Todos os Países</option>
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
                  <option value="all">💼 Todos os Sectores</option>
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
                  <p className="text-gray-600 mb-4">Nenhuma oportunidade encontrada</p>
                  <button 
                    onClick={() => {
                      setSelectedCountry('all');
                      setSelectedSector('all');
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}

              {/* Lista de Oportunidades Mobile */}
              <div className="space-y-3">
                {filteredOpportunities.map((opportunity) => {
                  // ✅ VERIFICAR SE JÁ SE CANDIDATOU - USAR FUNÇÃO DO CONTEXT
                  const userApplication = checkUserApplication(opportunity.id);
                  const hasApplied = !!userApplication;
                  
                  return (
                    <div key={opportunity.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex gap-3">
                        <img 
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
                          
                          {/* ✅ MOSTRAR STATUS DA CANDIDATURA */}
                          {hasApplied && (
                            <div className="mb-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(userApplication.status)}`}>
                                <span>{getApplicationStatusIcon(userApplication.status)}</span>
                                {getApplicationStatusLabel(userApplication.status)}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            {/* ✅ BOTÃO DE CANDIDATURA - USAR FUNÇÃO DO CONTEXT */}
                            {!hasApplied ? (
                              <button 
                                onClick={() => handleApplyToOpportunity(opportunity.id)}
                                disabled={loading}
                                className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-xs font-medium disabled:opacity-50"
                              >
                                {loading ? '...' : 'Candidatar'}
                              </button>
                            ) : (
                              <button 
                                disabled
                                className="flex-1 bg-gray-300 text-gray-600 py-1 px-3 rounded text-xs font-medium cursor-not-allowed"
                              >
                                ✅ Candidatou-se
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
                Minhas Candidaturas ({applications.length})
              </h2>
              
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📝</div>
                  <p className="text-gray-600 mb-4">Ainda não tem candidaturas</p>
                  <button 
                    onClick={() => setActiveTab('opportunities')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Explorar Oportunidades
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
                Rede Regional SADC
              </h2>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇦🇴</div>
                  <div className="text-lg font-bold text-red-600">
                    {connections.filter(c => c.connected_user?.country === 'Angola').length}
                  </div>
                  <div className="text-xs text-gray-600">Angola</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇳🇦</div>
                  <div className="text-lg font-bold text-blue-600">
                    {connections.filter(c => c.connected_user?.country === 'Namíbia').length}
                  </div>
                  <div className="text-xs text-gray-600">Namíbia</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="text-lg font-bold text-green-600">
                    {connections.filter(c => c.connected_user?.country === 'África do Sul').length}
                  </div>
                  <div className="text-xs text-gray-600">África do Sul</div>
                </div>
              </div>

              {/* Conexões Recentes Mobile */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">👥 Minhas Conexões ({connections.length})</h3>
                
                {connections.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🤝</div>
                    <p className="text-gray-600 mb-4">Ainda não tem conexões</p>
                    <button 
                      onClick={() => openConnectionsModal()}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Buscar Profissionais
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
                        Ver todas as conexões ({connections.length})
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
                Recursos SADC
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📖</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Guia SADC de Oportunidades</h3>
                      <p className="text-xs text-gray-600 mb-3">Manual completo sobre oportunidades regionais na área da saúde, educação e negócios.</p>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                        📥 Descarregar PDF
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🎓</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Cursos Online Regionais</h3>
                      <p className="text-xs text-gray-600 mb-3">Acesso a cursos especializados oferecidos por universidades da região SADC.</p>
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                        🎯 Ver Cursos
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💼</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Modelos de Propostas</h3>
                      <p className="text-xs text-gray-600 mb-3">Templates para candidaturas a oportunidades regionais.</p>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium">
                        📄 Descarregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webinars Mobile */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">🎥 Webinars Regionais</h3>
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
                      ▶️ Assistir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Serviços - Versão Compacta */}
      {showServicesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <h2 className="text-lg font-bold">AFRICA'S HANDS</h2>
                </div>
                <button
                  onClick={() => setShowServicesModal(false)}
                  className="text-white hover:text-red-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-red-100 text-sm mt-1">Serviços especializados para a região SADC</p>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-4">
              <div className="text-center mb-4">
                <p className="text-gray-700 font-medium">📱 Portal para Angola, Namíbia e África do Sul</p>
              </div>

              {/* Lista de Serviços */}
              <div className="space-y-3 mb-6">
                {[
                  { service: 'Universidades Regionais', icon: '🏫', desc: 'UCT, Wits, UNAM, UAN' },
                  { service: 'Hospitais Certificados', icon: '🏥', desc: 'Rede hospitalar SADC' },
                  { service: 'Transportes Seguros', icon: '🚗', desc: 'Táxis e transfers regionais' },
                  { service: 'Hotéis e Acomodações', icon: '🏨', desc: 'Hospedagem em toda região' },
                  { service: 'Consultoria Empresarial', icon: '💼', desc: 'Negócios e investimentos' },
                  { service: 'Guias Especializados', icon: '📍', desc: 'Conhecimento local expert' }
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
                        Solicitar
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
                    <h4 className="font-bold text-red-900">AFRICA'S HANDS - SEDE</h4>
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
                onClick={() => setShowServicesModal(false)}
                className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Conexões */}
      {showConnectionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  <h2 className="text-lg font-bold">Rede de Conexões SADC</h2>
                </div>
                <button
                  onClick={() => setShowConnectionsModal(false)}
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
                    {connections.filter(c => c.connected_user?.country === 'Angola').length}
                  </div>
                  <div className="text-xs text-gray-600">Angola</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇳🇦</div>
                  <div className="text-lg font-bold text-blue-600">
                    {connections.filter(c => c.connected_user?.country === 'Namíbia').length}
                  </div>
                  <div className="text-xs text-gray-600">Namíbia</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="text-lg font-bold text-green-600">
                    {connections.filter(c => c.connected_user?.country === 'África do Sul').length}
                  </div>
                  <div className="text-xs text-gray-600">África do Sul</div>
                </div>
              </div>

              {/* Lista de Todas as Conexões */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">👥 Todas as Suas Conexões</h3>
                
                {connections.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🤝</div>
                    <p className="text-gray-600 mb-4">Ainda não tem conexões</p>
                    <p className="text-sm text-gray-500">Comece a conectar-se com profissionais da região SADC</p>
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
                  ➕ Adicionar Nova Conexão
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium text-sm">
                  🔍 Buscar Profissionais
                </button>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={() => setShowConnectionsModal(false)}
                className="w-full mt-4 border border-red-600 text-red-600 py-3 rounded-lg font-medium text-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Formulário de Solicitação */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <h2 className="text-lg font-bold">Solicitação de Serviço</h2>
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
              <p className="text-red-100 text-sm mt-1">Serviço: {selectedServiceForRequest}</p>
            </div>

            {/* Formulário */}
            <div className="p-4">
              <div className="space-y-4">
                {/* Campo Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                {/* Campo Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Digite seu email"
                  />
                </div>

                {/* Campo Telefone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
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
                    Detalhes da Solicitação *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Descreva sua necessidade, localização preferida, datas, etc..."
                  />
                </div>

                {/* Informação do Serviço */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-lg">ℹ️</span>
                    <div>
                      <p className="font-medium">Serviço solicitado:</p>
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
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.message}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium text-sm disabled:opacity-50"
                >
                  {loading ? '📤 Enviando...' : '📤 Enviar Solicitação'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Mobile */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 mx-4 mb-4 rounded-xl p-6 text-white text-center">
        <h2 className="text-lg font-bold mb-3">🚀 Expanda sua Rede Regional</h2>
        <p className="text-sm text-red-100 mb-4">Conecte-se com profissionais de Angola, Namíbia e África do Sul para crescer juntos.</p>
        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('opportunities')}
            className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold text-sm"
          >
            🌍 Explorar Mais Oportunidades
          </button>
          <button 
            onClick={() => openConnectionsModal()}
            className="w-full border border-white text-white py-3 rounded-lg font-semibold text-sm"
          >
            👥 Conectar com Especialistas
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processando...</p>
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