-- ============================================================================
-- SCRIPT DE CRIAÇÃO DAS TABELAS DE SERVIÇOS REGIONAIS
-- Execute este script no Supabase SQL Editor
-- ============================================================================

-- 1. CRIAR TABELA DE SERVIÇOS REGIONAIS
-- ============================================================================
CREATE TABLE IF NOT EXISTS regional_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('saude', 'educacao', 'comercio', 'turismo', 'transporte', 'tecnologia')),
  countries TEXT[] NOT NULL,
  features TEXT[] NOT NULL,
  price TEXT NOT NULL,
  duration TEXT NOT NULL,
  image TEXT NOT NULL,
  icon TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  providers TEXT[] NOT NULL,
  requirements TEXT[] NOT NULL,
  benefits TEXT[] NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CRIAR TABELA DE SOLICITAÇÕES DE SERVIÇOS
-- ============================================================================
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES regional_services(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  user_country TEXT NOT NULL,
  organization TEXT,
  sector TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CRIAR ÍNDICES PARA MELHOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_regional_services_category ON regional_services(category);
CREATE INDEX IF NOT EXISTS idx_regional_services_status ON regional_services(status);
CREATE INDEX IF NOT EXISTS idx_regional_services_featured ON regional_services(featured);
CREATE INDEX IF NOT EXISTS idx_service_requests_service_id ON service_requests(service_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON service_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_user_email ON service_requests(user_email);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_priority ON service_requests(priority);

-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE regional_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- 5. CRIAR POLÍTICAS DE SEGURANÇA
-- ============================================================================

-- Política: Todos podem ver serviços ativos
DROP POLICY IF EXISTS "Serviços públicos visíveis para todos" ON regional_services;
CREATE POLICY "Serviços públicos visíveis para todos" ON regional_services
  FOR SELECT USING (status = 'active');

-- Política: Admins podem ver todos os serviços
DROP POLICY IF EXISTS "Admins podem ver todos os serviços" ON regional_services;
CREATE POLICY "Admins podem ver todos os serviços" ON regional_services
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Política: Admins podem inserir serviços
DROP POLICY IF EXISTS "Admins podem criar serviços" ON regional_services;
CREATE POLICY "Admins podem criar serviços" ON regional_services
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Política: Admins podem atualizar serviços
DROP POLICY IF EXISTS "Admins podem atualizar serviços" ON regional_services;
CREATE POLICY "Admins podem atualizar serviços" ON regional_services
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Política: Admins podem deletar serviços
DROP POLICY IF EXISTS "Admins podem deletar serviços" ON regional_services;
CREATE POLICY "Admins podem deletar serviços" ON regional_services
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Política: Usuários podem ver suas próprias solicitações
DROP POLICY IF EXISTS "Usuários podem ver suas próprias solicitações" ON service_requests;
CREATE POLICY "Usuários podem ver suas próprias solicitações" ON service_requests
  FOR SELECT USING (
    auth.uid() = user_id OR
    user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Política: Admins podem ver todas as solicitações
DROP POLICY IF EXISTS "Admins podem ver todas as solicitações" ON service_requests;
CREATE POLICY "Admins podem ver todas as solicitações" ON service_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Política: Qualquer pessoa pode criar solicitações
DROP POLICY IF EXISTS "Usuários podem criar solicitações" ON service_requests;
CREATE POLICY "Usuários podem criar solicitações" ON service_requests
  FOR INSERT WITH CHECK (true);

-- Política: Admins podem atualizar solicitações
DROP POLICY IF EXISTS "Admins podem atualizar solicitações" ON service_requests;
CREATE POLICY "Admins podem atualizar solicitações" ON service_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Política: Usuários podem atualizar suas próprias solicitações
DROP POLICY IF EXISTS "Usuários podem atualizar suas solicitações" ON service_requests;
CREATE POLICY "Usuários podem atualizar suas solicitações" ON service_requests
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. INSERIR DADOS DE EXEMPLO (SERVIÇOS REGIONAIS)
-- ============================================================================
INSERT INTO regional_services (
  title, description, category, countries, features, price, duration,
  image, icon, featured, providers, requirements, benefits, status
) VALUES
(
  'Rede de Telemedicina Regional',
  'Sistema integrado de telemedicina conectando hospitais e profissionais de saúde da região SADC para consultas remotas e intercâmbio médico.',
  'saude',
  ARRAY['Angola', 'Namíbia', 'África do Sul'],
  ARRAY['Consultas médicas remotas', 'Intercâmbio de especialistas', 'Prontuário eletrônico integrado', 'Telemedicina rural', 'Treinamento médico à distância', 'Rede de hospitais parceiros'],
  'A partir de $15.000',
  '3-6 meses',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop',
  '🏥',
  true,
  ARRAY['Clínica Sagrada Esperança (Angola)', 'Lady Pohamba Hospital (Namíbia)', 'Netcare Group (África do Sul)'],
  ARRAY['Licença médica válida', 'Conexão de internet estável', 'Equipamentos básicos'],
  ARRAY['Acesso a especialistas regionais', 'Redução de custos', 'Melhoria no atendimento'],
  'active'
),
(
  'Programa de Intercâmbio Universitário SADC',
  'Plataforma completa para intercâmbio acadêmico entre universidades de Angola, Namíbia e África do Sul, incluindo bolsas e certificações.',
  'educacao',
  ARRAY['Angola', 'Namíbia', 'África do Sul'],
  ARRAY['Portal de candidaturas online', 'Sistema de bolsas regionais', 'Reconhecimento de créditos', 'Suporte para estudantes', 'Programas de pesquisa conjunta', 'Certificação regional'],
  'Bolsas até $25.000',
  '6 meses - 2 anos',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=300&fit=crop',
  '🎓',
  true,
  ARRAY['Universidade Agostinho Neto', 'UNAM & NUST', 'UCT & Wits University'],
  ARRAY['Graduação em curso', 'Proficiência em inglês', 'Bom desempenho acadêmico'],
  ARRAY['Experiência internacional', 'Networking regional', 'Certificação reconhecida'],
  'active'
),
(
  'Marketplace Regional de Produtos Locais',
  'Plataforma de e-commerce especializada em produtos artesanais, agrícolas e industriais da região, facilitando o comércio transfronteiriço.',
  'comercio',
  ARRAY['Angola', 'Namíbia', 'África do Sul'],
  ARRAY['Loja virtual integrada', 'Logística transfronteiriça', 'Pagamentos multi-moeda', 'Marketing digital', 'Gestão de estoque', 'Suporte ao vendedor'],
  'Comissão de 5-12%',
  '1-3 meses setup',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=300&fit=crop',
  '🛒',
  true,
  ARRAY['Angola Export', 'Namibian Chamber of Commerce', 'SEDA (África do Sul)'],
  ARRAY['Produto/serviço válido', 'Documentação comercial', 'Capacidade de entrega'],
  ARRAY['Mercado ampliado', 'Maior visibilidade', 'Crescimento de vendas'],
  'active'
),
(
  'Roteiros de Turismo Sustentável Regional',
  'Desenvolvimento de roteiros turísticos integrados entre os três países, focando em sustentabilidade e experiências autênticas.',
  'turismo',
  ARRAY['Angola', 'Namíbia', 'África do Sul'],
  ARRAY['Roteiros personalizados', 'Reservas integradas', 'Guias locais certificados', 'Turismo comunitário', 'Experiências culturais', 'Suporte 24/7'],
  'Pacotes de $500 - $5.000',
  '3-21 dias',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=300&fit=crop',
  '🏨',
  false,
  ARRAY['Angola Tourism Board', 'Namibia Tourism', 'South Africa Tourism'],
  ARRAY['Passaporte válido', 'Seguro viagem', 'Vacinação em dia'],
  ARRAY['Experiências únicas', 'Impacto positivo local', 'Conexão cultural'],
  'active'
),
(
  'Sistema Integrado de Transporte Regional',
  'Plataforma digital para coordenação de voos, transporte terrestre e logística entre Angola, Namíbia e África do Sul.',
  'transporte',
  ARRAY['Angola', 'Namíbia', 'África do Sul'],
  ARRAY['Reservas multi-modal', 'Rastreamento em tempo real', 'Otimização de rotas', 'Gestão de carga', 'Documentação automática', 'Suporte multilíngue'],
  'Variável por serviço',
  'Contínuo',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=300&fit=crop',
  '✈️',
  false,
  ARRAY['TAAG Angola Airlines', 'FlyNamibia', 'South African Airways'],
  ARRAY['Documentação válida', 'Planejamento antecipado', 'Flexibilidade'],
  ARRAY['Viagens otimizadas', 'Economia de tempo', 'Redução de custos'],
  'active'
),
(
  'Hub de Inovação e Startups Regionais',
  'Ecossistema de apoio a startups e inovação tecnológica, conectando empreendedores da região com mentores, investidores e mercados.',
  'tecnologia',
  ARRAY['Angola', 'Namíbia', 'África do Sul'],
  ARRAY['Programa de aceleração', 'Mentoria especializada', 'Acesso a investidores', 'Coworking regional', 'Eventos de networking', 'Suporte jurídico/fiscal'],
  'Investimento até $200.000',
  '6-18 meses',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop',
  '💻',
  true,
  ARRAY['ISPTEC (Angola)', 'NUST (Namíbia)', 'Cape Town Innovation Hub'],
  ARRAY['Startup em estágio inicial', 'Potencial de escala', 'Equipe comprometida'],
  ARRAY['Aceleração do crescimento', 'Rede de contatos', 'Acesso a mercados'],
  'active'
)
ON CONFLICT (id) DO NOTHING;

-- 7. CRIAR FUNÇÃO PARA ATUALIZAR AUTOMATICAMENTE O CAMPO updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. CRIAR TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA
-- ============================================================================
DROP TRIGGER IF EXISTS update_regional_services_updated_at ON regional_services;
CREATE TRIGGER update_regional_services_updated_at
    BEFORE UPDATE ON regional_services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_requests_updated_at ON service_requests;
CREATE TRIGGER update_service_requests_updated_at
    BEFORE UPDATE ON service_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================

-- Verificar se as tabelas foram criadas
SELECT 'regional_services' as tabela, COUNT(*) as total_registros FROM regional_services
UNION ALL
SELECT 'service_requests' as tabela, COUNT(*) as total_registros FROM service_requests;
