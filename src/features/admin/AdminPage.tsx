import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Zap, Users, FolderOpen, Cpu, TrendingUp, LogOut,
  ToggleLeft, ToggleRight, AlertTriangle, Activity,
  Download, Trash2, Shield, DollarSign, Server,
  CreditCard, TrendingDown, Gauge,
} from "lucide-react";

// ── Mock data ──────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Users",       value: "1,284", delta: "+12%", positive: true,  icon: Users,      color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Active Projects",   value: "3,921", delta: "+8%",  positive: true,  icon: FolderOpen, color: "#8B5CF6", bg: "#F5F3FF" },
  { label: "AI Frames Colored", value: "482K",  delta: "+31%", positive: true,  icon: Cpu,        color: "#10B981", bg: "#ECFDF5" },
  { label: "Exports This Week", value: "9,104", delta: "-3%",  positive: false, icon: Download,   color: "#F59E0B", bg: "#FFFBEB" },
];

const RECENT_USERS = [
  { id: 1, name: "Nguyen Van A", email: "vana@gmail.com",   plan: "Pro",  projects: 12, joined: "2 days ago",  status: "active" },
  { id: 2, name: "Tran Thi B",  email: "thib@gmail.com",   plan: "Free", projects: 3,  joined: "5 days ago",  status: "active" },
  { id: 3, name: "Le Van C",    email: "vanc@outlook.com", plan: "Pro",  projects: 8,  joined: "1 week ago",  status: "active" },
  { id: 4, name: "Pham Thi D",  email: "thid@yahoo.com",   plan: "Free", projects: 1,  joined: "2 weeks ago", status: "suspended" },
  { id: 5, name: "Hoang Van E", email: "vane@gmail.com",   plan: "Pro",  projects: 20, joined: "1 month ago", status: "active" },
];

const INITIAL_FEATURES = [
  { id: "ai_coloring",     label: "AI Auto Coloring",       description: "Batch AI colorization for all frames",      enabled: true  },
  { id: "mp4_export",      label: "MP4 Export",             description: "Export animation as MP4 video file",        enabled: true  },
  { id: "manual_brush",    label: "Manual Brush Tools",     description: "Full brush/pencil/eraser toolset",          enabled: true  },
  { id: "reference_modal", label: "Reference Image Upload", description: "Upload colored reference for AI guidance",  enabled: true  },
  { id: "lock_lineart",    label: "Lock Line Art",          description: "Prevent painting over outlines",            enabled: true  },
  { id: "color_propagate", label: "Color Propagation",      description: "Propagate colors across frame sequence",    enabled: false },
  { id: "pro_export",      label: "1080p Pro Export",       description: "High-res export for Pro plan users only",   enabled: true  },
  { id: "signup",          label: "New User Registration",  description: "Allow new accounts to be created",          enabled: true  },
];

// ── Revenue data ───────────────────────────────────────────────────────────────
const MONTHLY_REVENUE = [
  { month: "Oct", revenue: 4200, cost: 2100, proUsers: 210 },
  { month: "Nov", revenue: 5100, cost: 2400, proUsers: 255 },
  { month: "Dec", revenue: 6800, cost: 2900, proUsers: 340 },
  { month: "Jan", revenue: 7200, cost: 3100, proUsers: 360 },
  { month: "Feb", revenue: 8400, cost: 3400, proUsers: 420 },
  { month: "Mar", revenue: 9600, cost: 3700, proUsers: 480 },
];

const CUR  = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1];
const PREV = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 2];
const MAX_CHART = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));

