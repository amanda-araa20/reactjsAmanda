import React, { useEffect, useState } from 'react'

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api'
    : 'https://suitmedia-backend.suitdev.com/api'

function Banner() {
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    const fetchBannerImage = async () => {
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
        console.log('Banner data:', data)
        const item = data.data?.[0]
        console.log('Banner item:', item)
        if (item?.medium_image) {
          setBgImage(item.medium_image)
        }
      } catch (err) {
        console.error('Banner fetch error:', err)
      }
    }

    fetchBannerImage()

    const onScroll = () => {
      const offset = window.scrollY
      const el = document.querySelector('.parallax-img')
      if (el) {
        el.style.transform = `translateY(${offset * 0.4}px)`
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
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
