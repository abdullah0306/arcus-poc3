import * as React from 'react'

import '@fontsource/lato/100.css'
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'

import { Metadata } from 'next'
import { cookies } from 'next/headers'

import { UserSettings } from '#lib/user-settings/user-settings'

import { Provider } from './provider'
import { Script } from './script'

export const metadata: Metadata = {
  title: {
    template: "%s | Arcus AI",
    default: "Arcus AI",
  },
  icons: {
    icon: '/favicons/favicon-32x32.png',
    apple: '/favicons/apple-touch-icon.png',
  },
}

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const colorMode = 'light' as const

  return (
    <html data-theme="light" style={{ colorScheme: 'light', fontFamily: 'Lato, sans-serif' }}>
      <body className={`chakra-ui-${colorMode}`}>
        <Script colorMode={colorMode} />
        <Provider initialColorMode={colorMode}>{children}</Provider>

        <UserSettings />
      </body>
    </html>
  )
}
