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
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedServiceForRequest, setSelectedServiceForRequest] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
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

  // Função para abrir modal de serviços
  const openServicesModal = (service: string) => {
    setSelectedService(service);
    setShowServicesModal(true);
  };

  // Função para abrir formulário de solicitação
  const openRequestForm = (serviceType: string) => {
    setSelectedServiceForRequest(serviceType);
    setShowRequestForm(true);
    setShowServicesModal(false);
  };

  // Função para fechar formulário e resetar dados
  const closeRequestForm = () => {
    setShowRequestForm(false);
    setSelectedServiceForRequest('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  // Função para lidar com mudanças no formulário
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para enviar solicitação
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log('Solicitação enviada:', { 
      service: selectedServiceForRequest, 
      ...formData 
    });
    
    // Mostrar mensagem de sucesso (você pode personalizar isso)
    alert(t('form.requestSent') || 'Solicitação enviada com sucesso!');
    closeRequestForm();
  };

  // Estatísticas do usuário - com clique
  const userStats = [
    { 
      icon: '🎓', 
      count: 3, 
      label: t('sector.education'), 
      color: 'text-blue-600',
      onClick: () => openServicesModal('education')
    },
    { 
      icon: '🏥', 
      count: 8, 
      label: t('sector.health'), 
      color: 'text-green-600',
      onClick: () => openServicesModal('health')
    },
    { 
      icon: '🛒', 
      count: 8, 
      label: t('sector.commerce'), 
      color: 'text-purple-600',
      onClick: () => openServicesModal('commerce')
    },
    { 
      icon: '🏨', 
      count: 8, 
      label: t('sector.hospitalityTourism'), 
      color: 'text-orange-600',
      onClick: () => openServicesModal('tourism')
    },
    { 
      icon: '📍', 
      count: 8, 
      label: t('sector.localGuides'), 
      color: 'text-teal-600',
      onClick: () => openServicesModal('guides')
    },
    { 
      icon: '✈️', 
      count: 2, 
      label: t('sector.transport'), 
      color: 'text-indigo-600',
      onClick: () => openServicesModal('transport')
    },
    { 
      icon: '🤝', 
      count: 45, 
      label: t('stats.connections'), 
      color: 'text-red-600',
      onClick: () => {} // Sem modal para conexões
    }
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

      {/* Modal de Serviços */}
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
              <p className="text-red-100 text-sm mt-1">Tudo o que precisas num único clique!</p>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-4">
              <div className="text-center mb-4">
                <p className="text-gray-700 font-medium">📱 Portal especializado para Angola, Namíbia e África do Sul</p>
              </div>

              {/* Conteúdo Específico por Setor */}
              {selectedService === 'education' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🎓</span>
                      Serviços de Educação
                    </h3>
                    <p className="text-gray-600 text-sm">Instituições, cursos e apoio académico regional</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏫</span>
                          <div>
                            <p className="font-medium text-blue-900">Universidades</p>
                            <p className="text-xs text-blue-700">Inscrições e informações</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Universidades')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📚</span>
                          <div>
                            <p className="font-medium text-blue-900">Cursos Técnicos</p>
                            <p className="text-xs text-blue-700">Formação profissional</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Cursos Técnicos')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🔬</span>
                          <div>
                            <p className="font-medium text-blue-900">Bolsas de Estudo</p>
                            <p className="text-xs text-blue-700">Oportunidades regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Bolsas de Estudo')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🌐</span>
                          <div>
                            <p className="font-medium text-blue-900">Cursos Online</p>
                            <p className="text-xs text-blue-700">Educação à distância</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Cursos Online')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'health' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-green-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🏥</span>
                      Serviços de Saúde
                    </h3>
                    <p className="text-gray-600 text-sm">Hospitais, clínicas, farmácias e consultas</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏥</span>
                          <div>
                            <p className="font-medium text-green-900">Hospitais</p>
                            <p className="text-xs text-green-700">Consultas e internamentos</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Hospitais')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">💊</span>
                          <div>
                            <p className="font-medium text-green-900">Farmácias</p>
                            <p className="text-xs text-green-700">Medicamentos e produtos</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Farmácias')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🩺</span>
                          <div>
                            <p className="font-medium text-green-900">Clínicas</p>
                            <p className="text-xs text-green-700">Especialidades médicas</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Clínicas')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🚑</span>
                          <div>
                            <p className="font-medium text-green-900">Emergências</p>
                            <p className="text-xs text-green-700">Atendimento urgente</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Emergências')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'commerce' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-purple-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🛒</span>
                      Serviços de Comércio
                    </h3>
                    <p className="text-gray-600 text-sm">Produtos, lojas e entregas regionais</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏪</span>
                          <div>
                            <p className="font-medium text-purple-900">Lojas Locais</p>
                            <p className="text-xs text-purple-700">Produtos regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Lojas Locais')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📦</span>
                          <div>
                            <p className="font-medium text-purple-900">Entregas</p>
                            <p className="text-xs text-purple-700">Logística regional</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Entregas')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🎨</span>
                          <div>
                            <p className="font-medium text-purple-900">Artesanato</p>
                            <p className="text-xs text-purple-700">Produtos tradicionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Artesanato')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">💳</span>
                          <div>
                            <p className="font-medium text-purple-900">Pagamentos</p>
                            <p className="text-xs text-purple-700">Soluções financeiras</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Pagamentos')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'tourism' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-orange-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🏨</span>
                      Hotelaria e Turismo
                    </h3>
                    <p className="text-gray-600 text-sm">Hotéis, passeios e reservas rápidas</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏨</span>
                          <div>
                            <p className="font-medium text-orange-900">Hotéis</p>
                            <p className="text-xs text-orange-700">Reservas em toda região</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Hotéis')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🎒</span>
                          <div>
                            <p className="font-medium text-orange-900">Passeios</p>
                            <p className="text-xs text-orange-700">Tours regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Passeios')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🍽️</span>
                          <div>
                            <p className="font-medium text-orange-900">Restaurantes</p>
                            <p className="text-xs text-orange-700">Gastronomia local</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Restaurantes')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🎭</span>
                          <div>
                            <p className="font-medium text-orange-900">Cultura</p>
                            <p className="text-xs text-orange-700">Eventos e espetáculos</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Cultura')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'transport' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-indigo-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">✈️</span>
                      Serviços de Transporte
                    </h3>
                    <p className="text-gray-600 text-sm">Táxis, aluguer de carros e voos</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🚗</span>
                          <div>
                            <p className="font-medium text-indigo-900">Táxis</p>
                            <p className="text-xs text-indigo-700">Transporte urbano</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Táxis')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🚙</span>
                          <div>
                            <p className="font-medium text-indigo-900">Aluguer de Carros</p>
                            <p className="text-xs text-indigo-700">Veículos para rent</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Aluguer de Carros')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">✈️</span>
                          <div>
                            <p className="font-medium text-indigo-900">Voos</p>
                            <p className="text-xs text-indigo-700">Viagens regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Voos')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🚌</span>
                          <div>
                            <p className="font-medium text-indigo-900">Autocarros</p>
                            <p className="text-xs text-indigo-700">Transporte público</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Autocarros')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'guides' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-teal-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">📍</span>
                      Guias e Informações Locais
                    </h3>
                    <p className="text-gray-600 text-sm">Potencialidade económica regional</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🗺️</span>
                          <div>
                            <p className="font-medium text-teal-900">Guias Turísticos</p>
                            <p className="text-xs text-teal-700">Acompanhamento local</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Guias Turísticos')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">💼</span>
                          <div>
                            <p className="font-medium text-teal-900">Negócios</p>
                            <p className="text-xs text-teal-700">Oportunidades de investimento</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Negócios')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏛️</span>
                          <div>
                            <p className="font-medium text-teal-900">Cultura Local</p>
                            <p className="text-xs text-teal-700">Tradições e costumes</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Cultura Local')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📊</span>
                          <div>
                            <p className="font-medium text-teal-900">Dados Económicos</p>
                            <p className="text-xs text-teal-700">Estatísticas regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Dados Económicos')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Localização */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-center mb-3">📍 Nossa Localização</h3>
                
                {/* Angola - Sede */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🇦🇴</span>
                    <div>
                      <h4 className="font-bold text-red-900">AFRICA'S HANDS</h4>
                      <p className="text-xs text-red-700">ESCRITÓRIO V.J ESTEVES</p>
                    </div>
                  </div>
                  <div className="text-xs text-red-800 space-y-1 mb-4">
                    <p><strong>NIF: 5002564580</strong></p>
                    <p>Bairro: Naipalala</p>
                    <p>Cunene/Ondjiva - Angola</p>
                    <p>📧 escritorioestevesemultisservic@gmail.com</p>
                  </div>
                  
                  {/* Redes Sociais */}
                  <div className="border-t border-red-200 pt-3">
                    <p className="text-xs font-medium text-red-900 mb-2">Siga-nos:</p>
                    <div className="flex gap-3">
                      <a 
                        href="https://wa.me/+244924166401"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-600 transition-colors"
                      >
                        <span>📱</span>
                        WhatsApp
                      </a>
                      <button 
                        onClick={() => {
                          // Adicionar link do Facebook aqui
                          console.log('Facebook - Link a ser adicionado');
                        }}
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                      >
                        <span>📘</span>
                        Facebook
                      </button>
                      <button 
                        onClick={() => {
                          // Adicionar link do Instagram aqui
                          console.log('Instagram - Link a ser adicionado');
                        }}
                        className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
                      >
                        <span>📷</span>
                        Instagram
                      </button>
                    </div>
                  </div>
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
            <form onSubmit={handleSubmitRequest} className="p-4">
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
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium text-sm"
                >
                  📤 Enviar Solicitação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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