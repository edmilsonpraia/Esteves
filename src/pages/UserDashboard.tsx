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
  location?: string;
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
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
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

  // Oportunidades regionais com imagens específicas por país e setor
  const opportunities: Opportunity[] = [
    // ANGOLA - Oportunidades
    {
      id: 1,
      title: 'Programa de Intercâmbio Médico Luanda',
      country: 'Angola',
      sector: 'Saúde',
      type: 'education',
      organization: 'Hospital Geral de Luanda',
      deadline: '2024-08-15',
      description: 'Programa de intercâmbio para médicos especializarem-se em cardiologia e medicina interna em Luanda.',
      budget: 35000,
      requirements: ['Diploma em Medicina', '2+ anos de experiência', 'Português fluente'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=200&fit=crop&crop=center',
      location: 'Luanda, Maianga',
      featured: true
    },
    {
      id: 2,
      title: 'Centro de Formação Técnica Benguela',
      country: 'Angola',
      sector: 'Educação',
      type: 'project',
      organization: 'Instituto Técnico de Benguela',
      deadline: '2024-09-10',
      description: 'Projeto para criar centro de formação técnica em mecânica e eletricidade para jovens.',
      budget: 80000,
      requirements: ['Experiência em educação técnica', 'Conhecimento local', 'Gestão de projetos'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop&crop=center',
      location: 'Benguela, Centro',
      featured: true
    },
    {
      id: 3,
      title: 'Turismo Sustentável Huíla',
      country: 'Angola',
      sector: 'Turismo',
      type: 'partnership',
      organization: 'Ministério do Turismo Angola',
      deadline: '2024-08-25',
      description: 'Desenvolvimento de turismo sustentável na província da Huíla, focando na Serra da Leba.',
      budget: 120000,
      requirements: ['Experiência em turismo', 'Conhecimento ambiental', 'Gestão sustentável'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop&crop=center',
      location: 'Huíla, Lubango',
      featured: false
    },
    {
      id: 4,
      title: 'Marketplace Digital Luanda',
      country: 'Angola',
      sector: 'Comércio',
      type: 'project',
      organization: 'Câmara de Comércio Angola',
      deadline: '2024-10-15',
      description: 'Criação de plataforma digital para conectar comerciantes locais com consumidores em Luanda.',
      budget: 60000,
      requirements: ['Desenvolvimento web', 'E-commerce', 'Logística local'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=200&fit=crop&crop=center',
      location: 'Luanda, Ingombota',
      featured: false
    },

    // NAMÍBIA - Oportunidades
    {
      id: 5,
      title: 'Telemedicina Rural Namíbia',
      country: 'Namíbia',
      sector: 'Saúde',
      type: 'project',
      organization: 'Ministry of Health Namibia',
      deadline: '2024-07-30',
      description: 'Implementação de sistema de telemedicina para áreas rurais remotas da Namíbia.',
      budget: 150000,
      requirements: ['Experiência em telemedicina', 'Conhecimento técnico', 'Inglês fluente'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=200&fit=crop&crop=center',
      location: 'Windhoek, Katutura',
      featured: true
    },
    {
      id: 6,
      title: 'Educação Digital Otjozondjupa',
      country: 'Namíbia',
      sector: 'Educação',
      type: 'funding',
      organization: 'University of Namibia',
      deadline: '2024-09-05',
      description: 'Programa de digitalização educacional para escolas rurais na região de Otjozondjupa.',
      budget: 95000,
      requirements: ['Tecnologia educacional', 'Gestão de projetos', 'Formação de professores'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=200&fit=crop&crop=center',
      location: 'Otjozondjupa, Otjiwarongo',
      featured: false
    },
    {
      id: 7,
      title: 'Transporte Sustentável Windhoek',
      country: 'Namíbia',
      sector: 'Transporte',
      type: 'partnership',
      organization: 'City of Windhoek',
      deadline: '2024-08-20',
      description: 'Sistema de transporte público sustentável para a capital da Namíbia.',
      budget: 200000,
      requirements: ['Planeamento urbano', 'Transporte público', 'Sustentabilidade'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=200&fit=crop&crop=center',
      location: 'Windhoek, Centro',
      featured: false
    },

    // ÁFRICA DO SUL - Oportunidades
    {
      id: 8,
      title: 'Intercâmbio Médico UCT',
      country: 'África do Sul',
      sector: 'Saúde',
      type: 'education',
      organization: 'University of Cape Town',
      deadline: '2024-08-15',
      description: 'Programa de intercâmbio médico com foco em cirurgia cardíaca e medicina de emergência.',
      budget: 45000,
      requirements: ['Diploma médico', 'Experiência hospitalar', 'Inglês fluente'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=200&fit=crop&crop=center',
      location: 'Cape Town, Observatory',
      featured: true
    },
    {
      id: 9,
      title: 'Gestão Hospitalar Wits',
      country: 'África do Sul',
      sector: 'Educação',
      type: 'funding',
      organization: 'Wits University',
      deadline: '2024-09-01',
      description: 'Mestrado em gestão hospitalar com bolsa integral para profissionais da região SADC.',
      requirements: ['Ensino superior', 'Experiência em gestão', 'Plano de retorno'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop&crop=center',
      location: 'Johannesburg, Braamfontein',
      featured: false
    },
    {
      id: 10,
      title: 'Startups de Tecnologia Cape Town',
      country: 'África do Sul',
      sector: 'Tecnologia',
      type: 'funding',
      organization: 'Cape Town Innovation Hub',
      deadline: '2024-07-15',
      description: 'Financiamento para startups tecnológicas com impacto social na região SADC.',
      budget: 300000,
      requirements: ['Startup inovadora', 'Impacto social', 'Modelo viável'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center',
      location: 'Cape Town, Woodstock',
      featured: true
    },
    {
      id: 11,
      title: 'Turismo Cultural Gauteng',
      country: 'África do Sul',
      sector: 'Turismo',
      type: 'project',
      organization: 'SA Tourism Board',
      deadline: '2024-10-01',
      description: 'Desenvolvimento de rotas turísticas culturais conectando Joanesburgo e Pretória.',
      budget: 180000,
      requirements: ['Gestão turística', 'Património cultural', 'Marketing digital'],
      status: 'Aberto',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop&crop=center',
      location: 'Gauteng, Johannesburg',
      featured: false
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

  const getTypeLabel = (type: string) => {
    const labels = {
      'project': 'Projeto',
      'partnership': 'Parceria',
      'funding': 'Financiamento',
      'education': 'Educação'
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Função para abrir modal de serviços
  const openServicesModal = (service: string) => {
    setSelectedService(service);
    setShowServicesModal(true);
  };

  // Função para abrir modal de conexões
  const openConnectionsModal = () => {
    setShowConnectionsModal(true);
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
  const handleSubmitRequest = () => {
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log('Solicitação enviada:', { 
      service: selectedServiceForRequest, 
      ...formData 
    });
    
    // Mostrar mensagem de sucesso (você pode personalizar isso)
    alert('Solicitação enviada com sucesso!');
    closeRequestForm();
  };

  // Estatísticas do usuário - com clique
  const userStats = [
    { 
      icon: '🎓', 
      count: 3, 
      label: 'Educação', 
      color: 'text-blue-600',
      onClick: () => openServicesModal('education')
    },
    { 
      icon: '🏥', 
      count: 8, 
      label: 'Saúde', 
      color: 'text-green-600',
      onClick: () => openServicesModal('health')
    },
    { 
      icon: '🛒', 
      count: 8, 
      label: 'Comércio', 
      color: 'text-purple-600',
      onClick: () => openServicesModal('commerce')
    },
    { 
      icon: '🏨', 
      count: 8, 
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
      count: 2, 
      label: 'Transporte', 
      color: 'text-indigo-600',
      onClick: () => openServicesModal('transport')
    },
    { 
      icon: '🤝', 
      count: 45, 
      label: 'Conexões', 
      color: 'text-red-600',
      onClick: () => openConnectionsModal()
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
            <h1 className="text-lg font-bold">Bem-vindo, {userProfile.name}! 👋</h1>
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
            ✏️ Editar Perfil
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

              {/* Conteúdo Específico por Setor - EDUCAÇÃO */}
              {selectedService === 'education' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🎓</span>
                      Educação - Instituições, Cursos e Apoio Académico
                    </h3>
                    <p className="text-gray-600 text-sm">Soluções educacionais completas para a região SADC</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏫</span>
                          <div>
                            <p className="font-medium text-blue-900">Universidades Regionais</p>
                            <p className="text-xs text-blue-700">UCT, Wits, UNAM, UAN</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Universidades Regionais')}
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
                            <p className="text-xs text-blue-700">Formação profissional certificada</p>
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
                            <p className="font-medium text-blue-900">Bolsas de Estudo SADC</p>
                            <p className="text-xs text-blue-700">Financiamento educacional</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Bolsas de Estudo SADC')}
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
                            <p className="font-medium text-blue-900">Educação Digital</p>
                            <p className="text-xs text-blue-700">Plataformas online regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Educação Digital')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">👨‍🏫</span>
                          <div>
                            <p className="font-medium text-blue-900">Apoio Académico</p>
                            <p className="text-xs text-blue-700">Tutoria e orientação</p>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Apoio Académico')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo Específico por Setor - SAÚDE */}
              {selectedService === 'health' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-green-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🏥</span>
                      Saúde - Hospitais, Clínicas, Farmácias e Consultas
                    </h3>
                    <p className="text-gray-600 text-sm">Cuidados de saúde integrados na região SADC</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏥</span>
                          <div>
                            <p className="font-medium text-green-900">Hospitais Regionais</p>
                            <p className="text-xs text-green-700">Rede hospitalar SADC</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Hospitais Regionais')}
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
                            <p className="font-medium text-green-900">Clínicas Especializadas</p>
                            <p className="text-xs text-green-700">Consultas médicas especializadas</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Clínicas Especializadas')}
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
                            <p className="font-medium text-green-900">Farmácias Certificadas</p>
                            <p className="text-xs text-green-700">Medicamentos e produtos</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Farmácias Certificadas')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">💻</span>
                          <div>
                            <p className="font-medium text-green-900">Consultas Online</p>
                            <p className="text-xs text-green-700">Telemedicina regional</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Consultas Online')}
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
                            <p className="font-medium text-green-900">Emergências 24h</p>
                            <p className="text-xs text-green-700">Atendimento urgente</p>
                          </div>
                        </div>
                        <button 
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Emergências 24h')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo Específico por Setor - TRANSPORTE */}
              {selectedService === 'transport' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-indigo-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">✈️</span>
                      Transporte - Táxis e Aluguer de Carros
                    </h3>
                    <p className="text-gray-600 text-sm">Mobilidade integrada na região SADC</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🚗</span>
                          <div>
                            <p className="font-medium text-indigo-900">Táxis Certificados</p>
                            <p className="text-xs text-indigo-700">Transporte urbano seguro</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Táxis Certificados')}
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
                            <p className="text-xs text-indigo-700">Veículos para todas necessidades</p>
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
                            <p className="font-medium text-indigo-900">Voos Regionais</p>
                            <p className="text-xs text-indigo-700">Conexões SADC</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Voos Regionais')}
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
                            <p className="font-medium text-indigo-900">Transporte Público</p>
                            <p className="text-xs text-indigo-700">Autocarros e comboios</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Transporte Público')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🛵</span>
                          <div>
                            <p className="font-medium text-indigo-900">Motos e Bicicletas</p>
                            <p className="text-xs text-indigo-700">Mobilidade sustentável</p>
                          </div>
                        </div>
                        <button 
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Motos e Bicicletas')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo Específico por Setor - COMÉRCIO */}
              {selectedService === 'commerce' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-purple-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🛒</span>
                      Comércio - Produtos, Lojas e Entregas
                    </h3>
                    <p className="text-gray-600 text-sm">Marketplace regional integrado</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏪</span>
                          <div>
                            <p className="font-medium text-purple-900">Lojas Regionais</p>
                            <p className="text-xs text-purple-700">Produtos SADC autênticos</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Lojas Regionais')}
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
                            <p className="font-medium text-purple-900">Entregas Rápidas</p>
                            <p className="text-xs text-purple-700">Logística transfronteiriça</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Entregas Rápidas')}
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
                            <p className="font-medium text-purple-900">Artesanato Tradicional</p>
                            <p className="text-xs text-purple-700">Produtos culturais autênticos</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Artesanato Tradicional')}
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
                            <p className="font-medium text-purple-900">Pagamentos Seguros</p>
                            <p className="text-xs text-purple-700">Soluções financeiras regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Pagamentos Seguros')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🌱</span>
                          <div>
                            <p className="font-medium text-purple-900">Produtos Agrícolas</p>
                            <p className="text-xs text-purple-700">Alimentos frescos regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Produtos Agrícolas')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo Específico por Setor - TURISMO */}
              {selectedService === 'tourism' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-orange-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">🏨</span>
                      Hotelaria e Turismo - Hotéis, Passeios e Reservas
                    </h3>
                    <p className="text-gray-600 text-sm">Experiências turísticas autênticas na região SADC</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏨</span>
                          <div>
                            <p className="font-medium text-orange-900">Hotéis e Pousadas</p>
                            <p className="text-xs text-orange-700">Acomodações em toda região</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Hotéis e Pousadas')}
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
                            <p className="font-medium text-orange-900">Passeios Turísticos</p>
                            <p className="text-xs text-orange-700">Tours culturais e naturais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Passeios Turísticos')}
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
                            <p className="font-medium text-orange-900">Restaurantes Locais</p>
                            <p className="text-xs text-orange-700">Gastronomia tradicional</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Restaurantes Locais')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📱</span>
                          <div>
                            <p className="font-medium text-orange-900">Reservas Rápidas</p>
                            <p className="text-xs text-orange-700">Sistema online integrado</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Reservas Rápidas')}
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
                            <p className="font-medium text-orange-900">Eventos Culturais</p>
                            <p className="text-xs text-orange-700">Festivais e espetáculos</p>
                          </div>
                        </div>
                        <button 
                          className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Eventos Culturais')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo Específico por Setor - GUIAS LOCAIS */}
              {selectedService === 'guides' && (
                <div className="space-y-4 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-teal-900 flex items-center justify-center gap-2">
                      <span className="text-2xl">📍</span>
                      Guias e Informações Locais
                    </h3>
                    <p className="text-gray-600 text-sm">Conhecimento local especializado da região SADC</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🗺️</span>
                          <div>
                            <p className="font-medium text-teal-900">Guias Turísticos</p>
                            <p className="text-xs text-teal-700">Especialistas locais certificados</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Guias Turísticos Locais')}
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
                            <p className="font-medium text-teal-900">Consultoria de Negócios</p>
                            <p className="text-xs text-teal-700">Oportunidades de investimento</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Consultoria de Negócios')}
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
                            <p className="font-medium text-teal-900">Informações Culturais</p>
                            <p className="text-xs text-teal-700">Tradições e costumes regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Informações Culturais')}
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
                            <p className="text-xs text-teal-700">Estatísticas e análises regionais</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Dados Económicos Regionais')}
                        >
                          Solicitar
                        </button>
                      </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🌍</span>
                          <div>
                            <p className="font-medium text-teal-900">Orientação Regional</p>
                            <p className="text-xs text-teal-700">Navegação e deslocamento</p>
                          </div>
                        </div>
                        <button 
                          className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                          onClick={() => openRequestForm('Orientação Regional')}
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
                
                {/* Angola - Sede Principal */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🇦🇴</span>
                    <div>
                      <h4 className="font-bold text-red-900">AFRICA'S HANDS - SEDE</h4>
                      <p className="text-xs text-red-700">ESCRITÓRIO V.J ESTEVES</p>
                    </div>
                  </div>
                  <div className="text-xs text-red-800 space-y-1 mb-4">
                    <p><strong>NIF: 5002564580</strong></p>
                    <p><strong>Zona Principal:</strong> Bairro Naipalala, Cunene/Ondjiva</p>
                    <p><strong>Zonas de Atendimento:</strong></p>
                    <ul className="ml-3 space-y-1">
                      <li>• Luanda - Maianga, Ingombota, Viana</li>
                      <li>• Benguela - Centro, Lobito</li>
                      <li>• Huíla - Lubango, Matala</li>
                      <li>• Cunene - Ondjiva, Cuvelai</li>
                    </ul>
                    <p>📧 escritorioestevesemultisservic@gmail.com</p>
                  </div>
                  
                  {/* Imagem representativa de Angola */}
                  <img 
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=150&fit=crop&crop=center"
                    alt="Angola - Luanda"
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  
                  {/* Redes Sociais */}
                  <div className="border-t border-red-200 pt-3">
                    <p className="text-xs font-medium text-red-900 mb-2">Contacte-nos:</p>
                    <div className="flex gap-2 flex-wrap">
                      <a 
                        href="https://wa.me/+244924166401"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-green-500 text-white px-2 py-1.5 rounded-md text-xs font-medium hover:bg-green-600 transition-colors"
                      >
                        <span className="text-sm">📱</span>
                        <span className="text-xs">+244 924 166 401</span>
                      </a>
                      <button 
                        onClick={() => {
                          console.log('Facebook - Angola Office');
                        }}
                        className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                      >
                        <span className="text-sm">📘</span>
                        <span className="text-xs">Facebook</span>
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
              <p className="text-red-100 text-sm mt-1">45 profissionais conectados na região</p>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-4">
              {/* Estatísticas de Conexões */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇦🇴</div>
                  <div className="text-lg font-bold text-red-600">15</div>
                  <div className="text-xs text-gray-600">Angola</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇳🇦</div>
                  <div className="text-lg font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-600">Namíbia</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="text-lg font-bold text-green-600">18</div>
                  <div className="text-xs text-gray-600">África do Sul</div>
                </div>
              </div>

              {/* Lista de Conexões por Setor */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">👥 Suas Conexões Regionais</h3>
                
                {/* Setor Saúde */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                    🏥 Saúde (8 conexões)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=40&h=40&fit=crop&crop=face"
                        alt="Dr. Maria Silva"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-900">Dr. Maria Silva</h5>
                        <p className="text-xs text-gray-600">Cardiologista • 🇿🇦 Cape Town</p>
                      </div>
                      <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        💬
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face"
                        alt="Dr. João Menezes"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-900">Dr. João Menezes</h5>
                        <p className="text-xs text-gray-600">Pediatra • 🇦🇴 Luanda</p>
                      </div>
                      <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        💬
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setor Educação */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                    🎓 Educação (3 conexões)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="Prof. John Kazembe"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-900">Prof. John Kazembe</h5>
                        <p className="text-xs text-gray-600">Pesquisador • 🇳🇦 Windhoek</p>
                      </div>
                      <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        💬
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setor Turismo */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <h4 className="text-sm font-bold text-orange-900 mb-3 flex items-center gap-2">
                    🏨 Turismo (8 conexões)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="Ana Fernandes"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-900">Ana Fernandes</h5>
                        <p className="text-xs text-gray-600">Guia Turística • 🇦🇴 Benguela</p>
                      </div>
                      <button className="bg-orange-600 text-white px-2 py-1 rounded text-xs">
                        💬
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setor Comércio */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                    🛒 Comércio (8 conexões)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                        alt="Patricia Nkomo"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-900">Patricia Nkomo</h5>
                        <p className="text-xs text-gray-600">Empresária • 🇿🇦 Johannesburg</p>
                      </div>
                      <button className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                        💬
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setor Transporte */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <h4 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✈️ Transporte (2 conexões)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
                        alt="Carlos Mumbala"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-900">Carlos Mumbala</h5>
                        <p className="text-xs text-gray-600">Logística • 🇳🇦 Walvis Bay</p>
                      </div>
                      <button className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                        💬
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setor Guias Locais */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <h4 className="text-sm font-bold text-teal-900 mb-3 flex items-center gap-2">
                    📍 Guias Locais (8 conexões)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face"
                        alt="Tekla Ngoma"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-900">Tekla Ngoma</h5>
                        <p className="text-xs text-gray-600">Consultora • 🇳🇦 Windhoek</p>
                      </div>
                      <button className="bg-teal-600 text-white px-2 py-1 rounded text-xs">
                        💬
                      </button>
                    </div>
                  </div>
                </div>
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
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium text-sm"
                >
                  📤 Enviar Solicitação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                          {opportunity.location && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              📍 {opportunity.location}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-xs font-medium">
                            Candidatar
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
                Minhas Candidaturas
              </h2>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=center"
                      alt="UCT"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">Intercâmbio Médico UCT</h3>
                      <p className="text-xs text-gray-600">🇿🇦 África do Sul • Cape Town</p>
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                        <span>⏳</span>
                        Em Análise
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=60&h=60&fit=crop&crop=center"
                      alt="Telemedicina"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">Telemedicina Rural Namíbia</h3>
                      <p className="text-xs text-gray-600">🇳🇦 Namíbia • Windhoek</p>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                        <span>✅</span>
                        Aprovada
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=60&h=60&fit=crop&crop=center"
                      alt="Wits"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">Gestão Hospitalar Wits</h3>
                      <p className="text-xs text-gray-600">🇿🇦 África do Sul • Johannesburg</p>
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                        <span>❌</span>
                        Rejeitada
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
                Rede Regional SADC
              </h2>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇦🇴</div>
                  <div className="text-lg font-bold text-red-600">15</div>
                  <div className="text-xs text-gray-600">Angola</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇳🇦</div>
                  <div className="text-lg font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-600">Namíbia</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <div className="text-lg font-bold text-green-600">18</div>
                  <div className="text-xs text-gray-600">África do Sul</div>
                </div>
              </div>

              {/* Conexões Recentes Mobile */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">👥 Conexões Recentes</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=40&h=40&fit=crop&crop=face"
                      alt="Dr. Maria Silva"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">Dr. Maria Silva</h4>
                      <p className="text-xs text-gray-600">🏥 Cardiologista • 🇿🇦 Cape Town</p>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">
                      Conectar
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
                      <p className="text-xs text-gray-600">🎓 Pesquisador • 🇳🇦 Windhoek</p>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs">
                      Conectar
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

      {/* Call to Action Mobile */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 mx-4 mb-4 rounded-xl p-6 text-white text-center">
        <h2 className="text-lg font-bold mb-3">🚀 Expanda sua Rede Regional</h2>
        <p className="text-sm text-red-100 mb-4">Conecte-se com profissionais de Angola, Namíbia e África do Sul para crescer juntos.</p>
        <div className="space-y-2">
          <button className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold text-sm">
            🌍 Explorar Mais Oportunidades
          </button>
          <button className="w-full border border-white text-white py-3 rounded-lg font-semibold text-sm">
            👥 Conectar com Especialistas
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardMobile;