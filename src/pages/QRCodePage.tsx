import { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'motion/react';
import { Download, Copy, Check, ExternalLink, QrCode, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import pb from '../lib/pb';

export default function QRCodePage() {
  const { user, username } = useAuth();
  const [copied, setCopied] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [url, setUrl] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Fetch displayName from PocketBase (authoritative source)
  // This ensures the QR code URL matches what PreviewPage uses to look up the page
  useEffect(() => {
    if (user?.id) {
      (async () => {
        try {
          const pages = await pb.collection('pages').getList(1, 1, {
            filter: `user = "${user.id}"`,
          });
          if (pages.items.length > 0) {
            const name = pages.items[0].displayName || '';
            setDisplayName(name);
            const slug = name || username || 'my_page';
            setUrl(`${import.meta.env.VITE_SITE_URL || window.location.origin}/${slug}`);
          } else {
            // No page in PB yet, fallback to username
            const slug = username || 'my_page';
            setDisplayName(slug);
            setUrl(`${import.meta.env.VITE_SITE_URL || window.location.origin}/${slug}`);
          }
        } catch (err) {
          console.error('Failed to fetch page:', err);
          // Fallback to localStorage
          try {
            const raw = localStorage.getItem('openbio_preview');
            if (raw) {
              const data = JSON.parse(raw);
              if (data.displayName) {
                setDisplayName(data.displayName);
                setUrl(`${import.meta.env.VITE_SITE_URL || window.location.origin}/${data.displayName}`);
                return;
              }
            }
          } catch { /* ignore */ }
          const slug = username || 'my_page';
          setDisplayName(slug);
          setUrl(`${import.meta.env.VITE_SITE_URL || window.location.origin}/${slug}`);
        }
      })();
    } else {
      // Not logged in - use localStorage
      try {
        const raw = localStorage.getItem('openbio_preview');
        if (raw) {
          const data = JSON.parse(raw);
          if (data.displayName) {
            setDisplayName(data.displayName);
            setUrl(`${import.meta.env.VITE_SITE_URL || window.location.origin}/${data.displayName}`);
            return;
          }
        }
      } catch { /* ignore */ }
      setUrl(`${import.meta.env.VITE_SITE_URL || window.location.origin}/preview`);
    }
  }, [user?.id, username]);

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const shortName = displayName || username || 'my_page';
  const previewUrl = `${siteUrl}/${shortName}`;

  const handleCopy = useCallback(async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const handleDownload = useCallback(() => {
    if (!url || !canvasRef.current) return;
    const canvas = canvasRef.current.querySelector('canvas');
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    const exportSize = 1024;
    const padding = 80;
    exportCanvas.width = exportSize;
    exportCanvas.height = exportSize;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportSize, exportSize);
    ctx.drawImage(canvas, padding, padding, exportSize - padding * 2, exportSize - padding * 2);

    const link = document.createElement('a');
    link.download = 'linkcenter-qrcode.png';
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  }, [url]);

  return (
    <div className="min-h-screen bg-[#f5f3f0] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* URL Bar + Live Preview label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <a
            href={`${siteUrl}/${shortName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">LC</span>
            </div>
            <span className="text-sm text-gray-500">linkc.ee/</span>
            <span className="text-sm font-semibold text-gray-900">{shortName}</span>
            <ExternalLink size={13} className="ml-1 text-gray-400" />
          </a>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Live Preview</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* Left: Phone Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="mx-auto w-[290px]">
              <div className="rounded-[2.8rem] bg-gradient-to-b from-gray-800 to-gray-900 p-[10px] shadow-2xl shadow-gray-900/30 relative">
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-b from-violet-300/25 via-indigo-200/15 to-purple-300/15 rounded-[3.5rem] blur-2xl -z-[1]" />
                {/* Side buttons */}
                <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
                <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                <div className="absolute -left-[2px] top-[200px] w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                <div className="absolute -right-[2px] top-32 w-[3px] h-16 bg-gray-700 rounded-r-sm" />
                {/* Notch */}
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center">
                    <div className="w-12 h-3 bg-gray-800 rounded-full" />
                  </div>
                </div>
                {/* Screen - iframe */}
                <div className="rounded-[2.2rem] overflow-hidden bg-white min-h-[520px]">
                  <iframe
                    src="/preview"
                    title="LinkCenter Preview"
                    className="w-full h-[520px] border-0 rounded-[2.2rem]"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: QR Code + Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* QR Code Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <QrCode size={18} className="text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">QR Code ของคุณ</span>
              </div>

              <div ref={canvasRef} className="bg-white p-3 rounded-xl border border-gray-50">
                {url ? (
                  <QRCodeCanvas
                    value={url}
                    size={200}
                    level="H"
                    includeMargin={false}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-50 rounded-xl" style={{ width: 200, height: 200 }}>
                    <p className="text-gray-300 text-sm text-center px-4">กำลังโหลด...</p>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-gray-400 mt-3 text-center">
                สแกนด้วยกล้องมือถือเพื่อเปิดลิงก์
              </p>
            </div>

            {/* URL Input */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <label className="text-xs font-medium text-gray-500 mb-2 block uppercase tracking-wider">ลิงก์สำหรับ QR Code</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleCopy}
                  disabled={!url}
                  className="px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-30"
                  title="คัดลอก URL"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400" />}
                </button>
              </div>
              <button
                onClick={() => setUrl(previewUrl)}
                className="mt-2 flex items-center gap-1.5 text-xs text-purple-500 hover:text-purple-700 transition-colors"
              >
                <User size={12} />
                ใช้ลิงก์หน้า LinkCenter ของฉัน
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={!url}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-gray-900/20"
            >
              <Download size={16} />
              ดาวน์โหลด QR Code
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
