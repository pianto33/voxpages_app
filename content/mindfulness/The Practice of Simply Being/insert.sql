-- Insert: The Practice of Simply Being
-- Author: Mindfulness Practice
-- Category: Mindfulness

-- Primero asegurar que la categoría mindfulness existe
INSERT INTO public.categories (slug, name, description, icon, display_order)
VALUES (
  'mindfulness',
  '{"en": "Mindfulness", "es": "Mindfulness"}',
  '{"en": "Meditation and mindful awareness practices", "es": "Meditación y prácticas de conciencia plena"}',
  '🧘',
  10
)
ON CONFLICT (slug) DO NOTHING;

-- Insertar el libro
INSERT INTO public.books (
  slug,
  title,
  author,
  description,
  cover_url,
  audio_url,
  pdf_url,
  duration,
  category_id,
  is_featured,
  publish_status,
  published_at
) VALUES (
  'the-practice-of-simply-being',
  '{"en": "The Practice of Simply Being", "es": "La Práctica de Simplemente Ser"}',
  'Mindfulness Practice',
  '{"en": "Beneath all our doing, striving, and becoming lies the simple joy of being. This practice invites us to rest in pure awareness, discovering the freedom of existence itself.", "es": "Debajo de todo nuestro hacer, esforzarse y llegar a ser, yace la simple alegría de ser. Esta práctica nos invita a descansar en la conciencia pura, descubriendo la libertad de la existencia misma."}',
  '/api/books/the-practice-of-simply-being/cover',
  '/api/books/the-practice-of-simply-being/audio',
  NULL,
  159, -- Ajustar duración real en segundos
  (SELECT id FROM public.categories WHERE slug = 'mindfulness'),
  false,
  'published',
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  author = EXCLUDED.author,
  description = EXCLUDED.description,
  cover_url = EXCLUDED.cover_url,
  audio_url = EXCLUDED.audio_url,
  pdf_url = EXCLUDED.pdf_url,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  is_featured = EXCLUDED.is_featured,
  publish_status = EXCLUDED.publish_status,
  updated_at = NOW();

