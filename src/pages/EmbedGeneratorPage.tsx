import { useState } from 'react';
import { Code2, Link2, Copy, CheckCircle2, ExternalLink, Trash2, Play, Music2, Video } from 'lucide-react';

function detectPlatform(url: string): { name: string; label: string; color: string } | null {
  if (/(?:youtube\.com|youtu\.be)/i.test(url)) return { name: 'youtube', label: 'YouTube', color: '#ff0000' };
  if (/spotify\.com/i.test(url)) return { name: 'spotify', label: 'Spotify', color: '#1db954' };
  if (/tiktok\.com/i.test(url)) return { name: 'tiktok', label: 'TikTok', color: '#000000' };
  return null;
}

function urlToEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes('youtube.com') || u.hostname === 'youtu.be') {
      let videoId: string | null = null;
      if (u.hostname === 'youtu.be') videoId = u.pathname.slice(1).split('/')[0];
      else videoId = u.searchParams.get('v') || u.pathname.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]+)/)?.[1] || null;
      if (videoId) return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    }
    // Spotify
    const sp = url.match(/spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album|playlist|episode|show|artist)\/([a-zA-Z0-9]+)/);
    if (sp) {
      const h = sp[1] === 'track' ? 152 : 352;
      return `<iframe src="https://open.spotify.com/embed/${sp[1]}/${sp[2]}?utm_source=generator&theme=0" width="100%" height="${h}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    }
    // TikTok
    const tt = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
    if (tt) return `<iframe src="https://www.tiktok.com/embed/v2/${tt[1]}" width="100%" height="580" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } catch { /* not a valid URL */ }
  return null;
}

function extractIframeSrc(html: string): string | null {
  const m = html.match(/src=["']([^"']+)["']/);
  return m ? m[1] : null;
}

interface HistoryItem {
  url: string;
  code: string;
  platform: string;
  createdAt: string;
}

export default function EmbedGeneratorPage() {
  const [input, setInput] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try { const s = localStorage.getItem('openbio_embed_history'); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  const platform = input.trim() ? detectPlatform(input.trim()) : null;

  const handleGenerate = () => {
    setError('');
    setCopied(false);
    const url = input.trim();
    if (!url) return;

    const code = urlToEmbed(url);
    if (!code) {
      setError('ไม่รองรับลิงก์นี้ — รองรับเฉพาะ YouTube, Spotify, TikTok');
      setEmbedCode('');
      return;
    }

    setEmbedCode(code);
    const item: HistoryItem = {
      url, code,
      platform: platform?.label || 'Unknown',
      createdAt: new Date().toISOString(),
    };
    const newHistory = [item, ...history.filter(h => h.url !== url)].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('openbio_embed_history', JSON.stringify(newHistory));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (url: string) => {
    const newHistory = history.filter(h => h.url !== url);
    setHistory(newHistory);
    localStorage.setItem('openbio_embed_history', JSON.stringify(newHistory));
  };

  const handleUseFromHistory = (item: HistoryItem) => {
    setInput(item.url);
    setEmbedCode(item.code);
    setError('');
    setCopied(false);
  };

  const previewSrc = embedCode ? extractIframeSrc(embedCode) : null;
  const isSpotify = embedCode.includes('spotify.com');
  const isTikTok = embedCode.includes('tiktok.com');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-200 mb-4">
            <Code2 size={24} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">Embed Generator</h1>
          <p className="text-gray-500 text-sm">วางลิงก์แล้วรับโค้ด embed ได้ทันที</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
          {/* Input */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ลิงก์ที่ต้องการ</label>
            <div className="relative">
              <Link2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="วางลิงก์ YouTube / Spotify / TikTok"
                className="w-full pl-10 pr-4 py-3.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Platform Tags */}
          <div className="flex gap-2 flex-wrap mb-5">
            {[
              { name: 'youtube', label: 'YouTube', color: '#ff0000', icon: Video },
              { name: 'spotify', label: 'Spotify', color: '#1db954', icon: Music2 },
              { name: 'tiktok', label: 'TikTok', color: '#000000', icon: Play },
            ].map((p) => (
              <span
                key={p.name}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-full border transition-all ${
                  platform?.name === p.name
                    ? 'text-gray-900 bg-white border-gray-900 shadow-sm'
                    : 'text-gray-400 bg-gray-50 border-gray-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                {p.label}
              </span>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!input.trim()}
            className="w-full py-3.5 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-px transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            สร้าง Embed Code
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 px-4 py-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl">
              {error}
            </div>
          )}

          {/* Output */}
          {embedCode && (
            <div className="mt-8 animate-[fadeUp_0.3s_ease_both]">
              <div className="h-px bg-gray-100 mb-8" />

              {/* Code */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Embed Code</span>
                  <button
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-all ${
                      copied
                        ? 'text-green-600 bg-green-50 border-green-200'
                        : 'text-gray-600 bg-white border-gray-200 hover:border-gray-900 hover:shadow-sm'
                    }`}
                  >
                    {copied ? <><CheckCircle2 size={12} /> คัดลอกแล้ว!</> : <><Copy size={12} /> คัดลอก</>}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={embedCode}
                  rows={4}
                  className="w-full px-4 py-3 text-xs font-mono text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-y focus:outline-none"
                />
              </div>

              {/* Preview */}
              {previewSrc && (
                <div className="mt-6">
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ตัวอย่าง</span>
                  <div
                    className={`rounded-xl overflow-hidden border border-gray-200 bg-black ${
                      isTikTok ? 'max-w-[325px] mx-auto' : ''
                    }`}
                    style={isSpotify ? { background: '#282828' } : undefined}
                  >
                    <iframe
                      src={previewSrc}
                      width="100%"
                      height={isTikTok ? 580 : isSpotify ? (embedCode.includes('height="152"') ? 152 : 352) : 315}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      className="block"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!embedCode && !error && (
            <>
              <div className="h-px bg-gray-100 mt-8 mb-6" />
              <div className="flex flex-col items-center justify-center py-8 text-gray-300">
                <ExternalLink size={32} strokeWidth={1.5} className="mb-2 opacity-50" />
                <span className="text-sm">ตัวอย่างจะแสดงที่นี่</span>
              </div>
            </>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold text-gray-900 mb-3">ประวัติล่าสุด</h2>
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.url}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all group"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: item.platform === 'YouTube' ? '#ff0000' : item.platform === 'Spotify' ? '#1db954' : '#000',
                    }}
                  />
                  <button
                    onClick={() => handleUseFromHistory(item)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <p className="text-sm text-gray-700 truncate">{item.url}</p>
                    <p className="text-[11px] text-gray-400">{item.platform} &middot; {new Date(item.createdAt).toLocaleDateString('th-TH')}</p>
                  </button>
                  <button
                    onClick={() => handleDelete(item.url)}
                    className="p-1.5 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-10">
          รองรับ YouTube &middot; Spotify &middot; TikTok
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
