const LABEL = {
  fontFamily: "'Source Serif 4', 'Iowan Old Style', Georgia, serif",
  fontWeight: 600,
  fontSize: 9,
  letterSpacing: '0.16em',
} as const

export function HarnessFigure({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 560 196"
      role="img"
      aria-label="Harness loop: gather, act, verify, then a test gate before the next loop."
    >
      <defs>
        <pattern id="harness-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke="rgba(238,234,226,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height="196" fill="url(#harness-grid)" />

      <text x="28" y="22" fill="rgba(238,234,226,0.34)" style={LABEL}>
        01 · GATHER
      </text>
      <text x="212" y="22" fill="rgba(238,234,226,0.34)" style={LABEL}>
        02 · ACT
      </text>
      <text x="396" y="22" fill="rgba(238,234,226,0.34)" style={LABEL}>
        03 · VERIFY
      </text>

      <rect x="28" y="32" width="136" height="88" fill="rgba(217,102,28,0.06)" stroke="rgba(238,234,226,0.16)" />
      <rect x="212" y="32" width="136" height="88" fill="rgba(250,195,69,0.05)" stroke="rgba(238,234,226,0.16)" />
      <rect x="396" y="32" width="136" height="88" fill="rgba(6,182,195,0.06)" stroke="rgba(238,234,226,0.16)" />

      <line x1="44" y1="56" x2="148" y2="56" stroke="#f2ede4" strokeOpacity="0.55" strokeWidth="1.4" />
      <line x1="44" y1="74" x2="128" y2="74" stroke="#f2ede4" strokeOpacity="0.32" />
      <line x1="44" y1="92" x2="140" y2="92" stroke="#f2ede4" strokeOpacity="0.32" />

      <rect x="236" y="54" width="36" height="8" fill="none" stroke="#fac345" strokeOpacity="0.7" />
      <rect x="248" y="70" width="52" height="8" fill="none" stroke="#fac345" strokeOpacity="0.45" />
      <rect x="236" y="86" width="44" height="8" fill="none" stroke="#d9661c" strokeOpacity="0.7" />

      <rect x="420" y="54" width="88" height="44" fill="none" stroke="#06b6c3" strokeOpacity="0.45" />
      <path d="M436 86 L448 98 L492 62" fill="none" stroke="#06b6c3" strokeWidth="1.4" />

      <path
        d="M164 76 H212 M348 76 H396"
        fill="none"
        stroke="rgba(238,234,226,0.22)"
        strokeDasharray="3 4"
      />
      <path
        d="M464 120 V156 H96 V120"
        fill="none"
        stroke="rgba(238,234,226,0.22)"
        strokeDasharray="3 4"
      />

      <rect x="224" y="142" width="112" height="28" fill="rgba(0,8,22,0.65)" stroke="#d9661c" strokeOpacity="0.7" />
      <text x="280" y="160" textAnchor="middle" fill="#fac345" style={LABEL}>
        TEST GATE
      </text>

      {!reduced && (
        <rect className="offer-packet offer-packet-loop" width="5" height="5" fill="#d9661c" />
      )}
    </svg>
  )
}

export function GraphArchFigure({ reduced }: { reduced: boolean }) {
  const nodes = [
    { x: 280, y: 98, kind: 'hub' },
    { x: 198, y: 56, kind: 'near' },
    { x: 362, y: 52, kind: 'near' },
    { x: 188, y: 144, kind: 'near' },
    { x: 374, y: 148, kind: 'near' },
    { x: 280, y: 36, kind: 'mid' },
    { x: 108, y: 88, kind: 'mid' },
    { x: 452, y: 102, kind: 'mid' },
    { x: 72, y: 154, kind: 'far' },
    { x: 498, y: 46, kind: 'far' },
    { x: 330, y: 176, kind: 'far' },
  ] as const

  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 5],
    [1, 6],
    [2, 7],
    [3, 6],
    [3, 8],
    [4, 7],
    [4, 10],
    [2, 9],
  ]

  const fill = (kind: (typeof nodes)[number]['kind']) => {
    if (kind === 'hub') return '#d9661c'
    if (kind === 'near') return '#fac345'
    if (kind === 'mid') return '#06b6c3'
    return 'rgba(238,234,226,0.35)'
  }

  return (
    <svg
      viewBox="0 0 560 196"
      role="img"
      aria-label="Graph Architecture: a service call graph with a blast-radius ring around the impact node."
    >
      <defs>
        <pattern id="graph-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke="rgba(238,234,226,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height="196" fill="url(#graph-grid)" />

      <text x="20" y="22" fill="rgba(238,234,226,0.34)" style={LABEL}>
        GRAPH ARCHITECTURE
      </text>
      <text x="20" y="186" fill="rgba(238,234,226,0.28)" style={LABEL}>
        BLAST RADIUS · SERVICE CALL GRAPH
      </text>

      <circle
        cx="280"
        cy="98"
        r="78"
        fill="rgba(217,102,28,0.06)"
        stroke="#d9661c"
        strokeOpacity="0.45"
        strokeDasharray="3 5"
      />

      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(238,234,226,0.18)"
        />
      ))}

      {nodes.map((n, i) => (
        <rect
          key={`${n.x}-${n.y}`}
          x={n.x - (n.kind === 'hub' ? 7 : 5)}
          y={n.y - (n.kind === 'hub' ? 7 : 5)}
          width={n.kind === 'hub' ? 14 : 10}
          height={n.kind === 'hub' ? 14 : 10}
          fill={i === 0 ? fill(n.kind) : 'rgba(0,8,22,0.55)'}
          stroke={fill(n.kind)}
        />
      ))}

      {!reduced && (
        <rect className="offer-packet offer-packet-edge" width="5" height="5" fill="#06b6c3" />
      )}
    </svg>
  )
}
