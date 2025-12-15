import React from 'react'

export default function DetailModal({ show, onClose, title = 'Details', data }) {
  if (!show) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <pre className="detail-json">{JSON.stringify(data, null, 2)}</pre>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  )
}
