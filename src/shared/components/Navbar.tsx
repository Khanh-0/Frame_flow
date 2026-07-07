import { Link, useLocation } from "react-router";
import { Zap } from "lucide-react";

export function Navbar() {

  const navItems = [
    { name: "Pricing", href: "#pricing" },
    { name: "Download", href: "#download" },
    { name: "Learn", href: "#learn" },
  ];

  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        height: "72px",
        background: "rgba(11,11,20,0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "#2A2A40",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between h-full"
        style={{ maxWidth: "1200px", padding: "0 40px" }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: 34, height: 34, background: "linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)" }}
          >
            <Zap size={18} color="white" fill="white" />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#F5F3FF",
              letterSpacing: "-0.3px",
            }}
          >
            FrameFlow
          </span>
        </Link>

        {/* Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#AAB2D5",
                textDecoration: "none",
              }}
              className="hover:text-pink-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/signin"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#AAB2D5",
              padding: "8px 16px",
              borderRadius: 10,
              border: "1.5px solid #2A2A40",
              textDecoration: "none",
              background: "#161622",
              transition: "all 0.15s",
            }}
            className="hover:border-pink-400 hover:text-pink-400"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              padding: "8px 20px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 25%, #FF2E9A 75%, #FF8A34 100%)",
              textDecoration: "none",
              height: 40,
              display: "flex",
              alignItems: "center",
              boxShadow: "0 4px 16px rgba(168,85,247,0.35)",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
