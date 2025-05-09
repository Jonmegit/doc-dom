-- Crear tabla para tokens de verificación
CREATE TABLE IF NOT EXISTS verification_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false
);

-- Crear índices
CREATE INDEX IF NOT EXISTS verification_tokens_user_id_idx ON verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS verification_tokens_token_idx ON verification_tokens(token);

-- Configurar políticas de seguridad
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- Política para que solo el servicio pueda acceder a los tokens
CREATE POLICY "Service role can manage verification tokens" 
ON verification_tokens 
USING (true)
WITH CHECK (true);

-- Otorgar permisos
GRANT ALL ON verification_tokens TO service_role;
