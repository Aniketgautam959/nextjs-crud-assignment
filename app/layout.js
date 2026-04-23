import './globals.css'

export const metadata = {
  title: 'Users CRUD',
  description: 'Simple Next.js CRUD app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
