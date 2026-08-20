import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

type Tab = 'pending' | 'complaints';

const COMPLAINT_STATUS_LABELS: Record<string, { label: string; class: string }> = {
  new: { label: 'Submitted', class: 'bg-blue-50 text-blue-800 border-blue-200' },
  investigating: { label: 'Under Review', class: 'bg-amber-50 text-amber-800 border-amber-200' },
  awaiting_member_response: { label: 'Awaiting Response', class: 'bg-orange-50 text-orange-800 border-orange-200' },
  resolved_internal: { label: 'Resolved', class: 'bg-green-50 text-green-800 border-green-200' },
  escalated_efcc: { label: 'Escalated — EFCC', class: 'bg-red-50 text-red-800 border-red-200' },
  closed_invalid: { label: 'Closed — Invalid', class: 'bg-gray-50 text-gray-700 border-gray-200' },
};

export function ExcoDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('pending');
  const [pendingMembers, setPendingMembers] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const session = localStorage.getItem('ahuon_session');
    if (!session) {
      toast.error('Please log in as an EXCO member to access this dashboard.');
      setIsLoading(false);
      return;
    }

    const { access_token } = JSON.parse(session);

    try {
      const [pendingRes, complaintsRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/exco/pending`, {
          headers: { 'Authorization': `Bearer ${access_token}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/exco/complaints`, {
          headers: { 'Authorization': `Bearer ${access_token}` },
        }),
      ]);

      const [pendingData, complaintsData] = await Promise.all([
        pendingRes.json(),
        complaintsRes.json(),
      ]);

      setPendingMembers(pendingData.pending || []);
      setComplaints(complaintsData.complaints || []);
    } catch {
      toast.error('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const approveMember = async (memberId: string) => {
    const session = localStorage.getItem('ahuon_session');
    if (!session) return;
    const { access_token } = JSON.parse(session);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/exco/approve/${memberId}`,
        { method: 'POST', headers: { 'Authorization': `Bearer ${access_token}` } }
      );
      const data = await response.json();
      if (data.success) {
        toast.success('Member approved.');
        fetchData();
      } else {
        toast.error(data.error || 'Failed to approve member.');
      }
    } catch {
      toast.error('Failed to approve member.');
    }
  };

  const updateComplaintStatus = async (reference: string, status: string, notes: string) => {
    const session = localStorage.getItem('ahuon_session');
    if (!session) return;
    const { access_token } = JSON.parse(session);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/exco/complaints/${reference}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
          body: JSON.stringify({ status, excoNotes: notes }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success('Complaint status updated.');
        fetchData();
      } else {
        toast.error('Failed to update complaint.');
      }
    } catch {
      toast.error('Failed to update complaint.');
    }
  };

  const openComplaints = complaints.filter(c =>
    ['new', 'investigating', 'awaiting_member_response'].includes(c.status)
  ).length;

  const formatCategory = (cat: string) =>
    cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Header */}
      <div className="bg-[#003D1F] text-white">
        <div className="max-w-[1280px] mx-auto px-6 py-6">
          <div className="text-sm text-white/60 mb-1">AHUON</div>
          <h1 className="text-xl font-bold text-white">EXCO Dashboard</h1>
          <p className="text-sm text-white/60 mt-0.5">Executive Committee Management Portal</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: 'Pending Applications',
              value: pendingMembers.length,
              icon: <Users size={20} className="text-[#008000]" />,
            },
            {
              label: 'Open Complaints',
              value: openComplaints,
              icon: <Clock size={20} className="text-amber-700" />,
            },
            {
              label: 'Total Complaints',
              value: complaints.length,
              icon: <FileText size={20} className="text-[#66736A]" />,
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#E2E8E4] rounded-lg px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[#66736A]">{stat.label}</div>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-[#17211B]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg overflow-hidden">
          <div className="flex border-b border-[#E2E8E4]">
            {([
              { id: 'pending' as Tab, label: `Pending Applications (${pendingMembers.length})` },
              { id: 'complaints' as Tab, label: `Complaints (${complaints.length})` },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3.5 text-sm font-medium transition-colors focus:outline-none ${
                  activeTab === tab.id
                    ? 'text-[#008000] border-b-2 border-[#008000]'
                    : 'text-[#66736A] hover:text-[#17211B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-2 border-[#008000] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-[#66736A]">Loading...</p>
              </div>
            ) : (
              <>
                {/* Pending Applications */}
                {activeTab === 'pending' && (
                  <div>
                    {pendingMembers.length === 0 ? (
                      <div className="text-center py-16">
                        <CheckCircle size={32} className="text-[#66736A] mx-auto mb-3" />
                        <p className="text-sm text-[#66736A]">No pending applications</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {pendingMembers.map((member) => (
                          <div
                            key={member.memberId}
                            className="border border-[#E2E8E4] rounded-lg p-5"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[15px] text-[#17211B] mb-0.5">
                                  {member.companyName}
                                </h3>
                                <div className="text-xs text-[#66736A] space-y-0.5">
                                  <div>NAHCON: {member.nahconLicense || '—'}</div>
                                  <div>Applied: {new Date(member.applicationDate).toLocaleDateString('en-NG')}</div>
                                  {member.officeCity && (
                                    <div>{member.officeCity}, {member.officeState}</div>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <button
                                  onClick={() => approveMember(member.memberId)}
                                  className="flex items-center gap-1.5 text-xs font-semibold bg-[#008000] text-white px-3 py-2 rounded-md hover:bg-[#005A2B] transition-colors"
                                >
                                  <CheckCircle size={13} />
                                  Approve
                                </button>
                                <button className="flex items-center gap-1.5 text-xs font-semibold bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors">
                                  <XCircle size={13} />
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Complaints */}
                {activeTab === 'complaints' && (
                  <div>
                    {complaints.length === 0 ? (
                      <div className="text-center py-16">
                        <AlertCircle size={32} className="text-[#66736A] mx-auto mb-3" />
                        <p className="text-sm text-[#66736A]">No complaints filed</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {complaints.map((complaint) => {
                          const statusInfo = COMPLAINT_STATUS_LABELS[complaint.status] || {
                            label: complaint.status,
                            class: 'bg-gray-50 text-gray-700 border-gray-200',
                          };
                          return (
                            <div key={complaint.complaintReference} className="border border-[#E2E8E4] rounded-lg p-5">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <div className="font-mono font-semibold text-sm text-[#17211B] mb-1">
                                    {complaint.complaintReference}
                                  </div>
                                  <div className="text-xs text-[#66736A] space-y-0.5">
                                    <div>Category: {formatCategory(complaint.complaintCategory || '')}</div>
                                    <div>Amount: ₦{parseInt(complaint.amountPaid || '0').toLocaleString()}</div>
                                    <div>Filed: {new Date(complaint.dateFiled).toLocaleDateString('en-NG')}</div>
                                  </div>
                                </div>
                                <span className={`text-[11px] font-semibold border px-2 py-1 rounded-sm flex-shrink-0 ${statusInfo.class}`}>
                                  {statusInfo.label}
                                </span>
                              </div>

                              {complaint.description && (
                                <div className="bg-[#F8FAF9] border border-[#E2E8E4] rounded-md p-3 mb-4">
                                  <p className="text-xs text-[#17211B] leading-relaxed line-clamp-3">
                                    {complaint.description}
                                  </p>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => updateComplaintStatus(complaint.complaintReference, 'investigating', 'Under review by EXCO')}
                                  className="text-xs font-medium border border-[#E2E8E4] text-[#17211B] px-3 py-1.5 rounded-md hover:bg-[#F8FAF9] transition-colors"
                                >
                                  Mark: Under Review
                                </button>
                                <button
                                  onClick={() => updateComplaintStatus(complaint.complaintReference, 'awaiting_member_response', 'Operator notified')}
                                  className="text-xs font-medium border border-[#E2E8E4] text-[#17211B] px-3 py-1.5 rounded-md hover:bg-[#F8FAF9] transition-colors"
                                >
                                  Notify Operator
                                </button>
                                <button
                                  onClick={() => updateComplaintStatus(complaint.complaintReference, 'resolved_internal', 'Resolved by EXCO')}
                                  className="text-xs font-medium bg-green-50 border border-green-200 text-green-800 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
                                >
                                  Mark: Resolved
                                </button>
                                <button
                                  onClick={() => updateComplaintStatus(complaint.complaintReference, 'escalated_efcc', 'Escalated to EFCC')}
                                  className="text-xs font-medium bg-red-50 border border-red-200 text-red-800 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors"
                                >
                                  Escalate to EFCC
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
