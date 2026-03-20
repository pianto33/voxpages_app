-- Insert: Returning to the Present Moment
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
  'returning-to-the-present-moment',
  '{"en": "Returning to the Present Moment", "es": "Regresando al Momento Presente"}',
  'Mindfulness Practice',
  '{"en": "True peace and clarity emerge when we learn to anchor ourselves in the present moment, releasing attachment to past regrets and future anxieties.", "es": "La verdadera paz y claridad emergen cuando aprendemos a anclarnos en el momento presente, liberando el apego a los arrepentimientos del pasado y las ansiedades del futuro."}',
  '/api/books/returning-to-the-present-moment/cover',
  '/api/books/returning-to-the-present-moment/audio',
  NULL,
  151, -- Ajustar duración real en segundos
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

