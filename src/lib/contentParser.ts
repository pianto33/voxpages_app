import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface BookMetadata {
  id: string; // "category/book-name"
  title: string;
  author: string;
  year?: number;
  genre: string;
  core_idea?: string;
  key_concepts?: string[];
  coverUrl?: string; // e.g. /api/content/finances/I will teach you to be rich/cover.webp
  audioUrl?: string;
  pdfUrl?: string;
}

export function getAllBooks(): BookMetadata[] {
  const books: BookMetadata[] = [];

  if (!fs.existsSync(CONTENT_DIR)) {
    return books;
  }

  const categories = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });

  for (const category of categories) {
    if (!category.isDirectory()) continue;
    if (category.name.startsWith(".")) continue; // Skip hidden folders

    const categoryPath = path.join(CONTENT_DIR, category.name);
    const bookFolders = fs.readdirSync(categoryPath, { withFileTypes: true });

    for (const bookFolder of bookFolders) {
      if (!bookFolder.isDirectory()) continue;
      if (bookFolder.name.startsWith(".")) continue;

      const bookPath = path.join(categoryPath, bookFolder.name);
      const metadataPath = path.join(bookPath, "metadata.json");

      if (fs.existsSync(metadataPath)) {
        try {
          const metadataContent = fs.readFileSync(metadataPath, "utf-8");
          const metadata = JSON.parse(metadataContent);

          // Check for assets
          const assets = fs.readdirSync(bookPath);
          const coverFile = assets.find((f) => f.startsWith("cover."));
          const audioFile = assets.find((f) => f.endsWith(".mp3") || f.endsWith(".wav"));
          const pdfFile = assets.find((f) => f.endsWith(".pdf"));

          const idPath = `${category.name}/${bookFolder.name}`;

          books.push({
            id: idPath,
            ...metadata,
            coverUrl: coverFile ? `/api/content/${idPath}/${coverFile}` : undefined,
            audioUrl: audioFile ? `/api/content/${idPath}/${audioFile}` : undefined,
            pdfUrl: pdfFile ? `/api/content/${idPath}/${pdfFile}` : undefined,
          });
        } catch (error) {
          console.error(`Error reading ${metadataPath}:`, error);
        }
      }
    }
  }

  return books;
}

export function getBookById(id: string): BookMetadata | null {
  const books = getAllBooks();
  return books.find((b) => b.id === id) || null;
}
