import { useState } from "react";

const SAVE_KEY = "byt_grants_v1";
const load = () => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}"); } catch { return {}; } };
const save = d => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch {} };

const GRANT_TYPES = [
  {
    id: "wioa", name: "DOL WIOA", emoji: "💼",
    amount: "$25K–$500K", color: "#60A5FA",
    agency: "U.S. Department of Labor",
    deadline: "Rolling / annual",
    desc: "Workforce Innovation and Opportunity Act — largest federal workforce training funding source.",
    fields: ["org_name","org_mission","target_pop","program_desc","outcomes","budget"],
    template: (f) => `WORKFORCE INNOVATION AND OPPORTUNITY ACT (WIOA)
Title II / Section 166 — Application

ORGANIZATION: ${f.org_name || "[Organization Name]"}
DATE: June 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.org_name || "[Org]"} respectfully requests $${f.budget || "75,000"} from the Department of Labor under the Workforce Innovation and Opportunity Act to fund workforce development programming serving ${f.target_pop || "underserved adults in Tulsa, Oklahoma"}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORGANIZATIONAL MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.org_mission || "BYT Academy (Be Ye Transformed) is a 501(c)(3) nonprofit delivering financial literacy and workforce development education to underserved communities in Tulsa, Oklahoma, through a technology-enabled certification platform combined with community-based learning cohorts."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TARGET POPULATION & NEED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.target_pop || "Our target population includes unemployed and underemployed adults in Tulsa's northside and east communities, where the poverty rate exceeds 28% — nearly 3x the national average. Tulsa County has 47,000 individuals lacking post-secondary credentials. Our program directly addresses this gap by providing industry-recognized certifications at zero cost to participants."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROGRAM DESCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.program_desc || "BYT Academy delivers 10 workforce certification tracks covering Trading & Markets, Technology, Real Estate, Business Building, Skilled Trades, and more. Participants complete self-paced digital modules, community workshops facilitated by trained ambassadors, field projects demonstrating applied skills, and proctored examinations. Successful graduates receive digital certifications recognized by employer partners and are equipped with practical wealth-building skills."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEASURABLE OUTCOMES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.outcomes || `Year 1 Outcomes:
• 200 participants enrolled in certification programs
• 150 participants (75%) complete at least one certification track
• 100 participants (50%) demonstrate applied skill competency via field projects
• 50 participants launch income-generating activities within 90 days of completion
• 25 participants become community workshop facilitators
• Average participant income increase: $8,000-$15,000 annually`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET NARRATIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Requested: $${f.budget || "75,000"}

Personnel (45%): $${Math.round((parseInt(f.budget)||75000)*.45).toLocaleString()}
• Program Director (0.5 FTE): Oversees curriculum, partnerships, and participant support
• Community Outreach Coordinator (0.75 FTE): Recruits participants and manages ambassador network

Technology & Platform (20%): $${Math.round((parseInt(f.budget)||75000)*.20).toLocaleString()}
• BYT Academy platform licensing and NFC learning materials
• Device lending program for participants without smartphones

Community Workshops (20%): $${Math.round((parseInt(f.budget)||75000)*.20).toLocaleString()}
• Venue rental, materials, and facilitator stipends
• Target: 24 workshops across 12 months

Participant Supports (15%): $${Math.round((parseInt(f.budget)||75000)*.15).toLocaleString()}
• Transportation assistance and childcare vouchers to remove participation barriers
• Emergency micro-grants for participants facing acute financial crises`
  },
  {
    id: "cdbg", name: "CDBG", emoji: "🏙️",
    amount: "$50K–$200K", color: "#4ADE80",
    agency: "City of Tulsa / HUD",
    deadline: "Annual cycle — applications due October",
    desc: "Community Development Block Grant — HUD funding via City of Tulsa for community development projects.",
    fields: ["org_name","org_mission","target_pop","program_desc","outcomes","budget"],
    template: (f) => `COMMUNITY DEVELOPMENT BLOCK GRANT (CDBG)
City of Tulsa Application — Program Year 2026

ORGANIZATION: ${f.org_name || "BYT Academy / VEDD Technologies LLC"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project Title: BYT Academy Financial Literacy & Workforce Certification Program
Funding Requested: $${f.budget || "100,000"}
Project Duration: 12 months
Primary Service Area: North Tulsa / East Tulsa (LMI census tracts)

National Objective: Benefit low-to-moderate income (LMI) persons
CDBG Category: Public Services / Economic Development

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMUNITY NEED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.target_pop || "Census tracts 18, 21, 22, and 25 in north Tulsa have poverty rates of 32-41%, placing them among the most economically distressed communities in Oklahoma. Over 65% of residents in these tracts are LMI-qualified. The area faces a persistent wealth gap rooted in historical redlining, lack of financial education, and limited access to wealth-building resources. BYT Academy directly addresses these root causes through accessible, technology-enabled education delivered in community settings."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROGRAM DESCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.program_desc || "BYT Academy will deliver financial literacy certifications and economic mobility programming to 300 LMI residents over 12 months. The program combines online self-paced learning with in-person community workshops held at partner churches, libraries, and community centers in the primary service area. Participants earn industry-recognized certificates in financial literacy, entrepreneurship, technology, and skilled trades pathways."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERFORMANCE MEASURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.outcomes || `• Unduplicated LMI beneficiaries served: 300
• Certifications awarded: 200
• Participants starting businesses or increasing income: 75
• Workshops hosted in LMI census tracts: 36
• LMI percentage of participants: 85%+`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total CDBG Request: $${f.budget || "100,000"}
Matching Funds: $25,000 (DOL WIOA pre-award)

Personnel: 50% | Technology: 20% | Community Programs: 20% | Admin: 10%`
  },
  {
    id: "nsf", name: "NSF IUSE", emoji: "🔬",
    amount: "$150K–$300K", color: "#A78BFA",
    agency: "National Science Foundation",
    deadline: "January / October annually",
    desc: "Improving Undergraduate STEM Education — for programs with educational technology and STEM content.",
    fields: ["org_name","org_mission","target_pop","program_desc","outcomes","budget"],
    template: (f) => `NATIONAL SCIENCE FOUNDATION
Improving Undergraduate STEM Education (IUSE)

Proposal Title: BYT Academy: Technology-Mediated STEM Pathways for Underrepresented Communities
Requested Amount: $${f.budget || "200,000"}
Duration: 24 months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT ABSTRACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.org_name || "BYT Academy"} proposes a 24-month mixed-methods study and implementation project to develop, deploy, and evaluate technology-mediated STEM learning pathways for underrepresented adults in Tulsa, Oklahoma. Our approach integrates blockchain-based credential verification, mobile-first learning design, and community-embedded instruction to address barriers to STEM education access.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTELLECTUAL MERIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.program_desc || "This project advances knowledge in three dimensions: (1) the effectiveness of blockchain credential systems in motivating adult learners, (2) the role of community ambassador models in sustaining STEM learning engagement, and (3) the intersection of financial incentive structures ($BYT token rewards) with intrinsic motivation in non-traditional learners. Findings will be disseminated through peer-reviewed publication and open-source curriculum release."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BROADER IMPACTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.outcomes || `• Reach 500 underrepresented adults with STEM certification pathways
• Train 50 community STEM educators via the Ambassador program
• Open-source all curriculum under Creative Commons license
• Publish 2+ peer-reviewed papers on outcomes
• Establish replication model for 3 additional cities in Year 2`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET JUSTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total NSF Request: $${f.budget || "200,000"}

Research Personnel (40%): PI time, research assistants, data analyst
Curriculum Development (25%): STEM track content, assessment design, localization
Technology Infrastructure (20%): Platform development, blockchain integration, device lending
Evaluation (10%): External evaluator, survey instruments, data analysis
Dissemination (5%): Conference travel, open-access publication fees`
  },
  {
    id: "smallbiz", name: "OK Small Business", emoji: "🌟",
    amount: "$10K–$50K", color: "#F59E0B",
    agency: "Oklahoma Dept of Commerce",
    deadline: "Rolling quarterly",
    desc: "Oklahoma Small Business Development grant for social enterprises and community-serving businesses.",
    fields: ["org_name","org_mission","target_pop","program_desc","outcomes","budget"],
    template: (f) => `OKLAHOMA DEPARTMENT OF COMMERCE
Small Business Grant Application

Business Name: ${f.org_name || "VEDD Technologies LLC"}
Grant Amount Requested: $${f.budget || "25,000"}
Business Type: Social Enterprise / EdTech

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS DESCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.org_mission || "VEDD Technologies LLC operates BYT Academy, an educational technology platform providing financial literacy and workforce certifications to underserved communities in Tulsa, Oklahoma. As a social enterprise, we generate revenue through platform subscriptions and NFC merchandise while reinvesting all surplus into community programming. Our nonprofit affiliate, BYT Community Wealth Foundation, provides supplementary grant-funded programming."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMUNITY IMPACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.target_pop || "BYT Academy primarily serves residents of north and east Tulsa — communities historically underserved by traditional financial institutions and educational systems. 78% of our participants identify as people of color. 65% are first-generation entrepreneurs or investors. Our program directly addresses Oklahoma's workforce development priorities by creating a pipeline of certified, skilled community members."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USE OF FUNDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$${f.budget || "25,000"} will fund:
${f.program_desc || `• Platform technology development: $10,000
• Community workshop expansion (12 new locations): $8,000
• NFC ambassador starter kits (50 units): $4,000
• Marketing and outreach: $3,000`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXPECTED OUTCOMES (12 months)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${f.outcomes || `• Create 2 full-time equivalent jobs
• Serve 250+ community members
• Generate $150,000+ in platform revenue
• Award 150+ certifications
• Partner with 5 Tulsa employers for graduate placement`}`
  },
];

