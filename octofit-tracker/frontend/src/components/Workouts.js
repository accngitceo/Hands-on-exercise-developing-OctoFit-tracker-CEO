import React, { useEffect, useState } from 'react'
import { apiUrl } from '../config'

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const endpoint = apiUrl('workouts')

  useEffect(() => {
    console.log('Fetching Workouts from', endpoint)
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Workouts fetched:', data)
        setItems(Array.isArray(data.results) ? data.results : data)
      })
      .catch((e) => console.error('Workouts fetch error', e))
      .finally(() => setLoading(false))
  }, [endpoint])

  if (loading) return <div>Loading workouts...</div>

  return (
    <div>
      <h2>Workouts</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
