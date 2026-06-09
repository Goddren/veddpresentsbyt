import { useState, useEffect } from "react";

const G = "#D4A843", DARK = "#05050A", SURF = "#0D0B1A";

const SAVE_KEY = "byt_calendar_v1";
const load = () => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}"); } catch { return {}; } };
const save = d => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch {} };

const PHASES = [
  {
    id: "phase1", label: "Phase 1", title: "Legal Foundation",
    subtitle: "LLC · EIN · Nonprofit · Bank Account",
    color: "#60A5FA", emoji: "🏛️",
    period: "Week 1–2 · June 2026",
    budget: "$325 from AT&T paycheck",
    note: "Only money YOU spend. Everything after this is grant-funded.",
    weeks: [
      {
        week: 1, title: "Core Legal Setup",
        days: [
          { id: "w1d1", day: "Mon", date: "Jun 9", task: "File VEDD Technologies LLC with Oklahoma Secretary of State", detail: "oklahoma.gov/sos — costs $50. Takes 24-48hrs.", cat: "Legal", urgent: true },
          { id: "w1d2", day: "Tue", date: "Jun 10", task: "Apply for EIN (Employer Identification Number) from IRS", detail: "Go to IRS.gov/EIN — free, instant approval online.", cat: "Legal", urgent: true },
          { id: "w1d3", day: "Wed", date: "Jun 11", task: "Open VEDD Technologies business bank account", detail: "Bring LLC approval + EIN. Chase Business or Capital One Spark.", cat: "Banking", urgent: true },
          { id: "w1d4", day: "Thu", date: "Jun 12", task: "File Form 1023-EZ for 501(c)(3) nonprofit status", detail: "IRS.gov — $275 fee. Creates 'BYT Community Wealth Foundation'.", cat: "Legal", urgent: true },
          { id: "w1d5", day: "Fri", date: "Jun 13", task: "Schedule free SCORE mentor consultation", detail: "score.org — Free business mentoring. Ask about shelf corps + grants.", cat: "Strategy" },
        ]
      },
      {
        week: 2, title: "Pre-Award Grant Calls",
        days: [
          { id: "w2d1", day: "Mon", date: "Jun 16", task: "Call Tulsa Workforce Development Board — WIOA pre-award", detail: "Say: 'I'm launching a nonprofit workforce training platform. Do you have prelim awards for $50K-$100K?' Get a pre-award letter.", cat: "Grants", urgent: true },
          { id: "w2d2", day: "Tue", date: "Jun 17", task: "Call City of Tulsa Community Development — CDBG pre-award", detail: "Same script. Ask for $50K-$200K prelim approval letter.", cat: "Grants", urgent: true },
          { id: "w2d3", day: "Wed", date: "Jun 18", task: "Call Oklahoma Dept of Commerce — Small Business grant", detail: "Ask about $25K-$50K working capital grants for social enterprises.", cat: "Grants" },
          { id: "w2d4", day: "Thu", date: "Jun 19", task: "Call Community Foundation of Tulsa — operational grant", detail: "Ask about $10K-$25K for nonprofit operations. Quick turnaround.", cat: "Grants" },
          { id: "w2d5", day: "Fri", date: "Jun 20", task: "Collect all pre-award letters received this week", detail: "These letters are your collateral for shelf corp credit strategy.", cat: "Grants" },
        ]
      }
    ]
  },
  {
    id: "phase2", label: "Phase 2", title: "Thomas Montgomery Strategy",
    subtitle: "Shelf Corps · Net-30 Vendors · Business Credit 700+",
    color: "#F59E0B", emoji: "💳",
    period: "Week 3–6 · July 2026",
    budget: "$1,500-3,000 from first grant disbursement",
    note: "Use pre-award letters as collateral. Pay vendors with grant money when it arrives.",
    weeks: [
      {
        week: 3, title: "Shelf Corporations Setup",
        days: [
          { id: "w3d1", day: "Mon", date: "Jun 23", task: "Hire business credit specialist (free SCORE or $300-500)", detail: "Find someone who knows the Thomas Montgomery aged shelf corp method.", cat: "Credit", urgent: true },
          { id: "w3d2", day: "Tue", date: "Jun 24", task: "Order 3 aged shelf corporations (3-5 year history)", detail: "Use Corpnet.com or IncFile. $300-500 per corp. Paid from grant.", cat: "Credit", urgent: true },
          { id: "w3d3", day: "Wed", date: "Jun 25", task: "Credit specialist calls Uline — get Net-30 account approved", detail: "Present LLC + pre-award letters as collateral. Target $5K-10K limit.", cat: "Credit" },
          { id: "w3d4", day: "Thu", date: "Jun 26", task: "Credit specialist calls Quill + Grainger — Net-30 approvals", detail: "Same process. Target $3K-5K each.", cat: "Credit" },
          { id: "w3d5", day: "Fri", date: "Jun 27", task: "Credit specialist calls Crown + Systemax — Net-30 approvals", detail: "5 total vendor accounts = strong credit foundation.", cat: "Credit" },
        ]
      },
      {
        week: 4, title: "First Net-30 Orders",
        days: [
          { id: "w4d1", day: "Mon", date: "Jun 30", task: "Place $3K order at Uline (shipping/packaging supplies)", detail: "On Net-30 terms. Do NOT pay yet. Grant will pay on day 25.", cat: "Credit" },
          { id: "w4d2", day: "Tue", date: "Jul 1", task: "Place $3K order at Quill (office supplies + software)", detail: "On Net-30 terms. Establishes second trade line.", cat: "Credit" },
          { id: "w4d3", day: "Wed", date: "Jul 2", task: "Place $3K order at Grainger (equipment/supplies)", detail: "On Net-30 terms. Third trade line.", cat: "Credit" },
          { id: "w4d4", day: "Thu", date: "Jul 3", task: "Place $3K order at Crown + $3K at Systemax", detail: "Now have $15K in Net-30 orders across 5 vendors. All grant-funded.", cat: "Credit" },
          { id: "w4d5", day: "Fri", date: "Jul 4", task: "Document all orders + due dates in spreadsheet", detail: "Track: vendor, amount, due date (day 30). Pay on day 25 for perfect score.", cat: "Admin" },
        ]
      },
      {
        week: 5, title: "Aged Corps Activated",
        days: [
          { id: "w5d1", day: "Mon", date: "Jul 7", task: "Receive aged shelf corp documents — become authorized rep", detail: "Sign paperwork. You are now authorized rep on all 3 aged companies.", cat: "Credit", urgent: true },
          { id: "w5d2", day: "Tue", date: "Jul 8", task: "Hire backend developer ($3K-5K from grant)", detail: "Post on Upwork or local dev. Scope: Supabase, auth, wallet integration, admin.", cat: "Tech", urgent: true },
          { id: "w5d3", day: "Wed", date: "Jul 9", task: "Shelf Corp #1 — open 3 new vendor Net-30 accounts", detail: "Using 5-year history. Get $10K-15K in new vendor credit.", cat: "Credit" },
          { id: "w5d4", day: "Thu", date: "Jul 10", task: "Shelf Corp #2 — open 2 new vendor Net-30 accounts", detail: "4-year history. Get $8K-10K more in vendor credit.", cat: "Credit" },
          { id: "w5d5", day: "Fri", date: "Jul 11", task: "Shelf Corp #3 — open 2 new vendor Net-30 accounts", detail: "3-year history. Now $40K+ total across all entities.", cat: "Credit" },
        ]
      },
      {
        week: 6, title: "First Grant Disbursement",
        days: [
          { id: "w6d1", day: "Mon", date: "Jul 14", task: "First grant hits nonprofit bank account ($25K-100K)", detail: "DOL WIOA or CDBG pre-award converts to real funding. Check balance.", cat: "Grants", urgent: true },
          { id: "w6d2", day: "Tue", date: "Jul 15", task: "Pay ALL Net-30 invoices on day 25 (before they're due)", detail: "Pay every vendor early. This establishes perfect payment history.", cat: "Credit", urgent: true },
          { id: "w6d3", day: "Wed", date: "Jul 16", task: "Check business credit scores for all entities", detail: "Use Nav.com or DUNS. All should be 680-720+.", cat: "Credit" },
          { id: "w6d4", day: "Thu", date: "Jul 17", task: "Apply for Brex business credit card ($25K-50K limit)", detail: "Use grant revenue + credit history. No personal guarantee.", cat: "Credit" },
          { id: "w6d5", day: "Fri", date: "Jul 18", task: "Apply for Amex Blue Business Cash card", detail: "Second business credit card. Use for operating expenses.", cat: "Credit" },
        ]
      }
    ]
  },
  {
    id: "phase3", label: "Phase 3", title: "Tech + Product Build",
    subtitle: "Backend · Wallet Integration · NFC Garments",
    color: "#A78BFA", emoji: "⚙️",
    period: "Week 7–10 · July–August 2026",
    budget: "Fully grant-funded",
    note: "Developer hired. Manufacturing ordered. All paid from grant.",
    weeks: [
      {
        week: 7, title: "Backend Development Starts",
        days: [
          { id: "w7d1", day: "Mon", date: "Jul 21", task: "Developer starts: Supabase PostgreSQL database setup", detail: "User schema: name, email, tier, certs, $BYT balance, wallet address.", cat: "Tech" },
          { id: "w7d2", day: "Tue", date: "Jul 22", task: "Developer builds: user registration + JWT auth", detail: "Email + password signup. JWT tokens for sessions.", cat: "Tech" },
          { id: "w7d3", day: "Wed", date: "Jul 23", task: "Get manufacturing quotes: 3 NFC chip suppliers", detail: "Target NTAG424 DNA chips. Budget: $0.50-1.00 per chip. Order 500.", cat: "Product" },
          { id: "w7d4", day: "Thu", date: "Jul 24", task: "Get manufacturing quotes: 3 apparel manufacturers", detail: "Target: $3-5 per garment. 200 pilot garments. Screen print.", cat: "Product" },
          { id: "w7d5", day: "Fri", date: "Jul 25", task: "Select NFC + apparel partners. Place pilot order", detail: "200 garments + 500 NFC chips. Net-30 terms. Grant-funded.", cat: "Product", urgent: true },
        ]
      },
      {
        week: 8, title: "Nonprofit Approved + Dev Progress",
        days: [
          { id: "w8d1", day: "Mon", date: "Jul 28", task: "Receive IRS 501(c)(3) approval letter", detail: "Filed week 1. Usually 2-3 weeks. Now officially a nonprofit.", cat: "Legal", urgent: true },
          { id: "w8d2", day: "Tue", date: "Jul 29", task: "Open nonprofit bank account (no fees)", detail: "Bring IRS letter + EIN. All grants go here from now on.", cat: "Banking" },
          { id: "w8d3", day: "Wed", date: "Jul 30", task: "Developer: Phantom wallet SDK integration", detail: "Real wallet connects. Read Solana balances via Helius RPC.", cat: "Tech" },
          { id: "w8d4", day: "Thu", date: "Jul 31", task: "Submit CDBG grant application to City of Tulsa", detail: "Use Claude AI grant writer in BYT platform. Target $50K-200K.", cat: "Grants", urgent: true },
          { id: "w8d5", day: "Fri", date: "Aug 1", task: "Hire nonprofit bookkeeper ($300-500/mo from grant)", detail: "Track grant disbursements, vendor payments, Form 990 compliance.", cat: "Admin" },
        ]
      },
      {
        week: 9, title: "NFC Manufacturing + DOL Grant",
        days: [
          { id: "w9d1", day: "Mon", date: "Aug 4", task: "Developer: Admin dashboard for Chris (CEO view)", detail: "See all users, approve certs, issue $BYT, track analytics.", cat: "Tech" },
          { id: "w9d2", day: "Tue", date: "Aug 5", task: "Developer: NFC encoding backend system", detail: "API endpoint that programs chips with unique IDs + ambassador data.", cat: "Tech" },
          { id: "w9d3", day: "Wed", date: "Aug 6", task: "Manufacturing update: NFC chips + garments in production", detail: "4-6 week lead time. Follow up with manufacturer.", cat: "Product" },
          { id: "w9d4", day: "Thu", date: "Aug 7", task: "Submit DOL WIOA grant application", detail: "Largest potential: $25K-$500K. Use Claude AI grant writer.", cat: "Grants", urgent: true },
          { id: "w9d5", day: "Fri", date: "Aug 8", task: "QA testing with 5 beta users (friends/family)", detail: "Test: module completion, quiz flow, $BYT earning, wallet connect.", cat: "Tech" },
        ]
      },
      {
        week: 10, title: "Deploy + First Inventory",
        days: [
          { id: "w10d1", day: "Mon", date: "Aug 11", task: "Deploy backend to Render.com (free tier)", detail: "Node.js API live. Connect to Supabase database.", cat: "Tech", urgent: true },
          { id: "w10d2", day: "Tue", date: "Aug 12", task: "Deploy frontend to Vercel (free tier)", detail: "BYT platform live at byt-platform.vercel.app", cat: "Tech", urgent: true },
          { id: "w10d3", day: "Wed", date: "Aug 13", task: "Submit NSF IUSE grant for STEM education track", detail: "Target $150K-$300K. Longer review but highest education funding.", cat: "Grants" },
          { id: "w10d4", day: "Thu", date: "Aug 14", task: "200 NFC garments arrive from manufacturer", detail: "QC check: test NFC tap on 10 samples. All should open app.", cat: "Product", urgent: true },
          { id: "w10d5", day: "Fri", date: "Aug 15", task: "Set up Stripe donation page on nonprofit site", detail: "1.4% fee for nonprofits. Link to BYT platform giving section.", cat: "Fundraising" },
        ]
      }
    ]
  },
  {
    id: "phase4", label: "Phase 4", title: "Launch + Scale",
    subtitle: "Beta Launch · 50 Ambassadors · Grant Approvals",
    color: "#4ADE80", emoji: "🚀",
    period: "Week 11–12 · August 2026",
    budget: "Revenue + grants funding all operations",
    note: "Soft launch first. Fix bugs. Then public launch.",
    weeks: [
      {
        week: 11, title: "Beta Launch",
        days: [
          { id: "w11d1", day: "Mon", date: "Aug 18", task: "Ship 10 NFC garments to first beta ambassadors", detail: "Include welcome kit: QR setup guide, $BYT explainer, workshop guide.", cat: "Launch", urgent: true },
          { id: "w11d2", day: "Tue", date: "Aug 19", task: "Onboard beta ambassadors into platform", detail: "Walk them through: register, connect wallet, complete first module, earn $BYT.", cat: "Launch" },
          { id: "w11d3", day: "Wed", date: "Aug 20", task: "Collect feedback: NFC tap success rate, module UX, $BYT flow", detail: "Google Form or direct calls. Fix top 3 bugs immediately.", cat: "Launch" },
          { id: "w11d4", day: "Thu", date: "Aug 21", task: "Fix bugs from beta feedback", detail: "Developer on call. Prioritize: NFC not tapping, module not saving, $BYT not showing.", cat: "Tech" },
          { id: "w11d5", day: "Fri", date: "Aug 22", task: "Submit Oklahoma Small Business grant ($10K-50K)", detail: "State level — faster approval than federal. Quick cash win.", cat: "Grants" },
        ]
      },
      {
        week: 12, title: "Public Launch",
        days: [
          { id: "w12d1", day: "Mon", date: "Aug 25", task: "Post launch announcement on Instagram + Twitter", detail: "Video: scan NFC shirt → app opens → $BYT earned. Show the magic moment.", cat: "Marketing", urgent: true },
          { id: "w12d2", day: "Tue", date: "Aug 26", task: "Invite first 50 ambassadors to onboard", detail: "DM your network. Anyone interested in financial literacy education.", cat: "Marketing" },
          { id: "w12d3", day: "Wed", date: "Aug 27", task: "Go live on Product Hunt and LinkedIn", detail: "BYT Academy product page. Tag Tulsa business community.", cat: "Marketing" },
          { id: "w12d4", day: "Thu", date: "Aug 28", task: "Produce 3 Instagram Reels: NFC tap, module walkthrough, APEX planner", detail: "Show don't tell. The NFC tap video alone will go viral.", cat: "Marketing" },
          { id: "w12d5", day: "Fri", date: "Aug 29", task: "Week 12 review: metrics check + month 4 planning", detail: "Check: users registered, modules completed, $BYT earned, grants pending.", cat: "Admin" },
        ]
      }
    ]
  }
];

