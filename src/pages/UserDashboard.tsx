import React, { useState } from 'react';

interface Opportunity {
  id: number;
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
}

interface UserProfile {
  name: string;
  country: string;
  sector: string;
  organization: string;
  verified: boolean;
  avatar: string;
}

const UserDashboardComplete: React.FC = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');

  // Perfil do usuário
  const userProfile: UserProfile = {
    name: 'João Santos',
    country: 'Angola',
    sector: 'Saúde',
    organization: 'Hospital Josina Machel',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  // Oportunidades regionais com imagens
  const opportunities: Opportunity[] = [
    {
      id: 1,
      title: 'Programa de Intercâmbio Médico',
      country: 'África do Sul',
      sector: 'Saúde',
      type: 'education',
      organization: 'University of Cape Town',
      deadline: '2024-08-15',
      description: 'Oportunidade de especialização em cardiologia para profissionais da região SADC',
      budget: 25000,
      requirements: ['Graduação em Medicina', '3+ anos experiência', 'Inglês fluente'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Projeto de Telemedicina Rural',
      country: 'Namíbia',
      sector: 'Saúde',
      type: 'project',
      organization: 'Ministry of Health Namibia',
      deadline: '2024-07-30',
      description: 'Implementação de sistema de telemedicina para comunidades rurais',
      budget: 120000,
      requirements: ['Experiência em telemedicina', 'Conhecimento local', 'Equipamento médico'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
      featured: true
    },
    {
      id: 3,
      title: 'Bolsa de Mestrado em Gestão Hospitalar',
      country: 'África do Sul',
      sector: 'Educação',
      type: 'funding',
      organization: 'Wits University',
      deadline: '2024-09-01',
      description: 'Bolsa integral para mestrado em administração hospitalar',
      requirements: ['Graduação superior', 'Experiência em gestão', 'Plano de retorno'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 4,
      title: 'Parceria para Turismo Sustentável',
      country: 'Angola',
      sector: 'Turismo',
      type: 'partnership',
      organization: 'Angola Tourism Board',
      deadline: '2024-08-20',
      description: 'Desenvolvimento de roteiros eco-turísticos na região de Benguela',
      budget: 75000,
      requirements: ['Experiência em turismo', 'Conhecimento local', 'Sustentabilidade'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'Marketplace de Produtos Locais',
      country: 'Namíbia',
      sector: 'Comércio',
      type: 'project',
      organization: 'Namibian Chamber of Commerce',
      deadline: '2024-10-15',
      description: 'Plataforma digital para comercialização de produtos artesanais namibianos',
      budget: 45000,
      requirements: ['E-commerce', 'Marketing digital', 'Logística regional'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'Programa de Startups Tecnológicas',
      country: 'África do Sul',
      sector: 'Tecnologia',
      type: 'funding',
      organization: 'Cape Town Innovation Hub',
      deadline: '2024-07-15',
      description: 'Aceleração e funding para startups africanas de tecnologia',
      budget: 200000,
      requirements: ['Startup inovadora', 'Impacto social', 'Modelo de negócio viável'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop',
      featured: true
    }
  ];

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia'];

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedCountry !== 'all' && opp.country !== selectedCountry) return false;
    if (selectedSector !== 'all' && opp.sector !== selectedSector) return false;
    return true;
  });

  const featuredOpportunities = opportunities.filter(opp => opp.featured);

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

  // Estatísticas do usuário
  const userStats = {
    appliedOpportunities: 3,
    savedOpportunities: 8,
    completedProjects: 2,
    networkConnections: 45
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header com perfil do usuário - Mais Visual */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Avatar do usuário */}
              <div className="relative">
                <img 
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {userProfile.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-2">Bem-vindo, {userProfile.name}! 👋</h1>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    {getSectorIcon(userProfile.sector)} {userProfile.sector}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    {getCountryFlag(userProfile.country)} {userProfile.country}
                  </span>
                </div>
                <p className="text-red-100 text-lg">{userProfile.organization}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                ✏️ Editar Perfil
              </button>
              <button className="bg-red-800 bg-opacity-50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-70 transition-colors border border-white border-opacity-30">
                🔔 Notificações
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas rápidas - Cards mais visuais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{userStats.appliedOpportunities}</div>
              <div className="text-sm text-gray-600">Candidaturas</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💾</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{userStats.savedOpportunities}</div>
              <div className="text-sm text-gray-600">Salvos</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{userStats.completedProjects}</div>
              <div className="text-sm text-gray-600">Projetos</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{userStats.networkConnections}</div>
              <div className="text-sm text-gray-600">Conexões</div>
            </div>
          </div>
        </div>
      </div>

      {/* Oportunidades em Destaque */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">⭐</span>
          <h2 className="text-2xl font-bold text-gray-900">Oportunidades em Destaque</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity.type)}`}>
                    {getTypeIcon(opportunity.type)} {
                      opportunity.type === 'project' ? 'Projeto' :
                      opportunity.type === 'partnership' ? 'Parceria' :
                      opportunity.type === 'funding' ? 'Financiamento' :
                      'Educação'
                    }
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {getCountryFlag(opportunity.country)} {opportunity.country}
                  </span>
                </div>
              </div>
              
              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {opportunity.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{opportunity.organization}</span>
                  {opportunity.budget && (
                    <span className="text-sm font-semibold text-green-600">
                      ${opportunity.budget.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                    Ver Detalhes
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegação por abas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: 'opportunities', name: 'Todas Oportunidades', icon: '🚀' },
              { id: 'applications', name: 'Minhas Candidaturas', icon: '📋' },
              { id: 'network', name: 'Rede Regional', icon: '🌍' },
              { id: 'resources', name: 'Recursos', icon: '📚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Aba de Candidaturas */}
          {activeTab === 'applications' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>📋</span>
                Minhas Candidaturas
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=80&h=80&fit=crop"
                        alt="UCT"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">Programa de Intercâmbio Médico</h3>
                        <p className="text-gray-600">🇿🇦 África do Sul • University of Cape Town</p>
                        <p className="text-sm text-gray-500">Enviado em 15/06/2024</p>
                      </div>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                      <span>⏳</span>
                      Em Análise
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop"
                        alt="Telemedicina"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">Projeto de Telemedicina Rural</h3>
                        <p className="text-gray-600">🇳🇦 Namíbia • Ministry of Health</p>
                        <p className="text-sm text-gray-500">Enviado em 20/05/2024</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                      <span>✅</span>
                      Aprovada
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=80&h=80&fit=crop"
                        alt="Wits"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">Bolsa de Mestrado em Gestão</h3>
                        <p className="text-gray-600">🇿🇦 África do Sul • Wits University</p>
                        <p className="text-sm text-gray-500">Enviado em 10/05/2024</p>
                      </div>
                    </div>
                    <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                      <span>❌</span>
                      Rejeitada
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba de Rede Regional */}
          {activeTab === 'network' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>🌍</span>
                Rede Regional Africa's Hands
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-yellow-50 border border-red-200 rounded-xl p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                      🇦🇴
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Angola</h3>
                    <p className="text-red-600 font-semibold text-2xl">15</p>
                    <p className="text-sm text-gray-600">conexões ativas</p>
                    <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      Explorar Rede
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                      🇳🇦
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Namíbia</h3>
                    <p className="text-blue-600 font-semibold text-2xl">12</p>
                    <p className="text-sm text-gray-600">conexões ativas</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Explorar Rede
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                      🇿🇦
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">África do Sul</h3>
                    <p className="text-green-600 font-semibold text-2xl">18</p>
                    <p className="text-sm text-gray-600">conexões ativas</p>
                    <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                      Explorar Rede
                    </button>
                  </div>
                </div>
              </div>

              {/* Conexões Recentes */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>👥</span>
                  Conexões Recentes
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 flex items-center gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=50&h=50&fit=crop&crop=face"
                      alt="Dr. Maria Silva"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Dr. Maria Silva</h4>
                      <p className="text-sm text-gray-600">🏥 Cardiologista • 🇿🇦 Cidade do Cabo</p>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      Conectar
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 flex items-center gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                      alt="Prof. John Kazembe"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Prof. John Kazembe</h4>
                      <p className="text-sm text-gray-600">🎓 Pesquisador • 🇳🇦 Windhoek</p>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      Conectar
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 flex items-center gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                      alt="Eng. Carlos Mbala"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Eng. Carlos Mbala</h4>
                      <p className="text-sm text-gray-600">✈️ Aviação • 🇦🇴 Luanda</p>
                    </div>
                    <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
                      Conectado
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba de Recursos */}
          {activeTab === 'resources' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>📚</span>
                Recursos e Guias Regionais
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop"
                      alt="Guia SADC"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-3xl mb-2">📖</div>
                      <h3 className="font-bold text-gray-900 mb-2">Guia de Negócios na SADC</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Manual completo para fazer negócios na região da África Austral. 
                        Inclui regulamentações, oportunidades e contatos essenciais.
                      </p>
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          📥 Baixar PDF
                        </button>
                        <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-xs font-medium">
                          2.3MB • PT/EN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop"
                      alt="Cursos Online"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-3xl mb-2">🎓</div>
                      <h3 className="font-bold text-gray-900 mb-2">Cursos Online Regionais</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Capacitação em cooperação internacional, desenvolvimento sustentável 
                        e oportunidades de negócio na África Austral.
                      </p>
                      <div className="flex gap-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                          🎯 Ver Cursos
                        </button>
                        <span className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-xs font-medium">
                          12 Módulos • Gratuito
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=80&h=80&fit=crop"
                      alt="Templates"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-3xl mb-2">💼</div>
                      <h3 className="font-bold text-gray-900 mb-2">Templates de Propostas</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Modelos prontos para candidaturas, propostas de projetos e 
                        parcerias regionais. Aprovados por especialistas.
                      </p>
                      <div className="flex gap-2">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                          📄 Download
                        </button>
                        <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-xs font-medium">
                          15 Templates • DOCX
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=80&fit=crop"
                      alt="Eventos"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-3xl mb-2">🌍</div>
                      <h3 className="font-bold text-gray-900 mb-2">Eventos Regionais 2024</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Conferências, workshops e networking na África Austral. 
                        Conecte-se com líderes dos três países.
                      </p>
                      <div className="flex gap-2">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors">
                          📅 Ver Agenda
                        </button>
                        <span className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-xs font-medium">
                          24 Eventos • 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webinars e Vídeos */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎥</span>
                  Webinars e Conteúdo Exclusivo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img 
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=160&fit=crop"
                      alt="Webinar Saúde"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium text-gray-900 mb-1">Telemedicina na África</h4>
                    <p className="text-sm text-gray-600 mb-2">Dr. António Silva • 45min</p>
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      ▶️ Assistir
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img 
                      src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=160&fit=crop"
                      alt="Webinar Negócios"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium text-gray-900 mb-1">Oportunidades SADC</h4>
                    <p className="text-sm text-gray-600 mb-2">Prof. Maria Santos • 38min</p>
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      ▶️ Assistir
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=160&fit=crop"
                      alt="Webinar Tecnologia"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium text-gray-900 mb-1">Inovação Tecnológica</h4>
                    <p className="text-sm text-gray-600 mb-2">Eng. João Kazembe • 52min</p>
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      ▶️ Assistir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba de Todas as Oportunidades */}
          {activeTab === 'opportunities' && (
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <span>🎯</span>
                  Todas as Oportunidades Regionais
                </h2>
                
                <div className="flex gap-3">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
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
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                  >
                    <option value="all">💼 Todos os Setores</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>
                        {getSectorIcon(sector)} {sector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="md:flex">
                      {/* Imagem lateral */}
                      <div className="md:w-64 h-48 md:h-auto">
                        <img 
                          src={opportunity.image}
                          alt={opportunity.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Conteúdo */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="text-2xl">{getTypeIcon(opportunity.type)}</div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {opportunity.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {getCountryFlag(opportunity.country)} {opportunity.country}
                                  </span>
                                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {getSectorIcon(opportunity.sector)} {opportunity.sector}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(opportunity.type)}`}>
                                    {getTypeIcon(opportunity.type)} {
                                      opportunity.type === 'project' ? 'Projeto' :
                                      opportunity.type === 'partnership' ? 'Parceria' :
                                      opportunity.type === 'funding' ? 'Financiamento' :
                                      'Educação'
                                    }
                                  </span>
                                </div>
                                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500">🏢</span>
                                    <div>
                                      <p className="text-gray-500">Organização</p>
                                      <p className="font-medium text-gray-900">{opportunity.organization}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500">📅</span>
                                    <div>
                                      <p className="text-gray-500">Prazo</p>
                                      <p className="font-medium text-gray-900">
                                        {new Date(opportunity.deadline).toLocaleDateString('pt-BR')}
                                      </p>
                                    </div>
                                  </div>
                                  {opportunity.budget && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-500">💰</span>
                                      <div>
                                        <p className="text-gray-500">Orçamento</p>
                                        <p className="font-medium text-green-600">
                                          ${opportunity.budget.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <p className="text-sm text-gray-500 mb-2">✅ Requisitos:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {opportunity.requirements.map((req, index) => (
                                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {req}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 lg:w-48">
                            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
                              <span>🚀</span>
                              Candidatar-se
                            </button>
                            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2">
                              <span>💾</span>
                              Salvar
                            </button>
                            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2">
                              <span>🔗</span>
                              Compartilhar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">🚀 Pronto para Expandir sua Rede?</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          Conecte-se com profissionais, empresas e oportunidades em toda a África Austral. 
          Sua próxima grande oportunidade está aqui!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            🌍 Explorar Mais Oportunidades
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
            👥 Conectar com Especialistas
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardComplete;