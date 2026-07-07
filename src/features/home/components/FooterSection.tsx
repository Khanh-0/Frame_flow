import { Zap, Twitter, Github, Youtube } from "lucide-react";
import { FOOTER_NAV_LINKS } from "../constants/homeData";

export function FooterSection() {
  return (
    <footer style={{ borderTop: "1px solid #2A2A40", padding: "40px 40px", background: "#0B0B14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={14} color="white" fill="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#F5F3FF" }}>FrameFlow</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {FOOTER_NAV_LINKS.map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: 14, color: "#AAB2D5", textDecoration: "none" }}
                className="hover:text-pink-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[Twitter, Github, Youtube].map((Icon, i) => (
              <a key={i} href="#" style={{ color: "#7E86A4" }} className="hover:text-pink-400 transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#7E86A4", marginTop: 28 }}>
          © 2026 FrameFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
