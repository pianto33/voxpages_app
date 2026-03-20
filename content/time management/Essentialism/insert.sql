-- Insert: Essentialism
-- Author: Greg McKeown
-- Category: Time Management

-- Primero asegurar que la categoría time-management existe
INSERT INTO public.categories (slug, name, description, icon, display_order)
VALUES (
  'time-management',
  '{"en": "Time Management", "es": "Gestión del Tiempo"}',
  '{"en": "Books about productivity, focus and managing your time effectively", "es": "Libros sobre productividad, enfoque y gestión efectiva del tiempo"}',
  '⏰',
  6
)
ON CONFLICT (slug) DO NOTHING;

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
  'essentialism',
  '{"en": "Essentialism", "es": "Esencialismo"}',
  'Greg McKeown',
  '{"en": "Less but better. Essentialism is not about getting more things done — it''s about getting the right things done. McKeown teaches a disciplined pursuit of less, helping you focus on what truly matters.", "es": "Menos pero mejor. El esencialismo no se trata de hacer más cosas — se trata de hacer las cosas correctas. McKeown enseña una búsqueda disciplinada de menos, ayudándote a enfocarte en lo que realmente importa."}',
  '/api/books/essentialism/cover',
  '/api/books/essentialism/audio',
  '/api/books/essentialism/pdf',
  900, -- Ajustar duración real en segundos
  (SELECT id FROM public.categories WHERE slug = 'time-management'),
  true,
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
