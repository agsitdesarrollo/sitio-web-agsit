# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños y directivos de empresas pequeñas y medianas en México, sin perfil técnico. Llegan sintiendo que su operación está desordenada: el trabajo se repite, depende de personas concretas y no se ve el avance. Buscan quién los ayude y no conocen términos como BPMN, AS-IS/TO-BE, BPMS, KPIs o Lean Six Sigma. Leen en español (es-MX) o en inglés y visitan desde teléfono, tablet o escritorio, en cualquier orientación.

## Product Purpose

AGSIT es una consultoría empresarial con cinco áreas: Soluciones Tecnológicas, Marketing Digital, Administración de Procesos, Dirección de Proyectos y Planeación Estratégica. El sitio (agsit.com.mx, en producción sobre Firebase Hosting) presenta los servicios y genera prospectos: cada página termina en un formulario de contacto que crea un lead en Bitrix24.

En Administración de Procesos (BPM 360°) el éxito es que el visitante entienda qué es cada servicio, cómo trabaja AGSIT y decida contactarnos.

## Positioning

Ciclo completo en un solo equipo: diagnosticamos, diseñamos, automatizamos, medimos y mejoramos procesos, y podemos implementar la tecnología gracias a las demás áreas de AGSIT. Idea ya publicada en el sitio: ordenar la operación antes de automatizar.

## Operating Context

- Estructura del sitio: Home → 5 páginas secundarias (Soluciones Tecnológicas, Marketing Digital, Administración de Procesos, Dirección de Proyectos, Planeación Estratégica) → páginas terciarias por área (Soluciones Tecnológicas: 7, Marketing Digital: 6, Administración de Procesos: 5 nuevas).
- Todas las páginas existen en español (raíz del dominio, por defecto) e inglés (`/en/`), con `hreflang` entre versiones.
- Componentes compartidos que las páginas nuevas reutilizan: menú (se oculta al bajar y reaparece al subir), footer, drawer de contacto (`data-contact-trigger`) y sección final de contacto.
- Las páginas se recorren con el scroll del usuario y cada sección ocupa exactamente la pantalla, sin recortes ni tapada por el menú, en móvil vertical y horizontal, tablet vertical y horizontal, y escritorio.

## Capabilities and Constraints

Las 5 páginas terciarias nuevas y sus servicios:

1. Modelado y Optimización de Procesos: BPMN, AS-IS, TO-BE, Diseño de Procesos, Reingeniería de Procesos.
2. Automatización Inteligente de Procesos: BPMS, Workflows, Automatización de Procesos, Reglas de Negocio, Integración de Procesos.
3. Inteligencia y Gobierno de Procesos: KPIs, Dashboards, Gobierno BPM, Monitoreo de Procesos, Mejora Continua.
4. Excelencia Operativa: Lean, Lean Six Sigma, Supply Chain, Inventarios, Tiempos y Movimientos.
5. Diagnóstico y Auditoría de Procesos: Diagnóstico BPM, Auditorías de Procesos, Evaluación de Madurez, GAP Analysis.

- URLs: `/administracion-de-procesos/<slug>/` y `/en/process-management/<slug>/`, con slash final.
- Astro 6 con GSAP/ScrollTrigger; Lenis ya se usa en las terciarias de Marketing Digital.
- "Automatización Inteligente de Procesos" también existe bajo Soluciones Tecnológicas (enfoque tecnológico: RPA, APIs, IoT). La versión de Procesos debe tener enfoque propio (ordenar y gobernar el flujo), título y descripción propios y enlace cruzado.
- No llevan testimoniales, preguntas frecuentes ni precios.
- Los nombres técnicos de los servicios se mantienen visibles como etiqueta, con una explicación en lenguaje llano.
- Sin datos sobre herramientas concretas (Bizagi, Camunda, etc.): el texto es agnóstico de marca.

## Brand Commitments

- Voz en es-MX con "tú", frases sencillas y sin tecnicismos; en inglés, el mismo nivel de claridad.
- Se reutilizan los colores y las tipografías del sitio actual, tomando como referencia principal las páginas de Soluciones Tecnológicas, para títulos, subtítulos y párrafos en cada clase de dispositivo.
- Reglas permanentes del usuario para subpáginas de servicio: sin fondos de rejilla ni líneas verticales, sin trazos dibujados a mano y sin cuadrículas de tarjetas idénticas.

## Evidence on Hand

No hay casos de éxito, testimonios, métricas, certificaciones, años de experiencia ni herramientas específicas que se puedan citar. Nada de eso debe inventarse: los beneficios se expresan de forma cualitativa.

No existen imágenes de Administración de Procesos para estos servicios. Se dejan espacios reservados para que el usuario las entregue después; no se generan imágenes.

## Product Principles

1. Ordenar antes de automatizar.
2. Primero las palabras del cliente, después el término técnico.
3. Decir lo que hacemos y cómo lo hacemos, sin pruebas inventadas.
4. Cada página conduce a un paso concreto: hablar con AGSIT.

## Accessibility & Inclusion

WCAG AA: contraste mínimo 4.5:1 en texto normal y 3:1 en texto grande, navegación completa con teclado, foco visible y respeto a `prefers-reduced-motion` (sin animaciones de scroll cuando el usuario lo pide). Contenido utilizable con táctil y en dos idiomas.
