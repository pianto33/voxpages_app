import { getBookById } from "@/lib/contentParser";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link, redirect } from "@/i18n/routing";
import { CustomAudioPlayer } from "@/components/audio-player";
import { getTranslations } from "next-intl/server";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string[]; locale: string }>;
  searchParams: Promise<{ play?: string }>;
}) {
  const { id, locale } = await params;
  const { play } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Hub" });

  const decodedId = id.map((segment) => decodeURIComponent(segment));
  const lastSegment = decodedId[decodedId.length - 1];

  if (lastSegment === "listen") {
    const bookPath = decodedId
      .slice(0, -1)
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    redirect({ href: `/book/${bookPath}?play=1`, locale });
  }

  const bookId = decodedId.join("/");

  const book = getBookById(bookId);

  if (!book) {
    notFound();
  }

  return (
    <div className="book-detail-page">
      <div className="book-detail-container">
        <Link href="/home" className="book-detail-back">
          &larr; {t("explore")}
        </Link>

        <div className="book-detail-card">
          <div className="book-detail-cover-wrapper">
            <div className="book-detail-cover">
              {book.coverUrl ? (
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  unoptimized
                  className="book-card-cover"
                  priority
                />
              ) : (
                <div className="book-card-empty-cover">
                  <span>{book.title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="book-detail-content">
            <div className="mb-2">
              <span className="book-detail-genre">{book.genre}</span>
            </div>

            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">
              por {book.author} {book.year ? `(${book.year})` : ""}
            </p>

            <div className="book-detail-section">
              <h3 className="book-detail-section-title">Resumen</h3>
              <p className="book-detail-text">
                {book.core_idea || "No hay idea principal configurada para este libro."}
              </p>
            </div>

            <div
              className="book-detail-audio-wrapper"
              style={{ background: "transparent", border: "none", padding: 0 }}
            >
              {book.audioUrl && (
                <CustomAudioPlayer
                  src={book.audioUrl}
                  title={book.title}
                  autoPlay={play === "1"}
                />
              )}

              <div className="book-detail-actions">
                {book.pdfUrl && (
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-detail-btn book-detail-btn-primary"
                  >
                    <svg
                      className="w-5 h-5"
                      style={{ width: 20, height: 20 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Leer en PDF
                  </a>
                )}

                <button className="book-detail-btn book-detail-btn-secondary">
                  <svg
                    className="w-5 h-5"
                    style={{ width: 20, height: 20 }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
