# Imágenes de Dirección Estratégica de Proyectos

Estado: **pending**. Los tres paneles de servicio reservan espacio para imágenes
aprobadas. Cada archivo se comparte entre español e inglés.

## Especificación común

- Proporción fija del archivo y del marco: **16:7**, igual que PMO.
- Tamaño recomendado: **1600 × 700 px**; alternativa: 2400 × 1050 px.
- Formato: WebP o AVIF optimizado; peso objetivo inferior a 200 KB.
- El marco cabe en el ancho y alto disponibles sin deformarse, también con
  movimiento reducido. El texto y los controles conservan su espacio.
- Usar composiciones centradas y sin texto incrustado. No representar cifras,
  clientes, marcas o resultados que no se hayan aprobado.

| ID del panel | Qué debe mostrar | Archivo bajo `public/assets/project-management/` |
| --- | --- | --- |
| `project-management` | Responsable y equipo revisando entregas, fechas y recursos de un proyecto concreto. El foco es dirigir la ejecución. | `project-management.webp` |
| `program-management` | Líderes coordinando entregas y dependencias de varios proyectos que contribuyen a una meta compartida. | `program-management.webp` |
| `portfolio-management` | Dirección distribuyendo personas, tiempo y presupuesto entre iniciativas según sus objetivos y avance. | `portfolio-management.webp` |

## Reemplazo de los espacios reservados

1. Guardar los archivos aprobados en la carpeta indicada, fuera de `public/_demo-local/`.
2. En `src/data/projectManagementDetail.ts`, abrir `strategic-delivery` y localizar
   cada capítulo por su ID en `es` y `en`.
3. Añadir `imageSrc: '/assets/project-management/<archivo>.webp'` y cambiar
   `imageStatus: 'pending'` por `imageStatus: 'ready'` en ambos idiomas.
4. Adaptar `imageAlt` a lo que muestre la imagen real, en español e inglés,
   retirando «Espacio reservado» / «Reserved space».
5. El componente compartido reemplazará la etiqueta `pending` por la imagen,
   con atributos de tamaño 1600 × 700 y el mismo marco 16:7. Revisar móvil,
   tablet y escritorio, movimiento reducido, `pnpm build` y `git diff --check`.

No se requieren imágenes en la portada ni en reto, método o resultados.
