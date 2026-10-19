# Imágenes pendientes: Planeación Estratégica Corporativa

Revisión del 19 de octubre de 2026. No se agregaron fotografías ni se modificó el código durante esta revisión.

Las seis imágenes se comparten entre las versiones española e inglesa. Cada idioma conserva su propio texto alternativo y etiqueta. El hero y la narrativa no necesitan una fotografía.

## Imágenes que se deben preparar

Los tamaños siguientes son recomendaciones de exportación, no tamaños de visualización fijos. Conviene conservar un original grande y dejar margen alrededor del motivo principal: el diseño recorta con `object-fit: cover`. No incrustar textos en las fotografías.

Todas las referencias de datos corresponden a `src/data/strategicPlanningDetail.ts`, dentro de `strategicPlanningDetailCatalog['corporate-strategic-planning']`. Las líneas se refieren al código existente en esta revisión.

| Sección / archivo previsto | Qué debe mostrar | Proporción y recortes del marco actual | Recomendación escritorio | Recomendación móvil | Formato sugerido | Datos en español | Datos en inglés |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Misión — `mision.webp` | Un equipo conversando sobre el propósito de su empresa; situación real de colaboración. | Base 4:3; el modo horizontal de poca altura puede recortar a 16:10. | 1600×1200 px | 960×720 px; conservar margen para un recorte 960×600 | WebP | `es.lifecycle.stages[0].media`, línea 42 | `en.lifecycle.stages[0].media`, línea 83 |
| Visión — `vision.webp` | Un equipo definiendo el futuro que quiere construir para su empresa. | Base 4:3; posible recorte horizontal 16:10. | 1600×1200 px | 960×720 px; margen para 960×600 | WebP | `es.lifecycle.stages[1].media`, línea 43 | `en.lifecycle.stages[1].media`, línea 84 |
| Valores — `valores.webp` | Colaboradores compartiendo los principios que orientan su trabajo y el trato a otras personas. | Base 4:3; posible recorte horizontal 16:10. | 1600×1200 px | 960×720 px; margen para 960×600 | WebP | `es.lifecycle.stages[2].media`, línea 44 | `en.lifecycle.stages[2].media`, línea 85 |
| Objetivos estratégicos — `objetivos.webp` | Un equipo acordando metas y prioridades. Evitar cifras, marcas o datos de clientes no autorizados. | Base 4:3; posible recorte horizontal 16:10. | 1600×1200 px | 960×720 px; margen para 960×600 | WebP | `es.lifecycle.stages[3].media`, línea 45 | `en.lifecycle.stages[3].media`, línea 86 |
| Plan estratégico — `plan.webp` | Una sesión para ordenar acciones y responsabilidades del plan. | Base 4:3; posible recorte horizontal 16:10. | 1600×1200 px | 960×720 px; margen para 960×600 | WebP | `es.lifecycle.stages[4].media`, línea 46 | `en.lifecycle.stages[4].media`, línea 87 |
| Método — `sesion-planeacion.webp` | Una sesión de planeación con un equipo revisando objetivos y acciones. Motivo principal centrado para admitir varios recortes. | El dato declara 4:5; escritorio bajo cambia a 5:4 y horizontal corto a 4:3. En móvil vertical hay además una altura fija por viewport, de modo que el recorte real puede ser más panorámico que 4:3. | Original 2000×2500 px; preparar recortes 1600×2000, 1600×1280 y 1600×1200 según revisión visual | Original mínimo 1200×1500 px; preparar recorte de hasta 960×480 para el marco bajo de portrait | WebP | `es.method.media`, línea 58 | `en.method.media`, línea 99 |

La carpeta pública prevista es `public/assets/planeacion-estrategica/corporativa/`. Las URLs que recibe el navegador empiezan por `/assets/planeacion-estrategica/corporativa/`, sin `public`.

## Dónde se cambian ruta, texto alternativo y estado

La función `media()` de las líneas 4–6 recibe el nombre del archivo sin extensión, el texto alternativo, la etiqueta del espacio reservado y, opcionalmente, la proporción. Construye `src` con la carpeta anterior y extensión `.webp`.

- Para cambiar únicamente el nombre previsto, editar el primer argumento de la llamada correspondiente en español y en inglés.
- Para cambiar el texto alternativo, editar el segundo argumento en cada idioma. Debe describir la fotografía finalmente entregada, no una escena que no aparezca en ella.
- El tercer argumento es la etiqueta del espacio reservado. No es el texto alternativo.
- Para usar otra ruta o extensión, el objeto de cada imagen admite un `src` explícito, en lugar del construido por la función.
- **Cambiar la ruta no activa la fotografía.** La función fija `pending: true` para todas las imágenes. Mientras ese estado siga activo, se renderiza el espacio reservado, aunque el archivo exista.
- Al incorporar cada imagen deberá establecerse `pending: false` en su objeto de datos de ambos idiomas. Puede hacerse con un objeto que extienda el resultado de `media()` y sobrescriba `pending`, sin activar a la vez las imágenes que aún falten. Esta revisión no realiza ese cambio.

## Animaciones: comparación con Growth Marketing

### Las cinco imágenes del recorrido

En Growth Marketing las imágenes forman parte de cada artículo `.strategy-stage`. El controlador fija el panel durante el recorrido y cambia los artículos completos: el que sale pierde opacidad y baja 44 px en 0.2 s; el que entra pasa de opacidad cero y un desplazamiento de 44 px a su posición normal en 0.26 s. La imagen no tiene un parallax independiente. En escritorio ancho, el marco tiene además un `scale(1.08)` estático en CSS; no es una animación propia de la fotografía.

Referencias: `DigitalStrategyPage.astro`, líneas 176–204, y `DigitalStrategyPage.css`, líneas 455–477.

