# Assets pendientes de Marketing

La nueva familia `src/components/marketing-service/` se usa únicamente en las dos rutas de Growth Marketing. Los assets de esta página se declaran en `src/data/marketing/growthMarketing.ts`; ningún componente conoce los nombres de los archivos de Growth.

## Pendientes

| Sección | Asset / qué debe mostrar | Proporción | Escritorio recomendado | Móvil recomendado | Formato | Dónde cambiarlo |
|---|---|---|---|---|---|---|
| Solución | Nube izquierda, sin textos ni marcas, con transparencia y bordes suaves | 4:3 | 1600×1200 px | 800×600 px | WebP con alfa | `clouds[0]` |
| Solución | Nube derecha, complementaria a la izquierda | 4:3 | 1600×1200 px | 800×600 px | WebP con alfa | `clouds[1]` |
| Para quién es | Persona al frente de un negocio pequeño; ilustración profesional, sin caritas 3D | 4:3 | 800×600 px | 400×300 px | WebP | `profileMedia[0]` |
| Para quién es | Empresa que ya vende y busca ampliar su alcance | 4:3 | 800×600 px | 400×300 px | WebP | `profileMedia[1]` |
| Para quién es | Equipo de marketing organizando un plan compartido | 4:3 | 800×600 px | 400×300 px | WebP | `profileMedia[2]` |

Las medidas son recomendaciones de exportación, no alturas fijas de pantalla. Los espacios se adaptan al alto visible. Si preparas versiones adicionales para móvil, conserva el contenido importante dentro de una zona central segura.

## Cómo agregar cada imagen

1. Exporta el WebP y cópialo a `public/assets/marketing/growth/`. Para nubes conserva la transparencia. No agregues texto dentro de las ilustraciones.
2. Abre `src/data/marketing/growthMarketing.ts`. En el registro correspondiente cambia `src` por la ruta pública, por ejemplo `/assets/marketing/growth/perfil-negocio.webp`.
3. Escribe en `alt.es` y `alt.en` una descripción breve de la imagen. Las nubes son decorativas: el componente las excluye de la lectura asistida.
4. Indica sus dimensiones reales en `width` y `height`, y su proporción en `ratio` (por ejemplo `'4 / 3'`). Cambia `pending` a `false`.
5. Comprueba ambas rutas en teléfono vertical, horizontal y escritorio. La animación está conectada al contenedor: no hay que modificar componentes ni controlador.

Con `pending: true`, las ilustraciones muestran un marco intencional y una etiqueta localizada. Las nubes muestran formas suaves azules y cian. Ambos estados ocupan el mismo contenedor que utilizará la imagen final y comparten su animación.

## Candidata de nubes: registrada, no descargada

- Autor: **Rohit Dey**.
- Imagen: **A single fluffy white cloud against a dark sky**.
- Fuente: <https://unsplash.com/photos/a-single-fluffy-white-cloud-against-a-dark-sky-2pAgQtHrcDY>.
- Licencia: **Unsplash License**, <https://unsplash.com/license>.
- La ficha consultada indica uso bajo esta licencia. Permite uso comercial y modificación; la atribución se aprecia aunque no es obligatoria. No permite vender copias sin modificación significativa ni recopilar imágenes para replicar un servicio competidor.
- Estado: **solo candidata**. No se ha descargado, copiado ni incorporado al sitio. Tiene fondo oscuro, no transparencia. Antes de usarla habría que preparar y revisar los recortes sobre el azul marino de AGSIT.
- La implementación aprobada usa formas suaves propias, sin archivos fotográficos de nubes ni recursos de la referencia.

## Imágenes existentes de servicios

Se reutilizan sin modificación los cinco WebP de `public/assets/estrategia-digital/`: `etapa-descubrimiento`, `etapa-consideracion`, `etapa-seleccion`, `etapa-ascension` y `etapa-lealtad`. Sus dimensiones reales son 1200×900 px. Se declaran en `serviceMedia`, con textos alternativos en ambos idiomas y `pending: false`.

## Contraste con la presentación corporativa

Fuente local facilitada por el usuario: `00 - AGSIT Presentación Corporativa Comercial - Complete.txt`, apartado **F) Mercadotecnia Digital**. No se publica una copia de ese documento.

- **Estrategia digital:** se explicita el análisis del negocio y mercado, el plan de acción y la medición. Corresponde a Estrategia de Mercadotecnia Digital y su definición de actividades, métricas y ajustes.
- **Recorrido del cliente:** conserva descubrimiento, interés, compra y regreso, conforme a las etapas del ciclo de vida y su análisis.
- **Inteligencia artificial:** se sustituye la referencia genérica a detectar oportunidades por el apoyo a crear contenido, expresamente incluido en «Estrategias de contenido generativo con IA». Se mantienen los mensajes adaptados a intereses, conforme a personalización y segmentación avanzada.
- **Automatización:** conserva mensajes y seguimientos, conforme a automatización de marketing y correo electrónico. No promete herramientas ni integraciones específicas nuevas.
- **Canales conectados:** conserva la continuidad de la conversación, conforme a marketing omnicanal.

Los nombres de los cinco servicios se conservan como están en la página actual. No se incorporan cifras de experiencia, garantías de rentabilidad ni resultados prometidos en el documento corporativo. El título de perfiles aprobado es «TU NEGOCIO, TU SIGUIENTE PASO».
