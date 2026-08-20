import { HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HelpTooltipProps {
  content: string;
}

export function HelpTooltip({ content }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setPosition(rect.top < 100 ? 'bottom' : 'top');
    }
  }, [isVisible]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[#008000] hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
        aria-label="Help information"
      >
        <HelpCircle size={18} aria-hidden="true" />
      </button>
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`absolute z-50 w-64 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg ${
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } left-1/2 transform -translate-x-1/2`}
        >
          {content}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 ${
              position === 'top' ? 'bottom-[-4px]' : 'top-[-4px]'
            }`}
            aria-hidden="true"
          ></div>
        </div>
      )}
    </div>
  );
}
