## Why

The app runs locally but has no production hosting. Deploying to Vercel gives a public URL, automatic CI/CD on push, and global CDN for static assets.

## What Changes

- Add `engines` field to `package.json` to pin Node.js ≥ 20.9.0 (required by Next.js 16, Vercel must use the right runtime)
- Move `API_BASE` from a hardcoded constant to an environment variable `NEXT_PUBLIC_API_BASE` so it can be overridden per-environment
- Move `NODE_TLS_REJECT_UNAUTHORIZED = "0"` from `instrumentation.ts` to a Vercel environment variable to keep the code clean
- Create `vercel.json` with Node.js version pinning and any necessary config
- Deploy via Vercel CLI (`vercel --prod`)

## Capabilities

### New Capabilities
- `vercel-deploy`: Configuration and process for deploying the app to Vercel (vercel.json, env vars, Node version, TLS bypass for self-signed API cert)

### Modified Capabilities
_(none — no user-facing requirement changes)_

## Impact

- `package.json` — add `engines: { "node": ">=20.9.0" }`
- `src/lib/api.ts` — read `API_BASE` from `process.env.NEXT_PUBLIC_API_BASE` with fallback
- `src/instrumentation.ts` — conditionally set TLS bypass only when env var is set
- New: `vercel.json` — minimal Vercel config
- Vercel project env vars: `NEXT_PUBLIC_API_BASE`, `NODE_TLS_REJECT_UNAUTHORIZED`
