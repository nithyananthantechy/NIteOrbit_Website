import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';
const RED     = '#FF4F4F';

const THREATS = [
  {
    id: '[THREAT_01]',
    title: 'INFRASTRUCTURE COST',
    stat: '$500K+',
    statLabel: 'Average in-house build cost',
    body: 'Building a production-grade ground station software stack from scratch costs over half a million dollars and 9–18 months of engineering time — before you even get to mission operations. Most small satellite teams burn through runway before launch.',
    signal: 'CRITICAL',
  },
  {
    id: '[THREAT_02]',
    title: 'CYBERSECURITY EXPOSURE',
    stat: '73%',
    statLabel: 'Teams without dedicated security review',
    body: 'TT&C uplink and downlink channels are increasingly targeted by adversaries. Regulatory pressure from national space agencies is mounting. A single compromise can mean mission loss, data breach, or unrecoverable orbital maneuver — yet most teams treat security as an afterthought.',
    signal: 'HIGH',
  },
  {
    id: '[THREAT_03]',
    title: 'OPERATIONAL BLIND SPOTS',
    stat: '6mo',
    statLabel: 'Median time before ground software breaks post-launch',
    body: 'Who maintains your ground software six months after launch? Engineers move on. Dependencies go stale. Alerts go unmonitored. The mission keeps flying, but the ground infrastructure quietly degrades — until it doesn\'t.',
    signal: 'ELEVATED',
  },
];

const SIGNAL_COLORS: Record<string, string> = {
  CRITICAL: RED,
  HIGH: '#FF8C42',
  ELEVATED: '#FFB830',
};

export default function Problem() {
  return (
    <section style={{ padding:'96px 24px', maxWidth:'1280px', margin:'0 auto' }}>

      {/* Label */}
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5 }}
        style={{ marginBottom:'16px', display:'flex', alignItems:'center', gap:'10px' }}>
        <AlertTriangle size={14} color={ACCENT}/>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                       color: ACCENT, letterSpacing:'0.12em' }}>
          &gt; MISSION RISK ASSESSMENT
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.1 }}
        style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                 fontSize:'clamp(1.75rem,3vw,2.5rem)', color: PRIMARY, margin:'0 0 10px' }}>
        Three Threats Facing Every Small Satellite Program
      </motion.h2>

      <motion.p initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.15 }}
        style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color: MUTED,
                 maxWidth:'600px', lineHeight:1.7, margin:'0 0 48px' }}>
        Before you see the solution, understand what's at stake. These aren't edge cases —
        they're the default outcome for teams that build alone.
      </motion.p>

      {/* Threat cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
        {THREATS.map((t, i) => (
          <motion.div key={t.id}
            initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-60px' }}
            transition={{ duration:0.5, delay:i*0.12 }}
            style={{
              display:'flex', flexWrap:'wrap', gap:'24px',
              padding:'32px 24px',
              borderBottom:`1px solid ${BORDER}`,
              borderLeft:'4px solid transparent',
              borderTop: i===0 ? `1px solid ${BORDER}` : 'none',
              transition:'border-color 0.25s, background 0.25s',
              cursor:'default',
            }}
            onMouseEnter={e=>{
              (e.currentTarget as HTMLElement).style.borderLeftColor = ACCENT;
              (e.currentTarget as HTMLElement).style.background = 'rgba(5,14,28,0.8)';
            }}
            onMouseLeave={e=>{
              (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            {/* Left: ID + signal */}
            <div style={{ flexShrink:0, width:'120px' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                            color: ACCENT, letterSpacing:'0.08em', marginBottom:'8px' }}>
                {t.id}
              </div>
              <div style={{
                fontFamily:'var(--font-mono)', fontSize:'0.62rem',
                color: SIGNAL_COLORS[t.signal],
                letterSpacing:'0.1em',
                padding:'2px 6px',
                border:`1px solid ${SIGNAL_COLORS[t.signal]}`,
                display:'inline-block',
              }}>
                ■ {t.signal}
              </div>
            </div>

            {/* Center: stat */}
            <div style={{ flexShrink:0, width:'130px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                            fontSize:'2.25rem', color: DATA, lineHeight:1 }}>
                {t.stat}
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem',
                            color: MUTED, letterSpacing:'0.06em', marginTop:'6px',
                            lineHeight:1.4 }}>
                {t.statLabel}
              </div>
            </div>

            {/* Right: content */}
            <div style={{ flex:'1 1 200px' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                            fontSize:'0.9375rem', color: PRIMARY,
                            marginBottom:'10px', letterSpacing:'0.04em' }}>
                {t.title}
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem',
                          color: MUTED, lineHeight:1.75, margin:0 }}>
                {t.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resolution line */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
        viewport={{ once:true, margin:'-40px' }} transition={{ duration:0.6, delay:0.3 }}
        style={{ marginTop:'36px', padding:'20px 24px',
                 border:`1px solid ${BORDER}`,
                 background:'rgba(79,143,255,0.04)',
                 display:'flex', alignItems:'center', gap:'16px' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                       color: ACCENT, letterSpacing:'0.1em', flexShrink:0 }}>
          &gt; RESOLUTION
        </span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem', color: DATA }}>
          NiteOrbit eliminates all three threats — before your first downlink.
        </span>
      </motion.div>
    </section>
  );
}
