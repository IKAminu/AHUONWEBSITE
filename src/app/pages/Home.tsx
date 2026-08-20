import { Link, useNavigate } from 'react-router';
import { Search, Shield, CheckCircle, ArrowRight, FileText, Users } from 'lucide-react';
import { useState } from 'react';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/directory?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/directory');
    }
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="bg-[#003D1F] text-white"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-sm mb-8">
              <Shield size={13} />
              <span>Licensed by NAHCON — National Hajj Commission of Nigeria</span>
            </div>
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.15] mb-6"
            >
              Advancing Trusted Hajj &amp; Umrah Services in Nigeria
            </h1>
            <p className="text-[17px] text-white/70 leading-relaxed mb-10 max-w-xl">
              AHUON represents licensed pilgrimage operators across Nigeria. Find a verified
              operator, confirm credentials, or file a complaint — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/directory"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#17211B] font-semibold text-[15px] px-6 py-3 rounded-md hover:bg-[#c4a030] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#003D1F]"
              >
                Find an Operator
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold text-[15px] px-6 py-3 rounded-md hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick search */}
      <section className="bg-white border-b border-[#E2E8E4]" aria-label="Search for operators">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <form onSubmit={handleSearch} role="search">
            <label htmlFor="hero-search" className="block text-[13px] font-medium text-[#66736A] mb-2">
              Search by company name, city, or state
            </label>
            <div className="flex gap-3 max-w-2xl">
              <div className="flex items-center flex-1 border border-[#E2E8E4] rounded-md px-3 focus-within:border-[#008000] focus-within:ring-1 focus-within:ring-[#008000] bg-white transition-all">
                <Search size={16} className="text-[#66736A] mr-2 flex-shrink-0" aria-hidden="true" />
                <input
                  id="hero-search"
                  type="text"
                  placeholder="e.g. Al-Hidaya Services, Kano..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-2.5 bg-transparent outline-none text-sm text-[#17211B] placeholder:text-[#66736A]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#008000] text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2 whitespace-nowrap"
              >
                Search Directory
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* What AHUON does */}
      <section className="bg-[#F8FAF9] py-20" aria-labelledby="about-heading">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 id="about-heading" className="text-2xl md:text-3xl font-bold text-[#17211B] mb-5">
                About AHUON
              </h2>
              <p className="text-[16px] text-[#66736A] leading-relaxed mb-5">
                The Association of Hajj and Umrah Operators of Nigeria (AHUON) is the national
                body representing licensed Hajj and Umrah travel operators. We set professional
                standards, verify member credentials, and provide a formal mechanism for
                resolving complaints between pilgrims and operators.
              </p>
              <p className="text-[16px] text-[#66736A] leading-relaxed mb-8">
                Every AHUON member has been vetted for legal registration, NAHCON licensing,
                and compliance with our professional standards — so pilgrims can make informed
                choices with confidence.
              </p>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 text-[#008000] font-semibold text-sm hover:underline"
              >
                Browse the member directory
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Verified Members',
                  description: 'All operators are verified against NAHCON records before admission.',
                },
                {
                  title: 'Complaint Resolution',
                  description: 'A formal 5-working-day resolution process for pilgrim disputes.',
                },
                {
                  title: 'Professional Standards',
                  description: 'Members commit to our code of conduct and service standards.',
                },
                {
                  title: 'Certificate Verification',
                  description: 'Instantly verify any AHUON membership certificate via QR code.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-[#E2E8E4] rounded-lg p-5">
                  <div className="w-6 h-6 rounded-sm bg-green-100 flex items-center justify-center mb-3">
                    <CheckCircle size={14} className="text-[#008000]" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-[#17211B] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#66736A] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="bg-white border-y border-[#E2E8E4] py-14" aria-labelledby="trust-heading">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 id="trust-heading" className="sr-only">AHUON trust indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8E4]">
            <div className="py-6 sm:py-0 sm:px-10 first:pl-0 last:pr-0 text-center">
              <div className="text-3xl font-bold text-[#17211B] mb-1">Multi-State</div>
              <div className="text-sm text-[#66736A]">Network of licensed operators across Nigeria</div>
            </div>
            <div className="py-6 sm:py-0 sm:px-10 text-center">
              <div className="text-3xl font-bold text-[#17211B] mb-1">5-Day</div>
              <div className="text-sm text-[#66736A]">Maximum complaint resolution target</div>
            </div>
            <div className="py-6 sm:py-0 sm:px-10 text-center">
              <div className="text-3xl font-bold text-[#17211B] mb-1">NAHCON</div>
              <div className="text-sm text-[#66736A]">Members licensed by Nigeria's Hajj Commission</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why use an AHUON member */}
      <section className="bg-[#F8FAF9] py-20" aria-labelledby="why-heading">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <h2 id="why-heading" className="text-2xl md:text-3xl font-bold text-[#17211B] mb-4">
              Why choose an AHUON-verified operator?
            </h2>
            <p className="text-[16px] text-[#66736A] leading-relaxed">
              Booking with an AHUON member means you have recourse if something goes wrong.
              Our members operate under a formal accountability framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Find a Verified Operator',
                body: "Search the directory and filter by location, services, and years of operation. Check each operator's NAHCON license and complaint history.",
              },
              {
                step: '02',
                title: 'Confirm Their Status',
                body: "Scan the QR code on any AHUON certificate to instantly verify it's current and authentic — before handing over any funds.",
              },
              {
                step: '03',
                title: 'Protected If Something Goes Wrong',
                body: "If a dispute arises, file a formal complaint through AHUON. We facilitate resolution within 5 working days, with EFCC escalation available.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-[#E2E8E4] rounded-lg p-7">
                <div className="text-[11px] font-bold text-[#66736A] tracking-widest uppercase mb-4">
                  Step {item.step}
                </div>
                <h3 className="font-bold text-[17px] text-[#17211B] mb-3">{item.title}</h3>
                <p className="text-sm text-[#66736A] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complaint system */}
      <section className="bg-white border-y border-[#E2E8E4] py-20" aria-labelledby="complaint-heading">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 id="complaint-heading" className="text-2xl md:text-3xl font-bold text-[#17211B] mb-5">
                A formal complaint system you can trust
              </h2>
              <p className="text-[16px] text-[#66736A] leading-relaxed mb-6">
                AHUON operates a structured complaint resolution process. When you file a
                complaint against an operator, they are formally notified and required to respond.
                Every complaint receives a reference number and a traceable status.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Submit complaint with reference number',
                  'Operator has 5 working days to respond',
                  'AHUON EXCO reviews and mediates',
                  'Unresolved cases can be escalated to EFCC',
                ].map((step) => (
                  <div key={step} className="flex items-start gap-3 text-sm text-[#66736A]">
                    <CheckCircle size={16} className="text-[#008000] mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  to="/file-complaint"
                  className="inline-flex items-center gap-2 bg-[#17211B] text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#2a3530] transition-colors"
                >
                  <FileText size={15} />
                  File a Complaint
                </Link>
                <Link
                  to="/complaint-status"
                  className="inline-flex items-center text-[#008000] font-semibold text-sm px-5 py-2.5 rounded-md border border-[#E2E8E4] hover:bg-[#F8FAF9] transition-colors"
                >
                  Track Status
                </Link>
              </div>
            </div>

            {/* Process visual */}
            <div className="space-y-2">
              {[
                { label: 'Submitted', desc: 'Complaint received and reference issued' },
                { label: 'Under Review', desc: 'EXCO reviews the complaint details' },
                { label: 'Awaiting Response', desc: 'Operator formally notified — 5 days to respond' },
                { label: 'In Resolution', desc: 'Active mediation underway' },
                { label: 'Resolved / Closed', desc: 'Outcome documented and filed' },
              ].map((stage, i) => (
                <div key={stage.label} className="flex items-start gap-4 p-4 border border-[#E2E8E4] rounded-md bg-[#F8FAF9]">
                  <div className="w-6 h-6 rounded-sm bg-[#003D1F] text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#17211B]">{stage.label}</div>
                    <div className="text-xs text-[#66736A] mt-0.5">{stage.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate verification */}
      <section className="bg-[#F8FAF9] py-20" aria-labelledby="verify-heading">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-white border border-[#E2E8E4] rounded-lg p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[#66736A] text-xs font-semibold uppercase tracking-widest mb-3">
                <Shield size={13} />
                Instant Verification
              </div>
              <h2 id="verify-heading" className="text-2xl font-bold text-[#17211B] mb-3">
                Verify any AHUON membership certificate
              </h2>
              <p className="text-sm text-[#66736A] leading-relaxed max-w-lg">
                Before engaging any operator, verify their AHUON membership is current and
                in good standing. Enter the membership number from their certificate or
                scan the QR code.
              </p>
            </div>
            <Link
              to="/verify"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#008000] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#005A2B] transition-colors"
            >
              Verify a Certificate
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#003D1F] text-white py-20" aria-labelledby="cta-heading">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Nigeria's national network of Hajj &amp; Umrah operators
          </h2>
          <p className="text-[16px] text-white/60 mb-10 max-w-xl mx-auto">
            AHUON membership signals credibility, compliance, and commitment to professional
            service. Apply to join today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#17211B] font-semibold text-[15px] px-6 py-3 rounded-md hover:bg-[#c4a030] transition-colors"
            >
              <Users size={16} />
              Apply for Membership
            </Link>
            <Link
              to="/directory"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold text-[15px] px-6 py-3 rounded-md hover:bg-white/10 transition-colors"
            >
              Browse the Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
