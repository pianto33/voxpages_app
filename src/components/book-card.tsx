import Image from "next/image";
import { Link } from "@/i18n/routing";
import { BookMetadata } from "@/lib/contentParser";

export function BookCard({ book }: { book: BookMetadata }) {
  return (
    <Link 
      href={`/book/${book.id}`}
      className="book-card"
    >
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
        
        {/* Badges */}
        <div className="book-card-badges">
          {book.audioUrl && (
            <span className="book-card-badge book-card-badge-audio">Audio</span>
          )}
          {book.pdfUrl && (
            <span className="book-card-badge book-card-badge-pdf">PDF</span>
          )}
        </div>
      </div>
      
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
      </div>
    </Link>
  );
}
