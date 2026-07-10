import { useState, useEffect, useRef } from "react"
import Header from "./components/Header"
import Categorias from "./components/Categorias"
import ProyectoCard from "./components/ProyectoCard"
import Footer from "./components/Footer"
import { IconWhatsApp } from "./icons"

function generarFavicon(letra, color) {
  const c = document.createElement("canvas")
  c.width = 64; c.height = 64
  const ctx = c.getContext("2d")
  ctx.fillStyle = color
  ctx.beginPath(); ctx.roundRect(0,0,64,64,14); ctx.fill()
  ctx.fillStyle = "#fff"
  ctx.font = "bold 36px sans-serif"
  ctx.textAlign = "center"; ctx.textBaseline = "middle"
  ctx.fillText(letra.toUpperCase(), 32, 34)
  return c.toDataURL()
}

// Iconos de herramientas SVG para el fondo del hero
const ToolsBg = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{
      position:"absolute",
      inset:0,
      width:"100%",
      height:"100%",
      opacity:0.16,
      filter:"drop-shadow(0 8px 16px rgba(0,0,0,0.22))",
      pointerEvents:"none",
    }}>
    <defs>
      <linearGradient id="toolsGrad" x1="0" y1="0" x2="800" y2="400" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="1" stopColor="#D9D9D9" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Martillo */}
    <g transform="translate(580,30) rotate(15)">
      <rect x="0" y="60" width="16" height="140" rx="4" fill="url(#toolsGrad)"/>
      <rect x="-18" y="30" width="52" height="36" rx="6" fill="url(#toolsGrad)"/>
      <rect x="16" y="38" width="18" height="20" rx="3" fill="#FFFFFF" opacity="0.8"/>
    </g>
    {/* Llave inglesa grande */}
    <g transform="translate(40,60) rotate(-20)">
      <rect x="20" y="0" width="18" height="180" rx="5" fill="url(#toolsGrad)"/>
      <ellipse cx="29" cy="10" rx="28" ry="22" fill="url(#toolsGrad)"/>
      <ellipse cx="29" cy="10" rx="16" ry="12" fill="#1A1A1A"/>
      <ellipse cx="29" cy="170" rx="20" ry="16" fill="url(#toolsGrad)"/>
      <ellipse cx="29" cy="170" rx="10" ry="8" fill="#1A1A1A"/>
    </g>
    {/* Nivel de burbuja */}
    <g transform="translate(300,20)">
      <rect x="0" y="20" width="200" height="36" rx="8" fill="url(#toolsGrad)"/>
      <circle cx="100" cy="38" r="12" fill="white" stroke="#1A1A1A" strokeWidth="3"/>
      <rect x="8" y="28" width="30" height="4" rx="2" fill="#1A1A1A" opacity="0.4"/>
      <rect x="162" y="28" width="30" height="4" rx="2" fill="#1A1A1A" opacity="0.4"/>
    </g>
    {/* Tornillo */}
    <g transform="translate(680,180) rotate(30)">
      <rect x="12" y="0" width="16" height="60" rx="3" fill="url(#toolsGrad)"/>
      <rect x="0" y="0" width="40" height="18" rx="4" fill="url(#toolsGrad)"/>
      <rect x="18" y="4" width="4" height="10" rx="1" fill="#1A1A1A" opacity="0.5"/>
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x="10" y={60+i*8} width="20" height="4" rx="2" fill="url(#toolsGrad)" opacity={0.8-i*0.1}/>
      ))}
    </g>
    {/* Casco */}
    <g transform="translate(140,220)">
      <path d="M0 60 Q0 0 80 0 Q160 0 160 60 Z" fill="url(#toolsGrad)"/>
      <rect x="-10" y="55" width="180" height="16" rx="4" fill="url(#toolsGrad)"/>
      <rect x="30" y="10" width="100" height="8" rx="3" fill="#1A1A1A" opacity="0.3"/>
    </g>
    {/* Cinta métrica */}
    <g transform="translate(480,200) rotate(-10)">
      <rect x="0" y="0" width="70" height="70" rx="12" fill="url(#toolsGrad)"/>
      <circle cx="35" cy="35" r="22" fill="#1A1A1A" opacity="0.5"/>
      <circle cx="35" cy="35" r="8" fill="white"/>
      {[0,1,2,3,4,5,6,7].map(i=>(
        <rect key={i} x={33} y={5} width="4" height="10" rx="1" fill="white" opacity="0.6"
          transform={`rotate(${i*45} 35 35)`}/>
      ))}
    </g>
    {/* Destornillador */}
    <g transform="translate(700,50) rotate(-30)">
      <rect x="10" y="0" width="14" height="30" rx="4" fill="url(#toolsGrad)"/>
      <rect x="14" y="30" width="6" height="120" rx="2" fill="#FFFFFF" opacity="0.8"/>
      <rect x="10" y="148" width="14" height="6" rx="1" fill="url(#toolsGrad)"/>
    </g>
  </svg>
)

