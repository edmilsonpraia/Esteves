import React, { useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  countries: string[];
  features: string[];
  price: string;
  duration: string;
  image: string;
  icon: string;
  featured: boolean;
  providers: string[];
  requirements: string[];
  benefits: string[];
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  country: string;
  avatar: string;
  content: string;
  service: string;
  rating: number;
}

const ServicesAfricasHands: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: 'Rede de Telemedicina Regional',
      description: 'Sistema integrado de telemedicina conectando hospitais e profissionais de saúde da região SADC para consultas remotas e intercâmbio médico.',
      category: 'saude',
      countries: ['Angola', 'Namíbia', 'África do Sul'],
      features: [
        'Consultas médicas remotas',
        'Intercâmbio de especialistas',
        'Prontuário eletrônico integrado',
        'Telemedicina rural',
        'Treinamento médico à distância',
        'Rede de hospitais parceiros'
      ],
      price: 'A partir de $15.000',
      duration: '3-6 meses',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop',
      icon: '🏥',
      featured: true,
      providers: ['Clínica Sagrada Esperança (Angola)', 'Lady Pohamba Hospital (Namíbia)', 'Netcare Group (África do Sul)'],
      requirements: ['Licença médica válida', 'Conexão de internet estável', 'Equipamentos básicos'],
      benefits: ['Acesso a especialistas regionais', 'Redução de custos', 'Melhoria no atendimento']
    },
    {
      id: 2,
      title: 'Programa de Intercâmbio Universitário SADC',
      description: 'Plataforma completa para intercâmbio acadêmico entre universidades de Angola, Namíbia e África do Sul, incluindo bolsas e certificações.',
      category: 'educacao',
      countries: ['Angola', 'Namíbia', 'África do Sul'],
      features: [
        'Portal de candidaturas online',
        'Sistema de bolsas regionais',
        'Reconhecimento de créditos',
        'Suporte para estudantes',
        'Programas de pesquisa conjunta',
        'Certificação regional'
      ],
      price: 'Bolsas até $25.000',
      duration: '6 meses - 2 anos',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=300&fit=crop',
      icon: '🎓',
      featured: true,
      providers: ['Universidade Agostinho Neto', 'UNAM & NUST', 'UCT & Wits University'],
      requirements: ['Graduação em curso', 'Proficiência em inglês', 'Bom desempenho acadêmico'],
      benefits: ['Experiência internacional', 'Networking regional', 'Certificação reconhecida']
    },
    {
      id: 3,
      title: 'Marketplace Regional de Produtos Locais',
      description: 'Plataforma de e-commerce especializada em produtos artesanais, agrícolas e industriais da região, facilitando o comércio transfronteiriço.',
      category: 'comercio',
      countries: ['Angola', 'Namíbia', 'África do Sul'],
      features: [
        'Loja virtual integrada',
        'Logística transfronteiriça',
        'Pagamentos multi-moeda',
        'Marketing digital',
        'Gestão de estoque',
        'Suporte ao vendedor'
      ],
      price: 'Comissão de 5-12%',
      duration: '1-3 meses setup',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=300&fit=crop',
      icon: '🛒',
      featured: true,
      providers: ['Angola Export', 'Namibian Chamber of Commerce', 'SEDA (África do Sul)'],
      requirements: ['Produto/serviço válido', 'Documentação comercial', 'Capacidade de entrega'],
      benefits: ['Mercado ampliado', 'Maior visibilidade', 'Crescimento de vendas']
    },
    {
      id: 4,
      title: 'Roteiros de Turismo Sustentável Regional',
      description: 'Desenvolvimento de roteiros turísticos integrados entre os três países, focando em sustentabilidade e experiências autênticas.',
      category: 'turismo',
      countries: ['Angola', 'Namíbia', 'África do Sul'],
      features: [
        'Roteiros personalizados',
        'Reservas integradas',
        'Guias locais certificados',
        'Turismo comunitário',
        'Experiências culturais',
        'Suporte 24/7'
      ],
      price: 'Pacotes de $500 - $5.000',
      duration: '3-21 dias',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=300&fit=crop',
      icon: '🏨',
      featured: false,
      providers: ['Angola Tourism Board', 'Namibia Tourism', 'South Africa Tourism'],
      requirements: ['Passaporte válido', 'Seguro viagem', 'Vacinação em dia'],
      benefits: ['Experiências únicas', 'Impacto positivo local', 'Conexão cultural']
    },
    {
      id: 5,
      title: 'Sistema Integrado de Transporte Regional',
      description: 'Plataforma digital para coordenação de voos, transporte terrestre e logística entre Angola, Namíbia e África do Sul.',
      category: 'transporte',
      countries: ['Angola', 'Namíbia', 'África do Sul'],
      features: [
        'Reservas multi-modal',
        'Rastreamento em tempo real',
        'Otimização de rotas',
        'Gestão de carga',
        'Documentação automática',
        'Suporte multilíngue'
      ],
      price: 'Variável por serviço',
      duration: 'Contínuo',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=300&fit=crop',
      icon: '✈️',
      featured: false,
      providers: ['TAAG Angola Airlines', 'FlyNamibia', 'South African Airways'],
      requirements: ['Documentação válida', 'Planejamento antecipado', 'Flexibilidade'],
      benefits: ['Viagens otimizadas', 'Economia de tempo', 'Redução de custos']
    },
    {
      id: 6,
      title: 'Hub de Inovação e Startups Regionais',
      description: 'Ecossistema de apoio a startups e inovação tecnológica, conectando empreendedores da região com mentores, investidores e mercados.',
      category: 'tecnologia',
      countries: ['Angola', 'Namíbia', 'África do Sul'],
      features: [
        'Programa de aceleração',
        'Mentoria especializada',
        'Acesso a investidores',
        'Coworking regional',
        'Eventos de networking',
        'Suporte jurídico/fiscal'
      ],
      price: 'Investimento até $200.000',
      duration: '6-18 meses',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop',
      icon: '💻',
      featured: true,
      providers: ['ISPTEC (Angola)', 'NUST (Namíbia)', 'Cape Town Innovation Hub'],
      requirements: ['Startup em estágio inicial', 'Potencial de escala', 'Equipe comprometida'],
      benefits: ['Aceleração do crescimento', 'Rede de contatos', 'Acesso a mercados']
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Dr. António Silva',
      role: 'Diretor Médico',
      company: 'Hospital Josina Machel',
      country: 'Angola',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      content: 'A plataforma de telemedicina revolucionou nossa capacidade de atender pacientes em áreas remotas. Conseguimos consultar especialistas da África do Sul em tempo real.',
      service: 'Telemedicina Regional',
      rating: 5
    },
    {
      id: 2,
      name: 'Prof. Sarah Nghikembua',
      role: 'Coordenadora de Intercâmbio',
      company: 'University of Namibia',
      country: 'Namíbia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=100&h=100&fit=crop&crop=face',
      content: 'O programa de intercâmbio abriu portas incríveis para nossos estudantes. A parceria regional está formando uma nova geração de líderes africanos.',
      service: 'Intercâmbio Universitário',
      rating: 5
    },
    {
      id: 3,
      name: 'Maria Santos',
      role: 'Empreendedora',
      company: 'Artesanato Karas',
      country: 'Namíbia',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      content: 'Através do marketplace regional, consegui expandir meus produtos artesanais para Angola e África do Sul. Minhas vendas triplicaram!',
      service: 'Marketplace Regional',
      rating: 5
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os Serviços', icon: '🌍', count: services.length },
    { id: 'saude', name: 'Saúde', icon: '🏥', count: services.filter(s => s.category === 'saude').length },
    { id: 'educacao', name: 'Educação', icon: '🎓', count: services.filter(s => s.category === 'educacao').length },
    { id: 'comercio', name: 'Comércio', icon: '🛒', count: services.filter(s => s.category === 'comercio').length },
    { id: 'turismo', name: 'Turismo', icon: '🏨', count: services.filter(s => s.category === 'turismo').length },
    { id: 'transporte', name: 'Transporte', icon: '✈️', count: services.filter(s => s.category === 'transporte').length },
    { id: 'tecnologia', name: 'Tecnologia', icon: '💻', count: services.filter(s => s.category === 'tecnologia').length }
  ];

  const countries = ['Angola', 'Namíbia', 'África do Sul'];

  const filteredServices = services.filter(service => {
    if (activeCategory !== 'all' && service.category !== activeCategory) return false;
    if (selectedCountry !== 'all' && !service.countries.includes(selectedCountry)) return false;
    return true;
  });

  const featuredServices = services.filter(service => service.featured);

  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  const handleRequestService = (service: Service) => {
    // Simular ação de solicitar serviço
    alert(`Solicitação enviada para: ${service.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Nossos Serviços</h1>
          <p className="text-xl mb-4 opacity-90">
            Conectando Angola 🇦🇴 Namíbia 🇳🇦 África do Sul 🇿🇦
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto mb-8">
            Oferecemos soluções integradas e personalizadas para impulsionar a cooperação 
            e o desenvolvimento sustentável na região da África Austral.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="text-2xl">🤝</span>
              <p className="text-sm">Cooperação Regional</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="text-2xl">🚀</span>
              <p className="text-sm">Inovação Africana</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="text-2xl">🌱</span>
              <p className="text-sm">Desenvolvimento Sustentável</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        
        {/* Serviços em Destaque */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span>⭐</span>
              Serviços em Destaque
            </h2>
            <p className="text-lg text-gray-600">Soluções que estão transformando a região</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                {/* Imagem */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      ⭐ Destaque
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-lg">
                      {service.icon}
                    </span>
                  </div>
                </div>
                
                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.countries.map((country, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {getCountryFlag(country)} {country}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-green-600">{service.price}</span>
                    <span className="text-sm text-gray-500">{service.duration}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Ver Detalhes
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filtros por Categoria */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Todos os Serviços</h2>
            <p className="text-lg text-gray-600">Explore por categoria ou país</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="all">🌍 Todos os Países</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {getCountryFlag(country)} {country}
                </option>
              ))}
            </select>
          </div>

          {/* Grid de Serviços */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="md:flex">
                  {/* Imagem lateral */}
                  <div className="md:w-64 h-48 md:h-auto">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-2xl">{service.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {service.countries.map((country, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              {getCountryFlag(country)} {country}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-500">Investimento</p>
                            <p className="font-semibold text-green-600">{service.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Duração</p>
                            <p className="font-semibold text-gray-900">{service.duration}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedService(service)}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Ver Detalhes
                          </button>
                          <button 
                            onClick={() => handleRequestService(service)}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                          >
                            Solicitar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span>💬</span>
              O que Dizem Nossos Clientes
            </h2>
            <p className="text-lg text-gray-600">Histórias de sucesso da cooperação regional</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">
                      {getCountryFlag(testimonial.country)} {testimonial.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                
                <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium inline-block">
                  {testimonial.service}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal de Detalhes do Serviço */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedService.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedService.title}</h2>
                      <div className="flex gap-2 mt-1">
                        {selectedService.countries.map((country, index) => (
                          <span key={index} className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full text-xs">
                            {getCountryFlag(country)} {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Descrição Completa</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{selectedService.description}</p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Funcionalidades Incluídas</h3>
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Benefícios</h3>
                    <div className="space-y-2">
                      {selectedService.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-blue-500">🎯</span>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Informações do Serviço</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Investimento</p>
                          <p className="text-2xl font-bold text-green-600">{selectedService.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Duração</p>
                          <p className="text-xl font-bold text-gray-900">{selectedService.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Disponível em</p>
                          <div className="flex gap-2">
                            {selectedService.countries.map((country, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {getCountryFlag(country)} {country}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-4">Parceiros e Provedores</h3>
                    <div className="space-y-2 mb-6">
                      {selectedService.providers.map((provider, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg">
                          <span className="text-red-500">🏢</span>
                          <span className="text-gray-700">{provider}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-4">Requisitos</h3>
                    <div className="space-y-2 mb-6">
                      {selectedService.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-orange-500">📋</span>
                          <span className="text-gray-700 text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedService(null)}
                        className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Fechar
                      </button>
                      <button
                        onClick={() => {
                          handleRequestService(selectedService);
                          setSelectedService(null);
                        }}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        🚀 Solicitar Serviço
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção de Vantagens */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span>🎯</span>
              Por que Escolher Africa's Hands?
            </h2>
            <p className="text-lg text-gray-600">Vantagens competitivas da nossa abordagem regional</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cobertura Regional</h3>
              <p className="text-gray-600">
                Presença física em Angola, Namíbia e África do Sul com equipes locais especializadas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Implementação Rápida</h3>
              <p className="text-gray-600">
                Metodologias ágeis e infraestrutura pronta para deployment imediato dos serviços.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Parcerias Estratégicas</h3>
              <p className="text-gray-600">
                Rede estabelecida com universidades, hospitais e empresas líderes da região.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resultados Comprovados</h3>
              <p className="text-gray-600">
                Track record de sucesso com mais de 100 projetos implementados na região SADC.
              </p>
            </div>
          </div>
        </section>

        {/* Processo de Contratação */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span>🔄</span>
              Como Funciona?
            </h2>
            <p className="text-lg text-gray-600">Processo simples e transparente para começar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📞 Contato Inicial</h3>
              <p className="text-gray-600 text-sm">
                Entre em contato conosco através do formulário, telefone ou e-mail para discutir suas necessidades.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🔍 Análise e Proposta</h3>
              <p className="text-gray-600 text-sm">
                Nossa equipe analisa seus requisitos e desenvolve uma proposta personalizada com cronograma e custos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 Assinatura e Kickoff</h3>
              <p className="text-gray-600 text-sm">
                Após aprovação, formalizamos o contrato e iniciamos o projeto com reunião de kickoff.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Implementação</h3>
              <p className="text-gray-600 text-sm">
                Executamos o projeto com comunicação constante e entregas incrementais até a conclusão.
              </p>
            </div>
          </div>
        </section>

        {/* Seção de FAQ */}
        <section className="bg-gray-50 rounded-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span>❓</span>
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600">Esclarecimentos sobre nossos serviços</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">💰 Como são calculados os preços?</h3>
                <p className="text-gray-600 text-sm">
                  Os preços variam conforme complexidade, duração e países envolvidos. 
                  Oferecemos orçamentos personalizados após análise das necessidades específicas.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🌍 Atendem outros países da SADC?</h3>
                <p className="text-gray-600 text-sm">
                  Nosso foco principal é Angola, Namíbia e África do Sul, mas podemos 
                  expandir para outros países da SADC através de parcerias estratégicas.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">📋 Quais documentos são necessários?</h3>
                <p className="text-gray-600 text-sm">
                  Varia por serviço, mas geralmente incluem: registro empresarial, 
                  licenças profissionais, passaportes válidos e documentação específica do setor.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">⏱️ Qual o tempo de implementação?</h3>
                <p className="text-gray-600 text-sm">
                  Varia de 1 semana (serviços simples) até 18 meses (projetos complexos). 
                  Fornecemos cronograma detalhado na proposta inicial.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🛡️ Há garantias nos serviços?</h3>
                <p className="text-gray-600 text-sm">
                  Sim! Oferecemos garantia de qualidade e suporte pós-implementação 
                  por período determinado, conforme especificado em cada serviço.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">📞 Como funciona o suporte?</h3>
                <p className="text-gray-600 text-sm">
                  Suporte 24/7 via e-mail e WhatsApp, com atendimento presencial 
                  em horário comercial nos escritórios dos três países.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Pronto para Transformar sua Visão em Realidade?</h2>
          <p className="text-red-100 mb-8 max-w-3xl mx-auto text-lg">
            Nossa equipe de especialistas está pronta para desenvolver soluções personalizadas 
            que conectem sua organização com toda a região da África Austral.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold mb-2">Crescimento Sustentável</h3>
              <p className="text-sm text-red-100">Soluções que escalam com seu negócio</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">Resultados Mensuráveis</h3>
              <p className="text-sm text-red-100">KPIs claros e impacto comprovado</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Parceria de Longo Prazo</h3>
              <p className="text-sm text-red-100">Relacionamento duradouro e confiável</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors text-lg">
              💬 Falar com Especialista
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-colors text-lg">
              📋 Solicitar Proposta Personalizada
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-red-200 text-sm mb-2">
              ⚡ Primeira consulta gratuita • 📞 Resposta em 24h • 🌍 Presença regional
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <span className="flex items-center gap-2">
                🇦🇴 Angola: +244 924 166 401
              </span>
              <span className="flex items-center gap-2">
                
              </span>
              <span className="flex items-center gap-2">
                📧 escritorioestevesemultisservic@gmail.com
              </span>
            </div>
          </div>
        </section>

        {/* Desenvolvedor e Créditos */}
        <section className="text-center bg-gray-100 rounded-xl p-6">
          <p className="text-gray-600 mb-2">
            <strong>Desenvolvido por:</strong> Valdimir Jacinto Esteves
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Africa's Hands - Escritório Esteves. Conectando a África Austral através da inovação.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ServicesAfricasHands;