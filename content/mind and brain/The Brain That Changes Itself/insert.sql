-- Insert: The Brain That Changes Itself
-- Author: Norman Doidge
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
  'the-brain-that-changes-itself',
  '{"en": "The Brain That Changes Itself", "es": "El Cerebro que se Cambia a Sí Mismo"}',
  'Norman Doidge',
  '{"en": "The brain is not a fixed organ but a dynamic, adaptable system capable of rewiring itself throughout life. Doidge presents compelling case studies demonstrating neuroplasticity — the brain''s ability to reorganize and heal.", "es": "El cerebro no es un órgano fijo sino un sistema dinámico y adaptable capaz de recablearse a lo largo de la vida. Doidge presenta casos de estudio convincentes que demuestran la neuroplasticidad — la capacidad del cerebro para reorganizarse y sanar."}',
  '/api/books/the-brain-that-changes-itself/cover',
  '/api/books/the-brain-that-changes-itself/audio',
  '/api/books/the-brain-that-changes-itself/pdf',
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
