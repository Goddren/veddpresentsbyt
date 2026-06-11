import { useState, useEffect } from "react";
import { t } from "./i18n";

const SAVE_KEY = "byt_modules_v1";
const load = () => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}"); } catch { return {}; } };
const save = d => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch {} };

/* ─── Visual Diagrams ──────────────────────────────────────────────────── */

function MarketStructureDiagram({ color }) {
  return (
    <svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:480, margin:"12px 0", display:"block" }}>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={color} />
        </marker>
      </defs>
      {/* Uptrend side */}
      <text x="10" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">BULLISH — HH/HL</text>
      <polyline points="20,130 60,110 80,120 120,90 140,100 180,65 200,75" stroke="#4ADE80" strokeWidth="2" fill="none" />
      {/* Labels */}
      <text x="22" y="142" fontSize="7" fill="#4ADE80" fontFamily="monospace">HL</text>
      <text x="62" y="108" fontSize="7" fill="#4ADE80" fontFamily="monospace">HH</text>
      <text x="82" y="132" fontSize="7" fill="#4ADE80" fontFamily="monospace">HL</text>
      <text x="122" y="88" fontSize="7" fill="#4ADE80" fontFamily="monospace">HH</text>
      <text x="142" y="112" fontSize="7" fill="#4ADE80" fontFamily="monospace">HL</text>
      <text x="182" y="63" fontSize="7" fill="#4ADE80" fontFamily="monospace">HH</text>
      {/* Divider */}
      <line x1="240" y1="10" x2="240" y2="150" stroke="rgba(255,255,255,.1)" strokeWidth="1" strokeDasharray="4,4" />
      {/* Downtrend side */}
      <text x="250" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">BEARISH — LH/LL</text>
      <polyline points="260,40 300,60 320,50 360,75 380,65 420,90 440,80" stroke="#F87171" strokeWidth="2" fill="none" />
      <text x="262" y="38" fontSize="7" fill="#F87171" fontFamily="monospace">LH</text>
      <text x="302" y="72" fontSize="7" fill="#F87171" fontFamily="monospace">LL</text>
      <text x="322" y="48" fontSize="7" fill="#F87171" fontFamily="monospace">LH</text>
      <text x="362" y="87" fontSize="7" fill="#F87171" fontFamily="monospace">LL</text>
      <text x="382" y="63" fontSize="7" fill="#F87171" fontFamily="monospace">LH</text>
      <text x="422" y="102" fontSize="7" fill="#F87171" fontFamily="monospace">LL</text>
    </svg>
  );
}

function OrderBlockDiagram({ color }) {
  return (
    <svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:360, margin:"12px 0", display:"block" }}>
      <text x="10" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">ORDER BLOCK · BULLISH</text>
      {/* Candles before OB */}
      {[0,1,2].map(i => (
        <g key={i}>
          <line x1={30+i*30} y1={80+i*5} x2={30+i*30} y2={130-i*3} stroke="#F87171" strokeWidth="1.5" />
          <rect x={23+i*30} y={90+i*5} width="14" height={28-i*3} fill="#F87171" rx="1" />
        </g>
      ))}
      {/* OB candle highlight */}
      <rect x="110" y="72" width="60" height="38" fill="rgba(212,168,67,.15)" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="3,2" rx="2" />
      <text x="112" y="68" fontSize="7" fill="#D4A843" fontFamily="monospace">OB ZONE</text>
      <line x1="140" y1="60" x2="140" y2="110" stroke="#F87171" strokeWidth="1.5" />
      <rect x="133" y="72" width="14" height="30" fill="#F87171" rx="1" />
      {/* Impulse up */}
      <line x1="175" y1="40" x2="175" y2="90" stroke="#4ADE80" strokeWidth="1.5" />
      <rect x="168" y="40" width="14" height="40" fill="#4ADE80" rx="1" />
      <line x1="205" y1="25" x2="205" y2="65" stroke="#4ADE80" strokeWidth="1.5" />
      <rect x="198" y="25" width="14" height="35" fill="#4ADE80" rx="1" />
      <line x1="235" y1="15" x2="235" y2="50" stroke="#4ADE80" strokeWidth="1.5" />
      <rect x="228" y="15" width="14" height="30" fill="#4ADE80" rx="1" />
      {/* Retrace arrow */}
      <path d="M260,20 Q290,80 140,82" stroke="#D4A843" strokeWidth="1.5" fill="none" strokeDasharray="4,2" markerEnd="url(#arr2)" />
      <defs>
        <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#D4A843" />
        </marker>
      </defs>
      <text x="265" y="18" fontSize="8" fill="#D4A843" fontFamily="monospace">Price retests OB</text>
      <text x="265" y="30" fontSize="8" fill="#D4A843" fontFamily="monospace">→ continues up</text>
    </svg>
  );
}

function FVGDiagram({ color }) {
  return (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:320, margin:"12px 0", display:"block" }}>
      <text x="10" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">FAIR VALUE GAP</text>
      {/* Candle 1 */}
      <line x1="40" y1="80" x2="40" y2="130" stroke="#4ADE80" strokeWidth="1.5" />
      <rect x="33" y="90" width="14" height="30" fill="#4ADE80" rx="1" />
      <text x="28" y="142" fontSize="7" fill="rgba(255,255,255,.4)" fontFamily="monospace">C1</text>
      {/* Candle 2 — big impulse */}
      <line x1="80" y1="30" x2="80" y2="85" stroke="#4ADE80" strokeWidth="1.5" />
      <rect x="73" y="30" width="14" height="55" fill="#4ADE80" rx="1" />
      <text x="68" y="142" fontSize="7" fill="rgba(255,255,255,.4)" fontFamily="monospace">C2</text>
      {/* Candle 3 */}
      <line x1="120" y1="20" x2="120" y2="60" stroke="#4ADE80" strokeWidth="1.5" />
      <rect x="113" y="20" width="14" height="35" fill="#4ADE80" rx="1" />
      <text x="108" y="142" fontSize="7" fill="rgba(255,255,255,.4)" fontFamily="monospace">C3</text>
      {/* FVG zone */}
      <rect x="90" y="55" width="20" height="25" fill="rgba(212,168,67,.2)" stroke="#D4A843" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="90" y1="55" x2="170" y2="55" stroke="#D4A843" strokeWidth="1" strokeDasharray="2,3" />
      <line x1="90" y1="80" x2="170" y2="80" stroke="#D4A843" strokeWidth="1" strokeDasharray="2,3" />
      <text x="150" y="53" fontSize="7" fill="#D4A843" fontFamily="monospace">C1 high</text>
      <text x="150" y="83" fontSize="7" fill="#D4A843" fontFamily="monospace">C3 low</text>
      <text x="148" y="68" fontSize="8" fill="#D4A843" fontFamily="monospace" fontWeight="bold">FVG</text>
      {/* Fill arrow */}
      <path d="M200,20 C210,40 200,60 165,67" stroke="#D4A843" strokeWidth="1.5" fill="none" strokeDasharray="3,2" />
      <text x="165" y="18" fontSize="8" fill="#D4A843" fontFamily="monospace">Price fills gap</text>
      <text x="165" y="28" fontSize="8" fill="#D4A843" fontFamily="monospace">before continuing</text>
    </svg>
  );
}

