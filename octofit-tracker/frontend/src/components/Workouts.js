import React, { useEffect, useState, useCallback } from 'react'
import { apiUrl } from '../config'

function RenderTable({ items, onView }) {
  if (!items || items.length === 0) return <div>No data available</div>
  const first = items[0]
  const columns = typeof first === 'object' && !Array.isArray(first) ? Object.keys(first) : ['value']
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            {columns.map((c) => <th key={c}>{c}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              {columns.map((c) => <td key={c}>{typeof it === 'object' ? String(it[c]) : String(it)}</td>)}
              <td><button className="btn btn-sm btn-outline-primary" onClick={() => onView(it)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

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

  const handleView = (it) => { setSelected(it); setModalOpen(true) }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Workouts</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={fetchData}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        {loading ? <div>Loading workouts...</div> : <RenderTable items={items} onView={handleView} />}
      </div>

      {modalOpen && (
        <>
          <div className="modal-backdrop-custom" onClick={() => setModalOpen(false)} />
          <div className="modal d-block modal-custom" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workout Details</h5>
                  <button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
                </div>
                <div className="modal-body"><pre>{JSON.stringify(selected, null, 2)}</pre></div>
                <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
