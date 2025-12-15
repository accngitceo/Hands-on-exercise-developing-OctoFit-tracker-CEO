import React, { useEffect, useState } from 'react'
import { apiUrl } from '../config'

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const endpoint = apiUrl('activities')

  useEffect(() => {
    console.log('Fetching Activities from', endpoint)
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Activities fetched:', data)
        setItems(Array.isArray(data.results) ? data.results : data)
      })
      .catch((e) => console.error('Activities fetch error', e))
      .finally(() => setLoading(false))
  }, [endpoint])

  if (loading) return <div>Loading activities...</div>

  return (
    <div>
      <h2>Activities</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
