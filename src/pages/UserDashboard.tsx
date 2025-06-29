import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

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

const UserDashboardMobile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const { t } = useTranslation();

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
      title: t('opportunities.medicalExchange'),
      country: t('country.southAfrica'),
      sector: t('sector.health'),
      type: 'education',
      organization: 'University of Cape Town',
      deadline: '2024-08-15',
      description: t('opportunities.medicalExchangeDesc'),
      budget: 25000,
      requirements: [t('opportunities.req.medicalDegree'), t('opportunities.req.experience'), t('opportunities.req.fluentEnglish')],
      status: t('opportunities.status.open'),
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: t('opportunities.ruralTelemedicine'),
      country: t('country.namibia'),
      sector: t('sector.health'),
      type: 'project',
      organization: 'Ministry of Health Namibia',
      deadline: '2024-07-30',
      description: t('opportunities.ruralTelemedicineDesc'),
      budget: 120000,
      requirements: [t('opportunities.req.telemedicineExp'), t('opportunities.req.localKnowledge'), t('opportunities.req.medicalEquipment')],
      status: t('opportunities.status.open'),
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
      featured: true
    },
    {
      id: 3,
      title: t('opportunities.hospitalManagement'),
      country: t('country.southAfrica'),
      sector: t('sector.education'),
      type: 'funding',
      organization: 'Wits University',
      deadline: '2024-09-01',
      description: t('opportunities.hospitalManagementDesc'),
      requirements: [t('opportunities.req.higherEducation'), t('opportunities.req.managementExp'), t('opportunities.req.returnPlan')],
      status: t('opportunities.status.open'),
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 4,
      title: t('opportunities.sustainableTourism'),
      country: t('country.angola'),
      sector: t('sector.tourism'),
      type: 'partnership',
      organization: 'Angola Tourism Board',
      deadline: '2024-08-20',
      description: t('opportunities.sustainableTourismDesc'),
      budget: 75000,
      requirements: [t('opportunities.req.tourismExp'), t('opportunities.req.localKnowledge'), t('opportunities.req.sustainability')],
      status: t('opportunities.status.open'),
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: t('opportunities.localMarketplace'),
      country: t('country.namibia'),
      sector: t('sector.commerce'),
      type: 'project',
      organization: 'Namibian Chamber of Commerce',
      deadline: '2024-10-15',
      description: t('opportunities.localMarketplaceDesc'),
      budget: 45000,
      requirements: [t('opportunities.req.ecommerce'), t('opportunities.req.digitalMarketing'), t('opportunities.req.regionalLogistics')],
      status: t('opportunities.status.open'),
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: t('opportunities.techStartups'),
      country: t('country.southAfrica'),
      sector: t('sector.technology'),
      type: 'funding',
      organization: 'Cape Town Innovation Hub',
      deadline: '2024-07-15',
      description: t('opportunities.techStartupsDesc'),
      budget: 200000,
      requirements: [t('opportunities.req.innovativeStartup'), t('opportunities.req.socialImpact'), t('opportunities.req.viableModel')],
      status: t('opportunities.status.open'),
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop',
      featured: true
    }
  ];

  const countries = [t('country.angola'), t('country.namibia'), t('country.southAfrica')];
  const sectors = [t('sector.health'), t('sector.education'), t('sector.tourism'), t('sector.commerce'), t('sector.transport'), t('sector.technology')];

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedCountry !== 'all' && opp.country !== selectedCountry) return false;
    if (selectedSector !== 'all' && opp.sector !== selectedSector) return false;
    return true;
  });

  const featuredOpportunities = opportunities.filter(opp => opp.featured);

  const getCountryFlag = (country: string) => {
    const flags = {
      [t('country.angola')]: '🇦🇴',
      [t('country.namibia')]: '🇳🇦',
      [t('country.southAfrica')]: '🇿🇦'
    };
    return flags[country] || '🌍';
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
    return icons[sector] || '💼';
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
      'project': t('opportunityType.project'),
      'partnership': t('opportunityType.partnership'),
      'funding': t('opportunityType.funding'),
      'education': t('opportunityType.education')
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Estatísticas do usuário
  const userStats = [
    { icon: '🎓', count: 3, label: t('sector.education'), color: 'text-blue-600' },
    { icon: '🏥', count: 8, label: t('sector.health'), color: 'text-green-600' },
    { icon: '🛒', count: 8, label: t('sector.commerce'), color: 'text-purple-600' },
    { icon: '🏨', count: 8, label: t('sector.hospitalityTourism'), color: 'text-orange-600' },
    { icon: '📍', count: 8, label: t('sector.localGuides'), color: 'text-teal-600' },
    { icon: '✈️', count: 2, label: t('sector.transport'), color: 'text-indigo-600' },
    { icon: '🤝', count: 45, label: t('stats.connections'), color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Compacto Mobile */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div className="flex-1">
            <h1 className="text-lg font-bold">{t('userDash.welcome')}, {userProfile.name}! 👋</h1>
            <p className="text-sm text-red-100 opacity-90">{userProfile.organization}</p>
          </div>
          {userProfile.verified && (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Botões de Ação Mobile */}
        <div className="flex gap-2">
          <button className="flex-1 bg-white bg-opacity-20 text-white py-2 px-4 rounded-lg text-sm font-medium backdrop-blur-sm">
            ✏️ {t('userDash.editProfile')}
          </button>
          <button className="bg-white bg-opacity-20 text-white py-2 px-4 rounded-lg text-sm font-medium backdrop-blur-sm">
            🔔
          </button>
        </div>
      </div>

      {/* Estatísticas em Grid Mobile */}
      <div className="p-4 -mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            {userStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
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
            { id: 'opportunities', name: t('userDash.allOpportunities'), icon: '🚀' },
            { id: 'applications', name: t('userDash.myApplications'), icon: '📋' },
            { id: 'network', name: t('userDash.regionalNetwork'), icon: '🌍' },
            { id: 'resources', name: t('userDash.resources'), icon: '📚' }
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
            {/* Oportunidades em Destaque */}
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">⭐</span>
                <h2 className="text-lg font-bold text-gray-900">{t('userDash.featuredOpportunities')}</h2>
              </div>
              
              <div className="space-y-4">
                {featuredOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{opportunity.title}</h3>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity.type)}`}>
                          {getTypeIcon(opportunity.type)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{opportunity.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500">{getCountryFlag(opportunity.country)} {opportunity.country}</span>
                        {opportunity.budget && (
                          <span className="text-xs font-semibold text-green-600">${(opportunity.budget/1000).toFixed(0)}K</span>
                        )}
                      </div>
                      <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium">
                        {t('userDash.viewDetails')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtros Mobile */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('userDash.allRegionalOpportunities')}</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">🌍 {t('userDash.allCountries')}</option>
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
                  <option value="all">💼 {t('userDash.allSectors')}</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {getSectorIcon(sector)} {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lista de Oportunidades Mobile */}
              <div className="space-y-3">
                {filteredOpportunities.map((opportunity) => (
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
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-xs font-medium">
                            {t('userDash.apply')}
                          </button>
                          <button className="bg-gray-100 text-gray-700 py-1 px-3 rounded text-xs">
                            💾
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                {t('userDash.myApplications')}
              </h2>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=60&h=60&fit=crop"
                      alt="UCT"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{t('opportunities.medicalExchange')}</h3>
                      <p className="text-xs text-gray-600">🇿🇦 {t('country.southAfrica')}</p>
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                        <span>⏳</span>
                        {t('appStatus.inAnalysis')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop"
                      alt="Telemedicina"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{t('opportunities.ruralTelemedicine')}</h3>
                      <p className="text-xs text-gray-600">🇳🇦 {t('country.namibia')}</p>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                        <span>✅</span>
                        {t('appStatus.approved')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=60&h=60&fit=crop"
                      alt="Wits"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{t('opportunities.hospitalManagement')}</h3>
                      <p className="text-xs text-gray-600">🇿🇦 {t('country.southAfrica')}</p>
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                        <span>❌</span>
                        {t('appStatus.rejected')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba de Rede Regional */}
        {activeTab === 'network' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌍</span>
                {t('userDash.regionalNetwork')}
              </h2>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇦🇴</div>
                  <div className="text-lg font-bold text-red-600">15</div>
                  <div className="text-xs text-gray-600">{t('country.angola')}</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇳🇦</div>
                  <div className="text-lg font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-600">{t('country.namibia')}</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="text-lg font-bold text-green-600">18</div>
                  <div className="text-xs text-gray-600">{t('country.southAfrica')}</div>
                </div>
              </div>

              {/* Conexões Recentes Mobile */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">👥 {t('userDash.recentConnections')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=40&h=40&fit=crop&crop=face"
                      alt="Dr. Maria Silva"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">Dr. Maria Silva</h4>
                      <p className="text-xs text-gray-600">🏥 Cardiologista • 🇿🇦</p>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">
                      {t('userDash.connect')}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="Prof. John Kazembe"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">Prof. John Kazembe</h4>
                      <p className="text-xs text-gray-600">🎓 Pesquisador • 🇳🇦</p>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">
                      {t('userDash.connect')}
                    </button>
                  </div>
                </div>
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
                <h3 className="text-sm font-semibold text-gray-900 mb-3">🎥 {t('resources.webinarsContent')}</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <img 
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=120&fit=crop"
                      alt="Webinar Saúde"
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Telemedicina na África</h4>
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

      {/* Call to Action Mobile */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 mx-4 mb-4 rounded-xl p-6 text-white text-center">
        <h2 className="text-lg font-bold mb-3">🚀 {t('userDash.expandNetwork')}</h2>
        <p className="text-sm text-red-100 mb-4">{t('userDash.expandNetworkDesc')}</p>
        <div className="space-y-2">
          <button className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold text-sm">
            🌍 {t('userDash.exploreMoreOpportunities')}
          </button>
          <button className="w-full border border-white text-white py-3 rounded-lg font-semibold text-sm">
            👥 {t('userDash.connectSpecialists')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardMobile;