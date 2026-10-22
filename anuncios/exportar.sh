#!/usr/bin/env bash
# ============================================================================
# Exporta los anuncios HTML a imágenes PNG listas para publicar.
#
#   ./exportar.sh                    → todos los anuncios
#   ./exportar.sh 01-segunda-planta  → solo ese anuncio
#
# Salidas:
#   anuncios/salidas/<anuncio>.png
#
# El tamaño de cada anuncio se lee del propio HTML, del atributo
# <body data-ancho="1080" data-alto="1350">.
#
# Las piezas para IMPRIMIR (los volantes) llevan además data-escala="2": el HTML
# se diseña a la mitad del tamaño para que se pueda editar cómodo, y se exporta
# al doble para que salga a 300 DPI, que es lo que pide una imprenta. Las piezas
# para redes no lo llevan y salen 1:1 como siempre.
#
# Requiere Chromium (o Chrome). Si el binario se llama distinto:
#   CHROME=google-chrome ./exportar.sh
# ============================================================================
set -euo pipefail

cd "$(dirname "$(readlink -f "$0")")"

CHROME="${CHROME:-chromium}"
if ! command -v "$CHROME" >/dev/null 2>&1; then
  echo "No se encontró '$CHROME'. Instalá Chromium o corré: CHROME=<binario> ./exportar.sh" >&2
  exit 1
fi

# --- Argumentos --------------------------------------------------------------
carpetas=()
for arg in "$@"; do
  case "$arg" in
    --*)     echo "Opción desconocida: $arg" >&2; exit 1 ;;
    *)       carpetas+=("${arg%/}") ;;
  esac
done

# Sin carpetas explícitas: todas las que tengan index.html
if [ "${#carpetas[@]}" -eq 0 ]; then
  for d in */; do
    d="${d%/}"
    [ "$d" = "_marca" ] && continue
    [ "$d" = "salidas" ] && continue
    [ -f "$d/index.html" ] && carpetas+=("$d")
  done
fi

# --- Render ------------------------------------------------------------------
render() {  # render <archivo-html> <destino-png>
  local html="$1" destino="$2" ancho alto escala
  ancho=$(grep  -o 'data-ancho="[0-9]*"'    "$html" | head -1 | grep -o '[0-9]*')
  alto=$(grep   -o 'data-alto="[0-9]*"'     "$html" | head -1 | grep -o '[0-9]*')
  # `|| true`: los anuncios de redes NO llevan data-escala y grep saldría con
  # error, que con `set -e` mataría el script entero.
  escala=$(grep -o 'data-escala="[0-9.]*"'  "$html" | head -1 | grep -o '[0-9.]*' || true)
  ancho="${ancho:-1080}"; alto="${alto:-1350}"; escala="${escala:-1}"

  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --force-device-scale-factor="$escala" \
    --virtual-time-budget=8000 \
    --window-size="${ancho},${alto}" \
    --screenshot="$destino" \
    "file://$(pwd)/$html" >/dev/null 2>&1

  if [ "$escala" = "1" ]; then
    echo "  ✓ $destino (${ancho}×${alto})"
  else
    echo "  ✓ $destino (${ancho}×${alto} ×${escala} → $(( ancho * ${escala%.*} ))×$(( alto * ${escala%.*} )) px, 300 DPI)"
  fi
}

mkdir -p salidas
for carpeta in "${carpetas[@]}"; do
  html="$carpeta/index.html"
  if [ ! -f "$html" ]; then
    echo "  ✗ $carpeta — no tiene index.html, se salta" >&2
    continue
  fi

  render "$html" "salidas/$carpeta.png"
done

echo "Listo."
