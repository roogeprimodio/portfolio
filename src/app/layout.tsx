import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Raleway:wght@400;500;700&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