Planeación conserva esa animación del artículo en `strategicPlanningDetailScroll.ts`, líneas 86–114, y la ampliación del marco en `StrategicPlanningDetail.css`, línea 315. Los espacios reservados están dentro de esos mismos artículos, por lo que participan en la salida y entrada como lo haría la imagen real.

Al activar una fotografía, seguirá dentro del mismo marco y artículo (`StrategicPlanningDetailPage.astro`, línea 45), con `width: 100%`, `height: 100%` y `object-fit: cover` (`StrategicPlanningDetail.css`, línea 341). No necesita un selector GSAP nuevo. La equivalencia de la animación está respaldada por el código; la sustitución con fotografías reales todavía no se probó y no se da por verificada visualmente.

### Imagen de Método

Growth Marketing tiene dos efectos distintos:

1. El marco completo entra desde 30 px más abajo y opacidad cero durante 0.9 s, con `power3.out`, al cruzar el 88% de la pantalla.
2. La fotografía dentro del marco tiene parallax ligado al scroll: `yPercent: 5` a `yPercent: -5`, `ease: 'none'`, `scrub: true`, desde `top bottom` hasta `bottom top` de Método. La imagen mide el 114% de la altura del marco para que el desplazamiento no deje huecos.

Referencias: `DigitalStrategyPage.astro`, líneas 67 y 206–207; `DigitalStrategyPage.css`, líneas 811–823.

En Planeación el marco mantiene el primer efecto: `StrategicPlanningDetailPage.astro`, línea 69, conserva `.js-sp-reveal`, animado en `strategicPlanningDetailScroll.ts`, línea 117. **El espacio reservado no recibe el parallax interior**: la rama `pending` de `StrategicPlanningMedia.astro`, líneas 6–9, genera un `div` sin `.js-sp-method-img`. El controlador intenta animar ese selector en la línea 116 y emite `GSAP target .js-sp-method-img not found`.

Al establecer `pending: false`, la rama de imagen real de `StrategicPlanningMedia.astro`, línea 11, sí agrega `.js-sp-method-img` porque Método pasa la propiedad `parallax`. Después de recargar la página, el selector existirá y el parallax podrá inicializarse. El CSS de la línea 666 conserva la imagen al 114% de altura. **No es correcto concluir que el parallax seguirá roto con una imagen real activada; el elemento que necesita sí está previsto en esa rama.** Tampoco basta cambiar únicamente la ruta, porque seguiría mostrándose el `div`.

### Ajustes pendientes antes de agregar las imágenes

No se implementaron durante esta revisión:

| Archivo y línea | Ajuste que deberá hacerse | Motivo |
| --- | --- | --- |
| `src/components/strategic-planning-detail/StrategicPlanningMedia.astro:7` | Dar al elemento interior del espacio reservado la misma clase condicional de parallax que tiene la imagen de la línea 11, cuando recibe `parallax`. | Permite que el espacio reservado de Método tenga hoy el mismo movimiento interior y evita que el controlador busque un elemento inexistente. |
| `src/components/strategic-planning-detail/StrategicPlanningDetail.css:666` y `:954` | Aplicar al interior animado del espacio reservado de Método las mismas dimensiones y cobertura que a la imagen: anchura completa, altura del 114%, recorte por el marco y `will-change: transform`. Mantener inmóvil el marco exterior. | Copiar solo la clase GSAP sin la cobertura adicional puede descubrir un hueco al desplazar el interior. No debe aplicarse el 114% a los otros cinco espacios reservados. |
| `src/components/strategic-planning-detail/strategicPlanningDetailScroll.ts:116` | Resolver el elemento dentro de la raíz de Planeación y crear el tween solo si existe. Conservar exactamente los valores, límites y `scrub` de Marketing. | Evita el aviso cuando no exista un medio animable y mantiene un único controlador. Esta protección por sí sola silencia el aviso, pero no añade parallax al espacio reservado. |
| `src/data/strategicPlanningDetail.ts:5` y objetos de cada medio | Permitir activar individualmente cada imagen con `pending: false`, manteniendo las demás pendientes. | La función actual genera siempre el estado pendiente. No conviene cambiarlo globalmente mientras falten fotografías. |

El cambio de rama `div` → `img` conserva el marco exterior, pero todavía debe comprobarse con las fotos definitivas que su tamaño intrínseco no altere la composición ni deje huecos durante el parallax. `--sp-media-ratio`, escrito en el espacio reservado, no se consume actualmente en el CSS: los recortes reales los establecen los marcos y sus media queries, no esa variable del dato.

## Cómo agregar una imagen cuando esté disponible

1. Guardar el archivo optimizado en la carpeta pública prevista. Usar los nombres de la tabla o actualizar la ruta de esa imagen en ambos idiomas.
2. Revisar primero los ajustes de parallax descritos arriba. No hace falta cambiar la animación de los cinco artículos del recorrido.
3. Activar solo esa imagen con `pending: false` en español e inglés. No cambiar globalmente el estado de todas las imágenes pendientes.
4. Escribir un texto alternativo en cada idioma que describa la foto real. Si la escena finalmente cambia, actualizar también la etiqueta que se usaba como referencia.
5. Recargar la página para que el controlador inicialice sus elementos. Revisar el recorte en teléfono vertical y horizontal, tablet y escritorio, incluyendo 1280×720. Comprobar que el marco conserve sus dimensiones al cargar y que no aparezcan huecos en los extremos del parallax.
6. Comprobar el movimiento reducido: la fotografía debe seguir visible y legible sin animaciones. La prueba con fotografías reales y esta preferencia queda pendiente; en esta sesión no se sustituyeron los espacios reservados.
