# AGSIT Astro Landing

Landing page estatica en Astro para AGSIT, migrada desde la version React/Vite. La prioridad del proyecto es mantener la experiencia visual y las animaciones de scroll 1:1, reduciendo la hidratacion al minimo mediante islas React puntuales.

## Stack

- Astro 6 con salida estatica.
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

## Arquitectura de hidratacion

La pagina principal vive en `src/pages/index.astro` y renderiza HTML estatico para SEO. Solo se hidratan tres piezas:

- `SiteInteractivity` (`client:load`): controla menu movil, eventos `data-contact-trigger`, drawer de contacto y previene el envio visual del formulario.
- `ScrollExperienceController` (`client:load`): registra GSAP, ScrollTrigger y las timelines sobre clases `js-*`.
- `ClientsPhysicsCanvas` (`client:load`): ejecuta Matter.js dentro de la seccion de clientes.

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
pnpm preview
```

## Notas de mantenimiento

- Las imagenes estaticas optimizables viven en `src/assets/images` y se importan con `astro:assets`.
- Los videos y archivos que deben conservar su URL directa viven en `public/assets`; las rutas se consumen como `/assets/nombre.ext`.
- Los logos de clientes siguen apuntando a URLs remotas de `agsit.com.mx`.
- El formulario es visual por ahora. No envia datos a una API.
- La metadata SEO base esta en `src/data/siteMetadata.ts`.
- Tailwind esta disponible, pero los estilos complejos de animacion se mantienen en CSS modular para proteger el comportamiento 1:1.
