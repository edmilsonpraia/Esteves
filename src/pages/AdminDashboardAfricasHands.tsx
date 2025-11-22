import React, { useState, useEffect } from 'react';
import { useTranslation, LanguageToggle } from '../context/TranslationContext';
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
    service_id: string;
    user_id?: string;
    user_name: string;
    user_email: string;
    user_phone?: string;
    user_country: string;
    organization?: string;
    sector?: string;
    message?: string;
    status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    scheduled_date?: string;
    completed_date?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
    service?: {
        id: string;
        title: string;
        category: string;
        icon: string;
    };
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
            setError(t('common.error'));
            loadFallbackData();
        } finally {
            setLoading(false);
        }
    };

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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    country: t('country.angola'),
                    sector: t('sector.health'),
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
                    country: t('country.angola'),
                    sector: t('sector.education'),
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
                    service_id: 'service-1',
                    user_id: 'user-1',
                    user_name: 'Dr. António Fernandes',
                    user_email: 'antonio@email.com',
                    user_phone: '+244 924 166 401',
                    user_country: t('country.angola'),
                    message: 'Preciso de informações sobre hospitais especializados em cardiologia em Luanda.',
                    status: 'pending',
                    priority: 'medium',
                    created_at: '2024-06-18T09:15:00Z',
                    updated_at: '2024-06-18T09:15:00Z',
                    service: {
                        id: 'service-1',
                        title: 'Rede de Telemedicina Regional',
                        category: 'saude',
                        icon: '🏥'
                    }
                },
                {
                    id: '2',
                    service_id: 'service-2',
                    user_id: 'user-2',
                    user_name: 'Ana Costa',
                    user_email: 'ana.costa@email.com',
                    user_phone: '+27 21 123 4567',
                    user_country: t('country.southAfrica'),
                    message: 'Interessada em programas de mestrado em medicina na UCT.',
                    status: 'in_progress',
                    priority: 'high',
                    created_at: '2024-06-17T16:45:00Z',
                    updated_at: '2024-06-17T16:45:00Z',
                    service: {
                        id: 'service-2',
                        title: 'Programa de Intercâmbio Universitário SADC',
                        category: 'educacao',
                        icon: '🎓'
                    }
                },
                {
                    id: '3',
                    service_id: 'service-5',
                    user_id: 'user-3',
                    user_name: 'Carlos Mumbala',
                    user_email: 'carlos@email.com',
                    user_phone: '+264 61 123 456',
                    user_country: t('country.namibia'),
                    message: 'Preciso de transporte seguro entre Windhoek e Walvis Bay.',
                    status: 'completed',
                    priority: 'medium',
                    created_at: '2024-06-16T11:20:00Z',
                    updated_at: '2024-06-16T11:20:00Z',
                    completed_date: '2024-06-18T14:30:00Z',
                    service: {
                        id: 'service-5',
                        title: 'Sistema Integrado de Transporte Regional',
                        category: 'transporte',
                        icon: '✈️'
                    }
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
            alert(t('messages.opportunityUpdated'));

        } catch (err: any) {
            console.error('❌ Erro completo ao editar oportunidade:', err);

            let errorMessage = t('common.error');
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
            alert(t('messages.opportunityDeleted'));
        } catch (err) {
            console.error('Erro ao deletar oportunidade:', err);
            alert(t('common.error'));
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

            alert(t('messages.statusChanged'));

        } catch (err: any) {
            console.error('❌ Erro completo ao alterar status:', err);

            let errorMessage = t('common.error');
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

            alert(t('messages.applicationApproved'));
        } catch (err) {
            console.error('Erro ao aprovar candidatura:', err);
            alert(t('common.error'));
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

            alert(t('messages.applicationRejected'));
        } catch (err) {
            console.error('Erro ao rejeitar candidatura:', err);
            alert(t('common.error'));
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

            alert(t('messages.requestProcessed'));
        } catch (err) {
            console.error('Erro ao processar solicitação:', err);
            alert(t('common.error'));
        }
    };

    const getCountryFlag = (country: string) => {
        const flags = {
            [t('country.angola')]: '🇦🇴',
            [t('country.namibia')]: '🇳🇦',
            [t('country.southAfrica')]: '🇿🇦'
        };
        return flags[country as keyof typeof flags] || '🌍';
    };

    const getSectorIcon = (sector: string) => {
        const icons = {
            [t('sector.health')]: '🏥',
            [t('sector.education')]: '🎓',
            [t('sector.tourism')]: '🏨',
            [t('sector.commerce')]: '🛒',
            [t('sector.transport')]: '✈️',
            [t('sector.technology')]: '💻'
        };
        return icons[sector as keyof typeof icons] || '💼';
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'approved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'in_progress': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-gray-100 text-gray-800',
            'active': 'bg-green-100 text-green-800',
            'inactive': 'bg-gray-100 text-gray-800'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            'pending': t('applications.status.pending'),
            'approved': t('applications.status.approved'),
            'rejected': t('applications.status.rejected'),
            'processing': t('requests.status.processing'),
            'completed': t('requests.status.completed'),
            'cancelled': t('requests.status.cancelled'),
            'active': t('status.active'),
            'inactive': t('status.inactive')
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
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('admin.loadingTitle')}</h2>
                    <p className="text-gray-600">{t('admin.loadingSubtitle')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header - Mobile Responsive */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{t('admin.title')}</h1>
                        <p className="text-gray-600 text-sm sm:text-base mt-1">{t('admin.subtitle')}</p>
                        {user && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                                {t('admin.administrator')} {user.email}
                            </p>
                        )}
                    </div>

                    {/* Actions - Mobile Responsive */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="flex justify-center sm:justify-start">
                            <LanguageToggle />
                        </div>
                        <button
                            onClick={() => {
                                console.log('🚀 Navegando para página de criação de oportunidades...');
                                window.location.href = '/create-project';
                            }}
                            className="bg-red-600 text-white px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors text-sm sm:text-base font-medium"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="whitespace-nowrap">{t('admin.newOpportunity')}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Estatísticas Principais - Mobile Responsive */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('stats.activeOpportunities')}</p>
                            <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">{stats.activeOpportunities}</p>
                        </div>
                        <div className="p-2 sm:p-3 bg-green-100 rounded-full ml-2 flex-shrink-0">
                            <span className="text-lg sm:text-2xl">🚀</span>
                        </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <span className="text-xs sm:text-sm text-gray-500">{t('stats.total')} {stats.totalOpportunities}</span>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('stats.pendingApplications')}</p>
                            <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-1">{stats.pendingApplications}</p>
                        </div>
                        <div className="p-2 sm:p-3 bg-yellow-100 rounded-full ml-2 flex-shrink-0">
                            <span className="text-lg sm:text-2xl">📋</span>
                        </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <span className="text-xs sm:text-sm text-gray-500">{t('stats.total')} {stats.totalApplications}</span>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('stats.pendingRequests')}</p>
                            <p className="text-xl sm:text-2xl font-bold text-orange-600 mt-1">{stats.pendingServiceRequests}</p>
                        </div>
                        <div className="p-2 sm:p-3 bg-orange-100 rounded-full ml-2 flex-shrink-0">
                            <span className="text-lg sm:text-2xl">🛎️</span>
                        </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <span className="text-xs sm:text-sm text-gray-500">{t('stats.total')} {stats.totalServiceRequests}</span>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('stats.activeUsers')}</p>
                            <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">{stats.totalUsers}</p>
                        </div>
                        <div className="p-2 sm:p-3 bg-purple-100 rounded-full ml-2 flex-shrink-0">
                            <span className="text-lg sm:text-2xl">👥</span>
                        </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <span className="text-xs sm:text-sm text-gray-500">{t('stats.connections')} {stats.totalConnections}</span>
                    </div>
                </div>
            </div>

            {/* Navegação por Abas - Mobile Responsive */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    {/* Mobile Dropdown */}
                    <div className="sm:hidden px-4 py-3">
                        <select
                            value={selectedTab}
                            onChange={(e) => setSelectedTab(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                            {[
                                { id: 'overview', name: t('tabs.overview'), icon: '📊' },
                                { id: 'applications', name: `${t('tabs.applications')} (${stats.pendingApplications})`, icon: '📋' },
                                { id: 'requests', name: `${t('tabs.requests')} (${stats.pendingServiceRequests})`, icon: '🛎️' },
                                { id: 'opportunities', name: t('tabs.opportunities'), icon: '🚀' },
                                { id: 'users', name: t('tabs.users'), icon: '👥' }
                            ].map((tab) => (
                                <option key={tab.id} value={tab.id}>
                                    {tab.icon} {tab.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Desktop Tabs */}
                    <nav className="hidden sm:flex sm:space-x-4 lg:space-x-8 px-4 sm:px-6 overflow-x-auto" aria-label="Tabs">
                        {[
                            { id: 'overview', name: t('tabs.overview'), icon: '📊' },
                            { id: 'applications', name: `${t('tabs.applications')} (${stats.pendingApplications})`, icon: '📋' },
                            { id: 'requests', name: `${t('tabs.requests')} (${stats.pendingServiceRequests})`, icon: '🛎️' },
                            { id: 'opportunities', name: t('tabs.opportunities'), icon: '🚀' },
                            { id: 'users', name: t('tabs.users'), icon: '👥' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`${selectedTab === tab.id
                                        ? 'border-red-500 text-red-600 bg-red-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                    } whitespace-nowrap py-3 sm:py-4 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors rounded-t-lg`}
                            >
                                <span className="text-sm sm:text-base">{tab.icon}</span>
                                <span className="hidden md:inline">{tab.name}</span>
                                <span className="md:hidden">{tab.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 sm:p-6">
                    {/* Aba Visão Geral */}
                    {selectedTab === 'overview' && (
                        <div className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {/* Atividade Recente */}
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('overview.recentActivity')}</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs sm:text-sm">📋</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs sm:text-sm font-medium truncate">{t('overview.newApplication')}</p>
                                                <p className="text-xs text-gray-500 truncate">Dr. João Santos - {t('overview.hoursAgo')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs sm:text-sm">🛎️</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs sm:text-sm font-medium truncate">{t('overview.serviceRequest')}</p>
                                                <p className="text-xs text-gray-500 truncate">Ana Costa - {t('overview.fiveHoursAgo')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs sm:text-sm">✅</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs sm:text-sm font-medium truncate">{t('overview.requestProcessed')}</p>
                                                <p className="text-xs text-gray-500 truncate">Carlos Mumbala - {t('overview.oneDayAgo')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Estatísticas por País */}
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('overview.activityByCountry')}</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        {[t('country.angola'), t('country.namibia'), t('country.southAfrica')].map((country) => {
                                            const countryRequests = serviceRequests.filter(r => r.user_country === country).length;
                                            const countryApplications = applications.filter(a => a.opportunity?.country === country).length;

                                            return (
                                                <div key={country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                        <span className="text-lg sm:text-2xl flex-shrink-0">{getCountryFlag(country)}</span>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm sm:text-base font-medium truncate">{country}</p>
                                                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                                                                {countryApplications} {t('overview.applicationsCount')} • {countryRequests} {t('overview.requestsCount')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0 ml-2">
                                                        <p className="text-base sm:text-lg font-bold text-gray-900">{countryApplications + countryRequests}</p>
                                                        <p className="text-xs text-gray-500 hidden sm:block">{t('stats.total').replace(':', '')}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Aba Candidaturas - Mobile Responsive */}
                    {selectedTab === 'applications' && (
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{t('applications.title')}</h3>
                                <div className="flex gap-2">
                                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 sm:flex-none">
                                        <option>{t('applications.allApplications')}</option>
                                        <option>{t('applications.pending')}</option>
                                        <option>{t('applications.approved')}</option>
                                        <option>{t('applications.rejected')}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                {applications.map((application) => (
                                    <div key={application.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <div className="flex items-center gap-1 sm:gap-2">
                                                            <span className="text-sm sm:text-base">{getCountryFlag(application.opportunity?.country || '')}</span>
                                                            <span className="text-sm sm:text-base">{getSectorIcon(application.opportunity?.sector || '')}</span>
                                                        </div>
                                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate flex-1 min-w-0">
                                                            {application.opportunity?.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(application.status)}`}>
                                                    {getStatusLabel(application.status)}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.candidate')}</strong>
                                                        <span className="block sm:inline sm:ml-1 truncate">{application.user_name}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.email')}</strong>
                                                        <span className="block sm:inline sm:ml-1 truncate">{application.user_email}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.date')}</strong>
                                                        <span className="block sm:inline sm:ml-1">{formatDate(application.application_date)}</span>
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.organization')}</strong>
                                                        <span className="block sm:inline sm:ml-1 truncate">{application.opportunity?.organization}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.location')}</strong>
                                                        <span className="block sm:inline sm:ml-1 truncate">{application.opportunity?.location}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.deadline')}</strong>
                                                        <span className="block sm:inline sm:ml-1">{application.opportunity?.deadline}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {application.message && (
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <p className="text-xs sm:text-sm text-gray-700 font-medium">{t('applications.message')}</p>
                                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{application.message}</p>
                                                </div>
                                            )}

                                            {application.status === 'pending' && (
                                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                                    <button
                                                        onClick={() => handleApproveApplication(application.id)}
                                                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <span>✅</span>
                                                        <span>{t('applications.approve')}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectApplication(application.id)}
                                                        className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <span>❌</span>
                                                        <span>{t('applications.reject')}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedItem(application)}
                                                        className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <span>👁️</span>
                                                        <span>{t('applications.viewDetails')}</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {applications.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-4xl mb-4">📋</div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('applications.noApplications')}</h3>
                                        <p className="text-gray-600">{t('applications.noApplicationsDesc')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Aba Solicitações - Mobile Responsive */}
                    {selectedTab === 'requests' && (
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{t('requests.title')}</h3>
                                <div className="flex gap-2">
                                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 sm:flex-none">
                                        <option>{t('requests.allRequests')}</option>
                                        <option>{t('requests.status.pending')}</option>
                                        <option>{t('requests.processing')}</option>
                                        <option>{t('requests.completed')}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                {serviceRequests.map((request) => (
                                    <div key={request.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <span className="text-sm sm:text-base">{getCountryFlag(request.user_country || '')}</span>
                                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate flex-1 min-w-0">
                                                            {request.service?.title || 'Serviço não especificado'}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(request.status)}`}>
                                                    {getStatusLabel(request.status)}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('requests.name')}</strong>
                                                        <span className="block sm:inline sm:ml-1 truncate">{request.user_name}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.email')}</strong>
                                                        <span className="block sm:inline sm:ml-1 truncate">{request.user_email}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('requests.phone')}</strong>
                                                        <span className="block sm:inline sm:ml-1">{request.user_phone || 'N/A'}</span>
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('requests.country')}</strong>
                                                        <span className="block sm:inline sm:ml-1 truncate">{request.user_country}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <strong>{t('applications.date')}</strong>
                                                        <span className="block sm:inline sm:ml-1">{formatDate(request.created_at)}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <p className="text-xs sm:text-sm text-gray-700 font-medium">{t('requests.details')}</p>
                                                <p className="text-xs sm:text-sm text-gray-600 mt-1">{request.message}</p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2">
                                                {request.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleProcessServiceRequest(request.id, 'in_progress')}
                                                            className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                                                        >
                                                            <span>🔄</span>
                                                            <span>{t('requests.process')}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleProcessServiceRequest(request.id, 'completed')}
                                                            className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                                                        >
                                                            <span>✅</span>
                                                            <span>{t('requests.markComplete')}</span>
                                                        </button>
                                                    </>
                                                )}

                                                {request.status === 'in_progress' && (
                                                    <button
                                                        onClick={() => handleProcessServiceRequest(request.id, 'completed')}
                                                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <span>✅</span>
                                                        <span>{t('requests.markComplete')}</span>
                                                    </button>
                                                )}

                                                <a
                                                    href={`https://wa.me/${(request.user_phone || '').replace(/\s+/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                                                >
                                                    <span>📱</span>
                                                    <span>{t('requests.whatsapp')}</span>
                                                </a>

                                                <a
                                                    href={`mailto:${request.user_email}?subject=Africa's Hands - ${request.service?.title || 'Serviço'}&body=Olá ${request.user_name}, recebemos sua solicitação sobre ${request.service?.title || 'o serviço'}.`}
                                                    className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                                                >
                                                    <span>📧</span>
                                                    <span>{t('requests.emailAction')}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {serviceRequests.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">🛎️</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('requests.noRequests')}</h3>
                                    <p className="text-gray-600">{t('requests.noRequestsDesc')}</p>
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
                                <h3 className="text-lg font-semibold text-gray-900">{t('opportunities.title')}</h3>
                                <p className="text-sm text-gray-500">
                                    {opportunities.length} {opportunities.length === 1 ? t('opportunities.opportunityCount') : t('opportunities.opportunitiesCount')} {t('opportunities.systemCount')}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    console.log('🚀 Navegando para CreateProject...');
                                    window.location.href = '/create-project';
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                            >
                                + {t('admin.newOpportunity')}
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
                                                    ✏️ {t('opportunities.edit')}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        console.log('🔄 Tentando alterar status da oportunidade:', opportunity.id, opportunity.status);
                                                        handleToggleStatus(opportunity.id, opportunity.status);
                                                    }}
                                                    className={`${opportunity.status === 'active' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} text-white px-3 py-1 rounded text-xs transition-colors`}
                                                >
                                                    {opportunity.status === 'active' ? `⏸️ ${t('opportunities.pause')}` : `▶️ ${t('opportunities.activate')}`}
                                                </button>

                                                <button
                                                    onClick={() => setDeleteConfirm(opportunity.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                                                >
                                                    🗑️ {t('opportunities.delete')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {opportunities.length === 0 && (
                                <div className="col-span-2 text-center py-12">
                                    <div className="text-4xl mb-4">🚀</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('opportunities.noOpportunities')}</h3>
                                    <p className="text-gray-600 mb-4">{t('opportunities.noOpportunitiesDesc')}</p>
                                    <button
                                        onClick={() => {
                                            console.log('🚀 Navegando para CreateProject (primeira oportunidade)...');
                                            window.location.href = '/create-project';
                                        }}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                                    >
                                        + {t('opportunities.createFirst')}
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
                            <h3 className="text-lg font-semibold text-gray-900">{t('users.title')}</h3>
                            <div className="flex gap-2">
                                <input
                                    type="search"
                                    placeholder={t('users.searchPlaceholder')}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
                                />
                                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                    <option>{t('users.allCountries')}</option>
                                    <option>{t('country.angola')}</option>
                                    <option>{t('country.namibia')}</option>
                                    <option>{t('country.southAfrica')}</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('users.title')}</h3>
                            <p className="text-gray-600 mb-4">{t('users.comingSoon')}</p>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                                {t('users.viewAll')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

      {/* ✅ MODAL DE EDIÇÃO */}
    {
        showEditModal && editingOpportunity && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">{t('edit.title')}</h2>
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
                                <p className="text-gray-500">{t('common.loading')}</p>
                            </div>
                        ) : (
                            <>
                                {/* Título */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.opportunityTitle')}</label>
                                    <input
                                        type="text"
                                        value={editingOpportunity.title || ''}
                                        onChange={(e) => setEditingOpportunity({ ...editingOpportunity, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Descrição */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.description')}</label>
                                    <textarea
                                        value={editingOpportunity.description || ''}
                                        onChange={(e) => setEditingOpportunity({ ...editingOpportunity, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* País e Setor */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.country')}</label>
                                        <select
                                            value={editingOpportunity.country || ''}
                                            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, country: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="">{t('edit.selectCountry')}</option>
                                            <option value={t('country.angola')}>{t('country.angola')}</option>
                                            <option value={t('country.namibia')}>{t('country.namibia')}</option>
                                            <option value={t('country.southAfrica')}>{t('country.southAfrica')}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.sector')}</label>
                                        <select
                                            value={editingOpportunity.sector || ''}
                                            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, sector: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="">{t('edit.selectSector')}</option>
                                            <option value={t('sector.health')}>{t('sector.health')}</option>
                                            <option value={t('sector.education')}>{t('sector.education')}</option>
                                            <option value={t('sector.tourism')}>{t('sector.tourism')}</option>
                                            <option value={t('sector.commerce')}>{t('sector.commerce')}</option>
                                            <option value={t('sector.transport')}>{t('sector.transport')}</option>
                                            <option value={t('sector.technology')}>{t('sector.technology')}</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Organização e Localização */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.organization')}</label>
                                        <input
                                            type="text"
                                            value={editingOpportunity.organization || ''}
                                            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, organization: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.location')}</label>
                                        <input
                                            type="text"
                                            value={editingOpportunity.location || ''}
                                            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, location: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Prazo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.deadline')}</label>
                                    <input
                                        type="date"
                                        value={editingOpportunity.deadline || ''}
                                        onChange={(e) => setEditingOpportunity({ ...editingOpportunity, deadline: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                {/* Orçamento e Requirements */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.budget')}</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.requirements')}</label>
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
                                                        placeholder={`${t('edit.requirement')} ${index + 1}`}
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
                                                + {t('edit.addRequirement')}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Tipo e Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.type')}</label>
                                        <select
                                            value={editingOpportunity.type || 'project'}
                                            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, type: e.target.value as any })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="project">{t('type.project')}</option>
                                            <option value="partnership">{t('type.partnership')}</option>
                                            <option value="funding">{t('type.funding')}</option>
                                            <option value="education">{t('type.education')}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('edit.status')}</label>
                                        <select
                                            value={editingOpportunity.status || 'active'}
                                            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, status: e.target.value as any })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="active">{t('status.active')}</option>
                                            <option value="inactive">{t('status.inactive')}</option>
                                            <option value="expired">{t('status.expired')}</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Destaque */}
                                <div className="flex items-center">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={editingOpportunity.featured || false}
                                            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, featured: e.target.checked })}
                                            className="mr-2 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{t('edit.featured')}</span>
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
                                        {t('edit.cancel')}
                                    </button>
                                    <button
                                        onClick={() => {
                                            console.log('💾 Tentando salvar edição...');
                                            console.log('📋 Dados atuais do formulário:', editingOpportunity);

                                            // ✅ Validação básica mais robusta
                                            if (!editingOpportunity?.title?.trim() || !editingOpportunity?.description?.trim()) {
                                                alert(t('messages.fillRequiredFields'));
                                                return;
                                            }

                                            if (!editingOpportunity?.country || !editingOpportunity?.sector) {
                                                alert(t('messages.selectCountryAndSector'));
                                                return;
                                            }

                                            handleSaveEdit();
                                        }}
                                        disabled={!editingOpportunity?.title?.trim() || !editingOpportunity?.description?.trim()}
                                        className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        💾 {t('edit.save')}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    {/* ✅ MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
    {
        deleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-6">
                    <div className="text-center">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('delete.title')}</h2>
                        <p className="text-gray-600 mb-6">
                            {t('delete.message')}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium"
                            >
                                {t('edit.cancel')}
                            </button>
                            <button
                                onClick={() => handleDeleteOpportunity(deleteConfirm)}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                🗑️ {t('delete.confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    {/* Modal de Detalhes */}
    {
        selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">{t('details.title')}</h2>
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
                        <p className="text-gray-600">{t('details.placeholder')}</p>
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                            {t('details.close')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    {/* Aviso de erro */}
    {
        error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                    <span className="text-yellow-400 mr-3">⚠️</span>
                    <div>
                        <h3 className="text-sm font-medium text-yellow-800">{t('common.warning')}</h3>
                        <p className="text-sm text-yellow-700 mt-1">{error}</p>
                    </div>
                </div>
            </div>
        )
    }
    </div >
  );
};

export default AdminDashboard;