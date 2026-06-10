import { useState, useRef, useEffect } from "react";

const SAVE_KEY = "byt_ai_keys_v1";
const CHAT_KEY = "byt_ai_chat_v1";
const loadKeys = () => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}"); } catch { return {}; } };
const saveKeys = d => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch {} };
const loadChat = () => { try { return JSON.parse(localStorage.getItem(CHAT_KEY) || "[]"); } catch { return []; } };
const saveChat = d => { try { localStorage.setItem(CHAT_KEY, JSON.stringify(d)); } catch {} };

const PROVIDERS = [
  {
    id: "groq", name: "Groq", emoji: "⚡", color: "#F59E0B",
    desc: "Fastest inference. Llama 3, Mixtral. Free tier available.",
    url: "https://api.groq.com/openai/v1/chat/completions",
    models: ["llama3-70b-8192", "llama3-8b-8192", "mixtral-8x7b-32768", "gemma2-9b-it"],
    keyLink: "console.groq.com/keys",
    keyPrefix: "gsk_",
    openAICompat: true,
  },
  {
    id: "openai", name: "OpenAI", emoji: "🤖", color: "#60A5FA",
    desc: "GPT-4o, GPT-4 Turbo, GPT-3.5. Industry standard.",
    url: "https://api.openai.com/v1/chat/completions",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"],
    keyLink: "platform.openai.com/api-keys",
    keyPrefix: "sk-",
    openAICompat: true,
  },
  {
    id: "claude", name: "Claude (Anthropic)", emoji: "✦", color: "#A78BFA",
    desc: "Best for long documents, analysis, and grant writing.",
    url: "https://api.anthropic.com/v1/messages",
    models: ["claude-sonnet-4-6", "claude-haiku-4-5-20251001", "claude-opus-4-8"],
    keyLink: "console.anthropic.com/settings/keys",
    keyPrefix: "sk-ant-",
    openAICompat: false,
    corsNote: "Requires a proxy for browser use. Works best server-side.",
  },
];

const BYT_SYSTEM = `You are the BYT Academy AI Assistant — a knowledgeable guide for the Be Ye Transformed platform by VEDD Technologies LLC in Tulsa, Oklahoma.

You help users with:
- Financial literacy education (trading, crypto, real estate, business, investing)
- ICT (Inner Circle Trader) concepts — Smart Money, Order Blocks, FVGs, Liquidity
- Grant writing for nonprofits (WIOA, CDBG, NSF IUSE, Oklahoma grants)
- Business credit building (Thomas Montgomery method, Net-30, shelf corps)
- Blockchain and Solana ecosystem
- BYT platform navigation and certification guidance
- Ambassador program and NFC wear-to-earn mechanics

Be concise, practical, and transformational. Use the BYT voice: direct, empowering, community-focused. Never give financial advice — educate and inform.`;

