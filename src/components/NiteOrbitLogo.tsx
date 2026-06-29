/**
 * NiteOrbit Logo — SVG recreation of Logo 3
 * Orbital ring with radial tick marks + gold satellite dot + wordmark
 */
export function NiteOrbitLogo({ height = 44 }: { height?: number }) {
  // Viewbox: 220 x 56
  const aspect = 220 / 56;
  const w = height * aspect;

  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 220 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NiteOrbit Ground Systems"
    >
      {/* ── Orbital icon group, centered at (30, 28) ── */}
      <g transform="translate(30,28)">
        
        {/* Ring and satellite dot grouped for correct rotation math */}
        <g transform="rotate(-22)">
          <ellipse
            cx="0" cy="0" rx="22" ry="11.5"
            fill="none"
            stroke="#4F8FFF"
            strokeWidth="1.7"
          />
          {/* Satellite dot placed exactly ON the ellipse path */}
          <circle cx="15.55" cy="8.13" r="3.5" fill="#FFB830"/>
          <circle cx="15.55" cy="8.13" r="2" fill="#FFD060" fillOpacity="0.5"/>
        </g>

        {/* Tick marks extending outward from upper arc */}
        {/* 11 o'clock */}
        <line x1="-16" y1="-13" x2="-20" y2="-17" stroke="#4F8FFF" strokeWidth="1.3" strokeLinecap="round"/>
        {/* 12 o'clock ish */}
        <line x1="-7"  y1="-16" x2="-9"  y2="-21" stroke="#4F8FFF" strokeWidth="1.3" strokeLinecap="round"/>
        {/* 12:30 */}
        <line x1="0"   y1="-15" x2="0"   y2="-20" stroke="#4F8FFF" strokeWidth="1.3" strokeLinecap="round"/>
        {/* 1 o'clock */}
        <line x1="7"   y1="-13" x2="9"   y2="-18" stroke="#4F8FFF" strokeWidth="1.3" strokeLinecap="round"/>
        {/* 1:30 */}
        <line x1="14"  y1="-9"  x2="18"  y2="-13" stroke="#4F8FFF" strokeWidth="1.3" strokeLinecap="round"/>
        {/* 10 o'clock (shorter) */}
        <line x1="-21" y1="-6"  x2="-26" y2="-8"  stroke="#4F8FFF" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.7"/>
      </g>

      {/* Vertical divider */}
      <line x1="65" y1="10" x2="65" y2="46" stroke="#0B1F3A" strokeWidth="1.2"/>

      {/* ── Wordmark ── */}
      {/* "Nite" — starlight white */}
      <text
        x="76" y="36"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="24" fontWeight="700"
        fill="#C4D4E8"
      >
        Nite
      </text>
      {/* "Orbit" — electric blue */}
      <text
        x="120" y="36"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="24" fontWeight="700"
        fill="#4F8FFF"
      >
        Orbit
      </text>

      {/* Thin underline beneath wordmark */}
      <line x1="76" y1="40" x2="210" y2="40" stroke="#4F8FFF" strokeWidth="0.8" strokeOpacity="0.7"/>

      {/* "GROUND SYSTEMS" subtitle */}
      <text
        x="76" y="51"
        fontFamily="'JetBrains Mono', 'Courier New', monospace"
        fontSize="7.5" fontWeight="400"
        fill="#445A73"
        letterSpacing="2.8"
      >
        GROUND SYSTEMS
      </text>
    </svg>
  );
}

export default NiteOrbitLogo;
