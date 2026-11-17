// @leadconnector/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only, jsxSource fallback + tailwind config), @tanstack/devtools-vite source injection (data-tsd-source, dev-only),
//     HMR gate/flush, dev-server bridge controls, server diagnostics, lightningcss, and sandbox detection
//     (secure host allowlist, port/strictPort, watch ignores, and HMR overlay policy).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@leadconnector/vite-tanstack-config";

// `npm run build:pages` sets GITHUB_PAGES=1: a fully static (prerendered) build served from
// https://<user>.github.io/nishok-greens/. The normal `npm run build` stays the Cloudflare Worker build.
const isGithubPages = process.env.GITHUB_PAGES === "1";
const pagesBase = process.env.PAGES_BASE ?? "/nishok-greens/";

export default defineConfig({
  // Browser errors stay in the trusted parent-frame console-log flow;
  // do not expose the bridge collector on the public sandbox tunnel.
  devServerBridge: { errorCollector: false },
  // Build a Cloudflare Worker outside the AI Studio sandbox too (Cloudflare Workers Builds).
  // deployConfig writes dist/server/wrangler.json + .wrangler/deploy/config.json, so
  // `npx wrangler deploy` uses it directly instead of trying to auto-configure Vite.
  nitro: isGithubPages
    ? false
    : {
        preset: "cloudflare-module",
        output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
        cloudflare: {
          nodeCompat: true,
          deployConfig: true,
          wrangler: { name: "nishok-greens" },
        },
      },
  ...(isGithubPages ? { vite: { base: pagesBase } } : {}),
  // Do not set server.hmr.timeout — Vite 8 deprecated those websocket fields
  // (use server.ws.*). Overlay/host/port are package-owned; default WS timeout is 30s.
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGithubPages ? { prerender: { enabled: true, crawlLinks: true } } : {}),
  },
});
