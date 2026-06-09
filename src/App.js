import { useState } from "react";
import Platform from "./Platform";
import CertHub from "./CertHub";
import DeepModules from "./DeepModules";
import TracksGrants from "./TracksGrants";
import Calendar from "./Calendar";

const G = "#D4A843";
const DARK = "#05050A";
const SURF = "#0D0B1A";

const TABS = [
  { id: "platform",   label: "🏠 Platform",    desc: "Main Dashboard" },
  { id: "modules",    label: "📚 Deep Modules", desc: "Full Lessons" },
  { id: "certs",      label: "🏅 Certifications",desc: "All 10 Tracks" },
  { id: "grants",     label: "📋 Tracks & Grants",desc: "Grants + AI Writer" },
  { id: "calendar",   label: "🗓️ Roadmap",      desc: "90-Day + 3-Year Plan" },
];

export default function App() {
  const [tab, setTab] = useState("platform");
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = {
    platform:  <Platform />,
    modules:   <DeepModules />,
    certs:     <CertHub />,
    grants:    <TracksGrants />,
    calendar:  <Calendar />,
  };

  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: "Georgia,serif" }}>

      {/* Top navigation bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 999,
        background: "rgba(5,5,10,.97)", borderBottom: "1px solid rgba(212,168,67,.15)",
        backdropFilter: "blur(10px)"
      }}>
        {/* Logo row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", borderBottom: "1px solid rgba(212,168,67,.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: G,
              boxShadow: `0 0 10px ${G}`, animation: "pulse 2s ease infinite"
            }} />
            <span style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: 18, color: G, letterSpacing: ".08em" }}>BYT</span>
            <span style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(212,168,67,.35)", letterSpacing: ".2em" }}>PLATFORM</span>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(212,168,67,.4)", letterSpacing: ".15em" }}>
            BE YE TRANSFORMED · VEDD TECHNOLOGIES
          </div>
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: "none", background: "transparent", border: "none",
              color: G, fontSize: 20, cursor: "pointer"
            }}
            className="menu-btn"
          >☰</button>
        </div>

        {/* Tab nav */}
        <div style={{
          display: "flex", overflowX: "auto", scrollbarWidth: "none",
          padding: "0 8px"
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                flex: 1, minWidth: 100, padding: "10px 8px",
                background: tab === t.id ? "rgba(212,168,67,.08)" : "transparent",
                border: "none",
                borderBottom: `2px solid ${tab === t.id ? G : "transparent"}`,
                color: tab === t.id ? G : "rgba(212,168,67,.45)",
                fontFamily: "monospace", fontSize: 9, letterSpacing: ".08em",
                cursor: "pointer", whiteSpace: "nowrap", transition: "all .18s"
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active page */}
      <div key={tab} style={{ animation: "fadeIn .25s ease" }}>
        {pages[tab]}
      </div>

      {/* Bottom mobile nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 998,
        background: "rgba(5,5,10,.97)", borderTop: "1px solid rgba(212,168,67,.1)",
        display: "flex", backdropFilter: "blur(10px)"
      }} className="mobile-nav">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "8px 4px", background: "transparent", border: "none",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              cursor: "pointer"
            }}>
            <span style={{ fontSize: 16 }}>{t.label.split(" ")[0]}</span>
            <span style={{
              fontFamily: "monospace", fontSize: 6, letterSpacing: ".06em",
              color: tab === t.id ? G : "rgba(212,168,67,.38)"
            }}>{t.label.split(" ").slice(1).join(" ")}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.4;transform:scale(1.5)}
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(6px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes spin { to{transform:rotate(360deg)} }
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#05050A;overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(212,168,67,.2);}
        .mobile-nav{display:none;}
        @media(max-width:768px){
          .mobile-nav{display:flex;}
          body{padding-bottom:60px;}
          .menu-btn{display:block!important;}
        }
      `}</style>
    </div>
  );
}
