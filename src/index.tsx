// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';    // agora importamos de 'react-dom/client'
import App from './App';
import { AuthProvider } from './context/AuthContext';

import './styles/global.css';  // se tiver CSS global, importe aqui

// Localiza o elemento <div id="root"></div> no seu index.html
const container = document.getElementById('root');

if (container) {
  // Cria a "root" React 18 para esse container
  const root = createRoot(container);

  // Renderiza a árvore de componentes:
  root.render(
    <React.StrictMode>
      {/* ◀ Envolve todo App dentro do AuthProvider para o useAuth() funcionar */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  throw new Error('Elemento #root não encontrado em index.html');
}
