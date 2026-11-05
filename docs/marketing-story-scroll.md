# Motor de scroll y puntos de Marketing Story

## Nuevo mapa de paradas

Este mapa sustituye al recorrido de los commits 2 y 3. La palabra de transición ya no forma parte del hero.

El antetítulo y la cuadrícula tenue de puntos son peticiones explícitas del usuario para esta superficie. Son excepciones locales a las pautas generales de antetítulos y texturas; no crean nuevas reglas ni tokens globales de AGSIT.

| Tramo / gesto | Estado final | Figura |
|---|---|---|
| Scroll continuo del hero | Promesa original completa, con opacidad 1 y sin otra palabra encima | Video original |
| 1 | Manifiesto entra de derecha a izquierda; cuando cubre la pantalla, suben Atraer. / Attract. y su línea | Imán con puntos atraídos continuamente |
| 2 | Se añaden Acompañar. / Support. y su línea | Dos puntos avanzan juntos por un camino |
| 3 | Se añaden Crecer. / Grow. y su línea | Barras que oscilan y flecha ascendente |
| 4 | IMPULSA. / BOOST. completa sobre el manifiesto | La figura queda cubierta y pausada |
| 5 | IMPULSA. / BOOST. abre su cortina hacia los lados mientras las letras de CRECER CON PLAN / GROW WITH A PLAN suben una por una | Puntos todavía ocultos |
| 6 | La mitad superior de la frase sube y la inferior baja; aparece [ASÍ LO HACEMOS] / [HOW WE DO IT] | Una línea horizontal de puntos atraviesa el hueco y entra al marco |
| 7 | El marco se agranda casi a pantalla completa; tarjeta 1 / 5, Estrategia digital | Anillos rellenos, flecha que llega al centro y ondas |
| 8 | Tarjeta 2 / 5, Recorrido del cliente | Embudo con puntos que fluyen hacia la salida |
| 9 | Tarjeta 3 / 5, Inteligencia artificial | Cerebro con destellos que viajan entre puntos |
| 10 | Tarjeta 4 / 5, Automatización | Engrane que gira lentamente |
| 11 | Tarjeta 5 / 5, Canales conectados | Globo de conversación, tres puntos y cuatro grupos en órbita |
| 12 provisional | Un gesto lleva al contacto; después contacto y footer tienen scroll libre | La animación continúa hasta salir de vista |

Al subir se recorre el mapa inverso: las figuras y tarjetas regresan por los cinco servicios, el marco se contrae, los puntos vuelven al hueco, desaparece el texto central, las mitades se reúnen, las letras bajan y la cortina vuelve a cerrarse. Después se deshacen IMPULSA. y el manifiesto hasta la promesa del hero. El destino provisional después del gesto 11 se sustituirá por el cierre en el commit 6.

`STOPS`: heroEnd, attractEnd, accompanyEnd, growEnd, boostEnd, planEnd, revealEnd, strategyEnd, journeyEnd, intelligenceEnd, automationEnd, channelsEnd y contactEntry. Cada transición ocupa un panel físico. contactEntry es el destino provisional después de los servicios; no añade un capítulo creativo.

## Fin exacto del hero y motor único

El límite continuo coincide con el final del tween que completa la promesa: `HERO_END = 5.6 * .96`. Se conservan el video, los ocho capítulos, las búsquedas, la alternativa por capítulos de iOS, la pausa y el reintento. Se elimina el panel continuo que desvanecía la promesa para mostrar otra palabra. La promesa permanece completa hasta que la sección entrante la cubre.

Una sola instancia de Lenis recibe rueda, trackpad, teclado y swipe. La compuerta free/clamp/stop limita la llegada al hero y recorre un destino por gesto; consume la inercia y las teclas mantenidas. Enlaces internos, salto de secuencia, Home y End usan el mismo driver. Menú y drawer compartidos suspenden este driver sin modificar esos componentes.

En el tramo libre, la rueda sigue directamente su delta (`lerp: 0`), como el hero original: no se generan posiciones intermedias adicionales que fuercen búsquedas del video entre movimientos. Los destinos por gesto conservan su duración explícita de 900 ms; clamp usa 400 ms y los saltos 850 ms. El swipe mantiene syncTouch y su frenado de inercia. Es la misma instancia de Lenis, sin introducir otro sistema de scroll.

Un ScrollTrigger fija el stage. Una timeline GSAP pausada recibe su tiempo de la posición real, usando los destinos físicos medidos: el límite entero de heroEnd se mapea exactamente al final de su promesa, sin redondeos que dejen opacidad parcial. El mismo ticker actualiza Lenis, el reproductor y el canvas. No cambia la política global de lag de GSAP.

