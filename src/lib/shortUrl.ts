import pb from './pb';

const SLUG_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const RESERVED_SLUGS = new Set([
  's', 'admin', 'api', 'login', 'signup', 'create', 'dashboard',
  'preview', 'products', 'templates', 'marketplace', 'learn',
  'qr-code', 'link-shortener', 'embed-generator', 'static', 'assets',
  'public', '_', 'index', 'home',
]);

export function randomSlug(length = 6): string {
  let out = '';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    out += SLUG_ALPHABET[arr[i] % SLUG_ALPHABET.length];
  }
  return out;
}

export async function generateUniqueSlug(length = 6, maxTries = 6): Promise<string> {
  for (let i = 0; i < maxTries; i++) {
    const slug = randomSlug(length + Math.floor(i / 2));
    const exists = await slugExists(slug);
    if (!exists) return slug;
  }
  throw new Error('ไม่สามารถสุ่ม slug ที่ไม่ซ้ำได้ กรุณาลองใหม่');
}

export async function slugExists(slug: string): Promise<boolean> {
  try {
    await pb.collection('short_urls').getFirstListItem(`slug="${slug}"`);
    return true;
  } catch {
    return false;
  }
}

export function validateSlug(slug: string): string | null {
  if (!slug) return null;
  if (slug.length < 3 || slug.length > 32) return 'Slug ต้องยาว 3-32 ตัวอักษร';
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) return 'Slug ใช้ได้เฉพาะ a-z, 0-9, - และ _ เท่านั้น';
  if (RESERVED_SLUGS.has(slug.toLowerCase())) return 'Slug นี้ถูกสงวนไว้ กรุณาใช้ชื่ออื่น';
  return null;
}

export function parseUserAgent(ua: string): { device: string; browser: string } {
  if (!ua) return { device: 'unknown', browser: 'unknown' };
  const lower = ua.toLowerCase();

  let device: string = 'desktop';
  if (/ipad|tablet/.test(lower)) device = 'tablet';
  else if (/iphone|ipod|android|mobile|blackberry|windows phone/.test(lower)) device = 'mobile';

  let browser: string = 'other';
  if (/edg\//.test(lower)) browser = 'Edge';
  else if (/opr\/|opera/.test(lower)) browser = 'Opera';
  else if (/chrome|crios/.test(lower) && !/edg\//.test(lower)) browser = 'Chrome';
  else if (/firefox|fxios/.test(lower)) browser = 'Firefox';
  else if (/safari/.test(lower) && !/chrome|crios/.test(lower)) browser = 'Safari';

  return { device, browser };
}

export function buildShortUrl(slug: string): string {
  const base = import.meta.env.VITE_SITE_URL || window.location.origin;
  return `${base.replace(/\/$/, '')}/s/${slug}`;
}
