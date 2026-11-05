# Motor de scroll de Marketing Story

El commit 2 conserva el hero y deja preparada la llegada al manifiesto existente. La composición y las cuatro paradas del manifiesto se construyen en el commit 3; los servicios de puntos y el cierre pertenecen a commits posteriores.

## Una sola fuente de posición

`src/components/marketing-story/marketing-story.controller.ts` crea una instancia de Lenis y un ScrollTrigger con una timeline reversible. El único ticker de esta familia actualiza Lenis y la búsqueda de fotogramas. No cambia la política global de lag de GSAP: entrega `performance.now()` a Lenis.

La compuerta decide `free`, `clamp` o `stop` antes de que Lenis consuma cada delta. Rueda, inercia de trackpad, teclado y swipe llegan a las mismas posiciones. Una ráfaga se consume hasta su liberación; abrir el contacto o el menú suspende el recorrido sin modificar esos componentes compartidos.

## Tramos actuales

- Primeros 5.6 paneles: video, ocho capítulos y promesa originales.
- Siguiente panel continuo: la promesa da paso a `AVANZA.` / `FORWARD.`. El límite frena con la palabra completa.
- Siguiente gesto: una transición de 900 ms recorre un panel físico y abre las mitades superior e inferior. El gesto inverso la cierra.
- Desde la apertura completa: lectura libre del manifiesto existente, contacto y footer. Al subir, la compuerta frena en la apertura antes de cerrarla con un nuevo gesto.

La posición real del documento determina la imagen en cualquier punto, incluso al arrastrar la barra o invertir el recorrido. Las mitades usan máscaras fijas; solo se animan transformaciones y opacidad. La máscara vacía se oculta al completar la apertura para evitar residuos de composición al liberar el pin.

## Geometría y acceso

La altura parte de `100svh` y se mide localmente con `visualViewport.height`. Se recalcula al cambiar el viewport, girar, cargar las fuentes o cambiar el tamaño del menú. Se preserva el progreso lógico y se retoma el destino si había una transición. La altura de lectura se obtiene del manifiesto natural, sin depender del alto inline fijado por ScrollTrigger.

El texto reserva espacio para el menú compartido aunque reaparezca al subir. Formularios, selección, activación de botones y pinch zoom conservan su comportamiento. Home, End, enlaces internos y el botón de saltar usan el mismo driver.

Con movimiento reducido o ahorro de datos, no se crea Lenis ni el pin: se muestra el documento completo en flujo normal, incluida la palabra y los capítulos. El cambio de preferencia desmonta y reconstruye únicamente esta familia.

`marketing-story.video.ts` contiene el reproductor, sin sistema de scroll propio: búsqueda con una sola operación pendiente, reproducción por capítulos en iOS, pausa fuera de vista o al ocultar la pestaña, y reintento después de errores o bloqueo de reproducción. Cuantiza el destino a los 24 fotogramas por segundo del archivo actual y deja un intervalo de presentación después de cada decodificación; siempre busca el destino más reciente, sin acumular peticiones. No contiene un RAF ni un ticker adicional.

El medio de demostración y su póster continúan en `public/_demo-local/`, ignorados por git. La cuadrícula larga de los cinco servicios vive únicamente en la familia de blog documentada en `service-explorer-blog.md`.
