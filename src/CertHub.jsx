import { useState, useEffect, useRef } from "react";

const CERT_SAVE_KEY = "byt_certs_v1";
const load = () => { try { return JSON.parse(localStorage.getItem(CERT_SAVE_KEY)||"{}"); } catch { return {}; } };
const save = d => { try { localStorage.setItem(CERT_SAVE_KEY,JSON.stringify(d)); } catch {} };

const G="#D4A843", DARK="#05050A", SURF="#0D0B1A";
const now = () => new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
const uid = () => "BYT-"+Math.random().toString(36).slice(2,8).toUpperCase();

const TIERS = {
  Foundation: { emoji:"🥉", color:"#CD7F32", bg:"rgba(205,127,50,.13)", mult:"1.5×", req:1,  title:"Foundation Ambassador",   rights:["Attend all BYT events","Access learning modules","Earn $BYT on all activities"] },
  Scholar:    { emoji:"🥈", color:"#C0C0C0", bg:"rgba(192,192,192,.1)", mult:"2×",   req:3,  title:"Scholar Ambassador",      rights:["All Foundation rights","Teach BYT introductory workshops","List on BYT Ambassador directory","Priority access to new features"] },
  Ambassador: { emoji:"🥇", color:"#D4A843", bg:"rgba(212,168,67,.13)", mult:"3×",   req:5,  title:"Certified Ambassador",    rights:["All Scholar rights","Host official BYT-branded events","Earn a flat introduction reward (single-level, per verified new member)","Access Ambassador operations hub","Eligible for federal grant co-authorship"] },
  Platinum:   { emoji:"💎", color:"#B4C7E7", bg:"rgba(180,199,231,.1)", mult:"5×",   req:10, title:"Platinum Ambassador",     rights:["All Ambassador rights","Lead city chapter","BYT Community Founding Partner network","Represent BYT at external partnerships","Eligible for BYT Community Advisory Council (volunteer, unpaid)"] },
};

