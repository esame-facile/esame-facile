/** @type {import('next').NextConfig} */
const SKUOOLA = "https://www.skuoola.it";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Redirect SOLO della vetrina pubblica verso Skuoola (307 temporaneo = reversibile).
  // NON elencate (quindi NON redirette): /scarica, /api/*, /affiliati, /admin,
  // /checkout, /privacy, /termini, /link, asset /_next.
  redirects: async () => [
    { source: "/", destination: SKUOOLA, permanent: false },
    { source: "/catalogo", destination: SKUOOLA, permanent: false },
    { source: "/catalogo/:path*", destination: SKUOOLA, permanent: false },
    { source: "/concorsi", destination: SKUOOLA, permanent: false },
    { source: "/concorsi/:path*", destination: SKUOOLA, permanent: false },
    { source: "/chi-siamo", destination: SKUOOLA, permanent: false },
    { source: "/contatti", destination: SKUOOLA, permanent: false },
  ],
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Cache-Control", value: "no-store, max-age=0" },
      ],
    },
  ],
};

export default nextConfig;
