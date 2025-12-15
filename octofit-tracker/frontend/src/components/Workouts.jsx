import React, { useEffect, useState, useCallback } from 'react'
import { apiUrl } from '../config'
import TableView from './TableView.jsx'
import DetailModal from './DetailModal.jsx'

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const endpoint = apiUrl('workouts')

  const fetchData = useCallback(() => {
    setLoading(true)
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

  useEffect(() => { fetchData() }, [fetchData])

  const handleView = (it) => { console.log('Show Workout', it); setSelected(it); setModalOpen(true) }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Workouts</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={fetchData}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        {loading ? <div>Loading workouts...</div> : <TableView items={items} onShowDetails={handleView} />}
      </div>

      <DetailModal show={modalOpen} onClose={() => setModalOpen(false)} title="Workout Details" data={selected} />
    </div>
  )
}
