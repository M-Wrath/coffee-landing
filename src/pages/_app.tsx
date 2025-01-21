import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';
import { CartProvider } from '@/context/CartContext';

// Font imports
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/500.css';
import '@fontsource/source-sans-3/600.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <CartProvider>
      <Head>
        <title>Mocha & Co. | Artisan Coffee Experience</title>
        <meta name="description" content="Experience the perfect brew at Mocha & Co. Artisanal coffee crafted with passion and served with love." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#3C2A21" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mocha & Co. | Artisan Coffee Experience" />
        <meta property="og:description" content="Experience the perfect brew at Mocha & Co. Artisanal coffee crafted with passion and served with love." />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <AnimatePresence mode='wait'>
        <Layout key={router.route}>
          <Component {...pageProps} />
          <Toaster 
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#3C2A21',
                color: '#fff',
                borderRadius: '999px',
              },
              duration: 3000,
            }}
          />
        </Layout>
      </AnimatePresence>
    </CartProvider>
  );
}