// Carrusel simple de fotos del proyecto estrella
function HeroCarousel({ imagenes, accent, nombre }) {
  const [idx, setIdx] = useState(0)
  const [animDir, setAnimDir] = useState(null)
  const timer = useRef(null)

  const labels = ["Antes", "Durante", "Después"]
  const labelColors = { "Antes": "#888", "Durante": "#E8A020", "Después": "#2A9D4E" }

  const goTo = (i, dir) => {
    setAnimDir(dir)
    setTimeout(() => { setIdx(i); setAnimDir(null) }, 220)
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      setIdx(prev => {
        const next = (prev + 1) % imagenes.length
        setAnimDir("right")
        setTimeout(() => setAnimDir(null), 220)
        return next
      })
    }, 3200)
    return () => clearInterval(timer.current)
  }, [imagenes.length])

  const prev = () => { clearInterval(timer.current); goTo((idx - 1 + imagenes.length) % imagenes.length, "left") }
  const next = () => { clearInterval(timer.current); goTo((idx + 1) % imagenes.length, "right") }

  return (
    <div style={{ position:"relative", borderRadius:16, overflow:"hidden", aspectRatio:"16/10", flex:"0 0 340px", maxWidth:380, boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
      <img src={imagenes[idx]} alt={`${nombre} — ${labels[idx]}`}
        style={{
          width:"100%", height:"100%", objectFit:"cover",
          transition: "opacity 0.22s ease",
          opacity: animDir ? 0 : 1,
        }}
      />
      {/* Label de fase */}
      <div style={{
        position:"absolute", top:12, left:12,
        background: labelColors[labels[idx]],
        color:"white", fontSize:"0.72rem", fontWeight:700,
        padding:"0.2rem 0.7rem", borderRadius:100,
        letterSpacing:"0.04em", transition:"background 0.3s",
      }}>{labels[idx]}</div>

      {/* Flechas */}
      <button onClick={() => prev()} style={{
        position:"absolute", top:"50%", left:10, transform:"translateY(-50%)",
        background:"rgba(0,0,0,0.45)", backdropFilter:"blur(4px)",
        border:"none", color:"white", width:32, height:32, borderRadius:"50%",
        cursor:"pointer", fontSize:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center",
        transition:"background 0.2s",
      }}
        onMouseOver={e=>e.currentTarget.style.background="rgba(0,0,0,0.7)"}
        onMouseOut={e=>e.currentTarget.style.background="rgba(0,0,0,0.45)"}
      >‹</button>
      <button onClick={() => next()} style={{
        position:"absolute", top:"50%", right:10, transform:"translateY(-50%)",
        background:"rgba(0,0,0,0.45)", backdropFilter:"blur(4px)",
        border:"none", color:"white", width:32, height:32, borderRadius:"50%",
        cursor:"pointer", fontSize:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center",
        transition:"background 0.2s",
      }}
        onMouseOver={e=>e.currentTarget.style.background="rgba(0,0,0,0.7)"}
        onMouseOut={e=>e.currentTarget.style.background="rgba(0,0,0,0.45)"}
      >›</button>

      {/* Dots */}
      <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:5 }}>
        {imagenes.map((_,i)=>(
          <div key={i} onClick={()=>{clearInterval(timer.current); goTo(i, i>idx?"right":"left")}}
            style={{
              width: i===idx?20:7, height:7, borderRadius:100,
              background: i===idx ? accent : "rgba(255,255,255,0.45)",
              cursor:"pointer", transition:"all 0.3s",
            }}/>
        ))}
      </div>
    </div>
  )
}

