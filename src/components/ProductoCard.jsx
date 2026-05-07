import { IconWhatsApp } from "../icons"

export default function ProductoCard({ producto, accent, whatsapp }) {
  const precio = new Intl.NumberFormat('es-CR', {
    style: 'currency', currency: producto.moneda ?? 'CRC', maximumFractionDigits: 0
  }).format(producto.precio)

  const msg = encodeURIComponent(`Hola, me interesa: ${producto.nombre} (${precio})`)
  const wa = `https://wa.me/${whatsapp}?text=${msg}`

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-shadow hover:shadow-md ${!producto.disponible ? 'opacity-60' : ''}`}>

      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {producto.destacado && (
          <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ background: accent }}>
            ⭐ Destacado
          </span>
        )}
        {!producto.disponible && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border">Agotado</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide">{producto.categoria}</span>
        <h3 className="font-head font-semibold text-gray-900 leading-snug">{producto.nombre}</h3>
        <p className="text-sm text-gray-500 flex-1 leading-relaxed">{producto.descripcion}</p>

        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="font-bold text-lg" style={{ color: accent }}>{precio}</span>
          {producto.disponible && (
            <a href={wa} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-80 whitespace-nowrap"
              style={{ background: accent }}>
              <IconWhatsApp size={14} /> Consultar
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
