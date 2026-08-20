import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  User, FileText, CreditCard, Download, LogOut,
  Shield, CheckCircle, Clock, AlertTriangle, Calendar,
  MapPin, Building, Award, Activity
} from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

type Tab = 'overview' | 'profile' | 'certificate' | 'payments';

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode; activeOnly?: boolean }[] = [
  { id: 'overview', label: 'Overview', icon: <Activity size={16} /> },
  { id: 'profile', label: 'My Profile', icon: <User size={16} /> },
  { id: 'certificate', label: 'Certificate', icon: <FileText size={16} />, activeOnly: true },
  { id: 'payments', label: 'Payments', icon: <CreditCard size={16} />, activeOnly: true },
];

export function MemberDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [member, setMember] = useState<any>(null);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);

  useEffect(() => {
    const memberDataStr = localStorage.getItem('ahuon_member');
    if (!memberDataStr) {
      toast.error('Please log in to access your dashboard.');
      navigate('/login');
      return;
    }
    try {
      setMember(JSON.parse(memberDataStr));
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ahuon_session');
    localStorage.removeItem('ahuon_user');
    localStorage.removeItem('ahuon_member');
    toast.success('Logged out.');
    navigate('/');
  };

  const generateCertificate = async () => {
    if (!member) return;
    setIsGeneratingCertificate(true);
    try {
      const doc = new jsPDF();
      const qrCodeData = await QRCode.toDataURL(
        `https://ahuon.org.ng/verify?member=${member.membershipNumber || 'DEMO'}`,
        { width: 100 }
      );

      doc.setFillColor(0, 61, 31);
      doc.rect(0, 0, 210, 28, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('AHUON', 105, 13, { align: 'center' });
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Association of Hajj and Umrah Operators of Nigeria', 105, 21, { align: 'center' });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('MEMBERSHIP CERTIFICATE', 105, 44, { align: 'center' });

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('This certifies that', 105, 58, { align: 'center' });

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(member.companyName || 'Company Name', 105, 72, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`RC Number: ${member.rcNumber || '—'}`, 105, 85, { align: 'center' });
      doc.text(`NAHCON License: ${member.nahconLicense || '—'}`, 105, 93, { align: 'center' });
      doc.text('is a verified member in good standing of AHUON.', 105, 107, { align: 'center' });

      if (member.membershipStartDate && member.membershipExpiryDate) {
        const start = new Date(member.membershipStartDate).toLocaleDateString('en-NG');
        const expiry = new Date(member.membershipExpiryDate).toLocaleDateString('en-NG');
        doc.text(`Valid: ${start} — ${expiry}`, 105, 117, { align: 'center' });
      }

      doc.text(`Membership Number: ${member.membershipNumber || 'AHUON-2026-XXXXX'}`, 105, 130, { align: 'center' });

      doc.addImage(qrCodeData, 'PNG', 82, 142, 46, 46);
      doc.setFontSize(8);
      doc.text('Scan to verify membership status online', 105, 193, { align: 'center' });

      doc.setFontSize(9);
      doc.text('___________________________', 105, 218, { align: 'center' });
      doc.text('AHUON National President', 105, 225, { align: 'center' });
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Issued: ${new Date().toLocaleDateString('en-NG')}`, 105, 240, { align: 'center' });

      doc.save(`AHUON-Certificate-${member.companyName}.pdf`);
      toast.success('Certificate downloaded.');
    } catch (error) {
      console.error('Certificate error:', error);
      toast.error('Failed to generate certificate. Please try again.');
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#008000] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#66736A]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const isActive = member.membershipStatus === 'active';
  const isPending = member.membershipStatus === 'pending';

  const statusBadge = isActive
    ? { label: 'Active Member', class: 'bg-green-50 text-green-800 border-green-200' }
    : isPending
    ? { label: 'Application Pending', class: 'bg-amber-50 text-amber-800 border-amber-200' }
    : { label: 'Membership Lapsed', class: 'bg-red-50 text-red-800 border-red-200' };

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Dashboard header */}
      <div className="bg-[#003D1F] text-white">
        <div className="max-w-[1280px] mx-auto px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Member Dashboard</div>
              <h1 className="text-xl font-bold text-white mb-3">{member.companyName}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`text-xs font-semibold border px-2.5 py-1 rounded-sm ${statusBadge.class}`}>
                  {statusBadge.label}
                </span>
                {member.membershipNumber && (
                  <span className="text-xs text-white/60 font-mono">{member.membershipNumber}</span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors focus:outline-none"
              aria-label="Log out"
            >
              <LogOut size={15} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-7">
          {/* Sidebar */}
          <aside className="lg:w-48 flex-shrink-0">
            <nav className="bg-white border border-[#E2E8E4] rounded-lg p-3 lg:sticky lg:top-24">
              {NAV_ITEMS.filter(item => !item.activeOnly || isActive).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-0.5 focus:outline-none focus:ring-2 focus:ring-[#008000] ${
                    activeTab === item.id
                      ? 'bg-[#008000] text-white'
                      : 'text-[#66736A] hover:bg-[#F8FAF9] hover:text-[#17211B]'
                  }`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                {/* Status alert for pending */}
                {isPending && (
                  <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-5">
                    <Clock size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-amber-900 text-sm mb-1">Application Under Review</div>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        Your membership application has been received and is being reviewed by the AHUON EXCO.
                        You will be notified by email within 7–14 working days.
                      </p>
                    </div>
                  </div>
                )}

                {/* Lapsed alert */}
                {!isActive && !isPending && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-5">
                    <AlertTriangle size={18} className="text-red-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-red-900 text-sm mb-1">Membership Lapsed</div>
                      <p className="text-sm text-red-800">
                        Your membership has expired. Contact AHUON to renew.
                      </p>
                    </div>
                  </div>
                )}

                {/* Key info */}
                <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
                  <h2 className="font-semibold text-[15px] text-[#17211B] mb-5">Membership Summary</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-[#E2E8E4] rounded-md p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">Status</div>
                      <div className="font-semibold text-[#17211B] capitalize">
                        {member.membershipStatus || '—'}
                      </div>
                    </div>
                    {member.membershipExpiryDate && (
                      <div className="border border-[#E2E8E4] rounded-md p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">Valid Until</div>
                        <div className="font-semibold text-[#17211B]">
                          {new Date(member.membershipExpiryDate).toLocaleDateString('en-NG', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </div>
                      </div>
                    )}
                    <div className="border border-[#E2E8E4] rounded-md p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">Complaints</div>
                      <div className="font-semibold text-[#17211B]">
                        {member.complaintResolvedCount || 0} of {member.complaintCount || 0} resolved
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                {isActive && (
                  <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
                    <h2 className="font-semibold text-[15px] text-[#17211B] mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setActiveTab('certificate')}
                        className="flex items-center gap-3 p-4 border border-[#E2E8E4] rounded-md hover:border-[#008000] hover:bg-green-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#008000]"
                      >
                        <Download size={18} className="text-[#008000] flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm text-[#17211B]">Download Certificate</div>
                          <div className="text-xs text-[#66736A]">PDF with QR code</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="flex items-center gap-3 p-4 border border-[#E2E8E4] rounded-md hover:border-[#008000] hover:bg-green-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#008000]"
                      >
                        <User size={18} className="text-[#008000] flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm text-[#17211B]">View Profile</div>
                          <div className="text-xs text-[#66736A]">Your company information</div>
                        </div>
                      </button>
                      <Link
                        to={`/directory`}
                        className="flex items-center gap-3 p-4 border border-[#E2E8E4] rounded-md hover:border-[#008000] hover:bg-green-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#008000]"
                      >
                        <Shield size={18} className="text-[#008000] flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm text-[#17211B]">Public Profile</div>
                          <div className="text-xs text-[#66736A]">View your directory listing</div>
                        </div>
                      </Link>
                      <Link
                        to="/verify"
                        className="flex items-center gap-3 p-4 border border-[#E2E8E4] rounded-md hover:border-[#008000] hover:bg-green-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#008000]"
                      >
                        <CheckCircle size={18} className="text-[#008000] flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm text-[#17211B]">Verify Certificate</div>
                          <div className="text-xs text-[#66736A]">Check your certificate status</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
                  <h2 className="font-semibold text-[15px] text-[#17211B] mb-5 flex items-center gap-2">
                    <Building size={16} className="text-[#66736A]" />
                    Company Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Company Name', value: member.companyName },
                      { label: 'RC Number', value: member.rcNumber },
                      { label: 'NAHCON License', value: member.nahconLicense },
                      { label: 'Years in Operation', value: member.yearsInOperation ? `${member.yearsInOperation} years` : '—' },
                    ].map(row => (
                      <div key={row.label} className="border border-[#E2E8E4] rounded-md p-4 bg-[#F8FAF9]">
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">{row.label}</div>
                        <div className="text-sm font-medium text-[#17211B]">{row.value || '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
                  <h2 className="font-semibold text-[15px] text-[#17211B] mb-5 flex items-center gap-2">
                    <User size={16} className="text-[#66736A]" />
                    Principal Officer
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', value: member.principalOfficerName },
                      { label: 'Phone', value: member.principalOfficerPhone },
                      { label: 'Email', value: member.email },
                      { label: 'Position', value: member.principalOfficerPosition },
                    ].map(row => (
                      <div key={row.label} className={`border border-[#E2E8E4] rounded-md p-4 bg-[#F8FAF9] ${row.label === 'Email' ? 'sm:col-span-2' : ''}`}>
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">{row.label}</div>
                        <div className="text-sm font-medium text-[#17211B]">{row.value || '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
                  <h2 className="font-semibold text-[15px] text-[#17211B] mb-5 flex items-center gap-2">
                    <MapPin size={16} className="text-[#66736A]" />
                    Office Location
                  </h2>
                  <div className="border border-[#E2E8E4] rounded-md p-4 bg-[#F8FAF9]">
                    <div className="text-sm font-medium text-[#17211B]">{member.officeAddress}</div>
                    <div className="text-sm text-[#66736A] mt-1">{member.officeCity}, {member.officeState}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Certificate */}
            {activeTab === 'certificate' && isActive && (
              <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
                <h2 className="font-semibold text-[15px] text-[#17211B] mb-1 flex items-center gap-2">
                  <Award size={16} className="text-[#66736A]" />
                  Membership Certificate
                </h2>
                <p className="text-sm text-[#66736A] mb-6">
                  Official AHUON membership verification document with QR code.
                </p>

                {/* Certificate preview */}
                <div className="border border-[#E2E8E4] rounded-lg p-8 bg-[#F8FAF9] mb-6">
                  <div className="text-center max-w-sm mx-auto">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-4">
                      Association of Hajj and Umrah Operators of Nigeria
                    </div>
                    <div className="h-px bg-[#E2E8E4] mb-4" />
                    <div className="text-[13px] text-[#66736A] mb-2">This certifies that</div>
                    <div className="text-lg font-bold text-[#17211B] mb-4">{member.companyName}</div>
                    <div className="text-xs text-[#66736A] mb-1">
                      is a verified member in good standing of AHUON
                    </div>
                    <div className="text-xs text-[#66736A] mb-4">
                      Membership No: <span className="font-mono font-medium">{member.membershipNumber || 'AHUON-2026-XXXXX'}</span>
                    </div>
                    {member.membershipExpiryDate && (
                      <div className="text-xs text-[#66736A]">
                        Valid until: {new Date(member.membershipExpiryDate).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={generateCertificate}
                  disabled={isGeneratingCertificate}
                  className="flex items-center gap-2 bg-[#008000] text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#008000]"
                >
                  {isGeneratingCertificate ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={15} />
                      Download Certificate (PDF)
                    </>
                  )}
                </button>

                <div className="mt-5 text-xs text-[#66736A] space-y-1">
                  <p>The certificate includes a QR code for instant online verification.</p>
                  <p>You can re-download the certificate at any time while your membership is active.</p>
                </div>
              </div>
            )}

            {/* Payments */}
            {activeTab === 'payments' && (
              <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
                <h2 className="font-semibold text-[15px] text-[#17211B] mb-1 flex items-center gap-2">
                  <CreditCard size={16} className="text-[#66736A]" />
                  Payment History
                </h2>
                <p className="text-sm text-[#66736A] mb-6">
                  Membership fee payments and renewal records.
                </p>

                <div className="text-center py-12 border border-[#E2E8E4] rounded-md">
                  <Calendar size={32} className="text-[#66736A] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#17211B] mb-1">No payment records</p>
                  <p className="text-xs text-[#66736A] max-w-xs mx-auto">
                    Payment history will appear here once membership fees are processed through
                    the Paystack payment system.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
