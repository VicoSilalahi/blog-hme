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
      tags
      content {
        value
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
        {data.allArticles.map((article: any) => {
          // extract plain text from DatoCMS StructuredText AST
          const extractText = (node: any): string => {
            const parts: string[] = [];
            const walk = (n: any) => {
              if (!n) return;
              if (Array.isArray(n)) return n.forEach(walk);
              if (typeof n !== "object") return; // skip primitive values

              // common leaf text locations
              if (n.type === "span" && typeof n.value === "string") {
                parts.push(n.value);
                return;
              }
              if (typeof n.value === "string") {
                parts.push(n.value);
                return;
              }
              if (typeof n.text === "string") {
                parts.push(n.text);
                return;
              }

              // traverse common container fields
              if (Array.isArray(n.children)) return n.children.forEach(walk);
              if (Array.isArray(n.content)) return n.content.forEach(walk);
              if (n.document && Array.isArray(n.document.children)) return n.document.children.forEach(walk);

              // fallback: traverse object values but only recurse into objects/arrays
              Object.values(n).forEach((v) => {
                if (typeof v === "object") walk(v);
              });
            };
            walk(node);
            return parts.join(" ").replace(/\s+/g, " ").trim();
          };

          const raw = article.content?.value;
          const fullText = raw ? extractText(raw) : "";
          const preview = fullText ? (fullText.length > 160 ? fullText.slice(0, 160).trim() + "..." : fullText) : "";

          return (
            <Link key={article.id} href={`/blog/${article.slug}`} className="block group">
              <div className="card card-hover p-4 transition-colors">
                <div className="flex flex-col md:flex-row gap-6 items-start">
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

                  {/* Title + Meta */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs muted mb-2 uppercase tracking-widest">
                      <span>[<time suppressHydrationWarning data-utc={article.date} data-type="date">{new Date(article.date).toISOString().split("T")[0]}</time>]</span>
                      <span className="muted">|</span>
                      <span>_ARTICLE</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold title mb-2">
                      {article.title}
                    </h2>



                    {/* {Preview} */}
                    {preview && (
                      <p className="text-sm muted mt-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {preview}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.map((tag: string) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.04)] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3">
                  <span className="text-sm read-more" tabIndex={-1}>
                    &gt; Read More
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}