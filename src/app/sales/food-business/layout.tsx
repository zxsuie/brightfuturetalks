import type { Metadata } from 'next';
import '../../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Script from 'next/script';

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
    <html lang="en">
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
        <Script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/UgxRfS/klaviyo.js?company_id=UgxRfS"
          strategy="beforeInteractive"
        />
        <Script
          id="klaviyo-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
            `,
          }}
        />
      </head>
      <body className={cn('bg-background font-body antialiased')}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

    