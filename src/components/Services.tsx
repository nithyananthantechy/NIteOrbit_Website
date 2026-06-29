import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

const SERVICES = [
  {
    num:'[01]', title:'GROUND STATION SOFTWARE',
    outcome:'Operational in 3–5 days. No scripts. No guesswork.',
    items:['OpenMCT and YAMCS deployment & configuration','Telemetry visualization customization','Historical & real-time data pipeline setup'],
    timeline:'3–5 DAYS',
    tag:'CORE INFRA',
  },
  {
    num:'[02]', title:'SPACE CYBERSECURITY',
    outcome:'Harden your TT&C links before regulators force you to.',
    items:['TT&C uplink/downlink security audits','CCSDS Telecommand authentication review','Penetration testing & threat modelling'],
    timeline:'1–2 WEEKS',
    tag:'SECURITY',
  },
  {
    num:'[03]', title:'SPACE INFRASTRUCTURE & DEVOPS',
    outcome:'Production-grade ops without a dedicated infra team.',
    items:['Containerized mission control deployments','Grafana + Prometheus monitoring stacks','CI/CD pipelines, automated health checks','Ongoing maintenance & on-call support'],
    timeline:'ONGOING',
    tag:'OPERATIONS',
  },
];

const rowV: Variants = {
  hidden:{ opacity:0, y:24 },
  visible:(i:number) => ({ opacity:1, y:0, transition:{ duration:0.5, delay:i*0.12, ease:'easeOut' } }),
};

export default function Services() {
  return (
    <section id="services" style={{ padding:'96px 24px', maxWidth:'1280px', margin:'0 auto' }}>

      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5 }}
        style={{ marginBottom:'16px' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                       color: ACCENT, letterSpacing:'0.12em' }}>
          &gt; WHAT WE DO
        </span>
      </motion.div>

      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.1 }}
        style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                 fontSize:'clamp(1.75rem,3vw,2.5rem)', color: PRIMARY, margin:'0 0 8px' }}>
        Three Ways We Protect Your Mission
      </motion.h2>

      <motion.p initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.15 }}
        style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color: MUTED,
                 maxWidth:'560px', lineHeight:1.7, margin:'0 0 48px' }}>
        Every service is delivered end-to-end by experienced ground systems engineers —
        not freelancers, not offshore teams.
      </motion.p>

      <div style={{ borderTop:`1px solid ${BORDER}` }}/>

      {SERVICES.map((s,i) => (
        <motion.div key={s.num} custom={i} variants={rowV}
          initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }}
          className="service-row"
          style={{ display:'flex', flexWrap:'wrap', gap:'16px',
                   padding:'32px 20px', borderBottom:`1px solid ${BORDER}` }}>

          {/* Number + tag */}
          <div style={{ flexShrink:0, width:'80px' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.8125rem',
                          color: ACCENT, letterSpacing:'0.08em', marginBottom:'8px' }}>
              {s.num}
            </div>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem',
                           color: DATA, letterSpacing:'0.12em',
                           border:`1px solid rgba(56,197,232,0.3)`,
                           padding:'2px 6px', display:'inline-block' }}>
              {s.tag}
            </span>
          </div>

          {/* Content */}
          <div style={{ flex:'1 1 200px' }}>
            <div style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1rem',
                          color: PRIMARY, marginBottom:'6px', letterSpacing:'0.04em' }}>
              {s.title}
            </div>
            {/* Outcome */}
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                          color: DATA, marginBottom:'14px', letterSpacing:'0.04em' }}>
              ✓ {s.outcome}
            </div>
            {s.items.map(it => (
              <div key={it} style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem',
                                     color: MUTED, lineHeight:1.85 }}>
                <span style={{ color: ACCENT }}>&gt; </span>{it}
              </div>
            ))}
          </div>

          {/* Timeline pill */}
          <div style={{ flexShrink:0, display:'flex', alignItems:'flex-start',
                        paddingTop:'4px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem',
                           color: MUTED, letterSpacing:'0.1em',
                           border:`1px solid ${BORDER}`, padding:'4px 10px',
                           whiteSpace:'nowrap' }}>
              ⏱ {s.timeline}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Starting from note */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
        viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
        style={{ marginTop:'24px', fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                 color: MUTED, letterSpacing:'0.08em', textAlign:'right' }}>
        <span style={{ color: ACCENT }}>&gt; </span>
        All services include NiteOrbit engineer support · Custom quotes based on mission scope
      </motion.div>
    </section>
  );
}
