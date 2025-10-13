import type { Metadata } from 'next';
import '../../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Extra Kita Sa Food Business - Bright Future Talks',
  description: 'Learn how to grow your food business and boost your income opportunities.',
};

export default function SalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
       <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('bg-background font-body antialiased')}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
