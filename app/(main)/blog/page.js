import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata = {
  title: "AgriFair Blog | Fair Bidding Guides",
  description:
    "Guides for farmers and buyers on fair crop listings, bid placement, and order coordination on AgriFair.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 3);
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white dark:from-black">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-green-200/60 dark:border-green-800/30">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/70 via-emerald-50/30 to-transparent" />
        <div className="relative container mx-auto px-4 py-14">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Guides for Farmers & Buyers
            </Badge>
            <h1 className="agri-fade-up text-4xl font-bold tracking-tight text-green-900 dark:text-green-200 sm:text-5xl">
              AgriFair Blog
            </h1>
            <p className="agri-fade-up mt-4 text-gray-700 dark:text-gray-200">
              Learn how fair bidding works, how to place better bids, and how
              both sides coordinate to complete orders smoothly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog/how-fair-bidding-works"
                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Read the starter guide
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center rounded-md bg-white/70 px-4 py-2 text-sm font-medium text-green-800 transition hover:bg-white dark:bg-gray-900/50 dark:text-green-200 border border-green-200/60 dark:border-green-800/30"
              >
                Browse listings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-200">
              Featured posts
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-200">
              Quick reads that help you place fair bids and avoid confusion.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => (
              <Badge key={t} variant="outline" className="bg-white/60 dark:bg-gray-900/20">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((post, idx) => (
            <Card
              key={post.slug}
              className="h-full bg-white/70 dark:bg-gray-900/50 border-green-200/60 dark:border-green-800/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="pb-3">
                <div
                  className="agri-fade-up"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <CardTitle className="text-lg text-green-900 dark:text-green-200">
                    {post.title}
                  </CardTitle>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Read
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All posts */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold text-green-900 dark:text-green-200">
          All posts
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-200">
          Pick a topic and learn at your own pace.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <Card
                className="h-full bg-white/70 dark:bg-gray-900/50 border-green-200/60 dark:border-green-800/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="flex flex-col gap-3 p-6">
                  <div
                    className="agri-fade-up"
                    style={{ animationDelay: `${(idx % 6) * 90}ms` }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-white/60 dark:bg-gray-900/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-green-900 dark:text-green-200">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-green-200/60 bg-white/60 dark:bg-gray-900/30 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">
            Want more guides?
          </h3>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
            AgriFair keeps improving the platform. Save this blog page and
            revisit for new guides for buyers and farmers.
          </p>
        </div>
      </section>
    </div>
  );
}

