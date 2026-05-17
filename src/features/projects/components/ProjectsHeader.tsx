import { Link, useNavigate } from "react-router";
import { Zap, LogOut, Settings, Sun, Bell, Shield } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCallback, useEffect, useRef, useState } from "react";

export function ProjectsHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  const displayName = user?.fullName ?? user?.email ?? "User";
  const initials = displayName ? displayName[0].toUpperCase() : "U";

  // try local profile fallback (created by UserSettingsPage)
  const profileKey = user?.id ? `profile_${user.id}` : null;
  let localProfile: any = null;
  if (typeof window !== "undefined" && profileKey) {
    try {
      localProfile = JSON.parse(localStorage.getItem(profileKey) || "null");
    } catch (e) {
      localProfile = null;
    }
  }
  const credits = localProfile?.credits ?? 124;
  const expiry = localProfile?.subscription ?? "Expires: 28 May 2026";
  const plan = localProfile?.plan ?? "Free Plan";

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

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
        <div className="flex items-center gap-3" style={{ position: "relative" }} ref={menuRef}>
          <button aria-label="Open account menu" onClick={toggle} style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontWeight: 700, boxShadow: "0 6px 18px rgba(59,130,246,0.18)", border: open ? "2px solid rgba(255,255,255,0.85)" : "2px solid rgba(255,255,255,0.15)" }}>
            {initials}
          </button>

          {/* Staged dropdown */}
          <div style={{ position: "absolute", right: 0, top: 78, width: 260, pointerEvents: open ? "auto" : "none", zIndex: 60 }}>
            <div style={{ background: "white", borderRadius: 12, boxShadow: "0 10px 30px rgba(2,6,23,0.12)", overflow: "hidden", transformOrigin: "top right", opacity: open ? 1 : 0, transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)", transition: "opacity 220ms cubic-bezier(.2,.9,.2,1), transform 220ms cubic-bezier(.2,.9,.2,1)" }}>
              <div style={{ padding: 14, borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>{initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#0F172A" }}>{displayName}</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{plan} · Credits {credits}</div>
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{expiry}</div>
              </div>

              {[
                { key: "account", label: "Account Settings", icon: Settings, onClick: () => navigate("/settings") },
                { key: "appearance", label: "Appearance", icon: Sun, onClick: () => navigate("/settings#appearance") },
                { key: "notifications", label: "Notifications", icon: Bell, onClick: () => navigate("/settings#notifications") },
                { key: "security", label: "Security", icon: Shield, onClick: () => navigate("/settings#security") },
              ].map((item, idx) => (
                <div key={item.key} onClick={item.onClick} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #F8FAFC", background: "white", transition: "background 120ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")} onMouseLeave={(e) => (e.currentTarget.style.background = "white")}>
                  <item.icon size={16} color="#64748B" />
                  <div style={{ fontSize: 14, color: "#0F172A" }}>{item.label}</div>
                </div>
              ))}

              <div style={{ padding: "10px 14px", display: "flex", gap: 8 }}>
                <button onClick={() => navigate("/settings#profile") } style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid #E6EEF8", background: "white", cursor: "pointer" }}>Profile</button>
                <button onClick={handleSignOut} style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "none", background: "#3B82F6", color: "white", cursor: "pointer" }}>
                  <LogOut size={14} style={{ marginRight: 8 }} />Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}