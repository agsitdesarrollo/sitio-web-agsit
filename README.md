# AGSIT Astro Landing

Landing page Astro para AGSIT, migrada desde la version React/Vite. La prioridad del proyecto es mantener la experiencia visual y las animaciones de scroll 1:1, reduciendo la hidratacion al minimo y usando una ruta server-side para el formulario de contacto.

## Stack

- Astro 6 con adapter Node para servir `/api/contact`.
- React solo para islas interactivas.
- Tailwind CSS 4 importado desde `src/styles/global.css`.
- GSAP + ScrollTrigger para las animaciones de scroll.
- `@gsap/react` para inicializacion y cleanup del controlador GSAP.
- Matter.js para el canvas fisico de logos.
- pnpm como gestor de paquetes.

## Estructura

```text
/
|-- public/
|   `-- assets/              # Videos y archivos servidos sin procesar por Astro
|-- src/
|   |-- animations/          # Helpers GSAP especializados
|   |-- assets/
|   |   `-- images/          # Imagenes locales usadas con astro:assets / <Image />
|   |-- components/
|   |   |-- about/           # Seccion horizontal y canvas Matter.js
|   |   |-- contact/         # Formulario y tarjeta de contacto reutilizables
|   |   |-- final-contact/   # Bloque final de contacto
|   |   |-- footer/          # Footer estatico
|   |   |-- hero/            # Hero, video de fondo y titulo animado
|   |   |-- interactivity/   # Isla React para menu movil y drawer de contacto
|   |   |-- navigation/      # Header estatico
|   |   |-- scroll/          # Isla React que registra GSAP/ScrollTrigger
|   |   |-- seo/             # Metadata SEO del layout
|   |   |-- services/        # Seccion de servicios
|   |   `-- video-story/     # Transicion a video corporativo
|   |-- data/                # Copy, servicios, logos y metadata centralizados
|   |-- layouts/             # Layout HTML principal
|   |-- pages/               # Rutas Astro
|   |-- styles/              # Entrada global de Tailwind y CSS modular
|   `-- types/               # Declaraciones locales
`-- package.json
```

## Arquitectura de hidratacion y contacto

La pagina principal vive en `src/pages/[...lang]/index.astro` y renderiza HTML prerenderizado para SEO. Las piezas interactivas principales son:

- `PageShellScripts`: controla menu movil, eventos `data-contact-trigger` y drawer de contacto.
- `contactFormSubmit`: envia los formularios a `/api/contact`.
- `ScrollExperienceController`: registra GSAP, ScrollTrigger y las timelines sobre clases `js-*`.

El endpoint `src/pages/api/contact.ts` lee `BITRIX_WEBHOOK_URL` desde variables de entorno y llama `crm.lead.add` en Bitrix. Como fallback temporal tambien acepta `BITRIX`.

Las clases `js-*` son parte del contrato de animacion. No renombrarlas sin actualizar `src/components/scroll/ScrollExperienceController.tsx`.

## Eventos DOM

- `agsit:open-contact`: abre el drawer de contacto.
- `agsit:close-contact`: cierra el drawer de contacto.
- `agsit-clients-drop`: evento interno usado por GSAP para impulsar el canvas Matter.js.

Los botones que deben abrir contacto usan `data-contact-trigger`.

## Comandos

```sh
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm preview
```

## Notas de mantenimiento

- Las imagenes estaticas optimizables viven en `src/assets/images` y se importan con `astro:assets`.
- Los videos y archivos que deben conservar su URL directa viven en `public/assets`; las rutas se consumen como `/assets/nombre.ext`.
- Los logos de clientes siguen apuntando a URLs remotas de `agsit.com.mx`.
- El formulario crea prospectos en Bitrix mediante `/api/contact`; no expongas el webhook como variable `PUBLIC_*`.
- La metadata SEO base esta en `src/data/siteMetadata.ts`.
- Tailwind esta disponible, pero los estilos complejos de animacion se mantienen en CSS modular para proteger el comportamiento 1:1.
