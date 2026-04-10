export async function register() {
  // Ensure TLS bypass is active for the self-signed API certificate.
  // The env var NODE_TLS_REJECT_UNAUTHORIZED=0 must be set in the environment;
  // we also set it here programmatically as a safety net.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log("[instrumentation] NODE_TLS_REJECT_UNAUTHORIZED =", process.env.NODE_TLS_REJECT_UNAUTHORIZED);
  console.log("[instrumentation] API_BASE =", process.env.NEXT_PUBLIC_API_BASE ?? "(not set, using fallback)");
}
