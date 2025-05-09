-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de etiquetas
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de documentos
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT,
  file_size INTEGER,
  file_type TEXT,
  content_type TEXT,
  category_id UUID REFERENCES categories(id),
  created_by UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de relación entre documentos y etiquetas
CREATE TABLE IF NOT EXISTS document_tags (
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (document_id, tag_id)
);

-- Crear tabla de actividad de documentos
CREATE TABLE IF NOT EXISTS document_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar políticas de seguridad a nivel de fila (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_activity ENABLE ROW LEVEL SECURITY;

-- Políticas para categorías
CREATE POLICY "Users can view all categories" 
ON categories FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can insert categories" 
ON categories FOR INSERT 
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

CREATE POLICY "Only admins can update categories" 
ON categories FOR UPDATE 
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

CREATE POLICY "Only admins can delete categories" 
ON categories FOR DELETE 
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Políticas para etiquetas
CREATE POLICY "Users can view all tags" 
ON tags FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can insert tags" 
ON tags FOR INSERT 
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

CREATE POLICY "Only admins can update tags" 
ON tags FOR UPDATE 
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

CREATE POLICY "Only admins can delete tags" 
ON tags FOR DELETE 
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Políticas para documentos
CREATE POLICY "Users can view all documents" 
ON documents FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own documents" 
ON documents FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own documents" 
ON documents FOR UPDATE 
USING (
  auth.uid() = created_by OR 
  auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('admin', 'reviewer')
  )
);

CREATE POLICY "Only document owners and admins can delete documents" 
ON documents FOR DELETE 
USING (
  auth.uid() = created_by OR 
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Políticas para document_tags
CREATE POLICY "Users can view all document tags" 
ON document_tags FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert tags to their own documents" 
ON document_tags FOR INSERT 
WITH CHECK (
  auth.uid() IN (
    SELECT created_by FROM documents WHERE id = document_id
  ) OR 
  auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('admin', 'reviewer')
  )
);

CREATE POLICY "Users can delete tags from their own documents" 
ON document_tags FOR DELETE 
USING (
  auth.uid() IN (
    SELECT created_by FROM documents WHERE id = document_id
  ) OR 
  auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('admin', 'reviewer')
  )
);

-- Políticas para document_activity
CREATE POLICY "Users can view all document activity" 
ON document_activity FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "System can insert document activity" 
ON document_activity FOR INSERT 
WITH CHECK (true);

-- Otorgar permisos
GRANT ALL ON categories TO service_role;
GRANT ALL ON tags TO service_role;
GRANT ALL ON documents TO service_role;
GRANT ALL ON document_tags TO service_role;
GRANT ALL ON document_activity TO service_role;

GRANT SELECT ON categories TO authenticated;
GRANT SELECT ON tags TO authenticated;
GRANT SELECT ON documents TO authenticated;
GRANT SELECT ON document_tags TO authenticated;
GRANT SELECT ON document_activity TO authenticated;

-- Insertar algunas categorías de ejemplo
INSERT INTO categories (name, description, color)
VALUES 
  ('Contratos', 'Documentos contractuales y acuerdos', '#3b82f6'),
  ('Facturas', 'Facturas y documentos financieros', '#10b981'),
  ('Informes', 'Informes y reportes', '#f59e0b'),
  ('Presentaciones', 'Presentaciones y diapositivas', '#ef4444'),
  ('Legal', 'Documentos legales', '#8b5cf6'),
  ('Manuales', 'Manuales y guías', '#ec4899'),
  ('Marketing', 'Materiales de marketing', '#14b8a6'),
  ('Recursos Humanos', 'Documentos de RRHH', '#f97316')
ON CONFLICT DO NOTHING;

-- Insertar algunas etiquetas de ejemplo
INSERT INTO tags (name, color)
VALUES 
  ('Importante', '#ef4444'),
  ('Urgente', '#f97316'),
  ('Revisado', '#10b981'),
  ('Borrador', '#6b7280'),
  ('Confidencial', '#8b5cf6'),
  ('Archivado', '#1e40af'),
  ('En proceso', '#f59e0b'),
  ('Finalizado', '#10b981')
ON CONFLICT DO NOTHING;

-- Crear función para obtener estadísticas de documentos
CREATE OR REPLACE FUNCTION get_document_statistics()
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'totalDocuments', (SELECT COUNT(*) FROM documents),
    'pendingReview', (SELECT COUNT(*) FROM documents WHERE status = 'pending'),
    'recentlyUploaded', (SELECT COUNT(*) FROM documents WHERE created_at > NOW() - INTERVAL '7 days'),
    'documentsByType', (
      SELECT json_agg(json_build_object(
        'type', file_type,
        'count', COUNT(*)
      ))
      FROM (
        SELECT file_type, COUNT(*)
        FROM documents
        GROUP BY file_type
        ORDER BY COUNT(*) DESC
        LIMIT 5
      ) as type_counts
    ),
    'documentsByCategory', (
      SELECT json_agg(json_build_object(
        'category', c.name,
        'count', COUNT(*)
      ))
      FROM documents d
      JOIN categories c ON d.category_id = c.id
      GROUP BY c.name
      ORDER BY COUNT(*) DESC
      LIMIT 5
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;
