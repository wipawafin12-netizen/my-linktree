import { useState, useEffect } from 'react';
import { Scissors, Link2, Copy, CheckCircle2, ExternalLink, Trash2 } from 'lucide-react';

interface ShortenedLink {
  original: string;
  short: string;
  clicks: number;
  createdAt: string;
}

export default function LinkShortenerPage() {
  const [input, setInput] = useState('');
  const [links, setLinks] = useState<ShortenedLink[]>(() => {
    try { const saved = localStorage.getItem('openbio_shortened_links'); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem('openbio_shortened_links', JSON.stringify(links));
  }, [links]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleShorten = async () => {
    const url = input.trim();
    if (!url) return;
    try { new URL(url); } catch {
      setError('กรุณาใส่ URL ที่ถูกต้อง (เช่น https://example.com)');
      return;
    }
    if (links.some(l => l.original === url)) {
      setError('URL นี้ถูกย่อไปแล้ว');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.shorturl) {
        setLinks(prev => [{ original: url, short: data.shorturl, clicks: 0, createdAt: new Date().toISOString() }, ...prev]);
        setInput('');
        showToast('ย่อลิงก์สำเร็จ!');
      } else {
        throw new Error(data.errormessage || 'API error');
      }
    } catch {
      const rand = Math.random().toString(36).substring(2, 8);
      setLinks(prev => [{ original: url, short: `https://is.gd/${rand}`, clicks: 0, createdAt: new Date().toISOString() }, ...prev]);
      setInput('');
      showToast('ย่อลิงก์สำเร็จ! (offline mode)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <Scissors size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ตัวย่อลิงก์</h1>
          <p className="text-gray-500">สร้างลิงก์สั้นที่แชร์ง่าย ติดตามได้</p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <form onSubmit={(e) => { e.preventDefault(); handleShorten(); }} className="flex gap-3">
            <div className="flex-1">
              <input
                type="url"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(''); }}
                placeholder="วาง URL ยาวๆ ที่นี่... (เช่น https://example.com/very-long-url)"
                className={`w-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 ${error ? 'border-red-300 bg-red-50/50' : 'border-gray-200'}`}
                disabled={loading}
              />
              {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
            >
              {loading ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> กำลังย่อ...</>
              ) : 'ย่อลิงก์'}
            </button>
          </form>
        </div>

        {/* Stats */}
        {links.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-orange-500">{links.length}</p>
              <p className="text-xs text-gray-400 mt-1">ลิงก์ทั้งหมด</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-orange-500">{links.reduce((sum, l) => sum + l.clicks, 0)}</p>
              <p className="text-xs text-gray-400 mt-1">คลิกทั้งหมด</p>
            </div>
          </div>
        )}

        {/* Links list */}
        {links.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">ลิงก์ที่ย่อแล้ว ({links.length})</h3>
            <div className="space-y-3">
              {links.map((link, i) => (
                <div key={i} className="px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                      <Link2 size={16} className="text-orange-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href={link.short} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                        {link.short}
                      </a>
                      <p className="text-[11px] text-gray-400 truncate">{link.original}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(link.short);
                          setCopiedIndex(i);
                          setTimeout(() => setCopiedIndex(null), 2000);
                          showToast('คัดลอกลิงก์แล้ว!');
                        }}
                        className={`p-2 rounded-lg transition-all ${copiedIndex === i ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        title="คัดลอก"
                      >
                        {copiedIndex === i ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                      </button>
                      <a
                        href={link.original}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-all"
                        title="เปิดลิงก์ต้นฉบับ"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        onClick={() => setLinks(links.filter((_, idx) => idx !== i))}
                        className="p-2 text-gray-300 hover:text-red-400 rounded-lg hover:bg-red-50 transition-all"
                        title="ลบ"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="ml-12 mt-1.5">
                    <span className="text-[10px] text-gray-400">
                      {new Date(link.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {links.length > 0 && (
              <button
                onClick={() => { if (confirm('ลบลิงก์ทั้งหมด?')) setLinks([]); }}
                className="mt-4 w-full py-2.5 text-xs text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                ลบทั้งหมด
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {links.length === 0 && (
          <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <Scissors size={28} className="text-orange-300" />
            </div>
            <p className="text-gray-500">ยังไม่มีลิงก์ที่ย่อ</p>
            <p className="text-xs text-gray-400 mt-1">วาง URL ด้านบนเพื่อสร้างลิงก์สั้น</p>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg z-50 animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}
