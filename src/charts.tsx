// Chart engine SVG — biểu đồ kiểu báo cáo ESG (Eclat), theme tối, không lib ngoài.
import { useId } from "react";

export const CHART_COLORS = ["#5ec8c0", "#e8a33d", "#8b7cf6", "#e06c8a", "#5aa9e6", "#7bc96f"];
const TEXT = "#d8d4e3";
const MUTED = "#9a94ad";
const GRID = "rgba(255,255,255,0.09)";

const W = 640;

function niceCeil(max: number): number {
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return nice * pow;
}

function YAxis({ y0, plotH, max, format }: { y0: number; plotH: number; max: number; format: (v: number) => string }) {
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  return (
    <g aria-hidden="true">
      {ticks.map((v, i) => {
        const y = y0 + plotH - (v / max) * plotH;
        return (
          <g key={i}>
            <line x1={56} x2={W - 12} y1={y} y2={y} stroke={GRID} strokeWidth={1} />
            <text x={50} y={y + 4} textAnchor="end" fontSize={11} fill={MUTED}>{format(v)}</text>
          </g>
        );
      })}
    </g>
  );
}

export interface BarSeries { name: string; color: string; values: number[] }

/** Biểu đồ cột đứng nhóm (vd KNK theo năm, cường độ theo năm). */
export function GroupedBars({ title, categories, series, height = 300, formatValue }: {
  title: string; categories: string[]; series: BarSeries[]; height?: number; formatValue: (v: number) => string;
}) {
  const uid = useId();
  const top = 28, bottom = 44, left = 56, right = 12;
  const plotW = W - left - right, plotH = height - top - bottom;
  const max = niceCeil(Math.max(0, ...series.flatMap((s) => s.values)) * 1.12);
  const n = categories.length;
  const groupW = plotW / Math.max(n, 1);
  const barW = Math.min(34, (groupW * 0.62) / Math.max(series.length, 1));
  return (
    <figure className="chart" style={{ margin: 0 }}>
      <figcaption className="chart-title">{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label={title} style={{ width: "100%", height: "auto" }}>
        <title>{title}</title>
        <YAxis y0={top} plotH={plotH} max={max} format={formatValue} />
        {categories.map((cat, i) => {
          const gx = left + i * groupW;
          return (
            <g key={cat}>
              {series.map((s, j) => {
                const v = s.values[i] ?? 0;
                const h = Math.max(0, (v / max) * plotH);
                const bw = barW;
                const x = gx + (groupW - bw * series.length) / 2 + j * bw;
                const y = top + plotH - h;
                return (
                  <g key={s.name}>
                    <rect x={x} y={y} width={bw - 3} height={h} rx={3} fill={s.color}>
                      <title>{`${s.name}: ${formatValue(v)}`}</title>
                    </rect>
                    <text x={x + (bw - 3) / 2} y={y - 5} textAnchor="middle" fontSize={10.5} fill={TEXT}>{formatValue(v)}</text>
                  </g>
                );
              })}
              <text x={gx + groupW / 2} y={top + plotH + 20} textAnchor="middle" fontSize={12} fill={TEXT}>{cat}</text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend" aria-hidden="true">
        {series.map((s) => (
          <span key={s.name}><i style={{ background: s.color }} />{s.name}</span>
        ))}
      </div>
      <span id={uid} className="sr-only">{title}</span>
    </figure>
  );
}

/** Biểu đồ cột đứng đơn (vd điện 12 tháng). */
export function SingleBars({ title, data, color = CHART_COLORS[0], height = 280, formatValue }: {
  title: string; data: Array<{ label: string; value: number }>; color?: string; height?: number; formatValue: (v: number) => string;
}) {
  const top = 24, bottom = 40, left = 56, right = 12;
  const plotW = W - left - right, plotH = height - top - bottom;
  const max = niceCeil(Math.max(0, ...data.map((d) => d.value)) * 1.12);
  const slot = plotW / Math.max(data.length, 1);
  const bw = Math.min(40, slot * 0.62);
  return (
    <figure className="chart" style={{ margin: 0 }}>
      <figcaption className="chart-title">{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label={title} style={{ width: "100%", height: "auto" }}>
        <title>{title}</title>
        <YAxis y0={top} plotH={plotH} max={max} format={formatValue} />
        {data.map((d, i) => {
          const h = Math.max(0, (d.value / max) * plotH);
          const x = left + i * slot + (slot - bw) / 2;
          const y = top + plotH - h;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={bw} height={h} rx={3} fill={color}>
                <title>{`${d.label}: ${formatValue(d.value)}`}</title>
              </rect>
              <text x={x + bw / 2} y={top + plotH + 18} textAnchor="middle" fontSize={11} fill={TEXT}>{d.label}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Biểu đồ cột ngang (vd cơ cấu chất thải, so sánh +/-). */
export function HBars({ title, data, height, formatValue }: {
  title: string; data: Array<{ label: string; value: number; color?: string }>; height?: number; formatValue: (v: number) => string;
}) {
  const rowH = 44;
  const h = height ?? (data.length * rowH + 56);
  const top = 8, left = 150, right = 90;
  const plotW = W - left - right;
  const max = niceCeil(Math.max(0, ...data.map((d) => d.value)) * 1.15);
  return (
    <figure className="chart" style={{ margin: 0 }}>
      <figcaption className="chart-title">{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label={title} style={{ width: "100%", height: "auto" }}>
        <title>{title}</title>
        {data.map((d, i) => {
          const y = top + i * rowH + 8;
          const w = Math.max(0, (d.value / max) * plotW);
          const color = d.color ?? CHART_COLORS[i % CHART_COLORS.length];
          return (
            <g key={d.label}>
              <text x={left - 10} y={y + 13} textAnchor="end" fontSize={12} fill={TEXT}>{d.label}</text>
              <rect x={left} y={y} width={plotW} height={18} rx={4} fill="rgba(255,255,255,0.06)" />
              <rect x={left} y={y} width={w} height={18} rx={4} fill={color}>
                <title>{`${d.label}: ${formatValue(d.value)}`}</title>
              </rect>
              <text x={left + w + 8} y={y + 14} fontSize={12} fill={TEXT}>{formatValue(d.value)}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Biểu đồ tròn donut (vd cơ cấu %). */
export function Donut({ title, data, size = 220, formatValue }: {
  title: string; data: Array<{ label: string; value: number; color?: string }>; size?: number; formatValue: (v: number) => string;
}) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const r = size / 2 - 18, cx = size / 2, cy = size / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <figure className="chart" style={{ margin: 0 }}>
      <figcaption className="chart-title">{title}</figcaption>
      <div className="row gap" style={{ alignItems: "center" }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={title}>
          <title>{title}</title>
          {data.map((d, i) => {
            const frac = d.value / total;
            const dash = `${Math.max(frac * C - 2, 0.5)} ${C}`;
            const rot = (acc / total) * 360;
            acc += d.value;
            const color = d.color ?? CHART_COLORS[i % CHART_COLORS.length];
            return (
              <circle key={d.label} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={26}
                strokeDasharray={dash} transform={`rotate(${rot - 90} ${cx} ${cy})`}>
                <title>{`${d.label}: ${formatValue(d.value)}`}</title>
              </circle>
            );
          })}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize={20} fontWeight={700} fill={TEXT}>
            {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total.toFixed(0)}
          </text>
          <text x={cx} y={cy + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{title}</text>
        </svg>
        <div className="chart-legend col">
          {data.map((d, i) => {
            const color = d.color ?? CHART_COLORS[i % CHART_COLORS.length];
            const pct = ((d.value / total) * 100).toFixed(1);
            return <span key={d.label}><i style={{ background: color }} />{d.label} — {formatValue(d.value)} ({pct}%)</span>;
          })}
        </div>
      </div>
    </figure>
  );
}
