import { useState, useEffect } from "react";

const TIERS = [
  { id: "foundation", label: "Foundation",  req: 1,  emoji: "🌱", color: "#60A5FA", perks: ["Access to all free modules", "BYT community membership", "Foundation digital badge"] },
  { id: "scholar",    label: "Scholar",     req: 3,  emoji: "📖", color: "#A78BFA", perks: ["Scholar badge + certificate", "Workshop facilitation kit", "Eligible for small grants"] },
  { id: "ambassador", label: "Ambassador",  req: 5,  emoji: "🤝", color: "#F59E0B", perks: ["NFC garment (shipped free)", "Host workshops for $BYT", "City chapter eligibility"] },
  { id: "platinum",   label: "Platinum",    req: 10, emoji: "💎", color: "#D4A843", perks: ["All 10 tracks certified", "Lifetime Platinum status", "Advisory board consideration"] },
];

const STATS_CARDS = [
  { label: "Certification Tracks", value: "10", sub: "Available now", icon: "🏅", color: "#D4A843" },
  { label: "Deep Modules",         value: "50+", sub: "Lessons + quizzes", icon: "📚", color: "#A78BFA" },
  { label: "Grant Sources",        value: "$2M+", sub: "Accessible funding", icon: "💰", color: "#4ADE80" },
  { label: "$BYT Rewards",         value: "Earn", sub: "Learn-to-earn", icon: "⚡", color: "#F59E0B" },
];

const QUICK_ACTIONS = [
  { icon: "🏅", title: "Start Certifications", sub: "10 tracks · earn badges", tab: "certs",    color: "#D4A843" },
  { icon: "📚", title: "Deep Modules",          sub: "ICT · Crypto · AI · RE", tab: "modules",  color: "#A78BFA" },
  { icon: "📋", title: "Tracks & Grants",       sub: "Grant writer · funding",  tab: "grants",  color: "#4ADE80" },
  { icon: "🗓️", title: "90-Day Roadmap",        sub: "60 tasks · milestones",   tab: "calendar", color: "#60A5FA" },
];

const NFC_STEPS = [
  { n: "01", title: "Earn Your Certs", body: "Complete certification tracks on BYT Academy. Each cert unlocks a higher ambassador tier." },
  { n: "02", title: "Reach Ambassador Tier", body: "Complete 5 certification tracks to qualify for your first NFC garment, shipped free." },
  { n: "03", title: "Tap to Activate", body: "Tap your phone to the NFC chip embedded in your garment. The BYT platform opens instantly." },
  { n: "04", title: "Earn $BYT Tokens", body: "Every tap earns $BYT on the Solana blockchain. Wear your gear, share the mission, earn." },
];

const TRACKS_PREVIEW = [
  { name: "Ambassador Origins",    icon: "🌐", color: "#D4A843", certs: 1 },
  { name: "Trading & Markets",     icon: "📈", color: "#60A5FA", certs: 1 },
  { name: "Crypto & Blockchain",   icon: "⛓️", color: "#A78BFA", certs: 1 },
  { name: "Artificial Intelligence",icon:"🤖", color: "#F59E0B", certs: 1 },
  { name: "Real Estate",           icon: "🏠", color: "#4ADE80", certs: 1 },
  { name: "Business Building",     icon: "🏢", color: "#FB923C", certs: 1 },
  { name: "Investing & Wealth",    icon: "💼", color: "#F87171", certs: 1 },
  { name: "STEM",                  icon: "🔬", color: "#34D399", certs: 1 },
  { name: "Skilled Trades",        icon: "🔧", color: "#FBBF24", certs: 1 },
  { name: "Health & Wellness",     icon: "🌿", color: "#2DD4BF", certs: 1 },
];

