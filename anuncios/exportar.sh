#!/usr/bin/env bash
# ============================================================================
# Exporta los anuncios HTML a imágenes PNG listas para publicar.
#
#   ./exportar.sh                    → todos los anuncios, número principal
#   ./exportar.sh 01-segunda-planta  → solo ese anuncio
#   ./exportar.sh --socio            → todos, con el número del socio
#   ./exportar.sh --ambos            → los dos juegos de una vez
#   ./exportar.sh --ambos 04-story-soldadura   → un anuncio, los dos números
#
# Salidas:
#   anuncios/salidas/<anuncio>.png          ← número principal
#   anuncios/salidas/socio/<anuncio>.png    ← número del socio
#
# POR QUÉ NO HAY CARPETAS DUPLICADAS
# ----------------------------------
# El anuncio se escribe una sola vez con el número principal. Para el juego del
# socio, el script hace una copia temporal del HTML cambiando solo el número,
# la fotografía y la borra. Así, cuando cambiés un texto o una foto, los dos
# juegos quedan actualizados — no hay que acordarse de editar dos veces.
#
# Si entra un tercer número, agregalo a la lista NUMEROS de abajo.
#
# El tamaño de cada anuncio se lee del propio HTML, del atributo
# <body data-ancho="1080" data-alto="1350">.
#
# Requiere Chromium (o Chrome). Si el binario se llama distinto:
#   CHROME=google-chrome ./exportar.sh
# ============================================================================
set -euo pipefail

cd "$(dirname "$(readlink -f "$0")")"

# --- Números de contacto -----------------------------------------------------
# El primero es el que está escrito en los HTML; el resto son reemplazos.
NUMERO_PRINCIPAL="6004-0817"
NUMERO_SOCIO="6401-3395"

CHROME="${CHROME:-chromium}"
if ! command -v "$CHROME" >/dev/null 2>&1; then
  echo "No se encontró '$CHROME'. Instalá Chromium o corré: CHROME=<binario> ./exportar.sh" >&2
  exit 1
fi

# --- Argumentos --------------------------------------------------------------
juegos=("principal")
carpetas=()
for arg in "$@"; do
  case "$arg" in
    --socio) juegos=("socio") ;;
    --ambos) juegos=("principal" "socio") ;;
    --*)     echo "Opción desconocida: $arg (usá --socio o --ambos)" >&2; exit 1 ;;
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
  local html="$1" destino="$2" ancho alto
  ancho=$(grep -o 'data-ancho="[0-9]*"' "$html" | head -1 | grep -o '[0-9]*')
  alto=$(grep  -o 'data-alto="[0-9]*"'  "$html" | head -1 | grep -o '[0-9]*')

  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --force-device-scale-factor=1 \
    --virtual-time-budget=8000 \
    --window-size="${ancho:-1080},${alto:-1350}" \
    --screenshot="$destino" \
    "file://$(pwd)/$html" >/dev/null 2>&1

  echo "  ✓ $destino (${ancho:-1080}×${alto:-1350})"
}

for juego in "${juegos[@]}"; do
  if [ "$juego" = "socio" ]; then
    salida="salidas/socio"
    echo "Juego del socio ($NUMERO_SOCIO):"
  else
    salida="salidas"
    echo "Juego principal ($NUMERO_PRINCIPAL):"
  fi
  mkdir -p "$salida"

  for carpeta in "${carpetas[@]}"; do
    html="$carpeta/index.html"
    if [ ! -f "$html" ]; then
      echo "  ✗ $carpeta — no tiene index.html, se salta" >&2
      continue
    fi

    if [ "$juego" = "socio" ]; then
      # Copia temporal en la MISMA carpeta, para que las rutas relativas
      # a ../_marca y ../../public sigan resolviendo igual.
      tmp="$carpeta/.tmp-socio.html"
      sed "s/${NUMERO_PRINCIPAL}/${NUMERO_SOCIO}/g" "$html" > "$tmp"
      render "$tmp" "$salida/$carpeta.png"
      rm -f "$tmp"
    else
      render "$html" "$salida/$carpeta.png"
    fi
  done
  echo
done

echo "Listo."
