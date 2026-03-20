import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAllBooks } from "@/lib/contentParser";
import { CategorySlider } from "@/components/category-slider";
import { SearchInput } from "@/components/search-input";
import { BookCard } from "@/components/book-card";

export default async function HubHomePage(props: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q.toLowerCase() : "";

  const t = await getTranslations({ locale, namespace: "Hub" });
  
  // Verify auth on server side (basic protection)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check for an active subscription
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .single();

  const isActive =
    sub &&
    (sub.status === "active" || sub.status === "trialing") &&
    (!sub.current_period_end || new Date(sub.current_period_end) > new Date());

  if (!isActive) {
    redirect(`/${locale}/subscribe`);
  }

  // Fetch local books (Data Layer)
  let books = getAllBooks();
  
  if (q) {
    books = books.filter(book => 
      book.title.toLowerCase().includes(q) || 
      book.author.toLowerCase().includes(q) ||
      book.genre.toLowerCase().includes(q)
    );
  }

  // Group books by category
  const groupedBooks = books.reduce((acc, book) => {
    const categoryNameInput = book.id.split("/")[0];
    const categoryName = categoryNameInput
      .split("-").join(" ")
      .replace(/\b\w/g, l => l.toUpperCase());
    
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(book);
    return acc;
  }, {} as Record<string, typeof books>);

  return (
    <div className="library-page">
      {/* Hero Section */}
      <div className="library-hero container">
        <h1 className="library-title">
          {t("welcome")}, {user.email?.split('@')[0] || 'User'}
        </h1>
        <p className="library-subtitle">
          Sigue aprendiendo. Aquí tienes tu biblioteca personal de resúmenes.
        </p>

        <SearchInput />
      </div>

      <div className="container">
        {books.length === 0 ? (
          <div className="library-empty">
            <p className="text-slate-400 text-lg">
              {q ? `No se encontraron resultados para "${q}".` : 'No se encontraron resúmenes en la biblioteca.'}
            </p>
          </div>
        ) : q ? (
          <div className="library-grid">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8 md:gap-12">
            {Object.entries(groupedBooks).map(([categoryName, categoryBooks]) => (
              <CategorySlider 
                key={categoryName} 
                title={categoryName} 
                books={categoryBooks} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