La entrada horizontal ocupa el primer 68% del gesto 1. El primer mensaje sube después, del 72% al 97%; no existe una parada vacía entre ambos. Los tres puntos de recorrido y su línea avanzan un tercio por palabra. En el gesto 4 se hace opaca primero la superficie y después aparece la palabra completa; la cortina permanece cerrada.

`StorySplitTransition.astro` conserva una palabra semántica y dos medias palabras visuales con aria-hidden. Las máscaras verticales exteriores son inmóviles; sus paneles interiores se trasladan hacia los lados en el gesto 5.

## Canvas reutilizable

- `marketing-story.shapes.ts`: geometrías normalizadas puras scatter, attract, path, growth, planTransit (recorrido por el hueco) y servicesFocus (concentración en el marco). `StoryShape` permite agregar figuras; `sampledStoryShape()` permite usar puntos muestreados de servicios o del símbolo de AGSIT en los commits posteriores.
- `marketing-story.particles.ts`: renderer 2D sin RAF, ticker ni bucle físico propio. `setMorph(from,to,progress)` selecciona una interpolación reversible; `setActive()` pausa escenas cubiertas; `tick(now)` dibuja los ciclos mientras están visibles y la pestaña está activa; pausa por completo fuera de vista o con el drawer abierto. `invalidate()` solicita una actualización de tamaño y `dispose()` libera observadores, cachés y backing store.
- Servicios: máximo 450 puntos en teléfono y 1,200 en escritorio; manifiesto: 240. DPR máximo 1 en teléfono y 1.5 en escritorio; ciclos a aproximadamente 30 / 60 cuadros por segundo. Las siluetas y sus destinos se precalculan una vez en arreglos tipados; el tamaño del viewport solo cambia su transformación afín.
- ResizeObserver e IntersectionObserver actualizan geometría y visibilidad; se respeta document.hidden. La figura final tiene respaldo SVG estático si no hay canvas o JavaScript. No se añade ninguna dependencia.

## Altura y accesibilidad

`100svh` es el fallback; el alto real se mide con visualViewport.height. Giro, barras del navegador, fuentes y tamaño del menú recalculan la geometría. Se conserva la parada semántica asentada o el destino de la transición activa. El texto reserva el alto del menú aun cuando reaparece al subir. El stage recorta únicamente los objetos que están entrando o saliendo.

En escritorio hay dos columnas; en teléfono vertical, mensajes y figura se apilan. Paisaje bajo usa dos columnas compactas. Las tres líneas son datos ES/EN y el canvas tiene descripción accesible por figura.

Con movimiento reducido o ahorro de datos no se crean Lenis ni el pin: las tres palabras y sus líneas quedan visibles y la figura de crecimiento se dibuja fija. No hay recorrido animado. El cambio de preferencia desmonta y reconstruye solo esta familia.

## Frase partida del commit 4

El encadenamiento aprobado sustituye la propuesta anterior: durante el gesto 5 las letras suben escalonadas mientras se abre la cortina, sin una frase ya compuesta detrás. Cada letra tiene una máscara fija y ambas copias reciben el mismo tiempo. En el gesto 6 dos máscaras horizontales fijas recortan exactamente la mitad de la frase; se trasladan las copias hacia arriba y abajo, aparece el texto central y los puntos atraviesan ese espacio hasta el marco. Todo pertenece a la misma timeline reversible, sin controladores ni tickers adicionales.

`StoryPlanPhrase.astro` y `marketing-story.plan.css` contienen esta sección. Hay un solo h2 semántico; las dos copias visuales llevan aria-hidden. Cormorant Garamond y una línea adaptable conservan el corte también en teléfono y paisaje. La frase y el texto central proceden de los datos ES/EN. Con movimiento reducido o ahorro de datos se muestran frase y texto sin recorrido y la concentración final fija. El renderer existente limita puntos y DPR, pausa escenas cubiertas y pestañas ocultas y mantiene los ciclos mientras son visibles.

## Servicios con puntos del commit 5

La frase partida y los servicios comparten fondo tinta, con texto claro y puntos cian. El marco se transforma desde un marco inicial del 36% del alto visible hasta el área casi completa bajo el menú durante el gesto 7; solo se anima su transform. El mismo canvas pasa de la línea horizontal a la diana y después interpola las cinco geometrías de `serviceShapes`. Cada figura se adapta con proporciones uniformes al espacio reservado encima de la tarjeta; no ocupa el área de texto ni controles. La figura del manifiesto conserva su escala de apoyo.

