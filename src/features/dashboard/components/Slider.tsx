export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = "%",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: "#AAB2D5", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 10, color: "#7E86A4", fontVariantNumeric: "tabular-nums" }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#A855F7", height: 3, cursor: "pointer" }}
      />
    </div>
  );
}