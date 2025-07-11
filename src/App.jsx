import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import PostList from './components/PostList'
import Pagination from './components/Pagination'

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api'
    : 'https://suitmedia-backend.suitdev.com/api'

function App() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState('-published_at')
  const [meta, setMeta] = useState({})

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/ideas?page[number]=${page}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      const data = await res.json()
      console.log('Post data:', data)
      console.log('Post items:', data.data)
      setPosts(data.data || [])
      setMeta(data.meta || {})
    } catch (err) {
      console.error('Post fetch error:', err)
      setPosts([])
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [page, pageSize, sort])

  return (
    <div>
      <Header />
      <Banner />
      <div className="controls">
        <label>
          Show per page:
          <select value={pageSize} onChange={e => setPageSize(+e.target.value)}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </label>
      </div>
      <PostList posts={posts} />
      <Pagination meta={meta} setPage={setPage} currentPage={page} />
    </div>
  )
}

export default App
