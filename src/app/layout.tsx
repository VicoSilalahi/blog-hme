import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog HME Jimmyahhh",
  description: "Jimmyahhh blog bebas aja sih",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body
        className="font-mono antialiased"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* page wrapper — column so footer sticks to bottom */}
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            {children}
          </div>

          <footer className="site-footer" role="contentinfo">
            <div>
              <span className="muted-strong">© {year} Jimmyahhh</span>
              {/* {" — "}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a> */}
            </div>
          </footer>
        </div>

        {/* Inline client script: localize any <time data-utc> elements to visitor's system locale/timezone */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function localize(){document.querySelectorAll('time[data-utc]').forEach(function(el){var utc=el.getAttribute('data-utc'); if(!utc) return; var d=new Date(utc); var type=el.getAttribute('data-type')||'datetime'; try{ el.textContent = type === 'date' ? d.toLocaleDateString() : d.toLocaleString(); }catch(e){ el.textContent = d.toString(); } }); } if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', localize); else localize();})();`,
          }}
        />
      </body>
    </html>
  );
}