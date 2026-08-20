import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error('Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('*')
        .eq('userId', data.user.id)
        .single();

      if (memberError) {
        toast.error('Could not load your account. Please contact support.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('ahuon_session', JSON.stringify(data.session));
      localStorage.setItem('ahuon_user', JSON.stringify(data.user));
      localStorage.setItem('ahuon_member', JSON.stringify(memberData));

      toast.success('Logged in successfully.');

      if (memberData.membershipStatus === 'pending') {
        navigate('/member-dashboard', { state: { status: 'pending' } });
      } else {
        navigate('/member-dashboard');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-[#003D1F] rounded-sm mb-4">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <h1 className="text-[22px] font-bold text-[#17211B] mb-1">Member Login</h1>
          <p className="text-sm text-[#66736A]">Sign in to access your AHUON dashboard</p>
        </div>

        {/* Info message from redirect */}
        {message && (
          <div className="mb-5 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-md p-4">
            <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">{message}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white border border-[#E2E8E4] rounded-lg p-7">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[#17211B] mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-[#E2E8E4] rounded-md px-3 py-2.5 text-sm text-[#17211B] placeholder:text-[#66736A] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-[#17211B] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-[#E2E8E4] rounded-md px-3 py-2.5 pr-10 text-sm text-[#17211B] placeholder:text-[#66736A] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66736A] hover:text-[#17211B] transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-[#66736A]">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8E4] text-[#008000] focus:ring-[#008000]" />
                Remember me
              </label>
              <a href="#" className="text-[#008000] hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#008000] text-white font-semibold text-sm py-2.5 rounded-md hover:bg-[#005A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#66736A] mt-5">
          Not yet a member?{' '}
          <Link to="/register" className="text-[#008000] font-semibold hover:underline">
            Apply for membership
          </Link>
        </p>
      </div>
    </div>
  );
}
