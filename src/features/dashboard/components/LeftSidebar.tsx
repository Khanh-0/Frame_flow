import { Link } from "react-router";
import {
  Zap, ChevronRight, LayoutGrid, FileImage, Star,
  List, ImageIcon, Crown, FolderOpen, X,
} from "lucide-react";
import type { useDashboard } from "../hooks/useDashboard";

type DashboardCtx = ReturnType<typeof useDashboard>;

interface LeftSidebarProps {
  ctx: DashboardCtx;
  projectName?: string;
}

export function LeftSidebar({ ctx, projectName }: LeftSidebarProps) {
  const {
    uncoloredFiles, activeFrame, frameStates, frameRefMap,
    referenceImage, setReferenceImage,
    uncoloredInputRef, customColoredInputRef,
    handleFrameChange, setContextMenu,
    openReferenceModal,
  } = ctx;

  return (
    <aside
      style={{
        width: 228, minWidth: 228,
        background: "linear-gradient(180deg, #0B0B14 0%, #10101A 100%)",
        borderRight: "1px solid #2A2A40",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "16px 14px 0", flexShrink: 0 }}>
        <Link to="/" className="flex items-center gap-2 no-underline mb-0" style={{ width: "fit-content" }}>
          <div style={{ 
            width: 26, height: 26, borderRadius: 7, 
            background: "linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)", 
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(168,85,247,0.4)"
          }}>
            <Zap size={13} color="white" fill="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#F5F3FF" }}>FrameFlow</span>
        </Link>
      </div>

      {/* Project breadcrumb */}
      <div style={{ padding: "8px 14px 0", flexShrink: 0 }}>
        <Link to="/projects" style={{ 
          display: "flex", alignItems: "center", gap: 5, 
          fontSize: 11, color: "#FFFFFF", textDecoration: "none", 
          padding: "5px 7px", borderRadius: 7, 
          background: "rgba(26,26,38,0.6)",
          border: "1px solid #2A2A40"
        }}>
           <FolderOpen size={11} />
           <span>{projectName || "Untitled Project"}</span>
           <ChevronRight size={10} style={{ marginLeft: "auto" }} />
         </Link>
      </div>

      {/* Frames header */}
      <div style={{ padding: "12px 14px 6px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <LayoutGrid size={11} color="#FFFFFF" />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: 1 }}>Frames</span>
          </div>
          <span style={{ 
            fontSize: 9, color: "#A855F7", 
            background: "rgba(168,85,247,0.15)", 
            padding: "1px 5px", borderRadius: 100,
            border: "1px solid rgba(168,85,247,0.3)"
          }}>
            {uncoloredFiles.length}
          </span>
        </div>
      </div>

      {/* Frame grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 10px", scrollbarWidth: "thin", background: "#050714" }}>
        {uncoloredFiles.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 12px", textAlign: "center" }}>
            <div style={{ 
              width: 40, height: 40, borderRadius: 10, 
              background: "#181827", 
              border: "1px solid #2A2A40",
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 
            }}>
              <FileImage size={18} color="#7E86A4" />
            </div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF", margin: "0 0 3px" }}>No frames yet</p>
            <p style={{ fontSize: 10, color: "#FFFFFF", margin: 0 }}>Import uncolored files below</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, paddingBottom: 8, paddingTop: 4 }}>
            {uncoloredFiles.map((file, i) => {
              const isActive = activeFrame === i;
              const state = frameStates[i] ?? "plain";
              return (
                <button
                  key={file.id}
                  onClick={() => handleFrameChange(i)}
                  onContextMenu={(e) => { e.preventDefault(); setContextMenu({ frameIndex: i, x: e.clientX, y: e.clientY }); }}
                  style={{
                    border: isActive 
                      ? "2px solid #FF2E9A" 
                      : frameRefMap[i] 
                        ? "1.5px solid #F59E0B" 
                        : "1.5px solid #2A2A40",
                    borderRadius: 8, overflow: "hidden", cursor: "pointer", padding: 0,
                    background: isActive ? "rgba(255,46,154,0.1)" : "#181827",
                    position: "relative",
                    boxShadow: isActive 
                      ? "0 0 0 2px rgba(255,46,154,0.3), 0 4px 12px rgba(255,46,154,0.2)" 
                      : "0 2px 8px rgba(0,0,0,0.3)",
                    transition: "all 0.1s",
                  }}
                >
                  <img src={file.url} alt={file.name} style={{ width: "100%", height: 48, objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: 3, left: 3, background: "rgba(0,0,0,0.75)", borderRadius: 3, padding: "1px 4px" }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: "white" }}>{i + 1}</span>
                  </div>
                  {state !== "plain" && (
                    <div style={{ 
                      position: "absolute", top: 3, right: 3, 
                      width: 5, height: 5, borderRadius: "50%", 
                      background: state === "ai" ? "#A855F7" : "#F59E0B", 
                      border: "1px solid rgba(255,255,255,0.5)",
                      boxShadow: state === "ai" ? "0 0 8px rgba(168,85,247,0.6)" : "0 0 8px rgba(245,158,11,0.6)"
                    }} />
                  )}
                  {frameRefMap[i] && (
                    <div style={{ 
                      position: "absolute", bottom: 3, left: 3, 
                      display: "flex", alignItems: "center", gap: 2, 
                      background: "rgba(245,158,11,0.95)", 
                      borderRadius: 3, padding: "1px 3px", 
                      border: "1px solid rgba(255,255,255,0.9)" 
                    }}>
                      <Star size={6} color="white" fill="white" />
                      <img src={frameRefMap[i].url} alt="ref" style={{ width: 10, height: 10, borderRadius: 2, objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ 
                    background: isActive ? "rgba(255,46,154,0.15)" : "#11111B", 
                    padding: "2px 4px", 
                    borderTop: "1px solid #2A2A40" 
                  }}>
                    <span style={{ 
                      fontSize: 8, 
                      color: isActive ? "#FF2E9A" : "#FFFFFF", 
                      fontWeight: isActive ? 700 : 400 
                    }}>
                      {i + 1}s
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom import buttons */}
      <div style={{ 
        padding: "8px 10px", flexShrink: 0, 
        borderTop: "1px solid #2A2A40", 
        display: "flex", flexDirection: "column", gap: 5 
      }}>
        <button
          onClick={() => uncoloredInputRef.current?.click()}
          style={{ 
            display: "flex", alignItems: "center", gap: 7, 
            padding: "7px 9px", borderRadius: 9, 
            border: "1.5px solid #2A2A40", 
            background: "#181827", 
            cursor: "pointer", 
            fontFamily: "'Inter',sans-serif", 
            width: "100%", textAlign: "left",
            transition: "all 0.15s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7C3AED";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(124,58,237,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#2A2A40";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ 
            width: 22, height: 22, borderRadius: 5, 
            background: "rgba(124,58,237,0.15)", 
            border: "1px solid rgba(168,85,247,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 
          }}>
            <List size={11} color="#A855F7" />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#FFFFFF" }}>Import Uncolored Files</div>
            <div style={{ fontSize: 8, color: "#FFFFFF" }}>{uncoloredFiles.length} loaded</div>
          </div>
        </button>

        <button
          onClick={openReferenceModal}
          style={{
            display: "flex", alignItems: "center", gap: 7, 
            padding: "7px 9px", borderRadius: 9,
            border: referenceImage ? "1.5px solid #FF2E9A" : "1.5px solid #2A2A40",
            background: referenceImage ? "rgba(255,46,154,0.1)" : "#181827",
            cursor: "pointer", 
            fontFamily: "'Inter',sans-serif", 
            width: "100%", textAlign: "left",
            transition: "all 0.15s"
          }}
          onMouseEnter={(e) => {
            if (!referenceImage) {
              e.currentTarget.style.borderColor = "#FF2E9A";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,46,154,0.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (!referenceImage) {
              e.currentTarget.style.borderColor = "#2A2A40";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          {referenceImage ? (
            <img src={referenceImage.url} alt="ref" style={{ 
              width: 22, height: 22, borderRadius: 4, 
              objectFit: "cover", flexShrink: 0, 
              border: "1px solid rgba(255,46,154,0.5)" 
            }} />
          ) : (
            <div style={{ 
              width: 22, height: 22, borderRadius: 5, 
              background: "rgba(255,46,154,0.15)", 
              border: "1px solid rgba(255,46,154,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 
            }}>
              <ImageIcon size={11} color="#FF2E9A" />
            </div>
          )}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: referenceImage ? "#FF2E9A" : "#FFFFFF" }}>
              {referenceImage ? "Reference Set" : "Import Reference"}
            </div>
            <div style={{ fontSize: 8, color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {referenceImage ? referenceImage.name : "For AI guidance"}
            </div>
          </div>
          {referenceImage && (
            <button
              onClick={(e) => { e.stopPropagation(); setReferenceImage(null); }}
              style={{ 
                background: "none", border: "none", 
                cursor: "pointer", color: "#7E86A4", 
                padding: 1, display: "flex", alignItems: "center", flexShrink: 0 
              }}
            >
              <X size={10} />
            </button>
          )}
        </button>
      </div>

      {/* Upgrade card */}
      <div style={{ padding: "0 10px 12px", flexShrink: 0 }}>
        <a 
          href="/#pricing" 
          style={{ 
            display: "block", 
            background: "linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)", 
            borderRadius: 12, padding: "12px", textDecoration: "none",
            boxShadow: "0 8px 24px rgba(168,85,247,0.4)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <Crown size={15} color="#FFD700" style={{ marginBottom: 4, filter: "drop-shadow(0 2px 4px rgba(255,215,0,0.5))" }} />
          <p style={{ fontSize: 11, fontWeight: 700, color: "white", marginBottom: 2 }}>Upgrade to Pro</p>
          <p style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, marginBottom: 8 }}>1080p, MP4, no watermark.</p>
          <div style={{ 
            width: "100%", padding: "6px", borderRadius: 6, 
            background: "rgba(255,255,255,0.95)", 
            textAlign: "center", color: "#7C3AED", 
            fontWeight: 700, fontSize: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}>
            See Pro Plans →
          </div>
        </a>
      </div>
    </aside>
  );
}