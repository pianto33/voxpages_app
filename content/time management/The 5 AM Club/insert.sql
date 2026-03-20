-- Insert: The 5 AM Club
-- Author: Robin Sharma
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
  'the-5-am-club',
  '{"en": "The 5 AM Club", "es": "El Club de las 5 de la Mañana"}',
  'Robin Sharma',
  '{"en": "Own your morning, elevate your life. Sharma presents a revolutionary morning routine that harnesses the power of early rising and the 20/20/20 formula to maximize productivity, health, and personal mastery.", "es": "Domina tu mañana, eleva tu vida. Sharma presenta una rutina matutina revolucionaria que aprovecha el poder de levantarse temprano y la fórmula 20/20/20 para maximizar la productividad, la salud y el dominio personal."}',
  '/api/books/the-5-am-club/cover',
  '/api/books/the-5-am-club/audio',
  '/api/books/the-5-am-club/pdf',
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
