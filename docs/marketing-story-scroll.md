# Motor de scroll y puntos de Marketing Story

## Nuevo mapa de paradas

Este mapa sustituye al recorrido de los commits 2 y 3. La palabra de transición ya no forma parte del hero.

El antetítulo y la cuadrícula tenue de puntos son peticiones explícitas del usuario para esta superficie. Son excepciones locales a las pautas generales de antetítulos y texturas; no crean nuevas reglas ni tokens globales de AGSIT.

| Tramo / gesto | Estado final | Figura |
|---|---|---|
| Scroll continuo del hero | Promesa original completa, con opacidad 1 y sin otra palabra encima | Video original |
| 1 | Manifiesto entra de derecha a izquierda; cuando cubre la pantalla, suben Atraer. / Attract. y su línea | Puntos dispersos convergen al centro |
| 2 | Se añaden Acompañar. / Support. y su línea | Camino |
| 3 | Se añaden Crecer. / Grow. y su línea | Gráfica ascendente |
| 4 | IMPULSA. / BOOST. completa sobre el manifiesto | La figura queda cubierta y pausada |
| 5 | IMPULSA. / BOOST. abre su cortina hacia los lados mientras las letras de CRECER CON PLAN / GROW WITH A PLAN suben una por una | Puntos todavía ocultos |
| 6 | La mitad superior de la frase sube y la inferior baja; aparece [ASÍ LO HACEMOS] / [HOW WE DO IT] | Los puntos cruzan el hueco y se concentran en el futuro marco de servicios |
| 7 provisional | Un gesto lleva al contacto; después contacto y footer tienen scroll libre | Figura asentada, sin redibujado |

Al subir se recorre el mapa inverso: los puntos vuelven al hueco, desaparece el texto central, las mitades se reúnen, las letras bajan y la cortina vuelve a cerrarse. Después se deshacen IMPULSA. y el manifiesto hasta la promesa del hero. El destino provisional después del gesto 6 se sustituirá por los servicios en el commit 5.

`STOPS`: heroEnd, attractEnd, accompanyEnd, growEnd, boostEnd, planEnd, revealEnd y contactEntry. Cada transición ocupa un panel físico. contactEntry es el destino provisional después de la frase partida; no añade un capítulo creativo.

## Fin exacto del hero y motor único

El límite continuo coincide con el final del tween que completa la promesa: `HERO_END = 5.6 * .96`. Se conservan el video, los ocho capítulos, las búsquedas, la alternativa por capítulos de iOS, la pausa y el reintento. Se elimina el panel continuo que desvanecía la promesa para mostrar otra palabra. La promesa permanece completa hasta que la sección entrante la cubre.

Una sola instancia de Lenis recibe rueda, trackpad, teclado y swipe. La compuerta free/clamp/stop limita la llegada al hero y recorre un destino por gesto; consume la inercia y las teclas mantenidas. Enlaces internos, salto de secuencia, Home y End usan el mismo driver. Menú y drawer compartidos suspenden este driver sin modificar esos componentes.

En el tramo libre, la rueda sigue directamente su delta (`lerp: 0`), como el hero original: no se generan posiciones intermedias adicionales que fuercen búsquedas del video entre movimientos. Los destinos por gesto conservan su duración explícita de 900 ms; clamp usa 400 ms y los saltos 850 ms. El swipe mantiene syncTouch y su frenado de inercia. Es la misma instancia de Lenis, sin introducir otro sistema de scroll.

Un ScrollTrigger fija el stage. Una timeline GSAP pausada recibe su tiempo de la posición real, usando los destinos físicos medidos: el límite entero de heroEnd se mapea exactamente al final de su promesa, sin redondeos que dejen opacidad parcial. El mismo ticker actualiza Lenis, el reproductor y el canvas. No cambia la política global de lag de GSAP.

La entrada horizontal ocupa el primer 68% del gesto 1. El primer mensaje sube después, del 72% al 97%; no existe una parada vacía entre ambos. Los tres puntos de recorrido y su línea avanzan un tercio por palabra. En el gesto 4 se hace opaca primero la superficie y después aparece la palabra completa; la cortina permanece cerrada.

`StorySplitTransition.astro` conserva una palabra semántica y dos medias palabras visuales con aria-hidden. Las máscaras verticales exteriores son inmóviles; sus paneles interiores se trasladan hacia los lados en el gesto 5.

