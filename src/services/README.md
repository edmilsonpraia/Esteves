# Serviços Regionais - Guia de Uso

Este guia mostra como usar as funções de serviços regionais em seus componentes.

## Importação

```typescript
import {
  requestService,
  getAllServices,
  getServiceRequests,
  updateServiceRequest,
  getFeaturedServices,
  searchServices
} from '../services/regionalServices';
```

## Exemplo 1: Solicitar um Serviço (Services.tsx)

```typescript
import { requestService } from '../services/regionalServices';
import { useAuth } from '../context/AuthContext';

// No componente Services.tsx, substituir a função handleRequestService:
const handleRequestService = async (service: Service) => {
  try {
    setIsSubmitting(true);

    // Se o usuário estiver logado, pegar dados do contexto
    const userData = {
      user_id: user?.id, // Opcional
      user_name: user?.name || 'Usuário',
      user_email: user?.email || '',
      user_phone: user?.phone,
      user_country: 'Angola', // Ou pegar do perfil do usuário
      organization: user?.organization,
      sector: service.category,
      message: `Gostaria de mais informações sobre: ${service.title}`,
    };

    const request = await requestService(service.id, userData);

    // Mostrar mensagem de sucesso
    alert(`✅ Solicitação enviada com sucesso!\n\nNúmero: ${request.id}\nStatus: ${request.status}`);

  } catch (error) {
    console.error('Erro ao solicitar serviço:', error);
    alert('❌ Erro ao enviar solicitação. Por favor, tente novamente.');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Exemplo 2: Buscar Serviços com Filtros

```typescript
import { getAllServices, getServicesByCategory } from '../services/regionalServices';

// Buscar todos os serviços ativos
const loadServices = async () => {
  const services = await getAllServices();
  setServices(services);
};

// Buscar serviços por categoria
const loadHealthServices = async () => {
  const healthServices = await getServicesByCategory('saude');
  setServices(healthServices);
};

// Buscar com múltiplos filtros
const loadFilteredServices = async () => {
  const services = await getAllServices({
    category: 'educacao',
    country: 'Angola',
    featured: true
  });
  setServices(services);
};

// Buscar por texto
const handleSearch = async (query: string) => {
  const results = await searchServices(query);
  setServices(results);
};
```

## Exemplo 3: Dashboard de Usuário - Ver Minhas Solicitações

```typescript
import { getServiceRequests } from '../services/regionalServices';

