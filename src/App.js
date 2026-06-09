import { useState } from "react";
import Platform from "./Platform";
import CertHub from "./CertHub";
import DeepModules from "./DeepModules";
import TracksGrants from "./TracksGrants";
import Calendar from "./Calendar";

export const THEMES = {
  gold: {
    bg: "#05050A", surf: "#0D0B1A", a: "#D4A843",
    text: "#F5F0E8", muted: "rgba(212,168,67,.45)",
    border: "rgba(212,168,67,.15)", borderSoft: "rgba(212,168,67,.07)",
    navBg: "rgba(5,5,10,.97)", inputBg: "rgba(212,168,67,.06)",
    green: "#4ADE80", red: "#F87171", blue: "#60A5FA", purple: "#A78BFA",
    name: "gold",
  },
  bw: {
    bg: "#FFFFFF", surf: "#F2F0ED", a: "#0A0A0A",
    text: "#0A0A0A", muted: "rgba(0,0,0,.45)",
    border: "rgba(0,0,0,.15)", borderSoft: "rgba(0,0,0,.07)",
    navBg: "rgba(255,255,255,.97)", inputBg: "rgba(0,0,0,.04)",
    green: "#1A7A3A", red: "#CC2222", blue: "#1A55B0", purple: "#5B2EB0",
    name: "bw",
  },
};

const TABS = [
  { id: "platform",  label: "🏠 Platform" },
  { id: "modules",   label: "📚 Modules" },
  { id: "certs",     label: "🏅 Certs" },
  { id: "grants",    label: "📋 Grants" },
  { id: "calendar",  label: "🗓️ Roadmap" },
];

const SAVE_THEME = "byt_theme_v1";

export default function App() {
  const [tab,   setTab]   = useState("platform");
  const [themeName, setThemeName] = useState(() => {
    try { return localStorage.getItem(SAVE_THEME) || "gold"; } catch { return "gold"; }
  });

  const T = THEMES[themeName];

  function toggleTheme() {
    const next = themeName === "gold" ? "bw" : "gold";
    setThemeName(next);
    try { localStorage.setItem(SAVE_THEME, next); } catch {}
  }

  const pages = {
    platform: <Platform theme={T} setTab={setTab} />,
    modules:  <DeepModules theme={T} />,
    certs:    <CertHub theme={T} />,
    grants:   <TracksGrants theme={T} />,
    calendar: <Calendar theme={T} />,
  };

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "Georgia,serif" }}>

      {/* Sticky nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 999,
        background: T.navBg, borderBottom: `1px solid ${T.border}`,
        backdropFilter: "blur(10px)"
      }}>

        {/* Logo row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", borderBottom: `1px solid ${T.borderSoft}`
        }}>
          {/* Logo mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {themeName === "gold" ? (
              <>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: T.a,
                  boxShadow: `0 0 10px ${T.a}`, animation: "pulse 2s ease infinite"
                }} />
                <span style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: 20, color: T.a, letterSpacing: ".08em" }}>BYT</span>
                <span style={{ fontFamily: "monospace", fontSize: 7, color: T.muted, letterSpacing: ".22em" }}>PLATFORM</span>
              </>
            ) : (
              /* B&W logo strip */
              <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
                <div style={{ background: "#0A0A0A", padding: "4px 10px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: 18, color: "#FFFFFF", letterSpacing: ".1em" }}>BYT</span>
                </div>
                <div style={{ background: "transparent", border: "1px solid #0A0A0A", borderLeft: "none", padding: "4px 10px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 7, color: "#0A0A0A", letterSpacing: ".2em" }}>ACADEMY</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ fontFamily: "monospace", fontSize: 7, color: T.muted, letterSpacing: ".12em", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "none" }} className="tagline">BE YE TRANSFORMED</span>
            {/* Theme toggle */}
            <button onClick={toggleTheme} style={{
              background: themeName === "bw" ? "#0A0A0A" : "rgba(212,168,67,.1)",
              border: `1px solid ${T.border}`,
              color: themeName === "bw" ? "#FFFFFF" : T.a,
              fontFamily: "monospace", fontSize: 8, letterSpacing: ".1em",
              padding: "5px 12px", cursor: "pointer", transition: "all .2s",
              display: "flex", alignItems: "center", gap: 6
            }}>
              {themeName === "gold" ? "◑ B&W" : "◐ GOLD"}
            </button>
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", padding: "0 8px" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, minWidth: 90, padding: "10px 8px",
              background: tab === t.id ? T.inputBg : "transparent",
              border: "none", borderBottom: `2px solid ${tab === t.id ? T.a : "transparent"}`,
              color: tab === t.id ? T.a : T.muted,
              fontFamily: "monospace", fontSize: 9, letterSpacing: ".08em",
              cursor: "pointer", whiteSpace: "nowrap", transition: "all .18s"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div key={tab} style={{ animation: "fadeIn .22s ease" }}>
        {pages[tab]}
      </div>

      {/* Mobile bottom nav */}
      <div className="mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 998,
        background: T.navBg, borderTop: `1px solid ${T.border}`,
        display: "flex", backdropFilter: "blur(10px)"
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "8px 4px", background: "transparent", border: "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer"
          }}>
            <span style={{ fontSize: 16 }}>{t.label.split(" ")[0]}</span>
            <span style={{ fontFamily: "monospace", fontSize: 6, letterSpacing: ".06em", color: tab === t.id ? T.a : T.muted }}>
              {t.label.split(" ").slice(1).join(" ")}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;margin:0;padding:0;}
        body{overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(128,128,128,.2);}
        .mobile-nav{display:none!important;}
        @media(max-width:768px){
          .mobile-nav{display:flex!important;}
          body{padding-bottom:62px;}
          .tagline{display:none!important;}
        }
      `}</style>
    </div>
  );
}
