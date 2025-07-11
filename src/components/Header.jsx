import React, { useEffect } from 'react'

function Header() {
  useEffect(() => {
    let lastScroll = 0
    const header = document.querySelector('header')

    const onScroll = () => {
      const currentScroll = window.pageYOffset
      if (currentScroll > lastScroll) {
        header.style.top = '-100px'
      } else {
        header.style.top = '0'
      }
      lastScroll = currentScroll
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, width: '100%', background: 'orange',
      backdropFilter: 'blur(8px)', transition: 'top 0.3s', zIndex: 10
    }}>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px 20px' }}>
        <a href="#">Work</a>
        <a href="#">About</a>
        <a href="#">Service</a>
        <a href="#" className="active">Ideas</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  )
}

export default Header
