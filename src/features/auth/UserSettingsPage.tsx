import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth";

export function UserSettingsPage() {
  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [credits, setCredits] = useState(0);
  const [subscription, setSubscription] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    // Prefer server-stored name (from Supabase user metadata). Fall back to localStorage profile.
    if ((user as any).fullName) {
      setFullName((user as any).fullName as string);
    }
    const key = `profile_${user.id}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const p = JSON.parse(raw);
        // only use local values if server metadata not present
        if (!fullName) setFullName(p.fullName ?? "");
        if (!avatarUrl) setAvatarUrl(p.avatarUrl ?? "");
        setCredits(p.credits ?? 0);
        setSubscription(p.subscription ?? null);
      } catch {
        // ignore
      }
    }
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await updateProfile({ full_name: fullName, avatar_url: avatarUrl });
      if (!res.success) {
        setMessage(res.error ?? "Failed to save");
        setSaving(false);
        return;
      }

      // also store local editable fields
      const key = `profile_${user.id}`;
      const payload = { fullName, avatarUrl, credits, subscription };
      localStorage.setItem(key, JSON.stringify(payload));

      setMessage("Saved");
    } catch (err) {
      setMessage("Failed to save");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 1800);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "40px auto", padding: "24px", background: "white", borderRadius: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>User Settings</h2>

        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ width: 220 }}>
            <div style={{ width: 120, height: 120, borderRadius: 999, overflow: "hidden", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, color: "#334155" }}>
              {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (fullName ? fullName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : "U"))}
            </div>

            <div style={{ marginTop: 12, fontSize: 13, color: "#475569" }}>
              <div><strong>Email:</strong></div>
              <div style={{ fontSize: 14 }}>{user.email}</div>
            </div>

            <div style={{ marginTop: 12, fontSize: 13, color: "#475569" }}>
              <div><strong>Credits:</strong></div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{credits}</div>
            </div>

            <div style={{ marginTop: 12, fontSize: 13, color: "#475569" }}>
              <div><strong>Subscription:</strong></div>
              <div style={{ fontSize: 14 }}>{subscription ?? "Free"}</div>
            </div>

            <button onClick={handleSignOut} style={{ marginTop: 18, padding: "8px 12px", borderRadius: 8, border: "1px solid #E2E8F0", background: "white", cursor: "pointer" }}>
              Sign out
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #E2E8F0" }} />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Avatar URL</label>
              <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #E2E8F0" }} />
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 20 }}>
              <button onClick={handleSave} disabled={saving} style={{ padding: "10px 16px", borderRadius: 8, background: "#3B82F6", color: "white", border: "none", cursor: "pointer" }}>{saving ? "Saving..." : "Save settings"}</button>
              {message && <div style={{ color: "#16A34A" }}>{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
