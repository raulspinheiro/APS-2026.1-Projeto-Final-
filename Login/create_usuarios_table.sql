/*
  # Criação da tabela de usuários - F-PluvIA Metropolitan

  ## Descrição
  Cria a tabela `usuarios` para armazenar os dados dos usuários autenticados
  via Google OAuth no sistema F-PluvIA Metropolitan.

  ## Novas Tabelas

  ### `usuarios`
  - `id` (uuid, chave primária) - Identificador único do usuário
  - `auth_id` (uuid, único) - ID do usuário na tabela auth.users do Supabase
  - `nome` (text) - Nome completo do usuário proveniente do Google
  - `email` (text, único) - Endereço de e-mail do usuário
  - `avatar_url` (text, nullable) - URL da foto de perfil do Google
  - `ultimo_acesso` (timestamptz) - Data e hora do último acesso ao sistema
  - `criado_em` (timestamptz) - Data e hora do primeiro cadastro
  - `atualizado_em` (timestamptz) - Data e hora da última atualização

  ## Segurança
  - RLS habilitado na tabela `usuarios`
  - Política de SELECT: usuários autenticados podem visualizar apenas seus próprios dados
  - Política de INSERT: usuários autenticados podem inserir apenas seus próprios dados
  - Política de UPDATE: usuários autenticados podem atualizar apenas seus próprios dados

  ## Observações
  - O campo `auth_id` referencia o ID gerado pelo Supabase Auth após login Google
  - A função `atualizar_timestamp` é criada para manter o campo `atualizado_em` sincronizado
*/

CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE NOT NULL,
  nome text NOT NULL DEFAULT '',
  email text UNIQUE NOT NULL,
  avatar_url text,
  ultimo_acesso timestamptz DEFAULT now(),
  criado_em timestamptz DEFAULT now(),
  atualizado_em timestamptz DEFAULT now()
);

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem visualizar seus próprios dados"
  ON usuarios FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Usuários podem inserir seus próprios dados"
  ON usuarios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Usuários podem atualizar seus próprios dados"
  ON usuarios FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id)
  WITH CHECK (auth.uid() = auth_id);

CREATE INDEX IF NOT EXISTS idx_usuarios_auth_id ON usuarios(auth_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);

CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers
    WHERE trigger_name = 'trigger_atualizar_timestamp_usuarios'
  ) THEN
    CREATE TRIGGER trigger_atualizar_timestamp_usuarios
      BEFORE UPDATE ON usuarios
      FOR EACH ROW
      EXECUTE FUNCTION atualizar_timestamp();
  END IF;
END $$;
