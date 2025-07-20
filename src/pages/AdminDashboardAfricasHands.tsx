import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Opportunity {
  id: string;
  title: string;
  country: string;
  sector: string;
  type: 'project' | 'partnership' | 'funding' | 'education';
  organization: string;
  deadline: string;
  description: string;
  budget?: number; // ✅ OPCIONAL
  requirements: string[]; // ✅ OBRIGATÓRIO COMO ARRAY
  status: 'active' | 'inactive' | 'expired';
  image: string;
  featured: boolean;
  location?: string; // ✅ OPCIONAL
  created_at: string;
  created_by?: string; // ✅ OPCIONAL - ID do criador
}

interface Application {
  id: string;
  opportunity_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  application_date: string;
  message?: string;
  user_name?: string;
  user_email?: string;
  opportunity?: Opportunity;
}

interface ServiceRequest {
  id: string;
  user_id: string;
  service_type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  user_country?: string;
}

interface Connection {
  id: string;
  user_id: string;
  connected_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  user_name?: string;
  connected_user_name?: string;
}

interface Stats {
  totalOpportunities: number;
  activeOpportunities: number;
  totalApplications: number;
  pendingApplications: number;
  totalServiceRequests: number;
  pendingServiceRequests: number;
  totalConnections: number;
  totalUsers: number;
}

