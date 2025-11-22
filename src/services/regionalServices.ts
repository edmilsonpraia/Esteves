import { supabase } from '../lib/supabase';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'saude' | 'educacao' | 'comercio' | 'turismo' | 'transporte' | 'tecnologia';
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
  status: 'active' | 'inactive' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface ServiceRequest {
  id: string;
  service_id: string;
  user_id: string;
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
}

export interface ServiceFilters {
  category?: string;
  country?: string;
  featured?: boolean;
  status?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ServiceStats {
  totalServices: number;
  activeServices: number;
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  completedRequests: number;
  servicesByCategory: Record<string, number>;
  servicesByCountry: Record<string, number>;
  requestsByStatus: Record<string, number>;
}

// ============================================================================
// FUNÇÕES DE CONSULTA DE SERVIÇOS
// ============================================================================

/**
 * Buscar todos os serviços regionais
 * @param filters - Filtros opcionais para busca
 * @returns Lista de serviços
 */
export async function getAllServices(filters?: ServiceFilters): Promise<Service[]> {
  try {
    let query = supabase
      .from('regional_services')
      .select('*')
      .order('created_at', { ascending: false });

    // Aplicar filtros
    if (filters) {
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      } else {
        // Por padrão, mostrar apenas serviços ativos
        query = query.eq('status', 'active');
      }

      if (filters.searchQuery) {
        query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
      }
    } else {
      // Por padrão, mostrar apenas serviços ativos
      query = query.eq('status', 'active');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }

    // Filtrar por país se necessário (campo é array)
    let services = data || [];
    if (filters?.country && filters.country !== 'all') {
      services = services.filter(service =>
        service.countries?.includes(filters.country)
      );
    }

    return services;
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    throw error;
  }
}

/**
 * Buscar serviço por ID
 * @param id - ID do serviço
 * @returns Serviço encontrado ou null
 */
export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('regional_services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar serviço:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    return null;
  }
}

/**
 * Buscar serviços por categoria
 * @param category - Categoria do serviço
 * @returns Lista de serviços da categoria
 */
export async function getServicesByCategory(category: string): Promise<Service[]> {
  return getAllServices({ category, status: 'active' });
}

/**
 * Buscar serviços por país
 * @param country - Nome do país
 * @returns Lista de serviços disponíveis no país
 */
export async function getServicesByCountry(country: string): Promise<Service[]> {
  return getAllServices({ country, status: 'active' });
}

/**
 * Buscar serviços em destaque
 * @returns Lista de serviços em destaque
 */
export async function getFeaturedServices(): Promise<Service[]> {
  return getAllServices({ featured: true, status: 'active' });
}

/**
 * Buscar serviços por texto
 * @param query - Texto de busca
 * @returns Lista de serviços encontrados
 */
export async function searchServices(query: string): Promise<Service[]> {
  return getAllServices({ searchQuery: query, status: 'active' });
}

// ============================================================================
// FUNÇÕES DE SOLICITAÇÃO DE SERVIÇOS
// ============================================================================

/**
 * Solicitar um serviço regional
 * @param serviceId - ID do serviço
 * @param userData - Dados do usuário solicitante
 * @returns Solicitação criada
 */
export async function requestService(
  serviceId: string,
  userData: {
    user_id?: string;
    user_name: string;
    user_email: string;
    user_phone?: string;
    user_country: string;
    organization?: string;
    sector?: string;
    message?: string;
    scheduled_date?: string;
  }
): Promise<ServiceRequest> {
  try {
    // Verificar se o serviço existe
    const service = await getServiceById(serviceId);
    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    // Verificar se o serviço está ativo
    if (service.status !== 'active') {
      throw new Error('Serviço não está disponível no momento');
    }

    // Criar a solicitação
    const requestData = {
      service_id: serviceId,
      user_id: userData.user_id || null,
      user_name: userData.user_name,
      user_email: userData.user_email,
      user_phone: userData.user_phone,
      user_country: userData.user_country,
      organization: userData.organization,
      sector: userData.sector,
      message: userData.message,
      scheduled_date: userData.scheduled_date,
      status: 'pending' as const,
      priority: 'medium' as const,
    };

    const { data, error } = await supabase
      .from('service_requests')
      .insert(requestData)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar solicitação:', error);
      throw error;
    }

    // Enviar notificação (pode ser implementado depois)
    await sendServiceRequestNotification(data);

    return data;
  } catch (error) {
    console.error('Erro ao solicitar serviço:', error);
    throw error;
  }
}

/**
 * Buscar solicitações de serviço de um usuário
 * @param userId - ID do usuário (opcional, se não fornecido busca por email)
 * @param userEmail - Email do usuário (opcional)
 * @returns Lista de solicitações
 */