const EXTRA_TRACKS = [
  {
    id: "ambassador_adv", icon: "🤝", color: "#D4A843", name: "Advanced Ambassador Leadership",
    desc: "Chapter leadership, workshop facilitation, community organizing, and scaling your ambassador impact.",
    modules: [
      "Chapter Leadership Fundamentals",
      "Running High-Impact Workshops",
      "Community Organizing Strategy",
      "Building Your Ambassador Team",
      "Measuring Community Impact"
    ]
  },
  {
    id: "tax", icon: "📊", color: "#60A5FA", name: "Tax Strategy & Accounting",
    desc: "Business deductions, S-corp election, self-employment tax, bookkeeping, and working with CPAs.",
    modules: [
      "Understanding Self-Employment Taxes",
      "LLC vs S-Corp: When to Switch",
      "Top 25 Business Deductions",
      "QuickBooks & Bookkeeping Basics",
      "Working with a CPA Effectively"
    ]
  },
  {
    id: "marketing", icon: "📣", color: "#FB923C", name: "Digital Marketing & Brand",
    desc: "Social media strategy, content creation, personal brand, email marketing, and community growth.",
    modules: [
      "Personal Branding 101",
      "Instagram & TikTok for Educators",
      "Email List Building from Zero",
      "Content Calendar Strategy",
      "Converting Followers to Community"
    ]
  },
  {
    id: "legal", icon: "⚖️", color: "#A78BFA", name: "Legal Foundations",
    desc: "Contracts, IP protection, nonprofit compliance, entity selection, and protecting your business.",
    modules: [
      "Entity Selection: LLC vs Corp vs Nonprofit",
      "Contracts Every Business Owner Needs",
      "Intellectual Property Basics",
      "Nonprofit Compliance (IRS, State)",
      "When to Hire a Business Attorney"
    ]
  },
  {
    id: "wellness_wealth", icon: "🧘", color: "#2DD4BF", name: "Wealth Psychology",
    desc: "Money mindset, breaking scarcity thinking, generational trauma, and building an abundance identity.",
    modules: [
      "The Scarcity Mindset & How to Break It",
      "Generational Money Trauma",
      "Building an Abundance Identity",
      "Financial Therapy Fundamentals",
      "Passing Wealth Mindset to Your Children"
    ]
  },
];

