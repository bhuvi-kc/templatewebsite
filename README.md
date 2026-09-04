# DOMÉ Studio

Production frontend built with React and Vite. It is configured for Cloudflare Pages and a Cloudflare D1-backed contact endpoint, which keeps the site and API on Cloudflare's edge network and within its free tiers for a small portfolio site.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deploy the frontend and backend

1. Create a free Cloudflare account and a D1 database named `dome-studio-contacts`.
2. Copy its database ID into `wrangler.toml`.
3. Run `npx wrangler d1 migrations apply dome-studio-contacts --remote`.
4. In Cloudflare Pages, connect this repository and use `npm run build` with `dist` as the output directory. Pages automatically deploys `functions/api/contact.js` with the site.

The contact form posts to `/api/contact`; messages are validated on the edge and stored in D1. Do not expose database credentials in browser code.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
