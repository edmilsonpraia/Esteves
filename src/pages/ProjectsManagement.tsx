import React, { useState } from 'react';

interface Project {
  id: number;
  name: string;
  client: string;
  country: string;
  sector: string;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  team: TeamMember[];
  description: string;
  deliverables: string[];
  risks: Risk[];
  milestones: Milestone[];
  documents: ProjectDocument[];
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  country: string;
  avatar: string;
  email: string;
}

interface Risk {
  id: number;
  description: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
  status: 'open' | 'mitigated' | 'closed';
}

interface Milestone {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
  description: string;
}

interface ProjectDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface ProjectFormData {
  name: string;
  client: string;
  country: string;
  sector: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  teamMembers: number[];
}

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Rede de Telemedicina Regional',
      client: 'Clínica Sagrada Esperança',
      country: 'Angola',
      sector: 'Saúde',
      status: 'active',
      priority: 'high',
      budget: 85000,
      spent: 45000,
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      progress: 65,
      description: 'Sistema integrado de telemedicina conectando Angola, Namíbia e África do Sul para consultas médicas remotas e intercâmbio de especialistas.',
      deliverables: ['Plataforma Web', 'App Mobile', 'Treinamento', 'Documentação'],
      team: [
        { id: 1, name: 'Dr. António Silva', role: 'Líder Médico', country: 'Angola', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face', email: 'antonio@africashands.com' },
        { id: 2, name: 'Eng. Maria Santos', role: 'Tech Lead', country: 'Angola', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=40&h=40&fit=crop&crop=face', email: 'maria@africashands.com' }
      ],
      risks: [
        { id: 1, description: 'Conectividade instável em áreas rurais', level: 'medium', mitigation: 'Parcerias com provedores locais', status: 'open' },
        { id: 2, description: 'Resistência à adoção tecnológica', level: 'low', mitigation: 'Programa intensivo de treinamento', status: 'mitigated' }
      ],
      milestones: [
        { id: 1, title: 'Análise de Requisitos', dueDate: '2024-02-15', completed: true, description: 'Levantamento completo das necessidades' },
        { id: 2, title: 'Desenvolvimento MVP', dueDate: '2024-04-30', completed: true, description: 'Versão mínima viável da plataforma' },
        { id: 3, title: 'Testes Piloto', dueDate: '2024-06-15', completed: false, description: 'Testes em hospitais selecionados' }
      ],
      documents: [
        { id: 1, name: 'Proposta_Técnica.pdf', type: 'PDF', size: '2.4MB', uploadedAt: '2024-01-10', uploadedBy: 'Eng. Maria Santos' },
        { id: 2, name: 'Cronograma_Detalhado.xlsx', type: 'Excel', size: '856KB', uploadedAt: '2024-01-15', uploadedBy: 'Dr. António Silva' }
      ],
      createdAt: '2024-01-10',
      updatedAt: '2024-06-20'
    },
    {
      id: 2,
      name: 'Marketplace de Artesanato Africano',
      client: 'Associação de Artesãos Himba',
      country: 'Namíbia',
      sector: 'Comércio',
      status: 'active',
      priority: 'medium',
      budget: 45000,
      spent: 23000,
      startDate: '2024-02-01',
      endDate: '2024-09-01',
      progress: 50,
      description: 'Plataforma de e-commerce para produtos artesanais da região, facilitando o comércio transfronteiriço e promovendo a cultura local.',
      deliverables: ['E-commerce Platform', 'Payment Gateway', 'Logistics System', 'Mobile App'],
      team: [
        { id: 3, name: 'João Kazembe', role: 'Product Manager', country: 'Namíbia', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', email: 'joao@africashands.com' },
        { id: 4, name: 'Sarah Nghikembua', role: 'UX Designer', country: 'Namíbia', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face', email: 'sarah@africashands.com' }
      ],
      risks: [
        { id: 3, description: 'Logística complexa entre países', level: 'high', mitigation: 'Parcerias com transportadoras regionais', status: 'open' },
        { id: 4, description: 'Variação cambial entre moedas', level: 'medium', mitigation: 'Sistema de hedge automático', status: 'open' }
      ],
      milestones: [
        { id: 4, title: 'Research & Discovery', dueDate: '2024-03-01', completed: true, description: 'Pesquisa de mercado e usuários' },
        { id: 5, title: 'Design System', dueDate: '2024-04-15', completed: true, description: 'Criação do sistema de design' },
        { id: 6, title: 'Beta Launch', dueDate: '2024-07-01', completed: false, description: 'Lançamento da versão beta' }
      ],
      documents: [
        { id: 3, name: 'Market_Research.pdf', type: 'PDF', size: '3.1MB', uploadedAt: '2024-02-05', uploadedBy: 'João Kazembe' },
        { id: 4, name: 'Design_System.fig', type: 'Figma', size: '12MB', uploadedAt: '2024-04-10', uploadedBy: 'Sarah Nghikembua' }
      ],
      createdAt: '2024-01-25',
      updatedAt: '2024-06-18'
    },
    {
      id: 3,
      name: 'Sistema de Intercâmbio Universitário',
      client: 'University of Cape Town',
      country: 'África do Sul',
      sector: 'Educação',
      status: 'completed',
      priority: 'high',
      budget: 120000,
      spent: 118000,
      startDate: '2023-09-01',
      endDate: '2024-03-01',
      progress: 100,
      description: 'Portal completo para intercâmbio acadêmico entre universidades dos 3 países, incluindo sistema de bolsas e certificações.',
      deliverables: ['Student Portal', 'Admin Dashboard', 'Mobile App', 'Integration APIs'],
      team: [
        { id: 5, name: 'Prof. David Williams', role: 'Academic Lead', country: 'África do Sul', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', email: 'david@africashands.com' },
        { id: 6, name: 'Dr. Fatima Moyo', role: 'Research Director', country: 'África do Sul', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face', email: 'fatima@africashands.com' }
      ],
      risks: [
        { id: 5, description: 'Diferenças nos sistemas acadêmicos', level: 'medium', mitigation: 'Padronização via comitê regional', status: 'closed' },
        { id: 6, description: 'Questões de visto entre países', level: 'high', mitigation: 'Acordo diplomático facilitado', status: 'closed' }
      ],
      milestones: [
        { id: 7, title: 'Platform Development', dueDate: '2023-12-01', completed: true, description: 'Desenvolvimento da plataforma base' },
        { id: 8, title: 'University Partnerships', dueDate: '2024-01-15', completed: true, description: 'Acordos com universidades parceiras' },
        { id: 9, title: 'Full Launch', dueDate: '2024-03-01', completed: true, description: 'Lançamento oficial do programa' }
      ],
      documents: [
        { id: 5, name: 'Final_Report.pdf', type: 'PDF', size: '5.7MB', uploadedAt: '2024-03-05', uploadedBy: 'Prof. David Williams' },
        { id: 6, name: 'Success_Metrics.xlsx', type: 'Excel', size: '1.2MB', uploadedAt: '2024-03-10', uploadedBy: 'Dr. Fatima Moyo' }
      ],
      createdAt: '2023-08-15',
      updatedAt: '2024-03-10'
    },
    {
      id: 4,
      name: 'App de Turismo Sustentável',
      client: 'Hilton Windhoek',
      country: 'Namíbia',
      sector: 'Turismo',
      status: 'active',
      priority: 'medium',
      budget: 65000,
      spent: 30000,
      startDate: '2024-03-15',
      endDate: '2024-10-15',
      progress: 40,
      description: 'Aplicativo para roteiros turísticos integrados na região, focando em sustentabilidade e experiências autênticas.',
      deliverables: ['Mobile App', 'Web Platform', 'Booking System', 'Guide Training'],
      team: [
        { id: 7, name: 'Ana Rodrigues', role: 'Tourism Specialist', country: 'Namíbia', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face', email: 'ana@africashands.com' },
        { id: 8, name: 'Tom Nghoshi', role: 'Mobile Developer', country: 'Namíbia', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face', email: 'tom@africashands.com' }
      ],
      risks: [
        { id: 7, description: 'Sazonalidade do turismo', level: 'medium', mitigation: 'Diversificação de roteiros', status: 'open' },
        { id: 8, description: 'Concorrência com apps internacionais', level: 'high', mitigation: 'Foco em experiências locais únicas', status: 'open' }
      ],
      milestones: [
        { id: 10, title: 'Market Analysis', dueDate: '2024-04-30', completed: true, description: 'Análise do mercado turístico regional' },
        { id: 11, title: 'App MVP', dueDate: '2024-07-15', completed: false, description: 'Primeira versão do aplicativo' },
        { id: 12, title: 'Partner Integration', dueDate: '2024-09-01', completed: false, description: 'Integração com hotéis e operadoras' }
      ],
      documents: [
        { id: 7, name: 'Tourism_Strategy.pdf', type: 'PDF', size: '4.2MB', uploadedAt: '2024-03-20', uploadedBy: 'Ana Rodrigues' },
        { id: 8, name: 'App_Wireframes.pdf', type: 'PDF', size: '8.5MB', uploadedAt: '2024-04-05', uploadedBy: 'Tom Nghoshi' }
      ],
      createdAt: '2024-03-01',
      updatedAt: '2024-06-15'
    },
    {
      id: 5,
      name: 'Plataforma de Transporte Regional',
      client: 'TAAG Angola Airlines',
      country: 'Angola',
      sector: 'Transporte',
      status: 'planning',
      priority: 'critical',
      budget: 150000,
      spent: 15000,
      startDate: '2024-06-01',
      endDate: '2025-02-01',
      progress: 10,
      description: 'Sistema integrado de reservas e rastreamento de voos regionais, conectando Angola, Namíbia e África do Sul.',
      deliverables: ['Booking Platform', 'Mobile Apps', 'API Integration', 'Analytics Dashboard'],
      team: [
        { id: 9, name: 'Eng. Carlos Mbala', role: 'Aviation Tech Lead', country: 'Angola', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', email: 'carlos@africashands.com' },
        { id: 10, name: 'Piloto Maria Costa', role: 'Operations Consultant', country: 'Angola', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face', email: 'maria.costa@africashands.com' }
      ],
      risks: [
        { id: 9, description: 'Regulamentações aéreas complexas', level: 'high', mitigation: 'Consultoria especializada em aviação', status: 'open' },
        { id: 10, description: 'Integração com sistemas legados', level: 'high', mitigation: 'APIs customizadas e middleware', status: 'open' },
        { id: 11, description: 'Dependência de aprovações governamentais', level: 'critical', mitigation: 'Equipe dedicada para relações institucionais', status: 'open' }
      ],
      milestones: [
        { id: 13, title: 'Regulatory Approval', dueDate: '2024-08-01', completed: false, description: 'Aprovações regulatórias nos 3 países' },
        { id: 14, title: 'Technical Architecture', dueDate: '2024-09-15', completed: false, description: 'Definição da arquitetura técnica' },
        { id: 15, title: 'Development Phase 1', dueDate: '2024-12-01', completed: false, description: 'Primeira fase de desenvolvimento' }
      ],
      documents: [
        { id: 9, name: 'Aviation_Requirements.pdf', type: 'PDF', size: '6.8MB', uploadedAt: '2024-06-05', uploadedBy: 'Eng. Carlos Mbala' },
        { id: 10, name: 'Regulatory_Framework.docx', type: 'Word', size: '2.1MB', uploadedAt: '2024-06-10', uploadedBy: 'Piloto Maria Costa' }
      ],
      createdAt: '2024-05-20',
      updatedAt: '2024-06-20'
    }
  ]);

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    status: 'all',
    country: 'all',
    sector: 'all',
    priority: 'all',
    search: ''
  });

  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    client: '',
    country: '',
    sector: '',
    description: '',
    budget: 0,
    startDate: '',
    endDate: '',
    priority: 'medium',
    teamMembers: []
  });

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia'];
  const statuses = ['planning', 'active', 'paused', 'completed', 'cancelled'];
  const priorities = ['low', 'medium', 'high', 'critical'];

  // Helper functions
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
      'planning': 'bg-blue-100 text-blue-800',
      'active': 'bg-yellow-100 text-yellow-800',
      'paused': 'bg-gray-100 text-gray-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'planning': 'Planejamento',
      'active': 'Em Andamento',
      'paused': 'Pausado',
      'completed': 'Concluído',
      'cancelled': 'Cancelado'
    };
    return labels[status as keyof typeof labels];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      'low': 'Baixa',
      'medium': 'Média',
      'high': 'Alta',
      'critical': 'Crítica'
    };
    return labels[priority as keyof typeof labels];
  };

  const getRiskColor = (level: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors];
  };

  // Filter and search logic
  const applyFilters = () => {
    let filtered = projects;

    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    if (filters.country !== 'all') {
      filtered = filtered.filter(p => p.country === filters.country);
    }
    if (filters.sector !== 'all') {
      filtered = filtered.filter(p => p.sector === filters.sector);
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(p => p.priority === filters.priority);
    }
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.client.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [filters, projects]);

  // Statistics calculation
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    planning: projects.filter(p => p.status === 'planning').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now(),
      ...formData,
      status: 'planning',
      progress: 0,
      spent: 0,
      team: [],
      deliverables: [],
      risks: [],
      milestones: [],
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects([...projects, newProject]);
    setShowCreateModal(false);
    setFormData({
      name: '',
      client: '',
      country: '',
      sector: '',
      description: '',
      budget: 0,
      startDate: '',
      endDate: '',
      priority: 'medium',
      teamMembers: []
    });
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      setProjects(projects.filter(p => p.id !== id));
      setSelectedProject(null);
      setShowProjectModal(false);
    }
  };

  const calculateProjectHealth = (project: Project) => {
    const budgetHealth = project.spent / project.budget;
    const timeHealth = new Date() > new Date(project.endDate) ? 1 : 0.5;
    const progressHealth = project.progress / 100;
    
    if (budgetHealth > 0.9 || timeHealth > 0.8) return 'critical';
    if (budgetHealth > 0.7 || progressHealth < 0.3) return 'warning';
    if (progressHealth > 0.7) return 'good';
    return 'normal';
  };

  const getHealthColor = (health: string) => {
    const colors = {
      'critical': 'text-red-600',
      'warning': 'text-yellow-600',
      'good': 'text-green-600',
      'normal': 'text-blue-600'
    };
    return colors[health as keyof typeof colors];
  };

  const getHealthIcon = (health: string) => {
    const icons = {
      'critical': '🚨',
      'warning': '⚠️',
      'good': '✅',
      'normal': '📊'
    };
    return icons[health as keyof typeof icons];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Projetos Regionais</h1>
          <p className="text-gray-600">Acompanhe e gerencie todos os projetos da África Austral 🇦🇴🇳🇦🇿🇦</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Projeto
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Projetos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.active}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Planejamento</p>
              <p className="text-2xl font-bold text-blue-600">{stats.planning}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orçamento Total</p>
              <p className="text-2xl font-bold text-purple-600">
                ${(stats.totalBudget / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progresso Médio</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.avgProgress}%</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              type="text"
              placeholder="Nome, cliente ou descrição..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{getStatusLabel(status)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Todos os Países</option>
              {countries.map(country => (
                <option key={country} value={country}>{getCountryFlag(country)} {country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Setor</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Todos os Setores</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{getSectorIcon(sector)} {sector}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Todas as Prioridades</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{getPriorityLabel(priority)}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ status: 'all', country: 'all', sector: 'all', priority: 'all', search: '' })}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const health = calculateProjectHealth(project);
          const daysRemaining = Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getSectorIcon(project.sector)}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{getCountryFlag(project.country)} {project.country}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{project.client}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthColor(health)}`}>
                      {getHealthIcon(health)}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowProjectModal(true);
                        setActiveTab('overview');
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Status and Priority */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                    {getPriorityLabel(project.priority)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progresso</span>
                    <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Budget and Timeline */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Orçamento</p>
                    <p className="text-sm font-bold text-green-600">
                      ${project.budget.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Gasto: ${project.spent.toLocaleString()} ({((project.spent / project.budget) * 100).toFixed(1)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Prazo</p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(project.endDate).toLocaleDateString('pt-BR')}
                    </p>
                    <p className={`text-xs ${daysRemaining < 0 ? 'text-red-600' : daysRemaining < 30 ? 'text-yellow-600' : 'text-gray-500'}`}>
                      {daysRemaining < 0 ? `${Math.abs(daysRemaining)} dias atrasado` : `${daysRemaining} dias restantes`}
                    </p>
                  </div>
                </div>

                {/* Team */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Equipe ({project.team.length})</p>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member) => (
                      <img
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        title={`${member.name} - ${member.role}`}
                      />
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{project.team.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowProjectModal(true);
                      setActiveTab('overview');
                    }}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Ver Detalhes
                  </button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum projeto encontrado</h3>
          <p className="text-gray-500 mb-6">Não foram encontrados projetos com os filtros aplicados.</p>
          <button
            onClick={() => setFilters({ status: 'all', country: 'all', sector: 'all', priority: 'all', search: '' })}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Criar Novo Projeto</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleCreateProject(); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Projeto *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Ex: Sistema de Telemedicina Regional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cliente *</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Ex: Hospital Central"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">País *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Selecione o país</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{getCountryFlag(country)} {country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Setor *</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Selecione o setor</option>
                      {sectors.map(sector => (
                        <option key={sector} value={sector}>{getSectorIcon(sector)} {sector}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade *</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' | 'critical' })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{getPriorityLabel(priority)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Orçamento (USD) *</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data de Término *</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Descreva os objetivos e escopo do projeto..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Criar Projeto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getSectorIcon(selectedProject.sector)}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-600">{getCountryFlag(selectedProject.country)} {selectedProject.country}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{selectedProject.client}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="mt-6">
                <nav className="flex space-x-8 overflow-x-auto">
                  {[
                    { id: 'overview', name: 'Visão Geral', icon: '📊' },
                    { id: 'team', name: 'Equipe', icon: '👥' },
                    { id: 'milestones', name: 'Marcos', icon: '🎯' },
                    { id: 'risks', name: 'Riscos', icon: '⚠️' },
                    { id: 'documents', name: 'Documentos', icon: '📁' },
                    { id: 'timeline', name: 'Timeline', icon: '📅' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-red-500 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-1">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Status Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedProject.status)}`}>
                          {getStatusLabel(selectedProject.status)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Prioridade</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedProject.priority)}`}>
                        {getPriorityLabel(selectedProject.priority)}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Progresso</p>
                      <p className="text-lg font-bold text-gray-900">{selectedProject.progress}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Saúde</p>
                      <span className={`${getHealthColor(calculateProjectHealth(selectedProject))}`}>
                        {getHealthIcon(calculateProjectHealth(selectedProject))} {calculateProjectHealth(selectedProject)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Financial Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumo Financeiro</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-green-600 mb-1">Orçamento Total</p>
                        <p className="text-2xl font-bold text-green-700">
                          ${selectedProject.budget.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-sm text-red-600 mb-1">Valor Gasto</p>
                        <p className="text-2xl font-bold text-red-700">
                          ${selectedProject.spent.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-600 mb-1">Saldo Restante</p>
                        <p className="text-2xl font-bold text-blue-700">
                          ${(selectedProject.budget - selectedProject.spent).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Budget Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Execução Orçamentária</span>
                        <span className="font-medium">
                          {((selectedProject.spent / selectedProject.budget) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(selectedProject.spent / selectedProject.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Entregas Principais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cronograma</h3>
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
                            selectedProject.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Tab */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Equipe do Projeto</h3>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Adicionar Membro
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.team.map((member) => (
                      <div key={member.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs">{getCountryFlag(member.country)}</span>
                              <span className="text-xs text-gray-500">{member.country}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedProject.team.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">👥</div>
                      <p className="text-gray-500">Nenhum membro da equipe adicionado ainda</p>
                    </div>
                  )}
                </div>
              )}

              {/* Milestones Tab */}
              {activeTab === 'milestones' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Marcos do Projeto</h3>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Adicionar Marco
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedProject.milestones.map((milestone) => (
                      <div key={milestone.id} className={`p-4 rounded-lg border-l-4 ${
                        milestone.completed 
                          ? 'bg-green-50 border-green-500' 
                          : new Date(milestone.dueDate) < new Date() 
                            ? 'bg-red-50 border-red-500' 
                            : 'bg-yellow-50 border-yellow-500'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                milestone.completed 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                {milestone.completed ? (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <span className="text-xs font-bold">{milestone.id}</span>
                                )}
                              </div>
                              <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                milestone.completed 
                                  ? 'bg-green-100 text-green-800'
                                  : new Date(milestone.dueDate) < new Date()
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {milestone.completed 
                                  ? 'Concluído' 
                                  : new Date(milestone.dueDate) < new Date()
                                    ? 'Atrasado'
                                    : 'Pendente'
                                }
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
                            <p className="text-xs text-gray-500">
                              Prazo: {new Date(milestone.dueDate).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedProject.milestones.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="text-gray-500">Nenhum marco definido ainda</p>
                    </div>
                  )}
                </div>
              )}

              {/* Risks Tab */}
              {activeTab === 'risks' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Riscos do Projeto</h3>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Adicionar Risco
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedProject.risks.map((risk) => (
                      <div key={risk.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(risk.level)}`}>
                              {risk.level === 'low' ? 'Baixo' : 
                               risk.level === 'medium' ? 'Médio' : 
                               risk.level === 'high' ? 'Alto' : 'Crítico'}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              risk.status === 'open' ? 'bg-red-100 text-red-800' :
                              risk.status === 'mitigated' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {risk.status === 'open' ? 'Aberto' : 
                               risk.status === 'mitigated' ? 'Mitigado' : 'Fechado'}
                            </span>
                          </div>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{risk.description}</h4>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-500 mb-1">Plano de Mitigação:</p>
                          <p className="text-sm text-gray-700">{risk.mitigation}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedProject.risks.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">⚠️</div>
                      <p className="text-gray-500">Nenhum risco identificado</p>
                    </div>
                  )}
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Documentos do Projeto</h3>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Fazer Upload
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedProject.documents.map((doc) => (
                      <div key={doc.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{doc.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>Por {doc.uploadedBy}</span>
                                <span>•</span>
                                <span>{new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedProject.documents.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">📁</div>
                      <p className="text-gray-500">Nenhum documento anexado</p>
                    </div>
                  )}
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Timeline do Projeto</h3>
                  
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-6">
                      {/* Project Created */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          📋
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Projeto Criado</h4>
                          <p className="text-gray-600 text-sm">Projeto iniciado no sistema</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(selectedProject.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>

                      {/* Milestones */}
                      {selectedProject.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-400'
                          }`}>
                            {milestone.completed ? '✅' : '⏳'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <p className="text-gray-600 text-sm">{milestone.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Prazo: {new Date(milestone.dueDate).toLocaleDateString('pt-BR')}
                              {milestone.completed && ' (Concluído)'}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Project End */}
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                          selectedProject.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                          🏁
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Fim do Projeto</h4>
                          <p className="text-gray-600 text-sm">
                            {selectedProject.status === 'completed' ? 'Projeto concluído' : 'Data prevista para conclusão'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(selectedProject.endDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Última atualização: {new Date(selectedProject.updatedAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Fechar
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Editar Projeto
                  </button>
                  <button
                    onClick={() => handleDeleteProject(selectedProject.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Excluir Projeto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;