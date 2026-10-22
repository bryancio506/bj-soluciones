# Anuncios — BJ Soluciones

Set de piezas gráficas (redes sociales y volantes impresos), armadas en HTML para que se
puedan editar (cambiar foto, texto o número) sin abrir un editor de diseño y sin depender
de Canva.

Cada pieza vive en su propia carpeta con un `index.html`. Se abre en el navegador para
verla y se exporta a PNG con un comando.

## Qué hay

### Para redes

| Carpeta | Formato | Servicio | Para qué sirve |
|---|---|---|---|
| `01-segunda-planta` | 1080×1350 (4:5) | Soldadura / ampliación | El anuncio de oferta más directo — es el que recomienda pautar `estrategia/06-plan-ads.md` |
| `02-antes-despues-oficina` | 1080×1080 (1:1) | Remodelación de oficinas | Antes/después con corte diagonal horizontal |
| `03-servicios` | 1080×1080 (1:1) | Todos | Anuncio "paraguas" de marca, para dejar corriendo siempre |
| `04-story-soldadura` | 1080×1920 (9:16) | Soldadura | Historia de Instagram/Facebook o portada de Reel |
| `05-muros-pintura` | 1080×1350 (4:5) | Pintura / muros | Antes → durante → después en tres bandas |
| `06-bano-antes-despues` | 1080×1080 (1:1) | Remodelación de baños | Antes/después con corte diagonal vertical |
| `07-escalera-metalica` | 1080×1350 (4:5) | Soldadura / escaleras | El proyecto estrella; sirve de portada del Reel de `escalera.mp4` |
| `portada-facebook` | 1640×624 | — | Foto de portada de la Página de Facebook |

Los formatos no son al azar: **4:5 es el que más pantalla ocupa** en el feed del celular,
1:1 es el seguro para cualquier lado, y 9:16 es el de historias.

### Para imprimir (volantes)

| Carpeta | Papel | Para qué sirve |
|---|---|---|
| `08-volante-servicios` | Media carta (5.5×8.5") | El volante **de mano**: se entrega en persona, se deja en ferreterías o se mete por debajo del portón |
| `09-volante-poste` | Carta (8.5×11") | El volante **de poste**: se pega en la calle y trae colillas para arrancar con el número |

Son dos piezas distintas a propósito, no dos versiones del mismo diseño:

- **El de mano** se lee a un brazo de distancia, así que puede llevar la secuencia de fotos
  grande y una descripción corta de cada servicio.
- **El de poste** se lee desde la acera de enfrente: menos texto y mucho más grande, fondo
  claro (gasta menos tinta cuando se imprimen decenas y aguanta mejor el sol) y una franja
  de nueve **colillas** abajo. El que pasa arranca una tirita con el número y se la lleva —
  sin eso, un volante de poste obliga a sacar el teléfono ahí mismo y casi nadie lo hace.

De una hoja carta salen **dos** volantes de mano, así que ese sale a mitad de precio.

Los dos llevan la misma **secuencia antes → durante → después** de la remodelación de cocina
(`public/proyectos/remodelacion-07-*.jpeg`). Eso no es decoración: una foto de "después"
sola no prueba nada, puede ser de cualquiera. Las tres seguidas prueban que la obra la
hicieron ellos. Si se cambian, tienen que ser del mismo proyecto y en ese orden.

**Los volantes llevan el WhatsApp de Byron** y su QR. En el de poste, el número se repite
en cada colilla.

**Ojo dónde se pega.** En varias municipalidades pegar en postes del ICE o en señales de
tránsito se multa. Postes de madera privados, pulperías, ferreterías y entradas de
residencial (pidiendo permiso) es lo seguro.

## Ver una pieza

Abrí el `index.html` de la carpeta en el navegador (doble clic). Como las piezas miden
más de 1000 px de ancho, conviene alejar la vista con **Ctrl + −** para verla completa.

## Exportar a imagen

Desde esta carpeta:

```bash
./exportar.sh                    # todos los anuncios
./exportar.sh 01-segunda-planta  # solo uno
```

Las imágenes quedan en `salidas/`.
Esas son las que se suben a Facebook, Instagram o se ponen de estado de WhatsApp.

**Los volantes salen a 300 DPI**, que es la resolución que pide una imprenta. Se diseñan a
la mitad del tamaño para poder editarlos cómodo y el script los exporta al doble: eso lo
controla el atributo `data-escala="2"` del `<body>`. Las piezas de redes no lo llevan y
salen 1:1 como siempre. A la imprenta se le lleva el PNG de `salidas/` tal cual y se pide
"media carta" o "carta" según el volante.

Cada pieza tiene un solo HTML. Si cambiás una foto o un texto, volvé a exportar para
actualizar la imagen de `salidas/`.

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

`_marca/qr/` tiene el código QR de los volantes, con el número en el
nombre del archivo (`qr-wa-6004-0817.png`). Los dos volantes lo usan. Abre WhatsApp con
el mensaje ya escrito ("Hola, vi su volante y quiero cotizar."), así el que escanea solo
tiene que darle enviar.

Si cambia el número, hay que regenerar su QR:

```bash
qrencode -l M -s 14 -m 2 -o _marca/qr/qr-wa-6004-0817.png \
  "https://wa.me/50660040817?text=Hola%2C%20vi%20su%20volante%20y%20quiero%20cotizar."
```

Y conviene comprobar que se lee antes de mandar a imprimir:

```bash
zbarimg --raw salidas/09-volante-poste.png
```

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
