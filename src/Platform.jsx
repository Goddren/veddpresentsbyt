const G = "#D4A843";

export default function Platform() {
  return (
    <div style={{ background: "#05050A", minHeight: "100vh", color: "#F5F0E8", fontFamily: "Georgia,serif", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 32 }}>
      <div style={{ fontSize: 48 }}>⚡</div>
      <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: ".45em", color: "rgba(212,168,67,.4)" }}>VEDD TECHNOLOGIES</div>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 28, fontWeight: 700, color: G, textAlign: "center" }}>BYT Platform</div>
      <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 14, color: "rgba(212,168,67,.5)", textAlign: "center", maxWidth: 400, lineHeight: 1.7 }}>
        Be Ye Transformed — Financial literacy education, powered by community and Web3.
      </div>
      <div style={{ marginTop: 8, padding: "10px 24px", background: "rgba(212,168,67,.08)", border: "1px solid rgba(212,168,67,.25)", fontFamily: "monospace", fontSize: 9, color: G, letterSpacing: ".2em" }}>
        COMING SOON
      </div>
    </div>
  );
}
