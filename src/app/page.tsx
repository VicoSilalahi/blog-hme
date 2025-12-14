import { request } from "@/lib/datocms";
import Link from "next/link";

const HOMEPAGE_QUERY = `
  query HomePage {
    allArticles {
      id
      title
      slug
      date
      coverImage {
        url
      }
    }
  }
`;

export default async function Home() {
  const data: any = await request({
    query: HOMEPAGE_QUERY,
  });

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto">
      {/* Header*/}
      <header className="mb-16 border-b" style={{ borderColor: "var(--border)" }}>
        <h1 className="text-4xl font-bold mb-2 var-text">
          &gt; Blog HME ITB
        </h1>
        <p className="muted">
          See our latest entries.
        </p>
      </header>

      {/* List of Content*/}
      <div className="space-y-4">
        {data.allArticles.map((article: any) => (
          <Link 
            key={article.id} 
            href={`/blog/${article.slug}`}
            className="block group"
          >
            <div className="card card-hover p-4 transition-colors flex flex-col md:flex-row gap-6 items-start">
              
              {/* Image Preview*/}
              {article.coverImage && (
                <div className="w-full md:w-48 h-32 shrink-0 card-img-container overflow-hidden">
                  <img 
                    src={article.coverImage.url} 
                    alt={article.title} 
                    className="w-full h-full object-cover grayscale-80 group-hover:grayscale-0 transition-all"
                  />
                </div>
              )}

              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs muted mb-2 uppercase tracking-widest">
                  <span>[<time suppressHydrationWarning data-utc={article.date} data-type="date">{new Date(article.date).toISOString().split("T")[0]}</time>]</span>
                  <span className="muted">|</span>
                  <span>_ARTICLE</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold title mb-2">
                  {article.title}
                </h2>
                
                <span className="text-sm read-more" tabIndex={-1}>
                  &gt; Read More
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}