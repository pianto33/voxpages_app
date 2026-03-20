# 📚 Instrucciones para agregar nuevos libros

## Estructura de carpetas

```
content/
├── [categoria]/                    # ej: finances, mind and brain, time management
│   ├── [Nombre del Libro]/         # Nombre completo del libro (con espacios y mayúsculas)
│   │   ├── cover.webp              # Imagen de portada (preferido) o cover.jpg
│   │   ├── en.mp3                  # Audio en inglés
│   │   ├── en.pdf                  # PDF en inglés (opcional)
│   │   ├── es.mp3                  # Audio en español (si existe)
│   │   ├── es.pdf                  # PDF en español (si existe)
│   │   ├── metadata.json           # Información del libro
│   │   └── insert.sql              # Query para insertar en la BD
```

## Reglas de nombres

### Carpetas
- **Categoría**: minúsculas con espacios (ej: `mind and brain`, `time management`)
- **Libro**: Nombre completo del libro con mayúsculas y espacios (ej: `The 5 AM Club`, `Eat That Frog`)

### Archivos
- **Cover**: `cover.webp` (preferido) o `cover.jpg`
- **Audio**: `[idioma].mp3` (ej: `en.mp3`, `es.mp3`)
- **PDF**: `[idioma].pdf` (ej: `en.pdf`, `es.pdf`)

### Slug (para la BD y URLs)
El slug se genera automáticamente del nombre de la carpeta:
- Minúsculas
- Espacios → guiones
- Sin caracteres especiales

Ejemplo: `The 5 AM Club` → `the-5-am-club`

---

## Paso a paso para agregar un libro

### 1. Crear la carpeta
```bash
mkdir -p "content/[categoria]/[Nombre del Libro]"
```

### 2. Agregar los archivos
- `cover.webp` - Imagen de portada (400x600px recomendado)
- `en.mp3` - Audio del resumen
- `en.pdf` - PDF del resumen (opcional)

### 3. Crear metadata.json
```json
{
  "title": "Nombre del Libro",
  "author": "Nombre del Autor",
  "year": 2024,
  "genre": "Categoría / Subcategoría",
  "core_idea": "Descripción de la idea principal del libro en 2-3 oraciones.",
  "key_concepts": [
    "Concepto clave 1",
    "Concepto clave 2",
    "Concepto clave 3",
    "Concepto clave 4",
    "Concepto clave 5"
  ],
  "notable_quote": "Una cita memorable del libro.",
  "practical_lessons": [
    "Lección práctica 1",
    "Lección práctica 2",
    "Lección práctica 3",
    "Lección práctica 4"
  ]
}
```

### 4. Crear insert.sql
```sql
-- Insert: [Nombre del Libro]
-- Author: [Autor]
-- Category: [Categoría]

-- Asegurar que la categoría existe (ajustar según sea necesario)
INSERT INTO public.categories (slug, name, description, icon, display_order)
VALUES (
  '[categoria-slug]',
  '{"en": "[Category Name]", "es": "[Nombre Categoría]"}',
  '{"en": "[Description in English]", "es": "[Descripción en Español]"}',
  '[emoji]',
  [orden]
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
  '[libro-slug]',
  '{"en": "[Title in English]", "es": "[Título en Español]"}',
  '[Author Name]',
  '{"en": "[Description in English]", "es": "[Descripción en Español]"}',
  '/api/books/[libro-slug]/cover',
  '/api/books/[libro-slug]/audio',
  '/api/books/[libro-slug]/pdf',
  900, -- Duración en segundos (ajustar)
  (SELECT id FROM public.categories WHERE slug = '[categoria-slug]'),
  false, -- true si es destacado
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
```

---

## Categorías existentes

| Slug | Nombre EN | Nombre ES | Emoji |
|------|-----------|-----------|-------|
| `finance` | Finance | Finanzas | 💰 |
| `mind-and-brain` | Mind and Brain | Mente y Cerebro | 🧠 |
| `time-management` | Time Management | Gestión del Tiempo | ⏰ |
| `mindfulness` | Mindfulness | Mindfulness | 🧘 |
| `personal-development` | Personal Development | Desarrollo Personal | 🌱 |
| `business` | Business | Negocios | 💼 |

---

## Subir archivos a R2 (Cloudflare)

### Credenciales R2
```
R2_ENDPOINT=https://db43337b9291ef2740ab0722cccad80b.r2.cloudflarestorage.com
R2_BUCKET_NAME=summary-book-audio
R2_ACCESS_KEY_ID=f26d212d760debc6c51096c1b2b9f1ae
R2_SECRET_ACCESS_KEY=214bad46d86ecfe57a0c497fb889d2a80760eff41bd5c9c348d5473f2f03a2a2
```

