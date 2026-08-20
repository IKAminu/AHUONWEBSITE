import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search, CheckCircle, XCircle, AlertCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

type VerificationState = 'idle' | 'loading' | 'found' | 'not_found';

export function VerifyCertificate() {
  const [searchParams] = useSearchParams();
  const [membershipNumber, setMembershipNumber] = useState(searchParams.get('member') || '');
  const [state, setState] = useState<VerificationState>('idle');
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    const num = membershipNumber.trim();
    if (!num) {
      toast.error('Please enter a membership number.');
      return;
    }

    setState('loading');
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('members')
        .select('companyName, membershipNumber, membershipStatus, membershipStartDate, membershipExpiryDate, officeCity, officeState, servicesOffered, complaintCount, complaintResolvedCount')
        .eq('membershipNumber', num)
        .single();

      if (error || !data) {
        setState('not_found');
        return;
      }

      setState('found');
      setResult(data);
    } catch {
      toast.error('Verification failed. Please try again.');
      setState('idle');
    }
  };

  const isExpired = result?.membershipExpiryDate
    ? new Date(result.membershipExpiryDate) < new Date()
    : false;

  const verificationStatus = result
    ? result.membershipStatus === 'active' && !isExpired
      ? 'valid'
      : result.membershipStatus === 'active' && isExpired
      ? 'expired'
      : 'inactive'
    : null;

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12 px-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 border border-green-200 rounded-lg mb-4">
            <Shield size={22} className="text-[#008000]" />
          </div>
          <h1 className="text-2xl font-bold text-[#17211B] mb-2">Verify Membership Certificate</h1>
          <p className="text-sm text-[#66736A] max-w-lg mx-auto leading-relaxed">
            Confirm that an AHUON membership certificate is current and authentic before engaging any operator.
          </p>
        </div>

        {/* How to verify */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg p-5 mb-5">
          <h2 className="font-semibold text-sm text-[#17211B] mb-3">How to verify</h2>
          <ul className="space-y-2 text-sm text-[#66736A]">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-sm bg-[#003D1F] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="min-w-0">Enter the membership number printed on the certificate below.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-sm bg-[#003D1F] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="min-w-0">Alternatively, scan the QR code on the physical certificate with your phone camera.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-sm bg-[#003D1F] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="min-w-0">Results will confirm the member's name, status, and validity period.</span>
            </li>
          </ul>
        </div>

        {/* Search */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg p-6 mb-5">
          <label htmlFor="membership-number" className="block text-sm font-medium text-[#17211B] mb-2">
            Membership Number
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="membership-number"
              type="text"
              value={membershipNumber}
              onChange={(e) => setMembershipNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder="e.g. AHUON-2026-00001"
              className="min-w-0 flex-1 border border-[#E2E8E4] rounded-md px-3 py-2.5 text-sm font-mono text-[#17211B] placeholder:text-[#66736A] placeholder:font-sans focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none"
            />
            <button
              onClick={handleVerify}
              disabled={state === 'loading'}
              className="flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 bg-[#008000] text-white font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#008000]"
            >
              <Search size={15} />
              {state === 'loading' ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </div>

        {/* Not found */}
        {state === 'not_found' && (
          <div className="bg-white border border-[#E2E8E4] rounded-lg p-8 text-center">
            <XCircle size={32} className="text-red-600 mx-auto mb-3" />
            <h2 className="font-semibold text-[#17211B] mb-2">Not Found</h2>
            <p className="text-sm text-[#66736A] leading-relaxed break-words">
              No AHUON member was found with membership number{' '}
              <strong className="font-mono text-[#17211B] break-all">{membershipNumber}</strong>.
              Please check the number and try again, or contact AHUON directly.
            </p>
          </div>
        )}

        {/* Result */}
        {state === 'found' && result && (
          <div className="space-y-4">
            {/* Verification result */}
            <div className={`border rounded-lg p-6 ${
              verificationStatus === 'valid'
                ? 'bg-green-50 border-green-200'
                : verificationStatus === 'expired'
                ? 'bg-amber-50 border-amber-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {verificationStatus === 'valid' ? (
                  <CheckCircle size={22} className="text-green-700 flex-shrink-0 mt-0.5" />
                ) : verificationStatus === 'expired' ? (
                  <AlertCircle size={22} className="text-amber-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={22} className="text-red-700 flex-shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <div className={`font-bold text-[15px] mb-0.5 ${
                    verificationStatus === 'valid' ? 'text-green-900'
                    : verificationStatus === 'expired' ? 'text-amber-900'
                    : 'text-red-900'
                  }`}>
                    {verificationStatus === 'valid'
                      ? 'Certificate Verified — Active Member'
                      : verificationStatus === 'expired'
                      ? 'Certificate Expired'
                      : 'Membership Not Active'}
                  </div>
                  <div className={`text-sm ${
                    verificationStatus === 'valid' ? 'text-green-800'
                    : verificationStatus === 'expired' ? 'text-amber-800'
                    : 'text-red-800'
                  }`}>
                    {verificationStatus === 'valid'
                      ? 'This membership certificate is current and authentic.'
                      : verificationStatus === 'expired'
                      ? 'This membership has expired. Contact the operator to confirm renewal.'
                      : 'This membership is not currently active. Proceed with caution.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Member details */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-4">Member Record</h2>
              <div className="border border-[#E2E8E4] rounded-md divide-y divide-[#E2E8E4] text-sm overflow-hidden">
                {[
                  { label: 'Company Name', value: result.companyName },
                  { label: 'Membership Number', value: result.membershipNumber, mono: true },
                  { label: 'Status', value: result.membershipStatus ? result.membershipStatus.charAt(0).toUpperCase() + result.membershipStatus.slice(1) : '—' },
                  { label: 'Location', value: result.officeCity && result.officeState ? `${result.officeCity}, ${result.officeState}` : '—' },
                  {
                    label: 'Issue Date',
                    value: result.membershipStartDate
                      ? new Date(result.membershipStartDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
                      : '—'
                  },
                  {
                    label: 'Expiry Date',
                    value: result.membershipExpiryDate
                      ? new Date(result.membershipExpiryDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
                      : '—'
                  },
                ].map(row => (
                  <div key={row.label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:gap-0">
                    <span className="w-auto sm:w-36 text-[#66736A] flex-shrink-0">{row.label}</span>
                    <span className={`min-w-0 font-medium text-[#17211B] break-words ${row.mono ? 'font-mono break-all' : ''}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complaint info */}
            {result.complaintCount !== undefined && (
              <div className="bg-[#F8FAF9] border border-[#E2E8E4] rounded-lg p-5">
                <div className="text-sm text-[#66736A] break-words">
                  {result.complaintCount === 0
                    ? 'No complaints have been filed against this operator.'
                    : `${result.complaintCount} complaint${result.complaintCount > 1 ? 's' : ''} on record. ${result.complaintResolvedCount || 0} resolved.`}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
