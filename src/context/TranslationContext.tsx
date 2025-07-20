import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

// Traduções básicas
const translations = {
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
    'sector.technology': 'Tecnologia'
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
    
    // Countries
    'country.angola': 'Angola',
    'country.namibia': 'Namibia',
    'country.southAfrica': 'South Africa',
    'login.otherSadcCountry': 'Other SADC country',
    
    // Dashboard
    'dashboard.title': 'Regional Administrative Panel',
    'dashboard.subtitle': 'Integrated project management Angola • Namibia • South Africa'
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || key;
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
    <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg p-1">
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === 'pt' 
            ? 'bg-white text-red-600 shadow-sm' 
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === 'en' 
            ? 'bg-white text-red-600 shadow-sm' 
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default TranslationContext;