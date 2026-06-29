import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const ACCENT  = '#4F8FFF';
const DATA    = '#38C5E8';
const PRIMARY = '#C4D4E8';
const MUTED   = '#445A73';
const BORDER  = '#0B1F3A';

const OWNER_EMAIL = 'nithyananthan@nskgroups.website';
const OWNER_PHONE = '+91 63855 76354';

const FIELDS = [
  { id:'name',  label:'NAME',         type:'text',  required:true  },
  { id:'email', label:'EMAIL',        type:'email', required:true  },
  { id:'org',   label:'ORGANIZATION', type:'text',  required:false },
];

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [form, setForm]   = useState({ name:'', email:'', org:'', message:'' });
  const [state, setState] = useState<FormState>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':        'application/json',
        },
        body: JSON.stringify({
          name:         form.name,
          email:        form.email,
          organization: form.org,
          message:      form.message || '—',
          _subject:     `NiteOrbit Early Access Request — ${form.name}`,
          _template:    'table',
          _replyto:     form.email,
        }),
      });

      if (res.ok) {
        setState('success');
        setForm({ name:'', email:'', org:'', message:'' });
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  return (
    <section id="contact" style={{
      padding:'96px 24px',
      background:'rgba(5,14,28,0.5)',
      borderTop:`1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Section label */}
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5 }}
          style={{ marginBottom:'16px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: ACCENT, letterSpacing:'0.12em' }}>
            &gt; GET_EARLY_ACCESS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.1 }}
          style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                   fontSize:'clamp(1.75rem,3vw,2.5rem)', color: PRIMARY, margin:'0 0 12px' }}>
          Get Early Access
        </motion.h2>

        {/* Contact info strip */}
        <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.5, delay:0.15 }}
          style={{ display:'flex', flexWrap:'wrap', gap:'24px', marginBottom:'40px' }}>
          <a href={`mailto:${OWNER_EMAIL}`}
            style={{ display:'flex', alignItems:'center', gap:'8px',
                     fontFamily:'var(--font-mono)', fontSize:'0.8rem',
                     color: DATA, textDecoration:'none',
                     transition:'opacity 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.opacity='0.7')}
            onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            <Mail size={14} style={{ flexShrink:0 }}/>
            {OWNER_EMAIL}
          </a>
          <a href={`tel:${OWNER_PHONE.replace(/\s/g,'')}`}
            style={{ display:'flex', alignItems:'center', gap:'8px',
                     fontFamily:'var(--font-mono)', fontSize:'0.8rem',
                     color: DATA, textDecoration:'none',
                     transition:'opacity 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.opacity='0.7')}
            onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            <Phone size={14} style={{ flexShrink:0 }}/>
            {OWNER_PHONE}
          </a>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.6, delay:0.2 }}
          style={{ maxWidth:'500px' }}>

          {state === 'success' ? (
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'1rem',
                          color: ACCENT, padding:'32px 0', letterSpacing:'0.08em' }}>
              <span style={{ color: MUTED }}>&gt; </span>
              REQUEST_RECEIVED. STANDBY.
              <span className="cursor-blink" style={{ marginLeft:'2px', color: ACCENT }}>_</span>
              <div style={{ marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                            color: MUTED, letterSpacing:'0.06em' }}>
                &gt; A copy has been sent to{' '}
                <span style={{ color: DATA }}>{OWNER_EMAIL}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
              {FIELDS.map(f => (
                <div key={f.id}>
                  <div style={{ marginBottom:'6px' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: ACCENT }}>&gt; </span>
                    <label htmlFor={f.id}
                      style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                               color: MUTED, letterSpacing:'0.1em' }}>
                      {f.label}{!f.required && ' (OPTIONAL)'}
                    </label>
                  </div>
                  <input id={f.id} type={f.type} required={f.required}
                    value={form[f.id as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.id]:e.target.value })}
                    className="terminal-input"/>
                </div>
              ))}

              <div>
                <div style={{ marginBottom:'6px' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: ACCENT }}>&gt; </span>
                  <label htmlFor="message"
                    style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                             color: MUTED, letterSpacing:'0.1em' }}>
                    MESSAGE (OPTIONAL)
                  </label>
                </div>
                <textarea id="message" rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message:e.target.value })}
                  className="terminal-input"
                  style={{ resize:'vertical' }}/>
              </div>

              {state === 'error' && (
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                              color:'#FF6060', letterSpacing:'0.06em' }}>
                  &gt; TRANSMISSION_ERROR. Retry or email us directly.
                </div>
              )}

              <button type="submit" disabled={state==='sending'}
                className="btn-accent"
                style={{ width:'100%', padding:'14px', fontSize:'0.875rem',
                         letterSpacing:'0.08em', opacity:state==='sending'?0.6:1 }}>
                {state==='sending' ? '[ TRANSMITTING... ]' : '[ EXECUTE REQUEST ]'}
              </button>
            </form>
          )}

          {state !== 'success' && (
            <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8125rem',
                        color: MUTED, marginTop:'20px', lineHeight:1.6 }}>
              We're working with a small number of early partners. Reach out to learn more.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
