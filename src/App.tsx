import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Perigee from './components/Perigee';
import WhyNow from './components/WhyNow';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#05050A' }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Perigee />
        <WhyNow />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
