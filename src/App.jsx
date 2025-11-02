import Header from './components/Header'
import Hero from './components/Hero'
import ServicesFeatures from './components/ServicesFeatures'
import Engage from './components/Engage'

function App() {
  return (
    <div className="font-inter text-slate-800">
      <Header />
      <main>
        <Hero />
        <ServicesFeatures />
        <Engage />
      </main>
    </div>
  )
}

export default App
