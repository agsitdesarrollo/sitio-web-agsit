# Imágenes de Gestión Ágil de Proyectos

Estado: **pending**. Cada uno de los tres servicios tiene un espacio reservado
en español e inglés. Las imágenes de contenido son independientes de las piezas sociales.

## Especificación común

- Archivo y marco: proporción fija **16:7** en todas las vistas.
- Tamaño recomendado: **1600 × 700 px**; alternativa: 2400 × 1050 px.
- Formato recomendado: WebP o AVIF optimizado, con peso objetivo inferior a 200 KB.
- El marco cabe en el espacio disponible sin deformarse; el texto y la navegación
  conservan su lugar. Se mantiene con movimiento reducido.
- Usar el asunto principal centrado, sin texto incrustado, cifras, clientes,
  herramientas o resultados que no estén aprobados. Un archivo puede servir a ambos idiomas.

| ID del panel | Qué debe mostrar | Archivo bajo `public/assets/project-management/` |
| --- | --- | --- |
| `scrum` | Un equipo revisando una entrega parcial con las personas que la necesitan y acordando qué atender en el siguiente ciclo. | `scrum.webp` |
| `kanban` | Un equipo observando tareas pendientes, en curso y terminadas para detectar acumulación, bloqueos y capacidad disponible. Evitar información o métricas ficticias legibles. | `kanban.webp` |
| `agile-frameworks` | Equipo y consultor seleccionando prácticas de colaboración y revisión adecuadas al proyecto y a su capacidad. | `agile-frameworks.webp` |

## Cómo reemplazarlas

1. Guardar las imágenes aprobadas en la carpeta indicada; no usar `public/_demo-local/`.
2. En `src/data/projectManagementDetail.ts`, localizar `agile-delivery`, el idioma
   y el capítulo por su ID.
3. Añadir `imageSrc: '/assets/project-management/<archivo>.webp'` y cambiar
   `imageStatus: 'pending'` a `imageStatus: 'ready'` en ES y EN.
4. Adaptar `imageAlt` a la imagen real en cada idioma, retirando «Espacio reservado»
   / «Reserved space». El componente sustituye la etiqueta `pending` por el archivo.
5. Verificar el marco 16:7, texto y controles en teléfono vertical/horizontal,
   tablet y escritorio, además de `pnpm build` y `git diff --check`.

No se requieren imágenes en portada, reto, método ni resultados.

## Imágenes sociales

Las piezas `gestion-agil-de-proyectos-es.jpg` y `agile-project-delivery-en.jpg`
son JPEG de **1200 × 630 px**, entre **60 000 y 100 000 bytes**. Se generan con
`docs/generate-project-management-social-images.cjs`, pasando esos nombres sin
extensión. El procedimiento y la revisión a **400 × 210 px** están documentados
en `docs/project-management-social-images.md`.

Frases: «Entregas pequeñas. Ajustes a tiempo.» / «Small deliveries. Timely adjustments.».
Las tarjetas muestran reto, Scrum, Kanban, Agile Frameworks, método y resultados,
con las etiquetas de navegación traducidas y el primer elemento activo.
