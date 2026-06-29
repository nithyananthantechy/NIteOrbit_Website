import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import TelemetryPanel from './TelemetryPanel';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

const ROTATING = [
  'Your satellite launched. Don\'t let ground software be the weak link.',
  'Stop building from scratch — deploy mission control in 72 hours.',
  'Pre-hardened security. YAMCS-native. Supported by engineers who care.',
];

const CHIPS = [
  { label: '72H DEPLOY' },
  { label: 'YAMCS NATIVE' },
  { label: 'SOC2-READY' },
];

const container = { hidden:{}, visible:{ transition:{ staggerChildren:0.14 } } };
const line: Variants = { hidden:{ opacity:0,y:32 }, visible:{ opacity:1,y:0, transition:{ duration:0.6, ease:'easeOut' } } };

export default function Hero() {
  const [tagIdx, setTagIdx] = useState(0);
  const [show, setShow]     = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => { setTagIdx(i => (i+1)%ROTATING.length); setShow(true); }, 400);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const go = (id:string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <section id="hero" className="grid-bg corner-bracket-tl corner-bracket-bl"
      style={{ position:'relative', minHeight:'92vh', paddingTop:'58px',
               display:'flex', alignItems:'center', overflow:'hidden' }}>

      {/* Ambient glows */}
      <div style={{ position:'absolute', top:'10%', right:'28%', width:'700px', height:'700px',
                    borderRadius:'50%', pointerEvents:'none',
                    background:'radial-gradient(circle, rgba(79,143,255,0.07) 0%, transparent 65%)' }}/>
      <div style={{ position:'absolute', bottom:'0%', right:'8%', width:'400px', height:'400px',
                    borderRadius:'50%', pointerEvents:'none',
                    background:'radial-gradient(circle, rgba(56,197,232,0.05) 0%, transparent 70%)' }}/>

      <div style={{ width:'100%', maxWidth:'1280px', margin:'0 auto',
                    padding:'48px 24px', display:'flex', flexWrap:'wrap',
                    alignItems:'center', gap:'48px' }}>

        {/* LEFT */}
        <motion.div style={{ flex:'1 1 340px', maxWidth:'680px' }}
          variants={container} initial="hidden" animate="visible">

          {/* Urgency badge */}
          <motion.div variants={line} style={{ marginBottom:'20px' }}>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              fontFamily:'var(--font-mono)', fontSize:'0.7rem',
              color: DATA, letterSpacing:'0.12em',
              border:`1px solid ${BORDER}`,
              padding:'5px 12px',
              background:'rgba(56,197,232,0.06)',
            }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%',
                             background: DATA, flexShrink:0 }} className="pulse-dot"/>
              EARLY ACCESS OPEN — 10 PARTNER SLOTS AVAILABLE
            </span>
          </motion.div>

          {/* Init label */}
          <motion.div variants={line} style={{ marginBottom:'20px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                           color: ACCENT, letterSpacing:'0.12em' }}>
              | INITIALIZING MISSION_PARAMS
              <span className="cursor-blink" style={{ marginLeft:'2px' }}>_</span>
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom:'20px' }}>
            {['Ground Systems for the','New Space Economy'].map((txt,i)=>(
              <motion.h1 key={i} variants={line} style={{
                fontFamily:'var(--font-heading)', fontWeight:700,
                color: PRIMARY, fontSize:'clamp(2.6rem,5.5vw,4.25rem)',
                lineHeight:1.08, margin:0,
              }}>{txt}</motion.h1>
            ))}
          </div>

          {/* Rotating tagline */}
          <motion.div variants={line} style={{ marginBottom:'28px', minHeight:'28px' }}>
            <AnimatePresence mode="wait">
              {show && (
                <motion.p key={tagIdx}
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-8 }} transition={{ duration:0.35 }}
                  style={{ fontFamily:'var(--font-mono)', fontSize:'0.85rem',
                           color: MUTED, margin:0, letterSpacing:'0.02em' }}>
                  <span style={{ color: ACCENT }}>&gt; </span>
                  {ROTATING[tagIdx]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Paragraph */}
          <motion.p variants={line} style={{
            fontFamily:'var(--font-body)', fontSize:'1rem',
            color: MUTED, maxWidth:'520px', lineHeight:1.75, margin:'0 0 32px',
          }}>
            NiteOrbit delivers production-ready ground station software, telemetry
            infrastructure, and pre-hardened cybersecurity — built specifically for
            small satellite teams who need to be operational on day one.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={line}
            style={{ display:'flex', flexWrap:'wrap', gap:'12px', marginBottom:'28px' }}>
            <button className="btn-accent"
              style={{ padding:'13px 26px', fontSize:'0.85rem', letterSpacing:'0.06em',
                       boxShadow:'0 0 24px rgba(79,143,255,0.25)' }}
              onClick={() => go('perigee')}>
              ▸ EXEC PERIGEE.SHOW()
            </button>
            <button className="btn-outline-white"
              style={{ padding:'13px 24px', fontSize:'0.85rem', letterSpacing:'0.06em' }}
              onClick={() => go('contact')}>
              REQUEST_ACCESS
            </button>
          </motion.div>

          {/* Quick-stat chips */}
          <motion.div variants={line} style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
            {CHIPS.map(c => (
              <span key={c.label} style={{
                fontFamily:'var(--font-mono)', fontSize:'0.68rem',
                color: ACCENT, letterSpacing:'0.12em',
                border:`1px solid ${BORDER}`,
                padding:'4px 10px',
                background:'rgba(79,143,255,0.05)',
              }}>
                ✓ {c.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Telemetry Panel */}
        <motion.div
          initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.8, delay:0.5, ease:'easeOut' }}
          style={{ flex:'1 1 320px', display:'flex', justifyContent:'center' }}>
          <TelemetryPanel/>
        </motion.div>
      </div>
    </section>
  );
}
