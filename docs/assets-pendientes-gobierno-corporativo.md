# Imágenes pendientes: Gobierno Corporativo

Las seis imágenes se comparten entre español e inglés. Todas permanecen con `pending: true`; no se requieren archivos para mostrar los espacios reservados.

Datos: `strategicPlanningDetailCatalog['corporate-governance']` en `src/data/strategicPlanningDetail.ts`.

| Archivo previsto en public/assets/planeacion-estrategica/gobierno-corporativo/ | Sección | Escena prevista | Proporción base |
| --- | --- | --- | --- |
| punto-1.webp | Dirección | Dueños y directivos conversando sobre las decisiones de la empresa. | 4:3 |
| punto-2.webp | Responsabilidades | Equipo revisando sus responsabilidades y compromisos. | 4:3 |
| punto-3.webp | Acuerdos | Participantes dejando por escrito los acuerdos de una reunión. | 4:3 |
| punto-4.webp | Resultados | Directivos revisando los resultados de la empresa. | 4:3 |
| punto-5.webp | Seguimiento | Equipo revisando el avance de los compromisos acordados. | 4:3 |
| sesion-trabajo.webp | Cómo trabajamos contigo | Sesión de dirección para acordar responsabilidades y seguimiento. | 4:5 |

Las etiquetas y los textos alternativos de ambos idiomas proceden del documento aprobado `docs/planeacion-estrategica-textos.md`. Al recibir cada fotografía, revisar su descripción y activar solo su objeto con `pending: false` en ambos idiomas.

Preparar las tarjetas en WebP de 1600×1200 y la imagen de trabajo con un original de 2000×2500. Conservar margen alrededor del motivo: los marcos usan recortes según la pantalla. Revisar el recorte móvil y el movimiento interior antes de activarlas. El hero y la narrativa no necesitan fotografía.

## Imágenes para redes

- Español: `public/assets/social/gobierno-corporativo-es.jpg`.
- Inglés: `public/assets/social/corporate-governance-en.jpg`.
- Formato: JPEG, 1200×630. Captura de la portada real con Playwright, fuentes cargadas y animación terminada, como las imágenes anteriores del sitio.
- Los textos alternativos están en los metadatos del catálogo y en el documento aprobado.

## Verificación de la página

- Playwright en español e inglés, en 1366×768 y 390×844, con animaciones activas. Recorrido completo, capturas del estado final de la portada, narrativa, introducción, cinco tarjetas, sección de trabajo, contacto y final del footer.
- Sin textos cortados ni encimados en las capturas revisadas; sin desbordamiento horizontal ni errores de consola. No se registraron avisos de consola en estos recorridos.
- Enlaces reales desde la secundaria y desde la etiqueta del catálogo principal: destino correcto y respuesta 200 en ambos idiomas.
- Un H1, título y descripción, canonical, hreflang recíproco, inclusión en sitemap e imágenes sociales 1200×630 comprobados. Mensaje de WhatsApp específico de este servicio comprobado en ambos idiomas; pasó de pendientes al mapa activo de rutas.
- Evidencia local (excluida de Git): `.playwright-mcp/planning/corporate-governance/`, con capturas por sección, cuatro vistas de conjunto y `report.json`.
- Compilación `pnpm build` y `git diff --check`: correctos antes del commit. Las pruebas se hicieron en el puerto 4333.
- No se enviaron formularios ni mensajes de WhatsApp. Las fotografías definitivas siguen pendientes.
