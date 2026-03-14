import { useState, useEffect, useRef } from "react";

const API = "https://api.criteria.work";
const ACCESS_PASSWORD = "critairia2026";

interface LogEntry {
  icon: string;
  text: string;
  color: string;
  time: string;
}

// ─── DESIGN TOKENS (Criteria Design System) ───────────────────────
const C = {
  bg: "#0A0A1A",
  surface: "#12122A",
  border: "#1E1E3A",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0B8",
  textTertiary: "#4A4A6A",
  accent: "#6C3CE0",
  ctaGradient: "linear-gradient(135deg, #5A32B8, #2D5FA0)",
  success: "#2E7D5E",
  warning: "#C4922A",
  danger: "#C0392B",
  fontSans: "'Inter', system-ui, sans-serif",
  fontDisplay: "'Instrument Sans', 'Manrope', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function AgentePage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  function handleLogin() {
    if (pwInput === ACCESS_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  }

  if (!authed) return <AccessScreen pwInput={pwInput} setPwInput={setPwInput} pwError={pwError} onLogin={handleLogin} />;
  return <AgentApp />;
}

// ─── ACCESS SCREEN ────────────────────────────────────────────────
function AccessScreen({ pwInput, setPwInput, pwError, onLogin }: {
  pwInput: string; setPwInput: (v: string) => void; pwError: boolean; onLogin: () => void;
}) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.fontSans }}>
      <GoogleFonts />
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "48px 44px", maxWidth: 400, width: "90%", textAlign: "center" }}>
        <div style={{ fontFamily: C.fontDisplay, fontSize: 26, fontWeight: 700, color: C.textPrimary, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
          CRITERIA
        </div>
        <div style={{ fontFamily: C.fontMono, fontSize: 10, color: C.textTertiary, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32 }}>
          Agente Legal TC · v1.1
        </div>
        <p style={{ fontSize: 13, color: C.textSecondary, marginBottom: 24, lineHeight: 1.6 }}>
          Acceso restringido. Ingresa la contraseña para continuar.
        </p>
        <input
          type="password"
          value={pwInput}
          onChange={e => setPwInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onLogin()}
          placeholder="Contraseña"
          style={{
            width: "100%", padding: "11px 14px",
            border: `1px solid ${pwError ? C.danger : C.border}`,
            borderRadius: 6, background: C.bg, fontFamily: C.fontSans,
            fontSize: 14, color: C.textPrimary, outline: "none",
            marginBottom: 12, boxSizing: "border-box", transition: "border-color 0.2s"
          }}
        />
        {pwError && <p style={{ color: C.danger, fontSize: 12, marginBottom: 12 }}>Contraseña incorrecta</p>}
        <button
          onClick={onLogin}
          style={{ width: "100%", padding: "12px 26px", background: C.ctaGradient, color: C.textPrimary, border: "none", borderRadius: 6, fontFamily: C.fontSans, fontSize: 14, fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}
        >
          Ingresar →
        </button>
      </div>
    </div>
  );
}

// ─── AGENT APP ────────────────────────────────────────────────────
function AgentApp() {
  const [step, setStep] = useState(1);
  const [stepDone, setStepDone] = useState<number[]>([]);
  const [stepEnabled, setStepEnabled] = useState<number[]>([1]);
  const [online, setOnline] = useState<null | boolean>(null);

  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [casoId, setCasoId] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [tcUrl, setTcUrl] = useState("");
  const [empresaFile, setEmpresaFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [alert1, setAlert1] = useState<{ type: string; msg: string } | null>(null);
  const [loading1, setLoading1] = useState(false);

  const [progStep, setProgStep] = useState(0);
  const [progWidth, setProgWidth] = useState("0%");
  const [eta, setEta] = useState("Iniciando...");

  const [resultado, setResultado] = useState<any>(null);

  // ── FIX: URLs de formularios propios ──
  const [formUrlM0, setFormUrlM0] = useState("—");
  const [formUrlRiesgos, setFormUrlRiesgos] = useState("—");

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [pollingState, setPollingState] = useState(1);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const pollingRef = useRef<any>(null);
  const countdownRef = useRef<any>(null);

  const [resultado5, setResultado5] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/`).then(r => setOnline(r.ok)).catch(() => setOnline(false));
  }, []);

  const goStep = (n: number) => { if (stepEnabled.includes(n) || stepDone.includes(n - 1) || n === 1) setStep(n); };
  const doneTab = (n: number) => setStepDone(prev => [...prev.filter(x => x !== n), n]);
  const enableTab = (n: number) => setStepEnabled(prev => [...prev.filter(x => x !== n), n]);

  async function iniciarAnalisis() {
    if (!nombreEmpresa || !webUrl || !empresaFile || !certFile) {
      setAlert1({ type: "error", msg: "Completa todos los campos requeridos (*)" });
      return;
    }
    const id = nombreEmpresa.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-tc";
    setCasoId(id);
    setLoading1(true); setAlert1(null);
    const fd = new FormData();
    fd.append("nombre_empresa", nombreEmpresa);
    fd.append("web_url", webUrl); if (tcUrl) fd.append("tc_url", tcUrl);
    fd.append("empresa_md", empresaFile); fd.append("certificado_pdf", certFile);
    try {
      const r = await fetch(`${API}/run-upload/${id}`, { method: "POST", body: fd });
      const d = await r.json();
      if (r.ok || r.status === 409) { doneTab(1); enableTab(2); setStep(2); iniciarProgreso(id); }
      else setAlert1({ type: "error", msg: typeof d.detail === "string" ? d.detail : JSON.stringify(d.detail || d) });
    } catch (e: any) { setAlert1({ type: "error", msg: `Error de conexión: ${e.message}` }); }
    setLoading1(false);
  }

  function iniciarProgreso(caso: string) {
    const progTimes = [0, 70, 145, 225, 315];
    const progPcts  = [15, 35, 58, 78, 94];
    const progEtas  = ["~7 min", "~5 min", "~3 min", "~2 min", "Finalizando..."];

    setProgStep(1); setProgWidth(`${progPcts[0]}%`); setEta(progEtas[0]);

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < progTimes.length; i++) {
      const t = setTimeout(() => {
        setProgStep(i + 1);
        setProgWidth(`${progPcts[i]}%`);
        setEta(progEtas[i]);
      }, progTimes[i] * 1000);
      timers.push(t);
    }

    const iv = setInterval(async () => {
      try {
        const r = await fetch(`${API}/status/${caso}`);
        const d = await r.json();
        const s = (d.fase_actual || d.estado || "").toLowerCase();
        const tieneSchema = !!d.tiene_schema;
        if (s === "esperando_aprobacion" || s === "completo" || tieneSchema) {
          clearInterval(iv);
          timers.forEach(t => clearTimeout(t));
          setProgWidth("100%"); setProgStep(6); setEta("✓ Completado");
          await cargarResultados(caso); doneTab(2); enableTab(3); setStep(3);
        }
      } catch {}
    }, 5000);
  }

  async function cargarResultados(caso: string) {
    const r = await fetch(`${API}/resultado/${caso}`);
    const data = await r.json(); setResultado(data.resultado || {});
  }

  // ── FIX: aprobarFormulario usa form_url_m0 y form_url_riesgos ──
  async function aprobarFormulario() {
    try {
      const r = await fetch(`${API}/run/${casoId}/aprobar-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const d = await r.json();
      if (r.ok) {
        const urlM0 = d.form_url_m0 || `${API}/form/${casoId}/m0`;
        const urlRiesgos = d.form_url_riesgos || `${API}/form/${casoId}/riesgos`;
        setFormUrlM0(urlM0);
        setFormUrlRiesgos(urlRiesgos);
        doneTab(3); enableTab(4); setStep(4);
      }
    } catch (e: any) { console.error(e); }
  }

  function addLog(icon: string, text: string, color: string) {
    const now = new Date();
    const time = now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs(prev => [...prev, { icon, text, color, time }]);
  }

  async function startPolling(caso: string) {
    let pState = 1;
    addLog("✓", "Análisis completado", C.success);
    addLog("✓", "Formularios listos para el cliente", C.success);
    addLog("○", "Esperando que el cliente complete el formulario...", C.warning);
    let secs = 5;
    countdownRef.current = setInterval(() => { secs--; setCountdown(secs); if (secs <= 0) secs = 5; }, 1000);
    setShowCountdown(true);
    pollingRef.current = setInterval(async () => {
      let d: any = {};
      try { const r = await fetch(`${API}/resultado/${caso}`); d = await r.json(); } catch { return; }
      const nResp = d.respuestas_cliente ? Object.keys(d.respuestas_cliente).length : 0;
      const tieneBorrador = !!d.borrador_tc;
      if (nResp > 0 && !tieneBorrador && pState === 1) {
        pState = 2; setPollingState(2);
        addLog("✓", `Formulario recibido — ${nResp} respuestas del cliente`, C.success);
        addLog("⟳", "Generando borrador T&C (2-3 minutos)...", C.warning);
        setShowProgressBar(true);
      }
      if (tieneBorrador && pState !== 3) {
        pState = 3; setPollingState(3);
        clearInterval(pollingRef.current); clearInterval(countdownRef.current);
        addLog("✓", "Borrador T&C generado correctamente", C.success);
        setShowProgressBar(false); setShowCountdown(false);
        setTimeout(() => cargarResultadoFinal(caso), 1500);
      }
    }, 5000);
  }

  async function cargarResultadoFinal(caso: string) {
    const r = await fetch(`${API}/resultado/${caso}`);
    const data = await r.json(); setResultado5(data);
    doneTab(4); enableTab(5); setStep(5);
  }

  function descargar(url: string, filename: string) {
    const a = document.createElement("a"); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  const rd = resultado?.riesgos_detectados || {};
  const resumen = rd.resumen_ejecutivo || {};
  const nivel = resumen.nivel_riesgo_global || "N/A";
  const rd5 = resultado5?.resultado?.riesgos_detectados || {};
  const nivel5 = (rd5.resumen_ejecutivo || {}).nivel_riesgo_global || "N/A";

  const stepLabels = ["Datos", "Análisis", "Revisión", "Formulario", "Resultado"];
  const progLabels = [
    "Extrayendo información del certificado",
    "Analizando sitio web y T&C actuales",
    "Identificando riesgos críticos (R1–R3)",
    "Identificando riesgos adicionales (R4–R6+)",
    "Preparando preguntas de validación para el cliente",
  ];

  return (
    <div style={{ fontFamily: C.fontSans, background: C.bg, minHeight: "100vh", color: C.textPrimary }}>
      <GoogleFonts />
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes progressAnim { 0%{width:15%} 50%{width:85%} 100%{width:15%} }
        @keyframes glowAccent { 0%,100%{box-shadow:0 0 0 0 transparent} 50%{box-shadow:0 0 0 3px rgba(108,60,224,.3)} }
        * { box-sizing: border-box; }
        input::placeholder { color: #4A4A6A; }
        input:focus, select:focus { border-color: #6C3CE0 !important; outline: none; }
        button:hover { opacity: 0.9; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #12122A; }
        ::-webkit-scrollbar-thumb { background: #1E1E3A; border-radius: 3px; }
      `}</style>

      {/* HEADER */}
      <header style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: C.fontDisplay, fontSize: 20, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textPrimary }}>CRITERIA</span>
          <span style={{ fontFamily: C.fontMono, fontSize: 10, color: C.textTertiary, letterSpacing: "0.15em", textTransform: "uppercase", paddingLeft: 16, borderLeft: `1px solid ${C.border}` }}>
            Agente Legal TC v1.1
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: online === null ? C.textTertiary : online ? C.success : C.danger, animation: online ? "pulse 2s infinite" : "none" }} />
          <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.textTertiary }}>
            {online === null ? "Conectando..." : online ? "Conectado" : "Sin conexión"}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 100px" }}>

        {/* STEPS NAV */}
        <div style={{ display: "flex", gap: 2, marginBottom: 48 }}>
          {[1, 2, 3, 4, 5].map((n, i) => {
            const isDone = stepDone.includes(n);
            const isActive = step === n;
            const isEnabled = stepEnabled.includes(n);
            return (
              <button key={n} onClick={() => goStep(n)} disabled={!isEnabled && !isDone && n !== 1}
                style={{
                  flex: 1, padding: "12px 8px", border: `1px solid ${isActive ? C.accent : isDone ? "#2E7D5E" : C.border}`,
                  borderRadius: 6, background: isActive ? "rgba(108,60,224,0.15)" : isDone ? "rgba(46,125,94,0.12)" : C.surface,
                  color: isActive ? C.textPrimary : isDone ? "#4ade80" : isEnabled ? C.textSecondary : C.textTertiary,
                  cursor: isEnabled || isDone || n === 1 ? "pointer" : "not-allowed",
                  fontFamily: C.fontSans, fontSize: 11, fontWeight: 500,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  transition: "all 0.2s", opacity: !isEnabled && !isDone && n !== 1 ? 0.4 : 1,
                }}>
                <span style={{ fontFamily: C.fontMono, fontSize: 14, fontWeight: 700, lineHeight: 1 }}>
                  {isDone ? "✓" : n}
                </span>
                <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>{stepLabels[i]}</span>
              </button>
            );
          })}
        </div>

        {/* ── PANEL 1: DATOS ── */}
        {step === 1 && (
          <div>
            <Label style={{ fontFamily: C.fontMono, color: C.textTertiary, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8, display: "block" }}>NUEVO CASO</Label>
            <h1 style={{ fontFamily: C.fontDisplay, fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 8, lineHeight: 1.2 }}>Datos del cliente</h1>
            <p style={{ color: C.textSecondary, fontSize: 14, marginBottom: 36, lineHeight: 1.7 }}>
              Sube los documentos del cliente e ingresa los datos básicos. El análisis legal toma entre 5 y 8 minutos.
            </p>
            {alert1 && (
              <div style={{ padding: "12px 16px", borderRadius: 6, fontSize: 13, marginBottom: 20, background: "rgba(192,57,43,0.1)", border: `1px solid rgba(192,57,43,0.3)`, color: "#ff6b6b" }}>
                {alert1.msg}
              </div>
            )}
            <CField label="Nombre de la Empresa *">
              <CInput value={nombreEmpresa} onChange={e => setNombreEmpresa(e.target.value)} placeholder="ej: Niilo / DATSTARTUP S.A.S." />
            </CField>
            <CField label="ID del Caso (auto-generado)">
              <div style={{ padding: "11px 14px", border: "1px solid #1E1E3A", borderRadius: 6, background: "#0D0D1E", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#4A4A6A" }}>
                {nombreEmpresa ? nombreEmpresa.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-tc" : "nombre-empresa-tc"}
              </div>
            </CField>
            <CField label="URL del Sitio Web *">
              <CInput type="url" value={webUrl} onChange={e => setWebUrl(e.target.value)} placeholder="https://www.empresa.com" />
            </CField>
            <CField label="URL de Términos y Condiciones (opcional)">
              <CInput type="url" value={tcUrl} onChange={e => setTcUrl(e.target.value)} placeholder="https://www.empresa.com/terminos" />
            </CField>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 4 }}>
              <UploadZone label="Archivo empresa.md *" accept=".md,.txt" icon="📝" hint="Descripción de la empresa" file={empresaFile} onFile={setEmpresaFile} />
              <UploadZone label="Certificado de Existencia (PDF) *" accept=".pdf" icon="📄" hint="Cámara de Comercio" file={certFile} onFile={setCertFile} />
            </div>
            <div style={{ marginTop: 32 }}>
              <CTAButton onClick={iniciarAnalisis} disabled={loading1}>
                {loading1 ? "Iniciando análisis..." : "Iniciar análisis →"}
              </CTAButton>
            </div>
          </div>
        )}

        {/* ── PANEL 2: ANÁLISIS EN PROGRESO ── */}
        {step === 2 && (
          <div>
            <CasoBadge casoId={casoId} />
            <Label style={{ fontFamily: C.fontMono, color: C.textTertiary, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8, display: "block" }}>PROCESANDO</Label>
            <h1 style={{ fontFamily: C.fontDisplay, fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>Analizando empresa</h1>
            <p style={{ color: C.textSecondary, fontSize: 14, marginBottom: 36, lineHeight: 1.7 }}>El agente está procesando los documentos y generando el análisis legal completo.</p>
            <SurfaceCard>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontFamily: C.fontDisplay, fontSize: 15, fontWeight: 600, color: C.textPrimary }}>Progreso del análisis</span>
                <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.textTertiary }}>{eta}</span>
              </div>
              <div style={{ height: 3, background: C.border, borderRadius: 2, overflow: "hidden", marginBottom: 24 }}>
                <div style={{ height: "100%", background: C.ctaGradient, borderRadius: 2, width: progWidth, transition: "width 1.5s ease" }} />
              </div>
              {progLabels.map((label, i) => {
                const isDone = progStep > i + 1;
                const isActive = progStep === i + 1;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700,
                      border: `1px solid ${isDone ? C.success : isActive ? C.accent : C.border}`,
                      background: isDone ? "rgba(46,125,94,0.2)" : isActive ? "rgba(108,60,224,0.2)" : "transparent",
                      color: isDone ? "#4ade80" : isActive ? "#a78bfa" : C.textTertiary,
                      animation: isActive ? "glowAccent 1.5s infinite" : "none",
                      fontFamily: C.fontMono,
                    }}>
                      {isDone ? "✓" : i + 1}
                    </div>
                    <span style={{ fontSize: 13, color: isDone ? C.textSecondary : isActive ? C.textPrimary : C.textTertiary, fontWeight: isActive ? 500 : 400 }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </SurfaceCard>
            <p style={{ fontSize: 12, color: C.textTertiary, textAlign: "center", marginTop: 16 }}>No cierres esta ventana. El análisis corre en el servidor.</p>
          </div>
        )}

        {/* ── PANEL 3: REVISIÓN ── */}
        {step === 3 && resultado && (
          <div>
            <CasoBadge casoId={casoId} />
            <SurfaceCard style={{ marginBottom: 24, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: C.fontMono, fontSize: 10, color: C.textTertiary, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Nivel de riesgo global</div>
                  <div style={{ fontFamily: C.fontDisplay, fontSize: 18, fontWeight: 600, color: C.textPrimary }}>Resumen ejecutivo</div>
                </div>
                <NivelBadge nivel={nivel} />
              </div>
              <div style={{ padding: "20px 24px" }}>
                <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.8, fontStyle: "italic", paddingLeft: 14, borderLeft: `2px solid ${C.accent}` }}>
                  {(resumen.justificacion || "—").substring(0, 400)}
                </p>
              </div>
            </SurfaceCard>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
              <SemaforoCard tipo="critico" num={(rd.riesgos_criticos || []).length} label="Críticos" />
              <SemaforoCard tipo="importante" num={(rd.riesgos_importantes || []).length} label="Importantes" />
              <SemaforoCard tipo="mejorable" num={(resultado.discrepancias_marketing_vs_tc || []).length} label="Discrepancias" />
            </div>

            <SectionTitle>⚠ Riesgos detectados</SectionTitle>
            {[...(rd.riesgos_criticos || []).map((r: any) => ({ ...r, _t: "critico" })), ...(rd.riesgos_importantes || []).map((r: any) => ({ ...r, _t: "importante" }))].map((r: any, i: number) => (
              <RiesgoItem key={i} riesgo={r} />
            ))}

            <SectionTitle style={{ marginTop: 32 }}>◈ Discrepancias Marketing vs T&C</SectionTitle>
            {(resultado.discrepancias_marketing_vs_tc || []).length === 0
              ? <p style={{ color: C.textTertiary, fontSize: 13 }}>No se detectaron discrepancias.</p>
              : (resultado.discrepancias_marketing_vs_tc || []).map((d: any, i: number) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.danger}`, borderRadius: 6, padding: "14px 18px", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 5 }}>{d.claim || d.marketing_claim || "—"}</div>
                  <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 5 }}>{d.realidad || d.realidad_tc || "—"}</div>
                  <div style={{ fontSize: 11, fontFamily: C.fontMono, color: "#ff6b6b" }}>→ {d.accion_recomendada || d.accion || "—"}</div>
                </div>
              ))
            }

            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <CTAButton onClick={aprobarFormulario}>Aprobar y enviar formulario →</CTAButton>
              <OutlineButton onClick={() => { setStep(1); setStepDone([]); setStepEnabled([1]); }}>Nuevo caso</OutlineButton>
            </div>
          </div>
        )}

        {/* ── PANEL 4: FORMULARIO — URLS PROPIAS ── */}
        {step === 4 && (
          <div>
            <CasoBadge casoId={casoId} />
            <Label style={{ fontFamily: C.fontMono, color: C.textTertiary, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8, display: "block" }}>FORMULARIOS LISTOS</Label>
            <h1 style={{ fontFamily: C.fontDisplay, fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>Enviar al cliente</h1>
            <p style={{ color: C.textSecondary, fontSize: 14, marginBottom: 36, lineHeight: 1.7 }}>
              Comparte los dos formularios con el cliente en este orden. Primero M0, luego Riesgos.
            </p>

            {/* FORMULARIO M0 */}
            <SurfaceCard style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ background: "rgba(108,60,224,0.15)", border: "1px solid rgba(108,60,224,0.3)", borderRadius: 4, padding: "3px 10px", fontFamily: C.fontMono, fontSize: 10, color: "#a78bfa", letterSpacing: "0.1em" }}>
                  PASO 1
                </div>
                <span style={{ fontFamily: C.fontDisplay, fontSize: 15, fontWeight: 600, color: C.textPrimary }}>Validación Operativa (M0)</span>
              </div>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", fontFamily: C.fontMono, fontSize: 11, wordBreak: "break-all", marginBottom: 12, color: C.textSecondary }}>
                {formUrlM0}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => navigator.clipboard.writeText(formUrlM0)}
                  style={{ background: C.ctaGradient, color: C.textPrimary, border: "none", borderRadius: 5, padding: "9px 18px", fontFamily: C.fontSans, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}>
                  Copiar URL
                </button>
                <button onClick={() => window.open(formUrlM0, "_blank")}
                  style={{ background: "transparent", color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "9px 18px", fontFamily: C.fontSans, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}>
                  Abrir →
                </button>
              </div>
            </SurfaceCard>

            {/* FORMULARIO RIESGOS */}
            <SurfaceCard style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ background: "rgba(196,146,42,0.12)", border: "1px solid rgba(196,146,42,0.3)", borderRadius: 4, padding: "3px 10px", fontFamily: C.fontMono, fontSize: 10, color: C.warning, letterSpacing: "0.1em" }}>
                  PASO 2
                </div>
                <span style={{ fontFamily: C.fontDisplay, fontSize: 15, fontWeight: 600, color: C.textPrimary }}>Levantamiento de Riesgos</span>
              </div>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", fontFamily: C.fontMono, fontSize: 11, wordBreak: "break-all", marginBottom: 12, color: C.textSecondary }}>
                {formUrlRiesgos}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => navigator.clipboard.writeText(formUrlRiesgos)}
                  style={{ background: C.ctaGradient, color: C.textPrimary, border: "none", borderRadius: 5, padding: "9px 18px", fontFamily: C.fontSans, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}>
                  Copiar URL
                </button>
                <button onClick={() => window.open(formUrlRiesgos, "_blank")}
                  style={{ background: "transparent", color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "9px 18px", fontFamily: C.fontSans, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}>
                  Abrir →
                </button>
              </div>
            </SurfaceCard>

            {/* LOG DE ESTADO */}
            <SurfaceCard style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ background: "#0D0D20", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: C.fontDisplay, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Estado del caso</span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: pollingState === 3 ? C.success : pollingState === 2 ? C.warning : C.accent, animation: pollingState === 3 ? "none" : "pulse 1.5s infinite" }} />
                  <span style={{ fontFamily: C.fontMono, fontSize: 10, color: C.textTertiary }}>
                    {pollingState === 3 ? "COMPLETADO" : pollingState === 2 ? "GENERANDO" : "ESPERANDO"}
                  </span>
                </div>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, minHeight: 80 }}>
                {logs.length === 0
                  ? <div style={{ fontSize: 12, color: C.textTertiary, fontFamily: C.fontMono }}>Esperando actividad del cliente…</div>
                  : logs.map((l, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                      <span style={{ color: l.color, flexShrink: 0, fontFamily: C.fontMono, fontSize: 14 }}>{l.icon}</span>
                      <span style={{ color: C.textTertiary, flexShrink: 0, fontFamily: C.fontMono, fontSize: 10, marginTop: 2 }}>{l.time}</span>
                      <span style={{ color: l.color, flex: 1, fontSize: 13 }}>{l.text}</span>
                    </div>
                  ))
                }
              </div>
              {showProgressBar && (
                <div style={{ padding: "0 20px 16px" }}>
                  <div style={{ height: 2, background: C.border, borderRadius: 1, overflow: "hidden", marginBottom: 8 }}>
                    <div style={{ height: "100%", background: C.ctaGradient, borderRadius: 1, animation: "progressAnim 3s ease-in-out infinite" }} />
                  </div>
                  <div style={{ fontSize: 11, color: C.textTertiary, fontFamily: C.fontMono }}>Generando borrador T&C...</div>
                </div>
              )}
              {showCountdown && (
                <div style={{ padding: "8px 20px 14px", fontSize: 11, color: C.textTertiary, fontFamily: C.fontMono }}>
                  Verificando en <strong style={{ color: C.textSecondary }}>{countdown}s</strong>
                </div>
              )}
            </SurfaceCard>
          </div>
        )}

        {/* ── PANEL 5: RESULTADO FINAL ── */}
        {step === 5 && (
          <div>
            <Label style={{ fontFamily: C.fontMono, color: C.textTertiary, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8, display: "block" }}>ANÁLISIS COMPLETADO</Label>
            <h1 style={{ fontFamily: C.fontDisplay, fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>{casoId}</h1>
            <SurfaceCard style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nivel de riesgo global</span>
              <NivelBadge nivel={nivel5} />
            </SurfaceCard>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
              <SemaforoCard tipo="critico" num={(rd5.riesgos_criticos || []).length} label="Críticos" />
              <SemaforoCard tipo="importante" num={(rd5.riesgos_importantes || []).length} label="Importantes" />
              <SemaforoCard tipo="mejorable" num={(resultado5?.resultado?.discrepancias_marketing_vs_tc || []).length} label="Discrepancias" />
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 6, fontSize: 13, marginBottom: 32, background: "rgba(108,60,224,0.08)", border: `1px solid rgba(108,60,224,0.2)`, color: C.textSecondary }}>
              El agente tiene todas las respuestas del cliente. El abogado puede proceder a redactar los T&C usando estos resultados como base.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <CTAButton onClick={() => descargar(`${API}/reporte/${casoId}`, `critairia-reporte-${casoId}.pdf`)}>
                ↓ Descargar reporte PDF
              </CTAButton>
              <OutlineButton onClick={() => descargar(`${API}/borrador/${casoId}`, `borrador-tc-${casoId}.md`)}>
                ↓ Descargar borrador T&C
              </OutlineButton>
              <OutlineButton onClick={() => { setStep(1); setStepDone([]); setStepEnabled([1]); setResultado(null); setResultado5(null); setLogs([]); setNombreEmpresa(""); setCasoId(""); }}>
                Nuevo caso
              </OutlineButton>
            </div>
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "20px", fontSize: 11, color: C.textTertiary, borderTop: `1px solid ${C.border}`, fontFamily: C.fontMono, letterSpacing: "0.08em" }}>
        CRITERIA · Agente Legal TC v1.1 · 5THLL AI CO
      </footer>
    </div>
  );
}

