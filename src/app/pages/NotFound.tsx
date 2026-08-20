import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <div className="text-[80px] font-bold text-[#E2E8E4] leading-none mb-6">404</div>
        <h1 className="text-2xl font-bold text-[#17211B] mb-3">Page Not Found</h1>
        <p className="text-[15px] text-[#66736A] mb-8 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#008000] text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#005A2B] transition-colors"
          >
            Go to Home
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/directory"
            className="inline-flex items-center justify-center text-sm font-semibold border border-[#E2E8E4] text-[#17211B] px-5 py-2.5 rounded-md hover:bg-white transition-colors"
          >
            Browse Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
