'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        if (!res.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await res.json()
        setUser(data)
        setName(data.name || '')
        setEmail(data.email || '')
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      getUser()
    }
  }, [userId])

  async function handleUpdate(e) {
    e.preventDefault()
    if (!user) return

    const oldUser = user
    const updatedUser = { ...user, name, email }
    setUser(updatedUser)
    setShowForm(false)
    setUpdating(true)
    setError('')

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      })

      if (!res.ok) {
        throw new Error('Failed to update user')
      }
    } catch (err) {
      setUser(oldUser)
      setName(oldUser.name || '')
      setEmail(oldUser.email || '')
      setError(err.message || 'Something went wrong')
    } finally {
      setUpdating(false)
    }
  }

  async function handleDelete() {
    if (!user) return

    setIsDeleted(true)
    setUser(null)
    setDeleting(true)
    setError('')

    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE'
      })
    } catch (err) {
      console.log(err)
    }

    setTimeout(() => {
      router.push(`/users?deletedId=${userId}`)
    }, 500)
  }

  if (loading) {
    return <p>Loading user...</p>
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
        <Link href="/users">Back to users</Link>
      </main>
    )
  }

  if (isDeleted) {
    return <p>Deleting user...</p>
  }

  if (!user) {
    return (
      <main>
        <p>User not found</p>
        <Link href="/users">Back to users</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <button onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? 'Cancel' : 'Update'}
      </button>

      <button onClick={handleDelete} disabled={deleting} style={{ marginLeft: '8px' }}>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>

      {showForm && (
        <form onSubmit={handleUpdate} style={{ marginTop: '16px' }}>
          <div>
            <label>Name</label>
            <br />
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label>Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={updating} style={{ marginTop: '12px' }}>
            {updating ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}

      <div style={{ marginTop: '16px' }}>
        <Link href="/users">Back to users</Link>
      </div>
    </main>
  )
}
