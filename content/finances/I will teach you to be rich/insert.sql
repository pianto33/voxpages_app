-- Insert: I Will Teach You to Be Rich
-- Author: Ramit Sethi
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
  'i-will-teach-you-to-be-rich',
  '{"en": "I Will Teach You to Be Rich", "es": "Te Enseñaré a Ser Rico"}',
  'Ramit Sethi',
  '{"en": "A rich life isn''t about deprivation — it''s about intentional design and automation. Sethi teaches a modern, guilt-free, and practical system to manage money through automation and conscious spending.", "es": "Una vida rica no se trata de privación, sino de diseño intencional y automatización. Sethi enseña un sistema moderno, libre de culpa y práctico para manejar el dinero a través de la automatización y el gasto consciente."}',
  '/api/books/i-will-teach-you-to-be-rich/cover',
  '/api/books/i-will-teach-you-to-be-rich/audio',
  '/api/books/i-will-teach-you-to-be-rich/pdf',
  801, -- Ajustar duración real en segundos
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

