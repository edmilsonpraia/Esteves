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

const AdminDashboardAfricasHands: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
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

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia'];

  const filteredProjects = projects.filter(project => {
    if (activeFilter !== 'all' && project.status !== activeFilter) return false;
    if (selectedCountry !== 'all' && project.country !== selectedCountry) return false;
    if (selectedSector !== 'all' && project.sector !== selectedSector) return false;
    return true;
  });

  // Estatísticas regionais
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'Em Andamento').length,
    completedProjects: projects.filter(p => p.status === 'Concluído').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Africa's Hands - Admin</h1>
          <p className="text-gray-600">Gestão de projetos regionais Angola • Namíbia • África do Sul</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Projeto Regional
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Relatório Regional
          </button>
        </div>
      </div>

      {/* Estatísticas Regionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projetos Regionais</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">🇦🇴🇳🇦🇿🇦</span>
            <span className="text-gray-500 ml-1">Cooperação trilateral</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <svg className="h-4 w-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-green-600">Progresso médio: {stats.avgProgress}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">✅ Taxa de sucesso: 100%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Investimento Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalBudget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">
              Executado: {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Filtros e Tabela de Projetos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Projetos Regionais</h2>
            
            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              {/* Filtro por Status */}
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Todos os Status</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Planejamento">Planejamento</option>
              </select>

              {/* Filtro por País */}
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Todos os Países</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {getCountryFlag(country)} {country}
                  </option>
                ))}
              </select>

              {/* Filtro por Setor */}
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Todos os Setores</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>
                    {getSectorIcon(sector)} {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projeto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">País/Setor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progresso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orçamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">
                        {getCountryFlag(project.country)} {project.country}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getSectorIcon(project.sector)} {project.sector}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{project.client}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-800' :
                      project.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {project.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                    </div>
                    <div className="text-xs text-gray-500">
                      Gasto: {project.spent.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalhes"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  className="text-gray-400 hover:text-gray-600"
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
                  <h3 className="font-semibold text-gray-900 mb-2">Informações do Projeto</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Cliente:</span> {selectedProject.client}</div>
                    <div><span className="text-gray-500">Status:</span> {selectedProject.status}</div>
                    <div><span className="text-gray-500">Prioridade:</span> {selectedProject.priority}</div>
                    <div><span className="text-gray-500">Início:</span> {new Date(selectedProject.startDate).toLocaleDateString('pt-BR')}</div>
                    <div><span className="text-gray-500">Fim:</span> {new Date(selectedProject.endDate).toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Financeiro</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Orçamento:</span> {selectedProject.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</div>
                    <div><span className="text-gray-500">Gasto:</span> {selectedProject.spent.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</div>
                    <div><span className="text-gray-500">Restante:</span> {(selectedProject.budget - selectedProject.spent).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</div>
                    <div><span className="text-gray-500">Progresso:</span> {selectedProject.progress}%</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Equipe</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      👤 {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Fechar
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Editar Projeto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardAfricasHands;