// Convierte el número tal como está en config.json ("50660040817")
// en algo legible para mostrar en pantalla: "+506 6004-0817".
export function formatearTelefono(numero) {
  const soloDigitos = String(numero).replace(/\D/g, "")
  const local = soloDigitos.startsWith("506") ? soloDigitos.slice(3) : soloDigitos
  if (local.length !== 8) return `+506 ${local}`
  return `+506 ${local.slice(0, 4)}-${local.slice(4)}`
}

// Link de WhatsApp con mensaje ya escrito.
export function linkWhatsApp(numero, mensaje = "Hola BJ Soluciones, necesito una cotización") {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}
