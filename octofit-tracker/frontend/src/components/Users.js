import React, { useEffect, useState } from 'react'
import { apiUrl } from '../config'

export default function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const endpoint = apiUrl('users')

  useEffect(() => {
    console.log('Fetching Users from', endpoint)
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Users fetched:', data)
        setItems(Array.isArray(data.results) ? data.results : data)
      })
      .catch((e) => console.error('Users fetch error', e))
      .finally(() => setLoading(false))
  }, [endpoint])

  if (loading) return <div>Loading users...</div>

  return (
    <div>
      <h2>Users</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
