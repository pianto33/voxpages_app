import Image from "next/image";
import { Link } from "@/i18n/routing";
import { BookMetadata } from "@/lib/contentParser";

export function BookCard({ book }: { book: BookMetadata }) {
  const bookPath = `/book/${book.id}`;
  const playPath = `${bookPath}?play=1`;

  return (
    <article className="book-card">
      <Link href={bookPath} className="book-card-cover-link">
        <div className="book-card-cover-wrapper">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              unoptimized
              className="book-card-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="book-card-empty-cover">
              <span>{book.title}</span>
            </div>
          )}

          <div className="book-card-badges">
            {book.audioUrl && (
              <span className="book-card-badge book-card-badge-audio">Audio</span>
            )}
            {book.pdfUrl && (
              <span className="book-card-badge book-card-badge-pdf">PDF</span>
            )}
          </div>
        </div>
      </Link>

      {book.audioUrl && (
        <Link
          href={playPath}
          className="book-card-play"
          aria-label={`Reproducir ${book.title}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}

      <Link href={bookPath} className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
      </Link>
    </article>
  );
}
