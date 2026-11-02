# Imágenes de Auditoría y Recuperación de Proyectos

Estado: **pending**. Los tres servicios tienen un espacio reservado en español
e inglés. Las imágenes de contenido son independientes de las piezas sociales.

## Especificación común

- Archivo y marco: proporción fija **16:7**.
- Tamaño recomendado: **1600 × 700 px**; alternativa: 2400 × 1050 px.
- Formato recomendado: WebP o AVIF optimizado; peso objetivo inferior a 200 KB.
- El marco se ajusta al espacio disponible sin deformarse, incluso con movimiento
  reducido. El texto y los controles deben permanecer visibles.
- Usar composición centrada y sin texto incrustado para compartir cada archivo
  entre idiomas. No mostrar cifras, clientes, datos sensibles ni resultados ficticios.

| ID del panel | Qué debe mostrar | Archivo bajo `public/assets/project-management/` |
| --- | --- | --- |
| `project-audits` | Responsables contrastando planes, entregas y evidencia de avance para evaluar la situación de un proyecto. Los documentos no deben contener datos reales legibles. | `project-audits.webp` |
| `rescue-projects` | Equipo y dirección replanteando compromisos y acciones prioritarias para atender un proyecto en dificultades. No representar un resultado de recuperación ya conseguido. | `rescue-projects.webp` |
| `change-management` | Equipo revisando nuevas responsabilidades y cómo adoptar ajustes en su forma de trabajar. | `change-management.webp` |

## Cómo reemplazarlas

1. Guardar los archivos aprobados en la carpeta indicada, fuera de `public/_demo-local/`.
2. En `src/data/projectManagementDetail.ts`, localizar `audit-recovery`, el idioma
   y el capítulo por su ID.
3. Añadir `imageSrc: '/assets/project-management/<archivo>.webp'` y cambiar
   `imageStatus: 'pending'` a `imageStatus: 'ready'` en ES y EN.
4. Ajustar `imageAlt` a la imagen real, en cada idioma, sin «Espacio reservado» /
   «Reserved space». El componente sustituirá la etiqueta `pending` por el archivo.
5. Revisar 16:7, legibilidad, controles y movimiento reducido en teléfono vertical
   y horizontal, tablet y escritorio; ejecutar `pnpm build` y `git diff --check`.

No se requieren imágenes en portada, reto, método ni resultados.

## Imágenes sociales

`auditoria-y-recuperacion-de-proyectos-es.jpg` y `project-audit-and-recovery-en.jpg`
se generan con `docs/generate-project-management-social-images.cjs`, pasando los
nombres sin extensión. El procedimiento está en `docs/project-management-social-images.md`.

JPEG de **1200 × 630**, entre **60 000 y 100 000 bytes**; revisar también a **400 × 210**.
Las frases largas usan dos líneas, con el tamaño original: «Evalúa la situación /
y decide cómo continuar.» / «Assess the situation / and decide how to proceed.».
Las tarjetas muestran las seis paradas, con la primera activa y sus etiquetas traducidas.
