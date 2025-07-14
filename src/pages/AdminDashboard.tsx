import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';

interface Project {
  id: number;
  name: string;
  client: string;
  country: string;
  sector: string;
  status: string;
  priority: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  team: string[];
  description: string;
  client_organization_id?: number;
  country_id?: number;
  sector_id?: number;
  start_date?: string;
  end_date?: string;
  created_by_user_id?: number;
  location?: string;
  image_url?: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  user: string;
  country: string;
  user_name?: string;
  created_at?: string;
}

interface Country {
  id: number;
  name: string;
  code: string;
  flag_emoji: string;
  capital?: string;
  currency?: string;
  phone_prefix?: string;
}

interface Sector {
  id: number;
  name: string;
  icon_emoji: string;
  description?: string;
  color?: string;
}

interface Organization {
  id: number;
  name: string;
  type?: string;
  country_id: number;
  verified?: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  country_id?: number;
  organization_id?: number;
  verified?: boolean;
  created_at?: string;
}

interface Stats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalClients: number;
  totalTeamMembers: number;
  totalBudget: number;
  totalSpent: number;
  avgProgress: number;
}

const AdminDashboardAfricasHands: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    totalTeamMembers: 0,
    totalBudget: 0,
    totalSpent: 0,
    avgProgress: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  // Carregar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Carregar dados básicos em paralelo
        const [
          countriesResponse,
          sectorsResponse,
          organizationsResponse,
          usersResponse,
          activitiesResponse
        ] = await Promise.all([
          fetch('/api/countries'),
          fetch('/api/sectors'),
          fetch('/api/organizations'),
          fetch('/api/users'),
          fetch('/api/activities/recent')
        ]);

        // Verificar se todas as respostas são OK
        if (!countriesResponse.ok || !sectorsResponse.ok) {
          throw new Error('Erro ao carregar dados básicos');
        }

        const countriesData = await countriesResponse.json();
        const sectorsData = await sectorsResponse.json();
        
        setCountries(countriesData.data || countriesData);
        setSectors(sectorsData.data || sectorsData);

        // Carregar organizações se disponível
        if (organizationsResponse.ok) {
          const organizationsData = await organizationsResponse.json();
          setOrganizations(organizationsData.data || organizationsData);
        }

        // Carregar utilizadores se disponível
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.data || usersData);
        }

        // Carregar atividades se disponível
        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json();
          setActivities(activitiesData.data || activitiesData);
        }

        // Carregar projetos se disponível
        try {
          const projectsResponse = await fetch('/api/projects');
          if (projectsResponse.ok) {
            const projectsData = await projectsResponse.json();
            const formattedProjects = (projectsData.data || projectsData).map((project: any) => ({
              ...project,
              client: project.client_organization || 'Cliente não definido',
              startDate: project.start_date || project.startDate,
              endDate: project.end_date || project.endDate,
              team: project.team || []
            }));
            setProjects(formattedProjects);
          }
        } catch (projectError) {
          console.log('Projetos não disponíveis ainda, usando dados de exemplo');
          // Usar projetos de exemplo baseados nos dados reais
          setProjects(createExampleProjects(countriesData.data || countriesData, sectorsData.data || sectorsData));
        }

        // Calcular estatísticas
        calculateStats();

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados. Usando dados de exemplo.');
        
        // Fallback para dados de exemplo
        loadFallbackData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para criar projetos de exemplo baseados nos dados reais
  const createExampleProjects = (countriesData: Country[], sectorsData: Sector[]): Project[] => {
    const exampleProjects: Project[] = [
      {
        id: 1,
        name: 'Programa de Intercâmbio Médico Luanda',
        client: 'Hospital Geral de Luanda',
        country: countriesData.find(c => c.code === 'AO')?.name || 'Angola',
        sector: sectorsData.find(s => s.name === 'Saúde')?.name || 'Saúde',
        status: 'active',
        priority: 'high',
        budget: 85000,
        spent: 45000,
        startDate: '2024-01-15',
        endDate: '2024-08-15',
        progress: 65,
        team: ['Dr. António Silva', 'Eng. Maria Santos'],
        description: 'Programa de intercâmbio para médicos especializarem-se em cardiologia e medicina interna em Luanda.'
      },
      {
        id: 2,
        name: 'Centro de Formação Técnica Benguela',
        client: 'Instituto Técnico de Benguela',
        country: countriesData.find(c => c.code === 'AO')?.name || 'Angola',
        sector: sectorsData.find(s => s.name === 'Educação')?.name || 'Educação',
        status: 'active',
        priority: 'medium',
        budget: 80000,
        spent: 23000,
        startDate: '2024-02-01',
        endDate: '2024-09-01',
        progress: 50,
        team: ['João Kazembe', 'Sarah Nghikembua'],
        description: 'Projeto para criar centro de formação técnica em mecânica e eletricidade para jovens.'
      },
      {
        id: 3,
        name: 'Intercâmbio Universitário SADC',
        client: 'University of Cape Town',
        country: countriesData.find(c => c.code === 'ZA')?.name || 'África do Sul',
        sector: sectorsData.find(s => s.name === 'Educação')?.name || 'Educação',
        status: 'completed',
        priority: 'high',
        budget: 120000,
        spent: 118000,
        startDate: '2023-09-01',
        endDate: '2024-03-01',
        progress: 100,
        team: ['Prof. David Williams', 'Dr. Fatima Moyo'],
        description: 'Programa de intercâmbio médico com foco em cirurgia cardíaca e medicina de emergência.'
      },
      {
        id: 4,
        name: 'Turismo Sustentável Namíbia',
        client: 'Hilton Windhoek',
        country: countriesData.find(c => c.code === 'NA')?.name || 'Namíbia',
        sector: sectorsData.find(s => s.name === 'Turismo')?.name || 'Turismo',
        status: 'active',
        priority: 'medium',
        budget: 65000,
        spent: 30000,
        startDate: '2024-03-15',
        endDate: '2024-10-15',
        progress: 40,
        team: ['Ana Rodrigues', 'Tom Nghoshi'],
        description: 'Sistema de turismo sustentável para a capital da Namíbia.'
      },
      {
        id: 5,
        name: 'Plataforma de Transporte Regional',
        client: 'TAAG Angola Airlines',
        country: countriesData.find(c => c.code === 'AO')?.name || 'Angola',
        sector: sectorsData.find(s => s.name === 'Transporte')?.name || 'Transporte',
        status: 'planning',
        priority: 'high',
        budget: 150000,
        spent: 15000,
        startDate: '2024-06-01',
        endDate: '2025-02-01',
        progress: 10,
        team: ['Eng. Carlos Mbala', 'Piloto Maria Costa'],
        description: 'Sistema de transporte público sustentável integrando os três países.'
      }
    ];

    return exampleProjects;
  };

  // Função para carregar dados de fallback
  const loadFallbackData = () => {
    // Dados de fallback caso a API não esteja disponível
    const fallbackCountries: Country[] = [
      { id: 1, name: 'Angola', code: 'AO', flag_emoji: '🇦🇴', capital: 'Luanda' },
      { id: 2, name: 'Namíbia', code: 'NA', flag_emoji: '🇳🇦', capital: 'Windhoek' },
      { id: 3, name: 'África do Sul', code: 'ZA', flag_emoji: '🇿🇦', capital: 'Cidade do Cabo' }
    ];

    const fallbackSectors: Sector[] = [
      { id: 1, name: 'Saúde', icon_emoji: '🏥', color: 'green' },
      { id: 2, name: 'Educação', icon_emoji: '🎓', color: 'blue' },
      { id: 3, name: 'Turismo', icon_emoji: '🏨', color: 'orange' },
      { id: 4, name: 'Comércio', icon_emoji: '🛒', color: 'purple' },
      { id: 5, name: 'Transporte', icon_emoji: '✈️', color: 'indigo' },
      { id: 6, name: 'Tecnologia', icon_emoji: '💻', color: 'pink' }
    ];

    setCountries(fallbackCountries);
    setSectors(fallbackSectors);
    setProjects(createExampleProjects(fallbackCountries, fallbackSectors));
  };

  // Calcular estatísticas baseadas nos dados carregados
  const calculateStats = () => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0);
    const avgProgress = projects.length > 0 
      ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)
      : 0;

    setStats({
      totalProjects,
      activeProjects,
      completedProjects,
      totalClients: organizations.length || 45,
      totalTeamMembers: users.length || 28,
      totalBudget,
      totalSpent,
      avgProgress
    });
  };

  // Recalcular estatísticas quando projetos mudarem
  useEffect(() => {
    if (projects.length > 0) {
      calculateStats();
    }
  }, [projects, organizations, users]);

  // Ações rápidas para navegação
  const quickActions: QuickAction[] = [
    {
      id: 'create-project',
      title: t('quickAction.createProject'),
      description: t('quickAction.newRegionalProject'),
      icon: '🚀',
      link: '/admin/create-project',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'manage-clients',
      title: t('quickAction.manageClients'),
      description: t('quickAction.clientsPartners'),
      icon: '🤝',
      link: '/admin/clients',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'view-analytics',
      title: t('quickAction.viewAnalytics'),
      description: t('quickAction.kpisMetrics'),
      icon: '📊',
      link: '/admin/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'team-management',
      title: t('quickAction.teamManagement'),
      description: t('quickAction.regionalTeam'),
      icon: '👥',
      link: '/admin/team',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      id: 'finance-management',
      title: t('quickAction.finance'),
      description: t('quickAction.financialManagement'),
      icon: '💰',
      link: '/admin/finance',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'projects-management',
      title: t('quickAction.allProjects'),
      description: t('quickAction.completeManagement'),
      icon: '📋',
      link: '/admin/projects',
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  // Atividades recentes - usar dados da API ou fallback
  const recentActivities: Activity[] = activities.length > 0 ? activities : [
    {
      id: 1,
      type: 'project_completed',
      title: t('activities.projectCompleted'),
      description: t('activities.universityExchangeCompleted'),
      time: t('activities.time.twoHoursAgo'),
      user: 'Prof. David Williams',
      country: t('country.southAfrica')
    },
    {
      id: 2,
      type: 'client_added',
      title: t('activities.newClient'),
      description: t('activities.hiltonWindhoekAdded'),
      time: t('activities.time.oneDayAgo'),
      user: 'Ana Rodrigues',
      country: t('country.namibia')
    },
    {
      id: 3,
      type: 'team_member',
      title: t('activities.newTeamMember'),
      description: t('activities.antonioSilvaJoined'),
      time: t('activities.time.twoDaysAgo'),
      user: 'Valdimir Esteves',
      country: t('country.angola')
    },
    {
      id: 4,
      type: 'budget_updated',
      title: t('activities.budgetUpdated'),
      description: t('activities.telemedicineBudgetAdjusted'),
      time: t('activities.time.threeDaysAgo'),
      user: 'Eng. Maria Santos',
      country: t('country.angola')
    },
    {
      id: 5,
      type: 'report_generated',
      title: t('activities.reportGenerated'),
      description: t('activities.q2ReportAvailable'),
      time: t('activities.time.fiveDaysAgo'),
      user: t('activities.system'),
      country: t('activities.regional')
    }
  ];

  const getCountryFlag = (country: string) => {
    const countryData = countries.find(c => c.name === country);
    if (countryData) return countryData.flag_emoji;
    
    const flags = {
      [t('country.angola')]: '🇦🇴',
      [t('country.namibia')]: '🇳🇦',
      [t('country.southAfrica')]: '🇿🇦',
      [t('activities.regional')]: '🌍'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const getSectorIcon = (sector: string) => {
    const sectorData = sectors.find(s => s.name === sector);
    if (sectorData) return sectorData.icon_emoji;
    
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

  const getActivityIcon = (type: string) => {
    const icons = {
      'project_completed': '✅',
      'client_added': '🤝',
      'team_member': '👤',
      'budget_updated': '💰',
      'report_generated': '📊'
    };
    return icons[type as keyof typeof icons] || '📋';
  };

  const getActivityColor = (type: string) => {
    const colors = {
      'project_completed': 'bg-green-100 text-green-600',
      'client_added': 'bg-blue-100 text-blue-600',
      'team_member': 'bg-purple-100 text-purple-600',
      'budget_updated': 'bg-yellow-100 text-yellow-600',
      'report_generated': 'bg-indigo-100 text-indigo-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  const handleQuickAction = (action: QuickAction) => {
    console.log(`${t('navigation.navigatingTo')}: ${action.link}`);
  };

  const handleCreateProject = async () => {
    console.log(t('navigation.navigatingToCreateProject'));
    // Implementar criação de projeto via API
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Novo Projeto Regional',
          description: 'Descrição do projeto...',
          // outros campos necessários
        })
      });
      
      if (response.ok) {
        // Recarregar projetos
        const projectsResponse = await fetch('/api/projects');
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData.data || projectsData);
        }
      }
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  const handleViewAllProjects = () => {
    console.log(t('navigation.navigatingToAllProjects'));
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Carregando Dashboard Admin</h2>
          <p className="text-gray-600">Conectando à base de dados Elves...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mostrar erro se houver */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Aviso</h3>
              <p className="text-sm text-yellow-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header Principal */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleCreateProject}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('dashboard.newRegionalProject')}
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {t('dashboard.regionalReport')}
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('stats.regionalProjects')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">🇦🇴🇳🇦🇿🇦</span>
            <span className="text-gray-500 ml-1">{t('stats.trilateralCooperation')}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('stats.inProgress')}</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.activeProjects}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <svg className="h-4 w-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-green-600">{t('stats.progress')}: {stats.avgProgress}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('stats.completed')}</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedProjects}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">{t('stats.successRate')}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('stats.clients')}</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalClients}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🤝</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">{t('stats.countriesServed')}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('stats.team')}</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.totalTeamMembers}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">{t('stats.activeProfessionals')}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('stats.investment')}</p>
              <p className="text-2xl font-bold text-pink-600">
                ${(stats.totalBudget / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="p-3 bg-pink-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">
              {stats.totalBudget > 0 ? ((stats.totalSpent / stats.totalBudget) * 100).toFixed(1) : 0}{t('stats.executed')}
            </span>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.quickActions')}</h2>
          <span className="text-sm text-gray-500">{t('dashboard.quickActionsDesc')}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className={`${action.color} text-white p-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{action.icon}</div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal - Projetos e Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Projetos por País */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.projectsByCountry')}</h2>
            <button 
              onClick={handleViewAllProjects}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              {t('dashboard.viewAll')} →
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            {countries.map((country) => {
              const countryProjects = projects.filter(p => p.country === country.name);
              const countryBudget = countryProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
              const avgProgress = countryProjects.length > 0 
                ? Math.round(countryProjects.reduce((sum, p) => sum + (p.progress || 0), 0) / countryProjects.length)
                : 0;
              
              return (
                <div key={country.id} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-3">{country.flag_emoji}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{countryProjects.length}</div>
                  <div className="text-sm text-gray-600 mb-2">{country.name}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    ${(countryBudget / 1000).toFixed(0)}K {t('stats.invested')}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${avgProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{avgProgress}% {t('stats.progress')}</div>
                </div>
              );
            })}
          </div>

          {/* Lista de Projetos Recentes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.recentProjects')}</h3>
            <div className="space-y-3">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                     onClick={() => setSelectedProject(project)}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span>{getCountryFlag(project.country)}</span>
                      <span>{getSectorIcon(project.sector)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status === 'active' ? 'Ativo' :
                       project.status === 'completed' ? 'Completo' :
                       project.status === 'planning' ? 'Planeamento' : project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.recentActivities')}</h2>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              {t('dashboard.viewAll')} →
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <span className="text-sm">{getActivityIcon(activity.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <span className="text-xs">{getCountryFlag(activity.country)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-400">{activity.time || 'Recente'}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-400">{activity.user || activity.user_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status do Sistema */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">{t('dashboard.systemStatus')}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">{t('dashboard.operational')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">{t('system.servers')}</span>
                <span className="text-green-600">{t('system.online')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">{t('system.api')}</span>
                <span className="text-green-600">{t('system.functioning')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">{t('system.backup')}</span>
                <span className="text-blue-600">{t('system.lastToday')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes do Projeto */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                  <p className="text-gray-600">
                    {getCountryFlag(selectedProject.country)} {selectedProject.country} • {getSectorIcon(selectedProject.sector)} {selectedProject.sector}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">{t('modal.projectInfo')}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('project.client')}:</span> 
                      <span className="font-medium">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('form.status')}:</span> 
                      <span className={`font-medium ${
                        selectedProject.status === 'active' ? 'text-yellow-600' :
                        selectedProject.status === 'completed' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {selectedProject.status === 'active' ? 'Ativo' :
                         selectedProject.status === 'completed' ? 'Completo' :
                         selectedProject.status === 'planning' ? 'Planeamento' : selectedProject.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('form.priority')}:</span> 
                      <span className={`font-medium ${
                        selectedProject.priority === 'high' ? 'text-red-600' :
                        selectedProject.priority === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {selectedProject.priority === 'high' ? 'Alta' :
                         selectedProject.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('modal.start')}:</span> 
                      <span className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('modal.end')}:</span> 
                      <span className="font-medium">{new Date(selectedProject.endDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">{t('modal.financial')}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('project.budget')}:</span> 
                      <span className="font-medium text-green-600">
                        {selectedProject.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('project.spent')}:</span> 
                      <span className="font-medium text-red-600">
                        {selectedProject.spent.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('project.remaining')}:</span> 
                      <span className="font-medium text-blue-600">
                        {(selectedProject.budget - selectedProject.spent).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('stats.progress')}:</span> 
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{t('stats.progress')} do Projeto</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">{t('modal.projectDescription')}</h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">{t('modal.projectTeam')}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-full text-sm border border-red-200">
                      <span>👤</span>
                      <span className="font-medium">{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">{t('modal.timeline')}</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{t('modal.start')}</span>
                      <span className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-1 bg-gray-200 rounded-full">
                        <div 
                          className="h-1 bg-red-500 rounded-full" 
                          style={{ width: `${selectedProject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{t('modal.end')}</span>
                      <span className="font-medium">{new Date(selectedProject.endDate).toLocaleDateString('pt-BR')}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedProject.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  {t('btn.close')}
                </button>
                <button 
                  onClick={() => {
                    console.log('Editando projeto:', selectedProject.id);
                    setSelectedProject(null);
                  }}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  {t('btn.editProject')}
                </button>
                <button 
                  onClick={() => {
                    console.log('Ver detalhes completos do projeto:', selectedProject.id);
                    setSelectedProject(null);
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {t('btn.viewDetails')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seção de Estatísticas Detalhadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Performance por Setor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('dashboard.performanceBySector')}</h2>
          
          <div className="space-y-4">
            {sectors.map((sector) => {
              const sectorProjects = projects.filter(p => p.sector === sector.name);
              const sectorBudget = sectorProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
              const avgProgress = sectorProjects.length > 0 
                ? Math.round(sectorProjects.reduce((sum, p) => sum + (p.progress || 0), 0) / sectorProjects.length)
                : 0;
              
              return (
                <div key={sector.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{sector.icon_emoji}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{sector.name}</h3>
                      <p className="text-sm text-gray-600">
                        {sectorProjects.length} projeto{sectorProjects.length !== 1 ? 's' : ''} • 
                        ${(sectorBudget / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${avgProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12">{avgProgress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('dashboard.financialSummary')}</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">{t('stats.totalRevenue')}</p>
                  <p className="text-2xl font-bold text-green-700">
                    {stats.totalBudget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">{t('stats.totalSpent')}</p>
                  <p className="text-2xl font-bold text-red-700">
                    {stats.totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
                <div className="text-3xl">📉</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">{t('stats.currentProfit')}</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {(stats.totalBudget - stats.totalSpent).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">{t('stats.profitMargin')}</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {stats.totalBudget > 0 ? ((stats.totalBudget - stats.totalSpent) / stats.totalBudget * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Notificações e Alertas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.alertsNotifications')}</h2>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            {t('notifications.markAllAsRead')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600">⚠️</span>
              </div>
              <div>
                <h3 className="font-medium text-yellow-800">{t('alert.upcomingDeadline')}</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  {t('alerts.sustainableTourismDeadline')}
                </p>
                <p className="text-xs text-yellow-600 mt-2">{t('country.namibia')} • {t('projects.clients.hiltonWindhoek')}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">🚨</span>
              </div>
              <div>
                <h3 className="font-medium text-red-800">{t('alert.highBudget')}</h3>
                <p className="text-sm text-red-700 mt-1">
                  {t('alerts.telemedicineBudgetHigh')}
                </p>
                <p className="text-xs text-red-600 mt-2">{t('country.angola')} • {t('projects.clients.sagradaEsperanca')}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">🎉</span>
              </div>
              <div>
                <h3 className="font-medium text-green-800">{t('alert.projectCompleted')}</h3>
                <p className="text-sm text-green-700 mt-1">
                  {t('alerts.universityExchangeSuccess')}
                </p>
                <p className="text-xs text-green-600 mt-2">{t('country.southAfrica')} • {t('projects.clients.uct')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer com Informações da Empresa */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company.name')}</h3>
            <p className="text-red-100 text-sm leading-relaxed">
              {t('company.description')}
            </p>
            <div className="mt-4 text-sm text-red-200">
              <p>📍 {t('company.officesInCities')}</p>
              <p>🌍 {t('company.regionalCoverage')}</p>
              <p>🚀 {stats.totalProjects} {t('company.activeProjects')}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('dashboard.ourOffices')}</h3>
            <div className="space-y-2 text-sm text-red-100">
              <div className="flex items-center gap-2">
                <span>🇦🇴</span>
                <span>{t('offices.angola')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🇳🇦</span>
                <span>{t('offices.namibia')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🇿🇦</span>
                <span>{t('offices.southAfrica')}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('user.contact')}</h3>
            <div className="space-y-2 text-sm text-red-100">
              <p>📞 {t('user.phoneAngola')}</p>
              <p>📞 {t('user.phoneNamibia')}</p>
              <p>📧 contato@africashands.com</p>
              <p>🌐 www.africashands.com</p>
            </div>
            <div className="mt-4 pt-4 border-t border-red-500">
              <p className="text-xs text-red-200">
                {t('company.version')}
              </p>
              <p className="text-xs text-red-200">
                {t('company.developer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardAfricasHands;