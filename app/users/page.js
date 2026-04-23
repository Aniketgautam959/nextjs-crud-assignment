'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
          throw new Error('Failed to fetch users')
        }
        const params = new URLSearchParams(window.location.search)
        const deletedId = params.get('deletedId')
        let data = await res.json()
        if (deletedId) {
          data = data.filter((item) => String(item.id) !== String(deletedId))
        }
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  if (loading) {
    return <p>Loading users...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '12px' }}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <Link href={`/users/${user.id}`}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