const MILESTONES = [
  { id:"m1",  date:"Jun 9",  title:"LLC Filed",              emoji:"🏛️", color:"#60A5FA", phase:"phase1" },
  { id:"m2",  date:"Jun 10", title:"EIN Received",           emoji:"📋", color:"#60A5FA", phase:"phase1" },
  { id:"m3",  date:"Jun 12", title:"Nonprofit Filed",        emoji:"🙏", color:"#60A5FA", phase:"phase1" },
  { id:"m4",  date:"Jun 20", title:"Pre-Award Letters",      emoji:"✉️", color:"#F59E0B", phase:"phase2" },
  { id:"m5",  date:"Jun 24", title:"Shelf Corps Ordered",    emoji:"💳", color:"#F59E0B", phase:"phase2" },
  { id:"m6",  date:"Jun 30", title:"5 Net-30 Accounts",      emoji:"🏦", color:"#F59E0B", phase:"phase2" },
  { id:"m7",  date:"Jul 8",  title:"Developer Hired",        emoji:"💻", color:"#A78BFA", phase:"phase3" },
  { id:"m8",  date:"Jul 14", title:"First Grant Hits",       emoji:"💰", color:"#4ADE80", phase:"phase2" },
  { id:"m9",  date:"Jul 15", title:"700+ Credit Score",      emoji:"📈", color:"#F59E0B", phase:"phase2" },
  { id:"m10", date:"Jul 25", title:"NFC Order Placed",       emoji:"👕", color:"#A78BFA", phase:"phase3" },
  { id:"m11", date:"Jul 29", title:"Nonprofit Approved",     emoji:"✅", color:"#4ADE80", phase:"phase3" },
  { id:"m12", date:"Jul 31", title:"CDBG Grant Submitted",   emoji:"📝", color:"#4ADE80", phase:"phase3" },
  { id:"m13", date:"Aug 7",  title:"WIOA Grant Submitted",   emoji:"📝", color:"#4ADE80", phase:"phase3" },
  { id:"m14", date:"Aug 11", title:"Platform Goes Live",     emoji:"🚀", color:"#4ADE80", phase:"phase4" },
  { id:"m15", date:"Aug 14", title:"NFC Garments Arrive",    emoji:"👕", color:"#4ADE80", phase:"phase4" },
  { id:"m16", date:"Aug 18", title:"Beta Launch",            emoji:"🎯", color:"#4ADE80", phase:"phase4" },
  { id:"m17", date:"Aug 25", title:"PUBLIC LAUNCH",          emoji:"🌟", color:"#D4A843", phase:"phase4" },
];

