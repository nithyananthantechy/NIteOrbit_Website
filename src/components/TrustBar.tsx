import { motion } from 'framer-motion';

const ACCENT = '#4F8FFF';
const MUTED  = '#445A73';
const BORDER = '#0B1F3A';
const PRIMARY= '#C4D4E8';

const TECH = [
  'YAMCS', 'OpenMCT', 'CCSDS/SLE', 'Docker',
  'Kubernetes', 'Grafana', 'Prometheus', 'MQTT',
  'TM/TC Protocol', 'ITU-R Compliant', 'ECSS Standards',
];

export default function TrustBar() {
  return (
    <section style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`,
                      background:'rgba(5,14,28,0.7)', padding:'28px 24px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Label */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:0.5 }}
          style={{ textAlign:'center', marginBottom:'20px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem',
                         color: MUTED, letterSpacing:'0.2em' }}>
            DEPLOYED ON PROVEN SPACE TECHNOLOGY
          </span>
        </motion.div>

        {/* Tech chips */}
        <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
          style={{ display:'flex', flexWrap:'wrap', justifyContent:'center',
                   gap:'10px 16px' }}>
          {TECH.map((t, i) => (
            <motion.span key={t}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.04 }}
              style={{
                fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                color: PRIMARY, letterSpacing:'0.08em',
                padding:'5px 14px',
                border:`1px solid ${BORDER}`,
                background:'rgba(79,143,255,0.04)',
                whiteSpace:'nowrap',
                transition:'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e=>{
                (e.currentTarget as HTMLElement).style.borderColor = ACCENT;
                (e.currentTarget as HTMLElement).style.color = ACCENT;
              }}
              onMouseLeave={e=>{
                (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                (e.currentTarget as HTMLElement).style.color = PRIMARY;
              }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
