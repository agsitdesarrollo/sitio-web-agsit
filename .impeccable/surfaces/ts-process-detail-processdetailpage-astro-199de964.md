---
version: 1
slug: "ts-process-detail-processdetailpage-astro-199de964"
primary_target: "src/components/process-detail/ProcessDetailPage.astro"
related_targets: ["src/pages/administracion-de-procesos/[slug]/index.astro","src/pages/en/process-management/[slug]/index.astro"]
---

# Administración de Procesos — páginas terciarias (5 servicios × es/en)

## Scope and visitor mode

Persuade. Cinco páginas de servicio bajo `/administracion-de-procesos/<slug>/` y `/en/process-management/<slug>/`. Hereda el mundo visual del sitio (tinta `#020712`, azul `#08152b`, cian `#41c8f6`, papel `#f6fafe`; Cormorant Garamond 300 para titulares, Inter 500 para texto). Solo se decide la estructura. Menú, footer, drawer y sección final de contacto son los componentes compartidos, sin cambios.

## Audience, job, action, proof, constraints

- Dueño o directivo de una PyME, sin perfil técnico. Debe entender qué es cada servicio, cómo trabaja AGSIT y decidir hablar con nosotros.
- Acción: abrir el drawer de contacto (`data-contact-trigger`) o llegar al formulario final.
- Prueba disponible: ninguna cuantitativa. Todo es cualitativo; sin testimonios, FAQ, precios, cifras ni marcas de herramientas.
- Cada sección ocupa exactamente la pantalla (móvil vertical/horizontal, tablet vertical/horizontal, escritorio) sin recortar contenido ni quedar bajo el menú. Un solo controlador de scroll por página.
- Los espacios para imagen quedan reservados y funcionan bien vacíos; las imágenes las entrega el usuario después.

## Chosen direction and memorable moment

La ruta del proceso. Momento memorable: el diagrama de ruta del hero se acopla a una barra fija inferior al pasar a la siguiente estación, y desde ahí marca dónde estás.

## Direction contract

THESIS: La página es un proceso. Una ruta continua une Inicio, Hoy, Método, cada servicio y Resultado, y el visitante siempre sabe en qué estación está. Rechaza el arreglo por defecto: hero, cuadrícula de tarjetas iguales y testimonios.

OWN-WORLD: Tinta `#020712`/`#08152b` con cian `#41c8f6` como único acento; interludios sobre papel `#f6fafe`. Titulares Cormorant Garamond 300 sin etiqueta encima; texto Inter 500. Geometría de diagrama: nodo de inicio en anillo fino, servicios como puntos, fin en anillo grueso, línea de 2px. Sin rejillas de fondo, sin trazos a mano, sin tarjetas iguales. Espacios de imagen 4:3 con esquina de 14px.

STORY: El visitante reconoce su situación en sus propias palabras, entiende cómo trabajamos, ve qué hacemos en cada servicio (nombre técnico explicado en llano), ve qué cambia y contacta a AGSIT. Cree porque el enfoque es específico y claro, no por cifras.

FIRST VIEWPORT: Izquierda: enlace pequeño para volver a Administración de Procesos, titular de dos líneas, una frase y el botón principal. Derecha: la ruta de los servicios de esa página como diagrama vertical (nodo de inicio, un nodo por servicio con su nombre técnico y una línea en llano, nodo final). La barra inferior aún no aparece.

FORM: La ruta del proceso, posición 1 de 7 en mi lista ordenada; seed `e037e798`, reparto 5-3-1.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- Imágenes de cada servicio: las entrega el usuario; el espacio muestra el nombre técnico como tipografía tenue hasta entonces.
- Imagen social (og:image) por página: se reutiliza la de la página padre hasta tener propias.
