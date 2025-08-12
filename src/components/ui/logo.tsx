import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img src="/photos/BFTLOGO.png" alt="Bright Future Talks Logo" className="h-6 w-6" />
      <span className="text-lg font-headline font-bold">
        Bright Future Talks
      </span>
    </div>
  );
}