function BRRRRDiagram({ color }) {
  const steps = ["BUY","REHAB","RENT","REFI","REPEAT"];
  const colors = ["#60A5FA","#F59E0B","#4ADE80","#A78BFA","#D4A843"];
  return (
    <svg viewBox="0 0 420 80" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:420, margin:"12px 0", display:"block" }}>
      <text x="10" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">THE BRRRR CYCLE</text>
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={20+i*78} y="25" width="60" height="36" fill={`${colors[i]}18`} stroke={colors[i]} strokeWidth="1.5" rx="4" />
          <text x={50+i*78} y="38" fontSize="7" fill={colors[i]} fontFamily="monospace" textAnchor="middle" letterSpacing="1">{s}</text>
          {i < 4 && <text x={84+i*78} y="46" fontSize="12" fill="rgba(255,255,255,.3)" textAnchor="middle">→</text>}
        </g>
      ))}
      {/* Loop back arrow */}
      <path d="M400,62 Q210,95 50,62" stroke="rgba(212,168,67,.3)" strokeWidth="1" fill="none" strokeDasharray="4,3" />
      <text x="170" y="80" fontSize="7" fill="rgba(212,168,67,.4)" fontFamily="monospace" textAnchor="middle">repeat with refinance proceeds</text>
    </svg>
  );
}

function BlockchainDiagram({ color }) {
  return (
    <svg viewBox="0 0 440 100" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:440, margin:"12px 0", display:"block" }}>
      <text x="10" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">BLOCKCHAIN STRUCTURE</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={20+i*100} y="25" width="80" height="58" fill={`${color}10`} stroke={color} strokeWidth="1" rx="4" />
          <text x={60+i*100} y="40" fontSize="6" fill={color} fontFamily="monospace" textAnchor="middle" letterSpacing="1">BLOCK {i+1}</text>
          <line x1={30+i*100} y1="45" x2={90+i*100} y2="45" stroke={`${color}30`} strokeWidth="1" />
          <text x={60+i*100} y="56" fontSize="5.5" fill="rgba(255,255,255,.35)" fontFamily="monospace" textAnchor="middle">hash: a3f{i}b...</text>
          <text x={60+i*100} y="67" fontSize="5.5" fill="rgba(255,255,255,.35)" fontFamily="monospace" textAnchor="middle">prev: {i===0 ? "0000..." : `a3f${i-1}b...`}</text>
          <text x={60+i*100} y="77" fontSize="5.5" fill="rgba(255,255,255,.35)" fontFamily="monospace" textAnchor="middle">txns: [{i*3+2}]</text>
          {i < 3 && <text x={104+i*100} y="57" fontSize="14" fill={`${color}50`} textAnchor="middle">⛓</text>}
        </g>
      ))}
    </svg>
  );
}

