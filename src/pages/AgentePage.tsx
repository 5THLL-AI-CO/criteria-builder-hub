import { useState, useEffect, useRef } from "react";

const API = "http://104.238.214.30:8000";
const ACCESS_PASSWORD = "critairia2026";

// ─── TYPES ───────────────────────────────────────────────────────
interface LogEntry {
  icon: string;
  text: string;
  color: string;
  time: string;
}

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

  if (!authed) {
    return <AccessScreen pwInput={pwInput} setPwInput={setPwInput} pwError={pwError} onLogin={handleLogin} />;
  }

  return <AgentApp />;
}

// ─── ACCESS SCREEN ────────────────────────────────────────────────
function AccessScreen({ pwInput, setPwInput, pwError, onLogin }: {
  pwInput: string;
  setPwInput: (v: string) => void;
  pwError: boolean;
  onLogin: () => void;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>
      <div style={{ background: "#f5f0e8", borderRadius: 12, padding: "48px 44px", maxWidth: 400, width: "90%", textAlign: "center", border: "3px solid #c4922a" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Critairia</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#c4922a", letterSpacing: 2, textTransform: "uppercase", marginBottom: 32 }}>Agente Legal TC</div>
        <p style={{ fontSize: 13, color: "#7a7060", marginBottom: 24 }}>Acceso restringido. Ingresa la contraseña para continuar.</p>
        <input
          type="password"
          value={pwInput}
          onChange={e => setPwInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onLogin()}
          placeholder="Contraseña"
          style={{
            width: "100%", padding: "12px 14px", border: `1.5px solid ${pwError ? "#c0392b" : "#d4c9b5"}`,
            borderRadius: 6, background: "white", fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, color: "#0f0f0f", outline: "none", marginBottom: 12,
            boxSizing: "border-box", transition: "border-color 0.2s"
          }}
        />
        {pwError && <p style={{ color: "#c0392b", fontSize: 12, marginBottom: 12 }}>Contraseña incorrecta</p>}
        <button
          onClick={onLogin}
          style={{
            width: "100%", padding: "13px 26px", background: "#0f0f0f", color: "#f5f0e8",
            border: "none", borderRadius: 6, fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}
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

  // Panel 1 state
  const [casoId, setCasoId] = useState(`caso-${Date.now().toString(36).slice(-4)}`);
  const [urgencia, setUrgencia] = useState("Alta");
  const [webUrl, setWebUrl] = useState("");
  const [tcUrl, setTcUrl] = useState("");
  const [empresaFile, setEmpresaFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [alert1, setAlert1] = useState<{ type: string; msg: string } | null>(null);
  const [loading1, setLoading1] = useState(false);

  // Panel 2 state
  const [progStep, setProgStep] = useState(0);
  const [progWidth, setProgWidth] = useState("0%");
  const [eta, setEta] = useState("Iniciando...");

  // Panel 3 state
  const [resultado, setResultado] = useState<any>(null);

  // Panel 4 state
  const [formUrl, setFormUrl] = useState("—");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [pollingState, setPollingState] = useState(1);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const pollingRef = useRef<any>(null);
  const countdownRef = useRef<any>(null);

  // Panel 5 state
  const [resultado5, setResultado5] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/`).then(r => setOnline(r.ok)).catch(() => setOnline(false));
  }, []);

  const goStep = (n: number) => {
    if (stepEnabled.includes(n) || stepDone.includes(n - 1) || n === 1) setStep(n);
  };
  const doneTab = (n: number) => {
    setStepDone(prev => [...prev.filter(x => x !== n), n]);
  };
  const enableTab = (n: number) => {
    setStepEnabled(prev => [...prev.filter(x => x !== n), n]);
  };

  // ── PANEL 1: INICIAR ANÁLISIS
  async function iniciarAnalisis() {
    if (!casoId || !webUrl || !empresaFile || !certFile) {
      setAlert1({ type: "error", msg: "Completa todos los campos requeridos (*)" });
      return;
    }
    setLoading1(true);
    setAlert1(null);

    const fd = new FormData();
    fd.append("caso_id", casoId);
    fd.append("urgencia", urgencia);
    fd.append("url_web", webUrl);
    if (tcUrl) fd.append("url_tc", tcUrl);
    fd.append("empresa_md", empresaFile);
    fd.append("certificado_pdf", certFile);

    try {
      const r = await fetch(`${API}/run/${casoId}`, { method: "POST", body: fd });
      const d = await r.json();
      if (r.ok) {
        doneTab(1);
        enableTab(2);
        setStep(2);
        iniciarProgreso(casoId);
      } else {
        setAlert1({ type: "error", msg: d.detail || JSON.stringify(d) });
      }
    } catch (e: any) {
      setAlert1({ type: "error", msg: `Error de conexión: ${e.message}` });
    }
    setLoading1(false);
  }

  // ── PANEL 2: PROGRESS POLLING
  function iniciarProgreso(caso: string) {
    const steps = [
      { label: "Extrayendo información del certificado", pct: 15, time: 15 },
      { label: "Analizando sitio web y T&C actuales", pct: 35, time: 30 },
      { label: "Identificando riesgos críticos (R1–R3)", pct: 60, time: 60 },
      { label: "Identificando riesgos adicionales (R4–R6+)", pct: 80, time: 90 },
      { label: "Preparando preguntas de validación", pct: 95, time: 120 },
    ];
    let idx = 0;
    setProgStep(1);
    setProgWidth(`${steps[0].pct}%`);

    const iv = setInterval(async () => {
      try {
        const r = await fetch(`${API}/status/${caso}`);
        const d = await r.json();
        const s = d.estado || "";

        if (s.includes("nodo_2") || s.includes("web")) { idx = 1; }
        else if (s.includes("nodo_3") || s.includes("riesgo")) { idx = 2; }
        else if (s.includes("nodo_4")) { idx = 3; }
        else if (s.includes("nodo_5") || s.includes("preguntas")) { idx = 4; }

        setProgStep(idx + 1);
        setProgWidth(`${steps[idx]?.pct || 95}%`);
        setEta(`~${steps[idx]?.time || 120}s restantes`);

        if (s === "ESPERANDO_APROBACION" || s === "COMPLETO" || s.includes("form")) {
          clearInterval(iv);
          setProgWidth("100%");
          setProgStep(6);
          setEta("✅ Completado");
          await cargarResultados(caso);
          doneTab(2);
          enableTab(3);
          setStep(3);
        }
      } catch {}
    }, 3000);
  }

  // ── PANEL 3: CARGAR RESULTADOS
  async function cargarResultados(caso: string) {
    const r = await fetch(`${API}/resultado/${caso}`);
    const data = await r.json();
    setResultado(data.resultado || {});
  }

  // ── PANEL 3: APROBAR FORMULARIO
  async function aprobarFormulario() {
    try {
      const r = await fetch(`${API}/run/${casoId}/aprobar-form`, { method: "POST", headers: { "Content-Type": "application/json" } });
      const d = await r.json();
      if (r.ok && d.kiroku_form_url) {
        doneTab(3);
        enableTab(4);
        setStep(4);
        setFormUrl(d.kiroku_form_url);
        startPolling(casoId);
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  // ── PANEL 4: POLLING
  function addLog(icon: string, text: string, color: string) {
    const now = new Date();
    const time = now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs(prev => [...prev, { icon, text, color, time }]);
  }

  async function startPolling(caso: string) {
    let pState = 1;
    addLog("✅", "Análisis completado", "#2d6a2d");
    addLog("✅", "Formulario publicado y enviado al cliente", "#2d6a2d");
    addLog("⏳", "Esperando que el cliente complete el formulario...", "#b8860b");

    let secs = 5;
    countdownRef.current = setInterval(() => {
      secs--;
      setCountdown(secs);
      if (secs <= 0) secs = 5;
    }, 1000);

    setShowCountdown(true);

    pollingRef.current = setInterval(async () => {
      let d: any = {};
      try {
        const r = await fetch(`${API}/resultado/${caso}`);
        d = await r.json();
      } catch { return; }

      const nResp = d.respuestas_cliente ? Object.keys(d.respuestas_cliente).length : 0;
      const tieneBorrador = !!d.borrador_tc;

      if (nResp > 0 && !tieneBorrador && pState === 1) {
        pState = 2;
        setPollingState(2);
        addLog("✅", `Formulario recibido — ${nResp} respuestas del cliente`, "#2d6a2d");
        addLog("⚙️", "Generando borrador T&C (2-3 minutos)...", "#b8860b");
        setShowProgressBar(true);
      }

      if (tieneBorrador && pState !== 3) {
        pState = 3;
        setPollingState(3);
        clearInterval(pollingRef.current);
        clearInterval(countdownRef.current);
        addLog("✅", "Borrador T&C generado correctamente", "#2d6a2d");
        setShowProgressBar(false);
        setShowCountdown(false);
        setTimeout(() => cargarResultadoFinal(caso), 1500);
      }
    }, 5000);
  }

  // ── PANEL 5: RESULTADO FINAL
  async function cargarResultadoFinal(caso: string) {
    const r = await fetch(`${API}/resultado/${caso}`);
    const data = await r.json();
    setResultado5(data);
    doneTab(4);
    enableTab(5);
    setStep(5);
  }

  function descargarReporte(e: React.MouseEvent) {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = `${API}/reporte/${casoId}`;
    a.download = `critairia-reporte-${casoId}.pdf`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  function descargarBorrador(e: React.MouseEvent) {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = `${API}/borrador/${casoId}`;
    a.download = `borrador-tc-${casoId}.md`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  const rd = resultado?.riesgos_detectados || {};
  const resumen = rd.resumen_ejecutivo || {};
  const nivel = resumen.nivel_riesgo_global || "N/A";

  const rd5 = resultado5?.resultado?.riesgos_detectados || {};
  const nivel5 = (rd5.resumen_ejecutivo || {}).nivel_riesgo_global || "N/A";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f5f0e8", minHeight: "100vh", fontSize: 15, lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes progressAnim { 0%{width:15%} 50%{width:85%} 100%{width:15%} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes glowBorder { 0%,100%{box-shadow:0 0 0 0 transparent} 50%{box-shadow:0 0 0 3px rgba(196,146,42,.25)} }
        * { box-sizing: border-box; }
      `}</style>

      {/* HEADER */}
      <header style={{ background: "#0f0f0f", color: "#f5f0e8", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #c4922a", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700 }}>Critairia</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#e8c97a", letterSpacing: 2, textTransform: "uppercase" }}>Legal TC Agent v1.1</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#e8c97a", fontFamily: "'DM Mono', monospace" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: online === null ? "#888" : online ? "#2e7d5e" : "#c0392b", animation: online ? "pulse 2s infinite" : "none" }} />
          <span>{online === null ? "Conectando..." : online ? "Conectado" : "Sin conexión"}</span>
        </div>
      </header>

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* STEPS NAV */}
        <div style={{ display: "flex", marginBottom: 40, border: "1.5px solid #d4c9b5", borderRadius: 8, overflow: "hidden", background: "#faf7f2" }}>
          {[1, 2, 3, 4, 5].map((n, i) => {
            const labels = ["Datos", "Análisis", "Revisión", "Formulario", "Resultado"];
            const isDone = stepDone.includes(n);
            const isActive = step === n;
            const isEnabled = stepEnabled.includes(n);
            return (
              <button
                key={n}
                onClick={() => goStep(n)}
                disabled={!isEnabled && !isDone && n !== 1}
                style={{
                  flex: 1, padding: "13px 8px", border: "none",
                  borderRight: i < 4 ? "1.5px solid #d4c9b5" : "none",
                  background: isDone ? "#4a5c4e" : isActive ? "#0f0f0f" : "transparent",
                  color: isDone || isActive ? "white" : !isEnabled && n !== 1 ? "#b8b0a0" : "#7a7060",
                  cursor: isEnabled || isDone || n === 1 ? "pointer" : "not-allowed",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  opacity: !isEnabled && !isDone && n !== 1 ? 0.45 : 1,
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, lineHeight: 1 }}>{n}</span>
                <span style={{ fontSize: 10, letterSpacing: .5, textTransform: "uppercase" }}>{labels[i]}</span>
              </button>
            );
          })}
        </div>

        {/* ── PANEL 1: DATOS ── */}
        {step === 1 && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Nuevo caso</h1>
            <p style={{ color: "#7a7060", fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>Sube los documentos del cliente e ingresa los datos básicos. El análisis legal toma entre 5 y 8 minutos.</p>

            {alert1 && <div style={{ padding: "13px 16px", borderRadius: 6, fontSize: 13, marginBottom: 18, background: alert1.type === "error" ? "#fde8e6" : "#e8f5ef", border: `1px solid ${alert1.type === "error" ? "#f5c6c2" : "#b8dece"}`, color: alert1.type === "error" ? "#8b1a1a" : "#1a5c3a" }}>{alert1.msg}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <Field label="ID del Caso *">
                <input type="text" value={casoId} onChange={e => setCasoId(e.target.value)} placeholder="ej: empresa-001" style={inputStyle} />
              </Field>
              <Field label="Urgencia">
                <select value={urgencia} onChange={e => setUrgencia(e.target.value)} style={inputStyle}>
                  <option>Alta</option><option>Crítica</option><option>Media</option><option>Baja</option>
                </select>
              </Field>
            </div>

            <Field label="URL del Sitio Web *">
              <input type="url" value={webUrl} onChange={e => setWebUrl(e.target.value)} placeholder="https://www.empresa.com" style={inputStyle} />
            </Field>

            <Field label="URL de Términos y Condiciones (opcional)">
              <input type="url" value={tcUrl} onChange={e => setTcUrl(e.target.value)} placeholder="https://www.empresa.com/terminos" style={inputStyle} />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <UploadZone label="Archivo empresa.md *" accept=".md,.txt" icon="📝" hint="Descripción de la empresa" file={empresaFile} onFile={setEmpresaFile} />
              <UploadZone label="Certificado de Existencia (PDF) *" accept=".pdf" icon="📄" hint="Cámara de Comercio" file={certFile} onFile={setCertFile} />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button onClick={iniciarAnalisis} disabled={loading1} style={{ ...btnPrimary, opacity: loading1 ? 0.6 : 1 }}>
                {loading1 ? "Iniciando..." : "Iniciar análisis →"}
              </button>
            </div>
          </div>
        )}

        {/* ── PANEL 2: ANÁLISIS EN PROGRESO ── */}
        {step === 2 && (
          <div>
            <CasoBadge casoId={casoId} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Analizando empresa</h1>
            <p style={{ color: "#7a7060", fontSize: 14, marginBottom: 28 }}>El agente está procesando los documentos y generando el análisis legal completo.</p>
            <div style={{ background: "#faf7f2", border: "1.5px solid #d4c9b5", borderRadius: 10, padding: 28, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600 }}>Progreso</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#7a7060" }}>{eta}</span>
              </div>
              <div style={{ height: 5, background: "#d4c9b5", borderRadius: 3, overflow: "hidden", marginBottom: 18 }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg, #c4922a, #e8c97a)", borderRadius: 3, width: progWidth, transition: "width 1.5s ease" }} />
              </div>
              {["Extrayendo información del certificado", "Analizando sitio web y T&C actuales", "Identificando riesgos críticos (R1–R3)", "Identificando riesgos adicionales (R4–R6+)", "Preparando preguntas de validación para el cliente"].map((label, i) => {
                const isDone = progStep > i + 1;
                const isActive = progStep === i + 1;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 13, color: isDone ? "#2e7d5e" : isActive ? "#0f0f0f" : "#7a7060", fontWeight: isActive ? 500 : 400, marginBottom: 9 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${isDone ? "#2e7d5e" : isActive ? "#c4922a" : "#d4c9b5"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isDone ? 11 : 9, background: isDone ? "#2e7d5e" : "transparent", color: isDone ? "white" : isActive ? "#c4922a" : undefined, flexShrink: 0, animation: isActive ? "glowBorder 1.5s infinite" : "none" }}>
                      {isDone ? "✓" : i + 1}
                    </div>
                    {label}
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: 12, color: "#7a7060", textAlign: "center" }}>No cierres esta ventana. El análisis corre en el servidor.</p>
          </div>
        )}

        {/* ── PANEL 3: REVISIÓN ── */}
        {step === 3 && resultado && (
          <div>
            <CasoBadge casoId={casoId} />
            {/* Resumen */}
            <div style={{ background: "#0f0f0f", color: "#f5f0e8", borderRadius: "10px 10px 0 0", padding: "22px 26px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#e8c97a", marginBottom: 5 }}>Nivel de riesgo global</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}>Resumen ejecutivo</div>
              </div>
              <NivelBadge nivel={nivel} />
            </div>
            <div style={{ background: "white", border: "1.5px solid #d4c9b5", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "22px 26px", marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: "#7a7060", lineHeight: 1.8, fontStyle: "italic", paddingLeft: 14, borderLeft: "3px solid #c4922a" }}>
                {(resumen.justificacion || "—").substring(0, 400)}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
              <SemaforoCard tipo="critico" num={(rd.riesgos_criticos || []).length} label="Críticos" />
              <SemaforoCard tipo="importante" num={(rd.riesgos_importantes || []).length} label="Importantes" />
              <SemaforoCard tipo="mejorable" num={(resultado.discrepancias_marketing_vs_tc || []).length} label="Discrepancias" />
            </div>
            {/* Riesgos */}
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, marginBottom: 14, paddingBottom: 9, borderBottom: "1.5px solid #d4c9b5" }}>⚠️ Riesgos detectados</div>
            {[...(rd.riesgos_criticos || []).map((r: any) => ({ ...r, _t: "critico" })), ...(rd.riesgos_importantes || []).map((r: any) => ({ ...r, _t: "importante" }))].map((r: any, i: number) => (
              <RiesgoItem key={i} riesgo={r} />
            ))}
            {/* Discrepancias */}
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, marginBottom: 14, marginTop: 24, paddingBottom: 9, borderBottom: "1.5px solid #d4c9b5" }}>📢 Discrepancias Marketing vs T&C</div>
            {(resultado.discrepancias_marketing_vs_tc || []).length === 0
              ? <p style={{ color: "#7a7060", fontSize: 13 }}>No se detectaron discrepancias.</p>
              : (resultado.discrepancias_marketing_vs_tc || []).map((d: any, i: number) => (
                <div key={i} style={{ background: "#faf7f2", border: "1.5px solid #d4c9b5", borderLeft: "4px solid #8b3a2a", borderRadius: 6, padding: "14px 18px", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0f0f", marginBottom: 5 }}>📢 {d.claim || d.marketing_claim || "—"}</div>
                  <div style={{ fontSize: 13, color: "#7a7060", marginBottom: 5 }}>⚖️ {d.realidad || d.realidad_tc || "—"}</div>
                  <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#8b3a2a", fontWeight: 500 }}>→ {d.accion_recomendada || d.accion || "—"}</div>
                </div>
              ))
            }
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button onClick={aprobarFormulario} style={btnGold}>Aprobar y enviar formulario al cliente →</button>
              <button onClick={() => { setStep(1); setStepDone([]); setStepEnabled([1]); }} style={btnOutline}>Nuevo caso</button>
            </div>
          </div>
        )}

        {/* ── PANEL 4: FORMULARIO ENVIADO ── */}
        {step === 4 && (
          <div>
            <CasoBadge casoId={casoId} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Formulario enviado</h1>
            <p style={{ color: "#7a7060", fontSize: 14, marginBottom: 28 }}>Envía esta URL al cliente para que valide el entendimiento operativo.</p>

            <div style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1e1e1e 100%)", borderRadius: 10, padding: 28, color: "#f5f0e8", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 6 }}>🔗 URL del formulario</div>
              <div style={{ fontSize: 12, color: "#e8c97a", marginBottom: 18, opacity: .85 }}>Copia y envía por email o WhatsApp al cliente</div>
              <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 6, padding: "11px 14px", fontFamily: "'DM Mono', monospace", fontSize: 11, wordBreak: "break-all", marginBottom: 14, color: "#e8c97a" }}>{formUrl}</div>
              <button onClick={() => navigator.clipboard.writeText(formUrl)} style={{ background: "#c4922a", color: "white", border: "none", borderRadius: 5, padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Copiar URL</button>
            </div>

            {/* Activity log */}
            <div style={{ border: "1.5px solid #d4c9b5", borderRadius: 10, background: "#faf7f2", overflow: "hidden" }}>
              <div style={{ background: "#1a1a1a", color: "#f5f0e8", padding: "12px 18px", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Playfair Display', serif", fontSize: 15 }}>
                <span>📋</span><span>Estado del caso</span>
                <div style={{ marginLeft: "auto", width: 8, height: 8, background: pollingState === 3 ? "#2d6a2d" : pollingState === 2 ? "#f5a442" : "#f5c842", borderRadius: "50%", animation: pollingState === 3 ? "none" : "pulse 1.5s infinite" }} />
              </div>
              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, minHeight: 120 }}>
                {logs.map((l, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                    <span style={{ fontSize: 15, flexShrink: 0 }}>{l.icon}</span>
                    <span style={{ color: "#7a7060", flexShrink: 0, fontFamily: "monospace", fontSize: 11, marginTop: 2 }}>{l.time}</span>
                    <span style={{ color: l.color, flex: 1 }}>{l.text}</span>
                  </div>
                ))}
              </div>
              {showProgressBar && (
                <div style={{ padding: "0 18px 16px" }}>
                  <div style={{ height: 4, background: "#d4c9b5", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                    <div style={{ height: "100%", background: "#c4922a", borderRadius: 3, animation: "progressAnim 3s ease-in-out infinite" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#7a7060", textAlign: "center", fontFamily: "'DM Mono', monospace" }}>Generando borrador T&C...</div>
                </div>
              )}
              {showCountdown && (
                <div style={{ padding: "8px 18px 14px", textAlign: "center", fontSize: 11, color: "#7a7060", fontFamily: "'DM Mono', monospace" }}>
                  Verificando en <strong>{countdown}s</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PANEL 5: RESULTADO FINAL ── */}
        {step === 5 && (
          <div>
            <div style={{ background: "#0f0f0f", color: "#f5f0e8", borderRadius: 10, padding: "22px 26px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#e8c97a" }}>Análisis completado</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}>{casoId}</div>
              </div>
              <NivelBadge nivel={nivel5} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
              <SemaforoCard tipo="critico" num={(rd5.riesgos_criticos || []).length} label="Críticos" />
              <SemaforoCard tipo="importante" num={(rd5.riesgos_importantes || []).length} label="Importantes" />
              <SemaforoCard tipo="mejorable" num={(resultado5?.resultado?.discrepancias_marketing_vs_tc || []).length} label="Discrepancias" />
            </div>
            <div style={{ padding: "13px 16px", borderRadius: 6, fontSize: 13, marginBottom: 24, background: "#f0f4ff", border: "1px solid #c8d6f0", color: "#1a3a6c" }}>
              ℹ️ El agente tiene todas las respuestas del cliente. El abogado puede proceder a redactar los T&C usando estos resultados como base.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={descargarReporte} style={btnPrimary}>⬇ Descargar reporte PDF</button>
              <button onClick={descargarBorrador} style={btnGold}>📄 Descargar borrador T&C</button>
              <button onClick={() => { setStep(1); setStepDone([]); setStepEnabled([1]); setResultado(null); setResultado5(null); setLogs([]); setCasoId(`caso-${Date.now().toString(36).slice(-4)}`); }} style={btnOutline}>Nuevo caso</button>
            </div>
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: 18, fontSize: 11, color: "#7a7060", borderTop: "1px solid #d4c9b5", fontFamily: "'DM Mono', monospace", letterSpacing: .5 }}>
        Critairia Legal TC Agent v1.1 — 5THLL AI CO
      </footer>
    </div>
  );
}

// ─── HELPER COMPONENTS ────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: .3, marginBottom: 7, color: "#0f0f0f", textTransform: "uppercase" }}>{label}</label>
      {children}
    </div>
  );
}

function UploadZone({ label, accept, icon, hint, file, onFile }: { label: string; accept: string; icon: string; hint: string; file: File | null; onFile: (f: File) => void }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: .3, marginBottom: 7, color: "#0f0f0f", textTransform: "uppercase" }}>{label}</label>
      <div style={{ border: `2px dashed ${file ? "#2e7d5e" : "#d4c9b5"}`, borderRadius: 8, padding: "24px 20px", textAlign: "center", cursor: "pointer", background: file ? "#f0f7f4" : "#faf7f2", position: "relative", borderStyle: file ? "solid" : "dashed" }}>
        <input type="file" accept={accept} onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
        <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontSize: 13, color: "#7a7060" }}>{hint}</div>
        {file && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#2e7d5e", marginTop: 5, fontWeight: 500 }}>✓ {file.name}</div>}
      </div>
    </div>
  );
}

function CasoBadge({ casoId }: { casoId: string }) {
  return <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#0f0f0f", color: "#e8c97a", padding: "5px 12px", borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: 12, marginBottom: 20 }}>📁 {casoId}</div>;
}

function NivelBadge({ nivel }: { nivel: string }) {
  const colors: Record<string, string> = { ALTO: "#c0392b", MEDIO: "#c4922a", BAJO: "#2e7d5e" };
  return <div style={{ padding: "5px 12px", borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace", letterSpacing: 1, textTransform: "uppercase", background: colors[nivel] || "#888", color: "white" }}>{nivel}</div>;
}

function SemaforoCard({ tipo, num, label }: { tipo: string; num: number; label: string }) {
  const colors: Record<string, string> = { critico: "#c0392b", importante: "#c4922a", mejorable: "#2e7d5e" };
  const c = colors[tipo] || "#888";
  return (
    <div style={{ background: "#faf7f2", border: `1.5px solid ${c}`, borderRadius: 8, padding: 18, textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, lineHeight: 1, marginBottom: 5, color: c }}>{num}</div>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, color: c }}>{label}</div>
    </div>
  );
}

function RiesgoItem({ riesgo }: { riesgo: any }) {
  const [open, setOpen] = useState(false);
  const isCrit = riesgo._t === "critico";
  return (
    <div style={{ border: "1.5px solid #d4c9b5", borderRadius: 7, marginBottom: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 18px", cursor: "pointer", background: "#faf7f2" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, padding: "3px 7px", borderRadius: 3, flexShrink: 0, marginTop: 2, background: isCrit ? "#fde8e6" : "#fef4e4", color: isCrit ? "#c0392b" : "#c4922a" }}>
          {riesgo.id || ""} {riesgo._t.toUpperCase()}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, flex: 1, lineHeight: 1.5 }}>{riesgo.titulo || riesgo.title || "—"}</span>
        <span style={{ color: "#7a7060", fontSize: 11, flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && <div style={{ padding: "0 18px 14px", fontSize: 13, color: "#7a7060", lineHeight: 1.7 }}>{riesgo.descripcion || riesgo.description || "—"}</div>}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", border: "1.5px solid #d4c9b5",
  borderRadius: 6, background: "#faf7f2", fontFamily: "'DM Sans', sans-serif",
  fontSize: 14, color: "#0f0f0f", outline: "none"
};

const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px",
  border: "none", borderRadius: 6, fontFamily: "'DM Sans', sans-serif",
  fontSize: 14, fontWeight: 600, cursor: "pointer", background: "#0f0f0f", color: "#f5f0e8"
};

const btnGold: React.CSSProperties = { ...btnPrimary, background: "#c4922a", color: "white" };
const btnOutline: React.CSSProperties = { ...btnPrimary, background: "transparent", color: "#0f0f0f", border: "1.5px solid #d4c9b5" };
