import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react';
import pb, { isPocketBaseEnabled } from '../lib/pb';
import { parseUserAgent } from '../lib/shortUrl';
import type { ShortUrlRecord } from '../lib/types';

type Status = 'loading' | 'redirecting' | 'not-found' | 'disabled' | 'expired' | 'error';

export default function ShortUrlRedirectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [status, setStatus] = useState<Status>('loading');
  const [record, setRecord] = useState<ShortUrlRecord | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!slug) { setStatus('not-found'); return; }
      if (!isPocketBaseEnabled) { setStatus('error'); return; }

      try {
        const rec = await pb.collection('short_urls').getFirstListItem<ShortUrlRecord>(
          `slug="${slug}"`,
        );
        if (cancelled) return;

        if (rec.enabled === false) { setRecord(rec); setStatus('disabled'); return; }
        if (rec.expiresAt && new Date(rec.expiresAt).getTime() < Date.now()) {
          setRecord(rec); setStatus('expired'); return;
        }

        setRecord(rec);
        setStatus('redirecting');

        const { device, browser } = parseUserAgent(navigator.userAgent);
        const referrer = (document.referrer || '').slice(0, 500);
        const userAgent = (navigator.userAgent || '').slice(0, 500);

        pb.collection('short_url_clicks').create({
          shortUrl: rec.id,
          referrer,
          userAgent,
          device,
          browser,
        }).catch(() => { /* fire-and-forget */ });

        pb.collection('short_urls').update(rec.id, {
          clicks: (rec.clicks || 0) + 1,
        }).catch(() => { /* fire-and-forget */ });

        setTimeout(() => {
          window.location.replace(rec.originalUrl);
        }, 120);
      } catch (err: unknown) {
        if (cancelled) return;
        const anyErr = err as { status?: number };
        if (anyErr?.status === 404) setStatus('not-found');
        else setStatus('error');
      }
    }

    run();
    return () => { cancelled = true; };
  }, [slug]);

  if (status === 'loading' || status === 'redirecting') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">
            {status === 'redirecting' ? 'กำลังพาไปยังปลายทาง...' : 'กำลังโหลด...'}
          </p>
          {record && (
            <p className="text-xs text-gray-400 mt-2 max-w-xs truncate mx-auto">{record.originalUrl}</p>
          )}
        </div>
      </div>
    );
  }

  const messages: Record<Exclude<Status, 'loading' | 'redirecting'>, { title: string; desc: string }> = {
    'not-found': {
      title: 'ไม่พบลิงก์นี้',
      desc: 'ลิงก์ที่คุณเปิดอาจถูกลบหรือพิมพ์ผิด',
    },
    disabled: {
      title: 'ลิงก์ถูกปิดใช้งาน',
      desc: 'เจ้าของลิงก์ได้ปิดการใช้งานชั่วคราว',
    },
    expired: {
      title: 'ลิงก์หมดอายุแล้ว',
      desc: 'ลิงก์นี้หมดอายุการใช้งานแล้ว',
    },
    error: {
      title: 'เกิดข้อผิดพลาด',
      desc: 'ไม่สามารถเปิดลิงก์ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',
    },
  };

  const msg = messages[status];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-4">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={26} className="text-orange-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">{msg.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{msg.desc}</p>
        {record && status === 'expired' && record.originalUrl && (
          <a
            href={record.originalUrl}
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 mb-4"
          >
            <ExternalLink size={12} /> เปิดลิงก์ต้นฉบับ
          </a>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={14} /> กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
