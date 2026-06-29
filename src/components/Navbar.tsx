import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NiteOrbitLogo } from './NiteOrbitLogo';

const NAV_LINKS = [
  { label: '[SERVICES]', href: '#services' },
  { label: '[PERIGEE]',  href: '#perigee'  },
  { label: '[WHY NOW]',  href: '#why-now'  },
  { label: '[CONTACT]',  href: '#contact'  },
];

export default function Navbar() {
  const [utcTime, setUtcTime]       = useState('');
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('');

  /* ── Live UTC clock ── */
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const pad = (v: number) => String(v).padStart(2, '0');
      setUtcTime(`${pad(n.getUTCHours())}:${pad(n.getUTCMinutes())}:${pad(n.getUTCSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Scroll-spy ── */
  useEffect(() => {
    const onScroll = () => {
      let cur = '';
      ['services','perigee','why-now','contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) cur = `#${id}`;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const BORDER = '#0B1F3A';
  const BG     = '#02080F';
  const ACCENT = '#4F8FFF';
  const MUTED  = '#445A73';
  const PRIMARY= '#C4D4E8';

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background: BG,
        borderBottom: `1px solid ${BORDER}`,
        height:'58px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 24px', gap:'16px',
      }}>
        {/* Logo */}
        <div style={{ flexShrink:0, cursor:'pointer' }} onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
          <NiteOrbitLogo height={36} />
        </div>

        {/* SYS status — desktop */}
        <div className="hidden-mobile" style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
          <div style={{ width:'1px', height:'20px', background: BORDER }} />
          {/* Pulsing status dot */}
          <span className="pulse-dot" style={{
            width:'7px', height:'7px', borderRadius:'50%',
            background: ACCENT, display:'inline-block', flexShrink:0,
          }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: MUTED, whiteSpace:'nowrap' }}>
            SYS: <span style={{ color: PRIMARY }}>ONLINE</span>
            &nbsp;&nbsp;
            <span style={{ color: ACCENT }}>UTC {utcTime}</span>
          </span>
        </div>

        <div style={{ flex:1 }} />

        {/* Nav links — desktop */}
        <div className="hidden-mobile" style={{ display:'flex', alignItems:'center', gap:'24px' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              className={`nav-link ${activeSection===l.href?'active':''}`}
              onClick={e=>{ e.preventDefault(); go(l.href); }}
            >{l.label}</a>
          ))}
        </div>

        {/* CTA button — desktop */}
        <button className="btn-outline-accent hidden-mobile"
          style={{ padding:'6px 14px', fontSize:'0.75rem', flexShrink:0 }}
          onClick={() => go('#contact')}>
          ▸ REQUEST_ACCESS
        </button>

        {/* Hamburger — mobile */}
        <button className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background:'none', border:'none', color: PRIMARY, cursor:'pointer', padding:'4px' }}
          aria-label="Toggle menu">
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position:'fixed', top:'58px', left:0, right:0, bottom:0,
          background: BG, zIndex:999,
          display:'flex', flexDirection:'column',
          alignItems:'flex-start', padding:'32px 24px', gap:0,
          borderTop:`1px solid ${BORDER}`,
        }}>
          <div style={{ marginBottom:'24px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: MUTED }}>
              SYS: <span style={{ color: PRIMARY }}>ONLINE</span>
              &nbsp;&nbsp;<span style={{ color: ACCENT }}>UTC {utcTime}</span>
            </span>
          </div>
          {NAV_LINKS.map((l, i) => (
            <a key={l.href} href={l.href}
              onClick={e=>{ e.preventDefault(); go(l.href); }}
              style={{
                fontFamily:'var(--font-mono)', fontSize:'1.1rem',
                color: PRIMARY, textDecoration:'none',
                padding:'16px 0', width:'100%',
                borderBottom:`1px solid ${BORDER}`, display:'block',
                transitionDelay:`${i*0.05}s`,
              }}>
              <span style={{ color: ACCENT, marginRight:'8px' }}>▸</span>
              {l.label}
            </a>
          ))}
          <button className="btn-accent"
            style={{ marginTop:'32px', padding:'12px 24px', fontSize:'0.875rem', width:'100%' }}
            onClick={() => go('#contact')}>
            ▸ REQUEST_ACCESS
          </button>
        </div>
      )}

      <style>{`
        @media (max-width:767px) {
          .hidden-mobile { display:none !important; }
          .show-mobile   { display:flex !important; }
        }
        @media (min-width:768px) {
          .hidden-mobile { display:flex !important; }
          .show-mobile   { display:none !important; }
        }
      `}</style>
    </>
  );
}
