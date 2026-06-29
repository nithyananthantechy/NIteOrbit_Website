import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

function useCounter(target: number, dur: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const step = target / (dur / 16);
    const id = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(id); }
      else setN(Math.floor(v));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, dur]);
  return n;
}

const STATS = [
  {
    value: 73, suffix: '%', label: 'SECURITY_GAP',
    desc: 'of small satellite teams build ground software without dedicated security review',
    source: 'Industry survey',
  },
  {
    value: 500, suffix: 'K+', prefix: '$', label: 'BUILD_COST',
    desc: 'average cost to build an in-house ground station software team from scratch',
    source: 'Analyst estimate',
  },
  {
    value: 72, suffix: 'H', label: 'DEPLOY_TIME',
    desc: 'NiteOrbit deployment time from kickoff to production-ready ground station',
    source: 'NiteOrbit benchmark',
  },
  {
    value: 300, suffix: '+', label: 'MARKET_2024',
    desc: 'small satellites launched in 2024 alone — each needing ground software support',
    source: 'SpaceWorks 2024 Report',
  },
];

export default function WhyNow() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-100px' });

  const c0 = useCounter(STATS[0].value, 1400, inView);
  const c1 = useCounter(STATS[1].value, 1200, inView);
  const c2 = useCounter(STATS[2].value, 900,  inView);
  const c3 = useCounter(STATS[3].value, 1600, inView);
  const counts = [c0, c1, c2, c3];

  return (
    <section id="why-now" style={{ padding:'96px 24px' }}>
      <div ref={ref} style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Label */}
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5 }}
          style={{ marginBottom:'16px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                         color: ACCENT, letterSpacing:'0.12em' }}>
            &gt; WHY NITEORBIT // WHY NOW
          </span>
        </motion.div>

        <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.1 }}
          style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                   fontSize:'clamp(1.75rem,3vw,2.5rem)', color: PRIMARY, margin:'0 0 48px' }}>
          The Numbers Don't Lie
        </motion.h2>

        {/* 4-stat grid */}
        <div style={{ display:'grid',
                      gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',
                      gap:'1px', border:`1px solid ${BORDER}`,
                      marginBottom:'56px', overflow:'hidden' }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:0.5, delay:i*0.12 }}
              style={{ padding:'36px 28px',
                       background:'rgba(5,14,28,0.8)',
                       borderRight: i<3 ? `1px solid ${BORDER}` : 'none' }}
            >
              <div style={{ marginBottom:'8px' }}>
                <span style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                               fontSize:'clamp(2.5rem,4vw,3.5rem)',
                               color: i===2 ? DATA : PRIMARY, lineHeight:1 }}>
                  {s.prefix || ''}{counts[i]}{s.suffix}
                </span>
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                            color: ACCENT, letterSpacing:'0.15em', marginBottom:'12px' }}>
                {s.label}
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem',
                          color: MUTED, lineHeight:1.65, margin:'0 0 12px' }}>
                {s.desc}
              </p>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem',
                             color: MUTED, letterSpacing:'0.1em',
                             opacity:0.6 }}>
                SOURCE: {s.source}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Text section */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'48px', alignItems:'flex-start' }}>
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.6 }}
            style={{ flex:'1 1 280px' }}>
            <div style={{ width:'40px', height:'1px', background: ACCENT, marginBottom:'20px' }}/>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'1.0625rem',
                        color: MUTED, lineHeight:1.8, margin:0, maxWidth:'520px' }}>
              <span style={{ color: PRIMARY }}>
                The space industry is moving faster than the software supporting it.
              </span>{' '}
              Small satellite teams are launching into orbit while their ground station
              software is held together with bash scripts and hope. NiteOrbit exists to
              close that gap — bringing production-grade ground systems engineering to
              the teams that need it most, before the first anomaly.
            </p>
          </motion.div>

          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.6, delay:0.1 }}
            style={{ flex:'0 1 320px',
                     border:`1px solid ${BORDER}`,
                     background:'rgba(5,14,28,0.7)',
                     padding:'24px' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem',
                          color: MUTED, letterSpacing:'0.12em', marginBottom:'12px' }}>
              MARKET CONTEXT
            </div>
            {[
              'Commercial space market growing at 9.4% CAGR',
              '500+ small sat operators worldwide in 2025',
              'New ITU cybersecurity guidelines active from 2024',
              'SpaceWorks forecasts 2,800+ nano/microsats by 2030',
            ].map(item => (
              <div key={item} style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                                       color: MUTED, lineHeight:2 }}>
                <span style={{ color: ACCENT }}>&gt; </span>
                <span style={{ color: PRIMARY }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