const TRACKS = [
  {
    id:"origins",   num:1,  icon:"👕", color:"#D4A843",
    title:"Ambassador Origins",
    subtitle:"The BYT ecosystem, NFC wear-to-earn, and your ambassador role",
    category:"Foundation",
    certId:"BYT-ORIG",
    byt:200,
    modules:[
      {id:1, title:"The BYT Ecosystem Overview",           pts:20, desc:"NFC garments, $BYT token, wear-to-earn mechanics"},
      {id:2, title:"Your Ambassador Role & Responsibilities",pts:25, desc:"What it means to lead in your city"},
      {id:3, title:"Community Structure & Tiers",           pts:20, desc:"Foundation through Platinum — how to advance"},
      {id:4, title:"$BYT Tokenomics & Anti-Inflation",      pts:25, desc:"Supply, halving schedule, daily caps"},
      {id:5, title:"Setting Up Your Wallet",                pts:15, desc:"Phantom setup, seed phrase security, connecting to BYT"},
    ],
    fieldProject:"Host or attend one BYT community event and document it with photos",
    finalExam:{
      questions:[
        {q:"What is the NTAG424 DNA chip used for in BYT garments?",opts:["Bluetooth audio","Secure NFC wear-to-earn tracking","GPS location","Payment only"],a:1},
        {q:"What tier earns a 3× $BYT multiplier?",opts:["Foundation","Scholar","Ambassador","Platinum"],a:2},
        {q:"What is the total hard cap for $BYT supply?",opts:["100 million","500 million","1 billion","Unlimited"],a:2},
        {q:"What happens every 90 million tokens distributed?",opts:["Token burns","Supply doubles","Emission halves (like Bitcoin)","New tokens mint"],a:2},
        {q:"How should you NEVER store your seed phrase?",opts:["Paper in a safe","Memorized","As a screenshot or digital file","Engraved on metal"],a:2},
      ],
    },
    skills:["NFC/Web3 basics","Ecosystem navigation","Wallet security","Community leadership"],
    teaches:"BYT Ecosystem 101 workshops",
  },
  {
    id:"trading",   num:2,  icon:"📈", color:"#F59E0B",
    title:"Trading & Markets",
    subtitle:"Smart money concepts — order blocks, FVGs, and institutional trading",
    category:"Finance",
    certId:"BYT-TRADE",
    byt:300,
    modules:[
      {id:1, title:"Market Structure & Price Action",        pts:25, desc:"How markets move and why"},
      {id:2, title:"ICT Smart Money Concepts",               pts:30, desc:"Order blocks, FVGs, liquidity sweeps"},
      {id:3, title:"Session Timing & Kill Zones",            pts:20, desc:"London and NY sessions, best entry windows"},
      {id:4, title:"US30 & NAS100 Strategies",               pts:30, desc:"The two primary BYT trading instruments"},
      {id:5, title:"Risk Management & Prop Firm Rules",      pts:25, desc:"1-2% risk, prop firm compliance, journaling"},
      {id:6, title:"Trading Psychology",                     pts:20, desc:"Discipline, patience, emotional control"},
      {id:7, title:"Building Your Trading Journal",          pts:15, desc:"Tracking, reviewing, improving your edge"},
    ],
    fieldProject:"Complete 10 practice trades in a paper trading account and submit your journal",
    finalExam:{
      questions:[
        {q:"What is a Fair Value Gap (FVG)?",opts:["A chart pattern","Price zone left by fast moves with unfilled orders","A type of stop loss","An indicator"],a:1},
        {q:"When is the New York Kill Zone?",opts:["6-8am ET","9:30-11am ET","2-4pm ET","All day"],a:1},
        {q:"What is the safe risk per trade for prop firm accounts?",opts:["5-10%","20%","1-2%","No limit"],a:2},
        {q:"What does a Liquidity Sweep involve?",opts:["High volume days","Smart money triggering retail stops before reversing","Technical indicator signal","News-based movement"],a:1},
        {q:"Which instruments do BYT traders primarily focus on?",opts:["Forex pairs only","Bitcoin and Ethereum","US30 and NAS100","Individual stocks"],a:2},
      ],
    },
    skills:["ICT methodology","Chart reading","Risk management","Trade journaling","Teaching trading basics"],
    teaches:"Trading 101 and ICT Smart Money workshops",
  },
  {
    id:"crypto",    num:3,  icon:"🔗", color:"#A78BFA",
    title:"Crypto & Blockchain",
    subtitle:"Solana ecosystem, DeFi, $BYT token mechanics, and wallet security",
    category:"Finance",
    certId:"BYT-CRYPTO",
    byt:250,
    modules:[
      {id:1, title:"Blockchain Fundamentals",               pts:20, desc:"How blockchains work, why Solana"},
      {id:2, title:"Wallets, Keys & Security",              pts:25, desc:"Seed phrases, hardware wallets, best practices"},
      {id:3, title:"DeFi & Decentralized Exchanges",        pts:25, desc:"Jupiter, Raydium, liquidity pools"},
      {id:4, title:"Token Launches & Pump.fun",             pts:25, desc:"How $BYT launched, how to analyze tokens"},
      {id:5, title:"$BYT Ecosystem Deep Dive",              pts:30, desc:"Tokenomics, emission schedule, governance"},
      {id:6, title:"NFTs & Digital Ownership",              pts:15, desc:"Understanding digital assets"},
      {id:7, title:"Crypto Tax Basics",                     pts:20, desc:"What you owe, when, and how to track"},
    ],
    fieldProject:"Set up a Solana wallet, swap a token on Jupiter, and document the experience",
    finalExam:{
      questions:[
        {q:"Why did BYT choose the Solana blockchain?",opts:["Only option","Speed, low fees, and strong ecosystem","Most expensive","Best for gaming"],a:1},
        {q:"What is the most important wallet security rule?",opts:["Share with trusted family","Keep seed phrase offline and never digital","Use the same password everywhere","Enable 2FA only"],a:1},
        {q:"What is a DEX?",opts:["Decentralized Exchange — no intermediary","Digital Exchange — centralized","Document Exchange","Data Exchange"],a:0},
        {q:"What happened at $BYT's launch?",opts:["Sold on Coinbase","Listed on Binance","Launched on Pump.fun on Solana","Created on Ethereum"],a:2},
        {q:"When do you owe tax on crypto?",opts:["Only when you cash out to bank","When you sell, trade, or use crypto — it's a taxable event","Never","Only above $10,000"],a:1},
      ],
    },
    skills:["Solana ecosystem","DeFi navigation","Token analysis","Tax basics","Teaching crypto fundamentals"],
    teaches:"Crypto & Wallet Setup 101 workshops",
  },
  {
    id:"ai",        num:4,  icon:"🤖", color:"#2DD4BF",
    title:"Artificial Intelligence",
    subtitle:"Prompt engineering, AI tools for business, and community AI applications",
    category:"Technology",
    certId:"BYT-AI",
    byt:250,
    modules:[
      {id:1, title:"What is AI? Plain English",             pts:15, desc:"Demystifying AI for everyday people"},
      {id:2, title:"Prompt Engineering Fundamentals",       pts:25, desc:"Getting results from ChatGPT, Claude, and others"},
      {id:3, title:"AI Tools for Productivity",             pts:20, desc:"Automating work, writing, research"},
      {id:4, title:"AI for Small Business",                 pts:25, desc:"Marketing, customer service, operations"},
      {id:5, title:"Building AI-Powered Income Streams",    pts:30, desc:"Services you can offer using AI today"},
      {id:6, title:"AI Ethics & Community Impact",          pts:20, desc:"Bias, privacy, responsible use"},
      {id:7, title:"AI for Inner City Uplift",              pts:25, desc:"How AI levels the playing field for our community"},
    ],
    fieldProject:"Create an AI-powered tool or workflow that solves a real problem for someone in your community",
    finalExam:{
      questions:[
        {q:"What is prompt engineering?",opts:["Building AI hardware","Crafting inputs to get better outputs from AI models","Programming neural networks","Installing AI software"],a:1},
        {q:"What does AI hallucination mean?",opts:["AI dreams","Confident but factually incorrect AI output","Slow responses","Refusing requests"],a:1},
        {q:"Which is a real AI language model?",opts:["SolanaAI","BlockchainBot","Claude by Anthropic","CryptoGPT"],a:2},
        {q:"What is the BIGGEST practical use of AI for small businesses?",opts:["Replacing all employees","Automating repetitive tasks and content creation","Only for large companies","Playing games"],a:1},
        {q:"Why is AI important for inner-city communities specifically?",opts:["It's not relevant","Levels the playing field — giving free access to expert-level tools","Only for tech companies","Too complex to use"],a:1},
      ],
    },
    skills:["Prompt engineering","AI tools mastery","Business automation","Ethics","Teaching AI basics"],
    teaches:"AI Tools for Everyone workshops",
  },
  {
    id:"realestate",num:5,  icon:"🏘️", color:"#FB923C",
    title:"Real Estate Mastery",
    subtitle:"Investment fundamentals, creative financing, and building a portfolio",
    category:"Finance",
    certId:"BYT-REALTY",
    byt:300,
    modules:[
      {id:1, title:"Real Estate Investment Fundamentals",   pts:25, desc:"Cash flow, appreciation, ROI basics"},
      {id:2, title:"Types of Real Estate Investment",       pts:20, desc:"Rentals, flips, REITs, wholesaling"},
      {id:3, title:"Creative Financing Strategies",         pts:30, desc:"No-money-down, seller financing, partnerships"},
      {id:4, title:"Analyzing a Deal",                      pts:25, desc:"Cap rate, cash-on-cash, 1% rule"},
      {id:5, title:"Property Management Basics",            pts:20, desc:"Tenants, maintenance, systems"},
      {id:6, title:"Building Your First Portfolio",         pts:25, desc:"Starting with house hacking or a single rental"},
      {id:7, title:"Real Estate & Tax Strategy",            pts:20, desc:"Depreciation, 1031 exchange, LLCs"},
    ],
    fieldProject:"Analyze 3 real local properties using the deal analysis framework and present your findings",
    finalExam:{
      questions:[
        {q:"What is the 1% rule in real estate?",opts:["One property per year","Monthly rent should be ~1% of purchase price","Only invest 1% of savings","One bedroom per tenant"],a:1},
        {q:"What is house hacking?",opts:["Illegal modification","Living in one unit of a multi-family property and renting others to offset your mortgage","Flipping houses quickly","Online real estate scam"],a:1},
        {q:"What is a 1031 exchange?",opts:["Mortgage type","Tax-deferred way to sell and buy investment property","A credit score requirement","A property inspection"],a:1},
        {q:"What does cash-on-cash return measure?",opts:["Total property value","Annual cash flow divided by cash invested","Monthly mortgage payment","Property tax rate"],a:1},
        {q:"What is wholesaling real estate?",opts:["Selling bulk appliances","Finding properties under contract and assigning to buyers for a fee","Buying foreclosures only","A type of REIT"],a:1},
      ],
    },
    skills:["Deal analysis","Creative financing","Property management","Tax strategy","Teaching real estate basics"],
    teaches:"Real Estate 101 workshops",
  },
  {
    id:"business",  num:6,  icon:"🏗️", color:"#F87171",
    title:"Business Building",
    subtitle:"Starting, structuring, and scaling a business from your community",
    category:"Entrepreneurship",
    certId:"BYT-BIZ",
    byt:300,
    modules:[
      {id:1, title:"Business Idea Validation",              pts:20, desc:"How to test before you invest"},
      {id:2, title:"Business Structure & Legal Setup",      pts:25, desc:"LLC, S-Corp, EIN, banking"},
      {id:3, title:"Business Credit Building",              pts:25, desc:"Net-30 vendors, business credit cards, Dun & Bradstreet"},
      {id:4, title:"Marketing Fundamentals",                pts:25, desc:"Content, social, word of mouth"},
      {id:5, title:"Sales & Customer Acquisition",          pts:25, desc:"Closing, follow-up, retention"},
      {id:6, title:"Operations & Systems",                  pts:20, desc:"SOPs, tools, delegation"},
      {id:7, title:"Funding & Capital Sources",             pts:25, desc:"Grants, loans, investors, bootstrapping"},
      {id:8, title:"Scaling Your Business",                 pts:20, desc:"Hiring, franchising, digital products"},
    ],
    fieldProject:"Create a full business plan for a real or hypothetical venture using the BYT framework",
    finalExam:{
      questions:[
        {q:"What is the first step in validating a business idea?",opts:["Build the product","Get investment","Test it cheaply with real potential customers","Register the LLC"],a:2},
        {q:"What is a Net-30 vendor account used for?",opts:["Paying rent","Building business credit history","Personal loans","Social media marketing"],a:1},
        {q:"What does EIN stand for?",opts:["Enterprise Investment Number","Employer Identification Number — the business's tax ID","Electronic Income Note","External Investment Network"],a:1},
        {q:"What is the difference between revenue and profit?",opts:["They are the same","Revenue is total income; profit is what remains after expenses","Profit is always larger","Only large companies have profit"],a:1},
        {q:"What type of grant funding aligns with VEDD's 7-pillar workforce development model?",opts:["Personal grants","DOL WIOA, NSF, SBA SBIR, and EDA federal grants","State lottery funds","Only private donations"],a:1},
      ],
    },
    skills:["LLC formation","Business credit","Marketing","Sales","Grant writing basics"],
    teaches:"Start Your Business workshops",
  },
  {
    id:"investing", num:7,  icon:"💰", color:"#FBBF24",
    title:"Investing & Wealth",
    subtitle:"Stocks, index funds, retirement accounts, and building generational wealth",
    category:"Finance",
    certId:"BYT-INVEST",
    byt:250,
    modules:[
      {id:1, title:"Why Most People Stay Poor",             pts:15, desc:"Mindset, habits, and the wealth gap"},
      {id:2, title:"Stock Market Basics",                   pts:20, desc:"Stocks, bonds, ETFs, index funds"},
      {id:3, title:"Retirement Accounts",                   pts:20, desc:"401k, IRA, Roth IRA — and why to start now"},
      {id:4, title:"Index Fund Investing",                  pts:25, desc:"The Warren Buffett strategy for regular people"},
      {id:5, title:"Dividend Investing",                    pts:20, desc:"Getting paid while you sleep"},
      {id:6, title:"Generational Wealth Strategies",        pts:25, desc:"Trusts, life insurance, estate planning basics"},
      {id:7, title:"Community Wealth Building",             pts:25, desc:"Group economics, buying power, collective action"},
    ],
    fieldProject:"Open a real investment account and make your first index fund purchase (any amount)",
    finalExam:{
      questions:[
        {q:"What is compound interest sometimes called?",opts:["The tax trick","The 8th wonder of the world","The debt trap","The inflation hedge"],a:1},
        {q:"What is the main advantage of a Roth IRA?",opts:["Tax deduction now","Tax-FREE growth — you pay tax going in, not on withdrawal","Higher contribution limits","No income requirements"],a:1},
        {q:"What is an index fund?",opts:["A fund that picks winning stocks","A fund that tracks a market index like the S&P 500","A type of savings account","A bond fund"],a:1},
        {q:"What is dollar-cost averaging?",opts:["Buying foreign currency","Investing a fixed amount regularly regardless of market price","Timing the market perfectly","Borrowing to invest"],a:1},
        {q:"What is generational wealth?",opts:["Only for the wealthy","Assets and financial knowledge passed down through families","Government welfare","Inheritance tax"],a:1},
      ],
    },
    skills:["Investment basics","Retirement planning","Index investing","Estate basics","Teaching wealth principles"],
    teaches:"Investing & Wealth Building workshops",
  },
  {
    id:"stem",      num:8,  icon:"📐", color:"#34D399",
    title:"STEM Education",
    subtitle:"Teaching science, technology, math, and coding to youth in your community",
    category:"Education",
    certId:"BYT-STEM",
    byt:200,
    modules:[
      {id:1, title:"Why STEM in the Inner City Matters",    pts:15, desc:"The gap, the opportunity, and your role"},
      {id:2, title:"Facilitating Youth Learning",           pts:20, desc:"Age-appropriate teaching, engagement techniques"},
      {id:3, title:"Intro to Coding with Youth",            pts:25, desc:"Scratch, Python basics, fun first projects"},
      {id:4, title:"Math Confidence Building",              pts:20, desc:"Making math relevant and accessible"},
      {id:5, title:"Science Experiments for Community",     pts:20, desc:"Low-cost hands-on experiments"},
      {id:6, title:"Running a STEM Club",                   pts:25, desc:"Scheduling, supplies, recruiting youth"},
      {id:7, title:"Connecting STEM to Careers",            pts:20, desc:"Showing youth the path from class to career"},
    ],
    fieldProject:"Run one STEM activity with at least 5 youth in your community and document it",
    finalExam:{
      questions:[
        {q:"What percentage of $BYT token supply goes to the STEM fund?",opts:["5%","20%","10%","1%"],a:2},
        {q:"What coding language is best for introducing youth to programming?",opts:["C++","Assembly","Scratch or Python — visual and beginner-friendly","Machine code"],a:2},
        {q:"What is the best way to make math relevant for inner-city youth?",opts:["Memorize formulas","Connect it to real life: money, business, sports","Only use textbooks","Avoid difficult topics"],a:1},
        {q:"How does running a STEM club align with BYT's mission?",opts:["It doesn't","Builds community, earns $BYT, and qualifies for federal STEM grant funding","Only for certified teachers","It's optional"],a:1},
        {q:"What federal grant program funds STEM education workforce development?",opts:["Only private grants","NSF (National Science Foundation) and DOL WIOA","Lottery funds","None available"],a:1},
      ],
    },
    skills:["Youth facilitation","Basic coding","Science experiments","Club management","Grant awareness"],
    teaches:"Youth STEM Club sessions",
  },
  {
    id:"trades",    num:9,  icon:"🔧", color:"#60A5FA",
    title:"Skilled Trades",
    subtitle:"Plumbing, electrical, HVAC, carpentry — turning hands-on skills into wealth",
    category:"Trades",
    certId:"BYT-TRADES",
    byt:200,
    modules:[
      {id:1, title:"The Trades Gap & The Opportunity",      pts:15, desc:"Why skilled trades are a path to wealth right now"},
      {id:2, title:"Starting a Trades Business",            pts:25, desc:"Licensing, insurance, pricing your work"},
      {id:3, title:"Plumbing Basics",                       pts:20, desc:"Reading pipes, common repairs, when to call a pro"},
      {id:4, title:"Electrical Basics (Safety First)",      pts:20, desc:"Circuits, outlets, code compliance"},
      {id:5, title:"Carpentry & Home Improvement",          pts:20, desc:"Framing, drywall, finish work"},
      {id:6, title:"HVAC Fundamentals",                     pts:20, desc:"How systems work, maintenance, basic repairs"},
      {id:7, title:"Trades + Real Estate = Wealth",         pts:25, desc:"Using trade skills to build and renovate investment properties"},
    ],
    fieldProject:"Complete one real trades project (home or community) and document the process and cost savings",
    finalExam:{
      questions:[
        {q:"Why are skilled trades currently a major wealth opportunity?",opts:["They aren't","Massive shortage of tradespeople + high demand = premium wages","Only for people without college degrees","Declining industry"],a:1},
        {q:"What must you have before starting a licensed trades business?",opts:["Only word of mouth","State license, liability insurance, and proper business registration","Just tools","Only a social media page"],a:1},
        {q:"How do trade skills combine with real estate investing?",opts:["They don't","You can renovate your own investment properties, saving 30-60% on rehab costs","Trades only for rentals","No connection"],a:1},
        {q:"What is the first step before any electrical work?",opts:["Start working immediately","Turn off the breaker and verify power is off with a tester — safety first","Call a professional always","Buy new tools"],a:1},
        {q:"What is the most valuable trade skill for real estate investors?",opts:["Painting only","General carpentry and project management — you can oversee all other trades","Specialized only","HVAC only"],a:1},
      ],
    },
    skills:["Trade basics","Safety","Business setup","Real estate integration","Teaching trades fundamentals"],
    teaches:"Skilled Trades & Wealth workshops",
  },
  {
    id:"health",    num:10, icon:"🧬", color:"#4ADE80",
    title:"Health & Wellness",
    subtitle:"Physical, mental, and spiritual wellness as a foundation for wealth",
    category:"Wellness",
    certId:"BYT-HEALTH",
    byt:200,
    modules:[
      {id:1, title:"Whole-Person Health",                   pts:15, desc:"Physical, mental, spiritual — all connected"},
      {id:2, title:"Nutrition Fundamentals",                pts:20, desc:"Food as fuel, practical eating on a budget"},
      {id:3, title:"Fitness & Movement",                    pts:20, desc:"BYT run groups, sustainable exercise habits"},
      {id:4, title:"Mental Health in the Community",        pts:25, desc:"Stigma, access, practical tools"},
      {id:5, title:"Faith & Spiritual Practice",            pts:20, desc:"Devotion, prayer, community as medicine"},
      {id:6, title:"Health & Financial Connection",         pts:20, desc:"How health impacts wealth and vice versa"},
      {id:7, title:"Leading Health in Your City",           pts:25, desc:"Running wellness events and BYT run groups"},
    ],
    fieldProject:"Organize one community wellness event — run, devotion, nutrition talk, or health fair",
    finalExam:{
      questions:[
        {q:"What does 'whole-person health' mean?",opts:["Only physical fitness","Caring for body, mind, and spirit as interconnected systems","Only medical care","Diet only"],a:1},
        {q:"How does the BYT run crew connect to the ecosystem?",opts:["It doesn't","Participants wear NFC gear, earn $BYT, and build community simultaneously","Only for fitness","Requires special membership"],a:1},
        {q:"What is the relationship between health and wealth?",opts:["No relationship","Poor health costs money and reduces productivity — wellness is a financial strategy","Only wealthy people are healthy","Health is free"],a:1},
        {q:"What percentage of Americans are considered mentally healthy?",opts:["About 80%","About 17% — mental health is a widespread community need","100%","Unknown"],a:1},
        {q:"What does BYT's daily devotion practice accomplish?",opts:["Nothing practical","Builds discipline, community connection, spiritual growth, AND earns $BYT","Only for religious people","Required attendance"],a:1},
      ],
    },
    skills:["Wellness facilitation","Community events","Mental health awareness","Faith integration","Run group leadership"],
    teaches:"Health & Wellness Community workshops",
  },
];

