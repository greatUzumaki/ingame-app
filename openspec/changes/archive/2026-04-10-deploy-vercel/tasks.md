## 1. Node.js Version

- [x] 1.1 Add `"engines": { "node": ">=20.9.0" }` to `package.json`
- [x] 1.2 Create `vercel.json` with `{ "nodejs": "20.x" }`

## 2. Environment Variables

- [x] 2.1 Update `src/lib/api.ts`: read `API_BASE` from `process.env.NEXT_PUBLIC_API_BASE` with fallback to `"https://37.46.130.153:3001"`
- [x] 2.2 Update `src/instrumentation.ts`: remove hardcoded `NODE_TLS_REJECT_UNAUTHORIZED = "0"` (it will be set as a Vercel env var instead)

## 3. Deploy

- [x] 3.1 Run `vercel` (or `npx vercel`) to link the project and do a preview deploy — confirm it builds successfully
- [x] 3.2 Set environment variables in Vercel dashboard (or via CLI): `NEXT_PUBLIC_API_BASE=https://37.46.130.153:3001` and `NODE_TLS_REJECT_UNAUTHORIZED=0`
- [x] 3.3 Run `vercel --prod` to promote to production URL
- [x] 3.4 Open the production URL and verify the homepage loads with league cards
