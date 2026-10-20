# Verificación de Growth Marketing

Fecha: 20 de octubre de 2026. Rama: `codex/marketing-growth-redesign`, creada desde `main` en `bc17421ba321766917aac906a136798bf2855b53`.

## Alcance

La familia genérica `marketing-service` se conecta únicamente a las dos rutas Growth, en español e inglés. Los componentes, datos y controladores anteriores de Marketing se conservan. No se modifican menú, layout, contacto, footer, estilos globales, DESIGN.md, PRODUCT.md ni configuración de Impeccable. No se integran las ramas pendientes de PMO y Planeación.

El contraste de textos con la presentación corporativa y las instrucciones de los cinco assets pendientes están documentados en `assets-pendientes-marketing.md`.

## Matriz de pantalla

Se utilizó una pestaña de Chrome con cambio de tamaño, sin DevTools ni control de ventanas del sistema. Las siguientes medidas se probaron en ambos idiomas:

| Grupo | Viewports (px) |
|---|---|
| Teléfono vertical | 360×740, 390×844, 430×932 |
| Teléfono horizontal | 740×360, 844×390, 932×430 |
| Tablet | 768×1024, 820×1180, 1024×768, 1180×820 |
| Escritorio | 1280×720, 1366×768, 1440×900, 1920×1080 |
| Alturas que simulan barras | 360×560, 360×640, 390×664, 390×700, 412×732, 430×780 |

Resultado: **40 recorridos, 476 estados medidos**, sin incidencias registradas de scroll horizontal, contenido medido fuera del área visible, texto desbordado, solapamientos entre los pares comprobados o contenido esperado ausente. Se verificaron posición de scroll, límites del escenario, contenido semántico y resultado del ajuste por altura. El número de paradas varía por contenido, idioma y alto disponible; los textos completos se conservan.

La matriz estática empleó un proxy local de pruebas, fuera del repositorio. Después de cada entrada disparó una recomposición de viewport para concluir las animaciones y medir el estado final. Comprobó asentamiento y posición antes de medir, y volvió a medir después de capturar. Esto comprueba composición final; las pruebas de animación se realizaron aparte sobre el build sin ese proxy.

Se guardaron **79 capturas**, una por parada en 360×740, 740×360 y 1440×900, en ambos idiomas. Algunas capturas iniciales devolvieron un fotograma anterior; se repitieron, incluida una comprobación independiente del hero español de escritorio. La revisión final de composición aprobó las correcciones señaladas y las recapturas revisadas. No equivale a una certificación de hardware móvil.

## Interacciones

| Comprobación | Resultado y alcance |
|---|---|
| Rueda: hero hacia delante y atrás | Ambos idiomas, build local sin fixture. Máscara completa/retirada, SVG dibujado/borrado y detalles visibles/ocultos al finalizar. |
| Entrada inicial del hero | Un observador de estilos en el proxy de pruebas registra opacidad menor que 1 y llegada a 1, en ambos idiomas. La instrumentación permanece fuera del sitio. |
| Teclado y mazo | Cinco servicios en ambos sentidos en ES/EN. Regreso completo de EN al hero; posiciones finales y contenido medidos. |
| Entrada durante animación | Dos órdenes consecutivas de teclado en hero y servicios: termina el estado anterior y responde al siguiente, sin contenido fuera de pantalla al finalizar. |
| Menú móvil | Apertura/cierre y enlaces comprobados; en ES se compararon rectángulos antes/después: alto y posición de la parada idénticos. Overlay absoluto. |
| Idioma | Enlaces reales ES→EN y EN→ES comprobados. |
| CTA del hero | Abre y permite cerrar el formulario compartido en ambos idiomas, también con movimiento reducido. |
| Contacto y footer | Llegada por navegación/enlace del menú y scroll libre comprobados en ambos idiomas. No se enviaron solicitudes reales. |
| Pausa de problemas | Botón cambia a estado pausado; la implementación también pausa por foco, hover, toque y sección inactiva. No se certifica hover/toque físico. |
| Swipe | Eventos TouchEvent simulados por código, adelante/atrás, en ambos idiomas. |
| Movimiento reducido | `matchMedia` simulado por código desde antes de cargar el controlador. Hero completo sin parada inicial; recorrido completo EN, recorrido ES en ambos sentidos y CTA funcional. Cambio de preferencia sobre servicio comprobado. No se cambió la preferencia del sistema operativo. |

## Límites de la prueba

No se probó un teléfono físico, Safari/iOS, un trackpad físico ni barras reales de navegador móvil. Las seis alturas adicionales reproducen el espacio disponible, no el comportamiento de esas barras. No se midieron FPS ni consumo en un dispositivo móvil. No se enviaron formularios, mensajes, WhatsApp o correos. La revisión de capturas y las mediciones detectan los elementos y pares definidos por el verificador; no constituyen una prueba exhaustiva de toda combinación posible.

La previsualización para teléfono se sirve en el equipo local, puerto 4322; requiere misma red y equipo encendido. La conectividad desde el teléfono y sus reglas de red todavía requieren la prueba del usuario. No se despliega esta rama en el dominio de producción.

## Compilación y aislamiento

`pnpm build`, `pnpm exec tsc --noEmit --pretty false` y `git diff --check` terminaron correctamente. La comparación de archivos existentes contra `main` muestra cambios únicamente en los dos `index.astro` de Growth. Los cinco servicios hermanos, sus dos idiomas, la familia anterior y los archivos compartidos no tienen cambios. La nueva familia se importa exclusivamente en esas dos rutas.

## Evidencia local

La carpeta `marketing-qa` del directorio de visualizaciones de esta conversación contiene los archivos `final-{idioma}-{ancho}x{alto}.json`, `final-captures.json`, `interactions.json`, `hero-entrance.json`, la galería `capturas.html` y las capturas. Los scripts y la emulación del proxy permanecen fuera del repositorio y no se incluyen en el sitio.
