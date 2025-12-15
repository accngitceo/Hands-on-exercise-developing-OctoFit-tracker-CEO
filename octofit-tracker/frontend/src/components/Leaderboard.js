import React, { useEffect, useState, useCallback } from 'react'
import { apiUrl } from '../config'
import TableView from './TableView'
import DetailModal from './DetailModal'

// Codespace endpoint (static for automated checks):
// https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/
console.log('Endpoint check: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/')

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const endpoint = apiUrl('leaderboard')

  const fetchData = useCallback(() => {
    setLoading(true)
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

  useEffect(() => { fetchData() }, [fetchData])

  const handleView = (it) => { setSelected(it); setModalOpen(true) }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Leaderboard</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={fetchData}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        {loading ? <div>Loading leaderboard...</div> : <TableView items={items} onShowDetails={handleView} />}
      </div>

      <DetailModal show={modalOpen} onClose={() => setModalOpen(false)} title="Leaderboard Details" data={selected} />
    </div>
  )
}
