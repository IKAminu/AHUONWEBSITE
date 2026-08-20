import { Calendar } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: 'New Guidelines for 2026 Hajj Season Announced',
    category: 'NAHCON Update',
    date: '2026-04-15',
    excerpt: 'The National Hajj Commission of Nigeria has released updated requirements and procedures for the upcoming 2026 Hajj season, including new documentation and health protocols for pilgrims.',
  },
  {
    id: 2,
    title: 'AHUON Annual Conference 2026 — Registration Now Open',
    category: 'Press Release',
    date: '2026-04-10',
    excerpt: 'AHUON invites member operators and industry stakeholders to register for the 2026 Annual Conference, bringing together representatives from across Nigeria.',
  },
  {
    id: 3,
    title: 'Excellence in Service Award Winners Announced',
    category: 'Member Spotlight',
    date: '2026-04-05',
    excerpt: 'Celebrating AHUON members who demonstrated outstanding service standards and pilgrim care in the 2025 Hajj and Umrah season.',
  },
  {
    id: 4,
    title: 'Saudi Arabia Updates Visa Requirements for Umrah',
    category: 'Saudi Update',
    date: '2026-03-28',
    excerpt: 'Important updates to visa application procedures and documentary requirements for Nigerian Umrah travelers, effective from the 2026 season.',
  },
  {
    id: 5,
    title: 'AHUON and EFCC Partnership — Fraud Prevention Framework',
    category: 'Official Circular',
    date: '2026-03-20',
    excerpt: 'AHUON has formalised a cooperation framework with the EFCC to strengthen protection for pilgrims against fraudulent operators and unregistered agents.',
  },
  {
    id: 6,
    title: 'Training Workshop: Customer Service Excellence',
    category: 'AHUON Events',
    date: '2026-03-12',
    excerpt: 'AHUON held a service quality training workshop attended by member operators from 12 states, focused on complaint handling and pilgrim welfare standards.',
  },
];

const CATEGORY_STYLES: Record<string, string> = {
  'NAHCON Update': 'bg-blue-50 text-blue-800 border-blue-200',
  'Press Release': 'bg-purple-50 text-purple-800 border-purple-200',
  'Member Spotlight': 'bg-[#F3E7B3] text-[#92731E] border-[#D4AF37]/30',
  'Saudi Update': 'bg-green-50 text-green-800 border-green-200',
  'Official Circular': 'bg-red-50 text-red-800 border-red-200',
  'AHUON Events': 'bg-gray-50 text-gray-700 border-gray-200',
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

export function News() {
  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E2E8E4]">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#17211B] mb-1">News &amp; Updates</h1>
          <p className="text-[15px] text-[#66736A]">
            Latest announcements from AHUON, NAHCON, and relevant authorities.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-10">
        {/* Featured article */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg overflow-hidden mb-8">
          <div className="p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[11px] font-semibold border px-2.5 py-1 rounded-sm uppercase tracking-wide ${CATEGORY_STYLES[featured.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                {featured.category}
              </span>
              <span className="text-xs text-[#66736A]">{formatDate(featured.date)}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#17211B] mb-3 leading-snug max-w-2xl">
              {featured.title}
            </h2>
            <p className="text-[15px] text-[#66736A] leading-relaxed max-w-2xl mb-5">
              {featured.excerpt}
            </p>
            <button className="text-sm font-semibold text-[#008000] hover:underline">
              Read full article →
            </button>
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-[#E2E8E4] rounded-lg p-6 hover:border-[#008000] hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-sm uppercase tracking-wide ${CATEGORY_STYLES[article.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  {article.category}
                </span>
              </div>
              <h3 className="font-semibold text-[15px] text-[#17211B] mb-2 leading-snug line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-[#66736A] leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#66736A]">
                  <Calendar size={12} />
                  <span>{formatDate(article.date)}</span>
                </div>
                <button className="text-xs font-semibold text-[#008000] hover:underline">
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg p-8 mt-10">
          <div className="max-w-lg">
            <h2 className="font-bold text-[17px] text-[#17211B] mb-2">Stay informed</h2>
            <p className="text-sm text-[#66736A] mb-5">
              Subscribe to receive AHUON announcements and industry updates by email.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-[#E2E8E4] rounded-md px-3 py-2.5 text-sm text-[#17211B] placeholder:text-[#66736A] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none"
              />
              <button className="bg-[#008000] text-white font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
