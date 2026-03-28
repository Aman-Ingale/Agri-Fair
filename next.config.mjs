import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin tracing to this app when multiple lockfiles exist (parent folders)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
