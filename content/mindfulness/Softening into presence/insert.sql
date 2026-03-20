-- Insert: Softening into Presence
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
  'softening-into-presence',
  '{"en": "Softening into Presence", "es": "Suavizando hacia la Presencia"}',
  'Mindfulness Practice',
  '{"en": "Presence emerges not through force or control, but through a gentle softening of resistance. By releasing tension in body and mind, we naturally arrive in the here and now.", "es": "La presencia emerge no a través de la fuerza o el control, sino a través de un suave abandono de la resistencia. Al liberar la tensión en el cuerpo y la mente, llegamos naturalmente al aquí y ahora."}',
  '/api/books/softening-into-presence/cover',
  '/api/books/softening-into-presence/audio',
  NULL,
  142, -- Ajustar duración real en segundos
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

