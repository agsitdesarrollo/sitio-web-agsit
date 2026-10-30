# Imágenes sociales de Dirección de Proyectos

## Alcance y archivos

Cada página tiene una pieza española y otra inglesa, independientes de las
imágenes de contenido `pending`. Las seis piezas actuales son:

- `public/assets/social/pmo-y-gobierno-de-proyectos-es.jpg`
- `public/assets/social/pmo-project-governance-en.jpg`
- `public/assets/social/direccion-estrategica-de-proyectos-es.jpg`
- `public/assets/social/strategic-project-delivery-en.jpg`
- `public/assets/social/gestion-agil-de-proyectos-es.jpg`
- `public/assets/social/agile-project-delivery-en.jpg`

La referencia visual es `public/assets/social/desarrollo-software-es.jpg`.
El diseño de PMO ES se aprobó antes de exportar las demás variantes.

## Método reproducible

El generador es `docs/generate-project-management-social-images.cjs`.
Compone HTML/CSS local, lo renderiza con Chromium mediante Playwright y exporta
el resultado con `sharp`, dependencia existente del proyecto. No usa imágenes
generativas, imágenes de contenido ni solicitudes de red.

Ejecutar desde la raíz del repositorio. Para generar solo una pieza, pasar su
nombre sin extensión:

```powershell
node docs/generate-project-management-social-images.cjs pmo-project-governance-en
```

Se pueden pasar varios nombres. Sin argumentos se regeneran las seis piezas
del catálogo `cards`; no se crean imágenes de páginas aún no implementadas.

```powershell
node docs/generate-project-management-social-images.cjs
```

El generador utiliza Playwright instalado en el proyecto o el runtime de Codex
si está disponible. No añade dependencias de navegador al sitio. Detecta el
Chromium instalado; si el entorno es diferente, indicar las rutas explícitas:

```powershell
$env:SOCIAL_PLAYWRIGHT_MODULE = 'C:\ruta\a\node_modules\playwright'
$env:SOCIAL_CHROMIUM_EXECUTABLE = 'C:\ruta\a\chrome-headless-shell.exe'
$env:SOCIAL_PREVIEW_DIR = 'C:\ruta\a\carpeta-de-revision'
node docs/generate-project-management-social-images.cjs pmo-project-governance-en
```

`SOCIAL_PREVIEW_DIR` es opcional. Por defecto se usa `agsit-social-previews`
dentro de la carpeta temporal del sistema. Allí quedan el HTML autocontenido,
la captura PNG, una vista de **400 × 210 px** y un JSON de medidas por pieza.
Estos archivos de revisión no se guardan bajo `public/` ni se agregan al commit.

## Composición y materiales

- Lienzo: **1200 × 630 px**, escala de dispositivo 1.
- Franja blanca de 76 px, logo de 204 px y márgenes de 60 px, como la referencia.
- Logo original: `public/assets/logo-asit.webp`.
- Fuentes originales: Cormorant Garamond 300 para el título e Inter para el resto,
  cargadas desde `public/fonts/`. Se espera `document.fonts.ready` antes de capturar.
- Fondo azul oscuro con los colores del sitio: `#020712`, `#061321` y `#0d2c3b`.
- Título blanco a 76 px, frase a 26 px y antetítulo cian `#8be2ff`.
- Dos columnas: texto de 560 px y área derecha de 480 px, separadas por 64 px.
- Botón cian `#41c8f6`: «HABLAR CON UN ESPECIALISTA» / «TALK TO A SPECIALIST».
- Menú ES: INICIO, SERVICIOS, CONTACTO, EN. Menú EN: HOME, SERVICES, CONTACT, ES.
- Tarjeta derecha de 400 px, con las paradas completas y la primera activa.
  Usa Inter 700, fondo `#020712`, borde `rgba(242,248,255,.16)`, texto secundario
  `rgba(180,197,219,.88)`, nodos cian y estado activo blanco/cian. Son los colores
  de la navegación real en su paleta oscura.
- No se añade una segunda lista de servicios al pie.

PMO tiene siete paradas; Dirección Estratégica y Gestión Ágil tienen seis.
Los nombres oficiales de los servicios se conservan en ambos idiomas; reto,
método y resultados se traducen.
Los saltos de línea del título son explícitos para conservar su legibilidad.

## Exportación y control de calidad

Se exporta JPEG con muestreo de color **4:4:4** para proteger los bordes del texto.
El generador prueba calidades de 100 a 75 y elige la primera que cumpla
**60 000 ≤ bytes ≤ 100 000**: kB decimales. Si ninguna cumple, termina con error;
no rellena artificialmente el archivo para alcanzar el peso.

Antes de publicar o reemplazar una pieza:

1. Revisar el JPG completo y la reducción real de 400 × 210, generada desde el JPG.
2. Confirmar que título y frase se leen, y que las paradas y el idioma son correctos.
3. Comprobar 1200 × 630, formato JPEG y peso entre 60 y 100 kB.
4. Revisar el JSON de fuentes, posiciones y desbordamientos.
5. Actualizar `metadata.image` y `metadata.imageAlt` en
   `src/data/projectManagementDetail.ts`; el alt debe corresponder a la pieza final.
6. Ejecutar `pnpm build` y `git diff --check`, y revisar el HTML generado para
   `og:image`, `twitter:image`, dimensiones, tipo y ambos alts.
7. Agregar al commit solo las rutas explícitas necesarias; nunca `public/_demo-local/`.

Para cambiar textos o añadir una página autorizada, editar su definición en
`cards`, mantener sus servicios exactos y generar solo las variantes correspondientes.
No cambiar las fuentes ni la composición de todas las piezas como efecto secundario.
