# Arrancar la página de Facebook — BJ Soluciones

Guía práctica para abrir la página y dejarla publicando **hoy**, con el material que ya
existe en el repo.

> **Esta guía no repite los datos del perfil.** El nombre, la categoría, la bio, la
> descripción larga y el paso a paso de Instagram y Meta Business Suite están en
> [`estrategia/01-creacion-perfiles.md`](../../estrategia/01-creacion-perfiles.md).
> Acá está lo que ese documento no cubre: cómo funciona de verdad el botón de WhatsApp,
> qué publicar los primeros días con los anuncios ya hechos, y qué hacer con el segundo
> número.

---

## Lo que ya está listo (no hay que crear nada)

| Qué | Dónde está | Para qué |
|---|---|---|
| Logo cuadrado | `public/logo.png` | Foto de perfil |
| Fotos de 13 proyectos | `public/proyectos/` | Publicaciones y álbumes |
| Video de la escalera | `public/proyectos/escalera.mp4` | Reel |
| 7 anuncios armados | `anuncios/salidas/` | Publicaciones y estados |
| Los mismos 7, con el número del socio | `anuncios/salidas/socio/` | Estados del socio |
| Portada de Facebook (1640×624) | `anuncios/salidas/portada-facebook.png` | Foto de portada |
| Sitio web | https://bj-soluciones.netlify.app/ | Campo "Sitio web" de la página |
| Copys escritos | [`estrategia/04-copys-iniciales.md`](../../estrategia/04-copys-iniciales.md) | Texto de las publicaciones |

Si la carpeta `anuncios/salidas/` no existe, se regenera con:

```bash
cd anuncios && ./exportar.sh --ambos
```

---

## El botón de WhatsApp: dónde sale y dónde no

Esta es la duda concreta, así que va primero. **Poner un link de `wa.me` en una publicación
normal NO genera el botón verde de WhatsApp.** Depende de dónde lo pongas:

| Dónde | ¿Sale botón? | Qué es lo que pasa |
|---|---|---|
| **Botón de la página** (arriba, junto a "Seguir") | **Sí** | Es un botón fijo de la página. Se configura una vez y queda para siempre. Admite **un solo número**. |
| **Publicación normal** con un link `wa.me` | **No** | Facebook lo muestra como una tarjeta de link, no como botón. Además, las publicaciones con links a sitios externos suelen tener **menos alcance** que las que no los llevan. |
| **Publicación promocionada o anuncio** con objetivo *Mensajes* | **Sí** | Ahí sí aparece el botón nativo "Enviar mensaje" debajo del anuncio. Requiere presupuesto. |
| **Historia** | Con sticker | Se le pone el sticker de link apuntando al `wa.me`. No es un botón verde, pero funciona de un toque. |

**Dato útil:** en las capturas de anuncios de la competencia que sirvieron de referencia
para el diseño (Tecnoconstrucciones, Venética), ese botón "Enviar mensaje" que se ve abajo
**es porque son anuncios pagados**, no publicaciones normales. Con presupuesto ₡0 no se
puede replicar — y no hace falta.

### Entonces, ¿qué hacer mientras no haya pauta?

1. **Configurar el botón de la página** (paso siguiente). Es gratis y permanente.
2. **En las publicaciones, poner el número como texto**: `📲 6004-0817`. La gente lo copia
   o lo toca desde el celular. Esto es lo que hacen los anuncios que ya están armados —
   por eso el número va grande y legible en la imagen.
3. **No meter links de `wa.me` en cada publicación.** Bajan el alcance y no generan botón.
   Guardalos para la bio de Instagram y las historias.

---

## Paso 1 — Crear la página

Seguí [`estrategia/01-creacion-perfiles.md`](../../estrategia/01-creacion-perfiles.md),
sección **1. Página de Facebook**, que tiene todos los campos ya redactados.

Dos cosas a tener presentes que ese documento no aclara:

- La categoría **"Contratista general"** es la correcta. Va alineada con lo que dice el
  sitio web (son contratistas, no maestros de obra).
- La **foto de portada tiene un problema** — ver Paso 3.

## Paso 2 — El botón de WhatsApp de la página

Amplía el punto 7 de `estrategia/01`.

1. En la página, buscá el botón de acción (suele decir "Editar botón" o aparece como
   **"+ Agregar botón"** debajo de la portada).
2. Elegí la opción de **WhatsApp** ("Enviar mensaje de WhatsApp" o "WhatsApp").
3. Poné el número **+506 6004-0817**.
4. Meta manda un **código por WhatsApp a ese número** para confirmar que es tuyo. Hay que
   tener el celular a mano en ese momento.
