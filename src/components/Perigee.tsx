import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ACCENT  = '#4F8FFF';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

function makePath(w:number, h:number, seed:number, amp:number) {
  return Array.from({ length:51 }, (_,i) => {
    const x = (i/50)*w;
    const y = h*0.5
      + Math.sin((i/50)*Math.PI*3+seed)*amp
      + Math.sin((i/50)*Math.PI*7+seed*2)*amp*0.4;
    return `${i===0?'M':'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}

const FEATURES = [
  'Real-time and historical telemetry',
  'Pre-hardened security layer (auth, HTTPS, logging)',
  'YAMCS-compatible satellite data integration',
  'Deployed and supported by NiteOrbit engineers',
];

export default function Perigee() {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(chartRef, { once:true, margin:'-100px' });

  const p1 = makePath(560, 120, 1.2, 22);
  const p2 = makePath(560, 120, 2.8, 14);
  const p3 = makePath(560, 120, 0.5,  8);

  return (
    <section id="perigee" style={{
      padding:'96px 24px',
      background:'rgba(5,14,28,0.5)',
      borderTop:`1px solid ${BORDER}`,
      borderBottom:`1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Label */}
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5 }}
          style={{ marginBottom:'12px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: ACCENT, letterSpacing:'0.12em' }}>
            &gt; OUR FIRST PRODUCT
          </span>
        </motion.div>

        {/* Product name */}
        <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.1 }}
          style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                   fontSize:'clamp(2.5rem,5vw,4rem)', color: PRIMARY, margin:'0 0 8px' }}>
          Perigee
        </motion.h2>

        <motion.p initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.2 }}
          style={{ fontFamily:'var(--font-body)', fontSize:'1.0625rem',
                   color: MUTED, fontStyle:'italic', margin:'0 0 40px' }}>
          Mission control, ready on day one.
        </motion.p>

        {/* Console panel */}
        <motion.div ref={chartRef}
          initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.6, delay:0.25 }}
          className="telemetry-panel" style={{ marginBottom:'40px', overflow:'hidden' }}>

          {/* Panel top bar */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px',
                        padding:'10px 16px', borderBottom:`1px solid ${BORDER}` }}>
            <span style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#4A2020', display:'inline-block' }}/>
            <span style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#3A3520', display:'inline-block' }}/>
            <span style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#1A3020', display:'inline-block' }}/>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: MUTED,
                           letterSpacing:'0.1em', marginLeft:'8px' }}>
              PERIGEE_CONSOLE v1.0
            </span>
            <div style={{ marginLeft:'auto' }}>
              <span className="rec-blink" style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color: ACCENT }}>
                ■ LIVE
              </span>
            </div>
          </div>

          {/* Chart */}
          <div style={{ padding:'20px 16px' }}>
            <div style={{ display:'flex', gap:'16px', marginBottom:'8px' }}>
              {[['ALT_STREAM', ACCENT],['VEL_STREAM', PRIMARY],['SIGNAL', MUTED]].map(([lbl,col]) => (
                <span key={lbl} style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                                         color: col as string, letterSpacing:'0.06em' }}>
                  ─ {lbl}
                </span>
              ))}
            </div>
            <svg width="100%" viewBox="0 0 560 120" style={{ display:'block', overflow:'visible' }}>
              {[0,30,60,90,120].map(y => (
                <line key={y} x1="0" y1={y} x2="560" y2={y} stroke={BORDER} strokeWidth="0.5"/>
              ))}
              <motion.path d={p3} fill="none" stroke={MUTED}  strokeWidth="1" strokeOpacity="0.5"
                initial={{ pathLength:0 }} animate={inView?{ pathLength:1 }:{ pathLength:0 }}
                transition={{ duration:1.8, delay:0.4, ease:'easeInOut' }}/>
              <motion.path d={p2} fill="none" stroke={PRIMARY} strokeWidth="1.2" strokeOpacity="0.6"
                initial={{ pathLength:0 }} animate={inView?{ pathLength:1 }:{ pathLength:0 }}
                transition={{ duration:1.6, delay:0.2, ease:'easeInOut' }}/>
              <motion.path d={p1} fill="none" stroke={ACCENT}  strokeWidth="2"
                initial={{ pathLength:0 }} animate={inView?{ pathLength:1 }:{ pathLength:0 }}
                transition={{ duration:1.4, ease:'easeInOut' }}/>
            </svg>
          </div>
        </motion.div>

        {/* Feature list + CTA */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'40px', alignItems:'flex-start' }}>
          <div style={{ flex:'1 1 280px' }}>
            {FEATURES.map((f,i) => (
              <motion.div key={f}
                initial={{ opacity:0,x:-16 }} whileInView={{ opacity:1,x:0 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.4, delay:i*0.08 }}
                style={{ display:'flex', gap:'8px', marginBottom:'14px',
                         fontFamily:'var(--font-body)', fontSize:'0.9375rem',
                         color: MUTED, lineHeight:1.6 }}>
                <span style={{ color: ACCENT, fontFamily:'var(--font-mono)', flexShrink:0 }}>&gt;</span>
                <span style={{ color: PRIMARY }}>{f}</span>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.5, delay:0.3 }}
            style={{ flexShrink:0 }}>
            <button className="btn-accent"
              style={{ padding:'14px 28px', fontSize:'0.875rem', letterSpacing:'0.05em' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}>
              ▸ REQUEST_EARLY_ACCESS
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
