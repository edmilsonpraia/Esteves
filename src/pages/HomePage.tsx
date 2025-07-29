import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState(0);

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
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
      const handleToggle = () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      };
      
      mobileMenuToggle.addEventListener('click', handleToggle);
      return () => mobileMenuToggle.removeEventListener('click', handleToggle);
    }
  }, []);

  useEffect(() => {
    // Header Scroll Effect
    const handleHeaderScroll = () => {
      const header = document.querySelector('.header') as HTMLElement;
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    return () => window.removeEventListener('scroll', handleHeaderScroll);
  }, []);

  useEffect(() => {
    // Smooth Scroll for Anchor Links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      // ✅ CORREÇÃO: Ignorar links vazios (#) ou externos
      if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto')) {
        return; // Deixa o comportamento padrão
      }
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerElement = document.querySelector('.header') as HTMLElement;
          const headerHeight = headerElement?.offsetHeight || 0;
          const targetPosition = (targetElement as HTMLElement).offsetTop - headerHeight;
          
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

  useEffect(() => {
    // Counter Animation for Stats
    const animateCounter = (element: HTMLElement, target: number, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const updateCounter = () => {
        start += increment;
        if (start < target) {
          element.textContent = Math.floor(start).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toLocaleString();
        }
      };
      
      updateCounter();
    };

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .benefit, .impact-stat');
    
    animateElements.forEach(el => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => {
            const element = stat as HTMLElement;
            const text = element.textContent || '';
            let target = 0;
            
            if (text.includes('95M+')) {
              target = 95;
              element.textContent = '0M+';
            } else if (text.includes('3')) {
              target = 3;
              element.textContent = '0';
            } else if (text.includes('6')) {
              target = 6;
              element.textContent = '0';
            }
            
            if (target > 0) {
              animateCounter(element, target);
              if (text.includes('M+')) {
                setTimeout(() => {
                  element.textContent = target + 'M+';
                }, 2000);
              }
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      statsObserver.observe(heroStats);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
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
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .nav-brand h1 {
          color: #e74c3c;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .nav-subtitle {
          color: #666;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #e74c3c;
        }

        .mobile-menu-toggle {
          display: none;
          font-size: 1.5rem;
          color: #e74c3c;
          cursor: pointer;
        }

        /* Buttons */
        .btn-primary {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #e74c3c;
          padding: 12px 24px;
          border: 2px solid #e74c3c;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #e74c3c;
          color: white;
          transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
          padding-top: 120px;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-main-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          margin-top: 2rem;
          color: #2c3e50;
        }

        .highlight {
          color: #e74c3c;
          position: relative;
        }

        .hero-description {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-highlight-section {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 20px;
          padding: 2.5rem;
          margin: 2rem 0;
          border-left: 6px solid #e74c3c;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .hero-highlight-section::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(231, 76, 60, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(50%, -50%);
        }

        .hero-highlight-section h3 {
          color: #e74c3c;
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .service-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem;
          background: white;
          border-radius: 12px;
          border: 2px solid #f1f3f4;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
          position: relative;
          overflow: hidden;
        }

        .service-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(231, 76, 60, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .service-item:hover::before {
          left: 100%;
        }

        .service-item:hover {
          border-color: #e74c3c;
          background: #fff5f5;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 25px rgba(231, 76, 60, 0.15);
        }

        .service-item .check-icon {
          color: #22c55e;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .service-item .service-icon {
          color: #e74c3c;
          font-size: 1.3rem;
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

        .regional-emphasis p {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .regional-flags {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 1rem 0;
        }

        .regional-flags span {
          font-size: 2rem;
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
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .cta-highlight p {
          margin: 0;
          font-size: 1rem;
          opacity: 0.95;
        }

        .office-credit {
          background: #f8f9fa;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          text-align: center;
          margin-top: 1.5rem;
          border: 1px solid #e9ecef;
        }

        .office-credit p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .step-content h5 {
          margin: 0 0 0.3rem 0;
          color: #2c3e50;
          font-weight: 600;
        }

        .step-content p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #e74c3c;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-image {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-placeholder {
          width: 100%;
          max-width: 500px;
          height: 350px;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 4rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .image-placeholder:hover {
          transform: scale(1.05);
        }

        .floating-card {
          position: absolute;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          animation: float 3s ease-in-out infinite;
        }

        .floating-card i {
          color: #e74c3c;
          font-size: 1.2rem;
        }

        .card-1 {
          top: 10%;
          left: -10%;
          animation-delay: 0s;
        }

        .card-2 {
          top: 50%;
          right: -15%;
          animation-delay: 1s;
        }

        .card-3 {
          bottom: 10%;
          left: -5%;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        /* About Section */
        .about {
          padding: 6rem 0;
          background: #f8f9fa;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-text h3 {
          font-size: 2rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }

        .about-text p {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .benefits {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .benefit {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .benefit i {
          color: #e74c3c;
          font-size: 1.5rem;
          margin-top: 0.2rem;
        }

        .benefit h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .benefit p {
          color: #666;
          margin: 0;
        }

        .about-image {
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #2c3e50, #34495e);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        /* Features Section */
        .features {
          padding: 6rem 0;
          background: white;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .feature-icon i {
          color: white;
          font-size: 2rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .feature-link {
          color: #e74c3c;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.3s ease;
        }

        .feature-link:hover {
          gap: 1rem;
        }

        /* Impact Section */
        .impact {
          padding: 6rem 0;
          background: linear-gradient(135deg, #2c3e50, #34495e);
          color: white;
        }

        .impact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .impact-text h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .impact-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .impact-stat {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }

        .impact-stat h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #e74c3c;
        }

        .impact-stat span {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .impact-stat p {
          font-size: 0.9rem;
          opacity: 0.8;
          margin: 0;
        }

        .impact-image {
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, #3498db, #2980b9);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2.5rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        /* CTA Section */
        .cta {
          padding: 6rem 0;
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
        }

        .cta-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .cta-content p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          opacity: 0.95;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .cta .btn-primary {
          background: white;
          color: #e74c3c;
        }

        .cta .btn-primary:hover {
          background: #f8f9fa;
        }

        .cta .btn-secondary {
          border-color: white;
          color: white;
        }

        .cta .btn-secondary:hover {
          background: white;
          color: #e74c3c;
        }

        .cta-image {
          text-align: center;
        }

        .cta-image-placeholder {
          max-width: 400px;
          width: 100%;
          height: 250px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        /* Footer */
        .footer {
          background: #2c3e50;
          color: white;
          padding: 4rem 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #e74c3c;
        }

        .footer-section h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .footer-section p {
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 1.5rem;
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
          padding-top: 2rem;
          text-align: center;
          opacity: 0.8;
        }

        .footer-bottom p {
          margin-bottom: 0.5rem;
        }

        /* Responsive Design */
        /* Responsive Design */
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }
          
          .service-item {
            padding: 1rem;
            gap: 0.8rem;
          }
          
          .hero-highlight-section {
            padding: 2rem 1.5rem;
            margin: 1.5rem 0;
            border-radius: 16px;
          }
          
          .regional-emphasis {
            padding: 1.5rem;
            margin: 1.5rem 0;
          }
          
          .cta-highlight {
            padding: 1.5rem;
            margin: 1.5rem 0;
          }
          
          .regional-flags span {
            font-size: 1.8rem;
          }
          
          .hero {
            padding-top: 100px;
          }
          
          .hero-title {
            font-size: 2.2rem;
            line-height: 1.3;
            margin-top: 1.5rem;
          }
          
          .hero-description {
            font-size: 1.1rem;
          }
          
          .hero-stats {
            flex-direction: row;
            justify-content: space-around;
            gap: 1rem;
          }
          
          .stat {
            flex: 1;
            min-width: 0;
          }
          
          .stat-number {
            font-size: 1.6rem;
          }
          
          .stat-label {
            font-size: 0.8rem;
          }
          
          .process-steps {
            gap: 0.8rem;
          }
          
          .process-step {
            padding: 0.8rem;
          }
          
          .step-number {
            width: 28px;
            height: 28px;
            font-size: 0.8rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 0.8rem;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
            max-width: 280px;
            justify-content: center;
            padding: 14px 24px;
          }
          
          .mobile-menu-toggle {
            display: block;
          }
          
          .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
          }
          
          .nav-links.active {
            left: 0;
          }
          
          .nav-links a {
            padding: 1rem 0;
            font-size: 1.1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            width: 80%;
            text-align: center;
          }
          
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-stats {
            justify-content: center;
          }
          
          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .impact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .impact-stats {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .floating-card {
            position: static;
            margin: 1rem 0;
            animation: none;
          }
          
          .card-1, .card-2, .card-3 {
            position: static;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .section-header h2 {
            font-size: 2rem;
          }
          
          .nav {
            padding: 1rem;
          }
          
          .container {
            padding: 0 15px;
          }
          
          .feature-card {
            padding: 2rem 1.5rem;
          }
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Loading Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-text > * {
          animation: fadeInUp 0.8s ease forwards;
        }

        .hero-text > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-text > *:nth-child(2) { animation-delay: 0.2s; }
        .hero-text > *:nth-child(3) { animation-delay: 0.3s; }
        .hero-text > *:nth-child(4) { animation-delay: 0.4s; }

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
        `
      }} />

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

      <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
      
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <h1>Africa's Hands</h1>
            <span className="nav-subtitle">AO • NA • ZA Regional</span>
          </div>
          <div className="nav-links">
            <a href="#sobre">Sobre</a>
            <a href="#recursos">Recursos</a>
            <a href="#impacto">Impacto</a>
            <a href="#contato">Contato</a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if ((window as any).navigateToLogin) {
                  (window as any).navigateToLogin();
                }
              }}
              className="btn-primary"
            >
              Acessar Plataforma
            </a>
          </div>
          <div className="mobile-menu-toggle">
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Conectando <span className="highlight">Angola</span>, 
              <span className="highlight">Namíbia</span> e 
              <span className="highlight">África do Sul</span>
            </h1>
            <p className="hero-description">
              Plataforma digital inovadora que promove cooperação regional, 
              inovação tecnológica e desenvolvimento sustentável na África Austral.
            </p>

            {/* ✅ NOVA SEÇÃO: Destaque dos Serviços */}
            <div className="hero-highlight-section">
              <h3>
                <span>🚫</span>
                Evite constrangimentos!
              </h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                <strong>🌍 Procuras serviços de:</strong>
              </p>
              
              <div className="services-grid">
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🎓</span>
                  <span>Educação</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🏥</span>
                  <span>Saúde</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🚗</span>
                  <span>Transporte</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🛒</span>
                  <span>Comércio</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🏨</span>
                  <span>Turismo</span>
                </div>
                <div className="service-item">
                  <span className="check-icon">✅</span>
                  <span className="service-icon">🌟</span>
                  <span>Oportunidades regionais</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: '1.5rem 0', color: '#e74c3c', fontWeight: '600' }}>
                👉 <strong>Tudo organizado num único lugar!</strong>
              </div>

              <div className="regional-emphasis">
                <div className="regional-flags">
                  <span>🇦🇴</span>
                  <span>🇳🇦</span>
                  <span>🇿🇦</span>
                </div>
                <p>
                  Em <strong>Angola, Namíbia e África do Sul</strong>?<br/>
                  Agora já podes fazer isso de forma <em>fácil, rápida e segura</em> através do <strong>Africa's Hands</strong>!
                </p>
              </div>

              <div className="cta-highlight">
                <h4>
                  <span>📝</span>
                  Cadastra-te gratuitamente e começa a explorar!
                </h4>
                <p><strong>Africa's Hands</strong> — Descobre, reserva e aproveita com confiança!</p>
              </div>

              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Registo Gratuito</h5>
                    <p>Cria a tua conta em segundos</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>Explora Serviços</h5>
                    <p>Encontra o que precisas nos 3 países</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Conecta e Aproveita</h5>
                    <p>Acede a oportunidades regionais</p>
                  </div>
                </div>
              </div>

              <div className="office-credit">
                <p>
                  <strong>📘 Escritório V.J. Esteves e Serviços</strong>
                </p>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">95M+</span>
                <span className="stat-label">População</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">Países</span>
              </div>
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">Setores</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="https://www.africashands.org/" className="btn-primary">
                <i className="fas fa-rocket"></i>
                Começar Agora
              </a>
              <a href="#sobre" className="btn-secondary">
                <i className="fas fa-play"></i>
                Saiba Mais
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <i className="fas fa-handshake"></i>
            </div>
            <div className="floating-card card-1">
              <i className="fas fa-handshake"></i>
              <span>Cooperação</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-lightbulb"></i>
              <span>Inovação</span>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-globe-africa"></i>
              <span>Desenvolvimento</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="about">
        <div className="container">
          <div className="section-header">
            <h2>Sobre o Africa's Hands</h2>
            <p>Uma plataforma que facilita a colaboração entre Angola, Namíbia e África do Sul</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Transformando a Cooperação Regional</h3>
              <p>
                O Africa's Hands é uma plataforma digital inovadora que conecta três países estratégicos 
                da África Austral através da cooperação regional, promovendo a integração econômica e 
                o desenvolvimento sustentável.
              </p>
              <div className="benefits">
                <div className="benefit">
                  <i className="fas fa-expand-arrows-alt"></i>
                  <div>
                    <h4>Acesso Ampliado</h4>
                    <p>Oportunidades em três mercados nacionais</p>
                  </div>
                </div>
                <div className="benefit">
                  <i className="fas fa-network-wired"></i>
                  <div>
                    <h4>Networking Regional</h4>
                    <p>Conexão com profissionais e instituições</p>
                  </div>
                </div>
                <div className="benefit">
                  <i className="fas fa-rocket"></i>
                  <div>
                    <h4>Inovação Colaborativa</h4>
                    <p>Projetos de desenvolvimento conjunto</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <i className="fas fa-laptop-code"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Recursos da Plataforma</h2>
            <p>Soluções integradas para cooperação regional efetiva</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Rede de Saúde Regional</h3>
              <p>Cooperação em saúde entre os três países, compartilhamento de recursos e conhecimentos médicos.</p>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if ((window as any).navigateToLogin) {
                    (window as any).navigateToLogin();
                  }
                }}
                className="feature-link"
              >
                Saiba mais <i className="fas fa-arrow-right"></i>
              </a>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Intercâmbio Universitário</h3>
              <p>Facilitação de intercâmbios educacionais e programas de cooperação acadêmica.</p>
              <a href="#" className="feature-link">Saiba mais <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-store"></i>
              </div>
              <h3>Marketplace Regional</h3>
              <p>Plataforma de comércio transfronteiriço para produtos e serviços regionais.</p>
              <a href="#" className="feature-link">Saiba mais <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Hub de Inovação</h3>
              <p>Colaboração em projetos inovadores e desenvolvimento tecnológico conjunto.</p>
              <a href="#" className="feature-link">Saiba mais <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impacto" className="impact">
        <div className="container">
          <div className="impact-content">
            <div className="impact-text">
              <h2>Impacto Regional</h2>
              <p>
                Superando barreiras burocráticas e promovendo a integração efetiva 
                entre Angola, Namíbia e África do Sul através de soluções digitais inovadoras.
              </p>
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
            </div>
            <div className="impact-image">
              <i className="fas fa-globe-africa"></i>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Faça Parte da Transformação Regional</h2>
            <p>Junte-se à plataforma que está conectando a África Austral e criando oportunidades de cooperação sem precedentes.</p>
            <div className="cta-buttons">
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if ((window as any).navigateToLogin) {
                        (window as any).navigateToLogin();
                      }
                    }}
                    className="btn-primary"
                  >
                    <i className="fas fa-user-plus"></i>
                    Registrar-se Agora
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if ((window as any).navigateToLogin) {
                        (window as any).navigateToLogin();
                      }
                    }}
                    className="btn-secondary"
                  >
                    <i className="fas fa-envelope"></i>
                    Entrar em Contato
                  </a>
            </div>
          </div>
          <div className="cta-image">
            <div className="cta-image-placeholder">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Africa's Hands</h3>
              <p>Conectando Angola, Namíbia e África do Sul através da cooperação regional e inovação tecnológica.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Recursos</h4>
              <ul>
                <li><a href="#">Rede de Saúde</a></li>
                <li><a href="#">Intercâmbio Universitário</a></li>
                <li><a href="#">Marketplace</a></li>
                <li><a href="#">Hub de Inovação</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Países</h4>
              <ul>
                <li><a href="#">🇦🇴 Angola</a></li>
                <li><a href="#">🇳🇦 Namíbia</a></li>
                <li><a href="#">🇿🇦 África do Sul</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contato</h4>
              <ul>
                <li><a href="mailto:info@africashands.org">info@africashands.org</a></li>
                <li><a href="https://www.africashands.org/">www.africashands.org</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Africa's Hands. Todos os direitos reservados.</p>
            <p>Desenvolvido por Valdimir Jacinto Esteves</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;