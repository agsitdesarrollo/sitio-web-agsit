# Auditoría final de Growth Marketing v2

Rama `codex/marketing-growth-v2`, commit auditado `3f2ff5d`. Build de producción servido con `astro preview` en el puerto 4399. Chromium (Playwright) con rueda en escritorio y eventos táctiles reales (`Input.dispatchTouchEvent`) en teléfono. No se cambió código.

Rutas: `/marketing-digital/growth-marketing-y-estrategia-digital/` (ES) y `/en/digital-marketing/growth-marketing-and-digital-strategy/` (EN).

Capturas y mediciones (fuera del repositorio): `C:\Users\USER\AppData\Local\Temp\claude\C--Users-USER-Desktop-Proyectos-Node-Respaldo-clones-sitios-web-astro-web-agsit\de861ba2-20ce-4b9f-ac9a-36ce4a403b63\scratchpad\audit\`. Nombres: `{idioma}-{ancho}x{alto}-{wheel|touch}[-footer]-{down|up}-{nn}-{parada}.png`, montajes `M-es-1366x768-wheel-down.png`, `M-es-390x844-touch-down.png`, `M-es-844x390-touch-down.png`, movimiento reducido `reduced-full.png` y `reduced-top.png`, y los `.json` con las métricas de cada parada.

## Cobertura

| Prueba | Resultado |
|---|---|
| ES 1366×768, rueda, abajo y arriba | Las 14 paradas se alcanzan en orden, en ambos sentidos. |
| ES 390×844 y 844×390, swipe táctil, abajo y arriba | Igual. El tramo continuo del hero se salta con `scrollTo` hasta 500 px antes de `heroEnd`; desde ahí todo es swipe. |
| EN 1366×768, rueda, abajo | Todo en inglés (solo la dirección postal del contacto está en español, es un dato literal). Sin cortes ni encimados. |
| Regreso desde el footer, ES 1366×768 | Parada por parada hasta el hero, con la figura correcta en cada una (`es-1366x768-wheel-footer-up-*`). |
| Movimiento reducido, ES 1366×768 | Escenas, figuras, cierre y contacto visibles y estáticos, sin canvas ni video. |
| Consola | 0 errores y 0 advertencias en todas las corridas. |

Tabla de figura por parada (idéntica en 1366×768, 390×844 y 844×390, bajando y subiendo): `attractEnd` escena 0, `accompanyEnd` escena 1, `growEnd` escena 2, `boostEnd` solo "IMPULSA.", `planEnd` frase, `revealEnd` línea de puntos, `strategyEnd` diana, `journeyEnd` embudo, `intelligenceEnd` cerebro, `automationEnd` engrane, `channelsEnd` globos, `closingEnd` símbolo AGSIT con frase y botón, `contactEntry` contacto.

El detector automático de encimados solo marcó "Conoce tu negocio / Discovers your business" en `accompanyEnd`. Es un falso positivo: el texto está duplicado a propósito en dos capas (gris y activa).

## Hallazgos

| # | Dónde | Qué está mal | Por qué está mal frente a lo acordado | Gravedad | Evidencia | Causa probable |
|---|---|---|---|---|---|---|
| 1 | Hero, todos los tamaños e idiomas, build de producción | El hero no tiene video. Se recorren unos 4129 px (1366×768) o 4537 px (390×844) de scroll continuo con el mismo título y sin contenido en movimiento. | Se acordó "hero con video" con scroll continuo. Sin el archivo, la sección es un recorrido largo y vacío, y no se pudieron auditar el video, los subtítulos por capítulo ni la barra de segmentos. | Alta | `es-1366x768-wheel-down-00..12-free.png`, `es-1366x768-wheel-down-13-heroEnd.png`, `reduced-top.png` | `src/data/marketing/growthMarketingStory.ts:5` (`pending: true`, `src` en `/_demo-local/`, carpeta excluida del repo) y `src/components/marketing-story/ScrollVideoHero.astro:7` (solo renderiza el video en DEV o si no está pendiente). Falta el asset propio (ver `docs/assets-pendientes-marketing-v2.md`). |
| 2 | Movimiento reducido, 1366×768, ES | "IMPULSA." aparece al final del documento, después del cierre y antes del contacto, en lugar de entre el manifiesto y "CRECER CON PLAN". | El orden acordado es manifiesto, "IMPULSA.", "CRECER CON PLAN", servicios, cierre. En modo estático el orden DOM es manifiesto, plan, servicios, cierre, "IMPULSA.". | Media | `reduced-full.png` (y = 5570 px de 7524) | `src/components/marketing-story/MarketingStoryPage.astro:19-20`: `StorySplitTransition` va después de `StoryPlanPhrase`. En modo animado no se nota porque ambos son absolutos dentro del pin. |
| 3 | Servicios, 844×390 (horizontal), ES | La figura de puntos queda pequeña (unos 70 px de alto) frente a la tarjeta, que ocupa más de la mitad del marco. | Las figuras son el protagonista de los servicios; aquí se leen como un adorno. | Baja | `M-es-844x390-touch-down.png` (`strategyEnd` a `channelsEnd`) | `src/components/marketing-story/marketing-story.services.css` (regla `max-height: 520px` y `landscape`: el grid `minmax(0,1fr) auto` da poco alto al figure). |
| 4 | Manifiesto, 1366×768, ES | El antetítulo "CÓMO HACEMOS CRECER TU NEGOCIO" se parte en dos líneas en la columna izquierda. En EN cabe en una. | Inconsistencia visual entre idiomas; el resto de la columna está alineado a una sola línea de antetítulo. | Baja | `es-1366x768-wheel-down-14-attractEnd.png` frente a `en-1366x768-wheel-down-14-attractEnd.png` | Ancho de la columna de texto en `marketing-story.css` (`.ms-manifesto`). |
| 5 | Código, familia marketing-story | Restos sin uso: `particlesLabel` (tipo y datos ES/EN, nunca se renderiza), `sampledStoryShape` exportada y sin importaciones, reglas `.ms-paper` y `.ms-section-space` sin ningún uso en la familia, y la clase `.ms-manifesto-diagram` sin estilos (solo sirve de gancho). | Se pidió que no queden datos, selectores ni código huérfanos. | Baja | Búsquedas en el árbol (ver "Código") | `src/types/marketingStory.types.ts:14`, `src/data/marketing/growthMarketingStory.ts:19` y `:35`, `src/components/marketing-story/marketing-story.shapes.ts:94`, `src/components/marketing-story/marketing-story.css:26,28,29,125`, `StoryManifesto.astro:18`. |
| 6 | Rendimiento, 390×844 con CPU 4×, primer cuadro de cada tramo | Tres cuadros de 50, 50 y 67 ms (único valor por encima de 33 ms en toda la corrida). | Aislados y sin tareas largas; no rompen el p95, pero indican un coste puntual: el de 67 ms ocurre al entrar al manifiesto (construcción de las escenas) y el de 50 ms al inicio del hero. | Baja | Medición de rendimiento (abajo) | Construcción de escenas en `marketing-story.scenes.ts` (`build()`), primer pintado del hero. |

## Lo que está bien y no se debe tocar

- **Motor único.** El hero avanza continuo y se detiene en `heroEnd` con el título completo. Desde ahí, rueda, teclado y swipe avanzan una parada por gesto, sin estados intermedios, hasta `contactEntry`. A partir del contacto el scroll es libre, y al subir desde el contacto se vuelve al cierre.
- **Menú.** Se oculta al bajar (`nav` = -2 px) y aparece al subir (77 px en escritorio, 74 px en 390, 56 px en 844×390). Ninguna parada tiene texto bajo el menú (`underNav` vacío en todas).
- **Derivación por parada.** Escena, figura y cierre se derivan del progreso. Volver desde el footer con `End` y subir parada por parada da la figura correcta en cada una, en los tres tamaños.
- **Manifiesto.** Las tres escenas tienen el mismo tamaño (440×313, 300×195, 340×191) y no cambian de tamaño al pasar de palabra. Sin cortes ni encimados en ninguna parada.
- **Palabras partidas.** "IMPULSA." y "CRECER CON PLAN" se ven limpias en reposo (commit `25c0616`); no hay que volver a tocar esa corrección.
- **Servicios y cierre.** Marco, tarjetas y figuras sin cortes; el símbolo de AGSIT se lee en los tres tamaños, y el botón es el mismo `data-contact-trigger` del hero.
- **Inglés.** Todos los textos de la familia están en inglés y caben en 1366×768 y 390×844.
- **Movimiento reducido.** Las tres escenas, las cinco figuras de servicios, el cierre, el contacto y el footer quedan estáticos y completos, sin scroll horizontal y sin errores.
- **Sin scroll horizontal** en ninguna parada ni tamaño.

## Medición de rendimiento

Una sola corrida, 390×844, CPU ralentizada 4× (CDP `Emulation.setCPUThrottlingRate`), recorrido completo con swipes táctiles desde el inicio hasta pasar el contacto. Se registraron los intervalos entre `requestAnimationFrame` y las tareas largas (`PerformanceObserver` `longtask`).

| Métrica | Valor |
|---|---|
| Cuadros medidos | 4281 |
| p50 / p95 / p99 | 16.7 / 16.8 / 17.0 ms |
| Máximo | 66.7 ms |
| Tareas largas | 0 |
| p95 por tramo | 16.8–16.9 ms en todos los tramos (hero, manifiesto, servicios, cierre, contacto) |
| Cuadros > 33 ms | 3: 50 ms en y=988 (tramo continuo del hero), 50 ms en y=5245 y 67 ms en y=5330 (ambos en `heroEnd→attractEnd`, entrada al manifiesto) |

## Código

- Sin restos de las versiones descartadas (comparación, integración, audiencias, partículas del manifiesto): ninguna coincidencia con esos términos, ni con `figureLabels` o `manifestoCenters`, en `src/components/marketing-story`, `src/data/marketing` ni `src/types/marketingStory.types.ts`. El manifiesto ya no usa canvas ni partículas.
- Todos los archivos de la familia se importan al menos una vez. Los únicos restos están en el hallazgo 5.
- `DigitalStrategyPage` y `digitalStrategy.ts` siguen en uso por otras páginas del sitio (analytics-cro, content-marketing, advertising, e-commerce y SEO), por lo que no son huérfanos.

## Archivos fuera de la familia en `git diff --stat main...HEAD`

Ninguno es un archivo compartido de menú, contacto, footer, layout ni `global.css`.

| Archivo | Observación |
|---|---|
| `src/pages/marketing-digital/growth-marketing-y-estrategia-digital/index.astro` | Esperado: cambia a `MarketingStoryPage` y `getGrowthMarketingStory`. |
| `src/pages/en/digital-marketing/growth-marketing-and-digital-strategy/index.astro` | Esperado, igual que el anterior. |
| `.gitignore` | Añade `/public/_demo-local/`. Esperado. |
| `docs/assets-pendientes-marketing-v2.md` | Documentación del flujo; relacionado con el hallazgo 1. |
| `docs/service-explorer-blog.md` | Familia del blog. |
| `src/components/blog/service-explorer/ServiceExplorer.astro` | Familia del blog (archivo nuevo en esta rama). |
| `src/components/blog/service-explorer/ServiceExplorerPreview.astro` | Familia del blog (nuevo). |
| `src/components/blog/service-explorer/service-explorer.css` | Familia del blog (nuevo). |
| `src/data/blog/growthServiceExplorer.ts` | Familia del blog (nuevo). |
| `src/types/blogServiceExplorer.types.ts` | Familia del blog (nuevo). |
| `src/pages/vista-previa/servicios-blog/[lang].astro` | Página de vista previa del blog (nueva). |

## Fuera del alcance verificado

- No se probó en dispositivos táctiles reales (el swipe es sintético por CDP).
- No se probó la pausa por pestaña oculta ni con el cajón de contacto abierto durante el recorrido.
- No se auditó el video del hero ni sus capítulos (hallazgo 1). Este recorrido no probó el tramo continuo con video real.
- Regreso desde el footer solo en 1366×768 en español, como se pidió.


## Correcciones de la auditoría final — 6 de noviembre de 2026

El diagnóstico anterior se conserva como evidencia del estado auditado. Esta revisión parte de `860ef9e`, en `codex/marketing-growth-v2` con árbol limpio y origin comprobado mediante fetch.

| # | Estado | Corrección / resultado |
|---|---|---|
| 1 | Corregido | Sin archivo disponible para este entorno, `heroEnd` coincide con el inicio: título final, texto y botones sobre el fondo de respaldo; capítulos, contador y barra ocultos. El siguiente gesto entra al manifiesto. Se conserva el recorrido continuo cuando hay video autorizado por el filtro existente (demo solo DEV, propio con `pending: false`). No se modifica `pending: true`. |
| 2 | Corregido | Orden DOM: manifiesto → IMPULSA. → CRECER CON PLAN → servicios → cierre. Verificado con movimiento reducido a 1366×768. |
| 3 | Corregido | En teléfono horizontal, figura y tarjeta van lado a lado. A 844×390 el área de figura mide 315×280 px y la tarjeta 385×206 px, separadas por 20 px; las cinco figuras quedan completas, sin tapar la tarjeta ni desbordar horizontalmente. |
| 4 | Corregido | Antetítulo sin límite de 32ch y sin salto de línea en escritorio. ES 1366×768: una línea de 16,8 px de alto. El teléfono conserva el ajuste de líneas. |
| 5 | Corregido | Eliminados `particlesLabel` del tipo y ambos idiomas, `sampledStoryShape`, `.ms-paper`, `.ms-section-space` y la clase sin estilos `ms-manifesto-diagram`. Búsqueda posterior en `src`: cero coincidencias de esos identificadores/selectores; se conserva la variable de color `--ms-paper`, que sí se usa. La auditoría no marca otros archivos huérfanos. |
| 6 | Reportado, sin cambio de rendimiento | `createManifestoScenes()` ya ejecuta `build()` durante la inicialización del controlador, antes del primer gesto. No se identificó una causa clara adicional y no se amplió la investigación. Una sola medición de entrada: p95 16,8 ms; máximos 33,4 y 33,3 ms; cero tareas largas. No se afirma haber corregido los picos originales. |

### Verificación ligera de las correcciones

- `pnpm build`: correcto (adapter Node). La ejecución inicial dentro del sandbox falló con `spawn EPERM`; la ejecución autorizada fuera del sandbox terminó correctamente. `git diff --check`: correcto.
- Producción con `pnpm preview --host 127.0.0.1 --port 4399`, Chromium: a 1366×768, `heroEnd=0`, título opaco y controles/capítulos ocultos; una rueda de 120 px llega a `attractEnd=768`. A 390×844, igual estado inicial y un swipe CDP llega a `attractEnd=844`. Sin video renderizado ni scroll horizontal.
- Desarrollo con `pnpm dev --host 127.0.0.1 --port 4398`: demo cargada, `readyState=4`, 1920 px de ancho, modo scrub y tramo continuo conservados (`heroEnd=4129` a 1366×768). Al desplazar 1800 px, el video pasa de 0 a 24,67 s y la barra marca el quinto capítulo.
- Movimiento reducido a 1366×768: manifiesto en y=768, IMPULSA. en y=1807,6, plan en y=2575,6, servicios en y=2799,95 y cierre en y=5470,5; canvas oculto y sin video.
- Capturas ES fuera del repositorio: `C:\Users\USER\.codex\visualizations\2026\11\06\01a1b1dd-81e1-7eb2-8b4e-c0f634afd80d\`. Archivos: `manifesto-es-1366x768.png`, `hero-production-390x844.png`, `manifesto-es-390x844.png` y `services-es-844x390-{strategyEnd,journeyEnd,intelligenceEnd,automationEnd,channelsEnd}.png`.
- Una sola medición de entrada al manifiesto (no recorrido completo): Chromium móvil emulado, 390×844, CPU 4× mediante CDP desde antes de cargar, después de inicializar se registran intervalos rAF durante un swipe y 1800 ms posteriores. 157 intervalos; p95 16,8 ms; dos cuadros >33 ms: 33,3 ms en y=700 y 33,4 ms en y=727; siguiente máximo 16,9 ms; cero tareas largas. Sin repeticiones.
- No se verificaron dispositivos físicos ni Safari. La comprobación del video fue en Chromium de escritorio con la demo local; el video propio sigue pendiente. No se repite la auditoría completa fuera del alcance solicitado.
- Menú, contacto, footer, layout, `global.css` y otras familias sin cambios. `public/_demo-local/` permanece ignorada y fuera de los archivos del commit; las capturas también quedan fuera del repositorio.
