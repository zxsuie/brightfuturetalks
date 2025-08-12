import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image src="/photos/BFTLOGO.png" alt="Bright Future Talks Logo" width={24} height={24} className="h-6 w-6" />
      <span className="text-lg font-headline font-bold">
        Bright Future Talks
      </span>
    </div>
  );
}
