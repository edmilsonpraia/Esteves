import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface OpportunityForm {
  title: string;
  description: string;
  country: string;
  sector: string;
  type: 'project' | 'partnership' | 'funding' | 'education';
  organization: string;
  location: string;
  budget: string;
  deadline: string;
  requirements: string[];
  featured: boolean;
  image: File | null;
  imageUrl: string;
}

const CreateProject: React.FC = () => {
  const [formData, setFormData] = useState<OpportunityForm>({
    title: '',
    description: '',
    country: '',
    sector: '',
    type: 'project',
    organization: '',
    location: '',
    budget: '',
    deadline: '',
    requirements: [''],
    featured: false,
    image: null,
    imageUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();

  // ✅ VERIFICAÇÃO ROBUSTA DE ADMIN
  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setCheckingAuth(false);
        return;
      }

      console.log('🔍 Verificando permissões para:', user.email);

      try {
        // ✅ PRIMEIRO: Verificar por email (mais confiável)
        const roleFromEmail = determineRoleFromEmail(user.email);
        
        if (roleFromEmail === 'admin') {
          setIsAuthorized(true);
          setUserProfile({
            full_name: user.name || user.email?.split('@')[0] || 'Admin',
            organization: 'Africa\'s Hands',
            role: 'admin'
          });
          console.log('✅ Admin autorizado por email:', user.email);
          setCheckingAuth(false);
          return;
        }

        // ✅ SEGUNDO: Tentar verificar no banco (com timeout)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 2000);
        });

        const dbPromise = supabase
          .from('profiles')
          .select('role, full_name, name, organization')
          .eq('id', user.id)
          .single();

        const { data, error } = await Promise.race([dbPromise, timeoutPromise]) as any;

        if (!error && data?.role === 'admin') {
          setIsAuthorized(true);
          setUserProfile(data);
          console.log('✅ Admin autorizado por banco:', data);
        } else {
          setIsAuthorized(false);
          console.log('❌ Não é admin ou erro no banco:', error?.message);
        }
      } catch (err) {
        console.warn('⚠️ Erro ao verificar permissões (usando verificação por email):', err);
        
        // ✅ FALLBACK: Verificar por email mesmo com erro no banco
        const roleFromEmail = determineRoleFromEmail(user.email);
        if (roleFromEmail === 'admin') {
          setIsAuthorized(true);
          setUserProfile({
            full_name: user.name || user.email?.split('@')[0] || 'Admin',
            organization: 'Africa\'s Hands',
            role: 'admin'
          });
          console.log('✅ Admin autorizado por email (fallback):', user.email);
        } else {
          setIsAuthorized(false);
        }
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUserRole();
  }, [user]);

  // ✅ FUNÇÃO PARA DETERMINAR ROLE POR EMAIL
  const determineRoleFromEmail = (email: string): 'admin' | 'user' => {
    if (!email) return 'user';
    
    const cleanEmail = email.toLowerCase().trim();
    
    const adminEmails = [
      'admin@gmail.com',
      'admin@africashands.com',
      'edmilsondelfilme45@gmail.com'
    ];
    
    const adminDomains = ['@africashands.com'];
    const adminPatterns = ['admin', 'administrator'];
    
    if (adminEmails.includes(cleanEmail)) return 'admin';
    if (adminDomains.some(domain => cleanEmail.includes(domain))) return 'admin';
    if (adminPatterns.some(pattern => cleanEmail.includes(pattern))) return 'admin';
    
    return 'user';
  };

  // Se ainda está verificando autenticação
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verificando permissões...</h2>
          <p className="text-gray-600">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  // Se não está autorizado (não é admin)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h2>
          <p className="text-gray-600 mb-6">
            Apenas administradores podem criar oportunidades. Você não tem permissão para acessar esta página.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              ← Voltar ao Dashboard
            </button>
            <p className="text-sm text-gray-500">
              Se você acredita que isso é um erro, entre em contato com o administrador do sistema.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">🔍 Informações de Debug:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role detectado por email:</strong> {determineRoleFromEmail(user?.email || '')}</p>
                <p><strong>ID do usuário:</strong> {user?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const countries = [
    { code: 'AO', name: 'Angola', flag: '🇦🇴', cities: ['Luanda', 'Benguela', 'Huíla', 'Cunene'] },
    { code: 'NA', name: 'Namíbia', flag: '🇳🇦', cities: ['Windhoek', 'Swakopmund', 'Oshakati', 'Rundu'] },
    { code: 'ZA', name: 'África do Sul', flag: '🇿🇦', cities: ['Cape Town', 'Johannesburg', 'Durban', 'Pretória'] }
  ];

  const sectors = [
    { name: 'Saúde', icon: '🏥', color: 'green' },
    { name: 'Educação', icon: '🎓', color: 'blue' },
    { name: 'Turismo', icon: '🏨', color: 'orange' },
    { name: 'Comércio', icon: '🛒', color: 'purple' },
    { name: 'Transporte', icon: '✈️', color: 'indigo' },
    { name: 'Tecnologia', icon: '💻', color: 'pink' }
  ];

  const opportunityTypes = [
    { value: 'project', label: 'Projeto', icon: '🚀', desc: 'Projeto específico com metas definidas' },
    { value: 'partnership', label: 'Parceria', icon: '🤝', desc: 'Oportunidade de parceria empresarial' },
    { value: 'funding', label: 'Financiamento', icon: '💰', desc: 'Oportunidade de financiamento ou investimento' },
    { value: 'education', label: 'Educação', icon: '📚', desc: 'Programa educacional ou formação' }
  ];

  const defaultImages = {
    'Saúde': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=200&fit=crop&crop=center',
    'Educação': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop&crop=center',
    'Turismo': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop&crop=center',
    'Comércio': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=200&fit=crop&crop=center',
    'Transporte': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=200&fit=crop&crop=center',
    'Tecnologia': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Auto-definir imagem baseada no setor
      if (name === 'sector' && value && !formData.image && !formData.imageUrl) {
        setFormData(prev => ({
          ...prev,
          imageUrl: defaultImages[value as keyof typeof defaultImages] || ''
        }));
        setPreviewImage(defaultImages[value as keyof typeof defaultImages] || null);
      }
    }
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }
      
      // Validar tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file,
        imageUrl: ''
      }));

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ FUNÇÃO DE UPLOAD CORRIGIDA (SEM STORAGEUTILS)
  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log('📤 Iniciando upload da imagem...');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `opportunity-${Date.now()}.${fileExt}`;
      const filePath = `opportunities/${fileName}`;

      console.log('📁 Upload para:', filePath);

      // ✅ UPLOAD DIRETO PARA O BUCKET
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('❌ Erro no upload:', uploadError);
        throw uploadError;
      }

      console.log('✅ Upload realizado com sucesso');

      // ✅ OBTER URL PÚBLICA
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('🔗 URL pública gerada:', data.publicUrl);
      return data.publicUrl;
      
    } catch (error) {
      console.error('❌ Erro completo no upload:', error);
      throw error;
    }
  };

  // ✅ FUNÇÃO PARA CRIAR OPORTUNIDADE
  const handleSubmit = async () => {
    if (!user) {
      alert('Você precisa estar logado para criar oportunidades.');
      return;
    }

    setLoading(true);
    
    try {
      let imageUrl = formData.imageUrl;
      
      // ✅ UPLOAD DA IMAGEM SE NECESSÁRIO
      if (formData.image) {
        console.log('📤 Fazendo upload da imagem...');
        imageUrl = await uploadImage(formData.image);
      }

      // Filtrar requisitos vazios
      const validRequirements = formData.requirements.filter(req => req.trim() !== '');

      const opportunityData = {
        title: formData.title,
        description: formData.description,
        country: formData.country,
        sector: formData.sector,
        type: formData.type,
        organization: formData.organization,
        location: formData.location,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        deadline: formData.deadline,
        requirements: validRequirements,
        status: 'active',
        featured: formData.featured,
        image: imageUrl,
        created_by: user.id
      };

      console.log('🚀 Criando oportunidade no Supabase...', opportunityData);
      
      // ✅ INSERIR NO BANCO DE DADOS
      const { data, error } = await supabase
        .from('opportunities')
        .insert([opportunityData])
        .select()
        .single();

      if (error) {
        console.error('❌ Erro do Supabase:', error);
        throw error;
      }

      console.log('✅ Oportunidade criada com sucesso:', data.id);
      
      // ✅ MOSTRAR MENSAGEM DE SUCESSO
      setSuccessMessage(`Oportunidade "${data.title}" criada com sucesso! 🎉`);
      
      // Reset form após 4 segundos
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          country: '',
          sector: '',
          type: 'project',
          organization: '',
          location: '',
          budget: '',
          deadline: '',
          requirements: [''],
          featured: false,
          image: null,
          imageUrl: ''
        });
        setPreviewImage(null);
        setStep(1);
        setSuccessMessage(null);
      }, 4000);

    } catch (error: any) {
      console.error('❌ Erro ao criar oportunidade:', error);
      
      // ✅ MENSAGENS DE ERRO MAIS ESPECÍFICAS
      let errorMessage = 'Erro ao criar oportunidade. Tente novamente.';
      
      if (error.message?.includes('Bucket not found')) {
        errorMessage = 'Erro no upload da imagem. Tente usar uma imagem padrão do setor.';
      } else if (error.message?.includes('policies')) {
        errorMessage = 'Erro de permissão. Verifique se você tem acesso de administrador.';
      } else if (error.message) {
        errorMessage = `Erro: ${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedCountry = () => {
    return countries.find(c => c.name === formData.country);
  };

  const getSelectedSector = () => {
    return sectors.find(s => s.name === formData.sector);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.country && formData.sector;
      case 2:
        return formData.type && formData.organization && formData.location;
      case 3:
        return formData.deadline && formData.requirements.some(req => req.trim() !== '');
      default:
        return true;
    }
  };

  // ✅ MODAL DE SUCESSO
  if (successMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Sucesso!</h2>
          <p className="text-gray-700 mb-6">{successMessage}</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">📊 Oportunidade Publicada</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>✅ Salva no banco de dados</p>
              <p>✅ Visível para todos os usuários</p>
              <p>✅ Filtros funcionando automaticamente</p>
              <p>✅ Pronta para receber candidaturas</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setSuccessMessage(null)}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              ✨ Criar Nova Oportunidade
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Voltar ao Dashboard
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            🌍 A oportunidade está agora disponível para usuários de Angola, Namíbia e África do Sul!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">🚀 Criar Nova Oportunidade SADC</h1>
            <p className="text-red-100 mt-1">
              Crie oportunidades regionais para Angola, Namíbia e África do Sul
            </p>
          </div>
          
          {/* Admin Info */}
          <div className="text-right">
            <p className="text-sm text-red-100">Admin:</p>
            <p className="font-semibold">{userProfile?.full_name || user?.name || 'Administrador'}</p>
            <p className="text-xs text-red-200">{userProfile?.organization || 'Africa\'s Hands'}</p>
            <div className="flex items-center gap-1 mt-1 justify-end">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-200">Sistema Ativo</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= stepNumber 
                  ? 'bg-white text-red-600' 
                  : 'bg-red-500 text-white border-2 border-red-300'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-12 h-1 mx-2 ${
                  step > stepNumber ? 'bg-white' : 'bg-red-500'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-2 text-sm text-red-100">
          Passo {step} de 4: {
            step === 1 ? 'Informações Básicas' :
            step === 2 ? 'Detalhes da Organização' :
            step === 3 ? 'Requisitos e Cronograma' :
            'Revisão e Publicação'
          }
        </div>
      </div>

      <div className="p-8">
        {/* Passo 1: Informações Básicas */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Informações Básicas</h2>
            </div>

            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Oportunidade *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Programa de Intercâmbio Médico Luanda"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Completa *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Descreva detalhadamente a oportunidade, objetivos, benefícios..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.description.length}/500 caracteres
              </div>
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                País da Oportunidade *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => setFormData(prev => ({ ...prev, country: country.name }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.country === country.name
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{country.flag}</div>
                      <div className="font-semibold text-gray-900">{country.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {country.cities.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Setor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Setor da Oportunidade *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sectors.map((sector) => (
                  <div
                    key={sector.name}
                    onClick={() => setFormData(prev => ({ ...prev, sector: sector.name }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.sector === sector.name
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{sector.icon}</div>
                      <div className="font-medium text-gray-900">{sector.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Passo 2: Detalhes da Organização */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🏢 Detalhes da Organização</h2>
            </div>

            {/* Tipo de Oportunidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de Oportunidade *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunityTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.type === type.value
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{type.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{type.label}</div>
                        <div className="text-sm text-gray-600">{type.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organização */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organização/Empresa *
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Ex: Hospital Geral de Luanda, University of Cape Town"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Localização */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização Específica *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ex: Luanda, Maianga"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
                {getSelectedCountry() && (
                  <select 
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Selecionar cidade</option>
                    {getSelectedCountry()?.cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Orçamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orçamento (USD) - Opcional
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Ex: 50000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                min="0"
                step="1000"
              />
            </div>
          </div>
        )}

        {/* Passo 3: Requisitos e Cronograma */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Requisitos e Cronograma</h2>
            </div>

            {/* Prazo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prazo para Candidaturas *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Requisitos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Requisitos para Candidatos *
              </label>
              <div className="space-y-3">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      placeholder={`Requisito ${index + 1}: Ex: Diploma em Medicina`}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  + Adicionar Requisito
                </button>
              </div>
            </div>

            {/* Upload de Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Imagem da Oportunidade
              </label>
              
              {previewImage && (
                <div className="mb-4">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    📤 Upload Imagem Personalizada
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    if (formData.sector) {
                      const defaultUrl = defaultImages[formData.sector as keyof typeof defaultImages];
                      setFormData(prev => ({ ...prev, imageUrl: defaultUrl, image: null }));
                      setPreviewImage(defaultUrl);
                    }
                  }}
                  disabled={!formData.sector}
                  className="w-full py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                >
                  🎨 Usar Imagem Padrão do Setor
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Formatos aceites: JPG, PNG, GIF. Tamanho máximo: 5MB
              </p>
            </div>
          </div>
        )}

        {/* Passo 4: Revisão */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">✅ Revisão e Publicação</h2>
            </div>

            {/* Preview da Oportunidade */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview da Oportunidade:</h3>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex gap-4">
                  {previewImage && (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{getSelectedCountry()?.flag}</span>
                      <span>{getSelectedSector()?.icon}</span>
                      <h4 className="font-semibold text-gray-900">{formData.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{formData.organization}</p>
                    <p className="text-sm text-gray-600 mb-3">{formData.location}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Ativa
                      </span>
                      {formData.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          ⭐ Destaque
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo dos Dados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Informações Gerais</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>País:</strong> {getSelectedCountry()?.flag} {formData.country}</div>
                  <div><strong>Setor:</strong> {getSelectedSector()?.icon} {formData.sector}</div>
                  <div><strong>Tipo:</strong> {opportunityTypes.find(t => t.value === formData.type)?.label}</div>
                  <div><strong>Organização:</strong> {formData.organization}</div>
                  <div><strong>Localização:</strong> {formData.location}</div>
                  {formData.budget && <div><strong>Orçamento:</strong> ${Number(formData.budget).toLocaleString()} USD</div>}
                  <div><strong>Prazo:</strong> {new Date(formData.deadline).toLocaleDateString('pt-BR')}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Requisitos</h4>
                <ul className="text-sm space-y-1">
                  {formData.requirements.filter(req => req.trim() !== '').map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Opções de Publicação */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Opções de Publicação</h4>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm font-medium">⭐ Marcar como Destaque</span>
                </label>
                <span className="text-xs text-gray-600">(Aparecerá em primeiro lugar no dashboard dos usuários)</span>
              </div>
            </div>
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Voltar
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !isStepValid()}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Publicando...
                  </>
                ) : (
                  <>
                    🚀 Publicar Oportunidade
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;