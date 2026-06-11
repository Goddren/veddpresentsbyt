import { useState, useEffect } from "react";
import Platform from "./Platform";
import CertHub from "./CertHub";
import DeepModules from "./DeepModules";
import TracksGrants from "./TracksGrants";
import Calendar from "./Calendar";
import AIAgent from "./AIAgent";
import NFCLanding from "./NFCLanding";
import { LANGS, getLang, setLang as saveLang, t } from "./i18n";

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

const TAB_IDS = ["platform","modules","certs","grants","calendar","ai"];

const SAVE_THEME = "byt_theme_v1";

function isNFCScan() {
  try {
    const p = new URLSearchParams(window.location.search);
    return p.has("nfc") || p.has("scan") || p.has("tap");
  } catch { return false; }
}

export default function App() {
  const [tab,       setTab]      = useState("platform");
  const [themeName, setThemeName]= useState(() => {
    try { return localStorage.getItem(SAVE_THEME) || "gold"; } catch { return "gold"; }
  });
  const [showNFC,   setShowNFC]  = useState(() => isNFCScan());
  const [lang,      setLangState]= useState(() => getLang());

  const T = THEMES[themeName];

  function toggleTheme() {
    const next = themeName === "gold" ? "bw" : "gold";
    setThemeName(next);
    try { localStorage.setItem(SAVE_THEME, next); } catch {}
  }

  function switchLang(code) {
    setLangState(code);
    saveLang(code);
  }

  function enterFromNFC() {
    setShowNFC(false);
    // Remove ?nfc param from URL without reload
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("nfc");
      url.searchParams.delete("scan");
      url.searchParams.delete("tap");
      window.history.replaceState({}, "", url);
    } catch {}
  }

  const pages = {
    platform: <Platform theme={T} setTab={setTab} lang={lang} />,
    modules:  <DeepModules theme={T} lang={lang} />,
    certs:    <CertHub theme={T} lang={lang} />,
    grants:   <TracksGrants theme={T} lang={lang} />,
    calendar: <Calendar theme={T} lang={lang} />,
    ai:       <AIAgent theme={T} lang={lang} />,
  };

  const TABS = TAB_IDS.map(id => ({ id, label: t(lang, id) }));

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "Georgia,serif" }}>

      {/* NFC cinematic landing */}
      {showNFC && <NFCLanding theme={T} onEnter={enterFromNFC} />}

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

          <div style={{ fontFamily: "monospace", fontSize: 7, color: T.muted, letterSpacing: ".12em", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "none" }} className="tagline">BE YE TRANSFORMED</span>

            {/* Language switcher */}
            <div style={{ display: "flex", border: `1px solid ${T.border}`, overflow: "hidden" }}>
              {LANGS.map(l => (
                <button key={l.code} onClick={() => switchLang(l.code)} style={{
                  background: lang === l.code ? T.a : "transparent",
                  border: "none", borderRight: l.code !== LANGS[LANGS.length-1].code ? `1px solid ${T.border}` : "none",
                  color: lang === l.code ? (themeName === "bw" ? "#fff" : "#05050A") : T.muted,
                  fontFamily: "monospace", fontSize: 7, letterSpacing: ".1em",
                  padding: "4px 8px", cursor: "pointer", fontWeight: lang === l.code ? 900 : 400,
                  transition: "all .15s"
                }}>{l.label}</button>
              ))}
            </div>

            {/* NFC preview trigger */}
            <button onClick={() => setShowNFC(true)} style={{
              background: "transparent", border: `1px solid ${T.borderSoft}`,
              color: T.muted, fontFamily: "monospace", fontSize: 7, letterSpacing: ".1em",
              padding: "4px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5
            }}>
              📡 NFC
            </button>
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
              flex: 1, minWidth: 80, padding: "10px 6px",
              background: tab === t.id ? T.inputBg : "transparent",
              border: "none", borderBottom: `2px solid ${tab === t.id ? T.a : "transparent"}`,
              color: tab === t.id ? T.a : T.muted,
              fontFamily: "monospace", fontSize: 8, letterSpacing: ".06em",
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
            flex: 1, padding: "8px 2px", background: "transparent", border: "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer"
          }}>
            <span style={{ fontSize: 14 }}>{t.label.split(" ")[0]}</span>
            <span style={{ fontFamily: "monospace", fontSize: 5, letterSpacing: ".04em", color: tab === t.id ? T.a : T.muted }}>
              {t.label.split(" ").slice(1).join(" ")}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        /* ── Base resets ── */
        *{box-sizing:border-box;margin:0;padding:0;}
        body{overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(128,128,128,.2);}

        /* ── Core keyframes ── */
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInLeft{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeInRight{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeInScale{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes floatX{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}
        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes popIn{0%{opacity:0;transform:scale(.7)}70%{transform:scale(1.06)}100%{opacity:1;transform:scale(1)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes barFill{from{width:0}to{width:var(--w,100%)}}
        @keyframes dotBlink{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes orbFloat{0%,100%{transform:translate(0,0)}33%{transform:translate(20px,-30px)}66%{transform:translate(-15px,15px)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 transparent}50%{box-shadow:0 0 30px 4px rgba(212,168,67,.25)}}
        @keyframes tabUnderline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scanLine{0%{top:-100%}100%{top:200%}}

        /* ── Page entrance ── */
        .pg-enter{animation:fadeIn .3s cubic-bezier(.22,1,.36,1) both}
        .pg-enter-scale{animation:fadeInScale .3s cubic-bezier(.22,1,.36,1) both}

        /* ── Stagger helpers ── */
        .s0{animation-delay:0ms}
        .s1{animation-delay:60ms}
        .s2{animation-delay:120ms}
        .s3{animation-delay:180ms}
        .s4{animation-delay:240ms}
        .s5{animation-delay:300ms}
        .s6{animation-delay:360ms}
        .s7{animation-delay:420ms}
        .s8{animation-delay:480ms}
        .s9{animation-delay:540ms}

        /* ── Card interactions ── */
        .card-hover{
          transition:transform .22s cubic-bezier(.22,1,.36,1),
                     box-shadow .22s ease,
                     border-color .22s ease,
                     background .22s ease !important;
          cursor:pointer;
        }
        .card-hover:hover{
          transform:translateY(-3px) scale(1.012);
          box-shadow:0 8px 32px rgba(212,168,67,.12);
        }
        .card-hover:active{transform:translateY(-1px) scale(1.005);}

        .card-hover-bw:hover{
          transform:translateY(-3px) scale(1.012);
          box-shadow:0 8px 24px rgba(0,0,0,.12);
        }

        /* ── Button press ── */
        .btn-press{transition:transform .12s ease,opacity .12s ease;}
        .btn-press:hover{transform:scale(1.04);opacity:.9;}
        .btn-press:active{transform:scale(.97);}

        /* ── Shimmer text ── */
        .shimmer-text{
          background:linear-gradient(90deg,#D4A843 0%,#F5E4B0 45%,#D4A843 55%,#D4A843 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 3s linear infinite;
        }
        .shimmer-text-bw{
          background:linear-gradient(90deg,#0A0A0A 0%,#555 45%,#0A0A0A 55%,#0A0A0A 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 3s linear infinite;
        }

        /* ── Progress bar with animation ── */
        .bar-animate{animation:barFill .8s cubic-bezier(.22,1,.36,1) .3s both;}

        /* ── Fade-up list items ── */
        .fade-up{opacity:0;animation:fadeIn .4s cubic-bezier(.22,1,.36,1) both;}
        .fade-left{opacity:0;animation:fadeInLeft .4s cubic-bezier(.22,1,.36,1) both;}
        .fade-right{opacity:0;animation:fadeInRight .4s cubic-bezier(.22,1,.36,1) both;}
        .pop-in{opacity:0;animation:popIn .4s cubic-bezier(.22,1,.36,1) both;}

        /* ── Scan line overlay (for NFC hero feel) ── */
        .scan-line::after{
          content:'';
          position:absolute;
          left:0;right:0;height:2px;
          background:linear-gradient(to right,transparent,rgba(212,168,67,.25),transparent);
          animation:scanLine 4s linear infinite;
          pointer-events:none;
        }

        /* ── Dot pulse indicators ── */
        .live-dot{
          display:inline-block;
          width:6px;height:6px;border-radius:50%;
          background:#4ADE80;
          animation:pulse 2s ease infinite;
          box-shadow:0 0 6px #4ADE80;
        }

        /* ── Nav tab active indicator ── */
        .tab-active-bar{
          display:block;
          height:2px;
          transform-origin:left;
          animation:tabUnderline .2s cubic-bezier(.22,1,.36,1) both;
        }

        /* ── Float animation for decorative orbs ── */
        .orb-float{animation:orbFloat 8s ease-in-out infinite;}
        .orb-float-2{animation:orbFloat 11s ease-in-out infinite reverse;}
        .glow-pulse{animation:glowPulse 3s ease-in-out infinite;}

        /* ── Mobile ── */
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
