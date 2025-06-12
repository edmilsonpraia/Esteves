import React, { useState } from 'react';

interface ProjectFormData {
  name: string;
  client: string;
  country: string;
  sector: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  deliverables: string[];
  objectives: string[];
  teamMembers: TeamMemberForm[];
  risks: RiskForm[];
  milestones: MilestoneForm[];
  requirements: string;
  expectedOutcomes: string;
  stakeholders: string[];
  communicationPlan: string;
}

interface TeamMemberForm {
  name: string;
  role: string;
  email: string;
  country: string;
  expertise: string;
}

interface RiskForm {
  description: string;
  level: 'low' | 'medium' | 'high';
  mitigation: string;
  probability: number;
  impact: number;
}

interface MilestoneForm {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

const CreateProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    client: '',
    country: '',
    sector: '',
    description: '',
    budget: 0,
    startDate: '',
    endDate: '',
    priority: 'medium',
    deliverables: [''],
    objectives: [''],
    teamMembers: [{
      name: '',
      role: '',
      email: '',
      country: '',
      expertise: ''
    }],
    risks: [{
      description: '',
      level: 'medium',
      mitigation: '',
      probability: 50,
      impact: 50
    }],
    milestones: [{
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    }],
    requirements: '',
    expectedOutcomes: '',
    stakeholders: [''],
    communicationPlan: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = ['Angola', 'Namíbia', 'África do Sul'];
  const sectors = ['Saúde', 'Educação', 'Turismo', 'Comércio', 'Transporte', 'Tecnologia'];
  const priorities = [
    { value: 'low', label: 'Baixa', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Média', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Crítica', color: 'bg-red-100 text-red-800' }
  ];

  const steps = [
    { id: 1, title: 'Informações Básicas', icon: '📋', description: 'Dados principais do projeto' },
    { id: 2, title: 'Planejamento', icon: '📅', description: 'Cronograma e objetivos' },
    { id: 3, title: 'Equipe & Recursos', icon: '👥', description: 'Membros e orçamento' },
    { id: 4, title: 'Riscos & Marcos', icon: '⚠️', description: 'Gestão de riscos e milestones' },
    { id: 5, title: 'Revisão & Envio', icon: '✅', description: 'Confirmar e criar projeto' }
  ];

  // Helper functions
  const getCountryFlag = (country: string) => {
    const flags = {
      'Angola': '🇦🇴',
      'Namíbia': '🇳🇦',
      'África do Sul': '🇿🇦'
    };
    return flags[country as keyof typeof flags] || '🌍';
  };

  const getSectorIcon = (sector: string) => {
    const icons = {
      'Saúde': '🏥',
      'Educação': '🎓',
      'Turismo': '🏨',
      'Comércio': '🛒',
      'Transporte': '✈️',
      'Tecnologia': '💻'
    };
    return icons[sector as keyof typeof icons] || '💼';
  };

