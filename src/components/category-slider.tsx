import { BookCard } from "./book-card";
import { BookMetadata } from "@/lib/contentParser";

interface CategorySliderProps {
  title: string;
  books: BookMetadata[];
}

export function CategorySlider({ title, books }: CategorySliderProps) {
  if (!books || books.length === 0) return null;

  return (
    <div className="category-slider-wrapper">
      <div className="category-slider-header">
        <h2 className="category-slider-title">{title}</h2>
        {/* Optional "Ver todos" button here */}
        <button className="category-slider-link">
          Ver todo &rarr;
        </button>
      </div>
      
      {/* Scrollable Container */}
      <div className="category-slider-scroll">
        {books.map((book) => (
          <div key={book.id} className="category-slider-item">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
