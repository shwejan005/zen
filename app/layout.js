import "./globals.css"

export const metadata = {
  title: "ZEN - Frequency Meditation",
  description: "Binaural beats and healing frequencies for meditation",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">{children}</body>
    </html>
  )
}
