import { Link } from "react-router";
import { Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 120px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #11111B, #0B0B14)",
          borderRadius: 28, padding: "64px 80px",
          textAlign: "center", position: "relative", overflow: "hidden",
          border: "1px solid #2A2A40",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute", top: -80, right: -80,
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,46,154,0.15) 0%, transparent 70%)",
          }}
        />

        <Sparkles size={32} color="#A855F7" style={{ margin: "0 auto 16px" }} />

        <h2 style={{ fontSize: 36, fontWeight: 800, color: "#F5F3FF", marginBottom: 16, letterSpacing: "-1px" }}>
          Start coloring your animations today
        </h2>

        <p style={{ fontSize: 16, color: "#AAB2D5", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Join thousands of animators who save hours every week with FrameFlow's AI-powered coloring.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/signup"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 25%, #FF2E9A 75%, #FF8A34 100%)", color: "white",
              padding: "14px 32px", borderRadius: 12,
              fontWeight: 700, fontSize: 15, textDecoration: "none",
              boxShadow: "0 8px 30px rgba(168,85,247,0.35)",
            }}
          >
            Start Free
          </Link>
          <Link
            to="/signin"
            style={{
              background: "#161622", color: "#FFFFFF",
              padding: "14px 32px", borderRadius: 12,
              fontWeight: 600, fontSize: 15, textDecoration: "none",
              border: "1.5px solid #2A2A40",
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
