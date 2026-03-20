-- Insert: Behave
-- Author: Robert Sapolsky
-- Category: Mind and Brain

-- Primero asegurar que la categoría mind-and-brain existe
INSERT INTO public.categories (slug, name, description, icon, display_order)
VALUES (
  'mind-and-brain',
  '{"en": "Mind and Brain", "es": "Mente y Cerebro"}',
  '{"en": "Books about neuroscience, psychology and how the brain works", "es": "Libros sobre neurociencia, psicología y cómo funciona el cerebro"}',
  '🧠',
  5
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
  'behave',
  '{"en": "Behave", "es": "Compórtate"}',
  'Robert Sapolsky',
  '{"en": "Human behavior cannot be explained by any single factor — it emerges from a complex interplay of neuroscience, hormones, evolution, culture, and individual experience. Sapolsky takes us on a journey through the brain and beyond to understand why we do what we do.", "es": "El comportamiento humano no puede explicarse por un solo factor — emerge de una compleja interacción de neurociencia, hormonas, evolución, cultura y experiencia individual. Sapolsky nos lleva en un viaje a través del cerebro y más allá para entender por qué hacemos lo que hacemos."}',
  '/api/books/behave/cover',
  '/api/books/behave/audio',
  '/api/books/behave/pdf',
  900, -- Ajustar duración real en segundos
  (SELECT id FROM public.categories WHERE slug = 'mind-and-brain'),
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