`StoryPointServices.astro` y `marketing-story.services.css` contienen la tarjeta anclada abajo, los iconos SVG, los datos HTML y las flechas. Las flechas usan el mismo driver y los mismos destinos que rueda, teclado y swipe. Los extremos se indican con aria-disabled; el siguiente gesto tras Canales conectados lleva provisionalmente al contacto. Solo la tarjeta actual está disponible para interacción; el anuncio polite se actualiza al asentarse cada destino: «Servicio 1 de 5: Estrategia digital». El canvas es decorativo.

Los textos ES/EN viven en los datos de Marketing Story, sin dependencias de la cuadrícula del blog. En paisaje bajo la tarjeta distribuye nombre y descripción en dos columnas; el alto de la figura se obtiene del espacio restante. Con movimiento reducido o sin JavaScript aparecen los cinco servicios en flujo libre, con figuras SVG estáticas y toda la información visible. Se reutilizan los límites de puntos, DPR y pausa del renderer; no se agrega un bucle ni una biblioteca.

## Rendimiento pendiente para la auditoría final

La última repetición parcial registró p95 alrededor de 50 ms en escritorio (1024×768 y 1366×768 ES), por encima de la referencia de 33.4 ms. La regresión permanece pendiente; no se considera resuelta ni se ha completado otra batería de rendimiento.

Se ajustó la rueda libre de `lerp: .3` a `lerp: 0` para evitar búsquedas adicionales del video entre movimientos. Una prueba controlada mejoró con ese ajuste, pero la repetición parcial posterior todavía mostró esos valores cercanos a 50 ms. Las transiciones por gesto conservan sus duraciones explícitas y el swipe mantiene syncTouch. Revisar el desglose por tramo y resolución en la auditoría final; la comprobación mínima de cierre es únicamente funcional y no mide rendimiento.

El video y póster de demostración permanecen en public/_demo-local/, ignorados y fuera de git. La cuadrícula larga de servicios continúa solo en la familia del blog (service-explorer-blog.md).

## Corrección de figuras rellenas y ciclos continuos

`marketing-story.shapes.ts` muestrea una sola vez siluetas rellenas de iconos reconocibles. `marketing-story.motion.ts` escribe posiciones, tamaño y brillo directamente en arreglos Float32Array, sin crear objetos por punto durante los cuadros. La diana combina anillos anchos y flecha que llega, permanece, desaparece y repite; el embudo fluye de arriba abajo; el cerebro recibe destellos itinerantes; el engrane gira; el globo muestra tres puntos en secuencia y cuatro grupos en órbita. El manifiesto tiene imán, pareja que recorre el camino y barras con flecha.

Al cambiar de figura, las dos animaciones siguen vivas mientras una dispersión breve desprende los puntos y los reúne en el destino. La interpolación ocupa 82% de un gesto de 900 ms (738 ms), en ambos sentidos. El renderer comparte el ticker existente y llena un solo path por cada uno de cuatro colores de brillo, sin sombras, filtros ni cambios de fillStyle por punto. El marco tiene una cuadrícula tenue de fondo. Se respetan las pausas por visibilidad, pestaña oculta y drawer; el reloj no avanza durante esas pausas. Movimiento reducido conserva las siluetas completas estáticas.

La verificación de esta corrección se limita a una pasada ES 390×844 y 1366×768, y una medición por tamaño: cinco segundos de engrane animado y un cambio a globo de conversación, con CPU 4x solo en teléfono. No sustituye la auditoría pendiente del hero ni supone una investigación de la regresión anterior.
### Resultado de la única medición de esta corrección

| Viewport | CPU | Puntos de servicios | p95 rAF: ciclo de 5 s | p95 rAF: cambio | Tareas largas: ciclo / cambio |
|---|---|---|---|---|---|
| 390×844 | 4× | 450 | 16.7 ms | 16.8 ms | 0 / 0 |
| 1366×768 | 1× | 1,200 | 50.0 ms | 50.0 ms | 0 / 0 |

Una sesión por viewport, en páginas nuevas del servidor local de desarrollo, sin lecturas de píxeles previas en el canvas medido. El ciclo observado fue el engrane y el cambio fue de engrane a conversación. Se mide el intervalo entre callbacks de requestAnimationFrame; el renderer de teléfono limita por separado el dibujo a unos 30 cuadros/s. El teléfono no superó 33 ms y no se redujo la cantidad de puntos. Escritorio conserva el resultado de 50 ms pendiente de auditoría: no se repitió la medición ni se investigó su causa.

La única pasada funcional ES 390×844 y 1366×768 completó los ocho estados de figura en ambos sentidos, con 32 capturas finales, sin errores de consola ni desbordamiento horizontal. Se comprobó cambio continuo de píxeles en cada figura y separación entre figura y tarjeta. No se repitieron las pruebas de otros tamaños, inglés, teclado, swipe, drawer ni movimiento reducido.
