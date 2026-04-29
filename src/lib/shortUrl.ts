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
  if (slug.length < 1 || slug.length > 32) return 'Slug ต้องยาว 1-32 ตัวอักษร';
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

export interface PlatformDef {
  id: string;
  label: string;
  color: string;
  hosts: string[];
}

export const PLATFORMS: PlatformDef[] = [
  { id: 'facebook',  label: 'Facebook',  color: '#1877F2', hosts: ['facebook.com', 'fb.com', 'fb.me', 'm.facebook.com'] },
  { id: 'instagram', label: 'Instagram', color: '#E1306C', hosts: ['instagram.com', 'instagr.am'] },
  { id: 'tiktok',    label: 'TikTok',    color: '#000000', hosts: ['tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'] },
  { id: 'youtube',   label: 'YouTube',   color: '#FF0000', hosts: ['youtube.com', 'youtu.be', 'm.youtube.com'] },
  { id: 'twitter',   label: 'X (Twitter)', color: '#000000', hosts: ['twitter.com', 'x.com', 't.co'] },
  { id: 'line',      label: 'LINE',      color: '#06C755', hosts: ['line.me', 'lin.ee', 'liff.line.me'] },
  { id: 'whatsapp',  label: 'WhatsApp',  color: '#25D366', hosts: ['whatsapp.com', 'wa.me', 'api.whatsapp.com'] },
  { id: 'telegram',  label: 'Telegram',  color: '#0088CC', hosts: ['telegram.org', 't.me', 'telegram.me'] },
  { id: 'discord',   label: 'Discord',   color: '#5865F2', hosts: ['discord.com', 'discord.gg', 'discordapp.com'] },
  { id: 'linkedin',  label: 'LinkedIn',  color: '#0A66C2', hosts: ['linkedin.com', 'lnkd.in'] },
  { id: 'shopee',    label: 'Shopee',    color: '#EE4D2D', hosts: ['shopee.co.th', 'shopee.com', 'shp.ee'] },
  { id: 'lazada',    label: 'Lazada',    color: '#0F146D', hosts: ['lazada.co.th', 'lazada.com'] },
  { id: 'spotify',   label: 'Spotify',   color: '#1DB954', hosts: ['spotify.com', 'open.spotify.com', 'spoti.fi'] },
  { id: 'email',     label: 'Email',     color: '#6366F1', hosts: [] },
  { id: 'sms',       label: 'SMS',       color: '#10B981', hosts: [] },
  { id: 'website',   label: 'เว็บไซต์',   color: '#64748B', hosts: [] },
  { id: 'other',     label: 'อื่นๆ',      color: '#94A3B8', hosts: [] },
];

const PLATFORM_BY_ID: Record<string, PlatformDef> = Object.fromEntries(
  PLATFORMS.map((p) => [p.id, p]),
);

export function getPlatform(id: string | undefined | null): PlatformDef {
  if (id && PLATFORM_BY_ID[id]) return PLATFORM_BY_ID[id];
  return PLATFORM_BY_ID.other;
}

interface PbErrorShape {
  status?: number;
  message?: string;
  response?: {
    code?: number;
    message?: string;
    data?: Record<string, { message?: string }>;
  };
}

export function translateShortUrlError(err: unknown): { message: string; isSetupIssue: boolean } {
  // Log the full error to console for debugging — strip in production if noisy
  if (typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.error('[shortUrl] PocketBase error:', err);
  }

  const e = err as PbErrorShape;
  const status = e?.status ?? e?.response?.code;
  const rawMsg = (e?.response?.message || e?.message || '').toString();
  const fieldErrors = e?.response?.data;

  if (fieldErrors && typeof fieldErrors === 'object') {
    const entries = Object.entries(fieldErrors).filter(([, v]) => v?.message);
    if (entries.length > 0) {
      const details = entries.map(([f, v]) => `${f}: ${v?.message}`).join(', ');
      return { message: details, isSetupIssue: false };
    }
  }

  if (status === 404 || /missing or invalid collection|no collection|not found/i.test(rawMsg)) {
    return {
      message: 'ระบบยังไม่ได้ติดตั้ง collection "short_urls" ใน PocketBase — กรุณา import pocketbase-schema.json ที่หน้า Admin',
      isSetupIssue: true,
    };
  }
  if (status === 401 || status === 403 || /authoriz|unauthor|admin or record/i.test(rawMsg)) {
    return { message: 'ไม่มีสิทธิ์เข้าใช้งาน — กรุณาออกจากระบบแล้วเข้าใหม่ (auth token อาจหมดอายุ)', isSetupIssue: false };
  }
  if (status === 0 || /network|failed to fetch/i.test(rawMsg)) {
    return { message: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ — ตรวจสอบอินเทอร์เน็ตหรือสถานะ PocketBase', isSetupIssue: true };
  }
  if (status === 400) {
    // 400 with no field errors usually means createRule failed — auth state issue
    if (/failed to create|failed to update/i.test(rawMsg)) {
      return {
        message: 'สร้างไม่สำเร็จ — ลองออกจากระบบแล้วเข้าใหม่ (auth token หมดอายุ) หรือตรวจสอบว่า URL ถูกต้อง',
        isSetupIssue: false,
      };
    }
    return { message: rawMsg || 'ข้อมูลไม่ถูกต้อง', isSetupIssue: false };
  }

  return { message: rawMsg || 'เกิดข้อผิดพลาด กรุณาลองใหม่', isSetupIssue: false };
}

export function detectPlatform(url: string): string {
  if (!url) return 'other';
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('mailto:')) return 'email';
  if (lower.startsWith('sms:') || lower.startsWith('tel:')) return 'sms';

  let host = '';
  try {
    host = new URL(trimmed).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return 'other';
  }
  if (!host) return 'other';

  for (const p of PLATFORMS) {
    if (p.hosts.some((h) => host === h || host.endsWith(`.${h}`))) {
      return p.id;
    }
  }
  return 'website';
}
