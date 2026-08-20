import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Search, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const STATUS_CONFIG: Record<string, {
  label: string;
  icon: React.ReactNode;
  description: string;
  colorClass: string;
}> = {
  new: {
    label: 'Submitted',
    icon: <Clock size={16} />,
    description: 'Your complaint has been received and assigned a reference number. It is awaiting EXCO review.',
    colorClass: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  investigating: {
    label: 'Under Review',
    icon: <AlertCircle size={16} />,
    description: 'AHUON EXCO is reviewing the details of your complaint.',
    colorClass: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  awaiting_member_response: {
    label: 'Awaiting Operator Response',
    icon: <Clock size={16} />,
    description: 'The operator has been formally notified and has 5 working days to respond.',
    colorClass: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  resolved_internal: {
    label: 'Resolved',
    icon: <CheckCircle size={16} />,
    description: 'This complaint has been resolved through AHUON\'s internal process.',
    colorClass: 'bg-green-50 text-green-800 border-green-200',
  },
  escalated_efcc: {
    label: 'Escalated to EFCC',
    icon: <AlertCircle size={16} />,
    description: 'This case has been escalated to the Economic and Financial Crimes Commission.',
    colorClass: 'bg-red-50 text-red-800 border-red-200',
  },
  closed_invalid: {
    label: 'Closed — Invalid',
    icon: <XCircle size={16} />,
    description: 'This complaint was reviewed and closed as invalid.',
    colorClass: 'bg-gray-50 text-gray-700 border-gray-200',
  },
};

const PROCESS_STAGES = [
  { key: 'new', label: 'Submitted' },
  { key: 'investigating', label: 'Under Review' },
  { key: 'awaiting_member_response', label: 'Awaiting Response' },
  { key: 'resolved_internal', label: 'Resolved' },
];

const STAGE_ORDER = ['new', 'investigating', 'awaiting_member_response', 'resolved_internal'];

export function ComplaintStatus() {
  const location = useLocation();
  const initialReference = location.state?.complaintReference || '';
  const message = location.state?.message;

  const [reference, setReference] = useState(initialReference);
  const [complaint, setComplaint] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialReference) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    const ref = reference.trim();
    if (!ref) {
      toast.error('Please enter a complaint reference number.');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/complaints/${ref}`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();

      if (data.complaint) {
        setComplaint(data.complaint);
      } else {
        setComplaint(null);
        toast.error('No complaint found with that reference number.');
      }
    } catch {
      toast.error('Unable to retrieve complaint status. Please try again.');
      setComplaint(null);
    } finally {
      setIsLoading(false);
    }
  };

  const statusConfig = complaint ? (STATUS_CONFIG[complaint.status] || {
    label: 'Unknown',
    icon: <Clock size={16} />,
    description: 'Status is not available.',
    colorClass: 'bg-gray-50 text-gray-700 border-gray-200',
  }) : null;

  const currentStageIndex = complaint ? STAGE_ORDER.indexOf(complaint.status) : -1;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-NG', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

  const formatCategory = (cat: string) =>
    cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#17211B] mb-1">Track Complaint</h1>
          <p className="text-sm text-[#66736A]">
            Enter your reference number to check the status of your complaint.
          </p>
        </div>

        {/* Success message */}
        {message && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-md p-4 mb-5">
            <CheckCircle size={16} className="text-green-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-900">{message}</p>
          </div>
        )}

        {/* Search */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg p-6 mb-5">
          <label htmlFor="ref-input" className="block text-sm font-medium text-[#17211B] mb-2">
            Complaint Reference Number
          </label>
          <div className="flex gap-3">
            <input
              id="ref-input"
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. AHUON-2026-0001"
              className="flex-1 border border-[#E2E8E4] rounded-md px-3 py-2.5 text-sm text-[#17211B] placeholder:text-[#66736A] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#008000] text-white font-semibold text-sm px-4 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#008000]"
            >
              <Search size={15} />
              {isLoading ? 'Checking...' : 'Check Status'}
            </button>
          </div>
        </div>

        {/* Not found state */}
        {hasSearched && !complaint && !isLoading && (
          <div className="bg-white border border-[#E2E8E4] rounded-lg p-8 text-center">
            <p className="text-sm text-[#66736A]">
              No complaint found with reference <strong className="text-[#17211B]">{reference}</strong>.
              Please check the reference number and try again.
            </p>
          </div>
        )}

        {/* Result */}
        {complaint && statusConfig && (
          <div className="space-y-4">
            {/* Status card */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-1">
                    Reference
                  </div>
                  <div className="font-mono font-bold text-[#17211B] text-lg">
                    {complaint.complaintReference}
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-semibold border px-3 py-1.5 rounded-sm ${statusConfig.colorClass}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </span>
              </div>

              <p className="text-sm text-[#66736A] mb-6 leading-relaxed">
                {statusConfig.description}
              </p>

              {/* Progress tracker */}
              {!['escalated_efcc', 'closed_invalid'].includes(complaint.status) && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-3">
                    Resolution Progress
                  </div>
                  <div className="flex items-center gap-0">
                    {PROCESS_STAGES.map((stage, i) => {
                      const done = STAGE_ORDER.indexOf(stage.key) <= currentStageIndex;
                      const current = stage.key === complaint.status;
                      return (
                        <div key={stage.key} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold ${
                              done ? 'bg-[#008000] text-white' : 'bg-[#E2E8E4] text-[#66736A]'
                            }`}>
                              {done && !current ? <CheckCircle size={12} /> : i + 1}
                            </div>
                            <div className={`text-[10px] mt-1 text-center leading-tight max-w-[60px] ${
                              done ? 'text-[#17211B] font-medium' : 'text-[#66736A]'
                            }`}>
                              {stage.label}
                            </div>
                          </div>
                          {i < PROCESS_STAGES.length - 1 && (
                            <div className={`h-px flex-1 mb-4 mx-1 ${
                              STAGE_ORDER.indexOf(stage.key) < currentStageIndex ? 'bg-[#008000]' : 'bg-[#E2E8E4]'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-4">Complaint Details</h2>
              <div className="border border-[#E2E8E4] rounded-md divide-y divide-[#E2E8E4] text-sm">
                {[
                  { label: 'Category', value: formatCategory(complaint.complaintCategory || '') },
                  { label: 'Amount in Dispute', value: `₦${parseInt(complaint.amountPaid || '0').toLocaleString()}` },
                  { label: 'Incident Date', value: complaint.incidentDate ? new Date(complaint.incidentDate).toLocaleDateString('en-NG') : '—' },
                  { label: 'Package', value: complaint.packageDetails },
                  { label: 'Filed On', value: complaint.dateFiled ? formatDate(complaint.dateFiled) : '—' },
                ].map(row => (
                  <div key={row.label} className="flex px-4 py-3">
                    <span className="w-36 text-[#66736A] flex-shrink-0">{row.label}</span>
                    <span className="font-medium text-[#17211B]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008000] mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-[#17211B]">Complaint Filed</div>
                    <div className="text-xs text-[#66736A] mt-0.5">
                      {complaint.dateFiled ? formatDate(complaint.dateFiled) : '—'}
                    </div>
                  </div>
                </div>
                {complaint.lastUpdated && complaint.lastUpdated !== complaint.dateFiled && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-[#17211B]">Last Updated</div>
                      <div className="text-xs text-[#66736A] mt-0.5">{formatDate(complaint.lastUpdated)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#F8FAF9] border border-[#E2E8E4] rounded-lg p-5">
              <p className="text-sm text-[#66736A]">
                Questions about your complaint? Contact AHUON at{' '}
                <a href="mailto:complaints@ahuon.org.ng" className="text-[#008000] hover:underline font-medium">
                  complaints@ahuon.org.ng
                </a>
                . Provide your reference number in the subject line.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
