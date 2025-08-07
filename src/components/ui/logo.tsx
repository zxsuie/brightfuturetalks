import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <MessageCircle className="h-6 w-6 text-primary" />
      <span className="text-lg font-headline font-bold">
        Bright Future Talks
      </span>
    </div>
  );
}
