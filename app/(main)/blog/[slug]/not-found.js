import Link from "next/link";
import RouteLoader from "@/components/ui/route-loader";

export default function BlogNotFound() {
  // Render a lightweight consistent screen (no SEO metadata needed here)
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white dark:from-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-900 dark:text-green-200">
              Article not found
            </h1>
            <p className="mt-3 text-gray-700 dark:text-gray-200">
              This blog post doesn’t exist (or the URL is incorrect).
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/blog"
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Go back to blog
              </Link>
            </div>
          </div>
          <div className="mt-12">
            {/* keep page feeling polished */}
            <RouteLoader label="Taking you back..." />
          </div>
        </div>
      </div>
    </div>
  );
}

