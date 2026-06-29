import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock } from 'lucide-react';

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

type State = 'idle'|'sending'|'success'|'error';

export default function Contact() {
  const [form, setForm]   = useState({ name:'', email:'', org:'', message:'' });
  const [state, setState] = useState<State>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({
          name:         form.name,
          email:        form.email,
          organization: form.org || '—',
          message:      form.message || '—',
          _subject:     `NiteOrbit Early Access Request — ${form.name}`,
          _template:    'table',
          _replyto:     form.email,
        }),
      });
      if (res.ok) { setState('success'); setForm({ name:'',email:'',org:'',message:'' }); }
      else setState('error');
    } catch { setState('error'); }
  };

  return (
    <section id="contact" style={{
      padding:'96px 24px',
      borderTop:`1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'64px', alignItems:'flex-start' }}>

          {/* LEFT: form */}
          <div style={{ flex:'1 1 320px', maxWidth:'500px' }}>

            <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5 }}
              style={{ marginBottom:'16px' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                             color: ACCENT, letterSpacing:'0.12em' }}>
                &gt; GET_EARLY_ACCESS
              </span>
            </motion.div>

            <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}
              style={{ fontFamily:'var(--font-heading)', fontWeight:700,
                       fontSize:'clamp(1.75rem,3vw,2.5rem)', color: PRIMARY, margin:'0 0 8px' }}>
              Start the Conversation
            </motion.h2>

            <motion.p initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.15 }}
              style={{ fontFamily:'var(--font-body)', fontSize:'0.9375rem',
                       color: MUTED, lineHeight:1.7, margin:'0 0 28px' }}>
              The ASSESS phase is free for all early access partners.
              Tell us about your mission — we'll tell you exactly what we can do.
            </motion.p>

            {/* Urgency badge */}
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
              style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'32px',
                       fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                       color: DATA, letterSpacing:'0.08em',
                       border:`1px solid rgba(56,197,232,0.25)`,
                       padding:'8px 14px', background:'rgba(56,197,232,0.04)' }}>
              <Clock size={13} style={{ flexShrink:0 }}/>
              <span>
                8 of 10 early access slots available · Response within 48h
              </span>
            </motion.div>

            <motion.div initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:0.25 }}>

              {state==='success' ? (
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.95rem',
                              color: ACCENT, padding:'32px 0', letterSpacing:'0.08em' }}>
                  <span style={{ color: MUTED }}>&gt; </span>
                  REQUEST_RECEIVED. STANDBY.
                  <span className="cursor-blink" style={{ marginLeft:'2px', color: ACCENT }}>_</span>
                  <div style={{ marginTop:'16px', fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                                color: MUTED }}>
                    &gt; Confirmation sent to{' '}
                    <span style={{ color: DATA }}>{OWNER_EMAIL}</span>
                  </div>
                  <div style={{ marginTop:'8px', fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                                color: MUTED }}>
                    &gt; We'll be in touch within 48 hours.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                  {FIELDS.map(f => (
                    <div key={f.id}>
                      <div style={{ marginBottom:'6px' }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: ACCENT }}>&gt; </span>
                        <label htmlFor={f.id}
                          style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                                   color: MUTED, letterSpacing:'0.1em' }}>
                          {f.label}{!f.required?' (OPTIONAL)':''}
                        </label>
                      </div>
                      <input id={f.id} type={f.type} required={f.required}
                        value={form[f.id as keyof typeof form]}
                        onChange={e=>setForm({...form,[f.id]:e.target.value})}
                        className="terminal-input"/>
                    </div>
                  ))}

                  <div>
                    <div style={{ marginBottom:'6px' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: ACCENT }}>&gt; </span>
                      <label htmlFor="message"
                        style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                                 color: MUTED, letterSpacing:'0.1em' }}>
                        TELL US ABOUT YOUR MISSION (OPTIONAL)
                      </label>
                    </div>
                    <textarea id="message" rows={4}
                      value={form.message}
                      placeholder="Satellite type, launch date, current ground software status..."
                      onChange={e=>setForm({...form,message:e.target.value})}
                      className="terminal-input" style={{ resize:'vertical' }}/>
                  </div>

                  {state==='error' && (
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                                  color:'#FF6060', letterSpacing:'0.06em' }}>
                      &gt; TRANSMISSION_ERROR. Retry or email us directly.
                    </div>
                  )}

                  <button type="submit" disabled={state==='sending'} className="btn-accent"
                    style={{ width:'100%', padding:'14px', fontSize:'0.875rem',
                             letterSpacing:'0.08em', opacity:state==='sending'?0.6:1,
                             boxShadow: state==='sending'?'none':'0 0 24px rgba(79,143,255,0.25)' }}>
                    {state==='sending' ? '[ TRANSMITTING... ]' : '[ EXECUTE REQUEST ]'}
                  </button>

                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem',
                              color: MUTED, margin:0, lineHeight:1.6 }}>
                    No commitment required. ASSESS call is free. We'll respond within 48 hours.
                  </p>
                </form>
              )}
            </motion.div>
          </div>

          {/* RIGHT: contact info + what to expect */}
          <motion.div initial={{ opacity:0,x:24 }} whileInView={{ opacity:1,x:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
            style={{ flex:'1 1 240px' }}>

            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem',
                          color: MUTED, letterSpacing:'0.15em', marginBottom:'20px' }}>
              DIRECT_CONTACT
            </div>

            <a href={`mailto:${OWNER_EMAIL}`}
              style={{ display:'flex', alignItems:'center', gap:'10px',
                       fontFamily:'var(--font-mono)', fontSize:'0.8rem', color: DATA,
                       textDecoration:'none', marginBottom:'14px',
                       transition:'opacity 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='0.7')}
              onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
              <Mail size={14} style={{ flexShrink:0 }}/> {OWNER_EMAIL}
            </a>

            <a href="tel:+916385576354"
              style={{ display:'flex', alignItems:'center', gap:'10px',
                       fontFamily:'var(--font-mono)', fontSize:'0.8rem', color: DATA,
                       textDecoration:'none', marginBottom:'40px',
                       transition:'opacity 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='0.7')}
              onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
              <Phone size={14} style={{ flexShrink:0 }}/> {OWNER_PHONE}
            </a>

            {/* What to expect */}
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem',
                          color: MUTED, letterSpacing:'0.15em', marginBottom:'16px' }}>
              WHAT_HAPPENS_NEXT
            </div>
            <div style={{ border:`1px solid ${BORDER}`, padding:'20px',
                          background:'rgba(5,14,28,0.7)' }}>
              {[
                ['Within 24h', 'We review your request and send a calendar invite'],
                ['ASSESS call', 'Free 45-min technical discovery session'],
                ['Within 5 days', 'You receive a fixed-scope deployment proposal'],
                ['Kickoff', '72-hour deployment begins on your timeline'],
              ].map(([time, desc], i) => (
                <div key={i} style={{ display:'flex', gap:'12px', paddingBottom:'14px',
                                      marginBottom: i<3?'14px':'0',
                                      borderBottom: i<3 ? `1px solid ${BORDER}` : 'none' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                                 color: ACCENT, flexShrink:0, minWidth:'80px',
                                 letterSpacing:'0.04em', paddingTop:'1px' }}>
                    {time}
                  </span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem',
                                 color: MUTED, lineHeight:1.5 }}>
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