const MyRequests: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadMyRequests = async () => {
      if (user) {
        const myRequests = await getServiceRequests(user.id);
        setRequests(myRequests);
      }
    };

    loadMyRequests();
  }, [user]);

  return (
    <div>
      <h2>Minhas Solicitações</h2>
      {requests.map(request => (
        <div key={request.id}>
          <h3>{request.service?.title}</h3>
          <p>Status: {request.status}</p>
          <p>Prioridade: {request.priority}</p>
          <p>Data: {new Date(request.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};
```

## Exemplo 4: Admin - Gerenciar Solicitações

```typescript
import {
  getAllServiceRequests,
  updateServiceRequest,
  updateRequestPriority
} from '../services/regionalServices';

const AdminServiceRequests: React.FC = () => {
  const [requests, setRequests] = useState([]);

  // Carregar todas as solicitações
  const loadRequests = async () => {
    const allRequests = await getAllServiceRequests();
    setRequests(allRequests);
  };

  // Filtrar apenas pendentes
  const loadPendingRequests = async () => {
    const pending = await getAllServiceRequests({ status: 'pending' });
    setRequests(pending);
  };

  // Aprovar solicitação
  const handleApprove = async (requestId: string) => {
    try {
      const updated = await updateServiceRequest(
        requestId,
        'approved',
        'Solicitação aprovada pela equipe'
      );

      // Atualizar lista
      setRequests(prev =>
        prev.map(req => req.id === requestId ? updated : req)
      );

      alert('Solicitação aprovada!');
    } catch (error) {
      console.error('Erro ao aprovar:', error);
    }
  };

  // Alterar prioridade
  const handleChangePriority = async (requestId: string, priority: string) => {
    try {
      await updateRequestPriority(requestId, priority as any);
      loadRequests(); // Recarregar
    } catch (error) {
      console.error('Erro ao alterar prioridade:', error);
    }
  };

  return (
    <div>
      {/* UI aqui */}
    </div>
  );
};
```

## Exemplo 5: Criar Serviço (Admin)

```typescript
import { createService, validateServiceData } from '../services/regionalServices';

const CreateServiceForm: React.FC = () => {
  const handleSubmit = async (formData: any) => {
    try {
      // Validar dados antes de criar
      validateServiceData(formData);

      const newService = await createService({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        countries: formData.countries, // ['Angola', 'Namíbia']
        features: formData.features, // array de strings
        price: formData.price,
        duration: formData.duration,
        image: formData.image,
        icon: formData.icon,
        featured: formData.featured || false,
        providers: formData.providers,
        requirements: formData.requirements,
        benefits: formData.benefits,
        status: 'active'
      });

      alert(`Serviço criado com sucesso! ID: ${newService.id}`);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
    </form>
  );
};
```

## Exemplo 6: Verificar Elegibilidade

```typescript
import { checkUserEligibility } from '../services/regionalServices';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { user } = useAuth();

  const handleRequestClick = async () => {
    if (!user) {
      alert('Por favor, faça login para solicitar este serviço');
      return;
    }

    // Verificar se o usuário pode solicitar
    const { eligible, reason } = await checkUserEligibility(user.id, service.id);

    if (!eligible) {
      alert(`Não é possível solicitar este serviço: ${reason}`);
      return;
    }

    // Prosseguir com a solicitação
    await handleRequestService(service);
  };

  return (
    <button onClick={handleRequestClick}>
      Solicitar Serviço
    </button>
  );
};
```

## Exemplo 7: Estatísticas (Admin Dashboard)

```typescript
import { getServiceStats } from '../services/regionalServices';

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const serviceStats = await getServiceStats();
      setStats(serviceStats);
    };

    loadStats();
  }, []);

  if (!stats) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Estatísticas de Serviços</h2>
      <p>Total de Serviços: {stats.totalServices}</p>
      <p>Serviços Ativos: {stats.activeServices}</p>
      <p>Total de Solicitações: {stats.totalRequests}</p>
      <p>Solicitações Pendentes: {stats.pendingRequests}</p>
      <p>Solicitações Aprovadas: {stats.approvedRequests}</p>
      <p>Solicitações Completas: {stats.completedRequests}</p>

      <h3>Por Categoria:</h3>
      <ul>
        {Object.entries(stats.servicesByCategory).map(([cat, count]) => (
          <li key={cat}>{cat}: {count}</li>
        ))}
      </ul>

      <h3>Por País:</h3>
      <ul>
        {Object.entries(stats.servicesByCountry).map(([country, count]) => (
          <li key={country}>{country}: {count}</li>
        ))}
      </ul>
    </div>
  );
};
```

## Status Disponíveis

Para solicitações de serviço:
- `pending` - Aguardando aprovação
- `approved` - Aprovada
- `rejected` - Rejeitada
- `in_progress` - Em andamento
- `completed` - Concluída
- `cancelled` - Cancelada

## Prioridades Disponíveis

- `low` - Baixa
- `medium` - Média
- `high` - Alta
- `urgent` - Urgente

## Categorias de Serviços

- `saude` - Saúde
- `educacao` - Educação
- `comercio` - Comércio
- `turismo` - Turismo
- `transporte` - Transporte
- `tecnologia` - Tecnologia

## Notas Importantes

1. **Autenticação**: Algumas funções podem requerer que o usuário esteja autenticado
2. **Permissões**: Funções administrativas (criar, atualizar, deletar serviços) devem verificar se o usuário tem permissões de admin
3. **Validação**: Use `validateServiceData()` antes de criar ou atualizar serviços
4. **Error Handling**: Sempre use try/catch para capturar erros
5. **Feedback ao Usuário**: Mostre mensagens de sucesso ou erro apropriadas

## Tabelas do Supabase Necessárias

Certifique-se de que as seguintes tabelas existem no Supabase:

1. `regional_services` - Armazena os serviços regionais
2. `service_requests` - Armazena as solicitações de serviços

Veja o arquivo principal `regionalServices.ts` para os scripts SQL de criação das tabelas.
