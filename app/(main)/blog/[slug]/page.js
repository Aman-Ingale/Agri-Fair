import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug, ALL_POST_SLUGS } from "@/lib/blog/posts";

function slugToId(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return ALL_POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const keywords = (post.seo?.keywords || []).join(", ");

  return {
    title: `${post.title} | AgriFair Blog`,
    description: post.seo?.summary || post.excerpt,
    keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seo?.summary || post.excerpt,
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const toc = post.content
    .filter((b) => b.type === "h2")
    .map((h) => ({
      id: slugToId(h.text),
      label: h.text,
    }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white dark:from-black">
      <section className="relative overflow-hidden border-b border-green-200/60 dark:border-green-800/30">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/70 via-emerald-50/30 to-transparent" />
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 items-center mb-4">
              {post.tags.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <h1 className="agri-fade-up text-4xl font-bold tracking-tight text-green-900 dark:text-green-200">
              {post.title}
            </h1>
            <p className="agri-fade-up mt-3 text-gray-700 dark:text-gray-200">
              {post.excerpt}
            </p>
            <div className="agri-fade-up mt-6 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span>{post.date}</span>
              <span className="opacity-60">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px]">
          <article className="max-w-3xl">
            <Card className="bg-white/70 dark:bg-gray-900/40 border-green-200/60 dark:border-green-800/30 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                {toc.length > 0 && (
                  <div className="mb-6 rounded-lg border border-green-200/60 dark:border-green-800/30 bg-white/60 dark:bg-gray-900/30 p-4">
                    <h2 className="font-semibold text-green-900 dark:text-green-200">
                      Table of contents
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-green-800 hover:underline dark:text-green-200"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-5">
                  {post.content.map((block, idx) => {
                    if (block.type === "h2") {
                      const id = slugToId(block.text);
                      return (
                        <h2
                          key={idx}
                          id={id}
                          className="agri-fade-up scroll-mt-24 text-2xl font-semibold text-green-900 dark:text-green-200"
                        >
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === "h3") {
                      return (
                        <h3
                          key={idx}
                          className="agri-fade-up scroll-mt-24 text-xl font-semibold text-green-900 dark:text-green-200"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === "p") {
                      return (
                        <p key={idx} className="agri-fade-up text-gray-800 dark:text-gray-100">
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === "ul") {
                      return (
                        <ul key={idx} className="agri-fade-up space-y-2 text-gray-800 dark:text-gray-100">
                          {block.items.map((it, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-2 h-2 w-2 rounded-full bg-green-600" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "ol") {
                      return (
                        <ol
                          key={idx}
                          className="agri-fade-up list-decimal pl-5 text-gray-800 dark:text-gray-100 space-y-2"
                        >
                          {block.items.map((it, i) => (
                            <li key={i}>{it}</li>
                          ))}
                        </ol>
                      );
                    }

                    return null;
                  })}
                </div>

                <div className="mt-10 rounded-xl border border-green-200/60 dark:border-green-800/30 bg-white/60 dark:bg-gray-900/30 p-5">
                  <h2 className="text-lg font-semibold text-green-900 dark:text-green-200">
                    Ready to act?
                  </h2>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                    Browse crop listings or create your own listing and start fair bidding.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/listings"
                      className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                      Browse listings
                    </Link>
                    <Link
                      href="/addListing"
                      className="inline-flex items-center justify-center rounded-md border border-green-200/60 bg-white/70 px-4 py-2 text-sm font-medium text-green-900 transition hover:bg-white dark:bg-gray-900/30 dark:text-green-200 dark:hover:bg-gray-900"
                    >
                      Add a listing
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          <aside className="hidden md:block">
            <div className="rounded-xl border border-green-200/60 bg-white/60 dark:border-green-800/30 dark:bg-gray-900/30 p-5 backdrop-blur">
              <h3 className="text-green-900 dark:text-green-200 font-semibold">
                More guides
              </h3>
              <div className="mt-4 space-y-3">
                {getAllPosts()
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 4)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="block rounded-lg border border-transparent hover:border-green-200/80 dark:hover:border-green-800/60 px-3 py-2 transition"
                    >
                      <div className="text-sm font-medium text-green-900 dark:text-green-200">
                        {p.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {p.readTime}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

