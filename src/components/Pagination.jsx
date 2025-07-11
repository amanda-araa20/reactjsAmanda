// src/components/Pagination.jsx
import React from 'react'

function Pagination({ meta, setPage, currentPage }) {
  const totalPages = meta.pageCount || 1
  const pages = []

  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, start + 4)
  if (end - start < 4) start = Math.max(1, end - 4)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      {pages.map(num => (
        <button
          key={num}
          className={num === currentPage ? 'active' : ''}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}
    </div>
  )
}

export default Pagination
