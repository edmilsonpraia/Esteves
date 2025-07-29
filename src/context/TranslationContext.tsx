import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

// Define translation keys as a type for better type safety
type TranslationKeys = {
  [key: string]: string;
};

type Translations = {
  pt: TranslationKeys;
  en: TranslationKeys;
};

// Complete translations object
const translations: Translations = {
  pt: {
    // Company
    'company.name': 'Africa\'s Hands',
    'company.description': 'Conectando Angola, Namíbia e África do Sul através da cooperação regional, inovação tecnológica e desenvolvimento sustentável',
    'company.developer': 'Valdimir Jacinto Esteves',
    'company.version': 'Versão 2.1.0 • © 2024 Africa\'s Hands',
    
    // Login
    'login.welcomeBack': 'Bem-vindo de volta!',
    'login.createAccount': 'Criar Conta',
    'login.accessAccountDescription': 'Acesse sua conta para explorar oportunidades regionais',
    'login.joinNetworkDescription': 'Junte-se à nossa rede de cooperação trilateral',
    'login.signIn': 'Entrar',
    'login.register': 'Registrar',
    'login.slogan': 'AO • NA • ZA Regional',
    'login.countriesDescription': 'Conectando Angola, Namíbia e África do Sul',
    
    // Form
    'login.form.email': 'Email',
    'login.form.emailPlaceholder': 'seu@email.com',
    'login.form.password': 'Senha',
    'login.form.passwordPlaceholder': 'Sua senha',
    'login.form.rememberMe': 'Lembrar-me',
    'login.form.adminTip': 'Use admin@africashands.com para acesso administrativo',
    'login.form.selectCountry': 'Selecione seu país',
    
    // Buttons
    'login.buttons.signingIn': 'Entrando...',
    'login.buttons.creatingAccount': 'Criando conta...',
    'login.buttons.enterPlatform': 'Entrar na Plataforma',
    'login.buttons.createMyAccount': 'Criar Minha Conta',
    
    // Countries
    'country.angola': 'Angola',
    'country.namibia': 'Namíbia',
    'country.southAfrica': 'África do Sul',
    'login.otherSadcCountry': 'Outro país SADC',
    
    // Features
    'login.features.regionalHealth': 'Rede de Saúde Regional',
    'login.features.universityExchange': 'Intercâmbio Universitário',
    'login.features.regionalMarketplace': 'Marketplace Regional',
    'login.features.innovationHub': 'Hub de Inovação',
    
    // Stats
    'login.stats.population': 'População',
    'login.stats.countries': 'Países',
    'login.stats.sectors': 'Setores',
    
    // Social Login
    'login.socialLogin.orContinueWith': 'ou continue com',
    'login.socialLogin.continueWithGoogle': 'Continuar com Google',
    'login.socialLogin.continueWithFacebook': 'Continuar com Facebook',
    'login.socialLogin.googleSoon': 'Login com Google em breve!',
    
    // Demo Accounts
    'login.demoAccounts.title': 'Contas de Demonstração',
    'login.demoAccounts.admin': 'Administrador',
    'login.demoAccounts.user': 'Usuário',
    
    // Footer
    'login.footer.agreement': 'Ao continuar, você concorda com nossos',
    'login.footer.termsOfUse': 'Termos de Uso',
    'login.footer.and': 'e',
    'login.footer.privacyPolicy': 'Política de Privacidade',
    'login.footer.developedBy': 'Desenvolvido por',
    
    // Errors
    'login.errors.fillAllFields': 'Preencha todos os campos',
    'login.errors.selectCountry': 'Selecione um país',
    
    // Forgot Password
    'login.forgotPassword.link': 'Esqueci a senha',
    
    // Dashboard
    'dashboard.title': 'Painel Administrativo Regional',
    'dashboard.subtitle': 'Gerenciamento integrado de projetos Angola • Namíbia • África do Sul',
    'dashboard.newRegionalProject': 'Novo Projeto Regional',
    'dashboard.regionalReport': 'Relatório Regional',
    'dashboard.quickActions': 'Ações Rápidas',
    'dashboard.quickActionsDesc': 'Acesso direto às principais funcionalidades',
    'dashboard.projectsByCountry': 'Projetos por País',
    'dashboard.viewAll': 'Ver Tudo',
    'dashboard.recentProjects': 'Projetos Recentes',
    'dashboard.recentActivities': 'Atividades Recentes',
    'dashboard.systemStatus': 'Status do Sistema',
    'dashboard.operational': 'Operacional',
    'dashboard.ourOffices': 'Nossos Escritórios',
    
    // Quick Actions
    'quickAction.createProject': 'Criar Projeto',
    'quickAction.newRegionalProject': 'Novo projeto regional',
    'quickAction.manageClients': 'Gerenciar Clientes',
    'quickAction.clientsPartners': 'Clientes e parceiros',
    'quickAction.viewAnalytics': 'Ver Analytics',
    'quickAction.kpisMetrics': 'KPIs e métricas',
    'quickAction.teamManagement': 'Gestão de Equipe',
    'quickAction.regionalTeam': 'Equipe regional',
    'quickAction.finance': 'Financeiro',
    'quickAction.financialManagement': 'Gestão financeira',
    'quickAction.allProjects': 'Todos Projetos',
    'quickAction.completeManagement': 'Gestão completa',
    
    // Form fields
    'form.country': 'País',
    'form.status': 'Status',
    'form.priority': 'Prioridade',
    
    // Project fields
    'project.client': 'Cliente',
    'project.budget': 'Orçamento',
    'project.spent': 'Gasto',
    'project.remaining': 'Restante',
    
    // Stats
    'stats.regionalProjects': 'Projetos Regionais',
    'stats.inProgress': 'Em Andamento',
    'stats.completed': 'Concluídos',
    'stats.clients': 'Clientes',
    'stats.team': 'Equipe',
    'stats.investment': 'Investimento',
    'stats.trilateralCooperation': 'Cooperação Trilateral',
    'stats.progress': 'Progresso',
    'stats.successRate': 'Taxa de sucesso',
    'stats.countriesServed': 'Países atendidos',
    'stats.activeProfessionals': 'Profissionais ativos',
    'stats.executed': '% executado',
    'stats.invested': 'investido',
    
    // Navigation
    'navigation.navigatingTo': 'Navegando para',
    'navigation.navigatingToCreateProject': 'Navegando para criação de projeto',
    'navigation.navigatingToAllProjects': 'Navegando para todos os projetos',
    
    // Buttons
    'btn.close': 'Fechar',
    'btn.editProject': 'Editar Projeto',
    
    // Modal
    'modal.projectInfo': 'Informações do Projeto',
    'modal.financial': 'Financeiro',
    'modal.start': 'Início',
    'modal.end': 'Fim',
    'modal.projectDescription': 'Descrição do Projeto',
    'modal.projectTeam': 'Equipe do Projeto',
    
    // Offices
    'offices.angola': 'Luanda, Angola',
    'offices.namibia': 'Windhoek, Namíbia',
    'offices.southAfrica': 'Cidade do Cabo, África do Sul',
    
    // User
    'user.contact': 'Contato',
    'user.phoneAngola': '+244 924 123 456',
    'user.phoneNamibia': '+264 81 234 567',
    'user.welcome': 'Bem-vindo',
    'user.defaultName': 'Usuário',
    'user.communityMember': 'Membro da Comunidade',
    'user.adminNotice': 'Você tem acesso administrativo',
    'user.goToAdmin': 'Ir para Admin',
    'user.loading': 'Carregando...',
    'user.exploreOpportunities': 'Explorar Oportunidades',
    
    // System
    'system.servers': 'Servidores',
    'system.api': 'API',
    'system.backup': 'Backup',
    'system.online': 'Online',
    'system.functioning': 'Funcionando',
    'system.lastToday': 'Último hoje',
    
    // Activities
    'activities.projectCompleted': 'Projeto Concluído',
    'activities.universityExchangeCompleted': 'Intercâmbio Universitário concluído',
    'activities.newClient': 'Novo Cliente',
    'activities.hiltonWindhoekAdded': 'Hilton Windhoek adicionado',
    'activities.newTeamMember': 'Novo Membro',
    'activities.antonioSilvaJoined': 'António Silva juntou-se à equipe',
    'activities.budgetUpdated': 'Orçamento Atualizado',
    'activities.telemedicineBudgetAdjusted': 'Orçamento de telemedicina ajustado',
    'activities.reportGenerated': 'Relatório Gerado',
    'activities.q2ReportAvailable': 'Relatório Q2 disponível',
    'activities.system': 'Sistema',
    'activities.regional': 'Regional',
    'activities.time.twoHoursAgo': 'Há 2 horas',
    'activities.time.oneDayAgo': 'Há 1 dia',
    'activities.time.twoDaysAgo': 'Há 2 dias',
    'activities.time.threeDaysAgo': 'Há 3 dias',
    'activities.time.fiveDaysAgo': 'Há 5 dias',
    
    // Sectors
    'sector.health': 'Saúde',
    'sector.education': 'Educação',
    'sector.tourism': 'Turismo',
    'sector.commerce': 'Comércio',
    'sector.transport': 'Transporte',
    'sector.technology': 'Tecnologia',

    // Tabs
    'tabs.opportunities': 'Oportunidades',
    'tabs.applications': 'Candidaturas',
    'tabs.network': 'Rede',
    'tabs.resources': 'Recursos',

    // Opportunities
    'opportunities.title': 'Oportunidades Regionais',
    'opportunities.allCountries': 'Todos países',
    'opportunities.allSectors': 'Todos setores',
    'opportunities.noResults': 'Nenhuma oportunidade encontrada',
    'opportunities.clearFilters': 'Limpar filtros',
    'opportunities.apply': 'Candidatar',
    'opportunities.applied': 'Candidatado',
    'opportunities.save': 'Salvo',
    'opportunities.applySuccess': 'Candidatura enviada com sucesso!',

    // Applications
    'applications.title': 'Minhas Candidaturas',
    'applications.noApplications': 'Você ainda não se candidatou a nenhuma oportunidade',
    'applications.exploreOpportunities': 'Explorar Oportunidades',
    'applications.status.pending': 'Pendente',
    'applications.status.approved': 'Aprovado',
    'applications.status.rejected': 'Rejeitado',

    // Network
    'network.title': 'Minha Rede',
    'network.myConnections': 'Minhas Conexões',
    'network.noConnections': 'Você ainda não tem conexões',
    'network.searchProfessionals': 'Buscar Profissionais',
    'network.viewAll': 'Ver Todos',
    'network.addConnection': 'Adicionar Conexão',

    // Resources
    'resources.title': 'Recursos Úteis',
    'resources.sadcGuide': 'Guia SADC',
    'resources.sadcGuideDesc': 'Manual completo sobre cooperação regional',
    'resources.downloadPdf': 'Baixar PDF',
    'resources.onlineCourses': 'Cursos Online',
    'resources.onlineCoursesDesc': 'Capacitação profissional regional',
    'resources.viewCourses': 'Ver Cursos',
    'resources.proposalTemplates': 'Modelos de Proposta',
    'resources.proposalTemplatesDesc': 'Documentos prontos para projetos',
    'resources.download': 'Baixar',
    'resources.webinars': 'Webinars',
    'resources.watch': 'Assistir',

    // Services
    'services.title': 'Serviços Regionais',
    'services.subtitle': 'Acesso a serviços em Angola, Namíbia e África do Sul',
    'services.portal': 'Portal de Serviços Integrados',
    'services.request': 'Solicitar',
    'services.requestForm': 'Formulário de Solicitação',
    'services.serviceRequested': 'Serviço solicitado',
    'services.fullName': 'Nome completo',
    'services.phone': 'Telefone',
    'services.details': 'Detalhes da solicitação',
    'services.detailsPlaceholder': 'Descreva sua necessidade com detalhes...',
    'services.cancel': 'Cancelar',
    'services.sending': 'Enviando...',
    'services.send': 'Enviar',
    'services.success': 'Solicitação enviada com sucesso!',
    'services.universities': 'Universidades',
    'services.hospitals': 'Hospitais',
    'services.transport': 'Transporte',
    'services.hotels': 'Hotéis',
    'services.consulting': 'Consultoria',
    'services.guides': 'Guias Locais',

    // Common
    'common.error': 'Ocorreu um erro',
    'common.close': 'Fechar',
    'common.processing': 'Processando...',

    // Project Types
    'project.type.project': 'Projeto',
    'project.type.partnership': 'Parceria',
    'project.type.funding': 'Financiamento',
    'project.type.education': 'Educação',

    // CTA
    'cta.expandNetwork': 'Expanda sua rede regional',
    'cta.expandNetworkDesc': 'Conecte-se com profissionais em Angola, Namíbia e África do Sul',
    'cta.exploreMore': 'Explorar Mais Oportunidades',
    'cta.connectExperts': 'Conectar com Especialistas'
  },
  en: {
    // Company
    'company.name': 'Africa\'s Hands',
    'company.description': 'Connecting Angola, Namibia and South Africa through regional cooperation, technological innovation and sustainable development',
    'company.developer': 'Valdimir Jacinto Esteves',
    'company.version': 'Version 2.1.0 • © 2024 Africa\'s Hands',
    
    // Login
    'login.welcomeBack': 'Welcome back!',
    'login.createAccount': 'Create Account',
    'login.accessAccountDescription': 'Access your account to explore regional opportunities',
    'login.joinNetworkDescription': 'Join our trilateral cooperation network',
    'login.signIn': 'Sign In',
    'login.register': 'Register',
    'login.slogan': 'AO • NA • ZA Regional',
    'login.countriesDescription': 'Connecting Angola, Namibia and South Africa',
    
    // Form
    'login.form.email': 'Email',
    'login.form.emailPlaceholder': 'your@email.com',
    'login.form.password': 'Password',
    'login.form.passwordPlaceholder': 'Your password',
    'login.form.rememberMe': 'Remember me',
    'login.form.adminTip': 'Use admin@africashands.com for administrative access',
    'login.form.selectCountry': 'Select your country',
    
    // Buttons
    'login.buttons.signingIn': 'Signing in...',
    'login.buttons.creatingAccount': 'Creating account...',
    'login.buttons.enterPlatform': 'Enter Platform',
    'login.buttons.createMyAccount': 'Create My Account',
    
    // Countries
    'country.angola': 'Angola',
    'country.namibia': 'Namibia',
    'country.southAfrica': 'South Africa',
    'login.otherSadcCountry': 'Other SADC country',
    
    // Features
    'login.features.regionalHealth': 'Regional Health Network',
    'login.features.universityExchange': 'University Exchange',
    'login.features.regionalMarketplace': 'Regional Marketplace',
    'login.features.innovationHub': 'Innovation Hub',
    
    // Stats
    'login.stats.population': 'Population',
    'login.stats.countries': 'Countries',
    'login.stats.sectors': 'Sectors',
    
    // Social Login
    'login.socialLogin.orContinueWith': 'or continue with',
    'login.socialLogin.continueWithGoogle': 'Continue with Google',
    'login.socialLogin.continueWithFacebook': 'Continue with Facebook',
    'login.socialLogin.googleSoon': 'Google login coming soon!',
    
    // Demo Accounts
    'login.demoAccounts.title': 'Demo Accounts',
    'login.demoAccounts.admin': 'Administrator',
    'login.demoAccounts.user': 'User',
    
    // Footer
    'login.footer.agreement': 'By continuing, you agree to our',
    'login.footer.termsOfUse': 'Terms of Use',
    'login.footer.and': 'and',
    'login.footer.privacyPolicy': 'Privacy Policy',
    'login.footer.developedBy': 'Developed by',
    
    // Errors
    'login.errors.fillAllFields': 'Fill all fields',
    'login.errors.selectCountry': 'Select a country',
    
    // Forgot Password
    'login.forgotPassword.link': 'Forgot password',
    
    // Dashboard
    'dashboard.title': 'Regional Administrative Panel',
    'dashboard.subtitle': 'Integrated project management Angola • Namibia • South Africa',
    'dashboard.newRegionalProject': 'New Regional Project',
    'dashboard.regionalReport': 'Regional Report',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.quickActionsDesc': 'Direct access to main features',
    'dashboard.projectsByCountry': 'Projects by Country',
    'dashboard.viewAll': 'View All',
    'dashboard.recentProjects': 'Recent Projects',
    'dashboard.recentActivities': 'Recent Activities',
    'dashboard.systemStatus': 'System Status',
    'dashboard.operational': 'Operational',
    'dashboard.ourOffices': 'Our Offices',
    
    // Quick Actions
    'quickAction.createProject': 'Create Project',
    'quickAction.newRegionalProject': 'New regional project',
    'quickAction.manageClients': 'Manage Clients',
    'quickAction.clientsPartners': 'Clients and partners',
    'quickAction.viewAnalytics': 'View Analytics',
    'quickAction.kpisMetrics': 'KPIs and metrics',
    'quickAction.teamManagement': 'Team Management',
    'quickAction.regionalTeam': 'Regional team',
    'quickAction.finance': 'Finance',
    'quickAction.financialManagement': 'Financial management',
    'quickAction.allProjects': 'All Projects',
    'quickAction.completeManagement': 'Complete management',
    
    // Form fields
    'form.country': 'Country',
    'form.status': 'Status',
    'form.priority': 'Priority',
    
    // Project fields
    'project.client': 'Client',
    'project.budget': 'Budget',
    'project.spent': 'Spent',
    'project.remaining': 'Remaining',
    
    // Stats
    'stats.regionalProjects': 'Regional Projects',
    'stats.inProgress': 'In Progress',
    'stats.completed': 'Completed',
    'stats.clients': 'Clients',
    'stats.team': 'Team',
    'stats.investment': 'Investment',
    'stats.trilateralCooperation': 'Trilateral Cooperation',
    'stats.progress': 'Progress',
    'stats.successRate': 'Success Rate',
    'stats.countriesServed': 'Countries Served',
    'stats.activeProfessionals': 'Active Professionals',
    'stats.executed': '% executed',
    'stats.invested': 'invested',
    
    // Navigation
    'navigation.navigatingTo': 'Navigating to',
    'navigation.navigatingToCreateProject': 'Navigating to project creation',
    'navigation.navigatingToAllProjects': 'Navigating to all projects',
    
    // Buttons
    'btn.close': 'Close',
    'btn.editProject': 'Edit Project',
    
    // Modal
    'modal.projectInfo': 'Project Information',
    'modal.financial': 'Financial',
    'modal.start': 'Start',
    'modal.end': 'End',
    'modal.projectDescription': 'Project Description',
    'modal.projectTeam': 'Project Team',
    
    // Offices
    'offices.angola': 'Luanda, Angola',
    'offices.namibia': 'Windhoek, Namibia',
    'offices.southAfrica': 'Cape Town, South Africa',
    
    // User
    'user.contact': 'Contact',
    'user.phoneAngola': '+244 924 123 456',
    'user.phoneNamibia': '+264 81 234 567',
    'user.welcome': 'Welcome',
    'user.defaultName': 'User',
    'user.communityMember': 'Community Member',
    'user.adminNotice': 'You have administrative access',
    'user.goToAdmin': 'Go to Admin',
    'user.loading': 'Loading...',
    'user.exploreOpportunities': 'Explore Opportunities',
    
    // System
    'system.servers': 'Servers',
    'system.api': 'API',
    'system.backup': 'Backup',
    'system.online': 'Online',
    'system.functioning': 'Functioning',
    'system.lastToday': 'Last today',
    
    // Activities
    'activities.projectCompleted': 'Project Completed',
    'activities.universityExchangeCompleted': 'University Exchange completed',
    'activities.newClient': 'New Client',
    'activities.hiltonWindhoekAdded': 'Hilton Windhoek added',
    'activities.newTeamMember': 'New Member',
    'activities.antonioSilvaJoined': 'António Silva joined the team',
    'activities.budgetUpdated': 'Budget Updated',
    'activities.telemedicineBudgetAdjusted': 'Telemedicine budget adjusted',
    'activities.reportGenerated': 'Report Generated',
    'activities.q2ReportAvailable': 'Q2 report available',
    'activities.system': 'System',
    'activities.regional': 'Regional',
    'activities.time.twoHoursAgo': '2 hours ago',
    'activities.time.oneDayAgo': '1 day ago',
    'activities.time.twoDaysAgo': '2 days ago',
    'activities.time.threeDaysAgo': '3 days ago',
    'activities.time.fiveDaysAgo': '5 days ago',
    
    // Sectors
    'sector.health': 'Health',
    'sector.education': 'Education',
    'sector.tourism': 'Tourism',
    'sector.commerce': 'Commerce',
    'sector.transport': 'Transport',
    'sector.technology': 'Technology',

    // Tabs
    'tabs.opportunities': 'Opportunities',
    'tabs.applications': 'Applications',
    'tabs.network': 'Network',
    'tabs.resources': 'Resources',

    // Opportunities
    'opportunities.title': 'Regional Opportunities',
    'opportunities.allCountries': 'All countries',
    'opportunities.allSectors': 'All sectors',
    'opportunities.noResults': 'No opportunities found',
    'opportunities.clearFilters': 'Clear filters',
    'opportunities.apply': 'Apply',
    'opportunities.applied': 'Applied',
    'opportunities.save': 'Saved',
    'opportunities.applySuccess': 'Application submitted successfully!',
    
    // Applications
    'applications.title': 'My Applications',
    'applications.noApplications': 'You haven\'t applied to any opportunities yet',
    'applications.exploreOpportunities': 'Explore Opportunities',
    'applications.status.pending': 'Pending',
    'applications.status.approved': 'Approved',
    'applications.status.rejected': 'Rejected',
    
    // Network
    'network.title': 'My Network',
    'network.myConnections': 'My Connections',
    'network.noConnections': 'You don\'t have any connections yet',
    'network.searchProfessionals': 'Search Professionals',
    'network.viewAll': 'View All',
    'network.addConnection': 'Add Connection',
    
    // Resources
    'resources.title': 'Useful Resources',
    'resources.sadcGuide': 'SADC Guide',
    'resources.sadcGuideDesc': 'Complete manual on regional cooperation',
    'resources.downloadPdf': 'Download PDF',
    'resources.onlineCourses': 'Online Courses',
    'resources.onlineCoursesDesc': 'Regional professional training',
    'resources.viewCourses': 'View Courses',
    'resources.proposalTemplates': 'Proposal Templates',
    'resources.proposalTemplatesDesc': 'Ready-to-use project documents',
    'resources.download': 'Download',
    'resources.webinars': 'Webinars',
    'resources.watch': 'Watch',
    
    // Services
    'services.title': 'Regional Services',
    'services.subtitle': 'Access to services in Angola, Namibia and South Africa',
    'services.portal': 'Integrated Services Portal',
    'services.request': 'Request',
    'services.requestForm': 'Request Form',
    'services.serviceRequested': 'Requested service',
    'services.fullName': 'Full name',
    'services.phone': 'Phone',
    'services.details': 'Request details',
    'services.detailsPlaceholder': 'Describe your needs in detail...',
    'services.cancel': 'Cancel',
    'services.sending': 'Sending...',
    'services.send': 'Send',
    'services.success': 'Request sent successfully!',
    'services.universities': 'Universities',
    'services.hospitals': 'Hospitals',
    'services.transport': 'Transport',
    'services.hotels': 'Hotels',
    'services.consulting': 'Consulting',
    'services.guides': 'Local Guides',
    
    // Common
    'common.error': 'An error occurred',
    'common.close': 'Close',
    'common.processing': 'Processing...',
    
    // Project Types
    'project.type.project': 'Project',
    'project.type.partnership': 'Partnership',
    'project.type.funding': 'Funding',
    'project.type.education': 'Education',
    
    // CTA
    'cta.expandNetwork': 'Expand your regional network',
    'cta.expandNetworkDesc': 'Connect with professionals in Angola, Namibia and South Africa',
    'cta.exploreMore': 'Explore More Opportunities',
    'cta.connectExperts': 'Connect with Experts'
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    // Check if key exists in current language
    if (translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to Portuguese if available
    if (language !== 'pt' && translations.pt[key]) {
      return translations.pt[key];
    }
    
    // Return the key itself if no translation found
    return key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-white bg-opacity-20 rounded-lg p-1 border border-white border-opacity-30 shadow-sm">
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'pt' 
            ? 'bg-white text-red-600 shadow-md' 
            : 'text-white hover:bg-white hover:bg-opacity-30 hover:text-red-50'
        }`}
      >
        PT
      </button>
      <div className="h-5 w-px bg-white bg-opacity-40"></div>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'en' 
            ? 'bg-white text-red-600 shadow-md' 
            : 'text-white hover:bg-white hover:bg-opacity-30 hover:text-red-50'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default TranslationContext;