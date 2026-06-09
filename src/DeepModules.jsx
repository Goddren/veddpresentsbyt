export default function DeepModules({ theme }) {
  const T = theme || { bg: "#05050A", a: "#D4A843", text: "#F5F0E8", muted: "rgba(212,168,67,.45)", border: "rgba(212,168,67,.15)", inputBg: "rgba(212,168,67,.06)" };
  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "Georgia,serif", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 32 }}>
      <div style={{ fontSize: 48 }}>📚</div>
      <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: ".4em", color: T.muted }}>BYT ACADEMY</div>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 700, color: T.a, textAlign: "center" }}>Deep Modules</div>
      <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 14, color: T.muted, textAlign: "center", maxWidth: 420, lineHeight: 1.7 }}>
        ICT-level deep dives — Trading, Crypto, Real Estate, AI, Business, and more. Full curriculum launching with the platform.
      </div>
      <div style={{ marginTop: 8, padding: "10px 24px", background: T.inputBg, border: `1px solid ${T.border}`, fontFamily: "monospace", fontSize: 9, color: T.a, letterSpacing: ".2em" }}>
        COMING SOON
      </div>
    </div>
  );
}
