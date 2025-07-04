import React from "react";
import { ComingSoonBackground } from "@/components/coming-soon/ComingSoonBackground"; // Import the background
import { NotFoundContent } from "@/components/404Page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Page Not Found - Vizag Writers',
    description: 'The page you are looking for does not exist. Please check the URL or return to the homepage.',
    keywords: ['404', 'not found', 'Vizag Writers', 'page not found'],
    authors: [{ name: 'Vizag Writers' }],
    creator: 'Vizag Writers',
    publisher: 'Vizag Writers',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://vizagwriters.in/not-found',
        siteName: 'Vizag Writers',
        title: 'Page Not Found - Vizag Writers',
        description: 'The page you are looking for does not exist. Please check the URL or return to the homepage.',
        images: [
        {
            url: '/og-image.jpeg', // Add your custom 404 OG image
            width: 1200,
            height: 630,
            alt: 'Page Not Found - Vizag Writers',
        },
        ],
    },
    }

interface NotFoundPageProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
  homeUrl?: string;
}

export default function NotFoundPage({
  onGoHome,
  onGoBack,
  homeUrl = "/",
}: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ComingSoonBackground /> {/* Reuse the background component */}
      <NotFoundContent
        onGoHome={onGoHome}
        onGoBack={onGoBack}
        homeUrl={homeUrl}
      />
    </div>
  );
}