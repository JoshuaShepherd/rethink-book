import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fluid Dark Elegance - Premium Business Solutions',
  description:
    'Sophisticated business solutions designed for executive excellence. Experience the pinnacle of digital craftsmanship with our premium dark elegance platform.',
  keywords:
    'premium business solutions, executive tools, enterprise software, sophisticated technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-inter antialiased bg-background text-text-primary overflow-x-hidden`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen">{children}</div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
