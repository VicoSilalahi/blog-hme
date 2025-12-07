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
          className="text-zinc-500 hover:text-green-400 transition-colors border-b border-transparent hover:border-green-400 inline-block pb-1"
        >
          &lt; Back to home
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10 border-l-4 border-green-500 pl-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-zinc-500 font-mono text-sm">
          TIMESTAMP: {new Date(article.date).toISOString()}
        </p>
      </header>

      {/* Featured Image - Sharp Borders */}
      {article.coverImage && (
        <div className="border border-zinc-800 p-2 mb-12 bg-zinc-900">
          <img 
            src={article.coverImage.url} 
            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" 
            alt={article.title}
          />
        </div>
      )}

      {/* Content - Using 'prose-invert' for Dark Mode */}
      <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-zinc-300 prose-a:text-green-400 prose-img:rounded-none prose-img:border prose-img:border-zinc-800">
        <StructuredText data={article.content} />
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
        EOF
      </div>
    </article>
  );
}