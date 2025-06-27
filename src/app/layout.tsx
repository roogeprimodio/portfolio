import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Cinzel, Raleway, Source_Code_Pro } from 'next/font/google';

const fontBody = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const fontHeadline = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-code',
});

const eyeIconDataUri = "data:image/svg+xml,%3csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M 10 50 Q 50 10 90 50' stroke='white' stroke-width='10' fill='none' stroke-linecap='round' /%3e%3cpath d='M 10 50 Q 50 90 90 50' stroke='white' stroke-width='10' fill='none' stroke-linecap='round' /%3e%3ccircle cx='50' cy='50' r='15' fill='white' /%3e%3c/svg%3e";

export const metadata: Metadata = {
  title: 'JAGDISH ODEDARA // Portfolio',
  description: 'Digital Craftsman & Code Poet',
  icons: {
    icon: eyeIconDataUri,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontHeadline.variable} ${fontCode.variable}`} suppressHydrationWarning>
      <head />
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
