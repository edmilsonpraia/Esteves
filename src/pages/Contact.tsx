import React, { useState } from 'react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  country: string;
  sector: string;
  organization: string;
  subject: string;
  message: string;
  preferredContact: string;
}

const ContactAfricasHands: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    country: '',
    sector: '',
    organization: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const countries = ['Angola', 'Namíbia', 'África do Sul', 'Outro'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia', 'Governo', 'ONGs', 'Outro'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      sector: '',
      organization: '',
      subject: '',
      message: '',
      preferredContact: 'email'
    });

    // Esconder mensagem de sucesso após 5 segundos
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const contactInfo = [
    {
      type: 'phone',
      label: 'Angola',
      value: '+244 924 166 401',
      country: 'Angola',
      city: 'Cunene / Lubango',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      icon: '📞'
    },
    {
      type: 'phone',
      label: 'Namíbia',
      value: '+264 817 049 40',
      country: 'Namíbia',
      city: 'Oshakati',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=200&fit=crop',
      icon: '📞'
    },
    {
      type: 'email',
      label: 'E-mail Regional',
      value: 'contato@africashands.com',
      country: 'África Austral',
      city: 'Atendimento 24/7',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=200&fit=crop',
      icon: '✉️'
    }
  ];

  const officeLocations = [
    {
      country: 'Angola',
      flag: '🇦🇴',
      offices: [
        {
          city: 'Cunene',
          type: 'Escritório Principal',
          address: 'Rua Principal, Centro',
          phone: '+244 924 166 401',
          email: 'cunene@africashands.com',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop',
          specialties: ['Saúde', 'Educação', 'Agricultura']
        },
        {
          city: 'Lubango',
          type: 'Filial Regional',
          address: 'Av. Norton de Matos',
          phone: '+244 924 166 401',
          email: 'lubango@africashands.com',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
          specialties: ['Turismo', 'Comércio', 'Tecnologia']
        }
      ]
    },
    {
      country: 'Namíbia',
      flag: '🇳🇦',
      offices: [
        {
          city: 'Oshakati',
          type: 'Escritório Regional',
          address: 'Main Street, CBD',
          phone: '+264 817 049 40',
          email: 'oshakati@africashands.com',
          image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=300&h=200&fit=crop',
          specialties: ['Mineração', 'Turismo', 'Sustentabilidade']
        },
        {
          city: 'Windhoek',
          type: 'Centro de Parcerias',
          address: 'Independence Avenue',
          phone: '+264 817 049 40',
          email: 'windhoek@africashands.com',
          image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop',
          specialties: ['Governo', 'Educação', 'Inovação']
        }
      ]
    },
    {
      country: 'África do Sul',
      flag: '🇿🇦',
      offices: [
        {
          city: 'Cidade do Cabo',
          type: 'Hub de Inovação',
          address: 'V&A Waterfront',
          phone: '+27 21 XXX XXXX',
          email: 'capetown@africashands.com',
          image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=300&h=200&fit=crop',
          specialties: ['Tecnologia', 'Startups', 'Financeiro']
        },
        {
          city: 'Joanesburgo',
          type: 'Centro de Negócios',
          address: 'Sandton City',
          phone: '+27 11 XXX XXXX',
          email: 'johannesburg@africashands.com',
          image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=300&h=200&fit=crop',
          specialties: ['Corporativo', 'Mineração', 'Logística']
        }
      ]
    }
  ];

  const teamMembers = [
    {
      name: 'Valdimir Jacinto Esteves',
      role: 'Fundador & CEO',
      country: 'Angola',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'valdimir@africashands.com',
      specialties: ['Visão Estratégica', 'Desenvolvimento Regional', 'Parcerias Internacionais']
    },
    {
      name: 'Dr. Maria Santos',
      role: 'Diretora de Saúde Regional',
      country: 'África do Sul',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=150&h=150&fit=crop&crop=face',
      email: 'maria.santos@africashands.com',
      specialties: ['Telemedicina', 'Políticas de Saúde', 'Cooperação Médica']
    },
    {
      name: 'Prof. John Kazembe',
      role: 'Diretor de Educação',
      country: 'Namíbia',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'john.kazembe@africashands.com',
      specialties: ['Intercâmbio Acadêmico', 'Pesquisa', 'Desenvolvimento Educacional']
    }
  ];

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
          <h1 className="text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-xl mb-4 opacity-90">
            Conectando Angola 🇦🇴 Namíbia 🇳🇦 África do Sul 🇿🇦
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Estamos aqui para ajudar você a explorar oportunidades, construir parcerias 
            e fazer parte da revolução digital da África Austral.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        
        {/* Informações de Contato Principais */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fale Conosco</h2>
            <p className="text-lg text-gray-600">Escolha a melhor forma de entrar em contato</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={info.image}
                    alt={info.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{info.label}</h3>
                  <p className="text-gray-600 mb-1">{info.country}</p>
                  <p className="text-sm text-gray-500 mb-4">{info.city}</p>
                  <p className="text-lg font-semibold text-red-600 mb-4">{info.value}</p>
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
                    {info.type === 'phone' ? '📞 Ligar Agora' : '✉️ Enviar E-mail'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formulário de Contato e Informações */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>📝</span>
              Envie sua Mensagem
            </h2>
            
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-800 font-medium">Mensagem enviada com sucesso! 🎉</p>
                </div>
                <p className="text-green-700 text-sm mt-1">Entraremos em contato em até 24 horas.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+244 xxx xxx xxx"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    País *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Selecione seu país</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {getCountryFlag(country)} {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                    Setor de Atuação
                  </label>
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Selecione um setor</option>
                    {sectors.map((sector, index) => (
                      <option key={index} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    Organização
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Sua empresa/instituição"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Assunto da sua mensagem"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Descreva detalhadamente sua necessidade, projeto ou pergunta..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forma Preferida de Contato
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    📧 E-mail
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    📞 Telefone
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    💬 WhatsApp
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Informações Adicionais */}
          <div className="space-y-8">
            {/* Horário de Atendimento */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🕒</span>
                Horário de Atendimento
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Segunda - Sexta</span>
                  <span className="font-bold text-green-600">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Sábado</span>
                  <span className="font-bold text-yellow-600">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Domingo</span>
                  <span className="font-bold text-red-600">Fechado</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-blue-700">
                    <strong>🌍 Atendimento 24/7:</strong> E-mail e WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Rápido */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>❓</span>
                Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Qual o prazo para resposta?</h4>
                  <p className="text-sm text-gray-600">Respondemos todas as mensagens em até 24 horas úteis.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Fazem consultoria gratuita?</h4>
                  <p className="text-sm text-gray-600">Sim! Primeira consulta gratuita para avaliar oportunidades.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Atendem em outras cidades?</h4>
                  <p className="text-sm text-gray-600">Sim, atendemos toda a região SADC via parceiros locais.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Como funciona a parceria?</h4>
                  <p className="text-sm text-gray-600">Avaliamos sua proposta e conectamos com oportunidades relevantes.</p>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🌐</span>
                Siga-nos nas Redes Sociais
              </h3>
              <p className="text-red-100 mb-4">Fique por dentro das novidades e oportunidades</p>
              <div className="flex gap-3">
                <button className="bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </button>
                <button className="bg-white bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe Executiva */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span>👥</span>
              Nossa Equipe Executiva
            </h2>
            <p className="text-lg text-gray-600">Líderes experientes conectando a África Austral</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="relative inline-block mb-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-lg">
                    {getCountryFlag(member.country)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{getCountryFlag(member.country)} {member.country}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.specialties.map((specialty, i) => (
                      <span key={i} className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  📧 Contatar Diretamente
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Nossos Escritórios */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span>🏢</span>
              Nossos Escritórios
            </h2>
            <p className="text-lg text-gray-600">Presença física em toda a região da África Austral</p>
          </div>

          {officeLocations.map((location, index) => (
            <div key={index} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{location.flag}</span>
                <h3 className="text-2xl font-bold text-gray-900">{location.country}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {location.offices.map((office, officeIndex) => (
                  <div key={officeIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={office.image}
                        alt={`Escritório ${office.city}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{office.city}</h4>
                          <p className="text-red-600 font-medium text-sm">{office.type}</p>
                        </div>
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                          {location.flag}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>📍</span>
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>📞</span>
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>✉️</span>
                          <span>{office.email}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Especialidades:</p>
                        <div className="flex flex-wrap gap-2">
                          {office.specialties.map((specialty, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                          📞 Ligar
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                          📧 E-mail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Mapa e Localização */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
            <span>🗺️</span>
            Nossa Presença Regional
          </h2>
          
          {/* Placeholder para Mapa Interativo */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 flex items-center justify-center mb-8 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Mapa Interativo da África Austral</h3>
              <p className="text-gray-500 mb-4">Localização dos nossos escritórios e parceiros</p>
              <div className="flex justify-center space-x-8 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  🇦🇴 Angola (2 escritórios)
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  🇳🇦 Namíbia (2 escritórios)
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  🇿🇦 África do Sul (2 escritórios)
                </span>
              </div>
            </div>
          </div>

          {/* Estatísticas de Cobertura */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">6</div>
              <div className="text-sm text-gray-600">Escritórios</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Países</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">95M+</div>
              <div className="text-sm text-gray-600">População Atendida</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Suporte Online</div>
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Pronto para Começar sua Jornada?</h2>
          <p className="text-red-100 mb-8 max-w-3xl mx-auto text-lg">
            Nossa equipe está pronta para transformar suas ideias em oportunidades reais. 
            Conecte-se conosco e faça parte da revolução digital da África Austral!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold mb-2">Resposta Rápida</h3>
              <p className="text-sm text-red-100">Retorno em até 24h para todas as consultas</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">Consultoria Especializada</h3>
              <p className="text-sm text-red-100">Experts em cooperação regional africana</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-bold mb-2">Rede Regional</h3>
              <p className="text-sm text-red-100">Conexões em Angola, Namíbia e África do Sul</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors text-lg">
              💬 Iniciar Conversa
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-colors text-lg">
              📅 Agendar Reunião
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-colors text-lg">
              📋 Solicitar Proposta
            </button>
          </div>
        </section>

        {/* Informações Legais e Desenvolvedor */}
        <section className="bg-gray-100 rounded-xl p-8 text-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Africa's Hands</h3>
            <p className="text-gray-600">Conectando a África Austral através da tecnologia e cooperação</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🏢 Empresa</h4>
              <p className="text-sm text-gray-600">Escritório Esteves</p>
              <p className="text-sm text-gray-600">Reg. Comercial: AO123456789</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📍 Sede Principal</h4>
              <p className="text-sm text-gray-600">Cunene, Angola</p>
              <p className="text-sm text-gray-600">Província do Cunene</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">⚖️ Legal</h4>
              <p className="text-sm text-gray-600">Política de Privacidade</p>
              <p className="text-sm text-gray-600">Termos de Uso</p>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Desenvolvido por:</strong> Valdimir Jacinto Esteves
            </p>
            <p className="text-xs text-gray-500">
              © 2024 Africa's Hands. Todos os direitos reservados. 
              Plataforma regional de cooperação e desenvolvimento.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactAfricasHands;