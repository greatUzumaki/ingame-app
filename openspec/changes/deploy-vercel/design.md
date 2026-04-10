## Context

The app is a Next.js 16 app with:
- Server Components fetching from `https://37.46.130.153:3001` (self-signed TLS cert)
- `NODE_TLS_REJECT_UNAUTHORIZED = "0"` set in `src/instrumentation.ts` to bypass cert validation
- `API_BASE` hardcoded in `src/lib/api.ts`
- No `engines` field in `package.json` (Vercel may default to Node 18, which Next.js 16 rejects)

## Goals / Non-Goals

**Goals:**
- Get a working production URL on Vercel
- Pin Node.js ≥ 20.9.0 so Vercel uses a compatible runtime
- Preserve the TLS bypass for the self-signed API cert
- Externalize `API_BASE` so it can be changed without a code push

**Non-Goals:**
- Replacing the self-signed cert or moving the API to a proper domain
- Setting up a custom domain on Vercel
- CI/CD pipeline beyond Vercel's built-in git integration

## Decisions

### Node.js version — `package.json` engines + `vercel.json`
Set `"engines": { "node": ">=20.9.0" }` in `package.json`. Also set `"nodejs": "20.x"` in `vercel.json` to explicitly tell Vercel which runtime to use. Belt-and-suspenders: Vercel reads both.

### API_BASE — environment variable with fallback
Change `src/lib/api.ts` to read `process.env.NEXT_PUBLIC_API_BASE` and fall back to the current hardcoded value. This is non-breaking locally; on Vercel the env var is set in the dashboard.

`NEXT_PUBLIC_` prefix makes it available in both Server and Client Components. Since the API is called only server-side (Server Components), a plain `API_BASE` env var would also work — but `NEXT_PUBLIC_API_BASE` is safer for future client use.

### TLS bypass — Vercel environment variable
Remove the hardcoded `process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"` from `instrumentation.ts`. Instead set `NODE_TLS_REJECT_UNAUTHORIZED=0` as a Vercel environment variable (System env var, all environments). The instrumentation file can then be simplified or removed.

**Alternative considered:** Keep it in `instrumentation.ts`. Simpler, but committing a security-disabling flag to source is a code smell. Environment variable is the right place.

### `vercel.json` — minimal config
Only specify `nodejs` runtime version. No custom routes needed (Next.js handles routing).

## Risks / Trade-offs

- **API reachability from Vercel**: Vercel serverless functions run from AWS us-east-1 by default. The API at `37.46.130.153:3001` must be publicly reachable on that port. If it's behind a firewall or NAT, Vercel will get connection errors.
- **TLS bypass scope**: `NODE_TLS_REJECT_UNAUTHORIZED=0` disables cert validation for ALL outgoing HTTPS requests in the process, not just the API. Acceptable here since we control what the server fetches.
- **`NEXT_PUBLIC_` exposure**: The API base URL will be visible in the client JS bundle. The URL is an IP address with no secret, so this is acceptable.
