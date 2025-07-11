import React from 'react'

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p style={{ padding: '20px' }}>No posts found.</p>
  }

  return (
    <section className="post-list">
      {posts.map(post => (
        <div className="card" key={post.id}>
          <img
            src={post.small_image}
            alt="thumbnail"
            loading="lazy"
          />
          <div className="card-title">{post.title}</div>
        </div>
      ))}
    </section>
  )
}

export default PostList
