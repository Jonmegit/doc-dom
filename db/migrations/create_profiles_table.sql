-- Crear la tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'reviewer', 'user')) DEFAULT 'user',
  active BOOLEAN NOT NULL DEFAULT false,
  department TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);
CREATE INDEX IF NOT EXISTS profiles_active_idx ON profiles(active);

-- Configurar políticas de seguridad a nivel de fila (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios autenticados puedan ver todos los perfiles
CREATE POLICY "Users can view all profiles" 
ON profiles FOR SELECT 
USING (auth.role() = 'authenticated');

-- Política para que los usuarios puedan actualizar su propio perfil
CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Política para que solo los administradores puedan crear perfiles
CREATE POLICY "Only admins can insert profiles" 
ON profiles FOR INSERT 
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  ) OR 
  (SELECT COUNT(*) FROM profiles) = 0  -- Permitir la creación del primer usuario
);

-- Política para que solo los administradores puedan eliminar perfiles
CREATE POLICY "Only admins can delete profiles" 
ON profiles FOR DELETE 
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Trigger para actualizar el campo updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_profiles_updated_at();

-- Otorgar permisos
GRANT ALL ON profiles TO service_role;
GRANT SELECT, UPDATE ON profiles TO authenticated;
GRANT SELECT ON profiles TO anon;
