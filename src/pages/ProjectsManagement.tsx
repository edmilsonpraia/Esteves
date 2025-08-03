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
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestão de Projetos Regionais</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Acompanhe e gerencie todos os projetos da África Austral 🇦🇴🇳🇦🇿🇦</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 text-white px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors text-sm sm:text-base font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Novo Projeto</span>
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-sm sm:text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Exportar Relatório</span>
            <span className="sm:hidden">Exportar</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
        <div className="bg-white p-3 sm:p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500">Total Projetos</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg sm:text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500">Ativos</p>
              <p className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.active}</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-lg sm:text-2xl">🚀</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500">Concluídos</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg sm:text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500">Planejamento</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.planning}</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg sm:text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500">Orçamento Total</p>
              <p className="text-sm sm:text-xl font-bold text-green-600">${(stats.totalBudget / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg sm:text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500">Progresso Médio</p>
              <p className="text-lg sm:text-2xl font-bold text-red-600">{stats.avgProgress}%</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-lg sm:text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-200">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar projetos por nome, cliente ou descrição..."
              className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">Todos</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{getStatusLabel(status)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">País</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">Todos</option>
                {countries.map(country => (
                  <option key={country} value={country}>{getCountryFlag(country)} {country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Setor</label>
              <select
                value={filters.sector}
                onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">Todos</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{getSectorIcon(sector)} {sector}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Prioridade</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">Todas</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{getPriorityLabel(priority)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (value && value !== 'all' && key !== 'search') {
                return (
                  <span key={key} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {key === 'status' ? getStatusLabel(value) :
                     key === 'country' ? `${getCountryFlag(value)} ${value}` :
                     key === 'sector' ? `${getSectorIcon(value)} ${value}` :
                     key === 'priority' ? getPriorityLabel(value) : value}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, [key]: 'all' }))}
                      className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-400 hover:bg-red-200 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                );
              }
              return null;
            })}
            
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                "{filters.search}"
                <button
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-400 hover:bg-red-200 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid - Mobile Card Layout */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Projetos ({filteredProjects.length})
          </h2>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 bg-gray-100 rounded transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile-first Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setShowProjectModal(true);
              }}
              className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getSectorIcon(project.sector)}</span>
                    <span className="text-lg">{getCountryFlag(project.country)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                      {getPriorityLabel(project.priority)}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {project.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-9a1 1 0 00-1-1h-1a1 1 0 00-1 1v9m4 0V8a1 1 0 00-1-1h-1a1 1 0 00-1 1v13m-4 0h2m-2 0h-2" />
                    </svg>
                    <span className="font-medium">{project.client}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{project.country}</span>
                    <span>•</span>
                    <span>{project.sector}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Budget Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Orçamento</p>
                    <p className="text-sm font-bold text-green-600">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gasto</p>
                    <p className="text-sm font-bold text-red-600">${project.spent.toLocaleString()}</p>
                  </div>
                </div>

                {/* Team Avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Equipe:</span>
                    <div className="flex -space-x-1">
                      {project.team.slice(0, 3).map((member) => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          title={member.name}
                        />
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className={`${getHealthColor(calculateProjectHealth(project))}`}>
                      {getHealthIcon(calculateProjectHealth(project))}
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                    <span>Fim: {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou criar um novo projeto.</p>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Criar Novo Projeto</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Projeto</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Digite o nome do projeto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Nome do cliente"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Selecione o país</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{getCountryFlag(country)} {country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Setor</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Selecione o setor</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{getSectorIcon(sector)} {sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Término</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Orçamento ($)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' | 'critical' }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{getPriorityLabel(priority)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Descreva o projeto..."
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!formData.name || !formData.client || !formData.country || !formData.sector}
                  className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar Projeto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getSectorIcon(selectedProject.sector)}</span>
                  <span className="text-2xl">{getCountryFlag(selectedProject.country)}</span>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{selectedProject.name}</h2>
                </div>
                <p className="text-sm text-gray-600">{selectedProject.client}</p>
              </div>
              
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="px-4 sm:px-6 bg-white border-b border-gray-200">
              <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                {[
                  { id: 'overview', name: 'Visão Geral', icon: '📊' },
                  { id: 'team', name: 'Equipe', icon: '👥' },
                  { id: 'milestones', name: 'Marcos', icon: '🎯' },
                  { id: 'risks', name: 'Riscos', icon: '⚠️' },
                  { id: 'documents', name: 'Docs', icon: '📁' },
                  { id: 'timeline', name: 'Timeline', icon: '📅' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-1 text-base">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Status Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedProject.status)}`}>
                          {getStatusLabel(selectedProject.status)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Prioridade</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedProject.priority)}`}>
                        {getPriorityLabel(selectedProject.priority)}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Progresso</p>
                      <p className="text-lg font-bold text-gray-900">{selectedProject.progress}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Saúde</p>
                      <span className={`${getHealthColor(calculateProjectHealth(selectedProject))}`}>
                        {getHealthIcon(calculateProjectHealth(selectedProject))} {calculateProjectHealth(selectedProject)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{selectedProject.description}</p>
                  </div>

                  {/* Financial Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumo Financeiro</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-green-600 mb-1">Orçamento Total</p>
                        <p className="text-xl sm:text-2xl font-bold text-green-700">
                          ${selectedProject.budget.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-sm text-red-600 mb-1">Valor Gasto</p>
                        <p className="text-xl sm:text-2xl font-bold text-red-700">
                          ${selectedProject.spent.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-600 mb-1">Saldo Restante</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-700">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cronograma</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">Início</span>
                          <span className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        
                        <div className="flex-1 mx-0 sm:mx-4">
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Equipe do Projeto</h3>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Adicionar Membro
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.team.map((member) => (
                      <div key={member.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{member.name}</h4>
                            <p className="text-sm text-gray-600 truncate">{member.role}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs">{getCountryFlag(member.country)}</span>
                              <span className="text-xs text-gray-500">{member.country}</span>
                            </div>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
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
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full self-start ${
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
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors ml-4 flex-shrink-0">
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Riscos do Projeto</h3>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Adicionar Risco
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedProject.risks.map((risk) => (
                      <div key={risk.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                          <div className="flex flex-wrap items-center gap-3">
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
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors self-start">
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Documentos do Projeto</h3>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Fazer Upload
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedProject.documents.map((doc) => (
                      <div key={doc.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-gray-500">
                                <span>{doc.type}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{doc.size}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="truncate">Por {doc.uploadedBy}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
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

              {/* Timeline Tab - Horizontal scrolling for mobile */}
              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Timeline do Projeto</h3>
                  
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block"></div>
                    
                    {/* Mobile horizontal scroll timeline */}
                    <div className="sm:hidden">
                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {/* Project Created */}
                        <div className="flex-shrink-0 w-64 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                              📋
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">Projeto Criado</h4>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">Projeto iniciado no sistema</p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedProject.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>

                        {/* Milestones */}
                        {selectedProject.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex-shrink-0 w-64 bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                                milestone.completed ? 'bg-green-500' : 'bg-gray-400'
                              }`}>
                                {milestone.completed ? '✅' : '⏳'}
                              </div>
                              <h4 className="font-semibold text-gray-900 text-sm">{milestone.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{milestone.description}</p>
                            <p className="text-xs text-gray-500">
                              Prazo: {new Date(milestone.dueDate).toLocaleDateString('pt-BR')}
                              {milestone.completed && ' (Concluído)'}
                            </p>
                          </div>
                        ))}

                        {/* Project End */}
                        <div className="flex-shrink-0 w-64 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                              selectedProject.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                            }`}>
                              🏁
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">Fim do Projeto</h4>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">
                            {selectedProject.status === 'completed' ? 'Projeto concluído' : 'Data prevista para conclusão'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedProject.endDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop vertical timeline */}
                    <div className="hidden sm:block space-y-6">
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
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="text-sm text-gray-500 text-center sm:text-left">
                  Última atualização: {new Date(selectedProject.updatedAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Fechar
                  </button>
                  <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Editar Projeto
                  </button>
                  <button
                    onClick={() => handleDeleteProject(selectedProject.id)}
                    className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
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