## Canvas reutilizable

- `marketing-story.shapes.ts`: geometrías normalizadas puras scatter, attract, path, growth, planTransit (recorrido por el hueco) y servicesFocus (concentración en el marco). `StoryShape` permite agregar figuras; `sampledStoryShape()` permite usar puntos muestreados de servicios o del símbolo de AGSIT en los commits posteriores.
- `marketing-story.particles.ts`: renderer 2D sin RAF, ticker ni bucle físico propio. `setMorph(from,to,progress)` selecciona una interpolación reversible; `setActive()` pausa escenas cubiertas; `tick(now)` solo dibuja si hay cambios pendientes, está visible y la pestaña está activa. `invalidate()` solicita una actualización de tamaño y `dispose()` libera observadores, cachés y backing store.
- 160 puntos en teléfono, paisaje bajo o tablet estrecha; 360 en escritorio. DPR máximo 1.25 / 1.5 respectivamente y como máximo 30 / 60 dibujos por segundo durante cambios. Las figuras se cachean; no se generan puntos ni se redibuja cuando están asentadas.
- ResizeObserver e IntersectionObserver actualizan geometría y visibilidad; se respeta document.hidden. La figura final tiene respaldo SVG estático si no hay canvas o JavaScript. No se añade ninguna dependencia.

## Altura y accesibilidad

`100svh` es el fallback; el alto real se mide con visualViewport.height. Giro, barras del navegador, fuentes y tamaño del menú recalculan la geometría. Se conserva la parada semántica asentada o el destino de la transición activa. El texto reserva el alto del menú aun cuando reaparece al subir. El stage recorta únicamente los objetos que están entrando o saliendo.

En escritorio hay dos columnas; en teléfono vertical, mensajes y figura se apilan. Paisaje bajo usa dos columnas compactas. Las tres líneas son datos ES/EN y el canvas tiene descripción accesible por figura.

Con movimiento reducido o ahorro de datos no se crean Lenis ni el pin: las tres palabras y sus líneas quedan visibles y la figura de crecimiento se dibuja fija. No hay recorrido animado. El cambio de preferencia desmonta y reconstruye solo esta familia.

## Frase partida del commit 4

El encadenamiento aprobado sustituye la propuesta anterior: durante el gesto 5 las letras suben escalonadas mientras se abre la cortina, sin una frase ya compuesta detrás. Cada letra tiene una máscara fija y ambas copias reciben el mismo tiempo. En el gesto 6 dos máscaras horizontales fijas recortan exactamente la mitad de la frase; se trasladan las copias hacia arriba y abajo, aparece el texto central y los puntos atraviesan ese espacio hasta el marco. Todo pertenece a la misma timeline reversible, sin controladores ni tickers adicionales.

`StoryPlanPhrase.astro` y `marketing-story.plan.css` contienen esta sección. Hay un solo h2 semántico; las dos copias visuales llevan aria-hidden. Cormorant Garamond y una línea adaptable conservan el corte también en teléfono y paisaje. La frase y el texto central proceden de los datos ES/EN. Con movimiento reducido o ahorro de datos se muestran frase y texto sin recorrido y la concentración final fija. El renderer existente limita puntos y DPR, pausa escenas cubiertas y pestañas ocultas y deja de dibujar al asentarse.

## Rendimiento pendiente para la auditoría final

La última repetición parcial registró p95 alrededor de 50 ms en escritorio (1024×768 y 1366×768 ES), por encima de la referencia de 33.4 ms. La regresión permanece pendiente; no se considera resuelta ni se ha completado otra batería de rendimiento.

Se ajustó la rueda libre de `lerp: .3` a `lerp: 0` para evitar búsquedas adicionales del video entre movimientos. Una prueba controlada mejoró con ese ajuste, pero la repetición parcial posterior todavía mostró esos valores cercanos a 50 ms. Las transiciones por gesto conservan sus duraciones explícitas y el swipe mantiene syncTouch. Revisar el desglose por tramo y resolución en la auditoría final; la comprobación mínima de cierre es únicamente funcional y no mide rendimiento.

El video y póster de demostración permanecen en public/_demo-local/, ignorados y fuera de git. La cuadrícula larga de servicios continúa solo en la familia del blog (service-explorer-blog.md).
