import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Routinely — Ta routine sur mesure par IA',
  description: 'Génère une routine personnalisée selon tes objectifs, ton niveau et ton emploi du temps. Sport, productivité, bien-être.',
  keywords: 'routine personnalisée, habitudes, sport, productivité, bien-être, IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
