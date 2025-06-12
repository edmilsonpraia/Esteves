import React, { useState } from 'react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  currency: string;
  category: string;
  project: string;
  country: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  paymentMethod: string;
  invoiceNumber?: string;
  createdBy: string;
  approvedBy?: string;
  notes?: string;
}

interface Budget {
  id: number;
  name: string;
  country: string;
  category: string;
  allocated: number;
  spent: number;
  currency: string;
  period: string;
  startDate: string;
  endDate: string;
  responsible: string;
}

interface Invoice {
  id: number;
  number: string;
  client: string;
  project: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  country: string;
  items: InvoiceItem[];
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

const FinanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Sample data
  const transactions: Transaction[] = [
    {
      id: 1,
      date: '2024-06-20',
      description: 'Pagamento de consultoria médica - Projeto Telemedicina',
      type: 'expense',
      amount: 15000,
      currency: 'USD',
      category: 'Consultoria',
      project: 'Rede de Telemedicina Regional',
      country: 'Angola',
      status: 'completed',
      paymentMethod: 'Transferência Bancária',
      invoiceNumber: 'INV-2024-001',
      createdBy: 'Dr. António Silva',
      approvedBy: 'Valdimir Esteves',
      notes: 'Pagamento aprovado pelo comitê financeiro'
    },
    {
      id: 2,
      date: '2024-06-18',
      description: 'Recebimento - Projeto UCT Intercâmbio',
      type: 'income',
      amount: 45000,
      currency: 'USD',
      category: 'Receita de Projeto',
      project: 'Sistema de Intercâmbio Universitário',
      country: 'África do Sul',
      status: 'completed',
      paymentMethod: 'Transferência Internacional',
      invoiceNumber: 'INV-2024-002',
      createdBy: 'Prof. David Williams',
      approvedBy: 'Valdimir Esteves'
    },
    {
      id: 3,
      date: '2024-06-15',
      description: 'Despesas de desenvolvimento - App Turismo',
      type: 'expense',
      amount: 8500,
      currency: 'USD',
      category: 'Desenvolvimento',
      project: 'App de Turismo Sustentável',
      country: 'Namíbia',
      status: 'pending',
      paymentMethod: 'Cartão Corporativo',
      createdBy: 'Tom Nghoshi'
    },
    {
      id: 4,
      date: '2024-06-12',
      description: 'Transfer entre escritórios - Cunene para Windhoek',
      type: 'transfer',
      amount: 12000,
      currency: 'USD',
      category: 'Transferência Interna',
      project: 'Operações Gerais',
      country: 'Namíbia',
      status: 'completed',
      paymentMethod: 'Transferência Interna',
      createdBy: 'Ana Rodrigues',
      approvedBy: 'Valdimir Esteves'
    },
    {
      id: 5,
      date: '2024-06-10',
      description: 'Pagamento fornecedor - Infraestrutura TI',
      type: 'expense',
      amount: 25000,
      currency: 'USD',
      category: 'Infraestrutura',
      project: 'Marketplace de Artesanato',
      country: 'Angola',
      status: 'approved',
      paymentMethod: 'Transferência Bancária',
      invoiceNumber: 'INV-2024-003',
      createdBy: 'Eng. Maria Santos',
      approvedBy: 'Valdimir Esteves'
    }
  ];

