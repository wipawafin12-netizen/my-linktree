import { useState, useRef } from 'react';
import { Bell, Plus, ChevronRight, ChevronLeft, MessageSquare, Calendar, Tag, Music2, ShoppingBag } from 'lucide-react';

const toolCards = [
  {
    title: 'Collect emails & phone numbers',
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
            <div className="bg-[#8b6f5e] text-white rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold w-fit">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              456
            </div>
            <div className="text-[10px] text-[#8b6f5e] font-semibold mt-1">New Subscribers</div>
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-1.5 mt-2 ml-4">
            <div className="text-[10px] text-gray-400">Email address</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Create a survey or quiz',
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
            <span className="text-gray-400">◎</span> Dropdown
          </div>
        </div>
        <button className="w-full bg-[#8b6f5e] text-white text-xs font-semibold rounded-lg py-1.5">Save</button>
      </div>
    ),
  },
  {
    title: 'Sell digital products & links',
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
    title: 'Offer a booking link',
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
    title: 'Offer a discount code',
    bg: 'bg-[#b8d435]',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
            alt="shoes"
            className="w-[140px] h-[100px] object-cover rounded-lg"
          />
          <div className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-gray-400 text-sm cursor-pointer shadow">×</div>
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-800">Use my code</p>
            <div className="bg-black text-[#b8d435] font-bold text-sm px-3 py-1 rounded-md mt-1">RUN20OFF</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Embed audio player',
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

export default function AudienceContactsPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'integrations'>('contacts');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-sans">
      {/* Top Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-gray-900">Audience</h1>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'contacts'
                    ? 'bg-[#8b6f5e] text-white'
                    : 'text-gray-600 hover:bg-[#faf0ec]'
                }`}
              >
                Contacts
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'integrations'
                    ? 'bg-[#8b6f5e] text-white'
                    : 'text-gray-600 hover:bg-[#faf0ec]'
                }`}
              >
                Integrations
              </button>
            </div>
          </div>
          <button className="flex items-center gap-1.5 border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4" />
            Add growth tools
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'contacts' && (
          <>
            {/* Subscribe CTA Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-12 mb-10 flex flex-col items-center text-center">
              {/* Illustration */}
              <div className="mb-6 relative">
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 w-[160px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-[10px] font-bold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="4"/></svg>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full w-14" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                      <span className="text-[10px]">🧑</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full w-10" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-[10px]">🧑</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full w-12" />
                  </div>
                </div>
                {/* Bell icon */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#c8e64a] flex items-center justify-center shadow-sm">
                  <Bell className="w-4 h-4 text-gray-800" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Let visitors subscribe to your Linktree for updates
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Let's start growing your contact list.
              </p>
              <button className="bg-[#8b6f5e] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#7a5f4f] transition-colors">
                Turn on Subscribe
              </button>
            </div>

            {/* Tools to grow your audience */}
            <div className="relative">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tools to grow your audience</h3>

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
            <h2 className="text-xl font-bold text-gray-900 mb-2">Integrations</h2>
            <p className="text-gray-500 text-sm">
              Connect your favorite tools to grow and manage your audience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
