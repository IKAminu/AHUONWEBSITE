import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

const STEPS = [
  { number: 1, label: 'Company' },
  { number: 2, label: 'Officer' },
  { number: 3, label: 'References' },
  { number: 4, label: 'Banking' },
  { number: 5, label: 'Review' },
];

const inputClass =
  'w-full border border-[#E2E8E4] rounded-md px-3 py-2.5 text-sm text-[#17211B] placeholder:text-[#66736A] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none';

const labelClass = 'block text-sm font-medium text-[#17211B] mb-1.5';

export function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    rcNumber: '',
    nahconLicense: '',
    yearsInOperation: '',
    officeAddress: '',
    officeCity: '',
    officeState: '',
    servicesOffered: [] as string[],
    principalOfficerName: '',
    principalOfficerPhone: '',
    principalOfficerPosition: '',
    email: '',
    password: '',
    confirmPassword: '',
    referee1Name: '',
    referee1MembershipNo: '',
    referee2Name: '',
    referee2MembershipNo: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
    termsAccepted: false,
  });

  const updateField = (field: string, value: any) =>
    setFormData({ ...formData, [field]: value });

  const handleServiceToggle = (service: string) => {
    const services = formData.servicesOffered.includes(service)
      ? formData.servicesOffered.filter(s => s !== service)
      : [...formData.servicesOffered, service];
    updateField('servicesOffered', services);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.companyName || !formData.rcNumber || !formData.nahconLicense ||
          !formData.yearsInOperation || !formData.officeAddress || !formData.officeCity ||
          !formData.officeState || formData.servicesOffered.length === 0) {
          toast.error('Please complete all required fields.');
          return false;
        }
        return true;
      case 2:
        if (!formData.principalOfficerName || !formData.principalOfficerPhone ||
          !formData.principalOfficerPosition || !formData.email ||
          !formData.password || !formData.confirmPassword) {
          toast.error('Please complete all required fields.');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match.');
          return false;
        }
        if (formData.password.length < 8) {
          toast.error('Password must be at least 8 characters.');
          return false;
        }
        return true;
      case 3:
        if (!formData.referee1Name || !formData.referee1MembershipNo ||
          !formData.referee2Name || !formData.referee2MembershipNo) {
          toast.error('Please provide both referee details.');
          return false;
        }
        return true;
      case 4:
        if (!formData.bankName || !formData.accountNumber || !formData.accountName) {
          toast.error('Please complete all banking fields.');
          return false;
        }
        if (formData.accountNumber.length !== 10) {
          toast.error('Account number must be 10 digits.');
          return false;
        }
        return true;
      case 5:
        if (!formData.termsAccepted) {
          toast.error('Please accept the terms and conditions.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(s => s + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(s => s - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/register`,
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
        toast.success('Application submitted successfully.');
        navigate('/login', {
          state: { message: 'Your application has been submitted and is under review. You will be notified once approved.' }
        });
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#17211B] mb-1">Membership Application</h1>
          <p className="text-sm text-[#66736A]">
            Apply to join the Association of Hajj and Umrah Operators of Nigeria.
          </p>
        </div>

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold transition-colors ${
                      currentStep > step.number
                        ? 'bg-[#008000] text-white'
                        : currentStep === step.number
                        ? 'bg-[#003D1F] text-white'
                        : 'bg-[#E2E8E4] text-[#66736A]'
                    }`}
                    aria-current={currentStep === step.number ? 'step' : undefined}
                  >
                    {currentStep > step.number ? <Check size={14} /> : `0${step.number}`}
                  </div>
                  <div className={`text-[10px] mt-1.5 font-medium hidden sm:block transition-colors ${
                    currentStep >= step.number ? 'text-[#17211B]' : 'text-[#66736A]'
                  }`}>
                    {step.label}
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-px flex-1 mx-2 transition-colors ${
                    currentStep > step.number ? 'bg-[#008000]' : 'bg-[#E2E8E4]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg">
          <div className="border-b border-[#E2E8E4] px-7 py-5">
            <h2 className="font-semibold text-[17px] text-[#17211B]">
              {STEPS[currentStep - 1].label === 'Officer' ? 'Principal Officer' : STEPS[currentStep - 1].label}
              {currentStep < 5 ? ' Information' : ' & Submit'}
            </h2>
          </div>

          <div className="px-7 py-6 space-y-5">
            {/* Step 1: Company */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className={labelClass}>
                    Company Registered Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className={inputClass}
                    placeholder="Enter company name as registered with CAC"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      RC Number (CAC) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rcNumber}
                      onChange={(e) => updateField('rcNumber', e.target.value)}
                      className={inputClass}
                      placeholder="RC-XXXXXX"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      NAHCON License Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nahconLicense}
                      onChange={(e) => updateField('nahconLicense', e.target.value)}
                      className={inputClass}
                      placeholder="Enter NAHCON license"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Years in Hajj/Umrah Operation <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.yearsInOperation}
                    onChange={(e) => updateField('yearsInOperation', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select years</option>
                    <option value="1-5">1–5 years</option>
                    <option value="5-10">5–10 years</option>
                    <option value="10-15">10–15 years</option>
                    <option value="15+">15+ years</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Office Address <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.officeAddress}
                    onChange={(e) => updateField('officeAddress', e.target.value)}
                    rows={2}
                    className={inputClass}
                    placeholder="Full office address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      City <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.officeCity}
                      onChange={(e) => updateField('officeCity', e.target.value)}
                      className={inputClass}
                      placeholder="Office city"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      State <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.officeState}
                      onChange={(e) => updateField('officeState', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Services Offered <span className="text-red-600">*</span>
                  </label>
                  <div className="flex flex-col gap-2.5">
                    {['Hajj', 'Umrah', 'Both'].map((service) => (
                      <label key={service} className="flex items-center gap-3 cursor-pointer text-sm text-[#17211B]">
                        <input
                          type="checkbox"
                          checked={formData.servicesOffered.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 rounded border-[#E2E8E4] text-[#008000] focus:ring-[#008000]"
                        />
                        {service === 'Hajj' ? 'Hajj Only' : service === 'Umrah' ? 'Umrah Only' : 'Both Hajj and Umrah'}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Principal Officer */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.principalOfficerName}
                    onChange={(e) => updateField('principalOfficerName', e.target.value)}
                    className={inputClass}
                    placeholder="Full legal name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.principalOfficerPhone}
                      onChange={(e) => updateField('principalOfficerPhone', e.target.value)}
                      className={inputClass}
                      placeholder="080XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Position in Company <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.principalOfficerPosition}
                      onChange={(e) => updateField('principalOfficerPosition', e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Managing Director"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Email Address <span className="text-red-600">*</span>
                    <span className="font-normal text-[#66736A] ml-1">(used for login)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={inputClass}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className={inputClass}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Confirm Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className={inputClass}
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: References */}
            {currentStep === 3 && (
              <>
                <div className="bg-[#F8FAF9] border border-[#E2E8E4] rounded-md p-4 text-sm text-[#66736A]">
                  You must provide two existing AHUON members in good standing as referees.
                </div>

                {[1, 2].map((n) => (
                  <div key={n} className="border border-[#E2E8E4] rounded-md p-5">
                    <h3 className="text-sm font-semibold text-[#17211B] mb-4">Referee {n}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass}>
                          Company Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={n === 1 ? formData.referee1Name : formData.referee2Name}
                          onChange={(e) => updateField(n === 1 ? 'referee1Name' : 'referee2Name', e.target.value)}
                          className={inputClass}
                          placeholder="Referee's company name"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          AHUON Membership Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={n === 1 ? formData.referee1MembershipNo : formData.referee2MembershipNo}
                          onChange={(e) => updateField(n === 1 ? 'referee1MembershipNo' : 'referee2MembershipNo', e.target.value)}
                          className={inputClass}
                          placeholder="AHUON-YYYY-XXXXX"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Step 4: Banking */}
            {currentStep === 4 && (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-900">
                  Banking information is used for membership fee processing and is kept confidential.
                  It will not be shown on your public member profile.
                </div>

                <div>
                  <label className={labelClass}>
                    Bank Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => updateField('bankName', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Zenith Bank"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Account Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => updateField('accountNumber', e.target.value)}
                      maxLength={10}
                      className={inputClass}
                      placeholder="10-digit account number"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Account Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.accountName}
                      onChange={(e) => updateField('accountName', e.target.value)}
                      className={inputClass}
                      placeholder="Account holder name"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#66736A] uppercase tracking-widest">Application Summary</h3>
                  <div className="border border-[#E2E8E4] rounded-md divide-y divide-[#E2E8E4] text-sm">
                    {[
                      { label: 'Company', value: formData.companyName },
                      { label: 'Location', value: `${formData.officeCity}, ${formData.officeState}` },
                      { label: 'RC Number', value: formData.rcNumber },
                      { label: 'NAHCON License', value: formData.nahconLicense },
                      { label: 'Principal Officer', value: formData.principalOfficerName },
                      { label: 'Email', value: formData.email },
                      { label: 'Services', value: formData.servicesOffered.join(', ') },
                      { label: 'Years in Operation', value: formData.yearsInOperation },
                    ].map(row => (
                      <div key={row.label} className="flex px-4 py-3">
                        <span className="w-40 text-[#66736A] flex-shrink-0">{row.label}</span>
                        <span className="font-medium text-[#17211B]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-[#E2E8E4] rounded-md p-4 bg-[#F8FAF9]">
                  <div className="text-sm font-semibold text-[#17211B] mb-1">
                    Registration Fee: ₦20,000
                  </div>
                  <div className="text-xs text-[#66736A]">
                    Payment will be processed after EXCO approval of your application.
                  </div>
                </div>

                <div className="border border-[#E2E8E4] rounded-md p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => updateField('termsAccepted', e.target.checked)}
                      className="w-4 h-4 rounded border-[#E2E8E4] text-[#008000] focus:ring-[#008000] mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-[#17211B] leading-relaxed">
                      I confirm that all information provided is accurate. I agree to abide by the
                      AHUON constitution, professional standards, and all applicable regulations.
                    </span>
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="border-t border-[#E2E8E4] px-7 py-5 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-sm font-medium text-[#66736A] hover:text-[#17211B] transition-colors focus:outline-none"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 text-sm font-semibold bg-[#008000] text-white px-5 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2"
              >
                Continue
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 text-sm font-semibold bg-[#008000] text-white px-6 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
