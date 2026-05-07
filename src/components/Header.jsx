import { useState } from "react"

const IconWa = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)

const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

export default function Header({ config }) {
  const wa = `https://wa.me/${config.contacto.whatsapp}?text=Hola%20BJ%20Soluciones%2C%20necesito%20una%20cotizaci%C3%B3n`
  const pill = (icon, text, href) => (
    <a href={href || "#"} target={href ? "_blank" : undefined} rel="noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 100, padding: "0.4rem 1rem",
        fontSize: "0.82rem", color: "rgba(255,255,255,0.82)",
        textDecoration: "none", transition: "background 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
      onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
    >
      {icon} {text}
    </a>
  )

  return (
    <header style={{ background: config.colores.primary }}>
      {/* Franja accent superior */}
      <div style={{ height: 4, background: config.colores.accent }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem 2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
        {/* Logo / nombre */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {config.logo && <img src={config.logo} alt="logo" style={{ width: 52, height: 52, borderRadius: 10, objectFit: "contain", background: "rgba(255,255,255,0.1)", padding: 4 }} />}
          <div>
            {/* Ícono martillo decorativo */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={config.colores.accent}>
                <path d="M15.5 2.1L11 6.6 9.5 5.1 5.6 9l1.5 1.5-5.1 5.1v3h3l5.1-5.1 1.5 1.5 3.9-3.9-1.5-1.5 4.5-4.5-3-3z"/>
              </svg>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.7rem", color: "white", letterSpacing: "-0.02em", lineHeight: 1 }}>
                {config.nombre}
              </h1>
            </div>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: "0.06em" }}>{config.slogan}</p>
          </div>
        </div>

        {/* Contacto */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {pill(<IconWa />, "WhatsApp", wa)}
          {config.contacto.email && pill(<IconMail />, config.contacto.email, `mailto:${config.contacto.email}`)}
          {config.contacto.ubicacion && pill(<IconPin />, config.contacto.ubicacion)}
          {config.contacto.horario && pill(<IconClock />, config.contacto.horario)}
        </div>
      </div>
    </header>
  )
}
