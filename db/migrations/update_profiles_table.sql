-- Actualizar la tabla de perfiles para usar 'verified' en lugar de 'active'
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS verified BOOLEAN NOT NULL DEFAULT false;

-- Si ya existe la columna 'active', podemos migrar los datos
UPDATE profiles 
SET verified = active 
WHERE verified = false AND active = true;

-- Actualizar las políticas de seguridad
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Only admins can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Only admins can delete profiles" ON profiles;

-- Crear nuevas políticas
CREATE POLICY "Users can view all profiles" 
ON profiles FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Anyone can insert profiles" 
ON profiles FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can delete profiles" 
ON profiles FOR DELETE 
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);
