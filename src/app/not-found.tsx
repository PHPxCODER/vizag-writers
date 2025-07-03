import React from 'react'
import { Metadata } from 'next'
import NotFoundDemo from '@/components/404Page'

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

function NotFound() {
  return (
    <NotFoundDemo />
  )
}

export default NotFound