const YEAR_PLAN = [
  {
    year: "Year 1", period: "Sep 2026 – Aug 2027", color: "#60A5FA",
    quarters: [
      {
        q: "Q4 2026", months: "Sep–Nov", title: "Scale Foundation",
        goals: [
          "Reach 200+ registered users",
          "50+ active ambassadors across Tulsa",
          "CDBG grant approval ($50K-200K)",
          "DOL WIOA grant approval ($100K+)",
          "1,000 NFC garments produced",
          "5+ workshops hosted by ambassadors",
          "$BYT token deployed to Solana mainnet",
        ]
      },
      {
        q: "Q1 2027", months: "Dec–Feb", title: "Multi-City Expansion",
        goals: [
          "Expand to 3 new cities beyond Tulsa",
          "500+ registered users",
          "NSF IUSE grant approval ($150K-300K)",
          "Launch corporate partnership program",
          "Ambassador city chapter leaders appointed",
          "10+ tracks fully built and live",
          "Monthly donation revenue $5K+",
        ]
      },
      {
        q: "Q2 2027", months: "Mar–May", title: "Revenue + New Tracks",
        goals: [
          "Launch premium certification tracks",
          "1,000+ registered users",
          "3 new grant applications submitted",
          "Merchandise revenue stream live",
          "Community foundation partnership",
          "Video content library (50+ lessons)",
          "Hire first full-time team member",
        ]
      },
      {
        q: "Q3 2027", months: "Jun–Aug", title: "Year 1 Review",
        goals: [
          "2,000+ registered users",
          "200+ certified ambassadors",
          "$500K+ in total grants awarded",
          "NFC garments in 5+ cities",
          "Annual community summit hosted",
          "Year 2 strategic plan finalized",
          "Series A fundraising research begins",
        ]
      }
    ]
  },
  {
    year: "Year 2", period: "Sep 2027 – Aug 2028", color: "#F59E0B",
    quarters: [
      {
        q: "Q4 2027", months: "Sep–Nov", title: "National Expansion",
        goals: [
          "Expand to 10 cities nationwide",
          "5,000+ registered users",
          "Federal workforce grant ($500K+)",
          "Corporate sponsorship program ($100K+)",
          "Second full-time hire",
          "Mobile app launch (iOS + Android)",
          "National ambassador conference",
        ]
      },
      {
        q: "Q1 2028", months: "Dec–Feb", title: "Revenue Diversification",
        goals: [
          "10,000+ registered users",
          "B2B licensing to HBCUs and community colleges",
          "White-label platform for other nonprofits",
          "Merchandise line: 10+ SKUs",
          "Podcast / media presence launched",
          "$1M+ total grant funding received",
          "SEC compliance review completed",
        ]
      },
      {
        q: "Q2 2028", months: "Mar–May", title: "Series A Prep",
        goals: [
          "Prepare investor pitch deck",
          "Engage crypto securities attorney",
          "Series A fundraising: $2M-$5M target",
          "Token listing on Raydium/Jupiter (DEX)",
          "Partnership with major financial institution",
          "15,000+ users",
          "50 city ambassador chapters",
        ]
      },
      {
        q: "Q3 2028", months: "Jun–Aug", title: "Year 2 Review + IPO Prep",
        goals: [
          "20,000+ registered users",
          "$1B valuation milestone analysis",
          "Series A round closed",
          "Legal structure: dual entity (LLC + nonprofit)",
          "Annual report published",
          "Board of Directors formally appointed",
          "Year 3 expansion plan: 100 cities",
        ]
      }
    ]
  },
  {
    year: "Year 3", period: "Sep 2028 – Aug 2029", color: "#4ADE80",
    quarters: [
      {
        q: "Q4 2028", months: "Sep–Nov", title: "National Brand",
        goals: [
          "50,000+ registered users",
          "100 city chapters",
          "National media coverage",
          "$5M+ annual grant revenue",
          "University partnerships (20+)",
          "International expansion research",
          "Token listed on major exchange",
        ]
      },
      {
        q: "Q1–Q4 2029", months: "2029 Full Year", title: "$1B Valuation + IPO",
        goals: [
          "100,000+ registered users",
          "Series B fundraising ($10M-$25M)",
          "IPO preparation begins",
          "$1B+ platform valuation",
          "National financial literacy legislation advocacy",
          "BYT Academy accreditation",
          "Legacy wealth fund for community members",
        ]
      }
    ]
  }
];