const AdminDashboard: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalOpportunities: 0,
    activeOpportunities: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalServiceRequests: 0,
    pendingServiceRequests: 0,
    totalConnections: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();
  const { user } = useAuth();

  // Carregar dados iniciais
  useEffect(() => {
    // ✅ Teste de conectividade com Supabase
    const testConnection = async () => {
      try {
        console.log('🔍 Testando conexão com Supabase...');
        const { data, error } = await supabase.from('opportunities').select('count', { count: 'exact' });
        if (error) throw error;
        console.log('✅ Conexão com Supabase OK - Oportunidades na base:', data);
      } catch (err) {
        console.error('❌ Erro de conexão com Supabase:', err);
      }
    };

    testConnection();
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadOpportunities(),
        loadApplications(),
        loadServiceRequests(),
        loadConnections()
      ]);
    } catch (err) {
      console.error('Erro ao carregar dados admin:', err);
      setError('Erro ao carregar dados do painel administrativo');
      loadFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const loadOpportunities = async () => {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      // ✅ Garantir que todas as oportunidades tenham a estrutura correta
      const normalizedOpportunities = data.map(opp => ({
        ...opp,
        requirements: opp.requirements || [],
        budget: opp.budget || undefined,
        location: opp.location || '',
        featured: opp.featured || false
      }));
      setOpportunities(normalizedOpportunities);
    } else {
      // Dados de exemplo para demonstração
      setOpportunities([
        {
          id: '1',
          title: 'Programa de Intercâmbio Médico Luanda',
          country: 'Angola',
          sector: 'Saúde',
          type: 'education',
          organization: 'Hospital Geral de Luanda',
          deadline: '2024-08-15',
          description: 'Programa de intercâmbio para médicos especializarem-se em cardiologia e medicina interna.',
          budget: 35000,
          requirements: ['Diploma em Medicina', '2+ anos de experiência', 'Português fluente'],
          status: 'active',
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=200&fit=crop&crop=center',
          location: 'Luanda, Maianga',
          featured: true,
          created_at: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          title: 'Centro de Formação Técnica Benguela',
          country: 'Angola',
          sector: 'Educação',
          type: 'project',
          organization: 'Instituto Técnico de Benguela',
          deadline: '2024-09-10',
          description: 'Projeto para criar centro de formação técnica em mecânica e eletricidade.',
          budget: 80000,
          requirements: ['Experiência em educação técnica', 'Conhecimento local', 'Gestão de projetos'],
          status: 'active',
          image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop&crop=center',
          location: 'Benguela, Centro',
          featured: true,
          created_at: '2024-02-01T00:00:00Z'
        }
      ]);
    }
  };

  const loadApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        opportunity:opportunities(*),
        user:profiles(full_name, email)
      `)
      .order('application_date', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      setApplications(data.map(app => ({
        ...app,
        user_name: app.user?.full_name,
        user_email: app.user?.email
      })));
    } else {
      // Dados de exemplo
      setApplications([
        {
          id: '1',
          opportunity_id: '1',
          user_id: 'user-1',
          status: 'pending',
          application_date: '2024-06-15T10:00:00Z',
          message: 'Tenho grande interesse nesta oportunidade.',
          user_name: 'Dr. João Santos',
          user_email: 'joao.santos@email.com',
          opportunity: opportunities[0]
        },
        {
          id: '2',
          opportunity_id: '2',
          user_id: 'user-2',
          status: 'approved',
          application_date: '2024-06-10T14:30:00Z',
          message: 'Gostaria de participar deste projeto.',
          user_name: 'Eng. Maria Silva',
          user_email: 'maria.silva@email.com',
          opportunity: opportunities[1]
        }
      ]);
    }
  };

  const loadServiceRequests = async () => {
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      setServiceRequests(data);
    } else {
      // Dados de exemplo
      setServiceRequests([
        {
          id: '1',
          user_id: 'user-1',
          service_type: 'Hospitais Regionais',
          name: 'Dr. António Fernandes',
          email: 'antonio@email.com',
          phone: '+244 924 123 456',
          message: 'Preciso de informações sobre hospitais especializados em cardiologia em Luanda.',
          status: 'pending',
          created_at: '2024-06-18T09:15:00Z',
          user_country: 'Angola'
        },
        {
          id: '2',
          user_id: 'user-2',
          service_type: 'Universidades Regionais',
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          phone: '+27 82 987 6543',
          message: 'Interessada em programas de mestrado em medicina na UCT.',
          status: 'processing',
          created_at: '2024-06-17T16:45:00Z',
          user_country: 'África do Sul'
        },
        {
          id: '3',
          user_id: 'user-3',
          service_type: 'Transporte Regional',
          name: 'Carlos Mumbala',
          email: 'carlos@email.com',
          phone: '+264 81 555 0123',
          message: 'Preciso de transporte seguro entre Windhoek e Walvis Bay.',
          status: 'completed',
          created_at: '2024-06-16T11:20:00Z',
          user_country: 'Namíbia'
        }
      ]);
    }
  };

  const loadConnections = async () => {
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (data) setConnections(data);
  };

  const loadFallbackData = () => {
    // Dados de exemplo se não conseguir carregar do Supabase
    console.log('Carregando dados de exemplo...');
  };

  // ✅ NOVA FUNÇÃO: Editar Oportunidade - COM INICIALIZAÇÃO SEGURA
  const handleEditOpportunity = (opportunity: Opportunity) => {
    console.log('✏️ Abrindo modal de edição para:', opportunity.id, opportunity.title);
    console.log('📋 Dados da oportunidade:', opportunity);
    
    // ✅ Criar cópia completa com valores default para evitar undefined
    const opportunityToEdit: Opportunity = {
      ...opportunity,
      budget: opportunity.budget || undefined,
      requirements: opportunity.requirements || [],
      location: opportunity.location || '',
      featured: opportunity.featured || false
    };
    
    console.log('📝 Dados preparados para edição:', opportunityToEdit);
    
    setEditingOpportunity(opportunityToEdit);
    setShowEditModal(true);
  };

  // ✅ NOVA FUNÇÃO: Salvar Edição - CORRIGIDA COM TIPOS
  const handleSaveEdit = async () => {
    if (!editingOpportunity) return;

    try {
      console.log('💾 Tentando salvar edição da oportunidade:', editingOpportunity.id);
      
      // ✅ DADOS SIMPLIFICADOS - com verificação de tipos
      const updateData: any = {
        title: editingOpportunity.title,
        description: editingOpportunity.description,
        country: editingOpportunity.country,
        sector: editingOpportunity.sector,
        type: editingOpportunity.type, // ✅ ADICIONADO
        organization: editingOpportunity.organization,
        location: editingOpportunity.location || '',
        deadline: editingOpportunity.deadline,
        status: editingOpportunity.status,
        featured: editingOpportunity.featured || false
      };

      // ✅ Adicionar budget apenas se existir e for válido
      if (editingOpportunity.budget !== undefined && editingOpportunity.budget !== null && editingOpportunity.budget > 0) {
        updateData.budget = editingOpportunity.budget;
      }

      // ✅ Adicionar requirements apenas se existir e tiver conteúdo
      if (editingOpportunity.requirements && Array.isArray(editingOpportunity.requirements)) {
        const validRequirements = editingOpportunity.requirements.filter(req => 
          req && typeof req === 'string' && req.trim() !== ''
        );
        if (validRequirements.length > 0) {
          updateData.requirements = validRequirements;
        }
      }

      console.log('📤 Dados para atualização:', updateData);

      const { data, error } = await supabase
        .from('opportunities')
        .update(updateData)
        .eq('id', editingOpportunity.id)
        .select()
        .single();

      if (error) {
        console.error('❌ Erro do Supabase ao editar:', error);
        throw error;
      }

      console.log('✅ Oportunidade atualizada no banco:', data);

      // Atualizar lista local com merge de dados
      setOpportunities(prev => prev.map(opp => 
        opp.id === editingOpportunity.id ? { ...opp, ...updateData } : opp
      ));

      setShowEditModal(false);
      setEditingOpportunity(null);
      alert('Oportunidade atualizada com sucesso! ✅');
      
    } catch (err: any) {
      console.error('❌ Erro completo ao editar oportunidade:', err);
      
      let errorMessage = 'Erro ao atualizar oportunidade';
      if (err.message?.includes('duplicate key')) {
        errorMessage = 'Já existe uma oportunidade com este título';
      } else if (err.message?.includes('foreign key')) {
        errorMessage = 'Erro de relacionamento no banco de dados';
      } else if (err.message) {
        errorMessage = `Erro: ${err.message}`;
      }
      
      alert(errorMessage);
    }
  };

  // ✅ NOVA FUNÇÃO: Apagar Oportunidade
  const handleDeleteOpportunity = async (opportunityId: string) => {
    try {
      // Primeiro, deletar candidaturas relacionadas
      await supabase
        .from('applications')
        .delete()
        .eq('opportunity_id', opportunityId);

      // Depois deletar a oportunidade
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', opportunityId);

      if (error) throw error;

      // Atualizar lista local
      setOpportunities(prev => prev.filter(opp => opp.id !== opportunityId));
      setApplications(prev => prev.filter(app => app.opportunity_id !== opportunityId));

      setDeleteConfirm(null);
      alert('Oportunidade removida com sucesso! 🗑️');
    } catch (err) {
      console.error('Erro ao deletar oportunidade:', err);
      alert('Erro ao remover oportunidade');
    }
  };

  // ✅ NOVA FUNÇÃO: Alternar Status - CORRIGIDA
  const handleToggleStatus = async (opportunityId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      console.log('🔄 Tentando alterar status:', opportunityId, currentStatus, '->', newStatus);
      
      const { data, error } = await supabase
        .from('opportunities')
        .update({ status: newStatus })
        .eq('id', opportunityId)
        .select('id, status')
        .single();

      if (error) {
        console.error('❌ Erro do Supabase ao alterar status:', error);
        throw error;
      }

      console.log('✅ Status alterado no banco:', data);

      // Atualizar lista local
      setOpportunities(prev => prev.map(opp => 
        opp.id === opportunityId ? { ...opp, status: newStatus as any } : opp
      ));

      alert(`Oportunidade ${newStatus === 'active' ? 'ativada' : 'pausada'} com sucesso! ${newStatus === 'active' ? '▶️' : '⏸️'}`);
      
    } catch (err: any) {
      console.error('❌ Erro completo ao alterar status:', err);
      
      let errorMessage = 'Erro ao alterar status da oportunidade';
      if (err.message?.includes('not found')) {
        errorMessage = 'Oportunidade não encontrada';
      } else if (err.message) {
        errorMessage = `Erro: ${err.message}`;
      }
      
      alert(errorMessage);
    }
  };

  // Calcular estatísticas
  useEffect(() => {
    setStats({
      totalOpportunities: opportunities.length,
      activeOpportunities: opportunities.filter(o => o.status === 'active').length,
      totalApplications: applications.length,
      pendingApplications: applications.filter(a => a.status === 'pending').length,
      totalServiceRequests: serviceRequests.length,
      pendingServiceRequests: serviceRequests.filter(s => s.status === 'pending').length,
      totalConnections: connections.length,
      totalUsers: 125 // Valor estimado
    });
  }, [opportunities, applications, serviceRequests, connections]);

  // Funções de ação existentes
  const handleApproveApplication = async (applicationId: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: 'approved' })
        .eq('id', applicationId);

      if (error) throw error;

      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: 'approved' } : app
      ));

      alert('Candidatura aprovada com sucesso!');
    } catch (err) {
      console.error('Erro ao aprovar candidatura:', err);
      alert('Erro ao aprovar candidatura');
    }
  };

  const handleRejectApplication = async (applicationId: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: 'rejected' })
        .eq('id', applicationId);

      if (error) throw error;

      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      ));

      alert('Candidatura rejeitada.');
    } catch (err) {
      console.error('Erro ao rejeitar candidatura:', err);
      alert('Erro ao rejeitar candidatura');
    }
  };

  const handleProcessServiceRequest = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (error) throw error;

      setServiceRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: newStatus as any } : req
      ));

      alert(`Solicitação marcada como ${newStatus}`);
    } catch (err) {
      console.error('Erro ao processar solicitação:', err);
      alert('Erro ao processar solicitação');
    }
  };

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

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'processing': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-gray-100 text-gray-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'pending': 'Pendente',
      'approved': 'Aprovada',
      'rejected': 'Rejeitada',
      'processing': 'Processando',
      'completed': 'Completa',
      'cancelled': 'Cancelada',
      'active': 'Ativa',
      'inactive': 'Inativa'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Carregando Painel Administrativo</h2>
          <p className="text-gray-600">Sincronizando dados dos usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gestão de oportunidades, candidaturas e solicitações dos usuários</p>
          {user && (
            <p className="text-sm text-gray-500 mt-1">
              Administrador: {user.email}
            </p>
          )}
        </div>
        
        {/* ✅ RESTAURADO: Botão para navegar para CreateProject */}
        <div className="flex gap-3">
          <button 
            onClick={() => {
              console.log('🚀 Navegando para página de criação de oportunidades...');
              window.location.href = '/create-project';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Oportunidade
          </button>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Oportunidades Ativas</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeOpportunities}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Total: {stats.totalOpportunities}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Candidaturas Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">📋</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Total: {stats.totalApplications}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Solicitações Pendentes</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingServiceRequests}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">🛎️</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Total: {stats.totalServiceRequests}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Conexões: {stats.totalConnections}</span>
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Visão Geral', icon: '📊' },
              { id: 'applications', name: `Candidaturas (${stats.pendingApplications})`, icon: '📋' },
              { id: 'requests', name: `Solicitações (${stats.pendingServiceRequests})`, icon: '🛎️' },
              { id: 'opportunities', name: 'Oportunidades', icon: '🚀' },
              { id: 'users', name: 'Usuários', icon: '👥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`${
                  selectedTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Aba Visão Geral */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Atividade Recente */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm">📋</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nova candidatura recebida</p>
                        <p className="text-xs text-gray-500">Dr. João Santos - há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-sm">🛎️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Solicitação de serviço</p>
                        <p className="text-xs text-gray-500">Ana Costa - há 5 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <span className="text-sm">✅</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Solicitação processada</p>
                        <p className="text-xs text-gray-500">Carlos Mumbala - há 1 dia</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estatísticas por País */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade por País</h3>
                  <div className="space-y-3">
                    {['Angola', 'Namíbia', 'África do Sul'].map((country) => {
                      const countryRequests = serviceRequests.filter(r => r.user_country === country).length;
                      const countryApplications = applications.filter(a => a.opportunity?.country === country).length;
                      
                      return (
                        <div key={country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getCountryFlag(country)}</span>
                            <div>
                              <p className="font-medium">{country}</p>
                              <p className="text-sm text-gray-600">{countryApplications} candidaturas • {countryRequests} solicitações</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{countryApplications + countryRequests}</p>
                            <p className="text-xs text-gray-500">Total</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Candidaturas */}
          {selectedTab === 'applications' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Gestão de Candidaturas</h3>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Todas as candidaturas</option>
                    <option>Pendentes</option>
                    <option>Aprovadas</option>
                    <option>Rejeitadas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span>{getCountryFlag(application.opportunity?.country || '')}</span>
                            <span>{getSectorIcon(application.opportunity?.sector || '')}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900">{application.opportunity?.title}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                            {getStatusLabel(application.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600"><strong>Candidato:</strong> {application.user_name}</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {application.user_email}</p>
                            <p className="text-sm text-gray-600"><strong>Data:</strong> {formatDate(application.application_date)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600"><strong>Organização:</strong> {application.opportunity?.organization}</p>
                            <p className="text-sm text-gray-600"><strong>Localização:</strong> {application.opportunity?.location}</p>
                            <p className="text-sm text-gray-600"><strong>Prazo:</strong> {application.opportunity?.deadline}</p>
                          </div>
                        </div>

                        {application.message && (
                          <div className="bg-gray-50 p-3 rounded-lg mb-3">
                            <p className="text-sm text-gray-700"><strong>Mensagem:</strong></p>
                            <p className="text-sm text-gray-600 mt-1">{application.message}</p>
                          </div>
                        )}

                        {application.status === 'pending' && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleApproveApplication(application.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                            >
                              ✅ Aprovar
                            </button>
                            <button
                              onClick={() => handleRejectApplication(application.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                            >
                              ❌ Rejeitar
                            </button>
                            <button
                              onClick={() => setSelectedItem(application)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            >
                              👁️ Ver Detalhes
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {applications.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma candidatura</h3>
                    <p className="text-gray-600">Ainda não há candidaturas para revisar.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Aba Solicitações */}
          {selectedTab === 'requests' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Solicitações de Serviços</h3>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Todas as solicitações</option>
                    <option>Pendentes</option>
                    <option>Processando</option>
                    <option>Completas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span>{getCountryFlag(request.user_country || '')}</span>
                          <h4 className="font-semibold text-gray-900">{request.service_type}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {getStatusLabel(request.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600"><strong>Nome:</strong> {request.name}</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {request.email}</p>
                            <p className="text-sm text-gray-600"><strong>Telefone:</strong> {request.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600"><strong>País:</strong> {request.user_country}</p>
                            <p className="text-sm text-gray-600"><strong>Data:</strong> {formatDate(request.created_at)}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <p className="text-sm text-gray-700"><strong>Detalhes da Solicitação:</strong></p>
                          <p className="text-sm text-gray-600 mt-1">{request.message}</p>
                        </div>

                        <div className="flex gap-3">
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleProcessServiceRequest(request.id, 'processing')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                              >
                                🔄 Processar
                              </button>
                              <button
                                onClick={() => handleProcessServiceRequest(request.id, 'completed')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                              >
                                ✅ Marcar como Completa
                              </button>
                            </>
                          )}
                          
                          {request.status === 'processing' && (
                            <button
                              onClick={() => handleProcessServiceRequest(request.id, 'completed')}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                            >
                              ✅ Marcar como Completa
                            </button>
                          )}

                          <a
                            href={`https://wa.me/${request.phone.replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors inline-flex items-center gap-2"
                          >
                            📱 WhatsApp
                          </a>
                          
                          <a
                            href={`mailto:${request.email}?subject=Africa's Hands - ${request.service_type}&body=Olá ${request.name}, recebemos sua solicitação sobre ${request.service_type}.`}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
                          >
                            📧 Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {serviceRequests.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🛎️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma solicitação</h3>
                    <p className="text-gray-600">Ainda não há solicitações de serviços.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ✅ Aba Oportunidades ATUALIZADA */}
          {selectedTab === 'opportunities' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Gestão de Oportunidades</h3>
                  <p className="text-sm text-gray-500">
                    {opportunities.length} oportunidade{opportunities.length !== 1 ? 's' : ''} no sistema
                  </p>
                </div>
                <button 
                  onClick={() => {
                    console.log('🚀 Navegando para CreateProject...');
                    window.location.href = '/create-project';
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  + Nova Oportunidade
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex gap-4">
                      <img 
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span>{getCountryFlag(opportunity.country)}</span>
                          <span>{getSectorIcon(opportunity.sector)}</span>
                          <h4 className="font-semibold text-gray-900 text-sm">{opportunity.title}</h4>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{opportunity.organization}</p>
                        <p className="text-sm text-gray-600 mb-3">{opportunity.location}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(opportunity.status)}`}>
                            {getStatusLabel(opportunity.status)}
                          </span>
                          {opportunity.featured && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              ⭐ Destaque
                            </span>
                          )}
                        </div>

                        {/* ✅ BOTÕES ATUALIZADOS */}
                        <div className="flex gap-2 flex-wrap">
                          <button 
                            onClick={() => {
                              console.log('🔍 Dados da oportunidade antes de editar:', opportunity);
                              handleEditOpportunity(opportunity);
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            ✏️ Editar
                          </button>
                          
                          <button 
                            onClick={() => {
                              console.log('🔄 Tentando alterar status da oportunidade:', opportunity.id, opportunity.status);
                              handleToggleStatus(opportunity.id, opportunity.status);
                            }}
                            className={`${opportunity.status === 'active' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} text-white px-3 py-1 rounded text-xs transition-colors`}
                          >
                            {opportunity.status === 'active' ? '⏸️ Pausar' : '▶️ Ativar'}
                          </button>
                          
                          <button 
                            onClick={() => setDeleteConfirm(opportunity.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                          >
                            🗑️ Apagar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {opportunities.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma oportunidade</h3>
                    <p className="text-gray-600 mb-4">Crie a primeira oportunidade para começar.</p>
                    <button 
                      onClick={() => {
                        console.log('🚀 Navegando para CreateProject (primeira oportunidade)...');
                        window.location.href = '/create-project';
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                    >
                      + Criar Primeira Oportunidade
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Aba Usuários */}
          {selectedTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Gestão de Usuários</h3>
                <div className="flex gap-2">
                  <input
                    type="search"
                    placeholder="Buscar usuários..."
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
                  />
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Todos os países</option>
                    <option>Angola</option>
                    <option>Namíbia</option>
                    <option>África do Sul</option>
                  </select>
                </div>
              </div>

              <div className="text-center py-12">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Gestão de Usuários</h3>
                <p className="text-gray-600 mb-4">Esta funcionalidade será implementada em breve.</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                  Ver Todos os Usuários
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ MODAL DE EDIÇÃO */}
      {showEditModal && editingOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Editar Oportunidade</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Validação no início do modal */}
              {!editingOpportunity ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Carregando dados da oportunidade...</p>
                </div>
              ) : (
                <>
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={editingOpportunity.title || ''}
                  onChange={(e) => setEditingOpportunity({...editingOpportunity, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={editingOpportunity.description || ''}
                  onChange={(e) => setEditingOpportunity({...editingOpportunity, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* País e Setor */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                  <select
                    value={editingOpportunity.country || ''}
                    onChange={(e) => setEditingOpportunity({...editingOpportunity, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Selecionar país</option>
                    <option value="Angola">Angola</option>
                    <option value="Namíbia">Namíbia</option>
                    <option value="África do Sul">África do Sul</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Setor</label>
                  <select
                    value={editingOpportunity.sector || ''}
                    onChange={(e) => setEditingOpportunity({...editingOpportunity, sector: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Selecionar setor</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Educação">Educação</option>
                    <option value="Turismo">Turismo</option>
                    <option value="Comércio">Comércio</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Tecnologia">Tecnologia</option>
                  </select>
                </div>
              </div>

              {/* Organização e Localização */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organização</label>
                  <input
                    type="text"
                    value={editingOpportunity.organization || ''}
                    onChange={(e) => setEditingOpportunity({...editingOpportunity, organization: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                  <input
                    type="text"
                    value={editingOpportunity.location || ''}
                    onChange={(e) => setEditingOpportunity({...editingOpportunity, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Prazo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prazo para Candidaturas</label>
                <input
                  type="date"
                  value={editingOpportunity.deadline || ''}
                  onChange={(e) => setEditingOpportunity({...editingOpportunity, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Orçamento e Requirements */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Orçamento (USD) - Opcional</label>
                  <input
                    type="number"
                    value={editingOpportunity.budget || ''}
                    onChange={(e) => setEditingOpportunity({
                      ...editingOpportunity, 
                      budget: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="0"
                    step="1000"
                    placeholder="Ex: 50000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requisitos</label>
                  <div className="space-y-2">
                    {(editingOpportunity.requirements || []).map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => {
                            const newRequirements = [...(editingOpportunity.requirements || [])];
                            newRequirements[index] = e.target.value;
                            setEditingOpportunity({
                              ...editingOpportunity, 
                              requirements: newRequirements
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder={`Requisito ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newRequirements = (editingOpportunity.requirements || []).filter((_, i) => i !== index);
                            setEditingOpportunity({
                              ...editingOpportunity, 
                              requirements: newRequirements
                            });
                          }}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newRequirements = [...(editingOpportunity.requirements || []), ''];
                        setEditingOpportunity({
                          ...editingOpportunity, 
                          requirements: newRequirements
                        });
                      }}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors text-sm"
                    >
                      + Adicionar Requisito
                    </button>
                  </div>
                </div>
              </div>

              {/* Tipo e Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    value={editingOpportunity.type || 'project'}
                    onChange={(e) => setEditingOpportunity({...editingOpportunity, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="project">Projeto</option>
                    <option value="partnership">Parceria</option>
                    <option value="funding">Financiamento</option>
                    <option value="education">Educação</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editingOpportunity.status || 'active'}
                    onChange={(e) => setEditingOpportunity({...editingOpportunity, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="active">Ativa</option>
                    <option value="inactive">Inativa</option>
                    <option value="expired">Expirada</option>
                  </select>
                </div>
              </div>

              {/* Destaque */}
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingOpportunity.featured || false}
                    onChange={(e) => setEditingOpportunity({...editingOpportunity, featured: e.target.checked})}
                    className="mr-2 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">⭐ Marcar como destaque</span>
                </label>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    console.log('❌ Cancelando edição');
                    setShowEditModal(false);
                    setEditingOpportunity(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    console.log('💾 Tentando salvar edição...');
                    console.log('📋 Dados atuais do formulário:', editingOpportunity);
                    
                    // ✅ Validação básica mais robusta
                    if (!editingOpportunity?.title?.trim() || !editingOpportunity?.description?.trim()) {
                      alert('Por favor, preencha pelo menos o título e descrição');
                      return;
                    }
                    
                    if (!editingOpportunity?.country || !editingOpportunity?.sector) {
                      alert('Por favor, selecione o país e setor');
                      return;
                    }
                    
                    handleSaveEdit();
                  }}
                  disabled={!editingOpportunity?.title?.trim() || !editingOpportunity?.description?.trim()}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Salvar Alterações
                </button>
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmar Exclusão</h2>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja apagar esta oportunidade? Esta ação não pode ser desfeita e também removerá todas as candidaturas relacionadas.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteOpportunity(deleteConfirm)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  🗑️ Apagar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Detalhes da Candidatura</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600">Detalhes completos serão implementados aqui.</p>
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aviso de erro */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <span className="text-yellow-400 mr-3">⚠️</span>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Aviso</h3>
              <p className="text-sm text-yellow-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;