# VoxPages

El proyecto base para VoxPages está inicializado y estructurado.

## Tecnologías Utilizadas
- **Next.js** (App Router, TypeScript)
- **Vanilla CSS** (Sistema de diseño premium con Glassmorphism)
- **Supabase** (Auth: Link Mágico + Google, Base de Datos futura)
- **Resend** (Manejo de emails)
- **Cloudflare R2** (Almacenamiento de archivos/audios compatible con S3)

## Cómo empezar
1. Renombra `.env.example` a `.env.local` y completa tus credenciales reales (sobre todo Supabase).
2. Corre `npm install` si hiciste clon del proyecto fresco.
3. Corre `npm run dev` para lanzar en local el servidor.

El proyecto cuenta con una landing funcional (`/`) y una página unificada de Auth (`/login`).
