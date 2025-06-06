import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Home,
  Briefcase,
  Calendar,
  FileText,
  Settings,
  LogOut,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import './UserDashboard.css';

const UserDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="user-dashboard">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">EE</div>
            <span className="logo-text">Esteves</span>
          </div>
          <button className="sidebar-close" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#" className="nav-link active">
                <Home size={20} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                <Briefcase size={20} />
                <span>Meus Projetos</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                <Calendar size={20} />
                <span>Agenda</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                <FileText size={20} />
                <span>Documentos</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                <Users size={20} />
                <span>Equipe</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                <Settings size={20} />
                <span>Configurações</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <div className="user-name">Carlos Silva</div>
              <div className="user-role">Gerente de Projetos</div>
            </div>
          </div>
          <button className="logout-btn">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="nav-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className="page-title">
              <h1>Dashboard</h1>
              <p>Bem-vindo de volta, Carlos!</p>
            </div>
          </div>

          <div className="nav-center">
            <div className="search-bar">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Pesquisar projetos, tarefas..." 
                className="search-input"
              />
            </div>
          </div>

          <div className="nav-right">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            
            <div className="user-menu" onClick={toggleUserMenu}>
              <div className="user-avatar">
                <User size={20} />
              </div>
              <ChevronDown size={16} className={`chevron ${isUserMenuOpen ? 'open' : ''}`} />
              
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name">Carlos Silva</div>
                      <div className="dropdown-user-email">carlos@esteves.co.ao</div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <User size={16} />
                    Meu Perfil
                  </a>
                  <a href="#" className="dropdown-item">
                    <Settings size={16} />
                    Configurações
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item logout">
                    <LogOut size={16} />
                    Sair
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-card">
              <div className="welcome-content">
                <h2>Olá, Carlos! 👋</h2>
                <p>Você tem <strong>5 tarefas pendentes</strong> e <strong>2 reuniões</strong> hoje.</p>
              </div>
              <div className="welcome-actions">
                <button className="btn btn-primary">Nova Tarefa</button>
                <button className="btn btn-outline">Ver Agenda</button>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="stats-section">
            <h3 className="section-title">Resumo Rápido</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon success">
                  <CheckCircle size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Tarefas Concluídas</div>
                  <div className="stat-change positive">+8% esta semana</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon warning">
                  <Clock size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">5</div>
                  <div className="stat-label">Tarefas Pendentes</div>
                  <div className="stat-change negative">-2 desde ontem</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon primary">
                  <Briefcase size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">3</div>
                  <div className="stat-label">Projetos Ativos</div>
                  <div className="stat-change positive">+1 este mês</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon info">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">89%</div>
                  <div className="stat-label">Produtividade</div>
                  <div className="stat-change positive">+5% esta semana</div>
                </div>
              </div>
            </div>
          </section>

          {/* Charts and Activities */}
          <div className="dashboard-grid">
            {/* Performance Chart */}
            <section className="chart-section">
              <div className="section-header">
                <h3 className="section-title">Produtividade Semanal</h3>
                <div className="section-actions">
                  <select 
                    className="time-filter"
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                  >
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mês</option>
                    <option value="quarter">Este Trimestre</option>
                  </select>
                  <button className="filter-btn">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
              
              <div className="chart-container">
                <div className="chart-bars">
                  <div className="chart-bar" style={{ height: '65%' }}>
                    <div className="bar-value">65%</div>
                  </div>
                  <div className="chart-bar" style={{ height: '80%' }}>
                    <div className="bar-value">80%</div>
                  </div>
                  <div className="chart-bar" style={{ height: '45%' }}>
                    <div className="bar-value">45%</div>
                  </div>
                  <div className="chart-bar" style={{ height: '90%' }}>
                    <div className="bar-value">90%</div>
                  </div>
                  <div className="chart-bar" style={{ height: '75%' }}>
                    <div className="bar-value">75%</div>
                  </div>
                  <div className="chart-bar" style={{ height: '85%' }}>
                    <div className="bar-value">85%</div>
                  </div>
                  <div className="chart-bar" style={{ height: '70%' }}>
                    <div className="bar-value">70%</div>
                  </div>
                </div>
                <div className="chart-labels">
                  <span>Seg</span>
                  <span>Ter</span>
                  <span>Qua</span>
                  <span>Qui</span>
                  <span>Sex</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </div>
            </section>

            {/* Recent Activities */}
            <section className="activities-section">
              <div className="section-header">
                <h3 className="section-title">Atividades Recentes</h3>
                <button className="view-all-btn">Ver Todas</button>
              </div>
              
              <div className="activities-list">
                <div className="activity-item">
                  <div className="activity-icon success">
                    <CheckCircle size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Tarefa "Análise de Mercado" concluída</div>
                    <div className="activity-time">Hoje, 14:30</div>
                  </div>
                  <button className="activity-menu">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="activity-item">
                  <div className="activity-icon primary">
                    <User size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Reunião com equipe de desenvolvimento</div>
                    <div className="activity-time">Hoje, 10:00</div>
                  </div>
                  <button className="activity-menu">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="activity-item">
                  <div className="activity-icon warning">
                    <Clock size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Prazo da tarefa "Relatório Mensal" se aproxima</div>
                    <div className="activity-time">Ontem, 16:45</div>
                  </div>
                  <button className="activity-menu">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="activity-item">
                  <div className="activity-icon info">
                    <FileText size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Novo documento adicionado ao projeto</div>
                    <div className="activity-time">Ontem, 14:20</div>
                  </div>
                  <button className="activity-menu">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="activity-item">
                  <div className="activity-icon success">
                    <TrendingUp size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Meta semanal atingida com sucesso</div>
                    <div className="activity-time">Anteontem, 18:00</div>
                  </div>
                  <button className="activity-menu">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Quick Actions */}
          <section className="quick-actions-section">
            <h3 className="section-title">Ações Rápidas</h3>
            <div className="quick-actions-grid">
              <button className="quick-action-card">
                <div className="quick-action-icon">
                  <Briefcase size={24} />
                </div>
                <div className="quick-action-content">
                  <div className="quick-action-title">Novo Projeto</div>
                  <div className="quick-action-desc">Criar um novo projeto</div>
                </div>
              </button>

              <button className="quick-action-card">
                <div className="quick-action-icon">
                  <Calendar size={24} />
                </div>
                <div className="quick-action-content">
                  <div className="quick-action-title">Agendar Reunião</div>
                  <div className="quick-action-desc">Marcar nova reunião</div>
                </div>
              </button>

              <button className="quick-action-card">
                <div className="quick-action-icon">
                  <FileText size={24} />
                </div>
                <div className="quick-action-content">
                  <div className="quick-action-title">Relatório</div>
                  <div className="quick-action-desc">Gerar relatório</div>
                </div>
              </button>

              <button className="quick-action-card">
                <div className="quick-action-icon">
                  <Users size={24} />
                </div>
                <div className="quick-action-content">
                  <div className="quick-action-title">Equipe</div>
                  <div className="quick-action-desc">Gerenciar equipe</div>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;