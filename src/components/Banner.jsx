import React, { useEffect, useState } from 'react'

function Banner() {
  const [bgUrl, setBgUrl] = useState(null)

  useEffect(() => {
    const API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : 'https://suitmedia-backend.suitdev.com/api'
    const fetchBannerImage = async () => {
  try {
    const res = await fetch('https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=1&append[]=medium_image&sort=-published_at', {
      headers: {
        Accept: 'application/json',
      },
    })
    const data = await res.json()

    // 👉 Tambahkan ini
    console.log('Banner data:', data)
console.log('Banner item:', data.data[0])

    const imageUrl = data?.data?.[0]?.medium_image
    setBgUrl(imageUrl || null)
  } catch (err) {
    console.error('Banner fetch error:', err)
  }
}

    fetchBannerImage()

    const onScroll = () => {
      const offset = window.scrollY
      const parallax = document.querySelector('.parallax-img')
      if (parallax) {
        parallax.style.transform = `translateY(${offset * 0.4}px)`
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="banner">
      <div
        className="parallax-img"
        style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : 'none',
        }}
      />
      <div className="banner-text">
        <h1>Ideas</h1>
        <p>Where all our great things begin</p>
      </div>
    </section>
  )
}

export default Banner