  // Form validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Nome do projeto é obrigatório';
        if (!formData.client.trim()) newErrors.client = 'Cliente é obrigatório';
        if (!formData.country) newErrors.country = 'País é obrigatório';
        if (!formData.sector) newErrors.sector = 'Setor é obrigatório';
        if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
        break;
      case 2:
        if (!formData.startDate) newErrors.startDate = 'Data de início é obrigatória';
        if (!formData.endDate) newErrors.endDate = 'Data de término é obrigatória';
        if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
          newErrors.endDate = 'Data de término deve ser posterior à data de início';
        }
        if (formData.budget <= 0) newErrors.budget = 'Orçamento deve ser maior que zero';
        break;
      case 3:
        if (formData.teamMembers.some(member => !member.name.trim() || !member.role.trim() || !member.email.trim())) {
          newErrors.teamMembers = 'Todos os campos dos membros da equipe são obrigatórios';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Array manipulation functions
  const addArrayItem = (field: keyof ProjectFormData, defaultValue: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), defaultValue]
    }));
  };

  const removeArrayItem = (field: keyof ProjectFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: keyof ProjectFormData, index: number, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => i === index ? value : item)
    }));
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simular criação do projeto
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setTimeout(() => {
        // Redirecionar para a lista de projetos
        window.location.href = '/admin/projects';
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProjectScore = () => {
    let score = 0;
    let maxScore = 0;

    // Informações básicas (30 pontos)
    maxScore += 30;
    if (formData.name.trim()) score += 5;
    if (formData.client.trim()) score += 5;
    if (formData.country) score += 5;
    if (formData.sector) score += 5;
    if (formData.description.trim()) score += 10;

    // Planejamento (25 pontos)
    maxScore += 25;
    if (formData.startDate) score += 5;
    if (formData.endDate) score += 5;
    if (formData.budget > 0) score += 5;
    if (formData.objectives.some(obj => obj.trim())) score += 10;

    // Equipe (20 pontos)
    maxScore += 20;
    if (formData.teamMembers.some(member => member.name.trim())) score += 20;

    // Riscos e marcos (15 pontos)
    maxScore += 15;
    if (formData.risks.some(risk => risk.description.trim())) score += 7;
    if (formData.milestones.some(milestone => milestone.title.trim())) score += 8;

    // Extras (10 pontos)
    maxScore += 10;
    if (formData.requirements.trim()) score += 3;
    if (formData.expectedOutcomes.trim()) score += 3;
    if (formData.communicationPlan.trim()) score += 4;

    return Math.round((score / maxScore) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Projeto Regional</h1>
          <p className="text-lg text-gray-600">Desenvolva soluções inovadoras para Angola 🇦🇴 Namíbia 🇳🇦 África do Sul 🇿🇦</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <span className="text-xl">{step.icon}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-4 ${
                    currentStep > step.id ? 'bg-red-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎉</div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Projeto Criado com Sucesso!</h3>
                <p className="text-green-700">Seu projeto "{formData.name}" foi criado e está sendo processado.</p>
                <p className="text-sm text-green-600 mt-1">Redirecionando para a lista de projetos...</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
          {/* Step 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Projeto *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Sistema de Telemedicina Regional"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente/Organização *
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.client ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Hospital Central de Luanda"
                  />
                  {errors.client && <p className="text-red-600 text-sm mt-1">{errors.client}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País Principal *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.country ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecione o país</option>
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {getCountryFlag(country)} {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Setor *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.sector ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecione o setor</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>
                        {getSectorIcon(sector)} {sector}
                      </option>
                    ))}
                  </select>
                  {errors.sector && <p className="text-red-600 text-sm mt-1">{errors.sector}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridade do Projeto
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {priorities.map(priority => (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority: priority.value as any })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.priority === priority.value
                            ? `${priority.color} border-current`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium">{priority.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição do Projeto *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Descreva os objetivos, escopo e benefícios esperados do projeto..."
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.description.length}/500 caracteres
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Planejamento */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.startDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Término *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.endDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orçamento (USD) *
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    min="0"
                    step="1000"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.budget ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="50000"
                  />
                  {errors.budget && <p className="text-red-600 text-sm mt-1">{errors.budget}</p>}
                </div>
              </div>

              {/* Duration calculation */}
              {formData.startDate && formData.endDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">📅</span>
                    <span className="text-blue-800 font-medium">
                      Duração: {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} dias
                    </span>
                  </div>
                </div>
              )}

              {/* Objectives */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Objetivos do Projeto
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('objectives', '')}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    + Adicionar Objetivo
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => updateArrayItem('objectives', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ex: Melhorar o acesso à saúde em áreas rurais"
                      />
                      {formData.objectives.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('objectives', index)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Principais Entregas
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('deliverables', '')}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    + Adicionar Entrega
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={deliverable}
                        onChange={(e) => updateArrayItem('deliverables', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ex: Aplicativo móvel para consultas"
                      />
                      {formData.deliverables.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('deliverables', index)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Equipe & Recursos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Equipe do Projeto</h3>
                  <button
                    type="button"
                    onClick={() => addArrayItem('teamMembers', {
                      name: '', role: '', email: '', country: '', expertise: ''
                    })}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    + Adicionar Membro
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Membro {index + 1}</h4>
                        {formData.teamMembers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('teamMembers', index)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateArrayItem('teamMembers', index, { ...member, name: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Nome completo"
                        />
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => updateArrayItem('teamMembers', index, { ...member, role: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Cargo/Função"
                        />
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => updateArrayItem('teamMembers', index, { ...member, email: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="E-mail"
                        />
                        <select
                          value={member.country}
                          onChange={(e) => updateArrayItem('teamMembers', index, { ...member, country: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="">Selecione o país</option>
                          {countries.map(country => (
                            <option key={country} value={country}>
                              {getCountryFlag(country)} {country}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={member.expertise}
                          onChange={(e) => updateArrayItem('teamMembers', index, { ...member, expertise: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:col-span-2"
                          placeholder="Área de especialidade"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {errors.teamMembers && <p className="text-red-600 text-sm mt-1">{errors.teamMembers}</p>}
              </div>

              {/* Stakeholders */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Stakeholders Principais
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('stakeholders', '')}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    + Adicionar Stakeholder
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.stakeholders.map((stakeholder, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={stakeholder}
                        onChange={(e) => updateArrayItem('stakeholders', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ex: Ministério da Saúde de Angola"
                      />
                      {formData.stakeholders.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('stakeholders', index)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Breakdown */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Resumo Orçamentário</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Orçamento Total</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${formData.budget.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Por Membro da Equipe</p>
                    <p className="text-xl font-bold text-gray-700">
                      ${formData.budget > 0 && formData.teamMembers.length > 0 
                        ? (formData.budget / formData.teamMembers.length).toLocaleString()
                        : '0'
                      }
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Duração (meses)</p>
                    <p className="text-xl font-bold text-gray-700">
                      {formData.startDate && formData.endDate
                        ? Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
                        : '0'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Riscos & Marcos */}
          {currentStep === 4 && (
            <div className="space-y-8">
              {/* Risks Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gestão de Riscos</h3>
                  <button
                    type="button"
                    onClick={() => addArrayItem('risks', {
                      description: '', level: 'medium', mitigation: '', probability: 50, impact: 50
                    })}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    + Adicionar Risco
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.risks.map((risk, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Risco {index + 1}</h4>
                        {formData.risks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('risks', index)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={risk.description}
                          onChange={(e) => updateArrayItem('risks', index, { ...risk, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Descrição do risco"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <select
                            value={risk.level}
                            onChange={(e) => updateArrayItem('risks', index, { ...risk, level: e.target.value as any })}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="low">🟢 Baixo</option>
                            <option value="medium">🟡 Médio</option>
                            <option value="high">🔴 Alto</option>
                          </select>
                          
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Probabilidade (%)</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={risk.probability}
                              onChange={(e) => updateArrayItem('risks', index, { ...risk, probability: Number(e.target.value) })}
                              className="w-full"
                            />
                            <span className="text-xs text-gray-500">{risk.probability}%</span>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Impacto (%)</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={risk.impact}
                              onChange={(e) => updateArrayItem('risks', index, { ...risk, impact: Number(e.target.value) })}
                              className="w-full"
                            />
                            <span className="text-xs text-gray-500">{risk.impact}%</span>
                          </div>
                        </div>
                        
                        <textarea
                          value={risk.mitigation}
                          onChange={(e) => updateArrayItem('risks', index, { ...risk, mitigation: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          rows={2}
                          placeholder="Plano de mitigação"
                        />
                        
                        <div className="bg-white p-2 rounded border">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Score de Risco:</span>
                            <span className={`font-bold ${
                              (risk.probability * risk.impact / 100) > 70 ? 'text-red-600' :
                              (risk.probability * risk.impact / 100) > 40 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {(risk.probability * risk.impact / 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Marcos do Projeto</h3>
                  <button
                    type="button"
                    onClick={() => addArrayItem('milestones', {
                      title: '', description: '', dueDate: '', priority: 'medium'
                    })}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    + Adicionar Marco
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.milestones.map((milestone, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Marco {index + 1}</h4>
                        {formData.milestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('milestones', index)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) => updateArrayItem('milestones', index, { ...milestone, title: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Título do marco"
                        />
                        <input
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) => updateArrayItem('milestones', index, { ...milestone, dueDate: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      
                      <textarea
                        value={milestone.description}
                        onChange={(e) => updateArrayItem('milestones', index, { ...milestone, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-3"
                        rows={2}
                        placeholder="Descrição do marco"
                      />
                      
                      <select
                        value={milestone.priority}
                        onChange={(e) => updateArrayItem('milestones', index, { ...milestone, priority: e.target.value as any })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="low">Baixa Prioridade</option>
                        <option value="medium">Média Prioridade</option>
                        <option value="high">Alta Prioridade</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Revisão & Envio */}
          {currentStep === 5 && (
            <div className="space-y-8">
              {/* Project Score */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Score de Completude do Projeto</h3>
                  <div className="text-4xl font-bold text-red-600 mb-2">{calculateProjectScore()}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProjectScore()}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600">
                    {calculateProjectScore() >= 80 ? '🎉 Excelente! Projeto bem estruturado.' :
                     calculateProjectScore() >= 60 ? '✅ Bom! Algumas informações podem ser melhoradas.' :
                     '⚠️ Projeto precisa de mais detalhes para melhor avaliação.'}
                  </p>
                </div>
              </div>

              {/* Project Summary */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Resumo do Projeto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Informações Básicas</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nome:</span>
                        <span className="font-medium">{formData.name || 'Não informado'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cliente:</span>
                        <span className="font-medium">{formData.client || 'Não informado'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">País:</span>
                        <span className="font-medium">
                          {formData.country ? `${getCountryFlag(formData.country)} ${formData.country}` : 'Não informado'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Setor:</span>
                        <span className="font-medium">
                          {formData.sector ? `${getSectorIcon(formData.sector)} ${formData.sector}` : 'Não informado'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Prioridade:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          priorities.find(p => p.value === formData.priority)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {priorities.find(p => p.value === formData.priority)?.label || 'Não informado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Cronograma & Orçamento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Início:</span>
                        <span className="font-medium">
                          {formData.startDate ? new Date(formData.startDate).toLocaleDateString('pt-BR') : 'Não informado'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Término:</span>
                        <span className="font-medium">
                          {formData.endDate ? new Date(formData.endDate).toLocaleDateString('pt-BR') : 'Não informado'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duração:</span>
                        <span className="font-medium">
                          {formData.startDate && formData.endDate
                            ? `${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} dias`
                            : 'Não calculado'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Orçamento:</span>
                        <span className="font-medium text-green-600">
                          ${formData.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Summary */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Equipe ({formData.teamMembers.filter(m => m.name.trim()).length} membros)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.teamMembers.filter(member => member.name.trim()).map((member, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                        <div className="text-xs text-gray-500">
                          {member.country && `${getCountryFlag(member.country)} ${member.country}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks Summary */}
                {formData.risks.some(risk => risk.description.trim()) && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Principais Riscos</h4>
                    <div className="space-y-2">
                      {formData.risks.filter(risk => risk.description.trim()).map((risk, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            risk.level === 'high' ? 'bg-red-100 text-red-800' :
                            risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {risk.level === 'high' ? 'Alto' : risk.level === 'medium' ? 'Médio' : 'Baixo'}
                          </span>
                          <span className="text-sm text-gray-700">{risk.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milestones Summary */}
                {formData.milestones.some(milestone => milestone.title.trim()) && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Marcos Principais</h4>
                    <div className="space-y-2">
                      {formData.milestones.filter(milestone => milestone.title.trim()).map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium text-gray-900">{milestone.title}</span>
                          <span className="text-xs text-gray-500">
                            {milestone.dueDate && new Date(milestone.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requisitos Técnicos
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Descreva os requisitos técnicos, infraestrutura necessária, tecnologias..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resultados Esperados
                  </label>
                  <textarea
                    value={formData.expectedOutcomes}
                    onChange={(e) => setFormData({ ...formData, expectedOutcomes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Quais os resultados e impactos esperados com este projeto..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plano de Comunicação
                  </label>
                  <textarea
                    value={formData.communicationPlan}
                    onChange={(e) => setFormData({ ...formData, communicationPlan: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Como será a comunicação entre equipe, stakeholders e clientes..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ← Anterior
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Passo {currentStep} de {steps.length}
              </span>
            </div>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Próximo →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Criando Projeto...
                  </>
                ) : (
                  <>
                    🚀 Criar Projeto
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Salvamento automático ativo • Dados protegidos por criptografia
          </p>
          <div className="flex justify-center gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentStep >= step.id ? 'bg-red-600' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center bg-gray-100 rounded-xl p-6">
          <p className="text-gray-600 mb-2">
            <strong>Desenvolvido por:</strong> Valdimir Jacinto Esteves
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Africa's Hands • Conectando Angola, Namíbia e África do Sul
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;