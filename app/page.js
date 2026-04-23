import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1>Simple Users CRUD</h1>
      <Link href="/users">Go to Users</Link>
    </main>
  )
}