const CAT_COLORS = {
  Legal: "#60A5FA", Banking: "#34D399", Grants: "#4ADE80",
  Credit: "#F59E0B", Tech: "#A78BFA", Product: "#FB923C",
  Marketing: "#F87171", Admin: "#D4A843", Launch: "#2DD4BF",
  Fundraising: "#FBBF24", Strategy: "#C084FC"
};

export default function Calendar() {
  const [saved,       setSaved]      = useState(() => load());
  const [view,        setView]       = useState("today");
  const [selPhase,    setSelPhase]   = useState("phase1");
  const [catFilter,   setCatFilter]  = useState("All");
  const [mob,         setMob]        = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const done = saved.done || {};

  function toggle(id) {
    const nd = { ...done, [id]: !done[id] };
    const ns = { ...saved, done: nd };
    setSaved(ns);
    save(ns);
  }

  const allTasks = PHASES.flatMap(p => p.weeks.flatMap(w => w.days));
  const totalDone = allTasks.filter(t => done[t.id]).length;
  const pct = Math.round((totalDone / allTasks.length) * 100);

  const todayTasks = allTasks.filter(t => !done[t.id]).slice(0, 5);
  const urgentTasks = allTasks.filter(t => t.urgent && !done[t.id]);
  const phase = PHASES.find(p => p.id === selPhase);
  const cats = ["All", ...Object.keys(CAT_COLORS)];

  function TaskCard({ task, compact }) {
    const isDone = done[task.id];
    return (
      <div onClick={() => toggle(task.id)}
        style={{
          display: "flex", gap: 10, padding: compact ? "10px 12px" : "14px 16px",
          background: isDone ? "rgba(74,222,128,.05)" : "rgba(212,168,67,.04)",
          border: `1px solid ${isDone ? "rgba(74,222,128,.2)" : "rgba(212,168,67,.1)"}`,
          cursor: "pointer", transition: "all .18s", marginBottom: 6,
          opacity: isDone ? .55 : 1
        }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
          background: isDone ? "rgba(74,222,128,.2)" : "rgba(212,168,67,.08)",
          border: `2px solid ${isDone ? "#4ADE80" : "rgba(212,168,67,.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: isDone ? "#4ADE80" : "transparent"
        }}>✓</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: compact ? 1 : 3, flexWrap: "wrap" }}>
            {task.urgent && !isDone && (
              <span style={{ fontFamily: "monospace", fontSize: 6, color: "#F87171", background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.25)", padding: "1px 6px", letterSpacing: ".1em" }}>URGENT</span>
            )}
            {task.cat && (
              <span style={{ fontFamily: "monospace", fontSize: 6, color: CAT_COLORS[task.cat] || G, background: `${CAT_COLORS[task.cat] || G}12`, border: `1px solid ${CAT_COLORS[task.cat] || G}30`, padding: "1px 6px", letterSpacing: ".08em" }}>{task.cat}</span>
            )}
            {task.date && <span style={{ fontFamily: "monospace", fontSize: 7, color: "rgba(212,168,67,.4)" }}>{task.date}</span>}
          </div>
          <div style={{
            fontFamily: "Georgia,serif", fontSize: compact ? 12 : 13, fontWeight: 600,
            color: isDone ? "#4ADE80" : "#F5F0E8",
            textDecoration: isDone ? "line-through" : "none", lineHeight: 1.4, marginBottom: compact ? 0 : 3
          }}>{task.task}</div>
          {!compact && task.detail && (
            <div style={{ fontSize: 11, color: "#C8BEA8", opacity: .65, lineHeight: 1.55 }}>{task.detail}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#05050A", minHeight: "100vh", color: "#F5F0E8", fontFamily: "Georgia,serif", maxWidth: 780, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:rgba(212,168,67,.2);}
        body{background:#05050A;}
      `}</style>

      <div style={{ padding: "18px 18px 12px", background: "linear-gradient(180deg,#0D0520,#05050A)", borderBottom: "1px solid rgba(212,168,67,.1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: ".45em", color: "rgba(212,168,67,.4)", marginBottom: 4 }}>VEDD TECHNOLOGIES · BYT PLATFORM</div>
            <h1 style={{ fontFamily: "Cinzel,Georgia,serif", fontSize: mob ? 18 : 22, fontWeight: 900, color: G, lineHeight: 1.2 }}>Strategic Roadmap Calendar</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(212,168,67,.45)", marginBottom: 3 }}>OVERALL PROGRESS</div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 22, color: G }}>{pct}%</div>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(212,168,67,.4)" }}>{totalDone}/{allTasks.length} tasks</div>
          </div>
        </div>
        <div style={{ height: 4, background: "rgba(212,168,67,.08)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: `linear-gradient(to right,#F59E0B,${G})`, width: `${pct}%`, borderRadius: 2, transition: "width .5s" }} />
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid rgba(212,168,67,.08)", overflowX: "auto", scrollbarWidth: "none" }}>
        {[["today", "📋 Today's Tasks"], ["phases", "📅 90-Day Plan"], ["milestones", "🎯 Milestones"], ["yearplan", "🗓️ 1-3 Year Plan"]].map(([id, lbl]) => (
          <button key={id} onClick={() => setView(id)}
            style={{
              flex: 1, minWidth: mob ? 80 : 100, padding: "11px 8px",
              background: view === id ? "rgba(212,168,67,.08)" : "transparent",
              border: "none", borderBottom: `2px solid ${view === id ? G : "transparent"}`,
              color: view === id ? G : "rgba(212,168,67,.45)",
              fontFamily: "monospace", fontSize: mob ? 7 : 8, letterSpacing: ".08em", cursor: "pointer", whiteSpace: "nowrap"
            }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: "16px 18px" }}>

        {view === "today" && (
          <>
            {urgentTasks.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: "#F87171", letterSpacing: ".28em", textTransform: "uppercase", marginBottom: 8 }}>⚡ URGENT — DO THESE FIRST</div>
                {urgentTasks.slice(0, 3).map(t => <TaskCard key={t.id} task={t} />)}
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: G, letterSpacing: ".28em", textTransform: "uppercase", marginBottom: 8 }}>📋 YOUR NEXT 5 TASKS</div>
              {todayTasks.length > 0
                ? todayTasks.map(t => <TaskCard key={t.id} task={t} />)
                : <div style={{ padding: "20px", textAlign: "center", color: "rgba(212,168,67,.4)", fontFamily: "monospace", fontSize: 12 }}>🎉 All tasks complete!</div>
              }
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: G, letterSpacing: ".28em", textTransform: "uppercase", marginBottom: 10 }}>📊 PHASE PROGRESS</div>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap: 6 }}>
              {PHASES.map(p => {
                const pTasks = p.weeks.flatMap(w => w.days);
                const pDone = pTasks.filter(t => done[t.id]).length;
                const pp = Math.round((pDone / pTasks.length) * 100);
                return (
                  <div key={p.id} onClick={() => { setSelPhase(p.id); setView("phases"); }}
                    style={{ padding: "12px 10px", background: "rgba(212,168,67,.04)", border: `1px solid ${p.color}33`, cursor: "pointer" }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{p.emoji}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 7, color: p.color, letterSpacing: ".1em", marginBottom: 4 }}>{p.label}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 700, color: "#F5F0E8", marginBottom: 6, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ height: 3, background: "rgba(212,168,67,.08)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: p.color, width: `${pp}%`, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 8, color: p.color, marginTop: 3 }}>{pp}% · {pDone}/{pTasks.length}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "phases" && (
          <>
            <div style={{ display: "flex", gap: 5, marginBottom: 14, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
              {PHASES.map(p => (
                <button key={p.id} onClick={() => setSelPhase(p.id)}
                  style={{
                    background: selPhase === p.id ? `${p.color}18` : "transparent",
                    border: `1px solid ${selPhase === p.id ? p.color : "rgba(212,168,67,.12)"}`,
                    color: selPhase === p.id ? p.color : "rgba(212,168,67,.5)",
                    fontFamily: "monospace", fontSize: 8, letterSpacing: ".08em",
                    padding: "6px 12px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                    display: "flex", alignItems: "center", gap: 5
                  }}>
                  <span>{p.emoji}</span>{p.label}: {p.title}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, marginBottom: 14, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  style={{
                    background: catFilter === c ? `${CAT_COLORS[c] || G}18` : "transparent",
                    border: `1px solid ${catFilter === c ? (CAT_COLORS[c] || G) : "rgba(212,168,67,.1)"}`,
                    color: catFilter === c ? (CAT_COLORS[c] || G) : "rgba(212,168,67,.4)",
                    fontFamily: "monospace", fontSize: 7, padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
                  }}>{c}</button>
              ))}
            </div>
            {phase && (
              <>
                <div style={{ padding: "14px 16px", background: `${phase.color}0A`, border: `1px solid ${phase.color}33`, marginBottom: 14, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: phase.color }} />
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: 8, color: phase.color, letterSpacing: ".25em", marginBottom: 4 }}>{phase.period}</div>
                      <div style={{ fontFamily: "Cinzel,Georgia,serif", fontSize: mob ? 16 : 19, fontWeight: 900, color: "#F5F0E8", marginBottom: 3 }}>{phase.emoji} {phase.title}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(212,168,67,.5)" }}>{phase.subtitle}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 7, color: "rgba(212,168,67,.4)", marginBottom: 2 }}>BUDGET</div>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#4ADE80" }}>{phase.budget}</div>
                    </div>
                  </div>
                  {phase.note && (
                    <div style={{ marginTop: 8, padding: "7px 10px", background: "rgba(212,168,67,.06)", border: "1px solid rgba(212,168,67,.12)", fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 11, color: "rgba(212,168,67,.7)" }}>
                      💡 {phase.note}
                    </div>
                  )}
                </div>
                {phase.weeks.map(week => {
                  const filtered = catFilter === "All" ? week.days : week.days.filter(d => d.cat === catFilter);
                  if (filtered.length === 0) return null;
                  const wDone = week.days.filter(d => done[d.id]).length;
                  return (
                    <div key={week.week} style={{ marginBottom: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 8, color: G, letterSpacing: ".25em" }}>WEEK {week.week} — {week.title.toUpperCase()}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(212,168,67,.45)" }}>{wDone}/{week.days.length} done</div>
                      </div>
                      {filtered.map(t => <TaskCard key={t.id} task={t} />)}
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}

        {view === "milestones" && (
          <>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: G, letterSpacing: ".28em", textTransform: "uppercase", marginBottom: 14 }}>
              🎯 KEY MILESTONES — 90 DAY ROADMAP
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {MILESTONES.map(m => {
                const isDone = done[m.id];
                return (
                  <div key={m.id} onClick={() => toggle(m.id)}
                    style={{
                      display: "flex", gap: 12, padding: "12px 14px", cursor: "pointer",
                      background: isDone ? "rgba(74,222,128,.05)" : "rgba(212,168,67,.04)",
                      border: `1px solid ${isDone ? "rgba(74,222,128,.22)" : m.id === "m17" ? "rgba(212,168,67,.4)" : "rgba(212,168,67,.1)"}`,
                      transition: "all .18s"
                    }}>
                    <div style={{ fontSize: m.id === "m17" ? 28 : 22, flexShrink: 0, filter: isDone ? "none" : "grayscale(.4)" }}>{m.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "Georgia,serif", fontSize: m.id === "m17" ? 15 : 13, fontWeight: m.id === "m17" ? 900 : 700,
                        color: isDone ? "#4ADE80" : m.id === "m17" ? G : "#F5F0E8",
                        textDecoration: isDone ? "line-through" : "none", marginBottom: 2
                      }}>{m.title}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 7, color: m.color, letterSpacing: ".12em" }}>{m.date}</div>
                    </div>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0, alignSelf: "center",
                      background: isDone ? "rgba(74,222,128,.2)" : "rgba(212,168,67,.08)",
                      border: `2px solid ${isDone ? "#4ADE80" : "rgba(212,168,67,.25)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, color: isDone ? "#4ADE80" : "transparent"
                    }}>✓</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "yearplan" && (
          <>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: G, letterSpacing: ".28em", textTransform: "uppercase", marginBottom: 6 }}>🗓️ 1-3 YEAR STRATEGIC PLAN</div>
            <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 12, color: "rgba(212,168,67,.5)", marginBottom: 16, lineHeight: 1.6 }}>
              From $325 out of pocket today to $1B valuation by Year 3. Every step funded by grants and business credit — not your AT&T paycheck.
            </div>
            {YEAR_PLAN.map(year => (
              <div key={year.year} style={{ marginBottom: 22 }}>
                <div style={{ padding: "12px 14px", background: `${year.color}0D`, border: `1px solid ${year.color}33`, marginBottom: 10 }}>
                  <div style={{ fontFamily: "Cinzel,Georgia,serif", fontSize: mob ? 16 : 19, fontWeight: 900, color: year.color }}>{year.year}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(212,168,67,.5)", marginTop: 2 }}>{year.period}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 8 }}>
                  {year.quarters.map(q => (
                    <div key={q.q} style={{ background: "#0D0B1A", border: "1px solid rgba(212,168,67,.1)", padding: 14 }}>
                      <div style={{ fontFamily: "monospace", fontSize: 8, color: year.color, letterSpacing: ".2em", marginBottom: 2 }}>{q.q} · {q.months}</div>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: "#F5F0E8", marginBottom: 10 }}>{q.title}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {q.goals.map((g, i) => (
                          <div key={i} style={{ display: "flex", gap: 8, fontSize: 11, color: "#C8BEA8", lineHeight: 1.5 }}>
                            <span style={{ color: year.color, flexShrink: 0, marginTop: 1 }}>→</span>{g}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ padding: "18px 20px", background: "linear-gradient(135deg,rgba(212,168,67,.08),rgba(212,168,67,.03))", border: "1px solid rgba(212,168,67,.35)", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>💎</div>
              <div style={{ fontFamily: "Cinzel,Georgia,serif", fontSize: mob ? 18 : 22, fontWeight: 900, color: G, marginBottom: 6 }}>$1 Billion Valuation</div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(212,168,67,.5)", letterSpacing: ".2em", marginBottom: 10 }}>TARGET: 2028–2029</div>
              <div style={{ fontSize: 12, color: "#C8BEA8", lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
                Started with $325 from your AT&T paycheck. Built through grants, shelf corps, nonprofit status, and community wealth education. Every step documented. Every milestone hit. This is the BYT legacy.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
