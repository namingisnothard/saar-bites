import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saar Bites — 萨尔布吕肯收藏餐厅雷达',
  description: '把 Google Maps 收藏变成一张会看时间的萨尔布吕肯觅食清单。',
  openGraph: {
    title: 'SAAR BITES',
    description: 'Your saved food map · Saarbrücken',
    type: 'website',
    url: 'https://namingisnothard.github.io/saar-bites/',
    images: [{ url: 'https://namingisnothard.github.io/saar-bites/og.png', width: 1200, height: 630, alt: 'SAAR BITES — Saarbrücken food map' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAAR BITES',
    description: 'Your saved food map · Saarbrücken',
    images: ['https://namingisnothard.github.io/saar-bites/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
