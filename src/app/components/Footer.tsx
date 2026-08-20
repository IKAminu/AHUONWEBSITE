import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-[#003D1F] text-white">
      <div className="max-w-[1280px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center rounded-sm">
                <span className="text-[#003D1F] font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-white text-[15px]">AHUON</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              The Association of Hajj and Umrah Operators of Nigeria. Representing
              licensed pilgrimage operators and protecting the interests of Nigerian pilgrims.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">
              Platform
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
              <Link to="/directory" className="text-sm text-white/60 hover:text-white transition-colors">Member Directory</Link>
              <Link to="/news" className="text-sm text-white/60 hover:text-white transition-colors">News & Updates</Link>
              <Link to="/verify" className="text-sm text-white/60 hover:text-white transition-colors">Verify Certificate</Link>
            </nav>
          </div>

          {/* Membership */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">
              Membership
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link to="/register" className="text-sm text-white/60 hover:text-white transition-colors">Become a Member</Link>
              <Link to="/login" className="text-sm text-white/60 hover:text-white transition-colors">Member Login</Link>
              <Link to="/member-dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Member Dashboard</Link>
              <Link to="/file-complaint" className="text-sm text-white/60 hover:text-white transition-colors">File a Complaint</Link>
              <Link to="/complaint-status" className="text-sm text-white/60 hover:text-white transition-colors">Track Complaint</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-white/60">
              <span>AHUON National Secretariat</span>
              <span>Abuja, FCT, Nigeria</span>
              <a href="mailto:info@ahuon.org.ng" className="hover:text-white transition-colors">
                info@ahuon.org.ng
              </a>
              <a href="mailto:complaints@ahuon.org.ng" className="hover:text-white transition-colors">
                complaints@ahuon.org.ng
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2026 AHUON. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
