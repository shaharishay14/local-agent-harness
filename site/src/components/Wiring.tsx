import type { BrandName } from './icons'
import { Icon, Logo } from './icons'

function Core() {
  return (
    <span className="integ-core glass">
      <span className="mark">
        <Icon name="mark" />
      </span>
      <span className="integ-ring" />
    </span>
  )
}

/** The six wires of the "Connect your tools" card (viewBox 564 x 410, the agent at 282, 205). */
const HUB: { brand: BrandName; wire: string }[] = [
  { brand: 'gmail', wire: 'M 270 205 V 105 Q 270 90 255 90 H 110' },
  { brand: 'slack', wire: 'M 294 205 V 85 Q 294 70 309 70 H 360' },
  { brand: 'gcal', wire: 'M 250 205 H 160' },
  { brand: 'github', wire: 'M 314 205 H 480' },
  { brand: 'notion', wire: 'M 282 205 V 360' },
  { brand: 'linear', wire: 'M 314 215 V 325 Q 314 340 329 340 H 460' },
]

/** Six apps wired to the agent, a light running along each wire. */
export function HubWiring() {
  return (
    <div className="integ">
      <div className="integ-dots" />
      <svg className="wires" viewBox="0 0 564 410" fill="none">
        {HUB.map((n, i) => (
          <g key={n.brand}>
            <path className="w-base" d={n.wire} />
            <path className={`w-run d${i}`} d={n.wire} />
          </g>
        ))}
      </svg>
      {HUB.map((n, i) => (
        <span key={n.brand} className={`tile node slot-${i}`}>
          <Logo name={n.brand} />
        </span>
      ))}
      <Core />
    </div>
  )
}

// A use case's wiring has its own layout: one to three tools in a column on the left, the agent
// in the middle, the channel the answer arrives in on the right. The box keeps one aspect ratio,
// so the SVG scales evenly and the % positions of the tiles stay on the ends of their wires.
// Tile and agent sizes follow the box width (see .flow-box in the CSS) with a floor and a lid.
const W = 400
const H = 260
const MID = { x: W / 2, y: H / 2 }
const TOOL_X = 70
const REPLY_X = 330
const TOOL_YS: Record<number, number[]> = { 1: [130], 2: [78, 182], 3: [42, 130, 218] }

const pct = (v: number, of: number) => `${(v / of) * 100}%`

export function FlowWiring({ tools, reply }: { tools: BrandName[]; reply: BrandName }) {
  const ys = TOOL_YS[tools.length] ?? TOOL_YS[3]
  const nodes = [
    ...tools.slice(0, 3).map((brand, i) => {
      const y = ys[i]
      const bend = (TOOL_X + MID.x) / 2
      return { brand, x: TOOL_X, y, wire: `M ${TOOL_X} ${y} C ${bend} ${y} ${bend} ${MID.y} ${MID.x} ${MID.y}` }
    }),
    { brand: reply, x: REPLY_X, y: MID.y, wire: `M ${MID.x} ${MID.y} H ${REPLY_X}` },
  ]
  return (
    <div className="flow-box">
      <div className="integ-dots" />
      <svg className="wires" viewBox={`0 0 ${W} ${H}`} fill="none">
        {nodes.map((n, i) => (
          <g key={i}>
            <path className="w-base" d={n.wire} />
            <path className={`w-run d${i}`} d={n.wire} />
          </g>
        ))}
      </svg>
      {nodes.map((n, i) => (
        <span key={i} className="tile flow-node" style={{ left: pct(n.x, W), top: pct(n.y, H) }}>
          <Logo name={n.brand} />
        </span>
      ))}
      <Core />
    </div>
  )
}