const REVENUE_STATS = [
  { label: "Monthly Revenue",   value: `$${CUR.revenue.toLocaleString()}`, delta: `+${Math.round(((CUR.revenue - PREV.revenue) / PREV.revenue) * 100)}% vs last month`, positive: true,  icon: DollarSign, color: "#10B981", bg: "#ECFDF5" },
  { label: "Pro Subscribers",   value: `${CUR.proUsers}`,                  delta: `+${CUR.proUsers - PREV.proUsers} this month`,                                         positive: true,  icon: CreditCard, color: "#3B82F6", bg: "#EFF6FF" },
  { label: "AI Server Cost",    value: `$${CUR.cost.toLocaleString()}`,    delta: `+${Math.round(((CUR.cost - PREV.cost) / PREV.cost) * 100)}% vs last month`,           positive: false, icon: Server,     color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Net Profit",        value: `$${(CUR.revenue - CUR.cost).toLocaleString()}`, delta: `${Math.round(((CUR.revenue - CUR.cost) / CUR.revenue) * 100)}% margin`, positive: true,  icon: TrendingUp, color: "#8B5CF6", bg: "#F5F3FF" },
];

const SERVER_COSTS = [
  { label: "GPU Cluster (AI Coloring)",   cost: 1840, usage: 78, color: "#3B82F6", desc: "4× NVIDIA A100 — batch frame colorization" },
  { label: "GPU Burst (Single Frame AI)", cost: 620,  usage: 45, color: "#8B5CF6", desc: "On-demand GPU for single-frame AI requests" },
  { label: "Storage (Frame Assets)",      cost: 480,  usage: 62, color: "#10B981", desc: "S3-compatible object storage for PNG sequences" },
  { label: "CDN (Export Delivery)",       cost: 290,  usage: 55, color: "#F59E0B", desc: "Global CDN for MP4 and PNG export downloads" },
  { label: "Compute (API + Web)",         cost: 340,  usage: 38, color: "#06B6D4", desc: "App server, API backend, background workers" },
  { label: "Database",                    cost: 130,  usage: 29, color: "#EC4899", desc: "PostgreSQL — users, projects, frame metadata" },
];

// ── Component ──────────────────────────────────────────────────────────────────
export function AdminPage() {
  const navigate = useNavigate();
  const [features, setFeatures]     = useState(INITIAL_FEATURES);
  const [activeTab, setActiveTab]   = useState<"overview" | "users" | "features" | "revenue">("overview");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const toggleFeature = (id: string) =>
    setFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));

  const handleDeleteUser = (id: number) => {
    setDeletingId(id);
    setTimeout(() => setDeletingId(null), 1200);
  };

  const TAB = (tab: typeof activeTab) => ({
    padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
    cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif",
    background: activeTab === tab ? "#3B82F6" : "transparent",
    color: activeTab === tab ? "white" : "#64748B",
    transition: "all 0.15s",
  });

  const CARD = { background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #F1F5F9" };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFF", fontFamily: "'Inter', sans-serif" }}>

      {/* Topbar */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#1E293B", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={15} color="white" fill="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#1E293B" }}>FrameFlow</span>
          <div style={{ width: 1, height: 18, background: "#E2E8F0", margin: "0 4px" }} />
          <div className="flex items-center gap-1.5" style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 6, padding: "3px 10px" }}>
            <Shield size={12} color="#D97706" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#D97706" }}>Admin Panel</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 13, color: "#64748B" }}>Logged in as <strong style={{ color: "#1E293B" }}>admin</strong></span>
          <button onClick={() => navigate("/signin")} className="flex items-center gap-1.5" style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #E2E8F0", background: "white", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#EF4444", fontFamily: "'Inter', sans-serif" }}>
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px" }}>

        {/* Header + Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1E293B", letterSpacing: "-0.5px", marginBottom: 4 }}>Admin Dashboard</h1>
            <p style={{ fontSize: 14, color: "#64748B" }}>Manage users, features, revenue and platform activity.</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {(["overview", "users", "features", "revenue"] as const).map((tab) => (
              <button key={tab} style={TAB(tab)} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {STATS.map((s) => (
                <div key={s.label} style={{ ...CARD, padding: "20px 22px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <s.icon size={18} color={s.color} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: s.positive ? "#ECFDF5" : "#FEF2F2", color: s.positive ? "#10B981" : "#EF4444" }}>{s.delta}</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ ...CARD, padding: 24 }}>
                <div className="flex items-center gap-2 mb-5"><Activity size={16} color="#3B82F6" /><span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Recent Activity</span></div>
                <div className="flex flex-col gap-3">
                  {[
                    { text: "New user registered",               time: "2 min ago",  color: "#10B981" },
                    { text: "482 frames colored via AI",         time: "14 min ago", color: "#3B82F6" },
                    { text: "Pro subscription activated",        time: "1 hr ago",   color: "#8B5CF6" },
                    { text: "MP4 export completed (120 frames)", time: "2 hr ago",   color: "#F59E0B" },
                    { text: "User account suspended",            time: "5 hr ago",   color: "#EF4444" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#475569" }}>{item.text}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "#94A3B8", whiteSpace: "nowrap" }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...CARD, padding: 24 }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2"><TrendingUp size={16} color="#8B5CF6" /><span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Feature Status</span></div>
                  <button onClick={() => setActiveTab("features")} style={{ fontSize: 12, color: "#3B82F6", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Manage →</button>
                </div>
                <div className="flex flex-col gap-3">
                  {features.slice(0, 5).map((f) => (
                    <div key={f.id} className="flex items-center justify-between">
                      <span style={{ fontSize: 13, color: "#475569" }}>{f.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: f.enabled ? "#ECFDF5" : "#F1F5F9", color: f.enabled ? "#10B981" : "#94A3B8" }}>{f.enabled ? "ON" : "OFF"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── USERS ── */}
        {activeTab === "users" && (
          <div style={{ ...CARD, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} color="#3B82F6" />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Registered Users</span>
              <span style={{ fontSize: 12, color: "#94A3B8", background: "#F1F5F9", borderRadius: 100, padding: "1px 8px" }}>{RECENT_USERS.length}</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFF" }}>
                  {["Name", "Email", "Plan", "Projects", "Joined", "Status", "Action"].map((h) => (
                    <th key={h} style={{ padding: "10px 20px", fontSize: 11, fontWeight: 700, color: "#94A3B8", textAlign: "left", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_USERS.map((u) => (
                  <tr key={u.id} style={{ borderTop: "1px solid #F1F5F9", opacity: deletingId === u.id ? 0.4 : 1, transition: "opacity 0.3s" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div className="flex items-center gap-2.5">
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#3B82F6", flexShrink: 0 }}>{u.name.charAt(0)}</div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#64748B" }}>{u.email}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: u.plan === "Pro" ? "#EFF6FF" : "#F1F5F9", color: u.plan === "Pro" ? "#3B82F6" : "#64748B" }}>{u.plan}</span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#64748B" }}>{u.projects}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#94A3B8" }}>{u.joined}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: u.status === "active" ? "#ECFDF5" : "#FEF2F2", color: u.status === "active" ? "#10B981" : "#EF4444" }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <button onClick={() => handleDeleteUser(u.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", display: "flex", alignItems: "center" }}><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── FEATURES ── */}
        {activeTab === "features" && (
          <div style={{ ...CARD, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #F1F5F9" }}>
              <div className="flex items-center gap-2 mb-1"><Cpu size={16} color="#8B5CF6" /><span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Feature Flags</span></div>
              <p style={{ fontSize: 13, color: "#94A3B8" }}>Toggle platform features on/off in real time.</p>
            </div>
            <div className="flex flex-col">
              {features.map((f, idx) => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderTop: idx === 0 ? "none" : "1px solid #F1F5F9", background: f.enabled ? "white" : "#FAFAFA", transition: "background 0.2s" }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontSize: 14, fontWeight: 600, color: f.enabled ? "#1E293B" : "#94A3B8" }}>{f.label}</span>
                      {!f.enabled && (
                        <div className="flex items-center gap-1" style={{ background: "#FEF3C7", borderRadius: 4, padding: "1px 6px" }}>
                          <AlertTriangle size={10} color="#D97706" />
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#D97706" }}>DISABLED</span>
                        </div>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: "#94A3B8" }}>{f.description}</p>
                  </div>
                  <button onClick={() => toggleFeature(f.id)} style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, marginLeft: 24, display: "flex", alignItems: "center" }}>
                    {f.enabled ? <ToggleRight size={32} color="#3B82F6" /> : <ToggleLeft size={32} color="#CBD5E1" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REVENUE ── */}
        {activeTab === "revenue" && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {REVENUE_STATS.map((s) => (
                <div key={s.label} style={{ ...CARD, padding: "20px 22px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <s.icon size={18} color={s.color} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: s.positive ? "#ECFDF5" : "#FEF2F2", color: s.positive ? "#10B981" : "#EF4444", textAlign: "right", maxWidth: 110 }}>{s.delta}</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Bar chart: Revenue vs Cost vs Profit */}
              <div style={{ ...CARD, padding: 24 }}>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} color="#10B981" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Revenue vs Cost (6 months)</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  {[["#3B82F6","Revenue"],["#F59E0B","AI Cost"],["#10B981","Net Profit"]].map(([c,l]) => (
                    <div key={l} className="flex items-center gap-1.5">
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                      <span style={{ fontSize: 11, color: "#64748B" }}>{l}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
                  {MONTHLY_REVENUE.map((m) => {
                    const rH = (m.revenue / MAX_CHART) * 140;
                    const cH = (m.cost    / MAX_CHART) * 140;
                    const pH = ((m.revenue - m.cost) / MAX_CHART) * 140;
                    return (
                      <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 140 }}>
                          <div style={{ width: 10, height: rH, background: "#3B82F6", borderRadius: "3px 3px 0 0" }} />
                          <div style={{ width: 10, height: cH, background: "#F59E0B", borderRadius: "3px 3px 0 0" }} />
                          <div style={{ width: 10, height: pH, background: "#10B981", borderRadius: "3px 3px 0 0" }} />
                        </div>
                        <span style={{ fontSize: 10, color: "#94A3B8", marginTop: 4 }}>{m.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pro subscriber growth */}
              <div style={{ ...CARD, padding: 24 }}>
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard size={16} color="#3B82F6" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Pro Subscriber Growth</span>
                </div>
                <div className="flex flex-col gap-4">
                  {MONTHLY_REVENUE.map((m, i) => {
                    const maxU = Math.max(...MONTHLY_REVENUE.map((x) => x.proUsers));
                    const pct  = (m.proUsers / maxU) * 100;
                    const isLatest = i === MONTHLY_REVENUE.length - 1;
                    return (
                      <div key={m.month}>
                        <div className="flex justify-between items-center mb-1">
                          <span style={{ fontSize: 12, fontWeight: isLatest ? 700 : 500, color: isLatest ? "#1E293B" : "#64748B" }}>{m.month}{isLatest ? " ← current" : ""}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#3B82F6" }}>{m.proUsers} Pro</span>
                        </div>
                        <div style={{ height: 8, background: "#F1F5F9", borderRadius: 100, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: isLatest ? "#3B82F6" : "#BFDBFE", borderRadius: 100 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 20, padding: "14px 16px", background: "#F8FAFF", borderRadius: 12, border: "1px solid #E0E7FF" }}>
                  {[
                    ["Revenue per Pro user", `$20 / month`, "#1E293B"],
                    ["AI cost per Pro user",  `~$${(CUR.cost / CUR.proUsers).toFixed(2)} / month`, "#F59E0B"],
                    ["Margin per Pro user",   `~$${(20 - CUR.cost / CUR.proUsers).toFixed(2)} / month`, "#10B981"],
                  ].map(([label, val, color]) => (
                    <div key={label} className="flex justify-between mt-1">
                      <span style={{ fontSize: 12, color: "#64748B" }}>{label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Infrastructure breakdown */}
            <div style={{ ...CARD, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #F1F5F9" }}>
                <div className="flex items-center gap-2 mb-1"><Server size={16} color="#F59E0B" /><span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>Infrastructure Cost Breakdown</span></div>
                <p style={{ fontSize: 13, color: "#94A3B8" }}>Monthly GPU servers, storage, CDN, and compute.</p>
              </div>
              <div className="flex flex-col">
                {SERVER_COSTS.map((item, idx) => (
                  <div key={idx} style={{ padding: "16px 24px", borderTop: idx === 0 ? "none" : "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Gauge size={16} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="flex justify-between items-center mb-1">
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{item.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>${item.cost.toLocaleString()}/mo</span>
                      </div>
                      <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6 }}>{item.desc}</p>
                      <div style={{ height: 5, background: "#F1F5F9", borderRadius: 100, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${item.usage}%`, background: item.color, borderRadius: 100 }} />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span style={{ fontSize: 10, color: "#94A3B8" }}>Utilization</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: item.color }}>{item.usage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Total row */}
              <div style={{ padding: "16px 24px", background: "#F8FAFF", borderTop: "2px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="flex items-center gap-2">
                  <TrendingDown size={14} color="#EF4444" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>Total Monthly Infrastructure</span>
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#EF4444" }}>
                  ${SERVER_COSTS.reduce((s, x) => s + x.cost, 0).toLocaleString()}/mo
                </span>
              </div>
            </div>
          </>
        )}

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link to="/" style={{ fontSize: 13, color: "#94A3B8", textDecoration: "none" }}>← Back to FrameFlow</Link>
        </div>
      </div>
    </div>
  );
}