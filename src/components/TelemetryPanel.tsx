import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const BORDER  = '#0B1F3A';
const MUTED   = '#445A73';
const PANEL   = '#050E1C';

type Row = { label:string; value:string; base:number; delta:number; unit:string; dec:number };

const INIT_ROWS: Row[] = [
  { label:'ALT',    value:'407.66 KM',  base:407.66, delta:0.5,  unit:' KM',   dec:2 },
  { label:'VEL',    value:'7.682 KM/S', base:7.682,  delta:0.02, unit:' KM/S', dec:3 },
  { label:'SIGNAL', value:'-90 dBm',    base:-90,    delta:1.5,  unit:' dBm',  dec:0 },
  { label:'ORBIT',  value:'LEO · 51.6°',base:0,      delta:0,    unit:'',      dec:0 },
  { label:'STATUS', value:'NOMINAL',    base:0,      delta:0,    unit:'',      dec:0 },
];

function genWave(w: number, h: number, off: number) {
  return Array.from({ length:41 }, (_,i) => {
    const x = (i/40)*w;
    const y = h/2
      + Math.sin((i/40)*Math.PI*4 + off) * h*0.27
      + Math.sin((i/40)*Math.PI*7 + off*1.3) * h*0.11;
    return `${i===0?'M':'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}

export default function TelemetryPanel() {
  const [rows, setRows]         = useState<Row[]>(INIT_ROWS);
  const [dlRate, setDlRate]     = useState(2.1);
  const [waveOff, setWaveOff]   = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-100px' });

  useEffect(() => {
    const id = setInterval(() => {
      setRows(prev => prev.map(r =>
        r.delta===0 ? r : { ...r, value:(r.base+(Math.random()-0.5)*r.delta*2).toFixed(r.dec)+r.unit }
      ));
      setDlRate(p => Math.max(1.5, Math.min(3.0, p+(Math.random()-0.5)*0.2)));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWaveOff(p => p+0.15), 80);
    return () => clearInterval(id);
  }, []);

  const wave = genWave(300, 60, waveOff);

  return (
    <div ref={ref} className="telemetry-panel" style={{ width:'100%', maxWidth:'420px' }}>
      {/* Top bar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 16px' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color: MUTED, letterSpacing:'0.1em' }}>
          TELEMETRY · LIVE
        </span>
        <span className="rec-blink"
          style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color: ACCENT, letterSpacing:'0.1em' }}>
          ■ REC
        </span>
      </div>

      <div className="accent-line" />

      {/* Data rows */}
      {INIT_ROWS.map((r, i) => (
        <div key={r.label} style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'10px 16px',
          borderBottom: i < INIT_ROWS.length-1 ? `1px solid ${BORDER}` : 'none',
        }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: MUTED, letterSpacing:'0.08em' }}>
            {r.label}
          </span>
          <motion.span
            key={rows[i].value}
            initial={{ opacity:0.3 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}
            style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: DATA, letterSpacing:'0.08em' }}>
            {rows[i].value}
          </motion.span>
        </div>
      ))}

      {/* Downlink + waveform */}
      <div style={{ padding:'12px 16px 0', borderTop:`1px solid ${BORDER}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color: MUTED, letterSpacing:'0.1em' }}>DOWNLINK RATE</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color: DATA,  letterSpacing:'0.1em' }}>{dlRate.toFixed(1)} Mbps</span>
        </div>
        <div style={{ paddingBottom:'12px' }}>
          <svg width="100%" viewBox="0 0 300 60" style={{ display:'block', overflow:'visible' }}>
            <defs>
              <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18"/>
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={wave+` L300,60 L0,60 Z`} fill="url(#wg)"/>
            <motion.path d={wave} fill="none" stroke={ACCENT} strokeWidth="1.5"
              initial={inView ? undefined : { pathLength:0 }}
              animate={inView ? { pathLength:1 } : { pathLength:0 }}
              transition={{ duration:1.5, ease:'easeInOut' }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
