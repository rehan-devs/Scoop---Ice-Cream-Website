import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import '../styles/globals.css';
import ScrollToTop from '../components/layout/ScrollToTop';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://scoop.shop'),
  title: {
    default: 'SCOÖP — Handcrafted Artisan Ice Cream',
    template: '%s | SCOÖP',
  },
  description:
    'Small-batch artisan ice cream crafted from locally sourced ingredients in Portland, OR. Every scoop tells a story.',
  keywords: [
    'ice cream',
    'artisan',
    'handcrafted',
    'Portland',
    'gelato',
    'dessert',
    'small batch',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scoop.shop',
    siteName: 'SCOÖP',
    title: 'SCOÖP — Handcrafted Artisan Ice Cream',
    description:
      'Small-batch artisan ice cream crafted from locally sourced ingredients. Every scoop tells a story.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SCOÖP — Handcrafted Artisan Ice Cream',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCOÖP — Handcrafted Artisan Ice Cream',
    description:
      'Small-batch artisan ice cream crafted from locally sourced ingredients.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍦</text></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'IceCreamShop',
    name: 'SCOÖP',
    description: 'Small-batch artisan ice cream crafted from locally sourced ingredients.',
    url: 'https://scoop.shop',
    telephone: '(503) 555-0142',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '142 Main Street',
      addressLocality: 'Portland',
      addressRegion: 'OR',
      postalCode: '97204',
      addressCountry: 'US',
    },
    openingHours: ['Mo-Th 12:00-22:00', 'Fr-Su 11:00-23:00'],
    priceRange: '$$',
    servesCuisine: 'Ice Cream, Desserts',
    hasMenu: 'https://scoop.shop/menu',
  };

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-cream text-chocolate">
        <ScrollToTop />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}