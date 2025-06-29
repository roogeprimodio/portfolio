
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Cinzel, Raleway, Source_Code_Pro, Cormorant_Garamond, Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/lib/portfolio-data';

const fontBodyDark = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-dark',
});

const fontHeadlineDark = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline-dark',
});

const fontBodyLight = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-body-light',
});

const fontHeadlineLight = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-headline-light',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-code',
});

const eyeIconDataUri = "data:image/svg+xml,%3csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M 10 50 Q 50 10 90 50' stroke='currentColor' stroke-width='10' fill='none' stroke-linecap='round' /%3e%3cpath d='M 10 50 Q 50 90 90 50' stroke='currentColor' stroke-width='10' fill='none' stroke-linecap='round' /%3e%3ccircle cx='50' cy='50' r='15' fill='currentColor' /%3e%3c/svg%3e";

export const metadata: Metadata = {
  metadataBase: new URL(portfolioData.personalInfo.url),
  title: `${portfolioData.personalInfo.name} // Portfolio`,
  description: portfolioData.personalInfo.tagline,
  keywords: portfolioData.personalInfo.keywords,
  authors: [{ name: portfolioData.personalInfo.name, url: portfolioData.personalInfo.url }],
  creator: portfolioData.personalInfo.name,
  icons: {
    icon: eyeIconDataUri,
    apple: eyeIconDataUri,
    shortcut: eyeIconDataUri,
  },
  verification: {
    google: "zFm9XI6LPoXU1xmmALCKwSWJZKJ-xe1Ed1KupSwRwAM",
  },
  openGraph: {
    title: `${portfolioData.personalInfo.name} // Portfolio`,
    description: portfolioData.personalInfo.tagline,
    url: portfolioData.personalInfo.url,
    siteName: `${portfolioData.personalInfo.name}'s Portfolio`,
    images: [
      {
        url: portfolioData.personalInfo.profileImage, // Relative path, resolved by metadataBase
        width: 800,
        height: 800,
        alt: portfolioData.personalInfo.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.personalInfo.name} // Portfolio`,
    description: portfolioData.personalInfo.tagline,
    images: [portfolioData.personalInfo.profileImage], // Relative path
    creator: '@jagdishodedara0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { name, alternateNames, url, profileImage, jobTitle } = portfolioData.personalInfo;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    alternateName: alternateNames,
    url: url,
    image: `${url}${profileImage}`,
    jobTitle: jobTitle,
    sameAs: portfolioData.socialLinks.map(link => link.href),
  };

  return (
    <html 
      lang="en" 
      className={cn(
        fontCode.variable,
        fontBodyDark.variable,
        fontHeadlineDark.variable,
        fontBodyLight.variable,
        fontHeadlineLight.variable
      )} 
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false} // Enable for view transitions
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