5. Probalo desde otro teléfono: tiene que abrir el chat directo.

### ¿Qué número va en el botón?

**El de Byron (6004-0817).** El botón admite uno solo, igual que un link de `wa.me` — es
una limitación de WhatsApp, no de Facebook.

El número del socio (**6401-3395**) va en:

- La **descripción de la página**, como segunda línea de contacto.
- Los **estados de WhatsApp del socio**, con el juego de anuncios de
  `anuncios/salidas/socio/` (esos ya salen con su número impreso).

Así los dos números circulan sin pelearse por el mismo botón.

## Paso 3 — La foto de portada

**Ya está hecha:** `anuncios/salidas/portada-facebook.png` (1640×624). Se sube tal cual.

Lleva el logo, el nombre, la tira de servicios, el número principal y el sitio web, sobre
la foto de la ampliación con estructura metálica.

**No usés `public/og-image.jpg` de portada** (como sugiere `estrategia/01`): esa imagen es
de 1200×630, otra proporción, y se recorta feo — sobre todo en celular.

Por qué la portada está diseñada así:

- Facebook la muestra a ~**820×312 en computadora** y a ~**640×360 en celular**, que
  **recorta los lados**. En el lienzo de 1640 px, en celular solo se ve la franja central
  de ~1109 px. Todo lo importante quedó adentro de esa franja.
- La **foto de perfil de la página se monta sobre la esquina inferior izquierda** de la
  portada, así que esa zona quedó vacía a propósito.

Si querés cambiarle la foto de fondo o los servicios, editá
`anuncios/portada-facebook/index.html` y volvé a exportar. Para comprobar que nada se sale
de la zona segura, agregale la clase `ver-guias` al `<body>`: aparecen dos marcos punteados
(verde = lo que se ve en celular, rojo = donde tapa la foto de perfil).

## Paso 4 — Las primeras publicaciones

Antes de invitar a nadie, dejá **3 o 4 publicaciones arriba**. Una página vacía no genera
confianza.

Cada anuncio ya hecho tiene su copy escrito en
[`estrategia/04-copys-iniciales.md`](../../estrategia/04-copys-iniciales.md). El calce es
este:

| Orden | Imagen a subir | Texto |
|---|---|---|
| 1 | `anuncios/salidas/01-segunda-planta.png` | Post 1 de `04-copys-iniciales.md` |
| 2 | `anuncios/salidas/07-escalera-metalica.png` | Post 2 — sirve de portada del Reel de `escalera.mp4` |
| 3 | `anuncios/salidas/06-bano-antes-despues.png` | Post 4 |
| 4 | `anuncios/salidas/03-servicios.png` | Post 5 (el de recap / pregunta a la audiencia) |

El anuncio **03-servicios** conviene además **fijarlo arriba** ("Fijar en la parte superior
de la página"): es el que resume todo y es lo primero que ve quien llega.

El **04-story-soldadura** es formato 9:16 — ese no va al muro, va a **Historias**.

Después de estos cuatro, seguí el ritmo de
[`estrategia/03-calendario-publicacion.md`](../../estrategia/03-calendario-publicacion.md).

## Paso 5 — Los estados de WhatsApp

Son dos juegos de las mismas siete imágenes, cambia solo el número impreso:

- `anuncios/salidas/` → los sube **Byron** (sale 6004-0817)
- `anuncios/salidas/socio/` → los sube **el socio** (sale 6401-3395)

Conviene que **no suban el mismo el mismo día**: si los contactos comparten, ven la imagen
repetida. Mejor alternar, o que cada uno arranque por un anuncio distinto.

---

## Checklist

- [ ] Página creada con nombre, categoría "Contratista general", bio y descripción
- [ ] Foto de perfil = `public/logo.png`
- [ ] Portada subida = `anuncios/salidas/portada-facebook.png`
- [ ] Sitio web `https://bj-soluciones.netlify.app/` en la información de la página
- [ ] Botón de WhatsApp configurado con 6004-0817 y **probado desde otro teléfono**
- [ ] Número del socio (6401-3395) agregado en la descripción
- [ ] 4 publicaciones arriba antes de invitar gente
- [ ] `03-servicios` fijado en la parte superior
- [ ] Instagram y Meta Business Suite → seguir `estrategia/01`, secciones 2 y 3

---

## Nota sobre los menús de Meta

Meta le cambia el nombre y el lugar a las opciones seguido, y a veces muestra interfaces
distintas a cuentas distintas. Si un menú no se llama exactamente como dice acá, buscá la
opción por lo que hace, no por el nombre exacto. Lo que no cambia es el fondo del asunto:
el botón de la página admite un número, las publicaciones normales no generan botón, y los
anuncios pagados sí.