### Comando para subir un libro específico
```bash
export AWS_ACCESS_KEY_ID="f26d212d760debc6c51096c1b2b9f1ae"
export AWS_SECRET_ACCESS_KEY="214bad46d86ecfe57a0c497fb889d2a80760eff41bd5c9c348d5473f2f03a2a2"
R2_ENDPOINT="https://db43337b9291ef2740ab0722cccad80b.r2.cloudflarestorage.com"
R2_BUCKET="summary-book-audio"

# Subir archivos de un libro (reemplazar CARPETA y SLUG)
CARPETA="content/[categoria]/[Nombre del Libro]"
SLUG="[libro-slug]"

aws s3 cp "$CARPETA/cover.webp" "s3://$R2_BUCKET/books/$SLUG/cover.webp" --endpoint-url "$R2_ENDPOINT" --content-type "image/webp"
aws s3 cp "$CARPETA/en.mp3" "s3://$R2_BUCKET/books/$SLUG/en.mp3" --endpoint-url "$R2_ENDPOINT" --content-type "audio/mpeg"
aws s3 cp "$CARPETA/en.pdf" "s3://$R2_BUCKET/books/$SLUG/en.pdf" --endpoint-url "$R2_ENDPOINT" --content-type "application/pdf"
```

### Script automático
También podés usar el script `scripts/upload-to-r2.sh` para subir todos los libros:
```bash
./scripts/upload-to-r2.sh
```

---

## Estructura en R2

Los archivos se suben a R2 con esta estructura:
```
books/
├── [libro-slug]/
│   ├── cover.webp
│   ├── en.mp3
│   └── en.pdf
```

---

## Ejemplo completo

Para agregar "Atomic Habits" de James Clear a la categoría "personal development":

### 1. Crear carpeta
```bash
mkdir -p "content/personal development/Atomic Habits"
```

### 2. Copiar archivos
- `cover.webp`
- `en.mp3`
- `en.pdf`

### 3. Crear metadata.json
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "year": 2018,
  "genre": "Self-Development / Habits",
  "core_idea": "Small habits compound over time to create remarkable results. Clear provides a practical framework for building good habits and breaking bad ones.",
  "key_concepts": [
    "1% better every day compounds to 37x improvement in a year",
    "Habits are the compound interest of self-improvement",
    "Focus on systems, not goals",
    "Make good habits obvious, attractive, easy, and satisfying",
    "Identity-based habits are more lasting than outcome-based ones"
  ],
  "notable_quote": "You do not rise to the level of your goals. You fall to the level of your systems.",
  "practical_lessons": [
    "Stack new habits onto existing ones",
    "Design your environment to make good habits easier",
    "Use habit tracking to maintain consistency",
    "Never miss twice — get back on track immediately"
  ]
}
```

### 4. Crear insert.sql y ejecutar en Supabase

### 5. Subir a R2
```bash
export AWS_ACCESS_KEY_ID="f26d212d760debc6c51096c1b2b9f1ae"
export AWS_SECRET_ACCESS_KEY="214bad46d86ecfe57a0c497fb889d2a80760eff41bd5c9c348d5473f2f03a2a2"
R2_ENDPOINT="https://db43337b9291ef2740ab0722cccad80b.r2.cloudflarestorage.com"

aws s3 cp "content/personal development/Atomic Habits/cover.webp" "s3://summary-book-audio/books/atomic-habits/cover.webp" --endpoint-url "$R2_ENDPOINT" --content-type "image/webp"
aws s3 cp "content/personal development/Atomic Habits/en.mp3" "s3://summary-book-audio/books/atomic-habits/en.mp3" --endpoint-url "$R2_ENDPOINT" --content-type "audio/mpeg"
aws s3 cp "content/personal development/Atomic Habits/en.pdf" "s3://summary-book-audio/books/atomic-habits/en.pdf" --endpoint-url "$R2_ENDPOINT" --content-type "application/pdf"
```

---

## Tips

1. **Duración del audio**: Usá `ffprobe` para obtener la duración exacta:
   ```bash
   ffprobe -i archivo.mp3 -show_entries format=duration -v quiet -of csv="p=0"
   ```

2. **Optimizar imágenes**: Usá WebP para mejor compresión
   ```bash
   cwebp -q 80 cover.jpg -o cover.webp
   ```

3. **Verificar archivos en R2**:
   ```bash
   aws s3 ls "s3://summary-book-audio/books/[slug]/" --endpoint-url "$R2_ENDPOINT"
   ```
