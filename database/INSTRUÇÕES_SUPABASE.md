# 📋 Instruções para Criar Tabelas no Supabase

## Passo a Passo

### 1️⃣ Acessar o Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Selecione o projeto **ELVES** (ou o nome do seu projeto)

### 2️⃣ Abrir o SQL Editor
1. No menu lateral esquerdo, clique em **SQL Editor** (ícone 📝)
2. Clique em **+ New query** para criar uma nova consulta

### 3️⃣ Executar o Script SQL
1. Abra o arquivo `create_regional_services_tables.sql` nesta pasta
2. Copie TODO o conteúdo do arquivo
3. Cole no editor SQL do Supabase
4. Clique em **RUN** (ou pressione Ctrl+Enter / Cmd+Enter)

### 4️⃣ Verificar se deu certo
Após executar, você deve ver uma mensagem de sucesso e uma tabela mostrando:

```
tabela              | total_registros
--------------------|----------------
regional_services   | 6
service_requests    | 0
```

Isso significa que:
- ✅ A tabela `regional_services` foi criada com 6 serviços de exemplo
- ✅ A tabela `service_requests` foi criada e está vazia (aguardando solicitações)

### 5️⃣ Verificar as Tabelas Criadas
1. No menu lateral, clique em **Table Editor** (ícone 📊)
2. Você deve ver as novas tabelas:
   - `regional_services` - 6 linhas
   - `service_requests` - 0 linhas

### 6️⃣ Atualizar a Aplicação
1. Volte para o projeto no VS Code
2. Recarregue a página do navegador (F5)
3. Acesse o **Admin Dashboard**
4. As solicitações agora devem aparecer corretamente!

## 🔍 Verificações Adicionais

### Verificar Políticas de Segurança (RLS)
1. No Supabase, vá em **Authentication** → **Policies**
2. Selecione a tabela `regional_services`
3. Você deve ver as políticas criadas:
   - ✅ "Serviços públicos visíveis para todos"
   - ✅ "Admins podem ver todos os serviços"
   - ✅ "Admins podem criar serviços"
   - ✅ "Admins podem atualizar serviços"
   - ✅ "Admins podem deletar serviços"

4. Selecione a tabela `service_requests`
5. Você deve ver:
   - ✅ "Usuários podem ver suas próprias solicitações"
   - ✅ "Admins podem ver todas as solicitações"
   - ✅ "Usuários podem criar solicitações"
   - ✅ "Admins podem atualizar solicitações"
   - ✅ "Usuários podem atualizar suas solicitações"

## ❗ Resolução de Problemas

### Erro: "relation already exists"
- **Solução**: As tabelas já existem. Você pode ignorar ou deletá-las e executar novamente.

### Erro: "permission denied"
- **Solução**: Verifique se você está usando uma conta com permissões de administrador no Supabase.

### Erro: "violates foreign key constraint"
- **Solução**: Execute o script completo de uma vez só, sem executar partes separadas.

### As solicitações não aparecem no Admin
1. Verifique se as tabelas foram criadas corretamente
2. Verifique se o projeto no Supabase está correto
3. Verifique o arquivo `.env` se as credenciais estão corretas:
   ```
   REACT_APP_SUPABASE_URL=sua-url-aqui
   REACT_APP_SUPABASE_ANON_KEY=sua-chave-aqui
   ```

## 📊 Estrutura das Tabelas Criadas

### Tabela: `regional_services`
Armazena os serviços regionais disponíveis.

**Campos principais:**
- `id` - UUID único
- `title` - Título do serviço
- `description` - Descrição detalhada
- `category` - Categoria (saude, educacao, comercio, turismo, transporte, tecnologia)
- `countries` - Array de países atendidos
- `features` - Array de funcionalidades
- `price` - Preço/investimento
- `duration` - Duração do serviço
- `icon` - Emoji do serviço
- `featured` - Se é serviço em destaque
- `status` - Status (active, inactive, archived)

### Tabela: `service_requests`
Armazena as solicitações de serviços feitas pelos usuários.

**Campos principais:**
- `id` - UUID único
- `service_id` - ID do serviço solicitado (foreign key)
- `user_id` - ID do usuário (foreign key para auth.users)
- `user_name` - Nome do solicitante
- `user_email` - Email do solicitante
- `user_phone` - Telefone (opcional)
- `user_country` - País do solicitante
- `organization` - Organização (opcional)
- `sector` - Setor (opcional)
- `message` - Mensagem/detalhes
- `status` - Status da solicitação (pending, approved, rejected, in_progress, completed, cancelled)
- `priority` - Prioridade (low, medium, high, urgent)
- `scheduled_date` - Data agendada (opcional)
- `completed_date` - Data de conclusão (opcional)
- `notes` - Notas administrativas (opcional)

## 🎉 Pronto!

Após seguir estes passos, o sistema de serviços regionais estará completamente funcional!

Você poderá:
- ✅ Ver os 6 serviços regionais na página Services
- ✅ Solicitar serviços pela interface
- ✅ Ver as solicitações no Admin Dashboard
- ✅ Atualizar status e prioridades das solicitações
- ✅ Filtrar solicitações por status

## 📞 Suporte

Se tiver algum problema, verifique:
1. Console do navegador (F12) para erros
2. Logs do Supabase na aba "Logs"
3. Configurações de RLS nas políticas
