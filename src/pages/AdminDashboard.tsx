import React, { useState } from 'react';

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

  // Dados dos projetos regionais
  const projects: Project[] = [
    {
      id: 1,
      name: 'Rede de Telemedicina Regional',
      client: 'Clínica Sagrada Esperança',
      country: 'Angola',
      sector: 'Saúde',
      status: 'Em Andamento',
      priority: 'Alta',
      budget: 85000,
      spent: 45000,
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      progress: 65,
      team: ['Dr. António Silva', 'Eng. Maria Santos'],
      description: 'Sistema de telemedicina conectando Angola, Namíbia e África do Sul'
    },
    {
      id: 2,
      name: 'Marketplace de Artesanato Africano',
      client: 'Associação de Artesãos Himba',
      country: 'Namíbia',
      sector: 'Comércio',
      status: 'Em Andamento',
      priority: 'Média',
      budget: 45000,
      spent: 23000,
      startDate: '2024-02-01',
      endDate: '2024-09-01',
      progress: 50,
      team: ['João Kazembe', 'Sarah Nghikembua'],
      description: 'Plataforma de e-commerce para produtos artesanais da região'
    },
    {
      id: 3,
      name: 'Sistema de Intercâmbio Universitário',
      client: 'University of Cape Town',
      country: 'África do Sul',
      sector: 'Educação',
      status: 'Concluído',
      priority: 'Alta',
      budget: 120000,
      spent: 118000,
      startDate: '2023-09-01',
      endDate: '2024-03-01',
      progress: 100,
      team: ['Prof. David Williams', 'Dr. Fatima Moyo'],
      description: 'Portal de intercâmbio entre universidades dos 3 países'
    },
    {
      id: 4,
      name: 'App de Turismo Sustentável',
      client: 'Hilton Windhoek',
      country: 'Namíbia',
      sector: 'Turismo',
      status: 'Em Andamento',
      priority: 'Média',
      budget: 65000,
      spent: 30000,
      startDate: '2024-03-15',
      endDate: '2024-10-15',
      progress: 40,
      team: ['Ana Rodrigues', 'Tom Nghoshi'],
      description: 'Aplicativo para roteiros turísticos integrados na região'
    },
    {
      id: 5,
      name: 'Plataforma de Transporte Regional',
      client: 'TAAG Angola Airlines',
      country: 'Angola',
      sector: 'Transporte',
      status: 'Planejamento',
      priority: 'Alta',
      budget: 150000,
      spent: 15000,
      startDate: '2024-06-01',
      endDate: '2025-02-01',
      progress: 10,
      team: ['Eng. Carlos Mbala', 'Piloto Maria Costa'],
      description: 'Sistema integrado de reservas e rastreamento de voos regionais'
    }
  ];

  // Ações rápidas para navegação
  const quickActions: QuickAction[] = [
    {
      id: 'create-project',
      title: 'Criar Projeto',
      description: 'Novo projeto regional',
      icon: '🚀',
      link: '/admin/create-project',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'manage-clients',
      title: 'Gerenciar Clientes',
      description: 'Clientes & Parceiros',
      icon: '🤝',
      link: '/admin/clients',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'view-analytics',
      title: 'Ver Analytics',
      description: 'KPIs e métricas',
      icon: '📊',
      link: '/admin/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'team-management',
      title: 'Gestão de Equipe',
      description: 'Equipe regional',
      icon: '👥',
      link: '/admin/team',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      id: 'finance-management',
      title: 'Financeiro',
      description: 'Gestão financeira',
      icon: '💰',
      link: '/admin/finance',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'projects-management',
      title: 'Todos os Projetos',
      description: 'Gestão completa',
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
      title: 'Projeto Concluído',
      description: 'Sistema de Intercâmbio Universitário finalizado com sucesso',
      time: '2 horas atrás',
      user: 'Prof. David Williams',
      country: 'África do Sul'
    },
    {
      id: 2,
      type: 'client_added',
      title: 'Novo Cliente',
      description: 'Hilton Windhoek adicionado como parceiro',
      time: '1 dia atrás',
      user: 'Ana Rodrigues',
      country: 'Namíbia'
    },
    {
      id: 3,
      type: 'team_member',
      title: 'Novo Membro da Equipe',
      description: 'Dr. António Silva se juntou à equipe de Saúde',
      time: '2 dias atrás',
      user: 'Valdimir Esteves',
      country: 'Angola'
    },
    {
      id: 4,
      type: 'budget_updated',
      title: 'Orçamento Atualizado',
      description: 'Orçamento do projeto de Telemedicina ajustado',
      time: '3 dias atrás',
      user: 'Eng. Maria Santos',
      country: 'Angola'
    },
    {
      id: 5,
      type: 'report_generated',
      title: 'Relatório Gerado',
      description: 'Relatório Q2 2024 - Performance Regional disponível',
      time: '5 dias atrás',
      user: 'Sistema',
      country: 'Regional'
    }
  ];

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia'];

  // Estatísticas regionais
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'Em Andamento').length,
    completedProjects: projects.filter(p => p.status === 'Concluído').length,
    totalClients: 45, // Exemplo
    totalTeamMembers: 28, // Exemplo
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦',
      'Regional': '🌍'
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
    // Aqui você implementaria a navegação real
    console.log(`Navegando para: ${action.link}`);
    // window.location.href = action.link; // ou useNavigate() se usando React Router
  };

  const handleCreateProject = () => {
    console.log('Navegando para criar projeto');
    // window.location.href = '/admin/create-project';
  };

  const handleViewAllProjects = () => {
    console.log('Navegando para todos os projetos');
    // window.location.href = '/admin/projects';
  };

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Africa's Hands - Dashboard</h1>
          <p className="text-gray-600">Painel principal de gestão regional Angola • Namíbia • África do Sul</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleCreateProject}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Projeto Regional
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Relatório Regional
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projetos Regionais</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">🇦🇴🇳🇦🇿🇦</span>
            <span className="text-gray-500 ml-1">Cooperação trilateral</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Andamento</p>
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
            <span className="text-green-600">Progresso: {stats.avgProgress}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedProjects}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">100% taxa de sucesso</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalClients}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🤝</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">3 países atendidos</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Equipe</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.totalTeamMembers}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Profissionais ativos</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Investimento</p>
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
              {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}% executado
            </span>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Ações Rápidas</h2>
          <span className="text-sm text-gray-500">Acesso direto às principais funcionalidades</span>
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
            <h2 className="text-xl font-semibold text-gray-900">Projetos por País</h2>
            <button 
              onClick={handleViewAllProjects}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Ver todos →
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
                    ${(countryBudget / 1000).toFixed(0)}K investidos
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${avgProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{avgProgress}% progresso</div>
                </div>
              );
            })}
          </div>

          {/* Lista de Projetos Recentes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Projetos Recentes</h3>
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
                      project.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-800' :
                      project.status === 'Concluído' ? 'bg-green-100 text-green-800' :
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
            <h2 className="text-xl font-semibold text-gray-900">Atividades Recentes</h2>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Ver todas →
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
              <h3 className="text-sm font-semibold text-gray-900">Status do Sistema</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">Operacional</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Servidores</span>
                <span className="text-green-600">100% Online</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">API</span>
                <span className="text-green-600">Funcionando</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Backup</span>
                <span className="text-blue-600">Último: hoje</span>
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
                  <h3 className="font-semibold text-gray-900 mb-3">Informações do Projeto</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cliente:</span> 
                      <span className="font-medium">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span> 
                      <span className={`font-medium ${
                        selectedProject.status === 'Em Andamento' ? 'text-yellow-600' :
                        selectedProject.status === 'Concluído' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Prioridade:</span> 
                      <span className={`font-medium ${
                        selectedProject.priority === 'Alta' ? 'text-red-600' :
                        selectedProject.priority === 'Média' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {selectedProject.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Início:</span> 
                      <span className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Término:</span> 
                      <span className="font-medium">{new Date(selectedProject.endDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Financeiro</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Orçamento:</span> 
                      <span className="font-medium text-green-600">
                        {selectedProject.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gasto:</span> 
                      <span className="font-medium text-red-600">
                        {selectedProject.spent.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Restante:</span> 
                      <span className="font-medium text-blue-600">
                        {(selectedProject.budget - selectedProject.spent).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Progresso:</span> 
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                  </div>
                  
                  {/* Barra de progresso visual */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progresso do Projeto</span>
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
                <h3 className="font-semibold text-gray-900 mb-3">Descrição do Projeto</h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Equipe do Projeto</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-full text-sm border border-red-200">
                      <span>👤</span>
                      <span className="font-medium">{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline do projeto */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Início</span>
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
                      <span className="text-gray-600">Término</span>
                      <span className="font-medium">{new Date(selectedProject.endDate).toLocaleDateString('pt-BR')}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedProject.status === 'Concluído' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ações do modal */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Fechar
                </button>
                <button 
                  onClick={() => {
                    console.log('Editando projeto:', selectedProject.id);
                    setSelectedProject(null);
                  }}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Editar Projeto
                </button>
                <button 
                  onClick={() => {
                    console.log('Ver detalhes completos do projeto:', selectedProject.id);
                    setSelectedProject(null);
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Ver Detalhes
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance por Setor</h2>
          
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumo Financeiro Regional</h2>
          
          <div className="space-y-6">
            {/* Card de Receita Total */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Receita Total</p>
                  <p className="text-2xl font-bold text-green-700">
                    {stats.totalBudget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </div>

            {/* Card de Gastos */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Total Gasto</p>
                  <p className="text-2xl font-bold text-red-700">
                    {stats.totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
                <div className="text-3xl">📉</div>
              </div>
            </div>

            {/* Card de Lucro */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Lucro Atual</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {(stats.totalBudget - stats.totalSpent).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </div>

            {/* Margem de Lucro */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Margem de Lucro</p>
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
          <h2 className="text-xl font-semibold text-gray-900">Alertas e Notificações</h2>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Marcar todas como lidas
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Alerta de Projeto */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600">⚠️</span>
              </div>
              <div>
                <h3 className="font-medium text-yellow-800">Prazo Próximo</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  O projeto "App de Turismo Sustentável" tem prazo até 15/10/2024
                </p>
                <p className="text-xs text-yellow-600 mt-2">Namíbia • Hilton Windhoek</p>
              </div>
            </div>
          </div>

          {/* Alerta de Orçamento */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">🚨</span>
              </div>
              <div>
                <h3 className="font-medium text-red-800">Orçamento Alto</h3>
                <p className="text-sm text-red-700 mt-1">
                  Projeto de Telemedicina já utilizou 53% do orçamento
                </p>
                <p className="text-xs text-red-600 mt-2">Angola • Clínica Sagrada Esperança</p>
              </div>
            </div>
          </div>

          {/* Notificação Positiva */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">🎉</span>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Projeto Concluído</h3>
                <p className="text-sm text-green-700 mt-1">
                  Sistema de Intercâmbio finalizado com sucesso!
                </p>
                <p className="text-xs text-green-600 mt-2">África do Sul • UCT</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer com Informações da Empresa */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Informações da Empresa */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Africa's Hands</h3>
            <p className="text-red-100 text-sm leading-relaxed">
              Conectando Angola, Namíbia e África do Sul através da cooperação regional, 
              inovação tecnológica e desenvolvimento sustentável.
            </p>
            <div className="mt-4 text-sm text-red-200">
              <p>📍 Escritórios em 6 cidades</p>
              <p>🌍 Cobertura regional SADC</p>
              <p>🚀 {stats.totalProjects} projetos ativos</p>
            </div>
          </div>

          {/* Escritórios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nossos Escritórios</h3>
            <div className="space-y-2 text-sm text-red-100">
              <div className="flex items-center gap-2">
                <span>🇦🇴</span>
                <span>Angola: Cunene, Lubango</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🇳🇦</span>
                <span>Namíbia: Oshakati, Windhoek</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🇿🇦</span>
                <span>África do Sul: Cape Town, Joburg</span>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-sm text-red-100">
              <p>📞 +244 924 166 401 (Angola)</p>
              <p>📞 +264 817 049 40 (Namíbia)</p>
              <p>📧 contato@africashands.com</p>
              <p>🌐 www.africashands.com</p>
            </div>
            <div className="mt-4 pt-4 border-t border-red-500">
              <p className="text-xs text-red-200">
                © 2024 Africa's Hands • Desenvolvido por Valdimir Jacinto Esteves
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardAfricasHands;