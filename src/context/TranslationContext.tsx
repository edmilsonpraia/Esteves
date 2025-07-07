// src/context/TranslationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para tradução
interface TranslationContextType {
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
  };
}

// Traduções do sistema
const translations: Translations = {
  // Header e Navegação
  'nav.dashboard': {
    pt: 'Dashboard',
    en: 'Dashboard'
  },
  'nav.projects': {
    pt: 'Projetos',
    en: 'Projects'
  },
  'nav.clients': {
    pt: 'Clientes & Parceiros',
    en: 'Clients & Partners'
  },
  'nav.team': {
    pt: 'Equipe Regional',
    en: 'Regional Team'
  },
  'nav.finance': {
    pt: 'Financeiro',
    en: 'Finance'
  },
  'nav.analytics': {
    pt: 'Analytics & KPIs',
    en: 'Analytics & KPIs'
  },
  'nav.services': {
    pt: 'Serviços Regionais',
    en: 'Regional Services'
  },
  'nav.contact': {
    pt: 'Contato',
    en: 'Contact'
  },

  // Header
  'header.toggleSidebar': {
    pt: 'Alternar menu lateral',
    en: 'Toggle sidebar'
  },
  'header.searchPlaceholder': {
    pt: 'Buscar projetos, clientes...',
    en: 'Search projects, clients...'
  },
  'header.search': {
    pt: 'Buscar',
    en: 'Search'
  },
  'header.notifications': {
    pt: 'Notificações',
    en: 'Notifications'
  },
  'header.adminPanel': {
    pt: 'Painel de Administração',
    en: 'Administration Panel'
  },
  'header.userPanel': {
    pt: 'Painel do Usuário',
    en: 'User Panel'
  },
  'header.subtitle': {
    pt: 'Escritório Esteves - Gestão Profissional',
    en: 'Escritório Esteves - Professional Management'
  },
  'header.companyName': {
    pt: 'Escritório Esteves',
    en: 'Escritório Esteves'
  },

  // Notificações
  'notifications.newProject.title': {
    pt: 'Novo projeto criado',
    en: 'New project created'
  },
  'notifications.newProject.message': {
    pt: 'Sistema de Gestão Empresarial foi criado com sucesso',
    en: 'Business Management System was created successfully'
  },
  'notifications.deadline.title': {
    pt: 'Prazo próximo',
    en: 'Upcoming deadline'
  },
  'notifications.deadline.message': {
    pt: 'Projeto Instalação Solar tem prazo em 3 dias',
    en: 'Solar Installation Project deadline in 3 days'
  },
  'notifications.time.fiveMinAgo': {
    pt: '5 min atrás',
    en: '5 min ago'
  },
  'notifications.time.oneHourAgo': {
    pt: '1 hora atrás',
    en: '1 hour ago'
  },
  'notifications.markAllAsRead': {
    pt: 'Marcar todas como lidas',
    en: 'Mark all as read'
  },
  'notifications.viewAll': {
    pt: 'Ver todas as notificações',
    en: 'View all notifications'
  },

  // Usuário
  'user.administrator': {
    pt: 'Administrador',
    en: 'Administrator'
  },
  'user.user': {
    pt: 'Usuário',
    en: 'User'
  },
  'user.email': {
    pt: 'admin@escritorioesteves.ao',
    en: 'admin@escritorioesteves.ao'
  },
  'user.profile': {
    pt: 'Meu Perfil',
    en: 'My Profile'
  },
  'user.settings': {
    pt: 'Configurações',
    en: 'Settings'
  },
  'user.contact': {
    pt: 'Contato',
    en: 'Contact'
  },
  'user.phoneAngola': {
    pt: 'AO: +244 924 166 401',
    en: 'AO: +244 924 166 401'
  },
  'user.phoneNamibia': {
    pt: 'NB: +264 817 049 40',
    en: 'NB: +264 817 049 40'
  },
  'user.logout': {
    pt: 'Sair',
    en: 'Logout'
  },

  // Sidebar
  'sidebar.main': {
    pt: 'Principal',
    en: 'Main'
  },
  'sidebar.analytics': {
    pt: 'Analytics & Insights',
    en: 'Analytics & Insights'
  },
  'sidebar.services': {
    pt: 'Serviços & Contato',
    en: 'Services & Contact'
  },
  'sidebar.administrator': {
    pt: 'Administrador',
    en: 'Administrator'
  },
  'sidebar.user': {
    pt: 'Usuário',
    en: 'User'
  },
  'sidebar.newProject': {
    pt: 'Novo Projeto',
    en: 'New Project'
  },
  'sidebar.projectManagement': {
    pt: 'Gestão de Projetos',
    en: 'Project Management'
  },
  'sidebar.createProject': {
    pt: 'Criar Projeto',
    en: 'Create Project'
  },
  'sidebar.regionalPresence': {
    pt: 'Presença Regional',
    en: 'Regional Presence'
  },
  'sidebar.systemOperational': {
    pt: 'Sistema Operacional',
    en: 'System Operational'
  },
  'sidebar.projects': {
    pt: 'Projetos',
    en: 'Projects'
  },
  'sidebar.clients': {
    pt: 'Clientes',
    en: 'Clients'
  },
  'sidebar.teamMembers': {
    pt: 'Equipe',
    en: 'Team'
  },

  // Dashboard Admin
  'dashboard.title': {
    pt: "Africa's Hands - Dashboard",
    en: "Africa's Hands - Dashboard"
  },
  'dashboard.subtitle': {
    pt: 'Painel principal de gestão regional Angola • Namíbia • África do Sul',
    en: 'Main regional management panel Angola • Namibia • South Africa'
  },
  'dashboard.newRegionalProject': {
    pt: 'Novo Projeto Regional',
    en: 'New Regional Project'
  },
  'dashboard.regionalReport': {
    pt: 'Relatório Regional',
    en: 'Regional Report'
  },
  'dashboard.quickActions': {
    pt: 'Ações Rápidas',
    en: 'Quick Actions'
  },
  'dashboard.quickActionsDesc': {
    pt: 'Acesso direto às principais funcionalidades',
    en: 'Direct access to main features'
  },
  'dashboard.projectsByCountry': {
    pt: 'Projetos por País',
    en: 'Projects by Country'
  },
  'dashboard.viewAll': {
    pt: 'Ver todos',
    en: 'View all'
  },
  'dashboard.recentProjects': {
    pt: 'Projetos Recentes',
    en: 'Recent Projects'
  },
  'dashboard.recentActivities': {
    pt: 'Atividades Recentes',
    en: 'Recent Activities'
  },
  'dashboard.systemStatus': {
    pt: 'Status do Sistema',
    en: 'System Status'
  },
  'dashboard.operational': {
    pt: 'Operacional',
    en: 'Operational'
  },
  'dashboard.performanceBySector': {
    pt: 'Performance por Setor',
    en: 'Performance by Sector'
  },
  'dashboard.financialSummary': {
    pt: 'Resumo Financeiro Regional',
    en: 'Regional Financial Summary'
  },
  'dashboard.alertsNotifications': {
    pt: 'Alertas e Notificações',
    en: 'Alerts and Notifications'
  },
  'dashboard.ourOffices': {
    pt: 'Nossos Escritórios',
    en: 'Our Offices'
  },

  // Estatísticas
  'stats.regionalProjects': {
    pt: 'Projetos Regionais',
    en: 'Regional Projects'
  },
  'stats.trilateralCooperation': {
    pt: 'Cooperação trilateral',
    en: 'Trilateral cooperation'
  },
  'stats.inProgress': {
    pt: 'Em Andamento',
    en: 'In Progress'
  },
  'stats.progress': {
    pt: 'Progresso',
    en: 'Progress'
  },
  'stats.completed': {
    pt: 'Concluídos',
    en: 'Completed'
  },
  'stats.successRate': {
    pt: '100% taxa de sucesso',
    en: '100% success rate'
  },
  'stats.clients': {
    pt: 'Clientes',
    en: 'Clients'
  },
  'stats.countriesServed': {
    pt: '3 países atendidos',
    en: '3 countries served'
  },
  'stats.team': {
    pt: 'Equipe',
    en: 'Team'
  },
  'stats.activeProfessionals': {
    pt: 'Profissionais ativos',
    en: 'Active professionals'
  },
  'stats.investment': {
    pt: 'Investimento',
    en: 'Investment'
  },
  'stats.executed': {
    pt: '% executado',
    en: '% executed'
  },
  'stats.invested': {
    pt: 'investidos',
    en: 'invested'
  },
  'stats.totalRevenue': {
    pt: 'Receita Total',
    en: 'Total Revenue'
  },
  'stats.totalSpent': {
    pt: 'Total Gasto',
    en: 'Total Spent'
  },
  'stats.currentProfit': {
    pt: 'Lucro Atual',
    en: 'Current Profit'
  },
  'stats.profitMargin': {
    pt: 'Margem de Lucro',
    en: 'Profit Margin'
  },
  'stats.connections': {
    pt: 'Conexões',
    en: 'Connections'
  },

  // Sistema
  'system.servers': {
    pt: 'Servidores',
    en: 'Servers'
  },
  'system.online': {
    pt: '100% Online',
    en: '100% Online'
  },
  'system.api': {
    pt: 'API',
    en: 'API'
  },
  'system.functioning': {
    pt: 'Funcionando',
    en: 'Functioning'
  },
  'system.backup': {
    pt: 'Backup',
    en: 'Backup'
  },
  'system.lastToday': {
    pt: 'Último: hoje',
    en: 'Last: today'
  },

  // Quick Actions
  'quickAction.createProject': {
    pt: 'Criar Projeto',
    en: 'Create Project'
  },
  'quickAction.newRegionalProject': {
    pt: 'Novo projeto regional',
    en: 'New regional project'
  },
  'quickAction.manageClients': {
    pt: 'Gerenciar Clientes',
    en: 'Manage Clients'
  },
  'quickAction.clientsPartners': {
    pt: 'Clientes & Parceiros',
    en: 'Clients & Partners'
  },
  'quickAction.viewAnalytics': {
    pt: 'Ver Analytics',
    en: 'View Analytics'
  },
  'quickAction.kpisMetrics': {
    pt: 'KPIs e métricas',
    en: 'KPIs and metrics'
  },
  'quickAction.teamManagement': {
    pt: 'Gestão de Equipe',
    en: 'Team Management'
  },
  'quickAction.regionalTeam': {
    pt: 'Equipe regional',
    en: 'Regional team'
  },
  'quickAction.finance': {
    pt: 'Financeiro',
    en: 'Finance'
  },
  'quickAction.financialManagement': {
    pt: 'Gestão financeira',
    en: 'Financial management'
  },
  'quickAction.allProjects': {
    pt: 'Todos os Projetos',
    en: 'All Projects'
  },
  'quickAction.completeManagement': {
    pt: 'Gestão completa',
    en: 'Complete management'
  },

  // Alertas
  'alert.upcomingDeadline': {
    pt: 'Prazo Próximo',
    en: 'Upcoming Deadline'
  },
  'alert.highBudget': {
    pt: 'Orçamento Alto',
    en: 'High Budget'
  },
  'alert.projectCompleted': {
    pt: 'Projeto Concluído',
    en: 'Project Completed'
  },

  // User Dashboard
  'userDash.welcome': {
    pt: 'Bem-vindo',
    en: 'Welcome'
  },
  'userDash.editProfile': {
    pt: 'Editar Perfil',
    en: 'Edit Profile'
  },
  'userDash.featuredOpportunities': {
    pt: 'Oportunidades em Destaque',
    en: 'Featured Opportunities'
  },
  'userDash.allOpportunities': {
    pt: 'Todas Oportunidades',
    en: 'All Opportunities'
  },
  'userDash.myApplications': {
    pt: 'Minhas Candidaturas',
    en: 'My Applications'
  },
  'userDash.regionalNetwork': {
    pt: 'Rede Regional',
    en: 'Regional Network'
  },
  'userDash.resources': {
    pt: 'Recursos',
    en: 'Resources'
  },
  'userDash.allRegionalOpportunities': {
    pt: 'Todas as Oportunidades Regionais',
    en: 'All Regional Opportunities'
  },
  'userDash.allCountries': {
    pt: 'Todos os Países',
    en: 'All Countries'
  },
  'userDash.allSectors': {
    pt: 'Todos os Setores',
    en: 'All Sectors'
  },
  'userDash.apply': {
    pt: 'Candidatar-se',
    en: 'Apply'
  },
  'userDash.save': {
    pt: 'Salvar',
    en: 'Save'
  },
  'userDash.share': {
    pt: 'Compartilhar',
    en: 'Share'
  },
  'userDash.viewDetails': {
    pt: 'Ver Detalhes',
    en: 'View Details'
  },
  'userDash.activeConnections': {
    pt: 'conexões ativas',
    en: 'active connections'
  },
  'userDash.exploreNetwork': {
    pt: 'Explorar Rede',
    en: 'Explore Network'
  },
  'userDash.recentConnections': {
    pt: 'Conexões Recentes',
    en: 'Recent Connections'
  },
  'userDash.connect': {
    pt: 'Conectar',
    en: 'Connect'
  },
  'userDash.connected': {
    pt: 'Conectado',
    en: 'Connected'
  },
  'userDash.expandNetwork': {
    pt: 'Pronto para Expandir sua Rede?',
    en: 'Ready to Expand Your Network?'
  },
  'userDash.exploreMoreOpportunities': {
    pt: 'Explorar Mais Oportunidades',
    en: 'Explore More Opportunities'
  },
  'userDash.connectSpecialists': {
    pt: 'Conectar com Especialistas',
    en: 'Connect with Specialists'
  },
  'userDash.expandNetworkDesc': {
    pt: 'Conecte-se com profissionais, empresas e oportunidades em toda a África Austral. Sua próxima grande oportunidade está aqui!',
    en: 'Connect with professionals, companies and opportunities throughout Southern Africa. Your next big opportunity is here!'
  },

  // Resources
  'resources.title': {
    pt: 'Recursos e Guias Regionais',
    en: 'Regional Resources and Guides'
  },
  'resources.sadcGuide': {
    pt: 'Guia de Negócios na SADC',
    en: 'SADC Business Guide'
  },
  'resources.sadcGuideDesc': {
    pt: 'Manual completo para fazer negócios na região da África Austral. Inclui regulamentações, oportunidades e contatos essenciais.',
    en: 'Complete manual for doing business in the Southern Africa region. Includes regulations, opportunities and essential contacts.'
  },
  'resources.onlineCourses': {
    pt: 'Cursos Online Regionais',
    en: 'Regional Online Courses'
  },
  'resources.onlineCoursesDesc': {
    pt: 'Capacitação em cooperação internacional, desenvolvimento sustentável e oportunidades de negócio na África Austral.',
    en: 'Training in international cooperation, sustainable development and business opportunities in Southern Africa.'
  },
  'resources.proposalTemplates': {
    pt: 'Templates de Propostas',
    en: 'Proposal Templates'
  },
  'resources.proposalTemplatesDesc': {
    pt: 'Modelos prontos para candidaturas, propostas de projetos e parcerias regionais. Aprovados por especialistas.',
    en: 'Ready-made templates for applications, project proposals and regional partnerships. Approved by experts.'
  },
  'resources.regionalEvents': {
    pt: 'Eventos Regionais 2024',
    en: 'Regional Events 2024'
  },
  'resources.regionalEventsDesc': {
    pt: 'Conferências, workshops e networking na África Austral. Conecte-se com líderes dos três países.',
    en: 'Conferences, workshops and networking in Southern Africa. Connect with leaders from all three countries.'
  },
  'resources.webinarsContent': {
    pt: 'Webinars e Conteúdo Exclusivo',
    en: 'Webinars and Exclusive Content'
  },
  'resources.downloadPdf': {
    pt: 'Baixar PDF',
    en: 'Download PDF'
  },
  'resources.viewCourses': {
    pt: 'Ver Cursos',
    en: 'View Courses'
  },
  'resources.download': {
    pt: 'Download',
    en: 'Download'
  },
  'resources.viewAgenda': {
    pt: 'Ver Agenda',
    en: 'View Agenda'
  },
  'resources.watch': {
    pt: 'Assistir',
    en: 'Watch'
  },
  'resources.modules': {
    pt: 'Módulos',
    en: 'Modules'
  },
  'resources.free': {
    pt: 'Gratuito',
    en: 'Free'
  },
  'resources.templates': {
    pt: 'Templates',
    en: 'Templates'
  },
  'resources.events': {
    pt: 'Eventos',
    en: 'Events'
  },

  // Application Status
  'appStatus.inAnalysis': {
    pt: 'Em Análise',
    en: 'Under Analysis'
  },
  'appStatus.approved': {
    pt: 'Aprovada',
    en: 'Approved'
  },
  'appStatus.rejected': {
    pt: 'Rejeitada',
    en: 'Rejected'
  },
  'appStatus.sentOn': {
    pt: 'Enviado em',
    en: 'Sent on'
  },

  // Projetos
  'projects.title': {
    pt: 'Gestão de Projetos Regionais',
    en: 'Regional Projects Management'
  },
  'projects.subtitle': {
    pt: 'Acompanhe e gerencie todos os projetos da África Austral 🇦🇴🇳🇦🇿🇦',
    en: 'Track and manage all Southern Africa projects 🇦🇴🇳🇦🇿🇦'
  },
  'projects.newProject': {
    pt: 'Novo Projeto',
    en: 'New Project'
  },
  'projects.exportReport': {
    pt: 'Exportar Relatório',
    en: 'Export Report'
  },
  'projects.totalProjects': {
    pt: 'Total de Projetos',
    en: 'Total Projects'
  },
  'projects.planning': {
    pt: 'Planejamento',
    en: 'Planning'
  },
  'projects.totalBudget': {
    pt: 'Orçamento Total',
    en: 'Total Budget'
  },
  'projects.averageProgress': {
    pt: 'Progresso Médio',
    en: 'Average Progress'
  },

  // Status de projetos
  'status.planning': {
    pt: 'Planejamento',
    en: 'Planning'
  },
  'status.active': {
    pt: 'Em Andamento',
    en: 'Active'
  },
  'status.paused': {
    pt: 'Pausado',
    en: 'Paused'
  },
  'status.completed': {
    pt: 'Concluído',
    en: 'Completed'
  },
  'status.cancelled': {
    pt: 'Cancelado',
    en: 'Cancelled'
  },

  // Prioridades
  'priority.low': {
    pt: 'Baixa',
    en: 'Low'
  },
  'priority.medium': {
    pt: 'Média',
    en: 'Medium'
  },
  'priority.high': {
    pt: 'Alta',
    en: 'High'
  },
  'priority.critical': {
    pt: 'Crítica',
    en: 'Critical'
  },

  // Países
  'country.angola': {
    pt: 'Angola',
    en: 'Angola'
  },
  'country.namibia': {
    pt: 'Namíbia',
    en: 'Namibia'
  },
  'country.southAfrica': {
    pt: 'África do Sul',
    en: 'South Africa'
  },

  // Setores
  'sector.health': {
    pt: 'Saúde',
    en: 'Health'
  },
  'sector.education': {
    pt: 'Educação',
    en: 'Education'
  },
  'sector.tourism': {
    pt: 'Turismo',
    en: 'Tourism'
  },
  'sector.commerce': {
    pt: 'Comércio',
    en: 'Commerce'
  },
  'sector.transport': {
    pt: 'Transporte',
    en: 'Transport'
  },
  'sector.technology': {
    pt: 'Tecnologia',
    en: 'Technology'
  },
  'sector.hospitalityTourism': {
    pt: 'Hotelaria e Turismo',
    en: 'Hospitality and Tourism'
  },
  'sector.localGuides': {
    pt: 'Guias e Informações Locais',
    en: 'Local Guides and Information'
  },

// Login - Geral
'login.slogan': {
  pt: 'África no clique',
  en: 'Africa at a click'
},
'login.otherSadcCountry': {
  pt: 'Outro país SADC',
  en: 'Other SADC country'
},
'login.countriesDescription': {
  pt: 'Angola • Namíbia • África do Sul',
  en: 'Angola • Namibia • South Africa'
},

// Login - Títulos e navegação
'login.welcomeBack': {
  pt: 'Bem-vindo de volta!',
  en: 'Welcome back!'
},
'login.createAccount': {
  pt: 'Criar Conta',
  en: 'Create Account'
},
'login.accessAccountDescription': {
  pt: 'Acesse sua conta para explorar oportunidades regionais',
  en: 'Access your account to explore regional opportunities'
},
'login.joinNetworkDescription': {
  pt: 'Junte-se à rede de cooperação da África Austral',
  en: 'Join the Southern Africa cooperation network'
},
'login.signIn': {
  pt: 'Entrar',
  en: 'Sign In'
},
'login.register': {
  pt: 'Registrar',
  en: 'Register'
},

// Login - Features
'login.features.regionalHealth': {
  pt: 'Rede de Saúde Regional',
  en: 'Regional Health Network'
},
'login.features.universityExchange': {
  pt: 'Intercâmbio Universitário',
  en: 'University Exchange'
},
'login.features.regionalMarketplace': {
  pt: 'Marketplace Regional',
  en: 'Regional Marketplace'
},
'login.features.innovationHub': {
  pt: 'Hub de Inovação',
  en: 'Innovation Hub'
},

// Login - Estatísticas
'login.stats.population': {
  pt: 'População',
  en: 'Population'
},
'login.stats.countries': {
  pt: 'Países',
  en: 'Countries'
},
'login.stats.sectors': {
  pt: 'Setores',
  en: 'Sectors'
},

// Login - Formulário
'login.form.email': {
  pt: 'E-mail',
  en: 'Email'
},
'login.form.emailPlaceholder': {
  pt: 'seu@email.com',
  en: 'your@email.com'
},
'login.form.adminTip': {
  pt: 'Use \'admin@exemplo.com\' para acesso de administrador',
  en: 'Use \'admin@example.com\' for administrator access'
},
'login.form.password': {
  pt: 'Senha',
  en: 'Password'
},
'login.form.passwordPlaceholder': {
  pt: 'Sua senha',
  en: 'Your password'
},
'login.form.optional': {
  pt: 'Opcional',
  en: 'Optional'
},
'login.form.selectCountry': {
  pt: 'Selecione seu país',
  en: 'Select your country'
},
'login.form.rememberMe': {
  pt: 'Lembrar-me',
  en: 'Remember me'
},

// Login - Botões
'login.buttons.signingIn': {
  pt: 'Entrando...',
  en: 'Signing in...'
},
'login.buttons.creatingAccount': {
  pt: 'Criando conta...',
  en: 'Creating account...'
},
'login.buttons.enterPlatform': {
  pt: 'Entrar na Plataforma',
  en: 'Enter Platform'
},
'login.buttons.createMyAccount': {
  pt: 'Criar Minha Conta',
  en: 'Create My Account'
},

// Login - Esqueceu senha
'login.forgotPassword.link': {
  pt: 'Esqueceu a senha?',
  en: 'Forgot password?'
},
'login.forgotPassword.emailSent': {
  pt: 'Link de recuperação será enviado para seu e-mail!',
  en: 'Recovery link will be sent to your email!'
},

// Login - Login social
'login.socialLogin.orContinueWith': {
  pt: 'ou continue com',
  en: 'or continue with'
},
'login.socialLogin.continueWithGoogle': {
  pt: 'Continuar com Google',
  en: 'Continue with Google'
},
'login.socialLogin.continueWithFacebook': {
  pt: 'Continuar com Facebook',
  en: 'Continue with Facebook'
},
'login.socialLogin.googleSoon': {
  pt: 'Login com Google será implementado em breve!',
  en: 'Google login will be implemented soon!'
},

// Login - Contas demo
'login.demoAccounts.title': {
  pt: 'Contas Demo',
  en: 'Demo Accounts'
},
'login.demoAccounts.admin': {
  pt: 'Admin',
  en: 'Admin'
},
'login.demoAccounts.user': {
  pt: 'Usuário',
  en: 'User'
},

// Login - Footer
'login.footer.agreement': {
  pt: 'Ao continuar, você concorda com nossos',
  en: 'By continuing, you agree to our'
},
'login.footer.termsOfUse': {
  pt: 'Termos de Uso',
  en: 'Terms of Use'
},
'login.footer.and': {
  pt: 'e',
  en: 'and'
},
'login.footer.privacyPolicy': {
  pt: 'Política de Privacidade',
  en: 'Privacy Policy'
},
'login.footer.developedBy': {
  pt: 'Desenvolvido por',
  en: 'Developed by'
},

// Login - Erros
'login.errors.fillAllFields': {
  pt: 'Por favor, preencha todos os campos obrigatórios.',
  en: 'Please fill in all required fields.'
},
'login.errors.selectCountry': {
  pt: 'Por favor, selecione seu país.',
  en: 'Please select your country.'
},
'login.errors.loginFailed': {
  pt: 'Erro ao fazer login. Tente novamente.',
  en: 'Login failed. Please try again.'
},

  // Tipos de Oportunidade
  'opportunityType.project': {
    pt: 'Projeto',
    en: 'Project'
  },
  'opportunityType.partnership': {
    pt: 'Parceria',
    en: 'Partnership'
  },
  'opportunityType.funding': {
    pt: 'Financiamento',
    en: 'Funding'
  },
  'opportunityType.education': {
    pt: 'Educação',
    en: 'Education'
  },

  // Formulários
  'form.search': {
    pt: 'Buscar',
    en: 'Search'
  },
  'form.searchPlaceholder': {
    pt: 'Nome, cliente ou descrição...',
    en: 'Name, client or description...'
  },
  'form.status': {
    pt: 'Status',
    en: 'Status'
  },
  'form.allStatuses': {
    pt: 'Todos os Status',
    en: 'All Statuses'
  },
  'form.country': {
    pt: 'País',
    en: 'Country'
  },
  'form.allCountries': {
    pt: 'Todos os Países',
    en: 'All Countries'
  },
  'form.sector': {
    pt: 'Setor',
    en: 'Sector'
  },
  'form.allSectors': {
    pt: 'Todos os Setores',
    en: 'All Sectors'
  },
  'form.priority': {
    pt: 'Prioridade',
    en: 'Priority'
  },
  'form.allPriorities': {
    pt: 'Todas as Prioridades',
    en: 'All Priorities'
  },
  'form.clearFilters': {
    pt: 'Limpar Filtros',
    en: 'Clear Filters'
  },

  // Página de Boas-vindas
  'welcome.title': {
    pt: "Bem-vindo ao Africa's Hands",
    en: "Welcome to Africa's Hands"
  },
  'welcome.subtitle': {
    pt: 'Conectando Angola 🇦🇴 Namíbia 🇳🇦 África do Sul 🇿🇦',
    en: 'Connecting Angola 🇦🇴 Namibia 🇳🇦 South Africa 🇿🇦'
  },
  'welcome.accessDashboard': {
    pt: 'Acessar Dashboard',
    en: 'Access Dashboard'
  },
  'welcome.viewServices': {
    pt: 'Ver Serviços',
    en: 'View Services'
  },

  // Página de Erro 404
  'error.notFound.title': {
    pt: 'Página não encontrada',
    en: 'Page not found'
  },
  'error.notFound.description': {
    pt: 'A página que você está procurando não existe ou foi movida.',
    en: 'The page you are looking for does not exist or has been moved.'
  },
  'error.notFound.backHome': {
    pt: 'Voltar ao Início',
    en: 'Back to Home'
  },

  // Botões e ações
  'btn.viewDetails': {
    pt: 'Ver Detalhes',
    en: 'View Details'
  },
  'btn.close': {
    pt: 'Fechar',
    en: 'Close'
  },
  'btn.save': {
    pt: 'Salvar',
    en: 'Save'
  },
  'btn.cancel': {
    pt: 'Cancelar',
    en: 'Cancel'
  },
  'btn.create': {
    pt: 'Criar',
    en: 'Create'
  },
  'btn.edit': {
    pt: 'Editar',
    en: 'Edit'
  },
  'btn.delete': {
    pt: 'Excluir',
    en: 'Delete'
  },
  'btn.editProject': {
    pt: 'Editar Projeto',
    en: 'Edit Project'
  },

  // Modal de criação de projeto
  'modal.createProject': {
    pt: 'Criar Novo Projeto',
    en: 'Create New Project'
  },
  'modal.projectName': {
    pt: 'Nome do Projeto',
    en: 'Project Name'
  },
  'modal.projectNamePlaceholder': {
    pt: 'Ex: Sistema de Telemedicina Regional',
    en: 'Ex: Regional Telemedicine System'
  },
  'modal.client': {
    pt: 'Cliente',
    en: 'Client'
  },
  'modal.clientPlaceholder': {
    pt: 'Ex: Hospital Central',
    en: 'Ex: Central Hospital'
  },
  'modal.selectCountry': {
    pt: 'Selecione o país',
    en: 'Select country'
  },
  'modal.selectSector': {
    pt: 'Selecione o setor',
    en: 'Select sector'
  },
  'modal.budget': {
    pt: 'Orçamento (USD)',
    en: 'Budget (USD)'
  },
  'modal.startDate': {
    pt: 'Data de Início',
    en: 'Start Date'
  },
  'modal.endDate': {
    pt: 'Data de Término',
    en: 'End Date'
  },
  'modal.description': {
    pt: 'Descrição',
    en: 'Description'
  },
  'modal.descriptionPlaceholder': {
    pt: 'Descreva os objetivos e escopo do projeto...',
    en: 'Describe the project objectives and scope...'
  },
  'modal.createProjectBtn': {
    pt: 'Criar Projeto',
    en: 'Create Project'
  },
  'modal.projectInfo': {
    pt: 'Informações do Projeto',
    en: 'Project Information'
  },
  'modal.financial': {
    pt: 'Financeiro',
    en: 'Financial'
  },
  'modal.projectDescription': {
    pt: 'Descrição do Projeto',
    en: 'Project Description'
  },
  'modal.projectTeam': {
    pt: 'Equipe do Projeto',
    en: 'Project Team'
  },
  'modal.timeline': {
    pt: 'Timeline',
    en: 'Timeline'
  },
  'modal.start': {
    pt: 'Início',
    en: 'Start'
  },
  'modal.end': {
    pt: 'Término',
    en: 'End'
  },

  // Campos de projeto
  'project.client': {
    pt: 'Cliente',
    en: 'Client'
  },
  'project.organization': {
    pt: 'Organização',
    en: 'Organization'
  },
  'project.deadline': {
    pt: 'Prazo',
    en: 'Deadline'
  },
  'project.budget': {
    pt: 'Orçamento',
    en: 'Budget'
  },
  'project.spent': {
    pt: 'Gasto',
    en: 'Spent'
  },
  'project.remaining': {
    pt: 'Restante',
    en: 'Remaining'
  },
  'project.requirements': {
    pt: 'Requisitos',
    en: 'Requirements'
  },

  // Campos obrigatórios
  'required': {
    pt: 'obrigatório',
    en: 'required'
  },

  // Mensagens
  'msg.noProjectsFound': {
    pt: 'Nenhum projeto encontrado',
    en: 'No projects found'
  },
  'msg.noProjectsFoundDesc': {
    pt: 'Não foram encontrados projetos com os filtros aplicados.',
    en: 'No projects were found with the applied filters.'
  },
  'msg.deleteConfirm': {
    pt: 'Tem certeza que deseja excluir este projeto?',
    en: 'Are you sure you want to delete this project?'
  },

  // Empresa
  'company.name': {
    pt: "Africa's Hands",
    en: "Africa's Hands"
  },
  'company.regional': {
    pt: 'Regional',
    en: 'Regional'
  },
  'company.description': {
    pt: 'Conectando Angola, Namíbia e África do Sul através da cooperação regional, inovação tecnológica e desenvolvimento sustentável.',
    en: 'Connecting Angola, Namibia and South Africa through regional cooperation, technological innovation and sustainable development.'
  },
  'company.version': {
    pt: 'v2.1.0 • © 2024 Africa\'s Hands',
    en: 'v2.1.0 • © 2024 Africa\'s Hands'
  },
  'company.developer': {
    pt: 'Desenvolvido por Valdimir Jacinto Esteves',
    en: 'Developed by Valdimir Jacinto Esteves'
  },
  'company.regionalCoverage': {
    pt: 'Cobertura regional SADC',
    en: 'SADC regional coverage'
  },
  'company.officesInCities': {
    pt: 'Escritórios em 6 cidades',
    en: 'Offices in 6 cities'
  },
  'company.activeProjects': {
    pt: 'projetos ativos',
    en: 'active projects'
  },

  // Analytics
  'analytics.title': {
    pt: 'Analytics & KPIs Regionais',
    en: 'Regional Analytics & KPIs'
  },
  'analytics.subtitle': {
    pt: 'Métricas detalhadas e insights da performance regional Africa\'s Hands',
    en: 'Detailed metrics and insights from Africa\'s Hands regional performance'
  }
};

// Context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'pt' | 'en'>(() => {
    // Recuperar idioma salvo ou usar português como padrão
    const savedLanguage = localStorage.getItem('africasHands_language');
    return (savedLanguage as 'pt' | 'en') || 'pt';
  });

  // Salvar idioma no localStorage
  useEffect(() => {
    localStorage.setItem('africasHands_language', language);
  }, [language]);

  // Função de tradução
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    let text = translation[language] || translation.pt || key;

    // Interpolação de parâmetros
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }

    return text;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook personalizado
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};

// Componente de Toggle de Idioma
export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
        title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      >
        <div className="flex items-center gap-1">
          <span className="text-sm">🌍</span>
          <span className="font-medium">
            {language === 'pt' ? 'PT' : 'EN'}
          </span>
        </div>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </button>
    </div>
  );
};

// Componente de seleção de idioma mais detalhado
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        <span>{currentLanguage?.flag}</span>
        <span className="font-medium">{currentLanguage?.name}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-full">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'pt' | 'en');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors text-sm ${
                language === lang.code ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-700'
              } ${lang.code === 'pt' ? 'rounded-t-lg' : 'rounded-b-lg'}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && (
                <svg className="w-4 h-4 ml-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationContext;