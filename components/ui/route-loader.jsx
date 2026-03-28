import { Loader2 } from "lucide-react";

export default function RouteLoader({ label = "Loading..." }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-green-200/60 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm px-6 py-10 shadow-sm">
        <Loader2 className="h-7 w-7 animate-spin text-green-700 dark:text-green-400" />
        <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
      </div>
    </div>
  );
}

