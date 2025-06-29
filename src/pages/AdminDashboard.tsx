import React, { useState } from 'react';
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
}

const AdminDashboardAfricasHands: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useTranslation();

  // Dados dos projetos regionais
  const projects: Project[] = [
    {
      id: 1,
      name: t('projects.regionalTelemedicine'),
      client: t('projects.clients.sagradaEsperanca'),
      country: t('country.angola'),
      sector: t('sector.health'),
      status: t('status.active'),
      priority: t('priority.high'),
      budget: 85000,
      spent: 45000,
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      progress: 65,
      team: ['Dr. António Silva', 'Eng. Maria Santos'],
      description: t('projects.regionalTelemedicineDesc')
    },
    {
      id: 2,
      name: t('projects.africanCraftsMarketplace'),
      client: t('projects.clients.himbaArtisans'),
      country: t('country.namibia'),
      sector: t('sector.commerce'),
      status: t('status.active'),
      priority: t('priority.medium'),
      budget: 45000,
      spent: 23000,
      startDate: '2024-02-01',
      endDate: '2024-09-01',
      progress: 50,
      team: ['João Kazembe', 'Sarah Nghikembua'],
      description: t('projects.africanCraftsMarketplaceDesc')
    },
    {
      id: 3,
      name: t('projects.universityExchange'),
      client: t('projects.clients.uct'),
      country: t('country.southAfrica'),
      sector: t('sector.education'),
      status: t('status.completed'),
      priority: t('priority.high'),
      budget: 120000,
      spent: 118000,
      startDate: '2023-09-01',
      endDate: '2024-03-01',
      progress: 100,
      team: ['Prof. David Williams', 'Dr. Fatima Moyo'],
      description: t('projects.universityExchangeDesc')
    },
    {
      id: 4,
      name: t('projects.sustainableTourismApp'),
      client: t('projects.clients.hiltonWindhoek'),
      country: t('country.namibia'),
      sector: t('sector.tourism'),
      status: t('status.active'),
      priority: t('priority.medium'),
      budget: 65000,
      spent: 30000,
      startDate: '2024-03-15',
      endDate: '2024-10-15',
      progress: 40,
      team: ['Ana Rodrigues', 'Tom Nghoshi'],
      description: t('projects.sustainableTourismAppDesc')
    },
    {
      id: 5,
      name: t('projects.regionalTransportPlatform'),
      client: t('projects.clients.taagAngola'),
      country: t('country.angola'),
      sector: t('sector.transport'),
      status: t('status.planning'),
      priority: t('priority.high'),
      budget: 150000,
      spent: 15000,
      startDate: '2024-06-01',
      endDate: '2025-02-01',
      progress: 10,
      team: ['Eng. Carlos Mbala', 'Piloto Maria Costa'],
      description: t('projects.regionalTransportPlatformDesc')
    }
  ];

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

  // Atividades recentes
  const recentActivities: Activity[] = [
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

  const countries = [t('country.angola'), t('country.namibia'), t('country.southAfrica')];
  const sectors = [t('sector.health'), t('sector.education'), t('sector.tourism'), t('sector.commerce'), t('sector.transport'), t('sector.technology')];

  // Estatísticas regionais
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === t('status.active')).length,
    completedProjects: projects.filter(p => p.status === t('status.completed')).length,
    totalClients: 45,
    totalTeamMembers: 28,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  const getCountryFlag = (country: string) => {
    const flags = {
      [t('country.angola')]: '🇦🇴',
      [t('country.namibia')]: '🇳🇦',
      [t('country.southAfrica')]: '🇿🇦',
      [t('activities.regional')]: '🌍'
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

  const handleCreateProject = () => {
    console.log(t('navigation.navigatingToCreateProject'));
  };

  const handleViewAllProjects = () => {
    console.log(t('navigation.navigatingToAllProjects'));
  };

  return (
    <div className="space-y-6">
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
              {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}{t('stats.executed')}
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
              const countryProjects = projects.filter(p => p.country === country);
              const countryBudget = countryProjects.reduce((sum, p) => sum + p.budget, 0);
              const avgProgress = countryProjects.length > 0 
                ? Math.round(countryProjects.reduce((sum, p) => sum + p.progress, 0) / countryProjects.length)
                : 0;
              
              return (
                <div key={country} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-3">{getCountryFlag(country)}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{countryProjects.length}</div>
                  <div className="text-sm text-gray-600 mb-2">{country}</div>
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
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                      project.status === t('status.active') ? 'bg-yellow-100 text-yellow-800' :
                      project.status === t('status.completed') ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
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
                    <p className="text-xs text-gray-400">{activity.time}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-400">{activity.user}</p>
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
                        selectedProject.status === t('status.active') ? 'text-yellow-600' :
                        selectedProject.status === t('status.completed') ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('form.priority')}:</span> 
                      <span className={`font-medium ${
                        selectedProject.priority === t('priority.high') ? 'text-red-600' :
                        selectedProject.priority === t('priority.medium') ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {selectedProject.priority}
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
                        selectedProject.status === t('status.completed') ? 'bg-green-500' : 'bg-gray-300'
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
              const sectorProjects = projects.filter(p => p.sector === sector);
              const sectorBudget = sectorProjects.reduce((sum, p) => sum + p.budget, 0);
              const avgProgress = sectorProjects.length > 0 
                ? Math.round(sectorProjects.reduce((sum, p) => sum + p.progress, 0) / sectorProjects.length)
                : 0;
              
              return (
                <div key={sector} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{getSectorIcon(sector)}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{sector}</h3>
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
                    {((stats.totalBudget - stats.totalSpent) / stats.totalBudget * 100).toFixed(1)}%
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