function WealthStackDiagram({ color }) {
  const layers = [
    { label:"401k (match)", w:"95%", c:"#4ADE80" },
    { label:"HSA",          w:"85%", c:"#60A5FA" },
    { label:"Roth IRA",     w:"75%", c:"#A78BFA" },
    { label:"Max 401k",     w:"65%", c:"#F59E0B" },
    { label:"Brokerage",    w:"55%", c:"#FB923C" },
    { label:"Real Estate",  w:"40%", c:"#D4A843" },
  ];
  return (
    <svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:360, margin:"12px 0", display:"block" }}>
      <text x="10" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">INVESTMENT STACK (IN ORDER)</text>
      {layers.map((l, i) => (
        <g key={l.label}>
          <text x="12" y={34+i*20} fontSize="7" fill="rgba(255,255,255,.5)" fontFamily="monospace">{i+1}</text>
          <rect x="28" y={24+i*20} width={parseInt(l.w)*2.6} height="14" fill={`${l.c}20`} stroke={l.c} strokeWidth="1" rx="2" />
          <text x="34" y={34+i*20} fontSize="7.5" fill={l.c} fontFamily="monospace">{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

function LiquidityDiagram({ color }) {
  return (
    <svg viewBox="0 0 380 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:380, margin:"12px 0", display:"block" }}>
      <text x="10" y="14" fontSize="9" fill={color} fontFamily="monospace" letterSpacing="2">LIQUIDITY SWEEP → REVERSAL</text>
      {/* Price path */}
      <polyline points="20,100 60,90 90,95 120,70 150,75 180,50 210,55 230,30 260,35 270,60 300,100 320,90 350,120"
        stroke="#60A5FA" strokeWidth="2" fill="none" />
      {/* SSL zone */}
      <line x1="20" y1="100" x2="200" y2="100" stroke="#F87171" strokeWidth="1" strokeDasharray="3,3" />
      <text x="22" y="113" fontSize="7" fill="#F87171" fontFamily="monospace">SSL — stop losses cluster here</text>
      {/* BSL zone */}
      <line x1="20" y1="35" x2="280" y2="35" stroke="#4ADE80" strokeWidth="1" strokeDasharray="3,3" />
      <text x="22" y="28" fontSize="7" fill="#4ADE80" fontFamily="monospace">BSL — buy stops above highs</text>
      {/* Sweep annotation */}
      <circle cx="230" cy="30" r="6" fill="none" stroke="#D4A843" strokeWidth="1.5" />
      <text x="238" y="26" fontSize="7" fill="#D4A843" fontFamily="monospace">BSL</text>
      <text x="238" y="35" fontSize="7" fill="#D4A843" fontFamily="monospace">grab</text>
      {/* Reversal arrow */}
      <path d="M270,60 Q290,90 320,88" stroke="#4ADE80" strokeWidth="2" fill="none" />
      <text x="285" y="78" fontSize="7" fill="#4ADE80" fontFamily="monospace">reversal</text>
    </svg>
  );
}

/* ─── Lesson visuals map ────────────────────────────────────────────────── */
const VISUALS = {
  t1l1: (c) => <MarketStructureDiagram color={c} />,
  t1l2: (c) => <LiquidityDiagram color={c} />,
  t1l3: (c) => <OrderBlockDiagram color={c} />,
  t2l1: (c) => <LiquidityDiagram color={c} />,
  t2l2: (c) => <FVGDiagram color={c} />,
  c1l1: (c) => <BlockchainDiagram color={c} />,
  re1l1:(c) => <BRRRRDiagram color={c} />,
  inv1l1:(c)=> <WealthStackDiagram color={c} />,
};

/* ─── Track data ────────────────────────────────────────────────────────── */
const TRACKS = [
  {
    id: "trading", icon: "📈", color: "#60A5FA", name: "Trading & Markets",
    desc: "ICT concepts, Smart Money, price action, and live market analysis.",
    modules: [
      {
        id: "t1", title: "Market Structure Mastery",
        lessons: [
          { id:"t1l1", title:"What is Market Structure?", mins:12, content:`Market structure is the foundation of all technical analysis. Before placing any trade, you must understand whether price is in an **uptrend**, **downtrend**, or **consolidation range**.

**Higher Highs & Higher Lows (HH/HL)** = Bullish market structure
Price is making progressively higher swing highs and higher swing lows. Smart money is accumulating.

**Lower Highs & Lower Lows (LH/LL)** = Bearish market structure
Price is making progressively lower swing highs and lower swing lows. Smart money is distributing.

**Consolidation / Range** = No clear direction
Price is chopping between a defined high and low. Wait for a breakout with conviction before trading.

**Break of Structure (BOS)**
When price breaks a key swing high (in a downtrend) or a key swing low (in an uptrend), structure has shifted. This is a major signal that the trend is changing. ICT calls this a "market structure shift."

**Change of Character (CHOCH)**
The first BOS against the prevailing trend. It signals that smart money may be reversing. Don't trade the CHOCH itself — wait for a pullback and confirmation.

**Key Rule:** Always trade WITH the higher timeframe structure. If the Daily is bearish, only take shorts on the 15-minute chart.` },
          { id:"t1l2", title:"Smart Money Concepts (ICT)", mins:18, content:`ICT (Inner Circle Trader) methodology focuses on how institutional traders — banks, hedge funds, the "smart money" — actually move markets.

**The Three Pillars of ICT**

1. **Liquidity** — Smart money needs large pools of orders to fill their positions. They hunt stop-loss clusters above swing highs (buy-side liquidity) and below swing lows (sell-side liquidity) before reversing.

2. **Order Blocks** — The last bearish candle before a major bullish move (bullish OB), or the last bullish candle before a major bearish move (bearish OB). Price often returns to these zones before continuing the move.

3. **Fair Value Gaps (FVG)** — When price moves so fast it leaves an "imbalance" — a gap between the wicks of three consecutive candles. Price has a magnetic tendency to fill these gaps before continuing.

**How to Use This:**
- Mark the Daily/4H Order Blocks and FVGs
- Wait for price to tap into those zones during London or New York session
- Look for a reaction (rejection candle, displacement) and enter in the direction of higher timeframe bias

**Sessions Matter:**
- London Open (3am EST): Major moves begin here
- New York Open (9:30am EST): Follow-through or reversal
- Kill zones are 2-5am EST and 8-11am EST` },
          { id:"t1l3", title:"Order Blocks & Fair Value Gaps", mins:15, content:`**Order Blocks (OB)**

An order block is the origin of a strong impulse move. When a bank wants to buy 1 billion dollars worth of EUR/USD, they can't just hit the market — they'd move price against themselves. Instead, they place orders and let price come back to their level.

*Bullish Order Block:* The last red (bearish) candle before a sharp upward move. When price returns to this candle's range, banks are filling remaining buy orders.

*Bearish Order Block:* The last green (bullish) candle before a sharp downward move. Banks filling sell orders.

**How to Mark an OB:**
1. Find a strong impulsive move (3+ candles in one direction)
2. Look back at the last opposing candle before the move started
3. Draw a box from that candle's high to its low
4. The box is your Order Block — watch for a reaction when price returns

**Fair Value Gaps (FVG / Imbalance)**

An FVG forms when:
- Candle 1 high is below Candle 3 low (bullish FVG — price moves up too fast)
- Candle 1 low is above Candle 3 high (bearish FVG — price moves down too fast)

The gap between C1's extreme and C3's extreme is the imbalance. Price will often return to fill this gap (reach "equilibrium") before continuing.

**Combined Strategy:**
When an OB and FVG overlap — that's a high-probability entry zone. Price returns to fill the FVG and tap the OB, then reverses with conviction.` },
        ]
      },
      {
        id: "t2", title: "Liquidity & Entries",
        lessons: [
          { id:"t2l1", title:"Liquidity Pools & Stop Hunts", mins:14, content:`**Understanding Liquidity**

Retail traders place stop losses in predictable locations:
- Below swing lows (for long positions)
- Above swing highs (for short positions)
- Below/above round numbers ($1.00, $100, $50,000)
- Below/above previous day's high and low

Smart money knows this. Before reversing, they drive price into these clusters to trigger stops — which become their buy or sell orders. This is called a "stop hunt" or "liquidity grab."

**Types of Liquidity:**
- **BSL (Buy-Side Liquidity):** Clusters of stop losses above swing highs. Smart money drives price up to grab BSL before reversing lower.
- **SSL (Sell-Side Liquidity):** Clusters of stop losses below swing lows. Smart money drives price down to grab SSL before reversing higher.
- **Equal Highs / Equal Lows:** Two or more price points at the same level create an obvious target.

**The Setup:**
1. Identify the higher timeframe bias (bullish or bearish)
2. Mark BSL/SSL levels
3. Wait for price to raid the opposing liquidity
4. Look for a strong reversal candle + displacement
5. Enter on the retest of the move's origin (OB or FVG)

**Example:** Market is bullish (Daily HTF). Price sweeps below a swing low (SSL grab). A strong bullish displacement follows. You enter long on the retest of the FVG left by the displacement.` },
          { id:"t2l2", title:"Entry Models & Risk Management", mins:20, content:`**ICT Entry Models**

**Model 1: OTE (Optimal Trade Entry)**
After a BOS, price pulls back into the 61.8–79% Fibonacci retracement of the previous swing. The OTE is a high-probability reversal zone that aligns with OBs and FVGs.

**Model 2: Silver Bullet (9:30-11am EST)**
During the New York Silver Bullet window, look for a liquidity sweep followed by FVG fill. This setup occurs 3x per day (London, NY AM, NY PM).

**Model 3: IPDA (Interbank Price Delivery Algorithm)**
Price seeks liquidity in 20, 40, and 60-day ranges. Mark the 20-day high/low. When price approaches these, expect acceleration or reversal.

**Risk Management Rules (Non-Negotiable):**

1. **Never risk more than 1-2% of account per trade**
   - $10,000 account = max $200 risk per trade
   - This lets you lose 50 trades in a row before blowing up

2. **Minimum 1:2 Risk-to-Reward**
   - If your stop is 10 pips, your target must be 20+ pips
   - Aim for 1:3 or 1:5 on high-conviction setups

3. **Trade the Kill Zones only**
   - 2-5am EST (London)
   - 8-11am EST (New York AM)
   - Avoid lunch hours (12-2pm EST) — choppy, unpredictable

4. **Size down on first entries in a new setup**
   - 50% position, add on confirmation
   - Full size only on the cleanest setups

5. **Daily loss limit: 3%**
   - If you're down 3% in a day, close the platform and walk away` },
        ]
      },
    ]
  },
  {
    id: "crypto", icon: "⛓️", color: "#A78BFA", name: "Crypto & Blockchain",
    desc: "How blockchain works, Solana ecosystem, DeFi, wallets, and $BYT tokenomics.",
    modules: [
      {
        id: "c1", title: "Blockchain Fundamentals",
        lessons: [
          { id:"c1l1", title:"How Blockchain Actually Works", mins:10, content:`A blockchain is a distributed ledger — a database that's copied across thousands of computers simultaneously, with no single owner.

**Core Concepts:**

**Block:** A container holding a batch of verified transactions. Each block contains:
- A list of transactions
- A timestamp
- A cryptographic hash of the previous block
- A unique nonce (number used once)

**Chain:** Every block references the one before it via its hash. Change one block and every block after it breaks — making tampering mathematically impossible.

**Consensus:** With no central authority, how do thousands of nodes agree on which transactions are valid?
- *Proof of Work (Bitcoin):* Nodes compete to solve complex math puzzles. Winner adds the block. Energy-intensive but battle-tested.
- *Proof of Stake (Solana, Ethereum):* Validators lock up ("stake") tokens as collateral. Selected randomly weighted by stake size. Energy efficient, fast.

**Why Solana?**
Solana processes 65,000 transactions per second (vs Bitcoin's 7). Transaction fees are fractions of a cent. $BYT runs on Solana for these reasons — fast, cheap, scalable for ambassador communities.

**Wallets:** Your wallet doesn't hold crypto — it holds your private key, which proves ownership of funds on the blockchain. Lose your private key = lose your funds permanently.` },
          { id:"c1l2", title:"Phantom Wallet & Solana Setup", mins:8, content:`**Setting Up Your Phantom Wallet**

Phantom is the primary wallet for the Solana ecosystem and where your $BYT tokens will live.

**Step 1: Install**
- Visit phantom.app (only this URL — beware fakes)
- Install the browser extension or mobile app
- Click "Create New Wallet"

**Step 2: Secret Recovery Phrase**
You'll receive a 12-word seed phrase. This is the master key to your wallet.
- Write it on paper — never digitally
- Store it in two physical locations
- Never share it with anyone, ever
- BYT will NEVER ask for your seed phrase

**Step 3: Create a Password**
Your password protects the app on your device. The seed phrase protects your funds everywhere.

**Step 4: Fund Your Wallet**
To receive $BYT:
- You need a small amount of SOL (Solana) to pay gas fees (~$0.01 per transaction)
- Buy SOL from Coinbase, Kraken, or any major exchange
- Send to your Phantom wallet address

**Connecting to BYT Platform:**
When you click "Connect Wallet" on BYT Academy, Phantom will pop up and ask you to approve the connection. You're approving BYT to VIEW your wallet address — not access your funds.` },
        ]
      },
      {
        id: "c2", title: "DeFi & $BYT Tokenomics",
        lessons: [
          { id:"c2l1", title:"DeFi: Decentralized Finance", mins:12, content:`**What is DeFi?**

DeFi replaces banks, brokerages, and exchanges with software running on blockchain. No CEOs, no headquarters, no business hours — just code executing automatically via smart contracts.

**Key DeFi Primitives:**

**DEX (Decentralized Exchange):** Trade crypto directly from your wallet with no middleman.
- Raydium, Jupiter, Orca — all on Solana
- Liquidity pools replace order books
- You trade against a pool, not another person

**Liquidity Pools:** Users deposit pairs of tokens (e.g., SOL/USDC) and earn fees from every swap. This is "liquidity mining."

**Staking:** Lock your tokens to help secure the network and earn yield. Solana staking yields ~6-7% APY.

**Yield Farming:** Deposit into DeFi protocols to earn additional token rewards on top of trading fees.

**Smart Contracts:** Self-executing code on the blockchain. When you complete a BYT certification, a smart contract automatically mints $BYT to your wallet. No human approval needed.

**Risks:**
- Smart contract bugs (use audited protocols only)
- Impermanent loss in liquidity pools
- Rug pulls (research teams before investing)
- Always start small and learn before committing large capital` },
          { id:"c2l2", title:"$BYT Token: Earn & Use", mins:10, content:`**$BYT Tokenomics**

$BYT (Be Ye Transformed) is the utility and rewards token of the BYT ecosystem, deployed on Solana.

**How to Earn $BYT:**
| Action | $BYT Earned |
|--------|-------------|
| Complete a module | 5 $BYT |
| Pass a track exam | 25 $BYT |
| Earn a certification | 100 $BYT |
| Host a workshop | 50 $BYT |
| NFC garment tap | 1 $BYT |
| Refer a new member | 20 $BYT |

**Total Supply:** 100,000,000 $BYT
- 40% — Community rewards (earn-to-learn)
- 20% — Development fund
- 15% — Team (4-year vesting)
- 15% — Grant-matching treasury
- 10% — Liquidity (DEX)

**Governance:** $BYT holders vote on new certification tracks, grant allocation priorities, platform fee structures, and expansion to new cities.` },
        ]
      },
    ]
  },
  {
    id: "realestate", icon: "🏠", color: "#4ADE80", name: "Real Estate",
    desc: "Buy & hold, BRRRR, wholesaling, short-term rentals, and creative financing.",
    modules: [
      {
        id: "re1", title: "Real Estate Foundations",
        lessons: [
          { id:"re1l1", title:"The BRRRR Method Explained", mins:14, content:`BRRRR stands for: **Buy, Rehab, Rent, Refinance, Repeat.** It's the most powerful wealth-building strategy in real estate for investors without large amounts of capital.

**Step 1: Buy Below Market**
Target distressed properties at 60-75% of ARV (After Repair Value). Sources:
- Wholesalers
- Driving for Dollars (find vacant/neglected homes)
- Direct mail to absentee owners
- Tax delinquent lists from the county

**Step 2: Rehab**
Fix only what affects value or rentability. Focus on:
- Roof, HVAC, plumbing, electrical (mechanicals)
- Kitchen and bathrooms (highest ROI)
- Curb appeal
Target $10,000-$30,000 rehab budgets for your first deal.

**Step 3: Rent**
Stabilize the property with a tenant paying market rent. Get 3-6 months of rent history if possible before refinancing.

**Step 4: Refinance (Cash-Out)**
Now that the property is repaired and rented, it appraises at full ARV. A cash-out refinance at 75% LTV pulls out most or all of your initial investment.

Example: Buy $60K + $20K rehab = $80K in. ARV = $120K. 75% refi = $90K out. **You pulled out more than you put in.** The property still cash flows.

**Step 5: Repeat**
Take the cash from the refinance and buy the next deal. Rinse, repeat, build a portfolio with minimal out-of-pocket capital.` },
          { id:"re1l2", title:"Analyzing a Rental Deal", mins:11, content:`**The 1% Rule (Quick Filter)**
Monthly rent should be at least 1% of purchase price.
- $100,000 property → needs $1,000+/mo rent to pass
- This is a FILTER, not a guarantee of cash flow

**Full Cash Flow Analysis:**

Gross Rents: $1,200/mo
Less Vacancy (8%): -$96
Effective Gross Income: $1,104

Operating Expenses:
- Property Tax: -$100
- Insurance: -$80
- Property Management (10%): -$110
- Maintenance & CapEx (10%): -$110
- Utilities (if any): -$0

Net Operating Income (NOI): $704/mo
Debt Service (mortgage @ 7%, 30yr, $75K loan): -$499/mo

**Monthly Cash Flow: $205**
**Annual Cash Flow: $2,460**
**Cash-on-Cash Return: 12.3%** (on $20K down)

**Key Metrics:**
- Cap Rate = NOI / Purchase Price (target 8%+)
- Cash-on-Cash = Annual Cash Flow / Cash Invested (target 10%+)
- GRM = Price / Annual Gross Rent (lower is better, target <10)` },
        ]
      },
    ]
  },
  {
    id: "ai", icon: "🤖", color: "#F59E0B", name: "Artificial Intelligence",
    desc: "Prompt engineering, AI tools for business, automation workflows, and AI ethics.",
    modules: [
      {
        id: "ai1", title: "AI for Business & Productivity",
        lessons: [
          { id:"ai1l1", title:"Prompt Engineering 101", mins:12, content:`Prompt engineering is the skill of communicating with AI to get professional, accurate, and useful results. It's the highest-ROI skill of the next decade.

**The Core Formula:**
> [Role] + [Context] + [Task] + [Format] + [Constraints]

**Example — Bad Prompt:**
"Write a business plan"

**Example — Great Prompt:**
"You are an experienced startup advisor specializing in EdTech nonprofits. I'm launching BYT Academy, a financial literacy platform for underserved communities in Tulsa, OK. Write a one-page executive summary for a grant application targeting DOL WIOA funding. Include: mission statement, target population, program description, expected outcomes, and budget overview. Use formal nonprofit grant language. Keep it under 400 words."

**Key Techniques:**

**1. Chain of Thought**
Ask the AI to think step-by-step before answering.

**2. Role Assignment**
"You are a [role] with [X] years experience in [field]..."

**3. Examples (Few-Shot)**
Provide 1-2 examples of the output format you want before asking the question.

**4. Iteration**
Never accept the first output. Follow up with: "Make it more concise" or "Add more specifics about X"

**Tools to Know:**
- Claude (Anthropic): Best for long documents, analysis, coding
- ChatGPT: Broad use, good for brainstorming
- Perplexity: AI with real-time web search
- Midjourney / DALL-E: Image generation
- ElevenLabs: Voice cloning and audio` },
          { id:"ai1l2", title:"AI Grant Writing Workflow", mins:15, content:`AI has leveled the playing field for nonprofit grant writing. What used to require a $5,000 grant writer can now be done in 2 hours with the right workflow.

**The BYT AI Grant Writing Process:**

**Step 1: Gather Your Foundation Documents**
Before prompting AI, collect:
- Your mission statement
- Target population demographics
- Program description (what you do, how, for whom)
- Previous outcomes / evidence (even anecdotal)
- Budget breakdown
- Organizational background

**Step 2: Research the Grant**
For each grant opportunity:
- What are the stated priorities?
- What language do they use? (Mirror it)
- What outcomes do they measure?
- What's the maximum award?

**Step 3: The Prompting Sequence**

Prompt 1 — Needs Statement:
"Using the following data about Tulsa, OK [paste local poverty/education stats], write a compelling needs statement for a workforce development grant."

Prompt 2 — Program Description:
"Write a program description for BYT Academy for a WIOA Section 166 grant."

Prompt 3 — Budget Narrative:
"Write a budget narrative justifying these line items: [paste budget]."

Prompt 4 — Evaluation Plan:
"Write an evaluation plan section. Our measurable outcomes: [list]."

**Step 4: Human Review**
AI writes the draft. You add specific local names, partners, and stories. Check every fact and statistic.` },
        ]
      },
    ]
  },
  {
    id: "business", icon: "🏢", color: "#FB923C", name: "Business Building",
    desc: "LLC formation, business credit, entity structure, ops, and scaling systems.",
    modules: [
      {
        id: "bb1", title: "Business Credit Mastery",
        lessons: [
          { id:"bb1l1", title:"Building Business Credit from Zero", mins:16, content:`Business credit is entirely separate from personal credit. With the right strategy, you can build $50,000-$250,000 in business credit in 12-18 months, with NO personal guarantee required.

**Step 1: Build Your Business Foundation (Months 1-2)**
- Form an LLC or Corporation (not a sole prop — no separation)
- Get an EIN from IRS.gov (free, instant)
- Open a dedicated business bank account
- Get a business phone number (Google Voice works)
- Build a basic website (even a one-pager)
- Register with Dun & Bradstreet — get your DUNS number (free at dnb.com)

**Step 2: Establish Trade Lines (Months 2-4)**
Net-30 vendors report your payment history to business credit bureaus. Pay early and build your profile.

Top Starter Net-30 Accounts:
- Uline — office/shipping supplies
- Quill — office supplies
- Grainger — industrial supplies

Order small amounts ($100-500). Pay on day 20-25 (not day 30). Do this 3 months in a row.

**Step 3: Monitor Your Scores**
- Dun & Bradstreet PAYDEX: Target 80+
- Experian Business: Target 70+
- Equifax Business: Target 90+
Use Nav.com (free tier) to monitor all three.

**Step 4: Graduate to Bank Credit (Months 6-12)**
With 8-10 trade lines and 6 months of history:
- Apply for Brex (no personal guarantee, $25K-$150K limit)
- Apply for Amex Blue Business Cash
- Apply for a secured business line of credit` },
        ]
      },
    ]
  },
  {
    id: "investing", icon: "💼", color: "#F87171", name: "Investing & Wealth",
    desc: "Index funds, dividend investing, portfolio building, tax strategy, and generational wealth.",
    modules: [
      {
        id: "inv1", title: "Wealth Building Fundamentals",
        lessons: [
          { id:"inv1l1", title:"The Wealth Formula", mins:10, content:`**Wealth = (Income - Expenses) × Time × Rate of Return**

Every variable matters. Most people focus only on income. The wealthy focus on all four.

**Step 1: The Wealth Gap — Income vs. Expenses**
You cannot out-earn bad spending habits at the beginning. Before investing:
- Track every dollar for 30 days
- Target a 20-30% savings rate minimum
- Eliminate high-interest debt first (anything above 7%)
- Build a 3-6 month emergency fund

**Step 2: The Investment Stack (In Order)**
1. 401(k) up to employer match — free 50-100% return, take it
2. HSA (if eligible) — triple tax advantage
3. Roth IRA — $7,000/yr, tax-free growth for life
4. 401(k) to max ($23,000/yr)
5. Taxable brokerage account — no limits, full flexibility
6. Real estate, business, alternative assets

**Step 3: Index Fund Core Portfolio**
For most people, a simple 3-fund portfolio beats 90% of active managers:
- 60% VTI (Total US Market)
- 30% VXUS (International)
- 10% BND (Bonds) — increase with age

**Step 4: Time is the Variable**
$500/mo invested for 40 years at 8% average return = $1,745,505
$500/mo invested for 20 years at 8% = $294,510

Starting 20 years earlier yields 6x more wealth. Start NOW, even if small.` },
        ]
      },
    ]
  },
  {
    id: "stem", icon: "🔬", color: "#34D399", name: "STEM",
    desc: "Coding, data science, engineering fundamentals, and STEM career pathways.",
    modules: [
      {
        id: "st1", title: "STEM Career Pathways",
        lessons: [
          { id:"st1l1", title:"Tech Careers: No CS Degree Required", mins:11, content:`The technology industry is one of the few fields where skills consistently outweigh credentials. A self-taught developer with a strong portfolio can out-earn a CS grad from a state school.

**High-Income Tech Paths (No Degree Required):**

**Software Development** — $70K-$150K starting
Stack: JavaScript + React for frontend, Python or Node.js for backend
Timeline: 6-12 months to job-ready with focused study

**Data Analysis** — $55K-$120K starting
Stack: SQL + Python (Pandas) + Tableau
Timeline: 4-8 months

**Cybersecurity** — $65K-$130K starting
Certifications: CompTIA Security+ → CEH → CISSP
High demand, especially for government/defense contractors

**Cloud Engineering** — $80K-$150K starting
Certifications: AWS Certified Solutions Architect, Google Cloud
The cloud runs everything — demand is exploding

**AI/ML Engineering** — $100K-$200K+
Stack: Python + TensorFlow/PyTorch + Statistics
This is the gold rush of our era

**The Self-Study Formula:**
1. Pick ONE path (don't switch for 6 months)
2. Learn 2 hours every day minimum
3. Build 3 projects before applying anywhere
4. Your GitHub is your resume
5. Apply to 10 jobs per week once portfolio is ready` },
        ]
      },
    ]
  },
  {
    id: "trades", icon: "🔧", color: "#FBBF24", name: "Skilled Trades",
    desc: "Electrician, plumbing, HVAC, and how to build a trades business.",
    modules: [
      {
        id: "tr1", title: "Trades as Wealth Vehicles",
        lessons: [
          { id:"tr1l1", title:"Why Trades Beat Most College Degrees", mins:9, content:`The skilled trades shortage is one of the most significant economic opportunities of the next 20 years. 3.5 million trade jobs will go unfilled by 2030.

**The Numbers Don't Lie:**
- Average 4-year college: $120,000 in debt, 4 years out of income
- Electrician apprenticeship: Paid $18-22/hr while learning, zero tuition
- Master electrician income: $75,000-$120,000+
- Electrical contractor (own business): $200,000-$500,000+

**Top Trades by Income Potential:**
1. **Elevator Technician** — $97,000 avg, union, hardest to break in
2. **Electrician** — $60-120K, own business potential unlimited
3. **Plumber** — $58-100K, perpetual demand
4. **HVAC Technician** — $52-90K, seasonal spikes in pricing power
5. **Welder** — $42-80K, underwater/pipeline welding pays $150K+

**The Business Stack:**
Year 1-3: Apprentice/Journeyman (learn the trade)
Year 3-5: Foreman/Lead tech (learn to manage)
Year 5-7: Get your master license (now you can pull permits)
Year 7+: Start your own company

**One truck + one helper = $200-400K/year in revenue for a skilled tradesman.**` },
        ]
      },
    ]
  },
  {
    id: "health", icon: "🌿", color: "#2DD4BF", name: "Health & Wellness",
    desc: "Mental health, fitness for wealth, nutrition, and building healthy habits for high performance.",
    modules: [
      {
        id: "hw1", title: "Performance & Mindset",
        lessons: [
          { id:"hw1l1", title:"High Performance Health Habits", mins:10, content:`Your body and mind are the most important assets you own. No amount of wealth building matters if your health fails. High performers optimize both simultaneously.

**The Foundation Stack:**

**Sleep (Non-Negotiable)**
Sleep is when your brain consolidates learning and your body repairs.
- Target 7-9 hours for adults
- Sleep and wake at the same time daily (even weekends)
- No screens 30 minutes before bed
- Cool room (65-68°F) for optimal sleep quality

**Movement**
Exercise is the most powerful antidepressant and cognitive enhancer available.
- Minimum: 150 minutes of moderate cardio per week
- Optimal: 3-4 strength training sessions + 2 cardio sessions
- Even a 20-minute walk improves focus and mood for 2-3 hours

**Nutrition for Performance**
- Protein first at every meal (0.8-1g per pound of bodyweight)
- Minimize ultra-processed food
- Hydrate: Half your bodyweight in ounces of water daily
- Meal prep Sunday: removes daily decision fatigue

**Mindset & Mental Health**
- Daily journaling: 3 gratitudes + 1 challenge you're working through
- Meditation: Even 5 minutes of focused breathing reduces cortisol
- Therapy is a competitive advantage, not a weakness
- Your environment shapes your behavior — audit who you spend time with

**The BYT Principle:**
Transformation is holistic. Financial freedom means nothing if you're sick, burned out, or mentally broken. Build your health like you build wealth — consistently, compounding over time.` },
        ]
      },
    ]
  },
  {
    id: "origins", icon: "🌐", color: "#D4A843", name: "Ambassador Origins",
    desc: "The BYT mission, ambassador culture, how to host workshops, and community leadership.",
    modules: [
      {
        id: "ao1", title: "The Ambassador Path",
        lessons: [
          { id:"ao1l1", title:"What It Means to Be a BYT Ambassador", mins:8, content:`A BYT Ambassador is more than a student — you are a community leader, a wealth educator, and a living example of transformation.

**The Ambassador Mission:**
Take what you learn on BYT Academy into your community. Host workshops. Share resources. Build the next generation of wealth-literate leaders in Tulsa and beyond.

**Ambassador Values:**
- **Give first.** Share knowledge freely. Abundance grows when you give.
- **Do the work.** Certifications are earned, not given.
- **Lead by example.** Your results are your testimony.
- **Build together.** We rise by lifting others.

**What Ambassadors Do:**
- Host free financial literacy workshops in their community
- Earn $BYT for every attendee who completes a module
- Guide new members through the onboarding process
- Represent BYT at community events
- Create content showing their transformation journey

**How to Host Your First Workshop:**
1. Find a location (church, library, community center — all free)
2. Choose a topic from BYT Academy (Trading 101, Credit Basics, etc.)
3. Invite 10-20 people from your network
4. Use the BYT workshop slide deck (provided in Ambassador Kit)
5. Walk attendees through signing up on the platform
6. Earn $BYT for every attendee who completes a module

**The Ripple Effect:**
You teach 20 people. Those 20 teach 20 more. Within 3 years, your single decision to become an ambassador reaches 8,000 people with life-changing financial education.

**That is what Be Ye Transformed means.**` },
        ]
      },
    ]
  },
];

/* ─── Flat lesson list for prev/next nav ────────────────────────────────── */
const ALL_LESSONS = TRACKS.flatMap(tr =>
  tr.modules.flatMap(mod =>
    mod.lessons.map(les => ({ ...les, trackId: tr.id, modId: mod.id, trackColor: tr.color, trackName: tr.name, trackIcon: tr.icon }))
  )
);

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function DeepModules({ theme, lang = "en" }) {
  const T   = theme || { bg:"#05050A", surf:"#0D0B1A", a:"#D4A843", text:"#F5F0E8", muted:"rgba(212,168,67,.45)", border:"rgba(212,168,67,.15)", borderSoft:"rgba(212,168,67,.07)", inputBg:"rgba(212,168,67,.06)", green:"#4ADE80", name:"gold" };
  const bw  = T.name === "bw";
  const tr  = k => t(lang, k);

  const [saved,    setSaved]    = useState(() => load());
  const [trackId,  setTrackId]  = useState("trading");
  const [modId,    setModId]    = useState("t1");
  const [lessonId, setLessonId] = useState(null);
  const [mob,      setMob]      = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const done = saved.done || {};
  function markDone(id) {
    const nd = { ...done, [id]: !done[id] };
    const ns = { ...saved, done: nd };
    setSaved(ns);
    save(ns);
  }

  function openLesson(les) {
    setTrackId(les.trackId);
    setModId(les.modId);
    setLessonId(les.id);
  }

  const track  = TRACKS.find(tr => tr.id === trackId);
  const module = track?.modules.find(m => m.id === modId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  // Prev / next across ALL lessons
  const flatIdx   = ALL_LESSONS.findIndex(l => l.id === lessonId);
  const prevLesson = flatIdx > 0                        ? ALL_LESSONS[flatIdx - 1] : null;
  const nextLesson = flatIdx < ALL_LESSONS.length - 1   ? ALL_LESSONS[flatIdx + 1] : null;

  const totalLessons = ALL_LESSONS.length;
  const totalDone    = Object.values(done).filter(Boolean).length;
  const pct          = Math.round(totalDone / totalLessons * 100);

  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.text, fontFamily:"Georgia,serif" }}>

      {/* Header */}
      <div style={{ padding:"16px 18px 12px", background:T.surf, borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontFamily:"monospace", fontSize:8, letterSpacing:".35em", color:T.muted, marginBottom:4 }}>{tr("deepHeader")}</div>
            <h1 style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize:20, color:T.a }}>{tr("deepModules")}</h1>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted }}>{tr("progress")}</div>
            <div style={{ fontFamily:"monospace", fontWeight:900, fontSize:20, color:T.a }}>{totalDone}/{totalLessons}</div>
            <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted }}>{pct}% · {tr("lessonsComplete")}</div>
          </div>
        </div>
        <div style={{ height:3, background:T.borderSoft, borderRadius:2, overflow:"hidden", marginTop:8 }}>
          <div className="bar-animate" style={{ height:"100%", background:`linear-gradient(to right, ${T.a}, ${T.a}BB)`, width:`${pct}%`, borderRadius:2, "--w":`${pct}%` }} />
        </div>
      </div>

      <div style={{ display:"flex", height:"calc(100vh - 120px)", overflow:"hidden" }}>

        {/* Track sidebar */}
        <div style={{ width: mob ? 52 : 190, flexShrink:0, background:bw ? T.surf : "rgba(0,0,0,.2)", borderRight:`1px solid ${T.border}`, overflowY:"auto" }}>
          {TRACKS.map(tr2 => {
            const tLessons = tr2.modules.flatMap(m => m.lessons);
            const tDone    = tLessons.filter(l => done[l.id]).length;
            const active   = tr2.id === trackId;
            return (
              <div key={tr2.id}
                onClick={() => { setTrackId(tr2.id); setModId(tr2.modules[0].id); setLessonId(null); }}
                className="card-hover"
                style={{
                  padding: mob ? "10px 0" : "10px 12px",
                  background: active ? (bw ? T.bg : `${tr2.color}12`) : "transparent",
                  borderLeft: `3px solid ${active ? tr2.color : "transparent"}`,
                  cursor:"pointer", textAlign: mob ? "center" : "left",
                  transition:"background .15s, border-color .15s"
                }}>
                <div style={{ fontSize: mob ? 18 : 20, marginBottom: mob ? 0 : 2 }}>{tr2.icon}</div>
                {!mob && (
                  <>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:11, fontWeight:600, color: active ? tr2.color : T.text, marginTop:3, lineHeight:1.3 }}>{tr2.name}</div>
                    <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginTop:2 }}>{tDone}/{tLessons.length} {tr("lessonsDone")}</div>
                    {/* mini progress bar */}
                    <div style={{ height:2, background:T.borderSoft, borderRadius:1, overflow:"hidden", marginTop:4 }}>
                      <div style={{ height:"100%", background:tr2.color, width:`${tLessons.length ? Math.round(tDone/tLessons.length*100) : 0}%`, transition:"width .4s" }} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Main area */}
        <div style={{ flex:1, overflowY:"auto", padding: mob ? "12px 10px" : "16px 20px" }}>
          {!lesson ? (
            <>
              {/* Track header */}
              <div className="fade-up" style={{ padding:"14px 16px", background: bw ? T.surf : `${track?.color}0A`, border:`1px solid ${track?.color}33`, marginBottom:14, position:"relative" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:track?.color }} />
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:32 }}>{track?.icon}</span>
                  <div>
                    <div style={{ fontFamily:"monospace", fontSize:8, color:track?.color, letterSpacing:".15em" }}>{tr("learningTrack")}</div>
                    <div style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:18, color:T.text }}>{track?.name}</div>
                    <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:11, color:T.muted, marginTop:2 }}>{track?.desc}</div>
                  </div>
                </div>
              </div>

              {/* Modules list */}
              {track?.modules.map((mod, mi) => {
                const mLessons = mod.lessons;
                const mDone    = mLessons.filter(l => done[l.id]).length;
                const expanded = mod.id === modId;
                return (
                  <div key={mod.id} className={`fade-up s${mi}`} style={{ marginBottom:8 }}>
                    <div onClick={() => setModId(expanded ? null : mod.id)}
                      style={{ padding:"12px 14px", background: expanded ? T.inputBg : (bw ? T.surf : "transparent"), border:`1px solid ${T.border}`, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", transition:"background .15s" }}>
                      <div>
                        <div style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:13, color:T.text }}>{mod.title}</div>
                        <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginTop:2 }}>{mLessons.length} lessons · {mDone}/{mLessons.length} {tr("lessonsDone")}</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:40, height:3, background:T.borderSoft, borderRadius:2, overflow:"hidden" }}>
                          <div style={{ height:"100%", background:track?.color, width:`${Math.round(mDone/mLessons.length*100)}%`, transition:"width .4s" }} />
                        </div>
                        <span style={{ color:T.muted, fontSize:10, transition:"transform .2s", display:"inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                      </div>
                    </div>
                    {expanded && (
                      <div style={{ borderLeft:`2px solid ${track?.color}40`, marginLeft:14 }}>
                        {mLessons.map((les, li) => (
                          <div key={les.id}
                            className={`card-hover fade-up s${li}`}
                            style={{ display:"flex", gap:10, padding:"10px 14px", borderBottom:`1px solid ${T.borderSoft}`, background: done[les.id] ? `${T.green}05` : "transparent" }}
                            onClick={() => setLessonId(les.id)}>
                            <div style={{ width:20, height:20, borderRadius:"50%", flexShrink:0, border:`2px solid ${done[les.id] ? T.green : T.border}`, background: done[les.id] ? `${T.green}18` : "transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:T.green, transition:"all .2s" }}>
                              {done[les.id] ? "✓" : ""}
                            </div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontFamily:"Georgia,serif", fontSize:12, fontWeight:600, color: done[les.id] ? T.green : T.text }}>{les.title}</div>
                              <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, marginTop:1 }}>{les.mins} {tr("minRead")} {VISUALS[les.id] ? "· 📊 diagram" : ""}</div>
                            </div>
                            <div style={{ fontFamily:"monospace", fontSize:9, color:T.muted, alignSelf:"center" }}>→</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Related tracks */}
              <div style={{ marginTop:24, padding:"12px 14px", background: bw ? T.surf : T.inputBg, border:`1px solid ${T.borderSoft}` }}>
                <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, letterSpacing:".2em", marginBottom:8 }}>RELATED TRACKS</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {TRACKS.filter(tr2 => tr2.id !== trackId).slice(0,5).map(tr2 => (
                    <div key={tr2.id}
                      className="btn-press"
                      onClick={() => { setTrackId(tr2.id); setModId(tr2.modules[0].id); setLessonId(null); }}
                      style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", background:`${tr2.color}10`, border:`1px solid ${tr2.color}30`, cursor:"pointer" }}>
                      <span style={{ fontSize:12 }}>{tr2.icon}</span>
                      <span style={{ fontFamily:"monospace", fontSize:7, color:tr2.color, letterSpacing:".07em" }}>{tr2.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* ── Lesson view ── */
            <div className="pg-enter">
              {/* Nav bar */}
              <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
                <button onClick={() => setLessonId(null)} className="btn-press"
                  style={{ fontFamily:"monospace", fontSize:8, color:T.muted, background:"transparent", border:`1px solid ${T.border}`, padding:"5px 12px", cursor:"pointer", letterSpacing:".1em" }}>
                  {tr("backToModules")}
                </button>
                <div style={{ flex:1 }} />
                {prevLesson && (
                  <button onClick={() => openLesson(prevLesson)} className="btn-press"
                    style={{ fontFamily:"monospace", fontSize:8, color:T.muted, background:"transparent", border:`1px solid ${T.border}`, padding:"5px 12px", cursor:"pointer", letterSpacing:".08em", display:"flex", alignItems:"center", gap:5 }}>
                    <span>{prevLesson.trackIcon}</span> {tr("prevLesson")}
                  </button>
                )}
                {nextLesson && (
                  <button onClick={() => openLesson(nextLesson)} className="btn-press"
                    style={{ fontFamily:"monospace", fontSize:8, color:T.a, background:bw ? T.bg : `${T.a}10`, border:`1px solid ${T.a}40`, padding:"5px 12px", cursor:"pointer", letterSpacing:".08em", display:"flex", alignItems:"center", gap:5 }}>
                    {tr("nextLesson")} <span>{nextLesson.trackIcon}</span>
                  </button>
                )}
              </div>

              {/* Lesson header */}
              <div style={{ padding:"16px 18px", background: bw ? T.surf : `${track?.color}08`, border:`1px solid ${track?.color}33`, marginBottom:16 }}>
                <div style={{ fontFamily:"monospace", fontSize:7, color:track?.color, letterSpacing:".2em", marginBottom:4 }}>{track?.name} · {module?.title}</div>
                <h2 style={{ fontFamily:"Georgia,serif", fontWeight:900, fontSize: mob ? 17 : 22, color:T.text, marginBottom:6 }}>{lesson?.title}</h2>
                <div style={{ fontFamily:"monospace", fontSize:8, color:T.muted }}>{lesson?.mins} {tr("minRead")} {VISUALS[lessonId] ? "· includes diagram" : ""}</div>
              </div>

              {/* Diagram (if available) */}
              {VISUALS[lessonId] && (
                <div className="fade-up" style={{ padding:"14px 16px", background: bw ? T.surf : `${track?.color}05`, border:`1px solid ${track?.color}20`, marginBottom:16 }}>
                  <div style={{ fontFamily:"monospace", fontSize:7, color:track?.color, letterSpacing:".2em", marginBottom:6 }}>📊 VISUAL DIAGRAM</div>
                  {VISUALS[lessonId](track?.color)}
                </div>
              )}

              {/* Lesson content */}
              <div style={{ padding:"0 4px", lineHeight:1.85, fontSize:13, color:T.text }}>
                {lesson?.content.split("\n").map((line, i) => {
                  if (!line.trim()) return <div key={i} style={{ height:10 }} />;
                  if (line.startsWith("**") && line.endsWith("**") && line.split("**").length === 3)
                    return <h3 key={i} style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:15, color:T.a, margin:"14px 0 6px" }}>{line.replace(/\*\*/g,"")}</h3>;
                  return <p key={i} style={{ marginBottom:8, color:T.text, fontFamily:"Georgia,serif" }}
                    dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${T.a}">$1</strong>`) }} />;
                })}
              </div>

              {/* Action buttons */}
              <div style={{ marginTop:24, display:"flex", gap:10, flexWrap:"wrap" }}>
                <button onClick={() => markDone(lessonId)} className="btn-press"
                  style={{
                    padding:"10px 24px", fontFamily:"monospace", fontSize:9, letterSpacing:".12em",
                    background: done[lessonId] ? `${T.green}18` : T.a,
                    color: done[lessonId] ? T.green : (bw ? "#fff" : "#05050A"),
                    border: `1px solid ${done[lessonId] ? T.green : T.a}`, cursor:"pointer"
                  }}>
                  {done[lessonId] ? tr("marked") : tr("markComplete")}
                </button>
                {nextLesson && (
                  <button onClick={() => openLesson(nextLesson)} className="btn-press"
                    style={{ padding:"10px 20px", fontFamily:"monospace", fontSize:9, letterSpacing:".1em", background:bw ? T.bg : `${T.a}10`, color:T.a, border:`1px solid ${T.a}40`, cursor:"pointer" }}>
                    {tr("nextLesson")} {nextLesson.trackIcon}
                  </button>
                )}
                <button onClick={() => setLessonId(null)} className="btn-press"
                  style={{ padding:"10px 20px", fontFamily:"monospace", fontSize:9, letterSpacing:".1em", background:"transparent", color:T.muted, border:`1px solid ${T.border}`, cursor:"pointer" }}>
                  {tr("back")}
                </button>
              </div>

              {/* Progress indicator */}
              {flatIdx >= 0 && (
                <div style={{ marginTop:20, padding:"10px 14px", background: bw ? T.surf : T.inputBg, border:`1px solid ${T.borderSoft}` }}>
                  <div style={{ fontFamily:"monospace", fontSize:7, color:T.muted, letterSpacing:".15em", marginBottom:6 }}>
                    LESSON {flatIdx+1} OF {ALL_LESSONS.length} · {Math.round((flatIdx+1)/ALL_LESSONS.length*100)}% THROUGH ALL MODULES
                  </div>
                  <div style={{ height:2, background:T.borderSoft, borderRadius:1, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:track?.color, width:`${Math.round((flatIdx+1)/ALL_LESSONS.length*100)}%`, transition:"width .4s" }} />
                  </div>
                </div>
              )}

              <div style={{ height:40 }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