  const budgets: Budget[] = [
    {
      id: 1,
      name: 'Projetos de Saúde',
      country: 'Angola',
      category: 'Saúde',
      allocated: 120000,
      spent: 78000,
      currency: 'USD',
      period: 'Q2 2024',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      responsible: 'Dr. António Silva'
    },
    {
      id: 2,
      name: 'Desenvolvimento Tecnológico',
      country: 'Namíbia',
      category: 'Tecnologia',
      allocated: 85000,
      spent: 52000,
      currency: 'USD',
      period: 'Q2 2024',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      responsible: 'Tom Nghoshi'
    },
    {
      id: 3,
      name: 'Educação e Intercâmbio',
      country: 'África do Sul',
      category: 'Educação',
      allocated: 150000,
      spent: 145000,
      currency: 'USD',
      period: 'Q2 2024',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      responsible: 'Prof. David Williams'
    },
    {
      id: 4,
      name: 'Marketing Regional',
      country: 'Angola',
      category: 'Marketing',
      allocated: 35000,
      spent: 18000,
      currency: 'USD',
      period: 'Q2 2024',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      responsible: 'Ana Rodrigues'
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 1,
      number: 'INV-2024-001',
      client: 'Clínica Sagrada Esperança',
      project: 'Rede de Telemedicina Regional',
      amount: 85000,
      currency: 'USD',
      issueDate: '2024-06-01',
      dueDate: '2024-07-01',
      status: 'paid',
      country: 'Angola',
      items: [
        { description: 'Desenvolvimento da plataforma', quantity: 1, unitPrice: 60000, total: 60000 },
        { description: 'Treinamento da equipe', quantity: 1, unitPrice: 15000, total: 15000 },
        { description: 'Suporte técnico (3 meses)', quantity: 1, unitPrice: 10000, total: 10000 }
      ]
    },
    {
      id: 2,
      number: 'INV-2024-002',
      client: 'University of Cape Town',
      project: 'Sistema de Intercâmbio Universitário',
      amount: 120000,
      currency: 'USD',
      issueDate: '2024-06-10',
      dueDate: '2024-07-10',
      status: 'sent',
      country: 'África do Sul',
      items: [
        { description: 'Portal de intercâmbio', quantity: 1, unitPrice: 80000, total: 80000 },
        { description: 'App mobile', quantity: 1, unitPrice: 25000, total: 25000 },
        { description: 'Integração APIs', quantity: 1, unitPrice: 15000, total: 15000 }
      ]
    },
    {
      id: 3,
      number: 'INV-2024-003',
      client: 'Hilton Windhoek',
      project: 'App de Turismo Sustentável',
      amount: 65000,
      currency: 'USD',
      issueDate: '2024-06-15',
      dueDate: '2024-07-15',
      status: 'draft',
      country: 'Namíbia',
      items: [
        { description: 'Aplicativo turístico', quantity: 1, unitPrice: 45000, total: 45000 },
        { description: 'Sistema de reservas', quantity: 1, unitPrice: 20000, total: 20000 }
      ]
    }
  ];

  const exchangeRates: ExchangeRate[] = [
    { from: 'USD', to: 'AOA', rate: 825.50, lastUpdated: '2024-06-20 14:30' },
    { from: 'USD', to: 'NAD', rate: 18.25, lastUpdated: '2024-06-20 14:30' },
    { from: 'USD', to: 'ZAR', rate: 18.42, lastUpdated: '2024-06-20 14:30' },
    { from: 'EUR', to: 'USD', rate: 1.08, lastUpdated: '2024-06-20 14:30' }
  ];

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const currencies = ['USD', 'AOA', 'NAD', 'ZAR', 'EUR'];
  const categories = ['Consultoria', 'Desenvolvimento', 'Marketing', 'Infraestrutura', 'Operações', 'Receita de Projeto'];

