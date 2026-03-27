import { useState, useEffect, useRef } from 'react';
import { Bell, Plus, ChevronRight, ChevronLeft, MessageSquare, Calendar, Music2, ShoppingBag, Trash2, Download, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import pb, { isPocketBaseEnabled } from '../lib/pb';

const toolCards = [
  {
    title: 'เก็บอีเมลและเบอร์โทรศัพท์',
    bg: 'bg-[#f5f0e8]',
    preview: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center absolute -top-2 -left-6">
            <Bell className="w-5 h-5 text-black" />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 ml-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
              <div className="text-xs text-gray-700 font-medium">Get updates from<br/>Nick Neon</div>
            </div>
            <div className="bg-[#6d28d9] text-white rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold w-fit">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              456
            </div>
            <div className="text-[10px] text-[#6d28d9] font-semibold mt-1">New Subscribers</div>
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-1.5 mt-2 ml-4">
            <div className="text-[10px] text-gray-400">Email address</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'สร้างแบบสำรวจหรือแบบทดสอบ',
    bg: 'bg-[#d4c9a8]',
    preview: (
      <div className="bg-white rounded-xl shadow-md p-4 mx-auto max-w-[180px]">
        <p className="text-sm font-bold text-gray-900 mb-1">Add a question</p>
        <div className="mb-2">
          <label className="text-[10px] text-gray-500">Label</label>
          <div className="border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-700 mt-0.5">What's your favorite fragrance?</div>
        </div>
        <div className="mb-3">
          <label className="text-[10px] text-gray-500">Field Type</label>
          <div className="border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-700 mt-0.5 flex items-center gap-1">
            <span className="text-gray-400">&#9788;</span> Dropdown
          </div>
        </div>
        <button className="w-full bg-[#6d28d9] text-white text-xs font-semibold rounded-lg py-1.5">Save</button>
      </div>
    ),
  },
  {
    title: 'ขายสินค้าดิจิทัลและลิงก์',
    bg: 'bg-[#8b2020]',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <div className="text-white text-center">
            <p className="text-2xl font-black tracking-wide leading-tight">BARISTA<br/>BASICS</p>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
            <ShoppingBag className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'เสนอลิงก์จองนัดหมาย',
    bg: 'bg-[#c9a96e]',
    preview: (
      <div className="flex items-end justify-center h-full pb-4">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=250&fit=crop"
            alt="person"
            className="w-[140px] h-[170px] object-cover rounded-lg"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <button className="bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
              <Calendar className="w-3 h-3" /> Book a call
            </button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'เสนอโค้ดส่วนลด',
    bg: 'bg-[#b8d435]',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
            alt="shoes"
            className="w-[140px] h-[100px] object-cover rounded-lg"
          />
          <div className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-gray-400 text-sm cursor-pointer shadow">&times;</div>
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-800">Use my code</p>
            <div className="bg-black text-[#b8d435] font-bold text-sm px-3 py-1 rounded-md mt-1">RUN20OFF</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'ฝังเครื่องเล่นเสียง',
    bg: 'bg-[#6b7280]',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Music2 className="w-4 h-4 text-gray-700" />
          </div>
          <div className="w-20 h-1 bg-white/30 rounded-full">
            <div className="w-12 h-1 bg-white rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
];

interface Subscriber {
  id: string;
  email: string;
  date: string;
  source: string;
}

export default function AudienceContactsPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'integrations'>('contacts');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageId, setPageId] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id || !isPocketBaseEnabled) { setLoading(false); return; }
    (async () => {
      try {
        const pages = await pb.collection('pages').getList(1, 1, {
          filter: `user = "${user.id}"`,
        });
        if (pages.items.length > 0) {
          const p = pages.items[0];
          setPageId(p.id);
          const subs = await pb.collection('subscribers').getFullList({
            filter: `page = "${p.id}"`,
            sort: '-created',
          });
          setSubscribers(subs.map((s: any) => ({
            id: s.id,
            email: s.email,
            date: s.created,
            source: s.source || 'form',
          })));
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, [user?.id]);

  const handleDelete = async (sub: Subscriber) => {
    try {
      await pb.collection('subscribers').delete(sub.id);
      setSubscribers(prev => prev.filter(s => s.id !== sub.id));
    } catch { /* ignore */ }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const header = 'Email,Source,Date\n';
    const rows = subscribers.map(s => `${s.email},${s.source},${s.date}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const thisWeekCount = subscribers.filter(s => {
    const d = new Date(s.date);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-sans pt-16 overflow-x-hidden">
      {/* Top Header */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between h-12 sm:h-14 gap-2">
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <h1 className="text-sm sm:text-lg font-bold text-gray-900 flex-shrink-0">ผู้ติดตาม</h1>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'contacts'
                    ? 'bg-[#6d28d9] text-white'
                    : 'text-gray-600 hover:bg-[#f5f3ff]'
                }`}
              >
                รายชื่อ ({subscribers.length})
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'integrations'
                    ? 'bg-[#6d28d9] text-white'
                    : 'text-gray-600 hover:bg-[#f5f3ff]'
                }`}
              >
                <span className="hidden sm:inline">การเชื่อมต่อ</span>
                <span className="sm:hidden">เชื่อมต่อ</span>
              </button>
            </div>
          </div>
          {subscribers.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 border border-gray-300 rounded-full px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">ส่งออก CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {activeTab === 'contacts' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-200 text-center">
                <p className="text-xl sm:text-3xl font-bold text-gray-900">{subscribers.length}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">ทั้งหมด</p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-200 text-center">
                <p className="text-xl sm:text-3xl font-bold text-gray-900">{thisWeekCount}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">สัปดาห์นี้</p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-200 text-center">
                <p className="text-xl sm:text-3xl font-bold text-gray-900">
                  {subscribers.filter(s => s.source === 'form').length}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">จากฟอร์ม</p>
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <p className="text-gray-400">กำลังโหลด...</p>
              </div>
            ) : subscribers.length > 0 ? (
              /* Subscriber Table */
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-10">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">ผู้ติดตาม</h3>
                  <span className="text-xs text-gray-400">{subscribers.length} ทั้งหมด</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {subscribers.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between px-4 sm:px-6 py-3 hover:bg-gray-50 transition-colors gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold flex-shrink-0">
                          {sub.email.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{sub.email}</p>
                          <p className="text-[10px] text-gray-400">
                            {sub.source === 'manual' ? 'เพิ่มด้วยตนเอง' : 'จากฟอร์มสมัครสมาชิก'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{new Date(sub.date).toLocaleDateString()}</span>
                        <button
                          onClick={() => handleDelete(sub)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-200 p-12 mb-10 flex flex-col items-center text-center">
                <div className="mb-6 w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-300" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  ยังไม่มีผู้ติดตาม
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  เปิดใช้งานฟอร์มสมัครสมาชิกบนหน้าสาธารณะเพื่อเริ่มเก็บอีเมล
                </p>
              </div>
            )}

            {/* Tools to grow your audience */}
            <div className="relative">
              <h3 className="text-lg font-bold text-gray-900 mb-4">เครื่องมือเพื่อขยายผู้ติดตาม</h3>

              <div className="relative group">
                {/* Left Arrow */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 -translate-x-1/2"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                {/* Cards Container */}
                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {toolCards.map((card, i) => (
                    <div
                      key={i}
                      className={`flex-shrink-0 w-[220px] h-[240px] rounded-2xl ${card.bg} p-4 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden`}
                    >
                      <div className="h-[170px] flex items-center justify-center">
                        {card.preview}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 translate-x-1/2"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Card Titles */}
              <div className="flex gap-4 mt-1">
                {toolCards.map((card, i) => (
                  <div key={i} className="flex-shrink-0 w-[220px]">
                    <p className="text-xs font-medium text-gray-700">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'integrations' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">การเชื่อมต่อ</h2>
            <p className="text-gray-500 text-sm">
              เชื่อมต่อเครื่องมือที่ชื่นชอบเพื่อขยายและจัดการผู้ติดตามของคุณ
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
