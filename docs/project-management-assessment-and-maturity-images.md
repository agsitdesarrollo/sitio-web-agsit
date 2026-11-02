# Imágenes de Diagnóstico y Madurez en Gestión de Proyectos

Estado: **pending**. Los tres servicios comparten espacios de imagen en español
e inglés; las piezas sociales son independientes de estas imágenes.

## Especificación común

- Proporción fija del archivo y del marco: **16:7**.
- Tamaño recomendado: **1600 × 700 px**; alternativa: 2400 × 1050 px.
- WebP o AVIF optimizado, con un peso objetivo inferior a 200 KB.
- Composición centrada, sin texto incrustado, para compartir el archivo entre idiomas.
- No mostrar clientes, cifras, datos sensibles, certificaciones ni resultados ficticios.
- Mantener el texto y los controles visibles en teléfono, tablet y escritorio,
  incluidos horizontal y movimiento reducido.

| ID del panel | Qué debe mostrar | Archivo bajo `public/assets/project-management/` |
| --- | --- | --- |
| `project-assessment` | Responsables revisando la planeación, asignación del trabajo y seguimiento de un proyecto. Documentos sin datos reales legibles. | `project-assessment.webp` |
| `opm3` | Equipo contrastando sus prácticas de gestión con un modelo de referencia e identificando oportunidades de mejora. Sin escalas, puntajes o certificaciones inventadas. | `opm3.webp` |
| `organizational-assessment` | Personas de distintas áreas revisando responsabilidades, comunicación y colaboración para reconocer qué ayuda o dificulta la gestión de proyectos. | `organizational-assessment.webp` |

## Cómo reemplazarlas

1. Guardar los archivos aprobados en la carpeta indicada, fuera de `public/_demo-local/`.
2. En `src/data/projectManagementDetail.ts`, localizar la clave `assessment-maturity`,
   el idioma y el capítulo por su ID.
3. Añadir `imageSrc: '/assets/project-management/<archivo>.webp'` y cambiar
   `imageStatus: 'pending'` a `imageStatus: 'ready'` en ambos idiomas.
4. Ajustar `imageAlt` a lo que muestra la imagen real en cada idioma, quitando
   «Espacio reservado» / «Reserved space». El componente sustituye `pending` por el archivo.
5. Verificar proporción, recortes, texto, controles y movimiento reducido en los
   tamaños acordados; ejecutar `pnpm build` y `git diff --check`.

No se requieren imágenes en portada, reto, método ni resultados.

## Imágenes sociales

Archivos: `diagnostico-y-madurez-en-gestion-de-proyectos-es.jpg` y
`project-management-assessment-and-maturity-en.jpg`.

Se generan con `docs/generate-project-management-social-images.cjs`, pasando
sus nombres sin extensión. El procedimiento está en `docs/project-management-social-images.md`.
Son JPEG de **1200 × 630**, entre **60 000 y 100 000 bytes**, revisados a **400 × 210**.

El título usa Cormorant Garamond a 64 px en tres líneas para evitar que invada
la tarjeta derecha. Las frases conservan Inter a 26 px y se dividen en dos líneas.
La tarjeta contiene las seis paradas, con el primer elemento activo, en su idioma.
