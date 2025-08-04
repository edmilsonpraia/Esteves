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
    
    // Header
    'header.about': 'Sobre',
    'header.resources': 'Recursos',
    'header.impact': 'Impacto',
    'header.contact': 'Contato',
    'header.accessPlatform': 'Acessar Plataforma',
    
    // Hero Section
    'hero.connecting': 'Conectando',
    'hero.and': 'e',
    'hero.description': 'Plataforma digital inovadora que promove cooperação regional, inovação tecnológica e desenvolvimento sustentável na África Austral.',
    'hero.avoidEmbarrassment': 'Evite constrangimentos!',
    'hero.lookingForServices': 'Procuras serviços de:',
    'hero.regionalOpportunities': 'Oportunidades regionais',
    'hero.everythingInOnePlace': 'Tudo organizado num único lugar!',
    'hero.inCountries': 'Em',
    'hero.nowYouCan': 'Agora já podes fazer isso de forma',
    'hero.easyFastSecure': 'fácil, rápida e segura',
    'hero.through': 'através do',
    'hero.registerFree': 'Cadastra-te gratuitamente e começa a explorar!',
    'hero.discoverBookEnjoy': 'Descobre, reserva e aproveita com confiança!',
    'hero.step1.title': 'Registo Gratuito',
    'hero.step1.description': 'Cria a tua conta em segundos',
    'hero.step2.title': 'Explora Serviços',
    'hero.step2.description': 'Encontra o que precisas nos 3 países',
    'hero.step3.title': 'Conecta e Aproveita',
    'hero.step3.description': 'Acede a oportunidades regionais',
    'hero.officeCredit': 'Escritório V.J. Esteves e Serviços',
    'hero.startNow': 'Começar Agora',
    'hero.learnMore': 'Saiba Mais',
    
    // About Section
    'about.title': 'Sobre o Africa\'s Hands',
    'about.description': 'Uma plataforma que facilita a colaboração entre Angola, Namíbia e África do Sul',
    
    // Features Section
    'features.title': 'Recursos da Plataforma',
    'features.description': 'Soluções integradas para cooperação regional efetiva',
    'features.healthNetwork.title': 'Rede de Saúde Regional',
    'features.healthNetwork.description': 'Cooperação em saúde entre os três países, compartilhamento de recursos e conhecimentos médicos.',
    'features.universityExchange.title': 'Intercâmbio Universitário',
    'features.universityExchange.description': 'Facilitação de intercâmbios educacionais e programas de cooperação acadêmica.',
    'features.regionalMarketplace.title': 'Marketplace Regional',
    'features.regionalMarketplace.description': 'Plataforma de comércio transfronteiriço para produtos e serviços regionais.',
    'features.innovationHub.title': 'Hub de Inovação',
    'features.innovationHub.description': 'Colaboração em projetos inovadores e desenvolvimento tecnológico conjunto.',
    
    // Impact Section
    'impact.title': 'Impacto Regional',
    'impact.description': 'Superando barreiras burocráticas e promovendo a integração efetiva entre Angola, Namíbia e África do Sul.',
    'impact.populationConnected': 'População conectada',
    
    // CTA Section
    'cta.title': 'Faça Parte da Transformação Regional',
    'cta.description': 'Junte-se à plataforma que está conectando a África Austral e criando oportunidades de cooperação sem precedentes.',
    'cta.registerNow': 'Registrar-se Agora',
    'cta.contact': 'Entrar em Contato',
    
    // Footer
    'footer.description': 'Conectando Angola, Namíbia e África do Sul através da cooperação regional e inovação tecnológica.',
    'footer.resources': 'Recursos',
    'footer.healthNetwork': 'Rede de Saúde',
    'footer.universityExchange': 'Intercâmbio Universitário',
    'footer.marketplace': 'Marketplace',
    'footer.innovationHub': 'Hub de Inovação',
    'footer.countries': 'Países',
    'footer.contact': 'Contato',
    'footer.allRightsReserved': 'Todos os direitos reservados.',
    'footer.developedBy': 'Desenvolvido por Valdimir Jacinto Esteves',
    
    // Login
    'login.welcomeBack': 'Bem-vindo de volta!',
    'login.createAccount': 'Criar Conta',
    'login.accessAccountDescription': 'Acesse sua conta para explorar oportunidades regionais',
    'login.joinNetworkDescription': 'Junte-se à nossa rede de cooperação trilateral',
    'login.signIn': 'Entrar',
    'login.register': 'Registrar',
    'login.slogan': 'AO • NA • ZA Regional',
    'login.countriesDescription': 'Conectando Angola, Namíbia e África do Sul',
    
    // Login Form - TRADUÇÕES COMPLETAS PARA O LOGIN
    'login.form.fullName': 'Nome Completo',
    'login.form.fullNamePlaceholder': 'Digite seu nome completo',
    'login.form.email': 'Email',
    'login.form.emailPlaceholder': 'Digite seu email',
    'login.form.emailTip': 'Use emails com "admin" para acesso administrativo',
    'login.form.password': 'Senha',
    'login.form.passwordPlaceholder': 'Digite sua senha',
    'login.form.passwordRequirement': 'Mínimo de 6 caracteres',
    'login.form.rememberMe': 'Lembrar-me',
    'login.form.selectCountry': 'Selecione seu país',
    'login.form.sector': 'Setor de Atuação',
    'login.form.selectSector': 'Selecione seu setor',
    'login.form.organization': 'Organização',
    'login.form.organizationPlaceholder': 'Nome da sua organização (opcional)',
    
    // Login Buttons - TRADUÇÕES COMPLETAS
    'login.buttons.signingIn': 'Entrando...',
    'login.buttons.creatingAccount': 'Criando conta...',
    'login.buttons.enterPlatform': 'Entrar na Plataforma',
    'login.buttons.createMyAccount': 'Criar Minha Conta',
    
    // Login Messages - TRADUÇÕES COMPLETAS
    'login.messages.loginSuccess': 'Login realizado com sucesso!',
    'login.messages.registerSuccess': 'Conta criada com sucesso! Verificar email para ativação.',
    'login.messages.recoveryEmailSent': 'Email de recuperação enviado para',
    
    // Login Errors - TRADUÇÕES COMPLETAS
    'login.errors.fillAllFields': 'Preencha todos os campos obrigatórios',
    'login.errors.invalidEmail': 'Email inválido',
    'login.errors.passwordTooShort': 'A senha deve ter pelo menos 6 caracteres',
    'login.errors.nameCountryRequired': 'Nome e país são obrigatórios para registro',
    'login.errors.selectCountry': 'Selecione um país',
    'login.errors.enterEmailFirst': 'Digite seu email primeiro',
    'login.errors.invalidCredentials': 'Email ou senha incorretos',
    'login.errors.emailNotConfirmed': 'Por favor, confirme seu email antes de fazer login',
    'login.errors.userAlreadyExists': 'Este email já está registrado',
    'login.errors.authenticationError': 'Erro na autenticação. Tente novamente.',
    
    // Login Sectors - TRADUÇÕES COMPLETAS PARA OS SETORES
    'login.sectors.executive': 'Gestão Executiva',
    'login.sectors.government': 'Governo',
    'login.sectors.ngos': 'ONGs',
    
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
    
    // Social Login - TRADUÇÕES COMPLETAS
    'login.socialLogin.orContinueWith': 'ou continue com',
    'login.socialLogin.continueWithGoogle': 'Continuar com Google',
    'login.socialLogin.continueWithFacebook': 'Continuar com Facebook',
    'login.socialLogin.googleSoon': 'Login com Google em breve!',
    
    // Forgot Password - TRADUÇÕES COMPLETAS
    'login.forgotPassword.link': 'Esqueci a senha',
    'login.forgotPassword.title': 'Recuperar Senha',
    'login.forgotPassword.description': 'Digite seu email para receber instruções de recuperação',
    'login.forgotPassword.send': 'Enviar',
    'login.forgotPassword.sending': 'Enviando...',
    'login.forgotPassword.success': 'Email de recuperação enviado com sucesso!',
    'login.forgotPassword.error': 'Erro ao enviar email de recuperação',
    
    // Demo Accounts
    'login.demoAccounts.title': 'Contas de Demonstração',
    'login.demoAccounts.admin': 'Administrador',
    'login.demoAccounts.user': 'Usuário',
    
    // Footer - TRADUÇÕES COMPLETAS
    'login.footer.agreement': 'Ao continuar, você concorda com nossos',
    'login.footer.termsOfUse': 'Termos de Uso',
    'login.footer.and': 'e',
    'login.footer.privacyPolicy': 'Política de Privacidade',
    'login.footer.developedBy': 'Desenvolvido por',
    
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
    'user.phoneAngola': '+244 924 166 401',
    'user.phoneNamibia': '+244 924 166 401',
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
    'cta.connectExperts': 'Conectar com Especialistas',

    // Admin Pages - Analytics
    'analytics.title': 'Analytics & KPIs Regionais',
    'analytics.subtitle': 'Análise de desempenho e indicadores regionais',
    'analytics.exportReport': 'Exportar Relatório',
    'analytics.totalRevenue': 'Receita Total',
    'analytics.totalProjects': 'Total de Projetos',
    'analytics.activeClients': 'Clientes Ativos',
    'analytics.completionRate': 'Taxa de Conclusão',
    'analytics.growth': 'crescimento',
    'analytics.decline': 'declínio',
    'analytics.analyticsByPeriod': 'Analytics por Período',
    'analytics.lastDays': 'Últimos 30 dias',
    'analytics.countryMetrics': 'Métricas por País',
    'analytics.projects': 'projetos',
    'analytics.revenue': 'receita',
    'analytics.sectorPerformance': 'Performance por Setor',
    'analytics.chartAnalysis': 'Análise de Gráficos',
    'analytics.monthlyGrowth': 'Crescimento Mensal',
    'analytics.comparison': 'Comparação',

    // Admin Pages - Finance
    'finance.title': 'Gestão Financeira Regional',
    'finance.subtitle': 'Controle financeiro dos projetos regionais',
    'finance.totalRevenue': 'Receita Total',
    'finance.totalExpenses': 'Despesas Totais',
    'finance.pendingInvoices': 'Faturas Pendentes',
    'finance.netProfit': 'Lucro Líquido',
    'finance.general': 'Geral',
    'finance.transactions': 'Transações',
    'finance.budget': 'Orçamento',
    'finance.invoices': 'Faturas',
    'finance.reports': 'Relatórios',
    'finance.trans': 'Trans.',
    'finance.orc': 'Orç.',
    'finance.fat': 'Fat.',
    'finance.rel': 'Rel.',
    'finance.addTransaction': 'Adicionar Transação',
    'finance.type': 'Tipo',
    'finance.amount': 'Valor',
    'finance.date': 'Data',
    'finance.category': 'Categoria',
    'finance.description': 'Descrição',
    'finance.actions': 'Ações',
    'finance.income': 'Receita',
    'finance.expense': 'Despesa',
    'finance.edit': 'Editar',
    'finance.delete': 'Excluir',
    'finance.createBudget': 'Criar Orçamento',
    'finance.budgetName': 'Nome do Orçamento',
    'finance.budgetAmount': 'Valor do Orçamento',
    'finance.period': 'Período',
    'finance.progress': 'Progresso',
    'finance.spent': 'Gasto',
    'finance.remaining': 'Restante',
     'finance.exchange': 'Câmbio',
     'finance.transfer': 'Transferência',
     'finance.project': 'Projeto',
     'finance.issueDate': 'Emissão',
     'finance.dueDate': 'Vencimento',
     'finance.viewPDF': 'Ver PDF',
     'finance.send': 'Enviar',
     'finance.markPaid': 'Marcar Pago',
     'finance.approve': 'Aprovar',
     'finance.invoiceManagement': 'Gestão de Faturas',
     'finance.newInvoice': 'Nova Fatura',
     'finance.budgetsByCategory': 'Orçamentos por Categoria',
     'finance.used': 'usado',
     'finance.allocated': 'Alocado',
     'finance.responsible': 'Responsável',
     'finance.viewDetails': 'Ver Detalhes',
     'finance.adjust': 'Ajustar',
     'finance.monthlyCashFlow': 'Fluxo de Caixa Mensal',
     'finance.vsPreviousMonth': 'vs mês anterior',
     'finance.profitMargin': 'margem',
     'finance.awaitingApproval': 'Aguardando aprovação',
     'finance.currentMonth': 'Mês Atual',
     'finance.currentQuarter': 'Trimestre Atual',
     'finance.currentYear': 'Ano Atual',
     'finance.paid': 'Pago',
     'finance.sent': 'Enviado',
     'finance.overdue': 'Vencido',
     'finance.draft': 'Rascunho',
     'finance.cancelled': 'Cancelado',

    // Admin Pages - Clients
    'clients.title': 'Gestão de Clientes',
    'clients.subtitle': 'Gerenciamento de clientes e parcerias regionais',
    'clients.totalClients': 'Total de Clientes',
    'clients.activeClients': 'Clientes Ativos',
    'clients.newThisMonth': 'Novos Este Mês',
    'clients.conversionRate': 'Taxa de Conversão',
    'clients.newClient': 'Novo Cliente',
    'clients.addClient': 'Adicionar Cliente',
    'clients.searchClients': 'Buscar clientes...',
    'clients.allClients': 'Todos Clientes',
    'clients.active': 'Ativos',
    'clients.inactive': 'Inativos',
    'clients.prospects': 'Prospects',
    'clients.view': 'Ver',
    'clients.name': 'Nome',
    'clients.company': 'Empresa',
    'clients.email': 'Email',
    'clients.phone': 'Telefone',
    'clients.city': 'Cidade',
    'clients.sector': 'Setor',
    'clients.contactInfo': 'Informações de Contato',
    'clients.businessInfo': 'Informações do Negócio',
    'clients.save': 'Salvar',
    'clients.cancel': 'Cancelar',
    'clients.noClients': 'Nenhum cliente encontrado',
    'clients.addFirst': 'Adicione seu primeiro cliente para começar',

    // Admin Pages - Team
    'team.title': 'Gestão de Equipe Regional',
    'team.subtitle': 'Gerenciamento da equipe trilateral',
    'team.totalTeam': 'Total da Equipe',
    'team.activeMembers': 'Membros Ativos',
    'team.departments': 'Departamentos',
    'team.avgSalary': 'Salário Médio',
    'team.addMember': 'Adicionar Membro',
    'team.overview': 'Visão Geral',
    'team.directory': 'Diretório',
    'team.performance': 'Performance',
    'team.reports': 'Relatórios',
    'team.dir': 'Dir.',
    'team.perf': 'Perf.',
    'team.rep': 'Rel.',
    'team.role': 'Cargo',
    'team.department': 'Departamento',
    'team.location': 'Localização',
    'team.joinDate': 'Data de Entrada',
    'team.salary': 'Salário',
    'team.contact': 'Contato',
    'team.projects': 'Projetos',
    'team.tasks': 'Tarefas',
    'team.efficiency': 'Eficiência',

    // Admin Pages - Projects
    'projects.title': 'Gestão de Projetos Regionais',
    'projects.subtitle': 'Gerenciamento de projetos trilaterais',
    'projects.totalProjects': 'Total de Projetos',
    'projects.inProgress': 'Em Andamento',
    'projects.completed': 'Concluídos',
    'projects.onHold': 'Suspensos',
    'projects.newProject': 'Novo Projeto',
    'projects.exportReport': 'Exportar Relatório',
    'projects.searchProjects': 'Buscar projetos...',
    'projects.allProjects': 'Todos Projetos',
    'projects.allCountries': 'Todos Países',
    'projects.allSectors': 'Todos Setores',
    'projects.allStatus': 'Todos Status',
    'projects.planning': 'Planejamento',
    'projects.execution': 'Execução',
    'projects.monitoring': 'Monitoramento',
    'projects.closure': 'Encerramento',
    'projects.plan': 'Plan.',
    'projects.exec': 'Exec.',
    'projects.mon': 'Mon.',
    'projects.close': 'Ench.',
    'projects.client': 'Cliente',
    'projects.leader': 'Líder',
    'projects.team': 'Equipe',
    'projects.deadline': 'Prazo',
    'projects.view': 'Ver',
    'projects.createProject': 'Criar Projeto',
    'projects.projectName': 'Nome do Projeto',
    'projects.projectDescription': 'Descrição do Projeto',
    'projects.startDate': 'Data de Início',
    'projects.endDate': 'Data de Fim',
    'projects.projectLeader': 'Líder do Projeto',
    'projects.projectTeam': 'Equipe do Projeto',
    'projects.projectBudget': 'Orçamento do Projeto',
    'projects.projectCountry': 'País do Projeto',
    'projects.projectSector': 'Setor do Projeto',
    'projects.projectPriority': 'Prioridade',
    'projects.high': 'Alta',
    'projects.medium': 'Média',
    'projects.low': 'Baixa',

    // Common Admin
    'admin.search': 'Buscar...',
    'admin.filter': 'Filtrar',
    'admin.export': 'Exportar',
    'admin.import': 'Importar',
    'admin.add': 'Adicionar',
    'admin.edit': 'Editar',
    'admin.delete': 'Excluir',
    'admin.save': 'Salvar',
    'admin.cancel': 'Cancelar',
    'admin.confirm': 'Confirmar',
    'admin.loading': 'Carregando...',
    'admin.noData': 'Nenhum dado encontrado',
    'admin.error': 'Erro ao carregar dados',
    'admin.success': 'Operação realizada com sucesso',
    'admin.actions': 'Ações',
    'admin.details': 'Detalhes',
    'admin.status': 'Status',
    'admin.priority': 'Prioridade',
    'admin.country': 'País',
    'admin.date': 'Data',
    'admin.total': 'Total',
    'admin.active': 'Ativo',
    'admin.inactive': 'Inativo',
    'admin.pending': 'Pendente'
  },
  en: {
    // Company
    'company.name': 'Africa\'s Hands',
    'company.description': 'Connecting Angola, Namibia and South Africa through regional cooperation, technological innovation and sustainable development',
    'company.developer': 'Valdimir Jacinto Esteves',
    'company.version': 'Version 2.1.0 • © 2024 Africa\'s Hands',
    
    // Header
    'header.about': 'About',
    'header.resources': 'Resources',
    'header.impact': 'Impact',
    'header.contact': 'Contact',
    'header.accessPlatform': 'Access Platform',
    
    // Hero Section
    'hero.connecting': 'Connecting',
    'hero.and': 'and',
    'hero.description': 'Innovative digital platform that promotes regional cooperation, technological innovation and sustainable development in Southern Africa.',
    'hero.avoidEmbarrassment': 'Avoid embarrassment!',
    'hero.lookingForServices': 'Looking for services in:',
    'hero.regionalOpportunities': 'Regional opportunities',
    'hero.everythingInOnePlace': 'Everything organized in one place!',
    'hero.inCountries': 'In',
    'hero.nowYouCan': 'Now you can do this in a',
    'hero.easyFastSecure': 'easy, fast and secure way',
    'hero.through': 'through',
    'hero.registerFree': 'Register for free and start exploring!',
    'hero.discoverBookEnjoy': 'Discover, book and enjoy with confidence!',
    'hero.step1.title': 'Free Registration',
    'hero.step1.description': 'Create your account in seconds',
    'hero.step2.title': 'Explore Services',
    'hero.step2.description': 'Find what you need in the 3 countries',
    'hero.step3.title': 'Connect and Enjoy',
    'hero.step3.description': 'Access regional opportunities',
    'hero.officeCredit': 'V.J. Esteves Office and Services',
    'hero.startNow': 'Start Now',
    'hero.learnMore': 'Learn More',
    
    // About Section
    'about.title': 'About Africa\'s Hands',
    'about.description': 'A platform that facilitates collaboration between Angola, Namibia and South Africa',
    
    // Features Section
    'features.title': 'Platform Resources',
    'features.description': 'Integrated solutions for effective regional cooperation',
    'features.healthNetwork.title': 'Regional Health Network',
    'features.healthNetwork.description': 'Health cooperation between the three countries, sharing medical resources and knowledge.',
    'features.universityExchange.title': 'University Exchange',
    'features.universityExchange.description': 'Facilitation of educational exchanges and academic cooperation programs.',
    'features.regionalMarketplace.title': 'Regional Marketplace',
    'features.regionalMarketplace.description': 'Cross-border trade platform for regional products and services.',
    'features.innovationHub.title': 'Innovation Hub',
    'features.innovationHub.description': 'Collaboration on innovative projects and joint technological development.',
    
    // Impact Section
    'impact.title': 'Regional Impact',
    'impact.description': 'Overcoming bureaucratic barriers and promoting effective integration between Angola, Namibia and South Africa.',
    'impact.populationConnected': 'Population connected',
    
    // CTA Section
    'cta.title': 'Be Part of the Regional Transformation',
    'cta.description': 'Join the platform that is connecting Southern Africa and creating unprecedented opportunities for cooperation.',
    'cta.registerNow': 'Register Now',
    'cta.contact': 'Get in Touch',
    
    // Footer
    'footer.description': 'Connecting Angola, Namibia and South Africa through regional cooperation and technological innovation.',
    'footer.resources': 'Resources',
    'footer.healthNetwork': 'Health Network',
    'footer.universityExchange': 'University Exchange',
    'footer.marketplace': 'Marketplace',
    'footer.innovationHub': 'Innovation Hub',
    'footer.countries': 'Countries',
    'footer.contact': 'Contact',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.developedBy': 'Developed by Valdimir Jacinto Esteves',
    
    // Login
    'login.welcomeBack': 'Welcome back!',
    'login.createAccount': 'Create Account',
    'login.accessAccountDescription': 'Access your account to explore regional opportunities',
    'login.joinNetworkDescription': 'Join our trilateral cooperation network',
    'login.signIn': 'Sign In',
    'login.register': 'Register',
    'login.slogan': 'AO • NA • ZA Regional',
    'login.countriesDescription': 'Connecting Angola, Namibia and South Africa',
    
    // Login Form - TRADUÇÕES COMPLETAS PARA O LOGIN EM INGLÊS
    'login.form.fullName': 'Full Name',
    'login.form.fullNamePlaceholder': 'Enter your full name',
    'login.form.email': 'Email',
    'login.form.emailPlaceholder': 'Enter your email',
    'login.form.emailTip': 'Use emails with "admin" for administrative access',
    'login.form.password': 'Password',
    'login.form.passwordPlaceholder': 'Enter your password',
    'login.form.passwordRequirement': 'Minimum 6 characters',
    'login.form.rememberMe': 'Remember me',
    'login.form.selectCountry': 'Select your country',
    'login.form.sector': 'Sector',
    'login.form.selectSector': 'Select your sector',
    'login.form.organization': 'Organization',
    'login.form.organizationPlaceholder': 'Your organization name (optional)',
    
    // Login Buttons - TRADUÇÕES COMPLETAS EM INGLÊS
    'login.buttons.signingIn': 'Signing in...',
    'login.buttons.creatingAccount': 'Creating account...',
    'login.buttons.enterPlatform': 'Enter Platform',
    'login.buttons.createMyAccount': 'Create My Account',
    
    // Login Messages - TRADUÇÕES COMPLETAS EM INGLÊS
    'login.messages.loginSuccess': 'Login successful!',
    'login.messages.registerSuccess': 'Account created successfully! Check email for activation.',
    'login.messages.recoveryEmailSent': 'Recovery email sent to',
    
    // Login Errors - TRADUÇÕES COMPLETAS EM INGLÊS
    'login.errors.fillAllFields': 'Fill all required fields',
    'login.errors.invalidEmail': 'Invalid email',
    'login.errors.passwordTooShort': 'Password must be at least 6 characters',
    'login.errors.nameCountryRequired': 'Name and country are required for registration',
    'login.errors.selectCountry': 'Select a country',
    'login.errors.enterEmailFirst': 'Enter your email first',
    'login.errors.invalidCredentials': 'Invalid email or password',
    'login.errors.emailNotConfirmed': 'Please confirm your email before logging in',
    'login.errors.userAlreadyExists': 'This email is already registered',
    'login.errors.authenticationError': 'Authentication error. Try again.',
    
    // Login Sectors - TRADUÇÕES COMPLETAS PARA OS SETORES EM INGLÊS
    'login.sectors.executive': 'Executive Management',
    'login.sectors.government': 'Government',
    'login.sectors.ngos': 'NGOs',
    
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
    
    // Social Login - TRADUÇÕES COMPLETAS EM INGLÊS
    'login.socialLogin.orContinueWith': 'or continue with',
    'login.socialLogin.continueWithGoogle': 'Continue with Google',
    'login.socialLogin.continueWithFacebook': 'Continue with Facebook',
    'login.socialLogin.googleSoon': 'Google login coming soon!',
    
    // Forgot Password - TRADUÇÕES COMPLETAS EM INGLÊS
    'login.forgotPassword.link': 'Forgot password',
    'login.forgotPassword.title': 'Reset Password',
    'login.forgotPassword.description': 'Enter your email to receive recovery instructions',
    'login.forgotPassword.send': 'Send',
    'login.forgotPassword.sending': 'Sending...',
    'login.forgotPassword.success': 'Recovery email sent successfully!',
    'login.forgotPassword.error': 'Error sending recovery email',
    
    // Demo Accounts
    'login.demoAccounts.title': 'Demo Accounts',
    'login.demoAccounts.admin': 'Administrator',
    'login.demoAccounts.user': 'User',
    
    // Footer - TRADUÇÕES COMPLETAS EM INGLÊS
    'login.footer.agreement': 'By continuing, you agree to our',
    'login.footer.termsOfUse': 'Terms of Use',
    'login.footer.and': 'and',
    'login.footer.privacyPolicy': 'Privacy Policy',
    'login.footer.developedBy': 'Developed by',
    
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
    'user.phoneAngola': '+244 924 166 401',
    'user.phoneNamibia': '+244 924 166 401',
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
    'cta.connectExperts': 'Connect with Experts',

    // Admin Pages - Analytics
    'analytics.title': 'Regional Analytics & KPIs',
    'analytics.subtitle': 'Regional performance analysis and indicators',
    'analytics.exportReport': 'Export Report',
    'analytics.totalRevenue': 'Total Revenue',
    'analytics.totalProjects': 'Total Projects',
    'analytics.activeClients': 'Active Clients',
    'analytics.completionRate': 'Completion Rate',
    'analytics.growth': 'growth',
    'analytics.decline': 'decline',
    'analytics.analyticsByPeriod': 'Analytics by Period',
    'analytics.lastDays': 'Last 30 days',
    'analytics.countryMetrics': 'Country Metrics',
    'analytics.projects': 'projects',
    'analytics.revenue': 'revenue',
    'analytics.sectorPerformance': 'Sector Performance',
    'analytics.chartAnalysis': 'Chart Analysis',
    'analytics.monthlyGrowth': 'Monthly Growth',
    'analytics.comparison': 'Comparison',

    // Admin Pages - Finance
    'finance.title': 'Regional Financial Management',
    'finance.subtitle': 'Financial control of regional projects',
    'finance.totalRevenue': 'Total Revenue',
    'finance.totalExpenses': 'Total Expenses',
    'finance.pendingInvoices': 'Pending Invoices',
    'finance.netProfit': 'Net Profit',
    'finance.general': 'General',
    'finance.transactions': 'Transactions',
    'finance.budget': 'Budget',
    'finance.invoices': 'Invoices',
    'finance.reports': 'Reports',
    'finance.trans': 'Trans.',
    'finance.orc': 'Budg.',
    'finance.fat': 'Inv.',
    'finance.rel': 'Rep.',
    'finance.addTransaction': 'Add Transaction',
    'finance.type': 'Type',
    'finance.amount': 'Amount',
    'finance.date': 'Date',
    'finance.category': 'Category',
    'finance.description': 'Description',
    'finance.actions': 'Actions',
    'finance.income': 'Income',
    'finance.expense': 'Expense',
    'finance.edit': 'Edit',
    'finance.delete': 'Delete',
    'finance.createBudget': 'Create Budget',
    'finance.budgetName': 'Budget Name',
    'finance.budgetAmount': 'Budget Amount',
    'finance.period': 'Period',
    'finance.progress': 'Progress',
    'finance.spent': 'Spent',
    'finance.remaining': 'Remaining',
    'finance.exchange': 'Exchange',
    'finance.transfer': 'Transfer',
    'finance.project': 'Project',
    'finance.issueDate': 'Issue',
    'finance.dueDate': 'Due',
    'finance.viewPDF': 'View PDF',
    'finance.send': 'Send',
    'finance.markPaid': 'Mark Paid',
    'finance.approve': 'Approve',
    'finance.invoiceManagement': 'Invoice Management',
    'finance.newInvoice': 'New Invoice',
    'finance.budgetsByCategory': 'Budgets by Category',
    'finance.used': 'used',
    'finance.allocated': 'Allocated',
    'finance.responsible': 'Responsible',
    'finance.viewDetails': 'View Details',
    'finance.adjust': 'Adjust',
    'finance.monthlyCashFlow': 'Monthly Cash Flow',
    'finance.vsPreviousMonth': 'vs previous month',
    'finance.profitMargin': 'margin',
    'finance.awaitingApproval': 'Awaiting approval',
    'finance.currentMonth': 'Current Month',
    'finance.currentQuarter': 'Current Quarter',
    'finance.currentYear': 'Current Year',
    'finance.paid': 'Paid',
    'finance.sent': 'Sent',
    'finance.overdue': 'Overdue',
    'finance.draft': 'Draft',
    'finance.cancelled': 'Cancelled',

    // Admin Pages - Clients
    'clients.title': 'Client Management',
    'clients.subtitle': 'Regional client and partnership management',
    'clients.totalClients': 'Total Clients',
    'clients.activeClients': 'Active Clients',
    'clients.newThisMonth': 'New This Month',
    'clients.conversionRate': 'Conversion Rate',
    'clients.newClient': 'New Client',
    'clients.addClient': 'Add Client',
    'clients.searchClients': 'Search clients...',
    'clients.allClients': 'All Clients',
    'clients.active': 'Active',
    'clients.inactive': 'Inactive',
    'clients.prospects': 'Prospects',
    'clients.view': 'View',
    'clients.name': 'Name',
    'clients.company': 'Company',
    'clients.email': 'Email',
    'clients.phone': 'Phone',
    'clients.city': 'City',
    'clients.sector': 'Sector',
    'clients.contactInfo': 'Contact Information',
    'clients.businessInfo': 'Business Information',
    'clients.save': 'Save',
    'clients.cancel': 'Cancel',
    'clients.noClients': 'No clients found',
    'clients.addFirst': 'Add your first client to get started',

    // Admin Pages - Team
    'team.title': 'Regional Team Management',
    'team.subtitle': 'Trilateral team management',
    'team.totalTeam': 'Total Team',
    'team.activeMembers': 'Active Members',
    'team.departments': 'Departments',
    'team.avgSalary': 'Average Salary',
    'team.addMember': 'Add Member',
    'team.overview': 'Overview',
    'team.directory': 'Directory',
    'team.performance': 'Performance',
    'team.reports': 'Reports',
    'team.dir': 'Dir.',
    'team.perf': 'Perf.',
    'team.rep': 'Rep.',
    'team.role': 'Role',
    'team.department': 'Department',
    'team.location': 'Location',
    'team.joinDate': 'Join Date',
    'team.salary': 'Salary',
    'team.contact': 'Contact',
    'team.projects': 'Projects',
    'team.tasks': 'Tasks',
    'team.efficiency': 'Efficiency',

    // Admin Pages - Projects
    'projects.title': 'Regional Project Management',
    'projects.subtitle': 'Trilateral project management',
    'projects.totalProjects': 'Total Projects',
    'projects.inProgress': 'In Progress',
    'projects.completed': 'Completed',
    'projects.onHold': 'On Hold',
    'projects.newProject': 'New Project',
    'projects.exportReport': 'Export Report',
    'projects.searchProjects': 'Search projects...',
    'projects.allProjects': 'All Projects',
    'projects.allCountries': 'All Countries',
    'projects.allSectors': 'All Sectors',
    'projects.allStatus': 'All Status',
    'projects.planning': 'Planning',
    'projects.execution': 'Execution',
    'projects.monitoring': 'Monitoring',
    'projects.closure': 'Closure',
    'projects.plan': 'Plan.',
    'projects.exec': 'Exec.',
    'projects.mon': 'Mon.',
    'projects.close': 'Close.',
    'projects.client': 'Client',
    'projects.leader': 'Leader',
    'projects.team': 'Team',
    'projects.deadline': 'Deadline',
    'projects.view': 'View',
    'projects.createProject': 'Create Project',
    'projects.projectName': 'Project Name',
    'projects.projectDescription': 'Project Description',
    'projects.startDate': 'Start Date',
    'projects.endDate': 'End Date',
    'projects.projectLeader': 'Project Leader',
    'projects.projectTeam': 'Project Team',
    'projects.projectBudget': 'Project Budget',
    'projects.projectCountry': 'Project Country',
    'projects.projectSector': 'Project Sector',
    'projects.projectPriority': 'Priority',
    'projects.high': 'High',
    'projects.medium': 'Medium',
    'projects.low': 'Low',

    // Common Admin
    'admin.search': 'Search...',
    'admin.filter': 'Filter',
    'admin.export': 'Export',
    'admin.import': 'Import',
    'admin.add': 'Add',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.save': 'Save',
    'admin.cancel': 'Cancel',
    'admin.confirm': 'Confirm',
    'admin.loading': 'Loading...',
    'admin.noData': 'No data found',
    'admin.error': 'Error loading data',
    'admin.success': 'Operation completed successfully',
    'admin.actions': 'Actions',
    'admin.details': 'Details',
    'admin.status': 'Status',
    'admin.priority': 'Priority',
    'admin.country': 'Country',
    'admin.date': 'Date',
    'admin.total': 'Total',
    'admin.active': 'Active',
    'admin.inactive': 'Inactive',
    'admin.pending': 'Pending'
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