export async function getServiceRequests(
  userId?: string,
  userEmail?: string
): Promise<ServiceRequest[]> {
  try {
    let query = supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    } else if (userEmail) {
      query = query.eq('user_email', userEmail);
    } else {
      throw new Error('É necessário fornecer userId ou userEmail');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar solicitações:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error);
    throw error;
  }
}

/**
 * Buscar todas as solicitações de serviço (apenas admin)
 * @param filters - Filtros opcionais
 * @returns Lista de todas as solicitações
 */
export async function getAllServiceRequests(filters?: {
  status?: string;
  service_id?: string;
  priority?: string;
}): Promise<ServiceRequest[]> {
  try {
    let query = supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters) {
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.service_id) {
        query = query.eq('service_id', filters.service_id);
      }
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar todas as solicitações:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar todas as solicitações:', error);
    throw error;
  }
}

/**
 * Atualizar status de uma solicitação de serviço
 * @param requestId - ID da solicitação
 * @param status - Novo status
 * @param notes - Notas adicionais (opcional)
 * @returns Solicitação atualizada
 */
export async function updateServiceRequest(
  requestId: string,
  status: ServiceRequest['status'],
  notes?: string
): Promise<ServiceRequest> {
  try {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (notes) {
      updateData.notes = notes;
    }

    if (status === 'completed') {
      updateData.completed_date = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('service_requests')
      .update(updateData)
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar solicitação:', error);
      throw error;
    }

    // Enviar notificação de atualização
    await sendRequestUpdateNotification(data);

    return data;
  } catch (error) {
    console.error('Erro ao atualizar solicitação:', error);
    throw error;
  }
}

/**
 * Atualizar prioridade de uma solicitação
 * @param requestId - ID da solicitação
 * @param priority - Nova prioridade
 * @returns Solicitação atualizada
 */
