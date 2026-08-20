export function LoadingSpinner({ size = 'md', label = 'Loading...' }: { size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <div className={`animate-spin rounded-full border-b-2 border-[#008000] ${sizes[size]}`} aria-hidden="true"></div>
      <span className="text-[#666666]">{label}</span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