function CertificateCard({ track, holderName, tier, certId, issuedDate, onClose }) {
  const tc = TIERS[tier]||TIERS.Foundation;
  const [copied, setCopied] = useState(false);

  function copyCert() {
    const text = `BYT ACADEMY CERTIFICATE\n${track.title}\nHolder: ${holderName}\nTier: ${tc.emoji} ${tier}\nCert ID: ${certId}\nIssued: ${issuedDate}\n\nVerify at veddbuild.com/verify`;
    navigator.clipboard?.writeText(text).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); });
  }

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(5,5,10,.96)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto" }}>
      <div style={{ maxWidth:520,width:"100%",margin:"auto" }}>
        <div style={{ background:"linear-gradient(145deg,#0D0B1A,#180F28)",border:`1px solid ${track.color}55`,padding:"32px 28px",position:"relative",textAlign:"center",marginBottom:12 }}>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(to right,transparent,${track.color},transparent)` }}/>
          {[[{top:10,left:10},"2px 0 0 2px"],[{top:10,right:10},"2px 2px 0 0"],[{bottom:10,left:10},"0 0 2px 2px"],[{bottom:10,right:10},"0 2px 2px 0"]].map(([p,bw],i)=>(
            <div key={i} style={{ position:"absolute",width:16,height:16,...p,borderColor:track.color,borderStyle:"solid",borderWidth:bw,opacity:.45 }}/>
          ))}
          <div style={{ fontFamily:"monospace",fontSize:7,letterSpacing:".5em",color:G,opacity:.55,textTransform:"uppercase",marginBottom:4 }}>VEDD TECHNOLOGIES · BYT ACADEMY</div>
          <div style={{ fontFamily:"monospace",fontSize:7,letterSpacing:".4em",color:"rgba(212,168,67,.35)",marginBottom:16 }}>CERTIFICATE OF COMPLETION</div>
          <div style={{ width:56,height:56,borderRadius:"50%",background:`${track.color}18`,border:`1px solid ${track.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px" }}>
            {track.icon}
          </div>
          <div style={{ fontFamily:"Georgia,serif",fontSize:11,color:"#C8BEA8",opacity:.7,marginBottom:4,letterSpacing:".05em" }}>This certifies that</div>
          <div style={{ fontFamily:"Georgia,serif",fontWeight:900,fontSize:22,color:G,borderBottom:`1px solid rgba(212,168,67,.2)`,paddingBottom:10,marginBottom:10 }}>
            {holderName||"Community Member"}
          </div>
          <div style={{ fontFamily:"Georgia,serif",fontSize:11,color:"#C8BEA8",opacity:.6,marginBottom:6 }}>has successfully completed</div>
          <div style={{ fontFamily:"Georgia,serif",fontWeight:900,fontSize:19,color:"#F5F0E8",marginBottom:6,lineHeight:1.2 }}>{track.title}</div>
          <div style={{ fontFamily:"monospace",fontSize:9,color:"#C8BEA8",opacity:.5,marginBottom:14 }}>{track.subtitle}</div>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 20px",background:tc.bg,border:`1px solid ${tc.color}44`,marginBottom:16 }}>
            <span style={{ fontSize:16 }}>{tc.emoji}</span>
            <div>
              <div style={{ fontFamily:"monospace",fontSize:8,letterSpacing:".2em",color:tc.color,textTransform:"uppercase" }}>{tc.title}</div>
              <div style={{ fontFamily:"monospace",fontSize:7,color:"rgba(212,168,67,.4)",letterSpacing:".15em" }}>{tc.mult} $BYT multiplier</div>
            </div>
          </div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:14 }}>
            {track.skills.map((s,i)=>(
              <div key={i} style={{ fontFamily:"monospace",fontSize:7,color:track.color,background:`${track.color}10`,border:`1px solid ${track.color}30`,padding:"2px 8px" }}>{s}</div>
            ))}
          </div>
          <div style={{ fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:11,color:"#C8BEA8",opacity:.6,marginBottom:16,lineHeight:1.6 }}>
            Authorized to teach: <span style={{ color:track.color,fontStyle:"normal" }}>{track.teaches}</span>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",borderTop:`1px solid rgba(212,168,67,.1)`,paddingTop:12,flexWrap:"wrap",gap:8 }}>
            {[["Track Code",track.certId],["Issued",issuedDate],["Cert ID",certId]].map(([l,v])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"monospace",fontSize:6,letterSpacing:".2em",color:"rgba(212,168,67,.4)",textTransform:"uppercase",marginBottom:2 }}>{l}</div>
                <div style={{ fontFamily:"monospace",fontSize:9,color:"#F5F0E8" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12,fontFamily:"monospace",fontSize:7,color:"rgba(212,168,67,.25)",letterSpacing:".15em" }}>
            Verify at veddbuild.com/verify · VEDD Technologies LLC · Tulsa, OK
          </div>
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <button onClick={onClose} style={{ flex:1,background:"transparent",color:G,border:"1px solid rgba(212,168,67,.25)",padding:11,fontFamily:"Georgia,serif",fontSize:13,cursor:"pointer" }}>← Back</button>
          <button onClick={copyCert} style={{ flex:2,background:copied?"#4ADE80":G,color:DARK,border:"none",padding:11,fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,cursor:"pointer" }}>
            {copied?"✓ Cert Info Copied!":"📋 Copy Cert Info"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TrackView({ track, progress, onBack, onModuleComplete, onExamPass, certData }) {
  const [section, setSection]   = useState("overview");
  const [examQ,   setExamQ]     = useState(0);
  const [examSel, setExamSel]   = useState(null);
  const [examLock,setExamLock]  = useState(false);
  const [examScore,setExamScore]= useState(0);
  const [examDone, setExamDone] = useState(false);
  const [viewCert, setViewCert] = useState(false);
  const examRef = useRef(null);

  const doneModules = progress.modules||[];
  const allModsDone = doneModules.length >= track.modules.length;
  const fieldDone   = progress.fieldDone||false;
  const examPassed  = progress.examPassed||false;
  const certified   = progress.certified||false;
  const pct = Math.round((doneModules.length/track.modules.length)*100);
  const qs = track.finalExam.questions;
  const examPassThreshold = Math.ceil(qs.length*.8);
  const Col = track.color;

  function submitExam() {
    if (examSel===null) return;
    setExamLock(true);
    if (examSel===qs[examQ].a) setExamScore(s=>s+1);
  }
  function nextExamQ() {
    if (examQ+1>=qs.length) { setExamDone(true); return; }
    setExamQ(q=>q+1); setExamSel(null); setExamLock(false);
    examRef.current?.scrollTo({top:0,behavior:"smooth"});
  }

  return (
    <div style={{ background:DARK,minHeight:"100vh",color:"#F5F0E8",fontFamily:"Georgia,serif",maxWidth:680,margin:"0 auto" }}>
      <div style={{ padding:"10px 14px",background:"rgba(5,5,10,.97)",borderBottom:"1px solid rgba(212,168,67,.08)",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:100,backdropFilter:"blur(10px)" }}>
        <button onClick={onBack} style={{ background:"transparent",border:"none",color:"rgba(212,168,67,.55)",cursor:"pointer",fontSize:18,padding:"2px 6px" }}>←</button>
        <span style={{ fontSize:18 }}>{track.icon}</span>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ fontFamily:"monospace",fontSize:7,color:Col,letterSpacing:".22em",textTransform:"uppercase" }}>TRACK {track.num} · {track.category}</div>
        </div>
        <div style={{ fontFamily:"monospace",fontSize:10,fontWeight:700,color:G }}>{pct}% done</div>
      </div>
      <div style={{ height:3,background:"rgba(212,168,67,.07)" }}>
        <div style={{ height:"100%",background:Col,width:`${pct}%`,transition:"width .5s" }}/>
      </div>
      <div style={{ display:"flex",borderBottom:"1px solid rgba(212,168,67,.08)",overflowX:"auto",scrollbarWidth:"none" }}>
        {[["overview","📋 Overview"],["modules","📚 Modules"],["exam","📝 Final Exam"],["cert","🏅 Certificate"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setSection(id)}
            style={{ flex:1,minWidth:80,padding:"10px 8px",background:section===id?`${Col}12`:"transparent",border:"none",borderBottom:`2px solid ${section===id?Col:"transparent"}`,color:section===id?Col:"rgba(212,168,67,.45)",fontFamily:"monospace",fontSize:8,letterSpacing:".1em",cursor:"pointer",whiteSpace:"nowrap" }}>
            {lbl}
          </button>
        ))}
      </div>

      <div ref={examRef} style={{ padding:18 }}>
        {section==="overview" && (
          <>
            <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:16 }}>
              <div style={{ width:52,height:52,borderRadius:"50%",background:`${Col}18`,border:`1px solid ${Col}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0 }}>{track.icon}</div>
              <div>
                <div style={{ fontFamily:"monospace",fontSize:8,color:Col,letterSpacing:".25em",textTransform:"uppercase",marginBottom:3 }}>{track.category} · CERT {track.certId}</div>
                <h2 style={{ fontFamily:"Georgia,serif",fontSize:20,fontWeight:900,color:"#F5F0E8",marginBottom:4,lineHeight:1.2 }}>{track.title}</h2>
                <div style={{ fontSize:13,color:"#C8BEA8",lineHeight:1.6 }}>{track.subtitle}</div>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3,marginBottom:16 }}>
              {[
                {n:`${doneModules.length}/${track.modules.length}`,l:"Modules",c:Col},
                {n:fieldDone?"✓":"Pending",l:"Field Project",c:fieldDone?"#4ADE80":"rgba(212,168,67,.4)"},
                {n:examPassed?"✓ Passed":examDone?"✗ Retry":"Locked",l:"Final Exam",c:examPassed?"#4ADE80":examDone?"#F87171":"rgba(212,168,67,.3)"},
              ].map((s,i)=>(
                <div key={i} style={{ background:SURF,border:"1px solid rgba(212,168,67,.1)",padding:"12px 10px",textAlign:"center" }}>
                  <div style={{ fontFamily:"monospace",fontWeight:700,fontSize:18,color:s.c,lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontFamily:"monospace",fontSize:7,color:"rgba(212,168,67,.4)",letterSpacing:".18em",textTransform:"uppercase",marginTop:4 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background:SURF,border:"1px solid rgba(212,168,67,.1)",padding:"14px 16px",marginBottom:12 }}>
              <div style={{ fontFamily:"monospace",fontSize:8,color:Col,letterSpacing:".25em",textTransform:"uppercase",marginBottom:10 }}>What You'll Learn</div>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {track.modules.map((m,i)=>(
                  <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start" }}>
                    <div style={{ width:18,height:18,borderRadius:"50%",background:doneModules.includes(m.id)?`${Col}20`:"rgba(212,168,67,.07)",border:`1px solid ${doneModules.includes(m.id)?Col:"rgba(212,168,67,.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:8,fontWeight:700,color:doneModules.includes(m.id)?Col:"rgba(212,168,67,.3)",flexShrink:0,marginTop:1 }}>
                      {doneModules.includes(m.id)?"✓":m.id}
                    </div>
                    <div>
                      <div style={{ fontSize:12,fontWeight:600,color:doneModules.includes(m.id)?"#4ADE80":"#F5F0E8",marginBottom:1 }}>{m.title}</div>
                      <div style={{ fontFamily:"monospace",fontSize:8,color:"rgba(212,168,67,.35)" }}>{m.desc} · +{m.pts} $BYT</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:"14px 16px",background:fieldDone?"rgba(74,222,128,.06)":"rgba(212,168,67,.04)",border:`1px solid ${fieldDone?"rgba(74,222,128,.2)":"rgba(212,168,67,.1)"}`,marginBottom:12 }}>
              <div style={{ fontFamily:"monospace",fontSize:8,color:fieldDone?"#4ADE80":Col,letterSpacing:".25em",marginBottom:6 }}>FIELD PROJECT {fieldDone?"· ✓ COMPLETE":""}</div>
              <div style={{ fontSize:13,color:"#C8BEA8",lineHeight:1.7,marginBottom:fieldDone?0:10 }}>{track.fieldProject}</div>
              {!fieldDone && (
                <button onClick={()=>onModuleComplete(track.id,"field")}
                  style={{ background:"rgba(212,168,67,.1)",border:"1px solid rgba(212,168,67,.25)",color:G,fontFamily:"monospace",fontSize:9,letterSpacing:".12em",padding:"7px 16px",cursor:"pointer",marginTop:6 }}>
                  MARK FIELD PROJECT COMPLETE
                </button>
              )}
            </div>
            <div style={{ padding:"12px 14px",background:"rgba(212,168,67,.06)",border:"1px solid rgba(212,168,67,.18)",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <div>
                <div style={{ fontFamily:"monospace",fontSize:8,color:G,letterSpacing:".2em",marginBottom:3 }}>COMPLETION REWARD</div>
                <div style={{ fontSize:12,color:"#C8BEA8" }}>Earn on certification + multiplier active on all future activity</div>
              </div>
              <div style={{ fontFamily:"Georgia,serif",fontWeight:900,fontSize:24,color:G }}>{track.byt} $BYT</div>
            </div>
            <button onClick={()=>setSection("modules")} style={{ width:"100%",background:Col,color:DARK,border:"none",padding:13,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer" }}>
              {doneModules.length>0?"Continue Modules →":"Start Learning →"}
            </button>
          </>
        )}

        {section==="modules" && (
          <>
            <div style={{ fontFamily:"monospace",fontSize:8,color:Col,letterSpacing:".28em",textTransform:"uppercase",marginBottom:12 }}>
              {doneModules.length}/{track.modules.length} MODULES COMPLETE
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:6,marginBottom:16 }}>
              {track.modules.map((m,idx)=>{
                const done = doneModules.includes(m.id);
                const isNext = !done && (idx===0||doneModules.includes(track.modules[idx-1]?.id));
                const locked = !done && !isNext;
                return (
                  <div key={m.id} style={{ display:"flex",gap:10,padding:"13px 12px",background:done?"rgba(74,222,128,.04)":isNext?`${Col}08`:"rgba(212,168,67,.02)",border:`1px solid ${done?"rgba(74,222,128,.18)":isNext?`${Col}33`:"rgba(212,168,67,.07)"}`,opacity:locked?.42:1 }}>
                    <div style={{ width:28,height:28,borderRadius:"50%",flexShrink:0,background:done?"rgba(74,222,128,.12)":isNext?`${Col}12`:"rgba(212,168,67,.05)",border:`1px solid ${done?"#4ADE80":isNext?Col:"rgba(212,168,67,.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:9,fontWeight:700,color:done?"#4ADE80":isNext?Col:"rgba(212,168,67,.25)" }}>
                      {done?"✓":m.id}
                    </div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontFamily:"Georgia,serif",fontSize:13,fontWeight:600,color:done?"#4ADE80":isNext?"#F5F0E8":"#C8BEA8",marginBottom:2 }}>{m.title}</div>
                      <div style={{ fontFamily:"monospace",fontSize:8,color:"rgba(212,168,67,.35)",marginBottom:2 }}>{m.desc}</div>
                      <div style={{ fontFamily:"monospace",fontSize:8,color:done?"#4ADE80":Col }}>+{m.pts} $BYT</div>
                    </div>
                    {!locked && !done && (
                      <button onClick={()=>onModuleComplete(track.id,m.id)}
                        style={{ background:Col,color:DARK,border:"none",padding:"5px 14px",fontFamily:"monospace",fontSize:8,letterSpacing:".1em",cursor:"pointer",flexShrink:0,alignSelf:"center",fontWeight:700 }}>
                        COMPLETE
                      </button>
                    )}
                    {done && <span style={{ color:"#4ADE80",fontSize:14,alignSelf:"center",flexShrink:0 }}>✓</span>}
                    {locked && <span style={{ fontSize:13,opacity:.3,alignSelf:"center",flexShrink:0 }}>🔒</span>}
                  </div>
                );
              })}
            </div>
            {allModsDone && (
              <div style={{ padding:"16px",background:`${Col}0A`,border:`1px solid ${Col}44`,textAlign:"center",marginBottom:14 }}>
                <div style={{ fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:Col,marginBottom:6 }}>🎉 All modules complete!</div>
                <button onClick={()=>setSection("exam")} style={{ background:Col,color:DARK,border:"none",padding:"10px 24px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,cursor:"pointer" }}>
                  Go to Final Exam →
                </button>
              </div>
            )}
          </>
        )}

        {section==="exam" && (
          <>
            {!allModsDone ? (
              <div style={{ padding:"24px",textAlign:"center",background:"rgba(212,168,67,.04)",border:"1px solid rgba(212,168,67,.12)" }}>
                <div style={{ fontSize:32,marginBottom:10 }}>🔒</div>
                <div style={{ fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:"rgba(212,168,67,.6)",marginBottom:6 }}>Complete all modules first</div>
                <button onClick={()=>setSection("modules")} style={{ background:Col,color:DARK,border:"none",padding:"10px 22px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,cursor:"pointer" }}>Go to Modules →</button>
              </div>
            ) : examPassed ? (
              <div style={{ padding:"24px",textAlign:"center" }}>
                <div style={{ fontSize:40,marginBottom:8 }}>🏅</div>
                <div style={{ fontFamily:"Georgia,serif",fontSize:20,fontWeight:900,color:"#4ADE80",marginBottom:6 }}>Exam Passed!</div>
                <button onClick={()=>setSection("cert")} style={{ background:Col,color:DARK,border:"none",padding:"11px 24px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer" }}>View Certificate →</button>
              </div>
            ) : !examDone ? (
              <>
                <div style={{ fontFamily:"monospace",fontSize:8,color:Col,letterSpacing:".28em",textTransform:"uppercase",marginBottom:6 }}>FINAL EXAM · {track.title.toUpperCase()}</div>
                <div style={{ fontSize:12,color:"#C8BEA8",marginBottom:14,lineHeight:1.6 }}>Pass threshold: {examPassThreshold}/{qs.length} correct. You can retake if needed.</div>
                <div style={{ display:"flex",gap:3,marginBottom:16 }}>
                  {qs.map((_,i)=>(
                    <div key={i} style={{ flex:1,height:4,borderRadius:2,background:i<examQ?"rgba(74,222,128,.5)":i===examQ?Col:"rgba(212,168,67,.12)",transition:"all .3s" }}/>
                  ))}
                </div>
                <div style={{ fontFamily:"monospace",fontSize:8,color:"rgba(212,168,67,.4)",marginBottom:8 }}>Q{examQ+1} of {qs.length}</div>
                <div style={{ fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:"#F5F0E8",lineHeight:1.5,marginBottom:18 }}>{qs[examQ].q}</div>
                <div style={{ display:"flex",flexDirection:"column",gap:7,marginBottom:16 }}>
                  {qs[examQ].opts.map((o,i)=>{
                    let bg="rgba(212,168,67,.04)",bd="rgba(212,168,67,.12)",cl="#C8BEA8";
                    if(examSel===i&&!examLock){bg=`${Col}18`;bd=Col;cl="#F5F0E8";}
                    if(examLock&&i===qs[examQ].a){bg="rgba(74,222,128,.1)";bd="#4ADE80";cl="#4ADE80";}
                    if(examLock&&examSel===i&&i!==qs[examQ].a){bg="rgba(239,68,68,.1)";bd="#F87171";cl="#F87171";}
                    return (
                      <div key={i} onClick={()=>!examLock&&setExamSel(i)}
                        style={{ padding:"11px 13px",background:bg,border:`1px solid ${bd}`,color:cl,cursor:examLock?"default":"pointer",fontSize:13,lineHeight:1.5,display:"flex",gap:9,transition:"all .18s" }}>
                        <span style={{ fontFamily:"monospace",fontSize:9,color:Col,opacity:.55,flexShrink:0 }}>{["A","B","C","D"][i]}.</span>{o}
                      </div>
                    );
                  })}
                </div>
                {!examLock
                  ? <button onClick={submitExam} disabled={examSel===null}
                      style={{ width:"100%",background:examSel!==null?Col:"rgba(212,168,67,.2)",color:DARK,border:"none",padding:13,fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:examSel!==null?"pointer":"not-allowed" }}>
                      Submit Answer
                    </button>
                  : <button onClick={nextExamQ}
                      style={{ width:"100%",background:Col,color:DARK,border:"none",padding:13,fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer" }}>
                      {examQ+1>=qs.length?"See Results →":"Next Question →"}
                    </button>
                }
              </>
            ) : (
              <div style={{ textAlign:"center",padding:"12px 0" }}>
                <div style={{ fontSize:52,marginBottom:10 }}>{examScore>=examPassThreshold?"🏅":"📖"}</div>
                <div style={{ fontFamily:"Georgia,serif",fontSize:22,fontWeight:900,color:examScore>=examPassThreshold?"#4ADE80":"#F87171",marginBottom:6 }}>
                  {examScore>=examPassThreshold?"Exam Passed!":"Keep Studying"}
                </div>
                <div style={{ fontFamily:"monospace",fontSize:11,color:"rgba(212,168,67,.5)",marginBottom:16 }}>{examScore}/{qs.length} correct · need {examPassThreshold} to pass</div>
                {examScore>=examPassThreshold ? (
                  <>
                    <div style={{ padding:"14px",background:"rgba(74,222,128,.07)",border:"1px solid rgba(74,222,128,.22)",marginBottom:16 }}>
                      <div style={{ fontFamily:"monospace",fontSize:8,color:"#4ADE80",letterSpacing:".2em",marginBottom:4 }}>REWARD UNLOCKED</div>
                      <div style={{ fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:G }}>{track.byt} $BYT</div>
                    </div>
                    <button onClick={()=>{ onExamPass(track.id); setSection("cert"); }}
                      style={{ width:"100%",background:Col,color:DARK,border:"none",padding:14,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:8 }}>
                      Claim Certificate + {track.byt} $BYT ✦
                    </button>
                  </>
                ) : (
                  <button onClick={()=>{ setExamQ(0);setExamSel(null);setExamLock(false);setExamScore(0);setExamDone(false); }}
                    style={{ width:"100%",background:"rgba(212,168,67,.1)",color:G,border:"1px solid rgba(212,168,67,.25)",padding:13,fontFamily:"Georgia,serif",fontSize:13,cursor:"pointer" }}>
                    Retake Exam
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {section==="cert" && (
          <>
            {!certified ? (
              <div style={{ padding:"24px",textAlign:"center",background:"rgba(212,168,67,.04)",border:"1px solid rgba(212,168,67,.12)" }}>
                <div style={{ fontSize:32,marginBottom:10 }}>🔒</div>
                <div style={{ fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:"rgba(212,168,67,.6)",marginBottom:6 }}>
                  {!allModsDone?"Complete all modules first":!examPassed?"Pass the final exam first":"Certificate pending"}
                </div>
                <button onClick={()=>setSection(!allModsDone?"modules":"exam")}
                  style={{ background:Col,color:DARK,border:"none",padding:"10px 22px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,cursor:"pointer" }}>
                  {!allModsDone?"Go to Modules →":"Go to Exam →"}
                </button>
              </div>
            ) : (
              <>
                <div style={{ textAlign:"center",marginBottom:16 }}>
                  <div style={{ fontSize:44,marginBottom:8 }}>🏅</div>
                  <div style={{ fontFamily:"Georgia,serif",fontSize:20,fontWeight:900,color:Col,marginBottom:6 }}>Certificate Earned!</div>
                  <div style={{ background:`${Col}0A`,border:`1px solid ${Col}44`,padding:"16px",marginBottom:14,textAlign:"left" }}>
                    <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:10 }}>
                      <div style={{ fontSize:22 }}>{track.icon}</div>
                      <div>
                        <div style={{ fontFamily:"Georgia,serif",fontSize:14,fontWeight:700,color:"#F5F0E8" }}>{track.title}</div>
                        <div style={{ fontFamily:"monospace",fontSize:8,color:Col,letterSpacing:".12em" }}>{track.certId}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:11,color:"#C8BEA8",opacity:.7 }}>Authorized to teach: {track.teaches}</div>
                  </div>
                  <button onClick={()=>setViewCert(true)}
                    style={{ width:"100%",background:Col,color:DARK,border:"none",padding:"12px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer" }}>
                    View Full Certificate →
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {viewCert && (
        <CertificateCard track={track} holderName="Ambassador" tier={certData?.tier||"Foundation"} certId={certData?.certId||uid()} issuedDate={certData?.issuedDate||now()} onClose={()=>setViewCert(false)} />
      )}
    </div>
  );
}

function ToastList({items,rm}){
  return (
    <div style={{ position:"fixed",bottom:16,right:16,zIndex:9999,display:"flex",flexDirection:"column",gap:6,maxWidth:290,width:"calc(100vw - 32px)" }}>
      {items.map(t=>(
        <div key={t.id} onClick={()=>rm(t.id)}
          style={{ background:SURF,border:`1px solid ${G}`,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",boxShadow:"0 4px 18px rgba(212,168,67,.18)",borderLeft:`3px solid ${t.color||G}` }}>
          <span style={{ fontSize:16,flexShrink:0 }}>{t.icon}</span>
          <div style={{ fontSize:12,color:"#F5F0E8",lineHeight:1.4 }}>{t.msg}</div>
        </div>
      ))}
    </div>
  );
}

export default function CertHub() {
  const [saved,   setSaved]   = useState(()=>load());
  const [view,    setView]    = useState("hub");
  const [selTrack,setSelTrack]= useState(null);
  const [toasts,  setToasts]  = useState([]);
  const [viewCert,setViewCert]= useState(null);
  const [catFilter,setCat]    = useState("All");

  const certs          = saved.certs       || {};
  const trackProgress  = saved.trackProgress || {};
  const totalEarned    = saved.totalEarned || 0;
  const certCount      = Object.keys(certs).length;

  const currentTier = certCount>=10?"Platinum":certCount>=5?"Ambassador":certCount>=3?"Scholar":certCount>=1?"Foundation":"—";
  const nextTier    = currentTier==="Platinum"?null:certCount>=5?"Platinum":certCount>=3?"Ambassador":certCount>=1?"Scholar":"Foundation";
  const nextReq     = nextTier ? TIERS[nextTier]?.req - certCount : 0;
  const tc          = TIERS[currentTier]||{color:"rgba(212,168,67,.4)",emoji:"",mult:"1×",title:"Not yet certified"};

  function persist(newData) {
    const merged = {...saved,...newData};
    setSaved(merged);
    save(merged);
  }

  function toast(msg,icon="✦",color=G) {
    const id=Date.now()+Math.random();
    setToasts(p=>[...p.slice(-2),{id,msg,icon,color}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3200);
  }

  function onModuleComplete(trackId, moduleId) {
    const prev = trackProgress[trackId]||{modules:[],fieldDone:false,examPassed:false,certified:false};
    let updated;
    if (moduleId==="field") {
      updated = {...prev,fieldDone:true};
      toast("Field project marked complete! +50 $BYT","📋","#4ADE80");
      persist({trackProgress:{...trackProgress,[trackId]:updated},totalEarned:totalEarned+50});
    } else {
      if (prev.modules.includes(moduleId)) return;
      const track = TRACKS.find(t=>t.id===trackId);
      const mod   = track?.modules.find(m=>m.id===moduleId);
      updated = {...prev,modules:[...prev.modules,moduleId]};
      toast(`Module "${mod?.title}" complete! +${mod?.pts||20} $BYT`,"📚",G);
      persist({trackProgress:{...trackProgress,[trackId]:updated},totalEarned:totalEarned+(mod?.pts||20)});
    }
  }

  function onExamPass(trackId) {
    const track = TRACKS.find(t=>t.id===trackId);
    const certId= uid();
    const issued= now();
    const newCerts = {...certs,[trackId]:{certId,issuedDate:issued,tier:currentTier}};
    const newCount = Object.keys(newCerts).length;
    const newTier  = newCount>=10?"Platinum":newCount>=5?"Ambassador":newCount>=3?"Scholar":"Foundation";
    const prev = trackProgress[trackId]||{};
    const updated  = {...prev,examPassed:true,certified:true};
    toast(`🏅 ${track?.title} certificate earned! +${track?.byt||200} $BYT`,track?.icon,"#4ADE80");
    if (newTier!==currentTier) toast(`🎉 Tier upgrade: ${TIERS[newTier]?.emoji} ${newTier}!`,"🎉",TIERS[newTier]?.color);
    persist({certs:newCerts,trackProgress:{...trackProgress,[trackId]:updated},totalEarned:totalEarned+(track?.byt||200)});
  }

  const categories = ["All",...[...new Set(TRACKS.map(t=>t.category))]];
  const filtered   = catFilter==="All"?TRACKS:TRACKS.filter(t=>t.category===catFilter);

  if (view==="track" && selTrack) return (
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:#05050A;overflow-x:hidden;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:rgba(212,168,67,.2);}`}</style>
      <TrackView track={selTrack} progress={trackProgress[selTrack.id]||{}} certData={certs[selTrack.id]} onBack={()=>setView("hub")} onModuleComplete={onModuleComplete} onExamPass={onExamPass}/>
      <ToastList items={toasts} rm={id=>setToasts(p=>p.filter(t=>t.id!==id))}/>
    </>
  );

  if (viewCert) return (
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:#05050A;}`}</style>
      <CertificateCard track={viewCert} holderName="Ambassador" tier={certs[viewCert.id]?.tier||"Foundation"} certId={certs[viewCert.id]?.certId||uid()} issuedDate={certs[viewCert.id]?.issuedDate||now()} onClose={()=>setViewCert(null)}/>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#05050A;overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:rgba(212,168,67,.2);}
      `}</style>
      <div style={{ background:DARK,color:"#F5F0E8",minHeight:"100vh",fontFamily:"Lora,Georgia,serif",maxWidth:680,margin:"0 auto" }}>
        <div style={{ padding:"28px 18px 20px",background:"linear-gradient(180deg,#0D0520,#05050A)",borderBottom:"1px solid rgba(212,168,67,.1)",textAlign:"center" }}>
          <div style={{ fontFamily:"monospace",fontSize:8,letterSpacing:".5em",color:"rgba(212,168,67,.45)",textTransform:"uppercase",marginBottom:10 }}>BYT ACADEMY</div>
          <h1 style={{ fontFamily:"Cinzel,Georgia,serif",fontSize:24,fontWeight:900,color:G,marginBottom:6,lineHeight:1.2 }}>Certification Hub</h1>
          <p style={{ fontSize:12,color:"#A89880",lineHeight:1.7,maxWidth:440,margin:"0 auto" }}>
            10 tracks. Real skills. Certificates that authorize you to teach, lead, and earn more $BYT in your city.
          </p>
        </div>

        <div style={{ margin:"14px 18px 0",background:SURF,border:`1px solid ${tc.color}33`,padding:"16px 14px",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:tc.color,opacity:.7 }}/>
          <div style={{ display:"flex",gap:12,alignItems:"center",marginBottom:12 }}>
            <div style={{ width:44,height:44,borderRadius:"50%",background:`${tc.color}18`,border:`1px solid ${tc.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>
              {tc.emoji||"⬡"}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"monospace",fontSize:7,color:tc.color,letterSpacing:".25em",textTransform:"uppercase",marginBottom:2 }}>YOUR AMBASSADOR STATUS</div>
              <div style={{ fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:tc.color||"rgba(212,168,67,.5)" }}>{tc.title||"Complete your first track"}</div>
            </div>
            <div style={{ textAlign:"right",flexShrink:0 }}>
              <div style={{ fontFamily:"monospace",fontSize:7,color:"rgba(212,168,67,.4)",letterSpacing:".15em",marginBottom:2 }}>MULTIPLIER</div>
              <div style={{ fontFamily:"Georgia,serif",fontSize:20,fontWeight:900,color:tc.color||"rgba(212,168,67,.3)" }}>{tc.mult}</div>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3,marginBottom:10 }}>
            {Object.entries(TIERS).map(([t,cfg])=>{
              const done = certCount>=cfg.req;
              const cur  = t===currentTier;
              return (
                <div key={t} style={{ padding:"8px 4px",textAlign:"center",background:cur?cfg.bg:"transparent",border:`1px solid ${cur?cfg.color:"rgba(212,168,67,.07)"}`,opacity:done||cur?1:.35 }}>
                  <div style={{ fontSize:18,marginBottom:3 }}>{cfg.emoji}</div>
                  <div style={{ fontFamily:"monospace",fontSize:7,color:cfg.color,letterSpacing:".07em" }}>{t}</div>
                  <div style={{ fontFamily:"monospace",fontSize:6,color:"rgba(212,168,67,.3)",marginTop:1 }}>{cfg.req} certs</div>
                  {cur&&<div style={{ fontFamily:"monospace",fontSize:6,background:cfg.color,color:DARK,padding:"1px 4px",marginTop:3,display:"inline-block",fontWeight:700 }}>NOW</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",borderTop:"1px solid rgba(212,168,67,.08)",paddingTop:10 }}>
            {[
              {l:"Certs Earned",v:`${certCount}/10`,c:G},
              {l:"$BYT Earned",v:totalEarned.toLocaleString(),c:G},
              {l:"Next Tier",v:nextTier?`${nextReq} more cert${nextReq!==1?"s":""}`:tc.emoji+" MAX",c:nextTier?TIERS[nextTier]?.color:tc.color},
            ].map((s,i)=>(
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"monospace",fontSize:7,color:"rgba(212,168,67,.35)",letterSpacing:".15em",marginBottom:2 }}>{s.l}</div>
                <div style={{ fontFamily:"monospace",fontSize:13,fontWeight:700,color:s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {certCount>0 && (
          <div style={{ margin:"12px 18px 0",padding:"12px 14px",background:"rgba(74,222,128,.05)",border:"1px solid rgba(74,222,128,.15)" }}>
            <div style={{ fontFamily:"monospace",fontSize:7,color:"#4ADE80",letterSpacing:".25em",marginBottom:8 }}>EARNED CERTIFICATES ({certCount})</div>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
              {TRACKS.filter(t=>certs[t.id]).map(t=>(
                <div key={t.id} onClick={()=>setViewCert(t)}
                  style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 10px",background:`${t.color}10`,border:`1px solid ${t.color}44`,cursor:"pointer" }}>
                  <span style={{ fontSize:14 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontFamily:"monospace",fontSize:7,color:t.color,letterSpacing:".08em" }}>{t.certId}</div>
                    <div style={{ fontFamily:"monospace",fontSize:6,color:"rgba(212,168,67,.35)" }}>{certs[t.id]?.issuedDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding:"16px 18px" }}>
          <div style={{ display:"flex",gap:5,marginBottom:14,overflowX:"auto",scrollbarWidth:"none",paddingBottom:4 }}>
            {categories.map(cat=>(
              <button key={cat} onClick={()=>setCat(cat)}
                style={{ background:catFilter===cat?"rgba(212,168,67,.1)":"transparent",border:`1px solid ${catFilter===cat?G:"rgba(212,168,67,.15)"}`,color:catFilter===cat?G:"rgba(212,168,67,.5)",fontFamily:"monospace",fontSize:8,letterSpacing:".12em",padding:"5px 12px",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0 }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {filtered.map(track=>{
              const prog  = trackProgress[track.id]||{};
              const cert  = certs[track.id];
              const mDone = (prog.modules||[]).length;
              const pct   = Math.round((mDone/track.modules.length)*100);
              const stages = [
                {l:"Modules",   done:mDone>=track.modules.length, v:`${mDone}/${track.modules.length}`},
                {l:"Field",     done:prog.fieldDone||false,        v:prog.fieldDone?"✓":"Pending"},
                {l:"Exam",      done:prog.examPassed||false,       v:prog.examPassed?"✓ Passed":"Locked"},
                {l:"Certified", done:!!cert,                       v:cert?"✓ Issued":"Pending"},
              ];
              return (
                <div key={track.id} onClick={()=>{ setSelTrack(track); setView("track"); }}
                  style={{ display:"flex",gap:12,padding:"14px 13px",background:cert?"rgba(212,168,67,.06)":"rgba(212,168,67,.02)",border:`1px solid ${cert?"rgba(212,168,67,.28)":"rgba(212,168,67,.1)"}`,cursor:"pointer",position:"relative",overflow:"hidden",transition:"all .18s" }}>
                  {cert&&<div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(to right,transparent,${track.color},transparent)` }}/>}
                  <div style={{ width:44,height:44,borderRadius:4,flexShrink:0,background:`${track.color}18`,border:`1px solid ${track.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>
                    {cert?"🏅":track.icon}
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap" }}>
                      <span style={{ fontFamily:"Cinzel,Georgia,serif",fontSize:13,fontWeight:700,color:cert?track.color:"#F5F0E8" }}>{track.title}</span>
                      <span style={{ fontFamily:"monospace",fontSize:7,background:`${track.color}15`,border:`1px solid ${track.color}35`,color:track.color,padding:"1px 6px" }}>{track.certId}</span>
                      <span style={{ fontFamily:"monospace",fontSize:7,color:"rgba(212,168,67,.45)" }}>+{track.byt} $BYT</span>
                    </div>
                    <div style={{ fontSize:11,color:"#A89880",lineHeight:1.4,marginBottom:6 }}>{track.subtitle}</div>
                    <div style={{ height:3,background:"rgba(212,168,67,.07)",borderRadius:2,overflow:"hidden",marginBottom:5 }}>
                      <div style={{ height:"100%",background:track.color,width:`${pct}%`,borderRadius:2,transition:"width .5s" }}/>
                    </div>
                    <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>
                      {stages.map((st,i)=>(
                        <div key={i} style={{ fontFamily:"monospace",fontSize:6,color:st.done?"#4ADE80":"rgba(212,168,67,.3)",background:st.done?"rgba(74,222,128,.08)":"rgba(212,168,67,.04)",border:`1px solid ${st.done?"rgba(74,222,128,.18)":"rgba(212,168,67,.08)"}`,padding:"2px 6px",letterSpacing:".06em" }}>
                          {st.l}: {st.v}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontFamily:"monospace",fontSize:10,color:"rgba(212,168,67,.4)",alignSelf:"center",flexShrink:0 }}>→</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ margin:"0 18px 20px",padding:"14px",background:SURF,border:"1px solid rgba(212,168,67,.1)" }}>
          <div style={{ fontFamily:"monospace",fontSize:8,color:G,letterSpacing:".25em",textTransform:"uppercase",marginBottom:10 }}>What Your Tier Unlocks</div>
          {Object.entries(TIERS).map(([t,cfg])=>(
            <div key={t} style={{ marginBottom:10,opacity:TIERS[t]?.req<=certCount?1:.38 }}>
              <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4 }}>
                <span style={{ fontSize:14 }}>{cfg.emoji}</span>
                <span style={{ fontFamily:"Georgia,serif",fontSize:12,fontWeight:700,color:cfg.color }}>{t}</span>
                <span style={{ fontFamily:"monospace",fontSize:7,color:"rgba(212,168,67,.35)" }}>{cfg.req} cert{cfg.req!==1?"s":""} · {cfg.mult} multiplier</span>
                {t===currentTier&&<span style={{ fontFamily:"monospace",fontSize:6,background:cfg.color,color:DARK,padding:"1px 5px",fontWeight:700 }}>CURRENT</span>}
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:2 }}>
                {cfg.rights.map((r,i)=>(
                  <div key={i} style={{ fontSize:11,color:"#C8BEA8",opacity:.75,display:"flex",gap:7,alignItems:"flex-start" }}>
                    <span style={{ color:cfg.color,flexShrink:0,marginTop:1 }}>→</span>{r}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastList items={toasts} rm={id=>setToasts(p=>p.filter(t=>t.id!==id))}/>
    </>
  );
}
