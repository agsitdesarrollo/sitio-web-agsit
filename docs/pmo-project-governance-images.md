# Imágenes de PMO y Gobierno de Proyectos

Estado: **pending**. No hay imágenes aprobadas; se conservan espacios reservados
en los cuatro paneles de servicio, en español e inglés.

## Especificación común

- Proporción del marco y del archivo: **16:7** en todas las vistas.
- Tamaño recomendado: **1600 × 700 px**; alternativa para mayor densidad: 2400 × 1050 px.
- Formato recomendado: WebP o AVIF optimizado, preferentemente por debajo de 200 KB.
- El marco se ajusta al ancho y alto disponibles sin deformarse. El espacio exterior
  puede variar para conservar el texto y los controles dentro de la pantalla.
- Mantener el asunto principal centrado y sin texto incrustado para compartir la
  imagen entre idiomas. No presentar métricas, clientes o resultados ficticios.

| ID del panel | Qué debe mostrar | Archivo propuesto bajo `public/assets/project-management/` |
| --- | --- | --- |
| `pmo` | Equipo coordinando responsables y seguimiento de varios proyectos desde una oficina de proyectos. | `pmo.webp` |
| `project-governance` | Responsables revisando una decisión, quién autoriza y sus efectos sobre un proyecto. | `project-governance.webp` |
| `portfolio-governance` | Dirección comparando iniciativas y capacidad disponible para acordar prioridades. | `portfolio-governance.webp` |
| `program-governance` | Líderes coordinando decisiones entre proyectos que comparten un objetivo. | `program-governance.webp` |

## Cómo reemplazarlas

1. Colocar los archivos aprobados en la carpeta indicada. No usar `public/_demo-local/`.
2. En `src/data/projectManagementDetail.ts`, localizar el capítulo por su ID en
   ambos idiomas dentro de `pmo-governance`.
3. Añadir `imageSrc: '/assets/project-management/<archivo>.webp'` y cambiar
   `imageStatus: 'pending'` a `imageStatus: 'ready'` en ES y EN.
4. Reemplazar `imageAlt` por una descripción breve de la imagen real en cada idioma,
   sin la frase «Espacio reservado» / «Reserved space».
5. El componente mostrará la imagen en el mismo marco y retirará la etiqueta `pending`.
   Verificar móvil vertical/horizontal y escritorio, así como `pnpm build` y
   `git diff --check`. Los atributos HTML de tamaño son 1600 × 700.

La portada y los paneles de reto, método y resultados no requieren imágenes.
