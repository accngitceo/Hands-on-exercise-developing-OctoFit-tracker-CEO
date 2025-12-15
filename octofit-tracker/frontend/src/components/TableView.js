import React from 'react'

function getColumns(items) {
  if (!items || items.length === 0) return []
  const first = items[0]
  return Object.keys(first).slice(0, 8)
}

export default function TableView({ items = [], onShowDetails }) {
  const columns = getColumns(items)

  return (
    <div className="table-wrap">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx}>
              {columns.map((c) => (
                <td key={c}>{String(it[c] ?? '')}</td>
              ))}
              <td>
                <button className="btn btn-sm btn-outline-primary" onClick={() => onShowDetails(it)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
