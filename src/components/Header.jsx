import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'About', href: 'about' },
  { label: 'Portfolio', href: 'portfolio' },
  { label: 'Contact', href: 'contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const handleNav = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-md" />
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">BlueFlame Digital</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="text-gray-700 hover:text-blue-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 shadow-lg shadow-blue-600/20 hover:shadow-purple-600/30 transition-transform hover:scale-[1.03]"
            >
              Get Free Consultation
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-800 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="w-full mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 shadow-lg"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
