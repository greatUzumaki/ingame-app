## ADDED Requirements

### Requirement: App deployed and accessible on Vercel
The project SHALL be deployed to Vercel and return HTTP 200 on the homepage from the public Vercel URL.

#### Scenario: Homepage loads on Vercel URL
- **WHEN** user navigates to the Vercel deployment URL
- **THEN** the homepage loads with league cards fetched from the API

---

### Requirement: Node.js runtime pinned to 20.x
The Vercel deployment SHALL use Node.js 20.x. `package.json` SHALL declare `"engines": { "node": ">=20.9.0" }` and `vercel.json` SHALL set `"nodejs": "20.x"`.

#### Scenario: Build succeeds on Vercel
- **WHEN** Vercel runs `npm run build`
- **THEN** the build completes without the "Node.js version not supported" error

---

### Requirement: API base URL configurable via environment variable
`src/lib/api.ts` SHALL read `API_BASE` from `process.env.NEXT_PUBLIC_API_BASE`, falling back to the hardcoded value if the variable is not set.

#### Scenario: API_BASE from env var
- **WHEN** `NEXT_PUBLIC_API_BASE` is set in the Vercel environment
- **THEN** all API calls use that value as the base URL

#### Scenario: API_BASE falls back to default
- **WHEN** `NEXT_PUBLIC_API_BASE` is not set
- **THEN** API calls use the hardcoded fallback `https://37.46.130.153:3001`

---

### Requirement: TLS bypass set via environment variable
`NODE_TLS_REJECT_UNAUTHORIZED=0` SHALL be set as a Vercel environment variable. The hardcoded assignment in `src/instrumentation.ts` SHALL be removed or made conditional.

#### Scenario: Self-signed cert API reachable on Vercel
- **WHEN** Vercel serverless function calls the API
- **THEN** the TLS handshake succeeds despite the self-signed certificate
