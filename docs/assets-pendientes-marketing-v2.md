# Video pendiente: Growth Marketing v2

## Estado y sustitución

Los datos están en `src/data/marketing/growthMarketingStory.ts`, propiedad `hero.media`.
El archivo temporal es `public/_demo-local/hero-1080.mp4`, descargado de
https://media.predictivemobility.ai/hero-1080.mp4 únicamente para mostrar el comportamiento.
El póster temporal es `public/_demo-local/hero-poster.webp`: el primer cuadro del
mismo video, extraído con el comando siguiente (WebP sin pérdida):

```sh
ffmpeg -i public/_demo-local/hero-1080.mp4 -frames:v 1 -c:v libwebp -lossless 1 public/_demo-local/hero-poster.webp
```

La carpeta completa está ignorada por Git, incluidos video y póster. No agregar con `git add -f`.
En desarrollo el póster solo se muestra si existen ambos archivos. Si falta la demo,
o en producción mientras `pending` siga en `true`, se usa el fondo de colores AGSIT;
el hero nunca utiliza la captura de la página anterior. El póster y el video tienen
el mismo encuadre y opacidad para evitar un salto visual al cargar el primer cuadro.
`pending: true` permite usar el demo solo en desarrollo: el HTML de producción
no solicita el video prestado. Sin archivo, sin JavaScript, con ahorro de datos o
con movimiento reducido, la página conserva contenido legible y un fondo AGSIT.
En modo estático se muestran la promesa y los ocho capítulos completos; no se descarga el video.

Cuando esté listo el video propio:

1. Guardarlo en `public/assets/marketing/growth/hero.mp4`.
2. Cambiar `media.src` a `/assets/marketing/growth/hero.mp4` y `pending` a `false`.
3. Ajustar `media.duration` a la duración real y mantener ocho tramos de igual duración.
4. Extraer el **primer cuadro del video propio** como `public/assets/marketing/growth/hero-poster.webp`,
   con el mismo comando cambiando las rutas. Actualizar `hero.poster.src`, `width` y `height`
   en los datos de ambos idiomas. El póster definitivo debe coincidir con el primer cuadro,
   su resolución y encuadre; no usar una captura de la página ni otra imagen de servicios.
   El punto focal debe sobrevivir al recorte vertical y dejar espacio para texto abajo a la izquierda.
5. Añadir los clips iOS a `media.clips` en orden, si se entregan (ver abajo).
6. Repetir la revisión visual en ambos idiomas y en Safari iOS real.

Para una compilación/deploy manual desde esta máquina, retirar antes el video y el póster demo del
directorio `public`: Astro copia los archivos públicos al build aunque no estén en Git.
La compilación de CI parte de un checkout sin ese archivo. Nunca publicar el demo.

## Guion y composición

Crear una historia de aproximadamente 48 segundos, ocho capítulos de unos seis segundos.
El demo dura aproximadamente 48.33 s. Un mismo negocio pasa de publicar sin rumbo
a entender a su cliente, aclarar su oferta, dar seguimiento y revisar lo que funciona.
No incluir textos incrustados, cifras de rendimiento, marcas de terceros ni audio.
Los textos ES/EN se superponen desde HTML. El último tramo permite oscurecer la
escena y mostrar la promesa y los botones.

1. Tu negocio se anuncia.
2. Pero no sabe a quién llega.
3. El interés se pierde por el camino.
4. Primero, entendemos a tu cliente.
5. Le damos una razón para elegirte.
6. Cada contacto tiene un siguiente paso.
7. Aprendemos de lo que funciona.
8. Tu negocio avanza con un plan.

Máster 1920×1080, 16:9, 24 o 30 fps constantes. Mantener la acción central dentro
del recorte vertical y el área inferior izquierda limpia. Paleta marino, tinta,
azul y cian AGSIT. Entregar también un poster WebP de 1920×1080 y uno vertical si
el encuadre lo requiere. Una versión 1280×720 puede reducir la transferencia móvil.

## Codificación para scroll

MP4, H.264, píxeles `yuv420p`, sin audio, `faststart`, GOP corto (fotograma clave
cada 6 fotogramas a 24 fps), sin B-frames. El GOP corto permite buscar fotogramas
sin decodificar un tramo largo; aumenta el tamaño frente a un video de reproducción normal.
Empezar con CRF 20 y ajustar con pruebas reales; no prometer un peso fijo.

```sh
ffmpeg -i master.mov -an -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=24" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -movflags +faststart hero.mp4
```

Comprobar respuestas HTTP con soporte de rangos (`Accept-Ranges: bytes`) y el tipo
`video/mp4`. El controlador espera a que termine cada búsqueda antes de solicitar
otra y deja de actualizar cuando el hero sale de vista o la pestaña se oculta.

## iPhone y iPad

Se detectan iPhone/iPad/iPod y el iPad que declara plataforma Mac con entrada táctil.
El scroll elige el capítulo; **no** recorre fotograma a fotograma el video. Al entrar
en un capítulo se busca una sola vez su inicio y se reproduce de forma normal,
silenciada e inline, hasta el límite del tramo. Un cambio de capítulo descarta la
solicitud anterior. Al salir del hero o cambiar de pestaña se pausa. Si Safari
bloquea la reproducción aparece «Reproducir este capítulo» para iniciar por gesto.

Por ahora se usa el mismo demo dividido lógicamente en ocho partes iguales.
Para producción conviene entregar **un clip independiente por capítulo**: reduce
la búsqueda inicial en Safari, permite precargar menos datos y evita depender
de la posición del GOP del video largo. Usar igual resolución y encuadre, unos
seis segundos por clip, H.264/yuv420p, sin audio, 24 fps, `faststart`. Un GOP de
24 fotogramas es suficiente para reproducción normal; el primer fotograma debe ser clave.
No incluir fundidos a negro entre clips. Nombrarlos `chapter-01.mp4` a `chapter-08.mp4`.

```ts
clips: Array.from({ length: 8 }, (_, i) =>
  `/assets/marketing/growth/chapter-${String(i + 1).padStart(2, '0')}.mp4`),
```

Si `clips` está vacío se conserva la reproducción por tramos del archivo largo.
`prefers-reduced-motion` y `navigator.connection.saveData`, cuando el navegador
lo expone, tienen prioridad sobre ambos modos. Safari no siempre expone Save-Data;
no se infiere una preferencia que el navegador no comunica.

## Prueba desde un teléfono

Con computadora y teléfono en la misma red local, ejecutar `pnpm dev --host 0.0.0.0 --port 4321`.
Abrir la IP LAN de la computadora, seguida de `:4321/marketing-digital/growth-marketing-y-estrategia-digital/`.
En inglés: `:4321/en/digital-marketing/growth-marketing-and-digital-strategy/`.
`localhost` en el teléfono apunta al teléfono, no a la computadora. Si no conecta,
revisar la red de invitados y la autorización de Node en el firewall privado.
No hace falta abrir puertos del router. Los túneles HTTPS que ya use el equipo
también sirven si reenvían al 4321.
