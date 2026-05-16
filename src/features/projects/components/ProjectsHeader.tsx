import { Link } from "react-router";
import { Zap, User, LogOut } from "lucide-react";

export function ProjectsHeader() {
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        height: 64,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={16} color="white" fill="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#1E293B" }}>FrameFlow</span>
        </Link>

        {/* User actions */}
        <div className="flex items-center gap-3">
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <User size={15} color="white" />
          </div>
          <Link
            to="/signin"
            className="flex items-center gap-1.5"
            style={{ fontSize: 13, color: "#64748B", textDecoration: "none", padding: "6px 10px", borderRadius: 8, border: "1px solid #E2E8F0" }}
          >
            <LogOut size={13} />
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
}