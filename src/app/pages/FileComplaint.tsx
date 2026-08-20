import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const inputClass =
  'w-full border border-[#E2E8E4] rounded-md px-3 py-2.5 text-sm text-[#17211B] placeholder:text-[#66736A] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none';

const labelClass = 'block text-sm font-medium text-[#17211B] mb-1.5';

export function FileComplaint() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const operatorId = searchParams.get('operator');

  const [members, setMembers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    operatorMemberId: operatorId || '',
    pilgrimFullName: '',
    pilgrimPhone: '',
    pilgrimEmail: '',
    packageDetails: '',
    amountPaid: '',
    incidentDate: '',
    complaintCategory: '',
    description: '',
    confirmTruthful: false,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('id, companyName, officeCity, officeState')
        .eq('membershipStatus', 'active')
        .order('companyName', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const updateField = (field: string, value: any) =>
    setFormData({ ...formData, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.operatorMemberId) {
      toast.error('Please select the operator you are complaining about.');
      return;
    }
    if (!formData.confirmTruthful) {
      toast.error('Please confirm that your complaint is truthful before submitting.');
      return;
    }
    if (formData.description.length < 50) {
      toast.error('Please provide a more detailed description (minimum 50 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/complaints`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Complaint submitted. Keep your reference number safe.');
        navigate('/complaint-status', {
          state: {
            complaintReference: data.complaintReference,
            message: 'Your complaint has been filed. Reference: ' + data.complaintReference,
          },
        });
      } else {
        toast.error(data.error || 'Failed to file complaint. Please try again.');
      }
    } catch {
      toast.error('Unable to submit your complaint. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#17211B] mb-1">File a Complaint</h1>
          <p className="text-sm text-[#66736A]">
            Report a formal dispute with an AHUON member operator.
          </p>
        </div>

        {/* Important notice */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
          <AlertTriangle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <strong className="block mb-0.5">Important:</strong>
            Filing a false complaint is a serious offence. All submissions are reviewed by
            AHUON EXCO, and unfounded complaints may be referred to the EFCC.
            Ensure all information you provide is accurate.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-[#E2E8E4] rounded-lg divide-y divide-[#E2E8E4]">
            {/* Operator */}
            <div className="px-7 py-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-5">Operator</h2>
              <div>
                <label htmlFor="operator-select" className={labelClass}>
                  Select Operator <span className="text-red-600">*</span>
                </label>
                <select
                  id="operator-select"
                  value={formData.operatorMemberId}
                  onChange={(e) => updateField('operatorMemberId', e.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Select the operator you are complaining about</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.companyName} — {member.officeCity}, {member.officeState}
                    </option>
                  ))}
                </select>
                {members.length === 0 && (
                  <p className="text-xs text-[#66736A] mt-2">
                    Loading operator list...
                  </p>
                )}
              </div>
            </div>

            {/* Complainant */}
            <div className="px-7 py-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-5">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pilgrimFullName}
                    onChange={(e) => updateField('pilgrimFullName', e.target.value)}
                    required
                    className={inputClass}
                    placeholder="Your full legal name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.pilgrimPhone}
                      onChange={(e) => updateField('pilgrimPhone', e.target.value)}
                      required
                      className={inputClass}
                      placeholder="080XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.pilgrimEmail}
                      onChange={(e) => updateField('pilgrimEmail', e.target.value)}
                      required
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Package details */}
            <div className="px-7 py-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-5">Package & Transaction</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Package Description <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.packageDetails}
                    onChange={(e) => updateField('packageDetails', e.target.value)}
                    required
                    className={inputClass}
                    placeholder="e.g. Hajj 2026 Standard Package"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Amount Paid (₦) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.amountPaid}
                      onChange={(e) => updateField('amountPaid', e.target.value)}
                      required
                      min="0"
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Date of Incident <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => updateField('incidentDate', e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Complaint details */}
            <div className="px-7 py-6">
              <h2 className="font-semibold text-[15px] text-[#17211B] mb-5">Complaint Details</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.complaintCategory}
                    onChange={(e) => updateField('complaintCategory', e.target.value)}
                    required
                    className={inputClass}
                  >
                    <option value="">Select a category</option>
                    <option value="visa_promise">Visa Promise Not Fulfilled</option>
                    <option value="ticketing_fraud">Ticketing Fraud</option>
                    <option value="accommodation_undelivered">Accommodation Not as Promised</option>
                    <option value="refund_refusal">Refund Not Processed</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Detailed Description <span className="text-red-600">*</span>
                    <span className="font-normal text-[#66736A] ml-1">(minimum 50 characters)</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    required
                    rows={5}
                    minLength={50}
                    className={inputClass}
                    placeholder="Describe the issue in detail — what happened, when, and what outcome you are seeking."
                  />
                  <p className="text-xs text-[#66736A] mt-1.5">
                    {formData.description.length} characters
                    {formData.description.length < 50 && ` — ${50 - formData.description.length} more needed`}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation & submit */}
            <div className="px-7 py-6">
              <div className="border border-[#E2E8E4] rounded-md p-4 mb-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.confirmTruthful}
                    onChange={(e) => updateField('confirmTruthful', e.target.checked)}
                    className="w-4 h-4 rounded border-[#E2E8E4] text-[#008000] focus:ring-[#008000] mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-[#17211B] leading-relaxed">
                    I confirm that this complaint is truthful to the best of my knowledge.
                    I understand that filing a false complaint is a serious offence.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#008000] text-white font-semibold text-sm py-3 rounded-md hover:bg-[#005A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
