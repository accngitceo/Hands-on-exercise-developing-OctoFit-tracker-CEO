import React, { useEffect, useState } from 'react'
import { apiUrl } from '../config'

export default function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const endpoint = apiUrl('teams')

  useEffect(() => {
    console.log('Fetching Teams from', endpoint)
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Teams fetched:', data)
        setItems(Array.isArray(data.results) ? data.results : data)
      })
      .catch((e) => console.error('Teams fetch error', e))
      .finally(() => setLoading(false))
  }, [endpoint])

  if (loading) return <div>Loading teams...</div>

  return (
    <div>
      <h2>Teams</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
