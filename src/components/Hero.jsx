import { useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import { ArrowDown, Rocket } from 'lucide-react'

export default function Hero() {
  useEffect(() => {
    // Entry fade-in
    document.body.classList.add('scroll-smooth')
  }, [])

  const onGetStarted = () => {
    const el = document.getElementById('services')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const onViewWork = () => {
    const el = document.getElementById('portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-[92vh] pt-24 overflow-hidden">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/rvFZ5oikmZSIbmGQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Gradient overlay to match brand - pointer-events-none per instruction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/60 to-purple-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur border border-white/20 shadow">
            <Rocket className="text-purple-300" size={18} />
            Award-winning Digital Marketing Agency
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-pulse">
            Transform Your Digital Presence
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/80">
            We help businesses grow with SEO, Content Writing & Web Design
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={onGetStarted} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 font-semibold shadow-lg shadow-blue-600/30 hover:shadow-purple-600/40 transition-transform hover:scale-[1.03]">
              Get Started
            </button>
            <button onClick={onViewWork} className="inline-flex items-center justify-center rounded-full border border-white/30 text-white px-6 py-3 font-semibold backdrop-blur hover:bg-white/10 transition-colors">
              View Our Work
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce text-white/80">
            <ArrowDown />
          </div>
        </div>
      </div>
    </section>
  )
}
