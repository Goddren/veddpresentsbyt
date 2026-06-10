import { useState, useEffect } from "react";

const STATS = [
  { value: "10", label: "Cert Tracks" },
  { value: "50+", label: "Deep Modules" },
  { value: "$2M+", label: "Grant Access" },
  { value: "$BYT", label: "Earn Tokens" },
];

const FEATURES = [
  "Financial Literacy Certifications",
  "ICT Trading & Crypto Education",
  "AI-Powered Grant Writer",
  "NFC Wear-to-Earn Technology",
  "Solana Blockchain Rewards",
  "Community Ambassador Network",
];

export default function NFCLanding({ theme, onEnter }) {
  const T = theme || { bg:"#05050A", a:"#D4A843", text:"#F5F0E8", muted:"rgba(212,168,67,.45)", name:"gold" };
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 3000),
      setTimeout(() => setPhase(5), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const gold = "#D4A843";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#05050A",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", fontFamily: "Georgia,serif"
    }}>

      <style>{`
        @keyframes nfcPulse {
          0%,100%{transform:scale(1);opacity:.6}
          50%{transform:scale(1.8);opacity:.15}
        }
        @keyframes nfcRing {
          0%{transform:scale(.4);opacity:.8}
          100%{transform:scale(2.5);opacity:0}
        }
        @keyframes nfcFadeUp {
          from{opacity:0;transform:translateY(24px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes nfcFadeIn {
          from{opacity:0}
          to{opacity:1}
        }
        @keyframes nfcSlideIn {
          from{opacity:0;transform:translateX(-20px)}
          to{opacity:1;transform:translateX(0)}
        }
        @keyframes nfcGlow {
          0%,100%{box-shadow:0 0 20px rgba(212,168,67,.3)}
          50%{box-shadow:0 0 60px rgba(212,168,67,.7),0 0 100px rgba(212,168,67,.3)}
        }
        @keyframes nfcSweep {
          from{width:0}
          to{width:100%}
        }
        @keyframes nfcSpin {
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }
      `}</style>

      {/* Background rings */}
      {phase >= 1 && [1,2,3].map(i => (
        <div key={i} style={{
          position:"absolute", width: i*200, height: i*200, borderRadius:"50%",
          border:`1px solid rgba(212,168,67,${.12 - i*.03})`,
          animation: `nfcPulse ${2+i*.5}s ease-in-out infinite`,
          animationDelay:`${i*.3}s`
        }} />
      ))}

      {/* Expanding ring on load */}
      {phase >= 1 && (
        <div style={{
          position:"absolute", width:300, height:300, borderRadius:"50%",
          border:`2px solid rgba(212,168,67,.4)`,
          animation:"nfcRing 1.5s ease-out forwards"
        }} />
      )}

      {/* Center orb */}
      <div style={{
        width: phase >= 2 ? 0 : 20,
        height: phase >= 2 ? 0 : 20,
        borderRadius:"50%",
        background: gold,
        boxShadow: `0 0 30px ${gold}`,
        transition: "all .6s ease",
        position:"absolute",
        opacity: phase >= 2 ? 0 : 1
      }} />

      {/* Main content */}
      <div style={{ textAlign:"center", position:"relative", zIndex:2, padding:"0 24px", maxWidth:480 }}>

        {/* NFC indicator */}
        {phase >= 1 && phase < 2 && (
          <div style={{ animation:"nfcFadeIn .5s ease forwards", marginBottom:24 }}>
            <div style={{ fontFamily:"monospace", fontSize:9, color:`rgba(212,168,67,.5)`, letterSpacing:".5em", marginBottom:8 }}>
              NFC DETECTED
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:4, height:4, borderRadius:"50%", background:gold, animation:`nfcPulse 1s ease infinite`, animationDelay:`${i*.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Logo */}
        {phase >= 2 && (
          <div style={{ animation:"nfcFadeUp .8s ease forwards", marginBottom:20 }}>
            {/* BYT mark */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:0, marginBottom:16,
              animation:"nfcGlow 3s ease-in-out infinite"
            }}>
              <div style={{ background: gold, padding:"8px 20px" }}>
                <span style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize:36, color:"#05050A", letterSpacing:".1em" }}>BYT</span>
              </div>
              <div style={{ border:`2px solid ${gold}`, borderLeft:"none", padding:"8px 16px" }}>
                <span style={{ fontFamily:"monospace", fontSize:9, color:gold, letterSpacing:".25em" }}>ACADEMY</span>
              </div>
            </div>

            {/* Sweep line */}
            <div style={{ height:1, background:`linear-gradient(to right,transparent,${gold},transparent)`, marginBottom:16, animation:"nfcSweep .8s ease forwards", width:"100%" }} />

            <div style={{ fontFamily:"monospace", fontSize:8, color:`rgba(212,168,67,.5)`, letterSpacing:".5em" }}>
              VEDD TECHNOLOGIES LLC · TULSA, OK
            </div>
          </div>
        )}

        {/* Tagline */}
        {phase >= 3 && (
          <div style={{ animation:"nfcFadeUp .8s ease forwards", marginBottom:28 }}>
            <h1 style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize:28, color:"#F5F0E8", lineHeight:1.2, marginBottom:8 }}>
              Be Ye Transformed.
            </h1>
            <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:13, color:"rgba(212,168,67,.6)", lineHeight:1.8 }}>
              Financial literacy education powered by community,<br/>Web3, and NFC wear-to-earn technology.
            </p>
          </div>
        )}

        {/* Stats */}
        {phase >= 4 && (
          <div style={{ animation:"nfcFadeUp .8s ease forwards", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:28 }}>
            {STATS.map((s,i) => (
              <div key={s.label} style={{
                padding:"10px 6px", border:"1px solid rgba(212,168,67,.2)",
                background:"rgba(212,168,67,.05)",
                animation:`nfcFadeUp .6s ease forwards`, animationDelay:`${i*.1}s`, opacity:0
              }}>
                <div style={{ fontFamily:"monospace", fontWeight:900, fontSize:16, color:gold }}>{s.value}</div>
                <div style={{ fontFamily:"monospace", fontSize:7, color:"rgba(212,168,67,.5)", letterSpacing:".08em", marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        {phase >= 4 && (
          <div style={{ animation:"nfcFadeIn .8s ease forwards", marginBottom:28, textAlign:"left" }}>
            {FEATURES.map((f,i) => (
              <div key={f} style={{
                display:"flex", alignItems:"center", gap:8, marginBottom:6,
                animation:`nfcSlideIn .5s ease forwards`, animationDelay:`${i*.08}s`, opacity:0
              }}>
                <div style={{ width:4, height:4, background:gold, borderRadius:"50%", flexShrink:0 }} />
                <span style={{ fontFamily:"monospace", fontSize:9, color:"rgba(212,168,67,.7)", letterSpacing:".08em" }}>{f.toUpperCase()}</span>
              </div>
            ))}
          </div>
        )}

        {/* Enter button */}
        {phase >= 5 && (
          <div style={{ animation:"nfcFadeUp .8s ease forwards" }}>
            <button onClick={onEnter}
              style={{
                width:"100%", padding:"16px 32px",
                background: gold, color:"#05050A",
                fontFamily:"monospace", fontWeight:900, fontSize:11, letterSpacing:".3em",
                border:"none", cursor:"pointer",
                animation:"nfcGlow 2s ease-in-out infinite",
                marginBottom:12
              }}>
              ENTER THE PLATFORM →
            </button>
            <div style={{ fontFamily:"monospace", fontSize:7, color:"rgba(212,168,67,.3)", letterSpacing:".2em" }}>
              POWERED BY SOLANA · $BYT TOKEN · NFC WEAR-TO-EARN
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
