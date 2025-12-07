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
    }
  }
`;

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const data: any = await request({
    query: POST_QUERY,
    variables: { slug: slug },
  });

  if (!data.article) {
    notFound();
  }

  const { article } = data;

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

      {/* Featured Image - Flexible Borders */}
      {article.coverImage && (
        <div className="image-wrapper">
          <img 
            src={article.coverImage.url} 
            className="w-full h-auto grayscale-80 hover:grayscale-0 transition-all duration-500" 
            alt={article.title}
          />
        </div>
      )}

      {/* Content - use prose-custom that relies on variables */}
      <div className="prose prose-zinc max-w-none prose-custom">
        <StructuredText data={article.content} />
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 footer text-center text-sm">
        EOF
      </div>
    </article>
  );
}