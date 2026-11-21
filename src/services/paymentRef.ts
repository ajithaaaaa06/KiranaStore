/**
 * Payment Reference Generator
 * Generates a random 16 URL-safe characters payment reference.
 * Contains strictly no personal data or sensitive identifiers.
 */
export function generatePaymentRef(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  }
  // Fallback for older environments / test runners
  const pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let ref = '';
  for (let i = 0; i < 16; i++) {
    ref += pool.charAt(Math.floor(Math.random() * pool.length));
  }
  return ref;
}
