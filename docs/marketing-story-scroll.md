# Motor de scroll de Marketing Story

El commit 3 conserva el hero y construye las cuatro paradas del manifiesto. La frase partida, los servicios de puntos y el cierre pertenecen a commits posteriores.

## Una sola fuente de posición

`src/components/marketing-story/marketing-story.controller.ts` crea una instancia de Lenis y un ScrollTrigger con una timeline reversible. El único ticker de esta familia actualiza Lenis y la búsqueda de fotogramas. No cambia la política global de lag de GSAP: entrega `performance.now()` a Lenis.

La compuerta decide `free`, `clamp` o `stop` antes de que Lenis consuma cada delta. Rueda, inercia de trackpad, teclado y swipe llegan a las mismas posiciones. Una ráfaga se consume hasta su liberación; abrir el contacto o el menú suspende el recorrido sin modificar esos componentes compartidos.

## Tramos actuales

- Primeros 5.6 paneles: video, ocho capítulos y promesa originales.
- Siguiente panel continuo: la promesa da paso a `AVANZA.` / `FORWARD.`. El límite frena con la palabra completa.
- Siguiente gesto / parada 1: en 900 ms se abre un corte vertical; la mitad izquierda sale a la izquierda y la derecha a la derecha. A la vez, el manifiesto entra desde `xPercent: 100` hasta `0`. Solo se ve su fondo y la línea de cuatro puntos. Antes del gesto está completamente fuera del encuadre.
- Parada 2: aparece Atraer. / Attract. y avanza un tercio de la línea.
- Parada 3: aparece Acompañar. / Support. y avanza el segundo tercio.
- Parada 4: aparece Crecer. / Grow., se completa la línea y entran el texto breve y los rótulos del diagrama.
- Después de la parada 4: contacto y footer en scroll libre. Al subir, la compuerta frena en la última parada y cada nuevo gesto deshace una parada. Al abandonar la primera, el manifiesto sale hacia la derecha y la palabra vuelve a cerrarse.

Cada parada corresponde a un panel físico entero. `STOPS` reúne sus destinos semánticos: heroEnd, openingEnd (llegada), attractEnd, accompanyEnd y growEnd. La misma compuerta busca el siguiente destino en el sentido del gesto. Un teclado mantenido no dispara nuevas paradas hasta una pulsación nueva.

La posición real del documento determina la imagen en cualquier punto, incluso al arrastrar la barra o invertir el recorrido. Las máscaras verticales están en dos contenedores inmóviles de pantalla completa. Dentro, dos paneles de medio ancho conservan cada mitad de la palabra y se trasladan lateralmente; solo se animan transformaciones y opacidad. Los contenedores vacíos se ocultan al completar la apertura para evitar residuos de composición.

## Geometría y acceso

La altura parte de `100svh` y se mide localmente con `visualViewport.height`. Se recalcula al cambiar el viewport, girar, cargar las fuentes o cambiar el tamaño del menú. Se preserva el progreso lógico y se retoma el destino si había una transición. El stage y el manifiesto miden exactamente ese alto; el track suma los paneles del recorrido. El contenedor recorta localmente los elementos que están entrando o saliendo para evitar scroll horizontal.

El texto reserva espacio para el menú compartido aunque reaparezca al subir. Formularios, selección, activación de botones y pinch zoom conservan su comportamiento. Home, End, enlaces internos y el botón de saltar usan el mismo driver.

Con movimiento reducido o ahorro de datos, no se crea Lenis ni el pin: se muestra el documento completo en flujo normal, incluida la palabra y los capítulos. El cambio de preferencia desmonta y reconstruye únicamente esta familia.

`marketing-story.video.ts` contiene el reproductor, sin sistema de scroll propio: búsqueda con una sola operación pendiente, reproducción por capítulos en iOS, pausa fuera de vista o al ocultar la pestaña, y reintento después de errores o bloqueo de reproducción. Cuantiza el destino a los 24 fotogramas por segundo del archivo actual y deja un intervalo de presentación después de cada decodificación; siempre busca el destino más reciente, sin acumular peticiones. No contiene un RAF ni un ticker adicional.

El medio de demostración y su póster continúan en `public/_demo-local/`, ignorados por git. La cuadrícula larga de los cinco servicios vive únicamente en la familia de blog documentada en `service-explorer-blog.md`.
