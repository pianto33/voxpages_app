-- Insert: Eat That Frog!
-- Author: Brian Tracy
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
  'eat-that-frog',
  '{"en": "Eat That Frog!", "es": "¡Tráguese Ese Sapo!"}',
  'Brian Tracy',
  '{"en": "Stop procrastinating and get more done by tackling your most important task first thing in the morning. Tracy provides 21 practical techniques to overcome procrastination and maximize productivity.", "es": "Deja de procrastinar y logra más abordando tu tarea más importante a primera hora de la mañana. Tracy proporciona 21 técnicas prácticas para superar la procrastinación y maximizar la productividad."}',
  '/api/books/eat-that-frog/cover',
  '/api/books/eat-that-frog/audio',
  '/api/books/eat-that-frog/pdf',
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
