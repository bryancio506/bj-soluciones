import { useEffect, useState } from "react"
import { formatearTelefono } from "./utils"
import "./Cotizaciones.css"

const STORAGE_KEY = "bj-soluciones-cotizaciones-v1"
const ACCESS_KEY = "bj-soluciones-cotizaciones-acceso"
const CLAVE_ACCESO = "Byron2718*"
const dinero = (valor) => new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 2 }).format(Number(valor) || 0)
const fechaLocal = () => {
  const hoy = new Date()
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`
}
const nuevaLinea = () => ({ id: crypto.randomUUID(), descripcion: "", cantidad: 1, unidad: "unidad", precio: "" })
const nuevaCotizacion = () => ({
  id: crypto.randomUUID(), numero: `BJ-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`,
  fecha: fechaLocal(), vigencia: 15, cliente: "", telefono: "", proyecto: "", ubicacion: "",
  partidas: [nuevaLinea()], impuesto: 0, notas: "", condiciones: "Precios sujetos a disponibilidad de materiales. El trabajo inicia según acuerdo entre las partes.",
})
const leerGuardadas = () => {
  try {
    const valor = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(valor?.cotizaciones) && valor.cotizaciones.length) return valor
  } catch { /* Si el navegador borró los datos, se inicia un borrador nuevo. */ }
  const primera = nuevaCotizacion()
  return { activa: primera.id, cotizaciones: [primera] }
}
const fechaLarga = (fecha) => {
  if (!fecha) return "—"
  const [anio, mes, dia] = fecha.split("-").map(Number)
  return new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(anio, mes - 1, dia))
}

export default function Cotizaciones({ config }) {
  const [autorizado, setAutorizado] = useState(() => sessionStorage.getItem(ACCESS_KEY) === "1")
  const [clave, setClave] = useState("")
  const [error, setError] = useState("")

  const ingresar = (evento) => {
    evento.preventDefault()
    if (clave !== CLAVE_ACCESO) return setError("Contraseña incorrecta. Intentá de nuevo.")
    sessionStorage.setItem(ACCESS_KEY, "1")
    setAutorizado(true)
    setClave("")
    setError("")
  }
  const salir = () => {
    sessionStorage.removeItem(ACCESS_KEY)
    setAutorizado(false)
  }

  if (!autorizado) return <div className="quotes-login" style={{ "--quote-accent": config.colores.accent, "--quote-dark": config.colores.primary }}>
    <a href="/" className="quotes-login-back">← Volver al sitio</a>
    <form className="quotes-login-card" onSubmit={ingresar}>
      <img src={config.logo} alt="" />
      <span className="quotes-eyebrow">BJ SOLUCIONES · USO INTERNO</span>
      <h1>Cotizaciones</h1>
      <p>Ingresá la contraseña para preparar propuestas para tus clientes.</p>
      <label htmlFor="clave-cotizaciones">Contraseña</label>
      <input id="clave-cotizaciones" type="password" autoComplete="current-password" required autoFocus value={clave} onChange={e => { setClave(e.target.value); setError("") }} />
      {error && <span role="alert" className="quotes-login-error">{error}</span>}
      <button type="submit">Entrar</button>
    </form>
  </div>

  return <CotizacionesEditor config={config} salir={salir} />
}

function CotizacionesEditor({ config, salir }) {
  const [archivo, setArchivo] = useState(leerGuardadas)
  const [error, setError] = useState("")
  const cotizacion = archivo.cotizaciones.find(c => c.id === archivo.activa) || archivo.cotizaciones[0]
  const partidasVisibles = cotizacion.partidas.filter(p => p.descripcion.trim())
  const subtotal = partidasVisibles.reduce((suma, p) => suma + (Number(p.cantidad) || 0) * (Number(p.precio) || 0), 0)
  const impuesto = subtotal * (Number(cotizacion.impuesto) || 0) / 100
  const total = subtotal + impuesto

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(archivo))
  }, [archivo])

  useEffect(() => {
    document.title = `Cotizacion-${cotizacion.numero || "BJ-Soluciones"}`
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.content = "noindex, nofollow"
    return () => {
      document.title = config.nombre
      if (robots) robots.content = "index, follow"
    }
  }, [config.nombre, cotizacion.numero])

  const cambiar = (campo, valor) => {
    setArchivo(actual => ({ ...actual, cotizaciones: actual.cotizaciones.map(c => c.id === actual.activa ? { ...c, [campo]: valor } : c) }))
    setError("")
  }
  const cambiarPartida = (id, campo, valor) => cambiar("partidas", cotizacion.partidas.map(p => p.id === id ? { ...p, [campo]: valor } : p))
  const crear = () => {
    const nueva = nuevaCotizacion()
    setArchivo(actual => ({ activa: nueva.id, cotizaciones: [nueva, ...actual.cotizaciones] }))
    setError("")
  }
  const eliminar = () => {
    if (!window.confirm(`¿Eliminar la cotización ${cotizacion.numero || "sin número"} de este navegador?`)) return
    setArchivo(actual => {
      const restantes = actual.cotizaciones.filter(c => c.id !== actual.activa)
      if (restantes.length) return { activa: restantes[0].id, cotizaciones: restantes }
      const nueva = nuevaCotizacion()
      return { activa: nueva.id, cotizaciones: [nueva] }
    })
  }
  const generarPdf = () => {
    if (!cotizacion.cliente.trim()) return setError("Ingresá el nombre del cliente antes de generar el PDF.")
    if (!partidasVisibles.length) return setError("Agregá al menos un material o servicio.")
    if (cotizacion.partidas.some(p => !p.descripcion.trim() && p.precio !== "")) return setError("Hay una partida con precio pero sin descripción.")
    if (partidasVisibles.some(p => p.cantidad === "" || !Number.isFinite(Number(p.cantidad)) || Number(p.cantidad) <= 0)) return setError("Revisá las cantidades de las partidas antes de generar el PDF.")
    if (partidasVisibles.some(p => p.precio === "" || !Number.isFinite(Number(p.precio)) || Number(p.precio) < 0)) return setError("Revisá los precios de las partidas antes de generar el PDF.")
    if (!Number.isFinite(Number(cotizacion.impuesto)) || Number(cotizacion.impuesto) < 0 || Number(cotizacion.impuesto) > 100) return setError("El impuesto debe estar entre 0 y 100%.")
    setError("")
    window.print()
  }

  return <div className="quotes-page" style={{ "--quote-accent": config.colores.accent, "--quote-dark": config.colores.primary }}>
    <header className="quotes-topbar">
      <a href="/" className="quotes-brand"><img src={config.logo} alt="" /><span><strong>{config.nombre}</strong><small>Herramienta de cotizaciones</small></span></a>
      <div className="quotes-top-actions"><a href="/" className="quotes-back">← Volver al sitio</a><button type="button" onClick={salir}>Cerrar sesión</button></div>
    </header>

    <div className="quotes-shell">
      <div className="quotes-intro">
        <div><span className="quotes-eyebrow">BJ SOLUCIONES · DOCUMENTOS</span><h1>Cotizaciones</h1><p>Prepará una propuesta clara para cada cliente y guardala como PDF.</p></div>
        <button type="button" className="quotes-new" onClick={crear}>+ Nueva cotización</button>
      </div>
      <div className="quotes-layout">
        <div className="quotes-editor">
          <section className="quotes-card quotes-library">
            <div className="quotes-section-title"><h2>Mis cotizaciones</h2><span>Guardadas en este navegador</span></div>
            <select aria-label="Seleccionar cotización" value={cotizacion.id} onChange={e => setArchivo(actual => ({ ...actual, activa: e.target.value }))}>
              {archivo.cotizaciones.map(c => <option key={c.id} value={c.id}>{c.numero || "Sin número"} · {c.cliente || "Cliente pendiente"}</option>)}
            </select>
            <button type="button" className="quotes-link-danger" onClick={eliminar}>Eliminar esta cotización</button>
          </section>

          <section className="quotes-card">
            <div className="quotes-section-title"><h2>Datos generales</h2><span>01 / 03</span></div>
            <div className="quotes-fields">
              <label>Número de cotización<input value={cotizacion.numero} onChange={e => cambiar("numero", e.target.value)} /></label>
              <label>Fecha<input type="date" value={cotizacion.fecha} onChange={e => cambiar("fecha", e.target.value)} /></label>
              <label>Cliente <b>*</b><input placeholder="Nombre de la persona o empresa" value={cotizacion.cliente} onChange={e => cambiar("cliente", e.target.value)} /></label>
              <label>Teléfono del cliente<input type="tel" placeholder="Opcional" value={cotizacion.telefono} onChange={e => cambiar("telefono", e.target.value)} /></label>
              <label>Proyecto o trabajo<input placeholder="Ej. Remodelación de cocina" value={cotizacion.proyecto} onChange={e => cambiar("proyecto", e.target.value)} /></label>
              <label>Ubicación<input placeholder="Ej. San José, Costa Rica" value={cotizacion.ubicacion} onChange={e => cambiar("ubicacion", e.target.value)} /></label>
              <label>Validez de la oferta (días)<input type="number" min="1" max="365" value={cotizacion.vigencia} onChange={e => cambiar("vigencia", e.target.value)} /></label>
            </div>
          </section>

          <section className="quotes-card">
            <div className="quotes-section-title"><h2>Materiales y servicios</h2><span>02 / 03</span></div>
            <p className="quotes-help">Agregá cada material, mano de obra o servicio como una partida.</p>
            <div className="quotes-lines">
              {cotizacion.partidas.map((p, i) => <div className="quotes-line" key={p.id}>
                <div className="quotes-line-head"><strong>Partida {String(i + 1).padStart(2, "0")}</strong><button type="button" onClick={() => cambiar("partidas", cotizacion.partidas.filter(linea => linea.id !== p.id))} aria-label={`Eliminar partida ${i + 1}`}>Eliminar</button></div>
                <label className="quotes-description">Descripción<input placeholder="Ej. Tubo galvanizado 2 pulgadas" value={p.descripcion} onChange={e => cambiarPartida(p.id, "descripcion", e.target.value)} /></label>
                <div className="quotes-line-grid">
                  <label>Cantidad<input type="number" min="0.01" step="any" value={p.cantidad} onChange={e => cambiarPartida(p.id, "cantidad", e.target.value)} /></label>
                  <label>Unidad<input placeholder="unidad, m², hora…" value={p.unidad} onChange={e => cambiarPartida(p.id, "unidad", e.target.value)} /></label>
                  <label>Precio unitario (₡)<input type="number" min="0" step="any" placeholder="0" value={p.precio} onChange={e => cambiarPartida(p.id, "precio", e.target.value)} /></label>
                </div><div className="quotes-line-total">Importe <strong>{dinero((Number(p.cantidad) || 0) * (Number(p.precio) || 0))}</strong></div>
              </div>)}
            </div>
            <button type="button" className="quotes-add" onClick={() => cambiar("partidas", [...cotizacion.partidas, nuevaLinea()])}>+ Agregar partida</button>
            <div className="quotes-tax"><label>Impuesto adicional (%)<input type="number" min="0" max="100" step="any" value={cotizacion.impuesto} onChange={e => cambiar("impuesto", e.target.value)} /></label><p>Dejalo en 0 si el monto ya incluye impuestos o no aplica. Revisá el tratamiento fiscal antes de entregar.</p></div>
          </section>

          <section className="quotes-card">
            <div className="quotes-section-title"><h2>Notas y condiciones</h2><span>03 / 03</span></div>
            <label>Alcance o notas para el cliente<textarea rows="3" placeholder="Detalles de lo incluido, exclusiones, tiempo estimado…" value={cotizacion.notas} onChange={e => cambiar("notas", e.target.value)} /></label>
            <label>Condiciones comerciales<textarea rows="3" value={cotizacion.condiciones} onChange={e => cambiar("condiciones", e.target.value)} /></label>
          </section>
        </div>

        <div className="quotes-preview-column">
          <div className="quotes-preview-toolbar"><div><strong>Vista previa</strong><span>Formato carta · colones costarricenses</span></div><button type="button" className="quotes-print" onClick={generarPdf}>↓ Guardar PDF</button></div>
          {error && <p role="alert" className="quotes-error">{error}</p>}
          <article className="quote-sheet" aria-label="Vista previa de la cotización">
            <div className="quote-red-rule" />
            <div className="quote-sheet-inner">
              <div className="quote-document-header"><div className="quote-logo"><img src={config.logo} alt="" /><span><strong>{config.nombre}</strong><small>{config.slogan}</small></span></div><span className="quote-document-tag">COTIZACIÓN</span></div>
              <div className="quote-heading"><div><span className="quote-kicker">PROPUESTA COMERCIAL</span><h2>{cotizacion.proyecto || "Materiales y servicios"}</h2><p>Una propuesta hecha a la medida para tu proyecto.</p></div><div className="quote-id"><strong>{cotizacion.numero || "Sin número"}</strong><span>{fechaLarga(cotizacion.fecha)}</span></div></div>
              <div className="quote-meta"><div><span>PREPARADO PARA</span><strong>{cotizacion.cliente || "Nombre del cliente"}</strong>{cotizacion.telefono && <small>{cotizacion.telefono}</small>}{cotizacion.ubicacion && <small>{cotizacion.ubicacion}</small>}</div><div><span>VIGENCIA</span><strong>{cotizacion.vigencia || "—"} días</strong><small>Desde la fecha de emisión</small></div></div>
              <div className="quote-table-wrap"><table className="quote-table"><thead><tr><th>DESCRIPCIÓN</th><th>CANT.</th><th>UNIDAD</th><th>PRECIO UNIT.</th><th>IMPORTE</th></tr></thead><tbody>{partidasVisibles.map(p => <tr key={p.id}><td data-label="Descripción">{p.descripcion}</td><td data-label="Cantidad">{p.cantidad || "—"}</td><td data-label="Unidad">{p.unidad || "—"}</td><td data-label="Precio unitario">{dinero(p.precio)}</td><td data-label="Importe">{dinero((Number(p.cantidad) || 0) * (Number(p.precio) || 0))}</td></tr>)}{!partidasVisibles.length && <tr><td colSpan="5" className="quote-placeholder">Los materiales y servicios aparecerán aquí.</td></tr>}</tbody></table></div>
              <div className="quote-totals"><div><span>Subtotal</span><strong>{dinero(subtotal)}</strong></div>{Number(cotizacion.impuesto) > 0 && <div><span>Impuesto ({cotizacion.impuesto}%)</span><strong>{dinero(impuesto)}</strong></div>}<div className="quote-grand-total"><span>TOTAL PROPUESTO</span><strong>{dinero(total)}</strong></div></div>
              {cotizacion.notas.trim() && <section className="quote-note"><h3>ALCANCE Y NOTAS</h3><p>{cotizacion.notas}</p></section>}
              {cotizacion.condiciones.trim() && <section className="quote-note"><h3>CONDICIONES</h3><p>{cotizacion.condiciones}</p></section>}
              <div className="quote-footer"><div><strong>Hagamos realidad tu proyecto.</strong><span>Estamos para conversar los detalles y ajustar esta propuesta.</span></div><div><strong>{formatearTelefono(config.contacto.whatsapp)}</strong><span>{config.contacto.email}</span></div></div>
              <p className="quote-disclaimer">Esta cotización es una propuesta comercial. No constituye factura electrónica ni comprobante fiscal.</p>
            </div>
          </article>
          <p className="quotes-print-hint">Al pulsar “Guardar PDF”, elegí “Guardar como PDF” en el diálogo de impresión del navegador.</p>
        </div>
      </div>
    </div>
  </div>
}
