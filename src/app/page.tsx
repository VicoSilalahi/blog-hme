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
      {/* Header: Simple terminal style */}
      <header className="mb-16 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          &gt; Blog HME ITB
        </h1>
        <p className="text-zinc-500">
          See our latest entries.
        </p>
      </header>

      {/* The List: Sharp, Bordered, No Shadows */}
      <div className="space-y-4"> {/* Using a stack instead of grid for a "List" feel */}
        {data.allArticles.map((article: any) => (
          <Link 
            key={article.id} 
            href={`/blog/${article.slug}`}
            className="block group"
          >
            <div className="border border-zinc-800 p-4 transition-colors hover:border-zinc-500 hover:bg-zinc-900 flex flex-col md:flex-row gap-6 items-start">
              
              {/* Image: Square, small, purely functional */}
              {article.coverImage && (
                <div className="w-full md:w-48 h-32 shrink-0 bg-zinc-900 border border-zinc-800">
                  <img 
                    src={article.coverImage.url} 
                    alt={article.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
              )}

              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2 uppercase tracking-widest">
                  <span>[{new Date(article.date).toLocaleDateString()}]</span>
                  <span className="text-zinc-700">|</span>
                  {/* <span>LOG_ENTRY</span> */}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-green-400 transition-colors mb-2">
                  {article.title}
                </h2>
                
                <span className="text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
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