async function callGroqOrOpenAI(provider, apiKey, model, messages) {
  const res = await fetch(provider.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: BYT_SYSTEM }, ...messages],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callClaude(apiKey, model, messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      system: BYT_SYSTEM,
      messages,
      max_tokens: 1024,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

const STARTERS = [
  "Explain ICT Order Blocks and how to trade them",
  "Write me a WIOA grant application intro paragraph",
  "How do I build business credit from zero?",
  "What is the BRRRR method in real estate?",
  "How does the $BYT token earn system work?",
  "Explain Smart Money Concepts for a beginner",
];

export default function AIAgent({ theme }) {
  const T = theme || { bg:"#05050A", surf:"#0D0B1A", a:"#D4A843", text:"#F5F0E8", muted:"rgba(212,168,67,.45)", border:"rgba(212,168,67,.15)", borderSoft:"rgba(212,168,67,.07)", inputBg:"rgba(212,168,67,.06)", green:"#4ADE80", red:"#F87171", name:"gold" };
  const bw = T.name === "bw";

  const [keys,       setKeys]      = useState(() => loadKeys());
  const [messages,   setMessages]  = useState(() => loadChat());
  const [input,      setInput]     = useState("");
  const [loading,    setLoading]   = useState(false);
  const [error,      setError]     = useState("");
  const [section,    setSection]   = useState("chat");
  const [provider,   setProvider]  = useState("groq");
  const [model,      setModel]     = useState("llama3-70b-8192");
  const [showKey,    setShowKey]   = useState({});
  const [saved,      setSaved]     = useState(false);
  const [mob,        setMob]       = useState(window.innerWidth < 768);
  const bottomRef = useRef(null);

  const prov = PROVIDERS.find(p => p.id === provider);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  function saveKey(providerId, value) {
    const nk = { ...keys, [providerId]: value };
    setKeys(nk);
    saveKeys(nk);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function clearChat() {
    setMessages([]);
    saveChat([]);
    setError("");
  }

  async function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    const apiKey = keys[provider];
    if (!apiKey) { setError(`No API key for ${prov.name}. Add it in the Keys tab.`); return; }

    const userMsg = { role: "user", content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      let reply;
      if (provider === "claude") {
        reply = await callClaude(apiKey, model, newMessages);
      } else {
        reply = await callGroqOrOpenAI(prov, apiKey, model, newMessages);
      }
      const updated = [...newMessages, { role: "assistant", content: reply }];
      setMessages(updated);
      saveChat(updated);
    } catch (e) {
      setError(e.message || "Something went wrong. Check your API key.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const SECTIONS = [["chat","💬 Chat"],["keys","🔑 API Keys"],["about","ℹ️ About"]];

  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.text, fontFamily:"Georgia,serif", display:"flex", flexDirection:"column" }}>

      {/* Header */}
      <div style={{ padding:"14px 18px 0", background:T.surf, borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontFamily:"monospace", fontSize:8, letterSpacing:".35em", color:T.muted, marginBottom:3 }}>BYT ACADEMY</div>
            <h1 style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize:20, color:T.a }}>AI Agent</h1>
          </div>
          {/* Provider + model selector */}
          <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
            <select value={provider} onChange={e => { setProvider(e.target.value); setModel(PROVIDERS.find(p=>p.id===e.target.value)?.models[0]||""); }}
              style={{ background:T.inputBg, border:`1px solid ${T.border}`, color:T.text, fontFamily:"monospace", fontSize:8, padding:"5px 8px", letterSpacing:".08em" }}>
              {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>)}
            </select>
            <select value={model} onChange={e => setModel(e.target.value)}
              style={{ background:T.inputBg, border:`1px solid ${T.border}`, color:T.text, fontFamily:"monospace", fontSize:8, padding:"5px 8px", letterSpacing:".08em" }}>
              {prov?.models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {keys[provider] ? (
              <span style={{ fontFamily:"monospace", fontSize:7, color:T.green, border:`1px solid ${T.green}33`, padding:"3px 8px" }}>✓ KEY SET</span>
            ) : (
              <span style={{ fontFamily:"monospace", fontSize:7, color:T.red, border:`1px solid ${T.red}33`, padding:"3px 8px", cursor:"pointer" }} onClick={() => setSection("keys")}>⚠ NO KEY</span>
            )}
          </div>
        </div>
        <div style={{ display:"flex", gap:0, marginTop:10 }}>
          {SECTIONS.map(([id,lbl]) => (
            <button key={id} onClick={() => setSection(id)}
              style={{ padding:"9px 14px", fontFamily:"monospace", fontSize:8, letterSpacing:".1em", cursor:"pointer", background:section===id ? T.inputBg : "transparent", border:"none", borderBottom:`2px solid ${section===id ? T.a : "transparent"}`, color:section===id ? T.a : T.muted }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* ── CHAT ──────────────────────────────────────────────────────── */}
      {section === "chat" && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"16px 18px" }}>
            {messages.length === 0 && (
              <div>
                <div style={{ textAlign:"center", padding:"20px 0 24px" }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>✦</div>
                  <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:14, color:T.muted, marginBottom:4 }}>BYT AI Assistant</div>
                  <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".15em" }}>POWERED BY {prov?.name.toUpperCase()}</div>
                </div>
                <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".2em", marginBottom:10 }}>SUGGESTED QUESTIONS</div>
                <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap:6 }}>
                  {STARTERS.map(s => (
                    <div key={s} onClick={() => send(s)}
                      style={{ padding:"10px 14px", background:bw ? T.surf : T.inputBg, border:`1px solid ${T.border}`, cursor:"pointer", fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11, color:T.muted, lineHeight:1.5 }}>
                      "{s}"
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom:16, display:"flex", gap:10, flexDirection: m.role==="user" ? "row-reverse" : "row" }}>
                <div style={{
                  width:28, height:28, borderRadius:"50%", flexShrink:0,
                  background: m.role==="user" ? T.a : (bw ? "#0A0A0A" : "#1A0A40"),
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, color: m.role==="user" ? "#05050A" : T.a
                }}>
                  {m.role==="user" ? "U" : "✦"}
                </div>
                <div style={{
                  maxWidth:"75%", padding:"12px 14px",
                  background: m.role==="user" ? (bw ? "#0A0A0A" : `${T.a}18`) : (bw ? T.surf : "rgba(167,139,250,.08)"),
                  border:`1px solid ${m.role==="user" ? T.border : "rgba(167,139,250,.2)"}`,
                }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:13, lineHeight:1.75, color:T.text, whiteSpace:"pre-wrap" }}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display:"flex", gap:10, marginBottom:16 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:bw ? "#0A0A0A" : "#1A0A40", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:T.a }}>✦</div>
                <div style={{ padding:"12px 18px", background:bw ? T.surf : "rgba(167,139,250,.08)", border:"1px solid rgba(167,139,250,.2)" }}>
                  <div style={{ display:"flex", gap:5 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:T.a, animation:`pulse 1.2s ease infinite`, animationDelay:`${i*.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div style={{ padding:"10px 14px", background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.25)", fontFamily:"monospace", fontSize:10, color:"#F87171", marginBottom:12 }}>
                ⚠ {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div style={{ padding:"12px 18px", borderTop:`1px solid ${T.border}`, background:T.surf, flexShrink:0 }}>
            {messages.length > 0 && (
              <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:6 }}>
                <button onClick={clearChat}
                  style={{ fontFamily:"monospace", fontSize:7, color:T.muted, background:"transparent", border:`1px solid ${T.borderSoft}`, padding:"3px 10px", cursor:"pointer", letterSpacing:".1em" }}>
                  CLEAR CHAT
                </button>
              </div>
            )}
            <div style={{ display:"flex", gap:8 }}>
              <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Ask anything about BYT, trading, grants, crypto, real estate..."
                rows={2}
                style={{ flex:1, background:T.inputBg, border:`1px solid ${T.border}`, color:T.text, fontFamily:"Georgia,serif", fontSize:13, padding:"10px 12px", resize:"none", outline:"none", lineHeight:1.5 }} />
              <button onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{
                  padding:"0 18px", background: loading || !input.trim() ? T.borderSoft : T.a,
                  color: bw ? "#fff" : "#05050A", border:"none", cursor: loading || !input.trim() ? "default" : "pointer",
                  fontFamily:"monospace", fontSize:9, letterSpacing:".1em", flexShrink:0
                }}>
                {loading ? "..." : "SEND"}
              </button>
            </div>
            <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginTop:6, letterSpacing:".08em" }}>
              ENTER to send · SHIFT+ENTER for new line · Using {prov?.name} · {model}
            </div>
          </div>
        </div>
      )}

      {/* ── API KEYS ──────────────────────────────────────────────────── */}
      {section === "keys" && (
        <div style={{ padding:"20px 18px", maxWidth:700, margin:"0 auto", width:"100%" }}>
          <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".25em", marginBottom:16 }}>
            YOUR API KEYS ARE STORED LOCALLY IN YOUR BROWSER — NEVER SENT TO BYT SERVERS
          </div>

          {PROVIDERS.map(p => (
            <div key={p.id} style={{ marginBottom:14, padding:"16px 18px", background:bw ? T.surf : `${p.color}08`, border:`1px solid ${keys[p.id] ? p.color + "44" : T.border}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:10 }}>
                <div>
                  <span style={{ fontSize:20, marginRight:8 }}>{p.emoji}</span>
                  <span style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:15, color: keys[p.id] ? p.color : T.text }}>{p.name}</span>
                  {keys[p.id] && <span style={{ fontFamily:"monospace", fontSize:7, color:T.green, marginLeft:8, border:`1px solid ${T.green}33`, padding:"1px 6px" }}>✓ ACTIVE</span>}
                </div>
                <a href={`https://${p.keyLink}`} target="_blank" rel="noreferrer"
                  style={{ fontFamily:"monospace", fontSize:7, color:p.color, letterSpacing:".1em", textDecoration:"none", border:`1px solid ${p.color}33`, padding:"3px 8px" }}>
                  GET KEY →
                </a>
              </div>
              <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11, color:T.muted, marginBottom:8 }}>{p.desc}</div>
              {p.corsNote && (
                <div style={{ fontFamily:"monospace", fontSize:7, color:"#F59E0B", background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.2)", padding:"5px 8px", marginBottom:8 }}>
                  ⚠ {p.corsNote}
                </div>
              )}
              <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginBottom:5, letterSpacing:".1em" }}>
                API KEY {keys[p.id] ? "(SET — click to update)" : `(starts with ${p.keyPrefix}...)`}
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <input
                  type={showKey[p.id] ? "text" : "password"}
                  value={keys[p.id] || ""}
                  onChange={e => saveKey(p.id, e.target.value)}
                  placeholder={`${p.keyPrefix}...`}
                  style={{ flex:1, background:T.inputBg, border:`1px solid ${T.border}`, color:T.text, fontFamily:"monospace", fontSize:11, padding:"8px 12px", outline:"none" }}
                />
                <button onClick={() => setShowKey(s => ({ ...s, [p.id]: !s[p.id] }))}
                  style={{ padding:"8px 12px", background:"transparent", border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer", fontFamily:"monospace", fontSize:9 }}>
                  {showKey[p.id] ? "HIDE" : "SHOW"}
                </button>
                {keys[p.id] && (
                  <button onClick={() => saveKey(p.id, "")}
                    style={{ padding:"8px 10px", background:"transparent", border:`1px solid rgba(248,113,113,.3)`, color:"#F87171", cursor:"pointer", fontFamily:"monospace", fontSize:9 }}>
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}

          {saved && (
            <div style={{ fontFamily:"monospace", fontSize:9, color:T.green, letterSpacing:".15em", textAlign:"center", padding:"8px" }}>
              ✓ SAVED TO LOCAL STORAGE
            </div>
          )}
        </div>
      )}

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      {section === "about" && (
        <div style={{ padding:"20px 18px", maxWidth:600, margin:"0 auto" }}>
          <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".25em", marginBottom:16 }}>ABOUT BYT AI AGENT</div>

          {[
            { icon:"🔒", title:"Your Keys, Your Data", body:"API keys are stored only in your browser's localStorage. They never touch BYT servers. You own your AI access." },
            { icon:"⚡", title:"Groq — Fastest & Free", body:"Groq offers a free tier with fast Llama 3 and Mixtral models. Best starting point. Get a key at console.groq.com." },
            { icon:"🤖", title:"OpenAI GPT-4o", body:"Industry standard. Best for nuanced analysis and long-form content. Requires paid API access." },
            { icon:"✦", title:"Claude by Anthropic", body:"Best for long documents, grant writing, and deep analysis. Note: browser-direct calls may need CORS proxy. Best used server-side." },
            { icon:"📋", title:"Grant Writing Powered by AI", body:"The AI agent knows all BYT grant programs. Ask it to write WIOA, CDBG, NSF, or Oklahoma grant sections." },
            { icon:"📈", title:"Trading & Education", body:"Ask about ICT concepts, Smart Money, Order Blocks, FVGs, crypto analysis, or any BYT Academy topic." },
          ].map(item => (
            <div key={item.title} style={{ display:"flex", gap:12, marginBottom:14, padding:"12px 14px", background:bw ? T.surf : T.inputBg, border:`1px solid ${T.border}` }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:13, color:T.text, marginBottom:3 }}>{item.title}</div>
                <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11, color:T.muted, lineHeight:1.6 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
