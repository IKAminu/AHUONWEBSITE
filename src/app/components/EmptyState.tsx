import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="status" aria-live="polite">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-gray-400" size={40} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-[#333333] mb-2">{title}</h3>
      <p className="text-[#666666] mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-[#008000] text-white rounded-lg font-semibold hover:bg-[#004d00] transition-colors focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
