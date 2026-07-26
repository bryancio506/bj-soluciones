# Anuncios — BJ Soluciones

Set de anuncios para Facebook e Instagram, armados en HTML para que se puedan editar
(cambiar foto, texto o número) sin abrir un editor de diseño y sin depender de Canva.

Cada anuncio vive en su propia carpeta con un `index.html`. Se abre en el navegador para
verlo y se exporta a PNG con un comando.

## Qué hay

| Carpeta | Formato | Servicio | Para qué sirve |
|---|---|---|---|
| `01-segunda-planta` | 1080×1350 (4:5) | Soldadura / ampliación | El anuncio de oferta más directo — es el que recomienda pautar `estrategia/06-plan-ads.md` |
| `02-antes-despues-oficina` | 1080×1080 (1:1) | Remodelación de oficinas | Antes/después con corte diagonal horizontal |
| `03-servicios` | 1080×1080 (1:1) | Todos | Anuncio "paraguas" de marca, para dejar corriendo siempre |
| `04-story-soldadura` | 1080×1920 (9:16) | Soldadura | Historia de Instagram/Facebook o portada de Reel |
| `05-muros-pintura` | 1080×1350 (4:5) | Pintura / muros | Antes → durante → después en tres bandas |
| `06-bano-antes-despues` | 1080×1080 (1:1) | Remodelación de baños | Antes/después con corte diagonal vertical |
| `07-escalera-metalica` | 1080×1350 (4:5) | Soldadura / escaleras | El proyecto estrella; sirve de portada del Reel de `escalera.mp4` |
| `portada-facebook` | 1640×624 | — | Foto de portada de la Página de Facebook. Solo existe con el número principal (ver abajo) |

Los formatos no son al azar: **4:5 es el que más pantalla ocupa** en el feed del celular,
1:1 es el seguro para cualquier lado, y 9:16 es el de historias.

## Ver un anuncio

Abrí el `index.html` de la carpeta en el navegador (doble clic). Como los anuncios miden
1080 px de ancho, conviene alejar la vista con **Ctrl + −** para verlo completo.

## Exportar a imagen

Desde esta carpeta:

```bash
./exportar.sh                    # todos los anuncios
./exportar.sh 01-segunda-planta  # solo uno
./exportar.sh --socio            # todos, con el número del socio
./exportar.sh --ambos            # los dos juegos de una vez
```

Las imágenes quedan en `salidas/` (número principal) y `salidas/socio/` (número del socio).
Esas son las que se suben a Facebook, Instagram o se ponen de estado de WhatsApp.

**Los dos juegos salen del mismo HTML.** No hay carpetas duplicadas: el script hace una copia
temporal cambiando solo el número. Si cambiás una foto o un texto, con volver a exportar
quedan actualizados los dos — no hay que acordarse de editar dos veces.

**Piezas de un solo número.** Si una pieza no tiene sentido duplicada (la portada de Facebook,
por ejemplo: la página es una sola y su botón apunta al número principal), se le pone
`data-solo-principal="1"` en el `<body>` y el script la salta al generar el juego del socio.

## Editar un anuncio

Cada `index.html` arranca con un comentario que explica qué se puede tocar en ese anuncio en
particular. En general:

- **Cambiar la foto** → el `src` de la `<img>`. Si el encuadre queda mal, se ajusta
  `object-position`: el primer valor mueve horizontal, el segundo vertical
  (`center 20%` sube el encuadre, `center 80%` lo baja).
- **Cambiar el texto** → está tal cual entre las etiquetas.
- **Cambiar el tamaño de un texto** → el `font-size` en el bloque `<style>` de arriba del
  mismo archivo.

Ojo con los textos largos: los titulares están calibrados para la cantidad de líneas que
tienen ahora. Si alargás uno, revisá que no se salga del lienzo — exportá y mirá el PNG.

## Lo compartido: `_marca/`

`_marca/marca.css` tiene los colores, las tipografías y las piezas que se repiten en todos
los anuncios (logo, titulares, viñetas con palomita, botón de WhatsApp, etiquetas
antes/después). **Los colores son los mismos de `public/config.json` del sitio web**, así que
si cambia la marca se cambia acá una vez y se actualizan los siete anuncios.

`_marca/fuentes/` tiene Syne y DM Sans en archivos locales, para que los anuncios se vean
igual aunque no haya internet al momento de exportar.

## De dónde salen las fotos

De `public/proyectos/` — las mismas del sitio web. Los anuncios las referencian por ruta
relativa (`../../public/proyectos/...`), no hay copias. Si se agrega una foto nueva al sitio,
queda disponible para los anuncios automáticamente.

La convención de nombres de las fotos está en `estrategia/05-guia-fotos.md`.

## Zona segura en historias (anuncio 04)

Instagram y Facebook tapan más o menos los primeros 250 px y los últimos 340 px de una
historia con su propia interfaz. Para revisar que nada importante quede debajo, agregá la
clase `ver-guias` al `<body>` del anuncio y recargá: aparece un rectángulo punteado con el
área segura. Quitala antes de exportar.

## Referencias

Las tres capturas de anuncios de la competencia que se usaron como referencia de formato
están en `~/Documents/BussinessIdeas/clientes/BJ Soluciones/assets/proyectos/anuncios-referencia/`
(fuera del repo).
