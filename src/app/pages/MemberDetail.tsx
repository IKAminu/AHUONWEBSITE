import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { MapPin, Phone, Mail, Shield, CheckCircle, ChevronLeft, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export function MemberDetail() {
  const { memberId } = useParams();
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]);

  const fetchMemberDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', memberId)
        .eq('membershipStatus', 'active')
        .single();

      if (error) throw error;
      setMember(data);
    } catch (error) {
      console.error('Error fetching member details:', error);
      setMember(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#008000] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#66736A]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <AlertCircle size={40} className="text-[#66736A] mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#17211B] mb-2">Member not found</h1>
          <p className="text-sm text-[#66736A] mb-6">
            This member profile could not be found. They may no longer be active.
          </p>
          <Link
            to="/directory"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#008000] hover:underline"
          >
            <ChevronLeft size={15} />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const services = Array.isArray(member.servicesOffered)
    ? member.servicesOffered
    : [member.servicesOffered].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8E4]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link to="/directory" className="text-[#66736A] hover:text-[#008000] transition-colors">
                  Directory
                </Link>
              </li>
              <li className="text-[#66736A]">/</li>
              <li className="text-[#17211B] font-medium truncate max-w-xs">
                {member.companyName}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main profile */}
          <div className="lg:col-span-2 space-y-5">
            {/* Identity */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h1 className="text-2xl font-bold text-[#17211B] mb-1.5">{member.companyName}</h1>
                  <div className="flex items-center gap-1.5 text-sm text-[#66736A]">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span>{member.officeCity}, {member.officeState}</span>
                  </div>
                </div>
                <span className="flex-shrink-0 text-[11px] font-semibold bg-[#F3E7B3] text-[#92731E] px-2.5 py-1 rounded-sm uppercase tracking-wide">
                  AHUON Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-[#E2E8E4]">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">
                    NAHCON License
                  </div>
                  <div className="font-mono text-sm font-medium text-[#17211B]">
                    {member.nahconLicense || '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">
                    Years in Operation
                  </div>
                  <div className="text-sm font-medium text-[#17211B]">
                    {member.yearsInOperation || '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">
                    Member Since
                  </div>
                  <div className="text-sm font-medium text-[#17211B]">
                    {member.membershipStartDate
                      ? new Date(member.membershipStartDate).getFullYear()
                      : '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-4">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {services.map((service: string) => (
                  <span
                    key={service}
                    className="bg-green-50 text-green-800 text-sm font-medium px-3 py-1 rounded-sm border border-green-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-4">Contact Information</h2>
              {!showContact ? (
                <div>
                  <p className="text-sm text-[#66736A] mb-4">
                    Reveal contact details to get in touch with this operator directly.
                  </p>
                  <button
                    onClick={() => setShowContact(true)}
                    className="text-sm font-semibold bg-[#008000] text-white px-4 py-2 rounded-md hover:bg-[#005A2B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008000]"
                  >
                    Show Contact Details
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {member.principalOfficerPhone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={15} className="text-[#66736A] flex-shrink-0" />
                      <a href={`tel:${member.principalOfficerPhone}`} className="text-[#17211B] hover:text-[#008000] transition-colors">
                        {member.principalOfficerPhone}
                      </a>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={15} className="text-[#66736A] flex-shrink-0" />
                      <a href={`mailto:${member.email}`} className="text-[#17211B] hover:text-[#008000] transition-colors">
                        {member.email}
                      </a>
                    </div>
                  )}
                  {member.officeAddress && (
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin size={15} className="text-[#66736A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#17211B]">{member.officeAddress}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Compliance */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-4">Compliance Record</h2>
              <div className="space-y-2.5">
                {[
                  'NAHCON Licensed & Verified',
                  'AHUON Member in Good Standing',
                  'CAC Registered',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle size={15} className="text-[#008000] flex-shrink-0" />
                    <span className="text-[#17211B]">{item}</span>
                  </div>
                ))}
                {member.complaintCount === 0 && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <CheckCircle size={15} className="text-[#008000] flex-shrink-0" />
                    <span className="text-[#17211B]">No unresolved complaints</span>
                  </div>
                )}
                {member.complaintCount > 0 && member.complaintResolvedCount === member.complaintCount && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <CheckCircle size={15} className="text-[#008000] flex-shrink-0" />
                    <span className="text-[#17211B]">
                      {member.complaintResolvedCount} complaint{member.complaintResolvedCount > 1 ? 's' : ''} — all resolved
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Verify certificate */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={15} className="text-[#008000]" />
                <h2 className="font-semibold text-[15px] text-[#17211B]">Verify Certificate</h2>
              </div>
              <p className="text-xs text-[#66736A] mb-4 leading-relaxed">
                Confirm this operator's membership status is current before making any payment.
              </p>
              <Link
                to={`/verify`}
                className="block text-center text-sm font-semibold border border-[#E2E8E4] text-[#17211B] px-4 py-2 rounded-md hover:bg-[#F8FAF9] transition-colors"
              >
                Verify Membership
              </Link>
            </div>

            {/* File complaint */}
            <div className="border border-[#E2E8E4] rounded-lg p-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-2">Report a Problem</h2>
              <p className="text-xs text-[#66736A] mb-4 leading-relaxed">
                If you have experienced an issue with this operator, you can file a formal
                complaint through AHUON's resolution process.
              </p>
              <Link
                to={`/file-complaint?operator=${memberId}`}
                className="block text-center text-sm font-semibold bg-[#17211B] text-white px-4 py-2 rounded-md hover:bg-[#2a3530] transition-colors"
              >
                File a Complaint
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
