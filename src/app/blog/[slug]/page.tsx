import { request } from "@/lib/datocms";
import { StructuredText } from "react-datocms";
import Link from "next/link";
import { notFound } from "next/navigation";

const POST_QUERY = `
  query Post($slug: String) {
    article(filter: {slug: {eq: $slug}}) {
      title
      date
      content {
        value 
      }
      coverImage {
        url
      }
      tags
      slug
    }
    allArticles {
      title
      slug
      tags
    }
  }
`;

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Data fetch
  const { slug } = await params;

  const data: any = await request({
    query: POST_QUERY,
    variables: { slug: slug },
  });

  if (!data.article) {
    notFound();
  }

  // Data parsing
  const { article, allArticles } = data;

  // Data scoring
  const currentTags = article.tags || [];

  const relatedArticles = allArticles
    .filter((excludeArticle: any) => excludeArticle.slug !== article.slug) // Exclude the current article (TypeScript Fix)
    .filter((excludeArticle: any) => excludeArticle.tags && excludeArticle.tags.length > 0) // (TypeScript Fix)
    .map((relatedcandidate: any) => { // (TypeScript Fix)
      const candidateTags = relatedcandidate.tags || [];

      // Simple Tag Matching: Count intersecting tags
      const intersection = currentTags.filter((tag: any) => candidateTags.includes(tag));
      const score = intersection.length;

      return {
        ...relatedcandidate,
        score: score,
      };
    })
    .filter((a: any) => a.score > 0) // Only keep articles with at least one matching tag (TypeScript Fix)
    .sort((a: any, b: any) => b.score - a.score) // Sort by score descending (TypeScript Fix)
    .slice(0, 3); // Select the top N (e.g., 3) most relevant

  return (
    <article className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto">
      {/* Navigation */}
      <nav className="mb-12">
        <Link 
          href="/" 
          className="muted back-link inline-block pb-1"
          style={{ textDecoration: "none" }}
        >
          &lt; Back to home
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10 pl-6" style={{ borderLeft: "4px solid var(--accent)" }}>
        <h1 className="text-3xl md:text-5xl font-bold title mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="muted font-mono text-sm">
          TIMESTAMP: <time suppressHydrationWarning data-utc={article.date} data-type="datetime">{new Date(article.date).toISOString()}</time>
        </p>
      </header>

      {/* Main Image*/}
      {article.coverImage && (
        <div className="image-wrapper">
          <img 
            src={article.coverImage.url} 
            className="w-full h-auto grayscale-80 hover:grayscale-0 transition-all duration-500" 
            alt={article.title}
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-none prose-custom">
        <StructuredText data={article.content} />
      </div>

      {/* Related Posts Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-2xl font-bold mb-6">
            Related Articles
          </h2>
          <div className="space-y-4">
            {relatedArticles.map((related: any) => ( // Added : any here just in case
              <Link key={related.slug} href={`/blog/${related.slug}`} className="block group">
                <div className="card card-hover p-3">
                  <h3 className="text-lg font-semibold title group-hover:text-(--link-hover)"> 
                    {/* Fixed CSS variable reference */}
                    {related.title}
                  </h3>
                  <p className="muted text-sm mt-1">
                    Relevance: {related.score} matching tags.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {/* Footer */}
      <div className="mt-20 pt-8 footer text-center text-sm">
        EOF
      </div>
    </article>
  );
}