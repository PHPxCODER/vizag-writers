import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Inter, Dancing_Script, Playfair_Display, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Define a CSS variable for Inter font
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the weights you need
  variable: "--font-dancing-script", // Define a CSS variable for Dancing Script font
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair", // Elegant serif font
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", // Modern sans-serif
});

export const metadata: Metadata = {
  title: "Vizag Writers - Coming Soon!",
  description: "Join Vizag Writers, an inclusive community of writers, poets, and storytellers. Something amazing is coming soon!",
  keywords: ["Vizag Writers", "writers community", "poetry", "storytelling", "Visakhapatnam", "creative writing", "authors", "literature"],
  authors: [{ name: "Vizag Writers" }],
  creator: "Vizag Writers",
  publisher: "Vizag Writers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vizagwriters.in'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vizagwriters.in',
    siteName: 'Vizag Writers',
    title: 'Vizag Writers - Coming Soon!',
    description: 'Join Vizag Writers, an inclusive community of writers, poets, and storytellers. Something amazing is coming soon!',
    images: [
      {
        url: '/og-image.jpeg', // Add your OG image to public folder
        width: 1200,
        height: 630,
        alt: 'Vizag Writers - Coming Soon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vizag Writers - Coming Soon!',
    description: 'Join Vizag Writers, an inclusive community of writers, poets, and storytellers. Something amazing is coming soon!',
    images: ['/og-image.jpeg'], // Same image as OG
    creator: '@vizagwriters', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vizag Writers",
              "url": "https://vizagwriters.in",
              "logo": "https://vizagwriters.in/logo.png",
              "description": "An inclusive community of writers, poets, and storytellers in Visakhapatnam",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "Andhra Pradesh",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://facebook.com/vizagwriters",
                "https://twitter.com/vizagwriters",
                "https://instagram.com/vizagwriters"
              ]
            })
          }}
        />
        
        {/* Event structured data for coming soon launch */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "Vizag Writers Platform Launch",
              "startDate": "2025-07-04T11:00:00+05:30",
              "endDate": "2025-07-04T12:00:00+05:30",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": "https://vizagwriters.in"
              },
              "organizer": {
                "@type": "Organization",
                "name": "Vizag Writers",
                "url": "https://vizagwriters.in"
              },
              "description": "Launch of the new Vizag Writers platform - a vibrant space for writers, poets, and storytellers"
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${playfairDisplay.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}