const FIELD_LABELS = {
  org_name:    "Organization / Business Name",
  org_mission: "Mission Statement & Background",
  target_pop:  "Target Population & Community Need",
  program_desc:"Program Description & Activities",
  outcomes:    "Expected Outcomes & Metrics",
  budget:      "Grant Amount Requested ($)",
};

export default function TracksGrants({ theme }) {
  const T = theme || { bg:"#05050A", surf:"#0D0B1A", a:"#D4A843", text:"#F5F0E8", muted:"rgba(212,168,67,.45)", border:"rgba(212,168,67,.15)", borderSoft:"rgba(212,168,67,.07)", inputBg:"rgba(212,168,67,.06)", green:"#4ADE80", name:"gold" };
  const bw = T.name === "bw";

  const [saved,     setSaved]    = useState(() => load());
  const [section,   setSection]  = useState("grants");
  const [grantType, setGrantType]= useState("wioa");
  const [fields,    setFields]   = useState({ org_name:"BYT Academy / VEDD Technologies LLC", budget:"75000" });
  const [generated, setGenerated]= useState(false);
  const [copied,    setCopied]   = useState(false);
  const [saved_g,   setSaved_g]  = useState({});
  const [mob,       setMob]      = useState(window.innerWidth < 768);

  const grant = GRANT_TYPES.find(g => g.id === grantType);
  const output = grant ? grant.template(fields) : "";

  function handleField(k, v) { setFields(f => ({ ...f, [k]: v })); setGenerated(false); }

  function generate() { setGenerated(true); }

  function copyText() {
    navigator.clipboard?.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  }

  function saveGrant() {
    const ns = { ...saved, [grantType]: fields };
    setSaved(ns);
    save(ns);
    setSaved_g(g => ({ ...g, [grantType]: true }));
    setTimeout(() => setSaved_g(g => ({ ...g, [grantType]: false })), 2000);
  }

  const SECTIONS = [["grants","💰 Grant Writer"],["tracks","📋 5 Extra Tracks"]];

  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.text, fontFamily:"Georgia,serif" }}>

      {/* Header */}
      <div style={{ padding:"16px 18px 0", background:T.surf, borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:"monospace", fontSize:8, letterSpacing:".35em", color:T.muted, marginBottom:4 }}>BYT ACADEMY</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize:20, color:T.a, marginBottom:10 }}>Tracks & Grants</h1>
        <div style={{ display:"flex", gap:0 }}>
          {SECTIONS.map(([id, lbl]) => (
            <button key={id} onClick={() => setSection(id)}
              style={{ padding:"9px 16px", fontFamily:"monospace", fontSize:8, letterSpacing:".1em", cursor:"pointer", background:section===id ? T.inputBg : "transparent", border:"none", borderBottom:`2px solid ${section===id ? T.a : "transparent"}`, color:section===id ? T.a : T.muted }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRANT WRITER ─────────────────────────────────────────────── */}
      {section === "grants" && (
        <div style={{ padding: mob ? "14px 12px" : "20px 24px", maxWidth:1000, margin:"0 auto" }}>

          <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".25em", marginBottom:12 }}>
            AI-ASSISTED GRANT WRITER — SELECT GRANT TYPE, FILL FIELDS, GENERATE
          </div>

          {/* Grant type selector */}
          <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap:6, marginBottom:20 }}>
            {GRANT_TYPES.map(g => (
              <div key={g.id} onClick={() => { setGrantType(g.id); setGenerated(false); }}
                style={{ padding:"12px 12px", background: grantType===g.id ? (bw ? T.surf : `${g.color}12`) : (bw ? T.bg : "transparent"), border:`${grantType===g.id ? 2 : 1}px solid ${grantType===g.id ? g.color : T.border}`, cursor:"pointer", transition:"all .15s" }}>
                <div style={{ fontSize:20, marginBottom:4 }}>{g.emoji}</div>
                <div style={{ fontFamily:"monospace", fontWeight:700, fontSize:9, color:grantType===g.id ? g.color : T.text, letterSpacing:".1em" }}>{g.name}</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:10, color: bw ? T.muted : g.color, marginTop:2 }}>{g.amount}</div>
                <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginTop:3, lineHeight:1.4 }}>{g.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: mob ? "block" : "grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

            {/* Input form */}
            <div>
              <div style={{ fontFamily:"monospace", fontSize:8, color:grant?.color, letterSpacing:".2em", marginBottom:10 }}>
                {grant?.emoji} {grant?.name} — {grant?.agency}
              </div>
              <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginBottom:12 }}>Deadline: {grant?.deadline}</div>

              {grant?.fields.map(fk => (
                <div key={fk} style={{ marginBottom:12 }}>
                  <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".1em", marginBottom:5 }}>{FIELD_LABELS[fk]?.toUpperCase()}</div>
                  {fk === "budget" ? (
                    <input value={fields[fk] || ""} onChange={e => handleField(fk, e.target.value)}
                      placeholder="e.g. 75000"
                      style={{ width:"100%", padding:"8px 12px", background: bw ? T.bg : T.inputBg, border:`1px solid ${T.border}`, color:T.text, fontFamily:"monospace", fontSize:12, outline:"none" }} />
                  ) : (
                    <textarea value={fields[fk] || ""} onChange={e => handleField(fk, e.target.value)}
                      rows={fk === "org_name" ? 1 : 3}
                      placeholder={FIELD_LABELS[fk]}
                      style={{ width:"100%", padding:"8px 12px", background: bw ? T.bg : T.inputBg, border:`1px solid ${T.border}`, color:T.text, fontFamily:"Georgia,serif", fontSize:11, outline:"none", resize:"vertical", lineHeight:1.6 }} />
                  )}
                </div>
              ))}

              <div style={{ display:"flex", gap:8 }}>
                <button onClick={generate}
                  style={{ flex:1, padding:"11px 16px", background: bw ? "#0A0A0A" : T.a, color: bw ? "#fff" : "#05050A", fontFamily:"monospace", fontSize:9, letterSpacing:".15em", border:"none", cursor:"pointer" }}>
                  ✦ GENERATE DRAFT
                </button>
                <button onClick={saveGrant}
                  style={{ padding:"11px 14px", background:"transparent", color:saved_g[grantType] ? T.green : T.muted, border:`1px solid ${T.border}`, fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>
                  {saved_g[grantType] ? "SAVED ✓" : "SAVE"}
                </button>
              </div>
            </div>

            {/* Output */}
            <div style={{ marginTop: mob ? 16 : 0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".2em" }}>GRANT DRAFT OUTPUT</div>
                {generated && (
                  <button onClick={copyText}
                    style={{ fontFamily:"monospace", fontSize:7, color: copied ? T.green : T.a, background:"transparent", border:`1px solid ${copied ? T.green : T.border}`, padding:"4px 10px", cursor:"pointer", letterSpacing:".1em" }}>
                    {copied ? "COPIED ✓" : "COPY ALL"}
                  </button>
                )}
              </div>
              <div style={{ background: bw ? T.surf : "rgba(0,0,0,.25)", border:`1px solid ${T.border}`, minHeight:400, padding:"14px 16px", position:"relative" }}>
                {!generated ? (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:360, gap:10, color:T.muted }}>
                    <span style={{ fontSize:32 }}>📄</span>
                    <div style={{ fontFamily:"monospace", fontSize:9, color:T.muted, letterSpacing:".15em", textAlign:"center" }}>
                      FILL FIELDS &amp; CLICK<br />"GENERATE DRAFT"
                    </div>
                  </div>
                ) : (
                  <pre style={{ fontFamily:"monospace", fontSize:10, color:T.text, whiteSpace:"pre-wrap", lineHeight:1.7, margin:0 }}>{output}</pre>
                )}
              </div>
              {generated && (
                <div style={{ marginTop:8, padding:"8px 12px", background: bw ? T.surf : "rgba(212,168,67,.04)", border:`1px solid ${T.borderSoft}` }}>
                  <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, lineHeight:1.6 }}>
                    ⚡ AI-GENERATED DRAFT — Review and personalize before submitting. Add specific local statistics, partner names, and real outcome data. Every fact must be verified.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── EXTRA TRACKS ─────────────────────────────────────────────── */}
      {section === "tracks" && (
        <div style={{ padding: mob ? "14px 12px" : "20px 24px", maxWidth:900, margin:"0 auto" }}>
          <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".25em", marginBottom:16 }}>
            5 ADDITIONAL TRACKS — COMPLEMENT YOUR CORE CERTIFICATIONS
          </div>
          {EXTRA_TRACKS.map(tr => (
            <div key={tr.id} style={{ marginBottom:12, padding:"16px 18px", background: bw ? T.surf : `${tr.color}07`, border:`1px solid ${bw ? T.border : tr.color + "33"}`, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, bottom:0, width:4, background:tr.color }} />
              <div style={{ display:"flex", alignItems:"flex-start", gap:14, flexWrap:"wrap" }}>
                <span style={{ fontSize:28, flexShrink:0 }}>{tr.icon}</span>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontFamily:"monospace", fontSize:8, color:tr.color, letterSpacing:".12em", marginBottom:3 }}>TRACK</div>
                  <div style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:16, color:T.text, marginBottom:4 }}>{tr.name}</div>
                  <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11, color:T.muted, marginBottom:10 }}>{tr.desc}</div>
                  <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap:4 }}>
                    {tr.modules.map((m, i) => (
                      <div key={i} style={{ display:"flex", gap:6, padding:"5px 8px", background: bw ? T.bg : T.inputBg, border:`1px solid ${T.borderSoft}` }}>
                        <span style={{ color:tr.color, fontSize:9, flexShrink:0, marginTop:1 }}>◆</span>
                        <span style={{ fontFamily:"Georgia,serif", fontSize:11, color:T.muted }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flexShrink:0, textAlign:"right" }}>
                  <div style={{ fontFamily:"monospace", fontSize:7, color:tr.color, letterSpacing:".1em", marginBottom:4 }}>5 MODULES</div>
                  <div style={{ padding:"5px 12px", background: bw ? T.bg : `${tr.color}12`, border:`1px solid ${tr.color}40`, fontFamily:"monospace", fontSize:7, color:tr.color, letterSpacing:".1em" }}>COMING SOON</div>
                </div>
              </div>
            </div>
          ))}

          {/* Grant calendar */}
          <div style={{ marginTop:24 }}>
            <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted, letterSpacing:".25em", marginBottom:12 }}>GRANT DEADLINE CALENDAR — 2026</div>
            <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap:8 }}>
              {[
                { date:"Jun 16-20", name:"WIOA Pre-Award Calls",    amount:"$25K-500K", color:"#60A5FA", urgent:true },
                { date:"Jul 14",    name:"First Grant Disbursement", amount:"$25K-100K", color:"#4ADE80", urgent:true },
                { date:"Jul 31",    name:"CDBG Tulsa Submission",    amount:"$50K-200K", color:"#4ADE80" },
                { date:"Aug 7",     name:"DOL WIOA Full Application", amount:"$25K-500K", color:"#60A5FA" },
                { date:"Aug 13",    name:"NSF IUSE Letter of Intent", amount:"$150K-300K", color:"#A78BFA" },
                { date:"Aug 22",    name:"OK Small Business Grant",   amount:"$10K-50K",  color:"#F59E0B" },
                { date:"Oct 2026",  name:"CDBG FY2027 Annual Cycle",  amount:"$50K-200K", color:"#4ADE80" },
                { date:"Jan 2027",  name:"NSF IUSE Full Proposal",    amount:"$150K-300K", color:"#A78BFA" },
              ].map((g, i) => (
                <div key={i} style={{ padding:"10px 14px", background: bw ? T.surf : T.inputBg, border:`1px solid ${g.urgent ? g.color + "44" : T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
                  <div>
                    {g.urgent && <span style={{ fontFamily:"monospace", fontSize:6, color:"#F87171", background:"rgba(248,113,113,.1)", border:"1px solid rgba(248,113,113,.25)", padding:"1px 5px", letterSpacing:".1em", marginRight:6 }}>URGENT</span>}
                    <div style={{ fontFamily:"Georgia,serif", fontWeight:600, fontSize:12, color:T.text, marginTop:g.urgent ? 3 : 0 }}>{g.name}</div>
                    <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginTop:2 }}>{g.date}</div>
                  </div>
                  <div style={{ fontFamily:"monospace", fontSize:9, color:g.color, textAlign:"right", flexShrink:0 }}>{g.amount}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height:32 }} />
        </div>
      )}
    </div>
  );
}
