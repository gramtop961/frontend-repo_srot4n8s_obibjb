import { useEffect, useRef, useState } from 'react'
import { Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, options)
    obs.observe(node)
    return () => obs.disconnect()
  }, [options])
  return { ref, inView }
}

function useCountUp(target, start = 0, duration = 1500, active = false) {
  const [value, setValue] = useState(start)
  useEffect(() => {
    if (!active) return
    let startTime
    const step = (t) => {
      if (!startTime) startTime = t
      const p = Math.min((t - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.floor(start + (target - start) * eased))
      if (p < 1) requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, start, duration])
  return value
}

export default function Engage() {
  return (
    <section id="portfolio" className="relative">
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </section>
  )
}

function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3 })
  const counters = [
    { label: 'Happy Clients', end: 200, suffix: '+' },
    { label: 'Projects Delivered', end: 500, suffix: '+' },
    { label: 'Success Rate', end: 98, suffix: '%' },
    { label: 'Team Members', end: 50, suffix: '+' },
  ]

  return (
    <div ref={ref} className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((c, i) => (
            <StatCard key={c.label} {...c} active={inView} delay={i * 100} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, end, suffix = '', active, delay }) {
  const value = useCountUp(end, 0, 1500, active)
  return (
    <div style={{ transitionDelay: `${delay}ms` }} className={`rounded-2xl p-6 text-center border bg-white/70 backdrop-blur shadow-sm transition-all ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-4xl font-extrabold text-slate-900">
        {value}
        <span className="text-blue-600">{suffix}</span>
      </div>
      <div className="mt-2 text-slate-600">{label}</div>
    </div>
  )
}

function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const testimonials = [
    {
      name: 'Aisha Khan',
      company: 'Nova Retail',
      text: 'Their SEO and content strategy doubled our organic traffic in 4 months. Exceptional team and communication.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
      rating: 5,
    },
    {
      name: 'Michael Lee',
      company: 'BrightTech',
      text: 'Clean, fast website redesign and a clear growth plan. We saw immediate improvements in conversions.',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=300&auto=format&fit=crop',
      rating: 5,
    },
    {
      name: 'Sara Ahmed',
      company: 'PixelWare',
      text: 'Professional, creative, and results-driven. Highly recommended for any company looking to scale.',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop',
      rating: 5,
    },
  ]

  return (
    <div ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-extrabold text-slate-900 text-center">What Our Clients Say</h3>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} visible={inView} delay={i * 120} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ name, company, text, avatar, rating, visible, delay }) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-2xl p-6 bg-white/70 border backdrop-blur shadow-sm transition-all ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-slate-900">{name}</div>
          <div className="text-sm text-slate-600">{company}</div>
        </div>
      </div>
      <p className="mt-4 text-slate-700">“{text}”</p>
      <div className="mt-4 flex gap-1 text-yellow-400">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} fill="currentColor" className="" size={18} />
        ))}
      </div>
    </div>
  )
}

function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.service) e.service = 'Please select a service'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    alert('Thanks! We\'ll get back to you shortly.')
    setForm({ name: '', email: '', service: '', message: '' })
  }

  return (
    <div id="contact" ref={ref} className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-extrabold text-slate-900 text-center">Get In Touch</h3>
        <div className={`mt-10 grid lg:grid-cols-2 gap-8 ${inView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
          <form onSubmit={onSubmit} className="rounded-2xl bg-white/70 backdrop-blur border p-6 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow hover:shadow-sm ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow hover:shadow-sm ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Service</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className={`mt-1 w-full rounded-lg border px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow hover:shadow-sm ${errors.service ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select a service</option>
                  <option value="seo">SEO Services</option>
                  <option value="content">Content Writing</option>
                  <option value="web">Web Design</option>
                </select>
                {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow hover:shadow-sm ${errors.message ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>
            </div>
            <button type="submit" className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 font-semibold shadow-lg hover:scale-[1.03] transition-transform">Submit</button>
          </form>

          <div className="rounded-2xl bg-white/70 backdrop-blur border p-6 shadow-sm">
            <h4 className="text-xl font-semibold text-slate-900">Contact Information</h4>
            <p className="mt-2 text-slate-600">Reach us anytime. We typically respond within a few hours.</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3"><Mail className="text-blue-600" /><span>hello@blueflame.agency</span></li>
              <li className="flex items-center gap-3"><Phone className="text-blue-600" /><span>+1 (555) 012-3456</span></li>
              <li className="flex items-center gap-3"><MapPin className="text-blue-600" /><span>San Francisco, CA</span></li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="h-10 w-10 grid place-items-center rounded-full border hover:bg-blue-600 hover:text-white text-slate-700 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="h-10 w-10 grid place-items-center rounded-full border hover:bg-blue-400 hover:text-white text-slate-700 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="h-10 w-10 grid place-items-center rounded-full border hover:bg-blue-700 hover:text-white text-slate-700 transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="h-10 w-10 grid place-items-center rounded-full border hover:bg-pink-600 hover:text-white text-slate-700 transition-colors"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600" />
            <span className="font-bold text-white">BlueFlame Digital</span>
          </div>
          <p className="mt-3 text-sm text-slate-400">Modern marketing for ambitious brands. We craft growth systems powered by SEO, content, and design.</p>
        </div>
        <div>
          <div className="font-semibold text-white">Quick Links</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Newsletter</div>
          <p className="mt-2 text-sm text-slate-400">Join our newsletter to get marketing tips and case studies.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 rounded-lg bg-slate-900/60 border border-slate-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm text-white">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BlueFlame Digital. All rights reserved.
      </div>
    </footer>
  )
}
