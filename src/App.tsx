// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TranslationProvider, useTranslation } from './context/TranslationContext';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Analytics from './pages/Analytics';

// Novas páginas criadas
import ProjectsManagement from './pages/ProjectsManagement';
import CreateProject from './pages/CreateProject';

// Páginas ainda a serem criadas (placeholder)
import ClientsManagement from './pages/ClientsManagement';
import TeamManagement from './pages/TeamManagement';
import FinanceManagement from './pages/FinanceManagement';

import './styles/global.css';

// Componente interno que usa o contexto de tradução
const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar: apenas visível para rotas distintas de /login */}
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header: também é exibido somente para rotas distintas de /login */}
            <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            {/* Conteúdo principal */}
            <main className="flex-1 overflow-auto bg-gray-50 p-4">
              <Routes>
                {/* Rota de Login - sem Header/Sidebar */}
                <Route path="/login" element={<Login />} />

                {/* Todas as outras rotas - com Header + Sidebar */}
                <Route
                  path="*"
                  element={
                    <Routes>
                      {/* Dashboard Principal */}
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/user" element={<UserDashboard />} />

                      {/* Páginas de Gestão - Admin */}
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/projects" element={<ProjectsManagement />} />
                      <Route path="/admin/create-project" element={<CreateProject />} />
                      <Route path="/admin/clients" element={<ClientsManagement />} />
                      <Route path="/admin/team" element={<TeamManagement />} />
                      <Route path="/admin/finance" element={<FinanceManagement />} />
                      <Route path="/admin/analytics" element={<Analytics />} />

                      {/* Páginas Públicas */}
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact" element={<Contact />} />

                      {/* Páginas de Usuário */}
                      <Route path="/user/dashboard" element={<UserDashboard />} />
                      <Route path="/user/projects" element={<ProjectsManagement />} />
                      <Route path="/user/analytics" element={<Analytics />} />

                      {/* Página Inicial */}
                      <Route
                        path="/"
                        element={
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <div className="text-6xl mb-4">🌍</div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {t('welcome.title')}
                              </h2>
                              <p className="text-lg text-gray-600 mb-6">
                                {t('welcome.subtitle')}
                              </p>
                              <div className="flex gap-4 justify-center">
                                <button 
                                  onClick={() => window.location.href = '/admin'}
                                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                  🚀 {t('welcome.accessDashboard')}
                                </button>
                                <button 
                                  onClick={() => window.location.href = '/services'}
                                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                  📋 {t('welcome.viewServices')}
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      />

                      {/* Rota 404 - Página não encontrada */}
                      <Route
                        path="*"
                        element={
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <div className="text-6xl mb-4">🔍</div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {t('error.notFound.title')}
                              </h2>
                              <p className="text-gray-600 mb-6">
                                {t('error.notFound.description')}
                              </p>
                              <div className="flex gap-4 justify-center">
                                <button 
                                  onClick={() => window.location.href = '/'}
                                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                  🏠 {t('error.notFound.backHome')}
                                </button>
                                <button 
                                  onClick={() => window.location.href = '/admin'}
                                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                  📊 {t('nav.dashboard')}
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </Routes>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

// Componente principal que fornece o contexto de tradução
const App: React.FC = () => {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
};

export default App;