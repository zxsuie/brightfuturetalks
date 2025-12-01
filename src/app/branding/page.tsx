import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const colorPalette = [
  { name: 'Primary', cssVar: 'hsl(var(--primary))', description: 'Main brand color for buttons, links, and highlights.' },
  { name: 'Secondary', cssVar: 'hsl(var(--secondary))', description: 'Used for less prominent elements and accents.' },
  { name: 'Background', cssVar: 'hsl(var(--background))', description: 'The main background color of the site.' },
  { name: 'Foreground', cssVar: 'hsl(var(--foreground))', description: 'The primary text color.' },
  { name: 'Card', cssVar: 'hsl(var(--card))', description: 'Background color for card components.' },
  { name: 'Accent', cssVar: 'hsl(var(--accent))', description: 'Used for hover states and subtle backgrounds.' },
  { name: 'Muted', cssVar: 'hsl(var(--muted))', description: 'For muted text and decorative elements.' },
  { name: 'Destructive', cssVar: 'hsl(var(--destructive))', description: 'Indicates a destructive or dangerous action.' },
];

const LogoDisplay = ({ src, alt, width, height, darkBg = false }: { src: string, alt: string, width: number, height: number, darkBg?: boolean }) => (
  <div className={`flex flex-col items-center gap-4 rounded-lg border p-6 ${darkBg ? 'bg-neutral-800' : 'bg-white'}`}>
    <Image src={src} alt={alt} width={width} height={height} className="h-auto" style={{ width: `${width}px`, height: 'auto' }}/>
    <p className={`text-sm ${darkBg ? 'text-neutral-300' : 'text-neutral-600'}`}>{alt}</p>
  </div>
);

const ColorSwatch = ({ name, cssVar, description }: { name: string, cssVar: string, description: string }) => (
  <div className="flex flex-col">
    <div style={{ backgroundColor: cssVar }} className="h-24 w-full rounded-lg border shadow-inner"></div>
    <div className="mt-2">
      <p className="font-bold">{name}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function BrandingPage() {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block text-primary">Branding Kit</span>
            <span className="block">Bright Future Talks</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            Our official logos, colors, and typography to ensure brand consistency.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-24">
        <h2 className="font-headline text-3xl font-bold mb-8 text-center">Our Logos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <LogoDisplay src="/BFT TEXT HORIZONTAL RED LOGO.png" alt="Primary Horizontal Logo" width={240} height={40} />
          <LogoDisplay src="/BFTLOGO.png" alt="Mark Logo" width={200} height={32} />
          <LogoDisplay src="/bfticon.png" alt="Icon" width={80} height={80} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-24">
        <h2 className="font-headline text-3xl font-bold mb-8 text-center">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {colorPalette.map(color => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-24">
        <h2 className="font-headline text-3xl font-bold mb-8 text-center">Typography</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Fonts & Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <p className="text-sm uppercase text-primary font-semibold tracking-wider">Headline Font</p>
              <h3 className="font-headline text-4xl font-extrabold mt-2">Plus Jakarta Sans</h3>
              <p className="mt-4 text-lg font-headline">The quick brown fox jumps over the lazy dog.</p>
              <p className="mt-1 text-lg font-headline font-bold">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div>
              <p className="text-sm uppercase text-primary font-semibold tracking-wider">Body Font</p>
              <h3 className="font-body text-4xl font-semibold mt-2">Sora</h3>
              <p className="mt-4 text-lg font-body">The quick brown fox jumps over the lazy dog.</p>
              <p className="mt-1 text-lg font-body font-semibold">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
