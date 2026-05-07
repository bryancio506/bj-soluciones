export default function Categorias({ categorias, activa, setActiva, accent }) {
  return (
    <div style={{ background: "white", borderBottom: "1px solid #E5E1DB", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", display: "flex", gap: 0, overflowX: "auto" }}>
        {categorias.map(cat => (
          <button key={cat} onClick={() => setActiva(cat)}
            style={{
              background: "none", border: "none",
              padding: "0.9rem 1.1rem",
              cursor: "pointer", whiteSpace: "nowrap",
              fontSize: "0.85rem", fontWeight: 600,
              fontFamily: "'DM Sans',sans-serif",
              color: activa === cat ? accent : "#888",
              borderBottom: activa === cat ? `2.5px solid ${accent}` : "2.5px solid transparent",
              transition: "all 0.2s",
            }}
          >{cat}</button>
        ))}
      </div>
    </div>
  )
}
