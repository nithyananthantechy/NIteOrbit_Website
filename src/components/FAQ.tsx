import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ACCENT  = '#4F8FFF';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

const FAQS = [
  {
    q: 'Do I need to rip out my existing ground software to work with NiteOrbit?',
    a: 'No. We start where you are. If you have partial YAMCS configs, legacy scripts, or an existing telemetry pipeline, we audit and integrate — we don\'t force a full replacement unless it\'s genuinely the right call for your mission.',
  },
  {
    q: 'What satellite protocols and data formats does Perigee support?',
    a: 'Perigee is built on YAMCS, which natively supports CCSDS Telemetry (TM), Telecommand (TC), SLE (Space Link Extension), XTCE parameter definitions, and raw UDP/TCP packet injection. If your protocol isn\'t listed, talk to us — we\'ve extended YAMCS for edge-case missions before.',
  },
  {
    q: 'How long does deployment actually take?',
    a: 'Our benchmark is 72 hours from kickoff to a running ground station stack. Realistically, the full mission integration (custom telemetry, monitoring dashboards, security hardening) takes 3–10 business days depending on satellite complexity. We don\'t pad timelines — you\'ll know the real number after the ASSESS phase.',
  },
  {
    q: 'What happens to our system after deployment — do you just hand off and disappear?',
    a: 'No. That\'s explicitly what we\'re designed not to do. NiteOrbit offers ongoing OPERATE engagements covering monitoring, security patching, dependency updates, and incident response. Most early partners roll from DEPLOY into OPERATE automatically.',
  },
  {
    q: 'What security standards do you work toward?',
    a: 'Our baseline follows NIST SP 800-53 controls, ECSS-E-ST-70 ground system standards, and emerging ITU cybersecurity recommendations for space operations. For government clients, we work toward FISMA and FedRAMP-aligned architectures. We don\'t make compliance claims we can\'t substantiate — your security posture is documented and auditable.',
  },
  {
    q: 'How does pricing work? Is there a fixed rate?',
    a: 'Pricing is scoped per mission — we don\'t sell generic SaaS seats, because ground system complexity varies enormously. After the initial ASSESS phase (which is free for early access partners), you receive a fixed-price proposal for DEPLOY. OPERATE is priced on a monthly retainer. No surprise overruns.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null);

  return (
    <section style={{ padding:'96px 24px', maxWidth:'1280px', margin:'0 auto' }}>

      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5 }}
        style={{ marginBottom:'16px' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                       color: ACCENT, letterSpacing:'0.12em' }}>
          &gt; FREQUENTLY_ASKED
        </span>
      </motion.div>

      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.1 }}
        style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                 fontSize:'clamp(1.75rem,3vw,2.5rem)', color: PRIMARY, margin:'0 0 12px' }}>
        Before You Reach Out
      </motion.h2>

      <motion.p initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.15 }}
        style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color: MUTED,
                 maxWidth:'560px', lineHeight:1.7, margin:'0 0 48px' }}>
        Honest answers to the questions our prospects ask most. If something isn't covered,
        it's a great opening for a conversation.
      </motion.p>

      {/* Accordion */}
      <div style={{ borderTop:`1px solid ${BORDER}` }}>
        {FAQS.map((faq, i) => (
          <motion.div key={i}
            initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true, margin:'-40px' }}
            transition={{ duration:0.4, delay:i*0.06 }}
            style={{ borderBottom:`1px solid ${BORDER}` }}>

            {/* Question row */}
            <button
              onClick={() => setOpen(open===i ? null : i)}
              style={{
                width:'100%', background:'none', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'space-between',
                gap:'16px', padding:'22px 20px', textAlign:'left',
                transition:'background 0.2s',
              }}
              onMouseEnter={e=>(e.currentTarget.style.background='rgba(5,14,28,0.8)')}
              onMouseLeave={e=>(e.currentTarget.style.background='none')}
            >
              <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                               color: ACCENT, flexShrink:0, marginTop:'2px' }}>
                  [{String(i+1).padStart(2,'0')}]
                </span>
                <span style={{ fontFamily:'var(--font-body)', fontSize:'0.9375rem',
                               color: PRIMARY, lineHeight:1.5 }}>
                  {faq.q}
                </span>
              </div>
              <motion.div
                animate={{ rotate: open===i ? 180 : 0 }}
                transition={{ duration:0.25 }}
                style={{ flexShrink:0 }}>
                <ChevronDown size={18} color={ACCENT}/>
              </motion.div>
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {open===i && (
                <motion.div
                  initial={{ height:0, opacity:0 }}
                  animate={{ height:'auto', opacity:1 }}
                  exit={{ height:0, opacity:0 }}
                  transition={{ duration:0.3, ease:'easeInOut' }}
                  style={{ overflow:'hidden' }}>
                  <div style={{ padding:'0 20px 24px 44px' }}>
                    <div style={{ width:'32px', height:'1px',
                                  background: ACCENT, marginBottom:'14px', opacity:0.4 }}/>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem',
                                color: MUTED, lineHeight:1.8, margin:0 }}>
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Still have questions */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
        viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
        style={{ marginTop:'32px', fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                 color: MUTED, letterSpacing:'0.06em' }}>
        <span style={{ color: ACCENT }}>&gt; </span>
        Not answered here?{' '}
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
          style={{ background:'none', border:'none', cursor:'pointer',
                   fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                   color: ACCENT, textDecoration:'underline', padding:0, letterSpacing:'0.06em' }}>
          Ask us directly ▸
        </button>
      </motion.div>
    </section>
  );
}
