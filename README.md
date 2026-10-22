# Vitrina Digital CR — Template

## Cotizaciones de BJ Soluciones

La página `/cotizaciones` permite preparar cotizaciones comerciales para clientes de BJ Soluciones. Se pueden añadir materiales, mano de obra y otros servicios con cantidad, unidad y precio; la vista previa calcula subtotal, impuesto opcional y total en colones. El botón **Guardar PDF** abre la impresión del navegador: elegir **Guardar como PDF** y tamaño carta. El documento lleva el logo, colores y datos de contacto de `public/config.json`.

Las cotizaciones se guardan solo en el almacenamiento local del navegador usado. No se sincronizan entre teléfonos o computadoras y se pierden si se borran los datos del sitio. El acceso pide una contraseña fija y se mantiene durante la sesión de la pestaña. Como la contraseña está en el código del cliente, **esta barrera no protege datos confidenciales**: quien inspeccione los archivos publicados puede encontrarla. Para seguridad real hace falta autenticación del lado del servidor. Es una cotización comercial, no una factura electrónica.

Para probarla localmente: `npm run dev` y abrir `http://localhost:5173/cotizaciones`.

Template reutilizable para catálogos de tiendas. Para cada cliente nuevo:

## Pasos para nuevo cliente

1. Duplicar este repo en GitHub (botón "Use this template")
2. Editar `public/config.json` — nombre, colores, contacto
3. Editar `public/catalogo.json` — agregar productos con URLs de Cloudinary
4. Conectar repo a Netlify (auto-detecta Vite, build command: `npm run build`, dir: `dist`)
5. Configurar subdominio personalizado en Netlify

## Estructura de config.json

```json
{
  "nombre": "Nombre de la tienda",
  "slogan": "Slogan corto",
  "logo": "URL del logo (Cloudinary recomendado)",
  "colores": {
    "primary": "#0F0F0F",   ← color del header/footer
    "accent": "#FF4D1C",    ← color de botones y precios
    "bg": "#F7F5F0"         ← fondo de la página
  },
  "contacto": {
    "whatsapp": "50688887777",
    "instagram": "usuario",
    "ubicacion": "Ciudad, País",
    "horario": "Lun–Sáb 9am–6pm"
  },
  "categorias": ["Todos", "Cat1", "Cat2"]
}
```

## Estructura de catalogo.json

```json
[
  {
    "id": 1,
    "nombre": "Nombre del producto",
    "categoria": "Cat1",
    "precio": 10000,
    "moneda": "CRC",
    "descripcion": "Descripción corta",
    "imagen": "https://res.cloudinary.com/...",
    "disponible": true,
    "destacado": false
  }
]
```

## Imágenes

Usar Cloudinary (plan gratuito). URL con transformación recomendada:
`https://res.cloudinary.com/TU_CLOUD/image/upload/w_600,h_600,c_fill/nombre-imagen.jpg`