// ─── HELPER COMPONENTS ────────────────────────────────────────────

function GoogleFonts() {
  return <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@400;600;700&display=swap');`}</style>;
}
function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={style}>{children}</div>;
}
function SurfaceCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: "#12122A", border: "1px solid #1E1E3A", borderRadius: 8, padding: 24, ...style }}>{children}</div>;
}
function SectionTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontSize: 14, fontWeight: 600, color: "#A0A0B8", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #1E1E3A", ...style }}>{children}</div>;
}
function CField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 8, color: "#A0A0B8", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
      {children}
    </div>
  );
}
function CInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ width: "100%", padding: "11px 14px", border: "1px solid #1E1E3A", borderRadius: 6, background: "#0A0A1A", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#FFFFFF", outline: "none", transition: "border-color 0.2s" }} />;
}
function UploadZone({ label, accept, icon, hint, file, onFile }: { label: string; accept: string; icon: string; hint: string; file: File | null; onFile: (f: File) => void }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 8, color: "#A0A0B8", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
      <div style={{ border: `1px dashed ${file ? "#2E7D5E" : "#1E1E3A"}`, borderRadius: 8, padding: "24px 20px", textAlign: "center", cursor: "pointer", background: file ? "rgba(46,125,94,0.08)" : "#12122A", position: "relative", borderStyle: file ? "solid" : "dashed", transition: "all 0.2s" }}>
        <input type="file" accept={accept} onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
        <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontSize: 12, color: "#4A4A6A" }}>{hint}</div>
        {file && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4ade80", marginTop: 6 }}>✓ {file.name}</div>}
      </div>
    </div>
  );
}
function CasoBadge({ casoId }: { casoId: string }) {
  return <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#12122A", border: "1px solid #1E1E3A", color: "#A0A0B8", padding: "5px 12px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginBottom: 20, letterSpacing: "0.05em" }}><span style={{ color: "#4A4A6A" }}>caso /</span> {casoId}</div>;
}
function NivelBadge({ nivel }: { nivel: string }) {
  const configs: Record<string, { bg: string; color: string }> = {
    ALTO: { bg: "rgba(192,57,43,0.15)", color: "#ff6b6b" },
    MEDIO: { bg: "rgba(196,146,42,0.15)", color: "#fbbf24" },
    BAJO: { bg: "rgba(46,125,94,0.15)", color: "#4ade80" },
  };
  const cfg = configs[nivel] || { bg: "rgba(74,74,106,0.2)", color: "#A0A0B8" };
  return <div style={{ padding: "5px 14px", borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", background: cfg.bg, color: cfg.color }}>{nivel}</div>;
}
function SemaforoCard({ tipo, num, label }: { tipo: string; num: number; label: string }) {
  const configs: Record<string, { color: string; bg: string }> = {
    critico: { color: "#ff6b6b", bg: "rgba(192,57,43,0.08)" },
    importante: { color: "#fbbf24", bg: "rgba(196,146,42,0.08)" },
    mejorable: { color: "#4ade80", bg: "rgba(46,125,94,0.08)" },
  };
  const cfg = configs[tipo] || { color: "#A0A0B8", bg: "transparent" };
  return <div style={{ background: cfg.bg, border: `1px solid ${cfg.color}22`, borderRadius: 8, padding: 20, textAlign: "center" }}><div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1, marginBottom: 6, color: cfg.color }}>{num}</div><div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, color: cfg.color, fontFamily: "'JetBrains Mono', monospace" }}>{label}</div></div>;
}
function RiesgoItem({ riesgo }: { riesgo: any }) {
  const [open, setOpen] = useState(false);
  const isCrit = riesgo._t === "critico";
  return (
    <div style={{ border: `1px solid #1E1E3A`, borderRadius: 7, marginBottom: 8, overflow: "hidden", background: "#12122A" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 18px", cursor: "pointer" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 3, flexShrink: 0, marginTop: 2, background: isCrit ? "rgba(192,57,43,0.15)" : "rgba(196,146,42,0.15)", color: isCrit ? "#ff6b6b" : "#fbbf24", letterSpacing: "0.08em" }}>
          {riesgo.id || ""} {riesgo._t.toUpperCase()}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, flex: 1, lineHeight: 1.5, color: "#FFFFFF" }}>{riesgo.titulo || riesgo.title || "—"}</span>
        <span style={{ color: "#4A4A6A", fontSize: 10, flexShrink: 0, marginTop: 4 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && <div style={{ padding: "0 18px 14px", fontSize: 13, color: "#A0A0B8", lineHeight: 1.7 }}>{riesgo.descripcion || riesgo.description || "—"}</div>}
    </div>
  );
}
function CTAButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button onClick={onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: "none", borderRadius: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", background: disabled ? "#1E1E3A" : "linear-gradient(135deg, #5A32B8, #2D5FA0)", color: disabled ? "#4A4A6A" : "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.08em", transition: "opacity 0.2s" }}>{children}</button>;
}
function OutlineButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: "1px solid #1E1E3A", borderRadius: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "transparent", color: "#A0A0B8", textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.2s" }}>{children}</button>;
}
