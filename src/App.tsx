import './index.css';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import TrustBar  from './components/TrustBar';
import Problem   from './components/Problem';
import Services  from './components/Services';
import HowItWorks from './components/HowItWorks';
import Perigee   from './components/Perigee';
import WhyNow    from './components/WhyNow';
import FAQ       from './components/FAQ';
import FinalCTA  from './components/FinalCTA';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#02080F]">
      <Navbar/>
      <main>
        {/* 1. Hook */}
        <Hero/>

        {/* 2. Credibility signal */}
        <TrustBar/>

        {/* 3. Pain points */}
        <Problem/>

        {/* 4. Solution */}
        <Services/>

        {/* 5. Process / trust builder */}
        <HowItWorks/>

        {/* 6. Product */}
        <Perigee/>

        {/* 7. Market evidence */}
        <WhyNow/>

        {/* 8. Objection handling */}
        <FAQ/>

        {/* 9. Final conversion push */}
        <FinalCTA/>

        {/* 10. Contact */}
        <Contact/>
      </main>
      <Footer/>
    </div>
  );
}
