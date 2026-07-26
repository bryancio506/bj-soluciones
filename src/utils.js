// Convierte el número tal como está en config.json ("50660040817")
// en algo legible para mostrar en pantalla: "+506 6004-0817".
export function formatearTelefono(numero) {
  const soloDigitos = String(numero).replace(/\D/g, "")
  const local = soloDigitos.startsWith("506") ? soloDigitos.slice(3) : soloDigitos
  if (local.length !== 8) return `+506 ${local}`
  return `+506 ${local.slice(0, 4)}-${local.slice(4)}`
}

// Devuelve la lista de números de WhatsApp configurados, sin vacíos ni repetidos.
// Hoy son dos (el principal y el del socio), pero soporta los que hagan falta.
export function numerosWhatsApp(contacto) {
  return [contacto.whatsapp, contacto.whatsapp2].filter(Boolean)
}

// Link de WhatsApp con mensaje ya escrito.
export function linkWhatsApp(numero, mensaje = "Hola BJ Soluciones, necesito una cotización") {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}
