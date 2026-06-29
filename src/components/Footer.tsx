const ACCENT = '#4F8FFF';
const MUTED  = '#445A73';

export default function Footer() {
  return (
    <footer style={{
      borderTop:'1px solid #0B1F3A',
      background:'#02080F',
      padding:'16px 24px',
      textAlign:'center',
    }}>
      <p style={{
        fontFamily:'var(--font-mono)',
        fontSize:'clamp(0.65rem,1.5vw,0.75rem)',
        margin:0, color: MUTED,
        letterSpacing:'0.08em', lineHeight:1.8,
      }}>
        <span style={{ color: MUTED }}>NITEORBIT_SYS // STATUS: </span>
        <span style={{ color: ACCENT }}>OPERATIONAL</span>
        <span style={{ color: MUTED }}> // © 2026 // ALL SYSTEMS NOMINAL</span>
      </p>
    </footer>
  );
}
