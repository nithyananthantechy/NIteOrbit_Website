import { motion } from 'framer-motion';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

export default function FinalCTA() {
  return (
    <section style={{
      padding:'0 24px',
      background:'rgba(5,14,28,0.6)',
      borderTop:`1px solid ${BORDER}`,
      borderBottom:`1px solid ${BORDER}`,
      position:'relative', overflow:'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:'800px', height:'400px', borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(79,143,255,0.08) 0%, transparent 65%)',
        pointerEvents:'none',
      }}/>

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'80px 0',
                    position:'relative', zIndex:1 }}>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'40px',
                      alignItems:'center', justifyContent:'space-between' }}>

          {/* Left text */}
          <div style={{ flex:'1 1 320px' }}>
            {/* Grid decoration */}
            <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
              {[1,2,3,4].map(n => (
                <div key={n} style={{ width:'20px', height:'2px', background: ACCENT, opacity:n*0.25 }}/>
              ))}
            </div>

            <motion.h2
              initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.6 }}
              style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                       fontSize:'clamp(1.6rem,3.5vw,2.75rem)', color: PRIMARY,
                       margin:'0 0 16px', lineHeight:1.15 }}>
              Your mission deserves<br/>
              <span style={{ color: ACCENT }}>mission-grade</span> infrastructure.
            </motion.h2>

            <motion.p
              initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.5, delay:0.1 }}
              style={{ fontFamily:'var(--font-body)', fontSize:'1rem',
                       color: MUTED, lineHeight:1.75, margin:'0 0 24px', maxWidth:'500px' }}>
              We're accepting early partners now. Join the ground floor of the new space
              operations stack — before your competitors do.
            </motion.p>

            {/* Urgency counter */}
            <motion.div
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
              style={{ display:'flex', alignItems:'center', gap:'12px',
                       fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                       color: MUTED, letterSpacing:'0.08em' }}>
              <span className="rec-blink"
                style={{ width:'8px', height:'8px', borderRadius:'50%',
                         background: DATA, display:'inline-block', flexShrink:0 }}/>
              <span>
                EARLY_ACCESS_SLOTS: &nbsp;
                <span style={{ color: DATA }}>8 of 10 available</span>
                &nbsp;// LIMITED_INTAKE
              </span>
            </motion.div>
          </div>

          {/* Right: terminal CTA block */}
          <motion.div
            initial={{ opacity:0,x:30 }} whileInView={{ opacity:1,x:0 }}
            viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.6, delay:0.15 }}
            style={{ flex:'0 1 380px',
                     border:`1px solid ${BORDER}`,
                     background:'rgba(2,8,15,0.8)',
                     padding:'32px' }}>

            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem',
                          color: MUTED, letterSpacing:'0.15em', marginBottom:'20px' }}>
              TERMINAL: REQUEST_EARLY_ACCESS
            </div>
            <div className="accent-line" style={{ marginBottom:'20px' }}/>

            {[
              ['ASSESS phase', 'FREE for early partners'],
              ['DEPLOY timeline', '72 hours → production'],
              ['Security baseline', 'NIST SP 800-53 aligned'],
              ['Protocol support', 'YAMCS / CCSDS / SLE'],
              ['Post-deploy support', 'Included in OPERATE plan'],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between',
                                    gap:'16px', padding:'8px 0',
                                    borderBottom:`1px solid ${BORDER}` }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: MUTED }}>
                  {k}
                </span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: DATA }}>
                  {v}
                </span>
              </div>
            ))}

            <button className="btn-accent"
              style={{ width:'100%', marginTop:'24px', padding:'14px',
                       fontSize:'0.875rem', letterSpacing:'0.08em',
                       boxShadow:'0 0 32px rgba(79,143,255,0.3)' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}>
              [ INITIATE_ENGAGEMENT ]
            </button>

            <div style={{ textAlign:'center', marginTop:'12px',
                          fontFamily:'var(--font-mono)', fontSize:'0.65rem', color: MUTED }}>
              No commitment. Free ASSESS call. Slots closing.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
