import { Mail, Phone } from 'lucide-react';

const ACCENT  = '#4F8FFF';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';
const PRIMARY = '#C4D4E8';

const LINKS = [
  { label:'Services',    href:'#services'  },
  { label:'Perigee',     href:'#perigee'   },
  { label:'Why Now',     href:'#why-now'   },
  { label:'Contact',     href:'#contact'   },
];

export default function Footer() {
  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' });
  };

  return (
    <footer style={{ borderTop:`1px solid ${BORDER}`, background:'#02080F' }}>

      {/* Upper footer */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'40px 24px',
                    display:'flex', flexWrap:'wrap', gap:'40px',
                    justifyContent:'space-between', alignItems:'flex-start' }}>

        {/* Brand */}
        <div style={{ flex:'1 1 200px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontWeight:700,
                        letterSpacing:'0.15em', fontSize:'0.9rem', marginBottom:'10px' }}>
            <span style={{ color: PRIMARY }}>NITE</span>
            <span style={{ color: ACCENT }}>ORBIT</span>
          </div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                        color: MUTED, letterSpacing:'0.1em', marginBottom:'16px' }}>
            GROUND SYSTEMS · TELEMETRY · CYBERSECURITY
          </div>
          <a href="mailto:nithyananthan@nskgroups.website"
            style={{ display:'flex', alignItems:'center', gap:'8px',
                     fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: MUTED,
                     textDecoration:'none', marginBottom:'8px', transition:'color 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color=ACCENT)}
            onMouseLeave={e=>(e.currentTarget.style.color=MUTED)}>
            <Mail size={11}/> nithyananthan@nskgroups.website
          </a>
          <a href="tel:+916385576354"
            style={{ display:'flex', alignItems:'center', gap:'8px',
                     fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: MUTED,
                     textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color=ACCENT)}
            onMouseLeave={e=>(e.currentTarget.style.color=MUTED)}>
            <Phone size={11}/> +91 63855 76354
          </a>
        </div>

        {/* Nav */}
        <div style={{ flex:'0 1 140px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                        color: MUTED, letterSpacing:'0.15em', marginBottom:'14px' }}>
            NAVIGATION
          </div>
          {LINKS.map(l => (
            <button key={l.label}
              onClick={() => go(l.href)}
              style={{ display:'block', background:'none', border:'none', cursor:'pointer',
                       fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: MUTED,
                       textAlign:'left', padding:'4px 0', letterSpacing:'0.06em',
                       transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color=ACCENT)}
              onMouseLeave={e=>(e.currentTarget.style.color=MUTED)}>
              &gt; {l.label}
            </button>
          ))}
        </div>

        {/* Services */}
        <div style={{ flex:'0 1 200px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                        color: MUTED, letterSpacing:'0.15em', marginBottom:'14px' }}>
            SERVICES
          </div>
          {['Ground Station Software','Space Cybersecurity','Infrastructure & DevOps','Perigee Platform'].map(s => (
            <div key={s} style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                                   color: MUTED, padding:'4px 0', letterSpacing:'0.04em' }}>
              &gt; {s}
            </div>
          ))}
        </div>

        {/* Status */}
        <div style={{ flex:'0 1 180px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                        color: MUTED, letterSpacing:'0.15em', marginBottom:'14px' }}>
            SYSTEM_STATUS
          </div>
          {[
            ['API', 'NOMINAL'],
            ['TELEMETRY', 'LIVE'],
            ['SECURITY', 'ACTIVE'],
            ['UPTIME', '99.9%'],
          ].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between',
                                   fontFamily:'var(--font-mono)', fontSize:'0.7rem',
                                   color: MUTED, padding:'4px 0',
                                   borderBottom:`1px solid ${BORDER}` }}>
              <span>{k}</span>
              <span style={{ color: ACCENT }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:`1px solid ${BORDER}`, padding:'14px 24px', textAlign:'center' }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.62rem,1.5vw,0.72rem)',
                    margin:0, color: MUTED, letterSpacing:'0.08em', lineHeight:1.8 }}>
          NITEORBIT_SYS // STATUS:{' '}
          <span style={{ color: ACCENT }}>OPERATIONAL</span>
          {' '}// © 2026 NiteOrbit // ALL SYSTEMS NOMINAL
        </p>
      </div>
    </footer>
  );
}
