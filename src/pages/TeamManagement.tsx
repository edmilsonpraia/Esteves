import React, { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  department: string;
  avatar: string;
  status: 'active' | 'inactive' | 'vacation' | 'remote';
  joinDate: string;
  salary: number;
  skills: string[];
  projects: string[];
}

const TeamManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Valdimir Jacinto Esteves',
      role: 'CEO & Fundador',
      email: 'valdimir@africashands.com',
      phone: '+244 924 166 401',
      country: 'Angola',
      department: 'Executivo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      status: 'active',
      joinDate: '2023-01-15',
      salary: 150000,
      skills: ['Liderança', 'Estratégia', 'Desenvolvimento Regional'],
      projects: ['Todos os Projetos', 'Estratégia Regional']
    },
    {
      id: 2,
      name: 'Dr. António Silva',
      role: 'Diretor de Saúde',
      email: 'antonio@africashands.com',
      phone: '+244 924 166 402',
      country: 'Angola',
      department: 'Saúde',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
      status: 'active',
      joinDate: '2023-02-01',
      salary: 85000,
      skills: ['Medicina', 'Telemedicina', 'Gestão de Saúde'],
      projects: ['Rede de Telemedicina Regional']
    },
    {
      id: 3,
      name: 'Eng. Maria Santos',
      role: 'Tech Lead',
      email: 'maria@africashands.com',
      phone: '+244 924 166 403',
      country: 'Angola',
      department: 'Tecnologia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=80&h=80&fit=crop&crop=face',
      status: 'active',
      joinDate: '2023-02-15',
      salary: 75000,
      skills: ['React', 'Node.js', 'DevOps', 'Arquitetura'],
      projects: ['Rede de Telemedicina Regional', 'Marketplace de Artesanato']
    },
    {
      id: 4,
      name: 'Prof. David Williams',
      role: 'Diretor Acadêmico',
      email: 'david@africashands.com',
      phone: '+27 21 xxx xxxx',
      country: 'África do Sul',
      department: 'Educação',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      status: 'active',
      joinDate: '2023-03-01',
      salary: 90000,
      skills: ['Educação', 'Pesquisa', 'Intercâmbio'],
      projects: ['Sistema de Intercâmbio Universitário']
    },
    {
      id: 5,
      name: 'João Kazembe',
      role: 'Product Manager',
      email: 'joao@africashands.com',
      phone: '+264 817 049 41',
      country: 'Namíbia',
      department: 'Produto',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      status: 'active',
      joinDate: '2023-03-15',
      salary: 65000,
      skills: ['Product Management', 'UX/UI', 'Agile'],
      projects: ['Marketplace de Artesanato', 'App de Turismo']
    },
    {
      id: 6,
      name: 'Ana Rodrigues',
      role: 'Marketing Manager',
      email: 'ana@africashands.com',
      phone: '+264 817 049 42',
      country: 'Namíbia',
      department: 'Marketing',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
      status: 'vacation',
      joinDate: '2023-04-01',
      salary: 55000,
      skills: ['Marketing Digital', 'Branding', 'Turismo'],
      projects: ['App de Turismo Sustentável']
    }
  ];

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const departments = ['Executivo', 'Saúde', 'Tecnologia', 'Educação', 'Produto', 'Marketing'];

  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'vacation': 'bg-blue-100 text-blue-800',
      'remote': 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'active': 'Ativo',
      'inactive': 'Inativo',
      'vacation': 'Férias',
      'remote': 'Remoto'
    };
    return labels[status as keyof typeof labels];
  };

  const getDepartmentIcon = (department: string) => {
    const icons = {
      'Executivo': '👑',
      'Saúde': '🏥',
      'Tecnologia': '💻',
      'Educação': '🎓',
      'Produto': '📱',
      'Marketing': '📢'
    };
    return icons[department as keyof typeof icons] || '💼';
  };

  const filteredMembers = selectedCountry === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.country === selectedCountry);

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    byCountry: {
      Angola: teamMembers.filter(m => m.country === 'Angola').length,
      Namíbia: teamMembers.filter(m => m.country === 'Namíbia').length,
      'África do Sul': teamMembers.filter(m => m.country === 'África do Sul').length
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestão de Equipe Regional</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Equipe distribuída em Angola 🇦🇴 Namíbia 🇳🇦 África do Sul 🇿🇦</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-sm bg-white touch-manipulation min-h-[44px]"
          >
            <option value="all">🌍 Todos os Países</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {getCountryFlag(country)} {country}
              </option>
            ))}
          </select>
          
          <button 
            onClick={() => setShowAddMemberModal(true)}
            className="w-full sm:w-auto bg-red-600 text-white px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors touch-manipulation min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="sm:inline">Adicionar Membro</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total da Equipe</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full w-fit">
              <span className="text-lg sm:text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Membros Ativos</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-full w-fit">
              <span className="text-lg sm:text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 col-span-2 sm:col-span-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Angola</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.byCountry.Angola}</p>
            </div>
            <div className="p-2 sm:p-3 bg-red-100 rounded-full w-fit">
              <span className="text-lg sm:text-2xl">🇦🇴</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Namíbia</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.byCountry.Namíbia}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full w-fit">
              <span className="text-lg sm:text-2xl">🇳🇦</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">África do Sul</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.byCountry['África do Sul']}</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-full w-fit">
              <span className="text-lg sm:text-2xl">🇿🇦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex px-2 sm:px-6 overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', name: 'Visão Geral', shortName: 'Geral', icon: '👥' },
              { id: 'directory', name: 'Diretório', shortName: 'Diretório', icon: '📋' },
              { id: 'departments', name: 'Departamentos', shortName: 'Depts.', icon: '🏢' },
              { id: 'performance', name: 'Performance', shortName: 'Perf.', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 sm:py-4 px-3 sm:px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap touch-manipulation min-h-[44px] flex items-center ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                <span className="sm:hidden">{tab.shortName}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Equipe por País</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {countries.map(country => {
                  const countryMembers = teamMembers.filter(m => m.country === country);
                  
                  return (
                    <div key={country} className="bg-gray-50 rounded-lg p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl sm:text-3xl">{getCountryFlag(country)}</span>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">{country}</h4>
                      </div>
                      
                      <div className="space-y-3">
                        {countryMembers.map(member => (
                          <div key={member.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">{member.role}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(member.status)}`}>
                              {getStatusLabel(member.status)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Directory Tab */}
          {activeTab === 'directory' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Diretório da Equipe</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredMembers.map(member => (
                  <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{member.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{member.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm">{getCountryFlag(member.country)}</span>
                          <span className="text-xs text-gray-500 truncate">{member.country}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 flex-shrink-0">📧</span>
                        <span className="text-gray-600 truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 flex-shrink-0">📞</span>
                        <span className="text-gray-600 truncate">{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 flex-shrink-0">{getDepartmentIcon(member.department)}</span>
                        <span className="text-gray-600 truncate">{member.department}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${getStatusColor(member.status)}`}>
                          {getStatusLabel(member.status)}
                        </span>
                        <div className="flex gap-2">
                          <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation min-h-[32px]">
                            Ver
                          </button>
                          <button className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation min-h-[32px]">
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Departamentos</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {departments.map(dept => {
                  const deptMembers = teamMembers.filter(m => m.department === dept);
                  
                  return (
                    <div key={dept} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl sm:text-2xl">{getDepartmentIcon(dept)}</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{dept}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{deptMembers.length} membros</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {deptMembers.map(member => (
                          <div key={member.id} className="flex items-center gap-2">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{member.name}</p>
                              <p className="text-xs text-gray-500 truncate">{member.role}</p>
                            </div>
                            <span className="text-sm flex-shrink-0">{getCountryFlag(member.country)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Performance da Equipe</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <p className="text-center text-gray-500 text-sm sm:text-base">
                  Funcionalidade de performance em desenvolvimento...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mt-4 sm:mt-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Adicionar Novo Membro</h2>
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base touch-manipulation"
                      placeholder="Nome do colaborador"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cargo *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base touch-manipulation"
                      placeholder="Ex: Desenvolvedor Senior"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                    <input
                      type="email"
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base touch-manipulation"
                      placeholder="email@africashands.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base touch-manipulation"
                      placeholder="+244 xxx xxx xxx"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">País *</label>
                    <select className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base touch-manipulation">
                      <option value="">Selecione o país</option>
                      {countries.map(country => (
                        <option key={country} value={country}>
                          {getCountryFlag(country)} {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departamento *</label>
                    <select className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base touch-manipulation">
                      <option value="">Selecione o departamento</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>
                          {getDepartmentIcon(dept)} {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-0 bg-white">
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="w-full sm:flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium touch-manipulation min-h-[44px]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium touch-manipulation min-h-[44px]"
                  >
                    Adicionar Membro
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;