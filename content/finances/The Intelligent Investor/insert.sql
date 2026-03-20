-- Insert: The Intelligent Investor
-- Author: Benjamin Graham
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
  'the-intelligent-investor',
  '{"en": "The Intelligent Investor", "es": "El Inversor Inteligente"}',
  'Benjamin Graham',
  '{"en": "Intelligent investing requires emotional discipline, rational analysis, and a value-oriented philosophy. Graham distinguishes between investing and speculation, introducing timeless ideas like margin of safety and Mr. Market.", "es": "La inversión inteligente requiere disciplina emocional, análisis racional y una filosofía orientada al valor. Graham distingue entre inversión y especulación, introduciendo ideas atemporales como el margen de seguridad y Mr. Market."}',
  '/api/books/the-intelligent-investor/cover',
  '/api/books/the-intelligent-investor/audio',
  '/api/books/the-intelligent-investor/pdf',
  159, -- Ajustar duración real en segundos
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

