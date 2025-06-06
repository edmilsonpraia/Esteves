// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import AdminDashboard from './pages/AdminDashboard';
import UserDashboard  from './pages/UserDashboard';
import Login          from './pages/Login';
import Services       from './pages/Services';
import Contact        from './pages/Contact';

import './styles/global.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <Route path="/login" element={<Login />} />

                {/* As demais rotas exibem Header + Sidebar */}
                <Route
                  path="*"
                  element={
                    <Routes>
                      <Route path="/admin"    element={<AdminDashboard />} />
                      <Route path="/user"     element={<UserDashboard />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact"  element={<Contact />} />
                      <Route
                        path="/"
                        element={
                          <div className="flex items-center justify-center h-full">
                            <h2 className="text-2xl text-gray-600">
                              Escolha uma opção no menu lateral
                            </h2>
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

export default App;
