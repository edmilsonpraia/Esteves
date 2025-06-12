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

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia'];

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
    return true;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    prospects: clients.filter(c => c.status === 'prospect').length,
    totalValue: clients.reduce((sum, c) => sum + c.totalValue, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Clientes</h1>
          <p className="text-gray-600">Clientes e parceiros regionais 🇦🇴🇳🇦🇿🇦</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">🌍 Todos os Países</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {getCountryFlag(country)} {country}
              </option>
            ))}
          </select>
          
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prospects</p>
              <p className="text-2xl font-bold text-blue-600">{stats.prospects}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-purple-600">
                ${stats.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', name: 'Todos', icon: '📋' },
              { id: 'active', name: 'Ativos', icon: '✅' },
              { id: 'prospect', name: 'Prospects', icon: '🎯' },
              { id: 'inactive', name: 'Inativos', icon: '⏸️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
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
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div key={client.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.organization}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                    {getStatusLabel(client.status)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span>{getCountryFlag(client.country)}</span>
                    <span className="text-sm text-gray-600">{client.country}</span>
                    <span>{getSectorIcon(client.sector)}</span>
                    <span className="text-sm text-gray-600">{client.sector}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Projetos</p>
                      <p className="font-medium">{client.projects}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Valor Total</p>
                      <p className="font-medium text-green-600">${client.totalValue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Ver Detalhes
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsManagement;