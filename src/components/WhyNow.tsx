import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ACCENT  = '#4F8FFF';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';

function useCounter(target:number, dur:number, active:boolean) {
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

export default function WhyNow() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-120px' });
  const count  = useCounter(73, 1500, inView);

  return (
    <section id="why-now" style={{ padding:'96px 24px' }}>
      <div ref={ref} style={{
        maxWidth:'1280px', margin:'0 auto',
        display:'flex', flexWrap:'wrap', gap:'48px', alignItems:'center',
      }}>
        {/* LEFT — stat */}
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-100px' }} transition={{ duration:0.6 }}
          style={{ flex:'0 1 320px', textAlign:'left' }}>

          <div style={{ marginBottom:'8px' }}>
            <span className="stat-underline"
              style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                       fontSize:'clamp(4rem,8vw,6rem)', color: PRIMARY, lineHeight:1 }}>
              {count}%
            </span>
          </div>

          <div style={{ marginBottom:'12px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem',
                           color: ACCENT, letterSpacing:'0.15em' }}>
              DATA_POINT_01
            </span>
          </div>

          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.875rem',
                      color: MUTED, lineHeight:1.7, margin:0, maxWidth:'300px' }}>
            of small satellite teams build ground software without dedicated security review
          </p>
        </motion.div>

        {/* RIGHT — text */}
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-100px' }} transition={{ duration:0.6, delay:0.15 }}
          style={{ flex:'1 1 320px' }}>

          <div style={{ marginBottom:'20px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                           color: ACCENT, letterSpacing:'0.12em' }}>
              &gt; WHY NITEORBIT
            </span>
          </div>

          <div style={{ width:'40px', height:'1px', background: ACCENT, marginBottom:'24px' }}/>

          <p style={{ fontFamily:'var(--font-body)', fontSize:'1.0625rem',
                      color: MUTED, lineHeight:1.8, margin:0, maxWidth:'600px' }}>
            <span style={{ color: PRIMARY }}>
              The space industry is moving faster than the software supporting it.
            </span>{' '}
            Small satellite teams are building mission control software from scratch, often without
            security expertise. NiteOrbit closes that gap — bringing production-grade ground systems
            engineering to teams that need it most.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
