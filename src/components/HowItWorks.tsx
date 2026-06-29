import { motion } from 'framer-motion';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

const STEPS = [
  {
    num: '01',
    label: 'ASSESS',
    time: 'Day 1–2',
    headline: 'We Learn Your Mission',
    body: 'We map your satellite\'s data interfaces, protocol stack (TM/TC, CCSDS), operational requirements, and existing tooling. No generic questionnaires — we dive into your mission architecture with engineers who\'ve done it before.',
    items: [
      'Satellite interface mapping',
      'Security gap analysis',
      'Protocol & compliance review',
      'YAMCS telemetry schema design',
    ],
  },
  {
    num: '02',
    label: 'DEPLOY',
    time: 'Day 2–5',
    headline: 'We Build & Harden',
    body: 'We configure your full YAMCS + OpenMCT stack, instrument it with Grafana monitoring, and bake in authentication, HTTPS termination, and audit logging from day one. You get a production-ready system, not a demo.',
    items: [
      'YAMCS + OpenMCT configuration',
      'Auth, TLS, logging pre-installed',
      'Grafana + Prometheus stack',
      'Load-tested before handoff',
    ],
  },
  {
    num: '03',
    label: 'OPERATE',
    time: 'Ongoing',
    headline: 'We Stay With You',
    body: 'We don\'t hand off a repo and disappear. NiteOrbit engineers monitor your ground software, respond to incidents, push security patches, and evolve the stack with your mission — for every orbit, every year.',
    items: [
      '24/7 monitoring & alerting',
      'Security patch management',
      'Feature evolution & upgrades',
      'Incident response support',
    ],
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding:'96px 24px',
                      background:'rgba(5,14,28,0.5)',
                      borderTop:`1px solid ${BORDER}`,
                      borderBottom:`1px solid ${BORDER}` }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Label */}
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5 }}
          style={{ marginBottom:'16px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                         color: ACCENT, letterSpacing:'0.12em' }}>
            &gt; HOW IT WORKS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.1 }}
          style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                   fontSize:'clamp(1.75rem,3vw,2.5rem)', color: PRIMARY, margin:'0 0 12px' }}>
          Operational in 72 Hours, Not 12 Months
        </motion.h2>

        <motion.p initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.15 }}
          style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color: MUTED,
                   maxWidth:'560px', lineHeight:1.7, margin:'0 0 56px' }}>
          Our process is designed around your launch window — not our consulting schedule.
          Three phases. Clear deliverables. No surprises.
        </motion.p>

        {/* Steps */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'24px' }}>
          {STEPS.map((s, i) => (
            <motion.div key={s.num}
              initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:0.5, delay:i*0.15 }}
              style={{
                flex:'1 1 260px',
                border:`1px solid ${BORDER}`,
                background:'rgba(5,14,28,0.7)',
                padding:'28px 24px',
                position:'relative',
              }}
            >
              {/* Step number */}
              <div style={{ display:'flex', justifyContent:'space-between',
                            alignItems:'flex-start', marginBottom:'20px' }}>
                <span style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                               fontSize:'3.5rem', color:'rgba(79,143,255,0.12)',
                               lineHeight:1, userSelect:'none' }}>
                  {s.num}
                </span>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                                color: ACCENT, letterSpacing:'0.12em', marginBottom:'4px' }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem',
                                color: MUTED, letterSpacing:'0.1em',
                                border:`1px solid ${BORDER}`, padding:'2px 6px',
                                display:'inline-block' }}>
                    {s.time}
                  </div>
                </div>
              </div>

              {/* Accent line */}
              <div className="accent-line" style={{ marginBottom:'16px' }}/>

              {/* Headline */}
              <div style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                            fontSize:'1.0625rem', color: PRIMARY, marginBottom:'10px' }}>
                {s.headline}
              </div>

              {/* Body */}
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.875rem',
                          color: MUTED, lineHeight:1.75, margin:'0 0 18px' }}>
                {s.body}
              </p>

              {/* Items */}
              {s.items.map(it => (
                <div key={it} style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                                       color: MUTED, lineHeight:1.9 }}>
                  <span style={{ color: DATA }}>&gt; </span>{it}
                </div>
              ))}

              {/* Connector arrow (not on last) */}
              {i < STEPS.length-1 && (
                <div style={{ display:'none' }} className="step-arrow">→</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline strip */}
        <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-40px' }} transition={{ duration:0.5, delay:0.4 }}
          style={{ marginTop:'28px', padding:'16px 24px',
                   border:`1px solid ${BORDER}`,
                   display:'flex', flexWrap:'wrap', gap:'24px',
                   justifyContent:'space-between', alignItems:'center',
                   background:'rgba(79,143,255,0.03)' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                         color: MUTED, letterSpacing:'0.08em' }}>
            TOTAL DEPLOYMENT TIMELINE
          </span>
          <span style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                         fontSize:'1.5rem', color: DATA }}>
            72 Hours → Production-Ready
          </span>
          <button className="btn-outline-accent"
            style={{ padding:'8px 18px', fontSize:'0.75rem', letterSpacing:'0.06em' }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}>
            START THE PROCESS ▸
          </button>
        </motion.div>
      </div>
    </section>
  );
}
