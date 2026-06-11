export const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

export const UI = {
  en: {
    // Nav
    platform:  "🏠 Platform",
    modules:   "📚 Modules",
    certs:     "🏅 Certs",
    grants:    "📋 Grants",
    calendar:  "🗓️ Roadmap",
    ai:        "✦ AI Agent",
    // Platform page
    tagline:   "Be Ye Transformed.",
    subTagline:"Financial literacy education powered by community, Web3, and NFC wear-to-earn technology. Earn certifications. Build generational wealth. Transform your community.",
    quickAccess:"QUICK ACCESS",
    tracks10:  "10 CERTIFICATION TRACKS",
    viewAll:   "VIEW ALL →",
    tierLabel: "AMBASSADOR",
    nextLabel: "NEXT",
    certsAway: "cert(s) away",
    // Modules page
    deepModules: "Deep Learning Modules",
    deepHeader:  "BYT ACADEMY · DEEP MODULES",
    progress:    "PROGRESS",
    lessonsComplete: "lessons complete",
    learningTrack: "LEARNING TRACK",
    markComplete: "MARK COMPLETE",
    marked: "✓ MARKED COMPLETE",
    back: "BACK",
    backToModules: "← BACK TO MODULES",
    nextLesson: "NEXT LESSON →",
    prevLesson: "← PREV LESSON",
    minRead: "min read",
    lessonsDone: "done",
    // Certs page
    certTracks: "CERTIFICATION TRACKS",
    startExam: "START EXAM",
    // Grants page
    grantsTitle: "Tracks & Grants",
    // Calendar page
    roadmap: "90-DAY ROADMAP",
    // AI page
    aiAgent: "AI AGENT",
    addApiKey: "Add your API key to get started",
    selectProvider: "SELECT PROVIDER",
    selectModel: "SELECT MODEL",
    send: "SEND",
    clearChat: "CLEAR CHAT",
    // Theme / UI
    nfc: "📡 NFC",
    enterPlatform: "ENTER THE PLATFORM →",
    missionLabel: "THE MISSION",
    byt_token: "$BYT TOKEN · SOLANA BLOCKCHAIN",
    earnLearn: "Earn While You Learn",
    // Tier names
    foundation: "Foundation",
    scholar: "Scholar",
    ambassador: "Ambassador",
    platinum: "Platinum",
    // Stats
    certTracks_stat: "Certification Tracks",
    deepModules_stat: "Deep Modules",
    grantSources: "Grant Sources",
    bytRewards: "$BYT Rewards",
    availableNow: "Available now",
    lessonsQuizzes: "Lessons + quizzes",
    accessibleFunding: "Accessible funding",
    learnToEarn: "Learn-to-earn",
  },
  es: {
    // Nav
    platform:  "🏠 Plataforma",
    modules:   "📚 Módulos",
    certs:     "🏅 Certs",
    grants:    "📋 Becas",
    calendar:  "🗓️ Hoja de Ruta",
    ai:        "✦ Agente IA",
    // Platform page
    tagline:   "Sé Transformado.",
    subTagline:"Educación financiera impulsada por comunidad, Web3 y tecnología NFC wear-to-earn. Gana certificaciones. Construye riqueza generacional. Transforma tu comunidad.",
    quickAccess:"ACCESO RÁPIDO",
    tracks10:  "10 PISTAS DE CERTIFICACIÓN",
    viewAll:   "VER TODO →",
    tierLabel: "EMBAJADOR",
    nextLabel: "SIGUIENTE",
    certsAway: "cert(s) para el siguiente",
    // Modules page
    deepModules: "Módulos de Aprendizaje Profundo",
    deepHeader:  "BYT ACADEMY · MÓDULOS PROFUNDOS",
    progress:    "PROGRESO",
    lessonsComplete: "lecciones completadas",
    learningTrack: "PISTA DE APRENDIZAJE",
    markComplete: "MARCAR COMPLETADO",
    marked: "✓ COMPLETADO",
    back: "ATRÁS",
    backToModules: "← VOLVER A MÓDULOS",
    nextLesson: "SIGUIENTE LECCIÓN →",
    prevLesson: "← LECCIÓN ANTERIOR",
    minRead: "min de lectura",
    lessonsDone: "completadas",
    // Certs page
    certTracks: "PISTAS DE CERTIFICACIÓN",
    startExam: "INICIAR EXAMEN",
    // Grants page
    grantsTitle: "Pistas y Becas",
    // Calendar page
    roadmap: "HOJA DE RUTA DE 90 DÍAS",
    // AI page
    aiAgent: "AGENTE DE IA",
    addApiKey: "Agrega tu clave API para comenzar",
    selectProvider: "SELECCIONAR PROVEEDOR",
    selectModel: "SELECCIONAR MODELO",
    send: "ENVIAR",
    clearChat: "BORRAR CHAT",
    // Theme / UI
    nfc: "📡 NFC",
    enterPlatform: "ENTRAR A LA PLATAFORMA →",
    missionLabel: "LA MISIÓN",
    byt_token: "TOKEN $BYT · BLOCKCHAIN SOLANA",
    earnLearn: "Gana Mientras Aprendes",
    // Tier names
    foundation: "Fundación",
    scholar: "Erudito",
    ambassador: "Embajador",
    platinum: "Platino",
    // Stats
    certTracks_stat: "Pistas de Certificación",
    deepModules_stat: "Módulos Profundos",
    grantSources: "Fuentes de Becas",
    bytRewards: "Recompensas $BYT",
    availableNow: "Disponible ahora",
    lessonsQuizzes: "Lecciones + exámenes",
    accessibleFunding: "Financiamiento accesible",
    learnToEarn: "Aprende para ganar",
  },
};

export const LANG_KEY = "byt_lang_v1";
export function getLang() {
  try { return localStorage.getItem(LANG_KEY) || "en"; } catch { return "en"; }
}
export function setLang(code) {
  try { localStorage.setItem(LANG_KEY, code); } catch {}
}
export function t(lang, key) {
  return (UI[lang] || UI.en)[key] || (UI.en)[key] || key;
}