const SERVICIOS = [
  { icon:"🏗️", label:"Construcción" },
  { icon:"🔨", label:"Remodelación" },
  { icon:"🔧", label:"Soldadura" },
  { icon:"🎨", label:"Pintura" },
  { icon:"⚡", label:"Electricidad" },
  { icon:"🧱", label:"Enchapes" },
]

export default function App() {
  const [config, setConfig] = useState(null)
  const [proyectos, setProyectos] = useState([])
  const [catActiva, setCatActiva] = useState("Todos")
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    Promise.all([
      fetch("/config.json").then(r => r.json()),
      fetch("/catalogo.json").then(r => r.json()),
    ]).then(([cfg, cat]) => {
      setConfig(cfg); setProyectos(cat)
      document.body.style.background = cfg.colores.bg
      document.title = cfg.nombre
      if (!cfg.logo) {
        const fav = document.getElementById("favicon")
        if (fav) fav.href = generarFavicon(cfg.nombre[0], cfg.colores.accent)
      }
    })
  }, [])

  if (!config) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:"#999", fontSize:"0.9rem" }}>
      Cargando...
    </div>
  )

  const filtrados = proyectos.filter(p => {
    const cat = catActiva === "Todos" || p.categoria === catActiva
    const bus = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    return cat && bus
  })

  const destacado = proyectos.find(p => p.destacado) || proyectos[0]
  const heroImgs = destacado ? [destacado.antes, destacado.durante, destacado.despues] : []

  const wa = `https://wa.me/${config.contacto.whatsapp}?text=Hola%20BJ%20Soluciones%2C%20necesito%20una%20cotizaci%C3%B3n`
  const waQr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=16&data=${encodeURIComponent(wa)}`

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <Header config={config} />

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: config.colores.primary,
        position:"relative", overflow:"hidden",
        padding:"3.5rem 2rem",
      }}>
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <div style={{ position:"absolute", top:-10, right:-140, width:"72%", height:"120%" }}>
            <ToolsBg />
          </div>
          <div style={{
            position:"absolute",
            inset:0,
            background:"linear-gradient(90deg, rgba(14,15,20,0.96) 0%, rgba(14,15,20,0.92) 42%, rgba(14,15,20,0.72) 66%, rgba(14,15,20,0.8) 100%)",
          }} />
        </div>
        {/* Franja diagonal roja inspirada en tarjeta */}
        <div
          style={{
            position:"absolute",
            left:-120,
            top:-140,
            width:260,
            height:560,
            background:config.colores.accent,
            transform:"rotate(24deg)",
            opacity:0.88,
            zIndex:0,
          }}
        />
        {/* Puntos decorativos de la franja */}
        {[70, 150, 230].map((top, i) => (
          <div
            key={i}
            style={{
              position:"absolute",
              left:24,
              top,
              width:20 + i * 6,
              height:20 + i * 6,
              borderRadius:"50%",
              background:config.colores.accent,
              boxShadow:"0 0 0 4px rgba(0,0,0,0.32)",
              zIndex:1,
            }}
          />
        ))}
        {/* Franja accent izquierda */}
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:5, background:config.colores.accent }} />

        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", flexWrap:"wrap", alignItems:"center", gap:"3rem", position:"relative", zIndex:1 }}>
          {/* Texto */}
          <div style={{ flex:"1 1 300px" }}>
            <p style={{ fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:"0.14em", color:config.colores.accent, fontWeight:700, marginBottom:12 }}>
              Maestro de obras · Costa Rica
            </p>
            <h2 style={{
              fontFamily:"'Syne',sans-serif", fontWeight:800,
              fontSize:"clamp(1.9rem,4.5vw,2.8rem)",
              color:"white", letterSpacing:"-0.025em", lineHeight:1.1, marginBottom:16,
              textShadow:"0 3px 12px rgba(0,0,0,0.55)",
            }}>
              Trabajo con calidad,<br/>
              <span style={{ color:"#FFFFFF", borderBottom:`4px solid ${config.colores.accent}`, paddingBottom:2 }}>resultados que hablan.</span>
            </h2>
            <p style={{ color:"rgba(255,255,255,0.82)", fontSize:"0.92rem", fontWeight:400, lineHeight:1.7, marginBottom:24, maxWidth:420, textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>
              Construcción, remodelación y acabados en Costa Rica. Cada proyecto con materiales de calidad y mano de obra garantizada.
            </p>

            {/* Pills de servicios */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:28 }}>
              {SERVICIOS.map(s => (
                <span key={s.label} style={{
                  background:"rgba(255,255,255,0.07)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  color:"rgba(255,255,255,0.75)",
                  padding:"0.3rem 0.75rem", borderRadius:100,
                  fontSize:"0.78rem", fontWeight:500,
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  {s.icon} {s.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <button
                type="button"
                onClick={() => window.open(wa, "_blank", "noopener,noreferrer")}
                style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:config.colores.accent, color:"white",
                padding:"0.8rem 1.75rem", borderRadius:100,
                fontWeight:600, fontSize:"0.95rem", textDecoration:"none",
                transition:"opacity 0.2s",
                border:"none",
                cursor:"pointer",
              }}
                onMouseOver={e=>e.currentTarget.style.opacity="0.85"}
                onMouseOut={e=>e.currentTarget.style.opacity="1"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.15 1.58 5.95L0 24l6.3-1.65a11.82 11.82 0 0 0 5.78 1.48h.01c6.57 0 11.91-5.35 11.91-11.92a11.8 11.8 0 0 0-3.48-8.43Z" fill="#25D366"/>
                  <path d="m9.4 7.23-.84.03c-.27.01-.56.1-.76.33-.55.61-1.43 1.58-1.43 3.86 0 2.27 1.47 4.47 1.67 4.74.2.27 2.76 4.43 6.8 4.2 4.03-.23 4.07-3.55 4.07-3.67 0-.13-.08-.2-.16-.23l-2.57-1.2c-.08-.04-.2-.03-.27.06l-1.01 1.28c-.06.08-.18.11-.27.07-.57-.24-2.44-1.06-3.77-3.03-.06-.09-.06-.2.01-.28l.92-1.05a.32.32 0 0 0 .05-.31l-1.1-2.9c-.06-.15-.2-.26-.34-.25Z" fill="white"/>
                </svg>
                Cotizar gratis
              </button>
              <a href="#proyectos" style={{
                display:"inline-flex", alignItems:"center",
                background:"transparent", color:"rgba(255,255,255,0.75)",
                padding:"0.8rem 1.75rem", borderRadius:100,
                fontWeight:500, fontSize:"0.95rem", textDecoration:"none",
                border:"1px solid rgba(255,255,255,0.18)", transition:"background 0.2s",
              }}
                onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                onMouseOut={e=>e.currentTarget.style.background="transparent"}
              >
                Ver proyectos ↓
              </a>
            </div>
          </div>

          {/* Carrusel */}
          {heroImgs.length > 0 && (
            <HeroCarousel imagenes={heroImgs} accent={config.colores.accent} nombre={destacado.nombre} />
          )}
        </div>
      </section>

      {/* ===== VIDEO DESTACADO ===== */}
      <section style={{ padding: "2.5rem 2rem 0" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", position: "relative",
          borderRadius: 18, overflow: "hidden", aspectRatio: "16/9", minHeight: 360,
          background: "#0A0A0A", boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
          isolation: "isolate", contain: "paint", transform: "translateZ(0)", WebkitTransform: "translateZ(0)",
        }}>
          <video
            src="/proyectos/escalera.mp4"
            autoPlay muted loop playsInline
            aria-label="Video: escalera en estructura metálica soldada por BJ Soluciones"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.85) 100%)",
          }} />
          <span style={{
            position: "absolute", top: 16, left: 16,
            background: config.colores.accent, color: "white",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.04em",
            padding: "0.25rem 0.8rem", borderRadius: 100,
          }}>Soldadura</span>
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(1rem, 4vw, 1.5rem)",
            display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "0.85rem",
          }}>
            <div style={{ flex: "1 1 240px" }}>
              <h3 style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "white",
                fontSize: "clamp(1.1rem,4vw,1.5rem)", marginBottom: 6, lineHeight: 1.15,
                textShadow: "0 2px 10px rgba(0,0,0,0.55)",
              }}>Escalera en estructura metálica</h3>
              <p style={{
                color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.8rem, 3vw, 0.88rem)", maxWidth: 480,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}>Soldadura fina y acabado a la medida, pieza por pieza.</p>
            </div>
            <a href={wa} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 7,
              background: config.colores.accent, color: "white",
              padding: "0.65rem 1.1rem", borderRadius: 100,
              fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
              transition: "opacity 0.2s", whiteSpace: "nowrap",
            }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}
            >
              <IconWhatsApp size={15} /> Solicitar cotización
            </a>
          </div>
        </div>
      </section>

      {/* ===== CATEGORÍAS ===== */}
      <Categorias categorias={config.categorias} activa={catActiva} setActiva={setCatActiva} accent={config.colores.accent} />

      {/* ===== PROYECTOS ===== */}
      <main id="proyectos" style={{ maxWidth:1100, margin:"0 auto", width:"100%", padding:"2.5rem 2rem", flex:1 }}>

        {/* Buscador + contador */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:"2rem" }}>
          <input
            type="text" placeholder="Buscar servicio..."
            value={busqueda} onChange={e=>setBusqueda(e.target.value)}
            style={{
              padding:"0.65rem 1.25rem", borderRadius:100,
              border:"1.5px solid #DDD", fontSize:"0.88rem",
              outline:"none", fontFamily:"'DM Sans',sans-serif",
              background:"white", width:"100%", maxWidth:320,
            }}
          />
          <span style={{ fontSize:"0.82rem", color:"#999" }}>
            {filtrados.length} {filtrados.length === 1 ? "proyecto" : "proyectos"}
          </span>
        </div>

        {filtrados.length === 0 ? (
          <div style={{ textAlign:"center", padding:"5rem", color:"#aaa", fontSize:"0.9rem" }}>No hay proyectos en esta categoría.</div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1.5rem" }}>
            {filtrados.map(p => (
              <ProyectoCard key={p.id} proyecto={p} accent={config.colores.accent} whatsapp={config.contacto.whatsapp} />
            ))}
          </div>
        )}
      </main>

      <section style={{ padding:"0 2rem 2.5rem" }}>
        <div style={{
          maxWidth:1100,
          margin:"0 auto",
          background:"linear-gradient(135deg, #16181D 0%, #111318 100%)",
          borderRadius:18,
          border:"1px solid rgba(255,255,255,0.08)",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          flexWrap:"wrap",
          gap:"1.2rem",
          padding:"1.4rem",
          boxShadow:"0 18px 40px rgba(0,0,0,0.28)",
        }}>
          <div style={{ flex:"1 1 260px", minWidth:240 }}>
            <p style={{
              margin:0,
              marginBottom:8,
              color:config.colores.accent,
              fontWeight:700,
              fontSize:"0.78rem",
              letterSpacing:"0.1em",
              textTransform:"uppercase",
            }}>
              Contacto rápido
            </p>
            <h3 style={{ margin:0, marginBottom:10, color:"#fff", fontSize:"clamp(1.1rem, 2.2vw, 1.5rem)" }}>
              Escanea y cotiza por WhatsApp
            </h3>
            <p style={{ margin:0, color:"rgba(255,255,255,0.78)", lineHeight:1.6, maxWidth:460 }}>
              Apunta tu cámara al código QR para abrir el chat directo. Si estás en celular, usa el botón para entrar con un toque.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop:14,
                display:"inline-flex",
                alignItems:"center",
                gap:8,
                background:config.colores.accent,
                color:"#fff",
                padding:"0.7rem 1.2rem",
                borderRadius:999,
                textDecoration:"none",
                fontWeight:600,
                fontSize:"0.92rem",
              }}
            >
              <span aria-hidden="true">🟢</span> Abrir WhatsApp
            </a>
          </div>

          <div style={{
            flex:"0 0 auto",
            background:"#fff",
            borderRadius:14,
            padding:10,
            boxShadow:"0 8px 20px rgba(0,0,0,0.22)",
            marginLeft:"auto",
          }}>
            <img
              src={waQr}
              alt="Código QR para abrir WhatsApp"
              width="150"
              height="150"
              loading="lazy"
              style={{ display:"block", width:"clamp(120px, 28vw, 150px)", height:"auto", borderRadius:8 }}
            />
          </div>
        </div>
      </section>

      <Footer config={config} />
    </div>
  )
}
