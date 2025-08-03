import React, { useState } from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  sector: string;
  organization: string;
  status: 'active' | 'inactive' | 'prospect';
  projects: number;
  totalValue: number;
  joinDate: string;
  lastContact: string;
  avatar?: string;
}

const ClientsManagement: React.FC = () => {
  const [clients] = useState<Client[]>([
    {
      id: 1,
      name: 'Dr. António Silva',
      email: 'antonio@clinicasagrada.ao',
      phone: '+244 924 166 401',
      country: 'Angola',
      sector: 'Saúde',
      organization: 'Clínica Sagrada Esperança',
      status: 'active',
      projects: 2,
      totalValue: 85000,
      joinDate: '2024-01-15',
      lastContact: '2024-06-20'
    },
    {
      id: 2,
      name: 'Prof. David Williams',
      email: 'david@uct.ac.za',
      phone: '+27 21 650 9111',
      country: 'África do Sul',
      sector: 'Educação',
      organization: 'University of Cape Town',
      status: 'active',
      projects: 1,
      totalValue: 120000,
      joinDate: '2023-09-01',
      lastContact: '2024-06-18'
    },
    {
      id: 3,
      name: 'Sarah Nghikembua',
      email: 'sarah@hilton.na',
      phone: '+264 61 296 000',
      country: 'Namíbia',
      sector: 'Turismo',
      organization: 'Hilton Windhoek',
      status: 'prospect',
      projects: 0,
      totalValue: 0,
      joinDate: '2024-06-01',
      lastContact: '2024-06-15'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const countries = ['Angola', 'Namíbia', 'África do Sul'];

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

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'prospect': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'active': 'Ativo',
      'inactive': 'Inativo',
      'prospect': 'Prospect'
    };
    return labels[status as keyof typeof labels];
  };

  const filteredClients = clients.filter(client => {
    if (activeTab !== 'all' && client.status !== activeTab) return false;
    if (selectedCountry !== 'all' && client.country !== selectedCountry) return false;
    if (searchTerm && !client.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !client.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !client.organization.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    prospects: clients.filter(c => c.status === 'prospect').length,
    totalValue: clients.reduce((sum, c) => sum + c.totalValue, 0)
  };

  // Mobile-responsive client detail modal
  const ClientDetailModal = ({ client, onClose }: { client: Client; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-xl overflow-hidden">
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Detalhes do Cliente</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content with scroll */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)] sm:max-h-[70vh]">
          <div className="space-y-6">
            {/* Client info header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
                {client.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{client.name}</h3>
                <p className="text-gray-600">{client.organization}</p>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2 ${getStatusColor(client.status)}`}>
                  {getStatusLabel(client.status)}
                </span>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Informações de Contato</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Telefone</p>
                    <p className="text-sm font-medium">{client.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Informações Empresariais</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">País</p>
                  <p className="text-sm font-medium">{getCountryFlag(client.country)} {client.country}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Sector</p>
                  <p className="text-sm font-medium">{getSectorIcon(client.sector)} {client.sector}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Projetos</p>
                  <p className="text-sm font-medium">{client.projects}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Valor Total</p>
                  <p className="text-sm font-medium text-green-600">${client.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors min-h-[44px]">
                Editar Cliente
              </button>
              <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]">
                Novo Projeto
              </button>
              <button className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors min-h-[44px]">
                Histórico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add Client Modal
  const AddClientModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Novo Cliente</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)] sm:max-h-[70vh]">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input type="text" className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input type="tel" className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]">
                  <option value="">Selecionar país</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{getCountryFlag(country)} {country}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organização</label>
              <input type="text" className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]">
                  <option value="">Selecionar sector</option>
                  <option value="Saúde">🏥 Saúde</option>
                  <option value="Educação">🎓 Educação</option>
                  <option value="Turismo">🏨 Turismo</option>
                  <option value="Comércio">🛒 Comércio</option>
                  <option value="Transporte">✈️ Transporte</option>
                  <option value="Tecnologia">💻 Tecnologia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]">
                  <option value="prospect">Prospect</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors min-h-[44px]">
                Cancelar
              </button>
              <button type="submit" className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors min-h-[44px]">
                Salvar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-2 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestão de Clientes</h1>
              <p className="text-sm sm:text-base text-gray-600">Clientes e parceiros regionais 🇦🇴🇳🇦🇿🇦</p>
            </div>
            
            <button 
              onClick={() => setShowAddClientModal(true)}
              className="bg-red-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors text-sm sm:text-base min-h-[44px] touch-manipulation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Novo Cliente</span>
              <span className="sm:hidden">Novo</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]"
                />
              </div>
            </div>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px] sm:min-w-[200px]"
            >
              <option value="all">🌍 Todos os Países</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {getCountryFlag(country)} {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total de Clientes</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full self-end sm:self-auto">
                <span className="text-lg sm:text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full self-end sm:self-auto">
                <span className="text-lg sm:text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Prospects</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.prospects}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full self-end sm:self-auto">
                <span className="text-lg sm:text-2xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm border border-gray-200 col-span-2 lg:col-span-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">
                  ${stats.totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full self-end sm:self-auto">
                <span className="text-lg sm:text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-6 sm:space-x-8 px-4 sm:px-6 min-w-max">
              {[
                { id: 'all', name: 'Todos', icon: '📋' },
                { id: 'active', name: 'Ativos', icon: '✅' },
                { id: 'prospect', name: 'Prospects', icon: '🎯' },
                { id: 'inactive', name: 'Inativos', icon: '⏸️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap touch-manipulation min-h-[44px] flex items-center ${
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

          {/* Clients Grid */}
          <div className="p-3 sm:p-6">
            {filteredClients.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
                <p className="text-gray-600 mb-4">Tente ajustar os filtros ou adicionar um novo cliente.</p>
                <button 
                  onClick={() => setShowAddClientModal(true)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Adicionar Cliente
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredClients.map((client) => (
                  <div key={client.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm sm:text-base flex-shrink-0">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{client.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{client.organization}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(client.status)}`}>
                        {getStatusLabel(client.status)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span>{getCountryFlag(client.country)}</span>
                        <span className="text-gray-600 truncate">{client.country}</span>
                        <span>{getSectorIcon(client.sector)}</span>
                        <span className="text-gray-600 truncate">{client.sector}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">Projetos</p>
                          <p className="font-medium">{client.projects}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">Valor Total</p>
                          <p className="font-medium text-green-600">${client.totalValue.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <button 
                          onClick={() => setSelectedClient(client)}
                          className="flex-1 bg-red-600 text-white py-2 sm:py-3 px-3 rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm min-h-[40px] sm:min-h-[44px] touch-manipulation"
                        >
                          Ver Detalhes
                        </button>
                        <button className="p-2 sm:p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedClient && (
        <ClientDetailModal 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
      
      {showAddClientModal && (
        <AddClientModal onClose={() => setShowAddClientModal(false)} />
      )}
    </div>
  );
};

export default ClientsManagement;
