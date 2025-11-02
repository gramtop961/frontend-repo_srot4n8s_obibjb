import { useEffect, useRef, useState } from 'react'
import { Search, PenTool, Palette, CheckCircle2 } from 'lucide-react'

function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return { ref, inView }
}

export default function ServicesFeatures() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeaderBlock />
        <Cards />
        <div id="about" className="mt-24" />
        <WhyUs />
      </div>
    </section>
  )
}

function HeaderBlock() {
  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Services</h2>
      <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
        Full-funnel growth services designed to attract, convert, and delight your customers.
      </p>
    </div>
  )
}

function Cards() {
  const services = [
    {
      title: 'SEO Services',
      icon: Search,
      desc: 'On-page SEO, Off-page SEO, Technical SEO, Keyword Research',
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      title: 'Content Writing',
      icon: PenTool,
      desc: 'Blog Writing, Website Copy, Social Media Content, Product Descriptions',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Web Design',
      icon: Palette,
      desc: 'Responsive Design, UI/UX, E-commerce, Landing Pages',
      gradient: 'from-indigo-500/20 to-blue-500/20',
    },
  ]

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map(({ title, icon: Icon, desc, gradient }, idx) => (
        <ServiceCard key={title} title={title} icon={<Icon className="text-blue-700" />} desc={desc} gradient={gradient} delay={idx * 100} />
      ))}
    </div>
  )
}

function ServiceCard({ title, icon, desc, gradient, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.3 })
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative rounded-2xl bg-white/70 backdrop-blur border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } hover:-translate-y-1`}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity`} />
      <div className="relative">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white grid place-items-center shadow-md mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-600">{desc}</p>
      </div>
    </div>
  )
}

function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  const features = [
    '5+ Years Experience',
    '200+ Projects Completed',
    '24/7 Customer Support',
    '100% Satisfaction Guarantee',
  ]

  return (
    <div ref={ref} id="about" className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
      <div className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } transition-all duration-700`}> 
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-70" />
        <div className="absolute inset-0 bg-grid-white/10" />
      </div>
      <div className={`${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
        <h3 className="text-2xl font-bold text-slate-900">Why Choose Us</h3>
        <p className="mt-3 text-slate-600">
          We blend data-driven strategy with stunning design to deliver measurable growth.
        </p>
        <ul className="mt-6 space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 mt-0.5" />
              <span className="text-slate-700">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