export default function Platform({ theme, setTab }) {
  const T = theme || { bg:"#05050A", surf:"#0D0B1A", a:"#D4A843", text:"#F5F0E8", muted:"rgba(212,168,67,.45)", border:"rgba(212,168,67,.15)", borderSoft:"rgba(212,168,67,.07)", inputBg:"rgba(212,168,67,.06)", green:"#4ADE80", red:"#F87171", name:"gold" };

  const [certsEarned, setCertsEarned] = useState(0);
  const [tasksDone,   setTasksDone]   = useState(0);
  const [modulesDone, setModulesDone] = useState(0);
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", h);
    // Read cross-module progress
    try {
      const cal = JSON.parse(localStorage.getItem("byt_calendar_v1") || "{}");
      setTasksDone(Object.values(cal.done || {}).filter(Boolean).length);
      const cert = JSON.parse(localStorage.getItem("byt_certhub_v1") || "{}");
      setCertsEarned(Object.values(cert.certs || {}).filter(Boolean).length);
      const mods = JSON.parse(localStorage.getItem("byt_modules_v1") || "{}");
      setModulesDone(Object.values(mods.done || {}).filter(Boolean).length);
    } catch {}
    return () => window.removeEventListener("resize", h);
  }, []);

  const tier = certsEarned >= 10 ? TIERS[3] : certsEarned >= 5 ? TIERS[2] : certsEarned >= 3 ? TIERS[1] : TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(tier) + 1];
  const tierPct = nextTier ? Math.round((certsEarned / nextTier.req) * 100) : 100;

  const bw = T.name === "bw";

  function S(base) { return { ...base, color: bw ? T.text : base.color }; }

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "Georgia,serif" }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: mob ? "28px 18px 24px" : "40px 32px 32px",
        background: bw ? T.surf : "linear-gradient(160deg,#0D0520 0%,#05050A 60%,#0A1A05 100%)",
        borderBottom: `1px solid ${T.border}`, position: "relative", overflow: "hidden"
      }}>
        {!bw && (
          <>
            <div style={{ position:"absolute",top:-80,right:-80,width:260,height:260,borderRadius:"50%",background:"rgba(212,168,67,.04)",border:"1px solid rgba(212,168,67,.06)" }} />
            <div style={{ position:"absolute",bottom:-40,left:-40,width:160,height:160,borderRadius:"50%",background:"rgba(74,222,128,.03)" }} />
          </>
        )}
        <div style={{ position:"relative" }}>
          <div style={{ fontFamily:"monospace", fontSize:8, letterSpacing:".4em", color:T.muted, marginBottom:10 }}>VEDD TECHNOLOGIES LLC · TULSA, OK</div>
          <h1 style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize: mob ? 26 : 38, color:T.a, lineHeight:1.1, marginBottom:10 }}>
            Be Ye Transformed.
          </h1>
          <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize: mob ? 13 : 15, color:T.muted, maxWidth:520, lineHeight:1.75, marginBottom:20 }}>
            Financial literacy education powered by community, Web3, and NFC wear-to-earn technology.
            Earn certifications. Build generational wealth. Transform your community.
          </p>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns: mob ? "repeat(2,1fr)" : "repeat(4,1fr)", gap:8, marginBottom: 20 }}>
            {STATS_CARDS.map(s => (
              <div key={s.label} style={{ padding:"12px 14px", background:bw ? T.bg : "rgba(255,255,255,.03)", border:`1px solid ${T.borderSoft}` }}>
                <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontFamily:"monospace", fontWeight:900, fontSize:20, color: bw ? T.a : s.color }}>{s.value}</div>
                <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, letterSpacing:".1em", marginTop:2 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:10, color:T.muted, marginTop:1 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Tier status */}
          <div style={{ padding:"14px 16px", background: bw ? T.bg : `${tier.color}0A`, border:`1px solid ${tier.color}33` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:8 }}>
              <div>
                <span style={{ fontSize:18, marginRight:7 }}>{tier.emoji}</span>
                <span style={{ fontFamily:"monospace", fontSize:10, color:tier.color, letterSpacing:".15em" }}>
                  {tier.label.toUpperCase()} AMBASSADOR
                </span>
                <div style={{ fontFamily:"Georgia,serif", fontSize:11, color:T.muted, marginTop:2 }}>
                  {certsEarned} cert{certsEarned !== 1 ? "s" : ""} earned · {tasksDone} roadmap tasks done · {modulesDone} modules completed
                </div>
              </div>
              {nextTier && (
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, letterSpacing:".1em" }}>NEXT: {nextTier.label.toUpperCase()}</div>
                  <div style={{ fontFamily:"monospace", fontSize:11, color:nextTier.color }}>{nextTier.req - certsEarned} cert{nextTier.req - certsEarned !== 1 ? "s" : ""} away</div>
                </div>
              )}
            </div>
            <div style={{ height:4, background:T.borderSoft, borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", background:tier.color, width:`${tierPct}%`, borderRadius:2, transition:"width .5s" }} />
            </div>
            <div style={{ display:"flex", gap:10, marginTop:8, flexWrap:"wrap" }}>
              {tier.perks.map((p,i) => (
                <span key={i} style={{ fontFamily:"monospace", fontSize:7, color:tier.color, background:`${tier.color}0F`, border:`1px solid ${tier.color}25`, padding:"2px 8px", letterSpacing:".07em" }}>✓ {p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? "16px 14px" : "24px 28px", maxWidth:900, margin:"0 auto" }}>

        {/* ── QUICK ACTIONS ────────────────────────────────────────────── */}
        <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".3em", marginBottom:10 }}>QUICK ACCESS</div>
        <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap:8, marginBottom:28 }}>
          {QUICK_ACTIONS.map(q => (
            <div key={q.tab} onClick={() => setTab && setTab(q.tab)}
              style={{
                padding:"16px 14px", background:bw ? T.surf : `${q.color}08`,
                border:`1px solid ${bw ? T.border : q.color + "33"}`,
                cursor:"pointer", transition:"all .18s",
              }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{q.icon}</div>
              <div style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:13, color: bw ? T.text : q.color, marginBottom:3 }}>{q.title}</div>
              <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".07em" }}>{q.sub}</div>
            </div>
          ))}
        </div>

        {/* ── CERTIFICATION TRACKS ─────────────────────────────────────── */}
        <div style={{ marginBottom:28 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".3em" }}>10 CERTIFICATION TRACKS</div>
            <div onClick={() => setTab && setTab("certs")}
              style={{ fontFamily:"monospace", fontSize:8, color:T.a, cursor:"pointer", letterSpacing:".1em" }}>VIEW ALL →</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(5,1fr)", gap:6 }}>
            {TRACKS_PREVIEW.map(tr => (
              <div key={tr.name} onClick={() => setTab && setTab("certs")}
                style={{ padding:"10px 10px", background:bw ? T.surf : `${tr.color}07`, border:`1px solid ${bw ? T.border : tr.color + "28"}`, cursor:"pointer", textAlign:"center" }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{tr.icon}</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:10, fontWeight:600, color: bw ? T.text : tr.color, lineHeight:1.35 }}>{tr.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AMBASSADOR TIERS ─────────────────────────────────────────── */}
        <div style={{ marginBottom:28 }}>
          <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".3em", marginBottom:10 }}>AMBASSADOR TIERS</div>
          <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap:8 }}>
            {TIERS.map(t => {
              const active = tier.id === t.id;
              return (
                <div key={t.id} style={{
                  padding:"14px 12px",
                  background: active ? (bw ? T.surf : `${t.color}12`) : (bw ? T.bg : "transparent"),
                  border:`${active ? 2 : 1}px solid ${active ? t.color : T.border}`,
                  position:"relative"
                }}>
                  {active && (
                    <div style={{ position:"absolute", top:6, right:8, fontFamily:"monospace", fontSize:6, color:t.color, letterSpacing:".1em" }}>YOU ARE HERE</div>
                  )}
                  <div style={{ fontSize:22, marginBottom:5 }}>{t.emoji}</div>
                  <div style={{ fontFamily:"monospace", fontSize:8, color:t.color, letterSpacing:".12em", marginBottom:3 }}>{t.label.toUpperCase()}</div>
                  <div style={{ fontFamily:"monospace", fontSize:9, color:T.muted, marginBottom:7 }}>{t.req} cert{t.req > 1 ? "s" : ""} required</div>
                  {t.perks.map((p,i) => (
                    <div key={i} style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:10, color:T.muted, lineHeight:1.5, marginBottom:2 }}>· {p}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── NFC WEAR-TO-EARN ─────────────────────────────────────────── */}
        <div style={{ marginBottom:28 }}>
          <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".3em", marginBottom:10 }}>NFC WEAR-TO-EARN · HOW IT WORKS</div>
          <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap:8 }}>
            {NFC_STEPS.map(s => (
              <div key={s.n} style={{ padding:"14px 12px", background:bw ? T.surf : T.inputBg, border:`1px solid ${T.border}` }}>
                <div style={{ fontFamily:"monospace", fontWeight:900, fontSize:22, color:T.a, marginBottom:6, opacity:.3 }}>{s.n}</div>
                <div style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:13, color:T.text, marginBottom:5 }}>{s.title}</div>
                <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11, color:T.muted, lineHeight:1.6 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── $BYT TOKEN ───────────────────────────────────────────────── */}
        <div style={{ padding:"18px 20px", background:bw ? T.surf : "rgba(212,168,67,.04)", border:`1px solid ${T.border}`, marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div style={{ flex:1, minWidth:220 }}>
              <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".3em", marginBottom:6 }}>$BYT TOKEN · SOLANA BLOCKCHAIN</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize: mob ? 16 : 20, fontWeight:700, color:T.a, marginBottom:8 }}>Earn While You Learn</div>
              <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:12, color:T.muted, lineHeight:1.7, maxWidth:400 }}>
                $BYT is the native token of the BYT ecosystem. Complete modules, host workshops,
                tap your NFC garment, and earn $BYT that lives in your Phantom wallet on Solana.
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {[["Complete module","5 $BYT"],["Pass exam","25 $BYT"],["Earn cert","100 $BYT"],["Host workshop","50 $BYT"],["NFC tap","1 $BYT"]].map(([act,earn]) => (
                <div key={act} style={{ display:"flex", justifyContent:"space-between", gap:20, padding:"5px 10px", background:bw ? T.bg : T.inputBg, border:`1px solid ${T.borderSoft}` }}>
                  <span style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".07em" }}>{act}</span>
                  <span style={{ fontFamily:"monospace", fontSize:8, color:T.a, fontWeight:700 }}>{earn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MISSION ──────────────────────────────────────────────────── */}
        <div style={{ padding:"20px", background:bw ? T.surf : "transparent", border:`1px solid ${T.borderSoft}`, textAlign:"center" }}>
          <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, letterSpacing:".4em", marginBottom:8 }}>THE MISSION</div>
          <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize: mob ? 14 : 17, color:T.text, lineHeight:1.8, maxWidth:600, margin:"0 auto", marginBottom:12 }}>
            "We exist to bridge the wealth gap through education, technology, and community.
            Every certification earned, every workshop hosted, every NFC tap is a step toward
            generational transformation."
          </div>
          <div style={{ fontFamily:"monospace", fontSize:8, color:T.a, letterSpacing:".2em" }}>
            — CHRIS GODDREN · FOUNDER, VEDD TECHNOLOGIES LLC
          </div>
        </div>

        <div style={{ height:32 }} />
      </div>
    </div>
  );
}
