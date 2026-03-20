-- Insert: The Total Money Makeover
-- Author: Dave Ramsey
-- Category: Finance

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
  'the-total-money-makeover',
  '{"en": "The Total Money Makeover", "es": "La Transformación Total de tu Dinero"}',
  'Dave Ramsey',
  '{"en": "Financial freedom comes from behavior change, not higher income. Ramsey''s 7-step plan provides a practical roadmap to eliminate debt, build savings, and create lasting wealth.", "es": "La libertad financiera proviene del cambio de comportamiento, no de mayores ingresos. El plan de 7 pasos de Ramsey proporciona una hoja de ruta práctica para eliminar deudas, construir ahorros y crear riqueza duradera."}',
  '/api/books/the-total-money-makeover/cover',
  '/api/books/the-total-money-makeover/audio',
  '/api/books/the-total-money-makeover/pdf',
  768, -- Ajustar duración real en segundos
  (SELECT id FROM public.categories WHERE slug = 'finance'),
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

