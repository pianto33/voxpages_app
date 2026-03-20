-- Insert: The Body Keeps the Score
-- Author: Bessel van der Kolk
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
  'the-body-keeps-the-score',
  '{"en": "The Body Keeps the Score", "es": "El Cuerpo Lleva la Cuenta"}',
  'Bessel van der Kolk',
  '{"en": "Trauma reshapes both brain and body, and healing requires addressing both. Van der Kolk synthesizes decades of research to show how trauma manifests physically and offers paths to recovery through body-based therapies.", "es": "El trauma remodela tanto el cerebro como el cuerpo, y la sanación requiere abordar ambos. Van der Kolk sintetiza décadas de investigación para mostrar cómo el trauma se manifiesta físicamente y ofrece caminos hacia la recuperación a través de terapias basadas en el cuerpo."}',
  '/api/books/the-body-keeps-the-score/cover',
  '/api/books/the-body-keeps-the-score/audio',
  '/api/books/the-body-keeps-the-score/pdf',
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