  // Helper functions
  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols = {
      'USD': '$',
      'AOA': 'Kz',
      'NAD': 'N$',
      'ZAR': 'R',
      'EUR': '€'
    };
    return symbols[currency as keyof typeof symbols] || currency;
  };

  const getTransactionTypeColor = (type: string) => {
    const colors = {
      'income': 'bg-green-100 text-green-800',
      'expense': 'bg-red-100 text-red-800',
      'transfer': 'bg-blue-100 text-blue-800'
    };
    return colors[type as keyof typeof colors];
  };

  const getTransactionTypeIcon = (type: string) => {
    const icons = {
      'income': '💰',
      'expense': '💸',
      'transfer': '🔄'
    };
    return icons[type as keyof typeof icons];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'paid': 'bg-green-100 text-green-800',
      'sent': 'bg-blue-100 text-blue-800',
      'overdue': 'bg-red-100 text-red-800',
      'draft': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'pending': 'Pendente',
      'approved': 'Aprovado',
      'completed': 'Concluído',
      'rejected': 'Rejeitado',
      'paid': 'Pago',
      'sent': 'Enviado',
      'overdue': 'Vencido',
      'draft': 'Rascunho',
      'cancelled': 'Cancelado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  // Calculations
  const calculateFinancialSummary = () => {
    const filteredTransactions = selectedCountry === 'all' 
      ? transactions 
      : transactions.filter(t => t.country === selectedCountry);

    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingAmount = filteredTransactions
      .filter(t => t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin,
      pendingAmount,
      totalBudgetAllocated: budgets.reduce((sum, b) => sum + b.allocated, 0),
      totalBudgetSpent: budgets.reduce((sum, b) => sum + b.spent, 0)
    };
  };

  const summary = calculateFinancialSummary();

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return `${getCurrencySymbol(currency)} ${amount.toLocaleString()}`;
  };

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
    if (fromCurrency === toCurrency) return amount;
    
    const rate = exchangeRates.find(r => r.from === fromCurrency && r.to === toCurrency)?.rate;
    if (rate) return amount * rate;
    
    // Convert through USD if direct rate not available
    const toUSD = exchangeRates.find(r => r.from === fromCurrency && r.to === 'USD')?.rate;
    const fromUSD = exchangeRates.find(r => r.from === 'USD' && r.to === toCurrency)?.rate;
    
    if (toUSD && fromUSD) return amount * toUSD * fromUSD;
    
    return amount; // Fallback
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira Regional</h1>
          <p className="text-gray-600">Controle financeiro integrado Angola 🇦🇴 Namíbia 🇳🇦 África do Sul 🇿🇦</p>
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
          
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="current_month">Mês Atual</option>
            <option value="current_quarter">Trimestre Atual</option>
            <option value="current_year">Ano Atual</option>
            <option value="last_30_days">Últimos 30 dias</option>
          </select>

          <button 
            onClick={() => setShowTransactionModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Transação
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(summary.totalIncome)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">📈 +15.2%</span>
            <span className="text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Despesas</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(summary.totalExpenses)}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <span className="text-2xl">💸</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600">📉 -8.1%</span>
            <span className="text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
              <p className={`text-2xl font-bold ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summary.netProfit)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${summary.netProfit >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <span className="text-2xl">{summary.netProfit >= 0 ? '📈' : '📉'}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className={summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
              {summary.profitMargin.toFixed(1)}% margem
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(summary.pendingAmount)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Aguardando aprovação</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orçamento</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(summary.totalBudgetAllocated)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">💼</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-purple-600">
              {((summary.totalBudgetSpent / summary.totalBudgetAllocated) * 100).toFixed(1)}% usado
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Câmbio</p>
              <p className="text-lg font-bold text-blue-600">
                1 USD = {exchangeRates[0].rate} AOA
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">💱</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-blue-600">🕒 Atualizado há 2h</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: 'overview', name: 'Visão Geral', icon: '📊' },
              { id: 'transactions', name: 'Transações', icon: '💳' },
              { id: 'budgets', name: 'Orçamentos', icon: '💼' },
              { id: 'invoices', name: 'Faturas', icon: '📄' },
              { id: 'reports', name: 'Relatórios', icon: '📈' },
              { id: 'exchange', name: 'Câmbio', icon: '💱' }
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

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Cash Flow Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Fluxo de Caixa Mensal</h3>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Despesas</span>
                    </div>
                  </div>
                </div>
                
                {/* Simplified Chart */}
                <div className="h-64 flex items-end justify-between gap-2">
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].map((month, index) => {
                    const income = Math.random() * 80000 + 20000;
                    const expense = Math.random() * 60000 + 15000;
                    const maxHeight = 200;
                    
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex gap-1">
                          <div
                            className="bg-green-500 rounded-t"
                            style={{ height: `${(income / 100000) * maxHeight}px` }}
                            title={`Receita: ${formatCurrency(income)}`}
                          ></div>
                          <div
                            className="bg-red-500 rounded-t"
                            style={{ height: `${(expense / 100000) * maxHeight}px` }}
                            title={`Despesa: ${formatCurrency(expense)}`}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Country Performance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance por País</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {countries.map(country => {
                    const countryTransactions = transactions.filter(t => t.country === country);
                    const countryIncome = countryTransactions
                      .filter(t => t.type === 'income' && t.status === 'completed')
                      .reduce((sum, t) => sum + t.amount, 0);
                    const countryExpenses = countryTransactions
                      .filter(t => t.type === 'expense' && t.status === 'completed')
                      .reduce((sum, t) => sum + t.amount, 0);
                    const countryProfit = countryIncome - countryExpenses;

                    return (
                      <div key={country} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{getCountryFlag(country)}</span>
                          <h4 className="font-semibold text-gray-900">{country}</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Receita</span>
                            <span className="font-medium text-green-600">{formatCurrency(countryIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Despesas</span>
                            <span className="font-medium text-red-600">{formatCurrency(countryExpenses)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-sm font-medium text-gray-900">Lucro</span>
                            <span className={`font-bold ${countryProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(countryProfit)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTransactionTypeColor(transaction.type)}`}>
                          <span>{getTransactionTypeIcon(transaction.type)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{getCountryFlag(transaction.country)} {transaction.country}</span>
                            <span>•</span>
                            <span>{transaction.project}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                        <div className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('pt-BR')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Todas as Transações</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Buscar transações..."
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">Todos os tipos</option>
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                    <option value="transfer">Transferência</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">País</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                            <div className="text-sm text-gray-500">{transaction.project}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getTransactionTypeColor(transaction.type)}`}>
                            {getTransactionTypeIcon(transaction.type)}
                            {transaction.type === 'income' ? 'Receita' : 
                             transaction.type === 'expense' ? 'Despesa' : 'Transferência'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                            {getStatusLabel(transaction.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <span className="flex items-center gap-1">
                            {getCountryFlag(transaction.country)} {transaction.country}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Ver</button>
                            <button className="text-green-600 hover:text-green-700 text-sm">Editar</button>
                            {transaction.status === 'pending' && (
                              <button className="text-red-600 hover:text-red-700 text-sm">Aprovar</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Budgets Tab */}
          {activeTab === 'budgets' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Orçamentos por Categoria</h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Criar Orçamento
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {budgets.map(budget => {
                  const usagePercentage = (budget.spent / budget.allocated) * 100;
                  const remaining = budget.allocated - budget.spent;
                  
                  return (
                    <div key={budget.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{budget.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <span>{getCountryFlag(budget.country)} {budget.country}</span>
                            <span>•</span>
                            <span>{budget.period}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          usagePercentage > 90 ? 'bg-red-100 text-red-800' :
                          usagePercentage > 75 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {usagePercentage.toFixed(1)}% usado
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Alocado</p>
                            <p className="text-lg font-bold text-blue-600">{formatCurrency(budget.allocated, budget.currency)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Gasto</p>
                            <p className="text-lg font-bold text-red-600">{formatCurrency(budget.spent, budget.currency)}</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progresso</span>
                            <span className="font-medium">{usagePercentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-300 ${
                                usagePercentage > 90 ? 'bg-red-500' :
                                usagePercentage > 75 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">Restante</p>
                              <p className="font-bold text-gray-900">{formatCurrency(remaining, budget.currency)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Responsável</p>
                              <p className="text-sm font-medium text-gray-900">{budget.responsible}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                            Ver Detalhes
                          </button>
                          <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
                            Ajustar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Gestão de Faturas</h3>
                <button 
                  onClick={() => setShowInvoiceModal(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Nova Fatura
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {invoices.map(invoice => (
                  <div key={invoice.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{invoice.number}</h4>
                        <p className="text-sm text-gray-600">{invoice.client}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                        {getStatusLabel(invoice.status)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Projeto</p>
                        <p className="font-medium text-gray-900">{invoice.project}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Valor</p>
                          <p className="font-bold text-green-600 text-lg">
                            {formatCurrency(invoice.amount, invoice.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">País</p>
                          <p className="font-medium text-gray-900">
                            {getCountryFlag(invoice.country)} {invoice.country}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Emissão</p>
                          <p className="text-sm text-gray-900">
                            {new Date(invoice.issueDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Vencimento</p>
                          <p className={`text-sm ${
                            new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid' 
                              ? 'text-red-600 font-medium' 
                              : 'text-gray-900'
                          }`}>
                            {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                            Ver PDF
                          </button>
                          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Enviar
                          </button>
                          {invoice.status === 'sent' && (
                            <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm">
                              Marcar Pago
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exchange Tab */}
          {activeTab === 'exchange' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Taxas de Câmbio</h3>
                <div className="text-sm text-gray-500">
                  Última atualização: {exchangeRates[0].lastUpdated}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {exchangeRates.map((rate, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">{rate.from}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-lg font-bold text-gray-900">{rate.to}</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {rate.rate.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        1 {rate.from} = {rate.rate} {rate.to}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Currency Converter */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Conversor de Moedas</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
                    <input
                      type="number"
                      defaultValue="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">De</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Para</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Resultado da conversão</div>
                    <div className="text-2xl font-bold text-green-600">825,500.00 AOA</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Relatórios Financeiros</h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Gerar Relatório
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Demonstrativo de Resultados',
                    description: 'Receitas, despesas e lucro por período',
                    icon: '📊',
                    period: 'Mensal/Trimestral/Anual',
                    format: 'PDF, Excel'
                  },
                  {
                    title: 'Fluxo de Caixa',
                    description: 'Movimentações de entrada e saída',
                    icon: '💰',
                    period: 'Diário/Semanal/Mensal',
                    format: 'PDF, Excel'
                  },
                  {
                    title: 'Análise por País',
                    description: 'Performance financeira regional',
                    icon: '🌍',
                    period: 'Trimestral/Anual',
                    format: 'PDF, Excel, PowerPoint'
                  },
                  {
                    title: 'Execução Orçamentária',
                    description: 'Comparativo orçado vs realizado',
                    icon: '💼',
                    period: 'Mensal/Trimestral',
                    format: 'PDF, Excel'
                  },
                  {
                    title: 'Relatório de Projetos',
                    description: 'Custos e rentabilidade por projeto',
                    icon: '🚀',
                    period: 'Por projeto/Mensal',
                    format: 'PDF, Excel'
                  },
                  {
                    title: 'Conciliação Bancária',
                    description: 'Reconciliação de contas bancárias',
                    icon: '🏦',
                    period: 'Mensal',
                    format: 'PDF, Excel'
                  }
                ].map((report, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{report.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{report.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Período:</span>
                        <span className="text-gray-900">{report.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Formato:</span>
                        <span className="text-gray-900">{report.format}</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Gerar Relatório
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Nova Transação</h2>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="income">💰 Receita</option>
                      <option value="expense">💸 Despesa</option>
                      <option value="transfer">🔄 Transferência</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valor *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="1000.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Moeda *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">País *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {countries.map(country => (
                        <option key={country} value={country}>
                          {getCountryFlag(country)} {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Descrição da transação"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Projeto</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="">Selecione um projeto</option>
                      <option value="telemedicina">Rede de Telemedicina Regional</option>
                      <option value="marketplace">Marketplace de Artesanato</option>
                      <option value="intercambio">Sistema de Intercâmbio</option>
                      <option value="turismo">App de Turismo Sustentável</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Informações adicionais sobre a transação..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTransactionModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Criar Transação
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

export default FinanceManagement;