export async function updateRequestPriority(
  requestId: string,
  priority: ServiceRequest['priority']
): Promise<ServiceRequest> {
  try {
    const { data, error } = await supabase
      .from('service_requests')
      .update({
        priority,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar prioridade:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao atualizar prioridade:', error);
    throw error;
  }
}

/**
 * Cancelar solicitação de serviço
 * @param requestId - ID da solicitação
 * @param reason - Motivo do cancelamento (opcional)
 * @returns Solicitação cancelada
 */
export async function cancelServiceRequest(
  requestId: string,
  reason?: string
): Promise<ServiceRequest> {
  try {
    const notes = reason ? `Cancelado: ${reason}` : 'Cancelado pelo usuário';
    return await updateServiceRequest(requestId, 'cancelled', notes);
  } catch (error) {
    console.error('Erro ao cancelar solicitação:', error);
    throw error;
  }
}

// ============================================================================
// FUNÇÕES ADMINISTRATIVAS (CRUD DE SERVIÇOS)
// ============================================================================

/**
 * Criar novo serviço regional (apenas admin)
 * @param serviceData - Dados do serviço
 * @returns Serviço criado
 */
export async function createService(
  serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>
): Promise<Service> {
  try {
    // Validar dados
    validateServiceData(serviceData);

    const { data, error } = await supabase
      .from('regional_services')
      .insert({
        ...serviceData,
        status: serviceData.status || 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar serviço:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    throw error;
  }
}

/**
 * Atualizar serviço existente (apenas admin)
 * @param id - ID do serviço
 * @param serviceData - Dados atualizados
 * @returns Serviço atualizado
 */
export async function updateService(
  id: string,
  serviceData: Partial<Service>
): Promise<Service> {
  try {
    const { data, error } = await supabase
      .from('regional_services')
      .update({
        ...serviceData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar serviço:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    throw error;
  }
}

/**
 * Deletar serviço (apenas admin) - soft delete
 * @param id - ID do serviço
 * @returns Serviço arquivado
 */
export async function deleteService(id: string): Promise<Service> {
  try {
    // Soft delete - apenas arquiva o serviço
    return await updateService(id, { status: 'archived' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    throw error;
  }
}

/**
 * Deletar serviço permanentemente (apenas admin)
 * @param id - ID do serviço
 * @returns Sucesso
 */
export async function permanentlyDeleteService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('regional_services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar serviço permanentemente:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar serviço permanentemente:', error);
    throw error;
  }
}

// ============================================================================
// FUNÇÕES DE ESTATÍSTICAS
// ============================================================================

/**
 * Obter estatísticas dos serviços regionais
 * @returns Estatísticas completas
 */
export async function getServiceStats(): Promise<ServiceStats> {
  try {
    // Buscar todos os serviços
    const { data: services } = await supabase
      .from('regional_services')
      .select('category, status, countries');

    // Buscar todas as solicitações
    const { data: requests } = await supabase
      .from('service_requests')
      .select('status');

    const stats: ServiceStats = {
      totalServices: services?.length || 0,
      activeServices: services?.filter(s => s.status === 'active').length || 0,
      totalRequests: requests?.length || 0,
      pendingRequests: requests?.filter(r => r.status === 'pending').length || 0,
      approvedRequests: requests?.filter(r => r.status === 'approved').length || 0,
      completedRequests: requests?.filter(r => r.status === 'completed').length || 0,
      servicesByCategory: {},
      servicesByCountry: {},
      requestsByStatus: {},
    };

    // Calcular serviços por categoria
    services?.forEach(service => {
      stats.servicesByCategory[service.category] =
        (stats.servicesByCategory[service.category] || 0) + 1;
    });

    // Calcular serviços por país
    services?.forEach(service => {
      service.countries?.forEach((country: string) => {
        stats.servicesByCountry[country] =
          (stats.servicesByCountry[country] || 0) + 1;
      });
    });

    // Calcular solicitações por status
    requests?.forEach(request => {
      stats.requestsByStatus[request.status] =
        (stats.requestsByStatus[request.status] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    throw error;
  }
}

// ============================================================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================================================

/**
 * Validar dados de serviço
 * @param data - Dados do serviço a validar
 * @throws Error se dados inválidos
 */
export function validateServiceData(data: any): void {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Título deve ter pelo menos 3 caracteres');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Descrição deve ter pelo menos 10 caracteres');
  }

  const validCategories = ['saude', 'educacao', 'comercio', 'turismo', 'transporte', 'tecnologia'];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push('Categoria inválida');
  }

  if (!data.countries || !Array.isArray(data.countries) || data.countries.length === 0) {
    errors.push('Pelo menos um país deve ser selecionado');
  }

  if (!data.price || data.price.trim().length === 0) {
    errors.push('Preço é obrigatório');
  }

  if (!data.duration || data.duration.trim().length === 0) {
    errors.push('Duração é obrigatória');
  }

  if (errors.length > 0) {
    throw new Error(`Dados inválidos: ${errors.join(', ')}`);
  }
}

/**
 * Verificar elegibilidade do usuário para um serviço
 * @param userId - ID do usuário
 * @param serviceId - ID do serviço
 * @returns Se o usuário é elegível
 */
export async function checkUserEligibility(
  userId: string,
  serviceId: string
): Promise<{ eligible: boolean; reason?: string }> {
  try {
    const service = await getServiceById(serviceId);
    if (!service) {
      return { eligible: false, reason: 'Serviço não encontrado' };
    }

    if (service.status !== 'active') {
      return { eligible: false, reason: 'Serviço não está ativo' };
    }

    // Verificar se usuário já tem solicitação pendente para este serviço
    const existingRequests = await supabase
      .from('service_requests')
      .select('id, status')
      .eq('user_id', userId)
      .eq('service_id', serviceId)
      .in('status', ['pending', 'approved', 'in_progress']);

    if (existingRequests.data && existingRequests.data.length > 0) {
      return {
        eligible: false,
        reason: 'Você já possui uma solicitação ativa para este serviço'
      };
    }

    return { eligible: true };
  } catch (error) {
    console.error('Erro ao verificar elegibilidade:', error);
    return { eligible: false, reason: 'Erro ao verificar elegibilidade' };
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES DE NOTIFICAÇÃO
// ============================================================================

/**
 * Enviar notificação de nova solicitação de serviço
 * @param request - Dados da solicitação
 */
async function sendServiceRequestNotification(request: ServiceRequest): Promise<void> {
  // TODO: Implementar envio de email/notificação
  // Por enquanto, apenas log
  console.log('Nova solicitação de serviço:', {
    service_id: request.service_id,
    user_email: request.user_email,
    status: request.status,
  });
}

/**
 * Enviar notificação de atualização de solicitação
 * @param request - Dados da solicitação atualizada
 */
async function sendRequestUpdateNotification(request: ServiceRequest): Promise<void> {
  // TODO: Implementar envio de email/notificação
  // Por enquanto, apenas log
  console.log('Solicitação atualizada:', {
    id: request.id,
    status: request.status,
    user_email: request.user_email,
  });
}

// ============================================================================
// EXPORTAÇÕES
// ============================================================================

export default {
  // Consultas
  getAllServices,
  getServiceById,
  getServicesByCategory,
  getServicesByCountry,
  getFeaturedServices,
  searchServices,

  // Solicitações
  requestService,
  getServiceRequests,
  getAllServiceRequests,
  updateServiceRequest,
  updateRequestPriority,
  cancelServiceRequest,

  // Admin
  createService,
  updateService,
  deleteService,
  permanentlyDeleteService,

  // Estatísticas
  getServiceStats,

  // Validação
  validateServiceData,
  checkUserEligibility,
};
