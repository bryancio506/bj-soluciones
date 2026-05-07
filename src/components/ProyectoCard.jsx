import { useState } from "react"

const IconWa = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const FASES = ["antes", "durante", "despues"]
const LABELS = { antes: "Antes", durante: "Durante", despues: "Después" }
const COLORS = { antes: "#888", durante: "#E8A020", despues: "#2A9D4E" }

export default function ProyectoCard({ proyecto, accent, whatsapp }) {
  const [fase, setFase] = useState("despues")

  const msg = encodeURIComponent(`Hola BJ Soluciones, me interesa cotizar: ${proyecto.nombre}`)
  const wa = `https://wa.me/${whatsapp}?text=${msg}`

  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid #E5E1DB",
      display: "flex", flexDirection: "column",
      transition: "box-shadow 0.2s",
    }}
      onMouseOver={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"}
      onMouseOut={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Imagen con selector antes/durante/después */}
      <div style={{ position: "relative", aspectRatio: "4/3", background: "#111", overflow: "hidden" }}>
        <img
          src={proyecto[fase]}
          alt={`${proyecto.nombre} - ${LABELS[fase]}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }}
          loading="lazy"
        />

        {/* Badge destacado */}
        {proyecto.destacado && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            background: accent, color: "white",
            fontSize: "0.7rem", fontWeight: 700,
            padding: "0.2rem 0.65rem", borderRadius: 100,
          }}>✦ Destacado</span>
        )}

        {/* Selector de fase */}
        <div style={{
          position: "absolute", bottom: 10, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: 4,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          borderRadius: 100, padding: "4px 6px",
        }}>
          {FASES.map(f => (
            <button
              key={f}
              onClick={() => setFase(f)}
              style={{
                border: "none", cursor: "pointer",
                borderRadius: 100,
                padding: "0.2rem 0.65rem",
                fontSize: "0.72rem", fontWeight: 600,
                transition: "all 0.2s",
                background: fase === f ? COLORS[f] : "transparent",
                color: fase === f ? "white" : "rgba(255,255,255,0.6)",
              }}
            >{LABELS[f]}</button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span style={{ fontSize: "0.72rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.06em" }}>{proyecto.categoria}</span>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", lineHeight: 1.3, color: "#1A1A1A" }}>{proyecto.nombre}</h3>
        <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6, flex: 1 }}>{proyecto.descripcion}</p>

        <a href={wa} target="_blank" rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            marginTop: 8,
            background: accent, color: "white",
            padding: "0.65rem 1rem", borderRadius: 100,
            fontSize: "0.85rem", fontWeight: 600,
            textDecoration: "none", transition: "opacity 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}
        >
          <IconWa /> Solicitar cotización
        </a>
      </div>
    </div>
  )
}
