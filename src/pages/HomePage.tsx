import React, { useEffect, useState } from 'react';
import { useTranslation, LanguageToggle } from '../context/TranslationContext';

const HomePage: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // ✅ SEMPRE chamar o hook - sem condições
  const { t } = useTranslation();

  // ✅ FUNÇÃO PARA TOGGLE DO MENU MOBILE
  const toggleMobileMenu = () => {
    console.log('Toggle menu:', !mobileMenuOpen); // Debug
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // ✅ FUNÇÃO PARA FECHAR MENU
  const closeMobileMenu = () => {
    console.log('Fechando menu'); // Debug
    setMobileMenuOpen(false);
  };

  // ✅ FUNÇÃO PARA NAVEGAR PARA LOGIN (reutilizável)
  const handleLoginNavigation = () => {
    if ((window as any).navigateToLogin) {
      (window as any).navigateToLogin();
    }
  };

  // ✅ COMPONENTE INTERNO PARA LINKS DE NAVEGAÇÃO (elimina duplicação)
  const NavigationLinks = ({ isMobile = false, onLinkClick }: { isMobile?: boolean; onLinkClick?: () => void }) => (
    <>
      <a href="#sobre" onClick={onLinkClick} className={isMobile ? 'mobile-link' : 'desktop-link'}>
        {t('header.about') || 'Sobre'}
      </a>
      <a href="#recursos" onClick={onLinkClick} className={isMobile ? 'mobile-link' : 'desktop-link'}>
        {t('header.resources') || 'Recursos'}
      </a>
      <a href="#impacto" onClick={onLinkClick} className={isMobile ? 'mobile-link' : 'desktop-link'}>
        {t('header.impact') || 'Impacto'}
      </a>
      <a href="#contato" onClick={onLinkClick} className={isMobile ? 'mobile-link' : 'desktop-link'}>
        {t('header.contact') || 'Contato'}
      </a>
    </>
  );

  // ✅ COMPONENTE INTERNO PARA BOTÃO CTA (elimina duplicação)
  const CTAButton = ({ isMobile = false, onClickAction }: { isMobile?: boolean; onClickAction?: () => void }) => (
    <button 
      onClick={() => {
        if (onClickAction) onClickAction();
        handleLoginNavigation();
      }}
      className={isMobile ? "mobile-cta-button" : "btn-primary"}
    >
      {isMobile && <i className="fas fa-rocket"></i>}
      {t('header.accessPlatform') || 'Acessar Plataforma'}
    </button>
  );

  useEffect(() => {
    // Progress Bar
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgressWidth(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Smooth Scroll for Anchor Links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto')) {
        return;
      }
      
      if (href.startsWith('#')) {
        e.preventDefault();
        closeMobileMenu(); // Fechar menu mobile ao clicar
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerElement = document.querySelector('.header') as HTMLElement;
          const headerHeight = headerElement?.offsetHeight || 80;
          const targetPosition = (targetElement as HTMLElement).offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Reset e Base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header - Otimizado para Mobile */
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          height: 70px;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
        }

        .nav-brand {
          flex: 1;
        }

        .nav-brand h1 {
          color: #e74c3c;
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }

        .nav-subtitle {
          color: #666;
          font-size: 0.7rem;
          font-weight: 500;
          margin: 0;
          line-height: 1;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        /* Mobile Menu Button */
        .mobile-menu-toggle {
          display: block;
          background: rgba(231, 76, 60, 0.1);
          border: 2px solid #e74c3c;
          font-size: 1.2rem;
          color: #e74c3c;
          cursor: pointer;
          padding: 0.6rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-toggle:hover {
          background: #e74c3c;
          color: white;
          transform: scale(1.05);
        }

        .mobile-menu-toggle:active {
          transform: scale(0.95);
        }

        /* Menu Mobile Overlay - COMPLETAMENTE OCULTO */
        .nav-links {
          position: fixed;
          top: 70px;
          left: -100%;
          width: 100%;
          height: calc(100vh - 70px);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(15px);
          transition: left 0.3s ease;
          z-index: 999;
          padding: 0;
          overflow-y: auto;
          visibility: hidden;
          opacity: 0;
        }

        .nav-links.active {
          left: 0;
          visibility: visible;
          opacity: 1;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 2rem 0;
        }

        .nav-menu a {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          font-size: 1.2rem;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-menu a:hover,
        .nav-menu a:active {
          background: rgba(231, 76, 60, 0.1);
          color: #e74c3c;
          transform: translateX(10px);
        }

        .nav-menu a::before {
          content: '🔗';
          font-size: 1.2rem;
        }

        .nav-menu a[href="#sobre"]::before { content: '📋'; }
        .nav-menu a[href="#recursos"]::before { content: '🛠️'; }
        .nav-menu a[href="#impacto"]::before { content: '📊'; }
        .nav-menu a[href="#contato"]::before { content: '📞'; }

        /* Buttons - Estilos unificados */
        .btn-primary,
        .mobile-cta-button {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
          white-space: nowrap;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover,
        .mobile-cta-button:hover,
        .btn-primary:active,
        .mobile-cta-button:active {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }

        /* Mobile CTA específico */
        .mobile-cta-button {
          margin: 2rem;
          padding: 1.2rem 2rem;
          border-radius: 12px;
          text-align: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .btn-secondary {
          background: transparent;
          color: #e74c3c;
          padding: 0.8rem 1.5rem;
          border: 2px solid #e74c3c;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: #e74c3c;
          color: white;
          transform: translateY(-2px);
        }

        /* Language Toggle Mobile */
        .language-toggle-mobile {
          margin: 1rem 2rem;
          display: flex;
          justify-content: center;
        }

        /* Desktop Navigation - Escondida no mobile */
        .desktop-nav {
          display: none !important; /* ✅ OCULTO NO MOBILE */
        }

        /* Mobile (até 1023px) */
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          
          .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(15px);
            transition: left 0.3s ease;
            z-index: 999;
            padding: 0;
            overflow-y: auto;
            visibility: hidden;
            opacity: 0;
          }

          .nav-links.active {
            left: 0;
            visibility: visible;
            opacity: 1;
          }
        }

        /* Esconder nav-links por padrão no mobile */
        .nav-links {
          display: none;
        }

        .nav-links.active {
          display: block;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
          padding: 120px 0 40px 0;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .hero-main-content {
          text-align: center;
        }

        .hero-title {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          margin-top: 2rem;
        }

        .highlight {
          color: #e74c3c;
          position: relative;
        }

        .hero-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          padding: 0 1rem;
        }

        /* Hero Highlight Section - Mobile Otimizada */
        .hero-highlight-section {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 16px;
          padding: 1.5rem;
          margin: 2rem 0;
          border-left: 6px solid #e74c3c;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .hero-highlight-section h3 {
          color: #e74c3c;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-align: center;
        }

        .hero-highlight-section > p {
          text-align: center;
          margin-bottom: 1rem;
          color: #666;
          font-weight: 500;
        }

        /* Services Grid - Mobile */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.8rem;
          margin: 1rem 0;
        }

        .service-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem;
          background: white;
          border-radius: 10px;
          border: 2px solid #f1f3f4;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .service-item:active {
          transform: scale(0.98);
          border-color: #e74c3c;
          background: #fff5f5;
        }

        .service-item .check-icon {
          color: #22c55e;
          font-weight: bold;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .service-item .service-icon {
          color: #e74c3c;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .regional-emphasis {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          margin: 1.5rem 0;
          box-shadow: 0 8px 25px rgba(231, 76, 60, 0.25);
        }

        .regional-flags {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 1rem 0;
        }

        .regional-flags span {
          font-size: 1.8rem;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }

        .cta-highlight {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          margin: 2rem 0;
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.25);
        }

        .cta-highlight h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-top: 1rem;
        }

        .process-step {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 10px;
          border-left: 4px solid #e74c3c;
        }

        .step-number {
          background: #e74c3c;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .step-content h5 {
          margin: 0 0 0.3rem 0;
          color: #2c3e50;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .step-content p {
          margin: 0;
          color: #666;
          font-size: 0.8rem;
        }

        .office-credit {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          margin-top: 1rem;
          border: 1px solid #e9ecef;
        }

        .office-credit p {
          margin: 0;
          color: #666;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Hero Stats - Mobile */
        .hero-stats {
          display: flex;
          justify-content: space-around;
          gap: 1rem;
          margin: 2rem 0;
          padding: 0 1rem;
        }

        .stat {
          text-align: center;
          flex: 1;
        }

        .stat-number {
          display: block;
          font-size: 1.6rem;
          font-weight: 700;
          color: #e74c3c;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Hero Buttons - Mobile */
        .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          margin-top: 2rem;
        }

        .hero-buttons .btn-primary,
        .hero-buttons .btn-secondary {
          width: 100%;
          max-width: 300px;
          justify-content: center;
          padding: 1rem;
          font-size: 1rem;
        }

        /* Sections */
        .section {
          padding: 4rem 0;
          scroll-margin-top: 90px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .section-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1rem;
          color: #666;
        }

        /* About Section */
        .about {
          background: #f8f9fa;
          padding: 4rem 0;
        }

        /* Features Section */
        .features {
          padding: 4rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          padding: 0 1rem;
        }

        .feature-card {
          background: white;
          padding: 2rem 1.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          text-align: center;
          border: 1px solid #f0f0f0;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .feature-icon i {
          color: white;
          font-size: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        /* Impact Section */
        .impact {
          padding: 4rem 0;
          background: linear-gradient(135deg, #2c3e50, #34495e);
          color: white;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          padding: 0 1rem;
        }

        .impact-stat {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }

        /* CTA Section */
        .cta {
          padding: 4rem 0;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
        }

        .cta-content {
          text-align: center;
          padding: 0 1rem;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          margin: 2rem 0;
        }

        .cta .btn-primary {
          background: white;
          color: #e74c3c;
          width: 100%;
          max-width: 300px;
        }

        .cta .btn-secondary {
          border-color: white;
          color: white;
          width: 100%;
          max-width: 300px;
        }

        /* Footer */
        .footer {
          background: #2c3e50;
          color: white;
          padding: 3rem 0 1rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          text-align: center;
          padding: 0 1rem;
        }

        .footer-section h3,
        .footer-section h4 {
          color: #e74c3c;
          margin-bottom: 1rem;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .footer-section ul li a:hover {
          opacity: 1;
          color: #e74c3c;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: #e74c3c;
          transform: translateY(-2px);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
          text-align: center;
          opacity: 0.8;
          margin-top: 2rem;
        }

        .footer-bottom p {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        /* Progress Bar */
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #e74c3c, #c0392b);
          z-index: 9999;
          transition: width 0.1s ease;
        }

        /* Overlay quando menu está aberto */
        .menu-overlay {
          position: fixed;
          top: 70px;
          left: 0;
          width: 100%;
          height: calc(100vh - 70px);
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Touch Improvements */
        @media (hover: none) and (pointer: coarse) {
          .service-item:hover,
          .btn-primary:hover,
          .btn-secondary:hover,
          .nav-menu a:hover {
            transform: none;
          }
        }

        /* ===== MOBILE ESPECÍFICO (até 1023px) ===== */
        @media (max-width: 1023px) {
          /* OCULTAR COMPLETAMENTE DESKTOP NAV */
          .desktop-nav,
          .desktop-link {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* MOSTRAR ELEMENTOS MOBILE */
          .mobile-menu-toggle {
            display: flex !important;
            visibility: visible !important;
          }
          
          .mobile-link {
            display: block !important;
            visibility: visible !important;
          }
          
          /* Menu mobile por padrão oculto */
          .nav-links {
            position: fixed !important;
            top: 70px;
            left: -100% !important;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(15px);
            transition: left 0.3s ease;
            z-index: 999;
            padding: 0;
            overflow-y: auto;
            visibility: hidden !important;
            opacity: 0 !important;
            display: none !important;
          }

          /* Menu mobile quando ativo */
          .nav-links.active {
            left: 0 !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
          }
        }

        /* Tablet (768px+) */
        @media (min-width: 768px) {
          .nav {
            padding: 1rem 2rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .impact-stats {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .cta-buttons {
            flex-direction: row;
            justify-content: center;
          }
          
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ===== DESKTOP (1024px+) - FORÇAR DESKTOP NAV ===== */
        @media (min-width: 1024px) {
          /* OCULTAR COMPLETAMENTE ELEMENTOS MOBILE */
          .mobile-menu-toggle {
            display: none !important;
            visibility: hidden !important;
          }
          
          .nav-links,
          .nav-links.active {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -9999px !important;
            z-index: -1 !important;
          }
          
          .mobile-cta-button,
          .language-toggle-mobile,
          .mobile-link {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* FORÇAR DESKTOP NAV A APARECER */
          .desktop-nav {
            display: flex !important;
            visibility: visible !important;
            align-items: center;
            gap: 2rem;
          }
          
          .desktop-link {
            display: inline-block !important;
            visibility: visible !important;
          }
          
          /* Layout adjustments */
          .hero-title {
            font-size: 3.5rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .features-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .footer-content {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        `
      }} />

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

      <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
      
      {/* Overlay para fechar menu */}
      <div 
        className={`menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>
      
      {/* ===== HEADER - CONTROLE TOTAL DE NAVEGAÇÃO ===== */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <h1>{t('company.name') || 'Africa\'s Hands'}</h1>
            <span className="nav-subtitle">{t('login.slogan') || 'AO • NA • ZA Regional'}</span>
          </div>
          <div className="nav-right">
            {/* ===== DESKTOP NAVIGATION - SÓ APARECE EM DESKTOP ===== */}
            <div className="desktop-nav">
              <LanguageToggle />
              <NavigationLinks />
              <CTAButton />
            </div>
            
            {/* ===== MOBILE BUTTON - SÓ APARECE EM MOBILE ===== */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Menu"
              type="button"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </nav>
        
        {/* ===== MOBILE MENU - SÓ QUANDO ATIVADO EM MOBILE ===== */}
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-menu">
            <NavigationLinks isMobile={true} onLinkClick={closeMobileMenu} />
          </div>
          
          <CTAButton isMobile={true} onClickAction={closeMobileMenu} />
          
          <div className="language-toggle-mobile">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-main-content">
            <h1 className="hero-title">
              {t('hero.connecting') || 'Conectando'} <span className="highlight">{t('country.angola') || 'Angola'}</span>, 
              <span className="highlight">{t('country.namibia') || 'Namíbia'}</span> {t('hero.and') || 'e'} 
              <span className="highlight">{t('country.southAfrica') || 'África do Sul'}</span>
            </h1>
            <p className="hero-description">
              {t('hero.description') || 'Plataforma digital inovadora que promove cooperação regional, inovação tecnológica e desenvolvimento sustentável na África Austral.'}
            </p>

            {/* Hero Highlight Section */}
            <div className="hero-highlight-section">
              <h3>
                <span>🚫</span>
                {t('hero.avoidEmbarrassment') || 'Evite constrangimentos!'}
              </h3>
              <p>
                <strong>🌍 {t('hero.lookingForServices') || 'Procuras serviços de:'}</strong>
              </p>
              
              <div className="services-grid">
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🎓</span>
                  <span>{t('sector.education') || 'Educação'}</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🏥</span>
                  <span>{t('sector.health') || 'Saúde'}</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🚗</span>
                  <span>{t('sector.transport') || 'Transporte'}</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🛒</span>
                  <span>{t('sector.commerce') || 'Comércio'}</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🏨</span>
                  <span>{t('sector.tourism') || 'Turismo'}</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🌟</span>
                  <span>{t('hero.regionalOpportunities') || 'Oportunidades regionais'}</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: '1.5rem 0', color: '#e74c3c', fontWeight: '600' }}>
                👉 <strong>{t('hero.everythingInOnePlace') || 'Tudo organizado num único lugar!'}</strong>
              </div>

              <div className="regional-emphasis">
                <div className="regional-flags">
                  <span>🇦🇴</span>
                  <span>🇳🇦</span>
                  <span>🇿🇦</span>
                </div>
                <p>
                  {t('hero.inCountries') || 'Em'} <strong>{t('country.angola') || 'Angola'}, {t('country.namibia') || 'Namíbia'} {t('hero.and') || 'e'} {t('country.southAfrica') || 'África do Sul'}</strong>?<br/>
                  {t('hero.nowYouCan') || 'Agora já podes fazer isso de forma'} <em>{t('hero.easyFastSecure') || 'fácil, rápida e segura'}</em> {t('hero.through') || 'através do'} <strong>{t('company.name') || 'Africa\'s Hands'}</strong>!
                </p>
              </div>

              <div className="cta-highlight">
                <h4>
                  <span>📝</span>
                  {t('hero.registerFree') || 'Cadastra-te gratuitamente e começa a explorar!'}
                </h4>
                <p><strong>{t('company.name') || 'Africa\'s Hands'}</strong> — {t('hero.discoverBookEnjoy') || 'Descobre, reserva e aproveita com confiança!'}</p>
              </div>

              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>{t('hero.step1.title') || 'Registo Gratuito'}</h5>
                    <p>{t('hero.step1.description') || 'Cria a tua conta em segundos'}</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>{t('hero.step2.title') || 'Explora Serviços'}</h5>
                    <p>{t('hero.step2.description') || 'Encontra o que precisas nos 3 países'}</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>{t('hero.step3.title') || 'Conecta e Aproveita'}</h5>
                    <p>{t('hero.step3.description') || 'Acede a oportunidades regionais'}</p>
                  </div>
                </div>
              </div>

              <div className="office-credit">
                <p>
                  <strong>📘 {t('hero.officeCredit') || 'Escritório V.J. Esteves e Serviços'}</strong>
                </p>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">95M+</span>
                <span className="stat-label">{t('login.stats.population') || 'População'}</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">{t('login.stats.countries') || 'Países'}</span>
              </div>
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">{t('login.stats.sectors') || 'Setores'}</span>
              </div>
            </div>

            <div className="hero-buttons">
              <a href="https://www.africashands.org/" className="btn-primary">
                <i className="fas fa-rocket"></i>
                {t('hero.startNow') || 'Começar Agora'}
              </a>
              <a href="#sobre" className="btn-secondary">
                <i className="fas fa-play"></i>
                {t('hero.learnMore') || 'Saiba Mais'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="about section">
        <div className="section-header">
          <h2>{t('about.title') || 'Sobre o Africa\'s Hands'}</h2>
          <p>Uma plataforma que facilita a colaboração entre Angola, Namíbia e África do Sul</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="features section">
        <div className="section-header">
          <h2>{t('features.title') || 'Recursos da Plataforma'}</h2>
          <p>Soluções integradas para cooperação regional efetiva</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3>Rede de Saúde Regional</h3>
            <p>Cooperação em saúde entre os três países, compartilhamento de recursos e conhecimentos médicos.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>Intercâmbio Universitário</h3>
            <p>Facilitação de intercâmbios educacionais e programas de cooperação acadêmica.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-store"></i>
            </div>
            <h3>Marketplace Regional</h3>
            <p>Plataforma de comércio transfronteiriço para produtos e serviços regionais.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Hub de Inovação</h3>
            <p>Colaboração em projetos inovadores e desenvolvimento tecnológico conjunto.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impacto" className="impact section">
        <div className="section-header">
          <h2 style={{ color: 'white' }}>{t('impact.title') || 'Impacto Regional'}</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Superando barreiras burocráticas e promovendo a integração efetiva entre Angola, Namíbia e África do Sul.
          </p>
        </div>
        <div className="impact-stats">
          <div className="impact-stat">
            <h3>Angola</h3>
            <span>33 milhões</span>
            <p>População conectada</p>
          </div>
          <div className="impact-stat">
            <h3>Namíbia</h3>
            <span>2,5 milhões</span>
            <p>População conectada</p>
          </div>
          <div className="impact-stat">
            <h3>África do Sul</h3>
            <span>59,5 milhões</span>
            <p>População conectada</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="cta-content">
          <h2>{t('cta.title') || 'Faça Parte da Transformação Regional'}</h2>
          <p>Junte-se à plataforma que está conectando a África Austral e criando oportunidades de cooperação sem precedentes.</p>
          <div className="cta-buttons">
            <button 
              onClick={handleLoginNavigation}
              className="btn-primary"
            >
              <i className="fas fa-user-plus"></i>
              Registrar-se Agora
            </button>
            <a 
              href="#contato"
              className="btn-secondary"
            >
              <i className="fas fa-envelope"></i>
              Entrar em Contato
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t('company.name') || 'Africa\'s Hands'}</h3>
            <p>Conectando Angola, Namíbia e África do Sul através da cooperação regional e inovação tecnológica.</p>
            <div className="social-links">
              <a href="javascript:void(0)" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="javascript:void(0)" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="javascript:void(0)" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="javascript:void(0)" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Recursos</h4>
            <ul>
              <li><a href="javascript:void(0)">Rede de Saúde</a></li>
              <li><a href="javascript:void(0)">Intercâmbio Universitário</a></li>
              <li><a href="javascript:void(0)">Marketplace</a></li>
              <li><a href="javascript:void(0)">Hub de Inovação</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Países</h4>
            <ul>
              <li><a href="javascript:void(0)">🇦🇴 Angola</a></li>
              <li><a href="javascript:void(0)">🇳🇦 Namíbia</a></li>
              <li><a href="javascript:void(0)">🇿🇦 África do Sul</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('footer.contact') || 'Contato'}</h4>
            <ul>
              <li><a href="mailto:info@africashands.org">info@africashands.org</a></li>
              <li><a href="https://www.africashands.org/">www.africashands.org</a></li>
              <li><a href="tel:+244924166401">📱 +244 924 166 401</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 {t('company.name') || 'Africa\'s Hands'}. Todos os direitos reservados.</p>
          <p>Desenvolvido por Valdimir Jacinto Esteves</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;