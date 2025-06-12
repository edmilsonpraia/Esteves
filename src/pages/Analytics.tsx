import React, { useState } from 'react';

interface AnalyticsData {
  period: string;
  projects: number;
  revenue: number;
  clients: number;
  teamMembers: number;
}

interface CountryMetrics {
  country: string;
  flag: string;
  projects: number;
  revenue: number;
  clients: number;
  teamSize: number;
  avgProgress: number;
  topSector: string;
}

interface SectorPerformance {
  sector: string;
  icon: string;
  projects: number;
  revenue: number;
  avgProgress: number;
  growth: number;
  status: 'growing' | 'stable' | 'declining';
}

interface ProjectHealth {
  id: number;
  name: string;
  country: string;
  progress: number;
  budget: number;
  spent: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  daysRemaining: number;
}

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Dados de analytics por período
  const analyticsData: AnalyticsData[] = [
    { period: '2024-01', projects: 3, revenue: 180000, clients: 35, teamMembers: 22 },
    { period: '2024-02', projects: 4, revenue: 220000, clients: 38, teamMembers: 24 },
    { period: '2024-03', projects: 5, revenue: 265000, clients: 42, teamMembers: 26 },
    { period: '2024-04', projects: 4, revenue: 285000, clients: 43, teamMembers: 27 },
    { period: '2024-05', projects: 5, revenue: 315000, clients: 45, teamMembers: 28 },
    { period: '2024-06', projects: 5, revenue: 465000, clients: 45, teamMembers: 28 }
  ];

  // Métricas por país
  const countryMetrics: CountryMetrics[] = [
    {
      country: 'Angola',
      flag: '🇦🇴',
      projects: 2,
      revenue: 235000,
      clients: 15,
      teamSize: 8,
      avgProgress: 62,
      topSector: 'Saúde'
    },
    {
      country: 'Namíbia',
      flag: '🇳🇦',
      projects: 2,
      revenue: 110000,
      clients: 12,
      teamSize: 6,
      avgProgress: 45,
      topSector: 'Comércio'
    },
    {
      country: 'África do Sul',
      flag: '🇿🇦',
      projects: 1,
      revenue: 120000,
      clients: 18,
      teamSize: 14,
      avgProgress: 100,
      topSector: 'Educação'
    }
  ];

  // Performance por setor
  const sectorPerformance: SectorPerformance[] = [
    {
      sector: 'Saúde',
      icon: '🏥',
      projects: 1,
      revenue: 85000,
      avgProgress: 65,
      growth: 15.5,
      status: 'growing'
    },
    {
      sector: 'Educação',
      icon: '🎓',
      projects: 1,
      revenue: 120000,
      avgProgress: 100,
      growth: 8.2,
      status: 'stable'
    },
    {
      sector: 'Comércio',
      icon: '🛒',
      projects: 1,
      revenue: 45000,
      avgProgress: 50,
      growth: 22.8,
      status: 'growing'
    },
    {
      sector: 'Turismo',
      icon: '🏨',
      projects: 1,
      revenue: 65000,
      avgProgress: 40,
      growth: 5.1,
      status: 'stable'
    },
    {
      sector: 'Transporte',
      icon: '✈️',
      projects: 1,
      revenue: 150000,
      avgProgress: 10,
      growth: -2.3,
      status: 'declining'
    },
    {
      sector: 'Tecnologia',
      icon: '💻',
      projects: 0,
      revenue: 0,
      avgProgress: 0,
      growth: 0,
      status: 'stable'
    }
  ];

  // Saúde dos projetos
  const projectHealth: ProjectHealth[] = [
    {
      id: 1,
      name: 'Rede de Telemedicina Regional',
      country: 'Angola',
      progress: 65,
      budget: 85000,
      spent: 45000,
      health: 'good',
      daysRemaining: 67
    },
    {
      id: 2,
      name: 'Marketplace de Artesanato Africano',
      country: 'Namíbia',
      progress: 50,
      budget: 45000,
      spent: 23000,
      health: 'excellent',
      daysRemaining: 92
    },
    {
      id: 3,
      name: 'Sistema de Intercâmbio Universitário',
      country: 'África do Sul',
      progress: 100,
      budget: 120000,
      spent: 118000,
      health: 'excellent',
      daysRemaining: 0
    },
    {
      id: 4,
      name: 'App de Turismo Sustentável',
      country: 'Namíbia',
      progress: 40,
      budget: 65000,
      spent: 30000,
      health: 'warning',
      daysRemaining: 127
    },
    {
      id: 5,
      name: 'Plataforma de Transporte Regional',
      country: 'Angola',
      progress: 10,
      budget: 150000,
      spent: 15000,
      health: 'critical',
      daysRemaining: 235
    }
  ];

  const periods = [
    { value: '3months', label: 'Últimos 3 meses' },
    { value: '6months', label: 'Últimos 6 meses' },
    { value: '1year', label: 'Último ano' },
    { value: 'all', label: 'Todo período' }
  ];

  const metrics = [
    { value: 'revenue', label: 'Receita', icon: '💰', color: 'text-green-600' },
    { value: 'projects', label: 'Projetos', icon: '🚀', color: 'text-blue-600' },
    { value: 'clients', label: 'Clientes', icon: '🤝', color: 'text-purple-600' },
    { value: 'team', label: 'Equipe', icon: '👥', color: 'text-indigo-600' }
  ];

  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const getHealthColor = (health: string) => {
    const colors = {
      'excellent': 'bg-green-100 text-green-800',
      'good': 'bg-blue-100 text-blue-800',
      'warning': 'bg-yellow-100 text-yellow-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[health as keyof typeof colors];
  };

  const getHealthIcon = (health: string) => {
    const icons = {
      'excellent': '🎯',
      'good': '✅',
      'warning': '⚠️',
      'critical': '🚨'
    };
    return icons[health as keyof typeof icons];
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 10) return 'text-green-600';
    if (growth > 0) return 'text-blue-600';
    if (growth > -5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return '📈';
    if (growth < 0) return '📉';
    return '➡️';
  };

  const calculateKPIs = () => {
    const totalRevenue = countryMetrics.reduce((sum, country) => sum + country.revenue, 0);
    const totalProjects = countryMetrics.reduce((sum, country) => sum + country.projects, 0);
    const totalClients = countryMetrics.reduce((sum, country) => sum + country.clients, 0);
    const totalTeam = countryMetrics.reduce((sum, country) => sum + country.teamSize, 0);
    const avgProgress = Math.round(countryMetrics.reduce((sum, country) => sum + country.avgProgress, 0) / countryMetrics.length);
    
    return {
      totalRevenue,
      totalProjects,
      totalClients,
      totalTeam,
      avgProgress,
      revenuePerProject: Math.round(totalRevenue / totalProjects),
      revenuePerClient: Math.round(totalRevenue / totalClients),
      projectsPerCountry: Math.round(totalProjects / countryMetrics.length),
      teamEfficiency: Math.round(totalRevenue / totalTeam)
    };
  };

  const kpis = calculateKPIs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & KPIs Regionais</h1>
          <p className="text-gray-600">Métricas detalhadas e insights da performance regional Africa's Hands</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-green-600">
                ${kpis.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">📈 +12.5%</span>
            <span className="text-gray-500 ml-1">vs período anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ROI Médio</p>
              <p className="text-2xl font-bold text-blue-600">
                {((kpis.totalRevenue - (kpis.totalRevenue * 0.7)) / (kpis.totalRevenue * 0.7) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📊</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-blue-600">Excelente performance</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eficiência da Equipe</p>
              <p className="text-2xl font-bold text-purple-600">
                ${kpis.teamEfficiency.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Receita por membro</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progresso Médio</p>
              <p className="text-2xl font-bold text-indigo-600">{kpis.avgProgress}%</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${kpis.avgProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Tendências */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Tendências de Performance</h2>
          
          <div className="flex gap-2">
            {metrics.map((metric) => (
              <button
                key={metric.value}
                onClick={() => setSelectedMetric(metric.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === metric.value
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{metric.icon}</span>
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gráfico Simulado */}
        <div className="h-64 bg-gray-50 rounded-lg p-6 flex items-end justify-between gap-2">
          {analyticsData.map((data, index) => {
            const getValue = () => {
              switch (selectedMetric) {
                case 'revenue': return data.revenue / 10000;
                case 'projects': return data.projects * 8;
                case 'clients': return data.clients * 2;
                case 'team': return data.teamMembers * 3;
                default: return data.revenue / 10000;
              }
            };
            
            const height = getValue();
            const maxHeight = 200;
            const percentage = (height / maxHeight) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="bg-gradient-to-t from-red-600 to-red-400 rounded-t transition-all duration-500 hover:scale-105 w-8"
                  style={{ height: `${Math.min(percentage, 100)}%` }}
                ></div>
                <span className="text-xs text-gray-600 transform -rotate-45">
                  {new Date(data.period).toLocaleDateString('pt-BR', { month: 'short' })}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Crescimento Sustentável</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📈</span>
            <span>Tendência Positiva</span>
          </div>
        </div>
      </div>

      {/* Métricas por País */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance por País</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {countryMetrics.map((country) => (
            <div key={country.country} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{country.country}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{country.projects}</div>
                  <div className="text-xs text-gray-600">Projetos</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Receita</p>
                    <p className="font-semibold text-green-600">${country.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Clientes</p>
                    <p className="font-semibold text-blue-600">{country.clients}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Equipe</p>
                    <p className="font-semibold text-purple-600">{country.teamSize}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Setor Top</p>
                    <p className="font-semibold text-indigo-600">{country.topSector}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progresso Médio</span>
                    <span className="text-sm font-semibold">{country.avgProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${country.avgProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Receita/Projeto</span>
                    <span className="font-medium">${(country.revenue / country.projects).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance por Setor */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance por Setor</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Setor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projetos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receita</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progresso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crescimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sectorPerformance.map((sector) => (
                <tr key={sector.sector} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sector.icon}</span>
                      <span className="font-medium text-gray-900">{sector.sector}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sector.projects}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">
                    ${sector.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${sector.avgProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{sector.avgProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span>{getGrowthIcon(sector.growth)}</span>
                      <span className={`text-sm font-medium ${getGrowthColor(sector.growth)}`}>
                        {sector.growth > 0 ? '+' : ''}{sector.growth.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sector.status === 'growing' ? 'bg-green-100 text-green-800' :
                      sector.status === 'stable' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sector.status === 'growing' ? 'Crescendo' :
                       sector.status === 'stable' ? 'Estável' : 'Declínio'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saúde dos Projetos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Saúde dos Projetos</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectHealth.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCountryFlag(project.country)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.country}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${getHealthColor(project.health)}`}>
                  {getHealthIcon(project.health)}
                  {project.health === 'excellent' ? 'Excelente' :
                   project.health === 'good' ? 'Bom' :
                   project.health === 'warning' ? 'Atenção' : 'Crítico'}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progresso</span>
                    <span className="text-sm font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        project.progress >= 80 ? 'bg-green-500' :
                        project.progress >= 50 ? 'bg-blue-500' :
                        project.progress >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Orçamento</p>
                    <p className="font-semibold text-green-600">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gasto</p>
                    <p className="font-semibold text-red-600">${project.spent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    {project.daysRemaining > 0 ? `${project.daysRemaining} dias restantes` : 'Concluído'}
                  </span>
                  <span className="text-sm font-medium">
                    {((project.spent / project.budget) * 100).toFixed(1)}% usado
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Insights Estratégicos</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl">💡</span>
                <div>
                  <h3 className="font-semibold text-green-800">Oportunidade de Crescimento</h3>
                  <p className="text-sm text-green-700 mt-1">
                    O setor de Comércio apresenta 22.8% de crescimento. Considere expandir investimentos em projetos similares na região.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-yellow-800">Atenção Necessária</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Projeto de Transporte Regional está com apenas 10% de progresso. Recomenda-se revisão do cronograma.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">📊</span>
                <div>
                  <h3 className="font-semibold text-blue-800">Performance Excelente</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Angola apresenta a maior receita por projeto (${(235000/2).toLocaleString()}). Modelo de sucesso para replicar.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-purple-600 text-xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-purple-800">Meta Atingida</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    ROI médio de 42.9% supera a meta de 35%. Excelente performance financeira regional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recomendações */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recomendações Estratégicas</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">🚀 Expandir Operações</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Aumentar projetos de Saúde em Angola (ROI atual: 89%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Explorar setor de Tecnologia em todos os países</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Replicar modelo de sucesso da UCT na região</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">⚡ Otimizar Recursos</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Redistribuir equipe: África do Sul → Angola/Namíbia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Implementar metodologias ágeis em projetos lentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Criar centro de excelência em Luanda</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">🎯 Metas para Q3</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Atingir $600K em receita regional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Manter ROI acima de 40%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Expandir para +2 setores por país</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comparativo Regional */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Comparativo Regional SADC</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Market Share */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Market Share por País</h3>
            <div className="space-y-4">
              {countryMetrics.map((country, index) => {
                const totalRevenue = countryMetrics.reduce((sum, c) => sum + c.revenue, 0);
                const marketShare = ((country.revenue / totalRevenue) * 100);
                
                return (
                  <div key={country.country}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <span className="font-semibold">{marketShare.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          index === 0 ? 'bg-red-500' :
                          index === 1 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${marketShare}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eficiência Operacional */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Eficiência Operacional</h3>
            <div className="space-y-4">
              {countryMetrics.map((country) => {
                const efficiency = Math.round(country.revenue / country.teamSize);
                const maxEfficiency = Math.max(...countryMetrics.map(c => c.revenue / c.teamSize));
                const efficiencyPercentage = (efficiency / maxEfficiency) * 100;
                
                return (
                  <div key={country.country}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <span className="font-semibold">${efficiency.toLocaleString()}/pessoa</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                        style={{ width: `${efficiencyPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Forecast e Projeções */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Projeções para Q4 2024</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Projeção de Receita */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-green-800 mb-2">Receita Projetada</h3>
              <div className="text-2xl font-bold text-green-700 mb-1">$580K</div>
              <div className="text-sm text-green-600">+24.7% vs Q3</div>
              <div className="mt-3 w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="text-xs text-green-600 mt-1">78% da meta anual</div>
            </div>
          </div>

          {/* Projeção de Projetos */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-blue-800 mb-2">Novos Projetos</h3>
              <div className="text-2xl font-bold text-blue-700 mb-1">3-4</div>
              <div className="text-sm text-blue-600">+60% vs Q3</div>
              <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="text-xs text-blue-600 mt-1">Meta: 4 projetos</div>
            </div>
          </div>

          {/* Projeção de Clientes */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold text-purple-800 mb-2">Novos Clientes</h3>
              <div className="text-2xl font-bold text-purple-700 mb-1">8-12</div>
              <div className="text-sm text-purple-600">+20% vs Q3</div>
              <div className="mt-3 w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <div className="text-xs text-purple-600 mt-1">Meta: 12 clientes</div>
            </div>
          </div>

          {/* Projeção de ROI */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-200">
            <div className="text-center">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold text-orange-800 mb-2">ROI Projetado</h3>
              <div className="text-2xl font-bold text-orange-700 mb-1">45-50%</div>
              <div className="text-sm text-orange-600">Acima da meta</div>
              <div className="mt-3 w-full bg-orange-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="text-xs text-orange-600 mt-1">Meta: 40%</div>
            </div>
          </div>
        </div>

        {/* Fatores de Risco */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">⚠️ Fatores de Risco para Q4</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-red-700 mb-2">Riscos Identificados</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Atraso no projeto de Transporte (235 dias restantes)</li>
                <li>• Sazonalidade no setor de Turismo</li>
                <li>• Flutuação cambial USD/AOA</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-700 mb-2">Oportunidades</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Expansão para setor de Tecnologia</li>
                <li>• Novos parceiros em Windhoek</li>
                <li>• Demanda crescente por Telemedicina</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Recomendadas */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">🎯 Ações Estratégicas Recomendadas</h2>
          <p className="text-red-100 max-w-3xl mx-auto">
            Com base na análise dos dados, estas são as ações prioritárias para maximizar 
            o crescimento e performance do Africa's Hands na região SADC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Curto Prazo */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>⚡</span>
              Curto Prazo (30 dias)
            </h3>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Reunião de urgência - Projeto Transporte</li>
              <li>• Contratar 2 desenvolvedores para Angola</li>
              <li>• Lançar campanha de Telemedicina</li>
              <li>• Revisar cronograma de projetos atrasados</li>
              <li>• Implementar dashboard de monitoramento</li>
            </ul>
          </div>

          {/* Médio Prazo */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>📈</span>
              Médio Prazo (90 dias)
            </h3>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Expandir para setor de Tecnologia</li>
              <li>• Abrir escritório em Maputo</li>
              <li>• Criar programa de intercâmbio de equipe</li>
              <li>• Desenvolver parceria com universidades</li>
              <li>• Lançar marketplace B2B regional</li>
            </ul>
          </div>

          {/* Longo Prazo */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>🚀</span>
              Longo Prazo (6 meses)
            </h3>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Expandir para Botsuana e Zâmbia</li>
              <li>• Criar fundo de investimento regional</li>
              <li>• Implementar IA em todos os projetos</li>
              <li>• Estabelecer centro de inovação</li>
              <li>• Meta: $1M receita anual</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            📊 Gerar Relatório Executivo Completo
          </button>
        </div>
      </div>

      {/* Footer com Metadados */}
      <div className="bg-gray-100 rounded-xl p-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-900">Última Atualização</p>
            <p>{new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Fonte dos Dados</p>
            <p>Sistema Integrado Africa's Hands</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Período Analisado</p>
            <p>Janeiro - Junho 2024</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Próxima Atualização</p>
            <p>Automática em 24h</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-500">
            © 2024 Africa's Hands Analytics • Desenvolvido por Valdimir Jacinto Esteves
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;