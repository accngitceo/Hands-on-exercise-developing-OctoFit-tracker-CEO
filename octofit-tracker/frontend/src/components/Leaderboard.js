import React, { useEffect, useState } from 'react'
import { apiUrl } from '../config'

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const endpoint = apiUrl('leaderboard')

  useEffect(() => {
    console.log('Fetching Leaderboard from', endpoint)
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Leaderboard fetched:', data)
        setItems(Array.isArray(data.results) ? data.results : data)
      })
      .catch((e) => console.error('Leaderboard fetch error', e))
      .finally(() => setLoading(false))
  }, [endpoint])

  if (loading) return <div>Loading leaderboard...</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
