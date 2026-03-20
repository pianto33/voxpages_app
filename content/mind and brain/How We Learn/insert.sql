-- Insert: How We Learn
-- Author: Benedict Carey
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
  'how-we-learn',
  '{"en": "How We Learn", "es": "Cómo Aprendemos"}',
  'Benedict Carey',
  '{"en": "Learning is not about perfect conditions and rigid discipline — it thrives on variation, breaks, and even forgetting. Carey reveals the science of memory and learning to show that many of our intuitions about studying are wrong.", "es": "El aprendizaje no se trata de condiciones perfectas y disciplina rígida — prospera con la variación, los descansos e incluso el olvido. Carey revela la ciencia de la memoria y el aprendizaje para mostrar que muchas de nuestras intuiciones sobre estudiar están equivocadas."}',
  '/api/books/how-we-learn/cover',
  '/api/books/how-we-learn/audio',
  '/api/books/how-we-learn/pdf',
  900, -- Ajustar duración real en segundos
  (SELECT id FROM public.categories WHERE slug = 'mind-and-brain'),
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
